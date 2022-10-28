const express=require("express");
const bodyparser=require("body-parser");
const app=express();
const  mongoose=require("mongoose");


mongoose.connect('mongodb://localhost:27017/pratice2',{useNewUrlParser:true});
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));


const schema=new mongoose.Schema({
  item:String
})

const m=new mongoose.model("m",schema);

app.get("/",function(req,res){
  m.find({},function(err,l){
    if(err){
      console.log(err);
    }
    else{
      console.log(l);
      res.render("index",{listitem:l})
    }
  })
})


app.post("/",function(req,res){
  m.insertMany([{
    item:req.body.enteredvalue
  }],function(err){
    if(err){
      console.log(err)
    }
    else{
      console.log("inserted succesfully");
    }
  })

  res.redirect("/");
})

app.listen(3400,function(){
  console.log("app is listening");
})
