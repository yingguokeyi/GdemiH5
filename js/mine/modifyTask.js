var token = localStorage.getItem('token');
var theTitleName =localStorage.getItem('slogan');//标题名字
var category = localStorage.getItem('equation');//类型
var chaining = localStorage.getItem('endingTime');//链接
var struct = localStorage.getItem('typedef');//类型说明
var ico = localStorage.getItem('genre');//类型图片
var rImg = localStorage.getItem('checkk');//审核图片
console.log(theTitleName,category,struct,chaining,ico,rImg,'标题名字')
if(category==1){
	$('.mold').html('电商');//任务类型
}
if(category==2){
	$('.mold').html('浏览');//任务类型
}
if(category==3){
	$('.mold').html('信用卡');//任务类型
}
if(category==4){
	$('.mold').html('下载注册');//任务类型
}
if(category==5){
	$('.mold').html('关注加粉');//任务类型
}
if(category==6){
	$('.mold').html('投票砍价');//任务类型
}
if(category==7){
	$('.mold').html('分享转发');//任务类型
}
if(category==8){
	$('.mold').html('多天任务');//任务类型
}
if(category==9){
	$('.mold').html('高价任务');//任务类型
}
if(category==10){
	$('.mold').html('更多任务');//任务类型
}

$('#task_name input').val(theTitleName);//任务名称
$('#task_link').val(chaining);//任务链接
// 审核示例图
var aduArr = [];
aduArr.push(rImg);
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
            imgPre
                .show()
                .attr('src', window.URL.createObjectURL(fileInput.files[0]));
            imgDefault.hide();
            upolad_txt.hide();
            $(_this).attr('disabled',true);
            receiptImg(fileInput);
        }
    return true;
}
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
            $(_this).attr('disabled',true);
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
                sStorage = window.localStorage; //本地存题目
				sStorage.arr = arr;
        	}
        },
        error: function (data) {
        }
    });
}
$('.next_step button').click(function(){
	var mold = $('.mold').html();//任务类型
	var tasksName = $('#task_name input').val();//任务链接
	console.log(arr);
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
	}else if(arr.length==0){
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
		location.href='modifyDesign.html';
	}
	
})


