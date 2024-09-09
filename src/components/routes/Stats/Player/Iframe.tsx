import * as React from "react";
import { useTranslation } from "react-i18next";
import "../../../../locales/config";
import { CopyToClipboard } from "../../../functions/CopyToClipboard";
import { Box } from "../../../Materials";
import { ComponentHandling, Views } from "./Main";
import * as styles from "./Main.module.scss";

interface IframeViews extends Views {
  getter: string;
  platform: string;
}

export function ViewIframe(props: Readonly<IframeViews>): React.ReactElement {
  const { t } = useTranslation();
  const language = window.localStorage.i18nextLng;

  if (props.isError || props.isLoading) {
    return (
      <Box>
        <h3>{t("stats.iframe.main")}</h3>
        <p>{ComponentHandling(t, props)}</p>
      </Box>
    );
  }

  return (
    <Box>
      <h3>{t("stats.iframe.main")}</h3>
      <p className={styles.description} style={{ marginTop: "15px" }}>
        {t(`stats.iframe.info`)}{" "}
        <CopyToClipboard
          message={`<iframe title="Stats widget" src="https://widgets.gametools.network/stats/${props.platform}/${props.getter}/${props.name}/${props.game}/${language}/50" height="380px" width="600px" frameborder="0" allowtransparency="true"></iframe>`}
          stateTranslation={"servers.iframe.states"}
        />
      </p>
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
}
