require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','ListView','WdatePicker','common'],function(){
$(function(){
		var id = getQuery('id');
		var getData = function(){
		$.ajax({
			 type: 'GET',
             dataType: 'json',
             url: G_URL['findstuexampaperindexbyid']+'?examPaperId='+id+'&callback=&_dc='+new Date().valueOf()+"&isTopicRandom=0&isAnswerRandom=0",
             contentType: 'application/json;charset=UTF-8',
             success:function(data){
             	
             	var str = Ambow.encode(data);
             	var re = /null|undefined/g;
				str = str.replace(re,'""');
				var data = Ambow.decode(str);
             	var list = data.list[0];
             	var topicgrouplist = list.topicgrouplist;
             	var html = '',menu = '';
             	 html += '<div style=line-height:25px;padding-bottom:15px;>';
				 html += '<div>试卷名称：'+list.paperName+'&nbsp; &nbsp; &nbsp; &nbsp;<br>';
				 html += '答题时间：'+list.groupAnswerTime+'&nbsp; &nbsp; &nbsp; &nbsp; ';
				 if(list.paperExplain!='null'){
				  html += '<br>试卷说明：'+list.paperExplain+'&nbsp; &nbsp; &nbsp; &nbsp; <br>';
				 }
				 html += '<b>试题统计：</b>试题总数：'+list.topicCount+',&nbsp; &nbsp; &nbsp; &nbsp;  试题满分：'+list.paperTotalScore+'</div>';
				 html += '<div>';
				 for(var i=0;i<topicgrouplist.length;i++){
				 var topiclist = topicgrouplist[i].topiclist;
				 html+='<div class="group" style=clear:both;line-height:25px;padding-bottom:15px;>';
				 html+='<h1 style="line-height:30px;text-align:center;background:#F5F5F5;font-size:16px;padding-left:15px;margin-top:10px;border:1px solid #ccc;">第'+(i+1)+'部分：'+topicgrouplist[i].topicGroupName+'</h1>';
				 html+='<div>(共'+topicgrouplist[i].topicCountSum+'题，满分'+topicgrouplist[i].topicScoreSum+'分，答题时间'+topicgrouplist[i].answerTime+'分钟)</div>';
				 html+='<div>答题说明：'+topicgrouplist[i].topicGroupExplain+'&nbsp; &nbsp; &nbsp; &nbsp; ';
				 html+='答题统计：';
				 var typeList =  topicgrouplist[i].topicgrouptypelist;
				 html +='<table width="100%"  border="0"  class="default_table listtab" style="border:1px solid #ccc;"> ';
				 var obj = {
				 	"1":0,
				 	"2":0,
				 	"3":0,
				 	"4":0,
				 	"5":0,
				 	"6":0,
				 	"7":0,
				 	"8":0
				 };
				 for(var k=0,len=typeList.length;k<len;k++){
				 	var rec = typeList[k];
				 	obj[rec.topicTypeId] = {score:rec.topicScore,count:rec.topicCount};
				 }
				 html += ' <thead class="gradual_bg"><tr> <th class="th_center">题型 </th><th>单项选择题 </th><th>多项选择题 </th><th>判断题 </th><th>匹配题 </th><th>排序题 </th> <th>填空题 </th> <th>简答题 </th> <th>论述题 </th></tr></thead>';
           		 html += '<tbody class="tr_parent">';
            
              
              
              html+='<tr>';
              html+='<th align="center">数量</th>';                
              html+='<td> <span class="test_name_blue">'+(obj["1"].count||0)+'</span></td>';  
              html+='<td><span class="test_name_blue">'+(obj["2"].count||0)+'</span></td>';  
              html+='<td> <span class="test_name_blue">'+(obj["3"].count||0)+'</span></td>';  
              html+='<td><span class="test_name_blue">'+(obj["4"].count||0)+'</span></td>';   
              html+='<td><span class="test_name_blue">'+(obj["5"].count||0)+'</span></td>';   
              html+='<td><span class="test_name_blue">'+(obj["6"].count||0)+'</span></td>';   
              html+='<td><span class="test_name_blue">'+(obj["7"].count||0)+'</span></td>';    
              html+='<td><span class="test_name_blue">'+(obj["8"].count||0)+'</span></td>';    
              html+='</tr>';  
              
              html+='<tr>';  
              html+='<th align="center">分值</th>';     
              html+='<td> <span class="test_name_blue">'+(obj["1"].score||0)+'</span></td>';    
              html+='<td><span class="test_name_blue">'+(obj["2"].score||0)+'</span></td>';    
              html+='<td><span class="test_name_blue">'+(obj["3"].score||0)+'</span></td>';    
              html+='<td><span class="test_name_blue">'+(obj["4"].score||0)+'</span></td>';    
              html+='<td><span class="test_name_blue">'+(obj["5"].score||0)+'</span></td>';    
              html+='<td><span class="test_name_blue">'+(obj["6"].score||0)+'</span></td>';    
              html+='<td><span class="test_name_blue">'+(obj["7"].score||0)+'</span></td>';    
              html+='<td><span class="test_name_blue">'+(obj["8"].score||0)+'</span></td>'; 
              html+='</tr>';  
              
            html+= '</tbody>';

				 html +='</table>';
				 html+='</div></div>';
             	 html+='<div><label class="lab"></label><div class="test_content">';
             	 	for(var j=0;j<topiclist.length;j++){
             	 		html+='<ul class="online_test typeid_'+topiclist[j].topicTypeId+'" typeid="'+topiclist[j].topicTypeId+'" topicid="'+topiclist[j].id+'">';
             	 		html+='<li >';
       					html+='<b>'+(j+1)+'. </b>';
             	 		html+=topicType(topiclist[j],obj[topiclist[j].topicTypeId].score);
             	 		html+='</ul>';
             	 	}
             	 html+='</div></div>';
             	 html+= '</div>';
				 }
				  html+='<div style="clear:both;text-align:center;"><input value="关闭" type="button" class="btn btn_submit" onclick="window.close();"></div>';
             	$('#view_article').html(html);
             }
           });

		};
	getData();



function topicType(topicContent,score){
	var topicTypeId = parseInt(topicContent.topicTypeId);
	var it={}
	switch(topicTypeId){
		case 1 : return question(topicContent,score);
			     break;
		case 2 : return multiple(topicContent,score);
				 break;
		case 3 : return judgment(topicContent,score);
				 break;
		case 4 : return  match(topicContent,score);
				 break;
		case 5 : return sort(topicContent,score);
				 break;
		case 6 : return space(topicContent,score);
				 break;
		case 7 : return ask(topicContent,score);
				 break;
		case 8 : return discuss(topicContent,score);
				 break;
	}

	function question(topic,score){
		var topicAnswerList = topic.topicAnswerList;
		var html='';
        html+='【单项选择题】'+topic.topicContent+'（'+score+'分）';
        html+='</li>';
		for(var i=0;i<topicAnswerList.length;i++){
			html+='<li ><div class="online_test_list_left"></div>';
			html+='<div class="online_test_list_right"> <span class="test_name_black sp1">'+String.fromCharCode(65+i)+'.</span>';
            html+='<span class="sp2"><input name="'+topic.id+'" disabled type="radio" value="" answerid="'+topicAnswerList[i].id+'"  /></span>';
            html+='<span class="test_name_black sp3">'+topicAnswerList[i].optionContent+'</span></div>';
			html+='</li>';
		}
		return html;
	};
	function multiple(topic,score){
		var topicAnswerList = topic.topicAnswerList;
		var html='';
        html+='【多项选择题】'+topic.topicContent+'（'+score+'分）';
        html+='</li>';
		for(var i=0;i<topicAnswerList.length;i++){
			html+='<li class="btsj"><div class="online_test_list_left"></div>';
			html+='<div class="online_test_list_right"> <span class="test_name_black sp1">'+String.fromCharCode(65+i)+'.</span>';
            html+='<span class="sp2"><input name="a" type="checkbox" disabled value="" answerid="'+topicAnswerList[i].id+'" /></span>';
            html+='<span class="test_name_black sp3">'+topicAnswerList[i].optionContent+'</span></div>';
			html+='</li>';
		}

		return html;
	};
	function judgment(topic,score){
		var topicAnswerList = topic.topicAnswerList;
		var html='';
        html+='【判断题】'+topic.topicContent+'（'+score+'分）';
        html+='</li>';
		for(var i=0;i<topicAnswerList.length;i++){
			html+='<li class="btsj"><div class="online_test_list_left"></div>';
			html+='<div class="online_test_list_right"> <span class="test_name_black sp1">'+String.fromCharCode(65+i)+'.</span>';
            html+='<span class="sp2"><input name="a" type="radio" disabled value="" /></span>';
            html+='<span class="test_name_black sp3">'+topicAnswerList[i].optionContent+'</span></div>';
			html+='</li>';
		}
		return html;
	};
	function match(topic,score){
		var topicAnswerList = topic.topicAnswerList;
		var html='';
        html+='【匹配题】'+topic.topicContent+'（'+score+'分）';
        html+='</li>';
        html+='<li >';
        //html+='<div class="online_test_list_left"></div>';
        html+='<div class="online_test_list_right">';
        html+='<ul class="exammanage_match">';
		for(var i=0;i<topicAnswerList.length;i++){
			if(topicAnswerList[i].iscorrect==0){
				html+='<li class="nosj" id="left_'+topic.id+'_0'+i+'" >'+topicAnswerList[i].optionContent+'<input name="input2" type="text" class="default_txt" size="5" /></li>';
			}
		}
		html+='</ul>';
		html+='<ul class="exammanage_match_block nocenter">';
		for(var i=0;i<topicAnswerList.length;i++){
			if(topicAnswerList[i].iscorrect==1){
				html+='<li class="nosj" id="right_'+topic.id+'_0'+i+'" ><b>'+topicAnswerList[i].optionContent+'</b></li>';
			}
		}
		html+='</ul>';
		html+='<div class="clear"></div></li>';
		return html;
	};
	function sort(topic,score){
		var topicAnswerList = topic.topicAnswerList;
		var html='';
        html+='【排序题】'+topic.topicContent+'（'+score+'分）';
        html+='</li>';
        html+='<li >';
        html+='<div class="online_test_list_left"></div><div class="online_test_list_right"><div class="nosj">';
		for(var i=0;i<topicAnswerList.length;i++){
			if(i!=(topicAnswerList.length-1)){
				html+='<input name="input2" type="text"  class="esort" value="" size="10" /> - ';
			}else{
				html+='<input name="input2" type="text"  class="esort" value="" size="10" />';
			}
		}
		html+='</div>';
		html+='<ul class="exammanage_sort_block nocenter">';
		for(var i=0;i<topicAnswerList.length;i++){
			html+='<li class="nosj"  id='+topicAnswerList[i].id+' num='+(i+1)+'><b>'+(i+1)+'. '+topicAnswerList[i].optionContent+'</b></li>';
		}
		html+='</ul><div class="clear"></div></li>';
		return html;
	};
	function space(topic,score){
		var topicAnswerList = topic.topicAnswerList;
		var html='';
		re = /__________/g;
		var topicContent = topic.topicContent;
		topicContent = topicContent.replace(re,'&nbsp;<input name="input2" type="text" class="default_txt" size="5" />&nbsp;');
        html+='【填空题】'+topicContent+'（'+score+'分）';
        html+='</li>';
		return html;
	};
	function ask(topic,score){
		var topicAnswerList = topic.topicAnswerList;
		var html='';
        html+='【简答题】'+topic.topicContent+'（'+score+'分）';
        html+='</li>';
		html+='<li style="text-indent:0;">';
        html+='<div class="online_test_list_left"></div>';
        html+='<div class="online_test_list_right"><textarea rows="4" cols="100" name="topicContent_'+topic.id+'"></textarea></div>';
        html+='</li>';
		return html;
	};
	function discuss(topic,score){
		var topicAnswerList = topic.topicAnswerList;
		var html='';
        html+='【论述题】'+topic.topicContent+'（'+score+'分）';
        html+='</li>';
		html+='<li style="text-indent:0;">';
        html+='<div class="online_test_list_left"></div>';
        html+='<div class="online_test_list_right"><textarea rows="4" cols="100" name="topicContent_'+topic.id+'"></textarea></div>';
        html+='</li>';
		return html;
	};
}

});
});