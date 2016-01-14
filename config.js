/**
 * Created by rolyer on 15-4-8.
 */
var faye = require('faye'),
    mongoose =  require('mongoose');

// create a server
var bayeux = new faye.NodeAdapter({
    mount: '/faye',
    timeout: 45
});

// mongodb connect config
mongoose.connect("mongodb://192.168.0.74:27017/italk");

// Definition of Shcemas
var MessageSchema = new mongoose.Schema({
        from : { type: String, default: '' ,trim : true},
        to : { type: String, default: '' ,trim : true},
        content : { type: String, default: '' ,trim : true},
        hasRead : { type: Boolean, default: false },
        sendAt: { type : Date, default: Date.now }
    },{collection: 'message'}),

    FriendSchema = new mongoose.Schema({
        id : {type:Number, default:0 },
        account : { type: String, default: '' ,trim : true},
        name : { type: String, default: '' ,trim : true},
        face : { type: String, default: 'images/face.png' ,trim : true}
    },{collection: 'friend'});

var dbs = {},
    Message = mongoose.model('Message', MessageSchema),
    Friend = mongoose.model('Friend', FriendSchema);

dbs.message = Message;
dbs.friend = Friend;
dbs.bayeux = bayeux;

module.exports = dbs;
