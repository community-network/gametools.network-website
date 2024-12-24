import * as React from "react";
import { NavLink, useLocation } from "react-router";
import "../../locales/config";
import { useTranslation } from "react-i18next";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as styles from "./Navbar.module.scss";

const RightNav = ({
  open,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  return (
    <ul
      className={styles.ul}
      style={{
        transform: open ? "translateX(0)" : "translateX(100%)",
      }}
    >
      <li>
        <a
          className={styles.sharedLink}
          target="_blank"
          href="https://manager.gametools.network/"
          title={t("navBar.serverManager")}
          rel="noreferrer"
        >
          {t("navBar.serverManager")}
        </a>
      </li>
      <li>
        <a
          className={styles.sharedLink}
          target="_blank"
          href="https://api.gametools.network/"
          title={t("navBar.api")}
          rel="noreferrer"
        >
          {t("navBar.api")}
        </a>
      </li>
      <li>
        <a
          className={styles.sharedLink}
          target="_blank"
          href="https://discord.gametools.network/"
          title={t("navBar.help")}
          rel="noreferrer"
        >
          {t("navBar.help")}
        </a>
      </li>
    </ul>
  );
};

const Burger = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <nav role="navigation">
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div
          style={{
            transform: open ? "rotate(45deg)" : "rotate(0)",
            backgroundColor: open
              ? "var(--color-text)"
              : "var(--color-alt-text)",
          }}
        />
        <div
          style={{
            transform: open ? "translateX(100%)" : "translateX(0)",
            backgroundColor: open
              ? "var(--color-text)"
              : "var(--color-alt-text)",
            opacity: open ? 0 : 1,
          }}
        />
        <div
          style={{
            transform: open ? "rotate(-45deg)" : "rotate(0)",
            backgroundColor: open
              ? "var(--color-text)"
              : "var(--color-alt-text)",
          }}
        />
      </div>
      <RightNav open={open} setOpen={setOpen} />
    </nav>
  );
};

export function Navbar(): React.ReactElement {
  const { t } = useTranslation();
  const homePage = useLocation().pathname === "/";
  const [width, setWidth] = useState(window.innerWidth);
  const maxWidth = homePage ? 850 : 1250;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  return (
    <header className={styles.nav} role="banner">
      <div className={styles.header} onClick={() => setOpen(false)}>
        <NavLink className={styles.sLink} to="/">
          {t("siteName")}
        </NavLink>
      </div>
      {width < maxWidth ? (
        <Burger open={open} setOpen={setOpen} />
      ) : (
        <nav className={styles.linkWrapper} role="navigation">
          <a
            className={styles.sharedLink}
            target="_blank"
            href="https://manager.gametools.network/"
            title={t("navBar.serverManager")}
            rel="noreferrer"
          >
            {t("navBar.serverManager")}
          </a>
          <a
            className={styles.sharedLink}
            target="_blank"
            href="https://api.gametools.network/"
            title={t("navBar.api")}
            rel="noreferrer"
          >
            {t("navBar.api")}
          </a>
          <a
            className={styles.sharedLink}
            target="_blank"
            href="https://discord.gametools.network/"
            title={t("navBar.help")}
            rel="noreferrer"
          >
            {t("navBar.help")}
          </a>
        </nav>
      )}
    </header>
  );
}
