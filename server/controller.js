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


  put: (req, res) => {
    res.status(200).send(`updated ${req.params.id}`);
  },
  delete: (req, res) => {
    res.status(200).send(`deleted ${req.params.id}`);
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
  }
}

module.exports = controller;