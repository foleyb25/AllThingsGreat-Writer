/*
Controller for Screenplay CRUD Operations and more. The Controller acts as the Manager and tells the
service (Worker) what actions need to be performed. The Service returns data back to the controller.

More information on the Controller-Service relationship can be found here:
https://www.coreycleary.me/what-is-the-difference-between-controllers-and-services-in-node-rest-apis
*/

const screenplayService = require("../services/screenplays.service.js")

    async function getAll(req,res) {
        try {
            const data = await screenplayService.getMultiple(0);
            res.status(200).json(data);
        } catch (err) {
            res.status(404).json({message: err.message})
        }
    }

    async function getById(req,res) {
        const id = req.params.id;
        try {
            const screenplay = await screenplayService.getSingle(id)
            res.status(200).json(screenplay);
        } catch (err) {
            res.status(404).json({ message: err.message})
        }
    }

    async function searchScreenplays(req, res) {
        const pageNum = req.params.pageNum
        const searchString = req.params.searchString
        try {
            const screenplays = await screenplayService.getMultipleSearch(searchString, pageNum)
            res.status(200).json(screenplays)
        } catch (err) {
            res.status(404).json({message: err.message})
        }
    }

    async function create(req,res) {
        const screenplay = req.body;
        try {
            const status = await screenplayService.create(screenplay)
            res.status(201).json({message: "screenplay created successfully!"})
        } catch (err) {
            res.status(400).json({ message: err.message});
        }
    }

    async function update(req,res) {
        const newscreenplay = req.body
        try {
            const status = await screenplayService.update(id, newscreenplay)
            res.status(200).json({message: "screenplay Updated Successfully"})
        } catch (err) {
            res.status(404).json({message: err.message})
        }
    }

    // async function remove(req,res) {
    //     const id = req.params.id;
    //     try {
    //         const status = await screenplayService.remove(id)
    //         res.status(200).json({message: "screenplay deleted succesfully"})
    //     } catch(err) {
    //         res.status(404).json({message: "There was an error deleting screenplay"})
    //     }
    // }

module.exports = {
    getAll,
    getById,
    create,
    update,
    searchScreenplays,
    // remove
}