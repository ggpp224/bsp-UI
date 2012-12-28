var dragDropObj='';
var autoSubmit=false;
var _arr=[];
	_arr['topicCount']=[0,0,0,0,0,0,0,0,0];
	_arr['topicScore']=[0,0,0,0,0,0,0,0,0];



require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','ListView','WdatePicker','personal_sim','jquery.progressbar.min','searchdata','sticky','common','ckeditor','drag-drop-custom'],function(){
$(function(){
		//设置全局变量
		var implementId = getQuery('implementId');
		var examPaperId = getQuery('examPaperId');
		var examDuration = parseInt(getQuery('examDuration')); //获取考试时长
		var readingMode = getQuery('readingMode');  //阅卷模式
		var hasTest = getQuery('hasTest');
		var displayMode = getQuery('displayMode');
		var perTopicNumber = parseInt(getQuery('perTopicNumber'));
		var isTopicRandom = getQuery('isTopicRandom');
		var isAnswerRandom = getQuery('isAnswerRandom');
		var paperName = getQuery('paperName'); //试卷名称

		paperName = decodeURI(paperName);
		//插入试卷名称
		$('#paperName').html(paperName);
		var getData = function(){
		$.ajax({
			 type: 'GET',
             dataType: 'json',
             url: G_URL['findstuexampaperindexbyid']+'?examPaperId='+examPaperId+'&isTopicRandom='+isTopicRandom+'&isAnswerRandom='+isAnswerRandom+'&callback=',
             //url: G_URL['findstuexampaperindexbyid']+'?examPaperId=12&callback=',
             contentType: 'application/json;charset=UTF-8',
             success:function(data){
             	var list = data.list[0];
             	var topicgrouplist = list.topicgrouplist;
					// 分数为null 随机试卷分数为空问题时（卓见添加)
					for(var j in topicgrouplist[0]['topicgrouptypelist']){
						var v=topicgrouplist[0]['topicgrouptypelist'][j];
						_arr['topicCount'][v.topicTypeId]=v.topicCount;
						_arr['topicScore'][v.topicTypeId]=v.topicScore;
					}
					// 分数为null 随机试卷分数为空问题时 end

             	var html = '',menu = '';
             	var topicArr = [],totalPage = 0;
				 for(var i=0;i<topicgrouplist.length;i++){


				 var topiclist = topicgrouplist[i].topiclist;

				 var typeList =  topicgrouplist[i].topicgrouptypelist;
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
				 if(displayMode == 0 || displayMode == 1){
					 //（龙添加题组外壳，添加分页功能）
					 html+='<div class="showpage" id="topicGroup_'+(i+1)+'">';
					 html+='<h1>'+topicgrouplist[i].topicGroupName+'</h1>';
	             	 html+='<div class="test_content" tpgroup="'+i+'">';
	             	 	for(var j=0;j<topiclist.length;j++){
	             	 		html+='<ul name="anchor_'+topiclist[j].id+'" id="anchor_'+topiclist[j].id+'"  class="online_test typeid_'+topiclist[j].topicTypeId+'" typeid="'+topiclist[j].topicTypeId+'" topicid="'+topiclist[j].id+'" groupid="'+topicgrouplist[i].id+'">';
	             	 		html+='<li class="online_test_list">';
	       					html+='<b><span class="test_name_black">'+(j+1)+'. </span></b>';
	             	 		html+=topicType(topiclist[j],obj[topiclist[j].topicTypeId].score);
	             	 		html+='</ul>';
	             	 	}
	             	 html+= '</div>';
	             	 html+='</div>';
				 }else if(displayMode == 2){
				 	var list = [];
				 	var start = 0;
				 	for(var j=0;j<topiclist.length;j++){

             	 		var newtp = '';

             	 		newtp+='<ul name="anchor_'+topiclist[j].id+'" id="anchor_'+topiclist[j].id+'"  class="online_test typeid_'+topiclist[j].topicTypeId+'" typeid="'+topiclist[j].topicTypeId+'" topicid="'+topiclist[j].id+'" groupid="'+topicgrouplist[i].id+'">';
             	 		newtp+='<li class="online_test_list">';
       					newtp+='<div class="online_test_list_left"><span class="test_name_black">'+(j+1)+'. </span></div>';
             	 		newtp+=topicType(topiclist[j],obj[topiclist[j].topicTypeId].score);
             	 		newtp+='</ul>';
             	 		list.push(newtp);

				 		if(((j+1)%perTopicNumber)==0){
				 			totalPage++;
				 			topicArr[totalPage] = [{
				 				'page'  : totalPage,
				 				'start' : start,
				 				'list'  : list,
				 				'topicGroupName' : topicgrouplist[i].topicGroupName,
				 				'groupId' : i

				 			}];
				 			start++;
				 			list = [];
				 		}else if(j==(topiclist.length-1)){
				 			totalPage++;
				 			topicArr[totalPage] = [{
				 				'page'  : totalPage,
				 				'start' : start,
				 				'list'  : list,
				 				'topicGroupName' : topicgrouplist[i].topicGroupName,
				 				'groupId' : i

				 			}];
				 			start++;
				 			list = [];

				 		}
				 	}


				 }
				 }
				 //显示模式
				if(displayMode == 1){
				  html+='<div class="pagination" style="display:block;height:30px;"><ul>';
				   for(var i=0;i<topicgrouplist.length;i++){
				 		if(i==0){
				 		  html+='<li style="float:left;margin:3px;" num="'+(i+1)+'" class="page currentp"><a href="javascript:void(0)">'+(i+1)+'</a></li>';
				 		}else{
				 		  html+='<li style="float:left;margin:3px;" num="'+(i+1)+'" class="page"><a href="javascript:void(0)" >'+(i+1)+'</a></li>';
				 		}
				   }
				  html+='</ul></div>';

				 }else if(displayMode == 2){
				 	for(var i=1;i<topicArr.length;i++){
				 		 html+='<div class="showpage" id="js_show_page_'+i+'">';
				 		 html+='<h1>'+topicArr[i][0].topicGroupName+'</h1>';

				 		 html+='<div class="test_content" tpgroup="'+topicArr[i][0].groupId+'">';
				 		 html+='<div class="js_show_page" num="'+topicArr[i][0].start+'">';
				 		 for(var j=0;j<topicArr[i][0].list.length;j++){
				 		 	html+=topicArr[i][0].list[j];
				 		 }
				 		 html+='</div>';
				 		 html+='</div>';
				 		 html+='</div>';
				 	}
				 html+='<div class="pagination" style="display:block;overflow:hidden;zoom:1;"><ul>';
				   for(var i=0;i<(topicArr.length-1);i++){
				 		if(i==0){
				 		  html+='<li style="float:left;margin:3px;" num="'+(i+1)+'" class="page currentp"><a href="javascript:void(0)">'+(i+1)+'</a></li>';
				 		}else{
				 		  html+='<li style="float:left;margin:3px;" num="'+(i+1)+'" class="page"><a href="javascript:void(0)" >'+(i+1)+'</a></li>';
				 		}
				   }
				  html+='</ul></div>';
				 }

				  html+='<input name="提交" type="button" class="btn btn_submit" id="submitPaper" value="提交">';
             	$('#js_details').html(html);
             	if(displayMode == 1 || displayMode == 2){
             		pageNum(1);
             	}

             	$('.txa').keyup(function(e){
             		var el = $(this),
             			val = el.val(),
             			len = val.length;
             		var tip = el.next('div.tip');
             		if(tip.length==0){
             			el.after('<div class="tip" style="float:right;height:25px;width:120px;color:red;"></div>');
             			tip = el.next('div.tip');
             		}

             		if(len<400){
             			tip[0].innerHTML = '还可以输入'+(400-len)+"字";
             		}else{
             			el.val(val.substr(0,400));
             			$(tip[0]).remove();
             			return false;
             		}

             	});

				//插入弹出框
				$('.addEdit').live('click',function(e){
						G_textedit=$(this).parent().parentsUntil('ul');
						e.preventDefault();
						$.fn.nyroModalManual({
							width:700,
							height:480,
							title:'高级文本编辑器',
							url: 'overlay_addQuestions.shtml'
						});
						return false;
				});


               //为匹配题添加拖拽
			   dragDropObj= new DHTMLgoodies_dragDrop();
			   for(var i=0;i<topicgrouplist.length;i++){
			   	 	var topiclist = topicgrouplist[i].topiclist;

			   		for(var j=0;j<topiclist.length;j++){
			   			if(topiclist[j].topicTypeId == 4){
			   				var answerList = topiclist[j].topicAnswerList;
							//for(var x in answerList){
			   				for(var x=0;x<answerList.length;x++){
								var v=answerList[x];
								if(v.iscorrect==0){
									dragDropObj.addTarget('right_'+v.id+'_0'+x,'dropItems');
								}
							}
							for(var x=0;x<answerList.length;x++){
								var v=answerList[x];
								if(v.iscorrect==1){
									dragDropObj.addSource('left_'+v.id+'_0'+x,true);
								}
							}
							dragDropObj.init();
			   			}
			   		}
			   }

	           for(var i=0;i<topicgrouplist.length;i++){
	           		var topiclist = topicgrouplist[i].topiclist;
	           	    menu+='<div class="menu_part2" tpgroup="'+i+'">';
		            menu+='<div class="tl_tzmc">'+topicgrouplist[i]['topicGroupName']+'</div>';
		            menu+='<div class="tl_jindu"><div class="tl_jdname">完成度</div><div class="tljd"><span class="progressBar" id="tg'+i+'"></span></div></div>';
		            menu+='<div class="tab_selct">';
		            menu+='<ul>';
		            for(var j=0;j<topiclist.length;j++){
		            	menu+='<a href="#anchor_'+topiclist[j].id+'"><li class="bg_hui">'+(j+1)+'</li></a>';
		            }
		            menu+='</ul>';
		 			menu+='</div></div><div class="clear"></div>';
	           }
	 		   $('#topicGroup').html(menu);
	 		   $('#menu').stickyfloat({ duration: 250 });// 浮动时间条
             }
           });

		};
	getData();


// 浮动时间条
//$('#menu').stickyfloat({ duration: 250 });

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
        html+='【单项选择题】'+topic.topicContent+'（<span id="topicscore_'+topic.id+'">'+ score +'</span>分）';
        html+='</li>';
		for(var i=0;i<topicAnswerList.length;i++){
			html+='<li class="online_test_list"><div class="online_test_list_left"></div>';
			html+='<div class="online_test_list_right"> <span class="test_name_black sp1">'+String.fromCharCode(65+i)+'.</span>';
            html+='<span class="sp2"><input name="'+topic.id+'" type="radio" value="" answerid="'+topicAnswerList[i].id+'" /></span>';
            html+='<span class="test_name_black sp3">'+topicAnswerList[i].optionContent+'</span></div>';
			html+='</li>';
		}
		return html;
	};
	function multiple(topic,score){
		var topicAnswerList = topic.topicAnswerList;
		var html='';
        html+='【多项选择题】'+topic.topicContent+'（<span id="topicscore_'+topic.id+'">'+ score +'</span>分）';
        html+='</li>';
		for(var i=0;i<topicAnswerList.length;i++){
			html+='<li class="online_test_list"><div class="online_test_list_left"></div>';
			html+='<div class="online_test_list_right"> <span class="test_name_black sp1">'+String.fromCharCode(65+i)+'.</span>';
            html+='<span class="sp2"><input name="a" type="checkbox" value="" answerid="'+topicAnswerList[i].id+'"  style="margin:0px 5px;"/></span>';
            html+='<span class="test_name_black sp3">'+topicAnswerList[i].optionContent+'</span></div>';
			html+='</li>';
		}

		return html;
	};
	function judgment(topic,score){
		var topicAnswerList = topic.topicAnswerList;
		var html='';
        html+='【判断题】'+topic.topicContent+'（<span id="topicscore_'+topic.id+'">'+ score +'</span>分）';
        html+='</li>';
		for(var i=0;i<topicAnswerList.length;i++){
			html+='<li class="online_test_list"><div class="online_test_list_left"></div>';
			html+='<div class="online_test_list_right"> <span class="test_name_black">'+String.fromCharCode(65+i)+'.</span>';
            html+='<input name="'+topic.id+'" type="radio" value="" answerid="'+topicAnswerList[i].id+'"  style="margin:0px 5px;"/>';
            html+='<span class="test_name_black">'+topicAnswerList[i].optionContent+'</span></div>';
			html+='</li>';
		}
		return html;
	};
	function match(topic,score){
		var topicAnswerList = topic.topicAnswerList;
		var html='';
        html+='【匹配题】'+topic.topicContent+'（<span id="topicscore_'+topic.id+'">'+ score +'</span>分）';
        html+='</li>';
        html+='<li class="online_test_list nosj">';
        html+='<div class="online_test_list_left"></div>';
        html+='<div class="online_test_list_right">';
        html+='<ul class="exammanage_match">';
		for(var i=0;i<topicAnswerList.length;i++){
			if(topicAnswerList[i].iscorrect==0){
				html+='<li id="right_'+topicAnswerList[i].id+'_0'+i+'">'+topicAnswerList[i].optionContent+'&nbsp;&nbsp;<input name="input2" type="text" class="default_txt words" size="5" /></li>';
			}
		}
		html+='</ul>';
		html+='<ul class="exammanage_match_block">';
		for(var i=0;i<topicAnswerList.length;i++){
			if(topicAnswerList[i].iscorrect==1){
				html+='<li id="left_'+topicAnswerList[i].id+'_0'+i+'"><b>'+topicAnswerList[i].optionContent+'</b></li>';
			}
		}
		html+='</ul>';
		html+='<div class="clear"></div></li>';
		return html;
	};
	function sort(topic,score){
		var topicAnswerList = topic.topicAnswerList;
		var html='';
        html+='【排序题】'+topic.topicContent+'（<span id="topicscore_'+topic.id+'">'+ score +'</span>分）';
        html+='</li>';
        html+='<li class="online_test_list nosj">';
        html+='<div class="online_test_list_left"></div><div class="online_test_list_right"><div>';
		for(var i=0;i<topicAnswerList.length;i++){
			if(i!=(topicAnswerList.length-1)){
				html+='<input name="input2" type="text"   class="esort words" value="" size="10" /> - ';
			}else{
				html+='<input name="input2" type="text"  class="esort words" value="" size="10" />';
			}
		}
		html+='</div>';
		html+='<ul class="exammanage_sort_block">';
		for(var i=0;i<topicAnswerList.length;i++){
			html+='<li id='+topicAnswerList[i].id+' num='+(i+1)+'><b>'+(i+1)+'. '+topicAnswerList[i].optionContent+'</b></li>';
		}
		html+='</ul><div class="clear"></div></li>';
		return html;
	};
	function space(topic,score){
		var topicAnswerList = topic.topicAnswerList;
		var html='';
		re = /__________/g;
		var topicContent = topic.topicContent;
		topicContent = topicContent.replace(re,'&nbsp;<input name="input2" type="text" class="default_txt words" size="5" />&nbsp;');
        html+='【填空题】'+topicContent+'（<span id="topicscore_'+topic.id+'">'+ score +'</span>分）';
        html+='</li>';
		return html;
	};
	function ask(topic,score){
		var topicAnswerList = topic.topicAnswerList;
		var html='';
        html+='【简答题】'+topic.topicContent+'（<span id="topicscore_'+topic.id+'">'+ score +'</span>分）';
        html+='</li>';
		html+='<li class="online_test_list">';
        html+='<div class="online_test_list_left"></div>';
        html+='<div class="online_test_list_right"><textarea class="txa words" rows="8" cols="100" name="topicContent_'+topic.id+'"></textarea><a class="textedit addEdit" alt="" title="高级内容编辑器" href=""></a></div>';
        html+='</li>';
		return html;
	};
	function discuss(topic,score){
		var topicAnswerList = topic.topicAnswerList;
		var html='';
        html+='【论述题】'+topic.topicContent+'（<span id="topicscore_'+topic.id+'">'+ score +'</span>分）';
        html+='</li>';
		html+='<li class="online_test_list">';
        html+='<div class="online_test_list_left"></div>';
        html+='<div class="online_test_list_right"><textarea  class="txa words" rows="8" cols="100" name="topicContent_'+topic.id+'"></textarea><a class="textedit addEdit" alt="" title="高级内容编辑器" href=""></a></div>';
        html+='</li>';
		return html;
	};
}

//拼装8种试题答案
var pz = (function(){
	var it={};

	it.init = function(typeid,e){
		switch(typeid){
			case '1' : return pz.question(e);
					   break;
			case '2' : return pz.multiple(e);
			           break;
			case '3' : return pz.judgment(e);
			           break;
			case '4' : return pz.match(e);
					   break;
			case '5' : return pz.sort(e);
			           break;
			case '6' : return pz.space(e);
			           break;
			case '7' : return pz.ask(e);
					   break;
			case '8' : return pz.discuss(e);
			           break;
		}
	};
	it.question = function (e){
			var answerStr = '';
			e.find('input[type="radio"]').each(function(ka,va){
				var flag = $(this).attr('checked');
				if(flag==true){
					answerStr=$(this).attr('answerid');
				}
			});
			return answerStr;
	};
	it.multiple = function(e){
			var answerStr = [];
			var i=0;
			e.find('input[type="checkbox"]').each(function(ka,va){
				var flag = $(this).attr('checked');
				if(flag==true){
					answerStr[i]=$(this).attr('answerid');
					i++;
				}
			});
			answerStr = answerStr.join(",");
			return answerStr;

	};
	it.judgment = function(e){
		var answerStr = '';
		e.find('input[type="radio"]').each(function(ka,va){
			var flag = $(this).attr('checked');
			if(flag==true){
				answerStr=$(this).attr('answerid');
			}
		});
		return answerStr;
	};
	it.match = function(e){
		var answerStr = '',arr=[];
		e.find('.exammanage_match input').each(function(k,v){
			arr[k] = $(this).attr('alt');
		});
		answerStr = arr.join(",");
		return answerStr;
	};
	it.sort = function(e){
		var answerStr = '',arr=[],arr_after=[];
		e.find('input[type="text"]').each(function(k,v){
			var x =parseInt($(this).val());
			arr[k] = e.find('.exammanage_sort_block li').eq(x-1).attr('id');
		});
		answerStr = arr.join(",");
		return answerStr;
	};
	it.space = function(e){
		var answerStr = '',arr=[];
		e.find('input[type="text"]').each(function(k,v){
			arr[k] = $(this).val();
		});
		answerStr = arr.join(",");
		return answerStr;
	};
	it.ask = function(e){
		var answerStr = '';
		answerStr = e.find('textarea').val();
		return answerStr;
	};
	it.discuss = function(e){
		var answerStr = '';
		answerStr = e.find('textarea').val();
		return answerStr;
	};
	return it;
})();

//提交试卷
$('#submitPaper').live('click',function(){

	var isfinish = true;
	$('.tab_selct ul li').each(function(k,v){
		if($(this).hasClass('bg_hui')){
			isfinish = false;
		}
	});
	if(!isfinish){
		if(autoSubmit != true){
			$.fn.nyroModalManual({
				width : 400,
				title : "系统提示",
				url : 'overlay_delete.html'
			});
			//alert('试卷未全部答完，不能提交试卷！');
			return false;
		}
	}
	if(confirm("确定提交试卷吗？") || autoSubmit == true){
			var params = {};
			params = {
				implementId : implementId,
				userAccountId : G_USER['id'],
				examPaperId  : examPaperId,
				examSpents  :CountTimer.taskTime(),
				readingMode : readingMode,
				examNumber : hasTest,
				companyId  : G_COMPANYID
			}

			params.answerRecordProDTOList=[];
			$('.online_test').each(function(k,v){
				var typeid = $(this).attr('typeid');
				var topicid = $(this).attr('topicid');
				var topicScore = $(this).find('#topicscore_'+topicid).html();
				var groupid = $(this).attr('groupid'); 
				var answerStr = [];
				var e = $(this);
				answerStr = pz.init(typeid,e);    //调用8种拼装函数
				params.answerRecordProDTOList[k]={};
				params.answerRecordProDTOList[k].topicId=topicid;
				params.answerRecordProDTOList[k].topicTypeId=typeid;
				params.answerRecordProDTOList[k].examineeAnswer=answerStr;
				params.answerRecordProDTOList[k].topicScore=topicScore;
				params.answerRecordProDTOList[k].groupId = groupid;
			});
			var str = Ambow.encode(params);
			$('#submitPaper').remove();
			$.ajax({
					 type: 'POST',
					 data:  str,
		             dataType: 'json',
		             url: G_URL['addanswerrecord'],
		             contentType: 'application/json;charset=UTF-8',
		             success:function(data){
		             	if(data.returnCode== '000000'){
							window.opener.location.reload();
		             		alert(data.returnMsg);
		             		window.close();
		             		//window.location.href = "mylearning_onlinetest.html";
		             	}else{
		             		alert(data.returnMsg);
		             	}


		             }
			});
	}


});
//完成度
$('.online_test').live('click',function(){
	var e = $(this);
	if(displayMode==2){
		var nm = $(this).closest('.js_show_page').attr('num');
		var index = $(this).index();
		index = index +nm*perTopicNumber;
	}else{
		var index = $(this).index();
	}

	var typeid = parseInt($(this).attr('typeid'));
	var tgNum = $(this).closest('.test_content').attr('tpgroup');
	var flag = 0;
	var totle = 0;
	switch(typeid){
		case 1 :
		case 3 : typeRadio(e);
				 break;
		case 2 : typeChecked(e);
				 break;
		case 4 :
		case 5 :
		case 6 : typeText(e);
				 break;
		case 7 :
		case 8 : typeTextarea(e);
				 break;
	}
	function typeRadio(e){
		//var isCheck = e.find('input[type="radio"]').attr('checked');
		var isCheck = false;
		e.find('input[type="radio"]').each(function(k,v){
			if($(this).attr('checked')){
				isCheck = true;
			}
		});
		if(isCheck){
			e.attr('hasfinish',true);
			$('#topicGroup .tab_selct').each(function(k,v){
				if(k==tgNum){
					$(this).children().find('li').eq(index).removeClass('bg_hui').addClass('bg_lv');
						var tl = $(this).children().find('li');
						 totle = tl.length;
					$(this).children().find('li').each(function(){
						if($(this).hasClass('bg_lv')){
							flag++;
						}
					});
				}
			});
			var n = Math.ceil((flag/totle)*100);
			//alert(n);
			$('#tg'+tgNum).html(n);
			$(".progressBar").each(function(i,n){
				if(i==tgNum){
					$(n).progressBar();
				}
			});
		}
	}
	function typeChecked(e){
		//var isCheck = e.find('input[type="checkbox"]').attr('checked');
		var isCheck = false;
		e.find('input[type="checkbox"]').each(function(k,v){
			if($(this).attr('checked')){
				isCheck = true;
			}
		});
		if(isCheck){
			$('#topicGroup .tab_selct').each(function(k,v){
				if(k==tgNum){
					$(this).children().find('li').eq(index).removeClass('bg_hui').addClass('bg_lv');
						var tl = $(this).children().find('li');
						 totle = tl.length;
					$(this).children().find('li').each(function(){
						if($(this).hasClass('bg_lv')){
							flag++;
						}
					});
				}
			});
			var n = Math.ceil((flag/totle)*100);
			//alert(n);
			$('#tg'+tgNum).html(n);
			$(".progressBar").each(function(i,n){
				if(i==tgNum){
					$(n).progressBar();
				}
			});
		}
//		else{
//			$('#topicGroup .tab_selct').each(function(k,v){
//				if(k==tgNum){
//
//					var tl = $(this).children().find('li');
//					totle = tl.length;
//					$(this).children().find('li').each(function(){
//						if($(this).hasClass('bg_lv')){
//
//						}
//						if(e.attr('hasfinish')){
//								flag--;
//						}
//					});
//
//				}
//				$(this).children().find('li').eq(index).removeClass('bg_lv').addClass('bg_hui');
//			});
//			var n = Math.ceil((flag/totle)*100);
//			//alert(n);
//			$('#tg'+tgNum).html(n);
//			$(".progressBar").each(function(i,n){
//				if(i==tgNum){
//					$(n).progressBar();
//				}
//			});
//
//		}
	}
	function typeText(e){
		//var isCheck = e.find('input[type="text"]');
		var isCheck = false;
		e.find('input[type="text"]').each(function(k,v){
			var content = $(this).val();
			if(content!=''){
				isCheck = true;
			}
		});
		if(isCheck){
			$('#topicGroup .tab_selct').each(function(k,v){
				if(k==tgNum){
					$(this).children().find('li').eq(index).removeClass('bg_hui').addClass('bg_lv');
						var tl = $(this).children().find('li');
						 totle = tl.length;
					$(this).children().find('li').each(function(){
						if($(this).hasClass('bg_lv')){
							flag++;
						}
					});
				}
			});
			var n = Math.ceil((flag/totle)*100);
			//alert(n);
			$('#tg'+tgNum).html(n);
			$(".progressBar").each(function(i,n){
				if(i==tgNum){
					$(n).progressBar();
				}
			});
		}

	}
	function typeTextarea(e){
		var isCheck = e.find('textarea').val();
		if(isCheck.length>0){
			$('#topicGroup .tab_selct').each(function(k,v){
				if(k==tgNum){
					$(this).children().find('li').eq(index).removeClass('bg_hui').addClass('bg_lv');
						var tl = $(this).children().find('li');
						 totle = tl.length;
					$(this).children().find('li').each(function(){
						if($(this).hasClass('bg_lv')){
							flag++;
						}
					});
				}
			});
			var n = Math.ceil((flag/totle)*100);
			//alert(n);
			$('#tg'+tgNum).html(n);
			$(".progressBar").each(function(i,n){
				if(i==tgNum){
					$(n).progressBar();
				}
			});
		}
	}

});
//完成度2 （填空，论述，简答）
$('.words').live('blur',function(){
	var cl = $(this).closest('.online_test');
	if(displayMode==2){
		var nm = cl.closest('.js_show_page').attr('num');
		var index = cl.index();
		index = index +nm*perTopicNumber;
	}else{
		var index = cl.index();
	}
	var typeid = parseInt(cl.attr('typeid'));
	var tgNum = $(this).closest('.test_content').attr('tpgroup');
	var flag_check = 0;
	var totle_check = 0;
	var isCheck = $(this).val();
	var fl = false;
	if(typeid==5 || typeid==6){
		$(this).parent().find('input[type="text"]').each(function(){
			if($(this).val()){
				fl = true;
			}
		});
		//填空和排序判断是否为空
		if(fl){
			$('#topicGroup .tab_selct').each(function(k,v){
					if(k==tgNum){
						$(this).children().find('li').eq(index).removeClass('bg_hui').addClass('bg_lv');
							var tl = $(this).children().find('li');
							 totle_check = tl.length;
						$(this).children().find('li').each(function(){
							if($(this).hasClass('bg_lv')){
								flag_check++;
							}
						});
					}
				});
				var n = Math.ceil((flag_check/totle_check)*100);
				//alert(n);
				$('#tg'+tgNum).html(n);
				$(".progressBar").each(function(i,n){
					if(i==tgNum){
						$(n).progressBar();
					}
				});
		}else{
			$('#topicGroup .tab_selct').each(function(k,v){
				if(k==tgNum){
					$(this).children().find('li').eq(index).removeClass('bg_lv').addClass('bg_hui');
						var tl = $(this).children().find('li');
						 totle_check = tl.length;
					$(this).children().find('li').each(function(){
						if($(this).hasClass('bg_lv')){
							flag_check++;
						}
					});
				}
			});
			var n = Math.ceil((flag_check/totle_check)*100);
			//alert(n);
			$('#tg'+tgNum).html(n);
			$(".progressBar").each(function(i,n){
				if(i==tgNum){
					$(n).progressBar();
				}
			});

		}

	}else{
		if(isCheck.length>0){
			$('#topicGroup .tab_selct').each(function(k,v){
				if(k==tgNum){
					$(this).children().find('li').eq(index).removeClass('bg_hui').addClass('bg_lv');
						var tl = $(this).children().find('li');
						 totle_check = tl.length;
					$(this).children().find('li').each(function(){
						if($(this).hasClass('bg_lv')){
							flag_check++;
						}
					});
				}
			});
			var n = Math.ceil((flag_check/totle_check)*100);
			//alert(n);
			$('#tg'+tgNum).html(n);
			$(".progressBar").each(function(i,n){
				if(i==tgNum){
					$(n).progressBar();
				}
			});
		}else{
			$('#topicGroup .tab_selct').each(function(k,v){
				if(k==tgNum){
					$(this).children().find('li').eq(index).removeClass('bg_lv').addClass('bg_hui');
						var tl = $(this).children().find('li');
						 totle_check = tl.length;
					$(this).children().find('li').each(function(){
						if($(this).hasClass('bg_lv')){
							flag_check++;
						}
					});
				}
			});
			var n = Math.ceil((flag_check/totle_check)*100);
			//alert(n);
			$('#tg'+tgNum).html(n);
			$(".progressBar").each(function(i,n){
				if(i==tgNum){
					$(n).progressBar();
				}
			});

		}
	}
});
var CountTimer = (function(){
	var it = {};
	var int_d,
		int_h,
		int_m,
		int_s,
		distance,setInt,count;

	it.showtime = function(minute,id){//倒计时时间
		var t = minute * 60 , inttimer = 0;
		var timer = document.getElementById(id);
		count = t;

		setInt = setInterval(function(){
			t -= 1;
			if(t>0){
				distance = t;
				inttimer = it.IntTime(distance);
					timer.innerHTML = inttimer;
			}else{
				distance = 0;
				alert("考试结束");
				autoSubmit=true;
				$('#submitPaper').click();//倒计时结束后自动提交试卷
				clearInterval(setInt);
				timer.innerHTML = "00:00:00";
			}
		},1000);
	};
	it.taskTime = function(){//返回已用时间
			clearInterval(setInt);
			var task = count - distance;
			//var taskInt = it.IntTime(task);
			//return taskInt;
			var hours = Math.ceil(task/60);
			return hours;
	};

	it.IntTime = function(obj){//格式化秒
		int_h = Math.floor(obj/3600);
		obj -= int_h * 3600;

		int_m = Math.floor(obj/60);
		obj -= int_m * 60;

		int_s = Math.floor(obj/1);

		if(int_h < 10){
			int_h = "0" + int_h;
		}
		if(int_m < 10){
			int_m = "0" + int_m;
		}
		if(int_s < 10){
			int_s = "0" + int_s;
		}
		var str = int_h +':'+ int_m +':' + int_s ;
		return str;
	}

	return it;
})();

	if(examDuration==0){
		$('#timer').html('不限时');
	}else{
		CountTimer.showtime(examDuration,"timer");//调用倒计时,单位分钟
	}

//	$("#submitPaper").live('click',function(){
//		//alert("答题所用时间："+CountTimer.taskTime());//返回答题已用时间，精确到秒
//	});
});//jquery end
//倒计时


});//require end
// 拖拽后执行
function dropItems(idOfDraggedItem,targetId,x,y){
	//alert(idOfDraggedItem+'______'+targetId);
	var _v=$('#'+idOfDraggedItem).text();
	var id=(idOfDraggedItem.split('_'))[1];
	$('#'+targetId).find('.default_txt').val(_v).attr('alt',id);
}

//分页显示
function pageNum(num){
	$('.showpage').css('display','none');
	$('#topicGroup_'+num).css('display','block');
	$('#js_show_page_'+num).css('display','block');

}
$('.page').live('click',function(){
	var n = $(this).attr('num');
	$('.page').removeClass('currentp');
	$(this).addClass('currentp');
	pageNum(n);
	$(window).scrollTop(0, 0);  

});

