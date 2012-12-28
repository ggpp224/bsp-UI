/**
 * @author gp
 * @datetime 2012-9-5
 * @description exam_add_common.js
 */


 //录入试题时选择试题下拉列表变化方法
 function input_select_change(val){
 	$.get("../templates/"+val,function(data){
		$('#firstPage').hide();
		$('#otherPage').html(data).show();
	});
 }


 function btnShow(){
 	Dom('topic_save_btn').style.display ="";
 }

 function btnHide(){
 	Dom('topic_save_btn').style.display ="none";
 }

 //渲染左侧题组框
 function renderGroups(data){
 	var htm = '',len=data.length;
 	for(var i=0;i<len;i++){
 		var rec=data[i].data||data[i];
 		htm +='<li class="tgn"><a href="javascript:void(0)" class="gta" title="'+rec.topicGroupName+'" groupId='+rec.id+'><img src="../images/enterprise/ico_sj_manage.png" />'+rec.topicGroupName+'</a></li>';
 	}

 	$('#topic_list').html(htm);
 	if(len<2){
 		$('#group_up_btn').removeClass('tree_up').addClass('tree_gray_up');
 		$('#group_down_btn').removeClass('tree_down').addClass('tree_gray_down');
 	}else{
 		$('#group_up_btn').removeClass('tree_gray_up').addClass('tree_up');
 		$('#group_down_btn').removeClass('tree_gray_down').addClass('tree_down');
 	}

 	//var group_li =false;
 	if(current_topic_id!='new'){
 		var _as = $('#topic_list').find('a.gta');
 		$.each(_as,function(idx){
 			if(this.getAttribute('groupId')==current_topic_id){
 				$(this).addClass('current');
 				if(len<2){
					}
					else if(idx==0){
						$('#group_up_btn').removeClass('tree_up').addClass('tree_gray_up');
 						$('#group_down_btn').removeClass('tree_gray_down').addClass('tree_down');
					}else if(idx==len-1){
						$('#group_down_btn').removeClass('tree_down').addClass('tree_gray_down');
						$('#group_up_btn').removeClass('tree_gray_up').addClass('tree_up');
					}else{
						$('#group_down_btn').removeClass('tree_gray_down').addClass('tree_down');
						$('#group_up_btn').removeClass('tree_gray_up').addClass('tree_up');
					}
 			}
 		});
 	}
 }



  //根据id获取题组在试卷中的位置
 function getGroupIndex(id){
 	for(var i=0,len=topic_groups.length;i<len;i++){
 		var rec = topic_groups[i];
 		if(id==rec.id){
 			return i;
 		}
 	}
 }


 //渲染题组下的试题
 function renderTopics(data){
 	var htm ='';
 	$.each(data,function(idx){
 		var rec = this;
 		htm += '<ul class="operate"><li class="topic_view_del" >';
 		htm += 		'<a tid="'+rec.id+'" idx="'+idx+'" href="javascript:" class="tree_dell group_topic_del" ></a>';
 		htm += 		'<a tid="'+rec.id+'" idx="'+idx+'" href="javascript:" class="icon_ranking_up icon_top_btn group_topic_up" ></a>';
 		htm += 		'<a tid="'+rec.id+'" idx="'+idx+'" href="javascript:" class="icon_ranking_down icon_down_btn group_topic_down" ></a>';
 		htm += '</li></ul>';
 		htm += topicType(this,idx+1); 		
 		htm += '<div class="clear"></div>';
 	});

 	return htm;
 }

  function topicType(topicContent,idx){
	var topicTypeId = parseInt(topicContent.topicTypeId);
	var it={};
	switch(topicTypeId){
		case 1 : return question(topicContent,idx);
			     break;
		case 2 : return multiple(topicContent,idx);
				 break;
		case 3 : return judgment(topicContent,idx);
				 break;
		case 4 : return  match(topicContent,idx);
				 break;
		case 5 : return sort(topicContent,idx);
				 break;
		case 6 : return space(topicContent,idx);
				 break;
		case 7 : return ask(topicContent,idx);
				 break;
		case 8 : return discuss(topicContent,idx);
				 break;
	}

	function question(topic){
		var topicAnswerList = topic.topicAnswerList||[];
		var html='';
		html+='<ul>';
		html+='<li>';
        html+='<div class="online_test_list_right"><span class="test_name_black">'+idx+'.【单项选择题】'+topic.topicContent+'</span></div>';
        html+='</li>';
		for(var i=0;i<topicAnswerList.length;i++){
			html+='<li class="online_test_list"><div class="online_test_list_left"></div>';
			html+='<div class="online_test_list_right"> <span class="test_name_black">'+String.fromCharCode(65+i)+'.</span>';
            if(topicAnswerList[i].iscorrect==1){
            	html+='<input type="radio" value="" checked answerid="'+topicAnswerList[i].id+'"  style="margin:0px 5px;"/>';
            }else{
            	html+='<input type="radio" value="" answerid="'+topicAnswerList[i].id+'"  style="margin:0px 5px;"/>';
            }
            html+='<span class="test_name_black">'+topicAnswerList[i].optionContent+'</span></div>';
			html+='</li>';
		}
		html+='</ul>';
		return html;
	};
	function multiple(topic){
		var topicAnswerList = topic.topicAnswerList||[];
		var html='';
		html+='<ul>';
		html+='<li>';
        html+='<div class="online_test_list_right"><span class="test_name_black">'+idx+'.【多项选择题】'+topic.topicContent+'</span></div>';
        html+='</li>';
		for(var i=0;i<topicAnswerList.length;i++){
			html+='<li class="online_test_list"><div class="online_test_list_left"></div>';
			html+='<div class="online_test_list_right"> <span class="test_name_black">'+String.fromCharCode(65+i)+'.</span>';
            if(topicAnswerList[i].iscorrect==1){
            	 html+='<input  type="checkbox" value="" checked answerid="'+topicAnswerList[i].id+'"  style="margin:0px 5px;"/>';
            }else{
            	 html+='<input  type="checkbox" value="" answerid="'+topicAnswerList[i].id+'"  style="margin:0px 5px;"/>';
            }
            html+='<span class="test_name_black">'+topicAnswerList[i].optionContent+'</span></div>';
			html+='</li>';
		}
		html+='</ul>';
		return html;
	};
	function judgment(topic){
		var topicAnswerList = topic.topicAnswerList||[];
		var html='';
		html+='<ul>';
		html+='<li>';
        html+='<div class="online_test_list_right"><span class="test_name_black">'+idx+'.【判断题】'+topic.topicContent+'</span></div>';
        html+='</li>';
		for(var i=0;i<topicAnswerList.length;i++){
			html+='<li class="online_test_list"><div class="online_test_list_left"></div>';
			html+='<div class="online_test_list_right"> <span class="test_name_black">'+String.fromCharCode(65+i)+'.</span>';

          	if(topicAnswerList[i].iscorrect==1){
          		 //html+='<input  type="radio" value="" checked name="pd_'+topicAnswerList[i].id+'"  style="margin:0px 5px;"/>';
          		 html+='<input  type="radio" value="" checked  style="margin:0px 5px;"/>';
          	}else{
          		 //html+='<input  type="radio" value="" name="pd_'+topicAnswerList[i].id+'"  style="margin:0px 5px;"/>';
          		 html+='<input  type="radio" value="" style="margin:0px 5px;"/>';
          	}

            html+='<span class="test_name_black">'+topicAnswerList[i].optionContent+'</span></div>';
			html+='</li>';
		};
		html+='</ul>';
		return html;
	};
	function match(topic){
		var topicAnswerList = topic.topicAnswerList||[];
		var html='';
		var correctAnswer=[];
		for(var i=0;i<topicAnswerList.length;i++){
			if(topicAnswerList[i].iscorrect==1){
				correctAnswer.push(topicAnswerList[i].optionContent);
			}
		}
		var correctAnswer_num = [];
		for(var i=0;i<topicAnswerList.length;i++){
			if(topicAnswerList[i].iscorrect==0){
				correctAnswer_num.push(correctAnswer[(topicAnswerList[i].optionOrder)-1]);
			}
		}

		html+='<ul>';
		html+='<li>';
        html+='<div class="online_test_list_right"><span class="test_name_black">'+idx+'.【匹配题】'+topic.topicContent+'</span></div>';
        html+='</li>';
        html+='<li class="online_test_list">';
        html+='<div class="online_test_list_left"></div>';
        html+='<div class="online_test_list_right">';
        html+='<ul class="exammanage_match">';
        var j=0;
		for(var i=0;i<topicAnswerList.length;i++){
			if(topicAnswerList[i].iscorrect==0){

				html+='<li id="left_'+topic.id+'_0'+i+'" >'+topicAnswerList[i].optionContent+'<input  type="text" value="'+correctAnswer_num[j]+'" class="default_txt" size="5" /></li>';
				j++;
			}
		}
		html+='</ul>';
		html+='<ul class="exammanage_match_block">';
		for(var i=0;i<topicAnswerList.length;i++){
			if(topicAnswerList[i].iscorrect==1){
				html+='<li id="right_'+topic.id+'_0'+i+'" ><b>'+topicAnswerList[i].optionContent+'</b></li>';
			}
		}
		html+='</ul>';
		html+='<div class="clear"></div></li>';
		html+='</ul>';
		return html;
	};
	function sort(topic){
		var topicAnswerList = topic.topicAnswerList||[];
		var html='';
		html+='<ul>';
		html+='<li>';
        html+='<div class="online_test_list_right"><span class="test_name_black">'+idx+'.【排序题】'+topic.topicContent+'</span></div>';
        html+='</li>';
        html+='<li class="online_test_list">';
        html+='<div class="online_test_list_left"></div><div class="online_test_list_right"><div>';
		for(var i=0;i<topicAnswerList.length;i++){
			if(i!=(topicAnswerList.length-1)){
				html+='<input  type="text" value="'+topicAnswerList[i].optionOrder+'"  class="esort" value="" size="10" /> - ';
			}else{
				html+='<input  type="text" value="'+topicAnswerList[i].optionOrder+'" class="esort" value="" size="10" />';
			}
		}
		html+='</div>';
		html+='<ul class="exammanage_sort_block">';
		for(var i=0;i<topicAnswerList.length;i++){
			html+='<li id='+topicAnswerList[i].id+' num='+(i+1)+'><b>'+(i+1)+'. '+topicAnswerList[i].optionContent+'</b></li>';
		}
		html+='</ul><div class="clear"></div></li>';
		html+='</ul>';
		return html;
	};
	function space(topic){
		var topicAnswerList = topic.topicAnswerList||[];
		var html='';
		re = /__________/g;
		var topicContent = topic.topicContent;
		topicContent = topicContent.replace(re,'&nbsp;<input type="text" class="default_txt" size="5" />&nbsp;');
		var counter =0;
		var topicContent_s = topicContent.replace(/type="text"/g,function(match){
			counter++;
			return 'type="text" value="'+topicAnswerList[counter-1].optionContent+'"';

		});
		html+='<ul>';
		html+='<li>';
        html+='<div class="online_test_list_right"><span class="test_name_black">'+idx+'.【填空题】'+topicContent_s+'</span></div>';
        html+='</li>';
		html+='</ul>';

		return html;
	};
	function ask(topic){
		var topicAnswerList = topic.topicAnswerList||[];
		var html='';
		html+='<ul>';
		html+='<li>';
        html+='<div class="online_test_list_right"><span class="test_name_black">'+idx+'.【简答题】'+topic.topicContent+'</span></div>';
        html+='</li>';
		html+='<li class="online_test_list">';
        html+='<div class="online_test_list_left"></div>';
        html+='<div class="online_test_list_right"><textarea rows="4" cols="100" >'+topicAnswerList[0].optionContent+'</textarea><a class="textedit addQuestions" alt="" title="高级内容编辑器" href=""></a></div>';
        html+='</li>';
		html+='</ul>';
		return html;
	};
	function discuss(topic){
		var topicAnswerList = topic.topicAnswerList||[];
		var html='';
		html+='<ul>';
		html+='<li>';
        html+='<div class="online_test_list_right"><span class="test_name_black">'+idx+'.【论述题】'+topic.topicContent+'</span></div>';
        html+='</li>';
		html+='<li class="online_test_list">';
        html+='<div class="online_test_list_left"></div>';
        html+='<div class="online_test_list_right"><textarea rows="4" cols="100" >'+topicAnswerList[0].optionContent+'</textarea><a class="textedit addQuestions" alt="" title="高级内容编辑器" href=""></a></div>';
        html+='</li>';
		html+='</ul>';
		return html;
	};
}
