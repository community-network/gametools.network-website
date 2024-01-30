import * as React from "react";
import "../../../../locales/config";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../../assets/scss/App.scss";
import { Box } from "../../../Materials";
import { ScoreServerPlayer, ScoreTeamList } from "../../../../api/ReturnTypes";
import Styles from "./Main.module.scss";

export function ServerScoreboard(
  props: Readonly<{
    game: string;
    platform: string;
    stats: ScoreTeamList[];
  }>,
): React.ReactElement {
  const teams = props.stats;
  const { t } = useTranslation();
  const getLanguage = () => window.localStorage.i18nextLng;
  const numberFormat = new Intl.NumberFormat(getLanguage());
  return (
    <div className={Styles.spacing}>
      <h2 className={Styles.title}>{t("servers.playerlist.main")}</h2>
      {teams !== null ? (
        <>
          {teams.map((teamInfo: ScoreTeamList, index: number) => {
            return (
              <div key={index}>
                <div className="align">
                  <h3 style={{ margin: ".5rem", marginTop: 0 }}>
                    {t(`servers.factions.${teamInfo.teamid}`)}
                  </h3>
                </div>
                <Box>
                  {teamInfo.players.length !== 0 ? (
                    <>
                      {teamInfo.players.map(
                        (key: ScoreServerPlayer, index: number) => {
                          return (
                            <div className="column" key={index}>
                              <div className="row">
                                <div className="alignW">
                                  {props.game !== "bf2042" && (
                                    <img
                                      src={`https://cdn.gametools.network/${props.game}/${key.rank}.webp`}
                                      height="25px"
                                      loading="lazy"
                                    />
                                  )}
                                  <Link
                                    to={`/stats/${props.platform}/playerid/${
                                      key.player_id
                                    }?game=${
                                      props.game
                                    }&name=${encodeURIComponent(key.name)}`}
                                  >
                                    <>
                                      <h4
                                        style={{
                                          maxWidth: "11rem",
                                          width: "auto",
                                          minWidth: "8rem",
                                          margin: "0.5rem",
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        {key.tag !== "" && key.tag !== undefined
                                          ? `[${key.tag}]`
                                          : ""}
                                        {key.name}
                                      </h4>
                                    </>
                                  </Link>
                                </div>
                              </div>
                              <div className="row" style={{ flex: 0.4 }}>
                                <h4 style={{ marginTop: "0.5rem" }}>
                                  {numberFormat.format(key.score)}
                                </h4>
                                <p
                                  className={Styles.description}
                                  style={{ lineHeight: 0 }}
                                >
                                  {t("servers.leaderboard.row.score")}
                                </p>
                              </div>
                              <div className="row" style={{ flex: 0.4 }}>
                                <h4 style={{ marginTop: "0.5rem" }}>
                                  {numberFormat.format(key.kills)}
                                </h4>
                                <p
                                  className={Styles.description}
                                  style={{ lineHeight: 0 }}
                                >
                                  {t("servers.leaderboard.row.kills")}
                                </p>
                              </div>
                              <div className="row" style={{ flex: 0.4 }}>
                                <h4 style={{ marginTop: "0.5rem" }}>
                                  {numberFormat.format(key.deaths)}
                                </h4>
                                <p
                                  className={Styles.description}
                                  style={{ lineHeight: 0 }}
                                >
                                  {t("servers.leaderboard.row.deaths")}
                                </p>
                              </div>
                              <div className="phoneRow">
                                <a
                                  className="buttonLink"
                                  style={{
                                    marginTop: ".5rem",
                                  }}
                                  href={`https://gametools.network/stats/${
                                    props.platform
                                  }/playerid/${key.player_id}?game=${
                                    props.game
                                  }&name=${encodeURIComponent(key.name)}`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {t("stats.view")}
                                </a>
                              </div>
                            </div>
                          );
                        },
                      )}
                    </>
                  ) : (
                    <p>{t("servers.playerlist.empty")}</p>
                  )}
                </Box>
              </div>
            );
          })}
        </>
      ) : (
        <Box>
          <p>{t("servers.playerlist.empty")}</p>
        </Box>
      )}
    </div>
  );
}
