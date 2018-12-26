window.jsel = JSONSelect;
var id ='';
//任务栏page,urlStatus
function ask(){
    // 请求数据
    $.ajax({
        url: domain_name_url + "/task",
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        data: {
            method: 'getAllTask',
            userId: 4623,
            url_type:"task"
        },
        success: function(data) {
            // console.log(data,'全部任务')
            var rsMain = data.result.rs;
            var taskNumber = data.result.rs[1].result2;
            // 任务，金额
            var sessionsHtml ='';
            sessionsHtml += '<li>';
            sessionsHtml += '<p>'+taskNumber.num+'个</p>';
            sessionsHtml += '<p>今日任务</p>';
            sessionsHtml += '<div class="mid_line"></div>';
            sessionsHtml += '</li>';

            sessionsHtml += '<li>';
            sessionsHtml += '<p>'+(taskNumber.money/100).toFixed(2)+'元</p>';
            sessionsHtml += '<p>奖励总金额</p>';
            sessionsHtml += '</li>';
            $('.main_middle ul').html(sessionsHtml);
            // 全部任务
            var allTasks = data.result.rs[0].result;
            var runId = jsel.match('.id', allTasks);//获得id
            var phaseState = jsel.match('.state', allTasks);//获得状态state
            var walletBonus = jsel.match('.bonus', allTasks);//获得钱bonus
            var captionName = jsel.match('.category_name', allTasks);//获得标题category_name
            var peopleNumber = jsel.match('.number', allTasks);//获得人数number
            var stopTime = jsel.match('.create_end_time', allTasks);//结束时间
            var beginTime = jsel.match('.task_create_time', allTasks);//开始时间
            var foundTime = jsel.match('.create_time', allTasks);//用户创建任务开始的时间

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
            var miao =currentDates.getHours()*3600 + currentDates.getMinutes()*60 + currentDates.getSeconds();//当前的秒
            
            var goodListHtml = '';
           for(var i=0; i<allTasks.length;i++ ){
                if(allTasks[i].state == 0){  //已有多少人完成
                     //获取开始创建时间
                     var warnsTime  = allTasks[i].task_create_time;
                     var richTime = "20"+warnsTime.substring(0, 2) + "/" + warnsTime.substring(2, 4) + "/" + warnsTime.substring(4, 6) + " " + warnsTime.substring(6, 8) + ":" + warnsTime.substring(8, 10) + ":" + warnsTime.substring(10, 12);
                     var expiryMonth = warnsTime.substring(2, 4) + "月" + warnsTime.substring(4, 6)
                     var sMonth = warnsTime.substring(2, 4);//月份
                     var sDate = warnsTime.substring(4, 6);//日
                     var sHour = warnsTime.substring(6, 8);//小时
                     var sMinute = warnsTime.substring(8, 10);//分钟
                     var sSecond = warnsTime.substring(10, 12);//秒
                     var sMiao = sHour*3600 + sMinute*60 + sSecond*1;//开始时间的总得秒

                    goodListHtml += '<li class="main_content_li mtw_k"  data-id='+runId[i]+' data-number='+peopleNumber[i]+'>';
                    goodListHtml += '<span class="main_content_a_left">';
                    goodListHtml += '<img class="main_img" src="../../image/makeEveryDay/money.png">';
                    goodListHtml += '</span>';
                    goodListHtml += '<span class="p_purse">'+(allTasks[i].bonus/100).toFixed(2)+'</span>';
                    goodListHtml += '<span class="main_content_a_right a_righ_time">';

                    if( (Month!=sMonth && date!=sDate)|| (Month == sMonth && date!=sDate)){//判断当前月和日与开始的不相等

                        goodListHtml += '<span class="m_c_a_r_top">'+allTasks[i].category_name+'<i class="just_now">'+expiryMonth+'</i></span>';
                    }else if(miao-sMiao>3600){//判断当前秒与开始
                        goodListHtml += '<span class="m_c_a_r_top">'+allTasks[i].category_name+'<i class="just_now">今天</i></span>';
                    }else if( miao-sMiao<=3600){
                        goodListHtml += '<span class="m_c_a_r_top">'+allTasks[i].category_name+'<i class="just_now">刚刚</i></span>';
                    }
                    goodListHtml += '<span class="m_c_a_r_bottom">';
                    goodListHtml += '<span class="m_c_a_r_bottomleft d_drew">已有'+allTasks[i].number+'人领取</span>';
                    goodListHtml += '</span>';
                    goodListHtml += '</span>';
                    goodListHtml += '<a class="main_content_a">';
                    goodListHtml += '<div class="particulars">详情</div>';
                    goodListHtml += '</a>';
                    goodListHtml += '</li>';
                } 
                if(allTasks[i].state == 1){  //已经领取，倒计时
                    //获取开始时间
                    var startTime = allTasks[i].create_time;
                    // 开始时间的总秒数
                    var startTimetm = "20" + startTime.substring(0, 2) + "/" + startTime.substring(2, 4) + "/" + startTime.substring(4, 6) + " " + startTime.substring(6, 8) + ":" + startTime.substring(8, 10) + ":" + startTime.substring(10, 12);
                    var startDate = new Date(startTimetm).getTime();
                    id = allTasks[i].id;

                    //获取开始创建时间
                    var warnsTime  = allTasks[i].task_create_time;
                    var richTime = "20" + warnsTime.substring(0, 2) + "/" + warnsTime.substring(2, 4) + "/" + warnsTime.substring(4, 6) + " " + warnsTime.substring(6, 8) + ":" + warnsTime.substring(8, 10) + ":" + warnsTime.substring(10, 12);
                    var maggotTime = new Date(richTime).getTime();
                    var expiryMonth = warnsTime.substring(2, 4) + "月" + warnsTime.substring(4, 6)
                    var sMonth = warnsTime.substring(2, 4);//月份
                    var sDate = warnsTime.substring(4, 6);//日
                    var sHour = warnsTime.substring(6, 8);//小时
                    var sMinute = warnsTime.substring(8, 10);//分钟
                    var sSecond = warnsTime.substring(10, 12);//秒
                    var sMiao = sHour*3600 + sMinute*60 + sSecond*1;
                   

                    // 获取结束时间
                    var endTime = allTasks[i].create_end_time;
                    // 结束时间的总秒数
                    var sekillEndTime = "20" + endTime.substring(0, 2) + "/" + endTime.substring(2, 4) + "/" + endTime.substring(4, 6) + " " + endTime.substring(6, 8) + ":" + endTime.substring(8, 10) + ":" + endTime.substring(10, 12);
                    var endTDate = new Date(sekillEndTime).getTime();
                    //时间段要注意两种情况一种是刚进来就已经开始倒计时，还有就是到页面还没有倒计时，就用结束的时间减去当前的时间
                    var totalSecond;

                    if (startDate < currentDate  && currentDate <= endTDate) {//已经在倒计时了
                        totalSecond = parseInt((endTDate - currentDate) / 1000);

                        (function(totalSecond,x){
                            setTimeout(function () {//已经在倒计时了
                                countdown(totalSecond,x);
                            },1000)
                        })(totalSecond,i);
                        
                    }

                     //获得现在时间-开始创建时间跟一小时进行对比得出今天和刚刚，超出一小时就是今天，反之，月份就用现在时间和开始时间进行对比
                     goodListHtml += '<li class="main_content_li mtw_k" data-id='+runId[i]+' data-number='+peopleNumber[i]+'>';
                     goodListHtml += '<span class="main_content_a_left">';
                     goodListHtml += '<img class="main_img" src="../../image/makeEveryDay/money.png">';
                     goodListHtml += ' </span>';
                     goodListHtml += '<span class="p_purse">'+(allTasks[i].bonus/100).toFixed(2)+'</span>';
                     goodListHtml += '<span class="main_content_a_right a_righ_time">';

                     if( (Month!=sMonth && date!=sDate)|| (Month == sMonth && date!=sDate)){//判断当前月和日与开始的不相等
                        goodListHtml += '<span class="m_c_a_r_top">'+allTasks[i].category_name+'<i class="just_now">'+expiryMonth+'</i></span>';
                    }else if(miao-sMiao>3600){//判断当前秒与开始
                        goodListHtml += '<span class="m_c_a_r_top">'+allTasks[i].category_name+'<i class="just_now">今天</i></span>';
                    }else if( miao-sMiao<=3600){
                        goodListHtml += '<span class="m_c_a_r_top">'+allTasks[i].category_name+'<i class="just_now">刚刚</i></span>';
                    }
                     goodListHtml += '<span class="m_c_a_r_bottom">';
                     goodListHtml += '<span class="m_c_a_r_bottomleft d_drew"></span>';
                     goodListHtml += '</span>';
                     goodListHtml += '</span>';
                     goodListHtml += '<a  class="main_content_a">';
                     goodListHtml += ' <div class="particulars">详情</div>';
                     goodListHtml += ' </a>';
                     goodListHtml += ' </li>';


                    //当前时间大于结束时间 ，调接口,改变状态
                    if ( currentDate > endTDate) {//当前时间大于结束时间 ，调接口
                        // console.log(id,'ss')
                        $.ajax({
                            url: domain_name_url + "/task",
                            type: "GET",
                            dataType: "jsonp", //指定服务器返回的数据类型
                            data: {
                                method: 'delTask',
                                userId: 4623,
                                task_id:id,
                                url_type:"task"
                            },
                            success: function(data) {
                                // console.log(data,'当前时间大于结束时间')
                             
                                var fixationRs = data.result.rs[0].result.result.rs;
                               
                                var runId = jsel.match('.id', fixationRs);//获得id
                                var phaseState = jsel.match('.state', fixationRs);//获得状态state
                                var walletBonus = jsel.match('.bonus', fixationRs);//获得钱bonus
                                var captionName = jsel.match('.category_name', fixationRs);//获得标题category_name
                                var peopleNumber = jsel.match('.number', fixationRs);//获得人数number
                                var stopTime = jsel.match('.create_end_time', fixationRs);//结束时间
                                var beginTime = jsel.match('.task_create_time', fixationRs);//开始时间
                                var foundTime = jsel.match('.create_time', fixationRs);//用户创建任务开始的时间
                                var rsHtml ='';
                                for( var i=0;i<fixationRs.length;i++){
                                    if(fixationRs[i].state == 0){  //已有多少人完成
                                        //获取开始创建时间
                                        var warnsTime  = allTasks[i].task_create_time;
                                        var richTime = "20" + warnsTime.substring(0, 2) + "/" + warnsTime.substring(2, 4) + "/" + warnsTime.substring(4, 6) + " " + warnsTime.substring(6, 8) + ":" + warnsTime.substring(8, 10) + ":" + warnsTime.substring(10, 12);
                                        var maggotTime = new Date(richTime).getTime();
                                        var expiryMonth = warnsTime.substring(2, 4) + "月" + warnsTime.substring(4, 6)
                                        var sMonth = warnsTime.substring(2, 4);//月份
                                        var sDate = warnsTime.substring(4, 6);//日
                                        var sHour = warnsTime.substring(6, 8);//小时
                                        var sMinute = warnsTime.substring(8, 10);//分钟
                                        var sSecond = warnsTime.substring(10, 12);//秒
                                        var sMiao = sHour*3600 + sMinute*60 + sSecond*1;
                                        rsHtml += '<li class="main_content_li mtw_k"  data-id='+runId[i]+' data-number='+peopleNumber[i]+'>';
                                        rsHtml += '<span class="main_content_a_left">';
                                        rsHtml += '<img class="main_img" src="../../image/makeEveryDay/money.png">';
                                        rsHtml += '</span>';
                                        rsHtml += '<span class="p_purse">'+(fixationRs[i].bonus/100).toFixed(2)+'</span>';
                                        rsHtml += '<span class="main_content_a_right a_righ_time">';
                                         if( (Month!=sMonth && date!=sDate)|| (Month == sMonth && date!=sDate)){//判断当前月和日与开始的不相等

                                            rsHtml += '<span class="m_c_a_r_top">'+fixationRs[i].category_name+'<i class="just_now">'+expiryMonth+'</i></span>';
                                        }else if(miao-sMiao>3600){//判断当前秒与开始
                                            rsHtml += '<span class="m_c_a_r_top">'+fixationRs[i].category_name+'<i class="just_now">今天</i></span>';
                                        }else if( miao-sMiao<=3600){
                                           
                                            rsHtml += '<span class="m_c_a_r_top">'+fixationRs[i].category_name+'<i class="just_now">刚刚</i></span>';
                                        }
                                        rsHtml += '<span class="m_c_a_r_bottom">';
                                        rsHtml += '<span class="m_c_a_r_bottomleft d_drew">已有'+fixationRs[i].number+'人领取</span>';
                                        rsHtml += '</span>';
                                        rsHtml += '</span>';
                                        rsHtml += '<a class="main_content_a">';
                                        rsHtml += '<div class="particulars">详情</div>';
                                        rsHtml += '</a>';
                                        rsHtml += '</li>';
                                    } 
            
                                }
                                $('#orderContent ul').html('');
                                $('#orderContent ul').html(rsHtml);
                                $('.mtw_k').click(function(){
                                    var uri = $(this).data('id');//id
                                    var pastNumber = $(this).data('number');//已完成人数
                                    sStorage = window.localStorage; //本地存题目
                                    sStorage.uri_goods = uri;//id
                                    sStorage.smallBanks = pastNumber;//已完成人数
                                    location.href = 'task_details.html';
                                })
                            }
                        })
                        
                    } //判断倒计时结束后调取接口

                   
                } 
                if( allTasks[i].state == 5){   //已完成
                    //获取开始创建时间
                    var warnsTime = allTasks[i].task_create_time;
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
                    goodListHtml += '<img class="main_img" src="../../image/makeEveryDay/ash.png">';
                    goodListHtml += '</span>';
                    goodListHtml += '<span class="y_purse">'+(allTasks[i].bonus/100).toFixed(2)+' </span>';
                    goodListHtml += '<span class="main_content_a_ash a_righ_time">';

                    if( (Month!=sMonth && date!=sDate)|| (Month == sMonth && date!=sDate)){//判断当前月和日与开始的不相等

                        goodListHtml += '<span class="m_c_a_r_top">'+allTasks[i].category_name+'<i class="just_now">'+expiryMonth+'</i></span>';
                    }else if(miao-sMiao>3600){//判断当前秒与开始
                        goodListHtml += '<span class="m_c_a_r_top">'+allTasks[i].category_name+'<i class="just_now">今天</i></span>';
                    }else if( miao-sMiao<=3600){
                        
                        goodListHtml += '<span class="m_c_a_r_top">'+allTasks[i].category_name+'<i class="just_now">刚刚</i></span>';
                    }
                    goodListHtml += '<span class="m_c_a_r_ash">';
                    goodListHtml += '<span class="m_c_a_r_bottomlefts d_drew">已完成</span>';
                    goodListHtml += ' </span>';
                    goodListHtml += '</span>';
                    goodListHtml += '<div class="main_content_a">';
                    goodListHtml += ' <div class="particulars">详情</div>';
                    goodListHtml += ' </div>';
                    goodListHtml += ' </li>';    

                }
           }
            $('#orderContent ul').html(goodListHtml);
            $('.mtw_k').click(function(){
                var uri = $(this).data('id');//id
                var pastNumber = $(this).data('number');//已完成人数
                sStorage = window.localStorage; //本地存题目
                sStorage.uri_goods = uri;//id
                sStorage.smallBanks = pastNumber;//已完成人数
                location.href = 'task_details.html';
            })

        }
    })
    
}

function placard(){
    var menuListHtml = '';
    menuListHtml += '<li>全部任务</li>';
    $('.scroller ul').html(menuListHtml);
    $('.scroller ul').find('li:first-child').addClass('cur');
    // ask(1,urlStatus);
    ask();
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
            var _obj_scroller = _wrapper.children('.scroller');
            var _obj_ul = _obj_scroller.children('ul');
            var _obj_li = _obj_ul.children('li');
            var _scroller_w = 0;
            _obj_li.css({"margin-left":"0","margin-right":"0"});
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
                var duibi=_opt.duibiScreenWidth*_win_width/10,this_index=$this_obj.index(),this_off_left=$this_obj.offset().left,this_pos_left=$this_obj.position().left,this_width=$this_obj.width(),this_prev_width=$this_obj.prev('li').width(),this_next_width=$this_obj.next('li').width();
                var this_off_right=_win_width-this_off_left-this_width;
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

placard();


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
            // page++;
            // ask(12*page+1,urlStatus);
            // ask();
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
var coTime = '';
//  倒计时方法---已经开始
function countdown (totalSecond,index){
    var that=this;
    if( document.getElementsByClassName('a_righ_time')[index]){
        var d_drew = document.getElementsByClassName('a_righ_time')[index].getElementsByClassName('d_drew')[0];
        clearInterval(d_drew.interval);   
        d_drew.interval = setInterval(function () {
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
            d_drew.innerHTML = '已领取    ' +  ' 剩余时间'+'：'+hrStr+':'+minStr+':'+secStr;
            totalSecond--; 
            if (totalSecond == 0) {
                setTimeout(function tt(totalSecond){
                    // document.getElementsByClassName("d_drew").innerHTML = '已领取    ' +  ' 剩余时间'+'：'+'00'+':'+'00'+':'+'00';
                    d_drew.innerHTML = '已领取    ' +  ' 剩余时间'+'：'+'00'+':'+'00'+':'+'00';
                    // clearInterval(that.interval); 
                    clearInterval(d_drew.interval); 
                },1000)
                $.ajax({
                    url: domain_name_url + "/task",
                    type: "GET",
                    dataType: "jsonp", //指定服务器返回的数据类型
                    data: {
                        method: 'delTask',
                        userId: 4623,
                        task_id:id,
                        url_type:"task"
                    },
                    success: function(data) {
                        var fixationRs = data.result.rs[0].result.result.rs;
                        var runId = jsel.match('.id', fixationRs);//获得id
                        var phaseState = jsel.match('.state', fixationRs);//获得状态state
                        var walletBonus = jsel.match('.bonus', fixationRs);//获得钱bonus
                        var captionName = jsel.match('.category_name', fixationRs);//获得标题category_name
                        var peopleNumber = jsel.match('.number', fixationRs);//获得人数number
                        var stopTime = jsel.match('.create_end_time', fixationRs);//结束时间
                        var beginTime = jsel.match('.task_create_time', fixationRs);//开始时间
                        var foundTime = jsel.match('.create_time', fixationRs);//用户创建任务开始的时间
                        var rsHtml ='';
                        for( var j=0;j<fixationRs.length;j++){
                            if(fixationRs[j].state == 0){  //已有多少人完成
                                //获取开始创建时间
                                var warnsTime = fixationRs[j].task_create_time;
                                var richTime = "20"+warnsTime.substring(0, 2) + "/" + warnsTime.substring(2, 4) + "/" + warnsTime.substring(4, 6) + " " + warnsTime.substring(6, 8) + ":" + warnsTime.substring(8, 10) + ":" + warnsTime.substring(10, 12);
                                var expiryMonth = warnsTime.substring(2, 4) + "月" + warnsTime.substring(4, 6)
                                var sMonth = warnsTime.substring(2, 4);//月份
                                var sDate = warnsTime.substring(4, 6);//日
                                var sHour = warnsTime.substring(6, 8);//小时
                                var sMinute = warnsTime.substring(8, 10);//分钟
                                var sSecond = warnsTime.substring(10, 12);//秒
                                var sMiao = sHour*3600 + sMinute*60 + sSecond*1;
                                rsHtml += '<li class="main_content_li mtw_k"  data-id='+runId[j]+' data-number='+peopleNumber[j]+'>';
                                rsHtml += '<span class="main_content_a_left">';
                                rsHtml += '<img class="main_img" src="../../image/makeEveryDay/money.png">';
                                rsHtml += '</span>';
                                rsHtml += '<span class="p_purse">'+(fixationRs[j].bonus/100).toFixed(2)+'</span>';
                                rsHtml += '<span class="main_content_a_right a_righ_time">';
                                if( (Month!=sMonth && date!=sDate)|| (Month == sMonth && date!=sDate)){//判断当前月和日与开始的不相等
            
                                    rsHtml += '<span class="m_c_a_r_top">'+fixationRs[i].category_name+'<i class="just_now">'+expiryMonth+'</i></span>';
                                }else if(miao-sMiao>3600){//判断当前秒与开始
                                    rsHtml += '<span class="m_c_a_r_top">'+fixationRs[i].category_name+'<i class="just_now">今天</i></span>';
                                }else if( miao-sMiao<=3600){
                                    
                                    rsHtml += '<span class="m_c_a_r_top">'+fixationRs[i].category_name+'<i class="just_now">刚刚</i></span>';
                                }
                                rsHtml += '<span class="m_c_a_r_bottom">';
                                rsHtml += '<span class="m_c_a_r_bottomleft d_drew">已有'+fixationRs[j].number+'人领取</span>';
                                rsHtml += '</span>';
                                rsHtml += '</span>';
                                rsHtml += '<a class="main_content_a">';
                                rsHtml += '<div class="particulars">详情</div>';
                                rsHtml += '</a>';
                                rsHtml += '</li>';
                            } 
    
                        }
                        $('#orderContent ul').html('');
                        $('#orderContent ul').html(rsHtml);
                        $('.mtw_k').click(function(){
                            var uri = $(this).data('id');//id
                            var pastNumber = $(this).data('number');//已完成人数
                            sStorage = window.localStorage; //本地存题目
                            sStorage.uri_goods = uri;//id
                            sStorage.smallBanks = pastNumber;//已完成人数
                            location.href = 'task_details.html';
                        })
                    }
                })
            }
        }.bind(that) ,1000);
    

    }
    
}


