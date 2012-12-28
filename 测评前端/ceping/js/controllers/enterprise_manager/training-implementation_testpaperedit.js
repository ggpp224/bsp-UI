
require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','WdatePicker','common','ListView','dxtree'],function(){
$(document).ready(function() {

   //加载data数据
   var id = getQuery('id');
   var getList = function(){
   url = G_URL['findexamimplement']+'?id='+id+'&callback=?';

   $.getJSON(url,function(data){
   		var list = data.list;
		var tpl = new Ambow.XTemplate(
			'<form id="flight" method="post" action="#" class="bigFrom" name="add_form">',
			'<table width="100%"  class="default_table form_table">',
			'<tr>',
			'<th colspan="2" valign="top">&nbsp;</th>',
			'</tr>',
			'<tr>',
			'<th ><span>*</span> 选择试卷：</th>',
			'<td ><input type="text" name="examPaperId" class="default_txt" value="{examPaperId}" size="55"/><input type="button" class="btn btn_default seltestpaper" value="选择试卷"/></td>',
			'</tr>',
			'<tr>',
			'<th><span>*</span> 实施名称：</th>',
			'<td><input type="text" name="implementName" class="default_txt" value="{implementName}" size="55"/>&nbsp;<a href="#a" class="showsearch2">展开</a><a href="#a" class="closebtn2">收起</a></td>',
			'</tr>',
			'</table>',
			'<div class="searchbox2">',
			'<table width="100%"  class="default_table form_table top10">',
			'<tr>',
			'<th>关联计划：</th>',
			'<td><input type="text" class="default_txt" value="" size="55" id="ThiselText"/><input id="ThiselText_id" type="hidden" name="trainImplCode" value="{trainImplCode}" />',
			'<input type="button" class="btn btn_default planChoose" value="选择"/></td>',
			'</tr>',
			'<tr>',
			'<th valign="top">描述：</th>',
			'<td><textarea name="information" rows="2" class="default_textarea w510">{information}</textarea></td>',
			'</tr>',
			'</table>',
			'</div>',
			'<table width="100%"  class="default_table form_table top10">',
			'<tr>',
			'<th ><span>*</span> 测试时长：</th>',
			'<td ><label>',
			'<input name="examDuration" type="text" value="{examDuration}" size="10" /> 分钟</label>',
			'<font class="tips">输入“0” 则不计时</font></td>',
			'</tr>',
			'<tr>',
			'<th><span>* </span>测试时效：</th>',
			'<td><input type="text" class="dateinput" id="startTime" onfocus="WdatePicker({isShowWeek:true,onpicked:function(){}})" value="{beginTime}" name="{beginTime}"/>',
			'&nbsp;-&nbsp;',
			'<input type="text" class="dateinput" id="endTime" onfocus="WdatePicker({isShowWeek:true,onpicked:function(){}})" value="{endTime}" name="{endTime}"/></td>',
			'</tr>',
			'<tr>',
			'<th ><span>* </span>测试模式：</th>',
			'<!--if star-->',
			'<tpl if="displayMode==0">',
			'<td >',
			'<label ><input type="radio" checked="checked" name="displayMode" value="0" />整卷</label>',
			'<input type="radio" name="displayMode" id="displayMode" value="1" />',
			'<label >每页<input type="text" name="perTopicNumber" value="{perTopicNumber}"/>题</label>',
			'</td>',
			'</tpl>',
			'<!--if end-->',
			'<!--if star-->',
			'<tpl if="displayMode==1">',
			'<td >',
			'<label ><input type="radio" name="displayMode" value="0" />整卷</label>',
			'<input type="radio" checked="checked" name="displayMode" id="displayMode" value="1" />',
			'<label >每页<input type="text" name="perTopicNumber" value="{perTopicNumber}"/>题</label>',
			'</td>',
			'</tpl>',
			'<!--if end-->',
			'</tr>',
			'<tr>',
			'<th ><span>*</span>允许参加次数 ：</th>',
			'<td ><label>',
			'<input name="answerNumber" type="text" value="{answerNumber}" size="10" />',
			'次</label>',
			'<font class="tips">输入&quot;0&quot;则不限次数</font></td>',
			'</tr>',

			'<tpl if="scoreSet== 0"><!--if start-->',
			'<tr>',
			'<th rowspan="2" valign="top" ><span>*</span>分数设置 ：</th>',
			'<td >',
			'<label ><input type="radio" checked="checked" name="scoreSet" value="0" /> 使用试题原始分数，不折算总分',
			'</label>',
			'</td></tr>',
			'<tr>',
			'<td ><input type="radio" id="scoreSet" name="scoreSet" value="1" />',
			'<label>按原试题的分数比例，将总分折算为',
			'<input type="text" name="discountedPoints" value="{discountedPoints}" size="10" />分',
			'</label></td>',
			'</tr>',
			'</tpl><!--if end-->',
			'<tpl if="scoreSet == 1"><!--if start-->',
			'<tr>',
			'<th rowspan="2" valign="top" ><span>*</span>分数设置 ：</th>',
			'<td >',
			'<label ><input type="radio" name="scoreSet" value="0" /> 使用试题原始分数，不折算总分',
			'</label>',
			'</td></tr>',
			'<tr>',
			'<td ><input type="radio" checked="checked" id="scoreSet" name="scoreSet" value="1" />',
			'<label>按原试题的分数比例，将总分折算为',
			'<input type="text" name="discountedPoints" value="{discountedPoints}" size="10" />分',
			'</label></td>',
			'</tr>',
			'</tpl><!--if end-->',
			'<tr>',
			'<th><span>*</span>测试对象：</th>',
			'<td><div class="divselect_btn">',
			'<input name="按钮" type="button" class="btn btn_default viewUser" value="预览测试对象"/>',
			'<input type="button" class="btn btn_default" rel="#select_departments" value="清空"/>',
			'<input type="button" class="btn btn_default imput_user" value="Excel导入人员"/>',
			'</div>',
			'<input type="button" class="btn btn_default setUser" value="设置"/>',
			'<label class="seltextbox">&nbsp;已选人数：<b class="wrongfont">100</b></label></td>',
			'</tr>',
			'<tr>',
			'<th valign="top">&nbsp;</th>',
			'<td><div class="h160 divselect borderall">',
			'<table width="100%" border="0" height="100%" class="sel_tabbox">',
			'<tr>',
			'<th >所属部门：</th>',
			'<td valign="top">',
			'<ul class="dept_list">',
			'<li ><a href="#" class="delico"  title="从列表删除">从列表删除</a>',
			'<span >[在线课件]时间管理技巧11111111111112222222222</span></li>',
			'<li><a href="#" class="delico"  title="从列表删除">从列表删除</a>',
			'目录节点字数不一样多</li>',
			'</ul>',
			'</td>',
			'</tr>',
			'<tr>',
			'<th>所属岗位：</th>',
			'<td valign="top">',
			'<ul class="dept_list">',
			'<li><a href="#" class="delico"  title="从列表删除">从列表删除</a>',
			'<span>目录字数比较多</span></li>',
			'<li><a href="#" class="delico"  title="从列表删除">从列表删除</a>',
			'<span>目录字数比较多</span></li>',
			'</ul>',
			'</td>',
			'</tr>',
			'<tr>',
			'<th >所属岗位：</th>',
			'<td valign="top"><ul class="dept_list">',
			'<li><a href="#" class="delico"  title="从列表删除">从列表删除</a>',
			'<span>岗位名称</span>',
			'</li>',
			'<li><a href="#" class="delico"  title="从列表删除">从列表删除</a>',
			'<span>岗位名称</span>',
			'</li>',
			'<li><a href="#" class="delico"  title="从列表删除">从列表删除</a>',
			'<span>岗位名称</span>',
			'</li>',
			'</ul>',
			'</td>',
			'</tr>',
			'<tr>',
			'<th >个人用户：</th>',
			'<td valign="top">',
			'<ul>',
			'<li>学员姓名 <a href="#" class="delico"  title="从列表删除">从列表删除</a>',
			'</li>',
			'<li>学员姓名 <a href="#" class="delico"  title="从列表删除">从列表删除</a>',
			'</li>',
			'<li>学员姓名 <a href="#" class="delico"  title="从列表删除">从列表删除</a>',
			'</li>',
			'<li>学员姓名 <a href="#" class="delico"  title="从列表删除">从列表删除</a>',
			'</li>',
			'</ul>',
			'</td>',
			'</tr>',
			'</table>',
			'</div></td>',
			'</tr>',
			'<tr>',
			'<th><span>* </span>通过条件：</th>',
			'<td><label>达标分数：',
			'<input type="text"  class="default_txt" name="qualifiedScores" value="{qualifiedScores}" size="8"/>',
			'</label>',
			'<label>优秀分数：',
			'<input type="text"  class="default_txt" name="excellentScores" value="{excellentScores}" size="8"/>',
			'</label></td>',
			'</tr>',
			'<tr>',
			'<th colspan="2">&nbsp;</th>',
			'</tr>',
			'</table>',
			'<h1 class="panel_title">培训反馈</h1>',
			'<table width="100%" border="0"  class="default_table form_table top10">',
			'<tr>',
			'<th rowspan="2" valign="top"><label>选择问卷：</label></th>',
			'<td><label>',
			'<select name="questionSurveyId" id="select">',
			'<option selected="selected">选择培训反馈问卷</option>',
			'<option>培训反馈问卷名称</option>',
			'</select></label><input  type="reset" class="btn btn_reset" value="预览问卷"/></td>',
			'</tr>',
			'<tr>',
			'<td><label class="clickbox">',
			'培训完成后',
			'<input type="text"  class="default_txt" size="5" name="surveyLimit" value="{surveyLimit}" />天内完成</label>',

			'<tpl if="ismandatory == 0" >',
			'<label><input name="ismandatory" type="checkbox" value="{ismandatory}" />强制反馈</label>',
			'</tpl>',

			'<tpl if="ismandatory == 1" >',
			'<label><input name="ismandatory" type="checkbox" checked="checked" value="{ismandatory}"  />强制反馈</label>',
			'</tpl>',

			'</td>',
			'</tr>',
			'</table>',
			'<div class="btn_box edit_box ">',
			'<input name="" type="button" id="js_btn_save" class="btn btn_submit"  value="确认" /> <input name="" type="reset" class="btn btn_reset"  onclick="location.href=\'training-implementation.shtml\';" value="取消" />',
			'</div>',
			'</form>',{
				format:function(d){
					var st = new Date(d);
					return st.format('yyyy-MM-dd');
				}

			}
		);
		tpl.append(document.getElementById('js_exammanage_box'),list[0]);
		fmat();

	});

   }


    var data = getList();
   //时间格式化
   var fmat = function(){
		var ds = parseInt($('#startTime').val());
		var st = new Date(ds);

		strs = st.format('yyyy-MM-dd');
		$('#startTime').val(strs);
		var de = parseInt($('#endTime').val());
		var et = new Date(de);
		stre = et.format('yyyy-MM-dd');
		$('#endTime').val(stre);
	}


focus_input.focusCheck("#displayMode","input[name='perTopicNumber']");
focus_input.focusCheck("#scoreSet","input[name='discountedPoints']");
$("#js_btn_save").live("click",function(){
		var params = Ambow.urlDecode(Ambow.serializeForm('add_form'));


		var str = Ambow.encode(params);
		$.ajax({
			type: 'GET',
			data:str,
			dataType: 'json',
			url:G_URL['updateexamimplement'],
			contentType:'application/json;charset=UTF-8',
			success:function(data){
				if(data.returnCode=='000000'){
					alert(data.returnMsg);
					alert("ok");
					window.location.href="training-implementation_testpaperedit.shtml?id="+data.entity;
				}else{
					alert(data.returnMsg);
				}
			}
		});
	});//save end






	setTimeout(function(){
		cbs.showSearchPanel(); //隐藏、显示更多信息
	},100);

	$('.planChoose').live("click",function(e){
		e.preventDefault();
		$.fn.nyroModalManual({
			width:600,
			title:'选择关联计划',
			url: 'overlay_plan_choose.shtml'
		});
	});

	 $('.seltestpaper').live("click",function(e){
		e.preventDefault();
		$.fn.nyroModalManual({
			width:600,
			url: 'overlay_sel_testpaper.shtml'
		});
	});
		//导入
	 $('.imput_user').live("click",function(e){
	 e.preventDefault();
		$.fn.nyroModalManual({
			width:380,
			title:'Excel导入人员',
			url: 'overlay_dep_import.shtml'
			});
		return false;
	});


	$('.setUser').live("click",function(e){
		 e.preventDefault();
		$.fn.nyroModalManual({
			width:715,
			title:'设置测试对象',
			url: 'overlay_training_setting.shtml'
	      });
			return false;
	});

	$('.viewUser').live("click",function(e){
		e.preventDefault();
		$.fn.nyroModalManual({
			width:600,
			title:'预览测试对象',
			url: 'overlay_user_view.shtml'
		});
	});

	 cbs.textScroll();
	});
});