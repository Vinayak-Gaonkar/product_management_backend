'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const helmet = require('helmet')
const logger = require('../utils/logger')
const middleware = require('./middleware')
const connection = require('../models/index')
const path = require('path')
const router = require('./router')
const cors = require('cors')
// const formidable = require('express-formidable');
const config = require(path.resolve('.') + '/config')

// Secure Express app by setting various HTTP headers
app.use(helmet())

// app.use(formidable());
// Body-parser (To parse the request body)
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json({ type: 'application/*+json' }))
// app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))



app.use(cors())

app.use(bodyParser.json({ limit: "10mb" }));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "10mb"
    })
);

app.use('/', express.static(path.join(__dirname, '../uploads/user')));
// app.use(middleware.auth.token)
/**
    Add to avoid cross origin access.
    Access-Control-Allow-Origin is set to '*' so that server REST APIs are accessible for all the domains.
    By setting domain name to some value, the API access can be restricted to only the mentioned domain.
    Eg, Access-Control-Allow-Origin: 'mywebsite.com'
*/
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', 'x-access-token,Content-Type')
//     res.header('Access-Control-Expose-Headers', 'x-access-token,Content-Type')
//     res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
//     res.header('Content-Type', 'text/plain')
//     res.header('Content-Type', 'application/json')
//     next()
// })

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Max-Age", 600);
    res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS,DELETE,PUT")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Authentication-Token, Accept");
    res.header("X-Frame-Options", "DENY");
    next();
});

// Set the port no
app.set('port', process.env.PORT || config.environment.port)
// app.use(expresslogger.logger)
// app.use(validator())


// app.use(middleware.auth.token)
app.use('/', router)
app.use('/sample', express.static('public'))

app.use('/', function (err, req, res, next) {
    err.status = 400
    logger.error('index | Error: ', err)
    res.status(err.status || 400).json({
        success: false,
        error: {
            message: 'Server Error'
        }
    })
})
app.use(function (req, res) {
    let err = new Error('URL Not Found')
    err.status = 404
    logger.error('index | Invalid Url', req.url)
    res.status(err.status || 404).json({
        success: false,
        error: {
            message: "URL '" + req.url + "' with method '" + req.method + "' not exist"
        }
    })
})
app.listen(app.get('port'))
logger.info('Server Running on port no: ' + app.get('port'))

process.on('uncaughtException', function (err) {
    logger.info('index | uncaughtException, Error: ', err)
    process.exit(1)
})
