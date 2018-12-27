$(function(){
	count();
	$(".bot_ul li").click(function() {
		$(this).children("a").addClass("tabhover").parent().siblings().find("a").removeClass("tabhover");
	})
	$('#headcount').click(function(){
		count();
	})
	function count(){
		$.ajax({
			url: domain_name_url + "/invite",
			type: "GET",
			dataType: "jsonp", //指定服务器返回的数据类型
			data: {
				method: 'getAllInviteInfo',
				userId: 4573,
				url_type:"invite"
			},
			success: function(data) {
				if(data.success==1){
					var inviteRes = data.result.rs[0].result;
					var ivListHtml = '';
					if(inviteRes.length!=0){
						$('#headcount em').html(inviteRes[0].numAll);
						$('#direct_invitation em').html(inviteRes[0].num1);
						$('#second_invitation em').html(inviteRes[0].num2);
						for(var i=0;i<inviteRes.length;i++){
							ivListHtml += '<li class="team_message" data-userid='+inviteRes[i].id+'>';
							ivListHtml += '<a class="first_a">';
							ivListHtml += '<span class="title_content">';
							ivListHtml += '<img src='+inviteRes[i].head_image+' />';
							ivListHtml += '<span>'+inviteRes[i].wx_nick_name+'<i>('+inviteRes[i].id+')</i></span>';
							ivListHtml += '</span>';
							ivListHtml += '<span class="back_span">';
							if(inviteRes[i].member_level==1){
								ivListHtml += '<span>普通会员</span>';
							}
							if(inviteRes[i].member_level==2){
								ivListHtml += '<span>vip</span>';
							}
							ivListHtml += '<img src="../../image/mine/enter.png" />';
							ivListHtml += '</span>';
							ivListHtml += '</a></li>';
						}
						$('#orderContent ul').html(ivListHtml);
					}
				}
			}
		})
	}
	
	$('#direct_invitation').click(function(){
		$.ajax({
			url: domain_name_url + "/invite",
			type: "GET",
			dataType: "jsonp", //指定服务器返回的数据类型
			data: {
				method: 'getLower',
				userId: 4573,
				url_type:"invite"
			},
			success: function(data) {
				if(data.success==1){
					var inviteRes = data.result.rs;
					var ivListHtml = '';
					if(inviteRes.length!=0){
						for(var i=0;i<inviteRes.length;i++){
							ivListHtml += '<li class="team_message" data-userid='+inviteRes[i].id+'>';
							ivListHtml += '<a class="first_a">';
							ivListHtml += '<span class="title_content">';
							ivListHtml += '<img src='+inviteRes[i].head_image+' />';
							ivListHtml += '<span>'+inviteRes[i].wx_nick_name+'<i>('+inviteRes[i].id+')</i></span>';
							ivListHtml += '</span>';
							ivListHtml += '<span class="back_span">';
							if(inviteRes[i].member_level==1){
								ivListHtml += '<span>普通会员</span>';
							}
							if(inviteRes[i].member_level==2){
								ivListHtml += '<span>vip</span>';
							}
							ivListHtml += '<img src="../../image/mine/enter.png" />';
							ivListHtml += '</span>';
							ivListHtml += '</a></li>';
						}
						$('#orderContent ul').html(ivListHtml);
					}
				}
			}
		})
	})
	$('#second_invitation').click(function(){
		$.ajax({
			url: domain_name_url + "/invite",
			type: "GET",
			dataType: "jsonp", //指定服务器返回的数据类型
			data: {
				method: 'getLowerLower',
				userId: 4573,
				url_type:"invite"
			},
			success: function(data) {
				if(data.success==1){
					var inviteRes = data.result.rs;
					var ivListHtml = '';
					if(inviteRes.length!=0){
						for(var i=0;i<inviteRes.length;i++){
							ivListHtml += '<li class="team_message" data-userid='+inviteRes[i].id+'>';
							ivListHtml += '<a class="first_a">';
							ivListHtml += '<span class="title_content">';
							ivListHtml += '<img src='+inviteRes[i].head_image+' />';
							ivListHtml += '<span>'+inviteRes[i].wx_nick_name+'<i>('+inviteRes[i].id+')</i></span>';
							ivListHtml += '</span>';
							ivListHtml += '<span class="back_span">';
							if(inviteRes[i].member_level==1){
								ivListHtml += '<span>普通会员</span>';
							}
							if(inviteRes[i].member_level==2){
								ivListHtml += '<span>vip</span>';
							}
							ivListHtml += '<img src="../../image/mine/enter.png" />';
							ivListHtml += '</span>';
							ivListHtml += '</a></li>';
						}
						$('#orderContent ul').html(ivListHtml);
					}
				}
			}
		})
	})
	$(document).on('click','.team_message',function(){
		var userId = $(this).data('userid');
		location.href = 'membership_details.html?userId=' + userId;
	})
	
})