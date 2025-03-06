const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/key');
const { User } = require('./models/User');
const cors = require('cors');

const apiRouter = require('./routes/api');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended: true}) );
app.use(bodyParser.json());
app.use(cors());
// mongoDB 연결결
// mongodb://root:dlwoals12%23A@localhost:27017/?authSource=admin
mongoose.connect(config.mongoURI,{
  }).then(()=>{ console.log('mongoDB Connected...')})
  .catch(err => console.error(err)
);
app.use(cookieParser());

app.get('/', (req, res) => res.send('hello worlds!!'));
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(port, 'port is waiting...');
});