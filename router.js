const express = require('express');
const { between_dates } = require('./controllers/all_in_one');
const router = express.Router();
router.post('/', between_dates);
router.get('/', (req, res) => {
    res.end('hi');
});
module.exports = router;