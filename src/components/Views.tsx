import '../locales/config';
import { Switch, Route, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import Home from "./routes/Home"
import Stats from "./routes/main"

function Views() {
    const { t } = useTranslation();
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/stats/:plat/:eaid/:game" component={Stats}/>
        </Switch>
    )
}

export default Views;