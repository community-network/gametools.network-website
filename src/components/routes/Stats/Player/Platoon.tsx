import * as React from "react";
import { Link } from "react-router-dom";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import { Box } from "../../../Materials";
import { MainStatsPlatoon } from "../../../../api/ReturnTypes";
import { PlatformViews } from "./Main";
import sslFix from "../../../functions/fixEaAssets";
import Styles from "./Main.module.scss";
import PlatoonStyles from "./Platoon.module.scss";

export function PlatoonInfo(
  props: Readonly<PlatformViews>,
): React.ReactElement {
  const { t } = useTranslation();
  const stats = props.stats;
  const platform = props.platform;
  if (
    !props.loading &&
    !props.error &&
    stats.activePlatoon.name === null &&
    props.stats.platoons.length === 0
  ) {
    return (
      <div className={Styles.spacing}>
        <Box>
          <h3>{t("stats.platoonName")}</h3>
          <p>{t("stats.platoon.none")}</p>
        </Box>
      </div>
    );
  } else if (!props.loading && !props.error) {
    const otherPlatoons = props.stats.platoons.filter(
      (platoon) => platoon?.id !== stats?.activePlatoon?.id,
    );
    return (
      <div className={Styles.spacing}>
        <Box>
          {stats?.activePlatoon?.name !== null ? (
            <>
              <h3>{t("stats.platoonName")}</h3>
              <div className="alignW" style={{ alignItems: "start" }}>
                <Link to={`/platoons/${platform}/${stats?.activePlatoon?.id}`}>
                  <img
                    className={PlatoonStyles.platoonEmblem}
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
                      <p className={Styles.description}>
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
                          className={PlatoonStyles.platoonEmblem}
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
                            <p className={Styles.description}>
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
  } else {
    return (
      <div className={Styles.spacing}>
        <Box>
          <h3>{t("stats.platoonName")}</h3>
          <p>{t("loading")}</p>
        </Box>
      </div>
    );
  }
}
