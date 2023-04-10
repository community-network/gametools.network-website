import JsonClient from "./Json";
import {
  PlatoonStats,
  MainStats,
  ServerSearch,
  DetailedServerInfo,
  PlatoonSearchResult,
  ServerLeaderboardReturn,
  ServerPlayersReturn,
  seederPlayersReturn,
  UserGames,
  PlaygroundInfoReturn,
  ServerOwnerResult,
} from "./ReturnTypes";
import { newGen } from "./static";

interface BfBanInfo {
  getter: string;
  usernames: string[] | number[];
}

interface OwnerInfo {
  game: string;
  ownerInfo: ServerOwnerResult;
}

interface SmallPlayerInfo {
  getter: string;
  userName: string;
  platform?: string;
}

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
  platform: string;
  lang: string;
}

interface PlatoonInfo {
  id: string;
  platform: string;
  lang: string;
}

interface ServerInfo {
  game: string;
  getter: string;
  serverName: string;
  lang: string;
  region?: string;
  platform?: string;
  with_ownername?: boolean;
}

interface PlaygroundInfo {
  game: string;
  getter: string;
  playground: string;
  lang: string;
  with_ownername?: boolean;
}

interface ServerLeaderboard {
  gameId: string;
  amount: string;
  sort: string;
}

interface serverPlayerlist {
  game: string;
  gameId: string;
}

interface ServerSearchInfo {
  game: string;
  searchTerm: string;
  lang: string;
  searchType?: string;
  region?: string;
  platform?: string;
  limit?: string;
}

interface GraphInfo {
  game: string;
  days: string;
  region?: string;
  platform?: string;
  type?: string;
}

interface ServerGraphInfo {
  game: string;
  days: string;
  name: string;
  getter: string;
  platform?: string;
}

export interface bfbanPlayer {
  names: { [name: string]: bfbanPlayers };
  userids: { [name: string]: bfbanPlayers };
  personaids: { [name: string]: bfbanPlayers };
}

export interface bfbanPlayers {
  personaId: string;
  url: string;
  status: string;
  hacker: boolean;
  originId: string;
  originPersonaId: string;
  originUserId: string;
  cheatMethods: string;
}

export interface GlobalGraphReturn {
  serverAmount: number[];
  soldierAmount: number[];
  queueAmount: number[];
  spectatorAmount: number[];
  timeStamps: string[];
  start: number;
  end: number;
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
        format_values: "false",
        playerid: userName,
        lang: lang,
        platform: platform,
      });
    }
    return await this.getJsonMethod(`/${game}/${type}/`, {
      format_values: "false",
      name: encodeURIComponent(userName),
      lang: lang,
      platform: platform,
    });
  }

  async games({
    getter,
    userName,
    platform = "pc",
  }: SmallPlayerInfo): Promise<UserGames> {
    if (getter == "playerid") {
      return await this.getJsonMethod(`/bfglobal/games`, {
        playerid: userName,
        platform: platform,
      });
    }
    return await this.getJsonMethod(`/bfglobal/games`, {
      name: encodeURIComponent(userName),
      platform: platform,
    });
  }

  async platoonSearch({
    name,
    platform,
    lang,
  }: PlatoonSearch): Promise<PlatoonSearchResult> {
    return await this.getJsonMethod(`/bfglobal/platoons/`, {
      name: name,
      platform: platform,
      lang: lang,
    });
  }

  async platoon({ id, platform, lang }: PlatoonInfo): Promise<PlatoonStats> {
    return await this.getJsonMethod(`/bfglobal/detailedplatoon/`, {
      id: id,
      platform: platform,
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
    with_ownername = true,
  }: ServerInfo): Promise<DetailedServerInfo> {
    const gameStuff = game.split(".");
    if (platform == "all") {
      platform = "pc";
    }
    if ((getter == "gameid" || getter == "serverid") && game == "bf2042") {
      return await this.getJsonMethod(`/${gameStuff[0]}/detailedserver/`, {
        serverid: serverName,
        lang: lang,
        region: region,
        platform: platform,
        service: gameStuff[1],
        return_ownername: with_ownername.toString(),
      });
    } else if (getter == "gameid") {
      return await this.getJsonMethod(`/${gameStuff[0]}/detailedserver/`, {
        gameid: serverName,
        lang: lang,
        region: region,
        platform: platform,
        service: gameStuff[1],
        return_ownername: with_ownername.toString(),
      });
    } else if (getter == "serverip") {
      const result = await this.getJsonMethod(`/${gameStuff[0]}/servers`, {
        name: encodeURIComponent(serverName),
        type: "ip",
        service: gameStuff[1],
        platform: platform,
      });
      return result.servers[0];
    }
    return await this.getJsonMethod(`/${gameStuff[0]}/detailedserver/`, {
      name: encodeURIComponent(serverName),
      lang: lang,
      region: region,
      platform: platform,
      service: gameStuff[1],
      return_ownername: with_ownername.toString(),
    });
  }

  async playground({
    game,
    getter,
    playground,
    lang,
    with_ownername = true,
  }: PlaygroundInfo): Promise<PlaygroundInfoReturn> {
    if (getter == "experiencecode") {
      return await this.getJsonMethod(`/${game}/playground/`, {
        experiencecode: playground,
        lang: lang,
        return_ownername: with_ownername.toString(),
      });
    }
    return await this.getJsonMethod(`/${game}/playground/`, {
      playgroundid: playground,
      lang: lang,
      return_ownername: with_ownername.toString(),
    });
  }

  async feslid({ game, ownerInfo }: OwnerInfo): Promise<ServerOwnerResult> {
    return await this.getJsonMethod(`/${game}/feslid/`, {
      platformid: ownerInfo.platformId.toString(),
      personaid: ownerInfo.personaId.toString(),
      nucleusid: ownerInfo.nucleusId.toString(),
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

  async serverPlayerlist({
    game,
    gameId,
  }: serverPlayerlist): Promise<ServerPlayersReturn> {
    const gameStuff = game.split(".");
    if (game === "bf2042") {
      return await this.getJsonMethod(`/${gameStuff[0]}/players/`, {
        blazegameid: gameId,
      });
    }
    return await this.getJsonMethod(`/${gameStuff[0]}/players/`, {
      gameId: gameId,
    });
  }

  async seederPlayerList({
    game,
    gameId,
  }: serverPlayerlist): Promise<seederPlayersReturn> {
    const gameStuff = game.split(".");
    if (gameStuff[0] === "bf1") {
      return await this.getJsonMethod(`/${gameStuff[0]}/seederplayers/`, {
        gameId: gameId,
      });
    }
    return null;
  }

  async serverSearch({
    game,
    searchTerm,
    lang,
    searchType = "servername",
    region = "all",
    platform = "pc",
    limit = "10",
  }: ServerSearchInfo): Promise<ServerSearch> {
    const gameStuff = game.split(".");
    let serverName = "";
    let experienceName = "";
    if (platform == "allPlatforms" && !newGen.includes(game)) {
      platform = "pc";
    } else if (platform == "ps5" && !newGen.includes(game)) {
      platform = "ps4";
    } else if (platform == "xboxseries" && !newGen.includes(game)) {
      platform = "xboxone";
    }
    if (searchType === "experiencename" && game == "bf2042") {
      experienceName = searchTerm;
    } else {
      serverName = searchTerm;
    }
    return await this.getJsonMethod(`/${gameStuff[0]}/servers/`, {
      name: encodeURIComponent(serverName),
      experiencename: encodeURIComponent(experienceName),
      lang: lang,
      region: region,
      platform: platform,
      service: gameStuff[1],
      limit: limit,
    });
  }

  async graphs({
    game,
    days,
    region = "all",
    platform = "pc",
    type = "amounts",
  }: GraphInfo): Promise<{ [name: string]: any }> {
    const gameStuff = game.split(".");
    return await this.getJsonMethod(`/${gameStuff[0]}/statusarray/`, {
      days: days,
      region: region,
      platform: platform,
      service: gameStuff[1],
      type: type,
    });
  }

  async serverGraphs({
    game,
    days,
    getter,
    name,
    platform = "pc",
  }: ServerGraphInfo): Promise<GlobalGraphReturn> {
    const gameStuff = game.split(".");

    if (platform == "all") {
      platform = "pc";
    }
    if (getter == "serverid") {
      return await this.getJsonMethod(`/${gameStuff[0]}/serverarray/`, {
        serverid: name,
        platform: platform,
        service: gameStuff[1],
        days: days,
      });
    } else if (getter == "gameid") {
      return await this.getJsonMethod(`/${gameStuff[0]}/serverarray/`, {
        gameid: name,
        platform: platform,
        service: gameStuff[1],
        days: days,
      });
    } else if (getter == "serverip") {
      return await this.getJsonMethod(`/${gameStuff[0]}/serverarray`, {
        name: encodeURIComponent(name),
        type: "ip",
        service: gameStuff[1],
        platform: platform,
        days: days,
      });
    }
    return await this.getJsonMethod(`/${gameStuff[0]}/serverarray/`, {
      servername: encodeURIComponent(name),
      platform: platform,
      service: gameStuff[1],
      days: days,
    });
  }

  async globalGraph(): Promise<GlobalGraphReturn> {
    return await this.getJsonMethod(`/bfglobal/totalstatusarray/`, {});
  }

  async bfbanCheckPlayers({
    getter,
    usernames,
  }: BfBanInfo): Promise<bfbanPlayer> {
    if (getter == "playerid") {
      return await this.getJsonMethod("/bfban/checkban", {
        names: "",
        userids: "",
        personaids: usernames.toString(),
      });
    }
    if (getter == "userid") {
      return await this.getJsonMethod("/bfban/checkban", {
        names: "",
        userids: usernames.toString(),
        personaids: "",
      });
    }
    return await this.getJsonMethod("/bfban/checkban", {
      names: usernames.toString(),
      userids: "",
      personaids: "",
    });
  }
}

export const GametoolsApi = new ApiProvider();
