import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";
import {Footer} from "./main/Footer"
import Stats from "./stats/main"

class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <Router>
        <Link to="/stats/">test</Link>
        <Route path="/stats/:plat/:eaid/:game" component={Stats}/>
        <Footer></Footer>
      </Router>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
