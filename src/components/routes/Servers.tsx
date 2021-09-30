import * as React from "react";
import "../../locales/config";
import { Link, RouteComponentProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../assets/scss/App.scss";
import { GetStats } from "../../api/GetStats";
import { useQuery } from "react-query";
import { serverWidgetTypes, widgetSize } from "../../api/static";
import {
  AltText,
  Back,
  ArrowLeft,
  Container,
  Align,
  AlignW,
  AlignT,
  Circle,
  Box,
  SmallButtonSecondary,
  Row,
  Column,
  SelectPrimary,
  ButtonLink,
} from "../Materials";
import { getLanguage } from "../../locales/config";
import {
  DetailedServerInfo,
  managerPlayer,
  ManagerPlayerList,
  PlatoonResult,
  ServerLeaderboardList,
  ServerOwnerResult,
  ServerRotation,
} from "../../api/ReturnTypes";
import { addSeconds } from "date-fns";
import { factions } from "../../api/Factions";

const Description = styled.p`
  ${AltText}
  line-height: 1;
`;

const AltDescription = styled.p`
  ${AltText}
  margin-right: 1.5rem;
  line-height: 0.5;
`;

const Title = styled.h2`
  margin-top: 2rem;
`;

interface IServerImage {
  background: string;
}

const ServerImage = styled.div<IServerImage>`
  height: 7rem;
  min-width: 11rem;
  display: flex;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("${(props) => props.background}");
  margin-top: 12px;
  margin-right: 1rem;
  border-radius: 10px;
`;

const Blur = styled.div`
  height: 100%;
  flex-grow: 3;
  border-radius: 10px;
  background: radial-gradient(
    100% 100% at 50% 50%,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4872) 100%
  );
`;

const ServerText = styled.h1`
  ${AltText}
  font-size: 3rem;
  text-align: center;
  padding-top: 1.2rem;
  line-height: 0;
`;

const ServerFactorites = styled.h1`
  ${AltText}
  text-align: center;
  line-height: 0;
`;

const MapImage = styled.img`
  margin-top: 12px;
  max-height: 4rem;
  margin-right: 0.7rem;
  border-radius: 2px;
`;

const ServerInfo = styled.div`
  margin-top: 15px;
`;

const ServerLink = styled.a`
  cursor: pointer;
`;

const PlatoonEmblem = styled.img`
  width: 100px;
  margin-right: 0.5rem;
`;

export const Spacing = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

function ServerPlatoon(props: { platoon: PlatoonResult }) {
  const { t } = useTranslation();
  const platoon = props.platoon;
  if (platoon === null) {
    return (
      <Spacing>
        <h2>{t("servers.platoon.main")}</h2>
        <p>{t("servers.platoon.none")}</p>
      </Spacing>
    );
  }
  return (
    <Spacing>
      <h2>{t("servers.platoon.main")}</h2>
      <AlignW style={{ alignItems: "start" }}>
        <Link to={`/platoons/${platoon.id}`}>
          <PlatoonEmblem src={platoon.emblem} />
        </Link>
        <div style={{ marginTop: "1rem" }}>
          <h3>
            <Link to={`/platoons/${platoon.id}`}>{platoon.name}</Link>
          </h3>
          {platoon.description !== null ? (
            <Link to={`/platoons/${platoon.id}`}>
              <p>{platoon.description}</p>
            </Link>
          ) : (
            <Link to={`/platoons/${platoon.id}`}>
              <Description>{t("stats.platoon.noDescription")}</Description>
            </Link>
          )}
        </div>
      </AlignW>
    </Spacing>
  );
}

const OriginProfile = styled.img`
  width: 60px;
  margin-right: 1rem;
`;

const OriginName = styled.h2`
  line-height: 60%;
`;

const OriginDescription = styled.h4`
  line-height: 60%;
`;

function ServerOwner(props: { owner: ServerOwnerResult }) {
  const { t } = useTranslation();
  const owner = props.owner;
  if (owner === null) {
    return (
      <Spacing>
        <h3>{t("servers.owner.main")}</h3>
        <Align>
          <Circle />
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
      <h2>{t("servers.owner.main")}</h2>
      <Align>
        <Link
          to={`/stats/pc/playerid/${
            owner.id
          }?game=bfv&name=${encodeURIComponent(owner.name)}`}
        >
          <OriginProfile src={owner.avatar} />
        </Link>
        <Link
          to={`/stats/pc/playerid/${
            owner.id
          }?game=bfv&name=${encodeURIComponent(owner.name)}`}
        >
          <div>
            <OriginName>{owner.name}</OriginName>
            <OriginDescription>
              {t("stats.originDescription")}
            </OriginDescription>
          </div>
        </Link>
      </Align>
    </Spacing>
  );
}

const AlignSeverImg = styled.div`
  @media (min-width: 430px) {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }
`;

function ServerLeaderboard(props: { gameid: string }) {
  const { t } = useTranslation();
  const [sortType, setSortType] = React.useState<string>("timeplayed");
  const gameId = props.gameid;
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery("serverLeaderboard" + gameId + sortType, () =>
    GetStats.serverLeaderboard({
      gameId: gameId,
      amount: "50",
      sort: sortType,
    }),
  );
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
                      <h4 style={{ width: "9rem", whiteSpace: "nowrap" }}>
                        {key.platoon !== "" ? `[${key.platoon}]` : ""}
                        {key.name}
                      </h4>
                      <Description style={{ lineHeight: 0 }}>
                        {t("stats.view")}
                      </Description>
                    </a>
                  </Row>
                  <Row>
                    <h4>{key.score}</h4>
                    <Description style={{ lineHeight: 0 }}>
                      {t("servers.leaderboard.row.score")}
                    </Description>
                  </Row>
                  <Row>
                    <h4>{key.killDeath}</h4>
                    <Description style={{ lineHeight: 0 }}>
                      {t("servers.leaderboard.row.killDeath")}
                    </Description>
                  </Row>
                  <Row>
                    <h4>{key.kills}</h4>
                    <Description style={{ lineHeight: 0 }}>
                      {t("servers.leaderboard.row.kills")}
                    </Description>
                  </Row>
                  <Row>
                    <h4>{key.deaths}</h4>
                    <Description style={{ lineHeight: 0 }}>
                      {t("servers.leaderboard.row.deaths")}
                    </Description>
                  </Row>
                  <Row>
                    <h4>{key.wins}</h4>
                    <Description style={{ lineHeight: 0 }}>
                      {t("servers.leaderboard.row.wins")}
                    </Description>
                  </Row>
                  <Row>
                    <h4>{key.losses}</h4>
                    <Description style={{ lineHeight: 0 }}>
                      {t("servers.leaderboard.row.losses")}
                    </Description>
                  </Row>
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

function ServerPlayerlist(props: { gameid: string }) {
  const { t } = useTranslation();
  const gameId = props.gameid;
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery("serverPlayerlist" + gameId, () =>
    GetStats.serverPlayerlist({
      gameId: gameId,
    }),
  );
  if (!loading && !error) {
    const teams = stats.players;
    return (
      <Spacing>
        <Align>
          <h2>{t("servers.playerlist.main")}</h2>
        </Align>
        {teams !== null ? (
          <>
            {teams.map((teamInfo: ManagerPlayerList, index: number) => {
              return (
                <div key={index}>
                  <Align>
                    <h3 style={{ margin: ".5rem", marginTop: 0 }}>
                      {teamInfo.faction in factions
                        ? t(`servers.factions.${teamInfo.faction}`)
                        : t(`servers.factions.${teamInfo.teamid}`)}
                    </h3>
                  </Align>
                  <Box>
                    {teamInfo.players.length !== 0 ? (
                      <>
                        {teamInfo.players.map(
                          (key: managerPlayer, index: number) => {
                            const dateAdded = new Date(key.joinTime / 1000);
                            return (
                              <Column key={index}>
                                <Row>
                                  <AlignW>
                                    <img
                                      src={`https://cdn.gametools.network/bf1/${key.rank}.png`}
                                      height="25px"
                                    />
                                    <h4
                                      style={{
                                        width: "11rem",
                                        margin: "0.5rem",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {key.platoon !== ""
                                        ? `[${key.platoon}]`
                                        : ""}
                                      {key.name}
                                    </h4>
                                  </AlignW>
                                </Row>
                                <Row>
                                  <h4 style={{ marginTop: "0.5rem" }}>
                                    {key.ping}
                                  </h4>
                                  <Description style={{ lineHeight: 0 }}>
                                    {t("servers.playerlist.row.ping")}
                                  </Description>
                                </Row>
                                <Row>
                                  <h4 style={{ marginTop: "0.5rem" }}>
                                    {t("change", {
                                      change: dateAdded,
                                    })}
                                  </h4>
                                  <Description style={{ lineHeight: 0 }}>
                                    {t("servers.playerlist.row.timePlayed")}
                                  </Description>
                                </Row>
                                <Row>
                                  <ButtonLink
                                    style={{
                                      marginTop: ".5rem",
                                    }}
                                    href={`https://gametools.network/stats/pc/playerid/${
                                      key.playerId
                                    }?game=bf1&name=${encodeURIComponent(
                                      key.name,
                                    )}`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {t("stats.view")}
                                  </ButtonLink>
                                </Row>
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
            <p>{t("servers.playerlist.none")}</p>
          </Box>
        )}
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

interface Views {
  loading: boolean;
  error: boolean;
  game: string;
  stats: DetailedServerInfo;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function Results(props: Views): React.ReactElement {
  const [copyState, setCopyState] = React.useState<string>("copy");
  const copyStates = {};
  serverWidgetTypes.map((element) => {
    const [tempCopyState, tempSetCopyState] = React.useState<string>("copy");
    copyStates[element] = { state: tempCopyState, set: tempSetCopyState };
  });

  const { t } = useTranslation();
  const stats = props.stats;
  if (!props.loading && !props.error) {
    let queue: number = undefined;
    queue = stats.inQue;
    let queueString = "";
    if (queue !== undefined && queue !== 0) {
      queueString = `[${queue}]`;
    }
    let officialString = "";
    if (stats.official !== undefined) {
      officialString = stats.official ? " - Official" : " - Custom";
    }
    return (
      <div>
        <AlignSeverImg>
          <ServerImage background={stats.currentMapImage}>
            <Blur>
              <ServerText>{stats.smallmode}</ServerText>
              <ServerFactorites>&#9734; {stats.favorites}</ServerFactorites>
            </Blur>
          </ServerImage>
          <div>
            <h2>{stats.prefix}</h2>
            <Description>{stats.description}</Description>
            <Description>
              {stats.playerAmount}/{stats.maxPlayers}
              {stats.maxPlayerAmount} {queueString} - {stats.currentMap}
              {officialString}
            </Description>
            <Description>
              {t(`regions.${stats.region.toLowerCase()}`)} / {stats.country} -{" "}
              {stats.mode}
            </Description>
          </div>
        </AlignSeverImg>
        <Description style={{ marginTop: "6px" }}>
          {t("servers.permLink")}{" "}
          <ServerLink
            onClick={() => {
              navigator.clipboard.writeText(
                `https://gametools.network/servers/${
                  props.game
                }/name/${encodeURIComponent(stats.prefix)}/pc`,
              );
              setCopyState("copied");
              const timer1 = setTimeout(() => setCopyState("copy"), 3 * 1000);
              return () => {
                clearTimeout(timer1);
              };
            }}
          >
            {t(`states.${copyState}`)}
          </ServerLink>
        </Description>
        {props.game === "bf1" ? (
          <SmallButtonSecondary
            style={{ marginBottom: 0 }}
            onClick={function () {
              location.href = `origin2://game/launch?offerIds=1026023&authCode=&cmdParams=-webMode%20MP%20-Origin_NoAppFocus%20--activate-webhelper%20-requestState%20State_ClaimReservation%20-gameId%20%22${stats.gameId}%22%20-gameMode%20%22MP%22%20-role%20%22soldier%22%20-asSpectator%20%22false%22%20-joinWithParty%20%22false%22%20%20-Online.BlazeLogLevel%202%20-Online.DirtysockLogLevel%202`;
            }}
          >
            {t("servers.join")}
          </SmallButtonSecondary>
        ) : (
          <></>
        )}
        <Title>{t("servers.rotation")}</Title>
        <Align>
          {stats.rotation.map((key: ServerRotation, index: number) => {
            return (
              <Box key={index}>
                <AlignW>
                  <div>
                    <MapImage src={key.image} />
                  </div>
                  <ServerInfo>
                    <h3>{key.mapname}</h3>
                    <p>{key.mode}</p>
                  </ServerInfo>
                </AlignW>
              </Box>
            );
          })}
        </Align>
        {props.game === "bf1" ? (
          <>
            <ServerPlatoon platoon={stats.platoon} />
            <ServerLeaderboard gameid={stats.gameId} />
            <ServerPlayerlist gameid={stats.gameId} />
          </>
        ) : (
          <></>
        )}
        {props.game === "bfv" ? <ServerOwner owner={stats.owner} /> : <></>}
        <h2>{t("servers.settings")}</h2>
        <AlignT>
          {Object.entries(stats.settings).map(
            (key: [string, unknown], index: number) => {
              return (
                <div key={index}>
                  <h3>{key[0]}</h3>
                  {Object.entries(key[1]).map(
                    (key: [string, unknown], index: number) => {
                      return (
                        <AltDescription key={index}>
                          {capitalizeFirstLetter(key[0])}: {key[1]}
                        </AltDescription>
                      );
                    },
                  )}
                </div>
              );
            },
          )}
        </AlignT>
        <h2 style={{ marginBottom: 0 }}>{t("servers.iframe.main")}</h2>
        <Description style={{ margin: 0, marginTop: "0.2rem" }}>
          {t("servers.iframe.info")}
        </Description>
        {serverWidgetTypes.map((element, index) => {
          return (
            <div key={index}>
              <Description style={{ marginTop: "15px" }}>
                {t(`servers.iframe.${element}`)}{" "}
                <ServerLink
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `<iframe src="https://widgets.gametools.network/servers/${element}/${
                        props.game
                      }/name/${encodeURIComponent(stats.prefix)}/pc" height="${
                        widgetSize[index]
                      }px" width="700px" frameborder="0" allowtransparency="true"></iframe>`,
                    );
                    copyStates[element].set("copied");
                    const timer1 = setTimeout(
                      () => copyStates[element].set("copy"),
                      3 * 1000,
                    );
                    return () => {
                      clearTimeout(timer1);
                    };
                  }}
                >
                  {t(`servers.iframe.states.${copyStates[element].state}`)}
                </ServerLink>
              </Description>
              <iframe
                src={`https://widgets.gametools.network/servers/${element}/${
                  props.game
                }/name/${encodeURIComponent(stats.prefix)}/pc`}
                height={`${widgetSize[index]}px`}
                width="700px"
                frameBorder="0"
                allowtransparency="true"
              ></iframe>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <Box>
        <h3>{t("loading")}</h3>
      </Box>
    );
  }
}

type TParams = {
  gameid: string;
  type: string;
  sname: string;
  platform: string;
};

function Servers({ match }: RouteComponentProps<TParams>): React.ReactElement {
  const gameId = match.params.gameid;
  const serverName = decodeURIComponent(match.params.sname);

  const { t } = useTranslation();
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery("detailed" + gameId + serverName + match.params.platform, () =>
    GetStats.server({
      game: gameId,
      getter: match.params.type,
      serverName: serverName,
      lang: getLanguage(),
      platform: match.params.platform,
    }),
  );
  return (
    <div>
      <Container>
        <Back to="/servers">
          <ArrowLeft />
          {t("servers.back")}
        </Back>
        <Results game={gameId} loading={loading} stats={stats} error={error} />
      </Container>
    </div>
  );
}

export default Servers;
