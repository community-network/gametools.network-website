import "regenerator-runtime/runtime";

export default class JsonClient {
  constructApiUrl(method: string, params: { [name: string]: string }): string {
    params = params || {};
    let paramStr = "";
    for (const s in params) {
      paramStr += s + "=" + params[s] + "&";
    }
    if (paramStr !== "") paramStr = "?" + paramStr;
    const apiEP = process.env.gametools_endpoint;
    return apiEP + method + paramStr;
  }
  async fetchMethod(
    method: string,
    params: { [name: string]: string },
  ): Promise<Response> {
    return fetch(this.constructApiUrl(method, params));
  }
  async postMethod(
    method: string,
    params: RequestInit | { [name: string]: unknown },
  ): Promise<Response> {
    return fetch(this.constructApiUrl(method, {}), params);
  }
  getJsonMethod(
    method: string,
    params: { [name: string]: string },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    return this.errorHandler(this.fetchMethod(method, params));
  }
  postJsonMethod(
    method: string,
    params: { [name: string]: string | boolean | number },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(params),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this.errorHandler(this.postMethod(method, options));
  }
  async errorHandler(
    response: Promise<Response>,
  ): Promise<{ [name: string]: string }> {
    return response.then(
      (result) => {
        return result.json().then(
          (json) => {
            if (!result.ok) {
              if (json?.error) {
                throw json.error
              }
              if (json?.errors?.includes("could not find a experience based on the requested experience code")) {
                return json;
              }
              throw json?.errors;
            }
            if (typeof result === "object" && result !== null) {
              json.apiUrl = result?.url;
            }
            return json;
          },
          (error) => this.spawnError(error, 600),
        );
      },
      (error) => this.spawnError(error, response),
    );
  }
  spawnError(error: unknown, code: number | Promise<Response>): void {
    throw {
      error: {
        message: error,
        code: code,
      },
    };
  }
}
