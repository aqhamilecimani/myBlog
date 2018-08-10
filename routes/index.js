var express = require('express');
var router = express.Router();
var request = require('request');
var Posts =require('../db.json');
//can import code directly from finalmaybecompressed

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Personal Finance',posts:Posts.posts });
});
router.post('/login',function(req,res,next){
  var user=Posts.users;
  console.log(user)
  var name=req.body.name;
  var password=req.body.password;

  for(let i in user){
  console.log(name);
  if(name == user.name && password == user.password){
  alert("Welcome to PFC");
} else{
  alert("try again");
  alert(user);
}

}
});

/* get new page. */
router.get('/new', function (req, res, next) {
  var id = req.params.id;
  var data = Posts.posts[id-1];
  res.render('new', { title: 'New Article', posts: Posts.posts});
});

/* get login page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* get Sign Up  page. */
router.get('/sign', function(req, res, next) {
  res.render('sign');
  res.redirect('/index');
});

/* get view   page. */
router.get('/view/:id', function (req, res, next) {
  var id = req.params.id;
  var data = Posts.posts[id-1];
  res.render('view', { title: 'View', posts: data});
});

/* GET archive page. */
router.get('/archives', function (req, res, next) {
  var id=req.params.id;
  var data=Posts.posts[id-1];
res.render('archives', { title: 'New Article', posts: Posts.posts});
});

//post new Page
router.post('/new', function(req, res, next) {

let obj ={
"title":req.body.title,
"Author":req.body.Author,
"image":req.body.image,
"date":req.body.date,
"time":req.body.time,
"summary":req.body.summary
}


//write logic that saves this data
request.post({
  url:"http://localhost:8000/posts",
  body:obj,
  json:true
},function (error,responsive,body) {
  //what to send when function has finished
  res.redirect('/index');
});
});

//DELETE BUTTON
router.get('/delete/:id', function(req, res, next) {
 console.log(req.params.id)

request({
 uri: "http://localhost:8000/posts/"  + req.params.id,
 method: "DELETE",
 }, function(error, response, body) {

     let data = {
         message: 'Successfully Removed.',
     }

     res.redirect('/index');
 });
});

// UPDATE ROUTES


router.get('/updates/:id', function (req, res, next) {
  var id=req.params.id;
  var data=Posts.posts[id-1];
  res.render('updates', { title: 'updates', posts: data});
});

router.post('/updates/:id',function(req,res,next){
  request({
    url: "http://localhost:8000/posts/" + req.params.id,
  method: "PATCH",
  form: {
    "title" : req.body.title,
    "author" : req.body.Author,
    "date" : req.body.date,
    "image":req.body.image,
    "content" : req.body.content,
    "story" : req.body.story,
  }
  }, function(error, response, body) {
  res.redirect('/archives')
  });
 });


module.exports = router;
