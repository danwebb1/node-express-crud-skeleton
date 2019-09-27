
// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const db 			 = require('./config/db');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
 require('./app/routes')(app, database);

require('./app/routes')(app, {});
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.get('/msg/', (req, res) => res.sendFile(__dirname + '/message.html'));
app.listen( 3000 );
})