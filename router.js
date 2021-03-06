const express = require('express');
const categories = require('./api/categories.js');
const songs=require('./api/songs.js');

class RouterManager{
    load(app){
        const router = express.Router();

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
                songs.GetSong(req.body.name)
                    .then(result=>{
                        res.send(result);
                    });
        });

        router.route('/advancedsearch')
            .post(function(req,res){
                songs.GetAdvancedSearchResult(req.body.term)
                    .then(result=>{
                        res.send(result);
                    });
            });

        return router;
    }
}

module.exports = new RouterManager();