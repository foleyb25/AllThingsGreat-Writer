/*
Defines the controller endpoints and slug information for Writers. The endpoints are defined 
here and the router is registered for app use in app.js
*/

const express = require('express');
const router = express.Router();
const Writer = require("../controllers/writers.controller");
const API_V2 = "/api/v2/writers"

router.get(`${API_V2}`, Writer.getAll)
router.get(`${API_V2}/:id`, Writer.getById);
router.post(`${API_V2}`, Writer.create);
router.patch(`${API_V2}/:id`, Writer.update);
// router.delete(`${writers_slug}:id`, Writer.remove);

module.exports = router;