const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Property = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    rental_period: {
        type: String,
        required: true
    },
    // categories: {
    //     type: String,
    //     required: true
    // },
    video_url: {
        type: String
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    property_id: {
        type: String,
    },
    other_details: {
        type: String
    },
    acceptCondition: {
        type: Boolean,
        required: true
    },
    postdate: {
        type: Date,
    },
    feature: {
        type: Array,
    },
    history: {
        type: Array
    },
    userunkid: {
        type: String
    },
    phone: {
        type: String
    },
    nearby: {
        type: Array
    },
    username: {
        type: String
    }
}, {
    collection: "property"
})

module.exports = mongoose.model('property', Property)