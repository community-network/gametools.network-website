import * as React from "react";
import "../../../../locales/config";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../../assets/scss/App.scss";
import { ServerOwnerResult } from "../../../../api/ReturnTypes";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import { useQuery } from "@tanstack/react-query";
import { serverToStatsPlatform } from "../../../../api/static";
import sslFix from "../../../functions/fixEaAssets";
import MainStyles from "./Main.module.scss";

export function OwnerInfo(props: {
  owner: ServerOwnerResult;
  game: string;
  title: string;
}): React.ReactElement {
  const { t } = useTranslation();
  const { game, title } = props;
  let { owner } = props;

  if (game === "bf2042") {
    const {
      isLoading: loading,
      isError: error,
      data: data,
    } = useQuery({
      queryKey: ["feslid" + game + owner?.id + owner?.platformId],
      queryFn: () =>
        GametoolsApi.feslid({
          game: game,
          ownerInfo: owner,
        }),
    });
    if (loading) {
      return (
        <div className={MainStyles.spacing}>
          <h3>{title}</h3>
          <div className="align">
            <span className="circle" style={{ marginTop: ".5rem" }} />
            <div>
              <h2 className={MainStyles.originName}>{t("loading")}</h2>
              <h4 className={MainStyles.originDescription}>
                {t("stats.originDescription")}
              </h4>
            </div>
          </div>
        </div>
      );
    } else if (error) {
      return (
        <div className={MainStyles.spacing}>
          <h3>{title}</h3>
          <div className="align">
            <span className="circle" style={{ marginTop: ".5rem" }} />
            <div>
              <h2 className={MainStyles.originName}>{t("404")}</h2>
              <h4 className={MainStyles.originDescription}>
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

  if (owner === null) {
    return (
      <div className={MainStyles.spacing}>
        <h3>{title}</h3>
        <div className="align">
          <span className="circle" style={{ marginTop: ".5rem" }} />
          <div>
            <h2 className={MainStyles.originName}>{t("404")}</h2>
            <h4 className={MainStyles.originDescription}>
              {t("servers.owner.none")}
            </h4>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={MainStyles.spacing}>
      <h2>{title}</h2>
      <div className="align">
        <Link
          to={`/stats/${
            serverToStatsPlatform[owner.platformId] || "pc"
          }/playerid/${owner.id || owner.personaId}?game=${
            props.game
          }&name=${encodeURIComponent(owner.name)}`}
        >
          <img
            className={MainStyles.originProfile}
            src={sslFix(owner?.avatar)}
          />
        </Link>
        <Link
          to={`/stats/${
            serverToStatsPlatform[owner.platformId] || "pc"
          }/playerid/${owner.id || owner.personaId}?game=${
            props.game
          }&name=${encodeURIComponent(owner.name)}`}
        >
          <div>
            <h2 className={MainStyles.originName}>
              {owner.name !== "" ? owner.name : t("servers.owner.unknown")}
            </h2>
            <h4 className={MainStyles.originDescription}>
              {t("stats.originDescription")}
            </h4>
          </div>
        </Link>
      </div>
    </div>
  );
}
