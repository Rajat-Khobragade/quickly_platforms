const express = require('express');
const router = express.Router();

const {register,login,downloadCsvFile}= require('../controllers/userController');


router.post('/register',register);
router.post('/login',login);
router.get('/csv',downloadCsvFile);

module.exports = router

