const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/')
  .get(controller.get)
  .post(controller.post)

router
  .route('/:id')
  .put(controller.put)
  .delete(controller.delete)

module.exports = router;