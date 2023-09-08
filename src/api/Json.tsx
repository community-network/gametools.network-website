import "regenerator-runtime/runtime";

const MODE = "dev";

const endPoints = {
  cors: "http://127.0.0.1:8787",
  dev: "http://localhost:8787",
  prod: "https://api.gametools.network",
};

export default class JsonClient {
  constructApiUrl(method: string, params: { [name: string]: string }): string {
    params = params || {};
    let paramStr = "";
    for (const s in params) {
      paramStr += s + "=" + params[s] + "&";
    }
    if (paramStr !== "") paramStr = "?" + paramStr;
    const apiEP = endPoints[MODE];
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
    params: { [name: string]: unknown },
  ): Promise<Response> {
    return fetch(this.constructApiUrl(method, {}), params);
  }
  getJsonMethod(
    method: string,
    params: { [name: string]: string },
  ): Promise<any> {
    return this.errorHandler(this.fetchMethod(method, params));
  }
  postJsonMethod(
    method: string,
    params: { [name: string]: string | boolean | number },
  ): Promise<any> {
    const options = {
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
            if ("error" in json) {
              throw json.error;
            }
            if (!result.ok) {
              throw json.error;
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
