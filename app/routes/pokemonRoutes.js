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

const customErrors = require('../../lib/custom_errors')

const removeBlanks = require('../../lib/remove_blank_fields')

const requireOwnership = customErrors.requireOwnership

// require Token
const requireToken = passport.authenticate('bearer', { session: false })

// Create router
router.post('/pokemon', requireToken, (req, res, next) => {
  req.body.pokemon.owner = req.user._id
  const pokemonData = req.body.pokemon
  // use our Pokemon model
  Pokemon.create(pokemonData)
  // pokemon created successfully
    .then(pokemon => {
      res.status(201).json({ pokemon })
    })
    // Create error
    .catch(next)
})

// Index router
router.get('/pokemon', requireToken, (req, res, next) => {
  Pokemon.find({owner: req.user.id})
    // .populate('owner')
    .then(pokemon => {
      return pokemon.map(pokemon => pokemon.toObject())
    })
    .then(pokemon => {
      res.status(201).json({ pokemon })
    })
    .catch(next)
})

// Show router
router.get('/pokemon/:id', requireToken, (req, res, next) => {
  const id = req.params.id

  Pokemon.findById(id)
    .populate('owner')
    .then(handle404)
    .then(pokemon => res.status(200).json({ pokemon }))
    .catch(next)
})

// Update router
router.patch('/pokemon/:id', requireToken, removeBlanks, (req, res, next) => {
  Pokemon.findById(req.params.id)
    .then(handle404)
    .then(pokemon => {
      requireOwnership(req, pokemon)
      return pokemon.updateOne(req.body.pokemon)
    })
    .then(pokemon => res.json({ pokemon }))
    .catch(next)
})

// Destroy router
router.delete('/pokemon/:id', requireToken, (req, res, next) => {
  const id = req.params.id

  Pokemon.findById(id)
    .then(handle404)
    .then(pokemon => {
      requireOwnership(req, pokemon)
      pokemon.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
