import * as React from "react";
import { HashRouter } from "react-router-dom";
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
      <HashRouter>
        <Navbar />
        <QueryClientProvider client={queryClient}>
          <Views />
        </QueryClientProvider>
        <Footer />
      </HashRouter>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
