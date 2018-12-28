$(function(){
    var uri = localStorage.getItem('uri_goods');//拿到传过来的id
    var num='';
	$('#test1').click(function(){
		var test1 = document.getElementById('test1');
        test1.src="../../image/mine/registerc.png";
        $('.report_btn button').removeAttr('disabled');
        $('.report_btn button').css({'background':'#333','color':'#fff'});
        num=1;
        var n =  $(this).parent().siblings().find('img');
        for(var i=0;i<n.length;i++){
            n[i].src="../../image/mine/registernoc.png";
        }
	})
	$('#test2').click(function(){
		var test2 = document.getElementById('test2');
        test2.src="../../image/mine/registerc.png";
        $('.report_btn button').removeAttr('disabled');
        $('.report_btn button').css({'background':'#333','color':'#fff'});
        num=2;
        var n =  $(this).parent().siblings().find('img');
        for(var i=0;i<n.length;i++){
            n[i].src="../../image/mine/registernoc.png";
        } 
	})
	$('#test3').click(function(){
		var test3 = document.getElementById('test3');
        test3.src="../../image/mine/registerc.png";
        $('.report_btn button').removeAttr('disabled');
        $('.report_btn button').css({'background':'#333','color':'#fff'});
        num=3;
        var n =  $(this).parent().siblings().find('img');
        for(var i=0;i<n.length;i++){
            n[i].src="../../image/mine/registernoc.png";
        }
	})
    var remark=''
    $('#report_description').blur(function(){
        remark=document.getElementById("report_description").value;
        console.log(remark)
        if(remark!=''){
            $('.report_btn button').removeAttr('disabled');
            $('.report_btn button').css({'background':'#333','color':'#fff'});
        }
        
    })
    $('.report_btn button').click(function(){
        $.ajax({
            url: domain_name_url + "/task",
            type: "GET",
            dataType: "jsonp", //指定服务器返回的数据类型
            data: {
                method: 'addReport',
                userId:4599,
                taskId:uri,
                type: num,
                remarks:remark,
                url_type:'task'
            },
            success: function(data) {

            }
        })    
    })
	
})