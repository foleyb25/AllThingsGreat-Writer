/*
Defines the controller endpoints and slug information for Screenplayreviews. The endpoints are defined 
here and the router is registered for app use in app.js
*/

const express = require('express');
const router = express.Router();
const Screenplayreview = require("../controllers/screenplayreviews.controller");
const API_V2 = "/api/v2/screenplayreviews"

router.get(`${API_V2}`, Screenplayreview.getAll)
router.get(`${API_V2}/:id`, Screenplayreview.getById);
router.post(`${API_V2}`, Screenplayreview.create);
router.patch(`${API_V2}/:id`, Screenplayreview.update);
// router.delete(`${screenplayreview_slug}:id`, Screenplayreview.remove);

module.exports = router;