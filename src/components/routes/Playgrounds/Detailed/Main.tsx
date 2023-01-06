import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../../../assets/scss/App.scss";
import {
  AltText,
  Align,
  AlignW,
  Box,
  PageColumn,
  PageRow,
} from "../../../Materials";
import {
  MapInfo,
  PlaygroundInfoReturn,
  Tags,
} from "../../../../api/ReturnTypes";
import { Title } from "./Playgrounds";
import { PlaygroundOwner } from "./Owner";

const AltDescription = styled.p`
  ${AltText}
  line-height: 1.2;
  margin: 0.5rem 0.5rem 0.5rem 0;
`;

export const Description = styled.p`
  ${AltText}
  line-height: 0.6;
`;

interface IPlaygroundImage {
  background: string;
}

interface Views {
  loading: boolean;
  error: boolean;
  game: string;
  platform: string;
  stats: PlaygroundInfoReturn;
}

const PlaygroundImage = styled.div<IPlaygroundImage>`
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

const PortalLogo = styled.h1`
  ${AltText}
  margin-top: .7rem;
  text-align: center;
`;

const MapImage = styled.div<IPlaygroundImage>`
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

const PlaygroundInfo = styled.div`
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
  const { t } = useTranslation();
  const stats = props.stats;
  if (props.error) {
    return (
      <>
        <h1>{t("playgrounds.notFound.main")}</h1>
        <p>{t("playgrounds.notFound.description")}</p>
      </>
    );
  } else if (props.loading) {
    return (
      <Box>
        <h3>{t("loading")}</h3>
      </Box>
    );
  } else {
    const playground = stats.originalPlayground;

    const createdDate = new Date(0);
    createdDate.setUTCSeconds(playground.createdAt.seconds || 0);

    const updatedDate = new Date(0);
    updatedDate.setUTCSeconds(playground.updatedAt.seconds || 0);

    const tags = stats.tag;
    return (
      <div>
        <AlignSeverImg>
          <PlaygroundImage background={playground.mapRotation.maps[0].image}>
            <Blur>
              <PortalLogo>
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="5rem"
                  height="5rem"
                  viewBox="0 0 40 40"
                  enableBackground="new 0 0 40 40"
                  xmlSpace="preserve"
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                >
                  <path
                    id="Icon"
                    fill="white"
                    d="M24.5,12.8L0,39.7L20,5L24.5,12.8z M29,33.3H8.8l-5.8,6.3H40L30.4,23l-5.5,3L29,33.3z M31.1,8.8
    L10.9,31.1l18.3-10L31.1,8.8z"
                  ></path>
                </svg>
              </PortalLogo>
            </Blur>
          </PlaygroundImage>
          <div>
            <h2 style={{ lineHeight: 0.5, marginTop: "1.5rem" }}>
              {playground.settings.configName.value}
            </h2>
            <Description>
              {playground.settings.ConfigDescription.value}
            </Description>
            <Description>
              {t("playgrounds.maxPlayers", {
                amount: playground.mapRotation.maps[0].gameSize,
              })}
              {stats.progressionMode
                ? " - " + t(`playgrounds.types.${stats.progressionMode.value}`)
                : ""}
            </Description>
            <Description>
              {t("dateType.createdAt")}: {t("date", { date: createdDate })}
            </Description>
            <Description>
              {t("dateType.updatedAt")}: {t("date", { date: updatedDate })}
            </Description>
          </div>
        </AlignSeverImg>
        <Title style={{ marginBottom: 0 }}>{t("playgrounds.rotation")}</Title>
        <Align>
          {playground.mapRotation.maps.map((key: MapInfo, index: number) => {
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
                  <MapImage background={key.image}></MapImage>
                  <PlaygroundInfo>
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
                  </PlaygroundInfo>
                </div>
              </AlignW>
            );
          })}
        </Align>

        <PageColumn>
          <PageRow>
            <PlaygroundOwner owner={playground.owner} game={props.game} />
          </PageRow>

          <PageRow>
            <h2>{t("playgrounds.tags")}</h2>
            {tags.map((value: Tags, index: number) => {
              return (
                <div key={index}>
                  <AltDescription key={index}>
                    <b>
                      {capitalizeFirstLetter(
                        value.metadata.translations[0].localizedText,
                      )}
                    </b>
                    : {}
                    {value.metadata.translations[1].localizedText}
                  </AltDescription>
                </div>
              );
            })}
            <br></br>
          </PageRow>
        </PageColumn>
      </div>
    );
  }
}
