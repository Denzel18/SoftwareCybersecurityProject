const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/login');
// const connection = require('../connect')

/* GET users listing. */
router.get('/', isLoggedIn, (req, res, next) => {
    res.send('respond with a resource');

});

module.exports = router;
