/*
Defines the controller endpoints and slug information for Writers. The endpoints are defined 
here and the router is registered for app use in app.js
*/

const express = require('express');
const router = express.Router();
const Writer = require("../controllers/writers.controller");

router.get(``, Writer.getAll)
router.get(`/:id`, Writer.getById);
router.post(``, Writer.create);
router.patch(`/:id`, Writer.update);
// router.delete(`${writers_slug}:id`, Writer.remove);

module.exports = router;