import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import { Box, AlignS, SmallButtonPrimary } from "../../../Materials";
import { BackgroundBar, Bar, Spacing, Views } from "./Main";
import styled from "styled-components";
import { addSeconds } from "date-fns";
import exportExcel from "../../../functions/exportExcel";
import useExternalScript from "../../../functions/UseExternalScript";
import {
  MainStats,
  MainStatsClasses,
  MainStatsGadgets,
  MainStatsGamemode,
  MainStatsPlatoon,
  MainStatsProgress,
  MainStatsSession,
  MainStatsVehicle,
  MainStatsWeapon,
} from "../../../../api/ReturnTypes";

const BottomOfBox = styled.div`
  display: inline-block;
  line-height: 0;
`;

const WhiteText = styled.span`
  color: white;
  margin-left: 0.5rem;
`;

function ExportButton(
  props: Readonly<{
    mainStats: { item: string; value: number | string | boolean }[];
    otherStats: {
      [string: string]:
        | MainStatsPlatoon[]
        | MainStatsSession[]
        | MainStatsProgress[]
        | MainStatsGamemode[]
        | MainStatsClasses[]
        | MainStatsVehicle[]
        | MainStatsWeapon[]
        | MainStatsGadgets[];
    };
    game: string;
    stats: MainStats;
  }>,
) {
  const externalScript =
    "https://cdn.sheetjs.com/xlsx-0.20.0/package/dist/xlsx.mini.min.js";
  const { t } = useTranslation();
  const state = useExternalScript(externalScript);
  let stateString = "";
  switch (state) {
    case "loading":
      stateString = t("loading");
      break;
    case "error":
      stateString = t("externalScriptError");
      break;
    default:
      stateString = t("export");
      break;
  }
  return (
    <SmallButtonPrimary
      style={{ margin: 0, marginTop: "1rem" }}
      disabled={state !== "ready"}
      onClick={() =>
        exportExcel(
          {
            main: props.mainStats,
            ...props.otherStats,
          },
          `${props.stats.userName} ${props.game} stats`,
        )
      }
    >
      {stateString}
    </SmallButtonPrimary>
  );
}

export function ViewStats(props: Readonly<Views>): React.ReactElement {
  const { t } = useTranslation();
  const stats = props.stats;
  const getLanguage = () => window.localStorage.i18nextLng;
  const numberFormat = new Intl.NumberFormat(getLanguage());
  const mainStats: { item: string; value: number | string | boolean }[] = [];
  const otherStats: {
    [string: string]:
      | MainStatsPlatoon[]
      | MainStatsSession[]
      | MainStatsProgress[]
      | MainStatsGamemode[]
      | MainStatsClasses[]
      | MainStatsVehicle[]
      | MainStatsWeapon[]
      | MainStatsGadgets[];
  } = {};

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
          {stats?.rank !== undefined && (
            <>
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
                      (100 * stats.currentRankProgress) /
                      stats.totalRankProgress
                    }%`,
                  }}
                ></Bar>
              </BackgroundBar>
            </>
          )}
          <p></p>
          <AlignS>
            <div>
              <h3>{numberFormat.format(stats?.killDeath)}</h3>
              <p>{t("stats.main.killDeath")}</p>
            </div>
            {!!stats?.killsPerMinute && (
              <div>
                <h3>{numberFormat.format(stats?.killsPerMinute)}</h3>
                <p>{t("stats.main.killsPerMinute")}</p>
              </div>
            )}
            <div>
              <h3>{numberFormat.format(stats?.winPercent)}%</h3>
              <p>{t("stats.main.winPercent")}</p>
            </div>
            {!!stats?.bestClass && (
              <div>
                <h3>{stats?.bestClass}</h3>
                <p>{t("stats.main.bestClass")}</p>
              </div>
            )}
            <div>
              <h3>{numberFormat.format(stats?.accuracy)}%</h3>
              <p>{t("stats.main.accuracy")}</p>
            </div>
          </AlignS>
          <p></p>
          {!!stats?.secondsPlayed && (
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
          )}
          <ExportButton
            mainStats={mainStats}
            otherStats={otherStats}
            game={props.game}
            stats={stats}
          />
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
