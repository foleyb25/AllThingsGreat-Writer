/*
Defines the controller endpoints and slug information for Watchservices. The endpoints are defined 
here and the router is registered for app use in app.js
*/

const express = require('express');
const router = express.Router();
const Watchservice = require("../controllers/watchservices.controller");
const watchservices_slug = "/api/watchservices/"

router.get(`${watchservices_slug}`, Watchservice.getAll)
router.get(`${watchservices_slug}:id`, Watchservice.getById);
router.post(`${watchservices_slug}`, Watchservice.create);
router.patch(`${watchservices_slug}:id`, Watchservice.update);
// router.delete(`${watchservices_slug}:id`, Watchservice.remove);

module.exports = router;