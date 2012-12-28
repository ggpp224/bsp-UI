require(['jquery','ambow','jcookie','jstree','userjs','nyroModal','ListView','dxtree'],function(){
$(function(){

	/*-------------提示操作 可根据需要删除一下内容----------------*/

	var tpl = new Ambow.XTemplate(
	'<form name="addJudgment" id="addJudgment" method="post" action="">',
	'<table width="800" border="0" align="center" cellpadding="2" cellspacing="2" >',
	'<tr>',
	'<td height="30" align="right"><i>*</i>  所属知识点：</td>',
	'<td colspan="2"><input type="hidden" class="js_input_knowledge" name="categoryCode" value="" ><input type="text" class="default_txt input_wait" value="" disabled name="categoryCode_txt" size="30" style="width:230px;" /> <input type="button" name="" class="btn btn_other departments"  value="选择" /></td>',
	'</tr>',
	'<tr>',
	'<td height="30" align="right"><i>*</i> 选择类型：</td>',
	'<td colspan="2" id="js_topicTypeSelect"></td>',
	'</tr>',
	'<tr>',
	'<td align="right" valign="top"><i>*</i> 难度：</td>',
	'<td colspan="2" id="js_topicDifficulty"></td>',
	'</tr>',
	'<tr>',
	'<td width="120" align="right" valign="top"><i>*</i> 题干：</td>',
//	'<td width="1"><textarea name="topicContent" id="topicContent" cols="100" rows="4"></textarea></td>',
//	'<td valign="top"><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a></td>',
	'<td><div class="webtextdiv"><a alt="" title="高级内容编辑器" class="textedit ico_float addQuestions" href=""></a><textarea onblur="if(this.value==\'\')this.value=\'请输入题干....\';" onfocus="if(this.value==\'请输入题干....\')this.value=\'\';" rows="5" cols="100" class="textarea tarea" name="topicContent">请输入题干....</textarea></div></td>',
	'</tr>',
	'<tr>',
	'<td align="right">&nbsp;</td>',
	'<td colspan="2" class="exammanage_NodeSelect">',
	'<div class="exammanage_input">',
	'<table width="600" class="tablebox" id="tablelist">',
	'<thead class="table_header">',
	'<tr>',
	'<th colspan="4" class="first tc"></th>',
	'</tr>',
	'</thead>',
	'<tbody class="openable_tbody" id="js_exammanage_box">',
	'<tr>',
	'<td width="1" class="first tc"><img src="../images/help/hook.gif" width="15" height="15" /></td>',
	'<td class="first tc"><input name="judg" type="radio" value="1" id="" checked />',
	'<b> A ：</b><span class="content">正确</span></td>',
	'</tr>',
	'<tr>',
	'<td class="first tc"></td>',
	'<td class="first tc">',
	'<input name="judg" type="radio" id="" value="2" />',
	'<b> B ：</b><span class="content">错误</span></td>',
	'</tr>',
	'<!-- 这里留空 -->',
	'</tbody>',
	'</table>',
	'</div>',
	'</td>',
	'</tr>',
	'<tr>',
	'<td align="center">&nbsp;</td>',
	'<td colspan="2">',
	'<input name="" id="js_btn_save" type="button" class="btn btn_submit js_sub"   value="保存" />',
	'<input name="" type="button" class="btn btn_reset" id="js_btn_back" value="取消" style="margin:0 2px"/>',
	'<input name="" id="js_btn_next" type="button" class="btn btn_submit" value="继续下一题" />',
	'</td>',
	'</tr>',
	'</table>',
	'</form>'
	);
	$('#exammanage_box,#js_exammanage_box').empty();
	tpl.append(document.getElementById('js_exammanage_box'));
	$('#js_topicTypeSelect').html(Tiku.topicTypeSelect(3));
	$('#js_topicDifficulty').html(Tiku.topicDifficulty_select("0.5"));//难度值

	checking.checkcategoryCode_b();
	//checking.topicDifficulty_b();
	checking.checktopicContent_b();
	checking.checkoptionContent_b();

	// 绑定知识点功能
	Tiku.knowledge();


	$('#js_btn_save,#js_btn_next').die().live('click',function(){
		var _id = $(this).attr("id");
		var params = Ambow.urlDecode(Ambow.serializeForm('addJudgment'));
		var sub=[],k=0;

		$('#js_exammanage_box').find('input[type="radio"]').each(function(){
			var _arr={};
			_arr.id=$(this).val();
			_arr.iscorrect=$(this).attr('checked')?1:0;

			_arr.optionOrder=k;
			_arr.optionContent=$(this).parent().find('.content').html();
			sub.push(_arr);
		});

	params.creatorId = G_USER['id'];//创建人id
	params.companyId = G_COMPANYID;
	params.topicAnswerList=sub;

	topicTypeId = params.topicTypeId;
	//delete(params.input3);
	delete(params.judg);
	delete(params.categoryCode_txt);

	var str = Ambow.encode(params);
		if(!checking.checkcategoryCode()) return false; //判断知识点不能为空
		//if(!checking.topicDifficulty()) return false;//判断难度系数输入是否正确
		if(!checking.checktopicContent()) return false; //题干验证
		if(!checking.checkoptionContent()) return false;//验证试题内容
		$.ajax({
				type: 'POST',
				data:str,
				dataType: 'json',
				//url: '/evaluation_webservice/evaluation/topic/addtopic',
				url:G_URL['addtopic'],
				contentType:'application/json;charset=UTF-8',
				success:function(data){
					if(data.returnCode=='000000'){
						if(typeof(addType)=='undefined'){
							alert('试题新增'+data.returnMsg);
							if(_id == "js_btn_next"){
								window.location.href="exammanage_addJudgment.shtml";
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
									document.add_form.reset();
									$('.js_input_knowledge').val('');
									input_select_change('examinationpaper_list_input_panduan.html');
								}else{
									$('#js_btn_back').click();
								}
							});
						}
					}else{
						alert(data.returnMsg);
					}
				}
		});
	});

	// 选择正确答案
	Tiku.radio('tablelist');



});
});