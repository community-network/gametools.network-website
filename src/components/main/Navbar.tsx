import { Link } from "react-router-dom";
import '../../locales/config';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";

const Nav = styled.div`
    height: 90px;
    width: 100%;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
    background: #151829;
    display: flex;
`

const Header = styled.div`
    left: 8.33%;
    right: 82.08%;
    top: 0%;
    bottom: 0%;
    // border-radius: nullpx;
    position: absolute;
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
    position: absolute;
    left: 64.53%;
    right: 14.79%;
    top: 0%;
    bottom: 0%;
    display: -webkit-flex;
    display: flex;
`

const Separator = styled.div`
    position: absolute;
    left: 73.28%;
    // right: 25.47%;
    top: 36.67%;
    bottom: 63.33%;

    border: 1px solid #282A3A;
    transform: rotate(90deg);
`

const HLink = styled(Link)`
    position: absolute;
    // left: 64.53%;
    // right: 26.98%;
    top: 0%;
    bottom: 0%;

    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 102.3%;
    /* or 14px */

    display: flex;
    flex: 1;
    align-items: center;
    text-align: center;

    color: rgba(255, 255, 255, 0.72);
`

export function Navbar() {
    const { t } = useTranslation();
    const windowLocation = window.location.pathname
    console.log(window.location.pathname)
    return (
        <Nav>
            <Header>{t("siteName")}</Header>
            <LinkWrapper>
                <HLink to="/stats/pc/iiTzArcur/bf1">{t("navBar.bfStats")}</HLink>
                <HLink to="/stats/pc/iiTzArcur/bf1">{t("navBar.bfStats")}</HLink>
                <HLink to="/stats/pc/iiTzArcur/bf1">{t("navBar.bfStats")}</HLink>
                <Separator/>
            </LinkWrapper>
        </Nav>
    )
}