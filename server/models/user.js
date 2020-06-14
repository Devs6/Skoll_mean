const mongoose=require('mongoose');
const Schema=mongoose.Schema
const userSchema =new Schema({
  email:String,
  password:String
})
module.exports=mongoose.model('user',userSchema,'users')
//user=model userSchema is the schema and users is the collection
