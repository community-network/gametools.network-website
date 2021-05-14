import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";
import {Footer} from "./main/Footer"
import {Navbar} from "./main/Navbar"
import { QueryClient, QueryClientProvider } from 'react-query'
import Views from "./Views"

const queryClient = new QueryClient();

class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <BrowserRouter>
        <Navbar />
        <QueryClientProvider client={queryClient}>
          <Views />
        </QueryClientProvider>
        <Footer />
      </BrowserRouter>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
