$(function(){
	var token = localStorage.getItem('token');
	var uri = localStorage.getItem('uri_goods');//任务ID
	var taskID = localStorage.getItem('taskID');//用户申请任务ID
	var state = localStorage.getItem('state');//状态
	var money = localStorage.getItem('cash');//奖励钱
	var taskEndt = localStorage.getItem('taskEnd');//截止日期
	var arr1img = localStorage.getItem('sArr1');//图片
	var arr2img = localStorage.getItem('sArr2');//任务提交示例图
	var reArr = localStorage.getItem('reArr');//任务说明
	$('.title_top_first').click(function(){
		layer.open({
			type: 1,
			content: $('.warm').html(),
			anim: 'up',
			scrollbar: false,
			shadeClose: false,
			style: 'position:fixed;bottom:50%;left: 8%; right:8%;height: auto;border:none;border-radius:6px'
		});
		$(document).on("click", ".warm_login", function(){
			window.location.href = 'task_details.html'; 
		});
		$(document).on("click", ".warm_cancel", function() {
			layer.closeAll('page');
		});
	})
	$.ajax({
        url: domain_name_url + "/hUser",
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        data: {
            method: 'startTask',
            category_id:uri,
            task_id:taskID,
            status:state,
            token:token,
            url_type:"hUser"
        },
        success: function(data) {
        	if(data.success==1){
        		var source = data.result.rs[0].result.result.rs[0].source;//判断是H5前端用户还是后台上传任务返回的数据
        		var link = data.result.rs[0].result.result.rs[0].link_adress;//任务链接
        		var task_time = data.result.rs[0].result.result.rs[0].task_time;//任务限时
        		$('.quest_rewards i').html(money+'元');
        		$('.task_time').html(task_time);
        		//任务说明
        		if(source==0){
        			var remark = data.result.rs[0].result.result.rs[0].remark;//任务说明
        			$('.se_cont').after(remark);
        		}else{
        			if(reArr!=null){
				    	var reArrs = reArr.split(",");
				    	var reListHtml = '';
						for (var i = 0; i < reArrs.length; i++) {
							reListHtml += '<li>'+(i+1)+'. '+reArrs[i]+'</li>';
						};
						$('.se_cont').after(reListHtml);
			    	}
        		}

        		//获取开始时间
        		var trs = data.result.rs[0].result.result.rs[0];
        		var stime = trs.create_date;
        		// 开始时间的总秒数
			    var startTimetm = "20" + stime.substring(0, 2) + "/" + stime.substring(2, 4) + "/" + stime.substring(4, 6) + " " + stime.substring(6, 8) + ":" + stime.substring(8, 10) + ":" + stime.substring(10, 12);
			    var startDate = new Date(startTimetm).getTime();
			    // 获取结束时间
			    var etime = trs.create_end_time;
			    // 结束时间的总秒数
			    sekillEndTime = "20" + etime.substring(0, 2) + "/" + etime.substring(2, 4) + "/" + etime.substring(4, 6) + " " + etime.substring(6, 8) + ":" + etime.substring(8, 10) + ":" + etime.substring(10, 12);
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
				// 任务过期
				var timestamp=new Date().getTime();//获取当前时间的时间戳
				function formatDateTime(timestamp) {
				    var date = new Date(timestamp);
				    var y = date.getFullYear();
				    var m = date.getMonth() + 1;
				    m = m < 10 ? ('0' + m) : m;
				    var d = date.getDate();
				    d = d < 10 ? ('0' + d) : d;
				    var h = date.getHours();
				    h = h < 10 ? ('0' + h) : h;
				    var minute = date.getMinutes();
				    var second = date.getSeconds();
				    minute = minute < 10 ? ('0' + minute) : minute;
				    second = second < 10 ? ('0' + second) : second;
				    return y + '' + m + '' + d+''+h+''+minute+''+second;
				};
				var dates = formatDateTime(timestamp);//将时间戳转化12位
				var nowdate = dates.substring(2);
				if(source==0 || source==1){
					if(taskEndt != undefined){
						$('.main_middle button').click(function(){
							if(nowdate>taskEndt){
								$('#modal_issue').show();
							}else if(currentDate > endTDate){
								$('#modal_no').show();
								$('#no_affirm').click(function(){
									$.ajax({
								        url: domain_name_url + "/hUser",
								        type: "GET",
								        dataType: "jsonp", //指定服务器返回的数据类型
								        data: {
								            method: 'upTaskFailStatus',
								            token: token,
								            taskId:uri,
								            url_type:"hUser"
								        },
								        success: function(data) {
								        	if(data.success==1){
								        		location.href = 'task_details.html';
								        	}
								        }
								    })
								})    
							}else if(link==""){
								location.href = 'start_taskThree.html';
							}else{
								location.href = 'start_taskSecond.html?link=' + link;
							}
						})
					}
				}
				if(source==1){
					if(taskEndt == undefined){
						$('.main_middle button').click(function(){
							if(currentDate > endTDate){
								$('#modal_no').show();
								$('#no_affirm').click(function(){
									$.ajax({
								        url: domain_name_url + "/hUser",
								        type: "GET",
								        dataType: "jsonp", //指定服务器返回的数据类型
								        data: {
								            method: 'upTaskFailStatus',
								            token: token,
								            taskId:uri,
								            url_type:"hUser"
								        },
								        success: function(data) {
								        	if(data.success==1){
								        		location.href = 'task_details.html';
								        	}
								        }
								    })
								})
							}else if(link==""){
								location.href = 'start_taskThree.html';
							}else{
								location.href = 'start_taskSecond.html?link=' + link;
							}
						})
					}
				}
				
				// 提交示例图
	        	if(source==1){
	        		$('.sub_img').show();
	        		if(arr2img!=null){
				    	var arr2imgs = arr2img.split(",");
				    	var imgsListHtml = '';
						for (var i = 0; i < arr2imgs.length; i++) {
							imgsListHtml += '<li><img src='+arr2imgs[i]+'></li>';
						};
						$('#task_sub_pic').html(imgsListHtml);
			    	}
	        	}
				
        	}
        	sStorage = window.localStorage; //本地存题目
        	sStorage.s_time = stime;//开始时间
        	sStorage.e_time = etime;//结束时间
        	sStorage.source = source;
		    
        }
    })
    // 图片
    if(arr1img!=null){
    	var arr1imgs = arr1img.split(",");
    	var imgListHtml = '';
		for (var i = 0; i < arr1imgs.length; i++) {
			imgListHtml += '<li><img src='+arr1imgs[i]+'></li>';
		};
		$('#sample_picture').html(imgListHtml);
		$('#sample_picture li').length<=20;
    }
    
	
})