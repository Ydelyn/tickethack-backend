var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const User = require('../models/users');

/* GET users listing. */
router.get('/', (req,res)=>{
  res.json({message: 'Hello Users!'})
})

module.exports = router;
