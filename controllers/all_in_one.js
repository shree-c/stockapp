const mongoose = require('mongoose');
const HSchema = require('../models_and_schemas/HistoricalSchema');
const Apple = mongoose.model('Appleprice', HSchema);
const Micorsoft = mongoose.model('Microsoftprice', HSchema);
const Cisco = mongoose.model('Ciscoprice', HSchema);
const StarBucks = mongoose.model('StarBucksprice', HSchema);

/*
method: post
body : {
    company: <name>
    frm: <from date (%y-%m-%d)>
    to: <to date (%y-%m-%d)>
}
*/

exports.between_dates = async function (req, res) {
    console.log(req.body);
    try {
        let searchObj = null;
        if (req.body.frm && req.body.to) {
            searchObj = {
                Date: {
                    $gt: req.body.frm,
                    $lt: req.body.to
                }
            };
        }
        if (req.body.company === 'apple') {
            const results = await Apple.find(searchObj);
            res.status(200).json({
                success: true,
                data: results
            });
        } else if (req.body.company === 'microsoft') {
            const results = await Micorsoft.find(searchObj);
            res.status(200).json({
                success: true,
                data: results
            });
        } else if (req.body.company === 'cisco') {
            const results = await Cisco.find(searchObj);
            res.status(200).json({
                success: true,
                data: results
            });
        } else if (req.body.company === 'starbucks') {
            const results = await StarBucks.find(searchObj);
            res.status(200).json({
                success: true,
                data: results
            });
        } else {
            res.status(400).json({
                success: false,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false
        });
    }
};