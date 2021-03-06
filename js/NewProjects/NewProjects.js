var token = localStorage.getItem('token');
if(token == null) {
    layer.open({
        content: '请先登录',
        skin: 'msg',
        time: 2
    });
    var url = window.location.href;
    setTimeout("location.href='../member/login.html?url=" + url + "'", 1000);
    localStorage.setItem('url', window.location.href);

}else{
	//任务类型
	$('#cl_sel').click(function(){
		var test = document.getElementById('test');
        if(test.src.indexOf('down') >= 0){
            test.src="../../image/NewProjects/up.png";
        }else{
            test.src="../../image/NewProjects/down.png";
        }
        $(this).toggleClass("blue");
		$('.select_cont').toggle();
	})

	$('.select_cont ul li').click(function(){
		$(this).css("background",'#fafafa');
		$(this).siblings().css("background",'transparent');
		$('.mold').html($(this).html());
		var test = document.getElementById('test');
		test.src="../../image/NewProjects/down.png";
		$('#cl_sel').removeClass('blue');
		$('.select_cont').hide();
		var name = $(this).data('name');
		localStorage.setItem('name',$(this).data('name'));
	})
	//任务名称
	$('#task_name input').blur(function(){
		var taskName = $('#task_name input').val();
		localStorage.setItem('taskName',$('#task_name input').val())
	})
	//任务链接
	$('#task_link').blur(function(){
		var taskLink = $('#task_link').val();
		localStorage.setItem('taskLink',$('#task_link').val())
	})
	// 提交文字
	$('.task_mess').blur(function(){
		var taskMess = $('.task_mess').val();
		localStorage.setItem('taskMess',$('.task_mess').val())
	})
	// 帮助
	$('#task_help').click(function(){
		$('#modal_help').show();
	})
	$('.close').click(function(){
		$('#modal_help').hide();
	})
	// 添加任务步骤
	function adds(_this){
		var $this = $(_this); // _this是触发这个函数的元素节点，因为会使用两次，所以先把它提出来，减少js的查询次数，性能会更好一些
		var currentSign = Number($this.data('sign')) + 1;//步骤几
		var listHtml='';
			listHtml += '<div class="task_step">';
			listHtml += '<label class="step_name"><span class="require">*</span>任务步骤<i>'+currentSign+'</i>:</label>';
			listHtml += '<div class="task_div">';
			listHtml += '<input type="text" class="task_text" placeholder="请填写任务步骤说明" onblur="upperCase(this)" />';
			listHtml += '<img src="../../image/NewProjects/del.png" class="del">';
			listHtml += '</div>';
			listHtml += '<ul class="upload_pic" id="picOne'+currentSign+'">';
			listHtml += '<li>';
			listHtml += '<label class="upload_pictures">';
			listHtml += '<input class="fileInput" type="file"  accept="image/*" name="file" style="display:none;" onchange="javascript:setImagePreview(this);">';
			listHtml += '<img src="../../image/mine/unpload_smoal.png" class="add" />';
			// listHtml += '<p class="upolad_txt">最多三张</p>';
			listHtml += '<img class="preview" src="" width="100%" height="100%" style="display: none;"/>';
			listHtml += '</label>';
			listHtml += '</li>';
			listHtml += '<li>';
			listHtml += '<label class="upload_pictures">';
			listHtml += '<input class="fileInput" type="file"  accept="image/*" name="file" style="display:none;" onchange="javascript:setImagePreview(this);">';
			listHtml += '<img src="../../image/mine/unpload_smoal.png" class="add" />';
			listHtml += '<p class="upolad_txt">最多三张</p>';
			listHtml += '<img class="preview" src="" width="100%" height="100%" style="display: none;"/>';
			listHtml += '</label>';
			listHtml += '</li>';
			listHtml += '<li>';
			listHtml += '<label class="upload_pictures">';
			listHtml += '<input class="fileInput" type="file"  accept="image/*" name="file" style="display:none;" onchange="javascript:setImagePreview(this);">';
			listHtml += '<img src="../../image/mine/unpload_smoal.png" class="add">';
			listHtml += '<p class="upolad_txt">最多三张</p>';
			listHtml += '<img class="preview" src="" width="100%" height="100%" style="display: none;"/>';
			listHtml += '</label>';
			listHtml += '</li>';
			listHtml += '</ul>';
			listHtml += '<button type="button" class="add_btn" onclick="adds(this)" data-sign=' + currentSign + '><img src="../../image/NewProjects/add.png" />添加任务步骤</button>';
			listHtml += '</div>';
		$this.hide();
		$this.parent('.task_step').after(listHtml);
		// 点击叉号隐藏
		console.log($('.task_step').length);
		$('.del').click(function(){
			var sign = $(this).parents('.task_step').find('.add_btn').data('sign');
			console.log(sign);
			if(sign==$('.task_step').length){
				$(this).parents('.task_step').remove();
				$this.show();
				console.log($this,'11')
			}else{
				$(this).parents('.task_step').remove();
				// $this.hide();
				console.log($this,'22')
			}
			// console.log($this,'33')
		})
		seaImg();
	}
	var stepNum;
	var datas = {
	    // 'stepNum': {
	    //     description: '',
	    //     ids: []
	    // }
	}
	//任务步骤说明
	function upperCase(_this){
		var $this = $(_this);
		stepNum = $(_this).parents('.task_step').find('.add_btn').data('sign');
		var intVal = $this.val();
		console.log(intVal)
		if(!datas[stepNum]) datas[stepNum] = {};
        if(!datas[stepNum].description) datas[stepNum].description = [];
			datas[stepNum].description = intVal;
			console.log(datas)
			var dat = JSON.stringify(datas);
			// console.log(typeof dat)
			localStorage.setItem('taskConts',dat)
			// console.log(localStorage.getItem('taskConts'))
	}

	//下面用于步骤图片上传预览功能
	
	function setImagePreview(_this) {
	    //input
	    var fileInput = _this;
	    //img   
	    var imgPre = $(_this).siblings('img.preview');
	    //div
	    var imgDefault = $(_this).siblings('img.add');
	    var upolad_txt = $(_this).siblings('.upolad_txt');
	    //获取步骤几
	    stepNum = $(_this).parents('.task_step').find('.add_btn').data('sign');
		// console.log(stepNum)
	        if (fileInput.files && fileInput.files[0]) {
	            //火狐下，直接设img属性
	            var fileObject = fileInput.files[0];
	            if(fileObject.size/1024 > 3072){
	            	layer.open({
				        content: '上传图片要小于3M,请重新上传',
				        skin: 'msg',
				        time: 2
				    });
	            }else{
	            	imgPre
	                .show()
	                .attr('src', window.URL.createObjectURL(fileInput.files[0]));
		            imgDefault.hide();
		            upolad_txt.hide();
		            $(_this).attr('disabled',true);
		            receiptImg(fileInput);
	            }
	            
	        }
	    return true;
	}
	function receiptImg(fileInput) {
	    var formData = new FormData();
	    var fileObject = fileInput.files[0];
	    if(fileObject.size/1024 > 3072){//大于1M，进行压缩上传
	        // photoCompress(fileObject, {
	        //     quality: 0.2
	        // }, function(base64Codes){
	        //     //console.log("压缩后：" + base.length / 1024 + " " + base);
	        //     var bl = convertBase64UrlToBlob(base64Codes);
	        //     formData.append("file", bl, "file_"+Date.parse(new Date())+".jpg"); // 文件对象
	        //     formData.append("url_type","uploadImg");
	        // });
			
	    }else {
	        formData.append("file", fileObject);
	        formData.append("url_type","uploadImg");
	        $.ajax({
		        url: domain_name_url+"/uploadImg?method=uploadTaskImg",
		        type: "POST",
		        dataType: "json",
		        data: formData,
		        processData: false,
		        contentType: false,
		        success: function (data) {
		            if(data.success==1){
		                var id = data.result.rs[0].result.result.ids[0];
		                if(!datas[stepNum]) datas[stepNum] = {};
			                if (!datas[stepNum].ids) datas[stepNum].ids = [];
		    					datas[stepNum].ids.push(id);
		    					console.log(datas);
		    					var dat = JSON.stringify(datas);
								// console.log(typeof dat)
								localStorage.setItem('taskConts',dat)
								// console.log(localStorage.getItem('taskConts'))
		    					
	    			}
		        },
		        error: function (data) {
		        }
		    });
	    }
	   
	}
	

	//下面用于实例图片上传预览功能
	function setImagePreview1(_this) {
	    //input
	    var fileInput = _this;
	    //img   
	    var imgPre = $(_this).siblings('img.preview');
	    //div
	    var imgDefault = $(_this).siblings('img.add');
	    var upolad_txt = $(_this).siblings('.upolad_txt');
	        if (fileInput.files && fileInput.files[0]) {
	            //火狐下，直接设img属性
	            var fileObject = fileInput.files[0];
	            if(fileObject.size/1024 > 3072){
	            	layer.open({
				        content: '上传图片要小于3M,请重新上传',
				        skin: 'msg',
				        time: 2
				    });
	            }else{
		            imgPre
		                .show()
		                .attr('src', window.URL.createObjectURL(fileInput.files[0]));
		            imgDefault.hide();
		            upolad_txt.hide();
		            $(_this).attr('disabled',true);
		            receiptImg1(fileInput);
		        }    
	        }
	    return true;
	}
	var arrs=[];
	function receiptImg1(fileInput) {
	    var formData = new FormData();
	    var fileObject = fileInput.files[0];
	    if(fileObject.size/1024 > 3072){//大于1M，进行压缩上传
	        // photoCompress(fileObject, {
	        //     quality: 0.2
	        // }, function(base64Codes){
	        //     //console.log("压缩后：" + base.length / 1024 + " " + base);
	        //     var bl = convertBase64UrlToBlob(base64Codes);
	        //     formData.append("file", bl, "file_"+Date.parse(new Date())+".jpg"); // 文件对象
	        //     formData.append("url_type","uploadImg");
	        // });
	    }else {
	        formData.append("file", fileObject);
	        formData.append("url_type","uploadImg");
	        $.ajax({
		        url: domain_name_url+"/uploadImg?method=uploadTaskImg",
		        type: "POST",
		        dataType: "json",
		        data: formData,
		        processData: false,
		        contentType: false,
		        success: function (data) {
		            if(data.success==1){
		                var id = data.result.rs[0].result.result.ids[0];
		                arrs.push(id);
		                sStorage = window.localStorage; //本地存题目
						sStorage.arrs = arrs;
		        	}
		        },
		        error: function (data) {
		        }
		    });
	    }
	    
	}
	//点击图片放大
	function seaImg(){
	    $(".phone").on("click",function(e){
		    $(".mask-img").css("display","none");
		    $(".picture").css("display","none");      
	    })
	    var imgs = $('.preview')
	    var images;
	    imgs.on('click',function(e){
		    var father = (e.currentTarget).parentNode.parentNode.parentNode; //当前点击图片的父元素
		    var att = father.attributes.id.nodeValue; //父元素自己的属性id
		    var image = '#' + att + ' li label img.preview'
		    console.log(image)
		    images = $(image)  //jquery获取id下的所有img
		    console.log(images)
		    $(".mask-img").css("display","block");
		    $(".picture").css("display","block");     
		    $(".phone").attr("src",e.currentTarget.src);
		    console.log(e.currentTarget.src)
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
    seaImg();
    $('.next_step button').click(function(){
    	var mold = $('.mold').html();//任务类型
    	var tasksName = $('#task_name input').val();//任务链接
    	console.log(arrs);
    	console.log(datas);
    	if(mold=='请选择任务类型'){
    		layer.open({
		        content: '请填写任务类型',
		        skin: 'msg',
		        time: 2
		    });
		    return false;
    	}else if(tasksName == ''){
    		layer.open({
		        content: '请填写任务名称',
		        skin: 'msg',
		        time: 2
		    });
		    return false;
    	}else if(arrs.length==0){
    		layer.open({
		        content: '请填写审核示例图',
		        skin: 'msg',
		        time: 2
		    });
		    return false;
    	}else if(JSON.stringify(datas) == "{}"){
    		layer.open({
		        content: '请填写任务步骤',
		        skin: 'msg',
		        time: 2
		    });
		    return false;
    	}else{
    		location.href='task_designing.html';
    	}
    	
    })
    function photoCompress(file,w,objDiv){
	    var ready=new FileReader();
	    /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
	    ready.readAsDataURL(file);
	        ready.onload=function(){
	            var re=this.result;
	            canvasDataURL(re,w,objDiv)
	    }
	}
	function canvasDataURL(path, obj, callback){
	    var img = new Image();
	    img.src = path;
	    img.onload = function(){
	        var that = this;
	        // 默认按比例压缩
	        var w = that.width,
	            h = that.height,
	            scale = w / h;
	        w = obj.width || w;
	        h = obj.height || (w / scale);
	        var quality = 0.7;  // 默认图片质量为0.7
	        //生成canvas
	        var canvas = document.createElement('canvas');
	        var ctx = canvas.getContext('2d');
	        // 创建属性节点
	        var anw = document.createAttribute("width");
	        anw.nodeValue = w;
	        var anh = document.createAttribute("height");
	        anh.nodeValue = h;
	        canvas.setAttributeNode(anw);
	        canvas.setAttributeNode(anh);
	        ctx.drawImage(that, 0, 0, w, h);
	        // 图像质量
	        if(obj.quality && obj.quality <= 1 && obj.quality > 0){
	            quality = obj.quality;
	        }
	        // quality值越小，所绘制出的图像越模糊
	        var base64 = canvas.toDataURL('image/jpeg', quality);
	        // 回调函数返回base64的值
	        callback(base64);
	    }
	}
	function convertBase64UrlToBlob(urlData){
	    var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
	        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	    while(n--){
	        u8arr[n] = bstr.charCodeAt(n);
	    }
	    return new Blob([u8arr], {type:mime});
	}
}

