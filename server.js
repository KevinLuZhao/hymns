const express = require('express');
const app = new express();

const router = express.Router();

const categories = require('./modules/categories.js');
const songs=require('./modules/songs.js');

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/' + 'index.htm');
})

router.route('/categories')
    .get(function(req, res){
        //console.log("From categories service:", categories.Categories);
        res.send(categories.Categories);
    });

router.route('/songs')
    .post(function(req,res){
        console.log(req);
        songs.GetSongList('aa')
            .then(result=>{
                console.log('The route got result:', result);
                res.send(result);
            });
    });

app.use('/api', router);

const server = app.listen(3002, ()=>{
    const host = server.address().address;
    const port = server.address().port;
    console.log("Server connected...");
})
