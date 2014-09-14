var punycode = require('punycode')
var coffeescript = require('coffee-script/register')
var urlshortener = require('./urlshortener')
var sqlite = require("sqlite3");
var Sequelize = require("sequelize");
var express = require('express')
var app = express();

// DB Setup
var sequelize = new Sequelize('database', 'username', 'password', {
  // sqlite! now!
  dialect: 'sqlite',
  storage: 'urls.sqlite3'
});


Url = sequelize.define('Url', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    url: Sequelize.STRING
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
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.get('/shorten', function(request, response) {
 //var shortUrl = '😁';
  var url = request.query.url
  var urlObj = Url.build({url: url})
  urlObj.save()
    .error(function(err) {
      console.error('Failed saving record')
      response.status(500).json({status:500, message: 'internal error', type:'internal'})
    })
    .success(function() {
      //var link = 'http://emoji.xyz/a/' + punycode.encode(urlObj.id)
      var link = 'http://emoji.xyz/a/' + urlObj.id
      console.log('Got Shorten Request for ' + url)
      response.json({"shortUrl": urlObj.id, "link":link})
    })
})

app.get('/a/:urlId', function(request, response) {
  var urlId = request.param("urlId")
  Url.find(urlId)
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


