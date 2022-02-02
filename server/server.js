const express = require('express');
const path = require('path');
const next = require('next');
const logger = require('../logs');

const expressValidator = require('express-validator');
const http = require("http");
const favicon = require('serve-favicon');
const cors = require('cors');
const dotenv = require('dotenv');
const { parse } = require('url')
const bodyParser = require('body-parser')

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const auth = require('./google');

const {setupIo, setupTCP} = require('./sockets'); 

dotenv.config();
const app = express();
app.use(cors({ origin: '*' }));
const server = http.createServer(app);

//Create and maintain socket connections..
const HOST = 'ac-heat.com'//'10.0.0.109'; //for c++ socket
const SOCKET_PORT = 8081; //for c++ socket

//Handle Database
const database = require('./lib/db');

//Handles both socketio and c++ sockets
setupIo(server, HOST, SOCKET_PORT);
setupTCP(HOST,SOCKET_PORT,database);

const PORT = process.env.PORT || 8000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

//var machines = require('./api/machines/machines');
const conditioningUnits_route = require('./lib/conditioningUnits.js');
const zones_route = require('./lib/zones.js');
//const webPush = require('./lib/webPush');
//const notifications = require('./lib/notifications.js');

global.SERVER_APP_ROOT = __dirname;
global.ROOT_URL =  `http://ac-heat.com:${process.env.PORT}`;

nextApp
  .prepare()
  .then(() => {

    app.use(favicon(__dirname + '/../public/static/favicon.ico'));
    app.use(expressValidator());
    app.use(bodyParser.json({limit: '50mb'}));

    // The next two gets allow normal handle of regular static/next assets
    //   that do not need google auth. This needs to be before passport.session
    app.get('/_next*', (req, res) => {
      handle(req, res);
    });

    app.get('/static/*', (req, res) => {
      handle(req, res);
    });
    ////////////////

    
    //Custom Routes//
    app.use('/conditioningUnits', conditioningUnits_route);
    app.use('/zones', zones_route);
    //app.use('/scheduling/notifications', notifications.router);
    //app.use('/webPush', webPush.router);
    ///

    //Session   ////
    //Has to be above custom routes, otherwise req.session is not available to them
    var options = {
      host: process.env.host,
      port: 3306,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
      expiration: (14 * 24 * 60 * 60)
    };
    
    var sessionStore = new MySQLStore(options);
    //Could use existing connection like this 
    //var sessionStore = new MySQLStore({}/* session store options */, connection);
    
    app.use(session({
        name: 'ac_heat.sid',
        secret: 'HD2w.)q*VqRT4/#NK2M/,E^B)}FED5fWU!dKe[wk',
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          maxAge: 14 * 24 * 60 * 60 * 1000,
        }, 
        key: 'session_cookie_name',
        store: sessionStore,
    }));
    /////////////////
    // Authenticate User
    auth({ ROOT_URL, app ,database})

    // Custom Routes with session
      //Place vehicles here, because we need to access session.passport.user 

      //

    app.get('*', (req, res) => {
      const parsedUrl = parse(req.url, true)
      const { pathname } = parsedUrl;

      if (pathname === '/sw.js' || pathname.startsWith('/workbox-')) {
        console.log("SW or Worker");
        const filePath = path.join(__dirname, '/../public', pathname)
        logger.info(filePath);
        nextApp.serveStatic(req, res, filePath)
      } else {
        handle(req, res, parsedUrl)
      }
      //return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      logger.info(`> Ready on localhost:${PORT}`);
    });

  })
  .catch(ex => {
    logger.error(ex.stack);
    process.exit(1);
  });

  if(dev) {
    process.once('uncaughtException', function(err) {
      logger.error('FATAL: Uncaught exception.');
      logger.error(err.stack||err);
      setTimeout(function(){
        process.exit(1);
      }, 100);
    });
  }