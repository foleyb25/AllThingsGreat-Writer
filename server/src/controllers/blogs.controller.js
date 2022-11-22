/*
Controller for Blog CRUD Operations and more. The Controller acts as the Manager and tells the
service (Worker) what actions need to be performed. The Service returns data back to the controller.

More information on the Controller-Service relationship can be found here:
https://www.coreycleary.me/what-is-the-difference-between-controllers-and-services-in-node-rest-apis
*/

const autoCatch = require("../lib/auto_catch.lib")
const AppError = require("../lib/app_error.lib");
const { ERROR_400, ERROR_500, OK_CREATED } = require('../lib/constants.lib');
const blogService = require("../services/blogs.service.js")

    async function getAll(req,res) {
        const data = await blogService.getMultiple(0);
        return res.status(200).json(data);
    }

    async function getById(req,res) {
        const id = req.params.id;
        const blog = await blogService.getSingle(id)
        return res.status(200).json(blog);
    }

    async function create(req,res) {
        const blog = req.body;
        const localImage = req.file(blog.imagePath)
        const status = await blogService.create(blog, localImage)
        return res.status(201).json({message: "Blog created successfully!"})
    }

    async function update(req,res) {
        const newBlog = req.body
        const status = await blogService.update(id, newBlog)
        return res.status(200).json({message: "Blog Updated Successfully"})
    }

    // async function remove(req,res) {
    //     const id = req.params.id;
    //     try {
    //         const status = await blogService.remove(id)
    //         res.status(200).json({message: "Blog deleted succesfully"})
    //     } catch(err) {
    //         res.status(404).json({message: "There was an error deleting Blog"})
    //     }
    // }

module.exports = autoCatch({
    getAll,
    getById,
    create,
    update,
    // remove
})