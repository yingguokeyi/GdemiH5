$(function(){
	var money = localStorage.getItem('cash');//奖励钱
	var Stime = localStorage.getItem('s_time');//开始时间
	var Etime = localStorage.getItem('e_time');//结束时间
    $('.quest_rewards i').html(money+'元');
	// 开始时间的总秒数
    var startTimetm = "20" + Stime.substring(0, 2) + "/" + Stime.substring(2, 4) + "/" + Stime.substring(4, 6) + " " + Stime.substring(6, 8) + ":" + Stime.substring(8, 10) + ":" + Stime.substring(10, 12);
    var startDate = new Date(startTimetm).getTime();
    // 结束时间的总秒数
    sekillEndTime = "20" + Etime.substring(0, 2) + "/" + Etime.substring(2, 4) + "/" + Etime.substring(4, 6) + " " + Etime.substring(6, 8) + ":" + Etime.substring(8, 10) + ":" + Etime.substring(10, 12);
    var endTDate = new Date(sekillEndTime).getTime();
    //获取当前时间
    var currentDate = new Date();
    currentDate = currentDate.getTime();
    //时间段要注意两种情况一种是刚进来就已经开始倒计时，还有就是到页面还没有倒计时，就用结束的时间减去当前的时间
    var totalSecond;
    if (startDate < currentDate  && currentDate <= endTDate) {//已经在倒计时了
        totalSecond = parseInt((endTDate - currentDate) / 1000);
        setTimeout(function () {//已经在倒计时了
        	countdown(totalSecond)
        },1000)
    }
    
    function countdown (totalSecond){
	    var that=this;
	    clearInterval(that.interval);
	    that.interval = setInterval(function () {
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
	        document.getElementById("drew").innerHTML = hrStr+':'+minStr+':'+secStr; 
	        totalSecond--; 
		    if (totalSecond == 0) {
	            setTimeout(function tt(totalSecond){
	                document.getElementById("drew").innerHTML = '00'+':'+'00'+':'+'00';
	                clearInterval(that.interval);
	            },1000)
	            
		    }else{
		 
		    }
	    }.bind(that) ,1000);

	}
	// 获取传过来的link
	var search=location.search;
	//如果还想要获取确定的数据，可以解析字符串
	function parse(search){
	    //从第二个字符开始截取   ，获取到第二个开始后面所有的字符
	    var str=search.substring(1);
	    var result={};
	    //分割字符串  -->产生字符串数组
	    var strs=str.split("&");
	    //遍历数组中的每一个元素
	    strs.forEach(function(v){
	        //伪代码：v="age=18"
	        var keyvalue=v.split("=");
	        var name=keyvalue[0];
	        var value=keyvalue[1];
	        result[name]=value;
	    })
	    return result;
	}
	var r=parse(search);
	var link = r.link;
	$('.step_title button').click(function(){
		location.href=link;
	});
})