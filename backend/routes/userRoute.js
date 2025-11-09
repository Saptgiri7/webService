const express = require('express');
const { getUser, updateUserDetail } = require('../controllers/users');
const router = express.Router();


router.route('/').get(getUser).put(updateUserDetail);


module.exports = router;