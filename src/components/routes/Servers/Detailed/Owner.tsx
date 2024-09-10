import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import { ServerOwnerResult } from "../../../../api/ReturnTypes";
import { serverToStatsPlatform } from "../../../../api/static";
import "../../../../assets/scss/App.scss";
import "../../../../locales/config";
import sslFix from "../../../functions/fixEaAssets";
import * as Mainstyles from "./Main.module.scss";

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
        <div className={Mainstyles.spacing}>
          <h3>{title}</h3>
          <div className="align">
            <span className="circle" style={{ marginTop: ".5rem" }} />
            <div>
              <h2 className={Mainstyles.originName}>{t("loading")}</h2>
              <h4 className={Mainstyles.originDescription}>
                {t("stats.originDescription")}
              </h4>
            </div>
          </div>
        </div>
      );
    } else if (error) {
      return (
        <div className={Mainstyles.spacing}>
          <h3>{title}</h3>
          <div className="align">
            <span className="circle" style={{ marginTop: ".5rem" }} />
            <div>
              <h2 className={Mainstyles.originName}>{t("404")}</h2>
              <h4 className={Mainstyles.originDescription}>
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

  if (owner === null || owner === undefined) {
    return (
      <div className={Mainstyles.spacing}>
        <h3>{title}</h3>
        <div className="align">
          <span className="circle" style={{ marginTop: ".5rem" }} />
          <div>
            <h2 className={Mainstyles.originName}>{t("404")}</h2>
            <h4 className={Mainstyles.originDescription}>
              {t("servers.owner.none")}
            </h4>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={Mainstyles.spacing}>
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
            alt={t("stats.profileImage")}
            className={Mainstyles.originProfile}
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
            <h2 className={Mainstyles.originName}>
              {owner.name !== "" ? owner.name : t("servers.owner.unknown")}
            </h2>
            <h4 className={Mainstyles.originDescription}>
              {t("stats.originDescription")}
            </h4>
          </div>
        </Link>
      </div>
    </div>
  );
}
