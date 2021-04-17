import JsonClient from "./Json";

export class ApiProvider extends JsonClient {
    constructor() {
        super();
    }

    async stats({ game, userName, lang, platform = "pc" }) {
        return await this.getJsonMethod(`/${game}/stats`, {
            "name": userName,
            "lang": lang,
            "platform": platform,
        });
    }
}

export const GetStats = new ApiProvider();