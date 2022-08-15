import * as React from "react";
import "../locales/config";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./routes/Home";
import PlayerSearch from "./routes/Stats/Search/PlayerSearch";
import ServerSearch from "./routes/Servers/Search/Main";
import PlatoonSearch from "./routes/platoons/PlatoonSearch";
import Stats from "./routes/Stats/Player/Main";
import Servers from "./routes/Servers/Detailed/Servers";
import Platoon from "./routes/platoons/Platoon";
import Launch from "./routes/GameLauncher";
import PageNotFound from "./errors/PageNotFound";

function Views(): React.ReactElement {
  const homePage = useLocation().pathname === "/";
  return (
    <div style={homePage ? {} : { paddingTop: 90 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<PlayerSearch />} />
        <Route path="/stats/:plat/:type/:eaid/" element={<Stats />} />
        <Route path="/platoons/:plat/:gid" element={<Platoon />} />
        <Route path="/platoons" element={<PlatoonSearch />} />
        <Route path="/servers" element={<ServerSearch />} />
        <Route
          path="/platoons/:gid"
          element={<Navigate to="/platoons/pc/:gid" replace />}
        />
        <Route
          path="/servers/:gameid/:type/:sname"
          element={<Navigate to="/servers/:gameid/:type/:sname/pc" replace />}
        />
        <Route
          path="/servers/:gameid/:type/:sname/:platform"
          element={<Servers />}
        />
        <Route path="/join-game/:gameid/:ip/:port" element={<Launch />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Views;
