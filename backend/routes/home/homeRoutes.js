const express = require('express');
const router = express.Router();
const homeControllers= require('../../controllers/home/homeControllers')


router.get('/get-categories', homeControllers.get_categories);


module.exports = router;