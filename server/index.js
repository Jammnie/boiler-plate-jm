const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/key');
const { User } = require('./models/User');
const { auth } = require('./middlewares/auth');
const cors = require('cors');

const registerRouter = require('./routes/register');
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

// login
app.use('/api/users/login', (req, res) => {
  // 요청된 이메일이 데이터베이스에 있는지 확인한다.
  // 이메일이 있다면 비밀번호가 맞는지 확인한다.
  // 비밀번호까지 맞다면 토큰을 생성하기.
  console.log('login start')
  User.findOne({
    email: req.body.email
  })
  .then(user => {
    if(!user) {
      console.log('user not exist')
      return res.json({
        success: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다. '
      });
    }

    console.log('user exist')
    console.log('password is ', req.body.password)
    user.comparePassword(req.body.password, (err, isMatch)=> {
      if(!isMatch) {
        console.log('password not matched')
        return res.json( {
          loginSuccess: false,
          message: '비밀번호가 틀렸습니다.',
        })
      }
      console.log('password matched')

      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        console.log('token is ', user.token);
        res.cookie('x_auth', user.token)
        .status(200)
        .json({
          loginSuccess: true,
          userId: user._id,
        });
      })
    })
  })
  .catch((err)=>{
    return res.status(400).send(err);
  })
})

// auth
app.post('/api/users/auth', auth, (req, res) => {
  console.log('req.user is ', req.user);
  res.status(200), json({
    _id: req.body._id,
    isAdmin: req.body.role === 0 ? false: true,
    isAuth: true,
    email: req.body.email,
    name: req.body.name,
  })
})

//logout
app.get('/api/users/logout', auth, async (req, res) => {
  console.log(User);
  try{
    await User.findOneAndUpdate({_id: req.user._id}, {token: ""});
    return res.status(200).send({ logoutSuccess: true });
  } catch(err) {
    res.json({ logoutSuccess: false, err });
  }
});



app.listen(port, () => {
  console.log(port, 'port is waiting...');
});