require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','ListView','WdatePicker','personal_sim','jquery.progressbar.min','searchdata'],function(){
$(function(){
	$("#topsearch").autocomplete(courses); //AutoComplete
	$(".progressBar").each(function(i,n){ $(n).progressBar(); });
	//申请延期
	$('.overlay_extension').nyroModal({
		width: 400
	});
	//退选
	$('.overlay_cancel').nyroModal({
		width: 300
	});
	$('.quit_confirm').nyroModal({
		width: 400
	});
	
	var getData = function(){
		$.ajax({
			 type: 'GET',
             dataType: 'json',
             url: G_URL['findstuexampaperindexbyid']+'?examPaperId=12&callback=',
             contentType: 'application/json;charset=UTF-8',
             success:function(data){
             	var list = data.list[0]; //获取
	            var tpl = new Ambow.XTemplate(
		      	'<div class="titlename">',
	            '<div class="namepositon"><span class="detailsname">{paperName}</span></div>',
	            '</div>',
	            '<div class="d_content">',
	            '<ul class="properties">',
	            //'<li>考试起止时间：<b>2010/11/11 12:34-2010/12/12 12:34</b></li>',
	            '<li>考试时长：<b>90分钟--没数据</b></li>',
	            '<li>满分：<b>{paperTotalScore}</b></li>',
	            '<li>最高得分：<b>没数据</b></li>',
	            //'<li>已测试/还可测：<b>0/3</b></li>',
	            //<!-- <li>状态：<b class="font_red">未开始</b></li --> 
	            '<div class="clearer"></div>',
	            '<li>答题说明：</li>',
	            '<li>&nbsp;</li>',
	            '<li class="p_cont">',
	            '{paperExplain}',
	            '</li>',
	            '<li>试题总数：<b>{topicCount}</b></li>',
	            '</ul>',
	            '<p>&nbsp;</p>',
	             '<tpl for="topicgrouplist">',
                '<div class="titlename">题组{#}名称{topicGroupName}</div>',       
                '<div class="table_header">',
                '共<b>{topicCountSum}</b>题，<b>{topicScoreSum}</b>分，答题时间：<b>{answerTime}</b>分钟',            
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
				'<tpl for="values.topicgrouptypelist">',
				'<td>{topicCount}</td>',
				'</tpl>',
				'</tr>',
				'<tr>',
				'<th>分值</th>',
				'<tpl for="values.topicgrouptypelist">',
				'<td>{topicScore}</td>',
				'</tpl>',
				'</tr>',     
                '</tbody>',
                '</table>',
                '</tpl>',
                '<p>&nbsp;</p>',
                '<div class="box-info">特别提示：<b class="font_red">考试过程中不允许返回上一页重新作答已经完成的题</b></div>',
                '<ul class="properties">',
				'<li>',
				'<span class="t_title"><a href="began_testing.html" target="_blank" class="start_learning_icon">开始测试</a></span>',
				'<span class="t_title"><span class="nostart_icon">开始测试</span></span>',
				'</li>',
				'<li>',
				'<span class="t_tyle"><span class="icon_view"></span></span>',
				'<span class="t_name"><a href="#">查看测评记录</a></span>',
				'<span class="t_tyle"><span class="icon_view"></span></span>',
				'<span class="t_name"><s class="font_gray">查看测评记录</s></span>',
				'<span class="t_tyle"><span class="icon_question"></span></span>',
				'<span class="t_name"><a href="#">填写调查问卷</a></span>',
				'<span class="t_tyle"><span class="icon_question"></span></span>',
				'<span class="t_name"><s class="font_gray">填写调查问卷</s></span>',
				'</li>',
				'</ul>', 
                '</div><div class="clearer"></div>'
	 
	 );
	 tpl.append(document.getElementById('js_details'),list); 	
             }
		
		});
	}
	getData();
	
	

});	
});
	
	
	
	
