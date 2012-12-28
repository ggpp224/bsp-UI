/**
 * @author dqj
 * @datetime 2012-8-13
 * @description exammanage_addAsk_edit.js
 */

require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','ListView','dxtree'],function(){
$(document).ready(function() {

   //加载data数据
   var id = getQuery('id');
   var topicTypeId = getQuery('topicTypeId');
   var getList = function(){
		url = G_URL['findtopicbyid']+'?id='+id+'&callback=?';
	   $.getJSON(url,function(data){
	   		var list = data.list;
	   		var tpl = new Ambow.XTemplate(
			'<form  method="post" id="add_form" action="#" name="add_form">',
			'<table width="800" border="0" align="center" cellpadding="2" cellspacing="2" >',
			'<tr>',
			'<td height="30" align="right"><i>*</i>  所属知识点：</td>',
			'<td colspan="2"><input type="hidden" class="js_input_knowledge" name="categoryCode" value="" ><input type="text" class="default_txt input_wait" value="" disabled name="categoryCode_txt" size="30" style="width:230px;"/> <input type="button" name="" class="btn btn_other departments"  value="选择" /></td>',
			'</tr>',
			'<tr>',
			'<td height="30" align="right" valign="top"><i>*</i> 选择类型：</td>',
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
			'<textarea name="topicContent" class="textarea tarea" cols="100" rows="5">{topicContent}</textarea>',
			'</div>',
			'</td>',
			'</tr>',
			'<tr>',
			'<td align="right" valign="top"><i>*</i> 正确答案：</td>',
			'<td>',
			'<div class="webtextdiv">',
			'<a href="" class="textedit ico_float addQuestions" title="高级内容编辑器" alt=""></a>',
			'<tpl for="topicAnswerList">',
			'<textarea id="js_topicAnswerList" name="topicAnswerList" class="textarea tarea" cols="100" rows="5">{optionContent}</textarea>',
			'<p class="error"></p>',
			'</tpl>',
			'</div>',
			'</td>',
			'</tr>',
			'<tr>',
			'<td align="center">&nbsp;</td>',
			'<td>',
			'<input name="" type="button" class="btn btn_submit" id="js_btn_save" value="保存" />',
			'<input name="" type="button" class="btn btn_reset"  onclick="history.back()" value="返回" style="margin:0 2px" />',
			'<input name="" type="button" class="btn btn_submit" id="preview" value="预览" />',
//			'<input name="" type="button" class="btn btn_submit"  onclick="location.href=\'exammanage_addAsk.shtml\';" value="继续下一题" />',
			'</td>',
			'</tr>',
			'</table>',
			'</form>'
		);
			tpl.append(document.getElementById('js_exammanage_box'),list[0]);
			$('#js_topicTypeSelect').html(Tiku.topicTypeSelect(8,true));
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

   var data = getList();

	setTimeout(function(){
	checking.checkcategoryCode_b();
	//checking.topicDifficulty_b();
	checking.checktopicContent_b();
	checking.checkoptionContent_b();
   },100);

	$('#js_topicAnswerList').live('blur',function(event){
		var val = $.trim($(this).val());
		if(val.length==0){
			$(this).next().text('请输入题干内容');
		}else{
			$(this).next().empty();

		};
	});
	$("#js_btn_save").live('click',function(){

		if(!checking.checkcategoryCode()) return false; //判断知识点不能为空
		//if(!checking.topicDifficulty()) return false;//判断难度系数输入是否正确
		if(!checking.checktopicContent()) return false; //题干验证
		if(!checking.checkoptionContent()) return false;//验证试题内容

		var params = Ambow.urlDecode(Ambow.serializeForm('add_form'));
		var sub=[],k=0;

		var _arr={};
		_arr.id=1;
		_arr.iscorrect=1;
		_arr.optionOrder=k;
		var _content=$.trim($('#js_topicAnswerList').val());
		if(_content.length<1){
			alert('答案内容不能为空！');
			$('#js_topicAnswerList').val('aa');
			$(this).focus();
			return false
		}
		_arr.optionContent=_content;
		sub.push(_arr);

		params.topicAnswerList=sub;
		params.creatorId = G_USER['id'];//创建人id
		params.companyId = G_COMPANYID;
		params.id = id;
		topicTypeId = params.topicTypeId;
		delete(params.optionContent);
		delete(params.Questions);
		delete(params.categoryCode_txt);
		var str = Ambow.encode(params);
		$.ajax({
			type: 'POST',
			data:str,
			dataType: 'json',
			url: G_URL['updatetopic'],
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
	//预览
	$('#preview').live('click',function(){
		window.open('preview.shtml?id='+id+'&topicTypeId='+topicTypeId)
	});
});
});