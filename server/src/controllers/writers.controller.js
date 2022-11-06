/*
Controller for Writer CRUD Operations and more. The Controller acts as the Manager and tells the
service (Worker) what actions need to be performed. The Service returns data back to the controller.

More information on the Controller-Service relationship can be found here:
https://www.coreycleary.me/what-is-the-difference-between-controllers-and-services-in-node-rest-apis
*/

const writerService = require("../services/writers.service.js")

    async function getAll(req,res) {
        try {
            const data = await writerService.getMultiple(0);
            res.status(200).json(data);
        } catch (err) {
            res.status(404).json({message: err.message})
        }
    }

    async function getById(req,res) {
        const id = req.params.id;
        try {
            const writer = await writerService.getSingle(id)
            res.status(200).json(writer);
        } catch (err) {
            res.status(404).json({ message: err.message})
        }
    }

    async function create(req,res) {
        const writer = req.body;
        try {
            const status = await writerService.create(writer)
            res.status(201).json({message: "Writer created successfully!"})
        } catch (err) {
            res.status(400).json({ message: err.message});
        }
    }

    async function update(req,res) {
        const newWriter = req.body
        try {
            const status = await writerService.update(id, newWriter)
            res.status(200).json({message: "Writer Updated Successfully"})
        } catch (err) {
            res.status(404).json({message: err.message})
        }
    }

    // async function remove(req,res) {
    //     const id = req.params.id;
    //     try {
    //         const status = await writerService.remove(id)
    //         res.status(200).json({message: "Writer deleted succesfully"})
    //     } catch(err) {
    //         res.status(404).json({message: "There was an error deleting Writer"})
    //     }
    // }

module.exports = {
    getAll,
    getById,
    create,
    update,
    // remove
}