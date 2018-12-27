// var arr=[];
var myArray=new Array();
//下面用于图片上传预览功能
function setImagePreview1(avalue) {
    //input
    var docObj1 = document.getElementById("doc1");
    //img
    var imgObjPreview1 = document.getElementById("preview1");
    //div
    var divs1 = document.getElementById("localImag1");
    var add1 = document.getElementById("add1");
        if (docObj1.files && docObj1.files[0]) {
            //火狐下，直接设img属性
            imgObjPreview1.style.display = 'block';
            imgObjPreview1.style.width = '100%';
            imgObjPreview1.style.height = '100%';
            //imgObjPreview.src = docObj.files[0].getAsDataURL();
            //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
            imgObjPreview1.src = window.URL.createObjectURL(docObj1.files[0]);
            add1.style.display="none";
            $('.upolad_txt').hide();
            $("#sub_task").removeAttr("disabled");
			$('#sub_task').css({'background':'#333','color':'#fff'});
            receiptImg1();
        } else {
            //IE下，使用滤镜
            docObj1.select();
            var imgSrc = document.selection.createRange().text;
            var localImagId1= document.getElementById("localImag1");
            //必须设置初始大小
            localImagId1.style.width = "100%";
            localImagId1.style.height = "100%";
            //图片异常的捕捉，防止用户修改后缀来伪造图片
            try {
                localImagId1.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                localImagId1.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
                add1.style.display="none";
                $('.upolad_txt').hide();
                $("#sub_task").removeAttr("disabled");
				$('#sub_task').css({'background':'#333','color':'#fff'});
            } catch(e) {
                alert("您上传的图片格式不正确，请重新选择!");
                return false;
            }
            receiptImg1();
            imgObjPreview1.style.display = 'none';
            document.selection.empty();
        }
    return true;
}
function receiptImg1() {
    var formData = new FormData();
    var img_file = document.getElementById("doc1");
    var fileObject = img_file.files[0];
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
                var ids1 = data.result.rs[0].result.result.ids[0];
                myArray.push(ids1);
                console.log(myArray);
            }
            console.log("sendImg",data.result);
        },
        error: function (data) {
            console.log("sendImg",data.result)
        }
    });
}
function setImagePreview2(avalue) {
    //input
    var docObj2 = document.getElementById("doc2");
    //img
    var imgObjPreview2 = document.getElementById("preview2");
    //div
    var divs2 = document.getElementById("localImag2");
    var add2 = document.getElementById("add2");
        if (docObj2.files && docObj2.files[0]) {
            //火狐下，直接设img属性
            imgObjPreview2.style.display = 'block';
            imgObjPreview2.style.width = '100%';
            imgObjPreview2.style.height = '100%';
            //imgObjPreview.src = docObj.files[0].getAsDataURL();
            //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
            imgObjPreview2.src = window.URL.createObjectURL(docObj2.files[0]);
            add2.style.display="none";
            $('.upolad_txt').hide();
            $("#sub_task").removeAttr("disabled");
			$('#sub_task').css({'background':'#333','color':'#fff'});
            receiptImg2();
        } else {
            //IE下，使用滤镜
            docObj2.select();
            var imgSrc = document.selection.createRange().text;
            var localImagId2= document.getElementById("localImag2");
            //必须设置初始大小
            localImagId2.style.width = "100%";
            localImagId2.style.height = "100%";
            //图片异常的捕捉，防止用户修改后缀来伪造图片
            try {
                localImagId2.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                localImagId2.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
                add2.style.display="none";
                $('.upolad_txt').hide();
                $("#sub_task").removeAttr("disabled");
				$('#sub_task').css({'background':'#333','color':'#fff'});
            } catch(e) {
                alert("您上传的图片格式不正确，请重新选择!");
                return false;
            }
            receiptImg2();
            imgObjPreview2.style.display = 'none';
            document.selection.empty();
        }
    return true;
}
function receiptImg2() {
    var formData = new FormData();
    var img_file = document.getElementById("doc2");
    var fileObject = img_file.files[0];
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
                var ids2 = data.result.rs[0].result.result.ids[0];
                myArray.push(ids2);
                console.log(myArray);
            }
            console.log("sendImg",data.result);
        },
        error: function (data) {
            console.log("sendImg",data.result)
        }
    });
}
function setImagePreview3(avalue) {
    //input
    var docObj3 = document.getElementById("doc3");
    //img
    var imgObjPreview3 = document.getElementById("preview3");
    //div
    var divs3 = document.getElementById("localImag3");
    var add3 = document.getElementById("add3");
        if (docObj3.files && docObj3.files[0]) {
            //火狐下，直接设img属性
            imgObjPreview3.style.display = 'block';
            imgObjPreview3.style.width = '100%';
            imgObjPreview3.style.height = '100%';
            //imgObjPreview.src = docObj.files[0].getAsDataURL();
            //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
            imgObjPreview3.src = window.URL.createObjectURL(docObj3.files[0]);
            add3.style.display="none";
            $('.upolad_txt').hide();
            $("#sub_task").removeAttr("disabled");
			$('#sub_task').css({'background':'#333','color':'#fff'});
            receiptImg3();
        } else {
            //IE下，使用滤镜
            docObj3.select();
            var imgSrc = document.selection.createRange().text;
            var localImagId3= document.getElementById("localImag3");
            //必须设置初始大小
            localImagId3.style.width = "100%";
            localImagId3.style.height = "100%";
            //图片异常的捕捉，防止用户修改后缀来伪造图片
            try {
                localImagId3.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                localImagId3.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
                add3.style.display="none";
                $('.upolad_txt').hide();
                $("#sub_task").removeAttr("disabled");
				$('#sub_task').css({'background':'#333','color':'#fff'});
            } catch(e) {
                alert("您上传的图片格式不正确，请重新选择!");
                return false;
            }
            receiptImg3();
            imgObjPreview3.style.display = 'none';
            document.selection.empty();
        }
    return true;
}
function receiptImg3() {
    var formData = new FormData();
    var img_file = document.getElementById("doc3");
    var fileObject = img_file.files[0];
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
                var ids3 = data.result.rs[0].result.result.ids[0];
                myArray.push(ids3);
                console.log(myArray);
            }
            console.log("sendImg",data.result);
        },
        error: function (data) {
            console.log("sendImg",data.result)
        }
    });
}
$('#sub_task').click(function(){
	$('#modal_start').show();
	$('.close').click(function(){
		$('#modal_start').hide();
	})
})
var uri = localStorage.getItem('uri_goods');//拿到传过来的id
$('#sure').click(function(){
    var ids = myArray.join();
     $.ajax({
        url: domain_name_url + "/task",
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        data: {
            method: 'submitTask',
            userId: 4623,
            taskId:uri,
            taskImgIds:ids,
            url_type:"task"
        },
        success: function(data) {
            if(data.success==1){
                location.href = '../makeEveryDay/makeEveryDay.html';
            }
        }
    })    
})
$(function(){
    var money = localStorage.getItem('money');//奖励钱
    var Stime = localStorage.getItem('s_time');//开始时间
    var Etime = localStorage.getItem('e_time');//结束时间
    var smoney = (money/100).toFixed(2);
    $('.quest_rewards i').html(smoney+'元');
    // 开始时间的总秒数
    var startTimetm = "20" + Stime.substring(0, 2) + "/" + Stime.substring(2, 4) + "/" + Stime.substring(4, 6) + " " + Stime.substring(6, 8) + ":" + Stime.substring(8, 10) + ":" + Stime.substring(10, 12);
    var startDate = new Date(startTimetm).getTime();
    // 结束时间的总秒数
    sekillEndTime = "20" + Etime.substring(0, 2) + "/" + Etime.substring(2, 4) + "/" + Etime.substring(4, 6) + " " + Etime.substring(6, 8) + ":" + Etime.substring(8, 10) + ":" + Etime.substring(10, 12);
    var endTDate = new Date(sekillEndTime).getTime();
    //获取当前时间
    var currentDate = new Date();
    currentDate = currentDate.getTime();
    //时间段要注意两种情况一种是刚进来就已经开始倒计时，还有就是到页面还没有倒计时，就用结束的时间减去当前的时间
    var totalSecond;
    if (startDate < currentDate  && currentDate <= endTDate) {//已经在倒计时了
        totalSecond = parseInt((endTDate - currentDate) / 1000);
        setTimeout(function () {//已经在倒计时了
            countdown(totalSecond)
        },1000)
    }
    
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
                },1000)
                
            }else{
         
            }
        }.bind(that) ,1000);

    }
})