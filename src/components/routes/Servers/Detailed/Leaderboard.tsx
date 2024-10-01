import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import { addSeconds } from "date-fns";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import { ServerLeaderboardList } from "../../../../api/ReturnTypes";
import "../../../../assets/scss/App.scss";
import "../../../../locales/config";
import { Box } from "../../../Materials";
import { CheckBan } from "./AdminMode";
import * as styles from "./Leaderboard.module.scss";
import * as Mainstyles from "./Main.module.scss";

export function ServerLeaderboard(
  props: Readonly<{
    gameid: string;
  }>,
): React.ReactElement {
  const { t } = useTranslation();
  const [sortType, setSortType] = React.useState<string>("score");
  const getLanguage = () => window.localStorage.i18nextLng;
  const numberFormat = new Intl.NumberFormat(getLanguage());
  const [adminMode] = useLocalStorage<boolean>("adminMode", false);
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

  const players = stats?.data;
  let playerIds: number[] = [];
  playerIds = playerIds.concat(
    players?.map((player) => {
      return player?.playerId;
    }),
  );

  const {
    isLoading: checkBanLoading,
    isError: checkBanError,
    data: checkBanInfo,
  } = useQuery({
    queryKey: ["managerCheckPlayers" + playerIds + "leaderboard"],
    queryFn: () => GametoolsApi.managerCheckPlayers({ playerIds }),
  });

  if (loading || error) {
    return (
      <div className={Mainstyles.spacing}>
        <h2 className={Mainstyles.title}>{t("servers.leaderboard.main")}</h2>
        <p className={Mainstyles.description}>{t("loading")}</p>
      </div>
    );
  }

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
          <option value="deaths">{t("servers.leaderboard.row.deaths")}</option>
          <option value="wins">{t("servers.leaderboard.row.wins")}</option>
          <option value="losses">{t("servers.leaderboard.row.losses")}</option>
        </select>
        <p style={{ marginTop: "1rem", marginLeft: "1rem" }}>
          {t("servers.leaderboard.reset")}
        </p>
      </div>
      {players?.length !== 0 ? (
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
                    <CheckBan
                      playerId={key.playerId.toString()}
                      checkBanInfo={checkBanInfo}
                      checkBanLoading={checkBanLoading}
                      checkBanError={checkBanError}
                      adminMode={adminMode}
                    >
                      <p
                        className={Mainstyles.description}
                        style={{ lineHeight: 0 }}
                      >
                        {t("stats.view")}
                      </p>
                    </CheckBan>
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
                    {key.timePlayed > 3600
                      ? t("hourChange", {
                          change: addSeconds(new Date(), key.timePlayed),
                        })
                      : t("change", {
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
