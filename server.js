const express     = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser  = require('body-parser');
const db          = require('./config/db');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded( { urlencoded: true, extended: true } ));
const client = new mongoClient(db.url, {useNewUrlParser: true, useUnifiedTopology: true} )
client.connect(err => {
    if (err) return console.log(err)

    require('./app/routes')(app, client.db('notable'));
    app.listen(port, () => {
        console.log("We are live on " + port);
    });

});
