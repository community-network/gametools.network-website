import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import "../../../../assets/scss/App.scss";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import { useQuery } from "@tanstack/react-query";
import { Box } from "../../../Materials";
import { ServerLeaderboardList } from "../../../../api/ReturnTypes";
import { addSeconds } from "date-fns";
import * as styles from "./Leaderboard.module.scss";
import * as Mainstyles from "./Main.module.scss";

export function ServerLeaderboard(props: {
  gameid: string;
}): React.ReactElement {
  const { t } = useTranslation();
  const [sortType, setSortType] = React.useState<string>("score");
  const getLanguage = () => window.localStorage.i18nextLng;
  const numberFormat = new Intl.NumberFormat(getLanguage());
  const gameId = props.gameid;
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery({
    queryKey: ["serverLeaderboard" + gameId + sortType],
    queryFn: () =>
      GametoolsApi.serverLeaderboard({
        gameId: gameId,
        amount: "50",
        sort: sortType,
      }),
  });
  if (!loading && !error) {
    const players = stats.data;
    return (
      <div className={Mainstyles.spacing}>
        <div className="align">
          <h2>{t("servers.leaderboard.main")}</h2>
          <select
            aria-label={t("ariaLabels.sort")}
            className="selectPrimary"
            style={{ margin: 0, marginLeft: "24px" }}
            value={sortType}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
              setSortType(ev.target.value)
            }
          >
            <option value="timeplayed">
              {t("servers.leaderboard.row.timePlayed")}
            </option>
            <option value="score">{t("servers.leaderboard.row.score")}</option>
            <option value="killdeath">
              {t("servers.leaderboard.row.killDeath")}
            </option>
            <option value="kills">{t("servers.leaderboard.row.kills")}</option>
            <option value="deaths">
              {t("servers.leaderboard.row.deaths")}
            </option>
            <option value="wins">{t("servers.leaderboard.row.wins")}</option>
            <option value="losses">
              {t("servers.leaderboard.row.losses")}
            </option>
          </select>
        </div>
        {players.length !== 0 ? (
          <Box>
            {players.map((key: ServerLeaderboardList, index: number) => {
              return (
                <div className="column" key={index}>
                  <div className="row">
                    <a
                      href={`https://gametools.network/stats/pc/playerid/${
                        key.playerId
                      }?game=bf1&name=${encodeURIComponent(key.name)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <h4 className={styles.serverPlayerName}>
                        {key.platoon !== "" ? `[${key.platoon}]` : ""}
                        {key.name}
                      </h4>
                      <p
                        className={Mainstyles.description}
                        style={{ lineHeight: 0 }}
                      >
                        {t("stats.view")}
                      </p>
                    </a>
                  </div>
                  <div className="smallestPhoneRow">
                    <h4>{numberFormat.format(key.score)}</h4>
                    <p
                      className={Mainstyles.description}
                      style={{ lineHeight: 0 }}
                    >
                      {t("servers.leaderboard.row.score")}
                    </p>
                  </div>
                  <div className="row">
                    <h4>{numberFormat.format(key.killDeath)}</h4>
                    <p
                      className={Mainstyles.description}
                      style={{ lineHeight: 0 }}
                    >
                      {t("servers.leaderboard.row.killDeath")}
                    </p>
                  </div>
                  <div className="tabletRow">
                    <h4>{numberFormat.format(key.kills)}</h4>
                    <p
                      className={Mainstyles.description}
                      style={{ lineHeight: 0 }}
                    >
                      {t("servers.leaderboard.row.kills")}
                    </p>
                  </div>
                  <div className="tabletRow">
                    <h4>{numberFormat.format(key.deaths)}</h4>
                    <p
                      className={Mainstyles.description}
                      style={{ lineHeight: 0 }}
                    >
                      {t("servers.leaderboard.row.deaths")}
                    </p>
                  </div>
                  <div className="smallPhoneRow">
                    <h4>{numberFormat.format(key.wins)}</h4>
                    <p
                      className={Mainstyles.description}
                      style={{ lineHeight: 0 }}
                    >
                      {t("servers.leaderboard.row.wins")}
                    </p>
                  </div>
                  <div className="smallPhoneRow">
                    <h4>{numberFormat.format(key.losses)}</h4>
                    <p
                      className={Mainstyles.description}
                      style={{ lineHeight: 0 }}
                    >
                      {t("servers.leaderboard.row.losses")}
                    </p>
                  </div>
                  <div className="row">
                    <h4>
                      {t("change", {
                        change: addSeconds(new Date(), key.timePlayed),
                      })}
                    </h4>
                    <p
                      className={Mainstyles.description}
                      style={{ lineHeight: 0 }}
                    >
                      {t("servers.leaderboard.row.timePlayed")}
                    </p>
                  </div>
                </div>
              );
            })}
          </Box>
        ) : (
          <Box>
            <p>{t("servers.leaderboard.none")}</p>
          </Box>
        )}
      </div>
    );
  }
  return (
    <div className={Mainstyles.spacing}>
      <h2 className={Mainstyles.title}>{t("servers.leaderboard.main")}</h2>
      <p className={Mainstyles.description}>{t("loading")}</p>
    </div>
  );
}
