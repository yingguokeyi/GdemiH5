$(function(){
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
		//      alert(data.year+"-"+data.month+"-"+data.day);
		// console.log(data);
		sStorage = window.localStorage; //本地存题目
		sStorage.job = endTime.innerText;
	});
	var job = localStorage.getItem('job');
	$('#endTime .desi_text').html(job);
	$('.cancel img').click(function(){
		var test1 = document.getElementById('test1');
        if(test1.src.indexOf('registernoc') >= 0){
            test1.src="../../image/mine/registerc.png";
        }else{
            test1.src="../../image/mine/registernoc.png";
        }
		
	})
})