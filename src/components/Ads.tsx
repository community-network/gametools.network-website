import { useLocalStorage } from "@uidotdev/usehooks";
import * as React from "react";
import { useTranslation } from "react-i18next";
import useExternalScript from "./functions/UseExternalScript";

declare const window: { adsbygoogle; location: Location };

const AdsComponent = (props: {
  dataAdSlot: string;
  style?: React.CSSProperties;
}) => {
  const { dataAdSlot } = props;
  const style = props.style || { display: "block" };

  React.useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (_) {}
  }, []);

  const [value] = useLocalStorage("disable-ads", false);

  if (value) return <></>;

  return (
    <ins
      className="adsbygoogle"
      style={style}
      // data-adtest="on"
      data-ad-client="ca-pub-6546858755151450"
      data-ad-slot={dataAdSlot}
      // data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export const AdSwitch = (): React.ReactElement => {
  const { t } = useTranslation();
  const [value, setValue] = useLocalStorage("disable-ads", false);

  const externalScript =
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6546858755151450";
  useExternalScript(externalScript, true);

  return (
    <div className="adv-ad" style={{ display: "flex", paddingLeft: ".3rem" }}>
      <label aria-label={t("ariaLabels.toggleAds")} className="switch">
        <input
          onChange={() => {}}
          checked={value}
          onClick={() => {
            setValue(!value);
          }}
          type="checkbox"
        />
        <span className="slider round"></span>
      </label>
      <p style={{ marginTop: "4.5px", marginLeft: ".3rem" }}>
        {t("ads.disable")}
      </p>
    </div>
  );
};

export default AdsComponent;
