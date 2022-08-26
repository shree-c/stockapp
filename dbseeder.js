/*
* seeder script
* converts csv historical data to json and pushes it to database
* this script assumes that the database is empty
*/
const mongoose = require('mongoose');
const HSchema = require('./models_and_schemas/HistoricalSchema');
const { connect_db } = require('./db');
const Apple = mongoose.model('Appleprice', HSchema);
const Micorsoft = mongoose.model('Microsoftprice', HSchema);
const Cisco = mongoose.model('Ciscoprice', HSchema);
const StarBucks = mongoose.model('StarBucksprice', HSchema);
const { generateRandomValues } = require('./utils/stock_logic');
//function to generate random values for previous 365 days with an initial value

generateRandomValues(100);
connect_db().then(async () => {
    const applejsonArray = generateRandomValues(130);
    const microsoftjsonArray = generateRandomValues(126);
    const ciscojsonArray = generateRandomValues(150);
    const starbucksjsonArray = generateRandomValues(190);

    await Apple.create(applejsonArray);
    console.log('added apple');

    await Micorsoft.create(microsoftjsonArray);
    console.log('added microsoft');

    await Cisco.create(ciscojsonArray);
    console.log('added cisco');

    await StarBucks.create(starbucksjsonArray);
    console.log('added starbucks');
    await mongoose.connection.close();
});