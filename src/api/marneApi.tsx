import JsonClient from "./Json";
import { ServerSearch } from "./ReturnTypes";

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

interface ServerSearchInfo {
  searchTerm: string;
  limit?: string;
  regions?: string[];
}

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
    const maps = {
      "Levels/MP/MP_Amiens/MP_Amiens": "Amiens",
      "Levels/MP/MP_Chateau/MP_Chateau": "Ballroom Blitz",
      "Levels/MP/MP_Desert/MP_Desert": "Sinai Desert",
      "Levels/MP/MP_FaoFortress/MP_FaoFortress": "Fao Fortress",
      "Levels/MP/MP_Forest/MP_Forest": "Argonne Forest",
      "Levels/MP/MP_ItalianCoast/MP_ItalianCoast": "Empire's Edge",
      "Levels/MP/MP_MountainFort/MP_MountainFort": "Monte Grappa",
      "Levels/MP/MP_Scar/MP_Scar": "St Quentin Scar",
      "Levels/MP/MP_Suez/MP_Suez": "Suez",
      "Xpack0/Levels/MP/MP_Giant/MP_Giant": "Giant's Shadow",
      "Xpack1/Levels/MP_Fields/MP_Fields": "Soissons",
      "Xpack1/Levels/MP_Graveyard/MP_Graveyard": "Rupture",
      "Xpack1/Levels/MP_Underworld/MP_Underworld": "Fort De Vaux",
      "Xpack1/Levels/MP_Verdun/MP_Verdun": "Verdun Heights",
      "Xpack1-3/Levels/MP_ShovelTown/MP_ShovelTown": "Prise de Tahure",
      "Xpack1-3/Levels/MP_Trench/MP_Trench": "Nivelle Nights",
      "Xpack2/Levels/MP/MP_Bridge/MP_Bridge": "Brusilov Keep",
      "Xpack2/Levels/MP/MP_Islands/MP_Islands": "Albion",
      "Xpack2/Levels/MP/MP_Ravines/MP_Ravines": "Łupków Pass",
      "Xpack2/Levels/MP/MP_Tsaritsyn/MP_Tsaritsyn": "Tsaritsyn",
      "Xpack2/Levels/MP/MP_Valley/MP_Valley": "Galicia",
      "Xpack2/Levels/MP/MP_Volga/MP_Volga": "Volga River",
      "Xpack3/Levels/MP/MP_Beachhead/MP_Beachhead": "Cape Helles",
      "Xpack3/Levels/MP/MP_Harbor/MP_Harbor": "Zeebrugge",
      "Xpack3/Levels/MP/MP_Naval/MP_Naval": "Heligoland Bight",
      "Xpack3/Levels/MP/MP_Ridge/MP_Ridge": "Achi Baba",
      "Xpack4/Levels/MP/MP_Alps/MP_Alps": "Razor's Edge",
      "Xpack4/Levels/MP/MP_Blitz/MP_Blitz": "London Calling",
      "Xpack4/Levels/MP/MP_Hell/MP_Hell": "Passchendaele",
      "Xpack4/Levels/MP/MP_London/MP_London": "London Calling: Scourge",
      "Xpack4/Levels/MP/MP_Offensive/MP_Offensive": "River Somme",
      "Xpack4/Levels/MP/MP_River/MP_River": "Caporetto",
    };

    const map_image = {
      "Levels/MP/MP_Amiens/MP_Amiens":
        "https://cdn.gametools.network/maps/bf1/MP_Amiens_LandscapeLarge-e195589d.jpg",
      "Levels/MP/MP_Chateau/MP_Chateau":
        "https://cdn.gametools.network/maps/bf1/MP_Chateau_LandscapeLarge-244d5987.jpg",
      "Levels/MP/MP_Desert/MP_Desert":
        "https://cdn.gametools.network/maps/bf1/MP_Desert_LandscapeLarge-d8f749da.jpg",
      "Levels/MP/MP_FaoFortress/MP_FaoFortress":
        "https://cdn.gametools.network/maps/bf1/MP_FaoFortress_LandscapeLarge-cad1748e.jpg",
      "Levels/MP/MP_Forest/MP_Forest":
        "https://cdn.gametools.network/maps/bf1/MP_Forest_LandscapeLarge-dfbbe910.jpg",
      "Levels/MP/MP_ItalianCoast/MP_ItalianCoast":
        "https://cdn.gametools.network/maps/bf1/MP_ItalianCoast_LandscapeLarge-1503eec7.jpg",
      "Levels/MP/MP_MountainFort/MP_MountainFort":
        "https://cdn.gametools.network/maps/bf1/MP_MountainFort_LandscapeLarge-8a517533.jpg",
      "Levels/MP/MP_Scar/MP_Scar":
        "https://cdn.gametools.network/maps/bf1/MP_Scar_LandscapeLarge-ee25fbd6.jpg",
      "Levels/MP/MP_Suez/MP_Suez":
        "https://cdn.gametools.network/maps/bf1/MP_Suez_LandscapeLarge-f630fc76.jpg",
      "Xpack0/Levels/MP/MP_Giant/MP_Giant":
        "https://cdn.gametools.network/maps/bf1/MP_Giant_LandscapeLarge-dd0b93ef.jpg",
      "Xpack1/Levels/MP_Fields/MP_Fields":
        "https://cdn.gametools.network/maps/bf1/MP_Fields_LandscapeLarge-5f53ddc4.jpg",
      "Xpack1/Levels/MP_Graveyard/MP_Graveyard":
        "https://cdn.gametools.network/maps/bf1/MP_Graveyard_LandscapeLarge-bd1012e6.jpg",
      "Xpack1/Levels/MP_Underworld/MP_Underworld":
        "https://cdn.gametools.network/maps/bf1/MP_Underworld_LandscapeLarge-b6c5c7e7.jpg",
      "Xpack1/Levels/MP_Verdun/MP_Verdun":
        "https://cdn.gametools.network/maps/bf1/MP_Verdun_LandscapeLarge-1a364063.jpg",
      "Xpack1-3/Levels/MP_ShovelTown/MP_ShovelTown":
        "https://cdn.gametools.network/maps/bf1/MP_Shoveltown_LandscapeLarge-d0aa5920.jpg",
      "Xpack1-3/Levels/MP_Trench/MP_Trench":
        "https://cdn.gametools.network/maps/bf1/MP_Trench_LandscapeLarge-dbd1248f.jpg",
      "Xpack2/Levels/MP/MP_Bridge/MP_Bridge":
        "https://cdn.gametools.network/maps/bf1/MP_Bridge_LandscapeLarge-5b7f1b62.jpg",
      "Xpack2/Levels/MP/MP_Islands/MP_Islands":
        "https://cdn.gametools.network/maps/bf1/MP_Islands_LandscapeLarge-c9d8272b.jpg",
      "Xpack2/Levels/MP/MP_Ravines/MP_Ravines":
        "https://cdn.gametools.network/maps/bf1/MP_Ravines_LandscapeLarge-1fe0d3f6.jpg",
      "Xpack2/Levels/MP/MP_Tsaritsyn/MP_Tsaritsyn":
        "https://cdn.gametools.network/maps/bf1/MP_Tsaritsyn_LandscapeLarge-2dbd3bf5.jpg",
      "Xpack2/Levels/MP/MP_Valley/MP_Valley":
        "https://cdn.gametools.network/maps/bf1/MP_Valley_LandscapeLarge-8dc1c7ca.jpg",
      "Xpack2/Levels/MP/MP_Volga/MP_Volga":
        "https://cdn.gametools.network/maps/bf1/MP_Volga_LandscapeLarge-6ac49c25.jpg",
      "Xpack3/Levels/MP/MP_Beachhead/MP_Beachhead":
        "https://cdn.gametools.network/maps/bf1/MP_Beachhead_LandscapeLarge-5a13c655.jpg",
      "Xpack3/Levels/MP/MP_Harbor/MP_Harbor":
        "https://cdn.gametools.network/maps/bf1/MP_Harbor_LandscapeLarge-d382c7ea.jpg",
      "Xpack3/Levels/MP/MP_Naval/MP_Naval":
        "https://cdn.gametools.network/maps/bf1/MP_Naval_LandscapeLarge-dc2e8daf.jpg",
      "Xpack3/Levels/MP/MP_Ridge/MP_Ridge":
        "https://cdn.gametools.network/maps/bf1/MP_Ridge_LandscapeLarge-8c057a19.jpg",
      "Xpack4/Levels/MP/MP_Alps/MP_Alps":
        "https://cdn.gametools.network/maps/bf1/MP_Alps_LandscapeLarge-7ab30e3e.jpg",
      "Xpack4/Levels/MP/MP_Blitz/MP_Blitz":
        "https://cdn.gametools.network/maps/bf1/MP_Blitz_LandscapeLarge-5e26212f.jpg",
      "Xpack4/Levels/MP/MP_Hell/MP_Hell":
        "https://cdn.gametools.network/maps/bf1/MP_Hell_LandscapeLarge-7176911c.jpg",
      "Xpack4/Levels/MP/MP_London/MP_London":
        "https://cdn.gametools.network/maps/bf1/MP_London_LandscapeLarge-0b51fe46.jpg",
      "Xpack4/Levels/MP/MP_Offensive/MP_Offensive":
        "https://cdn.gametools.network/maps/bf1/MP_Offensive_LandscapeLarge-6dabdea3.jpg",
      "Xpack4/Levels/MP/MP_River/MP_River":
        "https://cdn.gametools.network/maps/bf1/MP_River_LandscapeLarge-21443ae9.jpg",
    };

    if (
      this.serverCacheAge === undefined ||
      // update only once every 30 seconds
      (Date.now() - this.serverCacheAge) / 1000 > 30
    ) {
      const r = await fetch(`https://marne.io/api/srvlst/`);
      this.serverCache = await r.json();
      this.serverCacheAge = Date.now();
    }
    const servers = this.serverCache.servers
      .map((server) => {
        return {
          prefix: server.name,
          currentMap: maps[server.mapName],
          currentMapImage: map_image[server.mapName],
          url: map_image[server.mapName],
          inQue: 0,
          mode: modes[server.gameMode],
          official: false,
          ownerId: 0,
          region: server.region,
          platform: "pc",
          playerAmount: server.currentPlayers,
          maxPlayerAmount: server.maxPlayers,
          serverInfo: "",
          smallMode: smallmodes[server.gameMode],
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
}

export const bf1MarneApi = new ApiProvider();
