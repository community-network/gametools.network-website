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
  const serverInfo = props.serverInfo;
  const { t } = useTranslation();
  return (
    <Spacing>
      <h2>{t("servers.portal.main")}</h2>
      <AlignW>
        <OriginProfile src={background} />
        <div>
          <OriginName>{serverInfo.configName}</OriginName>
          <OriginDescription>{serverInfo.configDescription}</OriginDescription>
        </div>
      </AlignW>
    </Spacing>
  );
}
