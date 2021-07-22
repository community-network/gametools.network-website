import * as React from "react";
import "../../../locales/config";
import { useTranslation } from "react-i18next";
import { Box, Align, AlignS } from "../../Materials";
import { Spacing, Views } from "./Main";
import { MainStatsClasses } from "../../../api/ReturnTypes";

/** kits:
 * assault: https://eaassets-a.akamaihd.net/battlelog/battlebinary/sparta/assets/tunguska/shortcutkits/shortcut-kit-assault-light-9a9ad58d.png
 * medic: https://eaassets-a.akamaihd.net/battlelog/battlebinary/sparta/assets/tunguska/shortcutkits/shortcut-kit-medic-light-cb4ac00e.png
 * support: https://eaassets-a.akamaihd.net/battlelog/battlebinary/sparta/assets/tunguska/shortcutkits/shortcut-kit-support-light-107891af.png
 * sniper: https://eaassets-a.akamaihd.net/battlelog/battlebinary/sparta/assets/tunguska/shortcutkits/shortcut-kit-scout-light-288bc674.png
 */

export function ViewClasses(props: Views): React.ReactElement {
  const { t } = useTranslation();
  if (!props.loading && !props.error) {
    const classes = props.stats.classes;
    return (
      <Spacing>
        <Box>
          <>
            <h3>{t("stats.gamemodes.main")}</h3>
            {classes.map((key: MainStatsClasses) => {
              return (
                <>
                  <AlignS>
                    <div>
                      <h3>{key.className}</h3>
                      <p>{t("stats.gamemodes.amounts.score")}</p>
                    </div>
                    <div>
                      <h3>{key.score}</h3>
                      <p>{t("stats.gamemodes.amounts.score")}</p>
                    </div>
                    <div>
                      <h3>{key.kills}</h3>
                      <p>{t("stats.gamemodes.amounts.wins")}</p>
                    </div>
                    <div>
                      <h3>{key.timePlayed}</h3>
                      <p>{t("stats.gamemodes.amounts.losses")}</p>
                    </div>
                  </AlignS>
                </>
              );
            })}
          </>
        </Box>
      </Spacing>
    );
  } else {
    return (
      <Spacing>
        <Box>
          <h3>{t("stats.gamemodes.main")}</h3>
          <p>{t("loading")}</p>
        </Box>
      </Spacing>
    );
  }
}
