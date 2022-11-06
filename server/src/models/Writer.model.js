/*
Writer model object

More information on Mongoose Model objects, including validation and much more, can be found in 
the documentation:

https://mongoosejs.com/docs/api.html
*/

const mongoose = require('mongoose');

const writerSchema = mongoose.Schema({

    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Screenplayreview',
      },
    
    bio: {
        type: 'string',
        default: '',
    },

    instagramLink: {
        type: 'string',
        default: '',
    },

    twitterLink: {
        type: 'string',
        default: '',
    },

    snapchatLink: {
        type: 'string',
        default: '',
    },

    tiktokLink: {
        type: 'string',
        default: '',
    },

    profileImageUrl: {
        type: 'string',
        default: '',
    },

    emailAddress: {
        type: 'string',
        default: '',
    },

    emailStatus: {
        type: 'string',
        default: '',
    },

    emailChangeCandidate: {
        type: 'string',
        default: '',
    },

    password: {
        type: 'string',
        default: '',
    },

    fullName: {
        type: 'string',
        default: '',
    },

    nickName: {
        type: 'string',
        default: '',
    },

    isSuperAdmin: {
        type: 'boolean',
        default: false,
    },

    passwordResetToken: {
        type: 'string',
        default: '',
    },

    passwordResetTokenExpiresAt: {
        type: 'number',
        default: 0,
    },

    emailProofToken: {
        type: 'string',
        default: '',
    },

    emailProofTokenExpiresAt: {
        type: 'number',
        default: 0,
    },

    tosAcceptedByIp: {
        type: 'string',
        default: '',
    },

    lastSeenAt: {
        type: 'number',
        default: 0,
    },

    isArchived: {
        type: 'boolean',
        default: false,
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
    versionKey: false // Version key is a Mongoose integration which saves version number to the DB 
    //by default. Set false here to disable this functionality.
}
)

module.exports = mongoose.model("Writer", writerSchema, 'writer');