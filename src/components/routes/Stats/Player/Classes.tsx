import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import { Box, Column, Row } from "../../../Materials";
import { Spacing, Views, ListImage } from "./Main";
import { MainStatsClasses } from "../../../../api/ReturnTypes";
import { addSeconds } from "date-fns";

export function ViewClasses(props: Views): React.ReactElement {
  const { t, i18n } = useTranslation();
  const getLanguage = () => window.localStorage.i18nextLng;
  const numberFormat = new Intl.NumberFormat(getLanguage());
  if (!props.loading && !props.error) {
    const classes = props.stats.classes;
    return (
      <Spacing>
        <Box>
          <>
            <h3>{t("stats.classes.main")}</h3>
            {classes.map((key: MainStatsClasses, index: number) => {
              return (
                <div key={index}>
                  <Column>
                    <Row>
                      <h4 style={{ margin: 0 }}>
                        {props.game === "bf2042" ? (
                          <>{key.statName}</>
                        ) : (
                          <>
                            {i18n.exists(`stats.classes.${key.className}`)
                              ? t(`stats.classes.${key.className}`)
                              : key.className}
                          </>
                        )}
                      </h4>
                      <ListImage style={{ height: "3rem" }} src={key.image} />
                    </Row>
                    {key?.score !== undefined && (
                      <Row>
                        <h4 style={{ margin: 0 }}>
                          {numberFormat.format(key.score)}
                        </h4>
                        <p>{t("stats.classes.amounts.score")}</p>
                      </Row>
                    )}
                    {key?.kills !== undefined && (
                      <Row>
                        <h4 style={{ margin: 0 }}>
                          {numberFormat.format(key.kills)}
                        </h4>
                        <p>{t("stats.classes.amounts.kills")}</p>
                      </Row>
                    )}
                    {key?.kpm !== undefined && (
                      <Row>
                        <h4 style={{ margin: 0 }}>
                          {numberFormat.format(key.kpm)}
                        </h4>
                        <p>{t("stats.classes.amounts.kpm")}</p>
                      </Row>
                    )}
                    {key?.secondsPlayed !== undefined && (
                      <Row>
                        <h4 style={{ margin: 0 }}>
                          {t("change", {
                            change: addSeconds(new Date(), key.secondsPlayed),
                          })}
                        </h4>
                        <p>{t("stats.classes.amounts.timePlayed")}</p>
                      </Row>
                    )}
                  </Column>
                </div>
              );
            })}
          </>
        </Box>
      </Spacing>
    );
  } else {
    return (
      <Spacing>
        <Box>
          <h3>{t("stats.classes.main")}</h3>
          <p>{t("loading")}</p>
        </Box>
      </Spacing>
    );
  }
}
