const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const router = require('./router');
const path = require('path');
require('colors');
const { connection, connect_db } = require('./db');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.use('/api/v1/', router);
app.get('/csv', (req, res) => {
    res.format({
        text: () => {
            res.sendFile(path.join(__dirname, '/public/apple1y.csv'));
        }
    });
});
const PORT = process.env.PORT || 5000;
(async function () {
    await connect_db();
    const server = app.listen(PORT, () => console.log(`listening at ${PORT} env: ${process.env.NODE_ENV}`.yellow.italic.underline));

    process.on('unhandledRejection', async (err) => {
        console.log(`${err.message}`.red);
        server.close(() => {
            console.log('server closed');
            process.exit(1);
        });
        await connection.close();
    });
})();

process.on('SIGINT' || 'SIGTERM', async () => {
    mongoose.connection.close().then(() => {
        console.log('server closed');
        process.exit(1);
    });
});



