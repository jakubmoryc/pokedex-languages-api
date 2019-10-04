const express = require('express')
const router = express.Router()

// MODELS
const Pokemon = require('../models/Pokemon');

// ROUTES

// @Route GET /pokemon/
// @Params search, limit, offset
// @Desc Get all pokemon data or search using a string; limit + offset
// @Access PUBLIC
router.get('/', (req, res) => {
    const { search, limit, page } = req.query

    if(search) {
        Pokemon.find({us: new RegExp(search, 'i')})
        .sort({ id: 'asc'})
        .skip(+page*+limit || 0)
        .limit(+limit || 20)
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
        .skip(0)
        .limit(20)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500);
            console.log('ERROR:', err.message);
        });
    }
})

// @Route GET /pokemon/:id(3 numbers)
// @Desc Get a specific pokemon data by id
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
            }
        })
        .catch(err => {
            res.status(500);
            console.log('ERROR:', err.message);
        });
    }
)

// @Route GET /pokemon/:id(string)
// @Desc Get a specific pokemon data by its name
// @Access PUBLIC
router.get('/:id([^13456789]+)', (req, res) => {
    const { id } = req.params;
    
    Pokemon.findOne({us: new RegExp(`\\b${id}\\b`, 'i')}) //Case insensitive, exact regex match
        .sort({ id: 'asc'})
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
)

module.exports = router

// Pokemon.find({us: { '$regex' : id, '$options' : 'i' }})
    // .sort({ id: 'asc'})
    // .then(result => {
    //     if(result.length) {
    //         res.json(result);
    //     }
    //     else {
    //         res.status(404).json({
    //             msg: "No resource found"
    //         });
    //     }
    // })
    // .catch(err => {
    //     res.status(500);
    //     console.log('ERROR:', err.message);
    // });

// Pokemon.find({us: { '$regex' : id, '$options' : 'i' }})
    // .sort({ id: 'asc'})
    // .then(result => {
    //     if(result.length) {
    //         res.json(result);
    //     }
    //     else {
    //         res.status(404).json({
    //             msg: "No resource found"
    //         });
    //     }
    // })
    // .catch(err => {
    //     res.status(500);
    //     console.log('ERROR:', err.message);
    // });