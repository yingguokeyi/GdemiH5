$(function(){
	var token = localStorage.getItem('token');
	var name = localStorage.getItem('name');//任务类型
	var taskName = localStorage.getItem('taskName');//任务名称
	var taskLink = localStorage.getItem('taskLink');//任务链接
	var taskMess = localStorage.getItem('taskMess');//提交文字
	var taskConts = localStorage.getItem('taskConts');//任务步骤
	// console.log(taskConts)
	var arr = localStorage.getItem('arr');//审核示例图
	// console.log(arr)
	$('#unit_price').blur(function(){
		var proceVal = $('#unit_price').val();
		if(name=='4'){
			proceVal>=1.20;
			if(proceVal<1.20){
				$('#unit_price').val('1.20');
			}
		}else if(name=='9' || name=="3"){
			proceVal>=10.00;
			if(proceVal<10.00){
				$('#unit_price').val('10.00');
			}
		}else{
			proceVal>=0.12;
			if(proceVal<0.12){
				$('#unit_price').val('0.12');
			}
		}

	})
	$('#unit_num').blur(function(){
		var numVal = $('#unit_num').val();
		if(name=='4' || name=='9' || name=="3"){
			numVal>=20;
			if(numVal<20){
				$('#unit_num').val('20');
			}
		}else{
			numVal>=10;
			if(numVal<10){
				$('#unit_num').val('10');
			}
		}
	})
	
	// 帮助
	$('#task_help').click(function(){
		$('#modal_help').show();
	})
	$('.close').click(function(){
		$('#modal_help').hide();
		$('#modal_timer').hide();
		$('#modal_cycle').hide();
	})
	// 任务限时
	$('#timer').click(function(){
		$('#modal_timer').show();
	})
	//审核周期
	$('#cycle').click(function(){
		$('#modal_cycle').show();
	})
	// 结束时间
	$.selectDate("#endTime", {}, function(data) {
		     // alert(data.year+"-"+data.month+"-"+data.day);
		// console.log(data);
		sStorage = window.localStorage; //本地存题目
		sStorage.job = endTime.innerText;
	});
	var job = localStorage.getItem('job');
	// $('#endTime').html(job);
	$('.cancel img').click(function(){
		var test1 = document.getElementById('test1');
        if(test1.src.indexOf('registernoc') >= 0){
            test1.src="../../image/mine/registerc.png";
        }else{
            test1.src="../../image/mine/registernoc.png";
        }
		
	})
	//提交
	$('#sub_btn').click(function(){
		var taskEnd="";
		var proceVals = $('#unit_price').val();//单价
		var taskPrice = proceVals*100;
		var numVals = $('#unit_num').val();//数量
		var timeLimit = $('.select-value2').val();//任务限时
		var taskTime = timeLimit.substring(0,1);
		// console.log(taskTime)
		var auditCycle = $('.select-value3').val();//审核周期
		var aduit = auditCycle.substring(0,2);
		// console.log(aduit)
		var endTimes = $('#endTime').html();//结束时间
		if(proceVals==''){
			layer.open({
		        content: '请填写单价',
		        skin: 'msg',
		        time: 2
		    });
		    return false;
		}
		if(numVals==''){
			layer.open({
		        content: '请填写数量',
		        skin: 'msg',
		        time: 2
		    });
		    return false;
		}
		if(timeLimit==''){
			layer.open({
		        content: '请填写任务限时',
		        skin: 'msg',
		        time: 2
		    });
		    return false;
		}
		if(auditCycle==''){
			layer.open({
		        content: '请填写审核周期',
		        skin: 'msg',
		        time: 2
		    });
		    return false;
		}
		if(endTimes==''){
			layer.open({
		        content: '请填写结束时间',
		        skin: 'msg',
		        time: 2
		    });
		    return false;
		}
		if(endTimes=="数量满后自动结束"){
			taskEnd="";
		}
		if(endTimes!="数量满后自动结束"){
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
			var nowdate = dates.substring(2);//190112183621
			var nowMon = nowdate.substring(2,4);//月份
			var nowDat = nowdate.substring(4,6);//日
			var ages = endTimes.substring(2,4);
			taskEnd = ages+mon+date+'23'+'59'+'59';
			if(mon<nowMon){
				layer.open({
			        content: '结束时间最小时间设置为发布任务往后推一天,请重新设置',
			        skin: 'msg',
			        time: 3
			    });
			    return false;
			}
			if(mon==nowMon && date<=nowDat){
				layer.open({
			        content: '结束时间最小时间设置为发布任务往后推一天,请重新设置',
			        skin: 'msg',
			        time: 3
			    });
			    return false;
			}
			// console.log(taskEnd)
		}
		$.ajax({
			url: domain_name_url + "/task",
			type: "GET",
			dataType: "jsonp", //指定服务器返回的数据类型
			data: {
				method: 'addUserTaskHtml',
				token: token,
				category_name: taskName,
				type:name,
				link_adress:taskLink,
				remark:taskConts,
				tips_words:taskMess,
				bonus:taskPrice,
				task_end_time:taskEnd,
				contrastImgIds:arr,
				check_time:aduit,
				task_number:numVals,
				task_time:taskTime,
				url_type:'task'
			},
			success: function(data) {
				if(data.success==1){
					$('#sub_btn').attr('disabled',true);
					$('#sub_btn').css({'background':'#b4b4b4','color':'#fff'});
					window.location.href='task_success.html';
				}
				
			}
		})

	})
})