const express = require('express');
const router = express.Router();

const countries = require('./../mockups/countries.mockup.json');

router.get('/', (req, res) => {
    res.send(countries);
});

module.exports = router;
