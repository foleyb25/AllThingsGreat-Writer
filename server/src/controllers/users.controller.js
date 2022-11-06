/*
Controller for User CRUD Operations and more. The Controller acts as the Manager and tells the
service (Worker) what actions need to be performed. The Service returns data back to the controller.

More information on the Controller-Service relationship can be found here:
https://www.coreycleary.me/what-is-the-difference-between-controllers-and-services-in-node-rest-apis
*/

const userService = require("../services/users.service.js")

    async function getAll(req,res) {
        try {
            const data = await userService.getMultiple(0);
            res.status(200).json(data);
        } catch (err) {
            res.status(404).json({message: err.message})
        }
    }

    async function getById(req,res) {
        const id = req.params.id;
        try {
            const user = await userService.getSingle(id)
            res.status(200).json(user);
        } catch (err) {
            res.status(404).json({ message: err.message})
        }
    }

    async function create(req,res) {
        const user = req.body;
        try {
            const status = await userService.create(user)
            res.status(201).json({message: "user created successfully!"})
        } catch (err) {
            res.status(400).json({ message: err.message});
        }
    }

    async function update(req,res) {
        const newuser = req.body
        try {
            const status = await userService.update(id, newuser)
            res.status(200).json({message: "user Updated Successfully"})
        } catch (err) {
            res.status(404).json({message: err.message})
        }
    }

    // async function remove(req,res) {
    //     const id = req.params.id;
    //     try {
    //         const status = await userService.remove(id)
    //         res.status(200).json({message: "user deleted succesfully"})
    //     } catch(err) {
    //         res.status(404).json({message: "There was an error deleting user"})
    //     }
    // }

module.exports = {
    getAll,
    getById,
    create,
    update,
    // remove
}