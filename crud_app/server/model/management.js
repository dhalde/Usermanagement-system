const mongoose = require('mongoose');
const validator = require('validator');

const managSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },

    email: {
        type: String,
        required: true,
        unique: true,
        isValid(val) {
            if (!validator.isEmail(val)) {
                throw new Error(`Invalid Email`);
            }
        }
    },

    gender: {
        type: String
    },

    status: {
        type: String
    }

});

//Creating new collection
const userManag = new mongoose.model('management', managSchema);
module.exports = userManag;