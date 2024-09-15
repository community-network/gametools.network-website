import * as React from "react";
import { useTranslation } from "react-i18next";

export function CopyToClipboard(
  props: Readonly<{
    className?: string;
    style?: React.CSSProperties;
    message: string;
    stateTranslation: string;
    translateOptions?: { [key: string]: string | number };
  }>,
): React.ReactElement {
  const { t } = useTranslation();
  const [copyState, setCopyState] = React.useState<string>("copy");

  return (
    <button
      style={
        props.style || {
          all: "unset",
          cursor: "pointer",
          textDecoration: "underline",
        }
      }
      className={props.className}
      onClick={() => {
        navigator.clipboard.writeText(props.message);
        setCopyState("copied");
        const timer1 = setTimeout(() => setCopyState("copy"), 3 * 1000);
        return () => {
          clearTimeout(timer1);
        };
      }}
    >
      {t(`${props.stateTranslation}.${copyState}`, {
        ...props.translateOptions,
      })}
    </button>
  );
}
