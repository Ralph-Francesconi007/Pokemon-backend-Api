// Require in the pokemonSchema
const Pokemon = require('./../models/pokemon')

// require in express
const express = require('express')

// require in router
const router = express.Router()

// require passport
const passport = require('passport')

// handle404 error
const handle404 = require('./../../lib/custom_errors')

const removeBlanks = require('../../lib/remove_blank_fields')

// require Token
const requireToken = passport.authenticate('bearer', { session: false })

// Create router
router.post('/pokemon', requireToken, (req, res, next) => {
  // extract the pokemon from request body
  const pokemonData = req.body.pokemon
  req.body.pokemon.owner = req.user.id

  // use our Pokemon model
  Pokemon.create(pokemonData)
  // pokemon created successfully
    .then(pokemon => res.status(201).json({ pokemon: pokemon.toObject() }))
    // Create error
    .catch(next)
})

// Index router
router.get('/pokemon', requireToken, (req, res, next) => {
  // const pokemonData = req.body.pokemon

  Pokemon.find()
    .populate('owner')
    .then(pokemon => {
      res.status(201).json({ pokemon })
    })
    .catch(next)
})

// Show router
router.get('/pokemon/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  const pokemonData = req.body.pokemon

  Pokemon.findById(id)
    .populate('owner')
    .then(pokemon => handle404(pokemon))
    .catch(next)
})

// Update router
router.patch('/pokemon/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  const pokemonData = req.body.pokemon

  Pokemon.findById(id)
    .populate('owner')
    .then(pokemon => pokemon.updateOne(pokemonData))
    .then(pokemon => res.json({ pokemon }))
    .catch(next)
})

// Destroy router
router.delete('/pokemon/:id', requireToken, (req, res, next) => {
  const id = req.params.id

  Pokemon.findById(id)
    .then(handle404)
    .then(pokemon => pokemon.deleteOne())
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
