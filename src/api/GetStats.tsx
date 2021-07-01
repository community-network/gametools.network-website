import JsonClient from "./Json";

interface PlayerInfo {
  game: string;
  type: string;
  getter: string;
  userName: string;
  lang: string;
  platform?: string;
}

interface ServerInfo {
  game: string;
  type: string;
  getter: string;
  serverName: string;
  lang: string;
  region?: string;
  platform?: string;
}

interface GraphInfo {
  game: string;
  days: string;
  region: string;
  platform: string;
}

export class ApiProvider extends JsonClient {
  constructor() {
    super();
  }

  async stats({
    game,
    type,
    getter,
    userName,
    lang,
    platform = "pc",
  }: PlayerInfo): Promise<{ [name: string]: any }> {
    if (getter == "playerid") {
      return await this.getJsonMethod(`/${game}/${type}/`, {
        playerid: userName,
        lang: lang,
        platform: platform,
      });
    }
    return await this.getJsonMethod(`/${game}/${type}/`, {
      name: encodeURIComponent(userName),
      lang: lang,
      platform: platform,
    });
  }

  async server({
    game,
    type,
    getter,
    serverName,
    lang,
    region = "all",
    platform = "pc",
  }: ServerInfo): Promise<{ [name: string]: any }> {
    const gameStuff = game.split(".");
    if (platform == "all") {
      platform = "pc";
    }
    if (getter == "gameid") {
      return await this.getJsonMethod(`/${gameStuff[0]}/${type}/`, {
        gameid: serverName,
        lang: lang,
        region: region,
        platform: platform,
        service: gameStuff[1],
      });
    }
    return await this.getJsonMethod(`/${gameStuff[0]}/${type}/`, {
      name: encodeURIComponent(serverName),
      lang: lang,
      region: region,
      platform: platform,
      service: gameStuff[1],
    });
  }

  async graphs({
    game,
    days,
    region = "all",
    platform = "pc",
  }: GraphInfo): Promise<{ [name: string]: any }> {
    const gameStuff = game.split(".");
    return await this.getJsonMethod(`/${gameStuff[0]}/statusarray/`, {
      days: days,
      region: region,
      platform: platform,
      service: gameStuff[1],
    });
  }
}

export const GetStats = new ApiProvider();
