import * as React from "react";
import "../../../../locales/config";
import { useTranslation } from "react-i18next";
import { Box } from "../../../Materials";
import { MainStats } from "../../../../api/ReturnTypes";
import { Description } from "./Main";
import { CopyToClipboard } from "../../../functions/CopyToClipboard";

interface Views {
  loading: boolean;
  error: boolean;
  game: string;
  getter: string;
  name: string;
  platform: string;
  stats: MainStats;
}

export function ViewIframe(props: Readonly<Views>): React.ReactElement {
  const { t } = useTranslation();
  const language = window.localStorage.i18nextLng;
  if (!props.loading && !props.error) {
    return (
      <Box>
        <h3>{t("stats.iframe.main")}</h3>
        <Description style={{ marginTop: "15px" }}>
          {t(`stats.iframe.info`)}{" "}
          <CopyToClipboard
            message={`<iframe title="Stats widget" src="https://widgets.gametools.network/stats/${props.platform}/${props.getter}/${props.name}/${props.game}/${language}/50" height="380px" width="600px" frameborder="0" allowtransparency="true"></iframe>`}
            stateTranslation={"servers.iframe.states"}
          />
        </Description>
        <iframe
          style={{ maxWidth: "600px" }}
          title="Stats widget"
          src={`https://widgets.gametools.network/stats/${props.platform}/${
            props.getter
          }/${encodeURIComponent(props.name)}/${props.game}/${language}/50`}
          height="380px"
          width="100%"
          frameBorder="0"
          // eslint-disable-next-line react/no-unknown-property
          allowTransparency={true}
          loading="lazy"
        ></iframe>
      </Box>
    );
  } else {
    return (
      <Box>
        <h3>{t("stats.iframe.main")}</h3>
        <p>{t("loading")}</p>
      </Box>
    );
  }
}
