const mongoose = require('mongoose');
const HData = mongoose.Schema({
    Date: Date,
    Value: Number
});

module.exports = HData;