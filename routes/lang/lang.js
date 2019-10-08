const express = require('express');
const router = express.Router();

// MODELS
const Pokemon = require('../../models/Pokemon');

// ROUTES

router.get('/:lang', (req, res) => {
    const { id } = req;
    const { lang } = req.params;

    if (+id) {
        Pokemon.findOne({id: id})
            .then(result => {
                if(result[lang]) {
                    res.json({
                        href: req.protocol + '://' + req.get('host') + req.originalUrl,
                        id: result.id,
                        name: result.us,
                        resource: {
                            [lang]: result[lang]
                        }
                    });
                }
                else {
                    res.status(404).json({
                        msg: 'No resource/subresource found'
                    });
                };
            })
            .catch(err => {
                res.status(500);
                console.log('ERROR:', err.message);
            });
    } else {
        Pokemon.findOne({us: new RegExp(`\\b${id}\\b`, 'i')}) //Case insensitive, exact regex match
            .then(result => {
                if(result && result[lang]) {
                    res.json({
                        href: req.protocol + '://' + req.get('host') + req.originalUrl,
                        id: result.id,
                        name: result.us,
                        resource: {
                            [lang]: result[lang]
                        }
                    });
                }
                else {
                    res.status(404).json({
                        msg: 'No resource/subresource found'
                    });
                }
            })
            .catch(err => {
                res.status(500);
                console.log('ERROR:', err.message);
            });
    };

    
})

module.exports = router;