const express = require('express');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const {User,Account} = require('../db');
const {authMiddleware} = require('../middleware');
const {JWT_SECRET} = require('../config');
const router = express.Router();


const signupSchema = zod.object({
  username: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string()
});

router.post('/signup', async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.json({ msg: 'Invalid input' });
  }
console.log(req.body)
  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    return res.json({ msg: 'User already exists' });
  }
console.log("exist")
  const dbUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
})
  const userId = dbUser._id;
console.log("created")
  await Account.create({
      userId,
      balance: 1 + Math.random() * 10000
  })
  console.log("accont")
  const token = jwt.sign({ userId: dbUser._id }, JWT_SECRET);
  res.json({ msg: 'User created', token });
});

const signinBody = zod.object({
  username: zod.string(),
  password: zod.string()
});

router.post('/signin', async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ message: 'Invalid input' });
  }

  const user = await User.findOne({ username: req.body.username, password: req.body.password });
  if (user) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    return res.json({ token });
  }

  res.status(411).json({ message: 'Error while logging in' });
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional()
});

router.put('/update', authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: 'Error while updating information' });
  }
// console.log(req.body)
// console.log(req.userId)
  await User.updateOne({ _id: req.userId }, req.body);
  res.json({ message: 'Updated successfully' });
});

router.get('/bulk', async (req, res) => {
  const filter = req.query.filter || '';
  // console.log(filter)
  // const users = await User.find({
  //   $or: [
  //     { firstName: { $regex: filter } },
  //     { lastName: { $regex: filter } }
  //   ]
  // });
  // console.log('Query:', { 
  //   $or: [ 
  //     { firstName: { $regex: filter, $options: 'i' } }, 
  //     { lastName: { $regex: filter, $options: 'i' } } ] }); 
      const users = await User.find({ 
        $or: 
        [ 
          { firstName: { $regex: filter, $options: 'i' } }, 
          { lastName: { $regex: filter, $options: 'i' } } 
      ] 
    }); 
    // console.log('Users:', users);
// console.log(users);
  res.json({ users: users.map(user => ({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    _id: user._id
  })) });
});

module.exports = router;
