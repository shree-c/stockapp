const mongoose = require('mongoose');

const MaxDateSchema = mongoose.Schema({
    name: String,
    mdate: Date
});

module.exports = mongoose.model('MaxDate', MaxDateSchema);