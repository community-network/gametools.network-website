import JsonClient from "./Json";
import {
  PlatoonStats,
  MainStats,
  ServerSearch,
  DetailedServerInfo,
  PlatoonSearchResult,
  ServerLeaderboardReturn,
} from "./ReturnTypes";

interface PlayerInfo {
  game: string;
  type: string;
  getter: string;
  userName: string;
  lang: string;
  platform?: string;
}

interface PlatoonSearch {
  name: string;
  lang: string;
}

interface PlatoonInfo {
  id: string;
  lang: string;
}

interface ServerInfo {
  game: string;
  getter: string;
  serverName: string;
  lang: string;
  region?: string;
  platform?: string;
}

interface ServerLeaderboard {
  gameId: string;
  amount: string;
  sort: string;
}

interface ServerSearchInfo {
  game: string;
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
  }: PlayerInfo): Promise<MainStats> {
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

  async platoonSearch({
    name,
    lang,
  }: PlatoonSearch): Promise<PlatoonSearchResult> {
    return await this.getJsonMethod(`/bfglobal/platoons/`, {
      name: name,
      lang: lang,
    });
  }

  async platoon({ id, lang }: PlatoonInfo): Promise<PlatoonStats> {
    return await this.getJsonMethod(`/bfglobal/detailedplatoon/`, {
      id: id,
      lang: lang,
    });
  }

  async server({
    game,
    getter,
    serverName,
    lang,
    region = "all",
    platform = "pc",
  }: ServerInfo): Promise<DetailedServerInfo> {
    const gameStuff = game.split(".");
    if (platform == "all") {
      platform = "pc";
    }
    if (getter == "gameid") {
      return await this.getJsonMethod(`/${gameStuff[0]}/detailedserver/`, {
        gameid: serverName,
        lang: lang,
        region: region,
        platform: platform,
        service: gameStuff[1],
      });
    }
    return await this.getJsonMethod(`/${gameStuff[0]}/detailedserver/`, {
      name: encodeURIComponent(serverName),
      lang: lang,
      region: region,
      platform: platform,
      service: gameStuff[1],
    });
  }

  async serverLeaderboard({
    gameId,
    amount,
    sort,
  }: ServerLeaderboard): Promise<ServerLeaderboardReturn> {
    return await this.getJsonMethod(`/manager/leaderboard/`, {
      gameId: gameId,
      amount: amount,
      sort: sort,
    });
  }

  async serverSearch({
    game,
    serverName,
    lang,
    region = "all",
    platform = "pc",
  }: ServerSearchInfo): Promise<ServerSearch> {
    const gameStuff = game.split(".");
    if (platform == "all") {
      platform = "pc";
    }
    return await this.getJsonMethod(`/${gameStuff[0]}/servers/`, {
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
