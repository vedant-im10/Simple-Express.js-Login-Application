var express = require('express')
var fs = require('fs')
var bp = require('body-parser')
var app = express()

app.use(bp.urlencoded({extended:true}))

app.get("/", function(req,res){
    res.send("Hello World")
})

app.get("/Login", function(req,res){
    res.setHeader("Content-Type", "text/html")
    fs.readFile("login1.html", function(error,data){
        res.send(data)
    })
})

app.get("/home/:n1", function(req,res){
    // var t = res.params.n1
    // if(t == "ce"){}
    res.send("You have demanded " + req.params.n1)
})


app.post("/welcome", function(req,res){
    var uname = req.body.uname
    var passwd = req.body.passwd
    if(uname == "admin" && passwd == "admin"){
        res.send("Welcome " + uname)
    }
    else{
        res.send("Login Failed!!")
    }
})

app.listen(8080)