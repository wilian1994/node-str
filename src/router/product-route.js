'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controllers')

router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);
router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);

module.exports = router;