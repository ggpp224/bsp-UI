require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','ListView','WdatePicker','personal_sim','jquery.progressbar.min','searchdata','sticky'],function(){
$(function(){
	//设置全局变量
	var implementId = getQuery('implementId');
	var examPaperId = getQuery('examPaperId');
	var examDuration = getQuery('examDuration');  //获取考试时长
	var readingMode = getQuery('readingMode'); //阅卷模式
	var hasTest = getQuery('hasTest');//已考次数
	var status = getQuery('status');
	var displayMode = getQuery('displayMode');
	var perTopicNumber = getQuery('perTopicNumber');
	var isTopicRandom = getQuery('isTopicRandom');
	var isAnswerRandom = getQuery('isAnswerRandom');
	var paperName = '';
	$("#topsearch, #listsearch").autocomplete(courses); //AutoComplete
	//$('#floattime').stickyfloat({ duration: 100 });// 浮动时间条
	$('.quit_confirm').nyroModal({
		width: 400
	});


	var getData = function(){
		$.ajax({
			 type: 'GET',
             dataType: 'json',
             url: G_URL['findstuexampaperindexbyid']+'?examPaperId='+examPaperId+'&isTopicRandom='+isTopicRandom+'&isAnswerRandom='+isAnswerRandom+'&callback=',
             //url: G_URL['findstuexampaperindexbyid']+'?examPaperId=12&callback=',
             contentType: 'application/json;charset=UTF-8',
             success:function(data){
             	var list = data.list;
             	if(list!=''){
             	var list = data.list[0]; //获取
				paperName = list.paperName;
				for(var i in list.topicgrouplist){
					var _arr=[];
					_arr['topicCount']=[0,0,0,0,0,0,0,0];
					_arr['topicScore']=[0,0,0,0,0,0,0,0];
					for(var j in list.topicgrouplist[i]['topicgrouptypelist']){
						var v=list.topicgrouplist[i]['topicgrouptypelist'][j];
						_arr['topicCount'][v.topicTypeId-1]='<span style="color:red">'+v.topicCount+'</span>';
						_arr['topicScore'][v.topicTypeId-1]='<span style="color:red">'+v.topicScore+'</span>';
					}
					list.topicgrouplist[i]['newarr']=_arr;
				}

	            var tpl = new Ambow.XTemplate(
	            '<h2 class="begin_testing">{paperName}</h2>',
				'<table width="100%" border="0"  class="default_table surveytab">',
                '<tr>',
                '<td align="right" width="10%">考试时长：</td>',
                '<td width="14%"><b><span id="sc"></span>分钟</b></td>',
                '<td align="right" width="10%">满分：</td>',
                '<td width="14%"><b>{paperTotalScore}</b></td>',
                '<td align="right" width="10%">试题总数：</td>',
                '<td><b>{topicCount}</b></td>',
                '</tr>',
				'<tr id="pe">',

				//'<tpl if="paperExplain==\'null\'">',

              //  '</tpl>',
                '</tr>',

                '</table>',
	           	'<p>&nbsp;</p>',
	            '<tpl for="topicgrouplist">',
                '<div class="titlename"><span style="display:none">题组{#}名称</span>{topicGroupName}</div>',
                '<div class="table_header">',
//                '共<b>{topicCountSum}</b>题，<b>{topicScoreSum}</b>分，答题时间：<b>{answerTime}</b>分钟',
                '共<b>{topicCountSum}</b>题，<b>{topicScoreSum}</b>分',
                '</div>',
                '<table width="100%" border="0"  class="default_table listtab">',
                '<thead class="gradual_bg">',
                '<tr>',
                '<th>题型</th>',
				'<th>单项选择题</th>',
				'<th>多项选择题</th>',
				'<th>判断题</th>',
				'<th>匹配题</th>',
				'<th>排序题</th>',
				'<th>填空题</th>',
				'<th>简答题</th>',
				'<th>论述题</th>',
                '</tr>',
                '</thead>',
                '<tbody>',
				'<tr>',
				'<th>数量</th>',
				'<tpl for="values.newarr.topicCount">',
				'<td>{.}</td>',
				'</tpl>',
				'</tr>',
				'<tr>',
				'<th>分值</th>',
				'<tpl for="values.newarr.topicScore">',
				'<td>{.}</td>',
				'</tpl>',
				'</tr>',
                '</tbody>',
                '</table>',
                '</tpl>',
                '<p>&nbsp;</p>',
                '<div class="box-info">特别提示：<b class="font_red">考试过程中不允许返回上一页重新作答已经完成的题</b></div>',
                '<p class="bottomoperation">',
                '<input type="submit" class="btn btn_submit" id="beginExam" value=" 立即开始考试 "/>&nbsp;',
                '<input onclick="window.close();" type="button" class="btn btn_reset"  value=" 取消 "/>',
                '</p>'
	            );
			tpl.append(document.getElementById('js_details'),list);
			if(list.paperExplain!='null'){
				var ss ='<td align="right" valign="top">答题说明：</td><td colspan="5"><span id="explain">'+list.paperExplain+'</span></td>';
				$('#pe').html(ss);
			}
			$('#sc').html(examDuration);
			if(list.paperExplain==null){
				$('#explain').html('');
			}
			if(status==0){
				$('#beginExam').addClass('gray');
			}
            }
            }
        });
	}
    getData();
    var params = {};
    params = {

        "implementId": implementId,
    	"userAccountId": G_USER.id,
        "examPaperId": examPaperId,
        "examNumber": hasTest
    }
	var insertExam = function(){
		$.ajax({
			 type: 'POST',
			 data:Ambow.encode(params),
             dataType: 'json',
           	 url: G_URL['addexamuserlog'],
           	 contentType:'application/json;charset=UTF-8',
           	 success:function(data){         	 
	           	 	if(data.returnCode=='000000'){
	           	 		return true
	           	 	}else{
	           	 		return false;
	           	 	}
           	 }
        });
	}
	$('#beginExam').live('click',function(){
		if(status==1){				
			insertExam();						
				window.location.href = 'testing_page.html?implementId='+implementId+'&examPaperId='+examPaperId+'&examDuration='+examDuration+'&readingMode='+readingMode+'&paperName='+encodeURI(paperName)+'&displayMode='+displayMode+'&perTopicNumber='+perTopicNumber+'&isTopicRandom='+isTopicRandom+'&isAnswerRandom='+isAnswerRandom+'&hasTest='+hasTest;
		}
	});
});
});