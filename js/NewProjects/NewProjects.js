$(function(){
	$('#cl_sel').click(function(){
		$('.select_cont').toggle();
	})
	$('.select_cont ul li').click(function(){
		$('.mold').html($(this).html());
		$('.select_cont').hide();
	})
	// 帮助
	$('#task_help').click(function(){
		$('#modal_help').show();
	})
	$('.close').click(function(){
		$('#modal_help').hide();
	})

})
var currentSign;
function adds(_this){
	var $this = $(_this); // _this是触发这个函数的元素节点，因为会使用两次，所以先把它提出来，减少js的查询次数，性能会更好一些
	currentSign = Number($this.data('sign')) + 1;//步骤几
	var listHtml='';
		listHtml += '<div class="task_step">';
		listHtml += '<label class="step_name"><span class="require">*</span>任务步骤<i>'+currentSign+'</i>:</label>';
		listHtml += '<div class="task_div">';
		listHtml += '<input type="text" class="task_text" placeholder="请填写任务步骤说明" />';
		listHtml += '<img src="../../image/NewProjects/del.png" class="del">';
		listHtml += '</div>';
		listHtml += '<ul class="upload-ul" id="uploadUL'+currentSign+'">';
		listHtml += '<li class="upload-li" id="uploadBtn">';
		listHtml += '<form class="img-input-form" enctype="multipart/form-data"  style="opacity: 0;">';
		listHtml += '<input type="file" accept="image/*" capture="camera" multiple onchange="selectImage(this)" id="upload" >';
		listHtml += '</form>';
		listHtml += '<div class="item">';
		listHtml += '<img src="../../image/mine/unpload_smoal.png" class="add">';
		listHtml += '<p class="upolad_txt">最多三张</p>';
		listHtml += '</div>';
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
			$(this).parents('.task_step').hide();
			$this.show();
		}else{
			$(this).parents('.task_step').hide();
			$this.hide();
		}
	})
}
// 任务步骤上传图片
var uploadImgIndex = 0;
var imgArr = [];
function init(){
	var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if(isiOS){
        document.getElementById("upload").removeAttribute("capture","camera");
    }
}
function selectImage(imgFile){
    var allFile = imgFile.files;
    var totalLen = allFile.length;
    if(yValidate.checkNotEmpty(imgArr) && imgArr.length>0){
        totalLen = totalLen + imgArr.length;
    }
    if(totalLen>3){
        alert("只能上传3张图片");
        return;
    }
    for(var i=0;i<allFile.length;i++){
        var file = allFile[i];
        if(yValidate.checkNotEmpty(imgArr) && imgArr.length>0){
            if(imgArr.length <3){
                imgArr.push(file);
            }
        }else{
            imgArr.push(file);
        }
        //添加一层过滤
        var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
        if(!rFilter.test(file.type)) {
            alert("文件格式必须为图片");
            return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file); //用文件加载器加载文件
        //文件加载完成
        reader.onload = function(e) {
            //计算最后一个窗口right边距，当时处于第4个的时候，right=0
            if((allFile.length + 1)%3 == 0){
                document.getElementById("uploadBtn").style.marginRight = "0px";
            }
            //以下就是将所有上传的图片回显到页面上，如果需要用canvas进行剪裁再回显以下代码就放入到canvas中
            var li = document.createElement('li');
            li.id = "upload_"+uploadImgIndex;
            document.getElementById("uploadBtn").style.display = "";
            uploadImgIndex++;
            li.className = "upload-li";
            li.innerHTML = '<div class="item image">'+
                '<img class="upload-image" src="'+e.target.result+'"/>'+
                '</div>';
            document.getElementById("uploadUL").insertBefore(li, document.getElementById("uploadBtn"));
            // $('#uploadUL'+currentSign).html(li,$('#uploadBtn'))
            var uploadArr = document.getElementById("uploadUL").querySelectorAll("li");
            var len = uploadArr.length ;
            if(len > 3){
                document.getElementById("uploadBtn").style.display = "none";
            }
        };
    }
}

function fileUpload(){
    var param = new FormData();
    for(var i=0; i<imgArr.length;i++){
        param.append('file[]', imgArr[i], i);
    }
    param.append("orderId", req.id);
    param.append("userId", bxUserData.id);
    // $("body").mLoading("show");
    // $.ajax({
    //     url:url,
    //     type:'POST',
    //     data:param,
    //     async: false,
    //     cache: false,
    //     contentType: false,
    //     processData: false,
    //     success:function(data){
    //         $("body").mLoading("hide");
            
    //     },
    //     error:function(){
    //         $("body").mLoading("hide");
    //         alert(res.description || res.message || "上传失败");
    //     }
    // });
}
init();
