import * as React from "react";
import background from "../../../../assets/icon/portal.svg";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import "../../../../assets/scss/App.scss";
import { ServerInfoResult } from "../../../../api/ReturnTypes";
import Styles from "./Main.module.scss";

export function ServerConfig(
  props: Readonly<{
    serverInfo: ServerInfoResult;
  }>,
): React.ReactElement {
  const { serverInfo } = props;
  const { t } = useTranslation();

  if (serverInfo?.configNameTranslation !== "") {
    return (
      <div className={Styles.spacing}>
        <h2>{t("servers.portal.main")}</h2>
        <div className="alignW">
          <img
            className={Styles.originProfile}
            alt={t("servers.bfportal.main")}
            src={background}
          />
          <div>
            <h2 className={Styles.originName}>
              {serverInfo?.configNameTranslation}
            </h2>
            <h4 className={Styles.originDescription}>
              {serverInfo?.configDescriptionTranslation}
            </h4>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={Styles.spacing}>
      <h2>{t("servers.portal.main")}</h2>
      <div className="alignW">
        <img
          className={Styles.originProfile}
          alt={t("servers.bfportal.main")}
          src={background}
        />
        <div>
          <h2 className={Styles.originName}>{serverInfo?.configName}</h2>
          <h4
            className={Styles.originDescription}
            style={{ maxWidth: "600px" }}
          >
            {serverInfo?.configDescription}
          </h4>
        </div>
      </div>
    </div>
  );
}
