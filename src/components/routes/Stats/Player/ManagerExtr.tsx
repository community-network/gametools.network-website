import { addSeconds } from "date-fns";
import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  MainStatsSession,
  SessionGamemode,
  SessionKit,
} from "../../../../api/ReturnTypes";
import "../../../../locales/config";
import { Box } from "../../../Materials";
import { Views } from "./Main";
import * as styles from "./Main.module.scss";

export function BfSessionInfo(props: Readonly<Views>): React.ReactElement {
  const { t } = useTranslation();
  const stats = props.stats;
  const getLanguage = () => window.localStorage.i18nextLng;
  const numberFormat = new Intl.NumberFormat(getLanguage());
  if (props.isLoading) {
    return (
      <div className={styles.spacing}>
        <div className="align">
          <h3 className={styles.title}>{t("stats.playSession.main")}</h3>
          <p style={{ marginTop: 0 }}>{t("stats.playSession.detailed")}</p>
        </div>
        <Box>
          <p>{t("loading")}</p>
        </Box>
      </div>
    );
  }

  if (props.isError || stats.sessions.length === 0) {
    return <></>;
  }

  return (
    <div className={styles.spacing}>
      <div className="align">
        <h3 className={styles.title}>{t("stats.playSession.main")}</h3>
        <p style={{ marginTop: 0 }}>{t("stats.playSession.detailed")}</p>
      </div>
      <Box>
        {stats.sessions.map((key: MainStatsSession, index: number) => {
          const gamemodes = [];
          const stats = key.stats;
          key.stats.gamemodes.forEach((key: SessionGamemode) => {
            if (key.score !== 0) {
              gamemodes.push(
                t(`stats.playSession.stats.gamemodes.${key.name}`),
              );
            }
          });
          const kits = stats.kits.filter((kit) => kit.timePlayed !== 0);
          return (
            <>
              <h3>
                {t("dateTime", { date: new Date(key.timeStamp) })} -{" "}
                {gamemodes.join("/")} (
                {t("change", {
                  change: addSeconds(new Date(), key.stats.timePlayed),
                })}
                )
              </h3>
              <p className={styles.description}>{key.serverName}</p>
              <div className="alignS" style={{ marginTop: "0.8rem" }}>
                <div>
                  <h3>{numberFormat.format(stats.kills)}</h3>
                  <p>{t("stats.playSession.stats.kills")}</p>
                </div>
                <div>
                  <h3>{numberFormat.format(stats.deaths)}</h3>
                  <p>{t("stats.playSession.stats.deaths")}</p>
                </div>
                <div>
                  <h3>{numberFormat.format(stats.wins)}</h3>
                  <p>{t("stats.playSession.stats.wins")}</p>
                </div>
                <div>
                  <h3>{numberFormat.format(stats.losses)}</h3>
                  <p>{t("stats.playSession.stats.losses")}</p>
                </div>
              </div>
              <hr
                style={{
                  marginBottom: "1rem",
                  width: "90%",
                  border: "1px solid #282a3a",
                }}
              />
              <div className="align">
                {kits.map((key: SessionKit) => {
                  return (
                    <div
                      key={key?.name}
                      style={{ marginRight: "3rem", marginBottom: "1rem" }}
                    >
                      <h3 style={{ marginBottom: 0 }}>{key.name}</h3>
                      <div className="align">
                        <div style={{ marginRight: "1rem" }}>
                          <p
                            className={styles.description}
                            style={{ margin: 0 }}
                          >
                            {t("stats.playSession.stats.score")}
                          </p>
                          <p
                            className={styles.description}
                            style={{ margin: 0 }}
                          >
                            {t("stats.playSession.stats.kills")}
                          </p>
                          <p
                            className={styles.description}
                            style={{ margin: 0 }}
                          >
                            {t("stats.playSession.stats.timePlayedAs")}
                          </p>
                        </div>
                        <div>
                          <h4 style={{ margin: 0 }}>
                            {numberFormat.format(key.score)}
                          </h4>
                          <h4 style={{ margin: 0 }}>
                            {numberFormat.format(key.kills)}
                          </h4>
                          <h4 style={{ margin: 0 }}>
                            {t("change", {
                              change: addSeconds(new Date(), key.timePlayed),
                            })}
                          </h4>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {typeof props.stats.sessions[index + 1] !== "undefined" && (
                <hr
                  style={{
                    marginBottom: "1rem",
                    width: "98%",
                    border: "1px solid #282a3a",
                  }}
                />
              )}
            </>
          );
        })}
      </Box>
    </div>
  );
}
