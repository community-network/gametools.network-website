import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import { AlignS, Align, Box } from "../../../Materials";
import { Spacing, Title, Description, Views } from "./Main";
import {
  MainStatsSession,
  SessionGamemode,
  SessionKit,
} from "../../../../api/ReturnTypes";
import { addSeconds } from "date-fns";

export function BfSessionInfo(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const stats = props.stats;
  if (!props.loading && !props.error && stats.sessions.length === 0) {
    return <></>;
  } else if (!props.loading && !props.error) {
    return (
      <Spacing>
        <Align>
          <Title>{t("stats.playSession.main")}</Title>
          <p style={{ marginTop: 0 }}>{t("stats.playSession.detailed")}</p>
        </Align>
        <Box>
          {stats.sessions.map((key: MainStatsSession, index: number) => {
            const gamemodes = [];
            const stats = key.stats;
            key.stats.gamemodes.map((key: SessionGamemode) => {
              if (key.score !== 0) {
                gamemodes.push(
                  t(`stats.playSession.stats.gamemodes.${key.name}`),
                );
              }
            });
            const kits = stats.kits.filter((kit) => kit.timePlayed !== 0);
            return (
              <>
                <h3>
                  {t("dateTime", { date: new Date(key.timeStamp) })} -{" "}
                  {gamemodes.join("/")} (
                  {t("change", {
                    change: addSeconds(new Date(), key.stats.timePlayed),
                  })}
                  )
                </h3>
                <Description>{key.serverName}</Description>
                <AlignS style={{ marginTop: "0.8rem" }}>
                  <div>
                    <h3>{stats.kills}</h3>
                    <p>{t("stats.playSession.stats.kills")}</p>
                  </div>
                  <div>
                    <h3>{stats.deaths}</h3>
                    <p>{t("stats.playSession.stats.deaths")}</p>
                  </div>
                  <div>
                    <h3>{stats.wins}</h3>
                    <p>{t("stats.playSession.stats.wins")}</p>
                  </div>
                  <div>
                    <h3>{stats.losses}</h3>
                    <p>{t("stats.playSession.stats.losses")}</p>
                  </div>
                </AlignS>
                <hr
                  style={{
                    marginBottom: "1rem",
                    width: "90%",
                    border: "1px solid #282a3a",
                  }}
                />
                <Align>
                  {kits.map((key: SessionKit, index: number) => {
                    return (
                      <div
                        key={index}
                        style={{ marginRight: "3rem", marginBottom: "1rem" }}
                      >
                        <h3 style={{ marginBottom: 0 }}>{key.name}</h3>
                        <Align>
                          <div style={{ marginRight: "1rem" }}>
                            <Description style={{ margin: 0 }}>
                              {t("stats.playSession.stats.score")}
                            </Description>
                            <Description style={{ margin: 0 }}>
                              {t("stats.playSession.stats.kills")}
                            </Description>
                            <Description style={{ margin: 0 }}>
                              {t("stats.playSession.stats.timePlayedAs")}
                            </Description>
                          </div>
                          <div>
                            <h4 style={{ margin: 0 }}>{key.score}</h4>
                            <h4 style={{ margin: 0 }}>{key.kills}</h4>
                            <h4 style={{ margin: 0 }}>
                              {t("change", {
                                change: addSeconds(new Date(), key.timePlayed),
                              })}
                            </h4>
                          </div>
                        </Align>
                      </div>
                    );
                  })}
                </Align>
                {typeof props.stats.sessions[index + 1] !== "undefined" ? (
                  <hr
                    style={{
                      marginBottom: "1rem",
                      width: "98%",
                      border: "1px solid #282a3a",
                    }}
                  />
                ) : (
                  <></>
                )}
              </>
            );
          })}
        </Box>
      </Spacing>
    );
  } else {
    return (
      <Spacing>
        <Align>
          <Title>{t("stats.playSession.main")}</Title>
          <p style={{ marginTop: 0 }}>{t("stats.playSession.detailed")}</p>
        </Align>
        <Box>
          <p>{t("loading")}</p>
        </Box>
      </Spacing>
    );
  }
}
