const express = require('express')
var myParser = require("body-parser");
var AWS = require('aws-sdk')
const app = express()
const pg  = require('pg')
const pool = new pg.Pool({
user: 'postgres',
host: '127.0.0.1',
database: 'education_app',
password: 'rishabh2514',
port: '5432'});

app.use(myParser.json());
app.use(myParser.urlencoded({extended : true}));

//var s3 = new AWS.S3({accessKeyId:'AKIAJD5G3RJHN5OG2YAQ', secretAccessKey:'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', region:'ap-south-1'});

app.get('/', (req, res)=>{  
});

app.post('/LOGIN/', (req, res)=>{
  console.log("LOGIN ATTEMPT");
  var query = "SELECT * FROM user_info WHERE username=$1 and pass=$2";
  pool.query(query, [req.body.username, req.body.pass], (err, res1)=>{
    if(res1.rows.length>0){
      console.log("success");
      res.send("success");
    }else{
      res.send("failed");
    }
  });
});

app.post('/SIGNUP/', (req, res)=>{
  console.log("SIGNUP ATTEMPT");
  var name = req.body.name;
  var username = req.body.username;
  var pass = req.body.pass;
  var age = req.body.age;
  var year = req.body.year;
  var subject = req.body.subject;
  var interest = req.body.interest;
  var pre = JSON.stringify(req.body.prereq);
	console.log(pre);

  var query = "INSERT INTO user_info(name, age, year, subject, interest, prerequisite, username, pass) VALUES($1,$2,$3,$4,$5,$6,$7,$8)";
  pool.query(query,[name, age, year, subject, interest, pre, username, pass], (err, res1)=>{
      if(!err){
        res.sendStatus(200);
      }else{
        console.log(err);
      }
  });  

});

app.listen(3000, () => console.log('Server running on port 3000'))
