$(function(){
	$.ajax({
		url: domain_name_url + "/wallet",
		type: "GET",
		dataType: "jsonp", //指定服务器返回的数据类型
		data: {
			method: 'getWalletMoney',
			userId: 4599,
			url_type:"wallet"
		},
		success: function(data) {
			var walletRes = data.result.rs[0];
			if(walletRes.length !=0){
				var balance = walletRes.balance;
				$('.wallet_zo span i').html((walletRes.money/100).toFixed(2));
				$('#current_balance i').html((balance/100).toFixed(2));
				sStorage = window.localStorage; //本地存题目
                sStorage.wbalance = balance;
				$('#have_withdrawal i').html((walletRes.withdraw/100).toFixed(2));
			}
			
		}
	})
})