import * as React from "react";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "react-use";
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
    } catch (e) {}
  }, []);

  const [value] = useLocalStorage("disable-ads", false);

  if (value) return <></>;

  return (
    <>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-6546858755151450"
        data-ad-slot={dataAdSlot}
        // data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};

export const AdsEnabled = () => {
  const [value] = useLocalStorage("disable-ads", false);
  return !value;
};

export const AdSwitch = (): JSX.Element => {
  const { t } = useTranslation();
  const [value, setValue] = useLocalStorage("disable-ads", false);

  const externalScript =
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6546858755151450";
  useExternalScript(externalScript, true);

  return (
    <div className="adv-ad" style={{ display: "contents" }}>
      <label aria-label={t("ariaLabels.toggleAds")} className="switch">
        <input
          onChange={() => {}}
          checked={value}
          onClick={() => {
            setValue(!value);
            window.location.reload();
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
