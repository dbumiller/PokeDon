const model = require('../db/models.js');

const controller = {
  teamGet: (req, res) => {
    model.teams.get()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  },
  teamPost: (req, res) => {
    model.teams.post(req.body)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  },



  choosePokemon: (req, res) => {
    model.pokemon.choosePokemon(req.params.id, req.body.id)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  },

  getRoster: (req, res) => {
    model.pokemon.getRoster(req.params.id)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  },
  getAllPokemon: (req, res) => {
    model.pokemon.getAll()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  },
  lock: (req, res) => {
    console.log(req.params)
    model.pokemon.lock(req.params.name)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  },
  unlock: (req, res) => {
    model.pokemon.unlock(req.params.name)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(400).send(err)
    })
  }
}

module.exports = controller;