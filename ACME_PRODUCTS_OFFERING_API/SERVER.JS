const express = require('express');
const app = express();
const db = require('./db');
const { conn } = db;
const { pluralize } = require('inflection');
const path = require('path');


const port = process.env.PORT || 3000;

db.syncAndSeed()
  .then(() => {
    app.listen( port, () => console.log(`listening on port ${port}`));
  })
  .catch(console.log("in syncandseed() catch"));

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));
});

Object.entries(conn.models).forEach(([name, model])=> {
  app.get(`/api/${pluralize(name)}`, (req, res, next)=> {
    model.findAll()
      .then( items => res.send(items))
      .catch(next);
  });
});