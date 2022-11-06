/*
Defines the controller endpoints and slug information for Screenplayreviews. The endpoints are defined 
here and the router is registered for app use in app.js
*/

const express = require('express');
const router = express.Router();
const Screenplayreview = require("../controllers/screenplayreviews.controller");
const screenplayreview_slug = "/api/screenplayreviews/"

router.get(`${screenplayreview_slug}`, Screenplayreview.getAll)
router.get(`${screenplayreview_slug}:id`, Screenplayreview.getById);
router.post(`${screenplayreview_slug}`, Screenplayreview.create);
router.patch(`${screenplayreview_slug}:id`, Screenplayreview.update);
// router.delete(`${screenplayreview_slug}:id`, Screenplayreview.remove);

module.exports = router;