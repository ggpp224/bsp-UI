require(['jquery','ambow','jcookie','jstree','userjs','nyroModal','insertsome','dxtree','ListView'],function(){
$(function(){
	//设置全局变量
	var id = getQuery('id');
	var topicTypeId = getQuery('topicTypeId');

	//加载data数据
   var getList = function(){
   url = G_URL['findtopicbyid']+'?id='+id+'&callback=?';
   	$.getJSON(url,function(data){
   		var list = data.list;
   		var tpl = new Ambow.XTemplate(
		'<form action="" method="post" name="addSpace" id="addSpace">',
		'<table width="800" border="0" align="center" cellpadding="2" cellspacing="2" >',
		'<tr>',
		'<td height="30" align="right"><i>*</i>  所属知识点：</td>',
		'<td colspan="2"><input type="hidden" class="js_input_knowledge" name="categoryCode" value="<tpl for="knowlNameList">{id},</tpl>" ><input type="text" class="default_txt input_wait" disabled name="categoryCode_txt"  value="<tpl for="knowlNameList">{knowlName},</tpl>"  size="30" style="width:230px;"/> <input type="button" name="" class="btn btn_other departments"  value="选择" /></td>',
		'</tr>',
		'<tr>',
		'<td height="30" align="right" valign="top"><i>*</i> 选择类型：</td>',
		'<td id="js_topicTypeSelect"></td>',
		'</tr>',
		'<tr>',
		'<td align="right" valign="top"><i>*</i> 难度：</td>',
		'<td colspan="2" id="js_topicDifficulty"></td>',
		'</tr>',
		'<tr>',
		'<td align="right" valign="top"><i>*</i> 题干：</td>',
		'<td>',
		'<div class="webtextdiv">',
		'<a href="" class="textedit ico_float addQuestions" title="高级内容编辑器" alt=""></a>',
		'<textarea name="topicContent" id="topicContent" class="textarea tarea"  onblur="if(this.value==\'\')this.value=\'输入题干,点击【插入填空】在题干正文中插入填空....\';" onfocus="if(this.value==\'输入题干,点击【插入填空】在题干正文中插入填空....\')this.value=\'\';" cols="100" rows="10">{topicContent}</textarea>',
		'<br><a class="cont" id="add_table" ><b>+【插入填空】</b></a><br>',
		'</div></td>',
		'</tr>',
		'<tr>',
		'<td align="right" valign="top" class="first tc" ><div style="padding-top:13px;">正确答案：</div></td>',
		'<td class="exammanage_NodeSelect">',
		'<div class="exammanage_input" style="width:400px; ">',
		'<table width="100%" class="tablebox" id="js_exammanage_box">',
		'<thead class="table_header">',
		'<tr>',
		'<td class="first tc"></td>',
		'</tr>',
		'</thead>',
		'<tbody class="openable_tbody" id="tablelist">',
		'<tpl for="topicAnswerList">',
		'<tr>',
		'<td colspan="2" class="first tc">空格<b>{#} ：</b>',
		'<input name="input2" type="text" class="default_txt" size="30" value="{optionContent}" />',
		'<a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a>',
		'<a href="javascript:void(0)" class="deledit delcustomer" title="" alt=""></a>',
		'<a href="#a" id="add_table" class="addedit" title="添加行" alt=""></a>',
		'</td>',
		'</tr>',
		'</tpl>',
		'</tbody>',
		'</table>',
		'</div>',
		'<div class="clear"></div>',
		'</td>',
		'</tr>',
		'<tr>',
		'<td align="center">&nbsp;</td>',
		'<td>',
		'<input name="" id="js_btn_save" type="button" class="btn btn_submit js_sub"  value="保存" />',
		'<input name="" type="button" class="btn btn_reset" value="返回" onclick="history.back()" style="margin:0 2px" />',
		'<input name="" id="preview" type="button" class="btn btn_submit" value="预览" />',
//		'<input name="" type="button" class="btn btn_submit" value="继续下一题" />',
		'</td>',
		'</tr>',
		'</table></form>'

		);
		tpl.append(document.getElementById('js_exammanage_box'),list[0]);

		$('#js_topicTypeSelect').html(Tiku.topicTypeSelect(6,true));
		$('#js_topicDifficulty').html(Tiku.topicDifficulty_select(list[0].topicDifficulty));//难度值

		var els = Dom('addSpace').elements;
		var knowledges = list[0].knowlNameList,
			text=[],ids=[];
		for(var i=0,len=knowledges.length;i<len;i++){
			var rec=knowledges[i];
			ids.push(rec.id);
			text.push(rec.knowlName);
		}

		els.categoryCode_txt.value=text.join(',');
		els.categoryCode.value=ids.join(',');
		// 绑定知识点功能
		Tiku.knowledge('edit');


		checking.checkcategoryCode_b();
		////checking.topicDifficulty_b();
		checking.checktopicContent_b();
		checking.checkoptionContent_b();



   	});
   }
   var data = getList();

	$('#js_btn_save').live('click',function(){
		if(!checking.checkcategoryCode()) return false; //判断知识点不能为空
		////////if(!checking.topicDifficulty()) return false;//判断难度系数输入是否正确
		if(!checking.checktopicContent()) return false; //题干验证

		var _id=$(this).attr('id');

		var params = Ambow.urlDecode(Ambow.serializeForm('addSpace'));
		var sub=[],k=0,questionsCheck=true;

		if($('#tablelist').find('input[type="text"]').length < 1){
			alert("至少一个填空项！");
			return false;
		}
		if(!checking.checkoptionContent()) return false;//验证试题内容
		$('#tablelist').find('input[type="text"]').each(function(){

				var _arr={};

				_arr.id='';
				_arr.iscorrect=$(this).attr('checked');

				_arr.iscorrect=1;

				_arr.optionOrder=k;
				var _content=$.trim($(this).val());
//				if(_content.length<1){
//					alert('选项内容不能为空！');
//					$(this).focus();
//					questionsCheck=false;
//					return false;
//				}
				_arr.optionContent=_content;
				sub.push(_arr);
			});
		if(questionsCheck==false){
			return false;
		}
			params.topicAnswerList=sub;
			params.companyId = G_COMPANYID;
			params.id = id;
			params.creatorId = G_USER['id'];

			topicTypeId = params.topicTypeId;
			delete(params.input2);
			delete(params.categoryCode_txt);
			delete(params.optionContent);
			var str = Ambow.encode(params);

			$.ajax({
					type: 'POST',
					data:str,
					dataType: 'json',
					url:G_URL['updatetopic'],
					contentType:'application/json;charset=UTF-8',
					success:function(data){
						if(data.returnCode=='000000'){
							alert(data.returnMsg);
							window.location.href="exammanage.shtml";
						}else{
							alert(data.returnMsg);
						}
					}
			});

	});
	//高级编辑器
	 $('.addQuestions').live('click',function(e) {
			e.preventDefault();
			$.fn.nyroModalManual({
				width:700,
				height:480,
				title:'高级文本编辑器',
				url: 'overlay_addQuestions.shtml'
			});
	  	return false;
	 });


	 $('.departments').live('click',function(e) {
			G_zsdianChkObj=$(this);
			e.preventDefault();
			$.fn.nyroModalManual({
			    width:600,
				title:"选择知识点",
				url: 'overlay_exammanage_adjust.shtml'
			});
		return false;
	 });
	//删除填空项
	$('.delcustomer').live('click',function(){
		$(this).parent().parent().remove();
		var num = $(this).parent().find('span').attr('num');
		var topicContent = $('#topicContent').val();
		var ss = topicContent.split('__________');
		var temp = [];
		for(var i=0;i<ss.length;i++){
			if(i==num-1){
				temp.push(ss[i]);
				temp.push('');
			}else{
				temp.push(ss[i]);
				temp.push('__________');
			}
		}
		temp.pop();
		$('#topicContent').val(temp.join(''));
		var k = 0;
		$("#tablelist").find('b').each(function(){
			$(this).html('<span num='+(k+1)+'>'+(k+1)+'</span> ：');
			k++;
		});
		return false;
	});

 	//增加填空
	$(".cont,#add_table").live('click',function(){
		$(".tarea").insert({"text":"__________"});
		$("#tablelist").append('<tr><td colspan="2" class="first tc">空格<b> ：</b><input name="" type="text" class="default_txt" size="30" /><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a><a href="" class="deledit delcustomer" title="" alt=""></a><a href="#a" id="add_table" class="addedit" title="添加行" alt=""></a></td></tr>');
		var k = 0;
		$("#tablelist").find('b').each(function(){
			$(this).html('<span num='+(k+1)+'>'+(k+1)+'</span> ：');
			k++;
		});
	});
	//预览
	$('#preview').live('click',function(){
		window.open('preview.shtml?id='+id+'&topicTypeId='+topicTypeId)
	});
});
});