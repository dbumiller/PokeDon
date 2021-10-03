const router = require('express').Router();
const controller = require('./controller.js');



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

module.exports = router;