/**
 * Created by rolyer on 15-4-8.
 */

var config =  require('./../config'),
    ObjectID = require('mongodb').ObjectID,
    fs = require('fs'),
    uuid = require('node-uuid'),
    path = require('path');

var Friend =  config.friend,
    Bayeux = config.bayeux,
    Message = config.message;

exports.bayeux = Bayeux;

/**
 *  init data
 * @param req
 * @param res
 * e.g. http://localhost:8000/init
 */
exports.init = function(req, res){
    // init friends
    Friend.remove({}, function(err) {
        console.log('collection friend removed.');
    });

    var friends = [];
    friends.push(new Friend({id:0,account:"rolyer", name:"Rolyer Luo", face: getFace() }));
    friends.push(new Friend({id:2,account:"admin", name:"systemadmin", face: getFace() }));
    friends.push(new Friend({id:3,account:"dev", name:"userdev", face: getFace() }));
    friends.push(new Friend({account:"gefangzhao", name:"葛方召", face: getFace() }));
    friends.push(new Friend({account:"xuefei", name:"薛飞", face: getFace()}));
    friends.push(new Friend({account:"kongbinheng", name:"孔彬恒", face: getFace() }));
    friends.push(new Friend({id:7,account:"maohuajun", name:"毛华军", face: getFace() }));
    friends.push(new Friend({id:8,account:"xiejinsheng", name:"谢金胜", face: getFace() }));
    friends.push(new Friend({id:9,account:"gongnianhua", name:"龚年华", face: getFace() }));
    friends.push(new Friend({id:10,account:"xuxiahui", name:"徐霞辉", face: getFace() }));
    friends.push(new Friend({id:11,account:"liangshan", name:"梁山", face: getFace() }));
    friends.push(new Friend({id:12,account:"mengchengxiang", name:"孟城祥", face: getFace() }));
    friends.push(new Friend({id:13,account:"liuyuee", name:"刘月娥", face: getFace() }));
    friends.push(new Friend({id:14,account:"liuying", name:"刘颖", face: getFace() }));
    friends.push(new Friend({id:15,account:"zhangliqiong", name:"张立琼", face: getFace() }));
    friends.push(new Friend({id:16,account:"zhanglijuan", name:"张丽娟", face: getFace() }));
    friends.push(new Friend({id:17,account:"lizhengfang", name:"李正方", face: getFace() }));
    friends.push(new Friend({id:18,account:"zhoulang", name:"周浪", face: getFace() }));
    friends.push(new Friend({id:19,account:"linwenzhang", name:"林文章", face: getFace() }));
    friends.push(new Friend({id:20,account:"zhongwenzhong", name:"钟文忠", face: getFace() }));
    friends.push(new Friend({id:21,account:"liulong", name:"刘龙", face: getFace() }));
    friends.push(new Friend({id:22,account:"zhouyuan", name:"周媛", face: getFace() }));
    friends.push(new Friend({id:23,account:"xieguobing", name:"谢国兵", face: getFace() }));
    friends.push(new Friend({id:24,account:"liuyang", name:"刘杨", face: getFace() }));
    friends.push(new Friend({id:25,account:"liujuan", name:"刘娟", face: getFace() }));
    friends.push(new Friend({id:26,account:"gongli", name:"龚丽", face: getFace() }));
    friends.push(new Friend({account:"fuxiaoming", name:"付晓明", face: getFace() }));
    friends.push(new Friend({id:28,account:"luoxiaoyan", name:"罗小艳", face: getFace() }));
    friends.push(new Friend({id:29,account:"wanligang", name:"万立刚", face: getFace() }));
    friends.push(new Friend({id:30,account:"xuna", name:"许娜", face: getFace() }));
    friends.push(new Friend({id:31,account:"liaominzhi", name:"廖敏芝", face: getFace() }));
    friends.push(new Friend({id:32,account:"denghui", name:"邓辉", face: getFace() }));
    friends.push(new Friend({id:33,account:"linfang", name:"林芳", face: getFace() }));
    friends.push(new Friend({id:34,account:"tangchunyan", name:"唐春燕", face: getFace() }));
    friends.push(new Friend({id:35,account:"songxiaohui", name:"宋小惠", face: getFace() }));
    friends.push(new Friend({id:36,account:"liuqi", name:"刘奇", face: getFace() }));
    friends.push(new Friend({id:37,account:"zhangzhi", name:"张芝", face: getFace() }));
    friends.push(new Friend({id:38,account:"jiwei", name:"吉巍", face: getFace() }));
    friends.push(new Friend({id:39,account:"langxiaojing", name:"郎晓静", face: getFace() }));
    friends.push(new Friend({account:"lichaowei", name:"李超伟", face: getFace() }));
    friends.push(new Friend({id:41,account:"xiejiugao", name:"谢玖高", face: getFace() }));
    friends.push(new Friend({id:42,account:"pengyuze", name:"彭禹泽", face: getFace() }));
    friends.push(new Friend({id:43,account:"zhaote", name:"赵特", face: getFace() }));
    friends.push(new Friend({id:44,account:"chenyanhong", name:"陈燕红", face: getFace() }));
    friends.push(new Friend({id:45,account:"xiaojinzhi", name:"肖金知", face: getFace() }));
    friends.push(new Friend({id:46,account:"chenshouhong", name:"陈首红", face: getFace() }));
    friends.push(new Friend({id:47,account:"houting", name:"侯庭", face: getFace() }));
    friends.push(new Friend({id:48,account:"zhangchi", name:"张驰", face: getFace() }));
    friends.push(new Friend({id:49,account:"wufeng", name:"伍凤", face: getFace() }));
    friends.push(new Friend({id:50,account:"liwei", name:"李薇", face: getFace() }));
    friends.push(new Friend({id:51,account:"lijinjing", name:"李锦晶", face: getFace() }));
    friends.push(new Friend({account:"licai", name:"李财", face: getFace() }));
    friends.push(new Friend({id:53,account:"ouyangshengcai", name:"欧阳盛才", face: getFace() }));
    friends.push(new Friend({id:54,account:"chenhongyin", name:"陈泓印", face: getFace() }));
    friends.push(new Friend({id:55,account:"liucong", name:"刘聪", face: getFace() }));
    friends.push(new Friend({id:56,account:"xiehuang", name:"谢皇", face: getFace() }));
    friends.push(new Friend({id:57,account:"luohongwen", name:"罗鸿文", face: getFace() }));
    friends.push(new Friend({id:58,account:"licong", name:"李聪", face: getFace() }));
    friends.push(new Friend({id:59,account:"jianxinyuan", name:"简心愿", face: getFace() }));
    friends.push(new Friend({id:60,account:"caochao", name:"曹超", face: getFace() }));
    friends.push(new Friend({id:61,account:"xingfengju", name:"邢凤菊", face: getFace() }));
    friends.push(new Friend({id:62,account:"zjz", name:"张峻桢", face: getFace() }));
    friends.push(new Friend({id:63,account:"wengyong", name:"翁勇", face: getFace() }));
    friends.push(new Friend({id:64,account:"liuzhou", name:"刘舟", face: getFace() }));
    friends.push(new Friend({id:65,account:"yangwei", name:"阳卫", face: getFace() }));
    friends.push(new Friend({id:66,account:"caohuixing", name:"曹惠星", face: getFace() }));
    friends.push(new Friend({id:67,account:"xianingdong", name:"夏宁东", face: getFace() }));
    friends.push(new Friend({id:68,account:"fangjie", name:"方洁", face: getFace() }));
    friends.push(new Friend({id:69,account:"luozha", name:"罗吒", face: getFace() }));
    friends.push(new Friend({id:70,account:"zengqingping", name:"曾青平", face: getFace() }));
    friends.push(new Friend({id:71,account:"jiangling", name:"蒋玲", face: getFace() }));
    friends.push(new Friend({id:72,account:"tangweifang", name:"唐卫芳", face: getFace() }));
    friends.push(new Friend({id:73,account:"zhangyinwei", name:"张尹薇", face: getFace() }));
    friends.push(new Friend({id:74,account:"yuanzhuolin", name:"袁卓琳", face: getFace() }));
    friends.push(new Friend({id:75,account:"heqian", name:"贺倩", face: getFace() }));
    friends.push(new Friend({id:76,account:"tanghuaping", name:"唐化平", face: getFace() }));
    friends.push(new Friend({id:77,account:"zengli", name:"曾莉", face: getFace() }));
    friends.push(new Friend({id:78,account:"dengli", name:"邓黎", face: getFace() }));
    friends.push(new Friend({id:79,account:"caozixuan", name:"曹梓轩", face: getFace() }));
    friends.push(new Friend({id:80,account:"chenyanhua", name:"陈艳华", face: getFace() }));
    friends.push(new Friend({id:81,account:"lizhanping", name:"李展平", face: getFace() }));
    friends.push(new Friend({id:82,account:"zhangmeiyun", name:"张美云", face: getFace() }));
    friends.push(new Friend({id:83,account:"caoxiaofeng", name:"曹晓锋", face: getFace() }));
    friends.push(new Friend({id:84,account:"kouchuanguan", name:"寇传冠", face: getFace() }));
    friends.push(new Friend({id:85,account:"wangxing", name:"王杏", face: getFace() }));
    friends.push(new Friend({id:86,account:"zhangmin", name:"张敏", face: getFace() }));
    friends.push(new Friend({id:87,account:"humengping", name:"胡梦萍", face: getFace() }));
    friends.push(new Friend({id:88,account:"wangjun", name:"王君", face: getFace() }));
    friends.push(new Friend({id:89,account:"shiyao", name:"石瑶", face: getFace() }));
    friends.push(new Friend({id:90,account:"dengxiaoyan", name:"邓晓艳", face: getFace() }));
    friends.push(new Friend({id:91,account:"yurongjun", name:"禹荣军", face: getFace() }));
    friends.push(new Friend({id:92,account:"wenliangzhi", name:"文良智", face: getFace() }));
    friends.push(new Friend({id:93,account:"zibin", name:"资彬", face: getFace() }));
    friends.push(new Friend({id:94,account:"liufen", name:"刘芬", face: getFace() }));
    friends.push(new Friend({id:95,account:"chenzhonghua", name:"陈忠华", face: getFace() }));
    friends.push(new Friend({id:96,account:"yangxiaolin", name:"杨小林", face: getFace() }));
    friends.push(new Friend({id:97,account:"zengweihui", name:"曾伟辉", face: getFace() }));
    friends.push(new Friend({id:98,account:"chencheng", name:"陈诚", face: getFace() }));
    friends.push(new Friend({id:99,account:"wangtao", name:"王弢", face: getFace() }));
    friends.push(new Friend({id:100,account:"heyuebing", name:"何岳兵", face: getFace() }));
    friends.push(new Friend({id:101,account:"tianli", name:"田黎", face: getFace() }));
    friends.push(new Friend({id:102,account:"dinghaipeng", name:"丁海鹏", face: getFace() }));
    friends.push(new Friend({id:103,account:"shenwenchao", name:"申文超", face: getFace() }));
    friends.push(new Friend({id:104,account:"wangtianfan", name:"汪天凡", face: getFace() }));
    friends.push(new Friend({id:105,account:"moqiongyao", name:"莫琼瑶", face: getFace() }));
    friends.push(new Friend({id:106,account:"wangjiazhen", name:"王佳桢", face: getFace() }));
    friends.push(new Friend({id:107,account:"hequan", name:"何泉", face: getFace() }));
    friends.push(new Friend({id:108,account:"zhangshuangqing", name:"张双庆", face: getFace() }));
    friends.push(new Friend({id:109,account:"tansaihua", name:"谭赛华", face: getFace() }));
    friends.push(new Friend({id:110,account:"chenyan", name:"陈焱", face: getFace() }));
    friends.push(new Friend({id:111,account:"aihui", name:"艾辉", face: getFace() }));
    friends.push(new Friend({id:112,account:"liqianping", name:"李钱平", face: getFace() }));
    friends.push(new Friend({id:113,account:"shiyan", name:"施燕", face: getFace() }));
    friends.push(new Friend({id:114,account:"liuwenyan", name:"刘文妍", face: getFace() }));
    friends.push(new Friend({id:115,account:"liujianmin", name:"刘建民", face: getFace() }));
    friends.push(new Friend({id:116,account:"hute", name:"胡特", face: getFace() }));
    friends.push(new Friend({id:117,account:"yujiwen", name:"余吉文", face: getFace() }));
    friends.push(new Friend({id:118,account:"meiziheng", name:"梅子恒", face: getFace() }));
    friends.push(new Friend({id:119,account:"qiuting", name:"邱婷", face: getFace() }));
    friends.push(new Friend({id:120,account:"houjia", name:"侯佳", face: getFace() }));
    friends.push(new Friend({id:121,account:"tantichang", name:"谭倜倡", face: getFace() }));
    friends.push(new Friend({id:122,account:"ken.kan", name:"阚培培", face: getFace() }));
    friends.push(new Friend({id:123,account:"zhuyanhong", name:"朱嫣红", face: getFace() }));
    friends.push(new Friend({id:124,account:"shenguowei", name:"沈国伟", face: getFace() }));
    friends.push(new Friend({id:125,account:"yuanhaiyang", name:"袁海洋", face: getFace() }));
    friends.push(new Friend({id:126,account:"zhoupeng", name:"周鹏", face: getFace() }));
    friends.push(new Friend({id:127,account:"zhanxiaolong", name:"詹小龙", face: getFace() }));
    friends.push(new Friend({id:128,account:"fengyuxia", name:"冯玉霞", face: getFace() }));
    friends.push(new Friend({id:129,account:"liuxiaoqin", name:"刘小琴", face: getFace() }));
    friends.push(new Friend({id:130,account:"zhoubin", name:"周彬", face: getFace() }));
    friends.push(new Friend({account:"lijianchao", name:"李建潮", face: getFace() }));
    friends.push(new Friend({id:132,account:"wudongting", name:"吴冬霆", face: getFace() }));
    friends.push(new Friend({id:133,account:"zhaotao", name:"赵涛", face: getFace() }));
    friends.push(new Friend({id:134,account:"dengshuai", name:"邓帅", face: getFace() }));
    friends.push(new Friend({id:135,account:"wuxueting", name:"吴学婷", face: getFace() }));
    friends.push(new Friend({id:136,account:"yanghehua", name:"杨和华", face: getFace() }));
    friends.push(new Friend({id:137,account:"zhangjie", name:"张洁", face: getFace() }));
    friends.push(new Friend({id:138,account:"yinzhiyong", name:"殷志勇", face: getFace() }));
    friends.push(new Friend({id:139,account:"wuhaiqing", name:"吴海清", face: getFace() }));
    friends.push(new Friend({id:140,account:"zhangtao", name:"张涛", face: getFace() }));
    friends.push(new Friend({id:141,account:"gongmeiling", name:"龚美玲", face: getFace() }));
    friends.push(new Friend({account:"luoliang", name:"罗亮", face: getFace() }));
    friends.push(new Friend({id:143,account:"xialingyi", name:"夏凌怡", face: getFace() }));
    friends.push(new Friend({id:144,account:"zhengbo", name:"郑波", face: getFace() }));
    friends.push(new Friend({id:145,account:"zhouhui", name:"周辉", face: getFace() }));
    friends.push(new Friend({id:146,account:"zhangxin", name:"张鑫", face: getFace() }));
    friends.push(new Friend({id:147,account:"yuling", name:"余凌", face: getFace() }));
    friends.push(new Friend({id:148,account:"zhangqingyu", name:"张清玉", face: getFace() }));
    friends.push(new Friend({id:149,account:"zhangzhixia", name:"张志霞", face: getFace() }));
    friends.push(new Friend({id:150,account:"yanglili", name:"杨礼丽", face: getFace() }));
    friends.push(new Friend({id:151,account:"zhengpeiyun", name:"郑佩筠", face: getFace() }));
    friends.push(new Friend({id:152,account:"zhoulin", name:"周琳", face: getFace() }));
    friends.push(new Friend({id:153,account:"liutao", name:"刘涛", face: getFace() }));
    friends.push(new Friend({id:154,account:"shenhaili", name:"沈海莉", face: getFace() }));
    friends.push(new Friend({id:155,account:"luolingling", name:"罗玲玲", face: getFace() }));
    friends.push(new Friend({account:"zhangxihao", name:"张锡好", face: getFace() }));
    friends.push(new Friend({id:157,account:"liulingli", name:"刘伶俐", face: getFace() }));
    friends.push(new Friend({id:158,account:"zhaojiao", name:"赵娇", face: getFace() }));
    friends.push(new Friend({id:159,account:"yuanchaokun", name:"袁朝昆", face: getFace() }));
    friends.push(new Friend({id:160,account:"chenhu", name:"陈虎", face: getFace() }));
    friends.push(new Friend({account:"shandongdong", name:"单东东", face: getFace() }));

    for(var i = 0; i<friends.length;i++) {
        friends.face=getFace();
        friends[i].save();
    }
    console.log('Add '+ friends.length +' friends data.');

    // init messages
    Message.remove({}, function(err) {
        console.log('collection message removed.');
    });

    for (var i= 1; i<= 50; i++) {
        if(i%2==0) {
            var msg = new Message({content: "Test Message " + i, from: "rolyer", to: "xuefei"});
            msg.save();
        } else {
            var msg = new Message({content: "Test Message " + i, from: "xuefei", to: "rolyer"});
            msg.save();
        }
    }

    res.send("成功初始化");
}

function getFace() {
    var faces = ["/images/face.png",
        "http://tp3.sinaimg.cn/1639517374/180/40044416392/1",
        //"http://tp4.sinaimg.cn/1313697151/180/5696672610/1",
        //"http://tp4.sinaimg.cn/2795763811/180/5717720417/1",
        //"http://tp2.sinaimg.cn/1215087445/180/5607048547/1",
        //"http://tp2.sinaimg.cn/1286891293/180/5723021678/1",
        "http://tp4.sinaimg.cn/2041668063/180/40065575317/1",
        "http://tp3.sinaimg.cn/3024769222/180/40068864078/0",
        "http://tp4.sinaimg.cn/2278809187/180/40039834982/0",
        "http://tp3.sinaimg.cn/2681033134/180/5720029301/0",
        "http://tp1.sinaimg.cn/1777738580/180/5722697882/0",
        "http://tp2.sinaimg.cn/3099016097/180/5720080631/0",
        "http://tp2.sinaimg.cn/1764222885/180/5714301852/1",
        "http://tp3.sinaimg.cn/1781561810/180/40055888856/1",
        "http://tp4.sinaimg.cn/1268257027/180/5718221543/1",
        "http://tp3.sinaimg.cn/1854227070/180/5720592523/0",
        "http://tp2.sinaimg.cn/1695958733/180/5720733776/0",
        "http://tp4.sinaimg.cn/2839943455/180/5720957797/1",
        "http://tp3.sinaimg.cn/1634139750/180/5723003222/0",
        "http://tp3.sinaimg.cn/3267487694/180/5705079363/0",
        "http://tp4.sinaimg.cn/1765672843/180/5709380716/0",
        "http://tp2.sinaimg.cn/1286891293/180/5723021678/1"];
    var rand = Math.floor(Math.random()*faces.length);

    return faces[rand];
}


/**
 * chat index page request
 * @param req
 *  required param: from
 * @param res
 * e.g. http://localhost:8000/chat?from=username
 */
exports.chat = function(req, res){
    var from = req.query.from;

    console.log("Let's Welcome " + from + "join iTalk." );

    // fetch data from database.
    Friend.findOne({account : from}, function (err, re) {
        if (err) {
            console.error(err);
            res.send(500);
        } else {
            if(re!=null) {
                console.log("Fecth user info: " + re );

                res.render('index', {title:"iTalk - A Web IM", sub: from, name: re.name, face:re.face});
            } else {
                res.render('error', {title:"iTalk - A Web IM", message: "User can not found."});
            }
        }
    });
};

/**
 * fetch friends from database
 * @param req
 *  required param: account
 * @param res
 */
exports.friends = function(req, res){
    var account = req.query.account
    console.log('Fetch data for the  use "' + account+'" now.' );
    // fetch data from database.
    Friend.find({account : { $ne : account }}, null, {sort: {id: -1}}, function (err, items) {
        if (err) {
            console.error(err);
            res.send(500);
        } else {
            console.log("Total " + items.length + " friend(s)!" );

            var friends = {};
            friends.status = 1,
                friends.msg = "ok",
                friends.data = items;

            res.json(friends);
        }
    });
};

/**
 * send message
 * @param req
 * @param res
 */
exports.message = function(req, res){
    // save message into database.
    var msg = new Message(req.body);
    msg.save(function(err) {
        if (err) {
            console.error(err);
            res.send(500);
        } else {
            req.body.id = msg._id;
            // push message to the user
            var publication = exports.bayeux.getClient().publish('/channel/'+req.body.to,
                req.body);

            publication.then(function() {
                console.log("push: " + JSON.stringify(req.body));
            }, function(error) {
                console.log('There was a problem: ' + error.message);
            });

            res.send(200);
        }
    });
};

/**
 * send message
 * @param req
 *  required param: from, to
 * @param res
 */
exports.history = function(req, res){
    var from = req.body.from,
        to = req.body.to;

    console.log('Fetch the history data [from ' + from+' to ' + to );
    // fetch data from database.
    Message.find({from:from, to:to}, null, {sort: {sendAt: 1}}, function (err, items) {
        if (err) {
            console.error(err);
            res.send(500);
        } else {
            console.log("Total " + items.length + " friend(s)!" );

            for (var i in items) {
                console.log("push: " + JSON.stringify(items[i]));
                exports.bayeux.getClient().publish('/channel/'+items[i].to, {from:items[i].from,
                    to:items[i].to, content:items[i].content, sendAt:items[i].sendAt.getTime(), sendBy:"server"});
            }

            res.send(200);
        }
    });
};

exports.update = function(req, res){
    var id = req.body.id;
    console.log("reading message id: " + id);

    Message.findByIdAndUpdate(ObjectID(id),{hasRead: true}, null,function (err, items) {
        if (err) {
            console.error(err);
            res.send(500);
        } else {
            console.log('The status has updated. ' + id +'. ');

            res.send(200);
        }
    });
};

exports.offline = function(req, res){
    var to = req.body.to;
    console.log('Fetching offline messages for ' + to);

    Message.find({to : to, hasRead : false},  null, {sort: {sendAt: -1}}, function (err, items) {
        if (err) {
            console.error(err);
            res.send(500);
        } else {
            console.log("Total " + items.length + " offline message(s)!" );
            for(i in items) {

                exports.bayeux.getClient().publish('/channel/'+items[i].to, {id:items[i]._id, from:items[i].from,
                    to:items[i].to, content:items[i].content, sendAt:items[i].sendAt.getTime()});

                console.log("offline push: " + JSON.stringify(items[i]));
            }

            res.json("OK");
        }
    });
};

function getFileSuffix(filepath) {
    if (filepath != "") {
        var pos = "." + filepath.replace(/.+\./, "");
        return pos;
    }
}

exports.uploader = function(req, res){
    //get filename
    var filename = req.files.files.originalFilename || path.basename(req.files.files.ws.path);
    var suffix = getFileSuffix(filename).toLowerCase();

    var allowImgExt=".jpg|.jpeg|.gif|.bmp|.png|";
    if(allowImgExt.indexOf(suffix+"|")!=-1) {
        var newname = uuid.v1() + suffix;
        //copy file to a public directory
        var targetPath = 'public/upload/' + newname;
        //copy file
        fs.createReadStream(req.files.files.ws.path).pipe(fs.createWriteStream(targetPath));
        //return file url
        //res.json({code: 200, msg: {url: 'http://' + req.headers.host + '/upload/' + newname}});
        res.json({code: 200, msg: {filename:newname}});
    } else {
        res.json({code: 500, msg: {message:allowImgExt}});
    }
};
