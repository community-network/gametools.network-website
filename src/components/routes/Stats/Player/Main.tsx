import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import { MainStats } from "../../../../api/ReturnTypes";
import {
  gamemodeGames,
  newGen,
  newTitles,
  platformGames,
  progressGames,
  statsPlatforms,
  supportedGames,
} from "../../../../api/static";
import "../../../../locales/config";
import { getLanguage } from "../../../../locales/config";
import { BackButton, RightArrow } from "../../../Materials";
import { AdminPanel } from "./AdminPanel";
import { ViewClasses } from "./Classes";
import { DetailedStats } from "./DetailedStats";
import { GadgetGraph, ViewGadgets } from "./Gadgets";
import { ViewGamemodes } from "./Gamemodes";
import { ViewIframe } from "./Iframe";
import { BfSessionInfo } from "./ManagerExtr";
import { ViewStats } from "./OverviewStats";
import { PlatoonInfo } from "./Platoon";
import { ViewProgress } from "./Progress";
import { VehicleGraph, ViewVehicles } from "./Vehicles";
import { ViewEmblem, ViewOrigin } from "./ViewOrigin";
import { ViewWeapons, WeaponGraph } from "./Weapons";

export interface Views {
  isLoading: boolean;
  isError: boolean;
  errors: any;
  game: string;
  name: string;
  stats: MainStats;
}

export interface PlatformViews extends Views {
  platform: string;
}

export function ComponentHandling(
  t: useTranslation,
  props: Readonly<Views>,
): React.ReactElement {
  if (props.isError) {
    if (
      typeof props.errors == "object" &&
      props.errors.includes("Player not found")
    ) {
      return t("notApplicable");
    }

    return t("stats.error", { error: props.errors });
  }

  if (props.isLoading) {
    return t("loading");
  }
}

export function DynamicSort(property: string) {
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b): number {
    const result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

function Stats(): React.ReactElement {
  const params = useParams();
  const platformParam = params.plat;
  const [game, setGame] = useLocalStorage<string>(
    "stats_game",
    platformGames[platformParam][0],
  );
  const query = new URLSearchParams(useLocation().search);
  const history = useNavigate();
  const gameQuery = query.get("game");
  const nameQuery = query.get("name");

  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [platform, setPlatform] = useLocalStorage<string>(
    "statSearch_platform",
    "pc",
  );

  const {
    isLoading: gameLoading,
    isError: gameError,
    error: gameErrors,
    data: playerGames,
  } = useQuery({
    queryKey: ["games" + params.type + params.eaid, platformParam],
    queryFn: () =>
      GametoolsApi.games({
        getter: params.type,
        userName: params.eaid,
        platform: platformParam,
      }),
    retry: 1,
  });

  const games: string[] = platformGames[platformParam];
  let playerGamesArr = [];
  let otherGamesArr = [];
  if (!gameLoading && !gameError) {
    playerGamesArr = Object.keys(
      Object.fromEntries(
        Object.entries(playerGames)
          .filter(([key]) => supportedGames.includes(key))
          .filter(([, value]) => !value),
      ),
    );
    otherGamesArr = games.filter(
      (item: string) => !playerGamesArr.includes(item),
    );
  }

  React.useState(() => {
    if (gameQuery !== null) {
      setGame(gameQuery);
    }
  });

  React.useEffect(() => {
    if (playerGames?.userName != null) {
      setSearchTerm(playerGames?.userName);
    }
  }, [playerGames]);

  React.useEffect(() => {
    if (playerGamesArr.includes(gameQuery)) {
      setGame(otherGamesArr[otherGamesArr.length - 1]);
    }
  });

  React.useEffect(() => {
    const params = new URLSearchParams();
    const old_params = query.toString();
    if (game) {
      params.append("game", game);
    } else {
      params.delete("game");
    }
    if (nameQuery) {
      params.append("name", nameQuery);
    } else {
      params.delete("name");
    }
    if (params.toString() != old_params) {
      history({ search: params.toString() }, { replace: true });
    }
  }, [game, history]);
  const { t } = useTranslation();
  document.title = `${t("siteFullName")} ${t("pageTitle.stats")} | ${
    playerGames?.userName || t("loading")
  } | ${game || t("notApplicable")}`;

  return (
    <div className="container">
      <BackButton text={t("stats.back")} location="/" />
      <form style={{ marginTop: "1.5rem" }}>
        <div className="align">
          <div className="align" style={{ flexWrap: "nowrap" }}>
            <input
              className="bf2042SearchBox"
              placeholder={t(`playerSearch.searchPlaceholder`)}
              value={searchTerm}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                setSearchTerm(ev.target.value)
              }
            />

            <select
              aria-label={t("ariaLabels.platform")}
              className="bf2042BigSelectSecondary"
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
            </select>
          </div>
          {searchTerm !== "" ? (
            <Link
              to={`/stats/${platform}/name/${encodeURIComponent(searchTerm)}`}
            >
              <button className="bigButtonPrimaryD" type="submit">
                {t("playerSearch.search")} <RightArrow />
              </button>
            </Link>
          ) : (
            // if no name is filled in
            <button className="bigButtonPrimaryD" type="submit">
              {t("playerSearch.search")} <RightArrow />
            </button>
          )}
          <div
            style={{
              backgroundColor: "#1e2028",
              // height: "100%",
              marginRight: "1rem",
              width: "1px",
              float: "left",
              height: "3.3rem",
              alignSelf: "stretch",
            }}
          />
          <select
            aria-label={t("ariaLabels.game")}
            className="bigSelectSecondary"
            value={game}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void => {
              setGame(ev.target.value);
            }}
          >
            {games.map((key: string) => {
              return (
                <option
                  key={key}
                  value={key}
                  disabled={playerGamesArr.includes(key)}
                >
                  {t(`games.${key}`)}
                </option>
              );
            })}
          </select>
        </div>
      </form>
      <GameStats
        game={game}
        name={params.eaid}
        type={params.type}
        platform={platformParam}
      >
        <div className="column">
          <div className="row">
            <ViewOrigin
              game={game}
              loading={gameLoading}
              stats={playerGames}
              error={gameError}
              errors={gameErrors}
              name={nameQuery}
            />
          </div>
          {typeof playerGames?.emblem === "string" && (
            <div className="row">
              <ViewEmblem emblem={playerGames?.emblem} />
            </div>
          )}
        </div>
      </GameStats>
    </div>
  );
}

interface GameStatsItems {
  game: string;
  name: string;
  type: string;
  platform: string;
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal;
}

function GameStats(props: Readonly<GameStatsItems>): React.ReactElement {
  const { game, name, type, platform } = props;
  const [showAdminPanel] = useLocalStorage<boolean>("adminMode", false);

  const {
    isLoading,
    isError,
    error,
    data: stats,
  } = useQuery({
    queryKey: ["stats" + game + type + name],
    queryFn: () =>
      GametoolsApi.stats({
        game: game,
        type: "all",
        getter: type,
        userName: name,
        lang: getLanguage(),
        platform: platform,
      }),
    retry: 1,
  });

  return (
    <>
      <div className="pageColumn">
        <div className="pageRow">
          <ViewStats
            game={game}
            isLoading={isLoading}
            stats={stats}
            errors={error}
            isError={isError}
            name={name}
          >
            {props.children}
          </ViewStats>
          {showAdminPanel && (
            <AdminPanel
              game={game}
              isLoading={isLoading}
              stats={stats}
              errors={error}
              isError={isError}
              name={name}
              platform={platform}
            />
          )}
          <DetailedStats
            game={game}
            isLoading={isLoading}
            stats={stats}
            errors={error}
            isError={isError}
            name={name}
          />
          {newTitles.includes(game) && (
            <PlatoonInfo
              game={game}
              isLoading={isLoading}
              stats={stats}
              errors={error}
              isError={isError}
              name={name}
              platform={platform}
            />
          )}
          {game == "bf1" && (
            <BfSessionInfo
              game={game}
              isLoading={isLoading}
              stats={stats}
              errors={error}
              isError={isError}
              name={name}
            />
          )}
          <WeaponGraph
            game={game}
            isLoading={isLoading}
            stats={stats}
            errors={error}
            isError={isError}
            name={name}
          />
          {stats?.vehicles && (
            <VehicleGraph
              game={game}
              isLoading={isLoading}
              stats={stats}
              errors={error}
              isError={isError}
              name={name}
            />
          )}
          {newGen.includes(game) && (
            <GadgetGraph
              game={game}
              isLoading={isLoading}
              stats={stats}
              errors={error}
              isError={isError}
              name={name}
            />
          )}
          {progressGames.includes(game) && (
            <ViewProgress
              game={game}
              isLoading={isLoading}
              stats={stats}
              errors={error}
              isError={isError}
              name={name}
            />
          )}
        </div>
        <div className="pageRow">
          <ViewClasses
            game={game}
            isLoading={isLoading}
            stats={stats}
            errors={error}
            isError={isError}
            name={name}
          />
          <ViewWeapons
            game={game}
            isLoading={isLoading}
            stats={stats}
            errors={error}
            isError={isError}
            name={name}
          />
          {stats?.vehicles && (
            <ViewVehicles
              game={game}
              isLoading={isLoading}
              stats={stats}
              errors={error}
              isError={isError}
              name={name}
            />
          )}
          {newGen.includes(game) && (
            <ViewGadgets
              game={game}
              isLoading={isLoading}
              stats={stats}
              errors={error}
              isError={isError}
              name={name}
            />
          )}
          {gamemodeGames.includes(game) && (
            <ViewGamemodes
              game={game}
              isLoading={isLoading}
              stats={stats}
              errors={error}
              isError={isError}
              name={name}
            />
          )}
        </div>
      </div>
      <ViewIframe
        game={game}
        isLoading={isLoading}
        stats={stats}
        errors={error}
        isError={isError}
        getter={type}
        name={name}
        platform={platform}
      />
    </>
  );
}

export default Stats;
