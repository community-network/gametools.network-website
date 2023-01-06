import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import { useQuery } from "@tanstack/react-query";
import useWindowDimensions from "../../../functions/useWindowDimensions";
import {
  Container,
  Align,
  AltText,
  SelectPrimary,
  InvisableRadioButton,
  Radio,
  SmallButtonRadio,
  UncheckedSmallButtonRadio,
  DisabledSmallButtonRadio,
  PageColumn,
  PageRow,
  BackButton,
} from "../../../Materials";
import styled from "styled-components";
import {
  newTitles,
  platformGames,
  progressGames,
  gamemodeGames,
  supportedGames,
} from "../../../../api/static";
import { getLanguage } from "../../../../locales/config";
import { MainStats } from "../../../../api/ReturnTypes";
import { BfSessionInfo } from "./ManagerExtr";
import { DetailedStats } from "./DetailedStats";
import { ViewWeapons, WeaponGraph } from "./Weapons";
import { ViewVehicles, VehicleGraph } from "./Vehicles";
import { PlatoonInfo } from "./Platoon";
import { ViewProgress } from "./Progress";
import { ViewGamemodes } from "./Gamemodes";
import { ViewClasses } from "./Classes";
import { ViewIframe } from "./Iframe";
import { ViewStats } from "./OverviewStats";
import { ViewOrigin } from "./ViewOrigin";

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

export const BackgroundBar = styled.div`
  width: 100%;
  background-color: #313443;
  border-radius: 2.5px;
`;

export const Bar = styled.div`
  background-color: #14fed4;
  height: 5px;
  border-radius: 2.5px;
`;

export const ListImage = styled.img`
  max-width: 8rem;
  max-height: 3rem;
  margin-right: 1.5rem;
`;

export const Title = styled.h3`
  margin: 0 33px;
  padding-bottom: 1rem;
`;

export const Description = styled.p`
  ${AltText}
`;

export const Spacing = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

export function DynamicSort(property: string) {
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (
    a: { [x: string]: number },
    b: { [x: string]: number },
  ): number {
    const result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

function Stats(): React.ReactElement {
  const params = useParams();
  const platform = params.plat;
  const [game, setGame] = React.useState<string>(platformGames[platform][0]);
  const { width } = useWindowDimensions();
  const query = new URLSearchParams(useLocation().search);
  const history = useNavigate();
  const gameQuery = query.get("game");
  const nameQuery = query.get("name");

  const {
    isLoading: gameLoading,
    isError: gameError,
    data: playerGames,
  } = useQuery(["games" + params.type + params.eaid, platform], () =>
    GametoolsApi.games({
      getter: params.type,
      userName: params.eaid,
      platform: platform,
    }),
  );
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
  return (
    <Container>
      <BackButton text={t("stats.back")} location="/" />
      <ViewOrigin
        game={game}
        loading={gameLoading}
        stats={playerGames}
        error={gameError}
        name={nameQuery}
      />
      {width < 930 ? (
        <SelectPrimary
          value={game}
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void => {
            setGame(ev.target.value);
          }}
        >
          {games.map((key: string, index: number) => {
            return (
              <option
                key={index}
                value={key}
                disabled={playerGamesArr.includes(key)}
              >
                {t(`games.${key}`)}
              </option>
            );
          })}
        </SelectPrimary>
      ) : (
        <Align
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
            setGame(ev.target.value);
          }}
        >
          {games.map((key: string, index: number) => {
            return (
              <Radio key={index}>
                <InvisableRadioButton
                  id={key}
                  value={key}
                  name="game"
                  disabled={playerGamesArr.includes(key)}
                  defaultChecked={game === key}
                />
                {playerGamesArr.includes(key) ? (
                  <DisabledSmallButtonRadio htmlFor={key}>
                    {t(`games.${key}`)}
                  </DisabledSmallButtonRadio>
                ) : (
                  <>
                    {game === key ? (
                      <SmallButtonRadio htmlFor={key}>
                        {t(`games.${key}`)}
                      </SmallButtonRadio>
                    ) : (
                      <UncheckedSmallButtonRadio htmlFor={key}>
                        {t(`games.${key}`)}
                      </UncheckedSmallButtonRadio>
                    )}
                  </>
                )}
              </Radio>
            );
          })}
        </Align>
      )}
      <GameStats
        game={game}
        name={params.eaid}
        type={params.type}
        platform={platform}
      />
    </Container>
  );
}

interface GameStatsItems {
  game: string;
  name: string;
  type: string;
  platform: string;
}

function GameStats(props: GameStatsItems): React.ReactElement {
  const { game, name, type, platform } = props;

  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery(["stats" + game + type + name], () =>
    GametoolsApi.stats({
      game: game,
      type: "all",
      getter: type,
      userName: name,
      lang: getLanguage(),
      platform: platform,
    }),
  );

  return (
    <>
      <PageColumn>
        <PageRow>
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
          {newTitles.includes(game) ? (
            <PlatoonInfo
              game={game}
              loading={loading}
              stats={stats}
              error={error}
              name={name}
              platform={platform}
            />
          ) : (
            <></>
          )}
          {game == "bf1" ? (
            <BfSessionInfo
              game={game}
              loading={loading}
              stats={stats}
              error={error}
              name={name}
            />
          ) : (
            <></>
          )}
          <WeaponGraph
            game={game}
            loading={loading}
            stats={stats}
            error={error}
            name={name}
          />
          <VehicleGraph
            game={game}
            loading={loading}
            stats={stats}
            error={error}
            name={name}
          />
          {progressGames.includes(game) ? (
            <>
              <ViewProgress
                game={game}
                loading={loading}
                stats={stats}
                error={error}
                name={name}
              />
            </>
          ) : (
            <></>
          )}
        </PageRow>
        <PageRow>
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
          <ViewVehicles
            game={game}
            loading={loading}
            stats={stats}
            error={error}
            name={name}
          />
          {gamemodeGames.includes(game) ? (
            <>
              <ViewGamemodes
                game={game}
                loading={loading}
                stats={stats}
                error={error}
                name={name}
              />
            </>
          ) : (
            <></>
          )}
        </PageRow>
      </PageColumn>
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
