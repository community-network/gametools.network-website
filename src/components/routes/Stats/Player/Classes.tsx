import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import { Box } from "../../../Materials";
import { Views } from "./Main";
import { MainStatsClasses } from "../../../../api/ReturnTypes";
import { addSeconds } from "date-fns";
import sslFix from "../../../functions/fixEaAssets";
import Styles from "./Main.module.scss";

export function ViewClasses(props: Readonly<Views>): React.ReactElement {
  const { t, i18n } = useTranslation();
  const getLanguage = () => window.localStorage.i18nextLng;
  const numberFormat = new Intl.NumberFormat(getLanguage());
  if (!props.loading && !props.error) {
    const classes = props.stats.classes;
    return (
      <div className={Styles.spacing}>
        <Box>
          <>
            <h3>{t("stats.classes.main")}</h3>
            {classes.map((key: MainStatsClasses, index: number) => {
              return (
                <div key={index}>
                  <div className="column">
                    <div className="row">
                      <h4 style={{ margin: 0 }}>
                        {props.game === "bf2042" ? (
                          <>{key.statName}</>
                        ) : (
                          <>
                            {i18n.exists(`stats.classes.${key.className}`)
                              ? t(`stats.classes.${key.className}`)
                              : key.className}
                          </>
                        )}
                      </h4>
                      <img
                        className={Styles.listImage}
                        style={{ height: "3rem" }}
                        src={sslFix(key?.image)}
                        loading="lazy"
                      />
                    </div>
                    {key?.score !== undefined && (
                      <div className="row">
                        <h4 style={{ margin: 0 }}>
                          {numberFormat.format(key.score)}
                        </h4>
                        <p>{t("stats.classes.amounts.score")}</p>
                      </div>
                    )}
                    {key?.kills !== undefined && (
                      <div className="row">
                        <h4 style={{ margin: 0 }}>
                          {numberFormat.format(key.kills)}
                        </h4>
                        <p>{t("stats.classes.amounts.kills")}</p>
                      </div>
                    )}
                    {key?.kpm !== undefined && (
                      <div className="row">
                        <h4 style={{ margin: 0 }}>
                          {numberFormat.format(key.kpm)}
                        </h4>
                        <p>{t("stats.classes.amounts.kpm")}</p>
                      </div>
                    )}
                    {key?.secondsPlayed !== undefined && (
                      <div className="row">
                        <h4 style={{ margin: 0 }}>
                          {t("change", {
                            change: addSeconds(new Date(), key.secondsPlayed),
                          })}
                        </h4>
                        <p>{t("stats.classes.amounts.timePlayed")}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        </Box>
      </div>
    );
  } else {
    return (
      <div className={Styles.spacing}>
        <Box>
          <h3>{t("stats.classes.main")}</h3>
          <p>{t("loading")}</p>
        </Box>
      </div>
    );
  }
}
