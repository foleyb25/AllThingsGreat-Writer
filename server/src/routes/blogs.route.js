/*
Defines the controller endpoints and slug information for Blogs. The endpoints are defined 
here and the router is registered for app use in app.js
*/

const express = require('express');
const router = express.Router();
const Blog = require("../controllers/blogs.controller");
const blogs_slug = "/api/blogs"

router.get(`${blogs_slug}`, Blog.getAll)
router.get(`${blogs_slug}/:id`, Blog.getById);
router.post(`${blogs_slug}`, Blog.create);
router.patch(`${blogs_slug}/:id`, Blog.update);
// router.delete(`${blogs_slug}:id`, Blog.remove);

module.exports = router;