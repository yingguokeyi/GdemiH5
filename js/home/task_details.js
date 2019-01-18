$(function(){
	window.jsel = JSONSelect;
	var token = localStorage.getItem('token');
	var uri = localStorage.getItem('uri_goods');//拿到传过来的id
	var small = localStorage.getItem('smallBanks');//人数
	var dough = localStorage.getItem('cash');
	$.ajax({
        url: domain_name_url + "/hUser",
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        data: {
            method: 'getUserTaskInfo',
            token: token,
            taskId:uri,
            url_type:"hUser"
        },
        success: function(data) {
        	var rs = data.result.rs;
        	if(rs!=''){
				var title = rs[2].category_name;//标题
				var startTime = rs[1].create_start_time;//开始时间
				var sourceH = rs[8].source;//H5前端用户上传任务返回的数据
				var sourceP = rs[9].source;//后台上传任务返回的数据
				var myDate = new Date();//获取系统当前时间
				myDate.getYear(); //获取当前年份(2位)
				myDate.getMonth(); //获取当前月份(0-11,0代表1月)
				myDate.getDate(); //获取当前日(1-31)
				myDate.getHours(); //获取当前小时数(0-23)
				myDate.getMinutes(); //获取当前分钟数(0-59)
				myDate.getSeconds(); //获取当前秒数(0-59)
				var timestamp=new Date().getTime();//获取当前时间的时间戳
				function formatDateTime(timestamp) {
				    var date = new Date(timestamp);
				    var y = date.getFullYear();
				    var m = date.getMonth() + 1;
				    m = m < 10 ? ('0' + m) : m;
				    var d = date.getDate();
				    d = d < 10 ? ('0' + d) : d;
				    var h = date.getHours();
				    h = h < 10 ? ('0' + h) : h;
				    var minute = date.getMinutes();
				    var second = date.getSeconds();
				    minute = minute < 10 ? ('0' + minute) : minute;
				    second = second < 10 ? ('0' + second) : second;
				    return y + '' + m + '' + d+''+h+''+minute+''+second;
				};
				var dates = formatDateTime(timestamp);//将时间戳转化12位
				var nowdate = dates.substring(2);
				var Month = myDate.getMonth()+1;
				var date = myDate.getDate();
				var Hours = myDate.getHours();
				var Minutes = myDate.getMinutes();
				var Seconds = myDate.getSeconds();
				var miao = myDate.getHours()*3600 + myDate.getMinutes()*60 + myDate.getSeconds();
				if(sourceH==1){
					var endTime = rs[15].taskTime;//结束时间
					var creatTime = rs[3].create_time;//任务时间(判断今天，刚刚，日期)
					var situation = rs[14].state;//状态
					var task_id = rs[6].task_id;//用户申请任务ID
				}
				if(sourceP==0){
					var endTime = rs[11].taskTime;//结束时间
					var creatTime = rs[4].create_time;//任务时间(判断今天，刚刚，日期)
					var situation = rs[10].state;//状态
					var task_id = rs[7].task_id;//用户申请任务ID
				}
				sStorage = window.localStorage; //本地存题目
				sStorage.state = situation;
                sStorage.taskEnd = taskEndTime;
                sStorage.taskID = task_id;
				var sMonth = creatTime.substring(2, 4);//月份
				var sDate = creatTime.substring(4, 6);//日
				var sHour = creatTime.substring(6, 8);//小时
				var sMinute = creatTime.substring(8, 10);//分钟
				var sSecond = creatTime.substring(10, 12);//秒
				var sMiao = sHour*3600 + sMinute*60 + sSecond*1;
				if((Month!=sMonth && date!=sDate)||(Month==sMonth && date!=sDate)){
					$('.now').html(sMonth+'月'+sDate+'日');
				}else if(miao-sMiao<=3600){
					$('.now').html('刚刚');
				}else if(miao-sMiao>3600){
					$('.now').html('今天');
				}
				//截止日期
				if(sourceH==1){
					var taskEndTime = rs[12].task_end_time;//截止日期
					var task_number = rs[13].task_number; //总的数量
					var user_task_num = rs[11].user_task_num; //已完成的数量
					if(taskEndTime != ''){
						var taskTime = "20" + taskEndTime.substring(0, 2) + "/" + taskEndTime.substring(2, 4) + "/" + taskEndTime.substring(4, 6) + " " + taskEndTime.substring(6, 8) + ":" + taskEndTime.substring(8, 10) + ":" + taskEndTime.substring(10, 12);
						$('.expiration_date').html('截止日期:'+taskTime);//截止日期
					}else{
						$('.expiration_date').html(user_task_num +'/'+ task_number);
					}
					
				}
				if(sourceH==0){
					var taskEndTime = rs[6].task_end_time;//截止日期
					var taskTime = "20" + taskEndTime.substring(0, 2) + "/" + taskEndTime.substring(2, 4) + "/" + taskEndTime.substring(4, 6) + " " + taskEndTime.substring(6, 8) + ":" + taskEndTime.substring(8, 10) + ":" + taskEndTime.substring(10, 12);
					$('.expiration_date').html(taskTime);//截止日期
				}
				$('.top_money').html(dough);//奖励钱
    			$('.top_title').html(title);//标题
    			//任务说明
    			if(sourceH==1){
    				var slistHtml = '';
    				var task_explay = rs[0].img;
    				var reArr = [];
    				for(var i=0;i<task_explay.length;i++){
    					slistHtml += '<li>'+(i+1)+'. '+task_explay[i][0].description+'</li>';
    					reArr.push(task_explay[i][0].description);
    				}
    				$('.task_specification p').after(slistHtml);
    				sStorage = window.localStorage; //本地存题目
					sStorage.reArr = reArr;
    			}
    			if(sourceP==0){
    				var remark = rs[8].remark;
    				$('.task_specification p').after(remark);
    			}
    			// 示例图片
    			if(sourceH==1){
    				var img = rs[0].img;
		        	if(img!=''){
		        		var imgList='';
		        		var arr1 = [];
		        		for(var i=0;i<img.length;i++){
		        			for(var j=0;j<img[i].length;j++){
		        				imgList += '<img src='+img[i][j].image+' />';
		        				arr1.push(img[i][j].image);
		        			}
		        			
		        		}
		        		$('.sample_picture #picOne').html(imgList);
		        		sStorage = window.localStorage; //本地存题目
						sStorage.sArr1 = arr1;
						seaImg();
		        	}
    			}
	        	if(sourceP==0){
	        		var img = rs[0].img;
	        		if(img!=''){
		        		var imgList='';
		        		var arr1 = [];
		        		for(var i=0;i<img.length;i++){
		        			imgList += '<img src='+img[i].image+' />';
		        			arr1.push(img[i].image);
		        		}
		        		$('.sample_picture #picOne').html(imgList);
		        		sStorage = window.localStorage; //本地存题目
						sStorage.sArr1 = arr1;
						seaImg();
		        	}
	        	}
	        	//任务提交示例图 提交信息
	        	if(sourceH==1){
	        		$('#task_sub_pic').show();
	        		$('#task_sub_me').show();
	        		var contrastImg = rs[9].contrastImg; //提交示例图
	        		if(contrastImg!=''){
	        			var conImgList = '';
	        			var arr2 = [];
		        		for(var i=0;i<contrastImg.length;i++){
		        			conImgList += '<img src='+contrastImg[i].image+' />';
		        			arr2.push(contrastImg[i].image);
		        		}
		        		$('.sample_picture #picSub').html(conImgList);
		        		sStorage = window.localStorage; //本地存题目
						sStorage.sArr2 = arr2;
						seaImg();
	        		}
	        		var tips_words = rs[4].tips_words;//提交信息
	        		$('#sub_message').html(tips_words);
	        	}	
			    // 开始时间的总秒数
			    var startTimetm = "20" + startTime.substring(0, 2) + "/" + startTime.substring(2, 4) + "/" + startTime.substring(4, 6) + " " + startTime.substring(6, 8) + ":" + startTime.substring(8, 10) + ":" + startTime.substring(10, 12);
			    var startDate = new Date(startTimetm).getTime();
			    // 结束时间的总秒数
			    sekillEndTime = "20" + endTime.substring(0, 2) + "/" + endTime.substring(2, 4) + "/" + endTime.substring(4, 6) + " " + endTime.substring(6, 8) + ":" + endTime.substring(8, 10) + ":" + endTime.substring(10, 12);
			    var endTDate = new Date(sekillEndTime).getTime();
			    //获取当前时间
			    var currentDate = new Date();
			    currentDate = currentDate.getTime();
			    //时间段要注意两种情况一种是刚进来就已经开始倒计时，还有就是到页面还没有倒计时，就用结束的时间减去当前的时间
			    var totalSecond;
			    if(situation == 1 || situation == 4){
				    if (startDate < currentDate  && currentDate <= endTDate) {//已经在倒计时了
				        totalSecond = parseInt((endTDate - currentDate) / 1000);
				        setTimeout(function () {//已经在倒计时了
				        	countdown(totalSecond)
				        },1000)
				    }
				}
				if(situation == 0){
					$('.txt_p').html('已有'+small+'人完成');
					$('#task_apply').html('立即申请任务');
					if(sourceP==0){
						$('#task_apply').click(function(){
							$('#modal_apply').show();
						})
					}
					if(sourceH==1){
						if(taskEndTime!=''){
							$('#task_apply').click(function(){
								$('#modal_apply').show();
							})
						}else{
							$('#task_apply').click(function(){
								$.ajax({
							        url: domain_name_url + "/hUser",
							        type: "GET",
							        dataType: "jsonp", //指定服务器返回的数据类型
							        data: {
							            method: 'getUserTaskNum',
							            token: token,
							            category_id:uri,
							            url_type:"hUser"
							        },
							        success: function(data) {
							        	if(data.success==1){
							        		var num = data.result.rs[0].result.result.rs[0].num;
							        		if(num<task_number){
							        			$('#modal_apply').show();
							        		}else{
							        			$('#task_apply').attr('disabled',true);
												$('#task_apply').css({'backgoround':'#b4b4b4','color':'#fff'});
							        		}
							        	}
							        }
							    })

							})
						}
					}
					
				}
				if(situation == 1){
					$('.txt_p_ti').html('任务剩余时间');
					$('#task_apply').html('继续任务');
					
				}
				if(situation == 4){
					$('.txt_p').html('审核失败');
					$('#task_apply').html('查看任务');
				}
				if(situation == 5){
					$('.txt_p').html('');
					$('#task_apply').html('已完成');
					$('#task_apply').attr('disabled',true);
					$('#task_apply').css({'backgoround':'#b4b4b4','color':'#fff'});
				}
				if(sourceP==0){
					if(situation == 1 || situation == 4){
						$('#task_apply').click(function(){
							if(nowdate>taskEndTime){
								$('#modal_issue').show();
							}else{
								location.href = 'start_taskFirst.html';
							}
						})	
					}
				}
				if(sourceH==1){
					if(taskEndTime != ''){
						if(situation == 1 || situation == 4){
							$('#task_apply').click(function(){
								if(nowdate>taskEndTime){
									$('#modal_issue').show();
								}else{
									location.href = 'start_taskFirst.html';
								}
							})	
						}
					}else{
						if(situation == 1 || situation == 4){
							$('#task_apply').click(function(){
								location.href = 'start_taskFirst.html';
							})
						}
						
					}
				}
				
				$('#task_help').click(function(){
					$('#modal_help').show();
				})
				$('.close').click(function(){
					$('#modal_help').hide();
					$('#modal_apply').hide();
				})
			//  倒计时方法---已经开始
				function countdown (totalSecond){
				    var that=this;
				    clearInterval(that.interval);
				    that.interval = setInterval(function () {
					    // 总秒数
					    var second = totalSecond;
					    // 天数位
					    var day = Math.floor(second / 3600 / 24);
					    var dayStr = day.toString();
					    if (dayStr.length == 1) dayStr = '0' + dayStr;
					    // 小时位
					    var hr = Math.floor((second - day * 3600 * 24) / 3600);
					    var hrStr = hr.toString();
					    if (hrStr.length == 1) hrStr = '0' + hrStr;
					    // 分钟位
					    var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
					    var minStr = min.toString();
					    if (minStr.length == 1) minStr = '0' + minStr;
					    // 秒位
					    var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
					    var secStr = sec.toString();
				        if (secStr.length == 1) secStr = '0' + secStr;
				        //将倒计时赋值到div中
				        document.getElementById("drew").innerHTML = hrStr+':'+minStr+':'+secStr; 
				        totalSecond--; 
					    if (totalSecond == 0) {
				            setTimeout(function tt(totalSecond){
				                document.getElementById("drew").innerHTML = '00'+':'+'00'+':'+'00';
				                clearInterval(that.interval);
				                $('.txt_p').html('');
								$('#task_apply').html('立即申请任务');
								$('#task_apply').click(function(){
									$('#modal_apply').show();
								})
				            },1000)
					    }else{
					  
					    }
				    }.bind(that) ,1000);

				}
        	}
        	//判断有没有绑定手机号
        	$('#task_apply').click(function(){
        		if(token==null){
        			var url = window.location.href;
        			localStorage.setItem('url', window.location.href);
        			location.href = '../register/register.html?url='+url;
        		}
        	})
        	
        }
    })
// 赏金猎人
	$('.myscroll').myScroll({
		speed: 40, //数值越大，速度越慢
		rowHeight: 26 //li的高度
	});
	function DataFactory() {
		var imgPR = '../../image/touxiang';
		let arrImg  = [ imgPR+"/1.jpg", imgPR+"/2.jpg", imgPR+"/3.jpg", imgPR+"/4.jpg", imgPR+"/5.jpg", imgPR+"/6.jpg", imgPR+"/7.jpg", imgPR+"/8.jpg", imgPR+"/9.jpg", imgPR+"/10.jpg",  imgPR+"/11.jpg", imgPR+"/12.jpg", imgPR+"/13.jpg", imgPR+"/14.jpg", imgPR+"/15.jpg", imgPR+"/16.jpg", imgPR+"/17.jpg", imgPR+"/18.jpg", imgPR+"/19.jpg", imgPR+"/20.jpg", imgPR+"/21.jpg", imgPR+"/22.jpg", imgPR+"/23.jpg", imgPR+"/24.jpg", imgPR+"/25.jpg", imgPR+"/26.jpg", imgPR+"/27.jpg", imgPR+"/28.jpg", imgPR+"/29.jpg", imgPR+"/30.jpg", imgPR+"/31.jpg", imgPR+"/32.jpg", imgPR+"/33.jpg", imgPR+"/34.jpg", imgPR+"/35.jpg", imgPR+"/36.jpg", imgPR+"/37.jpg", imgPR+"/38.jpg", imgPR+"/39.jpg", imgPR+"/40.jpg", imgPR+"/41.jpg", imgPR+"/42.jpg", imgPR+"/43.jpg", imgPR+"/44.jpg", imgPR+"/45.jpg", imgPR+"/46.jpg", imgPR+"/47.jpg", imgPR+"/48.jpg", imgPR+"/49.jpg", imgPR+"/50.jpg", imgPR+"/51.jpg", imgPR+"/52.jpg", imgPR+"/53.jpg", imgPR+"/54.jpg", imgPR+"/55.jpg", imgPR+"/56.jpg", imgPR+"/57.jpg", imgPR+"/58.jpg", imgPR+"/59.jpg", imgPR+"/60.jpg",  imgPR+"/61.jpg", imgPR+"/62.jpg", imgPR+"/63.jpg", imgPR+"/64.jpg", imgPR+"/65.jpg", imgPR+"/66.jpg", imgPR+"/67.jpg", imgPR+"/68.jpg", imgPR+"/69.jpg", imgPR+"/70.jpg", imgPR+"/71.jpg", imgPR+"/72.jpg", imgPR+"/73.jpg", imgPR+"/74.jpg", imgPR+"/75.jpg", imgPR+"/76.jpg", imgPR+"/77.jpg", imgPR+"/78.jpg", imgPR+"/79.jpg", imgPR+"/80.jpg", imgPR+"/81.jpg", imgPR+"/82.jpg", imgPR+"/83.jpg", imgPR+"/84.jpg", imgPR+"/85.jpg", imgPR+"/86.jpg", imgPR+"/87.jpg", imgPR+"/88.jpg", imgPR+"/89.jpg", imgPR+"/90.jpg", imgPR+"/91.jpg", imgPR+"/92.jpg", imgPR+"/93.jpg", imgPR+"/94.jpg", imgPR+"/95.jpg", imgPR+"/96.jpg", imgPR+"/97.jpg", imgPR+"/98.jpg", imgPR+"/99.jpg", imgPR+"/100.jpg"];
		let arrName = [ '李**', '上**了', '啊**', '刘**', '刘*', '王*', '高*', '马**', '李*', '上**丹', '尚**', '王**', '冯**', '刘**','刘**', '大*', '孙*', '赵*', '赵**', '李*', '吴*', '李**', '褚**', '秦**', '何**', '吕**', '张*', '雷**', '黄**', '穆**', '贝*', '纪**', '丁*', '包**', '秦**麒', '蒋**', '顾**', '夏*', '樊**', '霍*', '俞**', '苗**', '唐*', '卫**', '沈**', '祁*', '墨**', '上**', '费**', '傅*', '李*', '奚**', '花*', '舒*', '梅*', '计*', '孟*', '邵**', '鲍*', '贺**', '郭**尔', '王**', '冯**', '刘**','刘**', '袁*', '孙*', '赵*', '赵**', '李*', '吴*', '李**', '褚**', '秦**', '何**', '贾**', '张*', '雷**', '江**', '路**', '廉*', '齐**', '丁*', '欧阳**', '杜**', '臧**', '顾**', '夏*', '酆**', '余*', '娄**', '苗**', '唐*', '卫**', '沈**', '蓝*', '席**', '麻*', '邬**', '罗**'];
		return {
		    img: arrImg[Math.floor(Math.random() * 100)],
		    name: arrName[Math.floor(Math.random() * 100)]
		    // price: 20.5,
		    // date: '12月5日'
		}
	}

	let list = [];
	var hListHtml = '';
	for (let i = 0; i < 100; i++) {
		let data = DataFactory();
		list.push(data);
	}
	// console.log(list)
	for (var j=0;j<list.length;j++){
		hListHtml += '<li>';
		hListHtml += '<div class="myscroll_left">';
		hListHtml += '<img src='+list[j].img+'>';
		hListHtml += '<span class="hunter_name">'+list[j].name+'</span>';
		hListHtml += '<span class="hunter_money">获得0.9元</span>';
		hListHtml += '</div>';
		hListHtml += '<div class="myscroll_right"></div>';
		hListHtml += '</li>';
	}
	$('.myscroll ul').html(hListHtml);
	var myDate = new Date();//获取系统当前时间
	var month = myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)
	var day = myDate.getDate(); //获取当前日(1-31)
	$('.myscroll_right').html(month+'月'+day+'日');
	//点击图片放大
	function seaImg(){
	    $(".phone").on("click",function(e){
		    $(".mask-img").css("display","none");
		    $(".picture").css("display","none");      
	    })
	    var imgs = $('.sample_picture img')
	    var images;
	    imgs.on('click',function(e){
		    var father = (e.currentTarget).parentNode; //当前点击图片的父元素
		    var att = father.attributes.id.nodeValue; //父元素自己的属性id
		    var image = '#' + att + ' img'
		    images = $(image)  //jquer获取id下的所有img
		    $(".mask-img").css("display","block");
		    $(".picture").css("display","block");     
		    $(".phone").attr("src",e.currentTarget.src);
		    if(e.currentTarget == images[0]){
		    	$(".left").css("display","none");
		    }else{
		    	$(".left").css("display","block");
		    }      
		    if(e.currentTarget == images[images.length-1]){
		    	$(".right").css("display","none");       
		    }else{
		    	$(".right").css("display","block");      
		    }
	    })
	    //左点击事件，当图片为第一张的时候左边的箭头点击图片隐藏
	    $(".left").on("click",function(){ 
	    	var imgSrc = $(".phone").attr("src");
	    	$(".right").css("display","block");    
	    	for(var i = 0 ; i<images.length; i++){   
	    		if(imgSrc == images[i].src){
	    			if(imgSrc == images[1].src){
	    				$(".left").css("display","none");
	    			}
		    		var j = i;
				    $(".phone").attr("src",images[j-1].src);
			    }
	   
	    	}
	    })
      　//右点击事件， 当图片为最后一张的时候右边箭头点击图片隐藏
	    $(".right").on("click",function(){
	    	var imgSrc = $(".phone").attr("src");
	    	$(".left").css("display","block");     
		    for(var i = 0 ; i<images.length; i++){       
			    if(imgSrc == images[i].src){
				    if(imgSrc == imgs[images.length-2].src){
				    	$(".right").css("display","none");
				    }
				    var j = i;
				    $(".phone").attr("src",images[j+1].src);
			    }
		    }
	    })
       
    }
    // seaImg();
})

