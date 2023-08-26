import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import { Circle, Align } from "../../../Materials";
import { Spacing } from "./Main";
import styled from "styled-components";
import { UserGames } from "../../../../api/ReturnTypes";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import { useQuery } from "@tanstack/react-query";
import sslFix from "../../../functions/fixEaAssets";

const OriginProfile = styled.img`
  width: 60px;
  margin-right: 1.5rem;
`;

const OriginName = styled.h2`
  line-height: 60%;
`;

const OriginDescription = styled.h4`
  line-height: 60%;
`;

export interface Views {
  loading: boolean;
  error: boolean;
  game: string;
  name: string;
  stats: UserGames;
}

function GetBfBan(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery(["bfbanStats" + props.game + props.stats.id], () =>
    GametoolsApi.bfbanCheckPlayers({
      getter: "playerid",
      usernames: [props.stats.id],
    }),
  );

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
    } else {
      color = "#ffffff";
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

export function ViewOrigin(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const stats = props?.stats;
  const name = props?.name;
  if (props.error) {
    return (
      // if playername isnt found
      <Spacing>
        <Align>
          <Circle />
          <div>
            <OriginName>{t("404")}</OriginName>
            <OriginDescription>{t("playerNotFound")}</OriginDescription>
          </div>
        </Align>
      </Spacing>
    );
  } else if (!props.loading && !props.error) {
    if (stats?.userName === null) {
      if (name !== null) {
        return (
          // if playerid but ?name behind it
          <Spacing>
            <Align>
              <Circle />
              <div>
                <OriginName>{name}</OriginName>
                <OriginDescription>
                  <GetBfBan
                    loading={false}
                    error={false}
                    game={props.game}
                    name={props.name}
                    stats={props.stats}
                  />
                </OriginDescription>
              </div>
            </Align>
          </Spacing>
        );
      } else {
        return (
          // if no ?name behind it
          <Spacing>
            <Align>
              <Circle />
              <div>
                <OriginName>{t("notApplicable")}</OriginName>
                <OriginDescription>
                  {t("noName")} - {}
                  <GetBfBan
                    loading={false}
                    error={false}
                    game={props.game}
                    name={props.name}
                    stats={props.stats}
                  />
                </OriginDescription>
              </div>
            </Align>
          </Spacing>
        );
      }
    } else {
      return (
        // normal playerName
        <Spacing>
          <Align>
            <OriginProfile src={sslFix(stats?.avatar)} />
            <div>
              <OriginName>{stats.userName}</OriginName>
              <OriginDescription>
                <GetBfBan
                  loading={false}
                  error={false}
                  game={props.game}
                  name={props.name}
                  stats={props.stats}
                />
              </OriginDescription>
            </div>
          </Align>
        </Spacing>
      );
    }
  } else {
    return (
      // loading page
      <Spacing>
        <Align>
          <Circle />
          <div>
            <OriginName>{t("loading")}</OriginName>
            <OriginDescription>{t("loading")}</OriginDescription>
          </div>
        </Align>
      </Spacing>
    );
  }
}
