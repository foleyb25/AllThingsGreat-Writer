/*
Defines the controller endpoints and slug information for Comments. The endpoints are defined 
here and the router is registered for app use in app.js
*/

const express = require('express');
const router = express.Router();
const Comment = require("../controllers/comments.controller");
const API_V2 = "/api/v2/comments"

router.get(`${API_V2}`, Comment.getAll)
router.get(`${API_V2}/:id`, Comment.getById);
router.post(`${API_V2}`, Comment.create);
router.patch(`${API_V2}/:id`, Comment.update);
// router.delete(`${comments_slug}:id`, Comment.remove);

module.exports = router;