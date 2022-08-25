const express = require('express');
const app = express();
require('colors');
const { connection, connect_db } = require('./db');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

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

process.on('SIGTERM', () => {
    connection.disconnect();
    server.close(() => {
        console.log('server closed');
        process.exit(1);
    });
});



