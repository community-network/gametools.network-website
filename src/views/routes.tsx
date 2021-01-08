import React from 'react';

import { Route, Redirect, Switch, StaticRouter } from 'react-router';
import { BrowserRouter } from "react-router-dom";

// Import Views
import Home from './Home';
import Stats from './Stats';
import OriginProfile from './OriginProfile';


function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/stats" component={Stats} />
            <Redirect exact from="/stats/:eaid/" to="/stats/:eaid/bf1" />
            <Route exact path="/stats/:eaid/:game" component={OriginProfile} />
        </Switch>
    );
}

export function ServerRouter(props) {
    return (
        <StaticRouter location={props.url} context={props.context}>
            <Routes />
        </StaticRouter>
    );
}

export function ClientRouter(props) {
    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    );
}


// Use it in server-render to prevent overwrite of other files
export const paths = ['/', /\/stats(|\/[a-zA-Z0-9_-]+(|\/[a-zA-Z0-9_-]+))\/?$/];
