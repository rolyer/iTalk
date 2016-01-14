/**
 * Created by rolyer on 15-4-8.
 */
// import modules here
var express = require('express'),
	bodyParser = require('body-parser'),
	http = require('http'),
	cas = require('cas-client'),
	config =  require('./config'),
    multipart = require('connect-multiparty'),
	common = require('./routes/common');


var auth = cas.getMiddleware('http://sso.com:8080/cas', 'http://localhost:8000');

var app =  express();
var server = http.createServer(app);

// set the view engine to ejs
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/public'));
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

/**
 *
 * chat index page
 *
 */
app.get('/chat', common.chat);
/**
 *
 * init data
 * e.g. http://localhost:8000/init
 *
 */
app.get('/init', common.init);
/**
 *
 * fetch users/friends from database
 *
 */
app.get('/friends', common.friends);
/**
 *
 * fetch chat history from database
 *
 */
app.post('/history', common.history);
/**
 *
 * Fetch offline messages
 *
 */
app.post('/offline', common.offline);
/**
 *
 * Update read status
 *
 */
app.post('/update', common.update);
/**
 *
 * send message
 *
 */
app.post('/message', common.message);
/**
 *
 * file upload
 *
 */
app.post('/uploader', multipart(), common.uploader);

common.bayeux.attach(server);
server.listen(8000);
