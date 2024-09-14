import { getName } from "i18n-iso-countries";
import { capitalizeFirstLetter } from "../components/functions/capitalizeFirstLetter";
import { getCurrentCountry } from "../locales/config";
import JsonClient from "./Json";
import {
  DetailedServerInfo,
  MainStats,
  MainStatsClasses,
  MainStatsGamemode,
  MainStatsWeapon,
  ServerSearch,
  ServerSettings,
} from "./ReturnTypes";

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
  mapLongName?: string;
  modeLongName?: string;
}

export interface ServerInfoReturn {
  id: number;
  name: string;
  mapName: string;
  gameMode: string;
  maxPlayers: number;
  natType: number;
  tickRate: number;
  password: number;
  needSameMods: number;
  allowMoreMods: number;
  isModded: boolean;
  currentPlayers: number;
  currentSpectators: number;
  botCount: number;
  region: string;
  country: string;
}

export interface ServerListReturn {
  servers: ServerInfoReturn[];
}

export interface DetailedServerReturn {
  id: number;
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
  rotation?: RotationReturn[] | "";
  modList: ModListReturn[] | "";
  currentPlayers: number;
  botCount: number;
  playerList: PlayerReturn[] | "";
  spectatorList: PlayerReturn[] | "";
  natType: number;
}

interface ServerSearchInfo {
  game: string;
  searchTerm: string;
  limit?: string;
  regions?: string[];
}

interface DetailedSearch {
  game: string;
  getter: string;
  serverName: string;
  region: string;
}

const gamemode_stats = {
  mgc_roo_g: { gamemodeName: "Conquest" },
  mgtd_roo_g: { gamemodeName: "Team deathmatch" },
  mgb_roo_g: { gamemodeName: "Operations" },
  mgr_roo_g: { gamemodeName: "Rush" },
  Poss_roo_g: { gamemodeName: "War pigeons" },
  mgdo_roo_g: { gamemodeName: "Domination" },
  _roo_g: { gamemodeName: "Total" },
};
const classes_stats = {
  c_md_: { className: "Medic" },
  c_sp_: { className: "Support" },
  c_as_: { className: "Assault" },
  c_sc_: { className: "Scout" },
  c_pt_: { className: "Pilot" },
  c_tk_: { className: "Tanker" },
  c_cv_: { className: "Cavalry" },
};
const weapon_stats = {
  c_wLMGMadsS: { weaponName: "Madsen MG Storm" },
  c_wHSLuger: { weaponName: "P08 Pistol" },
  c_wXGN: { weaponName: "Incendiary Grenade" },
  c_wSPKb: { weaponName: "K Bullets" },
  c_wSMGBergT: { weaponName: "MP 18 Trench" },
  c_wHSM14: { weaponName: "Taschenpistole M1914" },
  c_wMSpik: { weaponName: "Spiked Club" },
  c_wLMGLew: { weaponName: "Lewis Gun Low Weight" },
  c_wMJam: { weaponName: "Jambiya Knife" },
  c_wLMGBARS: { weaponName: "BAR M1918 Storm" },
  c_wMCoupe: { weaponName: "Coupe Coupe" },
  c_wXATM: { weaponName: "Anti-Tank Mine" },
  c_wRSinAriP: { weaponName: "Type 38 Arisaka Patrol" },
  c_wShotBA5L: { weaponName: "12g Automatic Backbored" },
  c_wSMGB: { weaponName: "Automatico M1918 Factory" },
  c_wHSMM3: { weaponName: "No. 3 Revolver" },
  c_wSPMaxim: { weaponName: "MG 08/15" },
  c_wSMGBergB: { weaponName: "MP 18 Experimental" },
  c_wRSemWinA: { weaponName: "M1907 SL Sweeper" },
  c_wMYata: { weaponName: "Yatagan Sword" },
  c_wLMGLewR: { weaponName: "Lewis Gun Optical" },
  c_wRSemCeiR: { weaponName: "Cei-Rigotti Optical" },
  c_wXTB: { weaponName: "Tripwire Bomb — HE" },
  c_wRSinMos: { weaponName: "Mosin-Nagant M91 Infantry" },
  c_wShotBA5C: { weaponName: "12g Automatic Hunter" },
  c_wMCossack: { weaponName: "Cossack Dagger" },
  c_wLMGBART: { weaponName: "BAR M1918 Trench" },
  c_wRSemLugC: { weaponName: "Selbstlader 1906 Sniper" },
  c_wSMGBergA: { weaponName: "MP 18 Optical" },
  c_wRSinVet: { weaponName: "Vetterli-Vitali M1870/87 Infantry" },
  c_wRSemLiuS: { weaponName: "General Liu Rifle Storm" },
  c_wMNav: { weaponName: "Naval Cutlass" },
  c_wMClub: { weaponName: "Club" },
  c_wHSGasser: { weaponName: "Gasser M1870" },
  c_wHSWeb: { weaponName: "Auto Revolver" },
  c_wMOFM: { weaponName: "Ottoman Flanged Mace" },
  c_wPCA1911: { weaponName: "M1911 Extended" },
  c_wMKukri: { weaponName: "Kukri" },
  c_wXRGF: { weaponName: "Rifle Grenade — FRG" },
  c_wM1916: { weaponName: "Combat Knife" },
  c_wSMGHell: { weaponName: "Hellriegel 1915 Factory" },
  c_wSMGRib: { weaponName: "Ribeyrolles 1918 Factory" },
  c_wShotRem: { weaponName: "Model 10-A Factory" },
  c_wShotWinW: { weaponName: "M97 Trench Gun Sweeper" },
  c_wSMGCSRA: { weaponName: "RSC SMG Optical" },
  c_wShotWinC: { weaponName: "M97 Trench Gun Hunter" },
  c_wMOCS: { weaponName: "Ottoman Kilij" },
  c_wRSinSprL: { weaponName: "M1903 Sniper" },
  c_wRSemWin: { weaponName: "M1907 SL Factory" },
  c_wHSBer: { weaponName: "Modello 1915" },
  c_wRSin1917: { weaponName: "M1917 Enfield Infantry" },
  c_wRSiMaL: { weaponName: "Gewehr 98 Sniper" },
  c_wM1917: { weaponName: "US Trench Knife" },
  c_wLMGMadsT: { weaponName: "Madsen MG Trench" },
  c_wMNail: { weaponName: "Nail Knife" },
  c_wLMGCh: { weaponName: "Chauchat Low Weight" },
  c_wRSinLeb: { weaponName: "Lebel Model 1886 Infantry" },
  c_wRSinVetM: { weaponName: "Vetterli-Vitali M1870/87 Carbine" },
  c_wRSinMosC: { weaponName: "Mosin-Nagant M91 Marksman" },
  c_wSMGStX: { weaponName: "Maschinenpistole M1912/P.16 Experimental" },
  c_wShotSjoS: { weaponName: "Sjögren Inertial Slug" },
  c_wRSemRSCR: { weaponName: "RSC 1917 Optical" },
  c_wSMGCSR: { weaponName: "RSC SMG Factory" },
  c_wHSC93: { weaponName: "C93" },
  c_wRSinStyC: { weaponName: "Gewehr M.95 Marksman" },
  c_wXRGS: { weaponName: "Rifle Grenade — SMK" },
  c_wMSho: { weaponName: "Shovel" },
  c_wHSBodeo: { weaponName: "Bodeo 1889" },
  c_wRSemLiu: { weaponName: "General Liu Rifle Factory" },
  c_wMSwKnf: { weaponName: "Sawtooth Knife" },
  c_mWPry: { weaponName: "Prybar" },
  c_wLMGChB: { weaponName: "Chauchat Telescopic" },
  c_wXGG: { weaponName: "Gas Grenade" },
  c_wLMGParaU: { weaponName: "Parabellum MG14/17 Suppressive" },
  c_wLMGHotB: { weaponName: "M1909 Benét–Mercié Telescopic" },
  c_wXGI: { weaponName: "Impact Grenade" },
  c_wHSNag: { weaponName: "Nagant Revolver" },
  c_wRSemCei: { weaponName: "Cei-Rigotti Factory" },
  c_wXD: { weaponName: "Dynamite" },
  c_wSMGBT: { weaponName: "Automatico M1918 Trench" },
  c_wSPTG: { weaponName: "Tankgewehr M1918" },
  c_wRSemCeiT: { weaponName: "Cei-Rigotti Trench" },
  c_wSMGSte: { weaponName: "Maschinenpistole M1912/P.16 Storm" },
  c_wShot19U: { weaponName: "Model 1900 Slug" },
  c_wMHun: { weaponName: "French Butcher Knife" },
  c_wSMGMaxA: { weaponName: "SMG 08/18 Optical" },
  c_wSMGBS: { weaponName: "Automatico M1918 Storm" },
  c_wRSemRSC: { weaponName: "RSC 1917 Factory" },
  c_wMRAxe: { weaponName: "Russian Axe" },
  c_wLMGBergU: { weaponName: "MG15 n.A. Suppressive" },
  c_wXRCBF: { weaponName: "Crossbow Launcher — FRG" },
  c_wMBill: { weaponName: "Billhook" },
  c_wRSemR8E: { weaponName: "Autoloading 8 .25 Extended" },
  c_wRSemBSA: { weaponName: "Howell Automatic Factory" },
  c_wShotSjo: { weaponName: "Sjögren Inertial Factory" },
  c_wRSemFarR: { weaponName: "Farquhar-Hill Optical" },
  c_wRSemFedR: { weaponName: "Fedorov Avtomat Optical" },
  c_wRSinMH: { weaponName: "Martini-Henry Infantry" },
  c_wLMGBergS: { weaponName: "MG15 n.A. Storm" },
  c_wSMGHellA: { weaponName: "Hellriegel 1915 Defensive" },
  c_wRSemMonB: { weaponName: "Mondragón Sniper" },
  c_wRSemMauC: { weaponName: "Selbstlader M1916 Marksman" },
  c_wHBObrez: { weaponName: "Obrez Pistol" },
  c_wSPFlame: { weaponName: "Wex" },
  c_wShotRemU: { weaponName: "Model 10-A Slug" },
  c_wSPBGAA: { weaponName: "AA Rocket Gun" },
  c_wRSinLeeM: { weaponName: "SMLE MKIII Carbine" },
  c_wRSinSty: { weaponName: "Gewehr M.95 Infantry" },
  c_wRSinRoS: { weaponName: "Ross MkIII Marksman" },
  c_wMAxe: { weaponName: "Pickaxe" },
  c_wMBart: { weaponName: "Bartek Bludgeon" },
  c_wLMGBerg: { weaponName: "MG15 n.A. Low Weight" },
  c_wLMGPara: { weaponName: "Parabellum MG14/17 Low Weight" },
  c_wRSinTyp: { weaponName: "Type 38 Arisaka Infantry" },
  c_wMBott: { weaponName: "Broken Bottle" },
  c_wMBarb: { weaponName: "Barbed Wire Bat" },
  c_wSPRepair: { weaponName: "Repair Tool" },
  c_wMStClub: { weaponName: "Raider Club" },
  c_wMTrKnf: { weaponName: "Trench Knife" },
  c_wHSColtH: { weaponName: "Hellfighter M1911" },
  c_wHSMauser: { weaponName: "C96" },
  c_wSPFlare: { weaponName: "Flare Gun — Spot" },
  c_wLMGPer: { weaponName: "Perino Model 1908 Low Weight" },
  c_wLMGHotR: { weaponName: "M1909 Benét–Mercié Optical" },
  c_wSPDefib: { weaponName: "Medical Syringe" },
  c_wRSemFarS: { weaponName: "Farquhar-Hill Storm" },
  c_wShotWinP: { weaponName: "Hellfighter Trench Shotgun" },
  c_wLMG0818S: { weaponName: "lMG 08/18 Suppressive" },
  c_wRSemMauR: { weaponName: "Selbstlader M1916 Optical" },
  c_wMClvr: { weaponName: "Meat Cleaver" },
  c_wPCSP08: { weaponName: "P08 Artillerie" },
  c_wRSinMHL: { weaponName: "Martini-Henry Sniper" },
  c_wMScout: { weaponName: "Survival Knife" },
  c_wXRGHE: { weaponName: "Rifle Grenade — HE" },
  c_wShotWinL: { weaponName: "M97 Trench Gun Backbored" },
  c_wHSKoli: { weaponName: "Kolibri" },
  c_wXGM: { weaponName: "Improvised Grenade" },
  c_wLMGBroU: { weaponName: "M1917 MG Telescopic" },
  c_wRSinRoI: { weaponName: "Ross MkIII Infantry" },
  c_wXTG: { weaponName: "Tripwire Bomb — GAS" },
  c_wPCAFrom: { weaponName: "Frommer Stop Auto" },
  c_wXGF: { weaponName: "Frag Grenade" },
  c_wRSemFedT: { weaponName: "Fedorov Avtomat Trench" },
  c_wRSinWinL: { weaponName: "Russian 1895 Sniper" },
  c_wHSFS: { weaponName: "Frommer Stop" },
  c_wRSemBSAC: { weaponName: "Howell Automatic Sniper" },
  c_wLMGHuot: { weaponName: "Huot Automatic Low Weight" },
  c_wMHook: { weaponName: "Grappling Hook" },
  c_wRSinCarP: { weaponName: "Carcano M91 Patrol Carbine" },
  c_wRSemR8: { weaponName: "Autoloading 8 .35 Factory" },
  c_wHSM1912: { weaponName: "Repetierpistole M1912" },
  c_wLMGBARB: { weaponName: "BAR M1918 Telescopic" },
  c_wLMGMads: { weaponName: "Madsen MG Low Weight" },
  c_wRSinEnfS: { weaponName: "M1917 Enfield Silenced" },
  c_wMAmKn: { weaponName: "Compact Trench Knife" },
  c_wMBottUn: { weaponName: "Wine Bottle" },
  c_wSMGThomT: { weaponName: "Annihilator Trench" },
  c_wSPVP: { weaponName: "Villar Perosa" },
  c_wHSFN1903: { weaponName: "Mle 1903" },
  c_wXLM: { weaponName: "Limpet Charge" },
  c_wLMGHuotR: { weaponName: "Huot Automatic Optical" },
  c_wXGS: { weaponName: "Smoke Grenade" },
  c_wSMGMax: { weaponName: "SMG 08/18 Factory" },
  c_wMSick: { weaponName: "Sickle" },
  c_wXCBHE: { weaponName: "Crossbow Launcher — HE" },
  c_wRSinLeeP: { weaponName: "Lawrence of Arabia's SMLE" },
  c_wXATG: { weaponName: "Anti-Tank Grenade" },
  c_wShotSO: { weaponName: "Sawed Off Shotgun" },
  c_wRSinLebL: { weaponName: "Lebel Model 1886 Sniper" },
  c_wLMGHotS: { weaponName: "M1909 Benét–Mercié Storm" },
  c_wShotRemC: { weaponName: "Model 10-A Hunter" },
  c_wMBolo: { weaponName: "Hellfighter Bolo Knife" },
  c_wRSinLeeC: { weaponName: "SMLE MKIII Marksman" },
  c_wRSiMa: { weaponName: "Gewehr 98 Infantry" },
  c_wXGAT: { weaponName: "Light Anti-Tank Grenade" },
  c_wMMac: { weaponName: "Trench Mace" },
  c_wHSHL: { weaponName: "1903 Hammerless" },
  c_wPCSFN: { weaponName: "Mle 1903 Extended" },
  c_wPCSC93: { weaponName: "C93 Carbine" },
  c_wRIRLebel: { weaponName: "Lebel Model 1886" },
  c_wMSbr: { weaponName: "Saber" },
  c_wRSemMau: { weaponName: "Selbstlader M1916 Factory" },
  c_wShot19: { weaponName: "Model 1900 Factory" },
  c_wMRus: { weaponName: "Russian Award Knife" },
  c_wSPFlShot: { weaponName: "Flare Gun — Flash" },
  c_wRIR98: { weaponName: "Gewehr 98" },
  c_wSPMHGL: { weaponName: "Martini-Henry Grenade Launcher" },
  c_wXGO: { weaponName: "Mini Grenade" },
  c_wHSWMVI: { weaponName: "Revolver Mk VI" },
  c_wLMGLewU: { weaponName: "Lewis Gun Suppressive" },
  c_wSPBG: { weaponName: "AT Rocket Gun" },
  c_wRSinSprT: { weaponName: "M1903 Experimental" },
  c_wLMG0818: { weaponName: "lMG 08/18 Low Weight" },
  c_wHSMars: { weaponName: "Mars Automatic" },
  c_wSMGMau: { weaponName: "M1917 Trench Carbine" },
  c_wHSColt: { weaponName: "M1911" },
  c_wHSColtT: { weaponName: "Lebel Model 1886" },
  c_wLMGBro: { weaponName: "M1917 MG Low Weight" },
  c_wMGren: { weaponName: "Dud Club" },
  c_wPCSC96: { weaponName: "C96 Carbine" },
  c_wRSemLug: { weaponName: "Selbstlader 1906 Factory" },
  c_wSMGRibO: { weaponName: "Ribeyrolles 1918 Optical" },
  c_wRSemWinT: { weaponName: "M1907 SL Trench" },
  c_wSMGMauP: { weaponName: "M1917 Patrol Carbine" },
  c_wRSinSprS: { weaponName: "M1903 Marksman" },
  c_wMHat: { weaponName: "Hatchet" },
  c_wMFleur: { weaponName: "Trench Fleur" },
  c_wShotBA5E: { weaponName: "12g Automatic Extended" },
  c_wRSinCarT: { weaponName: "Carcano M91 Carbine" },
  c_wRSinStyM: { weaponName: "Gewehr M.95 Carbine" },
  c_wHSLugRB: { weaponName: "Red Baron's P08" },
  c_wMTot: { weaponName: "Totokia" },
  c_wXTI: { weaponName: "Tripwire Bomb — INC" },
  c_wLMGPerD: { weaponName: "Perino Model 1908 Defensive" },
  c_wHSLHow: { weaponName: "Howdah Pistol" },
  c_wHB: { weaponName: "Obrez Pistol" },
  c_wRSemMonR: { weaponName: "Mondragón Optical" },
  c_wRSinLee: { weaponName: "SMLE MKIII Infantry" },
  c_wHSBull: { weaponName: "Bull Dog Revolver" },
  c_wMCavS: { weaponName: "Cavalry Sword" },
  c_wRSemMonS: { weaponName: "Mondragón Storm" },
  c_wRSiMaC: { weaponName: "Gewehr 98 Marksman" },
  c_wMBeDag: { weaponName: "Bedouin Dagger" },
  c_wPCSPiep: { weaponName: "Pieper M1893" },
  c_wMCogClub: { weaponName: "Cogwheel Club" },
  c_wRSinWin: { weaponName: "Russian 1895 Infantry" },
  c_wRSemR8S: { weaponName: "Autoloading 8 .35 Marksman" },
  c_wRSinWinT: { weaponName: "Russian 1895 Trench" },
  c_wMWelsh: { weaponName: "Welsh Blade" },
};
const gamemode_score = {
  mgc_roo_g: "sc_conquest",
  mgtd_roo_g: "sc_deathmatch",
  mgb_roo_g: "sc_operations",
  mgr_roo_g: "sc_rush",
  Poss_roo_g: "sc_possession",
  mgdo_roo_g: "sc_domination",
  _roo_g: "sc_general",
};
const classes_score = {
  c_md_: "sc_medic",
  c_sp_: "sc_support",
  c_as_: "sc_assault",
  c_sc_: "sc_scout",
  c_pt_: "sc_pilot",
  c_tk_: "sc_tanker",
  c_cv_: "sc_cavalry",
};
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
  //bfv
  "fjell 652": "MP_ArcticFjell",
  narvik: "MP_ArcticFjord",
  arras: "MP_Arras",
  devastation: "MP_Devastation",
  "twisted steel": "MP_Escaut",
  aerodrome: "MP_Foxhunt",
  hamada: "MP_Halfaya",
  rotterdam: "MP_Rotterdam",
  panzerstorm: "MP_Hannut",
  mercury: "MP_Crete",
  marita: "MP_Kalamas",
  provence: "MP_Provence",
  "al sudan": "MP_SandAndSea",
  "operation Underground": "MP_Bunker",
  "iwo jima": "MP_IwoJima",
  "pacific storm": "MP_TropicIslands",
  "wake island": "MP_WakeIsland",
  "solomon islands": "MP_Jungle",
  "al marj encampment": "MP_Libya",
  "lofoten islands": "MP_Norway",
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
  // bfv
  MP_ArcticFjell: "Fjell 652",
  MP_ArcticFjord: "Narvik",
  MP_Arras: "Arras",
  MP_Devastation: "Devastation",
  MP_Escaut: "twisted steel",
  MP_Foxhunt: "Aerodrome",
  MP_Halfaya: "Hamada",
  MP_Rotterdam: "Rotterdam",
  MP_Hannut: "Panzerstorm",
  MP_Crete: "Mercury",
  MP_Kalamas: "Marita",
  MP_Provence: "Provence",
  MP_SandAndSea: "Al sudan",
  MP_Bunker: "Operation Underground",
  MP_IwoJima: "Iwo jima",
  MP_TropicIslands: "Pacific storm",
  MP_WakeIsland: "Wake island",
  MP_Jungle: "Solomon islands",
  MP_Libya: "Al marj encampment",
  MP_Norway: "lofoten islands",
  // bfv special maps
  DK_Norway: "Halvoy",
  MP_Escaut_US: "Twisted Steel US",
  MP_Hannut_US: "Panzerstorm US",
  MP_GOps_Chapter2_Arras: "Arras (Chapter 2)",
  MP_WE_Fortress_Devastation: "Devastation (Fortress)",
  MP_WE_Fortress_Halfaya: "Hamada (Fortress)",
  MP_WE_Grind_ArcticFjord: "Narvik (Grind)",
  MP_WE_Grind_Devastation: "Devastation (Grind)",
  MP_WE_Grind_Escaut: "Twisted Steel (Grind)",
  MP_WE_Grind_Rotterdam: "Rotterdam (Grind)",
};

const map_image = {
  MP_Amiens:
    "https://cdn.gametools.network/maps/bf1/MP_Amiens_LandscapeLarge-e195589d.webp",
  MP_Chateau:
    "https://cdn.gametools.network/maps/bf1/MP_Chateau_LandscapeLarge-244d5987.webp",
  MP_Desert:
    "https://cdn.gametools.network/maps/bf1/MP_Desert_LandscapeLarge-d8f749da.webp",
  MP_FaoFortress:
    "https://cdn.gametools.network/maps/bf1/MP_FaoFortress_LandscapeLarge-cad1748e.webp",
  MP_Forest:
    "https://cdn.gametools.network/maps/bf1/MP_Forest_LandscapeLarge-dfbbe910.webp",
  MP_ItalianCoast:
    "https://cdn.gametools.network/maps/bf1/MP_ItalianCoast_LandscapeLarge-1503eec7.webp",
  MP_MountainFort:
    "https://cdn.gametools.network/maps/bf1/MP_MountainFort_LandscapeLarge-8a517533.webp",
  MP_Scar:
    "https://cdn.gametools.network/maps/bf1/MP_Scar_LandscapeLarge-ee25fbd6.webp",
  MP_Suez:
    "https://cdn.gametools.network/maps/bf1/MP_Suez_LandscapeLarge-f630fc76.webp",
  MP_Giant:
    "https://cdn.gametools.network/maps/bf1/MP_Giant_LandscapeLarge-dd0b93ef.webp",
  MP_Fields:
    "https://cdn.gametools.network/maps/bf1/MP_Fields_LandscapeLarge-5f53ddc4.webp",
  MP_Graveyard:
    "https://cdn.gametools.network/maps/bf1/MP_Graveyard_LandscapeLarge-bd1012e6.webp",
  MP_Underworld:
    "https://cdn.gametools.network/maps/bf1/MP_Underworld_LandscapeLarge-b6c5c7e7.webp",
  MP_Verdun:
    "https://cdn.gametools.network/maps/bf1/MP_Verdun_LandscapeLarge-1a364063.webp",
  MP_ShovelTown:
    "https://cdn.gametools.network/maps/bf1/MP_Shoveltown_LandscapeLarge-d0aa5920.webp",
  MP_Trench:
    "https://cdn.gametools.network/maps/bf1/MP_Trench_LandscapeLarge-dbd1248f.webp",
  MP_Bridge:
    "https://cdn.gametools.network/maps/bf1/MP_Bridge_LandscapeLarge-5b7f1b62.webp",
  MP_Islands:
    "https://cdn.gametools.network/maps/bf1/MP_Islands_LandscapeLarge-c9d8272b.webp",
  MP_Ravines:
    "https://cdn.gametools.network/maps/bf1/MP_Ravines_LandscapeLarge-1fe0d3f6.webp",
  MP_Tsaritsyn:
    "https://cdn.gametools.network/maps/bf1/MP_Tsaritsyn_LandscapeLarge-2dbd3bf5.webp",
  MP_Valley:
    "https://cdn.gametools.network/maps/bf1/MP_Valley_LandscapeLarge-8dc1c7ca.webp",
  MP_Volga:
    "https://cdn.gametools.network/maps/bf1/MP_Volga_LandscapeLarge-6ac49c25.webp",
  MP_Beachhead:
    "https://cdn.gametools.network/maps/bf1/MP_Beachhead_LandscapeLarge-5a13c655.webp",
  MP_Harbor:
    "https://cdn.gametools.network/maps/bf1/MP_Harbor_LandscapeLarge-d382c7ea.webp",
  MP_Naval:
    "https://cdn.gametools.network/maps/bf1/MP_Naval_LandscapeLarge-dc2e8daf.webp",
  MP_Ridge:
    "https://cdn.gametools.network/maps/bf1/MP_Ridge_LandscapeLarge-8c057a19.webp",
  MP_Alps:
    "https://cdn.gametools.network/maps/bf1/MP_Alps_LandscapeLarge-7ab30e3e.webp",
  MP_Blitz:
    "https://cdn.gametools.network/maps/bf1/MP_Blitz_LandscapeLarge-5e26212f.webp",
  MP_Hell:
    "https://cdn.gametools.network/maps/bf1/MP_Hell_LandscapeLarge-7176911c.webp",
  MP_London:
    "https://cdn.gametools.network/maps/bf1/MP_London_LandscapeLarge-0b51fe46.webp",
  MP_Offensive:
    "https://cdn.gametools.network/maps/bf1/MP_Offensive_LandscapeLarge-6dabdea3.webp",
  MP_River:
    "https://cdn.gametools.network/maps/bf1/MP_River_LandscapeLarge-21443ae9.webp",
  // bfv
  MP_ArcticFjell:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_ArcticFjell-df3c1290.webp",
  MP_ArcticFjord:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_ArcticFjord-7ba29138.webp",
  MP_Arras:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_Arras-4b610505.webp",
  MP_Devastation:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_Devastation-623dea60.webp",
  MP_Escaut:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_Escaut-9764d1fb.webp",
  MP_Foxhunt:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_AfricanFox-8ad380a5.webp",
  MP_Halfaya:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_AfricanHalfaya-31165f9b.webp",
  MP_Rotterdam:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_Rotterdam-55632240.webp",
  MP_Hannut:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_Hannut-ebbe7197.webp",
  MP_Crete:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_Crete-304a202d.webp",
  MP_Kalamas:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_Kalamas-c64c8451.webp",
  MP_Provence:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_ProvenceXL-a950ad3e.webp",
  MP_SandAndSea:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_SandAndSea-f071e6f7.webp",
  MP_Bunker:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_Bunker-7b518876.webp",
  MP_IwoJima:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_IwoJima-760850fc.webp",
  MP_TropicIslands:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_TropicIslands-9e0a41c3.webp",
  MP_WakeIsland:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_WakeIsland-3238b455.webp",
  MP_Jungle:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_Jungle-714218ce.webp",
  MP_Libya:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_Libya-bd54b090.webp",
  MP_Norway:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_Norway-7d6d6300.webp",
  // bfv special maps
  DK_Norway:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_Norway-7d6d6300.webp",
  MP_Escaut_US:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_Escaut-9764d1fb.webp",
  MP_Hannut_US:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_Hannut-ebbe7197.webp",
  MP_GOps_Chapter2_Arras:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_Arras-4b610505.webp",
  MP_WE_Fortress_Devastation:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_Devastation-623dea60.webp",
  MP_WE_Fortress_Halfaya:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_AfricanHalfaya-31165f9b.webp",
  MP_WE_Grind_ArcticFjord:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_ArcticFjord-7ba29138.webp",
  MP_WE_Grind_Devastation:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_Devastation-623dea60.webp",
  MP_WE_Grind_Escaut:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_Escaut-9764d1fb.webp",
  MP_WE_Grind_Rotterdam:
    "https://cdn.gametools.network/maps/bfv/1080p_MP_Rotterdam-55632240.webp",
};

const marne_regions = {
  AS: "Asia",
  SA: "sam",
  NA: "nam",
  AF: "afr",
};

interface PlayerInfo {
  game: string;
  playerId: string;
}

function rounding(number: number) {
  return Math.round((number + Number.EPSILON) * 100) / 100;
}

function getWeapons(statsDict: {
  [string: string]: string;
}): MainStatsWeapon[] {
  const weapons = [];
  for (const [_id, extra] of Object.entries(weapon_stats)) {
    const weapon = extra;
    const kills = Number.parseFloat(statsDict[`${_id}__kw_g`] ?? "0");
    const shotsHit = Number.parseFloat(statsDict[`${_id}__shw_g`] ?? "0");
    const shotsFired = Number.parseFloat(statsDict[`${_id}__sfw_g`] ?? "0");
    const headshots = Number.parseFloat(
      statsDict[`${_id.replace("_", "__")}_hsh_g`] ?? "0",
    );
    const seconds = Number.parseFloat(statsDict[`${_id}__sw_g`] ?? "0");

    const accuracy = rounding((shotsHit / shotsFired) * 100);
    const killsPerMinute = rounding(kills / (seconds / 60));
    const hitsPerKill = rounding(shotsHit / kills);
    const headshotRate = rounding((headshots / kills) * 100);

    weapon["id"] = _id;
    weapon["kills"] = kills;
    weapon["accuracy"] = accuracy || 0;
    weapon["headshots"] = headshots;
    weapon["headshot_rate"] = headshotRate || 0;
    weapon["killsPerMinute"] = killsPerMinute || 0;
    weapon["hitVKills"] = hitsPerKill || 0;
    weapon["shotsHit"] = shotsHit;
    weapon["shotsFired"] = shotsFired;
    weapon["timeEquipped"] = seconds;
    weapons.push(weapon);
  }
  return weapons;
}

function getGamemodes(statsDict: {
  [string: string]: string;
}): MainStatsGamemode[] {
  const gamemodes = [];
  for (const [_id, extra] of Object.entries(gamemode_stats)) {
    const gamemode = extra;
    gamemode["id"] = _id;
    gamemode["score"] =
      Number.parseFloat(statsDict[gamemode_score[_id] ?? ""] ?? "0") || 0;
    gamemodes.push(gamemode);
  }

  return gamemodes;
}

function getClasses(statsDict: {
  [string: string]: string;
}): MainStatsClasses[] {
  const kits = [];
  for (const [_id, extra] of Object.entries(classes_stats)) {
    const kit = extra;
    const kills = Number.parseFloat(statsDict[`${_id}_ks_g`] ?? "0");
    const seconds = Number.parseFloat(statsDict[`${_id}_sa_g`] ?? "0");
    const killsPerMinute = rounding(kills / (seconds / 60));
    kit["id"] = _id;
    kit["kills"] = kills;
    kit["kpm"] = killsPerMinute || 0;
    kit["secondsPlayed"] = seconds;
    kit["image"] =
      `https://cdn.gametools.network/classes/bf1/white/${kit["className"]}.webp`;
    kit["altImage"] =
      `https://cdn.gametools.network/classes/bf1/black/${kit["className"]}.webp`;
    // kit["timePlayed"] = str(datetime.timedelta(seconds=kit["secondsPlayed"]))
    kit["score"] =
      Number.parseFloat(statsDict[classes_score[_id] ?? ""] ?? "0") || 0;
    kits.push(kit);
  }
  return kits;
}

export class ApiProvider extends JsonClient {
  private serverCache: ServerListReturn = { servers: [] };
  private serverCacheAge: number;
  private serverCacheGame: string;

  constructor() {
    super();
  }

  async stats({ game, playerId }: PlayerInfo): Promise<MainStats> {
    const r = await fetch(
      game.includes("bf1")
        ? `https://marne.io/api/stats/${playerId}/2`
        : `https://marne.io/api/v/stats/${playerId}/2`,
    );
    const item = await r.json();
    const player: { [string: string]: string } = item[playerId];
    const wins = Number.parseFloat(player["c_mwin__roo_g"] ?? "0");
    const losses = Number.parseFloat(player["c_mlos__roo_g"] ?? "0");
    const kills = Number.parseFloat(player["c___k_g"] ?? "0");
    const deaths = Number.parseFloat(player["c___d_g"] ?? "0");
    const shotsFired = Number.parseFloat(player["c___sfw_g"] ?? "0");
    const shotsHit = Number.parseFloat(player["c___shw_g"] ?? "0");
    const headshotAmount = Number.parseFloat(player["c___hsh_g"] ?? "0");
    const matchesPlayed = Number.parseFloat(player["c___roo_g"] ?? "0");

    const accuracy = rounding((shotsHit / shotsFired) * 100);
    const winPercent = rounding((wins / (wins + losses)) * 100);
    const headshots = rounding((headshotAmount / kills) * 100);
    const killDeath = rounding(kills / deaths);
    const killsPerMatch = rounding(kills / (shotsFired / 60));

    const result = {
      id: Number(playerId),
      weapons: getWeapons(player),
      gamemodes: getGamemodes(player),
      classes: getClasses(player),
      cache: false,
      apiUrl: game.includes("bf1")
        ? `https://marne.io/api/stats/${playerId}/2`
        : `https://marne.io/api/v/stats/${playerId}/2`,
      kills: kills,
      deaths: deaths,
      wins: wins,
      loses: losses,
      killsPerMatch: killsPerMatch || 0,
      headShots: headshotAmount,
      roundsPlayed: matchesPlayed,
      winPercent: winPercent || 0,
      headshots: headshots || 0,
      accuracy: accuracy || 0,
      killDeath: killDeath || 0,
      score: Number.parseFloat(player["score"] ?? "0"),
      revives: Number.parseFloat(player["c___re_g"] ?? "0"),
      heals: Number.parseFloat(player["c___h_g"] ?? "0"),
      repairs: Number.parseFloat(player["c___r_g"] ?? "0"),
      killAssists: Number.parseFloat(player["c___kak_g"] ?? "0"),
      shotsHit: shotsHit,
      shotsFired: shotsFired,
      awardScore: Number.parseFloat(player["sc_award"] ?? "0"),
      bonusScore: Number.parseFloat(player["sc_bonus"] ?? "0"),
      squadScore: Number.parseFloat(player["sc_squad"] ?? "0"),
      currentRankProgress: Number.parseFloat(player["sc_rank"] ?? "0"),
      highestKillStreak: Number.parseFloat(player["c___k_ghvs"] ?? "0"),
      dogtagsTaken: Number.parseFloat(player["c___dt_g"] ?? "0"),
      longestHeadShot: Number.parseFloat(player["c___hsd_ghva"] ?? "0"),
    };
    return result;
  }

  /**
   * Serverlist of marne
   * @returns ServerInfoReturn[]
   */
  async serverList({
    searchTerm,
    limit,
    regions,
    game,
  }: ServerSearchInfo): Promise<ServerSearch> {
    if (
      this.serverCacheGame !== game ||
      this.serverCacheAge === undefined ||
      // update only once every 30 seconds
      (Date.now() - this.serverCacheAge) / 1000 > 30
    ) {
      const r = await fetch(
        game.includes("bf1")
          ? "https://marne.io/api/srvlst/"
          : "https://marne.io/api/v/srvlst/",
      );
      this.serverCache = await r.json();
      this.serverCacheAge = Date.now();
      this.serverCacheGame = game;
    }
    const country = await getCurrentCountry();
    const servers =
      this.serverCache.servers == undefined
        ? []
        : this.serverCache.servers
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
                region: marne_regions[server?.region] || server?.region || "",
                country: getName(server?.country, country),
                platform: "pc",
                playerAmount: server?.currentPlayers,
                maxPlayerAmount: server?.maxPlayers,
                serverInfo: "",
                smallMode: smallmodes[server?.gameMode],
                botAmount: server?.botCount,
              };
            })
            .filter((server) => {
              return (
                server.prefix
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) &&
                (regions.includes(server.region.toLowerCase()) ||
                  regions.includes("all"))
              );
            })
            .slice(0, !Number.isNaN(Number(limit)) ? Number(limit) : 10);
    return {
      cache: false,
      servers,
      apiUrl: game.includes("bf1")
        ? "https://marne.io/api/srvlst/"
        : "https://marne.io/api/v/srvlst/",
    };
  }

  async server({
    getter,
    serverName,
    region,
    game,
  }: DetailedSearch): Promise<DetailedServerInfo> {
    let gameId = serverName;
    if (getter === "name") {
      const servers = await this.serverList({
        game: game,
        searchTerm: serverName,
        limit: "1",
        regions: [region],
      });
      gameId = servers?.servers[0]?.gameId;
    }

    const r = await fetch(
      game.includes("bf1")
        ? `https://marne.io/api/srvlst/${gameId}`
        : `https://marne.io/api/v/srvlst/${gameId}`,
    );
    const result: DetailedServerReturn = await r.json();
    const internalMapName: string = result?.mapName?.split("/").slice(-1)[0];
    return {
      apiUrl: game.includes("bf1")
        ? `https://marne.io/api/srvlst/${gameId}`
        : `https://marne.io/api/v/srvlst/${gameId}`,
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
      map: internalMapName,
      modList: result?.modList || [],
      botAmount: result?.botCount,
      rotation:
        result?.rotation === ""
          ? []
          : result?.rotation?.map((current: RotationReturn, index: number) => {
              if (current !== null) {
                const internalMapName: string =
                  current?.mapLongName?.split("/").slice(-1)[0] ||
                  current?.map?.split("/").slice(-1)[0] ||
                  "";
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
              }
            }),
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

export const MarneApi = new ApiProvider();
