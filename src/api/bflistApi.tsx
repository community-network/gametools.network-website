import JsonClient from "./Json";

interface ServerinfoRequest {
  game: string;
  serverIp: string;
  serverPort: number;
}

export interface PlayerInfo {
  pid: number;
  name: string;
  tag: string;
  score: number;
  kills: number;
  deaths: number;
  ping: number;
  team: number;
  teamLabel: string;
  aibot: boolean;
}

export interface TeamInfo {
  index: number;
  label: string;
  // typescript stuff
  players: PlayerInfo[];
}

interface ServerInfoReturn {
  teams?: TeamInfo[];
  players: PlayerInfo[];
}

export class ApiProvider extends JsonClient {
  constructor() {
    super();
  }

  /**
   * Return serverinfo
   * @param param0 ServerinfoRequest
   * @returns Promise<ServerInfoReturn>
   */
  async serverPlayerlist({
    game,
    serverIp,
    serverPort,
  }: ServerinfoRequest): Promise<ServerInfoReturn> {
    const r = await fetch(
      `https://api.bflist.io/${game}/v1/servers/${serverIp}:${serverPort}`,
    );
    return r.json();
  }
}

export const bfListApi = new ApiProvider();
