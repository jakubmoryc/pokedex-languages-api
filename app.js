const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

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

// ROUTES
app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to Pokemon Languages API"
    });
});

// PORT
const PORT = process.env.PORT || 3000;

// LISTEN
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});