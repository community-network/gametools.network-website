import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { translateClient } from './i18n';

translateClient();

ReactDOM.hydrate(
    <App />,
    document.getElementById("app")
);