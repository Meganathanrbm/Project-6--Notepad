const express = require("express");    //express for project
const bodyParser = require("body-parser");   //require body parser to use | to get the date from the html
const getDate = require(__dirname + "/date.js");  // export the date function for code simplification | import and use it
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {  useNewUrlParser : true, useUnifiedTopology: true });  

const app = express();
app.set('view engine','ejs');    //in order use ejs set 
app.use(bodyParser.urlencoded({extended:true}))      //in order use bodyparser use
app.use(express.static("public"));    //set the static public folder to access the files like style.css 

const itemSchema = mongoose.Schema({
  name:String
});
const Item = mongoose.model("Item",itemSchema);

const item1 = new Item({
  name:"Welcome to todolist!"
});
const item2 = new Item({
  name:"Hit the + button to add a new item."
});
const item3 = new Item({
  name:"Hit this to delete an item --->"
});
const defaultItem = [item1,item2,item3];

//Item.insertMany(defaultItem).then((i)=>console.log("successfully added!"));

const currentDay = getDate.currentDay();     //from the imported module
var primaryColor = "#ab83e3";   

app.get("/",function(req,res){     // root get route
  Item.find({})
  .then((item)=>{
    res.render("list",{ LISTTITLE:currentDay , ITEMS:item ,PRIMARYCOLOR:primaryColor});  // ejs => it check the file(list.ejs) in views folder | 2nd paremeter is key value pair one in list.ejs and another in above  
  })
    
});

app.post("/",function(req,res){
    console.log(req.body.checkbox);
    let newItem = req.body.newItem;
    if(req.body.list === "newListItem"){
     if(newItem!==" "){
      let newtodoList = new Item({
        name:newItem
      })
      newtodoList.save();
    }
  }
    res.redirect("/");
});


app.post("/delete",(req,res)=>{
  let deleteItem =( req.body.delete || req.body.checkbox);
  Item.deleteOne({_id:deleteItem}).then(db=> "");
  res.redirect("/");
})

app.post("/color",function(req,res){
  primaryColor = req.body.color;
  res.redirect("/");
})


app.listen(3000,function(){
    console.log("Sever hostig at 3000!")
});