/**
 * @author dqj
 * @datetime 2012-8-21
 * @description exammanage_addJudgment_edit.js
 */

require(['jquery','ambow','jcookie','jstree','userjs','nyroModal','ListView','dxtree'],function(){
$(document).ready(function() {

	//加载data数据

	var id = getQuery('id');
	var topicTypeId = getQuery('topicTypeId');
   var getList = function(){
   url = G_URL['findtopicbyid']+'?id='+id+'&callback=?';
   	$.getJSON(url,function(data){
   		var list = data.list;
		var tpl = new Ambow.XTemplate(
			'<form name="add_form" id="add_form" method="post" action="">',
			'<table width="800" border="0" align="center" cellpadding="2" cellspacing="2" >',
			'<tr>',
			'<td height="30" align="right"><i>*</i>  所属知识点：</td>',
			'<td colspan="2"><input type="hidden" class="js_input_knowledge" name="categoryCode" value="" ><input type="text" class="default_txt input_wait" value="" disabled name="categoryCode_txt" size="30" style="width:230px;" /> <input type="button" name="" class="btn btn_other departments"  value="选择" /></td>',
			'</tr>',
			'<tr>',
			'<td height="30" align="right" valign="top"><i>*</i> 选择类型：</td>',
			'<td colspan="2" id="js_topicTypeSelect"></td>',
			'</tr>',
			'<tr>',
			'<td align="right" valign="top"><i>*</i>难度：</td>',
			'<td colspan="2" id="js_topicDifficulty"></td>',
			'</tr>',
			'<tr>',
			'<td width="120" align="right" valign="top"><i>*</i> 题干：</td>',
//			'<td width="1"><textarea name="topicContent" id="topicContent" cols="100" rows="4">{topicContent}</textarea></td>',
//			'<td valign="top"><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a></td>',
			'<td><div class="webtextdiv"><a alt="" title="高级内容编辑器" class="textedit ico_float addQuestions" href=""></a><textarea onblur="if(this.value==\'\')this.value=\'请输入题干....\';" onfocus="if(this.value==\'请输入题干....\')this.value=\'\';" rows="5" cols="100" class="textarea tarea" name="topicContent">{topicContent}</textarea></div></td>',
			'</tr>',
			'<tr>',
			'<td align="right">&nbsp;</td>',
			'<td colspan="2" class="exammanage_NodeSelect">',
			'<div class="exammanage_input">',
			'<table width="600" class="tablebox" id="tablelist">',
			'<thead class="table_header">',
			'<tr><th colspan="4" class="first tc"></th></tr>',
			'</thead>',
			'<tbody class="openable_tbody" id="js_exammanage_box">',
			'<tpl for="topicAnswerList">',
			'<tpl if="iscorrect==1">',
			'<tr>',
			'<td class="first tc" width="1"><img src="../images/help/hook.gif" width="15" height="15" /></td><td class="first tc"><input name="judg" type="radio" value="1" id="" checked /><b> A ：</b><span class="content">{optionContent}</span></td>',
			'</tr>',
			'</tpl>',
			'<tpl if="iscorrect==0">',
			'<tr>',
			'<td class="first tc" width="1"></td><td class="first tc"><input name="judg" type="radio" id="" value="2" /><b> B ：</b><span class="content">{optionContent}</span></td>',
			'</tr>',
			'</tpl>',
			'</tpl>',
			'</tbody>',
			'</table>',
			'</div>',
			'</td>',
			'</tr>',
			'<tr>',
			'<td align="center">&nbsp;</td>',
			'<td colspan="2">',
			'<input name="" id="js_btn_save" type="button" class="btn btn_submit js_sub"   value="保存" />',
			'<input name="" type="button" class="btn btn_reset"  onclick="history.back()"  value="返回" style="margin:0 2px"/>',
			'<input name="" id="preview" type="button" class="btn btn_submit" value="预览" />',
//			'<input name="" id="js_btn_next" type="button" class="btn btn_submit" value="继续下一题" />',
			'</td>',
			'</tr>',
			'</table>',
			'</form>'
   );

		tpl.append(document.getElementById('exammanage_box'),list[0]);
		$('#js_topicTypeSelect').html(Tiku.topicTypeSelect(3,true));
		$('#js_topicDifficulty').html(Tiku.topicDifficulty_select(list[0].topicDifficulty));//难度值
		var els = Dom('add_form').elements;
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

   });
   };
		checking.checkcategoryCode_b();
		//checking.topicDifficulty_b();
		checking.checktopicContent_b();
		checking.checkoptionContent_b();

		var data = getList();
	$('#js_btn_save,#js_btn_next').die().live('click',function(){
		var _id = $(this).attr("id");
		var params = Ambow.urlDecode(Ambow.serializeForm('add_form'));
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
	params.id = id;
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
			url:G_URL['updatetopic'],
		   contentType:'application/json;charset=UTF-8',
				success:function(data){
					if(data.returnMsg=='成功'){
						alert(data.returnMsg);
						window.location.href="exammanage.shtml";
					}else{
						alert(data.returnMsg);
					}
				}
		});
	});
	//预览
	$('#preview').live('click',function(){
		window.open('preview.shtml?id='+id+'&topicTypeId='+topicTypeId);
	});
	// 选择正确答案
	Tiku.radio('tablelist');
});//jquery end
});//require end
