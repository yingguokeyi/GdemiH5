// 入账记录
$( function () {
    $.ajax({
        url: domain_name_url + "/task",
        type: "GET",
        dataType: "jsonp", //指定服务器返回的数据类型
        data: {
            method: 'getTaskAccount',
            userId:4615,
            url_type:"task"
        },
        success: function(data) {
            var records = data.result.rs[0].result.result.rs;
            var accountingRecordsHtml = '';
            if(data.success == 1){//说明有数据
                for(var i =0 ; i<records.length; i++){
                        //获取时间
                        var  accountingTime = records[i].audit_time;
                        var startTimetm = "20" + accountingTime.substring(0, 2) + "-" + accountingTime.substring(2, 4) + "-" + accountingTime.substring(4, 6) + "  " + accountingTime.substring(6, 8) + ":" + accountingTime.substring(8, 10) + ":" + accountingTime.substring(10, 12);
                        accountingRecordsHtml +='<li>';
                        if(records[i].type == 1 ){//任务奖励

                            accountingRecordsHtml +='<div class="record_infor">';
                            accountingRecordsHtml +='<p class="infor_title">';
                            accountingRecordsHtml +='<span>任务奖励</span>';
                            accountingRecordsHtml +='<span>+'+(records[i].money/100).toFixed(2)+'</span>';
                            accountingRecordsHtml +='</p>';
                            accountingRecordsHtml +='<p class="record_time">'+startTimetm+'</p>';
                            accountingRecordsHtml +='<p class="record_plan">'+records[i].category_name+'，奖励<i>'+(records[i].money/100).toFixed(2)+'</i> 元</p>';
                            accountingRecordsHtml +='</div>';
                        }else if(records[i].type == 2){//下级返利

                            accountingRecordsHtml +='<div class="record_infor">';
                            accountingRecordsHtml +='<p class="infor_title">';
                            accountingRecordsHtml +='<span>下级返利</span>';
                            accountingRecordsHtml +='<span>+'+(records[i].money/100).toFixed(2)+'</span>';
                            accountingRecordsHtml +='</p>';
                            accountingRecordsHtml +='<p class="record_time">'+startTimetm+'</p>';
                            accountingRecordsHtml +='<p class="record_plan">下级：'+records[i].wx_nick_name+'完成任务为您返利 <i>'+(records[i].money/100).toFixed(2)+'</i> 元</p>';
                            accountingRecordsHtml +='</div>';
                            
                        }else if(records[i].type == 3){//邀请注册奖励

                            accountingRecordsHtml +='<div class="record_infor">';
                            accountingRecordsHtml +='<p class="infor_title">';
                            accountingRecordsHtml +='<span>邀请注册奖励</span>';
                            accountingRecordsHtml +='<span>+1.00</span>';
                            accountingRecordsHtml +='</p>';
                            accountingRecordsHtml +='<p class="record_time">'+startTimetm+'</p>';
                            accountingRecordsHtml +='<p class="record_plan">邀请好友'+records[i].wx_nick_name+'注册成功奖励 <i>'+(records[i].money/100).toFixed(2)+'</i> 元</p>';
                            accountingRecordsHtml +='</div>';

                        }
                            accountingRecordsHtml +='</li>';

                   

                }
                $('.withdrawal_record ul').html(accountingRecordsHtml);

            }
            
        }
    })
})