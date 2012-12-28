/**
 * @author dqj
 * @datetime 2012-8-8
 * @description exammanage_addMultiple.js
 */
var BatchAdd_topicType='duoxuan';


require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','ListView','dxtree'],function(){
$(document).ready(function() {

	checkAll(name);//CheckBox全选

	var tpl = new Ambow.XTemplate(
		'<form  method="post" action="#" name="add_form" class="tree">',
		'<table width="800" border="0" align="center" cellpadding="2" cellspacing="2" >',
		'<tr>',
		'<td height="30" align="right"><i>*</i>  所属知识点：</td>',
		'<td colspan="2"><input type="hidden" class="js_input_knowledge" name="categoryCode" value="" ><input type="text" class="default_txt input_wait" value="" disabled name="categoryCode_txt" size="30" style="width:200px;"/> <input type="button" name="" class="btn btn_other departments"  value="选择" /></td>',
		'</tr>',
		'<tr>',
		'<td height="30" align="right"><i>*</i> 选择类型：</td>',
		'<td colspan="2" id="js_topicTypeSelect"></td>',
		'</tr>',
		'<tr>',
		'<td align="right" valign="top"><i>*</i>&nbsp;难度：</td>',
		'<td colspan="2" id="js_topicDifficulty"></td>',//<input name="topicDifficulty" type="text" class="default_txt" value="0.50" size="3" maxlength="4" />
		'</tr>',
		'<tr>',
		'<td width="120" align="right" valign="top"><i>*</i> 题干：</td>',
//		'<td width="1"><textarea name="topicContent" cols="100" rows="4" onfocus="if(this.value==\'请输入题干....\')this.value=\'\';" onblur="if(this.value==\'\')this.value=\'请输入题干....\';">请输入题干....</textarea></td>',
//		'<td valign="top"><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a></td>',
		'<td><div class="webtextdiv"><a alt="" title="高级内容编辑器" class="textedit ico_float addQuestions" href=""></a><textarea onblur="if(this.value==\'\')this.value=\'请输入题干....\';" onfocus="if(this.value==\'请输入题干....\')this.value=\'\';" rows="5" cols="100" class="textarea tarea" name="topicContent">请输入题干....</textarea></div></td>',
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
		'<tr><td class="first tc"><img src="../images/help/hook.gif" width="15" height="15" /></td><td class="first tc"><input name="" type="checkbox" checked="checked"  value="" /><b> A ：</b><input name="optionContent" type="text" class="default_txt" size="80" /><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a><a title="删除" href="javascript:" class="deledit delcustomer"></a></td></tr>',
		'<tr><td class="first tc"></td><td class="first tc"><input name="" type="checkbox" value="" /><b> B ：</b><input name="optionContent" type="text" class="default_txt" size="80" /><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a><a title="删除" href="javascript:" class="deledit delcustomer"></a></td></tr>',
		'<tr><td class="first tc"></td><td class="first tc"><input name="" type="checkbox" value="" /><b> C ：</b><input name="optionContent" type="text" class="default_txt" size="80" /><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a><a title="删除" href="javascript:" class="deledit delcustomer"></a></td></tr>',
		'<tr><td class="first tc"></td><td class="first tc"><input name="" type="checkbox" value="" /><b> D ：</b><input name="optionContent" type="text" class="default_txt" size="80" /><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a><a title="删除" href="javascript:" class="deledit delcustomer"></a></td></tr>',

		'</tbody>',
		'</table>',
		'<div class="span_ico"><a href="#a" id="add_table" class="addedit"></a></div>',
		'</div>',
		'</td>',
		'</tr>',
		'<tr>',
		'<td align="center">&nbsp;</td>',
		'<td colspan="2">',
//		'<input name="" type="button" class="btn btn_submit"  onclick="location.href=\'exammanage_addMultiple_edit.shtml\';" value="编辑" />',
		'<input name="" type="button" class="btn btn_submit" id="js_btn_save" value="保存" />',
		'<input name="" type="button" class="btn btn_reset" id="js_btn_back" value="取消" style="margin:0 2px"/>',
//		'<input name="" type="button" class="btn btn_submit"  onclick="location.href=\'exammanage_addMultiple_Preview.shtml\';" value="预览" />',
		'<input name="" type="button" class="btn btn_submit" id="js_btn_next"  value="继续下一题" />',
		'</td>',
		'</tr>',
		'</table>',
		'</form>'
	);
	$('#exammanage_box,#js_exammanage_box').empty();
	tpl.append(document.getElementById('js_exammanage_box'));
	$('#js_topicTypeSelect').html(Tiku.topicTypeSelect(2));
	$('#js_topicDifficulty').html(Tiku.topicDifficulty_select("0.5"));//难度值

	checking.checkcategoryCode_b();
	//checking.topicDifficulty_b();
	checking.checktopicContent_b();
	checking.checkoptionContent_b();
	// 绑定知识点功能
	Tiku.knowledge();

	$("#js_btn_save,#js_btn_next").die().live('click',function(){

		var _id=$(this).attr('id');
		if(!checking.checkcategoryCode()) return false; //判断知识点不能为空
		////if(!checking.topicDifficulty()) return false;//判断难度系数输入是否正确
		if(!checking.checktopicContent()) return false; //题干验证
		if(!checking.checkoptionContent()) return false;//验证试题内容

		var params = Ambow.urlDecode(Ambow.serializeForm('add_form'));
		var sub=[],k=0,questionsCheck=true;
		if($('#js_exammanage_box').find('input:checked').length<2){
			alert('正确答案不能少于2项');
			return;
		}
		$('#js_exammanage_box').find('input[type="checkbox"]').each(function(){
			var _arr={};
			_arr.id=$(this).val();
			_arr.iscorrect=$(this).attr('checked')?1:0;
			_arr.optionOrder=k;
			var _content=$(this).parent().find('.default_txt').val();
			if(_content.length<1){
				alert('选项内容不能为空！');
				$(this).parent().find('.default_txt').focus();
				questionsCheck=false;
				return false
			}
			_arr.optionContent=_content;
			sub.push(_arr);
		});
		if(questionsCheck==false){
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
			//url: '/evaluation_webservice/evaluation/topic/addtopic',
			url:G_URL['addtopic'],
			contentType:'application/json;charset=UTF-8',
			success:function(data){
				if(data.returnCode=='000000'){

					if(typeof(addType)=='undefined'){
						alert('试题新增'+data.returnMsg);
						if(_id == "js_btn_next"){
							window.location.href="exammanage_addMultiple.shtml";
						}else{
							window.location.href = "exammanage.shtml";
							//window.location.href="exammanage_addMultiple_edit.shtml?id="+data.entity+'&topicTypeId='+topicTypeId;
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
								input_select_change('examinationpaper_list_input_duoxuan.html');
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
	Tiku.chk('tablelist');
	/*-------------提示操作 可根据需要删除一下内容----------------*/

	$('.addmore').die().live('click',function(e) {
		e.preventDefault();
		$.fn.nyroModalManual({
			width:500,
			title:"批量增加选项",
			url: 'overlay_exammanage_addmore.shtml'
		});

		return false;
	});

	// 增加行
	$("#add_table").die().live('click',function(){
		var $table=$("#tablelist tr");
		var len=$table.length;
		// 改這的時候，要同步overlay_exammanage_addmore.shtml内容
		$("#tablelist").append("<tr id="+(len+1)+"><td></td><td class=\'first tc \'><input name=\'\' type=\'checkbox\' value=\'\' /><b></b>"+"<input class=\'default_txt\' type=\'text\' size=\'80\' value='' name='optionContent' />"+"<a href=\'#\' class=\'textedit addQuestions\' title=\'高级内容编辑器\'></a>"+"<a class=\'deledit\' href=\'javascript:\'></a></td></tr>");
		$("#tablelist").find('b').each(function(k,v){
			$(this).text(' '+String.fromCharCode(65+k)+' ：');
		});
	})
	// 删除行
	$('.deledit').die().live('click',function(){

		if(confirm('确定删除吗?')){
			var ne=$(this).parent().parent().next();
			if(ne.attr('class')=='tips') ne.remove();
			$(this).parent().parent().remove();
			$(this).closest('tr').remove();
			$("#tablelist").find('b').each(function(k,v){
				$(this).text(' '+String.fromCharCode(65+k)+' ：');
			});
			return true;
		}
		return false;
	})
});//jquery document.ready() end
})//require end
