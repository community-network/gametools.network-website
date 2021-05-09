import 'regenerator-runtime/runtime'

const MODE = "prod";

const endPoints = {
    dev: "https://api.jobse.space",
    prod: "https://api.gametools.network"
}

export default class JsonClient {
    constructApiUrl(method: string, params: { [name: string]: string }) {
        params = params || {};
        let paramStr = "";
        for (let s in params) {
            paramStr += s + "=" + params[s] + "&";
        }
        if (paramStr !== "") paramStr = "?" + paramStr;
        const apiEP = endPoints[MODE];
        return apiEP + method + paramStr;
    }
    async fetchMethod(method: string, params: { [name: string]: string }) {
        return fetch(this.constructApiUrl(method, params));
    }
    getJsonMethod(method: string, params: { [name: string]: string }) {
        return this.errorHandler(this.fetchMethod(method, params));
    }
    async errorHandler(response: Promise<Response>) {
        return response.then(
            result => {
                return result.json().then(
                    json => {
                        if ("error" in json) {
                            throw json.error;
                        }
                        return json;
                    },
                    error => this.spawnError(error, 600)
                );
            },
            error => this.spawnError(error, response)
        );
    }
    spawnError(error, code) {
        throw {
            "error": {
                "message": error,
                "code": code,
            }
        };
    }
}