$(function(){
	var wbalance = localStorage.getItem('wbalance');
	$('.y_txt span').html((wbalance/100).toFixed(2)+'元');
	$('#wid_btn').click(function(){
		var total = $('.y_txt span').html();
		var sumVal = $('#sumVal').val();
		if(sumVal>total){
			layer.open({
				content: '余额不足！',
				skin: 'msg',
				time: 3
			});
			return false;
		}
		if(sumVal<5 && sumVal%5!=0){
			layer.open({
				content: '输入金额有误！',
				skin: 'msg',
				time: 3
			});
			return false;
		}
	})
	
})