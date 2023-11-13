import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import "../../../../assets/scss/App.scss";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import { useQuery } from "@tanstack/react-query";
import {
  Align,
  Box,
  Row,
  Column,
  SelectPrimary,
  TabletRow,
  SmallestPhoneRow,
  SmallPhoneRow,
} from "../../../Materials";
import { ServerLeaderboardList } from "../../../../api/ReturnTypes";
import { addSeconds } from "date-fns";
import { Description, Spacing, Title } from "./Servers";
import styled from "styled-components";

const ServerPlayerName = styled.h4`
  width: 9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

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
      <Spacing>
        <Align>
          <h2>{t("servers.leaderboard.main")}</h2>
          <SelectPrimary
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
          </SelectPrimary>
        </Align>
        {players.length !== 0 ? (
          <Box>
            {players.map((key: ServerLeaderboardList, index: number) => {
              return (
                <Column key={index}>
                  <Row>
                    <a
                      href={`https://gametools.network/stats/pc/playerid/${
                        key.playerId
                      }?game=bf1&name=${encodeURIComponent(key.name)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ServerPlayerName>
                        {key.platoon !== "" ? `[${key.platoon}]` : ""}
                        {key.name}
                      </ServerPlayerName>
                      <Description style={{ lineHeight: 0 }}>
                        {t("stats.view")}
                      </Description>
                    </a>
                  </Row>
                  <SmallestPhoneRow>
                    <h4>{numberFormat.format(key.score)}</h4>
                    <Description style={{ lineHeight: 0 }}>
                      {t("servers.leaderboard.row.score")}
                    </Description>
                  </SmallestPhoneRow>
                  <Row>
                    <h4>{numberFormat.format(key.killDeath)}</h4>
                    <Description style={{ lineHeight: 0 }}>
                      {t("servers.leaderboard.row.killDeath")}
                    </Description>
                  </Row>
                  <TabletRow>
                    <h4>{numberFormat.format(key.kills)}</h4>
                    <Description style={{ lineHeight: 0 }}>
                      {t("servers.leaderboard.row.kills")}
                    </Description>
                  </TabletRow>
                  <TabletRow>
                    <h4>{numberFormat.format(key.deaths)}</h4>
                    <Description style={{ lineHeight: 0 }}>
                      {t("servers.leaderboard.row.deaths")}
                    </Description>
                  </TabletRow>
                  <SmallPhoneRow>
                    <h4>{numberFormat.format(key.wins)}</h4>
                    <Description style={{ lineHeight: 0 }}>
                      {t("servers.leaderboard.row.wins")}
                    </Description>
                  </SmallPhoneRow>
                  <SmallPhoneRow>
                    <h4>{numberFormat.format(key.losses)}</h4>
                    <Description style={{ lineHeight: 0 }}>
                      {t("servers.leaderboard.row.losses")}
                    </Description>
                  </SmallPhoneRow>
                  <Row>
                    <h4>
                      {t("change", {
                        change: addSeconds(new Date(), key.timePlayed),
                      })}
                    </h4>
                    <Description style={{ lineHeight: 0 }}>
                      {t("servers.leaderboard.row.timePlayed")}
                    </Description>
                  </Row>
                </Column>
              );
            })}
          </Box>
        ) : (
          <Box>
            <p>{t("servers.leaderboard.none")}</p>
          </Box>
        )}
      </Spacing>
    );
  }
  return (
    <Spacing>
      <Title>{t("servers.leaderboard.main")}</Title>
      <Description>{t("loading")}</Description>
    </Spacing>
  );
}
