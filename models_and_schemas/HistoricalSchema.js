const mongoose = require('mongoose');
const HData = mongoose.Schema({
    Date: Date,
    Volume: String,
    Open: String,
    High: String,
    Low: String
});

module.exports = HData;