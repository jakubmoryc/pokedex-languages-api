var express = require('express')
var router = express.Router()

// MODELS
const Pokemon = require("../models/Pokemon");

// @Route GET /pokemon/
// @Desc Get all pokemon data (sorted)
// @Access PUBLIC
router.get('/', (req, res) => {
    Pokemon.find({})
        .sort({ id: 'asc'})
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500);
            console.log('ERROR:', err.message);
        });
})

// @Route GET /pokemon/:id
// @Desc Get a specific pokemon data by id or name (sorted)
// @Access PUBLIC
router.get('/:id', (req, res) => {
    const { id } = req.params;

    if (Number.isInteger(+id)) { //Check whether id is a pure number
        Pokemon.find({id: id})
            .then(result => {
                if(result.length) {
                    res.json(result);
                }
                else {
                    res.status(404).json({
                        msg: "No resource found"
                    });
                }
            })
            .catch(err => {
                res.status(500);
                console.log('ERROR:', err.message);
            });
    } else {
        Pokemon.find({us: { '$regex' : id, '$options' : 'i' }})
            .sort({ id: 'asc'})
            .then(result => {
                if(result.length) {
                    res.json(result);
                }
                else {
                    res.status(404).json({
                        msg: "No resource found"
                    });
                }
            })
            .catch(err => {
                res.status(500);
                console.log('ERROR:', err.message);
            });
    }
})

module.exports = router