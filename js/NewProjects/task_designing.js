$(function(){
	var name = localStorage.getItem('name');
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