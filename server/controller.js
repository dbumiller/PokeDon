// Gives this file access to the models file in the database folder
const model = require('../db/models.js');

// Creates a controller object to handle HTTP requests
const controller = {
  // Requests labeled teamGet get sent here
  teamGet: (req, res) => {
    // Calls the get function in the teams object from the models file
    model.teams.get()
    // Asynchronously processes the output of that function
    .then((results) => {
      // Sends the resulting database query to the front end
      res.status(200).send(results);
    })
    // Asynchronously handles a returned error from the database
    .catch((err) => {
      // Sends the resulting error to the front end
      res.status(400).send(err);
    })
  },
  // Requests labeled teamPost get sent here
  teamPost: (req, res) => {
    // Calls the post function from the teams object in the models file, sending it the body of the request as an input thanks to bodyparser
    model.teams.post(req.body)
    // Asynchronously processes the output of that function
    .then((results) => {
      // Sends the resulting database query to the front end
      res.status(200).send(results);
    })
    // Asynchronously handles a returned error from the database
    .catch((err) => {
      // Sends the resulting error to the front end
      res.status(400).send(err);
    })
  },


  // Requests labeled choosePokemon get sent here
  choosePokemon: (req, res) => {
    // Calls the choosePokemon function from the pokemon object in the models file, sending it the pokemon id from the parameters and team id from the body
    model.pokemon.choosePokemon(req.params.id, req.body.id)
    // Asynchronously procceses the output of that function
    .then((results) => {
      // Sends the resulting database query to the front end
      res.status(200).send(results);
    })
    // Asynchronously handles a returned error from the database
    .catch((err) => {
      // Sends teh resulting error to the front end
      res.status(400).send(err);
    })
  },

  // Requests labeled getRoster get sent here
  getRoster: (req, res) => {
    // Calls the getRoster function from the pokemon object in the models file, sending it the pokemon id from the parameters
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