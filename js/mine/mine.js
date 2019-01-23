
// 获取token
window.jsel = JSONSelect;
var tokenMark = localStorage.getItem('token');//拿到传过来的token
if(tokenMark == null) {
    layer.open({
        type: 1,
        content: $('.warm').html(),
        anim: 'up',
        scrollbar: false,
        shadeClose: false,
        style: 'position:fixed;bottom:50%;left: 8%; right:8%;height: auto;border:none;border-radius:6px'
    });
    $(document).on("click", ".warm_login", function(){
        var url = window.location.href;
        setTimeout("location.href='../member/login.html?url=" + url + "'", 1000);
        localStorage.setItem('url', window.location.href);
    });
    $(document).on("click", ".warm_cancel", function() {
        layer.closeAll('page');
    });
}else{

    // 轮播图
    var swiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        observer: true, //调完接口不能翻页解决方法，修改swiper自己或子元素时，自动初始化swiper  
        observeParents: true, //调完接口不能翻页解决方法，修改swiper的父元素时，自动初始化swiper 

    });
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


        
    // 调数据
    $(function (){
        $.ajax({
            url: domain_name_url + "/hUser",
            type: "GET",
            dataType: "jsonp", //指定服务器返回的数据类型
            data: {
                method: 'getUserInfo',
                token:tokenMark,
                url_type:"hUser"
            },
            success: function(data) {
                var headRsd = data.result.rs[0].result.hMember.result.rs[0];//我的名字，我的ID号
                var asset =  data.result.rs[0].result.userWallet.result.rs[0];//当前资产
                var team = data.result.rs[0].result.lowerCount;//我的团队人数            
                // 头部头像，id
                if( data.success ==1){
                        var headerHtml ='';
                        headerHtml +='<li class="first">';
                        if(headRsd.image =''){
                       
                        headerHtml +='<label class="upload_pictures" id="localImag1">';
                        headerHtml +='<input class="fileInput" id="doc1" type="file"  accept="image/*" name="file" style="display:none;" onchange="javascript:setImagePreview1();" />';
                        headerHtml +='<img src="../../image/mine/tt.png" class="add" id="add1">';
                        headerHtml +='<img id="preview1" src="" width="100%" height="100%" style="display: none;"/>';
                        headerHtml +='</label>';
                        }else{
                       
                        headerHtml +='<label class="upload_pictures" id="localImag1">';
                        headerHtml +='<input class="fileInput" id="doc1" type="file"  accept="image/*" name="file" style="display:none;" onchange="javascript:setImagePreview1();" />';
                        headerHtml +='<img src='+headRsd.image+' class="add" id="add1">';
                        headerHtml +='<img id="preview1" src="" width="100%" height="100%" style="display: none;"/>';
                        headerHtml +='</label>';
                        
                        }
                        headerHtml +='</li>';
                  
                        headerHtml +='<li class="second">';
                        headerHtml +='<p><a id="fir_per" style="color: #333;"  href="membership.html"><span id="set_nickname">'+headRsd.real_name+'</span>&nbsp;&nbsp;<i>(ID'+headRsd.Invitation_code+')</i></a><button class="copy" data-clipboard-action="copy" data-clipboard-target="i">复制</button></p>';
                        headerHtml +='<p class="rank">普通会员</p>';
                        headerHtml +='</li>';
                    // $('.main_top .hea_ul .first').after(headerHtml);
                    $('.main_top .hea_ul').html(headerHtml);
                    // 团队，资产
                    var capitalHtml='';
                    capitalHtml +='<li>';
                    capitalHtml +='<p>'+(asset.balance/100).toFixed(2)+'元</p>';
                    capitalHtml +='<p>当前资产</p>';
                    capitalHtml +='<div class="mid_line"></div>';
                    capitalHtml +='</li>';
                    capitalHtml +='<li>';
                    capitalHtml +='<p>'+team+'人</p>';
                    capitalHtml +='<p>我的团队</p>';
                    capitalHtml +='</li>';
                    $('.main_middle ul').html(capitalHtml);

                }else if(data.success ==2){
                    var lurl = window.location.href;
                    var url = localStorage.getItem('url');
                    window.location.href='../member/login.html';
                }
            }
        })


    })
    // 上传图片
    var myArray=new Array();
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
                receiptImg1();
                ctrlId();//保存图像
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
                } catch(e) {
                    alert("您上传的图片格式不正确，请重新选择!");
                    return false;
                }
                receiptImg1();
                ctrlId();//保存图像
                imgObjPreview1.style.display = 'none';
                document.selection.empty();
            }
        return true;
    }

    var ids1 ='';//图片id

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
            async: false,//添加这个就是异步
            success: function (data) {
                if(data.success==1){
                    ids1 = data.result.rs[0].result.result.ids[0];
                    myArray.push(ids1);
                }
                console.log("sendImg",data.result);
            },
            error: function (data) {
                console.log("sendImg",data.result)
            }
        });
    }

    // 保存图片
    function ctrlId(){
        console.log('kdjwe')
        console.log(ids1)
        $.ajax({
            url: domain_name_url + "/hUser",
            type: "GET",
            dataType: "jsonp", //指定服务器返回的数据类型
            data: {
                method:'updateHeadImgId',
                token:tokenMark,
                headImgId:ids1,
                url_type:"hUser"
            },
            success: function(data) {
                console.log(data,'yu')
            }
        });

    }
}    