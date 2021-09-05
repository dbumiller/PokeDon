const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/')
  // .get(controller.get)
  // .post(controller.post)

router
  .route('/:id')
  .put(controller.put)
  .delete(controller.delete)

  router
  .route('/team')
  .get(controller.teamGet)
  .post(controller.teamPost)

  router
  .route('/team/:id')
  .get(controller.getRoster)

module.exports = router;