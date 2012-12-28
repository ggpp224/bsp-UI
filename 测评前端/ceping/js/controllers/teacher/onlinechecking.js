require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','ListView','WdatePicker','common','personal_sim','jquery.progressbar.min'],function(){
$(function(){
	limit_t();
	var implementId = getQuery('id');
	var examPaperId = getQuery('examPaperId');
	var readerId = G_USER.id;

//设置全局变量
	var studentInfo = '';	//学生信息
	var stu_number = ''; //第几个学生
	var topicContent = {};	//每一题的信息
	var implementName = decodeURI(getQuery('implementName'));
	var readingStartTime = decodeURI(getQuery('readingStartTime'));
		readingStartTime = parseInt(readingStartTime);
		st = new Date(readingStartTime);
	var readingEndTime = decodeURI(getQuery('readingEndTime'));
		readingEndTime = parseInt(readingEndTime);
		et =  new Date(readingEndTime);
	var startToEnd = st.format('yyyy-MM-dd')+'/'+et.format('yyyy-MM-dd');
	var allClass = '';    //定义全局的class
	var currentTopic = 0;
	var topicId = '';

	var examNumber; //考试次数
	$('#implementName').html(implementName);
//获取阅卷完成率
	var tplPaperInfo = new Ambow.XTemplate(
			'<tr>',
			'<td width="10%" align="left">阅卷起止时间：</td>',
			'<td width="25%"><span id="stoe"></span></td>',
			'<td width="10%" align="right">阅卷完成率：</td>',
			'<td width="55%"><span class="progressBar" id="progressBar"></span></td>',
			'</tr>',
			'<tr>',
			'<td align="left">&nbsp;</td>',
			'<td><span class="font_blue" id="number"></span></td>',
			'<td>&nbsp;</td>',
			'<td align="right">',
			'<table width="30%" border="0" cellspacing="0" cellpadding="0">',
			'<tr>',
			'<td class="bg_lan">当前试卷</td>',
			'<td class="bg_lv">已完成</td>',
			'<td class="bg_hui">未完成</td>',
			'</tr>',
			'</table></td>',
			'</tr>'
	);
	tplPaperInfo.append(document.getElementById('paper_info'));
	$('#stoe').html(startToEnd);
	//$('#number').html(examPaperId);

//插入页面信息模板

//获取人数信息
var getPnum = function(){
	$.ajax({
  		type: 'GET',
		//data:str,
		dataType: 'json',
		url:G_URL['findlistuseridbyimplementid']+'?implementId='+implementId+'&examPaperId='+examPaperId+'&createrId='+G_USER['id']+'&callback=',
		contentType:'application/json;charset=UTF-8',
		success:function(data){
			var list = data.list;
			//插入人数信息模板
			var html='';var fill = [];
			//var list = [{"userAccountId":"1"},{"userAccountId":"2"},{"userAccountId":"4"},{"userAccountId":"5"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"},{"userAccountId":"3"}];
			//var list = [{"userAccountId":"1","markingFinish":"1"},{"userAccountId":"1","markingFinish":"1"},{"userAccountId":"1","markingFinish":"1"},{"userAccountId":"1","markingFinish":"1"},{"userAccountId":"1","markingFinish":"1"},{"userAccountId":"1","markingFinish":"1"},{"userAccountId":"1","markingFinish":"1"},{"userAccountId":"1","markingFinish":"1"},{"userAccountId":"1","markingFinish":"1"},{"userAccountId":"1","markingFinish":"1"},{"userAccountId":"1","markingFinish":"1"},{"userAccountId":"1","markingFinish":"0"},{"userAccountId":"1","markingFinish":"0"},{"userAccountId":"1","markingFinish":"0"},{"userAccountId":"1","markingFinish":"0"},{"userAccountId":"1","markingFinish":"0"},{"userAccountId":"1","markingFinish":"0"},{"userAccountId":"1","markingFinish":"0"},{"userAccountId":"1","markingFinish":"0"},{"userAccountId":"1","markingFinish":"0"},{"userAccountId":"1","markingFinish":"0"},{"userAccountId":"1","markingFinish":"0"},{"userAccountId":"1","markingFinish":"0"},{"userAccountId":"1","markingFinish":"0"},{"userAccountId":"1","markingFinish":"0"},{"userAccountId":"1","markingFinish":"0"},{"userAccountId":"1","markingFinish":"0"},{"userAccountId":"1","markingFinish":"0"},{"userAccountId":"1","markingFinish":"0"},{"userAccountId":"1","markingFinish":"0"}]
			var num = list.length;
			//var n = Math.ceil(num/25);
			var sum=0;
			var s ;
			for(var i=0;i<num;i++){
				s = list[i].markingFinish;
				if(s==1){
					fill.push('<li class="bg_lv chooseStu" uid="'+list[i].userAccountId+'" num="'+i+'" username="'+list[i].userName+'"><a href="#">'+(i+1)+'</a></li>');
				}else{
					fill.push('<li class="bg_hui chooseStu" uid="'+list[i].userAccountId+'" num="'+i+'" username="'+list[i].userName+'"><a href="#">'+(i+1)+'</a></li>');
				}
			}
			var str = fill.join('');
			$('#peopleNum').html(str);
			$('#peopleNum').find("li").eq(0).addClass("bg_lan");
			for(var i=0;i<num;i++){
				$('#peopleNum').find("td[uid='e']").each(function(i){
					$(this).addClass("bg_hui");
				});
			}
			//插入完成度
			var n=0,num=list.length,s='';
			for(var i=0;i<num;i++){
				if(list[i].markingFinish==1){
					n++;
				}
			}
			s=parseInt((n/num)*100);
			$('#progressBar').html(s);
			$(".progressBar").each(function(i,n){ $(n).progressBar(); });
			$('.chooseStu').eq(0).click();
		}
	});

}
getPnum();

//获取题目
$('.chooseStu').live('click',function(){
	//allClass = $(this).attr('class');
	studentInfo = $(this).attr('uid');
	stu_number = parseInt($(this).attr('num'));
	stu_name = $(this).attr('username');
	$('.chooseStu').removeClass('bg_lan');
	$(this).addClass('bg_lan');
	$('#topicContent').html('');
	$.ajax({
		type: 'GET',
		//data:str,
		dataType: 'json',
		url:G_URL['findlistanswerrecordbyimplementid']+'?implementId='+implementId+'&examPaperId='+examPaperId+'&userAccountId='+studentInfo+'&callback='+'&t='+new Date().getTime(),
		contentType:'application/json;charset=UTF-8',
		success:function(data){
			var list = data.list,arr = [];

			if(list.length>0){
				topicContent = list;
				examNumber = list[0].examNumber;
				$.each(list,function(k,v){
					if(k == 0){
						if(v.examReaderId==null){
							arr.push('<tr><td class="bg_hui chooseTopic" id="'+v.id+'" num="'+(k+1)+'" topicTypeId="'+v.topicTypeId+'" topicId="'+v.topicId+'"><a href="javascript:void(0)">第'+(k+1)+'题</a></td></tr>');
						}else{
							arr.push('<tr><td class="bg_lv chooseTopic" id="'+v.id+'" num="'+(k+1)+'" topicTypeId="'+v.topicTypeId+'" topicId="'+v.topicId+'"><a href="javascript:void(0)">第'+(k+1)+'题</a></td></tr>');
						}

					}else{
						if(v.examReaderId==null){
							arr.push('<tr><td class="bg_hui chooseTopic" id="'+v.id+'" num="'+(k+1)+'" topicTypeId="'+v.topicTypeId+'" topicId="'+v.topicId+'"><a href="javascript:void(0)">第'+(k+1)+'题</a></td></tr>');
						}else{
							arr.push('<tr><td class="bg_lv chooseTopic" id="'+v.id+'" num="'+(k+1)+'" topicTypeId="'+v.topicTypeId+'" topicId="'+v.topicId+'"><a href="javascript:void(0)">第'+(k+1)+'题</a></td></tr>');
						}
					}


				});
				var str = arr.join('');
				
				$('#Fragenummer').html(str);


				getTopic($('.chooseTopic').index(0));

			}
			isSubmit();
		}
	})

});


//编辑页面模板
//填空题

function tiankong(st,num){
	$('#topicContent').html('');
	var  tiankong= '',s_answer=[],e_answer=[];
	var standardAnswer = st.standardAnswer;
	var examineeAnswer = st.examineeAnswer;
	var n = 0;
	$.each(topicContent,function(k,v){
		if(v.examReaderId!=null){
			n++;
		}
	})
	var finish = n+'/'+topicContent.length;
	s_answer = standardAnswer.split(",");
	if (examineeAnswer != null && examineeAnswer != ''){
		e_answer = examineeAnswer.split(",");
	} else {
		for(var i=0;i<s_answer.length;i++){
			e_answer[i]='';
		}
	}
		//tiankong += '<div class="shijuan_right">&nbsp;当前试卷编号：<span id="currentNumber">'+(stu_number+1)+'</span>&nbsp;&nbsp;&nbsp;&nbsp;姓名：<a href="#">'+stu_name+'</a>&nbsp;&nbsp;&nbsp;&nbsp;本份试卷阅卷完成率：'+finish;
		tiankong += '<div class="shijuan_right">&nbsp;</span>&nbsp;&nbsp;&nbsp;&nbsp;姓名：<a href="#">'+stu_name+'</a>&nbsp;&nbsp;&nbsp;&nbsp;本份试卷阅卷完成率：'+finish;
		tiankong +=	'<div class="shiti_box">'+num+'.【填空题】'+st.topicContentSummary;
		tiankong +=	'<table width="100%" border="0" cellspacing="0" cellpadding="0" class="shiti_tab">';
		tiankong +=	'<tr><th width="50%">正确答案</th><th width="40%">学生答案</th></tr>';
		for(var i=0;i<s_answer.length;i++){
			tiankong +='<tr><td>'+s_answer[i]+'</td><td>'+e_answer[i]+'</td></tr>';
		}

		tiankong +=	'</table>';
	$('#topicContent').html(tiankong);
	$('#currentNumber').html(examPaperId);

}
//简答题
function jianda(st,num){
		var n = 0;
		$.each(topicContent,function(k,v){
			if(v.examReaderId!=null){
				n++;
			}
		})
		var finish = n+'/'+topicContent.length;
		$('#topicContent').html('');
		var jianda = '';
		//jianda+='<div class="shijuan_right">&nbsp;当前试卷编号：<span id="currentNumber">'+(stu_number+1)+'</span>&nbsp;&nbsp;&nbsp;&nbsp;姓名：<a href="#">'+stu_name+'</a>&nbsp;&nbsp;&nbsp;&nbsp;本份试卷阅卷完成率：'+finish;
		jianda+='<div class="shijuan_right">&nbsp;</span>&nbsp;&nbsp;&nbsp;&nbsp;姓名：<a href="#">'+stu_name+'</a>&nbsp;&nbsp;&nbsp;&nbsp;本份试卷阅卷完成率：'+finish;
		jianda+='<div class="shiti_box">';
		jianda+=num+'.【简答题】'+st.topicContentSummary;
		jianda+='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="shiti_tab_jianda">';
		jianda+='<tr>';
		jianda+='<th width="20%">正确答案</th>';
		jianda+='<td width="80%">';
		jianda+=st.standardAnswer;
		jianda+='</td>';
		jianda+='</tr>';
		jianda+='<tr>';
		jianda+='<th>学生答案</th>';
		jianda+='<td class="rightfont">';
		jianda+='<div id="u250"><div id="u250_rtf">';
		if (st.examineeAnswer != null && st.examineeAnswer != ''){
			jianda+=st.examineeAnswer;
		} else {
			jianda+='';
		}
		jianda+='</div></div>';
		jianda+='</td>';
		jianda+='</table>';
		$('#topicContent').html(jianda);

}
//论述题
function lunshu(st,num){
		var n = 0;
		$.each(topicContent,function(k,v){
			if(v.examReaderId!=null){
				n++;
			}
		})
		var finish = n+'/'+topicContent.length;
		$('#topicContent').html('');
		var lunshu = '';
		//lunshu+='<div class="shijuan_right">&nbsp;当前试卷编号：<span id="currentNumber">'+(stu_number+1)+'</span>&nbsp;&nbsp;&nbsp;&nbsp;姓名：<a href="#">'+stu_name+'</a>&nbsp;&nbsp;&nbsp;&nbsp;本份试卷阅卷完成率：'+finish;
		lunshu+='<div class="shijuan_right">&nbsp;</span>&nbsp;&nbsp;&nbsp;&nbsp;姓名：<a href="#">'+stu_name+'</a>&nbsp;&nbsp;&nbsp;&nbsp;本份试卷阅卷完成率：'+finish;
		lunshu+='<div class="shiti_box">';
		lunshu+=num+'.【论述题】'+st.topicContentSummary;
		lunshu+='<table width="100%" border="0" cellspacing="0" cellpadding="0" class="shiti_tab_jianda">';
		lunshu+='<tr>';
		lunshu+='<th width="20%">正确答案</th>';
		lunshu+='<td width="80%">';
		lunshu+=st.standardAnswer;
		lunshu+='</td>';
		lunshu+='</tr>';
		lunshu+='<tr>';
		lunshu+='<th>学生答案</th>';
		lunshu+='<td class="rightfont">';
		lunshu+='<div id="u250"><div id="u250_rtf">';
		if (st.examineeAnswer != null && st.examineeAnswer != ''){
			lunshu+=st.examineeAnswer;
		} else {
			lunshu+='';
		}
		lunshu+='</div></div>';
		lunshu+='</td>';
		lunshu+='</table>';
		$('#topicContent').html(lunshu);
}
function getTopic(n){
		var obj=$('.chooseTopic').eq(n);
		currentTopic=n;
		if(topicId){
			topicId = topicId;
		}else{
			if(topicContent!=''){
				topicId = topicContent[0].topicId;
			}
		}
		var typeid =  obj.attr('topicTypeId');
		id = obj.attr('id');

		$('.chooseTopic').removeClass('bg_lan');
		//currentTopic = $(this).attr('num');
		obj.addClass('bg_lan');

		var st = {};
			st = topicContent[n];

		if(typeid == 6){
			tiankong(st,currentTopic+1);
		}else if(typeid == 7){
			jianda(st,currentTopic+1);
		}else if(typeid == 8){
			lunshu(st,currentTopic+1);
		}
		if(st && (typeid == 7 || typeid == 8)){
			if(st.topicScore!=null){
				$('.shiti_tab_jianda tbody').append('<tr><th>评分</th><td>'+st.topicScore+'</td></tr>');
			}else{
				$('.shiti_tab_jianda tbody').append('<tr><th>评分</th><td>未评分</td></tr>');
			}
		}else if(st && typeid==6){
			if(st.topicScore!=null){
				 $('.shiti_tab tbody').append('<tr><td>评分</td><td>'+st.topicScore+'</td></tr>');
			}else {
				 $('.shiti_tab tbody').append('<tr><td>评分</td><td>未评分</td></tr>');
			}
		}
		$('#score').val('');
		//添加分数
		var originalScore=0;
		originalScore=topicContent[n].originalScore;
		$('#manfen').html(originalScore);
		$('#js_topicComment').html(topicContent[n].topicComment);
}
//调用试题


	$('.chooseTopic').live('click',function(){
		topicId = $(this).attr('topicid');
		getTopic($('.chooseTopic').index(this));

	});
//上一题
	$('#pre_topic').click(function(){
		if(currentTopic<=0){
			getTopic(0);
		}else{
			getTopic(currentTopic-1);
		}
	});
//下一题
	$('#next_topic').click(function(){
		if(currentTopic>=(topicContent.length-1)){
			getTopic(topicContent.length-1);
		}else{
			getTopic(currentTopic+1)
		}
	});
//第一题
	$('#first_topic').click(function(){
		getTopic(0);
	});

//最后一题
	$('#last_topic').click(function(){
		getTopic(topicContent.length-1);

	});
//保存试题分数
$('#svaeTopic').click(function(){
	var params = {};
	var score = $('#score').val();
	var topicComment = $.trim($('#js_topicComment').val());;
	var manfen = $('#manfen').html();
	var patrn = /^[0-9]+(\.[5])?$/;
	//var patrn = eval("/^[0-"+manfen+"][](\\.[5])?$/");
	if(!patrn.exec(score)){
		alert('输入字符不正确');
		return false;

	}
	if(parseInt(score) > parseInt(manfen)){
		alert('不能大于满分');
		return;
	}
//	params = {
//		implementId	  : 23,
//		userAccountId : studentInfo,
//		examPaperId	  : 21,
//		topicId		  : topicId,
//		topicScore	  : score,
//		examReaderId  : '试卷XXXX',
//		evaluationAnswerRecordId : 15
//	}
	params = {
		id	  		  : id,
		topicScore	  : score,
		topicComment  : topicComment,
		examReaderId  : readerId,
		companyId     : G_COMPANYID
	}
	var str = Ambow.encode(params);
	$.ajax({
		type:'POST',
		data:str,
		dataType: 'json',
		url:G_URL['updateanswerrecord'],
		contentType:'application/json;charset=UTF-8',
		success:function(data){
			if(data.returnCode == '000000'){
				//提交成绩

				alert(data.returnMsg);
				// 更新分数
				topicContent[currentTopic]['topicScore']=score;
				if(currentTopic>=(topicContent.length-1)){
					var s = currentTopic;
					$('.chooseStu').eq(stu_number).click();
					getTopic(topicContent.length-1);
				}else{
					var s = currentTopic;
					//$('.chooseStu').eq(stu_number).click();
					getTopic(s+1);
				}
			}

			$('#score').val('');
			isSubmit();

		}
	});
});


//提交成绩
$('#submit_result').live('click',function(){
	var flag = 1;
	$('#Fragenummer tr td').each(function(){
		var f = $(this).hasClass('bg_lv');
		if(!f){
			flag = 0;
		}
	});
	var params = {};
	params = {
		evaluationExamImplemId : implementId,
		userAccountId : studentInfo,
		markingFinish : flag,
		examNumber	  : examNumber,
	}
	var str = Ambow.encode(params);
	$.ajax({
		type:'POST',
		data:str,
		dataType: 'json',
		url:G_URL['updateimplementuser'],
		contentType:'application/json;charset=UTF-8',
		success:function(data){
			alert('试卷保存'+data.returnMsg);
			getPnum();

		}
	});
});

//验证成绩是否可提交
function isSubmit(){
	var isFinish = true;  //设置标志位，判断本学生试题是否全部完成
	var tds = $('#Fragenummer').find('td');
	$('#Fragenummer').find('td').each(function(){
		var bgFlag = $(this).hasClass('bg_lv');
		if(!bgFlag){
			isFinish = false;
		}
	});
	if(tds.length>0){
		if(isFinish){
			$('#submitTopic').html('<input name="input" type="button" class="btn btn_submit" id="submit_result"  value="提交成绩" />');
		}else{
			$('#submitTopic').html('<input name="input13" type="button" class="btn_no"  id="submit_result_no" title="成绩未判完，不能提交成绩"  value="提交成绩" />');
		}
	}else{
		$('#submitTopic').html('<input name="input13" type="button" class="btn_no"  id="submit_result_no" title="成绩未判完，不能提交成绩"  value="提交成绩" />');
	}
}



});
});