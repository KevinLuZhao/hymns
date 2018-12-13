const express = require('express');
const app = new express();

const router = express.Router();

const categories = require('./modules/categories.js');


app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/' + 'index.htm');
})

//app.get('/api/categories', (req, res)=>{
//    console.log("From categories service:", categories.Categories);
//});

router.route('/categories')
.get(function(req, res){
    console.log(categories.Categories);
    res.send(categories.Categories);
})

app.use('/api', router);

const server = app.listen(3002, ()=>{
    const host = server.address().address;
    const port = server.address().port;
})
