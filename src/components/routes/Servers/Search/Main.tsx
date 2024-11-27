import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BF2042Player, GametoolsApi } from "../../../../api/GametoolsApi";
import {
  dice,
  extraGames,
  frostbite3,
  frostbiteJoinGames,
  newGen,
  newTitles,
  oldJoinGames,
  projects,
  supportedGames,
} from "../../../../api/static";
import "../../../../assets/scss/App.scss";
import "../../../../locales/config";
import { getLanguage } from "../../../../locales/config";
import { BackButton, Box, CheckItem, InputItem } from "../../../Materials";
import * as styles from "./Main.module.scss";
import { Results } from "./Results";

function DropdownArrow(props: {
  item: string;
  dropdownOpen: {
    [string: string]: boolean;
  };
  setDropdownOpen: React.Dispatch<
    React.SetStateAction<{
      [string: string]: boolean;
    }>
  >;
}) {
  const { item, dropdownOpen, setDropdownOpen } = props;
  return (
    <i
      className={styles.arrow}
      onClick={() => {
        const current = { ...dropdownOpen };
        current[item] = !current[item];
        setDropdownOpen(current);
      }}
      style={{
        transform: dropdownOpen[item] ? "rotate(-135deg)" : "rotate(45deg)",
        webkitTransform: dropdownOpen[item]
          ? "rotate(-135deg)"
          : "rotate(45deg)",
        marginBottom: dropdownOpen[item] ? "0" : "2.44px",
      }}
    />
  );
}

function ServerSort(props: {
  sortType: string;
  setSortType: (arg0: string) => void;
}) {
  const { t } = useTranslation();
  return (
    <select
      aria-label={t("ariaLabels.sort")}
      className="selectPrimary"
      style={{
        marginLeft: "1rem",
        marginTop: "-0.1rem",
      }}
      value={props.sortType}
      onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
        props.setSortType(ev.target.value)
      }
    >
      <option value="prefix">{t("servers.sort.serverName")}</option>
      <option value="-playerAmount">{t("servers.sort.playerAmount")}</option>
      <option value="-maxPlayers">{t("servers.sort.maxPlayers")}</option>
    </select>
  );
}

function ServerOwnerSearch(props: {
  ownerList: BF2042Player[];
  setOwnerList: React.Dispatch<React.SetStateAction<BF2042Player[]>>;
}): React.ReactElement {
  const { ownerList, setOwnerList } = props;
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const searchBox: React.MutableRefObject<HTMLInputElement> = React.useRef();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addItem();
    }
  };

  const addItem = () => {
    if (
      autocompleteResult?.results == undefined ||
      autocompleteResult?.results.length <= 0
    ) {
      return;
    }
    const firstResult = autocompleteResult?.results[0];
    if (
      !ownerList.some(
        (el) =>
          el?.personaId === firstResult?.personaId &&
          el?.platform === firstResult?.platform,
      )
    ) {
      setOwnerList((old) => [...old, firstResult]);
    }
    setSearchTerm("");
  };

  const removeItem = (item: BF2042Player) => {
    setOwnerList((old) =>
      old.filter(
        (el) =>
          el?.personaId !== item?.personaId || el?.platform !== item?.platform,
      ),
    );
  };

  const { data: autocompleteResult } = useQuery({
    queryKey: ["serverOwner" + searchTerm],
    queryFn: () =>
      GametoolsApi.bf2042PlayerSearch({
        name: searchTerm,
      }),
  });

  return (
    <>
      <div className="align">
        <input
          className="smallSearchBox"
          ref={searchBox}
          placeholder={t(`serverSearch.serverOwner.main`)}
          value={searchTerm}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
            setSearchTerm(ev.target.value)
          }
          style={{ marginRight: "10px", marginLeft: "-10px", marginBottom: 0 }}
          onKeyDown={handleKeyDown}
        />
        {/* <DropDownAutocomplete
          autocompleteResult={autocompleteResult}
          searchTerm={searchTerm}
          searchBoxRef={searchBox}
          callback={(val) => {
            setSearchTerm(val);
          }}
          style={{ position: "relative" }}
        /> */}
        <button
          className="smallButtonSecondary"
          style={{ marginRight: ".5rem", marginBottom: 0 }}
          onClick={addItem}
        >
          {t("serverSearch.serverOwner.add")}
        </button>
      </div>
      {ownerList.map((value, index) => {
        return (
          <p
            key={index}
            style={{
              marginTop: "8px",
              marginLeft: "2px",
              marginBottom: "0px",
            }}
          >
            <b className={styles.removeIcon} onClick={() => removeItem(value)}>
              &#10006;
            </b>
            {value?.name}
          </p>
        );
      })}
    </>
  );
}

function Main(): React.ReactElement {
  const [width, setWidth] = React.useState<number>(window.innerWidth);
  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [gameName, setGameNameItem] = useLocalStorage<string>(
    "serverSearch_game",
    "bf2042",
  );
  const [platform, setPlatform] = useLocalStorage<string>(
    "serverSearch_platform",
    "allPlatforms",
  );
  const [limit, setLimit] = useLocalStorage<string>("serverSearch_limit", "10");
  const [searchType, setSearchType] = React.useState<string>("experiencename");
  const [sortType, setSortType] = React.useState<string>("-prefix");
  const [dropdownOpen, setDropdownOpen] = React.useState<{
    [string: string]: boolean;
  }>({});
  const [hideSideBar, setHideSidebar] = useLocalStorage<boolean>(
    "serverSearch_hideSidebar",
    false,
  );

  const [regionFilter, setRegionFilter] = React.useState<string[]>(["all"]);
  const [serverTypeFilter, setServerTypeFilter] = React.useState<string[]>([]);
  const [gamemodeFilter, setGamemodeFilter] = React.useState<string[]>([]);
  const [mapFilter, setMapFilter] = React.useState<string[]>([]);
  const [playerFilter, setPlayerFilter] = React.useState<string[]>([]);
  const [isPasswordProtected, setIsPasswordProtected] =
    React.useState<string>("");
  const [bf2042OwnerList, setbf2042OwnerList] = React.useState<BF2042Player[]>(
    [],
  );
  function setGameName(newGame: string) {
    // reset other filters when changing gamename
    setGamemodeFilter([]);
    setPlayerFilter([]);
    setMapFilter([]);
    setServerTypeFilter([]);
    setRegionFilter([]);
    setIsPasswordProtected("");
    setbf2042OwnerList([]);

    setGameNameItem(newGame);
  }

  const history = useNavigate();
  // get info from query ?search &game
  const query = new URLSearchParams(useLocation().search);
  const nameQuery = query.get("search");
  const gameQuery = query.get("game");
  const regionQuery = query.get("region");
  const platformQuery = query.get("platform");
  const limitQuery = query.get("limit");
  const typeQuery = query.get("searchtype");
  const gamemodeQuery = query.get("gamemode");
  const serverTypeQuery = query.get("server_type");
  const mapQuery = query.get("map");
  const playerFilterQuery = query.get("player_filter");
  const isPasswordProtectedQuery = query.get("is_password_protected");
  const bf2042OwnerListQuery = query.get("bf2042_owner_list");
  const regionKey = gameName === "battlebit" ? "battlebitRegions" : "regions";
  React.useState(() => {
    nameQuery !== null ? setSearchTerm(nameQuery) : null;
    gameQuery !== null ? setGameName(gameQuery) : null;
    regionQuery !== null ? setRegionFilter(regionQuery.split(",")) : null;
    gamemodeQuery !== null ? setGamemodeFilter(gamemodeQuery.split(",")) : null;
    serverTypeQuery !== null ? setServerTypeFilter(serverTypeQuery.split(",")) : null;
    playerFilterQuery !== null
      ? setPlayerFilter(playerFilterQuery.split(","))
      : null;
    mapQuery !== null ? setMapFilter(mapQuery.split(",")) : null;
    isPasswordProtectedQuery !== null
      ? setIsPasswordProtected(isPasswordProtectedQuery)
      : null;
    bf2042OwnerListQuery !== null
      ? setbf2042OwnerList(JSON.parse(bf2042OwnerListQuery))
      : null;
    platformQuery !== null ? setPlatform(platformQuery) : null;
    limitQuery !== null ? setLimit(limitQuery) : null;
    typeQuery !== null ? setSearchType(typeQuery) : null;
  });

  // change top to query
  React.useEffect(() => {
    const params = new URLSearchParams();
    searchTerm.length > 0
      ? params.append("search", searchTerm)
      : params.delete("search");
    gameName.length > 0
      ? params.append("game", gameName)
      : params.delete("game");
    isPasswordProtected != ""
      ? params.append("is_password_protected", isPasswordProtected.toString())
      : params.delete("is_password_protected");
    regionFilter.length > 0
      ? params.append("region", regionFilter.join(","))
      : params.delete("region");
    gamemodeFilter.length > 0
      ? params.append("gamemode", gamemodeFilter.join(","))
      : params.delete("gamemode");
    mapFilter.length > 0
      ? params.append("map", mapFilter.join(","))
      : params.delete("map");
    playerFilter.length > 0
      ? params.append("player_filter", playerFilter.join(","))
      : params.delete("player_filter");
    serverTypeFilter.length > 0
      ? params.append("server_type", serverTypeFilter.join(","))
      : params.delete("server_type");
    bf2042OwnerList.length > 0
      ? params.append("bf2042_owner_list", JSON.stringify(bf2042OwnerList))
      : params.delete("bf2042_owner_list");
    platform.length > 0
      ? params.append("platform", platform)
      : params.delete("platform");
    limit.length > 0 ? params.append("limit", limit) : params.delete("limit");
    searchType.length > 0
      ? params.append("searchtype", searchType)
      : params.delete("searchtype");
    history({ search: params.toString() }, { replace: true });
  }, [
    searchTerm,
    gameName,
    regionFilter,
    gamemodeFilter,
    mapFilter,
    isPasswordProtected,
    playerFilter,
    serverTypeFilter,
    bf2042OwnerList,
    platform,
    limit,
    searchType,
    history,
  ]);

  React.useEffect(() => {
    if (
      regionFilter.length > 0 ||
      gamemodeFilter.length > 0 ||
      playerFilter.length > 0 ||
      serverTypeFilter.length > 0 ||
      mapFilter.length > 0 ||
      isPasswordProtected != "" ||
      bf2042OwnerList.length > 0
    ) {
      setHideSidebar(false);
    }
  }, []);

  const extraQueries = {};
  if (gamemodeFilter.length > 0) {
    if (gameName === "bf2042") {
      extraQueries["modes"] = gamemodeFilter.join(";");
    }
    extraQueries["gamemode_filters"] = gamemodeFilter.join(",");
  }
  if (playerFilter.length > 0) {
    extraQueries["player_filters"] = playerFilter.join(",");
  }
  if (serverTypeFilter.length > 0) {
    extraQueries["server_type_filters"] = serverTypeFilter.join(",");
  }
  if (mapFilter.length > 0) {
    if (gameName === "bf2042") {
      extraQueries["maps"] = mapFilter.join(";");
    }
    extraQueries["map_filters"] = mapFilter.join(",");
  }
  if (isPasswordProtected != "") {
    if (gameName === "bf2042") {
      extraQueries["has_password"] = isPasswordProtected === "true";
    }
    extraQueries["is_password_protected"] = isPasswordProtected === "true";
  }
  if (bf2042OwnerList.length > 0) {
    extraQueries["owners"] = JSON.stringify(
      bf2042OwnerList.map((val) => {
        return {
          personaid: val.personaId,
          nucleusid: val.nucleusId,
          platform: val.platform,
        };
      }),
    );
  }

  const backendType = frostbite3.includes(gameName)
    ? "frostbite3"
    : "battlelog";

  const { t } = useTranslation();
  document.title = `${t("siteFullName")} | ${t("serverSearch.serverInfo")}`;
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery({
    queryKey: [
      "servers" +
      gameName +
      searchTerm +
      searchType +
      regionFilter +
      platform +
      limit +
      JSON.stringify(extraQueries),
    ],
    queryFn: () =>
      GametoolsApi.serverSearch({
        game: gameName,
        searchTerm: searchTerm,
        lang: getLanguage(),
        regions: regionFilter.length <= 0 ? ["all"] : regionFilter,
        searchType: searchType,
        platform: platform,
        limit: limit,
        extraQueries,
      }),
  });
  return (
    <div className="container">
      <BackButton text={t("serverSearch.back")} location="/" />
      <div className="align">
        <h2>{t("serverSearch.serverInfo")}</h2>
        <p className={styles.altDescription}>{t("serverSearch.description")}</p>
      </div>
      <div className="align">
        {gameName === "bf2042" ? (
          <div className={styles.alignbf2042Search}>
            <input
              className="bf2042SearchBox"
              placeholder={t(`serverSearch.searchPlaceholder.${searchType}`)}
              value={searchTerm}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                setSearchTerm(ev.target.value)
              }
            />
            <select
              aria-label={t("ariaLabels.searchType")}
              className="bf2042BigSelectSecondary"
              value={searchType}
              onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
                setSearchType(ev.target.value)
              }
            >
              <option value="servername">{t("serverSearch.type.name")}</option>
              <option value="experiencename">
                {t("serverSearch.type.playground")}
              </option>
            </select>
          </div>
        ) : (
          <input
            className="searchBox"
            placeholder={t(`serverSearch.searchPlaceholder.${searchType}`)}
            value={searchTerm}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setSearchTerm(ev.target.value)
            }
          />
        )}
        <select
          aria-label={t("ariaLabels.game")}
          className="bigSelectSecondary"
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
        </select>
        <select
          aria-label={t("ariaLabels.game")}
          className="bigSelectSecondary"
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
        </select>
        <select
          aria-label={t("ariaLabels.platform")}
          className="bigSelectSecondary"
          disabled={!frostbite3.includes(gameName)}
          value={platform}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
            setPlatform(ev.target.value)
          }
        >
          {gameName == "bf2042" && (
            <option value="allPlatforms">{t("platforms.all")}</option>
          )}
          <option value="pc">{t("platforms.pc")}</option>
          <option value="ps4">{t("platforms.ps4")}</option>
          <option value="xboxone">{t("platforms.xboxone")}</option>
          {gameName == "bf2042" && (
            <>
              <option value="ps5">{t("platforms.ps5")}</option>
              <option value="xboxseries">{t("platforms.xboxseries")}</option>
            </>
          )}
        </select>
        {Object.keys(projects).includes(gameName) && (
          <a href={projects[gameName]} target="_blank" rel="noreferrer">
            <button className="bigButtonSecondaryBox">
              {t("serverSearch.showProject")}
            </button>
          </a>
        )}
        {/* <button className="bigButtonSecondary" type="submit">{t("serverSearch.search")} <RightArrow/></button> */}
      </div>
      {oldJoinGames.includes(gameName) ||
        (frostbiteJoinGames.includes(gameName) && (
          <p
            style={{
              marginTop: "-0.5rem",
              marginBottom: "0.7rem",
              marginLeft: "0.5rem",
            }}
          >
            <Trans i18nKey="servers.joinme.info">
              <a href="https://joinme.click/download">
                https://joinme.click/download
              </a>
            </Trans>
          </p>
        ))}
      <div className="align">
        <h2
          className={styles.title}
          style={{
            marginLeft: "0.5rem",
            marginTop: !newTitles.includes(gameName) ? "-0.4rem" : "0rem",
            marginBottom: !newTitles.includes(gameName) ? "0.8rem" : "1.2rem",
          }}
        >
          {t("serverSearch.results")}
        </h2>
        <ServerSort sortType={sortType} setSortType={setSortType} />
        {(dice.includes(gameName) || extraGames.includes(gameName)) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              marginLeft: "5px",
            }}
          >
            <label
              aria-label={t("ariaLabels.toggleSidebar")}
              className="switch"
            >
              <input
                checked={!hideSideBar}
                onClick={() => {
                  setHideSidebar(!hideSideBar);
                }}
                type="checkbox"
              />
              <span className="slider round"></span>
            </label>
            <p style={{ marginLeft: ".4rem", marginTop: "8px" }}>
              {t("serverSearch.showFilters")}
            </p>
          </div>
        )}
      </div>
      <div className={styles.serverPageColumn}>
        {(dice.includes(gameName) || extraGames.includes(gameName)) &&
          !hideSideBar && (
            <div>
              <Box
                style={{
                  minWidth: "240px",
                }}
                innerStyle={{ maxHeight: width >= 1000 ? "600px" : "300px" }}
              >
                <div className={styles.serverPageFilters}>
                  {frostbite3.includes(gameName) && gameName !== "bf2042" && (
                    <div className={styles.serverPageFilterRow}>
                      <h2 style={{ marginBottom: "0.4rem" }}>
                        {t("serverSearch.serverTypeFilter")}
                        <DropdownArrow
                          item={"serverTypeFilter"}
                          dropdownOpen={dropdownOpen}
                          setDropdownOpen={setDropdownOpen}
                        />
                      </h2>
                      {!dropdownOpen["serverTypeFilter"] &&
                        Object.keys(
                          t(`servers.${backendType}.serverTypeFilter`, {
                            returnObjects: true,
                          }),
                        ).map((key, index) => {
                          return (
                            <CheckItem
                              key={index}
                              item={key}
                              currrentItems={serverTypeFilter}
                              callback={(e: {
                                target: {
                                  checked: boolean;
                                  value: string;
                                };
                              }) => {
                                if (e.target.checked) {
                                  setServerTypeFilter((oldArray) => [
                                    ...oldArray,
                                    e.target.value,
                                  ]);
                                } else {
                                  setServerTypeFilter((oldArray) => [
                                    ...oldArray.filter(
                                      (item) => item !== e.target.value,
                                    ),
                                  ]);
                                }
                              }}
                              name={t(
                                `servers.${backendType}.serverTypeFilter.${key}`,
                              )}
                            />
                          );
                        })}
                    </div>
                  )}
                  {gameName !== "bf3" && gameName !== "bfh" && (
                    <div className={styles.serverPageFilterRow}>
                      <h2 style={{ marginBottom: "0.4rem" }}>
                        {t("serverSearch.region")}
                        <DropdownArrow
                          item={"region"}
                          dropdownOpen={dropdownOpen}
                          setDropdownOpen={setDropdownOpen}
                        />
                      </h2>
                      {!dropdownOpen["region"] &&
                        Object.keys(t(regionKey, { returnObjects: true })).map(
                          (key, index) => {
                            if (key === "all") {
                              return;
                            }
                            return (
                              <CheckItem
                                key={index}
                                item={key}
                                currrentItems={regionFilter}
                                callback={(e: {
                                  target: { value: string; checked: boolean };
                                }) => {
                                  if (e.target.checked) {
                                    let oldArray = [...regionFilter];
                                    if (regionFilter.includes("all")) {
                                      oldArray = [];
                                    }
                                    setRegionFilter([
                                      ...oldArray,
                                      e.target.value,
                                    ]);
                                  } else {
                                    setRegionFilter((oldArray) => [
                                      ...oldArray.filter(
                                        (item) => item !== e.target.value,
                                      ),
                                    ]);
                                  }
                                }}
                                name={t(`${regionKey}.${key}`)}
                              />
                            );
                          },
                        )}
                    </div>
                  )}
                  {gameName === "bf2042" && (
                    <div className={styles.serverPageFilterRow}>
                      <h2 style={{ marginBottom: "0.4rem" }}>
                        {t("serverSearch.serverOwner.main")}
                        <DropdownArrow
                          item={"serverOwner"}
                          dropdownOpen={dropdownOpen}
                          setDropdownOpen={setDropdownOpen}
                        />
                      </h2>
                      {!dropdownOpen["serverOwner"] && (
                        <ServerOwnerSearch
                          ownerList={bf2042OwnerList}
                          setOwnerList={setbf2042OwnerList}
                        />
                      )}
                    </div>
                  )}
                  {dice.includes(gameName) && gameName !== "bf2042" && (
                    <div className={styles.serverPageFilterRow}>
                      <h2 style={{ marginBottom: "0.4rem" }}>
                        {t("serverSearch.playerFilter")}
                        <DropdownArrow
                          item={"playerFilter"}
                          dropdownOpen={dropdownOpen}
                          setDropdownOpen={setDropdownOpen}
                        />
                      </h2>
                      {!dropdownOpen["playerFilter"] &&
                        Object.keys(
                          t(`servers.${backendType}.playerFilter`, {
                            returnObjects: true,
                          }),
                        ).map((key, index) => {
                          return (
                            <CheckItem
                              key={index}
                              item={key}
                              currrentItems={playerFilter}
                              callback={(e: {
                                target: {
                                  checked: boolean;
                                  value: string;
                                };
                              }) => {
                                if (e.target.checked) {
                                  setPlayerFilter((oldArray) => [
                                    ...oldArray,
                                    e.target.value,
                                  ]);
                                } else {
                                  setPlayerFilter((oldArray) => [
                                    ...oldArray.filter(
                                      (item) => item !== e.target.value,
                                    ),
                                  ]);
                                }
                              }}
                              name={t(
                                `servers.${backendType}.playerFilter.${key}`,
                              )}
                            />
                          );
                        })}
                    </div>
                  )}
                  {dice.includes(gameName) &&
                    gameName !== "bf4" &&
                    gameName !== "bfv" && (
                      <div className={styles.serverPageFilterRow}>
                        <h2 style={{ marginBottom: "0.4rem" }}>
                          {t("serverSearch.gamemode")}
                          <DropdownArrow
                            item={"gamemode"}
                            dropdownOpen={dropdownOpen}
                            setDropdownOpen={setDropdownOpen}
                          />
                        </h2>
                        {!dropdownOpen["gamemode"] &&
                          Object.keys(
                            t(`servers.${gameName}.gamemodes`, {
                              returnObjects: true,
                            }),
                          ).map((key, index) => {
                            return (
                              <CheckItem
                                key={index}
                                item={key}
                                currrentItems={gamemodeFilter}
                                callback={(e: {
                                  target: { value: string; checked: boolean };
                                }) => {
                                  if (e.target.checked) {
                                    setGamemodeFilter((oldArray) => [
                                      ...oldArray,
                                      e.target.value,
                                    ]);
                                  } else {
                                    setGamemodeFilter((oldArray) => [
                                      ...oldArray.filter(
                                        (item) => item !== e.target.value,
                                      ),
                                    ]);
                                  }
                                }}
                                name={t(`servers.${gameName}.gamemodes.${key}`)}
                              />
                            );
                          })}
                      </div>
                    )}
                  {gameName !== "bf4" && dice.includes(gameName) && (
                    <div className={styles.serverPageFilterRow}>
                      <h2 style={{ marginBottom: "0.4rem" }}>
                        {t("serverSearch.map")}
                        <DropdownArrow
                          item={"map"}
                          dropdownOpen={dropdownOpen}
                          setDropdownOpen={setDropdownOpen}
                        />
                      </h2>
                      {!dropdownOpen["map"] &&
                        Object.keys(
                          t(`servers.${gameName}.maps`, {
                            returnObjects: true,
                          }),
                        ).map((key, index) => {
                          return (
                            <CheckItem
                              key={index}
                              item={key}
                              currrentItems={mapFilter}
                              callback={(e: {
                                target: { value: string; checked: boolean };
                              }) => {
                                if (e.target.checked) {
                                  setMapFilter((oldArray) => [
                                    ...oldArray,
                                    e.target.value,
                                  ]);
                                } else {
                                  setMapFilter((oldArray) => [
                                    ...oldArray.filter(
                                      (item) => item !== e.target.value,
                                    ),
                                  ]);
                                }
                              }}
                              name={t(`servers.${gameName}.maps.${key}`)}
                            />
                          );
                        })}
                    </div>
                  )}
                  {frostbite3.includes(gameName) && (
                    <div className={styles.serverPageFilterRow}>
                      <h2 style={{ marginBottom: "0.4rem" }}>
                        {t("servers.password")}
                        <DropdownArrow
                          item={"password"}
                          dropdownOpen={dropdownOpen}
                          setDropdownOpen={setDropdownOpen}
                        />
                      </h2>
                      {!dropdownOpen["password"] &&
                        Object.entries({
                          "": "case.none",
                          true: "case.on",
                          false: "case.off",
                        }).map(([k, v], index) => {
                          return (
                            <InputItem
                              key={index}
                              item={k}
                              currrentItem={isPasswordProtected}
                              callback={(e: {
                                target: { value: React.SetStateAction<string> };
                              }) => setIsPasswordProtected(e.target.value)}
                              name={t(v)}
                            />
                          );
                        })}
                    </div>
                  )}
                </div>
              </Box>
            </div>
          )}
        <div className={styles.serverPageRow}>
          <Results
            mainPage={false}
            game={gameName}
            loading={loading}
            stats={stats}
            error={error}
            sortType={sortType}
            spacingStyle={{ maxWidth: "99rem" }}
          />
        </div>
      </div>
    </div>
  );
}

export function ServerSearch(): React.ReactElement {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [gameName, setGameName] = useLocalStorage<string>(
    "serverSearch_game",
    "bf2042",
  );
  const [platform, setPlatform] = useLocalStorage<string>(
    "serverSearch_platform",
    "allPlatforms",
  );
  const [regionFilter, setRegionFilter] = React.useState<string[]>(["all"]);
  const regionKey = gameName === "battlebit" ? "battlebitRegions" : "regions";

  const { t } = useTranslation();
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery({
    queryKey: [
      "servers" +
      gameName +
      searchTerm +
      "servername" +
      regionFilter +
      platform +
      "4",
    ],
    queryFn: () =>
      GametoolsApi.serverSearch({
        game: gameName,
        searchTerm: searchTerm,
        lang: getLanguage(),
        searchType: "servername",
        regions: regionFilter,
        platform: platform,
        limit: "4",
      }),
  });
  return (
    <>
      <div className={styles.alignHomeServers}>
        <h2 style={{ marginTop: 0, marginBottom: "1.2rem" }}>
          {t("serverSearch.servers")}
        </h2>
        <select
          aria-label={t("ariaLabels.game")}
          className="selectPrimary"
          style={{ marginLeft: "1rem" }}
          value={gameName}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void => {
            setGameName(ev.target.value);
            setPlatform("pc");
            setRegionFilter(["all"]);
          }}
        >
          {supportedGames.map((value, index) => {
            return (
              <option key={index} value={value}>
                {t(`games.${value}`)}
              </option>
            );
          })}
        </select>
        <input
          className="smallSearchBox"
          style={{ marginLeft: "1rem", width: "16rem" }}
          placeholder={t(`serverSearch.searchPlaceholder.servername`)}
          value={searchTerm}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
            setSearchTerm(ev.target.value)
          }
        />
        {oldJoinGames.includes(gameName) ||
          (frostbiteJoinGames.includes(gameName) && (
            <p style={{ marginTop: 0, marginBottom: "1.1rem" }}>
              <Trans i18nKey="servers.joinme.smallinfo">
                <a href="https://joinme.click/download">
                  https://joinme.click/download
                </a>
              </Trans>
            </p>
          ))}
      </div>
      <div className={styles.serverPageColumn}>
        <div className={styles.serverPageRow}>
          <Results
            game={gameName}
            loading={loading}
            stats={stats}
            error={error}
            mainPage={true}
            sortType={"-prefix"}
            spacingStyle={{ maxWidth: "99rem" }}
          />
        </div>
        <Box
          style={{ minWidth: "240px", maxWidth: "20rem" }}
          innerStyle={{ maxHeight: "510px" }}
        >
          <div className={styles.serverPageFilters}>
            <div className={styles.serverPageFilterRow}>
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
            </div>
            <div className={styles.serverPageFilterRow}>
              <h2 style={{ marginBottom: "0.4rem" }}>
                {t("serverSearch.region")}
              </h2>
              {Object.keys(t(regionKey, { returnObjects: true })).map(
                (key, index) => {
                  if (key === "all") {
                    return;
                  }
                  return (
                    <CheckItem
                      key={index}
                      item={key}
                      currrentItems={regionFilter}
                      callback={(e: {
                        target: { value: string; checked: boolean };
                      }) => {
                        if (e.target.checked) {
                          let oldArray = [...regionFilter];
                          if (regionFilter.includes("all")) {
                            oldArray = [];
                          }
                          setRegionFilter([...oldArray, e.target.value]);
                        } else {
                          if (regionFilter.length > 1) {
                            setRegionFilter((oldArray) => [
                              ...oldArray.filter(
                                (item) => item !== e.target.value,
                              ),
                            ]);
                          } else {
                            setRegionFilter(["all"]);
                          }
                        }
                      }}
                      name={t(`${regionKey}.${key}`)}
                      disabled={
                        !frostbite3.includes(gameName) &&
                        !extraGames.includes(gameName)
                      }
                    />
                  );
                },
              )}
            </div>
          </div>
        </Box>
      </div>
      <Link
        to={`/servers?${new URLSearchParams({
          search: searchTerm,
          game: gameName,
          region: regionFilter.join(","),
          platform: platform,
          limit: 10,
        }).toString()}`}
      >
        <button className="bigButtonSecondaryBox">
          {t("serverSearch.showMore")}
        </button>
      </Link>
      {Object.keys(projects).includes(gameName) && (
        <a href={projects[gameName]} target="_blank" rel="noreferrer">
          <button className="bigButtonSecondaryBox">
            {t("serverSearch.showProject")}
          </button>
        </a>
      )}
    </>
  );
}

export default Main;
