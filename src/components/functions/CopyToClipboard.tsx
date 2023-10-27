import * as React from "react";
import { useTranslation } from "react-i18next";

export function CopyToClipboard(props: {
  message: string;
  stateTranslation: string;
}): React.ReactElement {
  const { t } = useTranslation();
  const [copyState, setCopyState] = React.useState<string>("copy");

  return (
    <a
      style={{ cursor: "pointer", textDecoration: "underline" }}
      onClick={() => {
        navigator.clipboard.writeText(props.message);
        setCopyState("copied");
        const timer1 = setTimeout(() => setCopyState("copy"), 3 * 1000);
        return () => {
          clearTimeout(timer1);
        };
      }}
    >
      {t(`${props.stateTranslation}.${copyState}`)}
    </a>
  );
}
