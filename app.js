// Requirements
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var bcrypt = require('bcrypt');
var methodOverride = ('method-override');
var MongoStore = require('connect-mongo')(session);

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
app.set('view engine', 'ejs');
// app.use(methodOverride('_method'));

// db
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
    res.render('index', {flashcards: results});
    })
  )
});

// AJAX
app.get('/api/flashcards/random', function(req, res) {

  var limit = parseInt(req.query.limit) || 1; 

  db.collection('flashcards').aggregate([{$sample: { size: limit }}]).toArray(function(err, data) {
    var randomFlashcard = data;
    res.json(randomFlashcard);
  })
});

// User Authentication
// app.post('/login', function(req, res) {
//   res.redirect('/');
// });

// app.get('/logout', function(req, res) {
//   res.redirect('/');
// })

app.listen(process.env.PORT || 4000);