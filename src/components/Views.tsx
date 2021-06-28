import React from "react";
import "../locales/config";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Home from "./routes/Home";
import PlayerSearch from "./routes/PlayerSearch";
import ServerSearch from "./routes/ServerSearch";
import Stats from "./routes/Stats";
import Servers from "./routes/Servers";

function Views(): React.ReactElement {
  const homePage = useLocation().pathname === "/";
  return (
    <div style={homePage ? {} : { paddingTop: 90 }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/stats" component={PlayerSearch} />
        <Route exact path="/stats/:plat/:type/:eaid/" component={Stats} />
        <Route exact path="/servers" component={ServerSearch} />
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
        <Route>React router 404</Route>
      </Switch>
    </div>
  );
}

export default Views;
