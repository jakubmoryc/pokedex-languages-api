const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

// IMPORT ROUTES
const pokemonRoute = require('./routes/pokemon')

// MODELS
const Pokemon = require("./models/Pokemon");

// DATABASE
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.once('open', () => {
    console.log("Connection to the database established");
});

// MIDDLEWARE
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
    // parse application/json
app.use(bodyParser.json());
    // CORS
app.use(cors())

// ROUTES
    // If request method is something else than GET, return 405
app.use('*', function(req, res, next) {
    if (req.method !== 'GET') {
        res.status(405).json({
            msg: "This API only supports GET requests"
        });
    } else
        next();
});

app.get('/', (req, res) => {
    res.json({
        msg: "Welcome to the Pokemon Languages API",
        version: "1.0.0",
        github: ""
    });
});

app.use('/pokemon', pokemonRoute);

    // Catch all other routes
app.all('*', (req, res) => { 
    res.status(400).json({
        msg: "Invalid URL",
    });
})

// PORT
const PORT = process.env.PORT || 3000;

// LISTEN
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});