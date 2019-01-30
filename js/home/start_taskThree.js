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
            var fileObject = docObj1.files[0];
            if(fileObject.size/1024 > 3072){
                layer.open({
                    content: '上传图片要小于3M,请重新上传',
                    skin: 'msg',
                    time: 2
                });
            }else{
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
            }    
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
            var fileObject = docObj2.files[0];
            if(fileObject.size/1024 > 3072){
                layer.open({
                    content: '上传图片要小于3M,请重新上传',
                    skin: 'msg',
                    time: 2
                });
            }else{
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
            }    
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
            var fileObject = docObj3.files[0];
            if(fileObject.size/1024 > 3072){
                layer.open({
                    content: '上传图片要小于3M,请重新上传',
                    skin: 'msg',
                    time: 2
                });
            }else{
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
            }    
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
var token = localStorage.getItem('token');
var source = localStorage.getItem('source');
var arr2img = localStorage.getItem('sArr2');//任务提交示例图
if(source==1){
    $('.sub_img').show();
    $('.sub_message').show();
    if(arr2img!=null){
        var arr2imgs = arr2img.split(",");
        var imgsListHtml = '';
        for (var i = 0; i < arr2imgs.length; i++) {
            imgsListHtml += '<li><img src='+arr2imgs[i]+'></li>';
        };
        $('.sample_picture').html(imgsListHtml);
    }
    $('.message').blur(function(){
        var mess_txt = $(this).val();
    })
}
$('#sure').click(function(){
    var ids = myArray.join();
    var tips_words = $('.message').val();
    $.ajax({
        url: domain_name_url + "/hUser",
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        data: {
            method: 'submitTask',
            token: token,
            taskId:uri,
            taskImgIds:ids,
            tips_words:tips_words,
            url_type:"hUser"
        },
        success: function(data) {
            if(data.success==1){
                location.href = 'index.html';
            }
        }
    })    
})


var money = localStorage.getItem('cash');//奖励钱
var Stime = localStorage.getItem('s_time');//开始时间
var Etime = localStorage.getItem('e_time');//结束时间
$('.quest_rewards i').html(money+'元');
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
