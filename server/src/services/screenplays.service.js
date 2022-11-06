/*
Service for Screenplay DB Operations and more. The Service acts as the Worker and recieves tasks from the
Controller (Manager)  on what actions need to be performed. The Service returns this data back to the
controller. Services communicate directly to the DB via Mongoose.

More information on the Controller-Service relationship can be found here:
https://www.coreycleary.me/what-is-the-difference-between-controllers-and-services-in-node-rest-apis
*/

const Screenplay = require("../models/Screenplay.model")
// const db = require('./db.service');
// const helper = require('../utils/helper.util');
// const config = require('../configs/general.config');

async function getMultiple(page = 1){
//   const offset = helper.getOffset(page, config.listPerPage);
  const screenplays = await Screenplay.find().limit(25);
  return screenplays
}

async function getSingle(id) {
    const screenplay = await Screenplay.findById(id)
        .populate("writer");
    return screenplay
}

async function create(screenplay){
    const result = await Screenplay.create(screenplay);
    return result
}

async function update(id, newScreenplay){
    const result = await Screenplay.findByIdAndUpdate(id, newScreenplay);
    return result
}

async function remove(id){
    const result = await Screenplay.findByIdAndDelete(id)
    return result
}

module.exports = {
  getMultiple,
  getSingle,
  create,
  update,
  remove
}