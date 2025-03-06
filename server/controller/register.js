const mongoose = require('mongoose');
const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.registerUser = async(req, res, next) => {
  // const {password} = req.body;
  // console.log('register controller / user generateToken is ', password);
  // const hashPassword = await bcrypt.hash(password, saltRounds);
  // console.log('hash password is', hashPassword);
  // let user = new User(req.body);
  // user.password = hashPassword;
  // console.log(user);

  const user = new User(req.body);
  try {
    await user.save();
    console.log('save user is ', user);
    return res.status(200).json({ success: 'true'});
  } catch (err) {
    console.error(err);
    return res.json({success: 'false', err});
  }
}