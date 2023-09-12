//jshint esversion:6
import 'dotenv/config'
import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import md5 from 'md5';

const app = express();
const port = 3000;
const uri = process.env.URI;




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect(uri)

const UserSchema =new mongoose.Schema({email: String,password: String })

const User = mongoose.model('UserDB', UserSchema);

app.get("/",(req,res)=>{
    res.render("home.ejs")
})


app.get("/register",(req,res)=>{
    res.render("register.ejs")
})


app.post("/register",(req,res)=>{
    const newUser = new User({
        email: req.body.username,
        password: md5(req.body.password)
    })
    newUser.save().then((err)=>{
            res.render('secrets.ejs')
    })
})

app.get("/login",(req,res)=>{
    res.render("login.ejs")
})

app.post("/login",(req,res)=>{
    const username = req.body.username
    const password = md5(req.body.password)
    User.findOne({email:username}).then((foundUser)=>{
            if(foundUser){
                if(foundUser.password === password){
                    res.render("secrets.ejs")
                }
                else{
                    console.log("Password Incorrect")
                }
            }
    })
})



app.get("/logout",(req,res)=>{
    res.redirect("/")
})

app.listen(port,()=>{
    console.log("Server is Running :"+port)
})


// bDQQsPiu1y3nPm08