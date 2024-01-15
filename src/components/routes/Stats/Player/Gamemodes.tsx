import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import { Box, Align, AlignS, Column, Row } from "../../../Materials";
import { Spacing, Views, BackgroundBar, Bar } from "./Main";
import { MainStatsGamemode } from "../../../../api/ReturnTypes";

export function ViewGamemodes(props: Readonly<Views>): React.ReactElement {
  const { t, i18n } = useTranslation();
  if (!props.loading && !props.error) {
    const gamemodes = props.stats.gamemodes;
    const getLanguage = () => window.localStorage.i18nextLng;
    const numberFormat = new Intl.NumberFormat(getLanguage());
    return (
      <Spacing>
        <Box>
          <>
            {gamemodes[0].wins !== undefined ? (
              <>
                <h3>{t("stats.gamemodes.main")}</h3>
                {gamemodes.map((key: MainStatsGamemode) => {
                  return (
                    <div key={key?.gamemodeName}>
                      <br />
                      <Align style={{ justifyContent: "space-between" }}>
                        <h4 style={{ margin: 0 }}>
                          {i18n.exists(`stats.gamemodes.${key.gamemodeName}`)
                            ? t(`stats.gamemodes.${key.gamemodeName}`)
                            : key.gamemodeName}
                        </h4>
                        <p style={{ margin: "0.3rem 0" }}>
                          {t("stats.gamemodes.percentage", {
                            percentage: (
                              (key?.wins / (key?.wins + key?.losses)) *
                              100
                            ).toFixed(1),
                          })}
                        </p>
                      </Align>
                      <BackgroundBar>
                        <Bar
                          style={{
                            width: `${
                              (key?.wins / (key?.wins + key?.losses)) * 100
                            }%`,
                          }}
                        ></Bar>
                      </BackgroundBar>
                      <br />
                      <AlignS>
                        <div>
                          <h3>{numberFormat.format(key?.score)}</h3>
                          <p>{t("stats.gamemodes.amounts.score")}</p>
                        </div>
                        <div>
                          <h3>{numberFormat.format(key?.wins)}</h3>
                          <p>{t("stats.gamemodes.amounts.wins")}</p>
                        </div>
                        <div>
                          <h3>{numberFormat.format(key?.losses)}</h3>
                          <p>{t("stats.gamemodes.amounts.losses")}</p>
                        </div>
                      </AlignS>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <Column style={{ marginTop: 0 }}>
                  <Row>
                    <h3>{t(`stats.gamemodes.table.firstRow`)}</h3>
                  </Row>
                  <Row>
                    <h3>{t(`stats.gamemodes.table.secondRow`)}</h3>
                  </Row>
                </Column>
                {gamemodes.map((key: MainStatsGamemode) => {
                  return (
                    <Column key={key?.gamemodeName}>
                      <Row>
                        <p style={{ margin: 0 }}>
                          {t(`stats.gamemodes.${key.gamemodeName}`)}
                        </p>
                      </Row>
                      <Row>
                        <p style={{ margin: 0 }}>{key?.score}</p>
                      </Row>
                    </Column>
                  );
                })}
              </>
            )}
          </>
        </Box>
      </Spacing>
    );
  } else {
    return (
      <Spacing>
        <Box>
          <h3>{t("stats.gamemodes.main")}</h3>
          <p>{t("loading")}</p>
        </Box>
      </Spacing>
    );
  }
}
