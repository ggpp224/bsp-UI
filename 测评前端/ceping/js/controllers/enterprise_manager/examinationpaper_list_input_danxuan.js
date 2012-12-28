/**
 * @author dqj
 * @datetime 2012-8-9
 * @description exammanage_addMatch.js
 */

require(['jquery','ambow','nyroModal','jcookie','jstree','userjs'],function(){

  $(document).ready(function() {
	  $('.add_More').live('click', function(e) {
		     e.preventDefault();
			 $.fn.nyroModalManual({
				 width:520,
				 url:'overlay_question_addmore.shtml'
			 });
		   });



	   });

	});


		 var tpl = new Ambow.XTemplate(

		'<form id="form1" name="form1" method="post" action=""><table width="100%" border="0" class="default_table form_table top10 narrowth">',
		'<tr>',
		'<th style="width:170px;"><span>*</span> 设置题目存储知识点：</th>',
		'<td><input type="text" class="default_txt" value="222" size="30" name="categoryCode" disabled="disabled" />',
		'<input type="submit" class="btn btn_default" value="选择"/>',
		'</td>',
		'</tr>',

		'<tr>',
		'<th><span>*</span> 试题类型：</th>',
		'<td><select>',
		'<option>单项选择题</option>',
		'<option>多项选择题</option>',
		'<option>判断题</option>',
		'<option>填空题</option>',
		'<option>匹配题</option>',
		'<option>排序题</option>',
		'<option>简答题</option>',
		'<option>论述题</option>',
		'</select></td>',
		'</tr>',

		'<tr>',
		'<th><span>*</span> 试卷编号：</th>',
		'<td><input type="text" class="default_txt" id="" value="SHITIBIANHAO" name="" size="30"/></td>',
		'</tr>',

		'<tr>',
		'<th>难度：</th>',
		'<td><input type="text" value="0.50" class="default_txt" value="" name="topicDifficulty" size="8"/>&nbsp;',
		'<i class="font_red">* 难度值在0至1之间，数值越大，题目难度越大。</i>',
		'</td>',
		'</tr>',

		'<tr>',
		'<th valign="top"><span>*</span> 题干：</th>',
		'<td><input type="submit" class="btn btn_default" name="topicContent" value="高级内容编辑器"/>',
		'<textarea name="textarea2" rows="4" class="default_textarea w630"></textarea>',
		'</td>',
		'</tr>',

		'<tr>',
		'<th valign="top"><span>*</span> 选项：</th>',
		'<td><input type="submit" class="btn btn_default" value="批量增加选项"/></td>',
		'</tr>',

		'<tr><td colspan="2" ><hr /></td></tr>',

		'</table>',

		'<div class="but_box edit_box top10">',
		'<input type="button" class="btn btn_default" onclick="location.href=\'examinationpaper_list_view.shtml\';" value=" 预览 "/>',
		'<input type="button" class="btn btn_submit" onclick="location.href=\'examinationpaper_list_add.shtml\';" value=" 保存 "/>',
		'<input name="重置" type="reset" class="btn btn_reset" onclick="location.href=\'examinationpaper_list_add.shtml\';" value="取消"/>',
		'</div>',
		'</form>'
		);

			tpl.append(document.getElementById('content_body'),{val:"sss"});