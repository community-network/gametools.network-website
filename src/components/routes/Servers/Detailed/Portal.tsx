import * as React from "react";
import { useTranslation } from "react-i18next";
import { ServerInfoResult } from "../../../../api/ReturnTypes";
import background from "../../../../assets/icon/portal.svg";
import backgroundBf6 from "../../../../assets/icon/portal-bf6.svg";
import "../../../../assets/scss/App.scss";
import "../../../../locales/config";
import * as styles from "./Main.module.scss";

export function ServerConfig(
  props: Readonly<{
    game: string;
    serverInfo: ServerInfoResult;
    experienceId: string | undefined;
    isError: boolean;
    isLoading: boolean;
  }>,
): React.ReactElement {
  const { serverInfo } = props;
  const { t } = useTranslation();

  if (props.isError || props.isLoading) {
    return (
      <div className={styles.spacing}>
        <h2>{t("servers.portal.main")}</h2>
        <div className="alignW">
          <img
            className={styles.originProfile}
            alt={t("servers.bfportal.main")}
            src={props.game === "bf6" ? backgroundBf6 : background}
          />
          <div>
            <h2 className={styles.originName}>
              {props.isLoading ? t("loading") : t("notApplicable")}
            </h2>
            <h4 className={styles.originDescription}>{t("notApplicable")}</h4>
          </div>
        </div>
      </div>
    );
  }
  if (
    serverInfo.configDescriptionTranslation !== undefined &&
    serverInfo?.configNameTranslation !== ""
  ) {
    return (
      <div className={styles.spacing}>
        <h2>{t("servers.portal.main")}</h2>
        <div className="alignW">
          <img
            className={styles.originProfile}
            alt={t("servers.bfportal.main")}
            src={props.game === "bf6" ? backgroundBf6 : background}
          />
          <div>
            <h2 className={styles.originName}>
              {serverInfo?.configNameTranslation}
            </h2>
            <h4 className={styles.originDescription}>
              {serverInfo?.configDescriptionTranslation}
            </h4>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.spacing}>
      <h2>{t("servers.portal.main")}</h2>
      <div className="alignW">
        <img
          className={styles.originProfile}
          alt={t("servers.bfportal.main")}
          src={props.game === "bf6" ? backgroundBf6 : background}
        />
        <div>
          <h2 className={styles.originName}>
            {props.experienceId ? (
              <a
                href={`https://www.ea.com/games/battlefield/battlefield-6/portal/buy/creation/${props.experienceId}`}
              >
                {serverInfo?.configName}
              </a>
            ) : (
              serverInfo?.configName
            )}
          </h2>
          <h4
            className={styles.originDescription}
            style={{ maxWidth: "600px" }}
          >
            {serverInfo?.configDescription}
          </h4>
        </div>
      </div>
    </div>
  );
}
