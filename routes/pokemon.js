const express = require('express')
const router = express.Router()

// MODELS
const Pokemon = require('../models/Pokemon');

// @Route GET /pokemon/
// @Desc Get all pokemon data (sorted)
// @Access PUBLIC
router.get('/', (req, res) => {
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
})

// @Route GET /pokemon/:id
// @Desc Get a specific pokemon data by id or name (sorted)
// @Access PUBLIC
router.get('/:id', (req, res) => {
    const { id } = req.params;

    if (Number.isInteger(+id)) { //Check whether id is a pure number
        Pokemon.findOne({id: id})
            .then(result => {
                if(result) {
                    res.json(result);
                }
                else {
                    res.status(404).json({
                        msg: 'No resource found'
                    });
                }
            })
            .catch(err => {
                res.status(500);
                console.log('ERROR:', err.message);
            });
    } else {
        Pokemon.findOne({us: { '$regex' : id, '$options' : 'i' }})
            .sort({ id: 'asc'})
            .then(result => {
                if(result) {
                    res.json(result);
                }
                else {
                    res.status(404).json({
                        msg: 'No resource found. To search a resource with only a part of its name please use /pokemon?search=stringYouWantToMatch'
                    });
                }
            })
            .catch(err => {
                res.status(500);
                console.log('ERROR:', err.message);
            });
    }
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
})

module.exports = router