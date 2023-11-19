import * as React from "react";
import "../../../../locales/config";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../../assets/scss/App.scss";
import {
  bfbanPlayer,
  bfeacPlayer,
  GametoolsApi,
} from "../../../../api/GametoolsApi";
import { useQuery } from "@tanstack/react-query";
import {
  Align,
  AlignW,
  Box,
  Row,
  Column,
  ButtonLink,
  PhoneRow,
  SelectPrimary,
} from "../../../Materials";
import {
  DetailedServerInfo,
  ScoreServerPlayer,
  seederPlayer,
  serverPlayer,
  ServerPlayersReturn,
  serverTeamList,
} from "../../../../api/ReturnTypes";
import { bf1_factions, factions } from "../../../../api/Factions";
import { Description, Spacing, Title } from "./Servers";
import { DynamicSort } from "../../Stats/Player/Main";
import styled from "styled-components";
import { playerToStatsPlatform } from "../../../../api/static";
import { bfListApi, PlayerInfo, TeamInfo } from "../../../../api/bflistApi";
import sslFix from "../../../functions/fixEaAssets";

const ServerPlayerName = styled.h4`
  max-width: 11rem;
  width: 140px;
  min-width: 8rem;
  margin: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function CheckBan(props: {
  playerId: string;
  bfBanList: bfbanPlayer;
  bfbanLoading: boolean;
  bfbanError: boolean;
  bfeacList: bfeacPlayer;
  bfeacLoading: boolean;
  bfeacError: boolean;
}) {
  const { t } = useTranslation();

  const playerInfo = props.bfBanList?.personaids[props.playerId];
  const bfeac = props.bfeacList?.personaids?.includes(Number(props.playerId));
  let color = "#ffffff";

  if (playerInfo?.hacker || bfeac) {
    color = "#DC143C";
    return (
      <>
        <a style={{ color: color, lineHeight: 0 }}>{t("bfban.platoon")}: </a>
        {playerInfo?.hacker && (
          <a
            style={{ color: color, lineHeight: 0 }}
            href={playerInfo?.url}
            target="_blank"
            rel="noreferrer"
          >
            {t("bfban.main")}
          </a>
        )}
        {playerInfo?.hacker && bfeac && (
          <a style={{ color: color, lineHeight: 0 }}> - </a>
        )}
        {bfeac && (
          <a
            style={{ color: color, lineHeight: 0 }}
            href={`https://api.gametools.network/bfeac/get_case_id?player_id=${props.playerId}`}
            target="_blank"
            rel="noreferrer"
          >
            {t("bfeac.main")}
          </a>
        )}
      </>
    );
  }
  return <></>;
}

function Players(props: {
  stats: ServerPlayersReturn;
  game: string;
  platform: string;
  gameid: string;
}): React.ReactElement {
  const { t } = useTranslation();
  const teams = props.stats.teams;
  const [sortType, setSortType] = React.useState<string>("slot");
  const [copyState, setCopyState] = React.useState<string>("");

  let playerIds = [];
  teams.forEach((teamInfo: serverTeamList) => {
    playerIds = playerIds.concat(
      teamInfo.players.map((player) => {
        return player?.player_id?.toString();
      }),
    );
  });

  const {
    isLoading: bfbanLoading,
    isError: bfbanError,
    data: bfBanInfo,
  } = useQuery({
    queryKey: ["bfbanStatsServerPlayers" + props.gameid + props.game],
    queryFn: () =>
      GametoolsApi.bfbanCheckPlayers({
        getter: "playerid",
        usernames: playerIds,
      }),
  });

  const {
    isLoading: bfeacLoading,
    isError: bfeacError,
    data: bfeacInfo,
  } = useQuery({
    queryKey: ["bfeacStatsServerPlayers" + props.gameid + props.game],
    queryFn: () =>
      GametoolsApi.bfeacCheckPlayers({
        playerIds,
      }),
  });

  let update_timestamp = new Date();
  if (props.stats.update_timestamp) {
    update_timestamp = new Date(props.stats.update_timestamp * 1000);
  }

  const { data: seederInfo } = useQuery({
    queryKey: ["seederPlayerList" + props.gameid],
    queryFn: () =>
      GametoolsApi.seederPlayerList({
        game: props.game,
        gameId: props.gameid,
      }),
  });

  const haveSeederPlayers =
    seederInfo && seederInfo.teams && seederInfo.teams.length > 0;
  let seederPlayers: Map<number, seederPlayer> = new Map<
    number,
    seederPlayer
  >();
  if (haveSeederPlayers) {
    seederPlayers = new Map<number, seederPlayer>();
    seederInfo.teams.map((team) => {
      team.players.map((player) => seederPlayers.set(player.player_id, player));
    });
  }

  return (
    <Spacing>
      <Align>
        <h2>{t("servers.playerlist.main")}</h2>
        <SelectPrimary
          style={{ margin: 0, marginLeft: "24px" }}
          value={sortType}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
            setSortType(ev.target.value)
          }
        >
          <option value="slot">{t("servers.playerlist.row.playerSlot")}</option>
          <option value="join_time">
            {t("servers.playerlist.row.timePlayed")}
          </option>
          <option value="name">{t("servers.playerlist.row.playerName")}</option>
          <option value="-latency">{t("servers.playerlist.row.ping")}</option>
          <option value="-platoon">
            {t("servers.playerlist.row.platoon")}
          </option>
          <option value="-rank">{t("servers.playerlist.row.rank")}</option>
        </SelectPrimary>
        <p style={{ marginTop: "1rem", marginLeft: "1rem" }}>
          {t("servers.playerlist.lastUpdate")}{" "}
          {t("change", { change: update_timestamp })} {t("ago")}
        </p>
      </Align>
      {teams !== null ? (
        <>
          {teams.map((teamInfo: serverTeamList, index: number) => {
            teamInfo.players = teamInfo.players.sort(DynamicSort(sortType));
            return (
              <div key={index}>
                <Align>
                  <h3 style={{ margin: ".5rem", marginTop: 0 }}>
                    {teamInfo?.faction in factions
                      ? t(`servers.factions.${teamInfo.faction}`)
                      : t(`servers.factions.${teamInfo.teamid}`)}
                  </h3>
                </Align>
                <Box>
                  {teamInfo.players.length !== 0 ? (
                    <>
                      {teamInfo.players.map(
                        (key: serverPlayer, index: number) => {
                          const seederPlayer = seederPlayers.get(key.player_id);
                          const statsGame =
                            props.game === "bf1marne" ? "bf1" : props.game;
                          return (
                            <Column key={index}>
                              <Row>
                                <AlignW>
                                  {key?.rank !== undefined && (
                                    <img
                                      src={`https://cdn.gametools.network/bf1/${key?.rank}.png`}
                                      height="25px"
                                      loading="lazy"
                                    />
                                  )}
                                  <a
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      navigator.clipboard.writeText(key.name);
                                      setCopyState(key.name);
                                      const timer1 = setTimeout(
                                        () => setCopyState(""),
                                        1 * 1000,
                                      );
                                      return () => {
                                        clearTimeout(timer1);
                                      };
                                    }}
                                  >
                                    {copyState == key.name ? (
                                      <ServerPlayerName>
                                        {t("states.copied")}
                                      </ServerPlayerName>
                                    ) : (
                                      <ServerPlayerName>
                                        {key.platoon !== "" &&
                                        key.platoon !== undefined
                                          ? `[${key.platoon}]`
                                          : ""}
                                        {key.name}
                                      </ServerPlayerName>
                                    )}
                                  </a>
                                </AlignW>
                                <CheckBan
                                  playerId={key?.player_id?.toString()}
                                  bfBanList={bfBanInfo}
                                  bfbanLoading={bfbanLoading}
                                  bfbanError={bfbanError}
                                  bfeacList={bfeacInfo}
                                  bfeacLoading={bfeacLoading}
                                  bfeacError={bfeacError}
                                />
                              </Row>
                              {props.game === "bf2042" ? (
                                <Row>
                                  <h4 style={{ marginTop: "0.5rem" }}>
                                    {key.platform.toUpperCase()}
                                  </h4>
                                  <Description style={{ lineHeight: 0 }}>
                                    {t("servers.playerlist.row.platform")}
                                  </Description>
                                </Row>
                              ) : (
                                props.game !== "bf1marne" && (
                                  <Row>
                                    <h4 style={{ marginTop: "0.5rem" }}>
                                      {key.latency}
                                    </h4>
                                    <Description style={{ lineHeight: 0 }}>
                                      {t("servers.playerlist.row.ping")}
                                    </Description>
                                  </Row>
                                )
                              )}
                              {haveSeederPlayers && (
                                <>
                                  <Row>
                                    <h4 style={{ marginTop: "0.5rem" }}>
                                      {seederPlayer?.score ?? "?"}
                                    </h4>
                                    <Description style={{ lineHeight: 0 }}>
                                      {t("servers.playerlist.row.score")}
                                    </Description>
                                  </Row>
                                  <Row>
                                    <h4 style={{ marginTop: "0.5rem" }}>
                                      {seederPlayer?.kills ?? "?"}/
                                      {seederPlayer?.deaths ?? "?"}
                                    </h4>
                                    <Description style={{ lineHeight: 0 }}>
                                      {t("servers.playerlist.row.killDeath")}
                                    </Description>
                                  </Row>
                                </>
                              )}
                              <Row>
                                {key.join_time && (
                                  <>
                                    <h4 style={{ marginTop: "0.5rem" }}>
                                      {t("change", {
                                        change: new Date(key?.join_time / 1000),
                                      })}
                                    </h4>
                                    <Description style={{ lineHeight: 0 }}>
                                      {t("servers.playerlist.row.timePlayed")}
                                    </Description>
                                  </>
                                )}
                              </Row>
                              <PhoneRow>
                                <ButtonLink
                                  style={
                                    haveSeederPlayers
                                      ? {
                                          marginTop: ".5rem",
                                          width: "4rem",
                                        }
                                      : {
                                          marginTop: ".5rem",
                                        }
                                  }
                                  href={`https://gametools.network/stats/${
                                    playerToStatsPlatform[key.platform] ||
                                    key.platform ||
                                    props.platform
                                  }/${key?.player_id ? "playerid" : "name"}/${
                                    key?.player_id
                                      ? key?.player_id
                                      : encodeURIComponent(key.name)
                                  }?game=${statsGame}&name=${encodeURIComponent(
                                    key.name,
                                  )}`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {t("stats.view")}
                                </ButtonLink>
                              </PhoneRow>
                            </Column>
                          );
                        },
                      )}
                    </>
                  ) : (
                    <p>{t("servers.playerlist.empty")}</p>
                  )}
                </Box>
              </div>
            );
          })}
        </>
      ) : (
        <Box>
          <p>{t("servers.playerlist.empty")}</p>
        </Box>
      )}
    </Spacing>
  );
}

export function ServerPlayerlist(props: {
  game: string;
  platform: string;
  gameid: string;
}): React.ReactElement {
  const { t } = useTranslation();
  const gameId = props.gameid;

  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery({
    queryKey: ["serverPlayerlist" + gameId + props.game],
    queryFn: () =>
      GametoolsApi.serverPlayerlist({
        game: props.game,
        gameId: gameId,
      }),
  });
  if (!loading && !error) {
    return (
      <Players
        stats={stats}
        game={props.game}
        gameid={props.gameid}
        platform={props.platform}
      />
    );
  }
  return (
    <Spacing>
      <Title>{t("servers.playerlist.main")}</Title>
      <Description>{t("loading")}</Description>
    </Spacing>
  );
}

export function MarnePlayerList(props: {
  stats: DetailedServerInfo;
  game: string;
  gameId: string;
}): React.ReactElement {
  const current_factions = bf1_factions[props?.stats?.map] ?? [];
  const stats = {
    teams: [
      {
        teamid: "teamOne",
        players: [],
        faction: current_factions[0],
      },
      {
        teamid: "teamTwo",
        players: [],
        faction: current_factions[1],
      },
    ],
    update_timestamp: Date.now() / 1000,
  };
  props?.stats?.players?.forEach((element) => {
    stats.teams[element.team - 1].players.push(element);
  });

  return (
    <Players
      stats={stats}
      game={props.game}
      gameid={props.gameId}
      platform="pc"
    />
  );
}

export function Bf3ServerPlayerlist(props: {
  players: ScoreServerPlayer[];
  game: string;
}): React.ReactElement {
  const { t } = useTranslation();

  const { players } = props;

  return (
    <Spacing>
      <h2>{t("servers.playerlist.main")}</h2>
      {!!players ? (
        <>
          <Box>
            {players.length !== 0 ? (
              <>
                {players.map((key: ScoreServerPlayer, index: number) => {
                  return (
                    <Column key={index}>
                      <Row>
                        <AlignW>
                          <img
                            src={sslFix(key?.avatar)}
                            height="35px"
                            loading="lazy"
                          />

                          <Link
                            to={`/stats/pc/playerid/${
                              key.player_id
                            }?game=bf3&name=${encodeURIComponent(key.name)}`}
                          >
                            <>
                              <h4
                                style={{
                                  maxWidth: "11rem",
                                  width: "auto",
                                  minWidth: "8rem",
                                  margin: "0.5rem",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {key.name}
                              </h4>
                            </>
                          </Link>
                        </AlignW>
                      </Row>
                      <PhoneRow>
                        <ButtonLink
                          style={{
                            marginTop: ".5rem",
                          }}
                          href={`https://gametools.network/stats/pc/name/${encodeURIComponent(
                            key.name,
                          )}?game=${props.game}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {t("stats.view")}
                        </ButtonLink>
                      </PhoneRow>
                    </Column>
                  );
                })}
              </>
            ) : (
              <p>{t("servers.playerlist.empty")}</p>
            )}
          </Box>
        </>
      ) : (
        <Box>
          <p>{t("servers.playerlist.empty")}</p>
        </Box>
      )}
    </Spacing>
  );
}

export function BfListServerPlayerList(props: {
  game: string;
  serverIp: string;
  serverPort: number;
}): React.ReactElement {
  const { t } = useTranslation();
  const [sortType, setSortType] = React.useState<string>("-kills");
  const [copyState, setCopyState] = React.useState<string>("");

  const gameStuff = props.game.split(".");
  const {
    isLoading: loading,
    isError: error,
    data: stats,
    dataUpdatedAt,
  } = useQuery({
    queryKey: [
      "serverPlayerlist" + props.serverIp + props.serverPort + props.game,
    ],
    queryFn: () =>
      bfListApi.serverPlayerlist({
        game: gameStuff[0],
        serverIp: props.serverIp,
        serverPort: props.serverPort,
      }),
  });

  if (!loading && !error) {
    if (!stats.players) {
      return (
        <Spacing>
          <Title>{t("servers.playerlist.main")}</Title>
          <Description>{t("bflist.notFound")}</Description>
        </Spacing>
      );
    }

    let teams: TeamInfo[] = [
      { index: 1, label: "Team 1", players: [] },
      { index: 2, label: "Team 2", players: [] },
    ];
    if (stats.teams && stats.teams.length > 0) {
      // use labels from bflist api
      teams = stats.teams;

      // readd players
      teams.map((team) => {
        team.players = [];
      });
    }
    stats.players.map((player: PlayerInfo) => {
      teams[player.team - 1].players.push(player);
    });

    return (
      <Spacing>
        <Align>
          <h2>{t("servers.playerlist.main")}</h2>
          <SelectPrimary
            style={{ margin: 0, marginLeft: "24px" }}
            value={sortType}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
              setSortType(ev.target.value)
            }
          >
            <option value="name">
              {t("servers.playerlist.row.playerName")}
            </option>
            <option value="-ping">{t("servers.playerlist.row.ping")}</option>
            <option value="-kills">{t("servers.playerlist.row.kills")}</option>
            <option value="-deaths">
              {t("servers.playerlist.row.deaths")}
            </option>
          </SelectPrimary>
          <p style={{ marginTop: "1rem", marginLeft: "1rem" }}>
            {t("servers.playerlist.lastUpdate")}{" "}
            {t("change", { change: dataUpdatedAt })} {t("ago")}
          </p>
        </Align>
        {teams.map((teamInfo: TeamInfo, index: number) => {
          teamInfo.players = teamInfo.players.sort(DynamicSort(sortType));
          return (
            <div key={index}>
              <Align>
                <h3 style={{ margin: ".5rem", marginTop: 0 }}>
                  {teamInfo.label}
                </h3>
              </Align>
              <Box>
                {teamInfo.players.length !== 0 ? (
                  <>
                    {teamInfo.players.map((key: PlayerInfo, index: number) => {
                      return (
                        <Column key={index}>
                          <Row>
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                navigator.clipboard.writeText(key.name);
                                setCopyState(key.name);
                                const timer1 = setTimeout(
                                  () => setCopyState(""),
                                  1 * 1000,
                                );
                                return () => {
                                  clearTimeout(timer1);
                                };
                              }}
                            >
                              {copyState == key.name ? (
                                <ServerPlayerName>
                                  {t("states.copied")}
                                </ServerPlayerName>
                              ) : (
                                <ServerPlayerName>{key.name}</ServerPlayerName>
                              )}
                            </a>
                          </Row>
                          <Row>
                            <h4 style={{ marginTop: "0.5rem" }}>{key.ping}</h4>
                            <Description style={{ lineHeight: 0 }}>
                              {t("servers.playerlist.row.ping")}
                            </Description>
                          </Row>
                          <Row>
                            <h4 style={{ marginTop: "0.5rem" }}>
                              {key?.score ?? "?"}
                            </h4>
                            <Description style={{ lineHeight: 0 }}>
                              {t("servers.playerlist.row.score")}
                            </Description>
                          </Row>
                          <Row>
                            <h4 style={{ marginTop: "0.5rem" }}>
                              {key?.kills ?? "?"}/{key?.deaths ?? "?"}
                            </h4>
                            <Description style={{ lineHeight: 0 }}>
                              {t("servers.playerlist.row.killDeath")}
                            </Description>
                          </Row>
                        </Column>
                      );
                    })}
                  </>
                ) : (
                  <p>{t("servers.playerlist.empty")}</p>
                )}
              </Box>
            </div>
          );
        })}
      </Spacing>
    );
  }
  return (
    <Spacing>
      <Title>{t("servers.playerlist.main")}</Title>
      <Description>{t("loading")}</Description>
    </Spacing>
  );
}
