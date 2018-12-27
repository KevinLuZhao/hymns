const express = require('express');
const app = new express();
const bodyParser = require("body-parser")
const errorhandler = require('errorhandler');
const config = require('./api/app_configs').Config;

const routerManager = require('./router.js');

class Server{
    constructor() {
        this.initExpressMiddleWare();
        this.initRouters();
    }

    start(){
        app.listen(config.node_port, (err)=>{
            console.log(`${config.app_name} started...`);
        });
    }

    initExpressMiddleWare() {
        app.use(express.static(__dirname + '/public'));
        app.use(bodyParser.urlencoded({
            extended: true
        }));       
        app.use(bodyParser.json());
        app.use(errorhandler());
        this.start();
    }

    initRouters() {
        const router = routerManager.load(app);    
        app.use('/api', router);
    }
}
let server = new Server();