import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import { UserGames } from "../../../../api/ReturnTypes";
import "../../../../locales/config";
import sslFix from "../../../functions/fixEaAssets";
import * as styles from "./ViewOrigin.module.scss";

export interface Views {
  loading: boolean;
  error: boolean;
  game: string;
  name: string;
  stats: UserGames;
}

interface OriginViews extends Views {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
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

export function ViewEmblem(
  props: Readonly<{ emblem: string }>,
): React.ReactElement {
  const { t } = useTranslation();
  return (
    // normal playerName
    <div style={{ position: "absolute", right: 0 }}>
      <div className="align">
        <h4 className={styles.originDescription}>{t("stats.currentEmblem")}</h4>
        <img
          className={styles.originProfile}
          src={sslFix(props?.emblem)}
          alt={t("stats.currentEmblem")}
        />
      </div>
    </div>
  );
}

export function ViewOrigin(props: Readonly<OriginViews>): React.ReactElement {
  const { t } = useTranslation();
  const stats = props?.stats;
  const name = props?.name;

  if (props.error) {
    if (
      typeof props.errors == "object" &&
      Array.isArray(props.errors) &&
      typeof props?.errors?.includes === "function" &&
      props.errors?.includes("Player not found")
    ) {
      return (
        // if playername isnt found
        <div className="align">
          <span className="circle" />
          <div>
            <h2 className={styles.originName}>{t("404")}</h2>
            <h4 className={styles.originDescription}>{t("playerNotFound")}</h4>
          </div>
        </div>
      );
    }
    console.log(props.errors?.error?.message);
    return (
      // for other errors
      <div className="align">
        <span className="circle" />
        <div>
          <h2 className={styles.originName}>{t("404")}</h2>
          <h4 className={styles.originDescription}>{props.errors?.error?.message?.toString()}</h4>
        </div>
      </div>
    );
  }

  if (props.loading) {
    return (
      // loading page
      <div className="align">
        <span className="circle" />
        <div>
          <h2 className={styles.originName}>{t("loading")}</h2>
          <h4 className={styles.originDescription}>{t("loading")}</h4>
        </div>
      </div>
    );
  }

  if (stats?.userName !== null) {
    return (
      // normal playerName
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
    );
  }

  if (name !== null) {
    return (
      // if playerid but ?name behind it
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
    );
  } else {
    return (
      // if no ?name behind it
      <div className="align">
        <span className="circle" />
        <div>
          <h2 className={styles.originName}>{t("notApplicable")}</h2>
          <h4 className={styles.originDescription}>
            {t("noName")} - { }
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
    );
  }
}
