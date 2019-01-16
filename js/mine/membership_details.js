$(function(){
	var search=location.search;
	//2、如果还想要获取确定的数据，可以解析字符串
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
	var userId = r.userId;
	$.ajax({
		url: domain_name_url + "/hUser",
		type: "GET",
		dataType: "jsonp", //指定服务器返回的数据类型
		data: {
			method: 'getTeamUserInfo',
			userId: userId,
			url_type:"hUser"
		},
		success: function(data) {
			//  console.log(data,'kk')
			var deRes = data.result.rs[0];
			if(data.success==1){
				$('.mem_head img').attr('src', deRes.image);
				$('.mem_per').html(deRes.wx_nick_name);
				$('#member_id i').html(deRes.id);
				if(deRes.member_level==1){
					$('#member_level em').html("普通会员");
				}
				if(deRes.member_level==2){
					$('#member_level em').html("vip");
				}
				$('#superior_member').html(deRes.parent_wx_nick_name);
				$('#superior_id').html(deRes.parent_Invitation_code);
				if(deRes.parent_member_level==1){
					$('#super_memlevel em').html("普通会员");
				}
				if(deRes.parent_member_level==2){
					$('#super_memlevel em').html("vip");
				}
				var date = new Date(deRes.registration_time * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		        var Y = date.getFullYear() + '-';
		        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		        var D = date.getDate() + ' ';
		        var h = date.getHours() + ':';
		        var m = date.getMinutes() + ':';
		        var s = date.getSeconds();
				$('#register_time em').html(Y+M+D+h+m+s);
				$('#real_name em').html(deRes.real_name);
				if(deRes.phone!=''){
					$('#member_phone em').html(deRes.phone.substr(0, 3) + '****' +deRes.phone.substr(7));
				}
				
			}
		}
	})	
})