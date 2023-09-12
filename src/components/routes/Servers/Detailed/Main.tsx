import * as React from "react";
import "../../../../locales/config";
import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../../../assets/scss/App.scss";
import {
  bf4Settings,
  dice,
  frostbite3,
  frostbiteJoinGames,
  serverWidgetTypes,
  widgetSize,
} from "../../../../api/static";
import {
  AltText,
  Align,
  AlignW,
  AlignT,
  SmallButtonSecondary,
  PageColumn,
  PageRow,
} from "../../../Materials";
import {
  DetailedServerInfo,
  ServerRotation,
  ServerSettings,
} from "../../../../api/ReturnTypes";
import { OwnerInfo } from "./Owner";
import {
  Bf3ServerPlayerlist,
  BfListServerPlayerList,
  ServerPlayerlist,
} from "./Players";
import { ServerLeaderboard } from "./Leaderboard";
import { ServerPlatoon } from "./Platoon";
import { ServerConfig } from "./Portal";
import { Description, Title } from "./Servers";
// import { useLocation } from "react-router-dom";
import { ServerScoreboard } from "./Scoreboard";
import { BfPortalInfo } from "./BfPortal";
import { ServerGraphQuery } from "../../../graphing/line";
import { CopyToClipboard } from "../../../functions/CopyToClipboard";
import sslFix from "../../../functions/fixEaAssets";

const AltDescription = styled.p`
  ${AltText}
  line-height: 1.2;
  margin: 0.5rem 0.5rem 0.5rem 0;
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
  getter: string;
  serverName: string;
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
  const { loading, error } = props;
  // const query = new URLSearchParams(useLocation().search);
  // const blazeIdQuery = query.get("blazeid");
  const getLanguage = () => window.localStorage.i18nextLng;
  const numberFormat = new Intl.NumberFormat(getLanguage());
  const copyStates = {};
  serverWidgetTypes.map((element) => {
    const [tempCopyState, tempSetCopyState] = React.useState<string>("copy");
    copyStates[element] = { state: tempCopyState, set: tempSetCopyState };
  });

  const { t, i18n } = useTranslation();
  const stats = props.stats;

  if (error) {
    return (
      <>
        <h1>{t("servers.notFound.main")}</h1>
        <p>{t("servers.notFound.description")}</p>
      </>
    );
  } else {
    let widgetReturn = encodeURIComponent(stats?.prefix);
    let widgetItem = "name";
    if (!dice.includes(props.game) && props.game != "battlebit") {
      widgetItem = "serverip";
      widgetReturn = `${stats?.ip}:${stats?.port}`;
    }

    let queue: number = undefined;
    queue = stats?.inQue;
    let queueString = "";
    if (queue !== undefined && queue !== 0) {
      queueString = `[${queue}]`;
    }
    let officialString = "";
    if (stats?.official !== undefined) {
      officialString = stats?.official ? " - Official" : " - Custom";
    }
    return (
      <div>
        <AlignSeverImg>
          <ServerImage background={stats?.currentMapImage || stats?.mapImage}>
            <Blur>
              <ServerText>{stats?.smallmode}</ServerText>
              {stats?.favorites && (
                <ServerFactorites>
                  &#9734; {numberFormat.format(stats?.favorites)}
                </ServerFactorites>
              )}
            </Blur>
          </ServerImage>
          <div>
            <h2 style={{ whiteSpace: "pre" }}>
              {loading ? t("loading") : stats?.prefix}
            </h2>
            <Description style={{ maxWidth: "1000px" }}>
              {loading ? t("notApplicable") : stats?.description}
            </Description>
            {loading ? (
              <Description>{t("notApplicable")}</Description>
            ) : (
              <Description>
                {stats?.playerAmount}/{stats?.maxPlayers}
                {stats?.maxPlayerAmount}
                {queueString}
                {stats?.noBotsPlayerAmount
                  ? ` (${stats.noBotsPlayerAmount} without bots)`
                  : ``}{" "}
                - {stats?.currentMap ? stats?.currentMap : stats?.map}
                {officialString}
              </Description>
            )}
            {stats?.region ? (
              <>
                {props.game == "bf2042" ? (
                  <Description>
                    {t(`regions.${stats.region?.toLowerCase()}`)}
                  </Description>
                ) : props.game == "battlebit" ? (
                  <Description>
                    {t(`battlebitRegions.${stats.region}`)} -{" "}
                    {i18n.exists(`stats.gamemodes.${stats.mode}`)
                      ? t(`stats.gamemodes.${stats.mode}`)
                      : stats.mode}
                  </Description>
                ) : (
                  <Description>
                    {t(`regions.${stats.region?.toLowerCase()}`)} /{" "}
                    {stats.country} -{" "}
                    {i18n.exists(`stats.gamemodes.${stats.mode}`)
                      ? t(`stats.gamemodes.${stats.mode}`)
                      : stats.mode}
                  </Description>
                )}
              </>
            ) : (
              <Description>{stats?.mode}</Description>
            )}
          </div>
        </AlignSeverImg>
        {/* older titles use ip address, thats static already */}
        {dice.includes(props.game) && (
          <>
            <Description style={{ marginTop: "6px" }}>
              {t("servers.permLink")}{" "}
              <CopyToClipboard
                message={`https://gametools.network/servers/${
                  props.game
                }/name/${encodeURIComponent(stats?.prefix)}/pc`}
                stateTranslation={"states"}
              />
            </Description>
          </>
        )}
        {frostbiteJoinGames.includes(props.game) && (
          <>
            <p style={{ marginTop: "-.6rem" }}>
              <Trans i18nKey="servers.joinme.info">
                <a href="https://joinme.click/download">
                  https://joinme.click/download
                </a>
              </Trans>
            </p>
            <Align>
              <SmallButtonSecondary
                style={{ marginBottom: 0 }}
                onClick={function () {
                  location.href = `${props.game}://${stats.gameId}`;
                }}
              >
                {t("servers.join")}
              </SmallButtonSecondary>
              <SmallButtonSecondary
                style={{ marginBottom: 0 }}
                onClick={function () {
                  location.href = `https://joinme.click/g/${props.game}/${stats.gameId}`;
                }}
              >
                {t("servers.joinme.view")}
              </SmallButtonSecondary>
            </Align>
          </>
        )}
        {/* when available */}
        {stats?.rotation && (
          <>
            <Title style={{ marginBottom: 0 }}>{t("servers.rotation")}</Title>
            <Align>
              {stats.rotation.map((key: ServerRotation, index: number) => {
                return (
                  <AlignW key={index}>
                    <div style={{ marginRight: ".7rem", marginTop: "10px" }}>
                      <div
                        style={{
                          backgroundColor: "#fff",
                          width: "20px",
                          height: "20px",
                          borderRadius: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "absolute",
                        }}
                      >
                        <span>{index + 1}</span>
                      </div>
                      <MapImage background={sslFix(key.image)}></MapImage>
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
                        <p style={{ margin: 0, textAlign: "center" }}>
                          {key.mode}
                        </p>
                      </ServerInfo>
                    </div>
                  </AlignW>
                );
              })}
            </Align>
          </>
        )}

        <PageColumn>
          <PageRow>
            {props.game !== "bf4" && frostbite3.includes(props.game) ? (
              <>
                {stats?.owner != null && (
                  <OwnerInfo
                    owner={stats?.owner}
                    game={props.game}
                    title={t("servers.owner.main")}
                  />
                )}
                {(props.platform == "pc" || props.platform == "undefined") &&
                  (props.game === "bf2042" ? (
                    // {stats.blazeGameId !== undefined ? (
                    //   <ServerPlayerlist
                    //     game={props.game}
                    //     gameid={stats.blazeGameId.toString()}
                    //     platform={props.platform}
                    //   />
                    // ) : blazeIdQuery !== "null" ? (
                    //   <ServerPlayerlist
                    //     game={props.game}
                    //     gameid={blazeIdQuery}
                    //     platform={props.platform}
                    //   />
                    // ) : (
                    //   <></>
                    // )}
                    <ServerConfig serverInfo={stats?.serverInfo} />
                  ) : (
                    <ServerPlayerlist
                      game={props.game}
                      gameid={stats?.gameId}
                      platform={props.platform}
                    />
                  ))}
              </>
            ) : (
              <>
                {props.game === "bf3" ? (
                  <Bf3ServerPlayerlist players={stats?.players} />
                ) : // older titles
                stats?.ip && stats?.port ? (
                  <BfListServerPlayerList
                    game={props.game}
                    serverIp={stats?.ip}
                    serverPort={stats?.hostport || stats?.port}
                  />
                ) : (
                  <></>
                )}
              </>
            )}
            {/* bf4 */}
            {stats?.players != undefined && stats?.teams != undefined && (
              <ServerScoreboard
                game={props.game}
                stats={stats?.teams}
                platform={props.platform}
              />
            )}
          </PageRow>

          <PageRow>
            {/* when available */}
            <ServerGraphQuery
              stats={stats}
              game={props.game}
              getter={props.getter}
              name={props.serverName}
            />
            {props.game === "bf1" && (
              <>
                <ServerPlatoon
                  platoon={stats?.platoon}
                  platform={props?.platform}
                />
                <ServerLeaderboard gameid={stats?.gameId} />
              </>
            )}
            {props.game === "bf2042" ? (
              <>
                {stats?.configCreator !== null && (
                  <OwnerInfo
                    owner={stats?.configCreator}
                    game={props.game}
                    title={t("servers.owner.experience")}
                  />
                )}
                <BfPortalInfo experienceName={stats?.serverInfo.configName} />
                <h2>{t("servers.settings")}</h2>
                {stats?.settings.map((value: ServerSettings, index: number) => {
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
            ) : (
              <>
                {stats?.settings && (
                  <>
                    <h2>{t("servers.settings")}</h2>
                    <AlignT>
                      {Object.entries(stats?.settings).map(
                        (key: [string, unknown], index: number) => {
                          return (
                            <div key={index}>
                              <h3>{key[0]}</h3>
                              {Object.entries(key[1]).map(
                                (key: [string, string], index: number) => {
                                  return (
                                    <AltDescription key={index}>
                                      <b>
                                        {key[0] in bf4Settings
                                          ? bf4Settings[key[0]]
                                          : capitalizeFirstLetter(key[0])}
                                      </b>
                                      : {key[1]}
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
                )}
              </>
            )}
          </PageRow>
        </PageColumn>
        <h2 style={{ marginBottom: 0 }}>{t("servers.iframe.main")}</h2>
        <Description style={{ margin: 0, marginTop: "0.2rem" }}>
          {t("servers.iframe.info")}
        </Description>
        <PageColumn>
          {serverWidgetTypes.map((element, index) => {
            return (
              <PageRow key={index}>
                <Description style={{ marginTop: "15px" }}>
                  {t(`servers.iframe.${element}`)}{" "}
                  <CopyToClipboard
                    message={`<iframe title="Server playercount" src="https://widgets.gametools.network/servers/${element}/${
                      props.game
                    }/${widgetItem}/${widgetReturn}/${
                      props.platform
                    }?lng=${getLanguage()}" height="${
                      widgetSize[index]
                    }px" width="700px" frameborder="0" allowtransparency="true"></iframe>`}
                    stateTranslation={"servers.iframe.states"}
                  />
                </Description>
                <iframe
                  title="Server playercount"
                  src={`https://widgets.gametools.network/servers/${element}/${
                    props.game
                  }/${widgetItem}/${widgetReturn}/${
                    props.platform
                  }?lng=${getLanguage()}`}
                  style={{
                    maxWidth: "700px",
                    backgroundColor: "transparent",
                  }}
                  height={`${widgetSize[index]}px`}
                  width="100%"
                  frameBorder="0"
                  loading="lazy"
                />
              </PageRow>
            );
          })}
        </PageColumn>
      </div>
    );
  }
}
