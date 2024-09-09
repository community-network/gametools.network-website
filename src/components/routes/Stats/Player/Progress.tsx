import * as React from "react";
import { useTranslation } from "react-i18next";
import { MainStatsProgress } from "../../../../api/ReturnTypes";
import "../../../../locales/config";
import { Box } from "../../../Materials";
import { ComponentHandling, Views } from "./Main";
import * as styles from "./Main.module.scss";

export function ViewProgress(props: Readonly<Views>): React.ReactElement {
  const { t } = useTranslation();


  if (props.isError || props.isLoading) {
    return (
      <div className={styles.spacing}>
        <Box>
          <h3>{t("stats.progress.main")}</h3>
          <p>{ComponentHandling(t, props)}</p>
        </Box>
      </div>
    );
  }

  const progress = props?.stats?.progress;
  return (
    <div className={styles.spacing}>
      <Box>
        <h3>{t("stats.progress.main")}</h3>
        {progress.map((key: MainStatsProgress, index: number) => {
          return (
            <div key={index}>
              <br />
              <div
                className="align"
                style={{ justifyContent: "space-between" }}
              >
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
              </div>
              <div className={styles.backgroundBar}>
                <div
                  className={styles.bar}
                  style={{
                    width: `${(100 * key?.current) / key?.total}%`,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </Box>
    </div>
  );
}
