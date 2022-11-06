/*
Controller for Blog CRUD Operations and more. The Controller acts as the Manager and tells the
service (Worker) what actions need to be performed. The Service returns data back to the controller.

More information on the Controller-Service relationship can be found here:
https://www.coreycleary.me/what-is-the-difference-between-controllers-and-services-in-node-rest-apis
*/

const blogService = require("../services/blogs.service.js")

    async function getAll(req,res) {
        try {
            const data = await blogService.getMultiple(0);
            res.status(200).json(data);
        } catch (err) {
            res.status(404).json({message: err.message})
        }
    }

    async function getById(req,res) {
        const id = req.params.id;
        try {
            const blog = await blogService.getSingle(id)
            res.status(200).json(blog);
        } catch (err) {
            res.status(404).json({ message: err.message})
        }
    }

    async function create(req,res) {
        const blog = req.body;
        try {
            const status = await blogService.create(blog)
            res.status(201).json({message: "Blog created successfully!"})
        } catch (err) {
            res.status(400).json({ message: err.message});
        }
    }

    async function update(req,res) {
        const newBlog = req.body
        try {
            const status = await blogService.update(id, newBlog)
            res.status(200).json({message: "Blog Updated Successfully"})
        } catch (err) {
            res.status(404).json({message: err.message})
        }
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

module.exports = {
    getAll,
    getById,
    create,
    update,
    // remove
}