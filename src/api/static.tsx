export const supportedGames = [
  "bf1942",
  "bfvietnam.openspy",
  "bfvietnam.qtracker",
  "bf2.bf2hub",
  "bf2.playbf2",
  "bf2142.openspy",
  "bf2142.play2142",
  "bfbc2",
  "bf3",
  "bf4",
  "bfh",
  "bf1",
  "bf1marne",
  "bfv",
  "bf2042",
  "battlebit",
];

export const projects = {
  "bfvietnam.openspy": "http://openspy.net",
  "bf2.bf2hub": "https://www.bf2hub.com/",
  "bf2.playbf2": "https://playbf2.tilda.ws/en",
  "bf2142.openspy": "http://openspy.net",
  "bf2142.play2142": "https://battlefield2142.co/",
  bf1marne: "https://marne.io/",
};

export const platformGames = {
  pc: ["bf3", "bf4", "bfh", "bf1", "bfv", "bf2042"],
  xboxone: ["bf4", "bfh", "bf1", "bfv", "bf2042"],
  xbox360: ["bf3", "bf4", "bfh"],
  ps4: ["bf4", "bfh", "bf1", "bfv", "bf2042"],
  ps3: ["bf3", "bf4", "bfh"],
  ps5: ["bf2042"],
  xboxseries: ["bf2042"],
};

export const bfbanTypeConvert = {
  name: "names",
  userid: "userids",
  playerid: "personaids",
};

export const serverToStatsPlatform = {
  1: "pc",
  2: "xboxone",
  3: "ps4",
  4: "xboxone",
  5: "ps4",
};

export const playerToStatsPlatform = {
  pc: "pc",
  xbox: "xboxone",
  psn: "ps4",
};

export const graphGames = {
  pc: [
    "bfglobal",
    "bf1942",
    "bfvietnam.openspy",
    "bfvietnam.qtracker",
    "bf2.bf2hub",
    "bf2.playbf2",
    "bf2142.openspy",
    "bf2142.play2142",
    "bfbc2",
    "bf3",
    "bf4",
    "bfh",
    "bf1",
    "bfv",
  ],
  xboxone: ["bfglobal", "bf4", "bf1", "bfv"],
  ps4: ["bfglobal", "bf4", "bf1", "bfv"],
  all: ["bfglobal", "bf4", "bf1", "bfv", "bf2042portal"],
};

export const statsPlatforms = ["pc", "xboxone", "xbox360", "ps4", "ps3"];
export const defaultOptions = ["amounts", "maps", "modes"];
export const portalOptions = ["settings", "ownerPlatform"];
defaultOptions.push.apply(portalOptions, defaultOptions);
export const graphOptions = {
  bf4: defaultOptions,
  bf1: defaultOptions,
  bfv: defaultOptions,
  bf2042portal: portalOptions,
};

export const oldJoinGames = [
  "bf2",
  "bf2.bf2hub",
  "bf2.playbf2",
  "bf1942",
  "bfvietnam.openspy",
  "bfvietnam.qtracker",
  // other:
  "bf2sf",
  "cod",
  "coduo",
  "cod2",
  "cod4",
  "codwaw",
  "et",
  "fearsec2",
  "paraworld",
  "swat4",
  "swat4x",
  "vietcong",
];
export const frostbiteJoinGames = ["bf4", "bf1"];

export const newGen = ["bf2042"];
export const frostbite3 = ["bf4", "bf1", "bfv", "bf2042"];
export const frostbite3Graph = ["bf4", "bf1", "bfv", "bf2042portal"];
export const dice = ["bf3", "bf4", "bfh", "bf1", "bfv", "bf2042"];
export const diceGraph = ["bf3", "bf4", "bfh", "bf1", "bfv", "bf2042portal"];
export const newTitles = ["bf1", "bfv"];
export const gameGraphConvert = { bf2042portal: "bf2042" };
export const extraGames = ["battlebit", "bf1marne"];

export const graphColors = [
  "#4bc0c033",
  "#49297e",
  "#195f08",
  "#003fc5",
  "#ae08a7",
  "#ae0842",
  "#829a00",
  "#9a5d00",
  "#009a96",
  "#00609a",
  "#4b009a",
  "#439a00",
  "#004b9f",
  "#440534",
  "#365600",
  "#586035",
  "#730555",
  "#994325",
  "#582495",
  "#752934",
  "#684535",
  "#524265",
  "#114342",
  "#543536",
  "#653475",
  "#543",
  "#123876",
  "#543682",
  "#478236",
  "#128376",
  "#463752",
  "#165",
];

export const progressGames = ["bf4", "bfh", "bf1"];
export const gamemodeGames = ["bf4", "bf1"];

export const serverWidgetTypes = ["black", "white", "detailed"];
export const widgetSize = [78, 78, 90];
export const teamArr = ["teamOne", "teamTwo"];

export const gameIds = { bf1: "1026023", bf4: "76889" };

export const bf4Settings = {
  osls: "Only squad leader spawn",
  v3ca: "3p vehicle cam",
  v3sp: "Use 3d spotting",
  vaba: "Team balance",
  vffi: "Friendly fire",
  vhud: "Show hud",
  vkca: "Kill cam",
  vmin: "Show minimap",
  vmsp: "Use minimap spotting",
  vnta: "Show enemy name tags",
  vrhe: "Regenerative health",
  vvsa: "Vehicles",
  vnit: "Kick idle player after seconds",
  vtkc: "# of tk before player is kicked",
  vtkk: "Ban player after  of kicks",
  vbdm: "Bullet damage modifier in %",
  vgmc: "Team ticket count %",
  vpmd: "Player man down time in %",
  vprt: "Player respawn time in %",
  vshe: "Player health in %",
  vvsd: "Vehicle respawn delay %",
};

export const regionToTranslation = {
  Asia: "asia",
  "North America": "nam",
  "South America": "sam",
  Europe: "eu",
  Africa: "afr",
  Oceania: "oc",
};
