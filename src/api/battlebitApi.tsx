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
      GunGameFFA: "Gungame free-for-all",
    };

    const smallmodes = {
      CONQ: "CQ",
      FRONTLINE: "FL",
      RUSH: "RS",
      DOMI: "DM",
      TDM: "TDM",
      GunGameFFA: "GM",
    };

    const r = await fetch(
      `https://publicapi.battlebit.cloud/Servers/GetServerList`,
    );
    const result: ServerInfoReturn[] = await r.json();
    const servers = result
      .filter((server) => {
        return (
          server.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (server.Region === region || region === "all")
        );
      })
      .map((server) => {
        return {
          prefix: `${server.IsOfficial ? "[Official]" : "[Community]"} - ${
            server.Name
          }`,
          currentMap: server.Map,
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
        };
      })
      .slice(0, !Number.isNaN(Number(limit)) ? Number(limit) : 10);

    return { cache: false, servers };
  }
}

export const battlebitApi = new ApiProvider();
