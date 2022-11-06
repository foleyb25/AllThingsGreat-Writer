/*
Controller for Watchservice CRUD Operations and more. The Controller acts as the Manager and tells the
service (Worker) what actions need to be performed. The Service returns data back to the controller.

More information on the Controller-Service relationship can be found here:
https://www.coreycleary.me/what-is-the-difference-between-controllers-and-services-in-node-rest-apis
*/

const watchserviceService = require("../services/watchservices.service.js")

    async function getAll(req,res) {
        try {
            const data = await watchserviceService.getMultiple(0);
            res.status(200).json(data);
        } catch (err) {
            res.status(404).json({message: err.message})
        }
    }

    async function getById(req,res) {
        const id = req.params.id;
        try {
            const watchservice = await watchserviceService.getSingle(id)
            res.status(200).json(watchservice);
        } catch (err) {
            res.status(404).json({ message: err.message})
        }
    }

    async function create(req,res) {
        const watchservice = req.body;
        try {
            const status = await watchserviceService.create(watchservice)
            res.status(201).json({message: "watchservice created successfully!"})
        } catch (err) {
            res.status(400).json({ message: err.message});
        }
    }

    async function update(req,res) {
        const newwatchservice = req.body
        try {
            const status = await watchserviceService.update(id, newwatchservice)
            res.status(200).json({message: "watchservice Updated Successfully"})
        } catch (err) {
            res.status(404).json({message: err.message})
        }
    }

    // async function remove(req,res) {
    //     const id = req.params.id;
    //     try {
    //         const status = await watchserviceService.remove(id)
    //         res.status(200).json({message: "watchservice deleted succesfully"})
    //     } catch(err) {
    //         res.status(404).json({message: "There was an error deleting watchservice"})
    //     }
    // }

module.exports = {
    getAll,
    getById,
    create,
    update,
    // remove
}