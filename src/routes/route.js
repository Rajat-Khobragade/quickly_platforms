const express = require('express');
const router = express.Router();

const {register,login,downloadCsvFile,test}= require('../controllers/userController');


router.post('/register',register);
router.post('/login',login);
router.get('/csv',downloadCsvFile);
router.get('/test',test);

module.exports = router

