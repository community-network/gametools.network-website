import * as React from "react";
import "../../locales/config";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import background from "../../assets/img/RevealScreenshot_10_VistaHourglass_3840x2160_NoLogo-25798260c0054ec56441 1.png";
import {
  M88,
  AltText,
  Box,
  Container,
  AlignT,
  PrimaryButtonLink,
  ButtonLink,
} from "../Materials";
import { TotalGraphQuery } from "../graphing/line";
import { ServerSearch } from "./Servers/Search/Main";

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

const Title = styled.h2`
  @media (min-width: 750px) {
    padding-left: 8.33%;
  }
  @media (max-width: 750px) {
    padding-left: 4%;
  }
  margin: 0;
  padding-top: 1rem;
  height: 2.5rem;
  background-color: #1e2132;
  margin-bottom: 2.2rem;
`;

const Description = styled.p`
  white-space: pre-line;
`;

function Home(): React.ReactElement {
  const { t, i18n } = useTranslation();
  let i = 0;

  const ourSolutions = [];
  while (i18n.exists(`home.ourSolutions.${i}`)) {
    ourSolutions.push({
      header: t(`home.ourSolutions.${i}.header`),
      link: t(`home.ourSolutions.${i}.link`),
      url: t(`home.ourSolutions.${i}.url`),
      description: t(`home.ourSolutions.${i}.description`),
    });
    i += 1;
  }

  i = 0;
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

  return (
    <div>
      <Image>
        <Blur>
          <Welcome>
            <WelcomeText>{t("playerSearch.description")}</WelcomeText>
          </Welcome>
        </Blur>
      </Image>
      <Container>
        <ServerSearch />
        <h2 style={{ margin: "24px 0 24px 24px" }}>
          {t("home.graphs.header")}
        </h2>
        <TotalGraphQuery />
        <h2 style={{ margin: "24px 0 24px 24px" }}>
          {t("home.ourSolutions.header")}
        </h2>
        <AlignT>
          {ourSolutions.map((key, index) => {
            return (
              <Box key={index} align="flex-start">
                <h3>{key.header}</h3>
                <Description>{key.description}</Description>
                <br></br>
                <ButtonLink target="_blank" href={key.url}>
                  {key.link}
                </ButtonLink>
              </Box>
            );
          })}
        </AlignT>
        <h2 style={{ margin: "24px 0 24px 24px" }}>
          {t("home.ourFriends.header")}
        </h2>
        <AlignT>
          {ourFriends.map((key, index) => {
            return (
              <Box key={index} align="flex-start">
                <h3>{key.header}</h3>
                <Description>{key.description}</Description>
                <br></br>
                <ButtonLink target="_blank" href={key.url}>
                  {key.link}
                </ButtonLink>
              </Box>
            );
          })}
        </AlignT>
      </Container>
    </div>
  );
}

export default Home;
