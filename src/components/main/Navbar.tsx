import { HashRouter, Switch, Route, Link } from "react-router-dom";
import '../../locales/config';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";

const Nav = styled.div`
    height: 90px;
    width: 1920px;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
    border-radius: 0px;

    background: #151829;
`

export function Navbar() {
    const { t } = useTranslation();
    return (
        <Nav>
            Holla
            <Link to="/stats/pc/iiTzArcur/bf1">test</Link>
        </Nav>
    )
}