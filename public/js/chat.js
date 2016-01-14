$(function () {
    /*获取设备高度*/
    initHeight();

    var sub = $('#sub').val();
    $.getJSON("friends?account="+sub,function(d){
        if(d.data.length > 0){
            var i = 0, el = "";
            for(i = d.data.length; i > 0; i--){
                el+='<li style="position:relative;list-style:none;width:80px;"><a class="getSend" style="" rev="'+ d.data[i-1].name+'" rel="'+ d.data[i-1].account+'"><img title="'+ d.data[i-1].name+'" src="'+ d.data[i-1].face+'" width="48" height="48" /><span class="nm">'+ d.data[i-1].name+'</span></a></li>';
            }
            $("#fd").html(el);
        }
    });

    $("#fd").on("click",".getSend",function(){

        var u = $(this).attr("rel"),nm = $(this).attr("rev"), sub = $('#sub').val(), uid = $('#uid').val(u);

        var v = $('#chat_window-'+u)[0];
        $(".chat-window").css("z-index","");
        $(".chat-window").draggable({handle: ".top-bar" ,scroll: false });
        $('a[rel="'+u+'"]').closest("li").find(".infonum").remove();
        $('#chat_window-'+u).attr("status","1");

        if(v){
            $('#chat_window-'+u).css("z-index","1");
            $('#chat_window-'+u).show();
            var scrollbar = $("#chat_window-"+u).find('.msg_container_base');
            scrollbar.scrollTop(scrollbar.prop("scrollHeight"));
            $("#chat_window-"+u).find(".chat_input").focus();
            return;

        }else{
            var clone = $("#chat_window_1").clone().appendTo(".container");
            clone.attr("id",'chat_window-'+u);
            clone.attr("data",u);
            clone.find("h3").children(".send-name").html(nm);
            clone.find("input[type='text']").attr("id","assign_"+u);
            clone.find("form").attr("id","frmUploadFile_"+u);
            clone.find("input[type='file']").attr("data-user",u);
            clone.find(".emotion").attr("id","em_"+u);
            clone.css("margin-left", "10px");
        }

        //init face box panel
        initQqFace(u);

        var el = $("#getwindow").next(".chat-window");
        $('#chat_window-'+u).css("z-index","1");
        $("#chat_window-"+u).find(".chat_input").focus();

        if(el){

            if(screen.width<=768){
                $('#chat_window-'+u).find(".panel-body").css("height",(winHeight-45-85)+"px");
            }
            var offset = $('#chat_window-'+u).prev(".chat-window").offset();
            if(offset == undefined){ return;}
            if(screen.width>768){
                $('#chat_window-'+u).offset({left:offset.left-15, top:offset.top-5});
            }

        }
        $(".chat-window").draggable({handle: ".top-bar" ,scroll: false });
    })

    var client = new Faye.Client('/faye', {timeout: 120});

    client.subscribe('/channel/' + sub, function (message) {
        /*xf *S***/

        if($('#chat_window-'+message.from).length <=0 ){
            var clone = $("#chat_window_1").clone().appendTo(".container");
            clone.attr("id",'chat_window-'+message.from);
            clone.attr("data",message.from);
            clone.find("h3").children(".send-name").html(message.from);
            clone.find("input[type='text']").attr("id","assign_"+message.from);
            clone.find("form").attr("id","frmUploadFile_"+message.from);
            clone.find("input[type='file']").attr("data-user",message.from);
            clone.find(".emotion").attr("id","em_"+message.from);
            clone.css("margin-left", "10px");
            var $el = $("#getwindow").next(".chat-window");
            $('#chat_window-'+message.from).hide();
        }
        var $status = $('#chat_window-'+message.from).attr("status");

        if(!$status && message.sendBy!="server"){

            var $setInfoNum = $('a[rel="'+message.from+'"]');
            var v = $setInfoNum.next(".infonum").html();
            v= (v==0||v==undefined) ? 0 : v;
            $setInfoNum.closest("li").find(".infonum").remove();
            $setInfoNum.after('<span class="infonum">'+ (parseInt(v)+1) +'</span>');
        }

        /*xf *E***/
        var mydate = new Date();
        var msg = '<div class="row msg_container base_receive"><div class="col-md-2 col-xs-2 avatar"><img src="/images/avatar.jpg" class=" img-responsive "></div><div class="col-xs-10 col-md-10"><div class="messages msg_receive"><p>' + message.content + '</p><time datetime="2009-11-13T20:00">' + message.from + ' • ' + unix_to_datetime(message.sendAt) + '</time></div></div></div>';
        //var id = '#chat_window-'+message.from;
        $('#chat_window-'+message.from).find(".panel-body").append("<p>" + msg + "</p>");

        var scrollbar = $("#chat_window-"+message.from).find('.msg_container_base');
        scrollbar.scrollTop(scrollbar.prop("scrollHeight"));

        initQqFace(message.from);

        // Show desktop notifications
        if($('#chat_window-'+message.from).is(":hidden")) {
            notification(message);
        }

        update(message.id);
    });
    /**xf --E**/

    $(document).on("keypress","#btn-input",function (e) {
        var code = e.keyCode || e.which;
        if(code == 13) { //Enter keycode
            $(".send-info").click();

        }
    })

    $(document).on("click",".chat-window",function () {
        $(".chat-window").css("z-index","");
        $(this).css("z-index","1");
        $(".chat-window").draggable({handle: ".top-bar" ,scroll: false });
    });

    /*获取历史聊天记录*/
    $(document).on("click",".history",function () {
        var uid = $(this).closest(".chat-window").attr("data");
        $(this).closest(".chat-window").find(".panel-body").empty();
        $.post("/history?t="+getTimestamp(),
            { from: uid, to: sub },
            function (data, status) {

            });

    })

    /*获取历史聊天记录*/
    $(document).on("click",".sendfile",function () {
        var uid = $(this).closest(".chat-window").attr("data");

        $("#frmUploadFile_"+uid+" input").click();
    })

    $(document).on("click",".send-info",function () {
        var uid = $(this).closest(".chat-window").attr("data");
        send(sub, uid);
    })

    $(document).on('click', '.panel-heading span.icon_minim', function (e) {
        var $this = $(this);
        if (!$this.hasClass('panel-collapsed')) {
            $this.parents('.panel').find('.panel-body').slideUp("fast");
            $this.addClass('panel-collapsed');
            $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
            $this.parents('.panel').find('.panel-footer').slideUp();
        } else {
            $this.parents('.panel').find('.panel-body').slideDown("fast");
            $this.removeClass('panel-collapsed');
            $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
            $this.parents('.panel').find('.panel-footer').slideDown();
        }
    });

    $(document).on('focus', '.panel-footer input.chat_input', function (e) {
        var $this = $(this);
        if ($('#minim_chat_window').hasClass('panel-collapsed')) {
            $this.parents('.panel').find('.panel-body').slideDown();
            $('#minim_chat_window').removeClass('panel-collapsed');
            $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
        }
    });
    //重新创建聊天窗口
    $(document).on('click', '#new_chat', function (e) {
//        var size = $(".chat-window:last-child").css("margin-left");
//        size_total = parseInt(size) + 400;
        var clone = $("#chat_window_1").clone().appendTo(".container");
        clone.css("margin-left", "10px");
    });

    //删除聊天窗口
    $(document).on('click', '.icon_close', function (e) {
        $(this).closest(".chat-window").remove();
    });

    offline(sub);
});

function send(from, to) {

    var text = replace_em($("#chat_window-"+to).find(".chat_input").val());
    var name = $("#u_name").val();
    var face = $("#u_face").val();

    if(isEmpty(text)) {
        return false;
    }

    $.post("message?t="+getTimestamp(), {
            name: name,
            face: face,
            content: text,
            from: from,
            to: to,
            sendAt: getTimestamp
        },
        function (data, status) {
            var mydate = new Date();
            var msg = '<div class="row msg_container base_sent"><div class="col-md-10 col-xs-10"><div class="messages msg_sent"><p> ' + text + '</p><time datetime="2009-11-13T20:00">Me • ' + unix_to_datetime(getTimestamp()) + '</time></div></div><div class="col-md-2 col-xs-2 avatar"><img src="/images/avatar.jpg" class=" img-responsive "></div></div>';
            $("#chat_window-"+to).find(".panel-body").append("<p>" + msg + "</p>");

            var scrollbar = $("#chat_window-"+to).find('.msg_container_base');
            scrollbar.scrollTop(scrollbar.prop("scrollHeight"));
            $(".chat_input").val("");
            $("#chat_window-"+to).find(".chat_input").focus();
        });
}

function offline(to) {
    $.post("offline?t="+getTimestamp(), {
            to: to
        },
        function (data, status) {
        });
}

function update(id) {
    $.post("update?t="+getTimestamp(), {
        id: id
    },
    function (data, status) {
    });
}

function isEmpty(mixedVariable) {
    if(mixedVariable === ""
        || mixedVariable === 0
        || mixedVariable === "0"
        || mixedVariable === null
        || mixedVariable === false
        || mixedVariable === undefined
    ) {
        return true;
    }
    if(typeof mixedVariable == 'object') {
        var key = null;
        for(key in mixedVariable) {
            if(typeof mixedVariable[key] !== 'function') {
                return false;
            }
        }
        return true;
    }
    return false;
}

function getTimestamp() {
    // var timestamp = Date.parse(new Date());
    return new Date().getTime();
}

function unix_to_datetime(unix) {
    var now = new Date(parseInt(unix));
    return now.toLocaleDateString() + " " + now.toLocaleTimeString();
}

function initHeight(){
    /* 获取窗口高度*/
    var winHeight = 0;
    if (window.innerHeight){
        winHeight = window.innerHeight;
    }else if (document.body && document.body.clientHeight){
        winHeight = document.body.clientHeight;
    }
    /* 通过深入 Document 内部对 body 进行检测，获取窗口大小*/
    if (document.documentElement && document.documentElement.clientHeight){
        winHeight = document.documentElement.clientHeight;
    }
    $(".friendBar").css("height",winHeight+"px");
}

function replace_em(str){
    str = str.replace(/\</g,'&lt;');
    str = str.replace(/\>/g,'&gt;');
    str = str.replace(/\n/g,'<br/>');
    str = str.replace(/\[em_([0-9]*)\]/g,'<img src="face/$1.gif" border="0" style="width:20px; height:20px;" />');

    str = str.replace(/\[img_([\d\D]*)\]/g,'<img src="upload/$1" border="0" style="width:20px; height:20px;" /><a href="upload/$1" target="_blank">看大图</a>');

    return str;
}

function initQqFace(u){
    $('#em_'+u).qqFace({
        id : 'facebox_'+u,            //表情盒子的ID
        assign: 'assign_'+u,     //给那个控件赋值
        path: 'face/'	          //表情存放的路径
    });
}

function notification(message) {
//    if(Notify.check() == 1){
//        $('#enable').show();
//    }
//
//    //Notify.icon = "/images/favicon.ico";
//    $('#enable').click(function(){
//        Notify.request();
//    });

    // replace img
    var text = replace_img(message.content);
    if(Notify.check()==0) {
        Notify.show({
            icon:message.face, //'/images/favicon.ico',
            title: message.name+': ',
            message:text,
            autoclose:5
        });
    }
}

/**
 *replace html tag to word
 */
function replace_img(str){
    str = str.replace(/<img.*?(?:>|\/>)/g,'[图片]');
    str = str.replace(/<a.*?a>/g,'[超链接]');
    return str;
}

function uploadFile(e){
    var id = $(e).attr("data-user");
    var formData = new FormData($("#frmUploadFile_"+id)[0]);
    var v = $('input[data-user="'+id+'"]').val();
    if(isEmpty(v)) {
        return false;
    }

    $.ajax({
        url: '/uploader?t='+getTimestamp(),
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data){
            if(200 === data.code) {
                $("#assign_"+id).val("[img_"+data.msg.filename+"]")
                $(e).val('');
            } else if ( 500 === data.code) {
                alert("只允许上传‘"+data.msg.message+"’图片文件")
            }
            console.log('file upload success, data:', data);
        },
        error: function(){
        }
    });
}
