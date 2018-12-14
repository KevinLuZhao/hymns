const express = require('express');
const app = new express();
const router = express.Router();
const bodyParser = require("body-parser")

const categories = require('./modules/categories.js');
const songs=require('./modules/songs.js');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/' + 'index.htm');
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

const server = app.listen(3002, ()=>{
    const host = server.address().address;
    const port = server.address().port;
    console.log("Server connected...");
})
