import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import ReactGA from "react-ga4";
import reportWebVitals from "./reportWebVitals";

ReactGA.initialize("G-QVBKT0H4QV");
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

const SendAnalytics = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
  });
};

reportWebVitals(SendAnalytics);
