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
  extraGames,
  frostbite3,
  frostbiteJoinGames,
  newGen,
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

const ServerPageFilters = styled.div`
  @media screen and (max-width: 1000px) {
    display: flex;
  }
`;

const ServerPageFilterRow = styled.div`
  min-width: 8rem;
  margin-right: 1rem;
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
  const [platform, setPlatform] = React.useState<string>("allPlatforms");
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
  const regionKey = gameName === "battlebit" ? "battlebitRegions" : "regions";
  React.useState(() => {
    nameQuery !== null ? setSearchTerm(nameQuery) : null;
    gameQuery !== null ? setGameName(gameQuery) : null;
    regionQuery !== null ? setRegion(regionQuery) : null;
    platformQuery !== null ? setPlatform(platformQuery) : null;
    limitQuery !== null ? setLimit(limitQuery) : null;
    typeQuery !== null ? setSearchType(typeQuery) : null;
  });

  // change top to query
  React.useEffect(() => {
    const params = new URLSearchParams();
    searchTerm ? params.append("search", searchTerm) : params.delete("search");
    gameName ? params.append("game", gameName) : params.delete("game");
    region ? params.append("region", region) : params.delete("region");
    platform ? params.append("platform", platform) : params.delete("platform");
    limit ? params.append("limit", limit) : params.delete("limit");
    searchType
      ? params.append("searchtype", searchType)
      : params.delete("searchtype");
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
          disabled={
            !frostbite3.includes(gameName) && !extraGames.includes(gameName)
          }
          value={region}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
            setRegion(ev.target.value)
          }
        >
          {Object.keys(t(regionKey, { returnObjects: true })).map(
            (key, index) => {
              return (
                <option key={index} value={key}>
                  {t(`${regionKey}.${key}`)}
                </option>
              );
            },
          )}
        </BigSelectSecondary>
        <BigSelectSecondary
          disabled={
            !frostbite3.includes(gameName) && !extraGames.includes(gameName)
          }
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
          disabled={!frostbite3.includes(gameName)}
          value={platform}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
            setPlatform(ev.target.value)
          }
        >
          {gameName == "bf2042" ? (
            <option value="allPlatforms">{t("platforms.all")}</option>
          ) : (
            <></>
          )}
          <option value="pc">{t("platforms.pc")}</option>
          <option value="ps4">{t("platforms.ps4")}</option>
          <option value="xboxone">{t("platforms.xboxone")}</option>
          {gameName == "bf2042" ? (
            <>
              <option value="ps5">{t("platforms.ps5")}</option>
              <option value="xboxseries">{t("platforms.xboxseries")}</option>
            </>
          ) : (
            <></>
          )}
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

const AlignHomeServers = styled(Align)`
  margin-top: 1.1rem;
  @media screen and (max-width: 530px) {
    width: 100%;
  }
`;

export function ServerSearch(): React.ReactElement {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [gameName, setGameName] = React.useState<string>("bf2042");
  const [region, setRegion] = React.useState<string>("all");
  const [platform, setPlatform] = React.useState<string>("allPlatforms");
  const regionKey = gameName === "battlebit" ? "battlebitRegions" : "regions";

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
      <AlignHomeServers>
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
          style={{ marginLeft: "1rem", width: "16rem" }}
          placeholder={t(`serverSearch.searchPlaceholder.servername`)}
          value={searchTerm}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
            setSearchTerm(ev.target.value)
          }
        />
        {oldJoinGames.includes(gameName) ||
        frostbiteJoinGames.includes(gameName) ? (
          <p style={{ marginTop: 0, marginBottom: "1.1rem" }}>
            <Trans i18nKey="servers.joinme.smallinfo">
              <a href="https://joinme.click/download">
                https://joinme.click/download
              </a>
            </Trans>
          </p>
        ) : (
          <></>
        )}
      </AlignHomeServers>
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
        </ServerPageRow>
        <Box
          style={{ minWidth: "240px", maxWidth: "20rem" }}
          innerStyle={{ maxHeight: "510px" }}
        >
          <ServerPageFilters>
            <ServerPageFilterRow>
              <h2 style={{ marginBottom: "0.4rem" }}>
                {t("serverSearch.platform")}
              </h2>
              <InputItem
                item={"allPlatforms"}
                currrentItem={platform}
                callback={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setPlatform(e.target.value)}
                name={t("platforms.all")}
                disabled={!newGen.includes(gameName)}
              />
              <InputItem
                item={"pc"}
                currrentItem={platform}
                callback={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setPlatform(e.target.value)}
                name={t("platforms.pc")}
              />
              <InputItem
                item={"ps4"}
                currrentItem={platform}
                callback={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setPlatform(e.target.value)}
                name={t("platforms.ps4")}
                disabled={!frostbite3.includes(gameName)}
              />
              <InputItem
                item={"xboxone"}
                currrentItem={platform}
                callback={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setPlatform(e.target.value)}
                name={t("platforms.xboxone")}
                disabled={!frostbite3.includes(gameName)}
              />
              <InputItem
                item={"ps5"}
                currrentItem={platform}
                callback={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setPlatform(e.target.value)}
                name={t("platforms.ps5")}
                disabled={!newGen.includes(gameName)}
              />
              <InputItem
                item={"xboxseries"}
                currrentItem={platform}
                callback={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setPlatform(e.target.value)}
                name={t("platforms.xboxseries")}
                disabled={!newGen.includes(gameName)}
              />
            </ServerPageFilterRow>
            <ServerPageFilterRow>
              <h2 style={{ marginBottom: "0.4rem" }}>
                {t("serverSearch.region")}
              </h2>
              <>
                {Object.keys(t(regionKey, { returnObjects: true })).map(
                  (key, index) => {
                    return (
                      <InputItem
                        key={index}
                        item={key}
                        currrentItem={region}
                        callback={(e: {
                          target: { value: React.SetStateAction<string> };
                        }) => setRegion(e.target.value)}
                        name={t(`${regionKey}.${key}`)}
                        disabled={
                          !frostbite3.includes(gameName) &&
                          !extraGames.includes(gameName)
                        }
                      />
                    );
                  },
                )}
              </>
            </ServerPageFilterRow>
          </ServerPageFilters>
        </Box>
      </ServerPageColumn>
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
    </>
  );
}

export default Main;
