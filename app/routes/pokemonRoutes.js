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
  req.body.pokemon.owner = req.user.id

  // use our Pokemon model
  Pokemon.create(req.body.pokemon)
  // pokemon created successfully
    .then(pokemon => res.status(201).json({ pokemon: pokemon.toObject() }))
    // Create error
    .catch(next)
})

// Index router
router.get('/pokemon', requireToken, (req, res, next) => {
  // const pokemonData = req.body.pokemon

  Pokemon.find({owner: req.user.id})
    // .populate('owner')
    .then(pokemon => {
      return pokemon.map(pokemon => pokemon.toObject())
    })
    .then(pokemon => {
      res.status(201).json({ pokemon: pokemon })
    })
    .catch(next)
})

// Show router
router.get('/pokemon/:id', requireToken, (req, res, next) => {
  const id = req.params.id

  Pokemon.findById(id)
    .populate('owner')
    .then(handle404)
    .then(pokemon => res.status(200).json({ pokemon: pokemon.toObject() }))
    .catch(next)
})

// Update router
router.patch('/pokemon/:id', requireToken, removeBlanks, (req, res, next) => {
  const id = req.params.id
  delete req.body.pokemon.owner

  Pokemon.findById(id)
    .then(handle404)
    .then(pokemon => {
      requireOwnership(req, pokemon)
      return pokemon.updateOne(req.body.pokemon)
    })
    .then(() => res.sendStatus(204))
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
