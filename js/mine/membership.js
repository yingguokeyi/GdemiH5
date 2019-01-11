
// 获取token
window.jsel = JSONSelect;
var tokenMark = localStorage.getItem('token');//拿到传过来的token

var memberRst ='';//data
var monicker ='';//昵称
var st ='';//省
var urban ='';//城市
var area ='';//区域
var address ='';//地址

$(function(){
	var myPro = $("#my_province em").html();
	var myCity = $("#my_city em").html();
	var myArea = $("#my_area em").html();
	sStorage = window.localStorage;
	sStorage.myProx = myPro;
	sStorage.myCityx = myCity;
	sStorage.myAreax = myArea;
	// 复制功能
	var clipboard = new ClipboardJS('.copy');
	clipboard.on('success', function(e) {
	    layer.open({
	        content: '复制成功',
	        skin: 'msg',
	        time: 2
	    });
	});

	clipboard.on('error', function(e) {
	    // console.log(e);
	});

	// 调接口
	$.ajax({
        url: domain_name_url + "/hUser",
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        data: {
            method: 'getUserData',
            token:tokenMark,
            url_type:"hUser"
        },
        success: function(data) {
			memberRst = data.result.rs[0].result.result.rs[0];
			monicker = memberRst.wx_nick_name;//昵称
			st = memberRst.province;//省
			urban = memberRst.city;//城市
			area = memberRst.county;//区域
			address = memberRst.detailed_address;//地址

			// 内容
			if(data.success == 1){
				var memberHtml ='';
				memberHtml +='<div class="mem_name">';
				memberHtml +='<p class="mem_head">';
				if(memberRst.image =''){
					memberHtml +='<img src="../../image/mine/tt.png" />';
				}else{
					memberHtml +='<img src='+memberRst.image+' />';
				}
				memberHtml +='</p>';
				memberHtml +='<p class="mem_per">'+memberRst.wx_nick_name+'</p>';
				memberHtml +='</div>';
				// memberHtml +='';
				$('.main_top header').after(memberHtml)	;
				var vipHtml ='';
				vipHtml +='<li style="overflow:hidden" class="bot_li">';
				vipHtml +='<div style="float:left;" class="bot_p">';
				vipHtml +='<p>会&nbsp;&nbsp;员&nbsp;&nbsp;ID:</p>';
				vipHtml +='<p><i>'+memberRst.parent_Invitation_code+'</i></p>';
				vipHtml +='</div>';
				vipHtml +='<div style="float:right; width:15%;margin-right:0">';
				vipHtml +='<button class="copy" data-clipboard-action="copy" data-clipboard-target="i">复制</button>';
				vipHtml +='</div>';
				vipHtml +='</li>';
				vipHtml +='<li class="bot_li">';
				vipHtml +='<div class="bot_p">';
				vipHtml +='<p>会员级别:</p>';
				vipHtml +='<p><em>普通会员</em></p>';
				vipHtml +='</div>';
				vipHtml +='</li>';
				vipHtml +='<li class="bot_li">';
				vipHtml +='<div class="bot_p">';
				vipHtml +='	<p>上级会员:</p>';
				vipHtml +='<p><em>'+memberRst.parent_real_name +'('+memberRst.parent_Invitation_code+')</em></p>';
				vipHtml +='</div>';
				vipHtml +='</li>';
				vipHtml +='<li class="bot_li">';
				vipHtml +='<div class="bot_p">';
				vipHtml +='<p>会员级别:</p>';
				vipHtml +='<p><em>普通会员</em></p>';
				vipHtml +='</div>';
				vipHtml +='</li>';
				vipHtml +='<li class="bot_li">';
				vipHtml +='<div class="bot_p">';
				vipHtml +='<p>真实姓名:</p>';
				vipHtml +='<p><em>'+memberRst.real_name+'</em></p>';
				vipHtml +='</div>';
				vipHtml +='</li>';
				vipHtml +='<li class="bot_li">';
				vipHtml +='<div class="bot_p">';
				vipHtml +='<p>所在省份:</p>';
				vipHtml +='<p id="my_province"><em>'+memberRst.province+'</em></p>';
				vipHtml +='</div>';
				vipHtml +='</li>';
				vipHtml +='<li class="bot_li">';
				vipHtml +='<div class="bot_p">';
				vipHtml +='<p>城&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;市:</p>';
				vipHtml +='<p id="my_city"><em>'+memberRst.city+'</em></p>';
				vipHtml +='</div>';
				vipHtml +='</li>';
				vipHtml +='<li class="bot_li">';
				vipHtml +='<div class="bot_p">';
				vipHtml +='<p>区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;域:</p>';
				vipHtml +='<p id="my_area"><em>'+memberRst.county+'</em></p>';
				vipHtml +='</div>';
				vipHtml +='</li>';
				vipHtml +='<li style="height:1.56rem">';
				vipHtml +='<div class="bot_p">';
				vipHtml +='<p style="margin-top:.3rem;">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址:</p>';
				vipHtml +='<p><em>'+memberRst.detailed_address+'</em></p>';
				vipHtml +='</div>';
				vipHtml +='</li>';
				$('.main_bot ul').html(vipHtml);
	
				localStorage.setItem('wx_nick_name', monicker);
				localStorage.setItem('province',st);
				localStorage.setItem('city',urban);
				localStorage.setItem('county',area);
				localStorage.setItem('detailed_address',address);

			}else if(data.success == 2){
				var lurl = window.location.href;
                var url = localStorage.getItem('url');
                window.location.href='../member/login.html';

			}
		}
	})
})

function amendment(){
	var lurl = window.location.href;
	var url = localStorage.getItem('url');
	window.location.href='modified_data.html';
}