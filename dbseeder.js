const csvtojson = require('csvtojson');
const mongoose = require('mongoose');
const HSchema = require('./models/Historical');
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
    await Micorsoft.create(microsoftjsonArray);
    console.log('added microsoft');
    await Cisco.create(ciscojsonArray);
    console.log('added cisco');
    await StarBucks.create(starbucksjsonArray);
    console.log('added starbucks');
});