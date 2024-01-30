import * as React from "react";
import "../../locales/config";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../locales/ChangeLanguage";
import AdsComponent, { AdSwitch, AdsEnabled } from "../Ads";
import styles from "./Footer.module.scss";

interface FLinkProp {
  href: string;
  name: string;
}

function FLink(props: FLinkProp) {
  return (
    <p>
      <a className={styles.textLink} href={props.href}>
        {props.name}
      </a>
    </p>
  );
}

export function Footer(): JSX.Element {
  const { t, i18n } = useTranslation();
  let i = 0;
  const footerLinks = [];
  while (i18n.exists(`footer.links.${i}`)) {
    footerLinks.push({
      header: t(`footer.links.${i}.header`),
      url: t(`footer.links.${i}.url`),
    });
    i += 1;
  }

  return (
    <footer className={styles.background} role="contentinfo">
      {AdsEnabled() && (
        <div className={styles.adSection}>
          <h3 className="adv-label" style={{ marginBottom: ".8rem" }}>
            {t("ads.main")}
          </h3>
          <AdsComponent
            dataAdSlot="8911547346"
            style={{ display: "block", height: "80px" }}
          />
        </div>
      )}
      <div className={styles.section}>
        <div className={styles.text}>
          <h3>{t("siteFullName")}</h3>
          <p className={styles.textGrayP}>{t("footer.description")}</p>
          <div className="alignT">
            <LanguageSelector />
            <iframe
              src="https://github.com/sponsors/community-network/button"
              title="Sponsor community-network"
              height="35"
              width="116"
              style={{ border: 0, marginLeft: ".5rem" }}
              loading="lazy"
            />
            <a
              href="https://www.buymeacoffee.com/Gametools"
              style={{ marginLeft: ".5rem" }}
              aria-label="Support us on buy me a coffee button"
            >
              <img
                alt="Support us on buy me a coffee"
                height="32"
                width="121.6"
                src="https://img.buymeacoffee.com/button-api/?text=Support us&emoji=❤️&slug=Gametools&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff"
                loading="lazy"
              />
            </a>
            <AdSwitch />
          </div>
        </div>
        <div>
          <h3>{t("footer.LinkName")}</h3>
          {footerLinks.map((key, index) => {
            return <FLink key={index} href={key.url} name={key.header} />;
          })}
        </div>
      </div>
    </footer>
  );
}
