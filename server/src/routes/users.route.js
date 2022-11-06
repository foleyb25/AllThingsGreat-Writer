/*
Defines the controller endpoints and slug information for Users. The endpoints are defined 
here and the router is registered for app use in app.js
*/

const express = require('express');
const router = express.Router();
const User = require("../controllers/users.controller");
const users_slug = "/api/users/"

router.get(`${users_slug}`, User.getAll)
router.get(`${users_slug}:id`, User.getById);
router.post(`${users_slug}`, User.create);
router.patch(`${users_slug}:id`, User.update);
// router.delete(`${screenplays_slug}:id`, Screenplay.remove);

module.exports = router;