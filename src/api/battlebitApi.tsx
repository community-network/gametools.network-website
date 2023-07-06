import JsonClient from "./Json";
import { ServerSearch } from "./ReturnTypes";

export interface ServerInfoReturn {
  Name: string;
  Map: string;
  MapSize: string;
  Gamemode: string;
  Region: string;
  Players: number;
  QueuePlayers: number;
  MaxPlayers: number;
  Hz: number;
  DayNight: string;
  IsOfficial: boolean;
  HasPassword: boolean;
  AntiCheat: string;
  Build: string;
}

interface ServerSearchInfo {
  searchTerm: string;
  region?: string;
  limit?: string;
}

export class ApiProvider extends JsonClient {
  constructor() {
    super();
  }

  /**
   * Serverlist of battlebit
   * @returns ServerInfoReturn[]
   */
  async serverList({
    searchTerm,
    region,
    limit,
  }: ServerSearchInfo): Promise<ServerSearch> {
    const modes = {
      CONQ: "Conquest",
      FRONTLINE: "Frontlines",
      RUSH: "Rush",
      DOMI: "Domination",
      TDM: "Teamdeathmatch",
      INFCONQ: "Infantry Conquest",
      GunGameFFA: "Gungame free-for-all",
      FFA: "Free-for-all",
      GunGameTeam: "Gungame team",
      ELI: "Elimination",
    };

    const smallmodes = {
      CONQ: "CQ",
      FRONTLINE: "FL",
      RUSH: "RS",
      DOMI: "DM",
      TDM: "TDM",
      INFCONQ: "IQ",
      GunGameFFA: "GGF",
      FFA: "FFA",
      GunGameTeam: "GGT",
      ELI: "ELI",
    };

    const r = await fetch(
      `https://publicapi.battlebit.cloud/Servers/GetServerList`,
    );
    const result: ServerInfoReturn[] = await r.json();
    const servers = result
      .map((server) => {
        return {
          prefix: `${server.IsOfficial ? "[Official]" : "[Community]"} - ${
            server.Name
          }`,
          currentMap: server.Map,
          currentMapImage: `https://cdn.gametools.network/maps/battlebit/${server.Map}.jpg`,
          url: `https://cdn.gametools.network/maps/battlebit/${server.Map}.jpg`,
          inQue: server.QueuePlayers,
          mode:
            modes[server.Gamemode] !== ""
              ? modes[server.Gamemode]
              : server.Gamemode,
          official: server.IsOfficial,
          ownerId: 0,
          platform: "pc",
          playerAmount: server.Players,
          maxPlayerAmount: server.MaxPlayers,
          region: server.Region,
          serverInfo: "",
          smallMode: smallmodes[server.Gamemode],
          smallmode: smallmodes[server.Gamemode],
        };
      })
      .filter((server) => {
        return (
          server.prefix.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (server.region === region || region === "all")
        );
      })
      .slice(0, !Number.isNaN(Number(limit)) ? Number(limit) : 10);

    return { cache: false, servers };
  }
}

export const battlebitApi = new ApiProvider();
