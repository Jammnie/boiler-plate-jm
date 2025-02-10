const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { User } = require('./models/User');
const config = require('./config/key');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}) );
app.use(bodyParser.json());

// mongoDB 연결결
// mongodb://root:dlwoals12%23A@localhost:27017/?authSource=admin
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{ console.log('mongoDB Connected...')})
  .catch(err => console.error(err));

app.get('/', (req, res, next) => res.send('hello worllds!!'));

app.post('/register', async (req, res) => {
  // 회원가입할때 클라이언트에서 정보들을 넘겨주면
  // 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);
  const result = await user.save().then(()=>{
    res.status(200),json({ success: 'true'})
  }).catch((err) => {res.json({success: 'false', err})})
});

app.listen(port, () => {
  console.log(port, 'port is waiting...');
});