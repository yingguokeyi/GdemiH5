$(function(){
	//	手机号码格式验证
	$("#unumber").blur(function() {
		var reg = /^1[34578]\d{9}$/;
		var unumber = $('#unumber').val().replace(/\s+/g, "");
		var number = document.getElementById("unumber").value;
		if(number==''){
			layer.open({
				content: '请输入手机号',
				skin: 'msg',
				time: 2
			});
			return false;
		}else if(!reg.test(unumber)) {
			layer.open({
				content: '手机号格式不正确',
				skin: 'msg',
				time: 2
			});
			return false;
		} else {
			$('.mian_btn_login').removeAttr('disabled');
			$('.mian_btn_login').css({'background':'#333','color':'#fff'});
		}
		
	});
	//	验证码
	var x = 60;
	$(".btn_yanzhengma").click(function() {
		if(x == 60) {
			var cl = setInterval(function() {
				if(x != 0) {
					x = x - 1;
					$(".btn_yanzhengma").val(x + "s");
					$('.btn_yanzhengma').css({'background':'transparent','color':'#666','border':'.01rem solid #333','border-radius': '.3rem'});

				} else {
					$(".btn_yanzhengma").val("获取验证码");
					$('.btn_yanzhengma').css({'background':'#333','color':'#fff','border-radius': '.3rem'});
					x = 60;
					clearInterval(cl);
				}
			}, 1000);
		}
		var number = document.getElementById("unumber").value;
		var data = {
			method: 'getNewVerificationCodeOptimize',
			phone: number,
			url_type:'login'
		}
		/*调用获取验证码接口*/
		$.ajax({
			url: domain_name_url + "/login",
			type: "GET",
			dataType: "jsonp", //指定服务器返回的数据类型
			data: data,
			success: function(data) {
				var result = JSON.stringify(data); //json对象转成字符串
				if(data.success==1){

				}
				if(data.success==2){
					layer.open({
						content:data.errorMessage,
						skin: 'msg',
						time: 2
					});
				}
			}
		});
		
	});
	$('#phone_codema').blur(function(){
		var phone_codema = document.getElementById('phone_codema').value;
		if(phone_codema==''){
			layer.open({
				content: '请输入验证码',
				skin: 'msg',
				time: 2
			});
			return false;
		}else{
			$('.mian_btn_login').removeAttr('disabled');
			$('.mian_btn_login').css({'background':'#333','color':'#fff'});
		}
	})
	$(document).on("click", ".mian_btn_login", function() {
		var number = document.getElementById("unumber").value;
		var phone_codema = document.getElementById('phone_codema').value;
		if(number==''){
			layer.open({
				content: '请输入手机号',
				skin: 'msg',
				time: 2
			});
			return false;
		}
		if(phone_codema==''){
			layer.open({
				content: '请输入验证码',
				skin: 'msg',
				time: 2
			});
			return false;
		}
		$.ajax({
			url: domain_name_url + "/login",
			type: "GET",
			dataType: "jsonp", //指定服务器返回的数据类型
			data: {
				method: 'addNewUserOptimize',
				phone: number,
				code: phone_codema,
				inviteCode:invite_code,
				real_name:name,
				source: '4',
				url_type:'login'
			},
			success: function(data) {
				$('.mian_btn_login').attr('disabled',true);
				$('.mian_btn_login').css({'background':'#b4b4b4','color':'#fff'});
				var da_success = data.success;
				if(da_success == 1) {
					layer.open({
						content: '注册成功',
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
					var lurl = window.location.href;
					var url = localStorage.getItem('url');
					if(lurl.indexOf("url") != -1){
						// window.location.href=url;
					}else{
						// window.location.href='../mine/mine.html';
					}

				} else if(da_success == 2){//短信验证码错误
					layer.open({
						content: data.errorMessage,
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
					
				}
			}
		})	
	})
})
