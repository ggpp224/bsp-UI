/**
 * @author gp
 * @datetime 2012-8-8
 * @description resources.js
 */

var BatchAdd_topicType='danxuan';

require(['jquery','ambow','jcookie','jstree','ListView','userjs','nyroModal','dxtree'],function(){
$(document).ready(function() {
	//设置全局变量

	// 批量增加选项
	$('.addmore').die().live('click',function(e) {
		e.preventDefault();
		$.fn.nyroModalManual({
			width:500,
			title:"批量增加选项",
			url: 'overlay_exammanage_addmore.shtml'
		});
		return false;
	 });

   var tpl = new Ambow.XTemplate(
		'<form method="post" name="add_form" id="add_form" action="#"><table width="800" border="0" align="center" cellpadding="2" cellspacing="2" >',
			/*'<tr>',
			'<td width="100" height="30" align="right"><i>* </i>试题编号：</td>',
			'<td colspan="2"> <input type="text" class="default_txt" value="" name="id" size="30" /></td>',
			'</tr>',*/
			'<tr>',
			'<td height="30" align="right"><i>*</i>  所属知识点：</td>',
			'<td colspan="2"><input type="hidden" class="js_input_knowledge" name="categoryCode" value="" ><input type="text" class="default_txt input_wait" value="" disabled name="categoryCode_txt" size="30" style="width:230px;"/> <input type="button" name="" class="btn btn_other departments"  value="选择" /></td>',
			'</tr>',
			'<tr>',
			'<td height="30" align="right"><i>*</i> 选择类型：</td>',
			'<td colspan="2" id="js_topicTypeSelect"></td>',
			'</tr>',
			'<tr>',
			'<td align="right" valign="top"><i>*</i>&nbsp;难度：</td>',
			'<td colspan="2" id="js_topicDifficulty"></td>',
			'</tr>',
			'<tr>',
//			'<td width="120" align="right" valign="top"><i>*</i> 题干：</td>',
//			'<td width="1"><textarea name="topicContent" cols="100" rows="4" onfocus="if(this.value==\'请输入题干....\')this.value=\'\';" onblur="if(this.value==\'\')this.value=\'请输入题干....\';">请输入题干....</textarea></td>',
//			'<td valign="top"><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a></td>',
			'<td width="120" valign="top" align="right"><i>*</i> 题干：</td>',
			'<td><div class="webtextdiv"><a href="" class="textedit ico_float addQuestions" title="高级内容编辑器" alt=""></a><textarea name="topicContent" class="textarea tarea" cols="100" rows="5" onfocus="if(this.value==\'请输入题干....\')this.value=\'\';" onblur="if(this.value==\'\')this.value=\'请输入题干....\';">请输入题干....</textarea></div></td>',
			'</tr>',
			'<tr>',
			'<td align="right"><i>*</i> 选项：</td>',
			'<td colspan="2"><input type="button" name="" class="btn btn_other addmore"  value="批量增加选项" />',

			'</td>',
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
			'<tbody class="openable_tbody">',
			'<tr><td class="first tc"><img src="../images/help/hook.gif" width="15" height="15" /></td><td class="first tc"><input type="radio" value="1" checked="checked"/><b> A ：</b><input name="optionContent" type="text" class="default_txt" size="80" /><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a><a class="deledit delcustomer" href="javascript:" title="删除"></a></td></tr>',
			'<tr><td class="first tc"></td><td class="first tc"><input type="radio" value="1" /><b> B ：</b><input name="optionContent" type="text" class="default_txt" size="80" /><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a><a class="deledit delcustomer" href="javascript:" title="删除"></a></td></tr>',
			'<tr><td class="first tc"></td><td class="first tc"><input type="radio" value="1" /><b> C ：</b><input name="optionContent" type="text" class="default_txt" size="80" /><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a><a class="deledit delcustomer" href="javascript:" title="删除"></a></td></tr>',
			'<tr><td class="first tc"></td><td class="first tc"><input type="radio" value="1" /><b> D ：</b><input name="optionContent" type="text" class="default_txt" size="80" /><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a><a class="deledit delcustomer" href="javascript:" title="删除"></a></td></tr>',

			'<!-- 这里留空 -->',
			'</tbody>',
			'</table>',
			'<div class="span_ico" style="right:100px;"><a href="#a" id="add_table" class="addedit"></a></div>',
			'</div>',
			'</td>',
			'</tr>',
			'<tr>',
			'<td align="center">&nbsp;</td>',
			'<td colspan="2">',
			'<input name="" type="button" class="btn btn_submit"  id="js_btn_save" value="保存" />',
			'<input name="" type="button" class="btn btn_reset" id="js_btn_back" value="取消" style="margin:0 2px"/>',
			//'<input name="" type="button" class="btn btn_submit"  id="preview" value="预览" />',
			'<input name="" type="button" class="btn btn_submit" id="js_btn_next" value="继续下一题" />',
			'</td>',
			'</tr>',
		'</table></form>'

	);
	$('#exammanage_box,#js_exammanage_box').empty();
	tpl.append(document.getElementById('js_exammanage_box'));
	$('#js_topicTypeSelect').html(Tiku.topicTypeSelect(1));
	$('#js_topicDifficulty').html(Tiku.topicDifficulty_select("0.5"));//难度值
	checking.checkcategoryCode_b();
	//checking.topicDifficulty_b();
	checking.checktopicContent_b();
	checking.checkoptionContent_b();

	// 绑定知识点功能
	Tiku.knowledge();

	$('#js_btn_save,#js_btn_next').die().live('click',function(){
		if(!checking.checkcategoryCode()) return false; //判断知识点不能为空
		//if(!checking.topicDifficulty()) return false;//判断难度系数输入是否正确
		if(!checking.checktopicContent()) return false; //题干验证
		if(!checking.checkoptionContent()) return false;//验证试题内容
		var sub=[],k=0,questionsCheck=true;
		var _id=$(this).attr('id');
		var f=document.add_form;
//		if(f.topicContent.value.length<20){
//			alert('题干内容不能少于20字！');
//			f.topicContent.focus();
//			return false;
//		}
		$('#js_exammanage_box').find('input[type="radio"]').each(function(){
			var _arr={};
			_arr.id=$(this).val();
			_arr.iscorrect=$(this).attr('checked')?1:0;
			_arr.optionOrder=k;
			var _content=$(this).parent().find('.default_txt').val();
//			if(_content.length<1){
//				alert('选项内容不能为空！');
//				$(this).parent().find('.default_txt').focus();
//				questionsCheck=false;
//				return false;
//			}
			_arr.optionContent=_content;
			sub.push(_arr);
		});
		var params = Ambow.urlDecode(Ambow.serializeForm('add_form'));

		if($('#js_exammanage_box').find('input:checked').length<1){
			alert('请设置正确答案');
			return false;
		}
		if($('#js_exammanage_box').find('input[type="radio"]').length<2){
			alert('至少2个选项');
			return false;

		}

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
			//url: 'evaluation_webservice/evaluation/topic/addtopic',
			url:G_URL['addtopic'],
			contentType:'application/json;charset=UTF-8',
			success:function(data){
				if(data.returnCode=='000000'){

					if(typeof(addType)=='undefined'){
						alert('试题新增'+data.returnMsg);
						if(_id=='js_btn_next') {
							window.location.href="exammanage_addQuestions.shtml";
						}else{
							window.location.href = "exammanage.shtml";
							//window.location.href="exammanage_addQuestions_edit.shtml?id="+data.entity+'&topicTypeId='+topicTypeId;
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
								input_select_change('examinationpaper_list_input_danxuan.html');
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

	//增加行
	$("#add_table").die().live('click',function(){
			var _tr=$("#tablelist tr");
			// 改這的時候，要同步overlay_exammanage_addmore.shtml内容
			$("#tablelist").append('<tr><td></td><td class="first tc "><input type="radio" value="1" /><b></b><input class="default_txt" type="text" size="80"  name="optionContent" value="" /><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a><a class="deledit delcustomer" href="javascript:" title="删除"></a></td></tr>');
			$("#tablelist").find('b').each(function(k,v){
				$(this).text(' '+String.fromCharCode(65+k)+' ：');
			});
	})
	// 删除行
	/*$('.deledit').die().live('click',function(){

			if($(this).closest("tr").next().attr('class')=='tips'){
				$(this).closest("tr").next().remove();
			}
			$(this).parent().parent().remove();
			$("#tablelist").find('b').each(function(k,v){
			$(this).text(' '+String.fromCharCode(65+k)+' ：');
			});

	});*/
	// 删除行
	$('.deledit').die().live('click',function(){
		if(confirm('确定删除吗?')){
			var ne=$(this).parent().parent().next();
			if(ne.attr('class')=='tips') ne.remove();
			$(this).closest('tr').remove();
			$(this).parent().parent().remove();
			$("#tablelist").find('b').each(function(k,v){
				$(this).text(' '+String.fromCharCode(65+k)+' ：');
			});
			return true;
		}
		return false;
	})
	// 选择正确答案
	Tiku.radio('tablelist');

	//预览



});


});

