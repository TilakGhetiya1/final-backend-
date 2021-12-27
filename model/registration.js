const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Registration = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
}, {
    collection: "registration"
})

module.exports = mongoose.model('registration', Registration)