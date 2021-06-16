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
  }
}

module.exports = controller;