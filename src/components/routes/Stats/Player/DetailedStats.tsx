import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import { Box, GridContainer } from "../../../Materials";
import { newTitles } from "../../../../api/static";
import { Spacing, Views } from "./Main";
import { MainStats } from "../../../../api/ReturnTypes";

export interface MaybeStat {
  stat: string;
  name: string;
}

export function MaybeStats({ stat, name }: MaybeStat): React.ReactElement {
  if (stat === "NaN" || Number.isNaN(stat) || stat === undefined) return <></>;

  return (
    <div>
      <h3>{stat}</h3>
      <p>{name}</p>
    </div>
  );
}

export function DetailedStats(props: Views): React.ReactElement {
  const { t } = useTranslation();
  const stats = props.stats;
  const getLanguage = () => window.localStorage.i18nextLng;
  const numberFormat = new Intl.NumberFormat(getLanguage());
  if (!props.loading && !props.error) {
    return (
      <Spacing>
        <Box>
          <h3>{t("stats.detailedName")}</h3>
          <p></p>
          <GridContainer>
            <MaybeStats
              stat={numberFormat.format(stats?.skill)}
              name={t("stats.detailed.skill")}
            />
            <MaybeStats
              stat={numberFormat.format(stats?.scorePerMinute)}
              name={t("stats.detailed.scorePerMinute")}
            />
            <MaybeStats
              stat={numberFormat.format(stats?.kills)}
              name={t("stats.detailed.kills")}
            />
            <MaybeStats
              stat={numberFormat.format(stats?.deaths)}
              name={t("stats.detailed.deaths")}
            />
            {newTitles.includes(props.game) ? (
              <div>
                <h3>{numberFormat.format(stats?.headShots)}%</h3>
                <p>{t("stats.detailed.headshotPercent")}</p>
              </div>
            ) : (
              <div>
                <h3>{numberFormat.format(stats?.headshots)}%</h3>
                <p>{t("stats.detailed.headshotPercent")}</p>
              </div>
            )}
            <MaybeStats
              stat={numberFormat.format(stats?.killAssists)}
              name={t("stats.detailed.killAssists")}
            />
            <MaybeStats
              stat={numberFormat.format(stats?.wins)}
              name={t("stats.detailed.wins")}
            />
            <MaybeStats
              stat={numberFormat.format(stats?.loses)}
              name={t("stats.detailed.losses")}
            />
            <MaybeStats
              stat={numberFormat.format(stats?.revives)}
              name={t("stats.detailed.revives")}
            />
            <MaybeStats
              stat={numberFormat.format(stats?.repairs)}
              name={t("stats.detailed.repairs")}
            />
            <MaybeStats
              stat={numberFormat.format(stats?.infantryKillDeath)}
              name={t("stats.detailed.infantryKillDeath")}
            />
            <MaybeStats
              stat={numberFormat.format(stats?.infantryKillsPerMinute)}
              name={t("stats.detailed.infantryKillsPerMinute")}
            />
            <MaybeStats
              stat={numberFormat.format(stats?.heals)}
              name={t("stats.detailed.heals")}
            />
            <MaybeStats
              stat={numberFormat.format(stats?.headShots)}
              name={t("stats.detailed.headShots")}
            />
            <MaybeStats
              stat={numberFormat.format(stats?.avengerKills)}
              name={t("stats.detailed.avengerKills")}
            />
            <MaybeStats
              stat={numberFormat.format(stats?.saviorKills)}
              name={t("stats.detailed.saviorKills")}
            />
            <MaybeStats
              stat={numberFormat.format(stats?.roundsPlayed)}
              name={t("stats.detailed.roundsPlayed")}
            />
            <MaybeStats
              stat={numberFormat.format(stats?.awardScore)}
              name={t("stats.detailed.awardScore")}
            />
            <MaybeStats
              stat={numberFormat.format(stats?.bonusScore)}
              name={t("stats.detailed.bonusScore")}
            />
            <MaybeStats
              stat={numberFormat.format(stats?.squadScore)}
              name={t("stats.detailed.squadScore")}
            />
            <MaybeStats
              stat={numberFormat.format(stats?.longestHeadShot)}
              name={t("stats.detailed.longestHeadShot")}
            />
            <MaybeStats
              stat={numberFormat.format(stats?.highestKillStreak)}
              name={t("stats.detailed.highestKillStreak")}
            />
            <MaybeStats
              stat={numberFormat.format(stats?.winPercent)}
              name={t("stats.detailed.winPercent")}
            />
            <MaybeStats
              stat={numberFormat.format(stats?.quits)}
              name={t("stats.detailed.quits")}
            />
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
          <p>{t("loading")}</p>
        </Box>
      </Spacing>
    );
  }
}
