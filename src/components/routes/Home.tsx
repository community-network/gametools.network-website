import "../../locales/config";
import { useTranslation } from "react-i18next";
import { Box, OpenExternal } from "../Materials";
import { TotalGraphQuery } from "../graphing/line";
import { ServerSearch } from "./Servers/Search/Main";
import { StatSearch } from "./Stats/Search/PlayerSearch";

import background from "../../assets/img/RevealScreenshot_10_VistaHourglass_3840x2160_NoLogo-25798260c0054ec56441 1.png";
import cloudBg from "../../assets/img/cloud-bg.png";
import bf1Logo from "../../assets/img/bf1-logo.png";
import bf5Logo from "../../assets/img/bf5-logo.png";
import bf2042Logo from "../../assets/img/bf2042-logo.png";

import statbitsLogo from "../../assets/icon/statbits-icon.svg";
import bflistLogo from "../../assets/icon/bflist-icon.svg";
import bfbanLogo from "../../assets/icon/bfban-icon.png";
import bfportalLogo from "../../assets/icon/bfportal-icon.png";
import RedsecCentralLogo from "../../assets/icon/redsec-central-icon.png";
import { Link } from "react-router";
import styles from "./Home.module.scss";
import { useEffect } from "react";

function Home(): React.ReactElement {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    document.title = t("pageTitle.main");
  }, [t]);

  // Battlefield specific services not attached to a specific battlefield community server, made by our developers.
  let i = 0;
  const ourFriendLogos = [bfbanLogo, bfportalLogo, statbitsLogo, bflistLogo, RedsecCentralLogo];
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
        style={{ backgroundImage: `url("${background}")` }}
      >
        <div className={styles.blur}>
          <div className={styles.welcome}>
            <p className={styles.text}>{t("playerSearch.description")}</p>
            <StatSearch />
            {/* {!adsDisabled && (
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
            )} */}
          </div>
        </div>
      </div>
      {/* {!adsDisabled && (
        <div className={styles.mobileAdSection}>
          <AdsComponent
            dataAdSlot="8911547346"
            style={{ display: "block", height: "60px", maxWidth: "300px" }}
          />
        </div>
      )} */}
      <div className="container">
        <ServerSearch />
        <h2 style={{ margin: "24px 0 24px 24px" }}>
          {t("home.graphs.header")}
        </h2>
        <div>
          {/* <div className={styles.adBox}>
            <AdsComponent
              dataAdSlot="8911547346"
              style={{ display: "block", height: "300px" }}
            />
          </div> */}
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
        style={{ backgroundImage: `url("${cloudBg}")` }}
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
              src={bf1Logo}
              style={{ width: "96px" }}
              loading="lazy"
            />
            <img
              className={styles.gameLogo}
              alt="bf5 logo"
              src={bf5Logo}
              style={{ width: "94.7333px" }}
              loading="lazy"
            />
            <img
              className={styles.gameLogo}
              alt="bf2042 logo"
              src={bf2042Logo}
              style={{
                marginTop: "0.5px",
                width: "94.6px"
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
              {t("home.otherServices.header")}
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
                    <a target="_blank" href={key.url || undefined} rel="noreferrer">
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
