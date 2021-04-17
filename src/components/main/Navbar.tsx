import { HashRouter, Switch, Route, Link } from "react-router-dom";
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
    border-radius: 0px;
    background: #151829;
`

const Header = styled.div`
    height: 90px;
    width: 184px;
    left: 8.33%;
    right: 82.08%;
    top: 0%;
    bottom: 0%;
    border-radius: nullpx;
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

const BStats = styled.div`
    position: absolute;
    left: 64.53%;
    right: 26.98%;
    top: 0%;
    bottom: 0%;

    font-family: Manrope;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 102.3%;
    /* or 14px */

    display: flex;
    align-items: center;
    text-align: center;

    color: rgba(255, 255, 255, 0.72);
`

export function Navbar() {
    const { t } = useTranslation();
    return (
        <Nav>
            <Header>Game Tools</Header>
            <BStats>Battlefield Stats</BStats>
            <Link to="/stats/pc/iiTzArcur/bf1">test</Link>
        </Nav>
    )
}