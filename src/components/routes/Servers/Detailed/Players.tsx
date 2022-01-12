import * as React from "react";
import "../../../../locales/config";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../../assets/scss/App.scss";
import { GametoolsApi } from "../../../../api/GametoolsApi";
import { useQuery } from "react-query";
import {
  Align,
  AlignW,
  Box,
  Row,
  Column,
  ButtonLink,
  PhoneRow,
} from "../../../Materials";
import { serverPlayer, serverTeamList } from "../../../../api/ReturnTypes";
import { factions } from "../../../../api/Factions";
import { ConLink, Description, Spacing, Title } from "./Servers";

export function ServerPlayerlist(props: {
  game: string;
  gameid: string;
}): React.ReactElement {
  const { t } = useTranslation();
  const gameId = props.gameid;
  const ConditionalLink = ({ children, to, condition }: ConLink) =>
    !!condition && to ? <Link to={to}>{children}</Link> : <>{children}</>;
  const {
    isLoading: loading,
    isError: error,
    data: stats,
  } = useQuery("serverPlayerlist" + gameId, () =>
    GametoolsApi.serverPlayerlist({
      game: props.game,
      gameId: gameId,
    }),
  );
  if (!loading && !error) {
    const teams = stats.teams;
    return (
      <Spacing>
        <Align>
          <h2>{t("servers.playerlist.main")}</h2>
        </Align>
        {teams !== null ? (
          <>
            {teams.map((teamInfo: serverTeamList, index: number) => {
              return (
                <div key={index}>
                  <Align>
                    <h3 style={{ margin: ".5rem", marginTop: 0 }}>
                      {teamInfo.faction in factions
                        ? t(`servers.factions.${teamInfo.faction}`)
                        : t(`servers.factions.${teamInfo.teamid}`)}
                    </h3>
                  </Align>
                  <Box>
                    {teamInfo.players.length !== 0 ? (
                      <>
                        {teamInfo.players.map(
                          (key: serverPlayer, index: number) => {
                            const dateAdded = new Date(key.join_time / 1000);
                            return (
                              <Column key={index}>
                                <Row>
                                  <AlignW>
                                    {props.game !== "bf2042" ? (
                                      <img
                                        src={`https://cdn.gametools.network/bf1/${key.rank}.png`}
                                        height="25px"
                                      />
                                    ) : (
                                      <></>
                                    )}
                                    <ConditionalLink
                                      condition={props.game !== "bf2042"}
                                      to={`/stats/pc/playerid/${
                                        key.player_id
                                      }?game=bf1&name=${encodeURIComponent(
                                        key.name,
                                      )}`}
                                    >
                                      <h4
                                        style={{
                                          maxWidth: "11rem",
                                          width: "auto",
                                          minWidth: "8rem",
                                          margin: "0.5rem",
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        {key.platoon !== "" &&
                                        key.platoon !== undefined
                                          ? `[${key.platoon}]`
                                          : ""}
                                        {key.name}
                                      </h4>
                                    </ConditionalLink>
                                  </AlignW>
                                </Row>
                                {props.game !== "bf2042" ? (
                                  <Row>
                                    <h4 style={{ marginTop: "0.5rem" }}>
                                      {key.latency}
                                    </h4>
                                    <Description style={{ lineHeight: 0 }}>
                                      {t("servers.playerlist.row.ping")}
                                    </Description>
                                  </Row>
                                ) : (
                                  <></>
                                )}
                                <Row>
                                  <h4 style={{ marginTop: "0.5rem" }}>
                                    {t("change", {
                                      change: dateAdded,
                                    })}
                                  </h4>
                                  <Description style={{ lineHeight: 0 }}>
                                    {t("servers.playerlist.row.timePlayed")}
                                  </Description>
                                </Row>
                                {props.game !== "bf2042" ? (
                                  <PhoneRow>
                                    <ButtonLink
                                      style={{
                                        marginTop: ".5rem",
                                      }}
                                      href={`https://gametools.network/stats/pc/playerid/${
                                        key.player_id
                                      }?game=bf1&name=${encodeURIComponent(
                                        key.name,
                                      )}`}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {t("stats.view")}
                                    </ButtonLink>
                                  </PhoneRow>
                                ) : (
                                  <></>
                                )}
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
  return (
    <Spacing>
      <Title>{t("servers.playerlist.main")}</Title>
      <Description>{t("loading")}</Description>
    </Spacing>
  );
}
