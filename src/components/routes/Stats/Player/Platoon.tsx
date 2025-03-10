import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { MainStatsPlatoon } from "../../../../api/ReturnTypes";
import "../../../../locales/config";
import sslFix from "../../../functions/fixEaAssets";
import { Box } from "../../../Materials";
import { ComponentHandling, PlatformViews } from "./Main";
import * as styles from "./Main.module.scss";
import * as Platoonstyles from "./Platoon.module.scss";

export function PlatoonInfo(
  props: Readonly<PlatformViews>,
): React.ReactElement {
  const { t } = useTranslation();
  const stats = props.stats;
  const platform = props.platform;

  if (props.isError || props.isLoading) {
    return (
      <div className={styles.spacing}>
        <Box>
          <h3>{t("stats.platoonName")}</h3>
          <p>{ComponentHandling(t, props)}</p>
        </Box>
      </div>
    );
  }

  if (stats.activePlatoon.name === null && props.stats.platoons.length === 0) {
    return (
      <div className={styles.spacing}>
        <Box>
          <h3>{t("stats.platoonName")}</h3>
          <p>{t("stats.platoon.none")}</p>
        </Box>
      </div>
    );
  } else {
    const otherPlatoons = props.stats.platoons.filter(
      (platoon) => platoon?.id !== stats?.activePlatoon?.id,
    );
    return (
      <div className={styles.spacing}>
        <Box>
          {stats?.activePlatoon?.name !== null ? (
            <>
              <h3>{t("stats.platoonName")}</h3>
              <div className="alignW" style={{ alignItems: "start" }}>
                <Link to={`/platoons/${platform}/${stats?.activePlatoon?.id}`}>
                  <img
                    className={Platoonstyles.platoonEmblem}
                    src={sslFix(stats?.activePlatoon?.emblem)}
                    loading="lazy"
                  />
                </Link>
                <div style={{ marginTop: "1rem" }}>
                  <h3>
                    <Link
                      to={`/platoons/${platform}/${stats?.activePlatoon?.id}`}
                    >
                      {stats?.activePlatoon?.name}
                    </Link>
                  </h3>
                  {stats?.activePlatoon?.description !== null ? (
                    <Link
                      to={`/platoons/${platform}/${stats?.activePlatoon?.id}`}
                    >
                      <p>{stats?.activePlatoon?.description}</p>
                    </Link>
                  ) : (
                    <Link
                      to={`/platoons/${platform}/${stats?.activePlatoon?.id}`}
                    >
                      <p className={styles.description}>
                        {t("stats.platoon.noDescription")}
                      </p>
                    </Link>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <h3>{t("stats.platoonName")}</h3>
              <p>{t("stats.platoon.noMain")}</p>
            </>
          )}
          {otherPlatoons.length !== 0 && (
            <>
              <br />
              <br />
              <h3>{t("stats.otherPlatoons")}</h3>
              {otherPlatoons.map((key: MainStatsPlatoon) => {
                return (
                  <div key={key?.id}>
                    <div className="alignW" style={{ alignItems: "start" }}>
                      <Link to={`/platoons/${platform}/${key?.id}`}>
                        <img
                          className={Platoonstyles.platoonEmblem}
                          src={sslFix(key?.emblem)}
                          loading="lazy"
                        />
                      </Link>
                      <div style={{ marginTop: "1rem" }}>
                        <h3>
                          <Link to={`/platoons/${platform}/${key?.id}`}>
                            {key.name}
                          </Link>
                        </h3>
                        {key.description !== null ? (
                          <Link to={`/platoons/${platform}/${key?.id}`}>
                            <p>{key.description}</p>
                          </Link>
                        ) : (
                          <Link to={`/platoons/${platform}/${key?.id}`}>
                            <p className={styles.description}>
                              {t("stats.platoon.noDescription")}
                            </p>
                          </Link>
                        )}
                      </div>
                    </div>
                    <br />
                  </div>
                );
              })}
            </>
          )}
        </Box>
      </div>
    );
  }
}
