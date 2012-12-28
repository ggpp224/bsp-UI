/**
 * @author gp
 * @datetime 2012-9-10
 * @description exammanage_import.js
 */
 	var isOk = function(){
 		var allow = ['doc','docx','xls','xlsx'];
		if($('.js_input_knowledge').val()==''){
			alert('知识点不能为空');
			return false;
		}
		if($('#js_files').val()==''){
			alert('上传文件不能为空');
			return false;
		}
		var st = $('#js_files').val();
		var arr = st.split('.');

		var flag = 0;

		for(var i=0;i<allow.length;i++){
			if(allow[i] == arr[arr.length-1].toLowerCase()){
				flag = 1;
			}
		}
		
		if(flag == 0){
			alert('上传的文件类型不正确');
			return false;
		}

		return true;
	}
require(['jquery','ambow','jcookie','jstree','userjs','nyroModal','insertsome','dxtree','ListView','common'],function(){	
$(document).ready(function() {
	
	
	 var tpl = new Ambow.XTemplate(

	 	'<form target="aaaaa" id="sampleform" method="post" onSubmit="return isOk()" action="'+G_ROOT+'/evaluation/topic/topicimport" enctype="multipart/form-data">',

		'<table width="587" border="0" align="center" cellpadding="0" cellspacing="0" >',
		'<tr>',
		'<td width="86" height="30" align="right">所属知识点：</td>',
		'<td width="501"> <input type="hidden" class="js_input_knowledge" name="categoryCode" value="" ><input type="text" disabled class="default_txt" value="" name="input2" size="30" />',
		'<input name="Button" type="button" class="btn btn_default set_node departments" value="设置归属节点" /></td>',
		'</tr>',
//		'<tr>',
//		'<td height="30" align="right">试题类型：</td>',
//		'<td id="js_topicTypeSelect">',
//		'</td>',
//		'</tr>',
		'<tr>',
		'<td height="30" align="right" valign="top">选择文件：</td>',
		'<td>',
		//'<input type="text" class="default_txt" size="40" value="" name=""/>',
		'<span class="sel_label">',
		'<input type="file" name="file" id="js_files" class="btn btn_default" value="浏览"/>',
		'</span>',
		'</td>',
		'</tr>',
		'<tr>',
		'<td align="right" valign="top">&nbsp;</td>',
		'<td>通过导入试题操作您可以向平台批量增加试题，请您先下在导入模板，录入完成后导入平台。</td>',
		'</tr>',
		'<tr>',
		'<td align="right">&nbsp;</td>',
		'<td><b style="color:#099"><a href="'+G_ROOT+'/template.xls'+'">下载导入模板</a></b></td>',
		'</tr>',
		'<tr>',
		'<td align="center">&nbsp;',
		'</td>',
		'<td>',
		'<input type="hidden" name="CreatorId" value="" id="crtId">',
		'<input type="hidden" name="CompanyId" value="" id="cmpId">',
		'<input name="" type="submit" id="import" class="btn btn_submit"  value="导入" />',
		'<input name="" type="button" class="btn btn_reset"  onclick=\'location.href="exammanage.shtml";\' value="返回" />',
		'</td>',
		'</tr>',
		'</table>',
		'</form>'
	 );
	$('#exammanage_box,#js_exammanage_box').empty();
	tpl.append(document.getElementById('js_exammanage_box'));
	$('#js_topicTypeSelect').html(Tiku.topicTypeSelect(1));
	$('#crtId').attr('value',G_USER['id']);
	$('#cmpId').attr('value',G_COMPANYID);
	//$('#sampleform').attr('action',G_URL['topicimport']);
	// 绑定知识点功能
	Tiku.knowledge();
	

});
});