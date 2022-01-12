import * as React from "react";
import "../locales/config";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Home from "./routes/Home";
import PlayerSearch from "./routes/Stats/Search/PlayerSearch";
import ServerSearch from "./routes/Servers/Search/ServerSearch";
import PlatoonSearch from "./routes/PlatoonSearch";
import Stats from "./routes/Stats/Player/Main";
import Servers from "./routes/Servers/Detailed/Servers";
import Platoon from "./routes/Platoon";
import PageNotFound from "./errors/PageNotFound";

function Views(): React.ReactElement {
  const homePage = useLocation().pathname === "/";
  return (
    <div style={homePage ? {} : { paddingTop: 90 }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/stats" component={PlayerSearch} />
        <Route exact path="/stats/:plat/:type/:eaid/" component={Stats} />
        <Route exact path="/platoons/:plat/:gid" component={Platoon} />
        <Route exact path="/platoons" component={PlatoonSearch} />
        <Route exact path="/servers" component={ServerSearch} />
        <Redirect exact from="/platoons/:gid" to="/platoons/pc/:gid" />
        <Redirect
          exact
          from="/servers/:gameid/:type/:sname"
          to="/servers/:gameid/:type/:sname/pc"
        />
        <Route
          exact
          path="/servers/:gameid/:type/:sname/:platform"
          component={Servers}
        />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default Views;
