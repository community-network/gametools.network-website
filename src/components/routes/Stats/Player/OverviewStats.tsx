import { addSeconds } from "date-fns";
import * as React from "react";
import { useTranslation } from "react-i18next";
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
import "../../../../locales/config";
import exportExcel from "../../../functions/exportExcel";
import useExternalScript from "../../../functions/UseExternalScript";
import { Box } from "../../../Materials";
import { ComponentHandling, Views } from "./Main";
import * as Mainstyles from "./Main.module.scss";
import * as styles from "./OverviewStats.module.scss";

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
    <button
      className="smallButtonPrimary"
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
    </button>
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

  if (props.isError || props.isLoading) {
    return (
      <div className={Mainstyles.spacing}>
        <Box>
          <h3>{t("stats.overview")}</h3>
          <p>{ComponentHandling(t, props)}</p>
        </Box>
      </div>
    );
  }

  for (const [key, value] of Object.entries(stats)) {
    if (value instanceof Array) {
      otherStats[key] = value;
      // skip current platoon for example
    } else if (!(value instanceof Object)) {
      mainStats.push({ item: key, value: value });
    }
  }

  return (
    <div className={Mainstyles.spacing}>
      <Box>
        <h3>{t("stats.overview")}</h3>
        <p>{t("stats.overviewDescription")}</p>
        {stats?.rank !== undefined && (
          <>
            <div className="alignS">
              <div>
                <h3>{stats?.rank}</h3>
                <p>{t("stats.main.rank")}</p>
              </div>
            </div>
            <div className={Mainstyles.backgroundBar}>
              <div
                className={Mainstyles.bar}
                style={{
                  width: `${
                    (100 * stats.currentRankProgress) / stats.totalRankProgress
                  }%`,
                }}
              ></div>
            </div>
          </>
        )}
        <p></p>
        <div className="alignS">
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
        </div>
        <p></p>
        {!!stats?.secondsPlayed && (
          <div className={styles.bottomOfBox}>
            <p style={{ margin: 0 }}>
              {t("stats.main.timePlayed")}{" "}
              <span className={styles.whiteText}>
                {t("change", {
                  change: addSeconds(new Date(), stats?.secondsPlayed),
                })}
              </span>
            </p>
          </div>
        )}
        <ExportButton
          mainStats={mainStats}
          otherStats={otherStats}
          game={props.game}
          stats={stats}
        />
      </Box>
    </div>
  );
}
