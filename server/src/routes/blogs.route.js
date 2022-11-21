/*
Defines the controller endpoints and slug information for Blogs. The endpoints are defined 
here and the router is registered for app use in app.js
*/

const express = require('express');
const router = express.Router();
const Blog = require("../controllers/blogs.controller");
const constants = require("../lib/constants.lib")

router.get(`${constants.API_V2}/blogs`, Blog.getAll)
router.get(`${constants.API_V2}/blogs/:id`, Blog.getById);
router.post(`${constants.API_V2}/blogs`, Blog.create);
router.patch(`${constants.API_V2}/blogs/:id`, Blog.update);
// router.delete(`${blogs_slug}:id`, Blog.remove);

module.exports = router;