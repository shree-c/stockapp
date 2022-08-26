/*
* retrives latest previous day value from historical data
* adds or substracts random value from that data and pushes it to db per second for each of the for stocks
* there is a seperate collection for realtime data
* there will be gaps in the data because the server wouldn't be running all the time
* this generating of random values could have been done in the front end but I want to store those randomly generated values to the db
*/
const Intvl = 1000;
const APPLEINITIAL = 150;
const MICRSOFTiNITAL = 227;
const CISCOINITIAL = 50;
const STARBUCKSINITIAL = 90;
const mongoose = require('mongoose');
function randomChange(initial) {
    const zero_one = +(Math.random() * 10 % 2).toFixed();
    const abschange = +(Math.random() * 10 % 2).toFixed(2);
    if (zero_one) {
        initial += abschange;
    } else {
        initial -= abschange;
    }
    return initial;
}
randomChange(10);
const RealTimeSchema = require('../models_and_schemas/RealTime');
const RealTimeModel = mongoose.model('Realtimeprice', RealTimeSchema);

setTimeout(async function tick() {
    await RealTimeModel.create();
    setTimeout(tick, Intvl);
}, Intvl);