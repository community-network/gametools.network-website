import * as React from "react";
import background from "../../../../assets/icon/portal.svg";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import "../../../../assets/scss/App.scss";
import { AlignW } from "../../../Materials";
import { ServerInfoResult } from "../../../../api/ReturnTypes";
import {
  OriginDescription,
  OriginName,
  OriginProfile,
  Spacing,
} from "./Servers";

export function ServerConfig(props: {
  serverInfo: ServerInfoResult;
}): React.ReactElement {
  const { serverInfo } = props;
  const { t } = useTranslation();

  if (serverInfo.configNameTranslation !== "") {
    return (
      <Spacing>
        <h2>{t("servers.portal.main")}</h2>
        <AlignW>
          <OriginProfile src={background} />
          <div>
            <OriginName>{serverInfo.configNameTranslation}</OriginName>
            <OriginDescription>
              {serverInfo.configDescriptionTranslation}
            </OriginDescription>
          </div>
        </AlignW>
      </Spacing>
    );
  }
  return (
    <Spacing>
      <h2>{t("servers.portal.main")}</h2>
      <AlignW>
        <OriginProfile src={background} />
        <div>
          <OriginName>{serverInfo.configName}</OriginName>
          <OriginDescription style={{ maxWidth: "600px" }}>
            {serverInfo.configDescription}
          </OriginDescription>
        </div>
      </AlignW>
    </Spacing>
  );
}
