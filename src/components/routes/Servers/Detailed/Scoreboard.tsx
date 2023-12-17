import * as React from "react";
import "../../../../locales/config";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../../assets/scss/App.scss";
import {
  Align,
  AlignW,
  Box,
  Row,
  Column,
  ButtonLink,
  PhoneRow,
} from "../../../Materials";
import { ScoreServerPlayer, ScoreTeamList } from "../../../../api/ReturnTypes";
import { Description, Spacing, Title } from "./Servers";

export function ServerScoreboard(props: {
  game: string;
  platform: string;
  stats: ScoreTeamList[];
}): React.ReactElement {
  const teams = props.stats;
  const { t } = useTranslation();
  const getLanguage = () => window.localStorage.i18nextLng;
  const numberFormat = new Intl.NumberFormat(getLanguage());
  return (
    <Spacing>
      <Title>{t("servers.playerlist.main")}</Title>
      {teams !== null ? (
        <>
          {teams.map((teamInfo: ScoreTeamList, index: number) => {
            return (
              <div key={index}>
                <Align>
                  <h3 style={{ margin: ".5rem", marginTop: 0 }}>
                    {t(`servers.factions.${teamInfo.teamid}`)}
                  </h3>
                </Align>
                <Box>
                  {teamInfo.players.length !== 0 ? (
                    <>
                      {teamInfo.players.map(
                        (key: ScoreServerPlayer, index: number) => {
                          return (
                            <Column key={index}>
                              <Row>
                                <AlignW>
                                  {props.game !== "bf2042" && (
                                    <img
                                      src={`https://cdn.gametools.network/${props.game}/${key.rank}.webp`}
                                      height="25px"
                                      loading="lazy"
                                    />
                                  )}
                                  <Link
                                    to={`/stats/${props.platform}/playerid/${
                                      key.player_id
                                    }?game=${
                                      props.game
                                    }&name=${encodeURIComponent(key.name)}`}
                                  >
                                    <>
                                      <h4
                                        style={{
                                          maxWidth: "11rem",
                                          width: "auto",
                                          minWidth: "8rem",
                                          margin: "0.5rem",
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        {key.tag !== "" && key.tag !== undefined
                                          ? `[${key.tag}]`
                                          : ""}
                                        {key.name}
                                      </h4>
                                    </>
                                  </Link>
                                </AlignW>
                              </Row>
                              <Row style={{ flex: 0.4 }}>
                                <h4 style={{ marginTop: "0.5rem" }}>
                                  {numberFormat.format(key.score)}
                                </h4>
                                <Description style={{ lineHeight: 0 }}>
                                  {t("servers.leaderboard.row.score")}
                                </Description>
                              </Row>
                              <Row style={{ flex: 0.4 }}>
                                <h4 style={{ marginTop: "0.5rem" }}>
                                  {numberFormat.format(key.kills)}
                                </h4>
                                <Description style={{ lineHeight: 0 }}>
                                  {t("servers.leaderboard.row.kills")}
                                </Description>
                              </Row>
                              <Row style={{ flex: 0.4 }}>
                                <h4 style={{ marginTop: "0.5rem" }}>
                                  {numberFormat.format(key.deaths)}
                                </h4>
                                <Description style={{ lineHeight: 0 }}>
                                  {t("servers.leaderboard.row.deaths")}
                                </Description>
                              </Row>
                              <PhoneRow>
                                <ButtonLink
                                  style={{
                                    marginTop: ".5rem",
                                  }}
                                  href={`https://gametools.network/stats/${
                                    props.platform
                                  }/playerid/${key.player_id}?game=${
                                    props.game
                                  }&name=${encodeURIComponent(key.name)}`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {t("stats.view")}
                                </ButtonLink>
                              </PhoneRow>
                            </Column>
                          );
                        },
                      )}
                    </>
                  ) : (
                    <p>{t("servers.playerlist.empty")}</p>
                  )}
                </Box>
              </div>
            );
          })}
        </>
      ) : (
        <Box>
          <p>{t("servers.playerlist.empty")}</p>
        </Box>
      )}
    </Spacing>
  );
}
