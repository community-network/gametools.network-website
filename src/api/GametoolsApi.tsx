import JsonClient from "./Json";
import {
  DetailedServerInfo,
  MainStats,
  PlatoonSearchResult,
  PlatoonStats,
  PlaygroundInfoReturn,
  seederPlayersReturn,
  ServerLeaderboardReturn,
  ServerList,
  ServerOwnerResult,
  ServerPlayersReturn,
  ServerSearch,
  StatsGraph,
  SusStats,
  UserGames,
} from "./ReturnTypes";
import { battlebitApi } from "./battlebitApi";
import { MarneApi } from "./marneApi";
import { newGen, newTitles } from "./static";

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

interface ServerLeaderboardV2 {
  gameId: string;
  playernameFilter: string;
  amount: string;
  sort: string;
  days: string;
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
  regions?: string[];
  platform?: string;
  limit?: string;
  extraQueries?: { [name: string]: string };
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

interface managerPlayerInfo {
  playerId: number;
}
interface managerPlayersInfo {
  playerIds: number[];
}

interface managerPlayer {
  id: number;
  avatar: string;
  name: string;
  vban: { [Key: string]: { bannedUntil: string; reason: string } };
  ingame: string[];
  otherNames: {
    updateTimestamp: string;
    usedNames: string[];
  };
  bfban: bfbanPlayers;
}

export interface managerPlayers {
  vban: {
    [name: string]: { [name: string]: { bannedUntil: string; reason: string } };
  };
  otherNames: {
    [name: string]: {
      updateTimestamp: string;
      usedNames: string[];
    };
  };
  bfban: { [name: string]: bfbanPlayers };
  bfeac: number[];
}

export interface bfbanPlayer {
  apiUrl: string;
  names: { [name: string]: bfbanPlayers };
  userids: { [name: string]: bfbanPlayers };
  personaids: { [name: string]: bfbanPlayers };
}

export interface bfeacPlayer {
  apiUrl: string;
  personaids: number[];
}

export interface bfbanPlayers {
  personaId?: string;
  url: string;
  status: number;
  hacker: boolean;
  originId: string;
  originPersonaId: string;
  originUserId: string;
  cheatMethods: string;
}

export interface GlobalGraphReturn {
  mode: string;
  apiUrl: string;
  serverAmount: number[];
  soldierAmount: number[];
  queueAmount: number[];
  spectatorAmount: number[];
  timeStamps: string[];
  start: number;
  end: number;
}

export interface BF2042Player {
  nucleusId: number;
  platform: string;
  name: string;
  personaId: number;
  platformId: number;
}

export interface BF2042PlayerSearchReturn {
  results: BF2042Player[];
}

export interface Bf1PlayerReturn {
  userId: number;
  avatar: string;
  userName: string;
  id: number;
}

export class ApiProvider extends JsonClient {
  async stats({
    game,
    type,
    getter,
    userName,
    lang,
    platform = "pc",
  }: PlayerInfo): Promise<MainStats> {
    const defaultParams = {
      format_values: "false",
      lang: lang,
      platform: platform,
    };

    if (game.includes("marne")) {
      let playerId;
      if (getter !== "playerid") {
        const result = await this.bf1PlayerSearch({
          name: encodeURIComponent(userName),
        });
        playerId = result.id;
      } else {
        playerId = userName;
      }
      return await MarneApi.stats({
        game: game,
        playerId: playerId,
      });
    }
    if (getter == "playerid") {
      return await this.getJsonMethod(`/${game}/${type}/`, {
        ...defaultParams,
        playerid: userName,
      });
    }
    return await this.getJsonMethod(`/${game}/${type}/`, {
      ...defaultParams,
      name: encodeURIComponent(userName),
    });
  }

  async currentServer({
    game,
    playerId,
    lang,
    platform = "pc",
  }: {
    game: string;
    playerId: number;
    lang: string,
    platform: string;
  }): Promise<{
    [playerId: number]: ServerList;
    apiUrl: string;
    cache: boolean;
  } | undefined> {
    if (!newTitles.includes(game)) {
      return undefined;
    }
    return await this.getJsonMethod(`/manager/currentserver/${game}`, {
      platform: platform,
      lang: lang,
      player_ids: playerId.toString(),
    });
  }

  async sus({
    game,
    playerId,
    platform = "pc",
  }: {
    game: string;
    playerId: number;
    platform: string;
  }): Promise<SusStats | undefined> {
    if (!newTitles.includes(game)) {
      return undefined;
    }
    return await this.getJsonMethod(`/${game}/sus/`, {
      platform: platform,
      playerid: playerId.toString(),
    });
  }

  async statsarray({
    game,
    getter,
    userName,
    platform = "pc",
  }: {
    game: string;
    getter: string;
    userName: string;
    platform?: string;
  }): Promise<StatsGraph> {
    if (userName == undefined) return null;
    if (getter == "playerid") {
      return await this.getJsonMethod(`/${game}/statsarray/`, {
        playerid: userName,
        platform: platform,
      });
    }
    return await this.getJsonMethod(`/${game}/statsarray/`, {
      name: encodeURIComponent(userName),
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
        include_emblem: "true",
      });
    }
    return await this.getJsonMethod(`/bfglobal/games`, {
      name: encodeURIComponent(userName),
      platform: platform,
      include_emblem: "true",
    });
  }

  async platoonSearch({
    name,
    platform,
    lang,
  }: PlatoonSearch): Promise<PlatoonSearchResult> {
    if (name.length < 3)
      return {
        platoons: [],
        cache: false,
        apiUrl: this.constructApiUrl(`/bfglobal/platoons/`, {
          name: name,
          platform: platform,
          lang: lang,
        }),
      };
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
    const defaultParams = {
      lang: lang,
      region: region,
      platform: platform,
      service: gameStuff[1],
      return_ownername: with_ownername.toString(),
    };
    if (game == "battlebit") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any = await battlebitApi.serverList({
        searchTerm: serverName,
        regions: [region],
        limit: "1",
      });
      return result?.servers[0];
    }
    if (game.includes("marne")) {
      return await MarneApi.server({
        game,
        getter,
        serverName,
        region: region,
      });
    }
    if ((getter == "gameid" || getter == "serverid") && game == "bf2042") {
      return await this.getJsonMethod(`/${gameStuff[0]}/detailedserver/`, {
        serverid: serverName,
        ...defaultParams,
      });
    } else if (getter == "gameid") {
      return await this.getJsonMethod(`/${gameStuff[0]}/detailedserver/`, {
        gameid: serverName,
        ...defaultParams,
      });
    } else if (getter == "serverip") {
      const result = await this.getJsonMethod(`/${gameStuff[0]}/servers`, {
        name: encodeURIComponent(serverName),
        type: "ip",
        service: gameStuff[1],
        platform: platform,
      });
      return result?.servers[0];
    }
    return await this.getJsonMethod(`/${gameStuff[0]}/detailedserver/`, {
      name: encodeURIComponent(serverName),
      ...defaultParams,
    });
  }

  async playground({
    game,
    getter,
    playground,
    lang,
    with_ownername = true,
  }: PlaygroundInfo): Promise<PlaygroundInfoReturn> {
    const defaultParams = {
      lang: lang,
      return_ownername: with_ownername.toString(),
    };
    if (getter == "experiencecode") {
      return await this.getJsonMethod(`/${game}/playground/`, {
        experiencecode: playground,
        ...defaultParams,
      });
    }
    return await this.getJsonMethod(`/${game}/playground/`, {
      playgroundid: playground,
      ...defaultParams,
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
    if (gameId == undefined) {
      return undefined;
    }
    return await this.getJsonMethod(`/manager/leaderboard/`, {
      gameId: gameId,
      amount: amount,
      sort: sort,
    });
  }

  async serverLeaderboardV2({
    gameId,
    playernameFilter,
    amount,
    sort,
    days
  }: ServerLeaderboardV2): Promise<ServerLeaderboardReturn> {
    if (gameId == undefined) {
      return undefined;
    }
    return await this.getJsonMethod(`/manager/leaderboard/v2/`, {
      gameId: gameId,
      player_name_filter: playernameFilter,
      amount: amount,
      sort: sort,
      days: days
    });
  }

  async serverPlayerlist({
    game,
    gameId,
  }: serverPlayerlist): Promise<ServerPlayersReturn> {
    if (gameId == undefined) {
      return undefined;
    }
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
    regions = ["all"],
    platform = "pc",
    limit = "10",
    extraQueries = {},
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

    if (game == "battlebit") {
      return await battlebitApi.serverList({ searchTerm, regions, limit });
    }
    if (game.includes("marne")) {
      return await MarneApi.serverList({ game, searchTerm, regions, limit });
    }
    const result = await this.getJsonMethod(`/${gameStuff[0]}/servers/`, {
      name: encodeURIComponent(serverName),
      experiencename: encodeURIComponent(experienceName),
      lang: lang,
      region: regions.join(game === "bf2042" ? ";" : ","),
      platform: platform,
      service: gameStuff[1],
      limit: limit,
      ...extraQueries,
    });
    // hard limit to 4 on main page
    if (limit === "4") {
      result.servers = result?.servers?.slice(0, 4);
    }
    return result;
  }

  async graphs({
    game,
    days,
    region = "all",
    platform = "pc",
    type = "amounts",
  }: GraphInfo): Promise<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [name: string]: any;
  }> {
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
    if (game == "battlebit") {
      name = name.replace("[Official] - ", "").replace("[Community] - ", "");
    }

    if (platform == "all") {
      platform = "pc";
    }
    const defaultParams = {
      platform: platform,
      service: gameStuff[1],
      days: days,
    };
    if (getter == "serverid") {
      return await this.getJsonMethod(`/${gameStuff[0]}/serverarray/`, {
        ...defaultParams,
        serverid: name,
      });
    } else if (getter == "gameid") {
      return await this.getJsonMethod(`/${gameStuff[0]}/serverarray/`, {
        ...defaultParams,
        gameid: name,
      });
    } else if (getter == "serverip") {
      return await this.getJsonMethod(`/${gameStuff[0]}/serverarray`, {
        name: encodeURIComponent(name),
        type: "ip",
        ...defaultParams,
      });
    }
    return await this.getJsonMethod(`/${gameStuff[0]}/serverarray/`, {
      servername: encodeURIComponent(name),
      ...defaultParams,
    });
  }

  async globalGraph(): Promise<GlobalGraphReturn> {
    return await this.getJsonMethod(`/bfglobal/totalstatusarray/`, {});
  }

  async managerCheckPlayer({
    playerId,
  }: managerPlayerInfo): Promise<managerPlayer> {
    return await this.getJsonMethod("/manager/checkban", {
      playerid: playerId.toString(),
    });
  }

  async managerCheckPlayers({
    playerIds,
  }: managerPlayersInfo): Promise<managerPlayers> {
    return await this.getJsonMethod("/manager/checkbans", {
      personaids: playerIds.toString(),
    });
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

  async bfeacCheckPlayers({
    playerIds,
  }: {
    playerIds: string[];
  }): Promise<bfeacPlayer> {
    return await this.getJsonMethod("/bfeac/checkban", {
      names: "",
      userids: "",
      personaids: playerIds.toString(),
    });
  }

  async bf1PlayerSearch({ name }: { name: string }): Promise<Bf1PlayerReturn> {
    return await this.getJsonMethod(`/bf1/player/`, {
      name: name,
    });
  }

  async bf2042PlayerSearch({
    name,
  }: {
    name: string;
  }): Promise<BF2042PlayerSearchReturn> {
    return await this.getJsonMethod(`/bf2042/player/`, {
      name: name,
    });
  }
}

export const GametoolsApi = new ApiProvider();
