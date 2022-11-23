/*
Defines the controller endpoints and slug information for Screenplayreviews. The endpoints are defined 
here and the router is registered for app use in app.js
*/

const express = require('express');
const router = express.Router();
const Screenplayreview = require("../controllers/screenplayreviews.controller");

router.get(``, Screenplayreview.getAll)
router.get(`/:id`, Screenplayreview.getById);
router.post(``, Screenplayreview.create);
router.patch(`/:id`, Screenplayreview.update);
// router.delete(`${screenplayreview_slug}:id`, Screenplayreview.remove);

module.exports = router;