import * as React from "react";
import "../../../../locales/config";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../../assets/scss/App.scss";
import { PlatoonResult } from "../../../../api/ReturnTypes";
import sslFix from "../../../functions/fixEaAssets";
import styles from "./Platoon.module.scss";
import MainStyles from "./Main.module.scss";

export function ServerPlatoon(props: {
  platoon: PlatoonResult;
  platform: string;
}): React.ReactElement {
  const { t } = useTranslation();
  const platoon = props.platoon;
  const platform = props.platform;
  if (!platoon) {
    return (
      <div className={MainStyles.spacing}>
        <h2>{t("servers.platoon.main")}</h2>
        <p>{t("servers.platoon.none")}</p>
      </div>
    );
  }
  return (
    <div className={MainStyles.spacing}>
      <h2>{t("servers.platoon.main")}</h2>
      <div className="alignW">
        <Link to={`/platoons/${platform}/${platoon.id}`}>
          <img
            className={styles.platoonEmblem}
            src={sslFix(platoon?.emblem)}
            alt={t("servers.platoon.emblem")}
          />
        </Link>
        <div style={{ marginTop: "1rem" }}>
          <h3>
            <Link to={`/platoons/${platform}/${platoon.id}`}>
              {platoon.name}
            </Link>
          </h3>
          {platoon.description !== null ? (
            <Link to={`/platoons/${platform}/${platoon.id}`}>
              <p style={{ maxWidth: "600px" }}>{platoon.description}</p>
            </Link>
          ) : (
            <Link to={`/platoons/${platform}/${platoon.id}`}>
              <p className={MainStyles.description}>
                {t("stats.platoon.noDescription")}
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
