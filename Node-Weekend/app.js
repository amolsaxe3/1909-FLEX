//FS librabry/require
const fs = require('fs');
const http = require('http');
//console.log(process);

//PROMISIFYING THE REQUIRE/READ FILE
const readFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err,data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.toString());
            }
        }) 
    });
}

http.createServer((req, res) => {
    console.log("", req.url);
    if(req.url === 'api/users'){
        readFile('./users.json')
        .then(data => {
            res.write(data);
            res.end();
        })
        .catch( ex => {
            res.statusCode = 500;
            res.write(ex.message);
            res.end();
        });
    } else if(req.url === '/'){
            readFile('./index.html')
            .then(data => {
                res.write(data);
                res.end();
            })
            .catch( ex => {
                res.statusCode = 500;
                res.write(ex.message);
                res.end();
            });
    }
}).listen(3000);


// readFile('./users.json')
//     .then( data => console.log('resovled',data))
//     .catch( ex => console.log('rejected',ex));

// fs.readFile('./users.json', (err, data) => {
// if(err) {
//     console.log(err);
// } else {
//     console.log(data.toString());
// }
// });


// Basic Node
// console.log('hello world')

// console.log('hello from node...');
// const foo = 'bar';
// //console.log(foo);
// const interval = setInterval(() =>  console.log(foo), 500);
// setTimeout(()=> clearInterval(interval),4000);
// >nodemon app.js  

// nodemon app.js --ignore users.json

