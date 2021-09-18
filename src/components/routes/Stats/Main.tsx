import * as React from "react";
import { RouteComponentProps, useLocation, useHistory } from "react-router-dom";
import "../../../locales/config";
import { useTranslation } from "react-i18next";
import { GetStats } from "../../../api/GetStats";
import { useQuery } from "react-query";
import useWindowDimensions from "../../functions/useWindowDimensions";
import {
  AlignS,
  Back,
  ArrowLeft,
  Container,
  Align,
  Box,
  AltText,
  SelectPrimary,
  Circle,
  InvisableRadioButton,
  Radio,
  SmallButtonRadio,
  UncheckedSmallButtonRadio,
  PageColumn,
  PageRow,
} from "../../Materials";
import styled from "styled-components";
import {
  newTitles,
  platformGames,
  progressGames,
  gamemodeGames,
  classGames,
} from "../../../api/static";
import { getLanguage } from "../../../locales/config";
import { MainStats } from "../../../api/ReturnTypes";
import { BfSessionInfo } from "./ManagerExtr";
import { DetailedStats } from "./DetailedStats";
import { ViewWeapons, WeaponGraph } from "./Weapons";
import { ViewVehicles, VehicleGraph } from "./Vehicles";
import { Platoon, PlatoonInfo } from "./Platoon";
import { ViewProgress } from "./Progress";
import { ViewGamemodes } from "./Gamemodes";
import { ViewClasses } from "./Classes";
import { ViewIframe } from "./Iframe";
import { addSeconds } from "date-fns";

export interface Views {
  loading: boolean;
  error: boolean;
  game: string;
  name: string;
  stats: MainStats;
}

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

const BottomOfBox = styled.div`
  display: inline-block;
  line-height: 0;
`;

const WhiteText = styled.span`
  color: white;
  margin-left: 0.5rem;
`;

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

export const Spacing = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const OriginProfile = styled.img`
  width: 60px;
  margin-right: 1.5rem;
`;

const OriginName = styled.h2`
  line-height: 60%;
`;

const OriginDescription = styled.h4`
  line-height: 60%;
`;

function ViewOrigin(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const stats = props.stats;
  const name = props.name;
  if (props.error) {
    return (
      // if playername isnt found
      <Spacing>
        <Align>
          <Circle />
          <div>
            <OriginName>{t("404")}</OriginName>
            <OriginDescription>{t("playerNotFound")}</OriginDescription>
          </div>
        </Align>
      </Spacing>
    );
  } else if (!props.loading && !props.error) {
    if (stats.userName === null) {
      if (name !== null) {
        return (
          // if playerid but ?name behind it
          <Spacing>
            <Align>
              <Circle />
              <div>
                <OriginName>{name}</OriginName>
                <OriginDescription>
                  {t("stats.originDescription")}
                </OriginDescription>
              </div>
            </Align>
          </Spacing>
        );
      } else {
        return (
          // if no ?name behind it
          <Spacing>
            <Align>
              <Circle />
              <div>
                <OriginName>{t("notApplicable")}</OriginName>
                <OriginDescription>{t("noName")}</OriginDescription>
              </div>
            </Align>
          </Spacing>
        );
      }
    } else {
      return (
        // normal playerName
        <Spacing>
          <Align>
            <OriginProfile src={stats.avatar} />
            <div>
              <OriginName>
                <Platoon stats={stats} />
                {stats.userName}
              </OriginName>
              <OriginDescription>
                {t("stats.originDescription")}
              </OriginDescription>
            </div>
          </Align>
        </Spacing>
      );
    }
  } else {
    return (
      // loading page
      <Spacing>
        <Align>
          <Circle />
          <div>
            <OriginName>{t("loading")}</OriginName>
            <OriginDescription>{t("loading")}</OriginDescription>
          </div>
        </Align>
      </Spacing>
    );
  }
}

function ViewStats(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const stats = props.stats;
  if (!props.loading && !props.error) {
    return (
      <Spacing>
        <Box>
          <h3>{t("stats.overview")}</h3>
          <p>{t("stats.overviewDescription")}</p>
          <AlignS>
            <div>
              <h3>{stats.rank}</h3>
              <p>{t("stats.main.rank")}</p>
            </div>
          </AlignS>
          <BackgroundBar>
            <Bar
              style={{
                width: `${
                  (100 * stats.currentRankProgress) / stats.totalRankProgress
                }%`,
              }}
            ></Bar>
          </BackgroundBar>
          <p></p>
          <AlignS>
            <div>
              <h3>{stats.killDeath}</h3>
              <p>{t("stats.main.killDeath")}</p>
            </div>
            <div>
              <h3>{stats.killsPerMinute}</h3>
              <p>{t("stats.main.killsPerMinute")}</p>
            </div>
            <div>
              <h3>{stats.winPercent}</h3>
              <p>{t("stats.main.winPercent")}</p>
            </div>
            <div>
              <h3>{stats.bestClass}</h3>
              <p>{t("stats.main.bestClass")}</p>
            </div>
            <div>
              <h3>{stats.accuracy}</h3>
              <p>{t("stats.main.accuracy")}</p>
            </div>
          </AlignS>
          <p></p>
          <BottomOfBox>
            <p style={{ margin: 0 }}>
              {t("stats.main.timePlayed")}{" "}
              <WhiteText>
                {t("change", {
                  change: addSeconds(new Date(), stats.secondsPlayed),
                })}
              </WhiteText>
            </p>
          </BottomOfBox>
        </Box>
      </Spacing>
    );
  } else {
    return (
      <Spacing>
        <Box>
          <h3>{t("stats.overview")}</h3>
          <p>{t("loading")}</p>
        </Box>
      </Spacing>
    );
  }
}

export function DynamicSort(property: string) {
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
  const [game, setGame] = React.useState<string>(
    platformGames[match.params.plat][0],
  );
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
  } = useQuery("stats" + game + match.params.eaid, () =>
    GetStats.stats({
      game: game,
      type: "all",
      getter: match.params.type,
      userName: match.params.eaid,
      lang: getLanguage(),
    }),
  );
  const games = platformGames[match.params.plat];
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
        </PageRow>
        <PageRow>
          {classGames.includes(game) ? (
            <>
              <ViewClasses
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
        </PageRow>
      </PageColumn>
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
