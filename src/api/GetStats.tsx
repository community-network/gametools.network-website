import JsonClient from "./Json";

export class ApiProvider extends JsonClient {
    constructor() {
        super();
    }

    async stats({ game, type, userName, lang, platform = "pc" }) {
        return await this.getJsonMethod(`/${game}/${type}`, {
            "name": userName,
            "lang": lang,
            "platform": platform,
        });
    }

    async pidStats({ game, type, eaid, lang, platform = "pc" }) {
        return await this.getJsonMethod(`/${game}/${type}`, {
            "playerid": eaid,
            "lang": lang,
            "platform": platform,
        });
    }
}

export const GetStats = new ApiProvider();