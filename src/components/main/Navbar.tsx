import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../locales/config";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { M88 } from "../Materials";

const Nav = styled.div`
  ${M88};
  height: 90px;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  padding: 0 8.33%;
  @media (max-width: 600px) {
    padding: 0 5%;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const LinkWrapper = styled.div`
  display: flex;
  position: relative;
  display: -webkit-flex;
  display: flex;
  align-items: center;
`;

const Separator = styled.div`
  height: 18px;
  border: 0.5px solid rgba(255, 255, 255, 0.22);
  display: flex;
`;

const sharedLink = css`
  font-family: Manrope, serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 102.3%;
  text-decoration: none;
  /* or 14px */

  display: flex;
  overflow: hidden;
  white-space: nowrap;
  //flex: 0 0 136px;
  flex-shrink: 0;
  padding: 0 22px;
  align-items: center;
  text-align: center;

  color: rgba(255, 255, 255, 0.72);
`;

const HLink = styled(Link)`
  ${sharedLink}
`;

const ALink = styled.a`
  ${sharedLink}
`;

const SLink = styled(Link)`
  font-weight: 800;
  font-size: 18px;
`;

const ButtonLink = styled.a`
  ${sharedLink};
  padding: 0 20px;
  height: 40px;
  background: var(--color-blue);
  border-radius: 5px;
  transition: all 0.1s;
  :hover {
    background: var(--color-blue-alt);
  }
`;

export function Navbar(): JSX.Element {
  const { t } = useTranslation();
  const homePage = useLocation().pathname === "/";
  return (
    <Nav>
      <Header>{homePage ? null : <SLink to="/">{t("siteName")}</SLink>}</Header>
      <LinkWrapper>
        <HLink to="/stats" title={t("navBar.bfStats")}>
          {t("navBar.bfStats")}
        </HLink>
        <Separator />
        <ALink
          target="_blank"
          href="https://discord.gametools.network/"
          title={t("navBar.discord")}
        >
          {t("navBar.discord")}
        </ALink>
        <ALink
          target="_blank"
          href="https://api.gametools.network/"
          title={t("navBar.api")}
        >
          {t("navBar.api")}
        </ALink>
        <ButtonLink
          target="_blank"
          href="https://top.gg/bot/714524944783900794"
        >
          {t("navBar.bot")}
        </ButtonLink>
      </LinkWrapper>
    </Nav>
  );
}
