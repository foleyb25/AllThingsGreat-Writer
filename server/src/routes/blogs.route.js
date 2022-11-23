/*
Defines the controller endpoints and slug information for Blogs. The endpoints are defined 
here and the router is registered for app use in app.js
*/

const express = require('express');
const router = express.Router();
const Blog = require("../controllers/blogs.controller");

router.get(``, Blog.getAll)
router.get(`/:id`, Blog.getById);
router.post(``, Blog.create);
router.patch(`/:id`, Blog.update);
// router.delete(`${blogs_slug}:id`, Blog.remove);

module.exports = router;