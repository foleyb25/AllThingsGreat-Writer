/*
Defines the controller endpoints and slug information for Comments. The endpoints are defined 
here and the router is registered for app use in app.js
*/

const express = require('express');
const router = express.Router();
const Comment = require("../controllers/comments.controller");
const comments_slug = "/api/comments/"

router.get(`${comments_slug}`, Comment.getAll)
router.get(`${comments_slug}:id`, Comment.getById);
router.post(`${comments_slug}`, Comment.create);
router.patch(`${comments_slug}:id`, Comment.update);
// router.delete(`${comments_slug}:id`, Comment.remove);

module.exports = router;