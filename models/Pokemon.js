const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
    jp: String,
    kr: String,
    cn: String,
    fr: String,
    de: String,
    es: String,
    it: String,
    us: String,
    id: Number,
    sprite: String
},  { collection: 'pokemon-languages' });

module.exports = mongoose.model("Pokemon", pokemonSchema);