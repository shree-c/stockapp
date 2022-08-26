const mongoose = require('mongoose');
const HSchema = require('./models_and_schemas/HistoricalSchema');
const { connect_db } = require('./db');
const Apple = mongoose.model('Appleprice', HSchema);
const Micorsoft = mongoose.model('Microsoftprice', HSchema);
const Cisco = mongoose.model('Ciscoprice', HSchema);
const StarBucks = mongoose.model('StarBucksprice', HSchema);
const MaxDate = require('./models_and_schemas/MaxDateModel');
connect_db().then(async () => {
    await MaxDate.deleteMany();
    console.log('deleted all max dates');
    await Apple.deleteMany();
    console.log('deleted apple');

    await Micorsoft.deleteMany();
    console.log('deleted microsoft');

    await Cisco.deleteMany();
    console.log('deleted cisco');

    await StarBucks.deleteMany();
    console.log('deleted starbucks');
});