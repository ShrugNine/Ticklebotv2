const mongoose = require('mongoose');

const ticklecoinSchema = new mongoose.Schema({
    user_id: { type: String, require: true, unique: true },
    server_id: { type: String, require: true },
    display_name: String,
    current_balance: { type: Number, default: 1000 }
});

const model = mongoose.model('TickleCoinAccount', ticklecoinSchema);

module.exports = model;