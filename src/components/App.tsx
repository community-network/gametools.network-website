import * as React from "react";
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";
import {Footer} from "./main/Footer"
import {Navbar} from "./main/Navbar"
import Stats from "./stats/main"
import { QueryClient, QueryClientProvider } from 'react-query'


const queryClient = new QueryClient();

class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <HashRouter>
        <Navbar></Navbar>
        <QueryClientProvider client={queryClient}>
          <Route path="/stats/:plat/:eaid/:game" component={Stats}/>
        </QueryClientProvider>
        <Footer></Footer>
      </HashRouter>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
