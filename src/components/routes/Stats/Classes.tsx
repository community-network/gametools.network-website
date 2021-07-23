import * as React from "react";
import "../../../locales/config";
import { useTranslation } from "react-i18next";
import { Box, Column, Row, AlignS } from "../../Materials";
import { Spacing, Views, ListImage } from "./Main";
import { MainStatsClasses } from "../../../api/ReturnTypes";
import styled from "styled-components";
import { addSeconds } from "date-fns";

const OriginProfile = styled.img`
  width: 60px;
  margin-right: 1.5rem;
`;

export function ViewClasses(props: Views): React.ReactElement {
  const { t, i18n } = useTranslation();
  if (!props.loading && !props.error) {
    const classes = props.stats.classes;
    return (
      <Spacing>
        <Box>
          <>
            <h3>{t("stats.classes.main")}</h3>
            {classes.map((key: MainStatsClasses) => {
              return (
                <>
                  <Column>
                    <Row>
                      <h3>
                        {i18n.exists(`stats.classes.${key.className}`)
                          ? t(`stats.classes.${key.className}`)
                          : key.className}
                      </h3>
                      <ListImage src={key.image} />
                    </Row>
                    <Row>
                      <h3>{key.score}</h3>
                      <p>{t("stats.classes.amounts.score")}</p>
                    </Row>
                    {key.kills !== undefined ? (
                      <Row>
                        <h3>{key.kills}</h3>
                        <p>{t("stats.classes.amounts.kills")}</p>
                      </Row>
                    ) : (
                      <></>
                    )}
                    {key.kpm !== undefined ? (
                      <Row>
                        <h3>{key.kpm}</h3>
                        <p>{t("stats.classes.amounts.kpm")}</p>
                      </Row>
                    ) : (
                      <></>
                    )}
                    {key.secondsPlayed !== undefined ? (
                      <Row>
                        <h3>
                          {t("change", {
                            change: addSeconds(new Date(), key.secondsPlayed),
                          })}
                        </h3>
                        <p>{t("stats.classes.amounts.timePlayed")}</p>
                      </Row>
                    ) : (
                      <></>
                    )}
                  </Column>
                </>
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
