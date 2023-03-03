import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../../../assets/scss/App.scss";
import {
  AlignSeverImg,
  AltText,
  BigButtonSecondaryBox,
  Box,
} from "../../../Materials";
import { ServerList, ServerSearch } from "../../../../api/ReturnTypes";
import { dice, frostbiteJoinGames, oldJoinGames } from "../../../../api/static";
import { DynamicSort } from "../../Stats/Player/Main";

const Description = styled.p`
  ${AltText}
`;

interface IServerImage {
  background: string;
}

const ServerImage = styled.div<IServerImage>`
  margin-top: 12px;
  height: 4rem;
  min-width: 7rem;
  @media (min-width: 430px) {
    margin-right: 1.5rem;
  }
  @media (max-width: 430px) {
    border-radius: 5px;
  }
  border-radius: 2px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("${(props) => props.background}");
`;

const Blur = styled.div`
  height: 100%;
  flex-grow: 3;
  border-radius: 2px;
  @media (max-width: 430px) {
    border-radius: 5px;
  }
  background: radial-gradient(
    100% 100% at 50% 50%,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.48) 100%
  );
`;

const ServerInfo = styled.div`
  margin-top: 16px;
  flex-grow: 2;
  whitespace: pre;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Spacing = styled.div`
  margin-bottom: 2rem;
`;

const handleChildElementClick = (e: { stopPropagation: () => void }) => {
  e.stopPropagation();
  // Do other stuff here
};

interface Views {
  loading: boolean;
  error: boolean;
  game: string;
  stats: ServerSearch;
  sortType: string;
  spacingStyle?: React.CSSProperties;
}

export function Results(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const stats = props.stats;

  if (!props.loading && !props.error) {
    if (stats.servers.length == 0) {
      return (
        <Spacing>
          <Description>{t("resultNotFound")}</Description>
        </Spacing>
      );
    }

    const servers = stats.servers.sort(DynamicSort(props.sortType));
    return (
      <>
        {servers.map((key: ServerList, index: number) => {
          const queue = key.inQue ?? key.inQueue;
          let queueString = "";
          if (queue !== undefined && queue !== 0 && queue !== null) {
            queueString = `[${queue}]`;
          }
          let region: string = undefined;
          if (props.game === "bf2042") {
            region = ` - ${key.region}`;
          } else if (key.region !== undefined) {
            region = ` - ${t(`regions.${key.region.toLowerCase()}`)}`;
          }
          let officialString = "";
          if (key.official !== undefined) {
            officialString = key.official ? " - Official" : " - Custom";
          }
          const useLink = dice.includes(props.game);
          return (
            <Box
              spacingStyle={props.spacingStyle}
              className={useLink ? "box_hover box" : ""}
              link={`/servers/${props.game}/${
                props.game == "bf2042" ? "serverid" : "gameid"
              }/${props.game == "bf2042" ? key.serverId : key.gameId}/${
                key.platform
              }${props.game == "bf2042" ? `?blazeid=${key.blazeGameId}` : ""}`}
              condition={useLink}
              key={index}
              innerStyle={props.spacingStyle}
            >
              <AlignSeverImg>
                <ServerImage background={key.url ?? key.mapImage}>
                  <Blur />
                </ServerImage>
                <ServerInfo>
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
                    {key.hasPassword ? (
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
                    ) : (
                      <></>
                    )}
                    {key.playerAmount}/{key.maxPlayers}
                    {key.maxPlayerAmount} {queueString} - {key.mode}
                    {key.mode === undefined ? key.map : null}
                    {officialString}
                    {region}
                  </p>
                </ServerInfo>
                {oldJoinGames.includes(props.game) ? (
                  <a
                    onClick={(e) => handleChildElementClick(e)}
                    href={`${props.game.split(".")[0]}://${key.ip}:${key.port}`}
                    style={{ alignSelf: "end" }}
                  >
                    <BigButtonSecondaryBox
                      style={{ marginBottom: ".6rem" }}
                      type="submit"
                    >
                      {t("servers.join")}
                    </BigButtonSecondaryBox>
                  </a>
                ) : (
                  <></>
                )}
                {frostbiteJoinGames.includes(props.game) ? (
                  <a
                    onClick={(e) => handleChildElementClick(e)}
                    href={`${props.game}://${key.gameId}`}
                    style={{ alignSelf: "end" }}
                  >
                    <BigButtonSecondaryBox
                      style={{ marginBottom: ".6rem" }}
                      type="submit"
                    >
                      {t("servers.join")}
                    </BigButtonSecondaryBox>
                  </a>
                ) : (
                  <></>
                )}
              </AlignSeverImg>
            </Box>
          );
        })}
      </>
    );
  } else {
    return (
      <Box spacingStyle={props.spacingStyle}>
        <h3>{t("loading")}</h3>
      </Box>
    );
  }
}
