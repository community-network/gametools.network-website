import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import { Box, AlignS, SmallButtonPrimary } from "../../../Materials";
import { BackgroundBar, Bar, Spacing, Views } from "./Main";
import styled from "styled-components";
import { addSeconds } from "date-fns";
import exportExcel from "../../../functions/exportExcel";

const BottomOfBox = styled.div`
  display: inline-block;
  line-height: 0;
`;

const WhiteText = styled.span`
  color: white;
  margin-left: 0.5rem;
`;

export function ViewStats(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const stats = props.stats;
  const getLanguage = () => window.localStorage.i18nextLng;
  const numberFormat = new Intl.NumberFormat(getLanguage());
  const mainStats = [];
  const otherStats = {};

  if (!props.loading && !props.error) {
    for (const [key, value] of Object.entries(stats)) {
      if (value instanceof Array) {
        otherStats[key] = value;
        // skip current platoon for example
      } else if (!(value instanceof Object)) {
        mainStats.push({ item: key, value: value });
      }
    }

    return (
      <Spacing>
        <Box>
          <h3>{t("stats.overview")}</h3>
          <p>{t("stats.overviewDescription")}</p>
          <AlignS>
            <div>
              <h3>{stats?.rank}</h3>
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
              <h3>{numberFormat.format(stats?.killDeath)}</h3>
              <p>{t("stats.main.killDeath")}</p>
            </div>
            <div>
              <h3>{numberFormat.format(stats?.killsPerMinute)}</h3>
              <p>{t("stats.main.killsPerMinute")}</p>
            </div>
            <div>
              <h3>{numberFormat.format(stats?.winPercent)}%</h3>
              <p>{t("stats.main.winPercent")}</p>
            </div>
            <div>
              <h3>{stats?.bestClass}</h3>
              <p>{t("stats.main.bestClass")}</p>
            </div>
            <div>
              <h3>{numberFormat.format(stats?.accuracy)}%</h3>
              <p>{t("stats.main.accuracy")}</p>
            </div>
          </AlignS>
          <p></p>
          <BottomOfBox>
            <p style={{ margin: 0 }}>
              {t("stats.main.timePlayed")}{" "}
              <WhiteText>
                {t("change", {
                  change: addSeconds(new Date(), stats?.secondsPlayed),
                })}
              </WhiteText>
            </p>
          </BottomOfBox>
          {/* export stats */}
          <SmallButtonPrimary
            style={{ margin: 0, marginTop: "1rem" }}
            onClick={() =>
              exportExcel(
                {
                  main: mainStats,
                  ...otherStats,
                },
                `${stats.userName} ${props.game} stats`,
              )
            }
          >
            {t("export")}
          </SmallButtonPrimary>
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
