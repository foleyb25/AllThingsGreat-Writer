/*
Defines the controller endpoints and slug information for Users. The endpoints are defined 
here and the router is registered for app use in app.js
*/

const express = require('express');
const router = express.Router();
const User = require("../controllers/users.controller");
const API_V2 = "/api/v2/users"

router.get(`${API_V2}`, User.getAll)
router.get(`${API_V2}/:id`, User.getById);
router.post(`${API_V2}`, User.create);
router.patch(`${API_V2}/:id`, User.update);
// router.delete(`${screenplays_slug}:id`, Screenplay.remove);

module.exports = router;