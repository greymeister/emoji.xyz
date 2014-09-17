var punycode = require('punycode')
var coffeescript = require('coffee-script/register')
var urlshortener = require('./urlshortener')
var sqlite = require('sqlite3');
var Sequelize = require('sequelize')
var express = require('express')
var bodyParser = require('body-parser')
var esrever = require('esrever')
var app = express()

var emojiUrl = 'http://localhost:5000/a/'

// DB Setup
var sequelize = new Sequelize('database', 'username', 'password', {
  // sqlite! now!
  dialect: 'sqlite',
  storage: 'db.sqlite3'
});


Url = sequelize.define('Url', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    url: Sequelize.TEXT
});

sequelize
  .sync()
  .complete(function(err) {
     if (!!err) {
       console.error('An error occurred while creating the table:', err)
     }
});

// Setup App
app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))

app.post('/shorten', function(request, response) {
 //var shortUrl = '😁';
  var url = request.body.url
  Url.findOrCreate({url: url})
    .error(function(err) {
      console.error('Failed saving record')
      response.status(500).json({status:500, message: 'internal error', type:'internal'})
    })
    .success(function(urlObj, created) {
      var key = urlshortener.encode(urlObj.id)
      console.log('Got Shorten Request for ' + url + ' -> ' + key)
      response.json({"link":emojiUrl + punycode.toASCII(key), "url":emojiUrl + key})
    })
})

app.get('/a/:urlId', function(request, response) {
  var urlId = request.param("urlId")
  console.log("Requested URL: " + urlId)
  var key = punycode.toUnicode(urlId)
  console.log('punycode: ' + key)
  Url.find(urlshortener.decode(key))
    .error(function(error) {
      console.error("Did not find url with id " + urlId)
      response.send(404).json({status:404, message: error, type:'internal'})
    })
    .success(function(url) {
      //response.json({"shortUrl": url.id, "link":url.url})
      if(url == null) {
        console.error("Did not find url with id " + urlId)
        response.status(404).json({status:404, message: 'Not found', type:'internal'})
      } else {
        response.redirect(url.url)
      }
  })
})

// Start App
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})


