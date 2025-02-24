const express = require('express');
const router = express.Router();
const { registerUser } = require('../controller/register');

router.get('/helloworld', (req, res)=>{
  console.log('good')
  res.status(200).send('안녕하세요. Hello world');
});

router.post('/register', registerUser) 

module.exports = router;