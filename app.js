// Requirements
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var bcrypt = require('bcrypt');
var methodOverride = ('method-override');
var MongoStore = require('connect-mongo')(session);

var authenticateUser = function(name, password, callback) {
  db.collection('users').findOne({username: username}, function(err, data) {
    if (err) {throw err;}
    bcrypt.compare(password, data.password_digest, function(err, passwordsMatch) {
      if (passwordsMatch) {
        callback(data);
      } else {
        callback(false);
      }
    })
  });
};

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
app.set('view engine', 'ejs');

var db;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/flashcards';
MongoClient.connect(mongoUrl, function(err, database) {
  if (err) { throw err; }
  db = database;
  process.on('exit', db.close);
});

// Routes
app.get('/', function(req, res){
  db.collection('flashcards').remove({});
  db.collection('flashcards').insertMany([
    {"name": "hund",
      "english": "dog",
      "img": "https://upload.wikimedia.org/wikipedia/commons/0/03/V%C3%A4stg%C3%B6taspets_hane_5_%C3%A5r.jpg"
    },
    {
      "name": "bil",
      "english": "car",
      "img": "https://upload.wikimedia.org/wikipedia/commons/a/a5/Volvo144dl.JPG"
    },
    {
      "name": "fisk",
      "english": "fish",
      "img": "https://upload.wikimedia.org/wikipedia/commons/4/40/Swedish_fish.png"
    }
  ]).then(
    db.collection('flashcards').find({}).toArray(function(err, results){
    // console.log(results);
    var randomFlashcard = results[Math.floor(Math.random()*results.length)];
    res.render('index', {flashcard: randomFlashcard});
    })
  )
});

app.get('/flashcards', function(req, res){
  res.json({});
});

app.post('/flashcards', function(req, res){
  var flashcard = {};
  flashcard.name = req.body.name;
  flashcard.english = req.body.english;
  flashcard.img = req.body.img;
  db.collection('flashcards').update({name: flashcard.name}, {english: flashcard.english}, {img: flashcard.img}, function(err, data) {
    console.log(data);
    res.redirect('/');
  });
});

app.get('/flashcards/:id/edit', function(req, res){
    db.collection('flashcards').findOne(
    {_id: ObjectId(req.params.id)},
    function(err, result){
      res.render('edit', {flashcard: result});
    }
  )
});

app.patch('/flashcards/:id', function(req, res){
  // id will be in req.params
  db.collection('flashcards').update(
    {_id: ObjectId(req.params.id)},
    {$set: { name: req.body.flahscard.name }},
    function(err, result){
      res.redirect('/');
    }
  )
});

// AJAX
app.get('/api/flashcards/random', function(req, res) {

  var limit = parseInt(req.query.limit) || 1; 

  db.collection('flashcards').aggregate([{$sample: { size: limit }}]).toArray(function(err, data) {
    console.log(err)
    var randomFlashcard = data;
    res.json(randomFlashcard);
  })
});

// User Authentication
app.post('/login', function(req, res) {
  // req.session.name = req.body.username;
  authenticateUser(req.body.username, req.body.password, function(user) {
    if (user) {
      req.session.name = user.name;
      req.session.userId = user._id;
    }
    res.redirect('/');
  });
});

app.get('/logout', function(req, res) {
  req.session.name = null;
  req.session.userId = null;
  res.redirect('/');
})

app.listen(process.env.PORT || 4000);