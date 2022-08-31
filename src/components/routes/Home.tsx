import * as React from "react";
import "../../locales/config";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  AltText,
  Box,
  Container,
  ButtonLink,
  BigButtonLink,
  PrimaryButtonLink,
  Align,
  AlignW,
  PageColumn,
  BigButtonSecondaryBox,
  PageRow,
} from "../Materials";
import { TotalGraphQuery } from "../graphing/line";
import { ServerSearch } from "./Servers/Search/Main";
import { StatSearch } from "./Stats/Search/PlayerSearch";

import background from "../../assets/img/RevealScreenshot_10_VistaHourglass_3840x2160_NoLogo-25798260c0054ec56441 1.png";
import cloudBg from "../../assets/img/cloud-bg.png";
import bf1Logo from "../../assets/img/bf1-logo.png";
import bf5Logo from "../../assets/img/bf5-logo.png";
import bf2042Logo from "../../assets/img/bf2042-logo.png";

import statbitsLogo from "../../assets/img/statbits-icon.svg";
import bflistLogo from "../../assets/img/bflist-icon.svg";
import bfbanLogo from "../../assets/img/bfban-icon.png";
import { Link } from "react-router-dom";

const Image = styled.div`
  height: 356px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("${background}");
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
`;

const Description = styled.p`
  white-space: pre-line;
`;

const CloudImage = styled.div`
  height: 479px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("${cloudBg}");
`;

const GameLogo = styled.img`
  height: 17px;
  margin-right: 35px;
`;

function Home(): React.ReactElement {
  const { t, i18n } = useTranslation();
  let i = 0;
  const ourFriendLogos = [statbitsLogo, bflistLogo, bfbanLogo];
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
      url: t(`home.otherServices.${i}.url`),
    });
    i += 1;
  }

  return (
    <div>
      <Image>
        <Blur>
          <Welcome>
            <WelcomeText style={{ marginBottom: "2.5rem" }}>
              {t("playerSearch.description")}
            </WelcomeText>
            <StatSearch />
          </Welcome>
        </Blur>
      </Image>
      <Container>
        <ServerSearch />
        <h2 style={{ margin: "24px 0 24px 24px" }}>
          {t("home.graphs.header")}
        </h2>
        <TotalGraphQuery />
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
            style={{ width: "77px", borderRadius: "10px", marginTop: "3rem" }}
          >
            {t("home.manager.open")}
          </PrimaryButtonLink>
          <Description style={{ marginTop: "3rem" }}>
            {t("home.manager.disclaimer")}
          </Description>
          <Align>
            <GameLogo src={bf1Logo} />
            <GameLogo src={bf5Logo} style={{ height: "18px" }} />
            <GameLogo
              src={bf2042Logo}
              style={{ marginTop: "0.5px", height: "17.2px" }}
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
                      style={{ height: "24px", marginRight: "1rem" }}
                    />
                    <h3>{key.header}</h3>
                  </AlignW>
                  <Description>{key.description}</Description>
                  <br></br>
                  <ButtonLink target="_blank" href={key.url}>
                    {key.link}
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
                  <Link to={key.url}>
                    <BigButtonSecondaryBox
                      style={{
                        width: "97%",
                        maxWidth: "470px",
                        textAlign: "left",
                        paddingLeft: "2rem",
                      }}
                    >
                      {key.header}
                    </BigButtonSecondaryBox>
                  </Link>
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
