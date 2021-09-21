import * as React from "react";
import "../../../locales/config";
import { useTranslation } from "react-i18next";
import { Box } from "../../Materials";
import { MainStats } from "../../../api/ReturnTypes";
import { Description } from "./Main";

interface Views {
  loading: boolean;
  error: boolean;
  game: string;
  getter: string;
  name: string;
  platform: string;
  stats: MainStats;
}

export function ViewIframe(props: Views): React.ReactElement {
  const [copyState, setCopyState] = React.useState<string>("copy");
  const { t } = useTranslation();
  const language = window.localStorage.i18nextLng;
  if (!props.loading && !props.error) {
    return (
      <Box>
        <h3>{t("stats.iframe.main")}</h3>
        <Description style={{ marginTop: "15px" }}>
          {t(`stats.iframe.info`)}{" "}
          <a
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigator.clipboard.writeText(
                `<iframe src="https://widgets.gametools.network/stats/${props.platform}/${props.getter}/${props.name}/${props.game}/${language}/50" height="380px" width="600px" frameborder="0" allowtransparency="true"></iframe>`,
              );
              setCopyState("copied");
              const timer1 = setTimeout(() => setCopyState("copy"), 3 * 1000);
              return () => {
                clearTimeout(timer1);
              };
            }}
          >
            {t(`servers.iframe.states.${copyState}`)}
          </a>
        </Description>
        <iframe
          src={`https://widgets.gametools.network/stats/${props.platform}/${
            props.getter
          }/${encodeURIComponent(props.name)}/${props.game}/${language}/50`}
          height="380px"
          width="600px"
          frameBorder="0"
          allowtransparency="true"
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
