var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')

var app=express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
    next();
  });

var FormRoute =require('./Api/Form_Api');


app.use(bodyParser.json()).use(morgan());
app.use('/api/',FormRoute);



app.listen(5000,()=>{
    console.log(`server running at ${5000}`)
})
