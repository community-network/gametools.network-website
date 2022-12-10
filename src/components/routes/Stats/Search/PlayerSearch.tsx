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
  const [platform, setPlatform] = React.useState<string>("pc");
  return (
    <form>
      <AlignMain>
        <AlignSearch>
          <HomePlayerSearchBox
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
                  {t(`platforms.${key}`)}
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
      <Graphs />
    </Container>
  );
}

function Search(): React.ReactElement {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [platform, setPlatform] = React.useState<string>("pc");
  const [game, setGame] = React.useState<string>("bf1");
  return (
    <>
      <BackButton text={t("playerSearch.back")} location="/" />
      <Align>
        <h2>{t("playerSearch.bfStats")}</h2>
        <AltDescription>{t("playerSearch.description")}</AltDescription>
      </Align>
      <Align>
        <form>
          <SearchBox
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
                  {t(`platforms.${key}`)}
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
