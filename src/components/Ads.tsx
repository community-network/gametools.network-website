import * as React from "react";

declare const window: { adsbygoogle: any };

const AdsComponent = (props: { dataAdSlot: string }) => {
  const { dataAdSlot } = props;

  React.useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6546858755151450"
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};

export default AdsComponent;
