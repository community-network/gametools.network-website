import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import "./../assets/scss/App.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Views from "./Views";
import { I18nextProvider } from "react-i18next";
import i18n from "../locales/config";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <Views />
      </I18nextProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
