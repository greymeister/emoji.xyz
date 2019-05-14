var punycode = require('punycode')
var coffeescript = require('coffee-script/register')
var urlshortener = require('./urlshortener')
var sqlite = require('sqlite3');
var Sequelize = require('sequelize')
var express = require('express')
var bodyParser = require('body-parser')
var esrever = require('esrever')
var app = express()
const debug = require('debug')('emoji.xyz')

var emojiUrl = null == process.env.URL_DEST ? 'http://localhost:5000/a/' : process.env.URL_DEST;

// DB Setup
var sequelize = new Sequelize('database', 'username', 'password', {
    // sqlite! now!
    dialect: 'sqlite',
    storage: 'db.sqlite3',
    logging: false
});


Url = sequelize.define('Url', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    url: Sequelize.TEXT
});

sequelize.sync()
    .catch(function (err) {
        if (!!err) {
            console.error('An error occurred while creating the table:', err)
        }
    });


// Setup App
app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))

app.post('/shorten', function (request, response) {
    var url = request.body.url
    debug('Got shorten URL Request %s', url)
    Url.findOrCreate({where: {url: url}})
        .spread(function (urlObj, created) {
            var key = urlshortener.encode(urlObj.id)
            debug('Encoded Shorten Request for %s -> %s', url, key)
            response.json({"link": emojiUrl + punycode.toASCII(key), "url": emojiUrl + key})
        })
        .catch(function (err) {
            console.error('Failed saving record')
            response.status(500).json({status: 500, message: 'internal error', type: 'internal'})
        })
})

app.get('/a/:urlId', function (request, response) {
    var urlId = request.params.urlId
    debug('Got link Request %s',  urlId)
    var key = punycode.toUnicode(urlId)
    debug('Punycode %s',  key)
    Url.findById(urlshortener.decode(key))
        .then(function (url) {
            if (url == null) {
                console.error("Did not find url with id " + urlId)
                // respond with html page
                if (request.accepts('html')) {
                    response.redirect('/')
                    return
                }
                response.status(404).json({status: 404, message: 'Not found'})
            } else {
                // Prevent infinity and beyond!
                if (url.url.indexOf(emojiUrl) > -1) {
                    response.redirect('/')
                } else {
                    response.redirect(url.url)
                }
            }
        })
        .catch(function (error) {
            console.error("Did not find url with id " + urlId)
            response.send(404).json({status: 404, message: error, type: 'internal'})
        })
})

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (request, response) {
    response.redirect('/');
});

// Start App
app.listen(app.get('port'), function () {
    console.log("emoji.xyz is running at localhost:" + app.get('port'))
})


