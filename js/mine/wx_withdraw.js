$(function(){
	var wbalance = localStorage.getItem('wbalance');
	$('.y_txt span').html((wbalance/100).toFixed(2)+'元')
	$('#wx_btn').click(function(){
	// 	layer.open({
	// 	type: 1,
	// 	content: $('.warm').html(),
	// 	anim: 'up',
	// 	scrollbar: false,
	// 	shadeClose: false,
	// 	style: 'position:fixed;bottom:50%;left: 8%; right:8%;height: auto;border:none;border-radius:6px'
	// });
	// $(document).on("click", ".warm_login", function(){
	// 	window.location.href = ''; 
	// });
	// $(document).on("click", ".warm_cancel", function() {
	// 	layer.closeAll('page');
	// });
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
		$.ajax({
			url: domain_name_url + "/wallet",
			type: "GET",
			dataType: "jsonp", //指定服务器返回的数据类型
			data: {
				method: 'wechatWithdrawals',
				userId: 4599,
				amount:sumVal,
				url_type:"wallet"
			},
			success: function(data) {
				if(data.success==1){
					layer.open({
						content: '提交成功',
						skin: 'msg',
						time: 3
					});
				}
			}
		})
	})
})