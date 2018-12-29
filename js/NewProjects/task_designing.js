$(function(){
	// 帮助
	$('#task_help').click(function(){
		$('#modal_help').show();
	})
	$('.close').click(function(){
		$('#modal_help').hide();
		$('#modal_timer').hide();
		$('#modal_cycle').hide();
	})
	// 任务限时
	$('#timer').click(function(){
		$('#modal_timer').show();
	})
	//审核周期
	$('#cycle').click(function(){
		$('#modal_cycle').show();
	})
})