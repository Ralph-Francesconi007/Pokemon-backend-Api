// require in mongoose
const mongoose = require('mongoose')

// Create new Pokemon Schema
const pokemonSchema = new mongoose.Schema({
  // Name part of Schema should have be string and required
  pokemonImage: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  // Type refers to their ability and should be string and required
  type: {
    type: String,
    required: true
  },
  // This will be the pokemon's best move and should be a string and required
  move: {
    type: String,
    required: true
  },
  strengths: {
    type: String,
    required: true
  },
  weaknesses: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  // add timestamps option for createdAt and updatedAt
  timestamps: true
})

// Create a pokemon model
const Pokemon = mongoose.model('Pokemon', pokemonSchema)

module.exports = Pokemon
