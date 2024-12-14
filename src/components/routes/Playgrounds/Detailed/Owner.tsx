import * as React from "react";
import "../../../../locales/config";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import "../../../../assets/scss/App.scss";
import { ServerOwnerResult } from "../../../../api/ReturnTypes";
import { useQuery } from "@tanstack/react-query";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import { serverToStatsPlatform } from "../../../../api/static";
import sslFix from "../../../functions/fixEaAssets";
import * as styles from "./Main.module.scss";

export function PlaygroundOwner(
  props: Readonly<{
    owner: ServerOwnerResult;
    game: string;
  }>,
): React.ReactElement {
  const { t } = useTranslation();
  let { owner } = props;
  if (owner === null) {
    return (
      <div className={styles.spacing}>
        <h3>{t("playgrounds.owner.main")}</h3>
        <div className="align">
          <span className="circle" style={{ marginTop: ".5rem" }} />
          <div>
            <h2 className={styles.originName}>{t("404")}</h2>
            <h4 className={styles.originDescription}>
              {t("playgrounds.owner.none")}
            </h4>
          </div>
        </div>
      </div>
    );
  }

  if (props.game === "bf2042") {
    const {
      isLoading: loading,
      isError: error,
      data: data,
    } = useQuery({
      queryKey: [
        "feslid" + props.game + props.owner?.id + props.owner?.platformId,
      ],
      queryFn: () =>
        GametoolsApi.feslid({
          game: props.game,
          ownerInfo: props.owner,
        }),
    });
    if (loading) {
      return (
        <div className={styles.spacing}>
          <h3>{t("servers.owner.main")}</h3>
          <div className="align">
            <span className="circle" style={{ marginTop: ".5rem" }} />
            <div>
              <h2 className={styles.originName}>{t("loading")}</h2>
              <h4 className={styles.originDescription}>
                {t("stats.originDescription")}
              </h4>
            </div>
          </div>
        </div>
      );
    } else if (error) {
      return (
        <div className={styles.spacing}>
          <h3>{t("servers.owner.main")}</h3>
          <div className="align">
            <span className="circle" style={{ marginTop: ".5rem" }} />
            <div>
              <h2 className={styles.originName}>{t("404")}</h2>
              <h4 className={styles.originDescription}>
                {t("stats.originDescription")}
              </h4>
            </div>
          </div>
        </div>
      );
    } else {
      owner = data;
    }
  }

  return (
    <div className={styles.spacing}>
      <h2>{t("playgrounds.owner.main")}</h2>
      <div className="align">
        <Link
          to={`/stats/pc/playerid/${owner.id}?game=${serverToStatsPlatform[owner.platformId] || "pc"
            }/playerid/${owner.id || owner.personaId}?game=${props.game
            }&name=${encodeURIComponent(owner.name)}`}
        >
          <img
            alt={t("stats.profileImage")}
            className={styles.originProfile}
            src={sslFix(owner?.avatar)}
            loading="lazy"
          />
        </Link>
        <Link
          to={`/stats/pc/playerid/${owner.id}?game=${serverToStatsPlatform[owner.platformId] || "pc"
            }/playerid/${owner.id || owner.personaId}?game=${props.game
            }&name=${encodeURIComponent(owner.name)}`}
        >
          <div>
            <h2 className={styles.originName}>
              {owner?.name !== ""
                ? owner?.name
                : t("playgrounds.owner.unknown")}
            </h2>
            <h4 className={styles.originDescription}>
              {t("stats.originDescription")}
            </h4>
          </div>
        </Link>
      </div>
    </div>
  );
}
