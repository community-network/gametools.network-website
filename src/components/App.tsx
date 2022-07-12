import * as React from "react";
import { BrowserRouter } from "react-router-dom";
// import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";
import { Footer } from "./main/Footer";
import { Navbar } from "./main/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";
import Views from "./Views";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <Navbar />
    <QueryClientProvider client={queryClient}>
      <Views />
    </QueryClientProvider>
    <Footer />
  </BrowserRouter>
);

export default App;
