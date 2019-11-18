const express = require('express');
const path = require('path');
const app = express();
app.get('/', (req, res, next) => {

    //res.send('hello world!!!');
    res.sendFile(path.join(__dirname,'./index.html'));

});


app.listen(1000, ()=> console.log('listening on port 1000'));