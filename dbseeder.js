/*
* seeder script
* converts csv historical data to json and pushes it to database
* this script assumes that the database is empty
*/
const csvtojson = require('csvtojson');
const mongoose = require('mongoose');
const HSchema = require('./models_and_schemas/HistoricalSchema');
const MaxDate = require('./models_and_schemas/MaxDateModel');
const { connect_db } = require('./db');
const Apple = mongoose.model('Appleprice', HSchema);
const Micorsoft = mongoose.model('Microsoftprice', HSchema);
const Cisco = mongoose.model('Ciscoprice', HSchema);
const StarBucks = mongoose.model('StarBucksprice', HSchema);
connect_db().then(async () => {
    const applejsonArray = await csvtojson().fromFile('./csvdata/apple1y.csv');
    const microsoftjsonArray = await csvtojson().fromFile('./csvdata/microsoft1y.csv');
    const ciscojsonArray = await csvtojson().fromFile('./csvdata/cisco1y.csv');
    const starbucksjsonArray = await csvtojson().fromFile('./csvdata/starbucks1y.csv');

    await Apple.create(applejsonArray);
    console.log('added apple');
    await MaxDate.create({ name: 'apple', mdate: applejsonArray[0].Date });
    console.log('added apple max date');

    await Micorsoft.create(microsoftjsonArray);
    console.log('added microsoft');
    await MaxDate.create({ name: 'microsoft', mdate: microsoftjsonArray[0].Date });
    console.log('added microsoft max date');

    await Cisco.create(ciscojsonArray);
    console.log('added cisco');
    await MaxDate.create({ name: 'cisco', mdate: ciscojsonArray[0].Date });
    console.log('added cisco max date');

    await StarBucks.create(starbucksjsonArray);
    console.log('added starbucks');
    await MaxDate.create({ name: 'starbucks', mdate: starbucksjsonArray[0].Date });
    console.log('added starbucks max date');
});