
import "../locales/config";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { Footer } from "./main/Footer";
import { Navbar } from "./main/Navbar";
import { lazy, Suspense } from "react";

// Routes
const Home = lazy(() => import("./routes/Home"));
const PrivacyPolicy = lazy(() => import("./routes/PrivacyPolicy"));
const PlayerSearch = lazy(
  () => import("./routes/Stats/Search/PlayerSearch"),
);
const ServerSearch = lazy(() => import("./routes/Servers/Search/Main"));
const PlatoonSearch = lazy(
  () => import("./routes/platoons/PlatoonSearch"),
);
const Stats = lazy(() => import("./routes/Stats/Player/Main"));
const Servers = lazy(() => import("./routes/Servers/Detailed/Servers"));
const Playgrounds = lazy(
  () => import("./routes/Playgrounds/Detailed/Playgrounds"),
);
const PlaygroundSelect = lazy(
  () => import("./routes/Playgrounds/Select/Main"),
);
const Platoon = lazy(() => import("./routes/platoons/Platoon"));
const Launch = lazy(() => import("./routes/GameLauncher"));
const PageNotFound = lazy(() => import("./errors/PageNotFound"));

function Views(): React.ReactElement {
  const homePage = useLocation().pathname === "/";
  const { t } = useTranslation();
  return (
    <div style={homePage ? {} : { paddingTop: 90 }}>
      <Suspense fallback={<div>{t("loading")}</div>}>
        <Navbar />
        <main role="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
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
              element={
                <Navigate to="/servers/:gameid/:type/:sname/pc" replace />
              }
            />
            <Route
              path="/servers/:gameid/:type/:sname/:platform"
              element={<Servers />}
            />
            <Route path="/join-game/:gameid/:ip/:port" element={<Launch />} />
            <Route path="/playgrounds" element={<PlaygroundSelect />} />
            <Route
              path="/playgrounds/:gameid/:type/:playground"
              element={<Playgrounds />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </Suspense>
    </div>
  );
}

export default Views;
