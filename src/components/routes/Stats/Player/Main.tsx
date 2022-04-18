import * as React from "react";
import { RouteComponentProps, useLocation, useHistory } from "react-router-dom";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import { useQuery } from "react-query";
import useWindowDimensions from "../../../functions/useWindowDimensions";
import {
  Back,
  ArrowLeft,
  Container,
  Align,
  AltText,
  SelectPrimary,
  InvisableRadioButton,
  Radio,
  SmallButtonRadio,
  UncheckedSmallButtonRadio,
  PageColumn,
  PageRow,
} from "../../../Materials";
import styled from "styled-components";
import {
  newTitles,
  platformGames,
  progressGames,
  gamemodeGames,
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

export function DynamicSort(property: string): any {
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a: any, b: any): number {
    const result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

type TParams = { plat: string; type: string; eaid: string };

function Stats({ match }: RouteComponentProps<TParams>): React.ReactElement {
  const platform = match.params.plat;
  const [game, setGame] = React.useState<string>(platformGames[platform][0]);
  const [name, setName] = React.useState<string>("");
  const { width } = useWindowDimensions();
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();
  const gameQuery = query.get("game");
  const nameQuery = query.get("name");
  React.useState(() => {
    if (gameQuery !== null) {
      setGame(gameQuery);
    }
    if (nameQuery !== null) {
      setName(nameQuery);
    }
  });

  React.useEffect(() => {
    const params = new URLSearchParams();
    if (game) {
      params.append("game", game);
    } else {
      params.delete("game");
    }
    if (name) {
      params.append("name", name);
    } else {
      params.delete("name");
    }
    history.push({ search: params.toString() });
  }, [game, history]);
  const { t } = useTranslation();
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery("stats" + game + match.params.type + match.params.eaid, () =>
    GametoolsApi.stats({
      game: game,
      type: "all",
      getter: match.params.type,
      userName: match.params.eaid,
      lang: getLanguage(),
      platform: platform,
    }),
  );

  const games = platformGames[platform];
  return (
    <Container>
      <div>
        <Back to="/stats">
          <ArrowLeft />
          {t("stats.back")}
        </Back>
      </div>
      <ViewOrigin
        game={game}
        loading={loading}
        stats={stats}
        error={error}
        name={name}
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
              <option key={index} value={key}>
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
                  defaultChecked={game === key}
                />
                {game === key ? (
                  <SmallButtonRadio htmlFor={key}>
                    {t(`games.${key}`)}
                  </SmallButtonRadio>
                ) : (
                  <UncheckedSmallButtonRadio htmlFor={key}>
                    {t(`games.${key}`)}
                  </UncheckedSmallButtonRadio>
                )}
              </Radio>
            );
          })}
        </Align>
      )}
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
        getter={match.params.type}
        name={match.params.eaid}
        platform={match.params.plat}
      />
    </Container>
  );
}

export default Stats;
