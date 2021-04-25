import JsonClient from "./Json";

export class ApiProvider extends JsonClient {
    constructor() {
        super();
    }

    async stats({ game, type, userName, lang, platform = "pc" }) {
        return await this.getJsonMethod(`/${game}/${type}/`, {
            "name": userName,
            "lang": lang,
            "platform": platform,
        });
    }

    async server({ game, type, serverName, lang}) {
        let gameStuff = game.split(".")

        return await this.getJsonMethod(`/${gameStuff[0]}/${type}/`, {
            "name": serverName,
            "lang": lang,
            "service": gameStuff[1]
        });
    }
}

export const GetStats = new ApiProvider();