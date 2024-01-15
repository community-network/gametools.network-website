import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import { Box, Align } from "../../../Materials";
import { Spacing, Views, BackgroundBar, Bar } from "./Main";
import { MainStatsProgress } from "../../../../api/ReturnTypes";

export function ViewProgress(props: Readonly<Views>): React.ReactElement {
  const { t } = useTranslation();
  if (!props.loading && !props.error) {
    const progress = props?.stats?.progress;
    return (
      <Spacing>
        <Box>
          <h3>{t("stats.progress.main")}</h3>
          {progress.map((key: MainStatsProgress, index: number) => {
            return (
              <div key={index}>
                <br />
                <Align style={{ justifyContent: "space-between" }}>
                  <h4 style={{ width: "4rem", margin: 0 }}>
                    {t(`stats.progress.${key.progressName}`)}
                  </h4>
                  <p style={{ margin: "0.3rem 0" }}>
                    {((100 * key?.current) / key?.total).toFixed(1)}%
                  </p>
                  <p
                    style={{
                      margin: "0.3rem 0",
                      width: "4rem",
                      textAlign: "right",
                    }}
                  >
                    {key?.current}/{key?.total}
                  </p>
                </Align>
                <BackgroundBar>
                  <Bar
                    style={{
                      width: `${(100 * key?.current) / key?.total}%`,
                    }}
                  ></Bar>
                </BackgroundBar>
              </div>
            );
          })}
        </Box>
      </Spacing>
    );
  } else {
    return (
      <Spacing>
        <Box>
          <h3>{t("stats.progress.main")}</h3>
          <p>{t("loading")}</p>
        </Box>
      </Spacing>
    );
  }
}
