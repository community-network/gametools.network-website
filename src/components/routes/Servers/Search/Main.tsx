import * as React from "react";
import "../../../../locales/config";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../../../assets/scss/App.scss";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import { useQuery } from "@tanstack/react-query";
import {
  AltText,
  SearchBox,
  Container,
  BigSelectSecondary,
  SelectPrimary,
  Align,
  Bf2042SearchBox,
  Bf2042BigSelectSecondary,
  Alignbf2042Search,
  BackButton,
  SmallSearchBox,
  Box,
  InputItem,
  BigButtonSecondaryBox,
} from "../../../Materials";
import { getLanguage } from "../../../../locales/config";
import {
  frostbite3,
  frostbiteJoinGames,
  noCrossplayFrostbite3,
  oldJoinGames,
  supportedGames,
} from "../../../../api/static";
import { Results } from "./Results";

const AltDescription = styled.p`
  ${AltText}
  margin-left: 24px;
`;

const Title = styled.h2`
  margin-top: 2rem;
`;

const ServerPageColumn = styled.div`
  @media screen and (min-width: 1000px) {
    display: flex;
    flex-flow: no-wrap;
    align-items: flex-start;
  }
`;

const ServerPageRow = styled.div`
  @media screen and (min-width: 1300px) {
    flex: 0;
    min-width: 922px;
  }
  @media screen and (max-width: 1300px) {
    flex: 100%;
  }
`;

function Main(): React.ReactElement {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [gameName, setGameName] = React.useState<string>("bf2042");
  const [region, setRegion] = React.useState<string>("all");
  const [platform, setPlatform] = React.useState<string>("pc");
  const [limit, setLimit] = React.useState<string>("10");
  const [searchType, setSearchType] = React.useState<string>("experiencename");
  const [sortType, setSortType] = React.useState<string>("-prefix");
  const history = useNavigate();
  // get info from query ?search &game
  const query = new URLSearchParams(useLocation().search);
  const nameQuery = query.get("search");
  const gameQuery = query.get("game");
  const regionQuery = query.get("region");
  const platformQuery = query.get("platform");
  const limitQuery = query.get("limit");
  const typeQuery = query.get("searchtype");
  React.useState(() => {
    if (nameQuery !== null) {
      setSearchTerm(nameQuery);
    }
    if (gameQuery !== null) {
      setGameName(gameQuery);
    }
    if (regionQuery !== null) {
      setRegion(regionQuery);
    }
    if (platformQuery !== null) {
      setPlatform(platformQuery);
    }
    if (limitQuery !== null) {
      setLimit(limitQuery);
    }
    if (searchType !== null) {
      setSearchType(typeQuery);
    }
  });

  // change top to query
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.append("search", searchTerm);
    } else {
      params.delete("search");
    }
    if (gameName) {
      params.append("game", gameName);
    } else {
      params.delete("game");
    }
    if (region) {
      params.append("region", region);
    } else {
      params.delete("region");
    }
    if (platform) {
      params.append("platform", platform);
    } else {
      params.delete("platform");
    }
    if (limit) {
      params.append("limit", limit);
    } else {
      params.delete("limit");
    }
    if (searchType) {
      params.append("searchtype", searchType);
    } else {
      params.delete("searchtype");
    }
    history({ search: params.toString() });
  }, [searchTerm, gameName, region, platform, limit, searchType, history]);

  const { t } = useTranslation();
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery(
    [
      "servers" +
        gameName +
        searchTerm +
        searchType +
        region +
        platform +
        limit,
    ],
    () =>
      GametoolsApi.serverSearch({
        game: gameName,
        searchTerm: searchTerm,
        lang: getLanguage(),
        searchType: searchType,
        region: region,
        platform: platform,
        limit: limit,
      }),
  );
  return (
    <Container>
      <BackButton text={t("serverSearch.back")} location="/" />
      <Align>
        <h2>{t("serverSearch.serverInfo")}</h2>
        <AltDescription>{t("serverSearch.description")}</AltDescription>
      </Align>
      <Align>
        {gameName === "bf2042" ? (
          <Alignbf2042Search>
            <Bf2042SearchBox
              placeholder={t(`serverSearch.searchPlaceholder.${searchType}`)}
              value={searchTerm}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                setSearchTerm(ev.target.value)
              }
            />
            <Bf2042BigSelectSecondary
              value={searchType}
              onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
                setSearchType(ev.target.value)
              }
            >
              <option value="servername">{t("serverSearch.type.name")}</option>
              <option value="experiencename">
                {t("serverSearch.type.playground")}
              </option>
            </Bf2042BigSelectSecondary>
          </Alignbf2042Search>
        ) : (
          <SearchBox
            placeholder={t(`serverSearch.searchPlaceholder.${searchType}`)}
            value={searchTerm}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setSearchTerm(ev.target.value)
            }
          />
        )}
        <BigSelectSecondary
          value={gameName}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
            setGameName(ev.target.value)
          }
        >
          {supportedGames.map((value, index) => {
            return (
              <option key={index} value={value}>
                {t(`games.${value}`)}
              </option>
            );
          })}
        </BigSelectSecondary>
        <BigSelectSecondary
          disabled={!frostbite3.includes(gameName)}
          value={region}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
            setRegion(ev.target.value)
          }
        >
          {Object.keys(t("regions", { returnObjects: true })).map(
            (key, index) => {
              return (
                <option key={index} value={key}>
                  {t(`regions.${key}`)}
                </option>
              );
            },
          )}
        </BigSelectSecondary>
        <BigSelectSecondary
          disabled={!frostbite3.includes(gameName)}
          value={limit}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
            setLimit(ev.target.value)
          }
        >
          {Object.keys(t("limit", { returnObjects: true })).map(
            (key, index) => {
              return (
                <option key={index} value={key}>
                  {t(`limit.${key}`)}
                </option>
              );
            },
          )}
        </BigSelectSecondary>
        <BigSelectSecondary
          disabled={!noCrossplayFrostbite3.includes(gameName)}
          value={platform}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
            setPlatform(ev.target.value)
          }
        >
          <option value="pc">{t("platforms.pc")}</option>
          <option value="ps4">{t("platforms.ps4")}</option>
          <option value="xboxone">{t("platforms.xboxone")}</option>
        </BigSelectSecondary>
        {/* <BigButtonSecondary type="submit">{t("serverSearch.search")} <RightArrow/></BigButtonSecondary> */}
      </Align>
      {oldJoinGames.includes(gameName) ||
      frostbiteJoinGames.includes(gameName) ? (
        <p style={{ margin: 0 }}>
          <Trans i18nKey="servers.joinme.info">
            <a href="https://joinme.click/download">
              https://joinme.click/download
            </a>
          </Trans>
        </p>
      ) : (
        <></>
      )}
      <Align>
        <Title>{t("serverSearch.results")}</Title>
        <SelectPrimary
          style={{ marginLeft: "1rem", marginTop: "2.2rem" }}
          value={sortType}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
            setSortType(ev.target.value)
          }
        >
          <option value="prefix">{t("servers.sort.serverName")}</option>
          <option value="-playerAmount">
            {t("servers.sort.playerAmount")}
          </option>
          <option value="-maxPlayers">{t("servers.sort.maxPlayers")}</option>
        </SelectPrimary>
      </Align>
      <Results
        game={gameName}
        loading={loading}
        stats={stats}
        error={error}
        sortType={sortType}
      />
    </Container>
  );
}

export function ServerSearch(): React.ReactElement {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [gameName, setGameName] = React.useState<string>("bf2042");
  const [region, setRegion] = React.useState<string>("all");
  const [platform, setPlatform] = React.useState<string>("pc");

  const { t } = useTranslation();
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery(
    [
      "servers" +
        gameName +
        searchTerm +
        "servername" +
        region +
        platform +
        "4",
    ],
    () =>
      GametoolsApi.serverSearch({
        game: gameName,
        searchTerm: searchTerm,
        lang: getLanguage(),
        searchType: "servername",
        region: region,
        platform: platform,
        limit: "4",
      }),
  );
  return (
    <>
      <Align style={{ marginTop: "1.1rem" }}>
        <h2 style={{ marginTop: 0, marginBottom: "1.2rem" }}>
          {t("serverSearch.servers")}
        </h2>
        <SelectPrimary
          style={{ marginLeft: "1rem" }}
          value={gameName}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void => {
            setGameName(ev.target.value);
            setPlatform("pc");
            setRegion("all");
          }}
        >
          {supportedGames.map((value, index) => {
            return (
              <option key={index} value={value}>
                {t(`games.${value}`)}
              </option>
            );
          })}
        </SelectPrimary>
        <SmallSearchBox
          style={{ marginLeft: "1rem" }}
          placeholder={t(`serverSearch.searchPlaceholder.servername`)}
          value={searchTerm}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
            setSearchTerm(ev.target.value)
          }
        />
      </Align>
      <ServerPageColumn>
        <ServerPageRow>
          <Results
            game={gameName}
            loading={loading}
            stats={stats}
            error={error}
            sortType={"-prefix"}
            spacingStyle={{ maxWidth: "99rem" }}
          />
          <Link
            to={`/servers?${new URLSearchParams({
              search: searchTerm,
              game: gameName,
              region: region,
              platform: platform,
              limit: 10,
            }).toString()}`}
          >
            <BigButtonSecondaryBox>
              {t("serverSearch.showMore")}
            </BigButtonSecondaryBox>
          </Link>
        </ServerPageRow>
        <div>
          <Box style={{ width: "240px" }}>
            <h2 style={{ marginBottom: "0.4rem" }}>Platform</h2>
            <InputItem
              item={"pc"}
              currrentItem={platform}
              callback={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setPlatform(e.target.value)}
              name={
                gameName == "bf2042" ? t("platforms.all") : t("platforms.pc")
              }
            />
            <InputItem
              item={"ps4"}
              currrentItem={platform}
              callback={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setPlatform(e.target.value)}
              name={t("platforms.ps4")}
              disabled={!noCrossplayFrostbite3.includes(gameName)}
            />
            <InputItem
              item={"xboxone"}
              currrentItem={platform}
              callback={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setPlatform(e.target.value)}
              name={t("platforms.xboxone")}
              disabled={!noCrossplayFrostbite3.includes(gameName)}
            />
            <h2 style={{ marginBottom: "0.4rem" }}>Region</h2>
            <>
              {Object.keys(t("regions", { returnObjects: true })).map(
                (key, index) => {
                  return (
                    <InputItem
                      key={index}
                      item={key}
                      currrentItem={region}
                      callback={(e: {
                        target: { value: React.SetStateAction<string> };
                      }) => setRegion(e.target.value)}
                      name={t(`regions.${key}`)}
                      disabled={!frostbite3.includes(gameName)}
                    />
                  );
                },
              )}
            </>
          </Box>
        </div>
      </ServerPageColumn>
    </>
  );
}

export default Main;
