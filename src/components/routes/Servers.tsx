import * as React from "react";
import "../../locales/config";
import { RouteComponentProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../assets/scss/App.scss";
import { GetStats } from "../../api/GetStats";
import { useQuery } from "react-query";
import {
  AltText,
  Back,
  ArrowLeft,
  Container,
  Align,
  AlignW,
  AlignT,
  Box,
} from "../Materials";
import { getLanguage } from "../../locales/config";
import { DetailedServerInfo, ServerRotation } from "../../api/ReturnTypes";

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
        <AlignW>
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
        </AlignW>
        <Description style={{ marginTop: "6px" }}>
          {t("servers.permLink")}{" "}
          <ServerLink
            onClick={() => {
              navigator.clipboard.writeText(
                `https://gametools.network/servers/bf1/name/${encodeURIComponent(
                  stats.prefix,
                )}/pc`,
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
      type: "detailedserver",
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
