/*
Defines the controller endpoints and slug information for Blogs. The endpoints are defined 
here and the router is registered for app use in app.js
*/

const express = require('express');
const router = express.Router();
const Blog = require("../controllers/blogs.controller");
const API_V2 = "/api/v2/blogs"

router.get(`${API_V2}`, Blog.getAll)
router.get(`${API_V2}/:id`, Blog.getById);
router.post(`${API_V2}`, Blog.create);
router.patch(`${API_V2}/:id`, Blog.update);
// router.delete(`${blogs_slug}:id`, Blog.remove);

module.exports = router;