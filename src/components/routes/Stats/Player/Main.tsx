import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import { useQuery } from "@tanstack/react-query";
import useWindowDimensions from "../../../functions/useWindowDimensions";
import { BackButton } from "../../../Materials";
import {
  newTitles,
  platformGames,
  progressGames,
  gamemodeGames,
  supportedGames,
  newGen,
} from "../../../../api/static";
import { getLanguage } from "../../../../locales/config";
import { MainStats } from "../../../../api/ReturnTypes";
import { BfSessionInfo } from "./ManagerExtr";
import { DetailedStats } from "./DetailedStats";
import { ViewWeapons, WeaponGraph } from "./Weapons";
import { ViewVehicles, VehicleGraph } from "./Vehicles";
import { ViewGadgets, GadgetGraph } from "./Gadgets";
import { PlatoonInfo } from "./Platoon";
import { ViewProgress } from "./Progress";
import { ViewGamemodes } from "./Gamemodes";
import { ViewClasses } from "./Classes";
import { ViewIframe } from "./Iframe";
import { ViewStats } from "./OverviewStats";
import { ViewOrigin } from "./ViewOrigin";
import { useLocalStorage } from "react-use";
import * as styles from "./Main.module.scss";

export interface Views {
  loading: boolean;
  error: boolean;
  game: string;
  name: string;
  stats: MainStats;
}

export interface PlatformViews {
  loading: boolean;
  error: boolean;
  game: string;
  name: string;
  platform: string;
  stats: MainStats;
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
  const platform = params.plat;
  const [game, setGame] = useLocalStorage<string>(
    "stats_game",
    platformGames[platform][0],
  );
  const { width } = useWindowDimensions();
  const query = new URLSearchParams(useLocation().search);
  const history = useNavigate();
  const gameQuery = query.get("game");
  const nameQuery = query.get("name");

  const {
    isLoading: gameLoading,
    isError: gameError,
    data: playerGames,
  } = useQuery({
    queryKey: ["games" + params.type + params.eaid, platform],
    queryFn: () =>
      GametoolsApi.games({
        getter: params.type,
        userName: params.eaid,
        platform: platform,
      }),
  });
  const games: string[] = platformGames[platform];

  let playerGamesArr = [];
  let otherGamesArr = [];
  if (!gameLoading && !gameError) {
    playerGamesArr = Object.keys(
      Object.fromEntries(
        Object.entries(playerGames)
          .filter(([key]) => supportedGames.includes(key))
          .filter(([, value]) => value != true),
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
      history({ search: params.toString() });
    }
  }, [game, history]);
  const { t } = useTranslation();
  document.title = `${t("siteFullName")} ${t("pageTitle.stats")} | ${
    playerGames?.userName || t("loading")
  } | ${game || t("notApplicable")}`;

  return (
    <div className="container">
      <BackButton text={t("stats.back")} location="/" />
      <ViewOrigin
        game={game}
        loading={gameLoading}
        stats={playerGames}
        error={gameError}
        name={nameQuery}
      />
      {width < 930 ? (
        <select
          aria-label={t("ariaLabels.game")}
          className="selectPrimary"
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
      ) : (
        <div
          className="align"
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
            setGame(ev.target.value);
          }}
        >
          {games.map((key: string) => {
            return (
              <div className={styles.radio} key={key}>
                <input
                  className={styles.invisableRadioButton}
                  type="radio"
                  id={key}
                  value={key}
                  name="game"
                  disabled={playerGamesArr.includes(key)}
                  defaultChecked={game === key}
                />
                {playerGamesArr.includes(key) ? (
                  <label
                    title={t("stats.missingGame")}
                    className={styles.disabledSmallButtonRadio}
                    htmlFor={key}
                  >
                    {t(`games.${key}`)}
                  </label>
                ) : (
                  <>
                    {game === key ? (
                      <label
                        aria-label={t("ariaLabels.toggleGame")}
                        className={styles.smallButtonRadio}
                        htmlFor={key}
                      >
                        {t(`games.${key}`)}
                      </label>
                    ) : (
                      <label
                        aria-label={t("ariaLabels.toggleGame")}
                        className={styles.uncheckedSmallButtonRadio}
                        htmlFor={key}
                      >
                        {t(`games.${key}`)}
                      </label>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
      <GameStats
        game={game}
        name={params.eaid}
        type={params.type}
        platform={platform}
      />
    </div>
  );
}

interface GameStatsItems {
  game: string;
  name: string;
  type: string;
  platform: string;
}

function GameStats(props: Readonly<GameStatsItems>): React.ReactElement {
  const { game, name, type, platform } = props;

  const {
    isLoading: loading,
    isError: error,
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
  });

  return (
    <>
      <div className="pageColumn">
        <div className="pageRow">
          <ViewStats
            game={game}
            loading={loading}
            stats={stats}
            error={error}
            name={name}
          />
          <DetailedStats
            game={game}
            loading={loading}
            stats={stats}
            error={error}
            name={name}
          />
          {newTitles.includes(game) && (
            <PlatoonInfo
              game={game}
              loading={loading}
              stats={stats}
              error={error}
              name={name}
              platform={platform}
            />
          )}
          {game == "bf1" && (
            <BfSessionInfo
              game={game}
              loading={loading}
              stats={stats}
              error={error}
              name={name}
            />
          )}
          <WeaponGraph
            game={game}
            loading={loading}
            stats={stats}
            error={error}
            name={name}
          />
          {stats?.vehicles && (
            <VehicleGraph
              game={game}
              loading={loading}
              stats={stats}
              error={error}
              name={name}
            />
          )}
          {newGen.includes(game) && (
            <GadgetGraph
              game={game}
              loading={loading}
              stats={stats}
              error={error}
              name={name}
            />
          )}
          {progressGames.includes(game) && (
            <ViewProgress
              game={game}
              loading={loading}
              stats={stats}
              error={error}
              name={name}
            />
          )}
        </div>
        <div className="pageRow">
          <ViewClasses
            game={game}
            loading={loading}
            stats={stats}
            error={error}
            name={name}
          />
          <ViewWeapons
            game={game}
            loading={loading}
            stats={stats}
            error={error}
            name={name}
          />
          {stats?.vehicles && (
            <ViewVehicles
              game={game}
              loading={loading}
              stats={stats}
              error={error}
              name={name}
            />
          )}
          {newGen.includes(game) && (
            <ViewGadgets
              game={game}
              loading={loading}
              stats={stats}
              error={error}
              name={name}
            />
          )}
          {gamemodeGames.includes(game) && (
            <ViewGamemodes
              game={game}
              loading={loading}
              stats={stats}
              error={error}
              name={name}
            />
          )}
        </div>
      </div>
      <ViewIframe
        game={game}
        loading={loading}
        stats={stats}
        error={error}
        getter={type}
        name={name}
        platform={platform}
      />
    </>
  );
}

export default Stats;
