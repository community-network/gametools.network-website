import React from 'react';
import { renderToString } from 'react-dom/server';

import express from 'express';

import html from './html';
import App from '../App';

import { translateServer } from '../i18n';


const port = 3000;
const server = express();

let { translateHandle, i18next } = translateServer();

server.use(
    translateHandle
);

server.use(
    express.static('dist')
);


server.get('/', (req, res) => {

    // Build React page
    const body = renderToString(React.createElement(App));

    // I hate this
    let translator = (req as any).t;

    // Return html
    res.send(
        html(body, translator)
    );

})

server.listen(port, () => console.log('Server is running'));