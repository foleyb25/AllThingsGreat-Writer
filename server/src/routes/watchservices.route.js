/*
Defines the controller endpoints and slug information for Watchservices. The endpoints are defined 
here and the router is registered for app use in app.js
*/

const express = require('express');
const router = express.Router();
const Watchservice = require("../controllers/watchservices.controller");
const API_V2 = "/api/v2/watchservices"

router.get(`${API_V2}`, Watchservice.getAll)
router.get(`${API_V2}/:id`, Watchservice.getById);
router.post(`${API_V2}`, Watchservice.create);
router.patch(`${API_V2}/:id`, Watchservice.update);
// router.delete(`${watchservices_slug}:id`, Watchservice.remove);

module.exports = router;