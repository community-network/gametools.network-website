import '../locales/config';
import { Switch, Route, Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Home from "./routes/Home"
import PlayerSearch from "./routes/PlayerSearch"
import ServerSearch from "./routes/ServerSearch"
import Stats from "./routes/Stats"

function Views() {
    const homePage = useLocation().pathname === "/"
    const { t } = useTranslation();
    return (
        <div style={homePage ? {} : {paddingTop:90}}>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/stats" component={PlayerSearch}/>
                <Route exact path="/servers" component={ServerSearch}/>
                <Route exact path="/stats/:plat/:eaid/" component={Stats}/>
                <Route>React router 404</Route>
            </Switch>
        </div>
    )
}

export default Views;