const express=require('express');
const router=express.Router()
const User=require('../models/user')
const Profile=require('../models/userProfile')
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')
const { register } = require('ts-node');
mongoose.connect("mongodb+srv://skoll:t1TweQm5e3tJFwOQ@cluster0-1yfzg.mongodb.net/noone?retryWrites=true&w=majority")
.then(()=>{
    console.log("connected")
})
.catch(()=>{
    console.log("connection aborted");
})
router.get('/',(req,res)=>{
  res.send('api')
})
function verifyToken(req,res,next){
  // if token not present
  if(!req.headers.authorization){
return res.status(401).send('Unauthorized Req')
  }
  let token=req.headers.authorization.split(' ')[1]
  if(token==='null'){
    return res.status(401).send('Unauthorized Req')
  }
  let payload=jwt.verify(token,'secretKey')
  if(!payload){
    return res.status(401).send('Unauthorized Req')
  }
  req.userId=payload.subject
  next()
}
router.post('/profile',verifyToken,(req,res)=>{
  let userData=req.body
  let user=new Profile(userData)
  user.save((err,user)=>{
    if(err){console.log('submit nhi hua')}
    else{
      console.log('hogya submit');
      res.status(200).send(user)

    }
  })
})

router.post('/register',(req,res)=>{
let userData=req.body
let user=new User(userData)
user.save((err,registeredUser)=>{
  if(err){console.log('nhi hua')}
  else{
    console.log('hogya')
    // to save user id in the payload
    let payload={subject:registeredUser._id}
    let token=jwt.sign(payload,'secretKey');

    res.status(200).send({token})
  }
})
})
router.post('/userData',(req,res)=>{
  let userData=req.body
  Profile.findOne({email:userData.email},(err,user)=>{
    if(err){
      console.log(err)
    }
    else{
      console.log('mil gya')
      res.status(200).send(user);
    }
  })
})

router.post('/login',(req,res)=>{
  let userData=req.body
  User.findOne({email:userData.email},(err,user)=>{
    if(err){
      console.log(err)
    }
    else{
      if(!user){
        res.status(401).send('Invalid Email');
      }
      else{
          if(user.password!==userData.password)
      {
        res.status(401).send('invalid password')
      }
    else{
      console.log('hogya match')
      let payload={subject:user._id}
      let token=jwt.sign(payload,'secretKey')

      res.status(200).send({token});
    }}
    }
  })
})

module.exports=router;
