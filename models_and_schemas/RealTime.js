const mongoose = require('mongoose');
const RealTimeData = mongoose.Schema({
    Date: Date,
    Value: String
});

module.exports = RealTimeData;