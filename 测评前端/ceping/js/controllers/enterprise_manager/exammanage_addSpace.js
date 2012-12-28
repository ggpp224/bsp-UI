require(['jquery','ambow','jcookie','jstree','userjs','nyroModal','insertsome','dxtree','ListView','common'],function(){
$(function(){

	var tpl = new Ambow.XTemplate(
	'<form action="" method="post" name="addSpace" id="addSpace">',
	'<table width="800" border="0" align="center" cellpadding="2" cellspacing="2" >',
	'<tr>',
	'<td height="30" align="right"><i>*</i>  所属知识点：</td>',
	'<td><input type="hidden" class="js_input_knowledge" name="categoryCode" value="" ><input type="text" class="default_txt input_wait" value="" disabled name="categoryCode_txt" size="30" style="width:230px;"/> <input type="button" name="" class="btn btn_other departments"  value="选择" /></td>',
	'</tr>',
	'<tr>',
	'<td height="30" align="right"><i>*</i> 选择类型：</td>',
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
	'<textarea name="topicContent" id="topicContent" class="textarea tarea"  onblur="if(this.value==\'\')this.value=\'输入题干,点击【插入填空】在题干正文中插入填空....\';" onfocus="if(this.value==\'输入题干,点击【插入填空】在题干正文中插入填空....\')this.value=\'\';" cols="100" rows="10">输入题干,点击【插入填空】在题干正文中插入填空....</textarea>',
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
	/*<tr>'
	'<td colspan="2" class="first tc">空格<b>1 ：</b>',
	'<input name="input2" type="text" class="default_txt" size="30" />',
	'<a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a>',
	'<a href="javascript:void(0)" class="deledit delcustomer" title="" alt=""></a>',
	'<a href="#a" id="add_table" class="addedit" title="添加行" alt=""></a>',
	'</td>',
	'</tr>',
	*/
	'</tbody>',
	'</table>',
	'<tr>',
	'<td align="center">&nbsp;</td>',
	'<td colspan="2">',
	'<input name="" type="button" class="btn btn_submit"  id="js_btn_save" value="保存" />',
	'<input name="" type="button" class="btn btn_reset" id="js_btn_back" value="取消" style="margin:0 2px" />',
	//'<input name="" type="button" class="btn btn_submit"  id="preview" value="预览" />',
	'<input name="" type="button" class="btn btn_submit" id="js_btn_next" value="继续下一题" />',
	'</td>',
	'</tr>',
	'</table></form>',
	'</form>'
	);
	$('#exammanage_box,#js_exammanage_box').empty();
	tpl.append(document.getElementById('js_exammanage_box'));
	 $('#js_topicTypeSelect').html(Tiku.topicTypeSelect(6));
	 $('#js_topicDifficulty').html(Tiku.topicDifficulty_select("0.5"));//难度值

	 $('.addmore').die().live('click',function(e) {
			e.preventDefault();
			$.fn.nyroModalManual({
			    width:400,
				title:"批量增加选项",
				url: 'overlay_exammanage_addmore.shtml'
			});
		return false;
	 });

	 //高级编辑器
//	 $('.addQuestions').live('click',function(e) {
//			//e.preventDefault();
//			$.fn.nyroModalManual({
//				width:700,
//				height:480,
//				title:'高级文本编辑器',
//				url: 'overlay_addQuestions.shtml'
//			});
//	  	return false;
//	 });


	 // 绑定知识点功能
	Tiku.knowledge();

	//增加填空
	$("#add_table").die().live('click',function(){
			$(".tarea").insert({"text":"__________"});
			$("#tablelist").append('<tr><td colspan="2" class="first tc">空格<b> ：</b><input name="optionContent" type="text" class="default_txt" size="30" /><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a><a href="" class="deledit delcustomer" title="" alt=""></a><a href="#a" id="add_table" class="addedit" title="添加行" alt=""></a></td></tr>');
			var k = 0;
			$("#tablelist").find('b').each(function(){
				$(this).html('<span num='+(k+1)+'>'+(k+1)+'</span> ：');
				k++;
			});
		});

	// 删除行
	$('.delcustomer').die().live('click',function(){
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


	checking.checkcategoryCode_b();
	//checking.topicDifficulty_b();
	checking.checktopicContent_b();
	checking.checkoptionContent_b();
	$('#js_btn_save,#js_btn_next').die().live('click',function(){
		if(!checking.checkcategoryCode()) return false; //判断知识点不能为空
		//if(!checking.topicDifficulty()) return false;//判断难度系数输入是否正确
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
//		if(questionsCheck==false){
//			return false;
//		}
			params.topicAnswerList=sub;
			params.companyId = G_COMPANYID;
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
					url:G_URL['addtopic'],
					contentType:'application/json;charset=UTF-8',
					success:function(data){
						if(data.returnCode=='000000'){
							if(typeof(addType)=='undefined'){
								alert('试题新增'+data.returnMsg);
								if(_id == "js_btn_next"){
									window.location.href="exammanage_addSpace.shtml";
								}else{
									window.location.href = "exammanage.shtml";
									//window.location.href="exammanage_addSpace_edit.shtml?id="+data.entity+'&topicTypeId='+topicTypeId;
								}
							}else{

								alert('试卷试题新增'+data.returnMsg);
								var url = G_URL['findtopicbyid']+'?id='+data.entity+'&callback=?';
									$.getJSON(url,function(data){
										var list = data.list;
										current_topic_data.push(list[0]);
										topic.trigger('add',list);
								if(_id=='js_btn_next'){
									// 继续下一题（重置表单->清空知识点隐藏id-->重新ajax载入页面
									document.addSpace.reset();
									$('.js_input_knowledge').val('');
									input_select_change('examinationpaper_list_input_tiankong.html');
								}else{
										$('#js_btn_back').click();
									}
								});

							}
						}else{
							alert('试卷试题新增'+data.returnMsg);
						}
					}
			});

	});

});
});