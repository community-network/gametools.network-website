import * as React from "react";
import { Link } from "react-router-dom";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../../../assets/scss/App.scss";
import { useQuery } from "@tanstack/react-query";
import { FeslApi } from "../../../../api/FeslApi";
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

const DropDown = styled.div`
  position: absolute;
  top: 56px;
  left: -20px;
  border-radius: 8px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background: #1e2028;
  z-index: 5;
`;

const List = styled.ul`
  list-style: none;
  padding: 3px 0px;
  margin: 0;
`;

const Item = styled.li`
  padding: 4px 18px;
  font-family: Manrope;
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  color: var(--color-alt-text);
  :hover {
    color: var(--color-text);
    background-color: rgba(0, 0, 0, 0.14);
    cursor: pointer;
  }
`;

export function DropDownAutocomplete({
  callback,
  searchTerm,
  platform,
  style,
  searchBoxRef,
}: {
  callback?: (arg0: string) => void;
  searchTerm: string;
  platform: string;
  style?: React.CSSProperties;
  searchBoxRef: React.MutableRefObject<HTMLInputElement>;
}): React.ReactElement {
  const [open, setOpen] = React.useState(false);

  const container: React.MutableRefObject<HTMLDivElement> = React.useRef();

  React.useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (container.current && !container.current.contains(event.target)) {
        setOpen(false);
      }

      if (searchBoxRef.current && searchBoxRef.current.contains(event.target)) {
        setOpen(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return function cleanup() {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  let autocomplete: string[] = [];
  const {
    isLoading: isLoading,
    isError: isError,
    data: autocompleteResult,
  } = useQuery(["autocomplete" + platform + searchTerm], () => {
    setOpen(true);
    return FeslApi.playerSearch({
      platform: platform,
      name: searchTerm,
    });
  });

  if (!isError && !isLoading) {
    if (autocompleteResult.results) {
      if (
        !(
          autocompleteResult.results.length == 1 &&
          autocompleteResult.results[0].name === searchTerm
        )
      ) {
        autocomplete = autocompleteResult.results.map((user) => {
          return user.name;
        });
      }
    }
  }

  return (
    <DropDown ref={container} style={style}>
      {open && (
        <List>
          {autocomplete.map((userName, index) => {
            return (
              <Item
                key={index}
                onClick={() => {
                  setOpen(false);
                  return callback(userName);
                }}
              >
                {userName}
              </Item>
            );
          })}
        </List>
      )}
    </DropDown>
  );
}

export function StatSearch(): React.ReactElement {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [platform, setPlatform] = React.useState<string>("pc");
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
          <DropDownAutocomplete
            searchTerm={searchTerm}
            platform={platform}
            searchBoxRef={searchBox}
            callback={(val) => {
              setSearchTerm(val);
            }}
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
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [platform, setPlatform] = React.useState<string>("pc");
  const [game, setGame] = React.useState<string>("bf1");
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
          <DropDownAutocomplete
            searchTerm={searchTerm}
            platform={platform}
            searchBoxRef={searchBox}
            callback={(val) => {
              setSearchTerm(val);
            }}
            style={{ left: "10px" }}
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
