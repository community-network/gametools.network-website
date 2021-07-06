import * as React from "react";
import { RouteComponentProps, useLocation, useHistory } from "react-router-dom";
import "../../locales/config";
import { useTranslation } from "react-i18next";
import { GetStats } from "../../api/GetStats";
import { useQuery } from "react-query";
import useWindowDimensions from "../functions/useWindowDimensions";
import {
  AlignS,
  Back,
  ArrowLeft,
  Container,
  Align,
  Box,
  SmallSearchBox,
  AltText,
  SelectPrimary,
  Circle,
  Column,
  Row,
  InvisableRadioButton,
  Radio,
  SmallButtonRadio,
  UncheckedSmallButtonRadio,
  GridContainer,
  AlignW,
} from "../Materials";
import styled from "styled-components";
import { newTitles, platformGames } from "../../api/static";
import { getLanguage } from "../../locales/config";

interface Views {
  loading: boolean;
  error: boolean;
  game: string;
  name: string;
  stats: { [name: string]: any };
}

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

const PlatoonLink = styled.a`
  color: rgba(255, 255, 255);
  font-weight: 600;
  line-height: 150%;
  font-size: 16px;
  font-weight: bold;
`;

const PlatoonEmnlem = styled.img`
  width: 100px;
`;

interface Stats {
  stats: { [name: string]: any };
}

function Platoon(props: Stats) {
  const stats = props.stats;
  if (stats.platoon !== undefined && stats.platoon.tag !== null) {
    return (
      <PlatoonLink href={stats.platoon.url} target="_blank">
        [{stats.platoon.tag}]{" "}
      </PlatoonLink>
    );
  } else {
    return <></>;
  }
}

function PlatoonInfo(props: Views) {
  const { t } = useTranslation();
  const stats = props.stats;
  if (!props.loading && !props.error && stats.platoon.name === null) {
    return (
      <Spacing>
        <Box>
          <h3>{t("stats.platoonName")}</h3>
          <p>{t("stats.platoon.none")}</p>
        </Box>
      </Spacing>
    );
  } else if (!props.loading && !props.error) {
    return (
      <Spacing>
        <Box>
          <h3>{t("stats.platoonName")}</h3>
          <AlignW style={{ alignItems: "start" }}>
            <PlatoonEmnlem src={stats.platoon.emblem} />
            <div style={{ marginTop: "1rem" }}>
              <h3>{stats.platoon.name}</h3>
              {stats.platoon.description !== null ? (
                <p>{stats.platoon.description}</p>
              ) : (
                <Description>{t("stats.platoon.noDescription")}</Description>
              )}
            </div>
          </AlignW>
        </Box>
      </Spacing>
    );
  } else {
    return (
      <Spacing>
        <Box>
          <h3>{t("stats.platoonName")}</h3>
          <p>{t("loading")}</p>
        </Box>
      </Spacing>
    );
  }
}

function ViewOrigin(props: Views) {
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

const WeaponImage = styled.img`
  max-width: 8rem;
  max-height: 3rem;
  margin-right: 1.5rem;
`;

const Description = styled.p`
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

const BackgroundBar = styled.div`
  width: 100%;
  background-color: #313443;
  border-radius: 2.5px;
`;

const Bar = styled.div`
  background-color: #14fed4;
  height: 5px;
  border-radius: 2.5px;
`;

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
              <h3>{stats["rank"]}</h3>
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
              <h3>{stats["killDeath"]}</h3>
              <p>{t("stats.main.killDeath")}</p>
            </div>
            <div>
              <h3>{stats["killsPerMinute"]}</h3>
              <p>{t("stats.main.killsPerMinute")}</p>
            </div>
            <div>
              <h3>{stats["winPercent"]}</h3>
              <p>{t("stats.main.winPercent")}</p>
            </div>
            <div>
              <h3>{stats["bestClass"]}</h3>
              <p>{t("stats.main.bestClass")}</p>
            </div>
            {newTitles.includes(props.game) ? (
              <div>
                <h3>{stats["Accuracy"]}</h3>
                <p>{t("stats.main.accuracy")}</p>
              </div>
            ) : (
              <div>
                <h3>{stats["accuracy"]}</h3>
                <p>{t("stats.main.accuracy")}</p>
              </div>
            )}
          </AlignS>
          <p></p>
          <BottomOfBox>
            <p style={{ margin: 0 }}>
              {t("stats.main.timePlayed")}{" "}
              <WhiteText>{stats["timePlayed"]}</WhiteText>
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

function DetailedStats(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const stats = props.stats;
  if (!props.loading && !props.error) {
    if (newTitles.includes(props.game)) {
      return (
        <Spacing>
          <Box>
            <h3>{t("stats.detailedName")}</h3>
            <p></p>
            <GridContainer>
              <div>
                <h3>{stats["skill"]}</h3>
                <p>{t("stats.detailed.skill")}</p>
              </div>
              <div>
                <h3>{stats["scorePerMinute"]}</h3>
                <p>{t("stats.detailed.scorePerMinute")}</p>
              </div>
              <div>
                <h3>{stats["kills"]}</h3>
                <p>{t("stats.detailed.kills")}</p>
              </div>
              <div>
                <h3>{stats["deaths"]}</h3>
                <p>{t("stats.detailed.deaths")}</p>
              </div>
              <div>
                <h3>{stats["headshots"]}</h3>
                <p>{t("stats.detailed.headshotPercent")}</p>
              </div>
              <div>
                <h3>{stats["killAssists"]}</h3>
                <p>{t("stats.detailed.killAssists")}</p>
              </div>
              <div>
                <h3>{stats["wins"]}</h3>
                <p>{t("stats.detailed.wins")}</p>
              </div>
              <div>
                <h3>{stats["loses"]}</h3>
                <p>{t("stats.detailed.losses")}</p>
              </div>
              <div>
                <h3>{stats["revives"]}</h3>
                <p>{t("stats.detailed.revives")}</p>
              </div>
              <div>
                <h3>{stats["repairs"]}</h3>
                <p>{t("stats.detailed.repairs")}</p>
              </div>
              <div>
                <h3>{stats["infantryKillDeath"]}</h3>
                <p>{t("stats.detailed.infantryKillDeath")}</p>
              </div>
              <div>
                <h3>{stats["infantryKillsPerMinute"]}</h3>
                <p>{t("stats.detailed.infantryKillsPerMinute")}</p>
              </div>
              <div>
                <h3>{stats["heals"]}</h3>
                <p>{t("stats.detailed.heals")}</p>
              </div>
              <div>
                <h3>{stats["headShots"]}</h3>
                <p>{t("stats.detailed.headShots")}</p>
              </div>
              <div>
                <h3>{stats["avengerKills"]}</h3>
                <p>{t("stats.detailed.avengerKills")}</p>
              </div>
              <div>
                <h3>{stats["saviorKills"]}</h3>
                <p>{t("stats.detailed.saviorKills")}</p>
              </div>
              <div>
                <h3>{stats["roundsPlayed"]}</h3>
                <p>{t("stats.detailed.roundsPlayed")}</p>
              </div>
              <div>
                <h3>{stats["awardScore"]}</h3>
                <p>{t("stats.detailed.awardScore")}</p>
              </div>
              <div>
                <h3>{stats["bonusScore"]}</h3>
                <p>{t("stats.detailed.bonusScore")}</p>
              </div>
              <div>
                <h3>{stats["squadScore"]}</h3>
                <p>{t("stats.detailed.squadScore")}</p>
              </div>
              <div>
                <h3>{stats["longestHeadShot"]}</h3>
                <p>{t("stats.detailed.longestHeadShot")}</p>
              </div>
              <div>
                <h3>{stats["highestKillStreak"]}</h3>
                <p>{t("stats.detailed.highestKillStreak")}</p>
              </div>
            </GridContainer>
            <p></p>
          </Box>
        </Spacing>
      );
    } else if (props.game == "bfh") {
      return (
        <Spacing>
          <Box>
            <h3>{t("stats.detailedName")}</h3>
            <p></p>
            <GridContainer>
              <div>
                <h3>{stats["scorePerMinute"]}</h3>
                <p>{t("stats.detailed.scorePerMinute")}</p>
              </div>
              <div>
                <h3>{stats["kills"]}</h3>
                <p>{t("stats.detailed.kills")}</p>
              </div>
              <div>
                <h3>{stats["deaths"]}</h3>
                <p>{t("stats.detailed.deaths")}</p>
              </div>
              <div>
                <h3>{stats["wins"]}</h3>
                <p>{t("stats.detailed.wins")}</p>
              </div>
              <div>
                <h3>{stats["loses"]}</h3>
                <p>{t("stats.detailed.losses")}</p>
              </div>
              <div>
                <h3>{stats["killAssists"]}</h3>
                <p>{t("stats.detailed.killAssists")}</p>
              </div>
              <div>
                <h3>{stats["winPercent"]}</h3>
                <p>{t("stats.detailed.winPercent")}</p>
              </div>
            </GridContainer>
            <p></p>
          </Box>
        </Spacing>
      );
    } else {
      return (
        <Spacing>
          <Box>
            <h3>{t("stats.detailedName")}</h3>
            <p></p>
            <GridContainer>
              <div>
                <h3>{stats["scorePerMinute"]}</h3>
                <p>{t("stats.detailed.scorePerMinute")}</p>
              </div>
              <div>
                <h3>{stats["kills"]}</h3>
                <p>{t("stats.detailed.kills")}</p>
              </div>
              <div>
                <h3>{stats["deaths"]}</h3>
                <p>{t("stats.detailed.deaths")}</p>
              </div>
              <div>
                <h3>{stats["wins"]}</h3>
                <p>{t("stats.detailed.wins")}</p>
              </div>
              <div>
                <h3>{stats["loses"]}</h3>
                <p>{t("stats.detailed.losses")}</p>
              </div>
              <div>
                <h3>{stats["killAssists"]}</h3>
                <p>{t("stats.detailed.killAssists")}</p>
              </div>
              <div>
                <h3>{stats["repairs"]}</h3>
                <p>{t("stats.detailed.repairs")}</p>
              </div>
              <div>
                <h3>{stats["heals"]}</h3>
                <p>{t("stats.detailed.heals")}</p>
              </div>
              <div>
                <h3>{stats["avengerKills"]}</h3>
                <p>{t("stats.detailed.avengerKills")}</p>
              </div>
              <div>
                <h3>{stats["saviorKills"]}</h3>
                <p>{t("stats.detailed.saviorKills")}</p>
              </div>
              <div>
                <h3>{stats["winPercent"]}</h3>
                <p>{t("stats.detailed.winPercent")}</p>
              </div>
              <div>
                <h3>{stats["quits"]}</h3>
                <p>{t("stats.detailed.quits")}</p>
              </div>
            </GridContainer>
            <p></p>
          </Box>
        </Spacing>
      );
    }
  } else {
    return (
      <Spacing>
        <Box>
          <h3>{t("stats.detailedName")}</h3>
          <p>{t("loading")}</p>
        </Box>
      </Spacing>
    );
  }
}

const Title = styled.h3`
  margin: 0 33px;
  padding-bottom: 1rem;
`;

function dynamicSort(property: string) {
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a: {}, b: {}) {
    const result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

function ViewWeapons(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [sortType, setSortType] = React.useState<string>("-kills");
  let weapons = [];
  if (!props.loading && !props.error) {
    weapons = props.stats.weapons.filter(
      (item: { weaponName: string; accuracy: any; headshots: any }) => {
        if (
          typeof item.accuracy == "string" &&
          typeof item.headshots == "string"
        ) {
          item.accuracy = parseInt(item.accuracy.replace("%", ""));
          item.headshots = parseInt(item.headshots.replace("%", ""));
        }
        return item.weaponName.toLowerCase().includes(searchTerm.toLowerCase());
      },
    );
    weapons = weapons.sort(dynamicSort(sortType));
  }
  return (
    <Spacing>
      <Align>
        <Title>{t("stats.weapons")}</Title>
        <AlignW>
          <SmallSearchBox
            placeholder={t("stats.searchWeapon")}
            value={searchTerm}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setSearchTerm(ev.target.value)
            }
          />
          <SelectPrimary
            value={sortType}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
              setSortType(ev.target.value)
            }
          >
            <option value="weaponName">{t("stats.rows.weaponName")}</option>
            <option value="type">{t("stats.rows.type")}</option>
            <option value="-kills">{t("stats.rows.kills")}</option>
            <option value="-killsPerMinute">{t("stats.rows.kpm")}</option>
            <option value="-accuracy">{t("stats.rows.accuracy")}</option>
            <option value="-headshots">{t("stats.rows.headshots")}</option>
          </SelectPrimary>
        </AlignW>
      </Align>
      {weapons !== [] ? (
        <Box>
          {weapons.map((key: any, index: number) => {
            return (
              <Column key={index}>
                <Row>
                  <h4>{key.weaponName}</h4>
                  <WeaponImage src={key.image} />
                </Row>
                <Row>
                  <h4>{key.type}</h4>
                  <Description>{t("stats.rows.type")}</Description>
                </Row>
                <Row>
                  <h4>{key.kills}</h4>
                  <Description>{t("stats.rows.kills")}</Description>
                </Row>
                <Row>
                  <h4>{key.killsPerMinute}</h4>
                  <Description>{t("stats.rows.kpm")}</Description>
                </Row>
                <Row>
                  <h4>{key.accuracy}%</h4>
                  <Description>{t("stats.rows.accuracy")}</Description>
                </Row>
                <Row>
                  <h4>{key.headshots}%</h4>
                  <Description>{t("stats.rows.headshots")}</Description>
                </Row>
              </Column>
            );
          })}
        </Box>
      ) : (
        <Box>
          <p>{t("loading")}</p>
        </Box>
      )}
    </Spacing>
  );
}

function ViewVehicles(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [sortType, setSortType] = React.useState<string>("-kills");
  let vehicles = [];
  if (!props.loading && !props.error) {
    vehicles = props.stats.vehicles.filter((item: { vehicleName: string }) => {
      return item.vehicleName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    vehicles = vehicles.sort(dynamicSort(sortType));
  }
  return (
    <Spacing>
      <Align>
        <Title>{t("stats.vehicles")}</Title>
        <AlignW>
          <SmallSearchBox
            placeholder={t("stats.searchVehicle")}
            value={searchTerm}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setSearchTerm(ev.target.value)
            }
          />
          <SelectPrimary
            value={sortType}
            onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
              setSortType(ev.target.value)
            }
          >
            <option value="vehicleName">{t("stats.rows.vehicleName")}</option>
            <option value="type">{t("stats.rows.type")}</option>
            <option value="-kills">{t("stats.rows.kills")}</option>
            <option value="-killsPerMinute">{t("stats.rows.kpm")}</option>
            <option value="-destroyed">{t("stats.rows.destroyed")}</option>
          </SelectPrimary>
        </AlignW>
      </Align>
      {vehicles !== [] ? (
        <Box>
          {vehicles.map((key: any, index: number) => {
            return (
              <Column key={index}>
                <Row>
                  <h4>{key.vehicleName}</h4>
                  <WeaponImage src={key.image} />
                </Row>
                <Row>
                  <h4>{key.type}</h4>
                  <Description>{t("stats.rows.type")}</Description>
                </Row>
                <Row>
                  <h4>{key.kills}</h4>
                  <Description>{t("stats.rows.kills")}</Description>
                </Row>
                <Row>
                  <h4>{key.killsPerMinute}</h4>
                  <Description>{t("stats.rows.kpm")}</Description>
                </Row>
                <Row>
                  <h4>{key.destroyed}</h4>
                  <Description>{t("stats.rows.destroyed")}</Description>
                </Row>
              </Column>
            );
          })}
        </Box>
      ) : (
        <Box>
          <p>{t("loading")}</p>
        </Box>
      )}
    </Spacing>
  );
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
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
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
    </Container>
  );
}

export default Stats;
