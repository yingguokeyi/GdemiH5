
// 获取token
window.jsel = JSONSelect;
var tokenMark = localStorage.getItem('token');//拿到传过来的token
console.log(tokenMark,'有')
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
            method: 'getUserTask',
            token: tokenMark,
            status:1,
            url_type:"hUser"
        },
        success: function(data) {
            // console.log(data,'kh')
            //头部内容
            var headNumber = data.result.rs[1].result2;
            var headHtml ='';
            headHtml += '<li>';
            headHtml += '<p>'+headNumber.num+'个</p>';
            headHtml += '<p>领取任务</p>';
            headHtml += '<div class="mid_line"></div>';
            headHtml += '</li>';
            headHtml += '<li>';
            headHtml += '<p>'+(headNumber.money/100).toFixed(2)+'元</p>';
            headHtml += '<p>预计奖励</p>';
            headHtml += '<div class="mid_line"></div>';
            headHtml += '</li>';
            headHtml += '<li>';
            headHtml += '<p>'+(headNumber.allMoney/100).toFixed(2)+'元</p>';
            headHtml += '<p>累计收入</p>';
            headHtml += '</li>';
          $('.main_middle ul').html(headHtml);
        }
        
    })
      
}

// tab切换---刚进到页面获取的全部数据    
function placard(){
    $.ajax({
        url: domain_name_url + "/hUser",
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        data: {
            method: 'getUserTask',
            token: tokenMark,
            status:1,
            url_type:"hUser"
        },
        success: function(data) {
        //   console.log(data,'quanbu')
            if(data.success==1){
                var cutRst = data.result.rs[1].result2;//tab里面的内容
                var detailsRst = data.result.rs[0].result;//获取的内容
                $('#whole em').html(cutRst.state1);
                $('#conduct em').html(cutRst.state2);
                $('#toAudit em').html(cutRst.state3);
                $('#completed em').html(cutRst.state4);
                var runId = jsel.match('.id', detailsRst);//获得id
                var phaseState = jsel.match('.state', detailsRst);//获得状态state
                var walletBonus = jsel.match('.bonus', detailsRst);//获得钱bonus
                var captionName = jsel.match('.category_name', detailsRst);//获得标题category_name
                var stopTime = jsel.match('.create_end_time', detailsRst);//结束时间
                var beginTime = jsel.match('.task_create_time', detailsRst);//开始时间
                var foundTime = jsel.match('.create_time', detailsRst);//用户创建任务开始的时间
                var goodListHtml = '';
                if(detailsRst.length!=0){
                    for(var i= 0 ; i<detailsRst.length;i++){
                       
                        if(detailsRst[i].state == 1){//进行中
                             //获取开始时间
                            var startTime = detailsRst[i].create_time;
                             // 开始时间的总秒数
                             var startTimetm = "20" + startTime.substring(0, 2) + "/" + startTime.substring(2, 4) + "/" + startTime.substring(4, 6) + " " + startTime.substring(6, 8) + ":" + startTime.substring(8, 10) + ":" + startTime.substring(10, 12);
                             var startDate = new Date(startTimetm).getTime();

                             id = detailsRst[i].id; //id
                             //获取开始创建时间
                            var warnsTime  = detailsRst[i].task_create_time;
                            var richTime = "20"+warnsTime.substring(0, 2) + "/" + warnsTime.substring(2, 4) + "/" + warnsTime.substring(4, 6) + " " + warnsTime.substring(6, 8) + ":" + warnsTime.substring(8, 10) + ":" + warnsTime.substring(10, 12);
                            var expiryMonth = warnsTime.substring(2, 4) + "月" + warnsTime.substring(4, 6)
                            var sMonth = warnsTime.substring(2, 4);//月份
                            var sDate = warnsTime.substring(4, 6);//日
                            var sHour = warnsTime.substring(6, 8);//小时
                            var sMinute = warnsTime.substring(8, 10);//分钟
                            var sSecond = warnsTime.substring(10, 12);//秒
                            var sMiao = sHour*3600 + sMinute*60 + sSecond*1;

                            // 获取结束时间
                            var endTime = detailsRst[i].create_end_time;
                            // 结束时间的总秒数
                            sekillEndTime = "20" + endTime.substring(0, 2) + "/" + endTime.substring(2, 4) + "/" + endTime.substring(4, 6) + " " + endTime.substring(6, 8) + ":" + endTime.substring(8, 10) + ":" + endTime.substring(10, 12);
                            var endTDate = new Date(sekillEndTime).getTime();
                           
                            //时间段要注意两种情况一种是刚进来就已经开始倒计时，还有就是到页面还没有倒计时，就用结束的时间减去当前的时间
                            var totalSecond;
                            if (startDate < currentDate  && currentDate <= endTDate) {//已经在倒计时了
                                totalSecond = parseInt((endTDate - currentDate) / 1000);
                                // setTimeout(function () {//已经在倒计时了
                                //     countdown(totalSecond)
                                //     },1000)

                                (function(totalSecond,x){
                                    setTimeout(function () {//已经在倒计时了
                                        countdown(totalSecond,x);
                                    },1000)
                                })(totalSecond,i);
                            } 

                            if (currentDate > endTDate) {//调接口
                                $.ajax({
                                    url: domain_name_url + "/hUser",
                                    type: "GET",
                                    dataType: "jsonp", //指定服务器返回的数据类型
                                    data: {
                                        method: 'delTask',
                                        token: tokenMark,
                                        task_id:id,
                                        url_type:"hUser"
                                    },
                                    success: function(data) {
                                         $('#orderContent ul').html('');
                                    }
                                })
                                
                            } 
                       
                            goodListHtml += '<li class="main_content_li mtw_k" data-id='+runId[i]+'  data-state='+phaseState[i]+'  data-bonus='+walletBonus[i]+'  data-category_name='+captionName[i]+' data-create_end_time='+stopTime[i]+' data-task_create_time='+beginTime[i]+' data-create_time='+foundTime[i]+'>';
                            goodListHtml += '<span class="main_content_a_left">';
                            goodListHtml += '<img class="main_img" src="../../image/mine/money.png">';
                            goodListHtml += '</span>';
                            goodListHtml += '<span class="p_purse">'+(detailsRst[i].bonus/100).toFixed(2)+'</span>';
                            goodListHtml += '<span class="main_content_a_right a_righ_time">';

                            if( (Month!=sMonth && date!=sDate)|| (Month == sMonth && date!=sDate)){
                                goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">'+expiryMonth+'</i></span>';
                                }else if(miao-sMiao>3600){
                                goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">今天</i></span>';
                                }else if( miao-sMiao<=3600){
                                    goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">刚刚</i></span>';
                                }
                            goodListHtml += '<span class="m_c_a_r_bottom">';
                            goodListHtml += '<span class="m_c_a_r_bottomleft d_drew"></span>';
                            goodListHtml += '</span>';
                            goodListHtml += '</span>';
                            goodListHtml += '<a href="#" class="main_content_a">';
                            goodListHtml += '<div class="particulars">进行中</div>';
                            goodListHtml += '</a>';
                            goodListHtml += '</li>';
                        }
                        if(detailsRst[i].state == 3){//审核中
                            //获取开始创建时间
                            var warnsTime = detailsRst[i].task_create_time;
                            var richTime = "20"+warnsTime.substring(0, 2) + "/" + warnsTime.substring(2, 4) + "/" + warnsTime.substring(4, 6) + " " + warnsTime.substring(6, 8) + ":" + warnsTime.substring(8, 10) + ":" + warnsTime.substring(10, 12);
                            var expiryMonth = warnsTime.substring(2, 4) + "月" + warnsTime.substring(4, 6)
                            var sMonth = warnsTime.substring(2, 4);//月份
                            var sDate = warnsTime.substring(4, 6);//日
                            var sHour = warnsTime.substring(6, 8);//小时
                            var sMinute = warnsTime.substring(8, 10);//分钟
                            var sSecond = warnsTime.substring(10, 12);//秒
                            var sMiao = sHour*3600 + sMinute*60 + sSecond*1;
                            goodListHtml += '<li class="main_content_li" data-id='+runId[i]+'  data-state='+phaseState[i]+'  data-bonus='+walletBonus[i]+'  data-category_name='+captionName[i]+' data-create_end_time='+stopTime[i]+' data-task_create_time='+beginTime[i]+' data-create_time='+foundTime[i]+'>';
                            goodListHtml += '<span class="main_content_a_left">';
                            goodListHtml += '<img class="main_img" src="../../image/mine/money.png">';
                            goodListHtml += '</span>';
                            goodListHtml += '<span class="p_purse">'+(detailsRst[i].bonus/100).toFixed(2)+'</span>';
                            goodListHtml += '<span class="main_content_a_right a_righ_time">';

                            if( (Month!=sMonth && date!=sDate)|| (Month == sMonth && date!=sDate)){
                                goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">'+expiryMonth+'</i></span>';
                                }else if(miao-sMiao>3600){
                                goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">今天</i></span>';
                                }else if( miao-sMiao<=3600){
                                    goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">刚刚</i></span>';
                                }
                            goodListHtml += '<span class="m_c_a_r_bottom">';
                            goodListHtml += '<span class="m_c_a_r_orange d_drew">预计1-23小时，超时自动到账</span>';
                            goodListHtml += '</span>';
                            goodListHtml += '</span>';
                            goodListHtml += '<a href="#" class="main_content_a">';
                            goodListHtml += ' <div class="aerea">审核中</div>';
                            goodListHtml += '</a>';
                            goodListHtml += '</li>';
                        }
                         if(detailsRst[i].state == 4){//审核失败
                            //获取开始创建时间
                            var warnsTime = detailsRst[i].task_create_time;
                            var richTime = "20"+warnsTime.substring(0, 2) + "/" + warnsTime.substring(2, 4) + "/" + warnsTime.substring(4, 6) + " " + warnsTime.substring(6, 8) + ":" + warnsTime.substring(8, 10) + ":" + warnsTime.substring(10, 12);
                            var expiryMonth = warnsTime.substring(2, 4) + "月" + warnsTime.substring(4, 6)
                            var sMonth = warnsTime.substring(2, 4);//月份
                            var sDate = warnsTime.substring(4, 6);//日
                            var sHour = warnsTime.substring(6, 8);//小时
                            var sMinute = warnsTime.substring(8, 10);//分钟
                            var sSecond = warnsTime.substring(10, 12);//秒
                            var sMiao = sHour*3600 + sMinute*60 + sSecond*1;
                            
                            goodListHtml += '<li class="main_content_li task_apply"  data-id='+runId[i]+'>';
                            goodListHtml += '<span class="main_content_a_left">';
                            goodListHtml += '<img class="main_img" src="../../image/mine/money.png">';
                            goodListHtml += '</span>';
                            goodListHtml += '<span class="p_purse">'+(detailsRst[i].bonus/100).toFixed(2)+'</span>';
                            goodListHtml += '<span class="main_content_a_right a_righ_time">';

                            if( (Month!=sMonth && date!=sDate)|| (Month == sMonth && date!=sDate)){
                                goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">'+expiryMonth+'</i></span>';
                                }else if(miao-sMiao>3600){
                                goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">今天</i></span>';
                                }else if( miao-sMiao<=3600){
                                    goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">刚刚</i></span>';
                                }
                            goodListHtml += '<span class="m_c_a_r_bottom">';
                            goodListHtml += '<span class="m_c_a_r_red d_drew">审核失败</span>';
                            goodListHtml += '</span>';
                            goodListHtml += '</span>';
                            goodListHtml += '<div class="bonus">查看</div>';
                            goodListHtml += '</li>';
                        }
                        if(detailsRst[i].state == 5){//已完成
                            //获取开始创建时间
                            var warnsTime = detailsRst[i].task_create_time;
                            var richTime = "20"+warnsTime.substring(0, 2) + "/" + warnsTime.substring(2, 4) + "/" + warnsTime.substring(4, 6) + " " + warnsTime.substring(6, 8) + ":" + warnsTime.substring(8, 10) + ":" + warnsTime.substring(10, 12);
                            var expiryMonth = warnsTime.substring(2, 4) + "月" + warnsTime.substring(4, 6)
                            var sMonth = warnsTime.substring(2, 4);//月份
                            var sDate = warnsTime.substring(4, 6);//日
                            var sHour = warnsTime.substring(6, 8);//小时
                            var sMinute = warnsTime.substring(8, 10);//分钟
                            var sSecond = warnsTime.substring(10, 12);//秒
                            var sMiao = sHour*3600 + sMinute*60 + sSecond*1;
                            
                            goodListHtml += '<li class="main_content_li mtw_k" data-id='+runId[i]+'  data-state='+phaseState[i]+'  data-bonus='+walletBonus[i]+'  data-category_name='+captionName[i]+' data-create_end_time='+stopTime[i]+' data-task_create_time='+beginTime[i]+' data-create_time='+foundTime[i]+'>';
                            goodListHtml += '<span class="main_content_a_left">';
                            goodListHtml += '<img class="main_img" src="../../image/mine/money.png">';
                            goodListHtml += '</span>';
                            goodListHtml += '<span class="p_purse">'+(detailsRst[i].bonus/100).toFixed(2)+'</span>';
                            goodListHtml += '<span class="main_content_a_right a_righ_time">';

                             if( (Month!=sMonth && date!=sDate)|| (Month == sMonth && date!=sDate)){
                                goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">'+expiryMonth+'</i></span>';
                                }else if(miao-sMiao>3600){
                                goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">今天</i></span>';
                                }else if( miao-sMiao<=3600){
                                    goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">刚刚</i></span>';
                                }
                            goodListHtml += '<span class="m_c_a_r_bottom">';
                            goodListHtml += ' <span class="m_c_a_r_green d_drew">获得奖励  '+(detailsRst[i].bonus/100).toFixed(2)+'元</span>';
                            goodListHtml += '</span>';
                            goodListHtml += '</span>';
                            goodListHtml += '<div class="main_content_a">';
                            goodListHtml += '<div class="creoline">已完成</div>';
                            goodListHtml += '</div>';
                            goodListHtml += '</li>';
                        }
                        if(detailsRst[i].state == 6){//已过期
                           //获取开始创建时间
                            var warnsTime = detailsRst[i].task_create_time;
                            var richTime = "20"+warnsTime.substring(0, 2) + "/" + warnsTime.substring(2, 4) + "/" + warnsTime.substring(4, 6) + " " + warnsTime.substring(6, 8) + ":" + warnsTime.substring(8, 10) + ":" + warnsTime.substring(10, 12);
                            var expiryMonth = warnsTime.substring(2, 4) + "月" + warnsTime.substring(4, 6)
                            var sMonth = warnsTime.substring(2, 4);//月份
                            var sDate = warnsTime.substring(4, 6);//日
                            var sHour = warnsTime.substring(6, 8);//小时
                            var sMinute = warnsTime.substring(8, 10);//分钟
                            var sSecond = warnsTime.substring(10, 12);//秒
                            var sMiao = sHour*3600 + sMinute*60 + sSecond*1;
                            
                            goodListHtml += '<li class="main_content_li">';
                            goodListHtml += '<span class="main_content_a_left">';
                            goodListHtml += '<img class="main_img" src="../../image/mine/ash.png">';
                            goodListHtml += '</span>';
                            goodListHtml += '<span class="y_purse">'+(detailsRst[i].bonus/100).toFixed(2)+' </span>';
                            goodListHtml += '<span class="main_content_a_ash a_righ_time">';

                            if( (Month!=sMonth && date!=sDate)|| (Month == sMonth && date!=sDate)){
                                goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">'+expiryMonth+'</i></span>';
                                }else if(miao-sMiao>3600){
                                goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">今天</i></span>';
                                }else if( miao-sMiao<=3600){
                                    goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">刚刚</i></span>';
                                }

                            goodListHtml += '<span class="m_c_a_r_ash">';
                            goodListHtml += '<span class="m_c_a_r_bottomlefts d_drew">任务已过期</span>';
                            goodListHtml += ' </span>';
                            goodListHtml += '</span>';
                            goodListHtml += '<div class="main_content_a">';
                            goodListHtml += ' <div class="overdue">已过期</div>';
                            goodListHtml += ' </div>';
                            goodListHtml += ' </li>'; 
                        }
        
                    } 
                    $('#orderContent ul').html(goodListHtml);
                    $('.mtw_k').click(function(Countdown){
                        var pastMoney = $(this).data('bonus');//奖励钱
                        var pastTitle = $(this).data('category_name');//标题
                        var uri = $(this).data('id');//id
                        var pastState= $(this).data('state');//获得状态state
                        var board = $(this).data('create_end_time');//结束时间
                        var initiate = $(this).data('task_create_time');//开始时间
                        var creation = $(this).data('create_time');//用户开始做任务的时间
                        sStorage = window.localStorage; //本地存题目
                     
    
                        sStorage.uri_goods = uri;//id
                        sStorage.equation= pastState;//获得状态state
                        sStorage.cash= (pastMoney/100).toFixed(2);//奖励钱
                        sStorage.slogan= pastTitle;//标题
                        sStorage.endingTime = board;//结束时间
                        sStorage.setOutTime = initiate;//开始时间
                        sStorage.setUptTime = creation;//用户开始做任务的时间
                        var gurl = window.location.href;
    
                        localStorage.setItem('gurl', window.location.href);
                        location.href = '../home/task_details.html';
                    })
                    // 查看出现弹框
                    $(function(){
                        $('.close').click(function(){
                            $('#modal_help').hide();
                            $('#modal_apply').hide();
                        })
                        var btn = document.getElementsByClassName('task_apply');
                        for(var j=0; j<btn.length; j++){
                            btn[j].onclick = function(){
                                var rid = $(this).data('id');//获取id
                                $('#modal_apply').show();
                                $.ajax({
                                    url: domain_name_url + "/hUser",
                                    type: "GET",
                                    dataType: "jsonp", //指定服务器返回的数据类型
                                    data: {
                                        method: 'getTaskFail',
                                        token: tokenMark,
                                        taskId:rid,
                                        url_type:"hUser"
                                    },
                                    success: function(data) {
                                        if(data.success==1){
                                            var remarks = data.result.rs[0].result.result.rs[0].remarks;
                                            $('.onec').html(remarks);
                                        }
                                    }
                                })
                                
                            }

                        }
                       
                        $('#sure').click(function(){
                            var uri = $(this).data('id');//id
                            var pastState = $(this).data('state');//获得状态state
                            var pastMoney = $(this).data('bonus');//奖励钱
                            var pastTitle = $(this).data('category_name');//标题
                            var board = $(this).data('create_end_time');//结束时间
                            var initiate = $(this).data('task_create_time');//开始时间
                            var creation = $(this).data('create_time');//用户开始做任务的时间
                            sStorage = window.localStorage; //本地存题目
        
                            sStorage.uri_goods = uri;//id
                            sStorage.equation= pastState;//获得状态state
                            sStorage.cash= (pastMoney/100).toFixed(2);//奖励钱
                            sStorage.slogan= pastTitle;//标题
                            sStorage.endingTime = board;//结束时间
                            sStorage.setOutTime = initiate;//开始时间
                            sStorage.setUptTime = creation;//用户开始做任务的时间
                            var gurl = window.location.href;
        
                            localStorage.setItem('gurl', window.location.href);
                            location.href = '../home/task_details.html';

                        })
                    })
                   
    
                }

            }else if(data.success == 3){
                $('#orderContent ul').html('<span class="information" id="box">还没有信息</span>');
            }
           
          
            // placard(1,urlStatus);
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
            method: 'getUserTask',
            token: tokenMark,
            status:2,
            url_type:"hUser"
        },
        success: function(data) {
            // console.log(data,'点击进行')
            if(data.success==1){
                var detailsRst = data.result.rs[0].result;//获取的内容
                var runId = jsel.match('.id', detailsRst);//获得id
                var phaseState = jsel.match('.state', detailsRst);//获得状态state
                var walletBonus = jsel.match('.bonus', detailsRst);//获得钱bonus
                var captionName = jsel.match('.category_name', detailsRst);//获得标题category_name
                var stopTime = jsel.match('.create_end_time', detailsRst);//结束时间
                var beginTime = jsel.match('.task_create_time', detailsRst);//开始时间
                var foundTime = jsel.match('.create_time', detailsRst);//用户创建任务开始的时间
                var goodListHtml = '';
                if(detailsRst.length!=0){
                    for(var i= 0 ; i<detailsRst.length;i++){
                      if(detailsRst[i].state == 1){ //进行中
                       
                             //获取开始时间
                             var startTime = detailsRst[i].create_time;
                              // 开始时间的总秒数
                              var startTimetm = "20" + startTime.substring(0, 2) + "/" + startTime.substring(2, 4) + "/" + startTime.substring(4, 6) + " " + startTime.substring(6, 8) + ":" + startTime.substring(8, 10) + ":" + startTime.substring(10, 12);
                              var startDate = new Date(startTimetm).getTime();
        
                             id = detailsRst[i].id;
                            //获取开始创建时间
                            var warnsTime = detailsRst[i].task_create_time;
                            var richTime = "20"+warnsTime.substring(0, 2) + "/" + warnsTime.substring(2, 4) + "/" + warnsTime.substring(4, 6) + " " + warnsTime.substring(6, 8) + ":" + warnsTime.substring(8, 10) + ":" + warnsTime.substring(10, 12);
                            var expiryMonth = warnsTime.substring(2, 4) + "月" + warnsTime.substring(4, 6)
                            var sMonth = warnsTime.substring(2, 4);//月份
                            var sDate = warnsTime.substring(4, 6);//日
                            var sHour = warnsTime.substring(6, 8);//小时
                            var sMinute = warnsTime.substring(8, 10);//分钟
                            var sSecond = warnsTime.substring(10, 12);//秒
                            var sMiao = sHour*3600 + sMinute*60 + sSecond*1;
                             // 获取结束时间
                             var endTime = detailsRst[i].create_end_time;
                             // 结束时间的总秒数
                             sekillEndTime = "20" + endTime.substring(0, 2) + "/" + endTime.substring(2, 4) + "/" + endTime.substring(4, 6) + " " + endTime.substring(6, 8) + ":" + endTime.substring(8, 10) + ":" + endTime.substring(10, 12);
                             var endTDate = new Date(sekillEndTime).getTime();
                             
                             //时间段要注意两种情况一种是刚进来就已经开始倒计时，还有就是到页面还没有倒计时，就用结束的时间减去当前的时间
                             var totalSecond;
                             if (startDate < currentDate  && currentDate <= endTDate) {//已经在倒计时了
                                  totalSecond = parseInt((endTDate - currentDate) / 1000);
                                //  setTimeout(function () {//已经在倒计时了
                                //      countdown(totalSecond)
                                //      },1000)
                                (function(totalSecond,x){
                                    setTimeout(function () {//已经在倒计时了
                                        // console.log(totalSecond,x);
                                        countdown(totalSecond,x);
                                    },1000)
                                })(totalSecond,i);

                             } 
                             if (currentDate > endTDate) {//调接口
                                $.ajax({
                                    url: domain_name_url + "/hUser",
                                    type: "GET",
                                    dataType: "jsonp", //指定服务器返回的数据类型
                                    data: {
                                        method: 'delTask',
                                        token: tokenMark,
                                        task_id:id,
                                        url_type:"hUser"
                                    },
                                    success: function(data) {
                                         
                                    }
                                })
                                
                            } 
                            
                            goodListHtml += '<li class="main_content_li mtw_k" data-id='+runId[i]+'  data-state='+phaseState[i]+'  data-bonus='+walletBonus[i]+'  data-category_name='+captionName[i]+' data-create_end_time='+stopTime[i]+' data-task_create_time='+beginTime[i]+' data-create_time='+foundTime[i]+'>';
                            goodListHtml += '<span class="main_content_a_left">';
                            goodListHtml += '<img class="main_img" src="../../image/mine/money.png">';
                            goodListHtml += '</span>';
                            goodListHtml += '<span class="p_purse">'+(detailsRst[i].bonus/100).toFixed(2)+'</span>';
                            goodListHtml += '<span class="main_content_a_right a_righ_time">';

                            if( (Month!=sMonth && date!=sDate)|| (Month == sMonth && date!=sDate)){
                                goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">'+expiryMonth+'</i></span>';
                                }else if(miao-sMiao>3600){
                                goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">今天</i></span>';
                                }else if( miao-sMiao<=3600){
                                    goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">刚刚</i></span>';
                                }
                            goodListHtml += '<span class="m_c_a_r_bottom">';
                            goodListHtml += '<span class="m_c_a_r_bottomleft d_drew"></span>';
                            goodListHtml += '</span>';
                            goodListHtml += '</span>';
                            goodListHtml += '<a href="#" class="main_content_a">';
                            goodListHtml += '<div class="particulars">进行中</div>';
                            goodListHtml += '</a>';
                            goodListHtml += '</li>';
                        }
                    
                    }
                  
                        $('#orderContent ul').html(goodListHtml);
                        $('.mtw_k').click(function(){
                            var pastMoney = $(this).data('bonus');//奖励钱
                            var pastTitle = $(this).data('category_name');//标题
                            var uri = $(this).data('id');//id
                            var pastState = $(this).data('state');//获得状态state
                            var board = $(this).data('create_end_time');//结束时间
                            var initiate = $(this).data('task_create_time');//开始时间
                            var creation = $(this).data('create_time');//用户开始做任务的时间
                            sStorage = window.localStorage; //本地存题目
                        
        
                            sStorage.uri_goods = uri;//id
                            sStorage.equation= pastState;//获得状态state
                            sStorage.cash= (pastMoney/100).toFixed(2);//奖励钱
                            sStorage.slogan= pastTitle;//标题
                            sStorage.endingTime = board;//结束时间
                            sStorage.setOutTime = initiate;//开始时间
                            sStorage.setUptTime = creation;//用户开始做任务的时间
                            var gurl = window.location.href;
        
                            localStorage.setItem('gurl', window.location.href);
                            location.href = '../home/task_details.html';
                        })

                    $(this).addClass("tabhover").parent().siblings().find("a").removeClass("tabhover");
    
                }

            }else if(data.success == 3){
                $('#orderContent ul').html('<span class="information">还没有信息</span>');
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

 //点击待审核
 $('#toAudit').click(function(){  
    $('#orderContent ul').html('');
    $.ajax({
        url: domain_name_url + "/hUser",
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        data: {
            method: 'getUserTask',
            token: tokenMark,
            status:3,
            url_type:"hUser"
        },
        success: function(data) {
            if(data.success==1){
                var detailsRst = data.result.rs[0].result;//获取的内容
                var runId = jsel.match('.id', detailsRst);//获得id
                var phaseState = jsel.match('.state', detailsRst);//获得状态state
                var walletBonus = jsel.match('.bonus', detailsRst);//获得钱bonus
                var captionName = jsel.match('.category_name', detailsRst);//获得标题category_name
                var stopTime = jsel.match('.create_end_time', detailsRst);//结束时间
                var beginTime = jsel.match('.task_create_time', detailsRst);//开始时间
                var foundTime = jsel.match('.create_time', detailsRst);//用户创建任务开始的时间
                var goodListHtml = '';
                if(detailsRst.length!=0){
                    for(var i= 0 ; i<detailsRst.length;i++){
                 
                        if(detailsRst[i].state == 3){//待审核中
                           //获取开始创建时间
                            var warnsTime = detailsRst[i].task_create_time;
                            var richTime = "20"+warnsTime.substring(0, 2) + "/" + warnsTime.substring(2, 4) + "/" + warnsTime.substring(4, 6) + " " + warnsTime.substring(6, 8) + ":" + warnsTime.substring(8, 10) + ":" + warnsTime.substring(10, 12);
                            var expiryMonth = warnsTime.substring(2, 4) + "月" + warnsTime.substring(4, 6)
                            var sMonth = warnsTime.substring(2, 4);//月份
                            var sDate = warnsTime.substring(4, 6);//日
                            var sHour = warnsTime.substring(6, 8);//小时
                            var sMinute = warnsTime.substring(8, 10);//分钟
                            var sSecond = warnsTime.substring(10, 12);//秒
                            var sMiao = sHour*3600 + sMinute*60 + sSecond*1;
                            goodListHtml += '<li class="main_content_li" data-id='+runId[i]+'  data-state='+phaseState[i]+'  data-bonus='+walletBonus[i]+'  data-category_name='+captionName[i]+' data-create_end_time='+stopTime[i]+' data-task_create_time='+beginTime[i]+' data-create_time='+foundTime[i]+'>';
                            goodListHtml += '<span class="main_content_a_left">';
                            goodListHtml += '<img class="main_img" src="../../image/mine/money.png">';
                            goodListHtml += '</span>';
                            goodListHtml += '<span class="p_purse">'+(detailsRst[i].bonus/100).toFixed(2)+'</span>';
                            goodListHtml += '<span class="main_content_a_right a_righ_time">';

                             if( (Month!=sMonth && date!=sDate)|| (Month == sMonth && date!=sDate)){
                                goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">'+expiryMonth+'</i></span>';
                                }else if(miao-sMiao>3600){
                                goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">今天</i></span>';
                                }else if( miao-sMiao<=3600){
                                    goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">刚刚</i></span>';
                                }
                            goodListHtml += '<span class="m_c_a_r_bottom">';
                            goodListHtml += '<span class="m_c_a_r_orange d_drew">预计1-23小时，超时自动到账</span>';
                            goodListHtml += '</span>';
                            goodListHtml += '</span>';
                            goodListHtml += '<a href="#" class="main_content_a">';
                            goodListHtml += ' <div class="aerea">审核中</div>';
                            goodListHtml += '</a>';
                            goodListHtml += '</li>';
                        }
                    } 
                    $('#orderContent ul').html(goodListHtml);
                    $('.mtw_k').click(function(){
                        var pastMoney = $(this).data('bonus');//奖励钱
                        var pastTitle = $(this).data('category_name');//标题
                        var uri = $(this).data('id');//id
                        var pastState = $(this).data('state');//获得状态state
                        var board = $(this).data('create_end_time');//结束时间
                        var initiate = $(this).data('task_create_time');//开始时间
                        var creation = $(this).data('create_time');//用户开始做任务的时间
                        sStorage = window.localStorage; //本地存题目
                       
    
                        sStorage.uri_goods = uri;//id
                        sStorage.equation= pastState;//获得状态state
                        sStorage.cash= (pastMoney/100).toFixed(2);//奖励钱
                        sStorage.slogan= pastTitle;//标题
                        sStorage.endingTime = board;//结束时间
                        sStorage.setOutTime = initiate;//开始时间
                        sStorage.setUptTime = creation;//用户开始做任务的时间
                        var gurl = window.location.href;
    
                        localStorage.setItem('gurl', window.location.href);
                        location.href = '../home/task_details.html';
                    })
                    $(this).addClass("tabhover").parent().siblings().find("a").removeClass("tabhover");
                
    
                }

            }else if(data.success == 3 ){
                $('#orderContent ul').html('<span class="information">还没有信息</span>');
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
//点击已结束
$('#completed').click(function(){ 
    $('#orderContent ul').html(''); 
    $.ajax({
        url: domain_name_url + "/hUser",
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        data: {
            method: 'getUserTask',
            token:tokenMark,
            status:4,
            url_type:"hUser"
        },
        success: function(data) {
        //    console.log(data,'已结束')
            if(data.success==1){
                var detailsRst = data.result.rs[0].result;//获取的内容
                var runId = jsel.match('.id', detailsRst);//获得id
                var phaseState = jsel.match('.state', detailsRst);//获得状态state
                var walletBonus = jsel.match('.bonus', detailsRst);//获得钱bonus
                var captionName = jsel.match('.category_name', detailsRst);//获得标题category_name
                var stopTime = jsel.match('.create_end_time', detailsRst);//结束时间
                var beginTime = jsel.match('.task_create_time', detailsRst);//开始时间
                var foundTime = jsel.match('.create_time', detailsRst);//用户创建任务开始的时间
                var goodListHtml = '';
                if(detailsRst.length!=0){
                    for(var i= 0 ; i<detailsRst.length;i++){
                         if(detailsRst[i].state == 4){//审核失败
                            //获取开始创建时间
                            var warnsTime = detailsRst[i].task_create_time;
                            var richTime = "20"+warnsTime.substring(0, 2) + "/" + warnsTime.substring(2, 4) + "/" + warnsTime.substring(4, 6) + " " + warnsTime.substring(6, 8) + ":" + warnsTime.substring(8, 10) + ":" + warnsTime.substring(10, 12);
                            var expiryMonth = warnsTime.substring(2, 4) + "月" + warnsTime.substring(4, 6)
                            var sMonth = warnsTime.substring(2, 4);//月份
                            var sDate = warnsTime.substring(4, 6);//日
                            var sHour = warnsTime.substring(6, 8);//小时
                            var sMinute = warnsTime.substring(8, 10);//分钟
                            var sSecond = warnsTime.substring(10, 12);//秒
                            var sMiao = sHour*3600 + sMinute*60 + sSecond*1;
                            
                            goodListHtml += '<li class="main_content_li task_apply"  data-id='+runId[i]+'>';
                            goodListHtml += '<span class="main_content_a_left">';
                            goodListHtml += '<img class="main_img" src="../../image/mine/money.png">';
                            goodListHtml += '</span>';
                            goodListHtml += '<span class="p_purse">'+(detailsRst[i].bonus/100).toFixed(2)+'</span>';
                            goodListHtml += '<span class="main_content_a_right a_righ_time">';

                             if( (Month!=sMonth && date!=sDate)|| (Month == sMonth && date!=sDate)){
                                goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">'+expiryMonth+'</i></span>';
                                }else if(miao-sMiao>3600){
                                goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">今天</i></span>';
                                }else if( miao-sMiao<=3600){
                                    goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">刚刚</i></span>';
                                }
                            goodListHtml += '<span class="m_c_a_r_bottom">';
                            goodListHtml += '<span class="m_c_a_r_red d_drew">审核失败</span>';
                            goodListHtml += '</span>';
                            goodListHtml += '</span>';
                            goodListHtml += '<div class="bonus">查看</div>';
                            goodListHtml += '</li>';
                        }
                        if(detailsRst[i].state == 5){//已完成
                           //获取开始创建时间
                            var warnsTime = detailsRst[i].task_create_time;
                            var richTime = "20"+warnsTime.substring(0, 2) + "/" + warnsTime.substring(2, 4) + "/" + warnsTime.substring(4, 6) + " " + warnsTime.substring(6, 8) + ":" + warnsTime.substring(8, 10) + ":" + warnsTime.substring(10, 12);
                            var expiryMonth = warnsTime.substring(2, 4) + "月" + warnsTime.substring(4, 6)
                            var sMonth = warnsTime.substring(2, 4);//月份
                            var sDate = warnsTime.substring(4, 6);//日
                            var sHour = warnsTime.substring(6, 8);//小时
                            var sMinute = warnsTime.substring(8, 10);//分钟
                            var sSecond = warnsTime.substring(10, 12);//秒
                            var sMiao = sHour*3600 + sMinute*60 + sSecond*1;
                            
                            goodListHtml += '<li class="main_content_li mtw_k" data-id='+runId[i]+'  data-state='+phaseState[i]+'  data-bonus='+walletBonus[i]+'  data-category_name='+captionName[i]+' data-create_end_time='+stopTime[i]+' data-task_create_time='+beginTime[i]+' data-create_time='+foundTime[i]+'>';
                            goodListHtml += '<span class="main_content_a_left">';
                            goodListHtml += '<img class="main_img" src="../../image/mine/money.png">';
                            goodListHtml += '</span>';
                            goodListHtml += '<span class="p_purse">'+(detailsRst[i].bonus/100).toFixed(2)+'</span>';
                            goodListHtml += '<span class="main_content_a_right a_righ_time">';

                            if( (Month!=sMonth && date!=sDate)|| (Month == sMonth && date!=sDate)){
                                goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">'+expiryMonth+'</i></span>';
                                }else if(miao-sMiao>3600){
                                goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">今天</i></span>';
                                }else if( miao-sMiao<=3600){
                                    goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">刚刚</i></span>';
                                }
                            goodListHtml += '<span class="m_c_a_r_bottom">';
                            goodListHtml += ' <span class="m_c_a_r_green d_drew">获得奖励  '+(detailsRst[i].bonus/100).toFixed(2)+'元</span>';
                            goodListHtml += '</span>';
                            goodListHtml += '</span>';
                            goodListHtml += '<div class="main_content_a">';
                            goodListHtml += '<div class="creoline">已完成</div>';
                            goodListHtml += '</div>';
                            goodListHtml += '</li>';
                        }
                        if(detailsRst[i].state == 6){//已过期
                             //获取开始创建时间
                            var warnsTime = detailsRst[i].task_create_time;
                            var richTime = "20"+warnsTime.substring(0, 2) + "/" + warnsTime.substring(2, 4) + "/" + warnsTime.substring(4, 6) + " " + warnsTime.substring(6, 8) + ":" + warnsTime.substring(8, 10) + ":" + warnsTime.substring(10, 12);
                            var expiryMonth = warnsTime.substring(2, 4) + "月" + warnsTime.substring(4, 6)
                            var sMonth = warnsTime.substring(2, 4);//月份
                            var sDate = warnsTime.substring(4, 6);//日
                            var sHour = warnsTime.substring(6, 8);//小时
                            var sMinute = warnsTime.substring(8, 10);//分钟
                            var sSecond = warnsTime.substring(10, 12);//秒
                            var sMiao = sHour*3600 + sMinute*60 + sSecond*1;
                            
                            goodListHtml += '<li class="main_content_li">';
                            goodListHtml += '<span class="main_content_a_left">';
                            goodListHtml += '<img class="main_img" src="../../image/mine/ash.png">';
                            goodListHtml += '</span>';
                            goodListHtml += '<span class="y_purse">'+(detailsRst[i].bonus/100).toFixed(2)+' </span>';
                            goodListHtml += '<span class="main_content_a_ash a_righ_time">';

                            if( (Month!=sMonth && date!=sDate)|| (Month == sMonth && date!=sDate)){
                                goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">'+expiryMonth+'</i></span>';
                                }else if(miao-sMiao>3600){
                                goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">今天</i></span>';
                                }else if( miao-sMiao<=3600){
                                    goodListHtml += '<span class="m_c_a_r_top">'+detailsRst[i].category_name+'<i class="just_now">刚刚</i></span>';
                                }
                            goodListHtml += '<span class="m_c_a_r_ash">';
                            goodListHtml += '<span class="m_c_a_r_bottomlefts d_drew">任务已过期</span>';
                            goodListHtml += ' </span>';
                            goodListHtml += '</span>';
                            goodListHtml += '<div class="main_content_a">';
                            goodListHtml += ' <div class="overdue">已过期</div>';
                            goodListHtml += ' </div>';
                            goodListHtml += ' </li>'; 
                        }
        
                    }
                    $('#orderContent ul').html(goodListHtml);
                    $('.mtw_k').click(function(){
                        var pastMoney = $(this).data('bonus');//奖励钱
                        var pastTitle = $(this).data('category_name');//标题
                        var uri = $(this).data('id');//id
                        var pastState = $(this).data('state');//获得状态state
                        var board = $(this).data('create_end_time');//结束时间
                        var initiate = $(this).data('task_create_time');//开始时间
                        var creation = $(this).data('create_time');//用户开始做任务的时间
                        sStorage = window.localStorage; //本地存题目
    
                        sStorage.uri_goods = uri;//id
                        sStorage.equation= pastState;//获得状态state
                        sStorage.cash= (pastMoney/100).toFixed(2);//奖励钱
                        sStorage.slogan= pastTitle;//标题
                        sStorage.endingTime = board;//结束时间
                        sStorage.setOutTime = initiate;//开始时间
                        sStorage.setUptTime = creation;//用户开始做任务的时间
                        var gurl = window.location.href;
    
                        localStorage.setItem('gurl', window.location.href);
                        location.href = '../home/task_details.html';
                    })
                    $(this).addClass("tabhover").parent().siblings().find("a").removeClass("tabhover");
                    // 查看出现弹框
                    $(function(){
                        $('.close').click(function(){
                            $('#modal_help').hide();
                            $('#modal_apply').hide();
                        })

                        var btn = document.getElementsByClassName('task_apply');
                        for(var j=0; j<btn.length; j++){
                            btn[j].onclick =function(){
                                $('#modal_apply').show();
                                var rid = $(this).data('id');//获取id
                                $.ajax({
                                    url: domain_name_url + "/hUser",
                                    type: "GET",
                                    dataType: "jsonp", //指定服务器返回的数据类型
                                    data: {
                                        method: 'getTaskFail',
                                        token: tokenMark,
                                        taskId:rid,
                                        url_type:"hUser"
                                    },
                                    success: function(data) {
                                        if(data.success==1){
                                            var remarks = data.result.rs[0].result.result.rs[0].remarks;
                                            $('.onec').html(remarks);
                                        }
    
                                    }
                                })
                              
                            }

                        }
                       
                        $('#sure').click(function(){
                            var uri = $(this).data('id');//id
                            var pastState = $(this).data('state');//获得状态state
                            var pastMoney = $(this).data('bonus');//奖励钱
                            var pastTitle = $(this).data('category_name');//标题
                            var board = $(this).data('create_end_time');//结束时间
                            var initiate = $(this).data('task_create_time');//开始时间
                            var creation = $(this).data('create_time');//用户开始做任务的时间
                            sStorage = window.localStorage; //本地存题目
        
                            sStorage.uri_goods = uri;//id
                            sStorage.equation= pastState;//获得状态state
                            sStorage.cash= (pastMoney/100).toFixed(2);//奖励钱
                            sStorage.slogan= pastTitle;//标题
                            sStorage.endingTime = board;//结束时间
                            sStorage.setOutTime = initiate;//开始时间
                            sStorage.setUptTime = creation;//用户开始做任务的时间
                            var gurl = window.location.href;
        
                            localStorage.setItem('gurl', window.location.href);
                            location.href = '../home/task_details.html';

                        })
                    })
    
                }

            }else if(data.success == 3){
                $('#orderContent ul').html('<span class="information">还没有信息</span>');
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


//  倒计时方法---已经开始
function countdown (totalSecond,index){
    var that=this;
    if( document.getElementsByClassName('a_righ_time')[index]){
        var d_drew = document.getElementsByClassName('a_righ_time')[index].getElementsByClassName('d_drew')[0];
        clearInterval(d_drew.interval);   
        d_drew.interval= setInterval(function () {
            // 总秒数
            var second = totalSecond;
            // 天数位
            var day = Math.floor(second / 3600 / 24);
            var dayStr = day.toString();
            if (dayStr.length == 1) dayStr = '0' + dayStr;
            // 小时位
            var hr = Math.floor((second - day * 3600 * 24) / 3600);
            var hrStr = hr.toString();
            if (hrStr.length == 1) hrStr = '0' + hrStr;
            // 分钟位
            var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
            var minStr = min.toString();
            if (minStr.length == 1) minStr = '0' + minStr;
            // 秒位
            var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
            var secStr = sec.toString();
            if (secStr.length == 1) secStr = '0' + secStr;
            //将倒计时赋值到div中
            // document.getElementById("drew").innerHTML = '已领取    ' +  ' 剩余时间'+'：'+hrStr+':'+minStr+':'+secStr; 
            d_drew.innerHTML = '已领取    ' +  ' 剩余时间'+'：'+hrStr+':'+minStr+':'+secStr; 
            totalSecond--; 
            if (totalSecond == 0) {
                setTimeout(function tt(){
                    //  document.getElementById("drew").innerHTML = '已领取    ' +  ' 剩余时间'+'：'+'00'+':'+'00'+':'+'00';
                    d_drew.innerHTML = '已领取    ' +  ' 剩余时间'+'：'+'00'+':'+'00'+':'+'00';
                    // clearInterval(that.interval); 
                    clearInterval(d_drew.interval); 
                },1000)
                $.ajax({
                    url: domain_name_url + "/hUser",
                    type: "GET",
                    dataType: "jsonp", //指定服务器返回的数据类型
                    data: {
                        method: 'delTask',
                        token: tokenMark,
                        task_id:id,
                        url_type:"hUser"
                    },
                    success: function(data) {
                        $('#orderContent ul').html('');
                    }
                })
            
            }
        }.bind(that) ,1000);
}

}