/**
* @author dqj
* @datetime 2012-8-14
* @description training-implementation_testpaperadd.js
*/

// 测试对象 已选人数
function getUseraccount(){
	var params={},deptIdList=[],groupIdList=[],postIdList=[],userAccountIdList=[];
	for(var i=1;i<5;i++){
		$('#setting_to_'+i+' li').each(function(){
			var _id=($(this).find('.delico').attr('title')).split('_');
				_id=_id[_id.length-1];
			if(i==1)		 deptIdList.push(_id);
			else if(i==2)	 groupIdList.push(_id);
			else if(i==3)	 postIdList.push(_id);
			else			 userAccountIdList.push(_id);

		});
	};
	if(deptIdList.length == 0 && groupIdList.length==0 && postIdList.length==0 && userAccountIdList.length==0){
		return ;
	}
	params.deptIdList	=	deptIdList;
	params.groupIdList	=	groupIdList;
	params.postIdList	=	postIdList;
	params.userAccountIdList=	userAccountIdList;
	params.pageno		=	1;
	params.pagesize		=	100;

	var queryUrl= G_URL['findcountbycondition'];
	var str = Ambow.encode(params);
	$.ajax({
		type: 'POST',
		data:str,
		dataType: 'json',
		url:queryUrl,
		contentType:'application/json;charset=UTF-8',
		success:function(data){
			if(data.returnCode=='000000'){
				$('#chkedUserCount').text(data.rCount);
			}
		}
	});


}

function htmlOut(data){
	var arr={
		examDurationSet		:	1,
		isAllowedQuit		:	0,
		discountedPoints	:	100,
		beginTime			:	new Date(),
		endTime				:	new Date(),
		answerNumber		:	0,	// 允许参加次数
		scoreSet			:	1,	// 分数设置,1为折算为100分
		displayMode			:	0,	// 呈现方式
		isbacktracked		:	0,	// 是否允许返回上一题重新作答
		isTopicRandom		:	0,	// 题目随机
		isAnswerRandom		:	0,	// 选项随机
		readingMode			:	0,	// 填空题阅卷方式
		readingStartTime	:	new Date(),	// 阅卷起止时间
		readingEndTime		:	new Date().valueOf()+3600*1000*24*8,	// 阅卷起止时间
		cc					:	''
	};
	var v = data || arr;
	html='';
	html+='<input type="hidden" name="id" value="'+(v.id || '')+'" /><input type="hidden" name="creatorId" value="">';
	html+='<table width="100%"  class="default_table form_table">';
	html+='	<tr><td colspan="2" valign="top" class="online_exammanage_nav"><h4><b>基本设置</b></h4></td></tr>';
	html+='	<tr>';
	html+='		<th width="220" height="30" ><span>*</span> 选择试卷：</th>';
			var _examPaperTxt=[],_examPaperIds=[];
			for(var i in v.examPaperList){
				_examPaperTxt.push(v.examPaperList[i]['paperName']);
				_examPaperIds.push(v.examPaperList[i]['id']);
			}
			_examPaperTxt=_examPaperTxt.join(',');
			_examPaperIds=_examPaperIds.join(',');
	html+='		<td width="690" ><input type="text" id="select_shijuan_txt" class="default_txt_no" value="'+_examPaperTxt+'" disabled="disabled" size="55"/><input id="select_shijuan_id" type="hidden" name="examPaperId" value="'+_examPaperIds+'" />  <input type="button" class="btn btn_default seltestpaper" value="选择试卷"/> <input id="training_preview" type="button" class="btn btn_submit"  value="预览试卷" /></td>';
	html+='	</tr>';
	html+='	<tr>';
	html+='		<th height="30"><span>*</span> 考试名称：</th>';
	html+='		<td><input type="text" id="implementName" name="implementName" class="default_txt" size="55" value="'+( v.implementName || '')+'" /></td>';
	html+='	</tr>';
	html+='	<tr>';
	html+='		<th height="30" ><span>*</span> 考试时长：</th>';
	html+='	<td>';
	html+='		<input name="examDurationSet" class="examDurationSet" id="examDurationSet" type="radio" value="0" '+(v.examDurationSet==0?'checked':'')+' />';
	html+='		<label><input type="text" id="examDuration" name="examDuration" class="default_txt" size="6" value="'+(v.examDuration || '')+'" /> 分钟 </label>';
	html+='		<label><input name="examDurationSet" class="examDurationSet" type="radio" '+(v.examDurationSet==1?'checked':'')+' value="1" />不计时</label>';
	html+='	</td>';
	html+='	</tr>';
	html+='';
	html+='	<tr><th height="30"><span>* </span>时效：</th>';
	html+='		<td><input type="text" name="beginTime" value="'+(v.beginTime?new Date(v.beginTime).format('yyyy-MM-dd hh:mm:ss'):'')+'" class="dateinput" id="shixiao_beginTime" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\',isShowWeek:true,onpicked:function(){ EndTimeChange();}})"/>&nbsp;-&nbsp;';/* maxDate:\'#F{$dp.$D(\\\'shixiao_endTime\\\')}\',*/
	html+='			<input type="text" name="endTime" value="'+(v.endTime?new Date(v.endTime).format('yyyy-MM-dd hh:mm:ss'):'')+'" class="dateinput" id="shixiao_endTime" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\',isShowWeek:true,onpicked:function(){}})"/>';
//	html+='		<td><input type="text" name="beginTime" value="'+(v.beginTime?new Date(v.beginTime).format('yyyy-MM-dd'):'')+'" class="dateinput" id="shixiao_beginTime" onfocus="WdatePicker({isShowWeek:true,onpicked:function(){}})"/>&nbsp;-&nbsp;';
//	html+='			<input type="text" name="endTime" value="'+(v.endTime?new Date(v.endTime).format('yyyy-MM-dd'):'')+'" class="dateinput" id="shixiao_endTime" onfocus="WdatePicker({isShowWeek:true,onpicked:function(){}})"/>';
	html+='		</td>';
	html+='	</tr>';
	html+='';
	html+='	<tr><th height="30"><span>* </span>允许参加次数：</th>';
	html+='		<td>';
	html+='			<span><input name="answerNumber" id="answerNumber" type="radio" value="1" '+(v.answerNumber>0?'checked':'')+' /> <label>允许参加次数<input name="answerNumber_diy" type="text" class="default_txt" value="'+(v.answerNumber>0?v.answerNumber:'')+'" size="6"/></label>&nbsp; <label><input name="answerNumber" type="radio" '+(v.answerNumber==0?'checked':'')+' value="0" />不限次数</label></span>  &nbsp;<a href="javascript:;" class="showsearch2">更多设置</a><a href="javascript:;" class="closebtn2">收起设置</a>';
	html+='		</td>';
	html+='	</tr>';
	html+='</table>';
	html+='<div class="searchbox2">';
	html+='	<table width="100%"  class="default_table form_table top10" style="background:#F9F9F9; border:1px solid #ccc;">';
	html+='	<tr style="display:none">';
	html+='		<th width="220" height="60"> <span>* </span> 分数设置：</th>';
	html+='		<td width="690">';
	html+='		<p><label><input name="scoreSet" type="radio" '+(v.scoreSet==0?'checked':'')+' value="0" /> 使用试卷原始分数，不折算总分 </label></p>';
	html+='		<p><input name="scoreSet" id="scoreSet" type="radio" value="1" '+(v.scoreSet>0?'checked':'')+' /><label> 按原试卷的分数比例，将总分折算为';
	html+='		<input type="text" id="js_discountedPoints" name="discountedPoints" class="default_txt" value="'+(v.discountedPoints>0?v.discountedPoints:'100')+'" size="3"/>分</label></p>';
	html+='		</td>';
	html+='	</tr>';
	html+='	<tr>';
	html+='		<th height="30">通过条件：</th>';
	html+='		<td><label>达标分数：<input type="text" id="js_qualifiedScores" name="qualifiedScores" class="default_txt" value="'+(v.qualifiedScores?v.qualifiedScores:60)+'" size="3"/></label>';
	html+='		<label>优秀分数：<input type="text" id="js_excellentScores" name="excellentScores" class="default_txt" value="'+(v.excellentScores?v.excellentScores:80)+'" size="3"/></label>';
	html+='		</td>';
	html+='	</tr>';
	html+='	<tr>';
	html+='		<th height="30" valign="top"><span>* </span> 呈现方式：</th>';
	html+='		<td><label><input name="displayMode" class="displayMode" type="radio" value="0" '+(v.displayMode==0?'checked':'')+' /> 整卷 &nbsp; &nbsp;</label>';
	html+='		<label><input name="displayMode" type="radio" class="displayMode" value="1" '+(v.displayMode==1?'checked':'')+' /> 题组 &nbsp; &nbsp;</label>';
	html+='		<input name="displayMode" id="displayMode" type="radio" class="displayMode" value="2" '+(v.displayMode==2?'checked':'')+' />';
	html+='		<label>每页 <input type="text" name="perTopicNumber" id="perTopicNumber" class="default_txt" value="'+(v.displayMode==2?v.perTopicNumber:10)+'" size="3"/> 题</label>';
	html+='		</td>';
	html+='	</tr>';
	html+='	<tr style="display:none">';
	html+='		<th height="30" valign="top"><span>* </span> 是否允许返回上一题重新作答： </th>';
	html+='		<td><label><input name="isbacktracked" '+(v.isbacktracked==1?'checked':'')+' type="radio" value="1" /> 是  &nbsp; &nbsp;</label>';
	html+='		<label><input name="isbacktracked" type="radio" value="0" '+(v.isbacktracked==0?'checked':'')+' /> 否</label>';
	html+='		</td>';
	html+='	</tr>';
	html+='	<tr>';
	html+='		<th height="30" valign="top"> <span>* </span> 顺序显示规则： </th>';
	html+='		<td><label><input type="checkbox" name="isTopicRandom" id="checkbox" '+(v.isTopicRandom==0?'':'checked')+' /> 题目随机 &nbsp; &nbsp;</label>';
	html+='		<label><input type="checkbox" name="isAnswerRandom" id="checkbox2" '+(v.isAnswerRandom==0?'':'checked')+' /> 选项随机</label>';
	html+='		</td>';
	html+='	</tr>';
	html+='	<tr>';
	html+='		<th height="30" valign="top"><span>* </span> 是否允许答题过程中退出：</th>';
	html+='		<td><label><input name="isAllowedQuit" '+(v.isAllowedQuit==1?'checked':'')+' type="radio" value="1" />是 &nbsp;</label>';
	html+='		<label><input name="isAllowedQuit" type="radio" '+(v.isAllowedQuit==0?'checked':'')+' value="0" />否</label>';
	html+='		</td>';
	html+='	</tr>';
	html+='	<tr>';
	html+='		<th height="30"> 关联培训计划：</th>';
	var trainPlanName='';
	if(v.trainImplList){
		for(var i in v.trainImplList){
			trainPlanName+=v.trainImplList[i]['trainPlanName'];
		}
	}
	html+='		<td><input type="text" class="default_txt" disabled value="'+trainPlanName+'" size="55" id="ThiselText"/><input id="ThiselText_id" type="hidden" name="trainImplCode" value="'+(v.trainImplCode?v.trainImplCode:'')+'" />';
	html+='		<input type="button" class="btn btn_default planChoose" value="选择"/>';
	html+='		</td>';
	html+='	</tr>';
	html+='	<tr>';
	html+='		<th valign="top"> <label>详细信息：</label></th>';
	html+='		<td><textarea name="information" rows="2" class="default_textarea w510">'+(v.information?v.information:'')+'</textarea>  1000字符以内</td>';
	html+='	</tr>';
	html+='	<tr style="display:none">';
	html+='		<th height="30" valign="top">调查反馈：</th>';
	html+='		<td><select name="questionSurveyId" id="select2"></select>';
	html+='		<input type="button" class="btn btn_default" value="预览问卷"/>';
	html+='		</td>';
	html+='	</tr>';
	html+='	<tr style="display:none">';
	html+='		<th valign="top">&nbsp;</th>';
	html+='		<td><input type="checkbox" id="checkbox3" '+(v.ismandatory>0?'checked':'')+' /> 培训完成后';
	html+='		<label><input type="text" class="default_txt" value="'+(v.ismandatory>0?v.ismandatory:'10')+'" name="surveyLimit" size="3"/> 天内完成 &nbsp;</label>';
	html+='		<label><input type="checkbox" name="ismandatory" id="checkbox4" '+(v.ismandatory==0?'checked':'')+' /> 强制反馈 &nbsp;</label>';
	html+='		</td>';
	html+='	</tr>';
	html+='	</table>';
	html+='</div>';
	html+='';
	html+='<table width="100%"  class="default_table form_table top10">';
	html+='	<td colspan="2" valign="top" class="online_exammanage_nav"><h4><b>测评对象设置</b></h4></td>';
	html+='	<tr>';
	html+='	<th width="220"><span>*</span>测试对象：</th>';
	html+='	<td>';
	html+='		<div class="divselect_btn">';
	html+='		<input name="按钮" type="button" class="btn btn_default viewUser" value="预览测试对象"/>';
	html+='		<input type="button" class="btn btn_default" id="training_clear" value="清空"/>';
	//html+='		<input type="button" class="btn btn_default imput_user" value="Excel导入人员"/>';
	html+='		</div>';
	html+='		<input type="button" class="btn btn_default setUser" value="设置"/>';
	html+='		<label class="seltextbox">&nbsp;已选人数：<b id="chkedUserCount" class="wrongfont">0</b></label>';
	html+='	</td>';
	html+='	</tr>';
	html+='	<tr>';
	html+='	<th valign="top">&nbsp;</th>';
	html+='	<td>';
	html+='		<div class="h160 divselect borderall" style="height:auto">';
	html+='		<table width="100%" border="0" height="100%" class="sel_tabbox">';
	html+='		<tr>';
	html+='			<th >所属部门：</th>';
	html+='			<td valign="top"><ul class="dept_list" id="setting_to_1">';

				for(var i in v.deptList){
					var deptName = throwNull(v.deptList[i]['deptName']);
					html+='<li><a class="delico to1_'+v.deptList[i]['id']+'" title="'+v.deptList[i]['id']+'" href="javascript:">'+deptName+'</a><span>'+deptName+'</span></li>';
				}
	html+='		</ul></td>';
	html+='		</tr>';
	html+='		<tr>';
	html+='			<th>所属岗位：</th>';
	html+='			<td valign="top"><ul class="dept_list" id="setting_to_2">';

				for(var i in v.postList){
					html+='<li><a class="delico to2_'+v.postList[i]['id']+'" title="'+v.postList[i]['id']+'" href="javascript:">'+v.postList[i]['postName']+'</a><span>'+v.postList[i]['postName']+'</span></li>';
				}

	html+='		</ul></td>';
	html+='		</tr>';
	html+='		<tr>';
	html+='			<th >所属分组：</th>';
	html+='			<td valign="top"><ul class="dept_list" id="setting_to_3">';
				for(var i in v.groupList){
					html+='<li><a class="delico to2_'+v.groupList[i]['id']+'" title="'+v.groupList[i]['id']+'" href="javascript:">'+v.groupList[i]['groupName']+'</a><span>'+v.groupList[i]['groupName']+'</span></li>';
				}

	html+='		</ul></td>';
	html+='		</tr>';
	html+='		<tr>';
	html+='			<th >个人用户：</th>';
	html+='			<td valign="top"><ul class="dept_list" id="setting_to_4">';
				for(var i in v.userAccountList){
					html+='<li><a class="delico to4_'+v.userAccountList[i]['id']+'" title="'+v.userAccountList[i]['id']+'" href="javascript:">'+v.userAccountList[i]['userName']+'</a><span>'+v.userAccountList[i]['userName']+'</span></li>';
				}
	html+='		</ul></td>';
	html+='		</tr>';
	html+='		</table>';
	html+='		</div>';
	html+='	</td>';
	html+='	</tr>';
	html+='</table>';
	html+='<table width="100%" border="0"  class="default_table form_table top10" id="js_setYue" style="'+(v.readingMode==1?'':'display:none')+'">';
	html+='<colgroup>';
    html+='<col width="220">';
    html+='<col width="684">';
	html+='</colgroup>';
	html+='	<tr><td colspan="2" valign="top" class="online_exammanage_nav"><h4><b>试卷评阅设置</b></h4></td></tr>';
	html+='	<tr class="js_fillCount">';
	html+='	<th valign="top"><span>* </span> 填空题阅卷方式：</th>';
	html+='	<td id="readingMode">';
	html+='		<label><input type="radio" class="js_readingMode" name="readingMode" value="0" '+(v.readingMode==0?'checked':'')+' />机阅</label>';
	html+='		<label><input type="radio" class="js_readingMode" name="readingMode" id="readingMode_per" value="1" '+(v.readingMode!=0?'checked':'')+' />人工阅</label>';
	html+='	</td>';
	html+='	</tr>';
	html+='	<tr class="js_subjectiveCount">';
	html+='		<td colspan="2" style="padding:0;">';
	html+='		<table style="width:100%;'+(v.readingMode==1?'display:none':'')+'" id="hidden_reader">';
	html+='		<colgroup><col width="220"><col></colgroup>';
	html+='		<tr>';
	html+='		<th valign="top"><span>* </span> 指定阅卷人：</th>';
				var _readerList=[];
				for(var i in v.readerList){
					_readerList.push(v.readerList[i]['userName']);
				}
				_readerList=_readerList.join(',');

	html+='		<td><input id="readerId_txt" type="text" class="default_txt_no" value="'+_readerList+'" disabled="disabled" size="55"/><input type="hidden" name="readerId" class="default_txt_no" id="readerId" value="'+(v.readerId || '')+'" size="55"/>  <input type="button" class="btn btn_default seltestman" value="选择阅卷人"/>&nbsp;</td>';
	html+='		</tr>';
	html+='		<tr class="js_subjectiveCount">';
	html+='		<th><span>* </span>阅卷起止时间：</th>';
	html+='		<td><input type="text" id="js_readingStart" name="readingStartTime" class="dateinput" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\',isShowWeek:true,onpicked:function(){EndTimeReal();}})" value="'+(v.readingStartTime?new Date(v.readingStartTime).format('yyyy-MM-dd hh:mm:ss'):'')+'" />&nbsp;-&nbsp;';
	html+='		<input type="text" id="js_readingEndTime" name="readingEndTime" class="dateinput" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\',isShowWeek:true,onpicked:function(){}})" value="'+(v.readingEndTime?new Date(v.readingEndTime).format('yyyy-MM-dd hh:mm:ss'):'')+'" />';
	html+='		</td>';
	html+='		</tr>';
//	html+='		<tr class="js_subjectiveCount" style="display:none">';
	html+='		<tr style="display:none">';
	html+='		<th ><span>* </span>阅卷方式：</th>';
	html+='		<td><label><input type="radio" name="reading_real" value="2" '+(v.readingMode==2?'checked':'')+' />实名阅卷</label>';
	html+='		<label><input type="radio" name="reading_real" value="1" '+(v.readingMode==2?'':'checked')+' /> 匿名阅卷</label>';
	html+='		</td>';
	html+='		</tr>';
	html+='		</table>';
	html+='		</td>';
	html+='</tr>';
	html+='</table>';

	html+='<table width="100%" border="0"  style="display:none;" class="default_table form_table top10" id="js_times" >';
	html+='		<tr><td colspan="2" valign="top" class="online_exammanage_nav"><h4><b>成绩显示时间设置</b></h4></td></tr>';
	html+='		<tr id="js_settime">';
	html+='		<th width="220"><span>* </span>成绩显示时间设置：</th>';
	html+='		<td id="showAnswerMode"><input type="radio" name="scoreDisplayMode" value="0" '+(v.scoreDisplayMode==0?'checked':'')+' class="js_setdefault" />立即显示<input type="radio" id="showAnswerMode_per" class="js_settime" value="1" '+(v.scoreDisplayMode!=0?'checked':'')+' name="scoreDisplayMode"  />设置显示时间</td>';
	html+='		</tr>';
	html+='		<tr class="js_sexam" style="'+(v.scoreDisplayMode==0?'display:none':'')+'"><th width="220"><span>* </span>设置成绩显示时间:</th><td><input type="text" id="js_showTime" name="scoreDisplayTime" class="dateinput" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\',isShowWeek:true,onpicked:function(){}})" value="'+(v.scoreDisplayTime?new Date(v.scoreDisplayTime).format('yyyy-MM-dd hh:mm:ss'):'')+'" /></td></tr>';

	html+='	<tr class="msgtext2">';
	html+='	<th >&nbsp;</th>';
	html+='	</tr>';
	html+='</table>';
	html+='<div class="btn_box edit_box ">';
	html+='<input name="" type="button" class="btn btn_submit w108" id="js_btn_save" value="确认实施" />';
	html+='<input name="" type="reset" class="btn btn_reset w108" onclick="history.back()" value="取消" />';
	html+='</div>';
	return html;
}

// 试卷评阅设置 阅卷方式切换
function examPaperYue(fillCount,subjectiveCount){
	// 如果存在填空题
	$('#js_times').show();
	$('#js_setYue').hide();
	if(parseInt(fillCount)>0) {
		$('#js_setYue,.js_fillCount').show();
		$('.js_subjectiveCount').hide();
		$('#js_settime').show();
		$('.js_showExam').show();

	}

		

	// 如果存在主观题
	$('.js_readingMode').attr('checked',false);
	if(parseInt(subjectiveCount)>0){
		$('#js_setYue').show();
		$('.js_fillCount').hide();
		$('.js_readingMode').eq(1).attr('checked',true);// 人工阅
		$('.js_subjectiveCount').show();
		$('#hidden_reader').show();
		$('#js_settime').hide();
		$('.js_sexam').show();
	}else{
		$('.js_readingMode').eq(0).attr('checked',true);
		$('#hidden_reader').hide();
		//$('.js_sexam').hide();
	}
}

//自动改变考试时效的结束时间
function EndTimeChange(){
	var starTime,endTime,num = 0;
		starTime=new Date($('#shixiao_beginTime').val().replace(/-/g,"/"));
		starTime=Date.parse(starTime);
	if($('#examDurationSet').attr('checked')==true){
		num = $('#examDuration').val();
		var reg = new RegExp("^[1-9][0-9]*$"); //非零开头
		if(reg.test(num)){
			endTime=starTime+num*60*1000;
		}else if(num == 0){
			endTime = starTime;
		}else{
			alert("请输入数字");
			endTime = starTime;
		}
		//考试结束时间及阅卷开始时间
		endTime=new Date(endTime).format('yyyy-MM-dd hh:mm:ss');
		$('#shixiao_endTime,#js_readingStart').val(endTime);
	}
	//阅卷结束时间
	EndTimeReal();
}
//阅卷结束时间
function EndTimeReal(){
var starTimeReal = new Date($('#js_readingStart').val().replace(/-/g,"/"));
	starTimeReal = Date.parse(starTimeReal);
	var endTimeReal = starTimeReal+3600*1000*24*8;
	endTimeReal = new Date(endTimeReal).format('yyyy-MM-dd hh:mm:ss');
	$('#js_readingEndTime').val(endTimeReal);
}
// 绑定相关事件
function htmlBind(){
	// 调查反馈选项
	$.getJSON(G_URL['findquestionsurveylist']+'?companyId='+G_COMPANYID+'&callback=',function(data){
		if(data.returnCode=='000000'){
			var html='';
			for(var i in data.list){
				var v=data.list[i];
				html+='<option value="'+v.id+'">'+v.quesName+'</option>';
			}
			$('#select2').html(html);
		}
	});

	focus_input.focusCheck("#examDurationSet","input[name='examDuration']");
	focus_input.focusCheck("#answerNumber","input[name='answerNumber_diy']");
	focus_input.focusCheck("#scoreSet","input[name='discountedPoints']");
	focus_input.focusCheck("#displayMode","input[name='perTopicNumber']");
	focus_input.focusCheck("#checkbox3","input[name='surveyLimit']");
	//判断是机阅还是人工阅卷
	var readerMode = $('#readingMode');
	readerMode.live('click',function(){
		if($('#readingMode_per').is(':checked')){
			$('#hidden_reader,.js_subjectiveCount').show();
		}else{
			$('#hidden_reader,.js_subjectiveCount').hide();
		}
	});
	readerMode.click();
	//判断是默认显示试卷时间还是固定时间显示
	var showAnswerMode = $('#showAnswerMode');
	showAnswerMode.live('click',function(){
		if($('#showAnswerMode_per').is(':checked')){
			$('.js_sexam').show();
		}else{
			$('.js_sexam').hide();
		}
		
	});
	
	$('.set_node').click(function(e) {
		e.preventDefault();
		$.fn.nyroModalManual({
			width:600,
			title:'设置归属节点',
			url: 'overlay_ownership.shtml'
		});
		return false;
	});

	$(".searchbox, .searchbox2").hide();
	$(".showsearch, .showsearch2").show();
	$(".closebtn2").hide();
	$.cookie('searchbox, searchbox2', 'hide', { expires: 2 });
	cbs.showSearchPanel(); //隐藏、显示更多信息
	// 关联培训计划
	$('.planChoose').click(function(e){
		e.preventDefault();
		$.fn.nyroModalManual({
			width:600,
			title:'选择关联计划',
			url: 'overlay_plan_choose.shtml'
		});
	});
	// 选择试卷
	$('.seltestpaper').click(function(e){
		e.preventDefault();
		$.fn.nyroModalManual({
			width:600,
			url: 'overlay_sel_testpaper.shtml'
		});
	});
	$('.dept_list').find('.delico').click(function(){
		$(this).parent().remove();
		getUseraccount();
	});
	// 清空
	$('#training_clear').click(function(){
		if(confirm('确定清空吗?')){
			for(var i=1;i<5;i++){
				$('#setting_to_'+i).empty();
			}
			$('#chkedUserCount').html(0);
			return true;
		}
		return false;
	})
	// 试卷预览按钮
	$('#training_preview').click(function(){
		var id=parseInt($('#select_shijuan_id').val());
		if(id) window.open('./examinationpaper_list_view.shtml?id='+id);
		else alert('请选择试卷');
	})


	// 选择阅卷人
	$('.seltestman').click(function(e){
		e.preventDefault();
		$.fn.nyroModalManual({
			width:400,
			height:400,
			url: 'overlay_seltestman.shtml'
		});
	});

	$('#js_discountedPoints').blur(function(){
		var num=parseInt($.trim($(this).val()));
		var reg = new RegExp("^[1-9][0-9]*$");
		if(reg.test(num)){
			$('#js_qualifiedScores').val(parseInt(num*0.6));
			$('#js_excellentScores').val(parseInt(num*0.8));
		}else{
			alert('请输出分值');
			$(this).val(100).focus();
		}
	})
	//导入
	$('.imput_user').click(function(e){
		e.preventDefault();
		$.fn.nyroModalManual({
			width:380,
			title:'Excel导入人员',
			url: 'overlay_dep_import.shtml'
		});
		return false;
	});

	$('#examDuration').change(function(){
		EndTimeChange();
	});
	$('#pop_testpaper_subm').live('click',function(){
		EndTimeChange();
	});



	// 设置测试对象
	$('.setUser').click(function(e){
		 e.preventDefault();
		$.fn.nyroModalManual({
			width:715,
			title:'设置测试对象',
			url: 'overlay_training_setting.shtml'
	  });
		return false;
	});

	$('.setselUser').click(function(e){
		e.preventDefault();
		$.fn.nyroModalManual({
			width:715,
			title:'设置选测人员',
			url: 'overlay_training_setting.shtml'
	  });
		return false;
	});
	//预览测试对象
	$('.viewUser').click(function(){
		var params={},deptIdList=[],groupIdList=[],postIdList=[],userAccountIdList=[];
		for(var i=1;i<5;i++){
			$('#setting_to_'+i+' li').each(function(){
				var _id=($(this).find('.delico').attr('title')).split('_');
					_id=_id[_id.length-1];
				if(i==1)		 deptIdList.push(_id);
				else if(i==2)	 groupIdList.push(_id);
				else if(i==3)	 postIdList.push(_id);
				else			 userAccountIdList.push(_id);

			});
		};

		if(deptIdList.length == 0 && groupIdList.length==0 && postIdList.length==0 && userAccountIdList.length==0){
			alert('请选择测试对象');
			return ;
		}
		$.fn.nyroModalManual({
			width:600,
			height:380,
			title:'预览测试对象',
			url: 'overlay_user_view.shtml'
		});
	});


	cbs.textScroll();

	$(".msgtext2").hide();
	$(".gongkai").click(function(){
	   if($(this).attr("id") == "radio1" && ($(this).attr("checked") == true || $(this).attr("checked") == "checked")) {
			$(".msgtext1").show();
			$(".msgtext2").hide();
		}else{
			$(".msgtext1").hide();
			$(".msgtext2").show();
		}
	});
}

require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','WdatePicker','ListView','dxtree'],function(){
$(document).ready(function() {
	var id=getQuery('id');
	var trainPlanId=getQuery('trainPlanId');
	var isExamination = getQuery('isExamination');
	if(id==''){
		if(trainPlanId || isExamination){
			var pid=getQuery('pid'),pname=getQuery('pname');// 试卷id,试卷名称
			var trainPlanName=getQuery('trainPlanName');// 计划name
			//通过试卷ID取试卷信息
			$.getJSON(G_URL['findexampaperdbasebyid']+'?id='+pid+'&callback=',function(info){
				if(info.returnCode=='000000'){
					// 取培训计划详情
						$.getJSON(G_URL['findexamimplementbytrainplanid']+'?trainPlanId='+trainPlanId+'&callback=',function(data){
							if(data.returnCode=='000000'){
								$('#flight').html(htmlOut(data.list[0]));
								// 填空题 主观题数
								examPaperYue(info.list[0]['fillCount'],info.list[0]['subjectiveCount']);
								$('#select_shijuan_txt').val(decodeURIComponent(pname));
								$('#select_shijuan_id').val(pid);
								if(pid) $('.seltestpaper').hide();

								$('#ThiselText').val(trainPlanName);
								$('#ThiselText_id').val(trainPlanId);
								$('.planChoose').remove();

								htmlBind();
							}
						});
				}
			});

		}else{
			$('#flight').html(htmlOut());
			var pid=getQuery('pid'),pname=getQuery('pname');// 试卷id,试卷名称
			$('#select_shijuan_txt').val(decodeURIComponent(pname));
			$('#select_shijuan_id').val(pid);
			if(pid) $('.seltestpaper').hide();
			htmlBind();
		}


	}else{
		var preview=getQuery('preview');
		document.title='编辑在线考试';
		$('.panel_title').text('编辑在线考试');
		$('.bread_crumbs b').text('编辑在线考试');

		$.getJSON(G_URL['findexamimplement']+'?id='+id+'&callback=?',function(data){
			$('#flight').html(htmlOut(data.list[0]));
			var _examPaperList = data.list[0]['examPaperList'][0];
			// 如果存在填空题
			if(parseInt(data.list[0]['examPaperList'][0]['fillCount'])>0) {
				$('#js_setYue,.js_fillCount').show();
				$('.js_subjectiveCount').hide();
			}
			// 如果存在主观题
			$('.js_readingMode').attr('checked',false);
			// 填空题 主观题数
			examPaperYue(data.list[0]['examPaperList'][0]['fillCount'],data.list[0]['examPaperList'][0]['subjectiveCount']);

			htmlBind();
			if(preview) $('input,select,textarea').attr('disabled',true);
			getUseraccount();
			// 隐藏、显示更多信息
			cbs.showSearchPanel();

		});
	}
	$("#js_btn_save").live('click',function(){
		var params = Ambow.urlDecode(Ambow.serializeForm('add_form'));
		var id=params.id || '';
		//允许参加次数
		if(params.answerNumber == 1){
			params.answerNumber = params.answerNumber_diy || 1;
		}
		//选择不计时 计时时效的值为0
		if(params.examDuration == '' || params.examDurationSet == 1){
			params.examDuration = 0;
		}
		//题目随机
		params.isTopicRandom  = $("input[name='isTopicRandom']").attr("checked") ? 1 : 0;
		//选项随机
		params.isAnswerRandom = $("input[name='isAnswerRandom']").attr("checked") ? 1 : 0;
		//强制反馈
		params.ismandatory	  = $("input[name='ismandatory']").attr("checked") ? 1 : 0;
		var shixiao_beginTime=$('#shixiao_beginTime').val();
		var shixiao_endTime=$('#shixiao_endTime').val();
		var real_beginTime = $('#js_readingStart').val();
		var real_endTime = $('#js_readingEndTime').val();
		var js_showTime = $('#js_showTime').val();
		var readerId = $('#readerId_txt').val();
		var f_red = $('#js_setYue').css('display');
		//人工阅卷
		if(parseInt(params.readingMode) != '0'){
			params.readingMode = params.reading_real;
			//阅卷时效判断
			if(shixiao_endTime > real_beginTime){
				alert("阅卷开始时间不能小于考试结束时间");
				return false;
			}
			if(real_endTime < real_beginTime){
				alert("阅卷开始时间不能大于阅卷结束时间");
				return false;
			}
					
		}else if(parseInt(params.readingMode) == '1'){
			//时效：答案显示时间是否大于结束时间
			if(js_showTime < shixiao_endTime){
				alert("成绩显示时间不能小于实效结束时间");
				return false;
			}
		}

		if(parseInt(params.scoreDisplayMode)!=0){
			if(shixiao_endTime && (js_showTime < shixiao_endTime)){
				alert("成绩显示时间不能小于考试结束时间");
				return false;
			}
			if(isNaN(Date.parse(new Date(js_showTime.replace(/-/g,"/"))))){
				alert('请输入答案显示时间');
				return false;
			}
		
		}
		//时效：开始时间是否大于结束时间
		if(shixiao_beginTime > shixiao_endTime){
			alert("时效的开始时间不能大于其结束时间");
			return false;
		}
		
		//判断达标分数是否大于优秀分数
		if(parseInt(params.qualifiedScores) >= parseInt(params.excellentScores)){
			alert("达标分数应小于优秀分数");
			return false;
		};

		if(isNaN(Date.parse(new Date(shixiao_beginTime.replace(/-/g,"/"))))){
			alert('请输入开始时间');
			return false;
		}
		if(isNaN(Date.parse(new Date(shixiao_endTime.replace(/-/g,"/"))))){
			alert('请输入结束时间');
			return false;
		}
		if(f_red=='table' && readerId==''){
			alert('阅卷人不能为空');
			return false;
		}

		// 测试对象
		var deptIdList=[],groupIdList=[],postIdList=[],userAccountIdList=[];
		for(var i=1;i<5;i++){
			$('#setting_to_'+i+' li').each(function(){
				var _id=($(this).find('.delico').attr('title')).split('_');
					_id=_id[_id.length-1];
				if(i==1)		 deptIdList.push(_id);
				else if(i==3)	 groupIdList.push(_id);
				else if(i==2)	 postIdList.push(_id);
				else			 userAccountIdList.push(_id);

			});
		}

		if(deptIdList.length == 0 && groupIdList.length==0 && postIdList.length==0 && userAccountIdList.length==0){
			alert('请选择测试对象');
			return ;
		}

		params.deptIdList=deptIdList;
		params.groupIdList=groupIdList;
		params.postIdList=postIdList;
		params.userAccountIdList=userAccountIdList;
		if(params.displayMode == '2'){
			params.perTopicNumber = $('#perTopicNumber').val();
		}
		if(id=='') delete(params.id);
		delete(params.answerNumber_diy);
		delete(params.reading_real);
		params.examPaperId = $('#select_shijuan_id').val();//试卷id
		params.creatorId = G_USER['id'];//创建人id
		params.companyId = G_COMPANYID;
		if(params.implementName.length<1){
			alert('请输入考试名称');
			$('#implementName').focus();
			return false;
		}
		/* if(params.trainImplCode.length<1){
			alert('请选择关联培训计划');
			$('#ThiselText').focus();
			return false;
		} */
		var str = Ambow.encode(params);
		var queryUrl= id ? G_URL['updateexamimplement'] : G_URL['addexamimplement'];
		$.ajax({
			type: 'POST',
			data:str,
			dataType: 'json',
			url:queryUrl,
			contentType:'application/json;charset=UTF-8',
			success:function(data){
				if(data.returnCode=='000000'){
					alert(data.returnMsg);
					if(id)	window.location.href="training-implementation_testpaperadd.shtml?id="+id;
					else	window.location.href="training-implementation_testpaperadd.shtml?id="+data.entity;
				}else{
					alert(data.returnMsg);
				}
			}
		});
	});//save end
$("#shixiao_beginTime,#shixiao_endTime,#js_readingStart,input[name='readingEndTime']").attr("readonly","readonly");

$('#shixiao_endTime').live('blur',function(){
	$('#js_readingStart').val($(this).val());
});

});//jquery end

});//require end