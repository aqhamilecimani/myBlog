var express = require('express');
var router = express.Router();
var request = require('request');
//can import code directly from finalmaybecompressed
var Posts =require('../db.json');

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Personal Finance',posts:Posts.posts });
});

/* get new page. */
router.get('/new', function (req, res, next) {
  res.render('new', { title: 'New Article', posts: posts.posts});
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
res.render('archives', { title: 'New Article', posts: Posts.posts});
});
module.exports = router;

//post new Page
router.post('/new', function(req, res, next) {
//res.send(req.body)
//create variable to posts

let obj ={
"title":req.body.title,
"Author":req.body.Author,
"image":req.body.image,
"date":req.body.date,
"time":req.body.time,
"content":req.body.content,
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

/* GET article page. */
router.get('/article1', function(req, res, next) {
  var id = req.params.id;
  var data = blogs.blogs[id-1];
  res.render('article1');
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
router.get('/updates/:id', function(req, res, next) {

 //make a post request to our database
 request({
 uri: "http://localhost:8000/posts/" + req.params.id,
 method: "GET",
 }, function(error, response, body) {
     console.log(JSON.parse(body));
     //send a response message
     res.render('updates', {message: false, posts: JSON.parse(body)});
 });

});

router.post('/updates/:id', function(req, res, next) {
 request({
   uri: "http://localhost:8000/posts/" + req.params.id,
 method: "PATCH",
 form: {
     title: req.body.title,
     content: req.body.content,
     author: req.body.author
 }
 }, function(error, response, body) {
     // console.log(body);
     //send a response message
     res.render('updates', {message: 'Successfully Changed.', posts: JSON.parse(body)});
 });
});

 // //make a post request to our database
 // request({
 // uri: "http://localhost:8000/posts/" + req.params.id,
 // method: "GET",
 // }, function(error, response, body) {
 //     console.log(JSON.parse(body));
 //     //send a response message
 //     res.render('update', {message: false, posts: JSON.parse(body)});
 // });
// router.post('/updates/:id', function(req, res, next) {
//  request({
//    uri: "http://localhost:8000/posts/" + req.params.id,
//  method: "PATCH",
//  form: {
//      title: req.body.title,
//      content: req.body.content,
//      author: req.body.author
//  }
//  }, function(error, response, body) {
     // console.log(body);
     //send a response message
//      res.render('updates', {message: 'Successfully Changed.', posts: JSON.parse(body)});
//  });
// });



module.exports = router;
