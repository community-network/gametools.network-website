import * as React from "react";
import "../../../../locales/config";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../../assets/scss/App.scss";
import { Align, Circle } from "../../../Materials";
import { ServerOwnerResult } from "../../../../api/ReturnTypes";
import {
  OriginDescription,
  OriginName,
  OriginProfile,
  Spacing,
} from "./Servers";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import { useQuery } from "@tanstack/react-query";
import { serverToStatsPlatform } from "../../../../api/static";
import sslFix from "../../../functions/fixEaAssets";

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
        <Spacing>
          <h3>{title}</h3>
          <Align>
            <Circle style={{ marginTop: ".5rem" }} />
            <div>
              <OriginName>{t("loading")}</OriginName>
              <OriginDescription>
                {t("stats.originDescription")}
              </OriginDescription>
            </div>
          </Align>
        </Spacing>
      );
    } else if (error) {
      return (
        <Spacing>
          <h3>{title}</h3>
          <Align>
            <Circle style={{ marginTop: ".5rem" }} />
            <div>
              <OriginName>{t("404")}</OriginName>
              <OriginDescription>
                {t("stats.originDescription")}
              </OriginDescription>
            </div>
          </Align>
        </Spacing>
      );
    } else {
      owner = data;
    }
  }

  if (owner === null) {
    return (
      <Spacing>
        <h3>{title}</h3>
        <Align>
          <Circle style={{ marginTop: ".5rem" }} />
          <div>
            <OriginName>{t("404")}</OriginName>
            <OriginDescription>{t("servers.owner.none")}</OriginDescription>
          </div>
        </Align>
      </Spacing>
    );
  }
  return (
    <Spacing>
      <h2>{title}</h2>
      <Align>
        <Link
          to={`/stats/${
            serverToStatsPlatform[owner.platformId] || "pc"
          }/playerid/${owner.id || owner.personaId}?game=${
            props.game
          }&name=${encodeURIComponent(owner.name)}`}
        >
          <OriginProfile src={sslFix(owner?.avatar)} />
        </Link>
        <Link
          to={`/stats/${
            serverToStatsPlatform[owner.platformId] || "pc"
          }/playerid/${owner.id || owner.personaId}?game=${
            props.game
          }&name=${encodeURIComponent(owner.name)}`}
        >
          <div>
            <OriginName>
              {owner.name !== "" ? owner.name : t("servers.owner.unknown")}
            </OriginName>
            <OriginDescription>
              {t("stats.originDescription")}
            </OriginDescription>
          </div>
        </Link>
      </Align>
    </Spacing>
  );
}
