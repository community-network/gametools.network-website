import { useLocalStorage } from "@uidotdev/usehooks";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ServerList, ServerSearch } from "../../../../api/ReturnTypes";
import {
  dice,
  frostbiteJoinGames,
  oldJoinGames,
  regionToTranslation,
} from "../../../../api/static";
import "../../../../assets/scss/App.scss";
import "../../../../locales/config";
import sslFix from "../../../functions/fixEaAssets";
import { Box } from "../../../Materials";
import { DynamicSort } from "../../Stats/Player/Main";
import * as styles from "./Results.module.scss";

const handleChildElementClick = (e: { stopPropagation: () => void }) => {
  e.stopPropagation();
  // Do other stuff here
};

function LoadingServerInfo(
  props: Readonly<{
    spacingStyle: React.CSSProperties;
    serverText: string;
    style?: React.CSSProperties;
  }>,
) {
  const { t } = useTranslation();
  return (
    <Box spacingStyle={props.spacingStyle}>
      <div className="alignServerImg">
        <div
          className={styles.serverImage}
          style={{ backgroundImage: `url("")` }}
        >
          <div className={styles.blur} />
        </div>
        <div className={styles.serverInfo}>
          <h3
            style={{
              whiteSpace: "pre",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "gray",
              ...props.style,
            }}
          >
            {props.serverText}
          </h3>
          <p style={{ color: "gray" }}>
            0/0 - {t("notApplicable")} - {t("notApplicable")}
          </p>
        </div>
      </div>
    </Box>
  );
}

interface Views {
  loading: boolean;
  error: boolean;
  game: string;
  stats: ServerSearch;
  sortType: string;
  spacingStyle?: React.CSSProperties;
  mainPage: boolean;
}

export function Results(props: Views): React.ReactElement {
  const { t, i18n } = useTranslation();
  const { stats, game } = props;
  const [adminMode] = useLocalStorage<boolean>("adminMode", false);
  const gamemodeTranslation = ["bf3", "bfh"].includes(game)
    ? `servers.${game}.gamemodes`
    : "stats.gamemodes";
  if (!props.loading && !props.error) {
    if (stats.servers.length == 0) {
      return (
        <Box spacingStyle={props.spacingStyle}>
          <h3>{t("resultNotFound")}</h3>
        </Box>
      );
    }

    const servers = stats.servers.sort(DynamicSort(props.sortType));
    return (
      <>
        {servers.map((key: ServerList, index: number) => {
          const queue = key.inQue ?? key.inQueue;
          let queueString = "";
          if (queue !== undefined && queue > 0 && queue !== null) {
            queueString = `[${queue}]`;
          }
          let spectatorAmount = "";
          if (
            adminMode &&
            key?.inSpectator !== undefined &&
            key?.inSpectator !== null
          ) {
            spectatorAmount = `(${key.inSpectator})`;
          }
          let region: string = undefined;
          if (props.game === "bf2042") {
            if (Object.keys(regionToTranslation).includes(key.region)) {
              region = ` - ${t(`regions.${regionToTranslation[key.region]}`)}`;
            } else {
              region = ` - ${key.region}`;
            }
          } else if (props.game === "battlebit") {
            region = ` - ${t(`battlebitRegions.${key.region}`)}`;
          } else if (key.region !== undefined) {
            region = ` - ${t(`regions.${key.region.toLowerCase()}`)}`;
          }
          let officialString = "";
          if (key.official !== undefined) {
            officialString = key.official
              ? " - " + t("serverType.official")
              : " - " + t("serverType.custom");
          }
          let idElement = "gameid";
          let result = key.gameId;
          if (props.game == "bf2042") {
            idElement = "serverid";
            result = key.serverId;
          } else if (props.game == "battlebit") {
            idElement = "name";
            result = encodeURIComponent(key.prefix);
          } else if (
            !dice.includes(props.game) &&
            !props.game.includes("marne")
          ) {
            idElement = "serverip";
            result = `${key.ip}:${key.port}`;
          }

          return (
            <Box
              spacingStyle={props.spacingStyle}
              className="box_hover"
              link={`/servers/${props.game}/${idElement}/${result}/${key.platform || "pc"
                }${props.game == "bf2042" ? `?blazeid=${key.blazeGameId}` : ""}`}
              condition={true}
              key={index}
              innerStyle={props.spacingStyle}
            >
              <div className="alignServerImg">
                <div
                  className={styles.serverImage}
                  style={{
                    backgroundImage: `url("${sslFix(key.url) ?? sslFix(key.mapImage)}")`,
                  }}
                >
                  <div className={styles.blur} />
                </div>
                <div className={styles.serverInfo}>
                  <h3
                    style={{
                      whiteSpace: "pre",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {key.server}
                    {key.prefix}
                  </h3>
                  <p>
                    {key.hasPassword && (
                      <span title={t("servers.password")}>
                        <svg
                          style={{ marginRight: "2px" }}
                          width="13"
                          height="13"
                          viewBox="0 0 24 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18 10.5C19.6569 10.5 21 11.8431 21 13.5V19.5C21 21.1569 19.6569 22.5 18 22.5H6C4.34315 22.5 3 21.1569 3 19.5V13.5C3 11.8431 4.34315 10.5 6 10.5V7.5C6 4.18629 8.68629 1.5 12 1.5C15.3137 1.5 18 4.18629 18 7.5V10.5ZM12 3.5C14.2091 3.5 16 5.29086 16 7.5V10.5H8V7.5C8 5.29086 9.79086 3.5 12 3.5ZM18 12.5H6C5.44772 12.5 5 12.9477 5 13.5V19.5C5 20.0523 5.44772 20.5 6 20.5H18C18.5523 20.5 19 20.0523 19 19.5V13.5C19 12.9477 18.5523 12.5 18 12.5Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    )}
                    {key.playerAmount}/{key.maxPlayers}
                    {key.maxPlayerAmount} {queueString} {spectatorAmount}
                    {key?.botAmount !== undefined &&
                      t("serverSearch.botAmount", {
                        botAmount: key?.botAmount,
                      })}{" "}
                    -{" "}
                    {i18n.exists(`${gamemodeTranslation}.${key.mode}`)
                      ? t(`${gamemodeTranslation}.${key.mode}`)
                      : key.mode}
                    {key.mode === undefined ? key.map : null}
                    {officialString}
                    {region}
                  </p>
                </div>
                {oldJoinGames.includes(props.game) && (
                  <a
                    onClick={(e) => handleChildElementClick(e)}
                    href={`${props.game.split(".")[0]}://${key.ip}:${key.port}`}
                    style={{ alignSelf: "end" }}
                  >
                    <button
                      className="bigButtonSecondaryBox"
                      style={{ marginBottom: ".6rem" }}
                      type="submit"
                    >
                      {t("servers.join")}
                    </button>
                  </a>
                )}
                {frostbiteJoinGames.includes(props.game) && (
                  <a
                    onClick={(e) => handleChildElementClick(e)}
                    href={`${props.game}://${key.gameId}`}
                    style={{ alignSelf: "end" }}
                  >
                    <button
                      className="bigButtonSecondaryBox"
                      style={{ marginBottom: ".6rem" }}
                      type="submit"
                    >
                      {t("servers.join")}
                    </button>
                  </a>
                )}
              </div>
            </Box>
          );
        })}
      </>
    );
  } else {
    return (
      <>
        {[...Array(props.mainPage ? 4 : 3)].map((key) => (
          <LoadingServerInfo
            key={key}
            spacingStyle={props.spacingStyle}
            serverText={t("loading")}
          />
        ))}
      </>
    );
  }
}
