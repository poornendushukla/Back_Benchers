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
var FCM = require('fcm-node');
var serverKey={
  "type": "service_account",
  "project_id": "chatapp-e9fcd",
  "private_key_id": "d82cf731bc044be8d2d9c6f2ff51d20bd5dbbe3a",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCsTV1I5gn8vmca\n7lKJ5qxBScSeohIVddjPSYN7KElggX8P8hzlaiRx9D+ZEWZ894UsLDtVzI6IhXnU\n4wc4c4xtFJaPA6BeyMfyQJw+pOhESZok7PjMtsQwZYnm2361y47M6C7fzB9dhgoo\n4KTNISTFRRvSAxHMFTzer3caEzXdyUn9yNra4QCk9IspVXrI0YswKaTeHyHhJdy8\nhRuZiTsb+YA+SU+Nj3pXpjLo3UupEIsGo8Tj4MtquRkfNuk3gOLDMMvOLbLCViC2\ngOQ0d5HQlzhW7M6f2oLMo5hVX2Jkbgxj5hnPyFuu3TBuqM/7kGT4m1/EVOBDhIUw\nPvBDG94jAgMBAAECggEAAWSJpiNp4QPPvtQmL74TUxWVxwQZc0YNd3hsPulXMPlK\n/dmZmp+AkFeGoFzCJN3swKvqYW/+683Ruskatz3iVnvbeeHwEvBAra9BNA+Rg3CO\nGj9OsAHgkfOr+HkAiRQs1Ope3zJ3vTK3hqPGmBpasfLxLQfygts/eLu1vG/Q4vVl\nsnIn0TfjU2mxD2lD9eICf6dKO1EQ3zNWxSam1phQCvC/t92heHCkcKtJCfLT1H4K\njWgMxw+bSVbS0O0TUukdlYrB/2oagu/Rbm0KINyaSmjzQl1V1AGxSDrKmNzuTWbr\nidqjJC+Tb4eH3wTJ5+VyfOtH877gtSdp97fGS4rkPQKBgQDrTVxsm4j34lrMzCkk\nzKDRs0wmZHzWTedluzATc87K3PggGzbIL8Qs9hW9VjTiT7WSorRTySDq+fmg57Q8\nPXWB3zbr1sGGalTPNmE/NFyykhCNfd6nJYfWJQUNlEGPyTjx+U12i9dVQfW6/l0u\nuRQwmICUmdYXDkcL+/1Li2PSBQKBgQC7dVd9JryTlfua1E+4wzzi43PXuQP4w2kN\nPuSrCRvOTTCIE7FP4lYZ5tiSP4trZGT4cz8f+orTnUIO6DpgfZyibB++0IpX9J3y\nMTqFBsseUJPr1PuDX4nGnZ6UZwV84sKZkJXJVSc6tFPTVt7CxKrlF/4FgC7gHORV\njUzm1AagBwKBgF7Pmiks9qCjNWEF9qIcTcSRUWK65M5ZL57/MNz1seJt7RDKxmUd\nUhenxJS48rAp3AjMxIpqJXho5xvdoPMQ9JMzBOc8blgh6jBgQgj8qUlOr5rDl/6T\nkctIuWOCVHSCaQ6fHIZizI5O+JuzOIrGCouWN2EpJ2m82AXNMH/LF5qdAoGAbxKo\nNE+vjQNhgewrEJ8ehJGhIkFOSSgAJwkNFQrgnuy9xONmPJ8vxUkzKfTc91UVPuGK\nlbguahTT/2E6tdG37cWDSdznHBalP8xLkGbmE6BLBYG9RapmSHk8bVJdvhHenH8/\nQXxjMjWHNcJTW7SMThJZQYkiPUjhQo/m8R7QjiECgYAJxMn+DJc9a0vTWElszvCu\n+ElxQveBJ+mEtGgvVJZgTJfco+BRTkM3d2sJ2QApIO90AoWcIv8nF5vmoSbv/55m\nSXcvI46W9+TEPCrFc6ApUZbpfZtJPY//Na2MEB1nK+be099cQyozi+G0vijiEmy9\nc6XUcE+b2P+WEXKGPjr8DQ==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-ip469@chatapp-e9fcd.iam.gserviceaccount.com",
  "client_id": "117505834714451609165",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ip469%40chatapp-e9fcd.iam.gserviceaccount.com"
}; //put your server key here


var Fcm = require('fcm-notification');
var fcm = new FCM(serverKey);
var token = 'chatroom';

var admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serverKey),
  databaseURL: 'https://chatapp-e9fcd.firebaseio.com'
});

app.use(myParser.json());
app.use(myParser.urlencoded({extended : true}));

//var s3 = new AWS.S3({accessKeyId:'AKIAJD5G3RJHN5OG2YAQ', secretAccessKey:'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', region:'ap-south-1'});

app.get('/', (req, res)=>{  
});

app.post('/SENDMESSAGE/', (req,res) => {
//  console.log(JSON.stringify(req));
  var username= req.body.username;
  var message = req.body.message;
  +new Date;
  var time = '212312';
  var query = 'INSERT INTO chatroom(username, message) values($1, $2)';
  console.log(query);
  pool.query(query, [req.body.username, req.body.message],(err, res1)=>{
    if(!err){
      res.send(200);
    }else{
      console.log(err);
    }
  });
var topic = 'chatroom';

// See documentation on defining a message payload.
var message = {
  data: {
  username:username,
  message: message,
  time: time
  },
  topic: topic
};

// Send a message to devices subscribed to the provided topic.
admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
});

app.get('/GETMESSAGE/', async(req, res)=>{
  console.log("GETMESSAGECALLED");
  var query = "SELECT * FROM chatroom ORDER BY time ASC";
  await pool.query(query, (err, res1)=>{
    if(!err){
      console.log(res1.rows);
      res.send(res1.rows);
    }else{
      console.log(err);
      res.send(err);
    }
  });
});


/*app.post('/LOGIN/', (req, res)=>{
  console.log("LOGIN ATTEMPT");
  var query = "SELECT * FROM user_info WHERE username=$1 and pass=$2";
  pool.query(query,[req.body.username, req.body.pass], (err, res1)=>{
    if(!err){
      res.send("success");
    }else{
      res.send("internal error");
    }
  });
});*/

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
