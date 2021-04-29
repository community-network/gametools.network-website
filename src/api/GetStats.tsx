import JsonClient from "./Json";

export class ApiProvider extends JsonClient {
    constructor() {
        super();
    }

    async stats({ game, type, getter, userName, lang, platform = "pc" }) {
        if (getter == "playerid") {
            return await this.getJsonMethod(`/${game}/${type}/`, {
                "playerid": userName,
                "lang": lang,
                "platform": platform,
            });
        }
        return await this.getJsonMethod(`/${game}/${type}/`, {
            "name": userName,
            "lang": lang,
            "platform": platform,
        });
    }

    async server({ game, type, getter, serverName, lang}) {
        let gameStuff = game.split(".")
        if (getter == "gameid") {
            return await this.getJsonMethod(`/${gameStuff[0]}/${type}/`, {
                "gameid": serverName,
                "lang": lang,
                "service": gameStuff[1]
            });
        }
        return await this.getJsonMethod(`/${gameStuff[0]}/${type}/`, {
            "name": serverName,
            "lang": lang,
            "service": gameStuff[1]
        });
    }
}

export const GetStats = new ApiProvider();