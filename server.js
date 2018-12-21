const express = require('express');
const app = new express();
const router = express.Router();
const bodyParser = require("body-parser")
const categories = require('./modules/categories.js');
const errorhandler = require('errorhandler');
const songs=require('./modules/songs.js');
const config = require('./modules/app_configs').Config;

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
        app.get('/', (req, res)=>{
            res.sendFile(__dirname + '/public/index.htm');
        })
        
        router.route('/categories')
            .get(function(req, res){
                res.send(categories.Categories);
            });
        
        router.route('/songs')
            .post(function(req,res){
                songs.GetSongList(req.body.id, req.body.term)
                    .then(result=>{
                        res.send(result);
                    });
            });
        
        router.route('/song')
            .post(function(req,res){
                console.log("received fom ajax post: ", req.body);
                songs.GetSongByName(req.body.name)
                    .then(result=>{
                        res.send(result);
                    });
            });
        
        app.use('/api', router);
    }
}
let server = new Server();