

// // 获取token

// 获取token
window.jsel = JSONSelect;
var tokenMark = localStorage.getItem('token');//拿到传过来的token
// var wxName = localStorage.getItem('wx_nick_name');//拿到传过来的昵称
// var dart = localStorage.getItem('province');//拿到传过来的省
// var town = localStorage.getItem('city');//拿到传过来的市
// var zone = localStorage.getItem('county');//拿到传过来的区域
// var adds = localStorage.getItem('detailed_address');//拿到传过来的地址
// console.log(wxName,dart,town,zone,adds,'ll')

$(function(){
	$('#s_province').click(function(){
		$('#modal_confirm').show();
	})
})
//点击保存
$("#mod_btn").click(function(){
	var hypocoristic =document.getElementById('te').value;//获取昵称
	var province = document.getElementById('s_province').value;//省
	var kunitachi = document.getElementById('s_city').value;//市
	var virginia = document.getElementById('s_county').value;//县
	var presentAddress = document.getElementById('rt').value;//地址
	$.ajax({
        url: domain_name_url + "/hUser",
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        data: {
            method: 'updateUserData',
			wx_nick_name:hypocoristic,
			province:province,
			city:kunitachi,
			county:virginia,
			detailed_address:presentAddress,
			token:tokenMark,
            url_type:"hUser"
        },
		success: function(data) {
			if(data.success == 1){
				var lurl = window.location.href;
                var url = localStorage.getItem('url');
                window.location.href='membership.html';

			}else if(data.success == 2){
				var lurl = window.location.href;
                var url = localStorage.getItem('url');
                window.location.href='../member/login.html';

			}

		}
	})
});