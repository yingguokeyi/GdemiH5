$(function() {
	var wait = $(".second").html();
	timeOut();
	/**
	 * 实现倒计时
	 */
	function timeOut() {
		if(wait != 0) {
			setTimeout(function() {
				$('.second').text(--wait);
				timeOut();
			}, 1000);
		}
	}
	$('#step_btn').click(function(){
		window.location.href='../mine/taskManager.html';
	})
});