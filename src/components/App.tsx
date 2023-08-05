import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import "./../assets/scss/App.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Views from "./Views";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Views />
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
