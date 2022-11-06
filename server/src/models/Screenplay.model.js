/*
Screenplay model object

More information on Mongoose Model objects, including validation and much more, can be found in 
the documentation:

https://mongoosejs.com/docs/api.html
*/

const mongoose = require('mongoose');

const screenplaySchema = mongoose.Schema({
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Screenplayreview',
    },

    services: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Watchservice',
    },

    tmdb_id: {
        type: 'number'
    },

    imdb_id: {
        type: 'string'
    },

    title: {
        type: 'string'
    },

    overview: {
        type: 'string'
    },

    media_type: {
        type: 'string'
    },

    num_seasons: {
        type: 'number'
    },

    runtime: {
        type: 'string'
    },

    revenue: {
        type: 'number'
    },

    box_office: {
        type: 'string'
    },

    budget: {
        type: 'number'
    },

    poster_path: {
        type: 'string'
    },

    backdrop_path: {
        type: 'string'
    },

    homepage_url: {
        type: 'string'
    },

    tmdb_score: {
        type: 'number'
    },

    imdb_score: {
        type: 'string'
    },

    rotten_score: {
        type: 'string'
    },

    metacritic_score: {
        type: 'string'
    },

    rated: {
        type: 'string'
    },

    plot: {
        type: 'string'
    },

    actors: {
        type: 'string'
    },

    awards: {
        type: 'string'
    },

    releasedate: {
        type: 'string'
    },

    genre: {
        type: 'string'
    },

    director: {
        type: 'string'
    },

    writers: {
        type: 'string'
    },

    actors: {
        type: 'string'
    },

    awards: {
        type: 'string'
    },

    createdAt: { 
        type: 'number',
        default: Date.now()
    },

    updatedAt: { 
        type: 'number',
        default: Date.now()
    },
},
{
    versionKey: false, // Version key is a Mongoose integration which saves version number to the DB 
    //by default. Set false here to disable this functionality.
})

module.exports = mongoose.model("Screenplay", screenplaySchema, 'screenplay');