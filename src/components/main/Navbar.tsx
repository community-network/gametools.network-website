import { Link, useLocation  } from "react-router-dom";
import '../../locales/config';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";

const Nav = styled.div`
    height: 90px;
    //width: 100%;
    justify-content: space-between;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
    display: flex;
    padding: 0 8.33%;
`;

const Header = styled.div`

    font-family: Manrope;
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 102.3%;
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.92);
`

const LinkWrapper = styled.div`
    display: flex;
    position: relative;
    display: -webkit-flex;
    display: flex;
`

const Separator = styled.div`
    //position: absolute;
    //eft: 73.28%;
    // right: 25.47%;
    //top: 36.67%;
    //bottom: 63.33%;
    height: 18px;
    border: 1px solid #282A3A;
    //transform: rotate(90deg);
`

const HLink = styled(Link)`
    // position: absolute;
    // left: 64.53%;
    // right: 26.98%;
    top: 0%;
    bottom: 0%;

    font-family: Manrope;
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
`

export function Navbar() {
    const { t } = useTranslation();
    const homePage = useLocation().pathname === "/"
    return (
        <Nav>
            <Header>{homePage ? null : t("siteName")}</Header>
            <LinkWrapper>
                <HLink to="/stats/pc/iiTzArcur/bf1">{t("navBar.bfStats")}</HLink>
                <HLink to="/stats/pc/iiTzArcur/bf1">{t("navBar.discord")}</HLink>
                <HLink to="/stats/pc/iiTzArcur/bf1">{t("navBar.api")}</HLink>
                <Separator/>
            </LinkWrapper>
        </Nav>
    )
}