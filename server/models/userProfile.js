const mongoose=require('mongoose');
const Schema=mongoose.Schema
const profileSchema=new Schema({
  name:String,
  address:String,
  email:String,
  phone:String
})

module.exports=mongoose.model('prodile',profileSchema,'profiles')
