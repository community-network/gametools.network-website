import { HashRouter, Switch, Route, Link } from "react-router-dom";
import '../../locales/config';
import { useTranslation } from 'react-i18next';

export function Navbar() {
    const { t } = useTranslation();
    return (
        <Link to="/stats/pc/iiTzArcur/bf1">test</Link>
    )
}