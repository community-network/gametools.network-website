import * as React from "react";
import "../../../locales/config";
import { useTranslation } from "react-i18next";
import { Box, GridContainer } from "../../Materials";
import { newTitles } from "../../../api/static";
import { Spacing, Views } from "./Main";

export function DetailedStats(props: Views): React.ReactElement {
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
                <h3>{stats.skill}</h3>
                <p>{t("stats.detailed.skill")}</p>
              </div>
              <div>
                <h3>{stats.scorePerMinute}</h3>
                <p>{t("stats.detailed.scorePerMinute")}</p>
              </div>
              <div>
                <h3>{stats.kills}</h3>
                <p>{t("stats.detailed.kills")}</p>
              </div>
              <div>
                <h3>{stats.deaths}</h3>
                <p>{t("stats.detailed.deaths")}</p>
              </div>
              <div>
                <h3>{stats.headshots}</h3>
                <p>{t("stats.detailed.headshotPercent")}</p>
              </div>
              <div>
                <h3>{stats.killAssists}</h3>
                <p>{t("stats.detailed.killAssists")}</p>
              </div>
              <div>
                <h3>{stats.wins}</h3>
                <p>{t("stats.detailed.wins")}</p>
              </div>
              <div>
                <h3>{stats.loses}</h3>
                <p>{t("stats.detailed.losses")}</p>
              </div>
              <div>
                <h3>{stats.revives}</h3>
                <p>{t("stats.detailed.revives")}</p>
              </div>
              <div>
                <h3>{stats.repairs}</h3>
                <p>{t("stats.detailed.repairs")}</p>
              </div>
              <div>
                <h3>{stats.infantryKillDeath}</h3>
                <p>{t("stats.detailed.infantryKillDeath")}</p>
              </div>
              <div>
                <h3>{stats.infantryKillsPerMinute}</h3>
                <p>{t("stats.detailed.infantryKillsPerMinute")}</p>
              </div>
              <div>
                <h3>{stats.heals}</h3>
                <p>{t("stats.detailed.heals")}</p>
              </div>
              <div>
                <h3>{stats.headShots}</h3>
                <p>{t("stats.detailed.headShots")}</p>
              </div>
              <div>
                <h3>{stats.avengerKills}</h3>
                <p>{t("stats.detailed.avengerKills")}</p>
              </div>
              <div>
                <h3>{stats.saviorKills}</h3>
                <p>{t("stats.detailed.saviorKills")}</p>
              </div>
              <div>
                <h3>{stats.roundsPlayed}</h3>
                <p>{t("stats.detailed.roundsPlayed")}</p>
              </div>
              <div>
                <h3>{stats.awardScore}</h3>
                <p>{t("stats.detailed.awardScore")}</p>
              </div>
              <div>
                <h3>{stats.bonusScore}</h3>
                <p>{t("stats.detailed.bonusScore")}</p>
              </div>
              <div>
                <h3>{stats.squadScore}</h3>
                <p>{t("stats.detailed.squadScore")}</p>
              </div>
              <div>
                <h3>{stats.longestHeadShot}</h3>
                <p>{t("stats.detailed.longestHeadShot")}</p>
              </div>
              <div>
                <h3>{stats.highestKillStreak}</h3>
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
                <h3>{stats.scorePerMinute}</h3>
                <p>{t("stats.detailed.scorePerMinute")}</p>
              </div>
              <div>
                <h3>{stats.kills}</h3>
                <p>{t("stats.detailed.kills")}</p>
              </div>
              <div>
                <h3>{stats.deaths}</h3>
                <p>{t("stats.detailed.deaths")}</p>
              </div>
              <div>
                <h3>{stats.wins}</h3>
                <p>{t("stats.detailed.wins")}</p>
              </div>
              <div>
                <h3>{stats.loses}</h3>
                <p>{t("stats.detailed.losses")}</p>
              </div>
              <div>
                <h3>{stats.killAssists}</h3>
                <p>{t("stats.detailed.killAssists")}</p>
              </div>
              <div>
                <h3>{stats.winPercent}</h3>
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
                <h3>{stats.scorePerMinute}</h3>
                <p>{t("stats.detailed.scorePerMinute")}</p>
              </div>
              <div>
                <h3>{stats.kills}</h3>
                <p>{t("stats.detailed.kills")}</p>
              </div>
              <div>
                <h3>{stats.deaths}</h3>
                <p>{t("stats.detailed.deaths")}</p>
              </div>
              <div>
                <h3>{stats.wins}</h3>
                <p>{t("stats.detailed.wins")}</p>
              </div>
              <div>
                <h3>{stats.loses}</h3>
                <p>{t("stats.detailed.losses")}</p>
              </div>
              <div>
                <h3>{stats.killAssists}</h3>
                <p>{t("stats.detailed.killAssists")}</p>
              </div>
              <div>
                <h3>{stats.repairs}</h3>
                <p>{t("stats.detailed.repairs")}</p>
              </div>
              <div>
                <h3>{stats.heals}</h3>
                <p>{t("stats.detailed.heals")}</p>
              </div>
              <div>
                <h3>{stats.avengerKills}</h3>
                <p>{t("stats.detailed.avengerKills")}</p>
              </div>
              <div>
                <h3>{stats.saviorKills}</h3>
                <p>{t("stats.detailed.saviorKills")}</p>
              </div>
              <div>
                <h3>{stats.winPercent}</h3>
                <p>{t("stats.detailed.winPercent")}</p>
              </div>
              <div>
                <h3>{stats.quits}</h3>
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