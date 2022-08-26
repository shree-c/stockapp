const mongoose = require('mongoose');
require('colors');
require('dotenv').config({
    path: './config/config.env'
});
const connectDB = async function () {
    conn = await mongoose.connect(process.env.MONGO_U, {
        autoIndex: true
    });
    console.log(`connected to db ${conn.connection.host}`.green);
};
exports.connect_db = connectDB;