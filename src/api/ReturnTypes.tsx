import { Mutator, PlaygroundMutator } from "./MutatorType";
import { ModListReturn } from "./marneApi";

export type PlatoonPlayer = {
  id: string;
  name: string;
  role: string;
  avatar: string;
};

export type Graph = {
  timeStamps: string[];
};

export type UserGames = {
  apiUrl: string;
  avatar: string;
  userName: string;
  id: number;
  bf1: boolean;
  bf4: boolean;
  bfv: boolean;
  bf3: boolean;
  bfh: boolean;
};

export type PlatoonStats = {
  apiUrl: string;
  cache: boolean;
  canApplyToJoin: boolean;
  canJoinWithoutApply: boolean;
  currentSize: number;
  description: string;
  emblem: string;
  id: string;
  members: PlatoonPlayer[];
  name: string;
  tag: string;
  servers: ServerList[];
};

export type MainStats = {
  apiUrl: string;
  accuracy: number;
  avatar: string;
  avengerKills: number;
  awardScore: number;
  bestClass: number;
  bonusScore: number;
  cache: false;
  currentRankProgress: number;
  deaths: number;
  dogtagsTaken: number;
  headShots: number;
  headshots: number;
  heals: number;
  highestKillStreak: number;
  id: number;
  infantryKillDeath: number;
  infantryKillsPerMinute: number;
  killAssists: number;
  killDeath: number;
  kills: number;
  killsPerMinute: number;
  longestHeadShot: number;
  loses: number;
  activePlatoon: MainStatsPlatoon;
  platoons: MainStatsPlatoon[];
  sessions: MainStatsSession[];
  progress: MainStatsProgress[];
  gamemodes: MainStatsGamemode[];
  classes: MainStatsClasses[];
  rank: number;
  rankImg: string;
  repairs: number;
  revives: number;
  roundsPlayed: number;
  saviorKills: number;
  scorePerMinute: number;
  skill: number;
  squadScore: number;
  timePlayed: string;
  secondsPlayed?: number;
  totalRankProgress: number;
  userName: string;
  vehicles: MainStatsVehicle[];
  weapons: MainStatsWeapon[];
  gadgets?: MainStatsGadgets[];
  winPercent: number;
  wins: number;
  quits: number;
  cashPerMinute?: number;
  hacker?: number;
  professional?: number;
  operator?: number;
  mechanic?: number;
  enforcer?: number;
  resupplies?: number;
};

export type MainStatsGamemode = {
  gamemodeName: string;
  score: number;

  wins?: number;
  losses?: number;
  winPercent?: string;
};

export type MainStatsClasses = {
  className: string;
  statName?: string; // bf2042
  score: number;
  image: string;
  altImage: string;

  kills?: number;
  kpm?: number;

  timePlayed?: string;
  secondsPlayed?: number;

  serviceStarAmount?: number;
  serviceStarProgress?: string;
  serviceStarProgressAmount?: string;
};

export type MainStatsProgress = {
  progressName: string;
  current: number;
  total: number;
};

export type MainStatsSession = {
  playerId: number;
  serverId: string;
  serverName: string;
  stats: SessionStats;
  timeStamp: string;
};

export type SessionStats = {
  kills: number;
  deaths: number;
  wins: number;
  losses: number;
  timePlayed: number;
  gamemodes: SessionGamemode[];
  kits: SessionKit[];
};

export type SessionGamemode = {
  name: string;
  score: number;
  wins: number;
  losses: number;
};

export type SessionKit = {
  name: string;
  kills: number;
  score: number;
  timePlayed: number;
};

export type MainStatsPlatoon = {
  description: string;
  emblem: string;
  id: string;
  name: string;
  tag: string;
  type: string;
  url: string;
};

export type MainStatsVehicle = {
  destroyed: number;
  image: string;
  kills: number;
  killsPerMinute: number;
  type: string;
  vehicleName: string;
};

export type MainStatsWeapon = {
  accuracy: number;
  headshots: number;
  hitVKills: number;
  image: string;
  kills: number;
  killsPerMinute?: number;
  damagePerMinute?: number;
  type: string;
  weaponName: string;
};

export type MainStatsGadgets = {
  type: string;
  gadgetName: string;
  image: string;
  id: string;
  kills: number;
  spawns: number;
  damage: number;
  uses: number;
  multiKills: number;
  vehiclesDestroyedWith: number;
  kpm: number;
  dpm: number;
  secondsPlayed: number;
};

export type ServerSearch = {
  apiUrl: string;
  cache: boolean;
  servers: ServerList[];
};

export type ServerList = {
  currentMap: string;
  inQue: number;
  inQueue?: number;
  mode: string;
  official: boolean;
  ownerId: number;
  platform: string;
  playerAmount: number;
  region: string;
  serverInfo: string;
  smallMode: string;

  url?: string;
  mapImage?: string;

  gameId?: string;
  serverId?: string;
  blazeGameId?: number;

  teams?: TeamList;
  prefix?: string;
  maxPlayerAmount?: number;

  map?: string;
  server?: string;
  maxPlayers?: number;
  mapName?: string;

  ip?: string;
  port?: string;
  hasPassword?: boolean;
};

export type ServerLeaderboardReturn = {
  apiUrl: string;
  gameId: string;
  data: ServerLeaderboardList[];
  cache: boolean;
};

export type ServerLeaderboardList = {
  name: string;
  platoon: string;
  playerId: number;
  score: number;
  killDeath: number;
  kills: number;
  deaths: number;
  wins: number;
  losses: number;
  timePlayed: number;
  timeStamp: string; // update timestamp / last played
  kits: SessionGamemode[];
  gamemodes: SessionKit[];
};

export type ServerPlayersReturn = {
  apiUrl?: string;
  teams: serverTeamList[];
  loading: serverPlayer[];
  que: serverPlayer[];
  serverinfo: serverInfoPlayerList;
  update_timestamp: number;
};

export interface SeederGameItem {
  id?: string;
  name?: string;
  shortName?: string;
  image?: string;
  type?: string;
  subtype?: string;
  class?: string;
}

export type seederPlayersReturn = {
  apiUrl: string;
  _id: string;
  gameId: number;
  ingameChat?: SeederIngameChat[];
  teams: seederTeamList[];
  serverinfo: serverInfoPlayerList;
  timeStamp: string;
  update_timestamp: number;
};

export type SeederIngameChat = {
  timestamp: string;
  sender: string;
  content: string;
};

export type seederTeamList = {
  players: seederPlayer[];
  teamid: string;
  image: string;
  name: string;
  score: number;
  faction?: string;
  key?: string;
  scoreFromKills?: number;
  scoreFromFlags?: number;
};

export interface seederPlayer {
  index?: number;
  teamId: number;
  mark: number;
  platoon?: {
    tag: string;
    name: string;
    icon: string;
  };
  squad_id?: number;
  squad_name?: string;
  rank: number;
  name: string;
  player_id: number;
  kills: number;
  deaths: number;
  score: number;
  player_class?: {
    id: string;
    name?: string;
    black?: string;
    white?: string;
  };
  Spectator?: 0;
  vehicle?: SeederGameItem;
  weapons?: SeederGameItem[];
}

export type serverInfoPlayerList = {
  country: string;
  description: string;
  level: string;
  maps: string[];
  mode: string;
  name: string;
  owner: string;
  region: string;
  servertype: string;
  settings: string[];
};

export type serverTeamList = {
  players: serverPlayer[];
  teamid: string;
  image: string;
  name: string;
  faction?: string;
  key?: string;
};

export type serverPlayer = {
  player_id?: number;
  user_id?: number;
  name: string;
  position?: number;
  latency?: number;
  platoon?: string;
  join_time?: number;
  localization?: string;

  platform?: string;
  rank?: number;
};

export type ServerInfo = {
  prefix: string;
  inQue: number;
  serverInfo: string;
  playerAmount: number;
  maxPlayerAmount: number;
  url: string;
  map: string;
  smallmode: string;
  mode: string;
  rotation: ServerRotation[];
  rotationId: number;
  createdDate: number;
  expirationDate: number;
};

export type DetailedServerInfo = {
  apiUrl: string;
  hostport?: number;
  cache?: boolean;
  country?: string;
  currentMap: string;
  currentMapImage: string;
  description?: string;
  favorites?: number;
  mode: string;
  official: boolean;
  platform: string;
  playerAmount: number;
  prefix?: string;
  region: string;
  rotation?: ServerRotation[];
  settings?: ServerSettings[];
  smallmode: string;
  gameId?: string;

  blazeGameId?: number;
  teams?: ScoreTeamList[];
  players?: ScoreServerPlayer[];

  inQueue?: number;
  maxPlayerAmount?: number;
  platoon?: PlatoonResult;
  owner?: ServerOwnerResult;
  configCreator?: ServerOwnerResult;
  serverInfo?: ServerInfoResult;

  inQue?: number;
  maxPlayers?: number;
  noBotsPlayerAmount?: number;
  modList?: ModListReturn[];
  // older games
  mapImage?: string;
  map?: string;
  ip?: string;
  port?: number;
};

export type ScoreTeamList = {
  players: ScoreServerPlayer[];
  teamid: string;
  // image: string;
  // name: string;
  // score: number;
  // faction?: string;
  // key?: string;
};

export type ServerOwnerResult = {
  apiUrl: string;
  id: string;
  name?: string;
  avatar: string;
  platform?: string;
  nucleusId?: number;
  platformId?: number;
  personaId?: number;
};

export type ServerInfoResult = {
  configDescription: string;
  configDescriptionTranslation?: string;
  configName: string;
  configNameTranslation?: string;
  messages: string[];
  serverDescription: string;
  serverName: string;
};

export type TeamList = {
  teamOne: ServerTeams;
  teamTwo: ServerTeams;
};

export type ServerTeams = {
  image: string;
  key: string;
  name: string;
};

export type ScoreServerPlayer = {
  kills: number;
  deaths: number;
  name: string;
  player_id: string;
  rank: number;
  role: number;
  score: number;
  squad: number;
  tag: string;

  avatar?: string;
};

export type ServerRotation = {
  image: string;
  mapname: string;
  mode: string;
  index?: number;
};

export type Bf2042SettingValues = {
  assignValue: string;
  readableSettingName: string; // from translation
  settingName: string;
};

export type ServerSettings = {
  kits?: { [name: string]: string };
  Misc?: { [name: string]: string };
  Scales?: { [name: string]: string };
  Vehicles?: { [name: string]: string };
  Weapons?: { [name: string]: string };

  //#bf2042
  name?: string;
  settingsId?: number;
  values?: Bf2042SettingValues[];
};

export type PlatoonSearchResult = {
  apiUrl: string;
  cache: boolean;
  platoons: PlatoonResult[];
};

export type PlatoonResult = {
  currentSize: number;
  emblem: string;
  id: string;
  name: string;
  description: string;
  tag: string;
};

export type StringValue = {
  value: string;
};

export type ServerMessage = {
  sendAs: string;
  message: string;
};

export type PlaygroundSettings = {
  name: string;
  description: string;
  gameServerMessage: ServerMessage[];
  configName: StringValue;
  ConfigDescription: StringValue;
};

export type Creation = {
  seconds: number;
  nanos: number;
};

export type PlatformRestrictions = {
  platforms: number[];
};

export type InputMethodResrictions = {
  inputMethods: number[];
};

export type Restrictions = {
  platformRestrictions: PlatformRestrictions;
  inputMethodResctrictions: InputMethodResrictions;
};

export type InCompatibleModRules = {
  rules: number;
  compiledOld: number;
  rulesVersion: number;
};

export type CompatibleModRules = {
  rules: number;
  rulesVersion: number;
  blueprintRulesVersion: number;
};

export type OriginalModRules = {
  compatibleRules: CompatibleModRules[];
  incompatibleRules: InCompatibleModRules[];
};

export type AssetCategoryTagBooleanOverride = {
  assetCategoryTags: string[];
  value: boolean;
};

export type AssetCategoryTagBooleanTeamOverride = {
  assetCategoryTags: string[];
  value: boolean;
  teamId: number;
};

export type AssetCategoryBoolean = {
  defaultValue: boolean;
  overrides: AssetCategoryTagBooleanOverride;
  teamOverrides: AssetCategoryTagBooleanTeamOverride;
};

export type AssetCategory = {
  tagId: string;
  boolean: AssetCategoryBoolean;
};

export type WebData = {
  mainWorkspace: string;
  variables: string;
};

export type MapInfo = {
  mapname: string;
  image: string;
  mode: string;
  gameSize: number;
  rounds: number;
  mutators: Mutator[];
  location: string;
  preRoundSize: number;
  warmUpSize: number;
  allowedSpectators: number;
};

export type MapRotation = {
  maps: MapInfo[];
};

export type Translation = {
  translationId: string;
  localizedText: string;
  localizedTextDesc: string;
  kind: string;
};

export type ResourceLocation = {
  ref: string;
  url: string;
};

export type Resource = {
  location: ResourceLocation;
  kind: string;
};

export type Metadata = {
  resources: Resource[];
  translations: Translation[];
};

export type Tags = {
  metadata: Metadata;
  id: string;
  sortOrder: number;
};

export type Playground = {
  blocklyData?: WebData[];
  playgroundId: string;
  blueprintType: string;
  playgroundName: string;
  playgroundDescription: string;
  mutators: PlaygroundMutator[];
  mapRotation: MapRotation;
  state: number;
  checksum: string;
  secret: string;
  createdAt: Creation;
  updatedAt: Creation;
  settings: PlaygroundSettings;
  owner: ServerOwnerResult;
  restrictions: Restrictions;
  modRules: OriginalModRules;
  assetCategories: AssetCategory[];
};

export type PlaygroundInfoReturn = {
  apiUrl: string;
  progressionMode: StringValue;
  originalPlayground: Playground;
  validatedPlayground: Playground;
  tag: Tags[];
};

export type StatsGraph = {
  apiUrl: string;
  accuracy: number[];
  headshots: number[];
  infantryKillDeath: number[];
  infantryKillsPerMinute: number[];
  killDeath: number[];
  killsPerMinute: number[];
  scorePerMinute: number[];
  skill: number[];
  winPercent: number[];
  timeStamps: string[];
  startTime: string;
  endTime: string;
};
