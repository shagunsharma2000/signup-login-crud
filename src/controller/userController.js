const User = require('../model/userSchema');//import the model schema 
const jwt = require('jsonwebtoken');// import the jwttoken 
const bcrypt = require('bcrypt')// import the bcrypt
const mongoose = require('mongoose')
const jwtSecretKey = '123456789';

// createuser
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'Email is already in use',
        status: 403
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({ username, email, password: hashedPassword });
    const newUser = await user.save();

    res.status(201).json({
      newUser,
      message: "user created successfully",
      status: 201,
      error:[]
    });
  } catch (error) {
    res.status(400).json({ 
      message: error.message,
      message:"user not created",
      status:401,
      error:[error]
    });
  }
};

// create login user with jwttoken
let loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id }, jwtSecretKey, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ 
        message: 'Invalid email or password',
        status:401,
      });
    }
  } catch (error) {
    res.status(500).json({
       message: error.message,
       status:500
      });
  }
};

//get all user
let getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get user by id 
let getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// update user
let updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.set(req.body);
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });

    if (result.deletedCount > 0) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllUsers,
  loginUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};

