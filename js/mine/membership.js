$(function(){
	var myPro = $("#my_province em").html();
	var myCity = $("#my_city em").html();
	var myArea = $("#my_area em").html();
	sStorage = window.localStorage;
	sStorage.myProx = myPro;
	sStorage.myCityx = myCity;
	sStorage.myAreax = myArea;
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
})
