
// 获取token
window.jsel = JSONSelect;
var tokenMark = localStorage.getItem('token');//拿到传过来的token
var page;
var urlStatus;
page = 1;
//任务栏
var id='';

 //获取当前时间
 var currentDates = new Date();
 currentDate = currentDates.getTime();
 currentDates.getYear(); //获取当前年份(2位)
 currentDates.getMonth(); //获取当前月份(0-11,0代表1月)
 currentDates.getDate(); //获取当前日(1-31)
 currentDates.getHours(); //获取当前小时数(0-23)
 currentDates.getMinutes(); //获取当前分钟数(0-59)
 currentDates.getSeconds(); //获取当前秒数(0-59)
 var Month = currentDates.getMonth()+1;
 var date = currentDates.getDate();
 var miao =currentDates.getHours()*3600 + currentDates.getMinutes()*60 + currentDates.getSeconds();

$(function(){
    ask();
    placard();
	$(".bot_ul li").click(function() {
		$(this).children("a").addClass("tabhover").parent().siblings().find("a").removeClass("tabhover");
	})
	$('#whole').click(function(){
        $('#orderContent ul').html('');
		placard();
	})
    
})

// 头部的内容 ask(page,urlStatus)
function ask(){
    $.ajax({
        url: domain_name_url + "/hUser",
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        data: {
            method: 'getReleaseManagement',
            token: tokenMark,
            status:1,
            url_type:"hUser"
        },
        success: function(data) {
            // console.log(data,'头部')
            var headRst = data.result.rs[1].num.result.rs[0] ;
             // 添加tab里的内容
             $('#whole em').html(headRst.number1);//全部
             $('#conduct em').html(headRst.number2);//进行中
             $('#toAudit em').html(headRst.number3);//待审核
             $('#completed em').html(headRst.number4);//已结束

        }
    })
}

// tab切换---刚进到页面获取的全部数据，status=1是全部    
function placard(){
    $.ajax({
        url: domain_name_url + "/hUser",
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        data: {
            method: 'getReleaseManagement',
            token: tokenMark,
            status:1,
            url_type:"hUser"
        },
        success: function(data) {
        // console.log(data,'quanbu')
         if(data.success==1){
            var cutRst = data.result.rs[0].result.result.rs;
            var runId = jsel.match('.id', cutRst);//获得id
            var phaseState = jsel.match('.status', cutRst);//获得状态
            var walletBonus = jsel.match('.bonus', cutRst);//获得钱bonus
            var captionName = jsel.match('.category_name', cutRst);//获得标题category_name
            var stopTime = jsel.match('.task_end_time', cutRst);//结束时间
            var goodListHtml = '';
            // console.log(cutRst,'liebiao')
            for(var i =0;i<cutRst.length;i++){
                // 列表内容
               if(cutRst[i].status == 0){//发布中，进行中
                  var warnsTime = cutRst[i].task_end_time;
                  var richTime = "20"+warnsTime.substring(0, 2) + "-" + warnsTime.substring(2, 4) + "-" + warnsTime.substring(4, 6) ;
                    goodListHtml += '<li class="main_content_li mtw_k" data-id='+runId[i]+'  data-state='+phaseState[i]+'  data-bonus='+walletBonus[i]+'  data-category_name='+captionName[i]+' data-create_end_time='+stopTime[i]+'>';
                    goodListHtml += '<span class="v_venn">';
                    goodListHtml += '<span class="main_content_a_left">';
                    goodListHtml += '<img class="main_img" src="../../image/mine/money.png">';
                    goodListHtml += '</span>';
                    goodListHtml += '<span class="p_purse">'+(cutRst[i].bonus/100).toFixed(2)+'</span>';
                    goodListHtml += '<span class="main_content_a_right">';
                    goodListHtml += '<span class="m_c_a_r_top">'+cutRst[i].category_name+'</span>';
                    goodListHtml += '</span>';
                    goodListHtml += '</span>';
                    goodListHtml += ' <span class="v_amount">';
                    goodListHtml += ' <span class="s_scale"><i class="magnitude">数量</i>：<i class="just_now">￥'+(cutRst[i].bonus/100).toFixed(2)+'</i>/'+cutRst[i].task_number+'</span>';
                    goodListHtml += '<span class="s_time">结束时间：'+richTime+'</span>';
                    goodListHtml += ' <a href="#" class="main_content_a">';
                    goodListHtml += ' <div class="particulars">进行中</div>';
                    goodListHtml += ' </a>';
                    goodListHtml += ' </span> ';
                    goodListHtml += '</li>'; 
               }else if(cutRst[i].status == 1){//审核中
                    goodListHtml += '<li class="main_content_li mtw_k" data-id='+runId[i]+'  data-state='+phaseState[i]+'  data-bonus='+walletBonus[i]+'  data-category_name='+captionName[i]+' data-create_end_time='+stopTime[i]+'>';
                    goodListHtml += '<span class="v_venn">';
                    goodListHtml += '<span class="main_content_a_left">';
                    goodListHtml += '<img class="main_img" src="../../image/mine/money.png">';
                    goodListHtml += '</span>';
                    goodListHtml += '<span class="p_purse">'+(cutRst[i].bonus/100).toFixed(2)+'</span>';
                    goodListHtml += '<span class="main_content_a_right">';
                    goodListHtml += '<span class="m_c_a_r_top">'+cutRst[i].category_name+'</span>';
                    goodListHtml += '</span>';
                    goodListHtml += '</span>';
                    goodListHtml += '<span class="v_amount">';
                    goodListHtml += '<span class="s_scale"><i class="magnitude">数量</i>：<i class="just_now">￥'+(cutRst[i].bonus/100).toFixed(2)+'</i>/'+cutRst[i].task_number+'</span>';
                    goodListHtml += ' <span class="s_time">数量满后自动结束</span>';
                    goodListHtml += ' <a href="#" class="main_content_a">';  
                    goodListHtml += ' <div class="aerea">审核中</div>';
                    goodListHtml += ' </a>';
                    goodListHtml += '</span>';
                    goodListHtml += '</li>'; 
               }else if(cutRst[i].status == 2){//审核失败
                   goodListHtml += '<li class="main_content_li mtw_k"  data-id='+runId[i]+'  data-state='+phaseState[i]+'  data-bonus='+walletBonus[i]+'  data-category_name='+captionName[i]+' data-create_end_time='+stopTime[i]+'>';
                   goodListHtml += '<span class="v_venn">';
                   goodListHtml += '<span class="main_content_a_left">';
                   goodListHtml += '<img class="main_img" src="../../image/mine/money.png">';
                   goodListHtml += '</span>';
                   goodListHtml += '<span class="p_purse">'+(cutRst[i].bonus/100).toFixed(2)+'</span>';
                   goodListHtml += '<span class="main_content_a_right">';
                   goodListHtml += '<span class="m_c_a_r_top">'+cutRst[i].category_name+'</span>';
                   goodListHtml += '</span>';
                   goodListHtml += '</span>';
                   goodListHtml += '<span class="v_amount">';
                   goodListHtml += '<span class="s_scale"><i class="magnitude">数量</i>：<i class="just_now">￥'+(cutRst[i].bonus/100).toFixed(2)+'</i>/'+cutRst[i].task_number+'</span>';
                   goodListHtml += '<span class="s_time">数量满后自动结束</span>';
                   goodListHtml += '<a href="#" class="main_content_a">';
                   goodListHtml += '<div class="failure">审核失败</div>';
                   goodListHtml += '</a>';
                   goodListHtml += '</span>';
                   goodListHtml += '</li>'; 
           }else if(cutRst[i].status == 3){//已结束
                    goodListHtml += '<li class="main_content_li mtw_k"  data-id='+runId[i]+'  data-state='+phaseState[i]+'  data-bonus='+walletBonus[i]+'  data-category_name='+captionName[i]+' data-create_end_time='+stopTime[i]+'>';
                    goodListHtml += '<span class="v_venn">';
                    goodListHtml += '<span class="main_content_a_left">';
                    goodListHtml += '<img class="main_img" src="../../image/mine/money.png">';
                    goodListHtml += '</span>';
                    goodListHtml += '<span class="p_purse">'+(cutRst[i].bonus/100).toFixed(2)+'</span>';
                    goodListHtml += '<span class="main_content_a_right">';
                    goodListHtml += '<span class="m_c_a_r_top">'+cutRst[i].category_name+'</span>';
                    goodListHtml += '</span>';
                    goodListHtml += '</span>';
                    goodListHtml += '<span class="v_amount">';
                    goodListHtml += '<span class="s_scale"><i class="magnitude">数量</i>：<i class="just_now">￥￥'+(cutRst[i].bonus/100).toFixed(2)+'</i>/'+cutRst[i].task_number+'</span>';
                    goodListHtml += '<span class="s_time">数量满后自动结束</span>';
                    goodListHtml += '<a href="#" class="main_content_a">';
                    goodListHtml += '<div class="creoline">已结束</div>';
                    goodListHtml += '</a>';
                    goodListHtml += '</span>';
                    goodListHtml += '</li>';
               }
            }
             
            $('#orderContent ul').html(goodListHtml);
            $('#orderContent').show();
            $('#w_without').hide();
            //点击列表跳转到任务详情页
            $('.mtw_k').click(function(Countdown){
                var pastMoney = $(this).data('bonus');//奖励钱
                var pastTitle = $(this).data('category_name');//标题
                var uri = $(this).data('id');//id
                var pastState= $(this).data('status');//获得状态
                var board = $(this).data('task_end_time');//结束时间
                sStorage = window.localStorage; //本地存题目
                
                sStorage.uri_goods = uri;//id
                sStorage.equation= pastState;//获得状态state
                sStorage.cash= (pastMoney/100).toFixed(2);//奖励钱
                sStorage.slogan= pastTitle;//标题
                sStorage.endingTime = board;//结束时间
                var gurl = window.location.href;

                localStorage.setItem('gurl', window.location.href);
                location.href = 'taskdetail.html';
            })
         }else if(data.success ==2){
            var lurl = window.location.href;
            var url = localStorage.getItem('url');
            window.location.href='../member/login.html';
        }else if(data.success ==3){
            $('#orderContent').hide();
            $('#w_without').show();
         }
            $.fn.navbarscroll = function (options) {
                //各种属性、参数
                var _defaults = {
                    className:'cur', //当前选中点击元素的class类名
                    clickScrollTime:300, //点击后滑动时间
                    duibiScreenWidth:0.4, //单位以rem为准，默认为0.4rem
                    scrollerWidth:3, //单位以px为准，默认为3,[仅用于特殊情况：外层宽度因为小数点造成的不精准情况]
                    defaultSelect:0, //初始选中第n个，默认第0个
                    fingerClick:0, //目标第0或1个选项触发,必须每一项长度一致，方可用此项
                    endClickScroll:function(thisObj){}//回调函数
                }
                var _opt = $.extend(_defaults, options);
                this.each(function () {
                    //插件实现代码
                    var _wrapper = $(this);
                    var _win = $(window);
                    var _win_width = _win.width(),_wrapper_width = _wrapper.width(),_wrapper_off_left = _wrapper.offset().left;
                    var _wrapper_off_right=_win_width-_wrapper_off_left-_wrapper_width;
                    var _obj_scroller = _wrapper.children('.team_tile');
                    var _obj_ul = _obj_scroller.children('ul');
                    var _obj_li = _obj_ul.children('li');
                    var _scroller_w = 0;
                    for (var i = 0; i < _obj_li.length; i++) {
                        _scroller_w += _obj_li[i].offsetWidth;
                    }
                    _obj_scroller.width(_scroller_w+_opt.scrollerWidth);
                    var myScroll = new IScroll('#'+_wrapper.attr('id'), {
                        eventPassthrough: true,
                        scrollX: true,
                        scrollY: false,
                        preventDefault: false
                    });
                    _init(_obj_li.eq(_opt.defaultSelect));
                  
                    
                    //解决PC端谷歌浏览器模拟的手机屏幕出现莫名的卡顿现象，滑动时禁止默认事件（2017-01-11）
                    _wrapper[0].addEventListener('touchmove',function (e){e.preventDefault();},false);
                    function _init(thiObj){
                        var $this_obj=thiObj;
                        if(_scroller_w+2>_wrapper_width){
                            if(_opt.fingerClick==1){
                                if(this_index==1){
                                    myScroll.scrollTo(-this_pos_left+this_prev_width,0, _opt.clickScrollTime);
                                }else if(this_index==0){
                                    myScroll.scrollTo(-this_pos_left,0, _opt.clickScrollTime);
                                }else if(this_index==_obj_li.length-2){
                                    myScroll.scrollBy(this_off_right-_wrapper_off_right-this_width,0, _opt.clickScrollTime);
                                }else if(this_index==_obj_li.length-1){
                                    myScroll.scrollBy(this_off_right-_wrapper_off_right,0, _opt.clickScrollTime);
                                }else{
                                    if(this_off_left-_wrapper_off_left-(this_width*_opt.fingerClick)<duibi){
                                        myScroll.scrollTo(-this_pos_left+this_prev_width+(this_width*_opt.fingerClick),0, _opt.clickScrollTime);
                                    }else if(this_off_right-_wrapper_off_right-(this_width*_opt.fingerClick)<duibi){
                                        myScroll.scrollBy(this_off_right-this_next_width-_wrapper_off_right-(this_width*_opt.fingerClick),0, _opt.clickScrollTime);
                                    }
                                }
                            }else{
                                if(this_index==1){
                                    myScroll.scrollTo(-this_pos_left+this_prev_width,0, _opt.clickScrollTime);
                                }else if(this_index==_obj_li.length-1){
                                    if(this_off_right-_wrapper_off_right>1||this_off_right-_wrapper_off_right<-1){
                                        myScroll.scrollBy(this_off_right-_wrapper_off_right,0, _opt.clickScrollTime);
                                    }
                                }else{
                                    if(this_off_left-_wrapper_off_left<duibi){
                                        myScroll.scrollTo(-this_pos_left+this_prev_width,0, _opt.clickScrollTime);
                                    }else if(this_off_right-_wrapper_off_right<duibi){
                                        myScroll.scrollBy(this_off_right-this_next_width-_wrapper_off_right,0, _opt.clickScrollTime);
                                    }
                                }
                            }
                        }
                        $this_obj.addClass(_opt.className).siblings('li').removeClass(_opt.className);
                        _opt.endClickScroll.call(this,$this_obj);
                    }
                });
            };
            $('.wrapper').navbarscroll();
      }
    })

   
    
    
}
 //点击进行中
 $('#conduct').click(function(){
    $('#orderContent ul').html('');
     $.ajax({
        url: domain_name_url + "/hUser",
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        data: {
            method: 'getReleaseManagement',
            token: tokenMark,
            status:2,
            url_type:"hUser"
        },
        success: function(data) {
            console.log(data,'点击进行')
            if(data.success==1){
                var cutRst = data.result.rs[0].result.result.rs;
                var runId = jsel.match('.id', cutRst);//获得id
                var phaseState = jsel.match('.status', cutRst);//获得状态
                var walletBonus = jsel.match('.bonus', cutRst);//获得钱bonus
                var captionName = jsel.match('.category_name', cutRst);//获得标题category_name
                var stopTime = jsel.match('.task_end_time', cutRst);//结束时间
                var goodListHtml = '';
                for(var i =0;i<cutRst.length;i++){
                    // 列表内容
                   if(cutRst[i].status == 0){//发布中，进行中
                      var warnsTime = cutRst[i].task_end_time;
                      var richTime = "20"+warnsTime.substring(0, 2) + "-" + warnsTime.substring(2, 4) + "-" + warnsTime.substring(4, 6) ;
                        goodListHtml += '<li class="main_content_li mtw_k" data-id='+runId[i]+'  data-state='+phaseState[i]+'  data-bonus='+walletBonus[i]+'  data-category_name='+captionName[i]+' data-create_end_time='+stopTime[i]+'>';
                        goodListHtml += '<span class="v_venn">';
                        goodListHtml += '<span class="main_content_a_left">';
                        goodListHtml += '<img class="main_img" src="../../image/mine/money.png">';
                        goodListHtml += '</span>';
                        goodListHtml += '<span class="p_purse">'+(cutRst[i].bonus/100).toFixed(2)+'</span>';
                        goodListHtml += '<span class="main_content_a_right">';
                        goodListHtml += '<span class="m_c_a_r_top">'+cutRst[i].category_name+'</span>';
                        goodListHtml += '</span>';
                        goodListHtml += '</span>';
                        goodListHtml += ' <span class="v_amount">';
                        goodListHtml += ' <span class="s_scale"><i class="magnitude">数量</i>：<i class="just_now">￥'+(cutRst[i].bonus/100).toFixed(2)+'</i>/'+cutRst[i].task_number+'</span>';
                        goodListHtml += '<span class="s_time">结束时间：'+richTime+'</span>';
                        goodListHtml += ' <a href="#" class="main_content_a">';
                        goodListHtml += ' <div class="particulars">进行中</div>';
                        goodListHtml += ' </a>';
                        goodListHtml += ' </span> ';
                        goodListHtml += '</li>'; 
                   }
                }
                 
                $('#orderContent ul').html(goodListHtml);
                $('#orderContent').show();
                $('#w_without').hide();
                //点击列表跳转到任务详情页
                $('.mtw_k').click(function(Countdown){
                    var pastMoney = $(this).data('bonus');//奖励钱
                    var pastTitle = $(this).data('category_name');//标题
                    var uri = $(this).data('id');//id
                    var pastState= $(this).data('status');//获得状态
                    var board = $(this).data('task_end_time');//结束时间
                    sStorage = window.localStorage; //本地存题目
    
                    sStorage.uri_goods = uri;//id
                    sStorage.equation= pastState;//获得状态state
                    sStorage.cash= (pastMoney/100).toFixed(2);//奖励钱
                    sStorage.slogan= pastTitle;//标题
                    sStorage.endingTime = board;//结束时间
                    var gurl = window.location.href;
    
                    localStorage.setItem('gurl', window.location.href);
                    location.href = 'taskdetail.html';
                })
             }else if(data.success ==2){
                var lurl = window.location.href;
                var url = localStorage.getItem('url');
                window.location.href='../member/login.html';
            } else if(data.success ==3){
                $('#orderContent').hide();
                $('#w_without').show();
             }
           $.fn.navbarscroll = function (options) {
                 //各种属性、参数
                var _defaults = {
                    className:'cur', //当前选中点击元素的class类名
                    clickScrollTime:300, //点击后滑动时间
                    duibiScreenWidth:0.4, //单位以rem为准，默认为0.4rem
                    scrollerWidth:3, //单位以px为准，默认为3,[仅用于特殊情况：外层宽度因为小数点造成的不精准情况]
                    defaultSelect:0, //初始选中第n个，默认第0个
                    fingerClick:0, //目标第0或1个选项触发,必须每一项长度一致，方可用此项
                    endClickScroll:function(thisObj){}//回调函数
                }
                    var _opt = $.extend(_defaults, options);
                    this.each(function () {
                        //插件实现代码
                        var _wrapper = $(this);
                        var _win = $(window);
                        var _win_width = _win.width(),_wrapper_width = _wrapper.width(),_wrapper_off_left = _wrapper.offset().left;
                        var _wrapper_off_right=_win_width-_wrapper_off_left-_wrapper_width;
                        var _obj_scroller = _wrapper.children('.team_tile');
                        var _obj_ul = _obj_scroller.children('ul');
                        var _obj_li = _obj_ul.children('li');
                        var _scroller_w = 0;
                        for (var i = 0; i < _obj_li.length; i++) {
                            _scroller_w += _obj_li[i].offsetWidth;
                        }
                        _obj_scroller.width(_scroller_w+_opt.scrollerWidth);
                        var myScroll = new IScroll('#'+_wrapper.attr('id'), {
                            eventPassthrough: true,
                            scrollX: true,
                            scrollY: false,
                            preventDefault: false
                        });
                        _init(_obj_li.eq(_opt.defaultSelect));
                    
                        
                        //解决PC端谷歌浏览器模拟的手机屏幕出现莫名的卡顿现象，滑动时禁止默认事件（2017-01-11）
                        _wrapper[0].addEventListener('touchmove',function (e){e.preventDefault();},false);
                        function _init(thiObj){
                            var $this_obj=thiObj;
                            if(_scroller_w+2>_wrapper_width){
                                if(_opt.fingerClick==1){
                                    if(this_index==1){
                                        myScroll.scrollTo(-this_pos_left+this_prev_width,0, _opt.clickScrollTime);
                                    }else if(this_index==0){
                                        myScroll.scrollTo(-this_pos_left,0, _opt.clickScrollTime);
                                    }else if(this_index==_obj_li.length-2){
                                        myScroll.scrollBy(this_off_right-_wrapper_off_right-this_width,0, _opt.clickScrollTime);
                                    }else if(this_index==_obj_li.length-1){
                                        myScroll.scrollBy(this_off_right-_wrapper_off_right,0, _opt.clickScrollTime);
                                    }else{
                                        if(this_off_left-_wrapper_off_left-(this_width*_opt.fingerClick)<duibi){
                                            myScroll.scrollTo(-this_pos_left+this_prev_width+(this_width*_opt.fingerClick),0, _opt.clickScrollTime);
                                        }else if(this_off_right-_wrapper_off_right-(this_width*_opt.fingerClick)<duibi){
                                            myScroll.scrollBy(this_off_right-this_next_width-_wrapper_off_right-(this_width*_opt.fingerClick),0, _opt.clickScrollTime);
                                        }
                                    }
                                }else{
                                    if(this_index==1){
                                        myScroll.scrollTo(-this_pos_left+this_prev_width,0, _opt.clickScrollTime);
                                    }else if(this_index==_obj_li.length-1){
                                        if(this_off_right-_wrapper_off_right>1||this_off_right-_wrapper_off_right<-1){
                                            myScroll.scrollBy(this_off_right-_wrapper_off_right,0, _opt.clickScrollTime);
                                        }
                                    }else{
                                        if(this_off_left-_wrapper_off_left<duibi){
                                            myScroll.scrollTo(-this_pos_left+this_prev_width,0, _opt.clickScrollTime);
                                        }else if(this_off_right-_wrapper_off_right<duibi){
                                            myScroll.scrollBy(this_off_right-this_next_width-_wrapper_off_right,0, _opt.clickScrollTime);
                                        }
                                    }
                                }
                            }
                            $this_obj.addClass(_opt.className).siblings('li').removeClass(_opt.className);
                            _opt.endClickScroll.call(this,$this_obj);
                        }
                    });
                };
                $('.wrapper').navbarscroll();
        }
   })

 })

//  //点击待审核
 $('#toAudit').click(function(){  
    $('#orderContent ul').html('');
    $.ajax({
        url: domain_name_url + "/hUser",
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        data: {
            method: 'getReleaseManagement',
            token: tokenMark,
            status:3,
            url_type:"hUser"
        },
        success: function(data) {
            if(data.success==1){
                var cutRst = data.result.rs[0].result.result.rs;
                var runId = jsel.match('.id', cutRst);//获得id
                var phaseState = jsel.match('.status', cutRst);//获得状态
                var walletBonus = jsel.match('.bonus', cutRst);//获得钱bonus
                var captionName = jsel.match('.category_name', cutRst);//获得标题category_name
                var stopTime = jsel.match('.task_end_time', cutRst);//结束时间
                var goodListHtml = '';
                // console.log(cutRst,'liebiao')
                for(var i =0;i<cutRst.length;i++){
                    // 列表内容
                   if(cutRst[i].status == 1){//待审核
                        goodListHtml += '<li class="main_content_li mtw_k" data-id='+runId[i]+'  data-state='+phaseState[i]+'  data-bonus='+walletBonus[i]+'  data-category_name='+captionName[i]+' data-create_end_time='+stopTime[i]+'>';
                        goodListHtml += '<span class="v_venn">';
                        goodListHtml += '<span class="main_content_a_left">';
                        goodListHtml += '<img class="main_img" src="../../image/mine/money.png">';
                        goodListHtml += '</span>';
                        goodListHtml += '<span class="p_purse">'+(cutRst[i].bonus/100).toFixed(2)+'</span>';
                        goodListHtml += '<span class="main_content_a_right">';
                        goodListHtml += '<span class="m_c_a_r_top">'+cutRst[i].category_name+'</span>';
                        goodListHtml += '</span>';
                        goodListHtml += '</span>';
                        goodListHtml += '<span class="v_amount">';
                        goodListHtml += '<span class="s_scale"><i class="magnitude">数量</i>：<i class="just_now">￥'+(cutRst[i].bonus/100).toFixed(2)+'</i>/'+cutRst[i].task_number+'</span>';
                        goodListHtml += ' <span class="s_time">数量满后自动结束</span>';
                        goodListHtml += ' <a href="#" class="main_content_a">';  
                        goodListHtml += ' <div class="aerea">审核中</div>';
                        goodListHtml += ' </a>';
                        goodListHtml += '</span>';
                        goodListHtml += '</li>'; 
                   }
                }
                 
                $('#orderContent ul').html(goodListHtml);
                $('#orderContent').show();
                $('#w_without').hide();
                //点击列表跳转到任务详情页
                $('.mtw_k').click(function(Countdown){
                    var pastMoney = $(this).data('bonus');//奖励钱
                    var pastTitle = $(this).data('category_name');//标题
                    var uri = $(this).data('id');//id
                    var pastState= $(this).data('status');//获得状态
                    var board = $(this).data('task_end_time');//结束时间
                    sStorage = window.localStorage; //本地存题目
    
                    sStorage.uri_goods = uri;//id
                    sStorage.equation= pastState;//获得状态state
                    sStorage.cash= (pastMoney/100).toFixed(2);//奖励钱
                    sStorage.slogan= pastTitle;//标题
                    sStorage.endingTime = board;//结束时间
                    var gurl = window.location.href;
    
                    localStorage.setItem('gurl', window.location.href);
                    location.href = 'taskdetail.html';
                })
             }else if(data.success ==2){
                var lurl = window.location.href;
                var url = localStorage.getItem('url');
                window.location.href='../member/login.html';
            } else if(data.success ==3){
                $('#orderContent').hide();
                $('#w_without').show();
             }
           
            // ask(1,urlStatus);
            $.fn.navbarscroll = function (options) {
                //各种属性、参数
                var _defaults = {
                    className:'cur', //当前选中点击元素的class类名
                    clickScrollTime:300, //点击后滑动时间
                    duibiScreenWidth:0.4, //单位以rem为准，默认为0.4rem
                    scrollerWidth:3, //单位以px为准，默认为3,[仅用于特殊情况：外层宽度因为小数点造成的不精准情况]
                    defaultSelect:0, //初始选中第n个，默认第0个
                    fingerClick:0, //目标第0或1个选项触发,必须每一项长度一致，方可用此项
                    endClickScroll:function(thisObj){}//回调函数
                }
                var _opt = $.extend(_defaults, options);
                this.each(function () {
                    //插件实现代码
                    var _wrapper = $(this);
                    var _win = $(window);
                    var _win_width = _win.width(),_wrapper_width = _wrapper.width(),_wrapper_off_left = _wrapper.offset().left;
                    var _wrapper_off_right=_win_width-_wrapper_off_left-_wrapper_width;
                    var _obj_scroller = _wrapper.children('.team_tile');
                    var _obj_ul = _obj_scroller.children('ul');
                    var _obj_li = _obj_ul.children('li');
                    var _scroller_w = 0;
                    for (var i = 0; i < _obj_li.length; i++) {
                        _scroller_w += _obj_li[i].offsetWidth;
                    }
                    _obj_scroller.width(_scroller_w+_opt.scrollerWidth);
                    var myScroll = new IScroll('#'+_wrapper.attr('id'), {
                        eventPassthrough: true,
                        scrollX: true,
                        scrollY: false,
                        preventDefault: false
                    });
                    _init(_obj_li.eq(_opt.defaultSelect));
                  
                    
                    //解决PC端谷歌浏览器模拟的手机屏幕出现莫名的卡顿现象，滑动时禁止默认事件（2017-01-11）
                    _wrapper[0].addEventListener('touchmove',function (e){e.preventDefault();},false);
                    function _init(thiObj){
                        var $this_obj=thiObj;
                        if(_scroller_w+2>_wrapper_width){
                            if(_opt.fingerClick==1){
                                if(this_index==1){
                                    myScroll.scrollTo(-this_pos_left+this_prev_width,0, _opt.clickScrollTime);
                                }else if(this_index==0){
                                    myScroll.scrollTo(-this_pos_left,0, _opt.clickScrollTime);
                                }else if(this_index==_obj_li.length-2){
                                    myScroll.scrollBy(this_off_right-_wrapper_off_right-this_width,0, _opt.clickScrollTime);
                                }else if(this_index==_obj_li.length-1){
                                    myScroll.scrollBy(this_off_right-_wrapper_off_right,0, _opt.clickScrollTime);
                                }else{
                                    if(this_off_left-_wrapper_off_left-(this_width*_opt.fingerClick)<duibi){
                                        myScroll.scrollTo(-this_pos_left+this_prev_width+(this_width*_opt.fingerClick),0, _opt.clickScrollTime);
                                    }else if(this_off_right-_wrapper_off_right-(this_width*_opt.fingerClick)<duibi){
                                        myScroll.scrollBy(this_off_right-this_next_width-_wrapper_off_right-(this_width*_opt.fingerClick),0, _opt.clickScrollTime);
                                    }
                                }
                            }else{
                                if(this_index==1){
                                    myScroll.scrollTo(-this_pos_left+this_prev_width,0, _opt.clickScrollTime);
                                }else if(this_index==_obj_li.length-1){
                                    if(this_off_right-_wrapper_off_right>1||this_off_right-_wrapper_off_right<-1){
                                        myScroll.scrollBy(this_off_right-_wrapper_off_right,0, _opt.clickScrollTime);
                                    }
                                }else{
                                    if(this_off_left-_wrapper_off_left<duibi){
                                        myScroll.scrollTo(-this_pos_left+this_prev_width,0, _opt.clickScrollTime);
                                    }else if(this_off_right-_wrapper_off_right<duibi){
                                        myScroll.scrollBy(this_off_right-this_next_width-_wrapper_off_right,0, _opt.clickScrollTime);
                                    }
                                }
                            }
                        }
                        $this_obj.addClass(_opt.className).siblings('li').removeClass(_opt.className);
                        _opt.endClickScroll.call(this,$this_obj);
                    }
                });
            };
            $('.wrapper').navbarscroll();
        }
    })

 })
// //点击已结束
$('#completed').click(function(){ 
    $('#orderContent ul').html(''); 
    $.ajax({
        url: domain_name_url + "/hUser",
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        data: {
            method: 'getReleaseManagement',
            token: tokenMark,
            status:4,
            url_type:"hUser"
        },
        success: function(data) {
        //    console.log(data,'已结束')
             if(data.success==1){
                var cutRst = data.result.rs[0].result.result.rs;
                var runId = jsel.match('.id', cutRst);//获得id
                var phaseState = jsel.match('.status', cutRst);//获得状态
                var walletBonus = jsel.match('.bonus', cutRst);//获得钱bonus
                var captionName = jsel.match('.category_name', cutRst);//获得标题category_name
                var stopTime = jsel.match('.task_end_time', cutRst);//结束时间
                var goodListHtml = '';
                // console.log(cutRst,'liebiao')
                for(var i =0;i<cutRst.length;i++){
                    // 列表内容
                    if(cutRst[i].status == 3){//已结束
                        goodListHtml += '<li class="main_content_li mtw_k" data-id='+runId[i]+'  data-state='+phaseState[i]+'  data-bonus='+walletBonus[i]+'  data-category_name='+captionName[i]+' data-create_end_time='+stopTime[i]+'>';
                        goodListHtml += '<span class="v_venn">';
                        goodListHtml += '<span class="main_content_a_left">';
                        goodListHtml += '<img class="main_img" src="../../image/mine/money.png">';
                        goodListHtml += '</span>';
                        goodListHtml += '<span class="p_purse">'+(cutRst[i].bonus/100).toFixed(2)+'</span>';
                        goodListHtml += '<span class="main_content_a_right">';
                        goodListHtml += '<span class="m_c_a_r_top">'+cutRst[i].category_name+'</span>';
                        goodListHtml += '</span>';
                        goodListHtml += '</span>';
                        goodListHtml += '<span class="v_amount">';
                        goodListHtml += '<span class="s_scale"><i class="magnitude">数量</i>：<i class="just_now">￥￥'+(cutRst[i].bonus/100).toFixed(2)+'</i>/'+cutRst[i].task_number+'</span>';
                        goodListHtml += '<span class="s_time">数量满后自动结束</span>';
                        goodListHtml += '<a href="#" class="main_content_a">';
                        goodListHtml += '<div class="creoline">已结束</div>';
                        goodListHtml += '</a>';
                        goodListHtml += '</span>';
                        goodListHtml += '</li>';
                    }
                }
                $('#orderContent ul').html(goodListHtml);
                $('#orderContent').show();
                $('#w_without').hide();
                //点击列表跳转到任务详情页
                $('.mtw_k').click(function(Countdown){
                    var pastMoney = $(this).data('bonus');//奖励钱
                    var pastTitle = $(this).data('category_name');//标题
                    var uri = $(this).data('id');//id
                    var pastState= $(this).data('status');//获得状态
                    var board = $(this).data('task_end_time');//结束时间
                    sStorage = window.localStorage; //本地存题目
    
                    sStorage.uri_goods = uri;//id
                    sStorage.equation= pastState;//获得状态state
                    sStorage.cash= (pastMoney/100).toFixed(2);//奖励钱
                    sStorage.slogan= pastTitle;//标题
                    sStorage.endingTime = board;//结束时间
                    var gurl = window.location.href;
    
                    localStorage.setItem('gurl', window.location.href);
                    location.href = 'taskdetail.html';
                })
             }else if(data.success ==2){
                var lurl = window.location.href;
                var url = localStorage.getItem('url');
                window.location.href='../member/login.html';
            } else if(data.success ==3){
                $('#orderContent').hide();
                $('#w_without').show();
             }
            // ask(1,urlStatus);
            $.fn.navbarscroll = function (options) {
                //各种属性、参数
                var _defaults = {
                    className:'cur', //当前选中点击元素的class类名
                    clickScrollTime:300, //点击后滑动时间
                    duibiScreenWidth:0.4, //单位以rem为准，默认为0.4rem
                    scrollerWidth:3, //单位以px为准，默认为3,[仅用于特殊情况：外层宽度因为小数点造成的不精准情况]
                    defaultSelect:0, //初始选中第n个，默认第0个
                    fingerClick:0, //目标第0或1个选项触发,必须每一项长度一致，方可用此项
                    endClickScroll:function(thisObj){}//回调函数
                }
                var _opt = $.extend(_defaults, options);
                this.each(function () {
                    //插件实现代码
                    var _wrapper = $(this);
                    var _win = $(window);
                    var _win_width = _win.width(),_wrapper_width = _wrapper.width(),_wrapper_off_left = _wrapper.offset().left;
                    var _wrapper_off_right=_win_width-_wrapper_off_left-_wrapper_width;
                    var _obj_scroller = _wrapper.children('.team_tile');
                    var _obj_ul = _obj_scroller.children('ul');
                    var _obj_li = _obj_ul.children('li');
                    var _scroller_w = 0;
                    for (var i = 0; i < _obj_li.length; i++) {
                        _scroller_w += _obj_li[i].offsetWidth;
                    }
                    _obj_scroller.width(_scroller_w+_opt.scrollerWidth);
                    var myScroll = new IScroll('#'+_wrapper.attr('id'), {
                        eventPassthrough: true,
                        scrollX: true,
                        scrollY: false,
                        preventDefault: false
                    });
                    _init(_obj_li.eq(_opt.defaultSelect));
                  
                    
                    //解决PC端谷歌浏览器模拟的手机屏幕出现莫名的卡顿现象，滑动时禁止默认事件（2017-01-11）
                    _wrapper[0].addEventListener('touchmove',function (e){e.preventDefault();},false);
                    function _init(thiObj){
                        var $this_obj=thiObj;
                        if(_scroller_w+2>_wrapper_width){
                            if(_opt.fingerClick==1){
                                if(this_index==1){
                                    myScroll.scrollTo(-this_pos_left+this_prev_width,0, _opt.clickScrollTime);
                                }else if(this_index==0){
                                    myScroll.scrollTo(-this_pos_left,0, _opt.clickScrollTime);
                                }else if(this_index==_obj_li.length-2){
                                    myScroll.scrollBy(this_off_right-_wrapper_off_right-this_width,0, _opt.clickScrollTime);
                                }else if(this_index==_obj_li.length-1){
                                    myScroll.scrollBy(this_off_right-_wrapper_off_right,0, _opt.clickScrollTime);
                                }else{
                                    if(this_off_left-_wrapper_off_left-(this_width*_opt.fingerClick)<duibi){
                                        myScroll.scrollTo(-this_pos_left+this_prev_width+(this_width*_opt.fingerClick),0, _opt.clickScrollTime);
                                    }else if(this_off_right-_wrapper_off_right-(this_width*_opt.fingerClick)<duibi){
                                        myScroll.scrollBy(this_off_right-this_next_width-_wrapper_off_right-(this_width*_opt.fingerClick),0, _opt.clickScrollTime);
                                    }
                                }
                            }else{
                                if(this_index==1){
                                    myScroll.scrollTo(-this_pos_left+this_prev_width,0, _opt.clickScrollTime);
                                }else if(this_index==_obj_li.length-1){
                                    if(this_off_right-_wrapper_off_right>1||this_off_right-_wrapper_off_right<-1){
                                        myScroll.scrollBy(this_off_right-_wrapper_off_right,0, _opt.clickScrollTime);
                                    }
                                }else{
                                    if(this_off_left-_wrapper_off_left<duibi){
                                        myScroll.scrollTo(-this_pos_left+this_prev_width,0, _opt.clickScrollTime);
                                    }else if(this_off_right-_wrapper_off_right<duibi){
                                        myScroll.scrollBy(this_off_right-this_next_width-_wrapper_off_right,0, _opt.clickScrollTime);
                                    }
                                }
                            }
                        }
                        $this_obj.addClass(_opt.className).siblings('li').removeClass(_opt.className);
                        _opt.endClickScroll.call(this,$this_obj);
                    }
                });
            };
            $('.wrapper').navbarscroll();
        }
    })

 })


//获取滚动条当前的位置
function getScrollTop() {
    var scrollTop = 0;
    if(document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if(document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}
// 获取当前可视范围的高度
function getClientHeight() {
    var clientHeight = 0;
    if(document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
}
// tips：Math.min是两个值取最小的值，Math.max则相反。
// 获取文档完整的高度
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}
// 实现下拉刷新
window.onscroll = function(){
	if(getScrollTop() + getClientHeight() == getScrollHeight()) {
		setTimeout(function () {
            page++;
            //  placard(12*page+1,urlStatus);//全部

		},0)
	}
	var navH = $("#list").offset().top;
	var scroH = $(this).scrollTop();
	if(scroH>=navH){
		$("#list #retr").addClass('active')
	
	}else if(scroH<navH){
		$("#list #retr").removeClass('active');
	}
}


