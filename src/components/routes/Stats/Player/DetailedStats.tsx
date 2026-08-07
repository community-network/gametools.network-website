import * as React from "react";
import { useTranslation } from "react-i18next";
import { newTitles } from "../../../../api/static";
import "../../../../locales/config";
import { Box } from "../../../Materials";
import styles from "./DetailedStats.module.scss";
import { ComponentHandling, type Views } from "./Main";
import Mainstyles from "./Main.module.scss";

export interface MaybeStat {
  stat: string;
  name: string;
}

export function MaybeStats({
  stat,
  name,
}: Readonly<MaybeStat>): React.ReactElement {
  if (stat === "NaN" || Number.isNaN(stat) || stat === undefined) return <></>;

  return (
    <div>
      <h3>{stat}</h3>
      <p>{name}</p>
    </div>
  );
}

export function DetailedStats(props: Readonly<Views>): React.ReactElement {
  const { t } = useTranslation();
  const stats = props.stats;
  const getLanguage = () => window.localStorage.i18nextLng;
  const numberFormat = new Intl.NumberFormat(getLanguage());

  if (props.isError || props.isLoading) {
    return (
      <div className={Mainstyles.spacing}>
        <Box>
          <h3>{t("stats.detailedName")}</h3>
          <p>{ComponentHandling(t, props)}</p>
        </Box>
      </div>
    );
  }

  return (
    <div className={Mainstyles.spacing}>
      <Box>
        <h3>{t("stats.detailedName")}</h3>
        <p></p>
        <div className={styles.gridContainer}>
          <MaybeStats
            stat={numberFormat.format(stats?.skill || 0)}
            name={t("stats.detailed.skill")}
          />
          <MaybeStats
            stat={numberFormat.format(stats?.scorePerMinute || 0)}
            name={t("stats.detailed.scorePerMinute")}
          />
          <MaybeStats
            stat={numberFormat.format(stats?.kills || 0)}
            name={t("stats.detailed.kills")}
          />
          <MaybeStats
            stat={numberFormat.format(stats?.deaths || 0)}
            name={t("stats.detailed.deaths")}
          />
          {newTitles.includes(props.game) ? (
            <div>
              <h3>{numberFormat.format(stats?.headShots || 0)}%</h3>
              <p>{t("stats.detailed.headshotPercent")}</p>
            </div>
          ) : (
            <div>
              <h3>{numberFormat.format(stats?.headshots || 0)}%</h3>
              <p>{t("stats.detailed.headshotPercent")}</p>
            </div>
          )}
          <MaybeStats
            stat={numberFormat.format(stats?.killAssists || 0)}
            name={t("stats.detailed.killAssists")}
          />
          <MaybeStats
            stat={numberFormat.format(stats?.wins || 0)}
            name={t("stats.detailed.wins")}
          />
          <MaybeStats
            stat={numberFormat.format(stats?.loses || 0)}
            name={t("stats.detailed.losses")}
          />
          <MaybeStats
            stat={numberFormat.format(stats?.revives || 0)}
            name={t("stats.detailed.revives")}
          />
          <MaybeStats
            stat={numberFormat.format(stats?.repairs || 0)}
            name={t("stats.detailed.repairs")}
          />
          <MaybeStats
            stat={numberFormat.format(stats?.infantryKillDeath || 0)}
            name={t("stats.detailed.infantryKillDeath")}
          />
          <MaybeStats
            stat={numberFormat.format(stats?.infantryKillsPerMinute || 0)}
            name={t("stats.detailed.infantryKillsPerMinute")}
          />
          <MaybeStats
            stat={numberFormat.format(stats?.heals || 0)}
            name={t("stats.detailed.heals")}
          />
          <MaybeStats
            stat={numberFormat.format(stats?.headShots || 0)}
            name={t("stats.detailed.headShots")}
          />
          <MaybeStats
            stat={numberFormat.format(stats?.avengerKills || 0)}
            name={t("stats.detailed.avengerKills")}
          />
          <MaybeStats
            stat={numberFormat.format(stats?.saviorKills || 0)}
            name={t("stats.detailed.saviorKills")}
          />
          <MaybeStats
            stat={numberFormat.format(stats?.roundsPlayed || 0)}
            name={t("stats.detailed.roundsPlayed")}
          />
          <MaybeStats
            stat={numberFormat.format(stats?.awardScore || 0)}
            name={t("stats.detailed.awardScore")}
          />
          <MaybeStats
            stat={numberFormat.format(stats?.bonusScore || 0)}
            name={t("stats.detailed.bonusScore")}
          />
          <MaybeStats
            stat={numberFormat.format(stats?.squadScore || 0)}
            name={t("stats.detailed.squadScore")}
          />
          <MaybeStats
            stat={numberFormat.format(stats?.longestHeadShot || 0)}
            name={t("stats.detailed.longestHeadShot")}
          />
          <MaybeStats
            stat={numberFormat.format(stats?.highestKillStreak || 0)}
            name={t("stats.detailed.highestKillStreak")}
          />
          <MaybeStats
            stat={numberFormat.format(stats?.winPercent || 0)}
            name={t("stats.detailed.winPercent")}
          />
          <MaybeStats
            stat={numberFormat.format(stats?.quits || 0)}
            name={t("stats.detailed.quits")}
          />
        </div>
        <p></p>
      </Box>
    </div>
  );
}
