const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const path=require('path')
const PORT=3000;
const api=require('./Routes/api')
const app=express();
app.use(cors())
app.use(bodyParser.json())
app.use('/',express.static(path.join(__dirname,"angular")))
app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname,"angular",'index.html'))
})
app.use('/api',api);
app.get('/',(req,res)=>{
  res.send('heyy')
})
app.listen(PORT,function(){
  console.log('hosted')
})
