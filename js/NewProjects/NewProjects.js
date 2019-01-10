var token = localStorage.getItem('token');
if(token==null){
	layer.open({
		type: 1,
		content: $('.warm').html(),
		anim: 'up',
		scrollbar: false,
		shadeClose: false,
		style: 'position:fixed;bottom:50%;left: 8%; right:8%;height: auto;border:none;border-radius:6px'
	});
	$(document).on("click", ".warm_login", function(){
		window.location.href = '../member/login.html';
	});
	$(document).on("click", ".warm_cancel", function() {
		layer.closeAll('page');
	});
}else{
	var name;
	$('#cl_sel').click(function(){
		$('.select_cont').toggle();
	})
	$('.select_cont ul li').click(function(){
		$('.mold').html($(this).html());
		$('.select_cont').hide();
		name = $(this).data('name');
		localStorage.setItem('name',$(this).data('name'));
		// console.log(name);
	})
	// 帮助
	$('#task_help').click(function(){
		$('#modal_help').show();
	})
	$('.close').click(function(){
		$('#modal_help').hide();
	})
	function adds(_this){
		var $this = $(_this); // _this是触发这个函数的元素节点，因为会使用两次，所以先把它提出来，减少js的查询次数，性能会更好一些
		var currentSign = Number($this.data('sign')) + 1;//步骤几
		var listHtml='';
			listHtml += '<div class="task_step">';
			listHtml += '<label class="step_name"><span class="require">*</span>任务步骤<i>'+currentSign+'</i>:</label>';
			listHtml += '<div class="task_div">';
			listHtml += '<input type="text" class="task_text" placeholder="请填写任务步骤说明" />';
			listHtml += '<img src="../../image/NewProjects/del.png" class="del">';
			listHtml += '</div>';
			listHtml += '<ul class="upload_pic">';
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
		$('.del').click(function(){
			var sign = $(this).parents('.task_step').find('.add_btn').data('sign');
			// console.log(sign);
			if(sign===$('.task_step').length){
				$(this).parents('.task_step').remove();
				$this.show();
			}else{
				$(this).parents('.task_step').remove();
				$this.hide();
			}
		})
	}
	//下面用于步骤图片上传预览功能
	var stepNum = '';
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
	            imgPre
	                .show()
	                .attr('src', window.URL.createObjectURL(fileInput.files[0]));
	            imgDefault.hide();
	            upolad_txt.hide();
	            receiptImg(fileInput);
	        }
	    return true;
	}

	var datas = {
	    'stepNum': {
	        description: '',
	        ids: []
	    }
	    
	}
	$('.task_text').blur(function(){
		var task_text = $('.task_text').val();
		if(!datas[stepNum]) datas[stepNum] = [];
        if (!datas[stepNum].description) datas[stepNum].description = '';
		datas[stepNum].description=task_text;
		console.log(datas[stepNum].description);
		console.log(task_text);
	})
	function receiptImg(fileInput) {
	    var formData = new FormData();
	    var fileObject = fileInput.files[0];
	    if(fileObject.size/1024 > 1025){//大于1M，进行压缩上传
	        photoCompress(fileObject, {
	            quality: 0.2
	        }, function(base64Codes){
	            //console.log("压缩后：" + base.length / 1024 + " " + base);
	            var bl = convertBase64UrlToBlob(base64Codes);
	            formData.append("file", bl, "file_"+Date.parse(new Date())+".jpg"); // 文件对象
	            formData.append("url_type","uploadImg");
	        });
	    }else {
	        formData.append("file", fileObject);
	        formData.append("url_type","uploadImg");
	    }
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
	                if(!datas[stepNum]) datas[stepNum] = []
		                if (!datas[stepNum].ids) datas[stepNum].ids = [];
	    					datas[stepNum].ids.push(id);
	    					console.log(datas[stepNum])
    				}	
	            
	            // console.log("sendImg",data.result);
	        },
	        error: function (data) {
	            // console.log("sendImg",data.result)
	        }
	    });
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
	            imgPre
	                .show()
	                .attr('src', window.URL.createObjectURL(fileInput.files[0]));
	            imgDefault.hide();
	            upolad_txt.hide();
	            receiptImg1(fileInput);
	        }
	    return true;
	}
	var arr=[];
	function receiptImg1(fileInput) {
	    var formData = new FormData();
	    var fileObject = fileInput.files[0];
	    if(fileObject.size/1024 > 1025){//大于1M，进行压缩上传
	        photoCompress(fileObject, {
	            quality: 0.2
	        }, function(base64Codes){
	            //console.log("压缩后：" + base.length / 1024 + " " + base);
	            var bl = convertBase64UrlToBlob(base64Codes);
	            formData.append("file", bl, "file_"+Date.parse(new Date())+".jpg"); // 文件对象
	            formData.append("url_type","uploadImg");
	        });
	    }else {
	        formData.append("file", fileObject);
	        formData.append("url_type","uploadImg");
	    }
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
	                arr.push(id);
	                console.log(arr)
	            // console.log("sendImg",data.result);
	        	}
	        },
	        error: function (data) {
	            // console.log("sendImg",data.result)
	        }
	    });
	}
}

