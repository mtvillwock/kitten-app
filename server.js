// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser");

// CONFIG //
// set ejs as view engine
app.set('view engine', 'ejs');
// serve js & css files
app.use("/static", express.static("public"));
// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({
    extended: true
}));

var db = require('./models/index.js');

// Routes //
// app.get('/', function(req, res) {
//     res.redirect('/kittens');
// })

app.get('/kittens', function(req, res) {
  db.Kitten.find({}, function(err, kittens) {
    if (err) console.log(err);
    res.render('index', {kittens: kittens});
  })
})

app.post('/kittens', function(req, res) {
  // swap for post data later
  console.log(req.body);
    db.Kitten.create(req.body, function(err, cat) {
        if (err) {
            console.log(err);
        }
       res.json(cat);
    })
})

app.delete('/kittens/:_id', function(req, res) {
  console.log('kitten id is: ', req.params);
  db.Kitten.find({_id: req.params._id}, function(err, kitten) {
    kitten.remove(function(err, kitten) {
      console.log("kitten deleted");
      res.json("That cat is dead");
    })
  })
})

app.listen(3000, function() {
    console.log("listening on port 3000");
});