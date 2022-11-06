/*
Defines the controller endpoints and slug information for Writers. The endpoints are defined 
here and the router is registered for app use in app.js
*/

const express = require('express');
const router = express.Router();
const Writer = require("../controllers/writers.controller");
const writers_slug = "/api/writers/"

router.get(`${writers_slug}`, Writer.getAll)
router.get(`${writers_slug}:id`, Writer.getById);
router.post(`${writers_slug}`, Writer.create);
router.patch(`${writers_slug}:id`, Writer.update);
// router.delete(`${writers_slug}:id`, Writer.remove);

module.exports = router;