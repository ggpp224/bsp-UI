/**
 * @author dqj
 * @datetime 2012-8-8
 * @description exammanage.js
 */

require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','ListView','WdatePicker'],function(){
$(function(){

	var tpl_action = new Ambow.XTemplate(
			'<table border="0" align="center" cellpadding="2" cellspacing="2" >',
			'<tr>',
			'<td height="30" align="right"><i>* </i>知识点名称：</td>',
			'<td> <input type="text" class="default_txt" value="知识点名称" name="input2" size="30" /></td>',
			'</tr>',
			'<tr>',
			'<td align="right" valign="top"><i>*</i> 知识点描述：</td>',
			'<td><textarea class="tarea" name="input4" cols="80" rows="6">知识点文字描述信息知识点文字描述信息知识点文字描述信息知识点文字描述信息知识点文字描述信息知识点文字描述信息知识点文字描述信息知识点文字描述信息知识点文字描述信息知识点文字描述信息知识点文字描述信息知识点文字描述信息知识点文字描述信息知识点文字描述信息知识点文字描述信息知识点文字描述信息知识点文字描述信息知识点文字描述信息知识点文字描述信息知识点文字描述信息知识点文字描述信息知识点文字描述</textarea></td>',
			'</tr>',
			'<tr>',
			'<td align="center">&nbsp;</td>',
			'<td><input name="" type="button" class="btn btn_submit"  onclick="location.href=\'knowledge.shtml\';" value="保存" /> <input name="" type="button" class="btn btn_reset"  onclick="location.href=\'knowledge.shtml\';" value="返回" /></td>',
			'</tr>',
			'</table>'
	);
	tpl_action.append(document.getElementById("exammanage_box"));




});//[ jquery end ]
});//[ require end ]
