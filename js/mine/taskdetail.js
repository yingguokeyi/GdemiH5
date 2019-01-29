$(function(){
	window.jsel = JSONSelect;
	var uri = localStorage.getItem('uri_goods');//拿到传过来的id
	var small = localStorage.getItem('smallBanks');//人数
	var tokenMark = localStorage.getItem('token');//拿到传过来的token
	$.ajax({
        url: domain_name_url + "/hUser",
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        data: {
            method: 'getTaskManageInfo',
			id:uri,
			token:tokenMark,
            url_type:"hUser"
        },
        success: function(data) {
			console.log(data,'ll')
			var hadoop = data.result.rs;	
			// 获取时间
			var creationTime = hadoop[2].create_time;
			var richTime = "20" + creationTime.substring(0, 2) + "-" + creationTime.substring(2, 4) + "-" + creationTime.substring(4, 6) + " " + creationTime.substring(6, 8) + ":" + creationTime.substring(8, 10) + ":" + creationTime.substring(10, 12);		
			var getHtml ='';
			
			if(hadoop[15].status ==1){//待审核

				getHtml +='<div class="main_top" id="main_top" style="height: 0 auto;">';
				getHtml +='<header>';
				getHtml +='<div class="title_top">';
				getHtml +='<a href="javascript:history.back(-1)" class="title_top_first">';
				getHtml +='<img src="../../image/mine/return.png" class="hea_img" />';
				getHtml +='</a>';
				getHtml +='<span class="title_top_center" style="font-size:.26rem;">发布详情</span>';
				getHtml +='</div>';
				getHtml +='</header>';
				
				getHtml +='<div class="task_info">';
				getHtml +='<span class="taskId">任务编号：<i class="mark">'+hadoop[13].id+'</i></span>';
				getHtml +='<span class="taskId">创建时间：<i class="mark">'+richTime+'</i></span>';
				getHtml +='<span class="taskId">任务状态：<i class="mark_orange">待审核</i></span>';
				getHtml +='<div class="task_bgs"></div>';

				getHtml +='</div>';
				getHtml +='<div class="task_bg"></div>';
				getHtml +='<div class="task_div">';
				getHtml +='<div class="d_basic">基本信息</div>';
				getHtml +='<span class="causee">任务名称：</span>';
				getHtml +='<span class="mark_cause">'+hadoop[1].category_name+'</span>';

				var step = hadoop[0].img;//步骤
				for(var i =0;i<step.length;i++){//有很多个任务步骤
					getHtml +='<span class="quest_one">任务步骤 ：<i class="a_account">'+step[i][0].description+'</i></span>';
					getHtml +='<div class="p_photo">';
					getHtml +='<div class="photo_one">';
					for( var a=0;a<step[i].length;a++ ){
						getHtml +='<img src='+step[i][a].image+'/>';
					}
					getHtml +='</div>';
					getHtml +='</div>';
				}

				
				getHtml +='<span class="quest_one">审核示例图：<i class="a_account"></i></span>';
				getHtml +='<div class="photo_two">';

				var audit = hadoop[8].contrastImg;//审核图片
				for(var j=0;j<audit.length;j++){
						getHtml +='<img src='+audit[j].auditImage+'/>';
				}
				getHtml +='</div>';
				
				
				// 阴影
				// getHtml +='<div class="umbr"></div>';
				// getHtml +='<div class="umbrr"></div>';
				// getHtml +='<div class="umbrrr"></div>';
				// getHtml +='<div class="umbrrrr"></div>';

				getHtml +='<span class="quest_os">提交文字：<i class="a_account">手机号+用户名</i></span>';
				getHtml +='<div class="task_bg"></div>';
				getHtml +='<div class="taskSet">任务设置</div>';

				getHtml +='<div class="taskSet_list">';

				getHtml +='<div class="list_one">';
				getHtml +=' <span class="list_left">投放单价</span>';
				getHtml +='<span class="list_right">￥'+(hadoop[4].bonus/100).toFixed(2)+'</span>';
				getHtml +='</div>';
				
				getHtml +='<div class="list_one">';
				getHtml +='<span class="list_left">投放数量</span>';
				getHtml +='<span class="list_grey">'+hadoop[12].task_number+'个</span>';
				getHtml +='</div>';

				getHtml +='<div class="list_one">';
				getHtml +='<span class="list_left">结束时间</span>';
				getHtml +='<span class="list_grey">数量满后自动结束</span>';
				getHtml +='</div>';

				getHtml +='<div class="list_one">';
				getHtml +='<span class="list_left">任务限时</span>';
				getHtml +='<span class="list_grey">'+hadoop[7].task_time+'小时</span>';
				getHtml +='</div>';

				getHtml +='<div class="list_one">';
				getHtml +='<span class="list_left">审核周期</span>';
				getHtml +='<span class="list_grey">'+hadoop[16].check_time+'小时</span>';
				getHtml +='</div>';

				getHtml +='</div>';

				getHtml +='<div class="task_bg"></div>';

				getHtml +='</div>';
				getHtml +='</div>';

				getHtml +='<footer>';
				getHtml +='<div class="tail">待审核</div>';
				getHtml +='</footer>';
			
	
			}else if(hadoop[15].status ==0){//发布中

				getHtml +='<div class="main_top" id="main_top" style="height: 0 auto;">';
				getHtml +='<header>';
				getHtml +='<div class="title_top">';
				getHtml +='<a href="javascript:history.back(-1)" class="title_top_first">';
				getHtml +='<img src="../../image/mine/return.png" class="hea_img" />';
				getHtml +='</a>';
				getHtml +='<span class="title_top_center" style="font-size:.26rem;">发布详情</span>';
				getHtml +='</div>';
				getHtml +='</header>';
				
				getHtml +='<div class="task_info">';
				getHtml +='<span class="taskId">任务编号：<i class="mark">'+hadoop[13].id+'</i></span>';
				getHtml +='<span class="taskId">创建时间：<i class="mark">'+richTime+'</i></span>';
				getHtml +=' <span class="taskId">任务状态：<i class="mark_blue">发布中</i></span>';
				getHtml +='<div class="task_bgs"></div>';

				getHtml +='<div class="r_document">';
				getHtml +='<span class="r_left">已领取：'+hadoop[11].num1+'个</span>';
				getHtml +='<span class="r_middle">已完成：'+hadoop[17].num2+'个</span>';
				getHtml +=' <span class="r_right">剩余：'+hadoop[14].num3+'个</span>';
				getHtml +='</div>';

				getHtml +='</div>';
				getHtml +='<div class="task_bg"></div>';
				getHtml +='<div class="task_div">';
				getHtml +='<div class="d_basic">基本信息</div>';
				getHtml +='<span class="causee">任务名称：</span>';
				getHtml +='<span class="mark_cause">'+hadoop[1].category_name+'</span>';

				var step = hadoop[0].img;//步骤
				for(var i =0;i<step.length;i++){//有很多个任务步骤
					getHtml +='<span class="quest_one">任务步骤 ：<i class="a_account">'+step[i][0].description+'</i></span>';
					getHtml +='<div class="p_photo">';
					getHtml +='<div class="photo_one">';
					for( var a=0;a<step[i].length;a++ ){
						getHtml +='<img src='+step[i][a].image+'/>';
					}
					getHtml +='</div>';
					getHtml +='</div>';
				}

				
				getHtml +='<span class="quest_one">审核示例图：<i class="a_account"></i></span>';
				getHtml +='<div class="photo_two">';

				var audit = hadoop[8].contrastImg;//审核图片

				for(var j=0;j<audit.length;j++){
						getHtml +='<img src='+audit[j].auditImage+'/>';
				}
				getHtml +='</div>';
				
				
				// 阴影
				// getHtml +='<div class="umbr"></div>';
				// getHtml +='<div class="umbrr"></div>';
				// getHtml +='<div class="umbrrr"></div>';
				// getHtml +='<div class="umbrrrr"></div>';

				getHtml +='<span class="quest_os">提交文字：<i class="a_account">手机号+用户名</i></span>';
				getHtml +='<div class="task_bg"></div>';
				getHtml +='<div class="taskSet">任务设置</div>';

				getHtml +='<div class="taskSet_list">';

				getHtml +='<div class="list_one">';
				getHtml +=' <span class="list_left">投放单价</span>';
				getHtml +='<span class="list_right">￥'+(hadoop[4].bonus/100).toFixed(2)+'</span>';
				getHtml +='</div>';
				
				getHtml +='<div class="list_one">';
				getHtml +='<span class="list_left">投放数量</span>';
				getHtml +='<span class="list_grey">'+hadoop[12].task_number+'个</span>';
				getHtml +='</div>';

				getHtml +='<div class="list_one">';
				getHtml +='<span class="list_left">结束时间</span>';
				getHtml +='<span class="list_grey">数量满后自动结束</span>';
				getHtml +='</div>';

				getHtml +='<div class="list_one">';
				getHtml +='<span class="list_left">任务限时</span>';
				getHtml +='<span class="list_grey">'+hadoop[7].task_time+'小时</span>';
				getHtml +='</div>';

				getHtml +='<div class="list_one">';
				getHtml +='<span class="list_left">审核周期</span>';
				getHtml +='<span class="list_grey">'+hadoop[16].check_time+'小时</span>';
				getHtml +='</div>';

				getHtml +='</div>';

				getHtml +='<div class="task_bg"></div>';

				getHtml +='</div>';
				getHtml +='</div>';

				getHtml +='<footer>';
				getHtml +='<div class="tail">发布中</div>';
				getHtml +='</footer>';
			

			}else if(hadoop[15].status ==2){//审核失败
				
				getHtml +='<div class="main_top" id="main_top" style="height: 0 auto;">';
				getHtml +='<header>';
				getHtml +='<div class="title_top">';
				getHtml +='<a href="javascript:history.back(-1)" class="title_top_first">';
				getHtml +='<img src="../../image/mine/return.png" class="hea_img" />';
				getHtml +='</a>';
				getHtml +='<span class="title_top_center" style="font-size:.26rem;">发布详情</span>';
				getHtml +='</div>';
				getHtml +='</header>';

				getHtml +='<div class="task_info">';
				getHtml +='<span class="taskId">任务编号：<i class="mark">'+hadoop[13].id+'</i></span>';
				getHtml +='<span class="taskId">创建时间：<i class="mark">'+richTime+'</i></span>';

				getHtml +='<div class="failureAudit">';
				getHtml +='<span class="taskState">任务状态： <i class="mark_red">审核失败</i></span> ';
				getHtml +='<span class="cause">原因：</span>';
				getHtml +='<span class="mark_cause">'+hadoop[5].refusal_reasons+'</span> ';
				getHtml +='</div> ';

				getHtml +='</div>';
				getHtml +='<div class="task_bgs"></div>';
			
				getHtml +='<div class="task_div">';
				getHtml +='<div class="d_basic">基本信息</div>';
				getHtml +='<span class="causee">任务名称：</span>';
				getHtml +='<span class="mark_cause">'+hadoop[1].category_name+'</span>';

				var step = hadoop[0].img;//步骤
				for(var i =0;i<step.length;i++){//有很多个任务步骤
					var rs = step[i][0].description;
					getHtml +='<span class="quest_one">任务步骤 ：<i class="a_account">'+step[i][0].description+'</i></span>';
					getHtml +='<div class="p_photo">';
					getHtml +='<div class="photo_one">';
					for( var a=0;a<step[i].length;a++ ){
						var nt = step[i][a].image;
						getHtml +='<img src='+step[i][a].image+'/>';
					}
					getHtml +='</div>';
					getHtml +='</div>';
				}

				getHtml +='<span class="quest_one">审核示例图：<i class="a_account"></i></span>';
				getHtml +='<div class="photo_two">';

				var audit = hadoop[8].contrastImg;//审核图片
				for(var j=0;j<audit.length;j++){
						var gi = audit[j].auditImage;
						getHtml +='<img src='+audit[j].auditImage+'/>';
				}
				getHtml +='</div>';
				
				// 阴影
				// getHtml +='<div class="umbr"></div>';
				// getHtml +='<div class="umbrr"></div>';
				// getHtml +='<div class="umbrrr"></div>';
				// getHtml +='<div class="umbrrrr"></div>';

				getHtml +='<span class="quest_os">提交文字：<i class="a_account">手机号+用户名</i></span>';
				getHtml +='<div class="task_bg"></div>';
				getHtml +='<div class="taskSet">任务设置</div>';

				getHtml +='<div class="taskSet_list">';

				getHtml +='<div class="list_one">';
				getHtml +=' <span class="list_left">投放单价</span>';
				getHtml +='<span class="list_right">￥'+(hadoop[4].bonus/100).toFixed(2)+'</span>';
				getHtml +='</div>';
				
				getHtml +='<div class="list_one">';
				getHtml +='<span class="list_left">投放数量</span>';
				getHtml +='<span class="list_grey">'+hadoop[12].task_number+'个</span>';
				getHtml +='</div>';

				getHtml +='<div class="list_one">';
				getHtml +='<span class="list_left">结束时间</span>';
				getHtml +='<span class="list_grey">数量满后自动结束</span>';
				getHtml +='</div>';

				getHtml +='<div class="list_one">';
				getHtml +='<span class="list_left">任务限时</span>';
				getHtml +='<span class="list_grey">'+hadoop[7].task_time+'小时</span>';
				getHtml +='</div>';

				getHtml +='<div class="list_one">';
				getHtml +='<span class="list_left">审核周期</span>';
				getHtml +='<span class="list_grey">'+hadoop[16].check_time+'小时</span>';
				getHtml +='</div>';

				getHtml +='</div>';

				getHtml +='<div class="task_bg"></div>';

				getHtml +='</div>';
				getHtml +='</div>';

				getHtml +='<footer>';
				getHtml +='<div class="tails"  data-id='+hadoop[13].id+' data-type='+hadoop[6].type+' data-category_name='+hadoop[1].category_name+' data-image='+nt+' data-description='+rs+' data-audit='+gi+' data-link_adress='+hadoop[9].link_adress+'>修改任务</div>';
				getHtml +='</footer>';
			}else if(hadoop[15].status ==3){//已结束

				getHtml +='<div class="main_top" id="main_top" style="height: 0 auto;">';
				getHtml +='<header>';
				getHtml +='<div class="title_top">';
				getHtml +='<a href="javascript:history.back(-1)" class="title_top_first">';
				getHtml +='<img src="../../image/mine/return.png" class="hea_img" />';
				getHtml +='</a>';
				getHtml +='<span class="title_top_center" style="font-size:.26rem;">发布详情</span>';
				getHtml +='</div>';
				getHtml +='</header>';
				
				getHtml +='<div class="task_info">';
				getHtml +='<span class="taskId">任务编号：<i class="mark">'+hadoop[13].id+'</i></span>';
				getHtml +='<span class="taskId">创建时间：<i class="mark">'+richTime+'</i></span>';
				getHtml +=' <span class="taskId">任务状态：<i class="mark_ash">已完成</i></span>';
				getHtml +='<div class="task_bgs"></div>';

				getHtml +='<div class="r_document">';
				getHtml +='<span class="r_left">已领取：'+hadoop[11].num1+'个</span>';
				getHtml +='<span class="r_middle">已完成：'+hadoop[17].num2+'个</span>';
				getHtml +=' <span class="r_right">剩余：'+hadoop[14].num3+'个</span>';
				getHtml +='</div>';

				getHtml +='</div>';
				getHtml +='<div class="task_bg"></div>';
				getHtml +='<div class="task_div">';
				getHtml +='<div class="d_basic">基本信息</div>';
				getHtml +='<span class="causee">任务名称：</span>';
				getHtml +='<span class="mark_cause">'+hadoop[1].category_name+'</span>';

				var step = hadoop[0].img;//步骤
				for(var i =0;i<step.length;i++){//有很多个任务步骤
					getHtml +='<span class="quest_one">任务步骤 1：<i class="a_account">'+step[i][0].description+'</i></span>';
					getHtml +='<div class="p_photo">';
					getHtml +='<div class="photo_one">';
					for( var a=0;a<step[i].length;a++ ){
						getHtml +='<img src='+step[i][a].image+'/>';
					}
					getHtml +='</div>';
					getHtml +='</div>';
				}

				
				getHtml +='<span class="quest_one">审核示例图：<i class="a_account"></i></span>';
				getHtml +='<div class="photo_two">';

				var audit = hadoop[8].contrastImg;//审核图片
				for(var j=0;j<audit.length;j++){
						getHtml +='<img src='+audit[j].auditImage+'/>';
				}
				getHtml +='</div>';
				
				
				// 阴影
				// getHtml +='<div class="umbr"></div>';
				// getHtml +='<div class="umbrr"></div>';
				// getHtml +='<div class="umbrrr"></div>';
				// getHtml +='<div class="umbrrrr"></div>';

				getHtml +='<span class="quest_os">提交文字：<i class="a_account">手机号+用户名</i></span>';
				getHtml +='<div class="task_bg"></div>';
				getHtml +='<div class="taskSet">任务设置</div>';

				getHtml +='<div class="taskSet_list">';

				getHtml +='<div class="list_one">';
				getHtml +=' <span class="list_left">投放单价</span>';
				getHtml +='<span class="list_right">￥'+(hadoop[4].bonus/100).toFixed(2)+'</span>';
				getHtml +='</div>';
				
				getHtml +='<div class="list_one">';
				getHtml +='<span class="list_left">投放数量</span>';
				getHtml +='<span class="list_grey">'+hadoop[12].task_number+'个</span>';
				getHtml +='</div>';

				getHtml +='<div class="list_one">';
				getHtml +='<span class="list_left">结束时间</span>';
				getHtml +='<span class="list_grey">数量满后自动结束</span>';
				getHtml +='</div>';

				getHtml +='<div class="list_one">';
				getHtml +='<span class="list_left">任务限时</span>';
				getHtml +='<span class="list_grey">'+hadoop[7].task_time+'小时</span>';
				getHtml +='</div>';

				getHtml +='<div class="list_one">';
				getHtml +='<span class="list_left">审核周期</span>';
				getHtml +='<span class="list_grey">'+hadoop[16].check_time+'小时</span>';
				getHtml +='</div>';

				getHtml +='</div>';

				getHtml +='<div class="task_bg"></div>';

				getHtml +='</div>';
				getHtml +='</div>';

				getHtml +='<footer>';
				getHtml +='<div class="tail">已完成</div>';
				getHtml +='</footer>';
			
			}
			$('.main').html(getHtml);

			$('.tails').click(function(){
				var uri = $(this).data('id');//id
				var pastTitle = $(this).data('category_name');//标题名字
				var pastState= $(this).data('type');//类型
				var board = $(this).data('link_adress');//链接
				var unsigned=$(this).data('description');//类型说明
				var typePrint =$(this).data('image');//类型图片
				var reviewImages =$(this).data('audit');//审核图片
				sStorage = window.localStorage; //本地存题目
				sStorage.uri_goods = uri;//id
				sStorage.slogan= pastTitle;//标题
				sStorage.equation= pastState;//获得类型
				sStorage.endingTime = board;//链接
				sStorage.typedef = unsigned;//类型说明
				sStorage.genre=typePrint;//类型图片
				sStorage.checkk=reviewImages;//审核图片
				location.href = 'modifyTask.html';
               
            })
        
        }
    
    })
})

