/*
Service for Blog DB Operations and more. The Service acts as the Worker and recieves tasks from the
Controller (Manager)  on what actions need to be performed. The Service returns this data back to the
controller. Services communicate directly to the DB via Mongoose.

More information on the Controller-Service relationship can be found here:
https://www.coreycleary.me/what-is-the-difference-between-controllers-and-services-in-node-rest-apis
*/

const Blog = require("../models/Blog.model")
// const db = require('./db.service');
// const helper = require('../utils/helper.util');
// const config = require('../configs/general.config');

async function getMultiple(page = 1){
//   const offset = helper.getOffset(page, config.listPerPage);
  const blogs = await Blog.find().limit(25);
  return blogs
}

async function getSingle(id) {
    const blog = await Blog.findById(id)
        .populate("writer");
    return blog
}

async function create(blog){
    const result = await Blog.create(blog);
    return result
}

async function update(id, newBlog){
    const result = await Blog.findByIdAndUpdate(id, newBlog);
    return result
}

async function remove(id){
    const result = await Blog.findByIdAndDelete(id)
    return result
}

module.exports = {
  getMultiple,
  getSingle,
  create,
  update,
  remove
}