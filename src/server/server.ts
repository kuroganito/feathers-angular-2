// polyfills
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';

// angular
import { enableProdMode } from '@angular/core';

// libs
import * as express from 'express';
import * as compression from 'compression';
import * as path from 'path';
import * as serve-favicon from 'serve-favicon';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as feathers from 'feathers';
import * as feathers-configuration from 'feathers-configuration';
import * as feathers-hooks from 'feathers-hooks';
import * as feathers-rest from 'feathers-rest';
import * as feathers-socketio from 'feathers-socketio';
import * as logger from 'logger';


import { ngExpressEngine } from '@ngx-universal/express-engine';

// module
import { AppServerModule } from './app/app.server.module';

enableProdMode();
const app = feathers();

const server = express();
server.use(compression());

/**
 * Set view engine
 */
server.engine('html', ngExpressEngine({
  bootstrap: AppServerModule
}));

server.set('view engine', 'html');
server.set('views', 'public');

/**
 * Point static path to `public`
 */
server.use('/', express.static('public', {index: false}));

/**
 * Catch all routes and return the `index.html`
 */
server.get('*', (req, res) => {
  res.render('../public/index.html', {
    req,
    res
  });
});

/**
 * Port & host settings
 */
const port = 8000;
const PORT = process.env.PORT || port;
const HOST = process.env.BASE_URL || 'localhost';
const baseUrl = `http://${HOST}:${PORT}`;

server.set('port', PORT);

/**
 * Begin listening
 */
server.listen(server.get('port'), () => {
  // tslint:disable-next-line
  console.log(`Express server listening on ${baseUrl}`);
});
