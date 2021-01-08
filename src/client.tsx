import React from "react";
import ReactDOM from "react-dom";

import { ClientRouter } from './views/routes';
import { translateClient } from './i18n';

translateClient();

ReactDOM.hydrate(
    <ClientRouter />,
    document.getElementById("app")
);