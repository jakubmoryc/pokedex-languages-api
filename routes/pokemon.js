const express = require('express');
const router = express.Router();

const langRoute = require('./lang/lang');


// MODELS
const Pokemon = require('../models/Pokemon');

// ROUTES

// @Route GET /pokemon/
// @Params search, limit, page
// @Desc Get all pokemon data or search using a string; limit + page
// @Access PUBLIC
router.get('/', (req, res) => {
    const { search, limit = 20, offset = 0 } = req.query

    if(search) {
        Pokemon.find({us: new RegExp(search, 'i')})
        .sort({ id: 'asc'})
        .skip(+offset)
        .limit(+limit)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500);
            console.log('ERROR:', err.message);
        });
    } else {
        Pokemon.find({})
        .sort({ id: 'asc'})
        .skip(+offset)
        .limit(+limit)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500);
            console.log('ERROR:', err.message);
        });
    };
});

// @Route GET /pokemon/:id(3 digit int)
// @Desc Get a specific pokemon data by its id
// @Access PUBLIC
router.get('/:id([0-9][0-9]?[0-9]?)', (req, res) => {
    const { id } = req.params;

    Pokemon.findOne({id: id})
        .then(result => {
            if(result) {
                res.json(result);
            }
            else {
                res.status(404).json({
                    msg: 'No resource found with such id'
                });
            };
        })
        .catch(err => {
            res.status(500);
            console.log('ERROR:', err.message);
        });
    }
);

// @Route GET /pokemon/:id(string)
// @Desc Get a specific pokemon data by its name
// @Access PUBLIC
router.get('/:id([^13456789/]+)', (req, res) => {
    const { id } = req.params;
    
    Pokemon.findOne({us: new RegExp(`\\b${id}\\b`, 'i')}) //Case insensitive, exact regex match
        .then(result => {
            if(result) {
                res.json(result);
            }
            else {
                res.status(404).json({
                    msg: 'No resource found. To search resources with only a part of its name please use /pokemon?search=stringYouWantToMatch'
                });
            }
        })
        .catch(err => {
            res.status(500);
            console.log('ERROR:', err.message);
        });
    }
);

// SUBROUTES
router.use('/:id([0-9][0-9]?[0-9]?)/',(req, res, next) => {
    req.id = req.params.id;
    next()
}, langRoute)

router.use('/:id([^13456789/]+)/',(req, res, next) => {
    req.id = req.params.id;
    next()
}, langRoute)

module.exports = router;