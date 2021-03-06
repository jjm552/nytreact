//Dependencies
var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Requiring Article models
var Article = require("./models/Article.js");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Make public a static dir
app.use(express.static("./public"));

// Database configuration with mongoose
var databaseUri = 'mongodb://localhost/nytreact';

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect(databaseUri);
}

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// ================================================
// Routes
// ================================================

//Route to display main index.html page
app.get('/', function(req, res) {
	res.sendFile(__dirname + "/public/index.html");
});

//Route to get articles
app.get('/api', function(req, res) {
	Article.find({}).exec(function(err, doc) {
		var articles = [];
		doc.forEach(function(article){
			articles.push({
				title:article.title,
				url: article.url,
				date: article.date,
				articleID: article.articleID
			});
		});
		res.send(articles);
	});
});

//Route to post saved articles
app.post('/api', function(req, res) {
	Article.create({
		articleID: req.body.id,
		title: req.body.title,
		date: req.body.date,
		url: req.body.url,
	}, function(err) {
		if (err) {
			console.log(err);
		} else {
			res.send("Saved Article");
		}
	});
});

//Route to delete saved articles
app.post('/api/delete', function(req, res) {
	Article.remove({
		articleID: req.body.id
	}, function(err) {
		if (err) {
			console.log(err);
		} else {
			res.send("Deleted Article");
		}
	});
});



// Listen on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log("App running on port 3000!");
});