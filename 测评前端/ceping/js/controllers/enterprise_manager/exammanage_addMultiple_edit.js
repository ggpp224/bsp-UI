/**
 * @author dqj
 * @datetime 2012-8-8
 * @description exammanage_addMultiple_edit.js
 */
var BatchAdd_topicType='duoxuan';

require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','ListView','dxtree'],function(){
$(document).ready(function() {

    //设置全局变量
	var id = getQuery('id');
	var topicTypeId = getQuery('topicTypeId');
	checkAll(name);//CheckBox全选

	$('.addmore').live('click',function(e) {
			e.preventDefault();
			$.fn.nyroModalManual({
			    width:500,
				title:"批量增加选项",
				url: 'overlay_exammanage_addmore.shtml'
			});
		return false;
	 });

//加载data数据
var getList = function(){
   url = G_URL['findtopicbyid']+'?id='+id+'&callback=?';
   $.getJSON(url,function(data){
   	var list = data.list;
   	var tpl = new Ambow.XTemplate(

			'<form method="post" name="add_form" id="add_form" action="#"><table width="800" border="0" align="center" cellpadding="2" cellspacing="2" >',
			'<tr>',
			'<td height="30" align="right"><i>*</i>  所属知识点：</td>',

			'<td colspan="2"><input type="hidden" class="js_input_knowledge" name="categoryCode" value="" ><input type="text" class="default_txt input_wait" value="" disabled name="categoryCode_txt" size="30" style="width:230px;" /> <input type="button" name="" class="btn btn_other departments"  value="选择" /></td>',

			'</tr>',
			'<tr>',
			'<td height="30" align="right" valign="top"><i>*</i> 选择类型：</td>',
			'<td colspan="2" id="js_topicTypeSelect"></td>',
			'</tr>',
			'<tr>',
			'<td align="right" valign="top"><i>*</i>&nbsp;难度：</td>',
			'<td colspan="2" id="js_topicDifficulty"></td>',
			'</tr>',
			'<tr>',
			'<td width="120" align="right" valign="top"><i>*</i> 题干：</td>',
//			'<td width="1"><textarea name="topicContent" cols="100" rows="4">{topicContent}</textarea></td>',
//			'<td valign="top"><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a></td>',
			'<td><div class="webtextdiv"><a alt="" title="高级内容编辑器" class="textedit ico_float addQuestions" href=""></a><textarea onblur="if(this.value==\'\')this.value=\'请输入题干....\';" onfocus="if(this.value==\'请输入题干....\')this.value=\'\';" rows="5" cols="100" class="textarea tarea" name="topicContent">{topicContent}</textarea></div></td>',
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
			'<tpl for="topicAnswerList">',
			'<tpl if="iscorrect == 1">',
			'<tr><td class="first tc"><img src="../images/help/hook.gif" width="15" height="15" /></td><td class="first tc"><input type="checkbox" value="1" name="Questions" checked="checked"/><b> A ：</b><input name="optionContent" type="text" value="{optionContent}" class="default_txt" size="80" /><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a><a class="deledit delcustomer" href="javascript:" title="删除"></a></td></tr>',
			'</tpl>',
			'<tpl if="iscorrect == 0">',
			'<tr><td class="first tc">&nbsp;</td><td class="first tc"><input type="checkbox" value="1" name="Questions"/><b> A ：</b><input name="optionContent" type="text" value="{optionContent}" class="default_txt" size="80" /><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a><a class="deledit delcustomer" href="javascript:" title="删除"></a></td></tr>',
			'</tpl>',
			'</tpl>',
			'<!-- 这里留空 -->',
			'</tbody>',
			'</table>',
			'<div class="span_ico"><a href="#a" id="add_table" class="addedit"></a></div>',
			'</div>',
			'</td>',
			'</tr>',
			'<tr>',
			'<td align="center">&nbsp;</td>',
			'<td colspan="2">',
			'<input name="" type="button" class="btn btn_submit"  id="js_btn_save" value="保存" />',
			'<input name="" type="button" class="btn btn_reset"  onclick="history.back()" value="返回" style="margin:0 2px"/>',
			'<input name="" type="button" class="btn btn_submit" id="preview" value="预览"/>',
//			'<input name="" type="button" class="btn btn_submit" onclick="location.href=\'exammanage_addMultiple.shtml\';" value="继续下一题" />',

			'</td>',
			'</tr>',
			'</table></form>'
			);

			tpl.append(document.getElementById('js_exammanage_box'),list[0]);
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

			$('#js_topicTypeSelect').html(Tiku.topicTypeSelect(2,true));
			$('#js_topicDifficulty').html(Tiku.topicDifficulty_select(list[0].topicDifficulty));//难度值
			$("#tablelist").find('b').each(function(k,v){
				$(this).text(' '+String.fromCharCode(65+k)+' ：');
			});
   });
   };
			var data = getList();

setTimeout(function(){
	checking.checkcategoryCode_b();
	//checking.topicDifficulty_b();
	checking.checktopicContent_b();
	checking.checkoptionContent_b();
   },1000);


			$('#js_btn_save').live('click',function(){

			if(!checking.checkcategoryCode()) return false; //判断知识点不能为空
			////if(!checking.topicDifficulty()) return false;//判断难度系数输入是否正确
			if(!checking.checktopicContent()) return false; //题干验证
			if(!checking.checkoptionContent()) return false;//验证试题内容

				var params = Ambow.urlDecode(Ambow.serializeForm('add_form'));
				var sub=[],k=0;
				$('#js_exammanage_box').find('input[type="checkbox"]').each(function(){
					var _arr={};
					_arr.id=$(this).val();
					_arr.iscorrect=$(this).attr('checked')?1:0;
					_arr.optionOrder=k;
					_arr.optionContent=$(this).parent().find('.default_txt').val();
					sub.push(_arr);
				});
				params.topicAnswerList=sub;
				params.creatorId = G_USER['id'];//创建人id
				params.companyId = G_COMPANYID;
				params.id = id;
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
							window.location="exammanage.shtml";
						}else{
							alert(data.returnMsg);
						}
					}
				});
			});
//增加行
$("#add_table").live('click',function(){
	//var _tr=$("#tablelist tr");
	// 改這的時候，要同步overlay_exammanage_addmore.shtml内容
	$("#tablelist").append('<tr><td></td><td class="first tc "><input type="checkbox" value="1" /><b></b><input class="default_txt" type="text" size="80" value="" /><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a><a class="deledit delcustomer" href="javascript:" title="删除"></a></td></tr>');
	$("#tablelist").find('b').each(function(k,v){
		$(this).text(' '+String.fromCharCode(65+k)+' ：');
	});
});

// 删除行
$('.deledit').live('click',function(){
	if(confirm('确定删除吗?')){
		var ne=$(this).parent().parent().next();
		if(ne.attr('class')=='tips') ne.remove();
		$(this).parent().parent().remove();

	}
	return false;
});

// 选择正确答案
	Tiku.chk('tablelist');
	//预览

$('#preview').live('click',function(){
	window.open('preview.shtml?id='+id+'&topicTypeId='+topicTypeId);
});


});//jquery end



});//require end

