const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const EmailLogSchema = new mongoose.Schema({
    recipient: String
}, {timestamps: true });

EmailLogSchema.plugin(uniqueValidator);


module.exports = mongoose.model('EmailLog', EmailLogSchema);