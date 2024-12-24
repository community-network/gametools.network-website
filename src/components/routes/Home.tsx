import * as React from "react";
import "../../locales/config";
import { useTranslation } from "react-i18next";
import { Box, OpenExternal } from "../Materials";
import { TotalGraphQuery } from "../graphing/line";
import { ServerSearch } from "./Servers/Search/Main";
import { StatSearch } from "./Stats/Search/PlayerSearch";

import background from "../../assets/img/RevealScreenshot_10_VistaHourglass_3840x2160_NoLogo-25798260c0054ec56441 1.png?format=webp&useResponsiveLoader=true";
import cloudBg from "../../assets/img/cloud-bg.png?format=webp&useResponsiveLoader=true";
import bf1Logo from "../../assets/img/bf1-logo.png?sizes[]=96&format=webp&useResponsiveLoader=true";
import bf5Logo from "../../assets/img/bf5-logo.png?sizes[]=94.7333&format=webp&useResponsiveLoader=true";
import bf2042Logo from "../../assets/img/bf2042-logo.png?sizes[]=94.6&format=webp&useResponsiveLoader=true";

import statbitsLogo from "../../assets/icon/statbits-icon.svg";
import bflistLogo from "../../assets/icon/bflist-icon.svg";
import bfbanLogo from "../../assets/icon/bfban-icon.png?sizes[]=24&format=webp&useResponsiveLoader=true";
import bfportalLogo from "../../assets/icon/bfportal-icon.png?sizes[]=24&format=webp&useResponsiveLoader=true";
import { Link } from "react-router";
import AdsComponent, { AdsEnabled } from "../Ads";
import * as styles from "./Home.module.scss";

function Home(): React.ReactElement {
  const { t, i18n } = useTranslation();
  document.title = t("pageTitle.main");

  let i = 0;
  const ourFriendLogos = [bfbanLogo, bfportalLogo, statbitsLogo, bflistLogo];
  const ourFriends = [];
  while (i18n.exists(`home.ourFriends.${i}`)) {
    ourFriends.push({
      header: t(`home.ourFriends.${i}.header`),
      link: t(`home.ourFriends.${i}.link`),
      url: t(`home.ourFriends.${i}.url`),
      description: t(`home.ourFriends.${i}.description`),
    });
    i += 1;
  }

  i = 0;
  const otherServices = [];
  while (i18n.exists(`home.otherServices.${i}`)) {
    otherServices.push({
      header: t(`home.otherServices.${i}.header`),
      localUrl: i18n.exists(`home.otherServices.${i}.localUrl`)
        ? t(`home.otherServices.${i}.localUrl`)
        : null,
      url: i18n.exists(`home.otherServices.${i}.url`)
        ? t(`home.otherServices.${i}.url`)
        : null,
    });
    i += 1;
  }

  return (
    <div>
      <div
        className={styles.image}
        style={{ backgroundImage: `url("${background.src}")` }}
      >
        <div className={styles.blur}>
          <div className={styles.welcome}>
            <p className={styles.text}>{t("playerSearch.description")}</p>
            <StatSearch />
            {AdsEnabled() && (
              <div className={styles.searchAdSection}>
                <AdsComponent
                  dataAdSlot="8911547346"
                  style={{
                    display: "block",
                    height: "60px",
                    maxWidth: "1000px",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {AdsEnabled() && (
        <div className={styles.mobileAdSection}>
          <AdsComponent
            dataAdSlot="8911547346"
            style={{ display: "block", height: "60px", maxWidth: "300px" }}
          />
        </div>
      )}
      <div className="container">
        <ServerSearch />
        <h2 style={{ margin: "24px 0 24px 24px" }}>
          {t("home.graphs.header")}
        </h2>
        <div>
          <div className={styles.adBox}>
            <AdsComponent
              dataAdSlot="8911547346"
              style={{ display: "block", height: "300px" }}
            />
          </div>
          <TotalGraphQuery />
        </div>
        <a
          className="bigButtonLink"
          target="_blank"
          href="https://graphs.gametools.network/"
          rel="noreferrer"
        >
          {t("home.graphs.detailed")}
        </a>
      </div>
      <div
        className={styles.cloudImage}
        style={{ backgroundImage: `url("${cloudBg.src}")` }}
      >
        <div className="container">
          <h1 style={{ paddingTop: "2rem", marginBottom: "3.5rem" }}>
            {t("home.manager.header")}
          </h1>
          <p className={styles.description}>{t("home.manager.description")}</p>
          <a
            className="primaryButtonLink"
            target="_blank"
            href="https://manager.gametools.network/"
            style={{ width: "90px", borderRadius: "10px", marginTop: "3rem" }}
            rel="noreferrer"
          >
            <OpenExternal style={{ paddingTop: "1px" }} />{" "}
            {t("home.manager.open")}
          </a>
          <p className={styles.description} style={{ marginTop: "3rem" }}>
            {t("home.manager.disclaimer")}
          </p>
          <div className="align">
            <img
              className={styles.gameLogo}
              alt="bf1 logo"
              src={bf1Logo.src}
              srcSet={bf1Logo.srcSet}
              style={{ height: bf1Logo.height, width: bf1Logo.width }}
              loading="lazy"
            />
            <img
              className={styles.gameLogo}
              alt="bf5 logo"
              src={bf5Logo.src}
              srcSet={bf5Logo.srcSet}
              style={{ height: bf5Logo.height, width: bf5Logo.width }}
              loading="lazy"
            />
            <img
              className={styles.gameLogo}
              alt="bf2042 logo"
              src={bf2042Logo.src}
              srcSet={bf2042Logo.srcSet}
              style={{
                marginTop: "0.5px",
                height: bf2042Logo.height,
                width: bf2042Logo.width,
              }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="pageColumn">
          <div className={styles.pageRow}>
            <h2 style={{ margin: "24px 0 24px 24px" }}>
              {t("home.ourFriends.header")}
            </h2>
            {ourFriends.map((key, index) => {
              return (
                <Box
                  key={index}
                  align="flex-start"
                  spacingStyle={{ maxWidth: "922px" }}
                >
                  <div className="alignW" style={{ marginTop: "0.5rem" }}>
                    <img
                      src={ourFriendLogos[index]}
                      alt="icon"
                      style={{
                        height: "24px",
                        width: "24px",
                        marginRight: "1rem",
                      }}
                      loading="lazy"
                    />
                    <h3>{key.header}</h3>
                  </div>
                  <p className={styles.description}>{key.description}</p>
                  <br></br>
                  <a
                    className="buttonLink"
                    target="_blank"
                    href={key.url}
                    rel="noreferrer"
                  >
                    <OpenExternal style={{ paddingTop: "1px" }} /> {key.link}
                  </a>
                </Box>
              );
            })}
          </div>
          <div>
            <h2 style={{ margin: "24px 0 24px 24px" }}>
              {t("home.otherService")}
            </h2>
            {otherServices.map((key, index) => {
              return (
                <div key={index}>
                  {key.localUrl ? (
                    <Link to={key.localUrl}>
                      <button
                        className="bigButtonSecondaryBox"
                        style={{
                          width: "97%",
                          maxWidth: "470px",
                          textAlign: "left",
                          padding: "0 2rem",
                        }}
                      >
                        {key.header}
                      </button>
                    </Link>
                  ) : (
                    <a target="_blank" href={key.url} rel="noreferrer">
                      <button
                        className="bigButtonSecondaryBox"
                        style={{
                          width: "97%",
                          maxWidth: "470px",
                          textAlign: "left",
                          padding: "0 2rem",
                        }}
                      >
                        <OpenExternal style={{ paddingBottom: "1px" }} />{" "}
                        {key.header}
                      </button>
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
