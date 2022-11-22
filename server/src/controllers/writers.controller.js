/*
Controller for Writer CRUD Operations and more. The Controller acts as the Manager and tells the
service (Worker) what actions need to be performed. The Service returns data back to the controller.

More information on the Controller-Service relationship can be found here:
https://www.coreycleary.me/what-is-the-difference-between-controllers-and-services-in-node-rest-apis
*/

const autoCatch = require("../lib/auto_catch.lib")
const AppError = require("../lib/app_error.lib");
const { ERROR_400, ERROR_500, OK_CREATED } = require('../lib/constants.lib');
const writerService = require("../services/writers.service.js")

    async function getAll(req,res) {
        const data = await writerService.getMultiple(0);
        return res.status(200).json(data);
    }

    async function getById(req,res) {
        const id = req.params.id;
        const writer = await writerService.getSingle(id)
        return res.status(200).json(writer);
    }

    async function create(req,res) {
        const writer = req.body;
        const status = await writerService.create(writer)
        return res.status(201).json({message: "Writer created successfully!"})
    }

    async function update(req,res) {
        const newWriter = req.body
        const status = await writerService.update(id, newWriter)
        return res.status(200).json({message: "Writer Updated Successfully"})
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

module.exports = autoCatch({
    getAll,
    getById,
    create,
    update,
    // remove
})