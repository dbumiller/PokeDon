// Creates a router that can handle requests in a modular and organized way
const router = require('express').Router();
// Lets file use the controller file
const controller = require('./controller.js');


// Any request routed to /api/team gets sent here and subsequently to the appropriate HTTP requests in the controller file
  router
  .route('/team')
  .get(controller.teamGet)
  .post(controller.teamPost)

  router
  .route('/team/:id')
  .get(controller.getRoster)

  router
  .route('/pokemon/:id')
  .put(controller.choosePokemon)

  router
  .route('/pokemon')
  .get(controller.getAllPokemon)

  router
  .route('/pokemon/lock/:name')
  .put(controller.lock)

  router
  .route('/pokemon/unlock/:name')
  .put(controller.unlock)

// Lets this file be used in other files
module.exports = router;