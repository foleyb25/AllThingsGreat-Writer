/*
Controller for Screenplayreviews CRUD Operations and more. The Controller acts as the Manager and tells the
service (Worker) what actions need to be performed. The Service returns data back to the controller.

More information on the Controller-Service relationship can be found here:
https://www.coreycleary.me/what-is-the-difference-between-controllers-and-services-in-node-rest-apis
*/

const screenplayreviewService = require("../services/screenplayreviews.service.js")

    async function getAll(req,res) {
        try {
            const data = await screenplayreviewService.getMultiple(0);
            res.status(200).json(data);
        } catch (err) {
            res.status(404).json({message: err.message})
        }
    }

    async function getById(req,res) {
        const id = req.params.id;
        try {
            const screenplayreview = await screenplayreviewService.getSingle(id)
            res.status(200).json(screenplayreview);
        } catch (err) {
            res.status(404).json({ message: err.message})
        }
    }

    async function create(req,res) {
        const screenplayreview = req.body;
        try {
            const status = await screenplayreviewService.create(screenplayreview)
            res.status(201).json({message: "screenplayreview created successfully!"})
        } catch (err) {
            res.status(400).json({ message: err.message});
        }
    }

    async function update(req,res) {
        const newscreenplayreview = req.body
        try {
            const status = await screenplayreviewService.update(id, newscreenplayreview)
            res.status(200).json({message: "screenplayreview Updated Successfully"})
        } catch (err) {
            res.status(404).json({message: err.message})
        }
    }

    // async function remove(req,res) {
    //     const id = req.params.id;
    //     try {
    //         const status = await screenplayreviewService.remove(id)
    //         res.status(200).json({message: "screenplayreview deleted succesfully"})
    //     } catch(err) {
    //         res.status(404).json({message: "There was an error deleting screenplayreview"})
    //     }
    // }

module.exports = {
    getAll,
    getById,
    create,
    update,
    // remove
}