/**
 * @author gp
 * @datetime 2012-8-9
 * @description 新增试卷模板
 */
 
 var exam_paper_tpl = new Ambow.XTemplate(
 	'<h1 class="panel_title">新增试卷</h1>',
		 		'',<form id="form1" name="form1" method="post" action="">
            
				'',<table width="100%" border="0" class="default_table form_table top10 narrowth">
               '', <tr>
                   '', <th style="width:150px;"><span>*</span> 试卷名称：</th>
                   '', <td><input type="text" class="default_txt" value="" size="30"/></td>
                '',</tr>
                
                '',<tr>
                   '', <th valign="top">试卷说明：</th>
                   '', <td><textarea name="textarea2" rows="4" class="default_textarea w630"></textarea></td>
               '', </tr>
                
                '',<tr>
                   '', <th><span>*</span> 试卷满分：</th>
                   '', <td><input type="text" class="default_txt" value="" size="8" disabled="disabled"/> 分</td>
               '', </tr>
                
                '',<tr><td colspan="2" ><hr /></td></tr>
                
                '',</table>
                
                
                
                
                
                '',<div class="examinationpaper_left">
                		'',<div class="boxborder">
                              '',<ul class="sj_sidemenu">
                                '',<li><a href="#" class="tree_up" title="上移">上移</a></li>
                                '',<li><a href="#" class="tree_down" title="下移">下移</a></li>
                                '',<li><a href="#"  class="tree_edit click_icon" title="编辑">编辑</a></li>
                                '',<li><a href="overlay_delsector.shtml" class="tree_dell click_icon overlay_text" title="删除">删除</a></li>
                              '',</ul>
                              '',<div class="sj_numlist">
                              		
                              '',</div>
                      '',</div>
                '',</div>
                
                
                
                
                
                
                '',<div class="examinationpaper_right">
                '',<table width="100%"  class="default_table form_table">
                
                '',<tr class="fpsave">
                  '',<td><h5>题组一名称</h5></td>
                 '', <td style="text-align:right;"><input type="button" class="btn btn_reset closebtn3" value=" 预览题组 "/></td>
                '',</tr>
                
                '',<tr><td colspan="2">&nbsp;</td></tr>
                
                '',<tr>
                   '', <th><span>*</span> 题组名称：</th>
                   '', <td><input type="text" class="default_txt" value="" size="30"/>&nbsp;
                       '', <label><input type="checkbox" />在试卷中显示题组名称和答题说明</label>
                    '',</td>
                '',</tr>
                
                '',<tr>
                    '',<th><span>*</span> 答题时间：</th>
                   '', <td><input type="text" class="default_txt" value="" size="8"/> 分钟</td>
                '',</tr>
                
               '', <tr>
                    '',<th valign="top">答题说明：</th>
                    '',<td><textarea name="textarea2" rows="4" class="default_textarea w510"></textarea></td>
                '',</tr>
                
                '',<tr>
                   '', <th><span>*</span> 题目选取方式：</th>
                   '', <td><label><input type="radio" name="fangshi" checked="checked" />&nbsp;题目固定</label>
                       '', <label><input type="radio" name="fangshi"   onclick="location.href='examinationpaper_list_suiji.shtml';" />&nbsp;题目随机</label>
                    '',</td>
                '',</tr>
                
                '',<tr>
                   '', <th valign="top"><span>*</span> 试题设置：</th>
                    '',<td><input type="button" class="btn btn_feature" onclick="location.href='examinationpaper_list_input_danxuan.shtml';" value=" 录入试题 "/>
					'',<input type="button" class="btn btn_default" onclick="location.href='examinationpaper_list_input_xitong.shtml';" value=" 让系统帮我选题 "/>
                    '',<input type="button" class="btn btn_default" onclick="location.href='examinationpaper_list_input_shoudong.shtml';" value=" 手动选题 "/>
					'',<input type="button" class="btn btn_default" onclick="location.href='examinationpaper_list_input_piliang.shtml';" value=" 批量导入试题 "/>
                    '',</td>
                '',</tr>
                
                '',<tr>
                    <th>&nbsp;</th>
                    <td><textarea name="textarea2" rows="4" class="default_textarea w510"></textarea></td>
                </tr>
                
                <tr>
                    <th>题组难度：</th>
                    <td><input type="text" class="default_txt" value="" size="8"/></td>
                </tr>
                
                <tr><td colspan="2">&nbsp;</td></tr>
                
                </table>
                </div>    
                
                <div class="clearer"></div>
                    
                    
                    

             <div class="but_box edit_box top10">
			        <input type="button" class="btn btn_default" onclick="location.href='examinationpaper_list_view.shtml';" value=" 预览题组 "/>
					<input type="button" class="btn btn_submit" onclick="location.href='examinationpaper.shtml';" value=" 保存题组 "/>
					<input name="重置" type="reset" class="btn btn_reset" onclick="location.href='examinationpaper.shtml';" value="取消"/>
			</div>
		 		</form>
		</div><!--//end:调查问券创建区-->
 );