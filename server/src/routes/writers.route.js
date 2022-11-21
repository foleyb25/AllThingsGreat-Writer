/*
Defines the controller endpoints and slug information for Writers. The endpoints are defined 
here and the router is registered for app use in app.js
*/

const express = require('express');
const router = express.Router();
const Writer = require("../controllers/writers.controller");
const constants = require("../lib/constants.lib")

router.get(`${constants.API_V2}/writers`, Writer.getAll)
router.get(`${constants.API_V2}/writers/:id`, Writer.getById);
router.post(`${constants.API_V2}/writers`, Writer.create);
router.patch(`${constants.API_V2}/writers/:id`, Writer.update);
// router.delete(`${writers_slug}:id`, Writer.remove);

module.exports = router;