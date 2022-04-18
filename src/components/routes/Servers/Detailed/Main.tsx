import * as React from "react";
import "../../../../locales/config";
import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../../../assets/scss/App.scss";
import {
  frostbite3,
  frostbiteJoinGames,
  oldJoinGames,
  serverWidgetTypes,
  widgetSize,
} from "../../../../api/static";
import {
  AltText,
  Align,
  AlignW,
  AlignT,
  Box,
  SmallButtonSecondary,
  PhoneVis,
} from "../../../Materials";
import {
  DetailedServerInfo,
  ServerRotation,
  ServerSettings,
} from "../../../../api/ReturnTypes";
import { ServerOwner } from "./Owner";
import { ServerPlayerlist } from "./Players";
import { ServerLeaderboard } from "./Leaderboard";
import { ServerPlatoon } from "./Platoon";
import { ServerConfig } from "./Portal";
import { Description, Title } from "./Servers";
import { useLocation } from "react-router-dom";
import { ServerScoreboard } from "./Scoreboard";

const AltDescription = styled.p`
  ${AltText}
  margin-right: 1.5rem;
  line-height: 0.5;
`;

interface IServerImage {
  background: string;
}

interface Views {
  loading: boolean;
  error: boolean;
  game: string;
  platform: string;
  stats: DetailedServerInfo;
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

const MapImage = styled.div<IServerImage>`
  height: 7rem;
  display: flex;
  min-width: 9rem;
  margin-top: 9px;
  max-height: 4rem;
  border-radius: 4px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("${(props) => props.background}");
`;

const ServerInfo = styled.div`
  width: 100%;
  align-self: center;
`;

const ServerLink = styled.a`
  cursor: pointer;
`;

const AlignSeverImg = styled.div`
  @media (min-width: 430px) {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }
`;

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function Results(props: Views): React.ReactElement {
  const query = new URLSearchParams(useLocation().search);
  const blazeIdQuery = query.get("blazeid");
  const [copyState, setCopyState] = React.useState<string>("copy");
  const getLanguage = () => window.localStorage.i18nextLng;
  const numberFormat = new Intl.NumberFormat(getLanguage());
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
              {props.game !== "bf2042" ? (
                <ServerFactorites>
                  &#9734; {numberFormat.format(stats.favorites)}
                </ServerFactorites>
              ) : (
                <></>
              )}
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
            {props.game == "bf2042" ? (
              <Description>
                {t(`regions.${stats.region.toLowerCase()}`)}
              </Description>
            ) : (
              <Description>
                {t(`regions.${stats.region.toLowerCase()}`)} / {stats.country} -{" "}
                {stats.mode}
              </Description>
            )}
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
        {frostbiteJoinGames.includes(props.game) ? (
          <>
            <p style={{ marginTop: "-.6rem" }}>
              <Trans i18nKey="servers.joinme.info">
                <a href="https://joinme.click/download">
                  https://joinme.click/download
                </a>
              </Trans>
            </p>
            <SmallButtonSecondary
              style={{ marginBottom: 0 }}
              onClick={function () {
                location.href = `${props.game}://${stats.gameId}`;
              }}
            >
              {t("servers.join")}
            </SmallButtonSecondary>
          </>
        ) : (
          <></>
        )}
        <Title style={{ marginBottom: 0 }}>{t("servers.rotation")}</Title>
        <Align>
          {stats.rotation.map((key: ServerRotation, index: number) => {
            return (
              <AlignW key={index}>
                <div style={{ marginRight: ".7rem" }}>
                  <MapImage background={key.image}></MapImage>
                  <ServerInfo>
                    <h3
                      style={{
                        marginTop: ".2rem",
                        lineHeight: 0.8,
                        textAlign: "center",
                      }}
                    >
                      {key.mapname}
                    </h3>
                    <p style={{ margin: 0, textAlign: "center" }}>{key.mode}</p>
                  </ServerInfo>
                </div>
              </AlignW>
            );
          })}
        </Align>
        {props.game !== "bf4" && frostbite3.includes(props.game) ? (
          <ServerOwner owner={stats.owner} game={props.game} />
        ) : stats.players != undefined && stats.teams != undefined ? (
          <ServerScoreboard
            game={props.game}
            stats={stats.teams}
            platform={props.platform}
          />
        ) : (
          <></>
        )}
        {props.game === "bf1" ? (
          <>
            <ServerPlatoon platoon={stats.platoon} platform={props.platform} />
            <ServerLeaderboard gameid={stats.gameId} />
            <ServerPlayerlist
              game={props.game}
              gameid={stats.gameId}
              platform={props.platform}
            />
          </>
        ) : (
          <></>
        )}
        {props.game === "bfv" ? (
          <>
            <ServerPlayerlist
              game={props.game}
              gameid={stats.gameId}
              platform={props.platform}
            />
          </>
        ) : (
          <></>
        )}
        {props.game === "bf2042" ? (
          <>
            <ServerConfig serverInfo={stats.serverInfo} />
            {stats.blazeGameId !== undefined ? (
              <ServerPlayerlist
                game={props.game}
                gameid={stats.blazeGameId.toString()}
                platform={props.platform}
              />
            ) : blazeIdQuery !== null ? (
              <ServerPlayerlist
                game={props.game}
                gameid={blazeIdQuery}
                platform={props.platform}
              />
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        {props.game !== "bf2042" ? (
          <>
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
                              <b>{capitalizeFirstLetter(key[0])}</b>: {key[1]}
                            </AltDescription>
                          );
                        },
                      )}
                    </div>
                  );
                },
              )}
            </AlignT>
          </>
        ) : (
          <>
            <h2>{t("servers.settings")}</h2>
            {stats.settings.map((value: ServerSettings, index: number) => {
              return (
                <div key={index}>
                  <AltDescription key={index}>
                    <b>
                      {capitalizeFirstLetter(
                        value.values[0].readableSettingName,
                      )}
                    </b>
                    : {}
                    {value.values[1].readableSettingName}
                  </AltDescription>
                </div>
              );
            })}
            <br></br>
          </>
        )}

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
                style={{ maxWidth: "700px", backgroundColor: "transparent" }}
                height={`${widgetSize[index]}px`}
                width="100%"
                frameBorder="0"
              />
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
