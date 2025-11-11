import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { ModListReturn } from "../../../../api/marneApi";
import {
  DetailedServerInfo,
  ServerRotation,
  ServerSettings,
} from "../../../../api/ReturnTypes";
import {
  bf4Settings,
  dice,
  frostbite3,
  frostbiteJoinGames,
  projects,
  serverWidgetTypes,
  widgetSize,
} from "../../../../api/static";
import "../../../../assets/scss/App.scss";
import "../../../../locales/config";
import { capitalizeFirstLetter } from "../../../functions/capitalizeFirstLetter";
import { CopyToClipboard } from "../../../functions/CopyToClipboard";
import sslFix from "../../../functions/fixEaAssets";
import { ServerGraphQuery } from "../../../graphing/line";
import { BfPortalInfo, BfvPlaygroundInfo } from "./BfPortal";
import { ServerLeaderboard } from "./Leaderboard";
import * as styles from "./Main.module.scss";
import { OwnerInfo } from "./Owner";
import { ServerPlatoon } from "./Platoon";
import {
  Bf3ServerPlayerlist,
  BfListServerPlayerList,
  MarnePlayerList,
  ServerPlayerlist,
} from "./Players";
import { ServerConfig } from "./Portal";
import { ServerScoreboard } from "./Scoreboard";
import { useLocation } from "react-router";

interface Views {
  loading: boolean;
  error: boolean;
  game: string;
  platform: string;
  stats: DetailedServerInfo;
  getter: string;
  serverName: string;
}

function MapRotationItem(props: {
  stats: ServerRotation;
  index: number;
}): React.ReactElement {
  const { stats, index } = props;
  return (
    <div className="alignW">
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
          <span style={{ color: "#000" }}>{index + 1}</span>
        </div>
        <div
          className={styles.mapImage}
          style={{ backgroundImage: `url("${sslFix(stats?.image)}")` }}
        ></div>
        <div className={styles.serverInfo}>
          <h3
            style={{
              marginTop: ".2rem",
              lineHeight: 0.8,
              textAlign: "center",
            }}
          >
            {stats?.mapname}
          </h3>
          <p style={{ margin: 0, textAlign: "center" }}>{stats?.mode}</p>
        </div>
      </div>
    </div>
  );
}

export function Results(props: Views): React.ReactElement {
  const { loading, error, stats } = props;
  const query = new URLSearchParams(useLocation().search);
  // const blazeIdQuery = query.get("blazeid");
  if (props.game === "bf6" && stats !== undefined && query.has("name")) {
    stats.prefix = query.get("name");
  }
  const getLanguage = () => window.localStorage.i18nextLng;
  const numberFormat = new Intl.NumberFormat(getLanguage());
  const copyStates = {};
  serverWidgetTypes.map((element) => {
    const [tempCopyState, tempSetCopyState] = React.useState<string>("copy");
    copyStates[element] = { state: tempCopyState, set: tempSetCopyState };
  });

  const { t, i18n } = useTranslation();
  const modCategories: { [id: string]: ModListReturn[] } = {};
  stats?.modList?.forEach((item) => {
    if (Object.keys(modCategories).includes(item?.category)) {
      modCategories[item?.category].push(item);
    } else {
      modCategories[item?.category] = [item];
    }
  });
  const sortedModCategories: { [id: string]: ModListReturn[] } = Object.keys(
    modCategories,
  )
    .sort((a, b) => modCategories[b].length - modCategories[a].length)
    .reduce((acc, key) => ((acc[key] = modCategories[key]), acc), {});
  let widgetReturn =
    props.getter === "name"
      ? encodeURIComponent(props.serverName)
      : encodeURIComponent(stats?.prefix);
  let widgetItem = "name";

  if (
    !dice.includes(props.game) &&
    props.game != "battlebit" &&
    !props.game.includes("marne")
  ) {
    widgetItem = "serverip";
    widgetReturn = `${stats?.ip}:${stats?.port}`;
  }

  if (props.game === "bf6") {
    widgetItem = "serverid";
    widgetReturn = `${stats?.serverId}`;
  }

  let queue: number = undefined;
  queue = stats?.inQue;
  let queueString = "";
  if (queue !== undefined && queue !== 0) {
    queueString = `[${queue}]`;
  }
  let officialString = "";
  if (stats?.official !== undefined) {
    officialString = stats?.official
      ? ` - ${t("serverType.official")}`
      : ` - ${t("serverType.custom")}`;
  }
  return (
    <div>
      <div className={styles.alignServerImg}>
        <div
          className={styles.serverImage}
          style={{
            backgroundImage: `url("${sslFix(stats?.currentMapImage || stats?.mapImage)}")`,
          }}
        >
          <div className={styles.blur}>
            <h1 className={styles.serverText}>{stats?.smallmode}</h1>
            {stats?.favorites && (
              <h1 className={styles.serverFavorites}>
                &#9734; {numberFormat.format(stats?.favorites)}
              </h1>
            )}
          </div>
        </div>
        <div>
          <h2
            style={{
              whiteSpace: "pre",
              marginTop: "1.3rem",
            }}
          >
            {loading
              ? t("loading")
              : error
                ? t("servers.notFound.main")
                : stats?.prefix}
          </h2>
          <p className={styles.description} style={{ maxWidth: "1000px" }}>
            {loading
              ? t("notApplicable")
              : error
                ? t("servers.notFound.description")
                : stats?.description}
          </p>
          {loading || error ? (
            <p className={styles.description}>{t("notApplicable")}</p>
          ) : (
            <p className={styles.description}>
              {stats?.playerAmount}/{stats?.maxPlayers}
              {stats?.maxPlayerAmount}
              {queueString}
              {stats?.noBotsPlayerAmount
                ? ` (${stats.noBotsPlayerAmount} without bots)`
                : ``}
              {stats?.botAmount !== undefined &&
                t("serverSearch.botAmount", {
                  botAmount: stats?.botAmount,
                })}{" "}
              - {stats?.currentMap ? stats?.currentMap : stats?.map}
              {officialString}
            </p>
          )}
          {stats?.region ? (
            <>
              {["bf2042", "bf6"].includes(props.game) ? (
                <p className={styles.description}>
                  {t(`regions.${stats.region?.toLowerCase()}`)}
                </p>
              ) : props.game == "battlebit" ? (
                <p className={styles.description}>
                  {t(`battlebitRegions.${stats.region}`)} -{" "}
                  {i18n.exists(`stats.gamemodes.${stats.mode}`)
                    ? t(`stats.gamemodes.${stats.mode}`)
                    : stats.mode}
                </p>
              ) : (
                <p className={styles.description}>
                  {t(`regions.${stats.region?.toLowerCase()}`)} /{" "}
                  {stats.country} -{" "}
                  {i18n.exists(`stats.gamemodes.${stats.mode}`)
                    ? t(`stats.gamemodes.${stats.mode}`)
                    : stats.mode}
                </p>
              )}
            </>
          ) : (
            <p className={styles.description}>{stats?.mode}</p>
          )}

          <p className={styles.description}>
            {t(`games.${props.game}`)}
            {Object.keys(projects).includes(props.game) && (
              <>
                {" "}
                -{" "}
                <a
                  style={{ textDecoration: "underline", lineHeight: 1 }}
                  href={projects[props.game]}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("serverSearch.showProject")}
                </a>
              </>
            )}
          </p>
        </div>
      </div>
      {/* older titles use ip address, thats static already */}
      {(dice.includes(props.game) || props.game.includes("marne")) && (
        <p className={styles.description} style={{ marginTop: "6px" }}>
          {t("servers.permLink")}{" "}
          <CopyToClipboard
            message={`https://gametools.network/servers/${props.game
              }/name/${encodeURIComponent(stats?.prefix)}/pc`}
            stateTranslation={"states"}
          />
        </p>
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
          <div className="align">
            <button
              className="smallButtonSecondary"
              style={{ marginBottom: 0 }}
              onClick={function () {
                location.href = `${window.encodeURIComponent(props.game)}://${stats.gameId}`;
              }}
            >
              {t("servers.join")}
            </button>
            <button
              className="smallButtonSecondary"
              style={{ marginBottom: 0 }}
              onClick={function () {
                location.href = `https://joinme.click/g/${window.encodeURIComponent(props.game)}/${stats.gameId}`;
              }}
            >
              {t("servers.joinme.view")}
            </button>
          </div>
        </>
      )}
      {(dice.includes(props.game) || props.game.includes("marne")) &&
        stats?.rotation?.length > 0 && (
          <>
            <h2 className={styles.title} style={{ marginBottom: 0 }}>
              {t("servers.rotation")}
            </h2>
            <div className="align">
              {loading
                ? [...Array(4)].map((key, index) => (
                  <MapRotationItem
                    key={key}
                    stats={{
                      image: "",
                      mapname: t("loading"),
                      mode: t("notApplicable"),
                      index: index,
                    }}
                    index={index}
                  />
                ))
                : stats?.rotation?.map(
                  (key: ServerRotation, index: number) =>
                    key && (
                      <MapRotationItem
                        key={index}
                        stats={key}
                        index={index}
                      />
                    ),
                )}
            </div>
          </>
        )}
      <div className="pageColumn">
        <div className="pageRow">
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
                (["bf2042", "bf6"].includes(props.game) ? (
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
                  <ServerConfig
                    game={props.game}
                    serverInfo={stats?.serverInfo}
                    experienceId={stats?.experienceId}
                    isError={error}
                    isLoading={loading}
                  />
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
                <Bf3ServerPlayerlist
                  players={stats?.players}
                  game={props.game}
                  isLoading={props.loading}
                  isError={props.error}
                />
              ) : // older titles
                stats?.ip && stats?.port ? (
                  <BfListServerPlayerList
                    game={props.game}
                    serverIp={stats?.ip}
                    serverPort={stats?.hostport || stats?.port}
                  />
                ) : (
                  props.game.includes("marne") && (
                    <MarnePlayerList
                      stats={stats}
                      game={props?.game}
                      gameId={stats?.gameId}
                      isLoading={props.loading}
                      isError={props.error}
                    />
                    // <Bf3ServerPlayerlist players={stats?.players} game="bf1" />
                  )
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
        </div>

        <div className="pageRow">
          <ServerGraphQuery
            stats={stats}
            game={props.game}
            // use serverid for marne
            getter={props.game.includes("marne") ? "serverid" : props.getter}
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
          {props.game === "bfv" && stats?.official === false && (
            <BfvPlaygroundInfo
              playgroundId={stats?.playgroundId}
              game={props.game}
            />
          )}
          {["bf2042", "bf6"].includes(props.game) ? (
            <>
              {stats?.configCreator !== null && (
                <OwnerInfo
                  owner={stats?.configCreator}
                  game={props.game}
                  title={t("servers.owner.experience")}
                />
              )}
              <BfPortalInfo experienceName={stats?.serverInfo?.configName} />
              {props.game === "bf2042" && (
                <>
                  <h2>{t("servers.settings")}</h2>
                  {stats?.settings.map(
                    (value: ServerSettings, index: number) => {
                      return (
                        <div key={index}>
                          <p className={styles.altDescription} key={index}>
                            <b>
                              {capitalizeFirstLetter(
                                value.values[0].readableSettingName,
                              )}
                            </b>
                            : { }
                            {value.values[1].readableSettingName}
                          </p>
                        </div>
                      );
                    },
                  )}
                </>
              )}
              <br></br>
            </>
          ) : (
            <>
              {stats?.settings && (
                <>
                  <h2>{t("servers.settings")}</h2>
                  <div className="alignT">
                    {Object.entries(stats?.settings).map(
                      (key: [string, unknown], index: number) => {
                        return (
                          <div key={index}>
                            <h3>{key[0]}</h3>
                            {Object.entries(key[1]).map(
                              (key: [string, string], index: number) => {
                                return (
                                  <p
                                    className={styles.altDescription}
                                    key={index}
                                  >
                                    <b>
                                      {key[0] in bf4Settings
                                        ? bf4Settings[key[0]]
                                        : capitalizeFirstLetter(key[0])}
                                    </b>
                                    : {key[1]?.toString()}
                                  </p>
                                );
                              },
                            )}
                          </div>
                        );
                      },
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      {props.game.includes("marne") && (
        <>
          <h2 style={{ marginBottom: 0 }}>{t("servers.modList.main")}</h2>
          {Object.keys(modCategories).length > 0 ? (
            <div className="alignT">
              {Object.entries(sortedModCategories).map(
                ([category, modList], index) => (
                  <div key={index} style={{ marginRight: "1rem" }}>
                    <h3>{category}</h3>
                    {modList.map((current, index) => (
                      <div key={index} style={{ marginBottom: "0.5rem" }}>
                        <h4 style={{ margin: 0, marginTop: "0.2rem" }}>
                          {current?.name || t("notApplicable")}
                        </h4>
                        <p className={styles.altDescription}>
                          {t("servers.modList.file")}
                          {current?.file_name || t("notApplicable")}
                        </p>
                        <p className={styles.altDescription}>
                          {t("servers.modList.version")}
                          {current?.version || t("notApplicable")}
                        </p>
                        <p className={styles.altDescription}>
                          {current?.link ? (
                            <a
                              href={current?.link}
                              style={{ color: "inherit" }}
                            >
                              {current?.link}
                            </a>
                          ) : (
                            t("servers.modList.noURl")
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                ),
              )}
            </div>
          ) : (
            <p className={styles.description}>{t("servers.modList.noMods")}</p>
          )}
        </>
      )}
      <h2 style={{ marginBottom: 0 }}>{t("servers.iframe.main")}</h2>
      <p
        className={styles.description}
        style={{ margin: 0, marginTop: "0.2rem" }}
      >
        {t("servers.iframe.info")}
      </p>
      <div className="pageColumn">
        {serverWidgetTypes.map((element, index) => {
          return (
            <div className="pageRow" key={index}>
              <p className={styles.description} style={{ marginTop: "15px" }}>
                {t(`servers.iframe.${element}`)}{" "}
                <CopyToClipboard
                  message={`<iframe title="Server playercount" src="${process.env.widgets_gametools_endpoint}/servers/${element}/${props.game
                    }/${widgetItem}/${widgetReturn}/${props.platform
                    }?lng=${getLanguage()}${props.game === "bf6" ? "&name=" + stats?.prefix : ""}" height="${widgetSize[index]
                    }px" width="700px" frameborder="0" allowtransparency="true"></iframe>`}
                  stateTranslation={"servers.iframe.states"}
                />
              </p>
              {widgetReturn == undefined ? (
                <p className={styles.description}>{t("loading")}</p>
              ) : (
                <iframe
                  title="Server playercount"
                  src={`${process.env.widgets_gametools_endpoint}/servers/${element}/${props.game
                    }/${widgetItem}/${widgetReturn}/${props.platform
                    }?lng=${getLanguage()}${props.game === "bf6" ? "&name=" + stats?.prefix : ""}`}
                  style={{
                    maxWidth: "700px",
                    backgroundColor: "transparent",
                  }}
                  height={`${widgetSize[index]}px`}
                  width="100%"
                  frameBorder="0"
                  loading="lazy"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
