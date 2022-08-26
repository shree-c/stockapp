/*
* updating historical data
* check the greatest date in the historical date
* and update the data base with reasonable random values till the current date
* this script doesn't takes into consideration stock market holidays
*/
const mongoose = require('mongoose');
const MaxDate = require('../models_and_schemas/MaxDateModel');
const HSchema = require('../models_and_schemas/HistoricalSchema');
const { connect_db, connection } = require('../db');
const Apple = mongoose.model('Appleprice', HSchema);
const Micorsoft = mongoose.model('Microsoftprice', HSchema);
const Cisco = mongoose.model('Ciscoprice', HSchema);
const StarBucks = mongoose.model('StarBucksprice', HSchema);
const CurrentDate = new Date();
console.log('updating historical data...');

var getDaysArray = function (start, end) {
    for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt));
    }
    return arr;
};
function getHistoricalDataTillToday(startobj) {
    const datesArray = getDaysArray(startobj.Date, CurrentDate);
    const retPricesArr = [];
    const prevstkval = null;
    datesArray.forEach((val) => {
        const temp = { ...startobj };

    });
}
(async function () {
    //get latest dates in db
    await connect_db();
    console.log('heree');
    const apple_latest_date = await MaxDate.findOne({ name: 'apple' });
    const microsoft_latest_date = await MaxDate.findOne({ name: 'microsoft' });
    const cisco_latest_date = await MaxDate.findOne({ name: 'cisco' });
    const starbucks_latest_date = await MaxDate.findOne({ name: 'starbucks' });
    //get the latest prices
    console.log(apple_latest_date.mdate, microsoft_latest_date.mdate, cisco_latest_date.mdate, starbucks_latest_date.mdate);
    const apple_latest_price = await Apple.findOne({
        Date: apple_latest_date.mdate
    });
    const microsoft_latest_price = await Micorsoft.findOne({
        Date: microsoft_latest_date.mdate
    });
    const cisco_latest_price = await Cisco.findOne({
        Date: cisco_latest_date.mdate
    });
    const starbucks_latest_price = await StarBucks.findOne({
        Date: starbucks_latest_date.mdate
    });
    //update till the current date

    // console.log(apple_latest_price);
    // console.log(apple_latest_price.Open, microsoft_latest_price.Open, cisco_latest_price.Open, starbucks_latest_price.Open);
    await mongoose.connection.close();
})();
//get the dates array

//update the prices to historical data