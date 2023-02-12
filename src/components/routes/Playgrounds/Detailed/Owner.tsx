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
} from "./Playgrounds";
import { useQuery } from "@tanstack/react-query";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import { serverToStatsPlatform } from "../../../../api/static";

export function PlaygroundOwner(props: {
  owner: ServerOwnerResult;
  game: string;
}): React.ReactElement {
  const { t } = useTranslation();
  let owner = props.owner;
  if (owner === null) {
    return (
      <Spacing>
        <h3>{t("playgrounds.owner.main")}</h3>
        <Align>
          <Circle style={{ marginTop: ".5rem" }} />
          <div>
            <OriginName>{t("404")}</OriginName>
            <OriginDescription>{t("playgrounds.owner.none")}</OriginDescription>
          </div>
        </Align>
      </Spacing>
    );
  }

  if (props.game === "bf2042") {
    const {
      isLoading: loading,
      isError: error,
      data: data,
    } = useQuery(
      ["feslid" + props.game + props.owner.id + props.owner.platformId],
      () =>
        GametoolsApi.feslid({
          game: props.game,
          ownerInfo: props.owner,
        }),
    );
    if (loading) {
      return (
        <Spacing>
          <h3>{t("servers.owner.main")}</h3>
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
          <h3>{t("servers.owner.main")}</h3>
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

  return (
    <Spacing>
      <h2>{t("playgrounds.owner.main")}</h2>
      <Align>
        <Link
          to={`/stats/pc/playerid/${owner.id}?game=${
            serverToStatsPlatform[owner.platformId] || "pc"
          }/playerid/${owner.id || owner.personaId}?game=${
            props.game
          }&name=${encodeURIComponent(owner.name)}`}
        >
          <OriginProfile src={owner.avatar} />
        </Link>
        <Link
          to={`/stats/pc/playerid/${owner.id}?game=${
            serverToStatsPlatform[owner.platformId] || "pc"
          }/playerid/${owner.id || owner.personaId}?game=${
            props.game
          }&name=${encodeURIComponent(owner.name)}`}
        >
          <div>
            <OriginName>
              {owner.name !== "" ? owner.name : t("playgrounds.owner.unknown")}
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
