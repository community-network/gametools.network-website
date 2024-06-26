import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import { Box } from "../../../Materials";
import { Views } from "./Main";
import { MainStatsGamemode } from "../../../../api/ReturnTypes";
import * as styles from "./Main.module.scss";

export function ViewGamemodes(props: Readonly<Views>): React.ReactElement {
  const { t, i18n } = useTranslation();
  if (!props.loading && !props.error) {
    const gamemodes = props.stats.gamemodes;
    const getLanguage = () => window.localStorage.i18nextLng;
    const numberFormat = new Intl.NumberFormat(getLanguage());
    return (
      <div className={styles.spacing}>
        <Box>
          <>
            {gamemodes[0].wins !== undefined ? (
              <>
                <h3>{t("stats.gamemodes.main")}</h3>
                {gamemodes.map((key: MainStatsGamemode) => {
                  return (
                    <div key={key?.gamemodeName}>
                      <br />
                      <div
                        className="align"
                        style={{ justifyContent: "space-between" }}
                      >
                        <h4 style={{ margin: 0 }}>
                          {i18n.exists(`stats.gamemodes.${key.gamemodeName}`)
                            ? t(`stats.gamemodes.${key.gamemodeName}`)
                            : key.gamemodeName}
                        </h4>
                        <p style={{ margin: "0.3rem 0" }}>
                          {t("stats.gamemodes.percentage", {
                            percentage: (
                              (key?.wins / (key?.wins + key?.losses)) *
                              100
                            ).toFixed(1),
                          })}
                        </p>
                      </div>
                      <div className={styles.backgroundBar}>
                        <div
                          className={styles.bar}
                          style={{
                            width: `${
                              (key?.wins / (key?.wins + key?.losses)) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <br />
                      <div className="alignS">
                        <div>
                          <h3>{numberFormat.format(key?.score)}</h3>
                          <p>{t("stats.gamemodes.amounts.score")}</p>
                        </div>
                        <div>
                          <h3>{numberFormat.format(key?.wins)}</h3>
                          <p>{t("stats.gamemodes.amounts.wins")}</p>
                        </div>
                        <div>
                          <h3>{numberFormat.format(key?.losses)}</h3>
                          <p>{t("stats.gamemodes.amounts.losses")}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="column" style={{ marginTop: 0 }}>
                  <div className="row">
                    <h3>{t(`stats.gamemodes.table.firstRow`)}</h3>
                  </div>
                  <div className="row">
                    <h3>{t(`stats.gamemodes.table.secondRow`)}</h3>
                  </div>
                </div>
                {gamemodes.map((key: MainStatsGamemode) => {
                  return (
                    <div className="column" key={key?.gamemodeName}>
                      <div className="row">
                        <p style={{ margin: 0 }}>
                          {t(`stats.gamemodes.${key.gamemodeName}`)}
                        </p>
                      </div>
                      <div className="row">
                        <p style={{ margin: 0 }}>{key?.score}</p>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </>
        </Box>
      </div>
    );
  } else {
    return (
      <div className={styles.spacing}>
        <Box>
          <h3>{t("stats.gamemodes.main")}</h3>
          <p>{t("loading")}</p>
        </Box>
      </div>
    );
  }
}
