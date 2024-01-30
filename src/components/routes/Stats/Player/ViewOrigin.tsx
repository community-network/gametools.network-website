import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import { UserGames } from "../../../../api/ReturnTypes";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import { useQuery } from "@tanstack/react-query";
import sslFix from "../../../functions/fixEaAssets";
import styles from "./ViewOrigin.module.scss";
import MainStyles from "./Main.module.scss";

export interface Views {
  loading: boolean;
  error: boolean;
  game: string;
  name: string;
  stats: UserGames;
}

function GetBfBan(props: Readonly<Views>): React.ReactElement {
  const { t } = useTranslation();
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery({
    queryKey: ["bfbanStats" + props.game + props.stats.id],
    queryFn: () =>
      GametoolsApi.bfbanCheckPlayers({
        getter: "playerid",
        usernames: [props.stats.id],
      }),
  });

  let bfBanUrl = "";
  let isHacker = false;
  let color = "#ffffff";
  if (!loading && !error) {
    const list = stats.personaids;
    for (const [key, value] of Object.entries(list)) {
      if (!value.hacker) {
        delete list[key];
      }
    }
    if (props?.stats?.id in list) {
      isHacker = list[props?.stats?.id]?.hacker;
      bfBanUrl = list[props?.stats?.id]?.url;
      color = "#DC143C";
    }
  }

  if (isHacker) {
    return (
      <a
        style={{ color: color, lineHeight: 0 }}
        href={bfBanUrl}
        target="_blank"
        rel="noreferrer"
      >
        {t("bfban.stats")}
      </a>
    );
  }
  return <>{t("stats.originDescription")}</>;
}

export function ViewOrigin(props: Readonly<Views>): React.ReactElement {
  const { t } = useTranslation();
  const stats = props?.stats;
  const name = props?.name;
  if (props.error) {
    return (
      // if playername isnt found
      <div className={MainStyles.spacing}>
        <div className="align">
          <span className="circle" />
          <div>
            <h2 className={styles.originName}>{t("404")}</h2>
            <h4 className={styles.originDescription}>{t("playerNotFound")}</h4>
          </div>
        </div>
      </div>
    );
  } else if (!props.loading && !props.error) {
    if (stats?.userName === null) {
      if (name !== null) {
        return (
          // if playerid but ?name behind it
          <div className={MainStyles.spacing}>
            <div className="align">
              <span className="circle" />
              <div>
                <h2 className={styles.originName}>{name}</h2>
                <h4 className={styles.originDescription}>
                  <GetBfBan
                    loading={false}
                    error={false}
                    game={props.game}
                    name={props.name}
                    stats={props.stats}
                  />
                </h4>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          // if no ?name behind it
          <div className={MainStyles.spacing}>
            <div className="align">
              <span className="circle" />
              <div>
                <h2 className={styles.originName}>{t("notApplicable")}</h2>
                <h4 className={styles.originDescription}>
                  {t("noName")} - {}
                  <GetBfBan
                    loading={false}
                    error={false}
                    game={props.game}
                    name={props.name}
                    stats={props.stats}
                  />
                </h4>
              </div>
            </div>
          </div>
        );
      }
    } else {
      return (
        // normal playerName
        <div className={MainStyles.spacing}>
          <div className="align">
            <img
              className={styles.originProfile}
              src={sslFix(stats?.avatar)}
              alt={t("stats.profileImage")}
            />
            <div>
              <h2 className={styles.originName}>{stats.userName}</h2>
              <h4 className={styles.originDescription}>
                <GetBfBan
                  loading={false}
                  error={false}
                  game={props.game}
                  name={props.name}
                  stats={props.stats}
                />
              </h4>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return (
      // loading page
      <div className={MainStyles.spacing}>
        <div className="align">
          <span className="circle" />
          <div>
            <h2 className={styles.originName}>{t("loading")}</h2>
            <h4 className={styles.originDescription}>{t("loading")}</h4>
          </div>
        </div>
      </div>
    );
  }
}
