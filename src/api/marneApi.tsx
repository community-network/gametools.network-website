import { capitalizeFirstLetter } from "../components/functions/capitalizeFirstLetter";
import { getCurrentCountry } from "../locales/config";
import JsonClient from "./Json";
import {
  DetailedServerInfo,
  ServerSearch,
  ServerSettings,
} from "./ReturnTypes";
import { getName } from "i18n-iso-countries";

export interface PlayerReturn {
  name: string;
  team: number;
}

export interface ModListReturn {
  category: string;
  file_name: string;
  link: string;
  name: string;
  version: string;
}

export interface RotationReturn {
  map: string;
  mode: string;
}

export interface ServerInfoReturn {
  id: number;
  name: string;
  mapName: string;
  gameMode: string;
  maxPlayers: number;
  tickRate: number;
  password: number;
  needSameMods: number;
  allowMoreMods: number;
  modList: ModListReturn[] | "";
  playerList: PlayerReturn[] | "";
  currentPlayers: number;
  region: string;
  country: string;
}

export interface ServerListReturn {
  servers: ServerInfoReturn[];
}

export interface DetailedServerReturn {
  name: string;
  description: string;
  region: string;
  country: string;
  mapName: string;
  gameMode: string;
  map: string;
  mode: string;
  maxPlayers: number;
  needSameMods: boolean;
  allowMoreMods: boolean;
  statsSystem: number;
  tickRate: number;
  password: boolean;
  settings: ServerSettings[];
  rotation?: RotationReturn[];
  modList: ModListReturn[] | "";
  playerList: PlayerReturn[] | "";
  currentPlayers: number;
}

interface ServerSearchInfo {
  searchTerm: string;
  limit?: string;
  regions?: string[];
}

interface DetailedSearch {
  getter: string;
  serverName: string;
  region: string;
}

const modes = {
  Conquest0: "Conquest",
  Rush0: "Rush",
  BreakThrough0: "Shock Operations",
  BreakThroughLarge0: "Operations",
  Possession0: "War pigeons",
  TugOfWar0: "Frontlines",
  AirAssault0: "Air assault",
  Domination0: "Domination",
  TeamDeathMatch0: "Team Deathmatch",
  ZoneControl0: "Rush",
};

const smallmodes = {
  Conquest0: "CQ",
  Rush0: "RS",
  BreakThrough0: "SO",
  BreakThroughLarge0: "OP",
  Possession0: "WP",
  TugOfWar0: "FL",
  AirAssault0: "AA",
  Domination0: "DM",
  TeamDeathMatch0: "TM",
  ZoneControl0: "RS",
};

const to_internal = {
  "sinai desert": "MP_Desert",
  "ballroom blitz": "MP_Chateau",
  "empire's edge": "MP_ItalianCoast",
  "st quentin scar": "MP_Scar",
  "prise de tahure": "MP_Shoveltown",
  "monte grappa": "MP_MountainFort",
  "fao fortress": "MP_FaoFortress",
  "giant's shadow": "MP_Giant",
  rupture: "MP_Graveyard",
  amiens: "MP_Amiens",
  suez: "MP_Suez",
  "fort de vaux": "MP_Underworld",
  "nivelle nights": "MP_Trench",
  soissons: "MP_Fields",
  "verdun heights": "MP_Verdun",
  albion: "MP_Islands",
  tsaritsyn: "MP_Tsaritsyn",
  "łupków pass": "MP_Ravines",
  "achi baba": "MP_Ridge",
  "heligoland bight": "MP_Naval",
  caporetto: "MP_River",
  "river somme": "MP_Offensive",
  passchendaele: "MP_Hell",
  galicia: "MP_Valley",
  "volga river": "MP_Volga",
  "brusilov keep": "MP_Bridge",
  "cape helles": "MP_Beachhead",
  zeebrugge: "MP_Harbor",
  "argonne forest": "MP_Forest",
  "razor's edge": "MP_Alps",
  "london calling": "MP_Blitz",
  "london calling: Scourge": "MP_London",
};

const maps = {
  MP_Amiens: "Amiens",
  MP_Chateau: "Ballroom Blitz",
  MP_Desert: "Sinai Desert",
  MP_FaoFortress: "Fao Fortress",
  MP_Forest: "Argonne Forest",
  MP_ItalianCoast: "Empire's Edge",
  MP_MountainFort: "Monte Grappa",
  MP_Scar: "St Quentin Scar",
  MP_Suez: "Suez",
  MP_Giant: "Giant's Shadow",
  MP_Fields: "Soissons",
  MP_Graveyard: "Rupture",
  MP_Underworld: "Fort De Vaux",
  MP_Verdun: "Verdun Heights",
  MP_ShovelTown: "Prise de Tahure",
  MP_Trench: "Nivelle Nights",
  MP_Bridge: "Brusilov Keep",
  MP_Islands: "Albion",
  MP_Ravines: "Łupków Pass",
  MP_Tsaritsyn: "Tsaritsyn",
  MP_Valley: "Galicia",
  MP_Volga: "Volga River",
  MP_Beachhead: "Cape Helles",
  MP_Harbor: "Zeebrugge",
  MP_Naval: "Heligoland Bight",
  MP_Ridge: "Achi Baba",
  MP_Alps: "Razor's Edge",
  MP_Blitz: "London Calling",
  MP_Hell: "Passchendaele",
  MP_London: "London Calling: Scourge",
  MP_Offensive: "River Somme",
  MP_River: "Caporetto",
};

const map_image = {
  MP_Amiens:
    "https://cdn.gametools.network/maps/bf1/MP_Amiens_LandscapeLarge-e195589d.jpg",
  MP_Chateau:
    "https://cdn.gametools.network/maps/bf1/MP_Chateau_LandscapeLarge-244d5987.jpg",
  MP_Desert:
    "https://cdn.gametools.network/maps/bf1/MP_Desert_LandscapeLarge-d8f749da.jpg",
  MP_FaoFortress:
    "https://cdn.gametools.network/maps/bf1/MP_FaoFortress_LandscapeLarge-cad1748e.jpg",
  MP_Forest:
    "https://cdn.gametools.network/maps/bf1/MP_Forest_LandscapeLarge-dfbbe910.jpg",
  MP_ItalianCoast:
    "https://cdn.gametools.network/maps/bf1/MP_ItalianCoast_LandscapeLarge-1503eec7.jpg",
  MP_MountainFort:
    "https://cdn.gametools.network/maps/bf1/MP_MountainFort_LandscapeLarge-8a517533.jpg",
  MP_Scar:
    "https://cdn.gametools.network/maps/bf1/MP_Scar_LandscapeLarge-ee25fbd6.jpg",
  MP_Suez:
    "https://cdn.gametools.network/maps/bf1/MP_Suez_LandscapeLarge-f630fc76.jpg",
  MP_Giant:
    "https://cdn.gametools.network/maps/bf1/MP_Giant_LandscapeLarge-dd0b93ef.jpg",
  MP_Fields:
    "https://cdn.gametools.network/maps/bf1/MP_Fields_LandscapeLarge-5f53ddc4.jpg",
  MP_Graveyard:
    "https://cdn.gametools.network/maps/bf1/MP_Graveyard_LandscapeLarge-bd1012e6.jpg",
  MP_Underworld:
    "https://cdn.gametools.network/maps/bf1/MP_Underworld_LandscapeLarge-b6c5c7e7.jpg",
  MP_Verdun:
    "https://cdn.gametools.network/maps/bf1/MP_Verdun_LandscapeLarge-1a364063.jpg",
  MP_ShovelTown:
    "https://cdn.gametools.network/maps/bf1/MP_Shoveltown_LandscapeLarge-d0aa5920.jpg",
  MP_Trench:
    "https://cdn.gametools.network/maps/bf1/MP_Trench_LandscapeLarge-dbd1248f.jpg",
  MP_Bridge:
    "https://cdn.gametools.network/maps/bf1/MP_Bridge_LandscapeLarge-5b7f1b62.jpg",
  MP_Islands:
    "https://cdn.gametools.network/maps/bf1/MP_Islands_LandscapeLarge-c9d8272b.jpg",
  MP_Ravines:
    "https://cdn.gametools.network/maps/bf1/MP_Ravines_LandscapeLarge-1fe0d3f6.jpg",
  MP_Tsaritsyn:
    "https://cdn.gametools.network/maps/bf1/MP_Tsaritsyn_LandscapeLarge-2dbd3bf5.jpg",
  MP_Valley:
    "https://cdn.gametools.network/maps/bf1/MP_Valley_LandscapeLarge-8dc1c7ca.jpg",
  MP_Volga:
    "https://cdn.gametools.network/maps/bf1/MP_Volga_LandscapeLarge-6ac49c25.jpg",
  MP_Beachhead:
    "https://cdn.gametools.network/maps/bf1/MP_Beachhead_LandscapeLarge-5a13c655.jpg",
  MP_Harbor:
    "https://cdn.gametools.network/maps/bf1/MP_Harbor_LandscapeLarge-d382c7ea.jpg",
  MP_Naval:
    "https://cdn.gametools.network/maps/bf1/MP_Naval_LandscapeLarge-dc2e8daf.jpg",
  MP_Ridge:
    "https://cdn.gametools.network/maps/bf1/MP_Ridge_LandscapeLarge-8c057a19.jpg",
  MP_Alps:
    "https://cdn.gametools.network/maps/bf1/MP_Alps_LandscapeLarge-7ab30e3e.jpg",
  MP_Blitz:
    "https://cdn.gametools.network/maps/bf1/MP_Blitz_LandscapeLarge-5e26212f.jpg",
  MP_Hell:
    "https://cdn.gametools.network/maps/bf1/MP_Hell_LandscapeLarge-7176911c.jpg",
  MP_London:
    "https://cdn.gametools.network/maps/bf1/MP_London_LandscapeLarge-0b51fe46.jpg",
  MP_Offensive:
    "https://cdn.gametools.network/maps/bf1/MP_Offensive_LandscapeLarge-6dabdea3.jpg",
  MP_River:
    "https://cdn.gametools.network/maps/bf1/MP_River_LandscapeLarge-21443ae9.jpg",
};

export class ApiProvider extends JsonClient {
  private serverCache: ServerListReturn = { servers: [] };
  private serverCacheAge: number;

  constructor() {
    super();
  }

  /**
   * Serverlist of marne
   * @returns ServerInfoReturn[]
   */
  async serverList({
    searchTerm,
    limit,
    regions,
  }: ServerSearchInfo): Promise<ServerSearch> {
    if (
      this.serverCacheAge === undefined ||
      // update only once every 30 seconds
      (Date.now() - this.serverCacheAge) / 1000 > 30
    ) {
      const r = await fetch(`https://marne.io/api/srvlst/`);
      this.serverCache = await r.json();
      this.serverCacheAge = Date.now();
    }
    const country = await getCurrentCountry();
    const servers = this.serverCache.servers
      .map((server) => {
        const internalMapName: string = server?.mapName
          ?.split("/")
          .slice(-1)[0];
        return {
          gameId: server?.id.toString(),
          prefix: server?.name,
          currentMap: maps[internalMapName],
          currentMapImage: map_image[internalMapName],
          url: map_image[internalMapName],
          inQue: 0,
          mode: modes[server?.gameMode],
          official: false,
          ownerId: 0,
          region: server?.region,
          country: getName(server?.country, country),
          platform: "pc",
          playerAmount: server?.currentPlayers,
          maxPlayerAmount: server?.maxPlayers,
          serverInfo: "",
          smallMode: smallmodes[server?.gameMode],
        };
      })
      .filter((server) => {
        return (
          server.prefix.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (regions.includes(server.region.toLowerCase()) ||
            regions.includes("all"))
        );
      })
      .slice(0, !Number.isNaN(Number(limit)) ? Number(limit) : 10);
    return {
      cache: false,
      servers,
      apiUrl: "https://marne.io/api/srvlst/",
    };
  }

  async server({
    getter,
    serverName,
    region,
  }: DetailedSearch): Promise<DetailedServerInfo> {
    let gameId = serverName;
    if (getter === "name") {
      const servers = await this.serverList({
        searchTerm: serverName,
        limit: "1",
        regions: [region],
      });
      gameId = servers?.servers[0]?.gameId;
    }

    const r = await fetch(`https://marne.io/api/srvlst/${gameId}`);
    const result: DetailedServerReturn = await r.json();
    const internalMapName: string = result?.mapName?.split("/").slice(-1)[0];
    return {
      apiUrl: `https://marne.io/api/srvlst/${gameId}`,
      cache: false,
      prefix: result?.name,
      currentMap: maps[internalMapName],
      currentMapImage: map_image[internalMapName],
      inQue: 0,
      mode: modes[result?.gameMode],
      official: false,
      region: result?.region,
      country: getName(result?.country, await getCurrentCountry()),
      platform: "pc",
      playerAmount: result?.currentPlayers,
      maxPlayerAmount: result?.maxPlayers,
      serverInfo: null,
      smallmode: smallmodes[result?.gameMode],
      settings: result?.settings,
      description: result?.description,
      rotation: result?.rotation?.map(
        (current: RotationReturn, index: number) => {
          const internalMapName: string =
            current?.map?.split("/").slice(-1)[0] || "";
          console.log(current);
          return {
            index,
            mapname:
              maps[internalMapName] ||
              capitalizeFirstLetter(current?.map || ""),
            mode:
              modes[current?.mode] ||
              capitalizeFirstLetter(current?.mode || ""),
            image: map_image[internalMapName] || "",
          };
        },
      ),
      players:
        result?.playerList === ""
          ? []
          : result?.playerList?.map((current: PlayerReturn) => {
              return {
                name: current?.name,
                team: current?.team,
              };
            }),
    };
  }
}

export const bf1MarneApi = new ApiProvider();
