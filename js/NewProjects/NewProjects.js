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