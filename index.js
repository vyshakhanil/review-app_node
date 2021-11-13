const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const {movieModel}=require('./model')
const { response } = require('express')

let app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Method','GET','POST');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials',true)
    next()
})

mongoose.connect("mongodb+srv://Appu:Appu@cluster0.kpplc.mongodb.net/movie?retryWrites=true&w=majority")

app.listen(8081,()=>{
    console.log('Running')
})

app.post('/add', async(req,res)=>{
 
    try{
    console.log(req.body)
    let todo=new movieModel(req.body)
    let result=await todo.save()
    res.json(result)
  }
  catch(error)
  {
      res.status(500).send(error)
  }
})

app.get('/',(req,res)=>{
    res.send("Hello")
})


app.get('/view',async(req,res)=>{
    try{
        var result=await movieModel.find()
        res.json(result)
    }
    catch(error){
        res.status(500).send(error)
    }
})

app.post('/delete',async(req,res)=>{
    try{
        var result=await movieModel.findByIdAndDelete(req.body._id,req.body)
        res.json({"status":"Successfully Deleted"})
    }
    catch(error)
    {
        res.send(500).json({"status":error})
    }
})

app.post('/update',async(req,res)=>{
   try{
    var result=await movieModel.findByIdAndUpdate(req.body._id)
    res.json({"status":"Successfully Updated"})
    }
catch(error)
{
    res.send(500).json({"status":error})
}
})

app.post('/search',async(req,res)=>{
    try{
     var result=await movieModel.find({"movieName": {$regex:'.*'+req.body.movieName+'.*'} })
     res.json(result)
 }
 catch(error)
 {
     res.send(500).json({"status":error})
 }
 })