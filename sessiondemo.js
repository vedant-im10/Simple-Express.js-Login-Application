var express = require('express')
var fs = require('fs')
var bp = require('body-parser')
var cp = require('cookie-parser')
var expsession = require('express-session')
var app = express()
var oneDay = 24*60*60*1000

app.use(bp.urlencoded({extended:true}))
app.use(cp())
app.use(expsession({
    secret: "firstkey",
    saveUninitialized:true,
    cookie:{maxAge: oneDay}
}))

app.get("/", function(req,res){
    res.send("Hello World")
})

app.get("/Login", function(req,res){
    res.setHeader("Content-Type", "text/html")
    fs.readFile("login1.html", function(error,data){
        res.send(data)
    })
})

var ses1
app.post("/welcome", function(req,res){
    var uname = req.body.uname
    var passwd = req.body.passwd
    if(uname == "admin" && passwd == "admin"){
        //res.cookie('uname', uname)
        ses1 = req.session
        ses1.uname = uname
        res.redirect("/home")
    }
    else{
        res.send("Login Failed!!")
    }
})

app.get("/home", function(req,res){
    ses1 = req.session
    var uname = ses1.uname

    if(uname == null){
        res.send("You are not Logged-In.")
    } 
    else{
        res.setHeader("Content-Type", "text/html")
        res.write("Welcome" + uname)
        fs.readFile("logout.html", function(error,data){
            res.write(data)
            res.end()
        })
    }
})

app.get("/exit", function(req,res){
    ses1 = req.session
    var uname = ses1.uname
    if(uname == null){
        res.send("You are not Logged-In.")
    } 
    else{
        res.clearCookie('uname')
        res.send("You are Logout!!")
    }
})

app.listen(8080)