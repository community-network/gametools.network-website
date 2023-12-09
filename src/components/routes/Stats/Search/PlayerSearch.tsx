import * as React from "react";
import { Link } from "react-router-dom";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../../../assets/scss/App.scss";
import {
  AltText,
  SearchBox,
  BigButtonSecondary,
  RightArrow,
  Container,
  BigSelectSecondary,
  Align,
  BackButton,
  HomePlayerSearchBox,
  HomePlayerBigSelectSecondary,
  AlignW,
  AlignT,
  BigButtonPrimary,
} from "../../../Materials";
import { platformGames, statsPlatforms } from "../../../../api/static";
import { Graphs } from "./Graphs";
import ErrorBoundary from "../../../functions/ErrorBoundary";
import { useLocalStorage } from "react-use";

export const AltDescription = styled.p`
  ${AltText}
  margin-left: 24px;
`;

const AlignMain = styled(AlignT)`
  @media screen and (min-width: 1000px) {
    flex-wrap: nowrap;
  }
`;

const AlignSearch = styled(AlignW)`
  @media screen and (max-width: 530px) {
    width: 100%;
  }
`;

const StatsLink = styled(Link)`
  @media screen and (max-width: 530px) {
    width: 100%;
    margin-right: 15px;
  }
`;

export function StatSearch(): React.ReactElement {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [platform, setPlatform] = useLocalStorage<string>(
    "statSearch_platform",
    "pc",
  );
  const searchBox: React.MutableRefObject<HTMLInputElement> = React.useRef();

  return (
    <form
      style={{
        position: "relative",
      }}
    >
      <AlignMain>
        <AlignSearch>
          <HomePlayerSearchBox
            ref={searchBox}
            placeholder={t("playerSearch.searchPlaceholder")}
            value={searchTerm}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setSearchTerm(ev.target.value)
            }
          />
          <HomePlayerBigSelectSecondary
            value={platform}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
              setPlatform(ev.target.value)
            }
          >
            {statsPlatforms.map((key, index) => {
              return (
                <option key={index} value={key}>
                  {t(`statPlatforms.${key}`)}
                </option>
              );
            })}
          </HomePlayerBigSelectSecondary>
        </AlignSearch>
        {searchTerm !== "" ? (
          <StatsLink
            to={`/stats/${platform}/name/${encodeURIComponent(searchTerm)}`}
          >
            <BigButtonPrimary type="submit">
              {t("playerSearch.search")} <RightArrow />
            </BigButtonPrimary>
          </StatsLink>
        ) : (
          // if no name is filled in
          <BigButtonPrimary type="submit">
            {t("playerSearch.search")} <RightArrow />
          </BigButtonPrimary>
        )}
      </AlignMain>
    </form>
  );
}

function Main(): React.ReactElement {
  return (
    <Container>
      <Search />
      <ErrorBoundary>
        <Graphs />
      </ErrorBoundary>
    </Container>
  );
}

function Search(): React.ReactElement {
  const { t } = useTranslation();
  document.title = `${t("siteFullName")} | ${t("playerSearch.bfStats")}`;
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [platform, setPlatform] = useLocalStorage<string>(
    "statSearch_platform",
    "pc",
  );
  const [game, setGame] = useLocalStorage<string>("stats_game", "bf1");
  const searchBox: React.MutableRefObject<HTMLInputElement> = React.useRef();
  return (
    <>
      <BackButton text={t("playerSearch.back")} location="/" />
      <Align>
        <h2>{t("playerSearch.bfStats")}</h2>
        <AltDescription>{t("playerSearch.description")}</AltDescription>
      </Align>
      <Align>
        <form style={{ position: "relative" }}>
          <SearchBox
            ref={searchBox}
            placeholder={t("playerSearch.searchPlaceholder")}
            value={searchTerm}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setSearchTerm(ev.target.value)
            }
          />
          <BigSelectSecondary
            value={platform}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
              setPlatform(ev.target.value)
            }
          >
            {statsPlatforms.map((key, index) => {
              return (
                <option key={index} value={key}>
                  {t(`statPlatforms.${key}`)}
                </option>
              );
            })}
          </BigSelectSecondary>
          <BigSelectSecondary
            value={game}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
              setGame(ev.target.value)
            }
          >
            {platformGames[platform].map((key: string, index: number) => {
              return (
                <option key={index} value={key}>
                  {t(`games.${key}`)}
                </option>
              );
            })}
          </BigSelectSecondary>
          {searchTerm !== "" ? (
            <Link
              to={`/stats/${platform}/name/${encodeURIComponent(
                searchTerm,
              )}?game=${game}`}
            >
              <BigButtonSecondary type="submit">
                {t("playerSearch.search")} <RightArrow />
              </BigButtonSecondary>
            </Link>
          ) : (
            // if no name is filled in
            <BigButtonSecondary type="submit">
              {t("playerSearch.search")} <RightArrow />
            </BigButtonSecondary>
          )}
        </form>
      </Align>
    </>
  );
}

export default Main;
