/*
Defines the controller endpoints and slug information for Screenplays. The endpoints are defined 
here and the router is registered for app use in app.js
*/

const express = require('express');
const router = express.Router();
const Screenplays = require("../controllers/screenplays.controller");
const API_V2 = "/api/v2/screenplays"

router.get(`${API_V2}`, Screenplays.getAll)
router.get(`${API_V2}/:id`, Screenplays.getById);
router.get(`${API_V2}/:pageNum/:searchString`, Screenplays.searchScreenplays);
router.post(`${API_V2}`, Screenplays.create);
router.patch(`${API_V2}/:id`, Screenplays.update);
// router.delete(`${screenplays_slug}:id`, Screenplays.remove);

module.exports = router;