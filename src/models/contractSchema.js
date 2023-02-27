const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    creator_id: {type: String, require: true},
    acceptor_id: {type: String},
    terms: {type: String},
    creator_risk: {type: Number, default: 0},
    creator_amount_to_accept: {type: Number},
    expiration: {type: Date},
    created: {type: Date},
    status: {type: String, enum: ['Open', 'Active', 'Pending', 'Closed']}
});

const model = mongoose.model('Contract', contractSchema);

module.exports = model;