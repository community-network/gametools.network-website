export const factions = {
  BFFactionId_FactionAHU: {
    image:
      "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/Tunguska/30/21/FactionsColorAustroHungarianEmpireLarge-e2ebe691.png",
    key: "AHU",
    name: "Austro-Hungarian Empire",
  },
  BFFactionId_FactionGER: {
    image:
      "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/Tunguska/117/41/FactionsColorGermanEmpireLarge-8bd7e888.png",
    key: "GER",
    name: "German Empire",
  },
  BFFactionId_FactionOTM: {
    image:
      "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/Tunguska/69/73/FactionsColorOttomanEmpireLarge-45b70933.png",
    key: "OTM",
    name: "Ottoman Empire",
  },
  BFFactionId_FactionITA: {
    image:
      "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/Tunguska/22/73/FactionsColorKingdomOfItalyLarge-eab7049b.png",
    key: "ITA",
    name: "Kingdom of Italy",
  },
  BFFactionId_FactionUK: {
    image:
      "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/Tunguska/103/37/FactionsColorUnitedKingdomLarge-672527a9.png",
    key: "UK",
    name: "United Kingdom",
  },
  BFFactionId_FactionUSA: {
    image:
      "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/Tunguska/10/110/FactionsColorUnitedStatesOfAmericaLarge-0a6e66a7.png",
    key: "USA",
    name: "United States of America",
  },
  BFFactionId_FactionFRA: {
    image:
      "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/Tunguska/93/43/FactionsColorFranceLarge-a3d5b514.png",
    key: "FRA",
    name: "France",
  },
  BFFactionId_FactionRUS: {
    image:
      "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/Tunguska/113/64/FactionsColorRussia-8f40526a.png",
    key: "RUS",
    name: "Russian Empire",
  },
  BFFactionId_FactionBOL: {
    image:
      "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/Tunguska/63/106/FactionsLargeColorBolshevik-3f6ac72d.png",
    key: "BOL",
    name: "Red Army",
  },
  BFFactionId_FactionWA: {
    image:
      "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/Tunguska/113/64/FactionsColorRussia-8f40526a.png",
    key: "WA",
    name: "White Army",
  },

  BFFactionId_FactionUKM: {
    image:
      "https://eaassets-a.akamaihd.net/battlelog/battlebinary/gamedata/Tunguska/103/37/FactionsColorUnitedKingdomLarge-672527a9.png",
    key: "UK",
    name: "Royal Marines",
  },

  FactionUS: {
    image: "https://cdn.gametools.network/factions/bf2042/FactionUS.png",
    key: "US",
    name: "United States of America",
  },
  FactionRUS: {
    image: "https://cdn.gametools.network/factions/bf2042/FactionRUS.png",
    key: "RU",
    name: "Russian Federation",
  },
};

export const bf1_factions = {
  MP_Tsaritsyn: ["BFFactionId_FactionBOL", "BFFactionId_FactionRUS"],
  MP_Amiens: ["BFFactionId_FactionGER", "BFFactionId_FactionUK"],
  MP_Desert: ["BFFactionId_FactionUK", "BFFactionId_FactionOTM"],
  MP_Forest: ["BFFactionId_FactionGER", "BFFactionId_FactionUSA"],
  MP_Chateau: ["BFFactionId_FactionUSA", "BFFactionId_FactionGER"],
  MP_MountainFort: ["BFFactionId_FactionITA", "BFFactionId_FactionAHU"],
  MP_ShovelTown: ["BFFactionId_FactionGER", "BFFactionId_FactionFRA"],
  MP_Giant: ["BFFactionId_FactionGER", "BFFactionId_FactionUK"],
  MP_Suez: ["BFFactionId_FactionUK", "BFFactionId_FactionOTM"],
  MP_Trench: ["BFFactionId_FactionGER", "BFFactionId_FactionFRA"],
  MP_Underworld: ["BFFactionId_FactionGER", "BFFactionId_FactionFRA"],
  MP_ItalianCoast: ["BFFactionId_FactionITA", "BFFactionId_FactionAHU"],
  MP_Graveyard: ["BFFactionId_FactionFRA", "BFFactionId_FactionGER"],
  MP_Scar: ["BFFactionId_FactionUK", "BFFactionId_FactionGER"],
  MP_FaoFortress: ["BFFactionId_FactionUK", "BFFactionId_FactionOTM"],
  MP_Islands: ["BFFactionId_FactionGER", "BFFactionId_FactionRUS"],
  MP_Valley: ["BFFactionId_FactionWA", "BFFactionId_FactionAHU"],
  MP_Verdun: ["BFFactionId_FactionGER", "BFFactionId_FactionFRA"],
  MP_Hell: ["BFFactionId_FactionUK", "BFFactionId_FactionGER"],
  MP_Bridge: ["BFFactionId_FactionWA", "BFFactionId_FactionAHU"],
  MP_Ravines: ["BFFactionId_FactionAHU", "BFFactionId_FactionRUS"],
  MP_Volga: ["BFFactionId_FactionBOL", "BFFactionId_FactionWA"],
  MP_Ridge: ["BFFactionId_FactionUK", "BFFactionId_FactionOTM"],
  MP_Fields: ["BFFactionId_FactionFRA", "BFFactionId_FactionGER"],
  MP_Alps: ["BFFactionId_FactionGER", "BFFactionId_FactionUK"],
  MP_River: ["BFFactionId_FactionAHU", "BFFactionId_FactionITA"],
  MP_Offensive: ["BFFactionId_FactionUK", "BFFactionId_FactionGER"],
  MP_Naval: ["BFFactionId_FactionUKM", "BFFactionId_FactionGER"],
  MP_Harbor: ["BFFactionId_FactionUKM", "BFFactionId_FactionGER"],
  MP_Beachhead: ["BFFactionId_FactionUK", "BFFactionId_FactionOTM"],
  MP_Blitz: ["BFFactionId_FactionGER", "BFFactionId_FactionUK"],
  MP_London: ["BFFactionId_FactionGER", "BFFactionId_FactionUK"],
};
