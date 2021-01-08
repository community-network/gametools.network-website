import React from 'react';
import { renderToString } from 'react-dom/server';

import express from 'express';

import html from './html';
import { ServerRouter, paths } from '../views/routes';
import { translateServer } from '../i18n';


const port = 3000;
const server = express();

let { translateHandle } = translateServer();

server.use(
    translateHandle
);

server.use(
    express.static('dist')
);

server.get(paths, (req, res) => {

    const context = {};
    const body = renderToString(
        <ServerRouter url={req.url} context={context} />
    );

    let translator = (req as any).t;
    let redirectUrl = (context as any).url;

    if (redirectUrl) {
        res
            .redirect(302, redirectUrl)
    } else {
        res
            .status(200)
            .send(html(body, translator))
    }

})

server.listen(port, () => console.log('Server is running'));
