const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image : String,
  token: {
    type: String
  }
})


// 비밀번호가 변결 될때만 암호화 실행
// 비밀번호를 암호화 시킨다.
userSchema.pre('save', function(next) {
  var user = this;
  console.log('user is', user);
  
  if(user.isModified('password')) {
    console.log('비밀번호 변경. 암호화 진행');
    
    bcrypt.genSalt(saltRounds, async function(err, salt) {
      if(err) return next(err);

      await bcrypt.hash(user.password, salt, function(err, hash){
        if(err) {
          console.error(err);
          console.log(err);
          return next(err);
        }
        user.password = hash;
        console.log('user modified is ', user);
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
  console.log('password comparing...')
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) {return cb(err)}

    console.log('password compare is true')
    cb(null, isMatch)
  } )
}

userSchema.methods.generateToken = async function(cb) {
  console.log('gen token');
  var user = this;
  // process.env.secretToken
  const token = jwt.sign(user._id.toHexString(), 'secret' );
  console.log(user._id);
  user.token = token;
  try{
    await user.save();
    console.log('token save success');
    return cb(null, user);
  } catch(err) {
    console.log('token save error');
    return cb(err);
  }
}

userSchema.statics.findByToken = function(token, cb) {
  console.log('find user by token');
  var user = this;
  
  // process.env.secretToken
  jwt.verify(token,  'secret', async function(err, decoded) {
    try{
      console.log('user is ', user);
      const query = User.where({"_id":decoded, "token": token});
      const result = await query.findOne();
      cb(null, result);
    } catch(err) {
      cb(err);      
    }
  })
}

const User = mongoose.model('User', userSchema);

module.exports = { User };