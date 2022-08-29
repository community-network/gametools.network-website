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

const ServerText = styled.h1`
  font-size: 1.8rem;
  text-align: center;
  padding-top: 2rem;
  line-height: 0;
  margin-top: 0;
`;

const ServerInfo = styled.div`
  margin-top: 16px;
  flex-grow: 2;
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
      <Spacing>
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
            >
              <AlignSeverImg>
                <ServerImage background={key.url ?? key.mapImage}>
                  <Blur>
                    <ServerText>{key.smallMode}</ServerText>
                  </Blur>
                </ServerImage>
                <ServerInfo>
                  <h3>
                    {key.server}
                    {key.prefix}
                  </h3>
                  <p>
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
      </Spacing>
    );
  } else {
    return (
      <Box spacingStyle={props.spacingStyle}>
        <h3>{t("loading")}</h3>
      </Box>
    );
  }
}
