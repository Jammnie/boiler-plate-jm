const express = require('express');

const app = express();

const port = 3000;

const mongoose = require('mongoose');
// mongodb://root:dlwoals12%23A@localhost:27017/?authSource=admin
mongoose.connect('mongodb://root:dlwoals12%23A@localhost:27017/?authSource=admin',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{ console.log('mongoDB Connected...')})
  .catch(err => console.error(err));

app.get('/', (req, res, next) => res.send('hello worllds!!'));

app.listen(port, () => {
  console.log(port, 'port is waiting...');
});