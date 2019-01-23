
// 获取token
window.jsel = JSONSelect;
var tokenMark = localStorage.getItem('token');//拿到传过来的token

$(function(){
	count();
	$(".bot_ul li").click(function() {
		$(this).children("a").addClass("tabhover").parent().siblings().find("a").removeClass("tabhover");
	})
	$('#headcount').click(function(){
		count();
	})
	function count(){
		$('#orderContent ul').html('');
		$.ajax({
			url: domain_name_url + "/hUser",
			type: "GET",
			dataType: "jsonp", //指定服务器返回的数据类型
			data: {
				method: 'getAllInviteInfoHtml',
				token:tokenMark,
				url_type:"hUser"
			},
			success: function(data) {
				if(data.success==1){
					var inviteRes = data.result.rs[0].result;
					var nntRes = data.result.rs[1].num[0];
					var ivListHtml = '';
					if(inviteRes.length!=0){
						$('#headcount em').html(nntRes.numAll);
						$('#direct_invitation em').html(nntRes.num1);
						$('#second_invitation em').html(nntRes.num2);
						for(var i=0;i<inviteRes.length;i++){
							ivListHtml += '<li class="team_message" data-userid='+inviteRes[i].id+'>';
							ivListHtml += '<a class="first_a">';
							ivListHtml += '<span class="title_content">';
							ivListHtml += '<img src='+inviteRes[i].image+' />';
							ivListHtml += '<span>'+inviteRes[i].wx_nick_name+'<i>('+inviteRes[i].Invitation_code+')</i></span>';
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

						$(this).addClass("tabhover").parent().siblings().find("a").removeClass("tabhover");
					}
				}else if(data.success==2){//未登录
					var lurl = window.location.href;
					var url = localStorage.getItem('url');
					window.location.href='../member/login.html';

				}else if(data.success==3){//无下级会员
					$('#orderContent ul').html('<span class="information">无下级会员</span>');

				}
			}
		})
	}
	// 直系邀请人
	$('#direct_invitation').click(function(){
		$('#orderContent ul').html('');
		$.ajax({
			url: domain_name_url + "/hUser",
			type: "GET",
			dataType: "jsonp", //指定服务器返回的数据类型
			data: {
				method: 'getLower',
				token:tokenMark,
				url_type:"hUser"
			},
			success: function(data) {
				if(data.success==1){

					var inviteRes = data.result.rs[0].result.result.rs;
					var runId = jsel.match('.id', inviteRes);//获得id
					var img = jsel.match('.image', inviteRes);//获得图片
					var memberLevel= jsel.match('.member_level', inviteRes);//获得判断是普通会员还是vip
					var InvitationCode = jsel.match('.Invitation_code', inviteRes);//获得会员id
					var wxName = jsel.match('.wx_nick_name', inviteRes);//获得会员名字

					var ivListHtml = '';
					if(inviteRes.length!=0){
						for(var i=0;i<inviteRes.length;i++){
							ivListHtml += '<li class="team_message" data-userid='+inviteRes[i].id+'>';
							ivListHtml += '<a class="first_a">';
							ivListHtml += '<span class="title_content">';
							ivListHtml += '<img src='+inviteRes[i].image+' />';
							ivListHtml += '<span>'+inviteRes[i].wx_nick_name+'<i>('+inviteRes[i].Invitation_code+')</i></span>';
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
					
						$(this).addClass("tabhover").parent().siblings().find("a").removeClass("tabhover");
					}
				}else if(data.success==2){//未登录
					var lurl = window.location.href;
					var url = localStorage.getItem('url');
					window.location.href='../member/login.html';

				}else if(data.success==3){//无下级会员
					$('#orderContent ul').html('<span class="information">无下级会员</span>');

				}
			}
		})
	})
	// 二级邀请人
	$('#second_invitation').click(function(){
		$('#orderContent ul').html('');
		$.ajax({
			url: domain_name_url + "/hUser",
			type: "GET",
			dataType: "jsonp", //指定服务器返回的数据类型
			data: {
				method: 'getLowerLower',
				token:tokenMark,
				url_type:"hUser"
			},
			success: function(data) {
				if(data.success==1){

					var inviteRes = data.result.rs[0].result.result.rs;
					var runId = jsel.match('.id', inviteRes);//获得id
					var img = jsel.match('.image', inviteRes);//获得图片
					var memberLevel= jsel.match('.member_level', inviteRes);//获得判断是普通会员还是vip
					var InvitationCode = jsel.match('.Invitation_code', inviteRes);//获得会员id
					var wxName = jsel.match('.wx_nick_name', inviteRes);//获得会员名字

					var ivListHtml = '';
					if(inviteRes.length!=0){
						for(var i=0;i<inviteRes.length;i++){
							ivListHtml += '<li class="team_message" data-userid='+inviteRes[i].id+'>';
							ivListHtml += '<a class="first_a">';
							ivListHtml += '<span class="title_content">';
							ivListHtml += '<img src='+inviteRes[i].image+' />';
							ivListHtml += '<span>'+inviteRes[i].wx_nick_name+'<i>('+inviteRes[i].Invitation_code+')</i></span>';
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
					
						$(this).addClass("tabhover").parent().siblings().find("a").removeClass("tabhover");
					}
				}else if(data.success==2){//未登录
					var lurl = window.location.href;
					var url = localStorage.getItem('url');
					window.location.href='../member/login.html';

				}else if(data.success==3){//无下级会员
					$('#orderContent ul').html('<span class="information">无下级会员</span>');

				}
			}
		})
	})
	$(document).on('click','.team_message',function(){
		var userId = $(this).data('userid');
		location.href = 'membership_details.html?userId=' + userId;
	})
	
})