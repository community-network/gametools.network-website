import * as React from "react";
import "../../locales/config";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  AltText,
  Box,
  ButtonLink,
  BigButtonLink,
  PrimaryButtonLink,
  Align,
  AlignW,
  PageColumn,
  BigButtonSecondaryBox,
  PageRow,
  OpenExternal,
} from "../Materials";
import { TotalGraphQuery } from "../graphing/line";
import { ServerSearch } from "./Servers/Search/Main";
import { StatSearch } from "./Stats/Search/PlayerSearch";

import background from "../../assets/img/RevealScreenshot_10_VistaHourglass_3840x2160_NoLogo-25798260c0054ec56441 1.png?format=webp&useResponsiveLoader=true";
import cloudBg from "../../assets/img/cloud-bg.png?format=webp&useResponsiveLoader=true";
import bf1Logo from "../../assets/img/bf1-logo.png?sizes[]=96&format=webp&useResponsiveLoader=true";
import bf5Logo from "../../assets/img/bf5-logo.png?sizes[]=94.7333&format=webp&useResponsiveLoader=true";
import bf2042Logo from "../../assets/img/bf2042-logo.png?sizes[]=94.6&format=webp&useResponsiveLoader=true";

import statbitsLogo from "../../assets/icon/statbits-icon.svg";
import bflistLogo from "../../assets/icon/bflist-icon.svg";
import bfbanLogo from "../../assets/icon/bfban-icon.png?sizes[]=24&format=webp&useResponsiveLoader=true";
import bfportalLogo from "../../assets/icon/bfportal-icon.png?sizes[]=24&format=webp&useResponsiveLoader=true";
import { Link } from "react-router-dom";
import AdsComponent from "../Ads";

export const Container = styled.div`
  @media (min-width: 1300px) {
    padding-left: 8.33%;
  }
  @media (max-width: 1300px) {
    padding-left: 2%;
  }
`;

const Image = styled.div`
  height: 356px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("${background.src}");
`;

const Blur = styled.div`
  height: 356px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4872) 100%
  );
`;

const Welcome = styled.div`
  position: absolute;
  top: 6rem;
  @media (min-width: 750px) {
    padding-left: 8.33%;
  }
  @media (max-width: 750px) {
    padding-left: 2%;
  }
  max-width: 40em;
`;

const WelcomeText = styled.p`
  ${AltText}
  white-space: pre-line;
  font-size: 18px;
  @media (min-width: 548px) {
    margin-bottom: 2.5rem;
  }
  @media (max-width: 358px) {
    margin-top: 0;
  }
`;

const Description = styled.p`
  white-space: pre-line;
`;

const CloudImage = styled.div`
  height: 479px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("${cloudBg.src}");
`;

const GameLogo = styled.img`
  margin-right: 35px;
  margin-bottom: 10px;
`;

const AdBox = styled.div`
  padding-left: 8.33%;
  margin-top: 0.9rem;
  display: inline;
  position: absolute;
  left: 935px;
  width: 225px;

  @media (max-width: 1300px) {
    display: none;
  }
`;

function Home(): React.ReactElement {
  const { t, i18n } = useTranslation();
  document.title = t("pageTitle.main");

  let i = 0;
  const ourFriendLogos = [bfbanLogo, bfportalLogo, statbitsLogo, bflistLogo];
  const ourFriends = [];
  while (i18n.exists(`home.ourFriends.${i}`)) {
    ourFriends.push({
      header: t(`home.ourFriends.${i}.header`),
      link: t(`home.ourFriends.${i}.link`),
      url: t(`home.ourFriends.${i}.url`),
      description: t(`home.ourFriends.${i}.description`),
    });
    i += 1;
  }

  i = 0;
  const otherServices = [];
  while (i18n.exists(`home.otherServices.${i}`)) {
    otherServices.push({
      header: t(`home.otherServices.${i}.header`),
      localUrl: i18n.exists(`home.otherServices.${i}.localUrl`)
        ? t(`home.otherServices.${i}.localUrl`)
        : null,
      url: i18n.exists(`home.otherServices.${i}.url`)
        ? t(`home.otherServices.${i}.url`)
        : null,
    });
    i += 1;
  }

  return (
    <div>
      <Image>
        <Blur>
          <Welcome>
            <WelcomeText>{t("playerSearch.description")}</WelcomeText>
            <StatSearch />
          </Welcome>
        </Blur>
      </Image>
      <Container>
        <ServerSearch />
        <h2 style={{ margin: "24px 0 24px 24px" }}>
          {t("home.graphs.header")}
        </h2>
        <div>
          <AdBox>
            <AdsComponent
              dataAdSlot="8911547346"
              style={{ display: "block", height: "300px" }}
            />
          </AdBox>
          <TotalGraphQuery />
        </div>
        <BigButtonLink target="_blank" href="https://graphs.gametools.network/">
          {t("home.graphs.detailed")}
        </BigButtonLink>
      </Container>
      <CloudImage>
        <Container>
          <h1 style={{ paddingTop: "2rem", marginBottom: "3.5rem" }}>
            {t("home.manager.header")}
          </h1>
          <Description>{t("home.manager.description")}</Description>
          <PrimaryButtonLink
            target="_blank"
            href="https://manager.gametools.network/"
            style={{ width: "90px", borderRadius: "10px", marginTop: "3rem" }}
          >
            <OpenExternal style={{ paddingTop: "1px" }} />{" "}
            {t("home.manager.open")}
          </PrimaryButtonLink>
          <Description style={{ marginTop: "3rem" }}>
            {t("home.manager.disclaimer")}
          </Description>
          <Align>
            <GameLogo
              alt="bf1 logo"
              src={bf1Logo.src}
              srcSet={bf1Logo.srcSet}
              style={{ height: bf1Logo.height, width: bf1Logo.width }}
              loading="lazy"
            />
            <GameLogo
              alt="bf5 logo"
              src={bf5Logo.src}
              srcSet={bf5Logo.srcSet}
              style={{ height: bf5Logo.height, width: bf5Logo.width }}
              loading="lazy"
            />
            <GameLogo
              alt="bf2042 logo"
              src={bf2042Logo.src}
              srcSet={bf2042Logo.srcSet}
              style={{
                marginTop: "0.5px",
                height: bf2042Logo.height,
                width: bf2042Logo.width,
              }}
              loading="lazy"
            />
          </Align>
        </Container>
      </CloudImage>
      <Container>
        <PageColumn>
          <PageRow title="970px">
            <h2 style={{ margin: "24px 0 24px 24px" }}>
              {t("home.ourFriends.header")}
            </h2>
            {ourFriends.map((key, index) => {
              return (
                <Box
                  key={index}
                  align="flex-start"
                  spacingStyle={{ maxWidth: "922px" }}
                >
                  <AlignW style={{ marginTop: "0.5rem" }}>
                    <img
                      src={ourFriendLogos[index]}
                      alt="icon"
                      style={{
                        height: "24px",
                        width: "24px",
                        marginRight: "1rem",
                      }}
                      loading="lazy"
                    />
                    <h3>{key.header}</h3>
                  </AlignW>
                  <Description>{key.description}</Description>
                  <br></br>
                  <ButtonLink target="_blank" href={key.url}>
                    <OpenExternal style={{ paddingTop: "1px" }} /> {key.link}
                  </ButtonLink>
                </Box>
              );
            })}
          </PageRow>
          <div>
            <h2 style={{ margin: "24px 0 24px 24px" }}>
              {t("home.otherServices.header")}
            </h2>
            {otherServices.map((key, index) => {
              return (
                <div key={index}>
                  {key.localUrl ? (
                    <Link to={key.localUrl}>
                      <BigButtonSecondaryBox
                        style={{
                          width: "97%",
                          maxWidth: "470px",
                          textAlign: "left",
                          padding: "0 2rem",
                        }}
                      >
                        {key.header}
                      </BigButtonSecondaryBox>
                    </Link>
                  ) : (
                    <a target="_blank" href={key.url} rel="noreferrer">
                      <BigButtonSecondaryBox
                        style={{
                          width: "97%",
                          maxWidth: "470px",
                          textAlign: "left",
                          padding: "0 2rem",
                        }}
                      >
                        <OpenExternal style={{ paddingBottom: "1px" }} />{" "}
                        {key.header}
                      </BigButtonSecondaryBox>
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </PageColumn>
      </Container>
    </div>
  );
}

export default Home;
