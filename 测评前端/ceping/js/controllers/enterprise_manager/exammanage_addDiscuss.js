/**
 * @author dqj
 * @datetime 2012-8-9
 * @description exammanage_addAsk.js
 */

require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','ListView','dxtree'],function(){
$(document).ready(function() {

	var tpl = new Ambow.XTemplate(
		'<form  method="post" action="#" name="add_form">',
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
		'<td align="right" valign="top"><i>*</i>&nbsp;难度：</td>',
		'<td colspan="2" id="js_topicDifficulty"></td>',
		'</tr>',
		'<tr>',
		'<td align="right" valign="top"><i>*</i> 题干：</td>',
		'<td>',
		'<div class="webtextdiv">',
		'<a href="" class="textedit ico_float addQuestions" title="高级内容编辑器" alt=""></a>',
		'<textarea name="topicContent" class="textarea tarea" cols="100" rows="5" onfocus="if(this.value==\'请输入题干....\')this.value=\'\';" onblur="if(this.value==\'\')this.value=\'请输入题干....\';">请输入题干....</textarea>',
		'</div>',
		'</td>',
		'</tr>',
		'<tr>',
		'<td align="right" valign="top"><i>*</i> 正确答案：</td>',
		'<td>',
		'<div class="webtextdiv">',
		'<a href="" class="textedit ico_float addQuestions" title="高级内容编辑器" alt=""></a>',
		'<textarea id="js_topicAnswerList" name="topicAnswerList" class="textarea tarea" cols="100" rows="5"></textarea>',
		'<p class="error"></p>',
		'</div>',
		'</td>',
		'</tr>',
		'<tr>',
		'<td align="center">&nbsp;</td>',
		'<td>',
		'<input name="" type="button" class="btn btn_submit" id="js_btn_save" value="保存" />',
		'<input name="" type="button" class="btn btn_reset" id="js_btn_back" value="取消" style="margin:0 2px"/>',
//		'<input name="" type="button" class="btn btn_submit" id="preview" value="预览" />',
		'<input name="" type="button" class="btn btn_submit" id="js_btn_next" value="继续下一题" />',
		'</td>',
		'</tr>',
		'</table>',
		'</form>'
	);
	$('#exammanage_box,#js_exammanage_box').empty();

	tpl.append(document.getElementById('js_exammanage_box'));
	$('#js_topicTypeSelect').html(Tiku.topicTypeSelect(8));
	$('#js_topicDifficulty').html(Tiku.topicDifficulty_select("0.5"));//难度值

	checking.checkcategoryCode_b();
//	//checking.topicDifficulty_b();
	checking.checktopicContent_b();
	checking.checkoptionContent_b();

	// 绑定知识点功能
	Tiku.knowledge();
	$('#js_topicAnswerList').die().live('blur',function(event){
		var val = $.trim($(this).val());
		if(val.length==0){
			$(this).next().text('请输入题干内容');
		}else{
			$(this).next().empty();
		};
	});
	$("#js_btn_save,#js_btn_next").die().live('click',function(){
		var _id=$(this).attr('id');
		if(!checking.checkcategoryCode()) return false; //判断知识点不能为空
		////if(!checking.topicDifficulty()) return false;//判断难度系数输入是否正确
		if(!checking.checktopicContent()) return false; //题干验证
		if(!checking.checkoptionContent()) return false;//验证试题内容

		var params = Ambow.urlDecode(Ambow.serializeForm('add_form'));
		var sub=[],k=0;
		//$('#js_topicAnswerList').each(function(){
			var _arr={};
			_arr.id=1;
			_arr.iscorrect=1;
			_arr.optionOrder=k;
			var _content=$.trim($('#js_topicAnswerList').val());
			if(_content.length<1){
				alert('答案内容不能为空！');
				$('#js_topicAnswerList').val('').focus();
				return false
			}
			_arr.optionContent=_content;
			sub.push(_arr);
		//});
		params.topicAnswerList=sub;
		params.creatorId = G_USER['id'];//创建人id
		params.companyId = G_COMPANYID;

		delete(params.optionContent);
		delete(params.categoryCode_txt);
		topicTypeId = params.topicTypeId;
		var str = Ambow.encode(params);

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
						if(_id=='js_btn_next') {
							window.location.href="exammanage_addDiscuss.shtml";
						}else{
							window.location.href = "exammanage.shtml";
							//window.location.href="exammanage_addDiscuss_edit.shtml?id="+data.entity+'&topicTypeId='+topicTypeId;
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
								input_select_change('examinationpaper_list_input_lunshu.html');
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
});
});