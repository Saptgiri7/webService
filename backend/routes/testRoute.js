const express = require('express');
const router = express.Router();

const {testServer} = require('../controllers/testing');

router.route('/).get(testServer);

module.exports = router;
