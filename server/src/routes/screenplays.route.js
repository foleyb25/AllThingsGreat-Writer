/*
Defines the controller endpoints and slug information for Screenplays. The endpoints are defined 
here and the router is registered for app use in app.js
*/

const express = require('express');
const router = express.Router();
const Screenplays = require("../controllers/screenplays.controller");
const screenplays_slug = "/api/screenplays"

router.get(`${screenplays_slug}`, Screenplays.getAll)
router.get(`${screenplays_slug}/:id`, Screenplays.getById);
router.get(`${screenplays_slug}/search/:pageNum/:searchString`, Screenplays.searchScreenplays);
router.post(`${screenplays_slug}`, Screenplays.create);
router.patch(`${screenplays_slug}/:id`, Screenplays.update);
// router.delete(`${screenplays_slug}:id`, Screenplays.remove);

module.exports = router;