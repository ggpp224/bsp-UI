/**
 * @author wl
 * @datetime 2012-5-7
 * @description course_5_3.js
 */
var queryUrl_termcount='';
var queryUrl_schoolstatistics='';

var cmb = new ComboxOperate();
var currPage=getQuery('page');
currPage = currPage || 1;
var schoolCode='';
var schoolName='';
var search_school='';
var termid='';

$(function(){
	cmb.term();
	document.getElementById('haslogin').style.display = "none";
	document.getElementById('hasnotlogin').style.display = "none";

	var stuId = user['uid'];
	termid = $("#form_term").val();
	queryUrl_termcount = termid;
	getList_termcount(1);

	$("#refresh").click(function(){
		termid = $("#form_term").val();
		queryUrl_termcount = termid;
		getList_termcount(1);
	})

	 // 学校
	 cmb.shoolAndMajor();
	 cmb.shoolAndMajor({'school_id':'form_school_nolog','major_id':'form_major_nolog'});

	// 层次
 	cmb.levelAndGrade();
 	cmb.levelAndGrade({'level_id':'form_educationlevel_nolog','grade_id':'form_grade_nolog'});


	$("#form_query").click(function(){
		termid = $("#form_term").val();  //获取选课批次
		var chooseType = G_data['chooseType'][$("#form_chooseType").val()];  //获取选课批次
		var schoolCode =$("#schoolCode").val(); //获取批次代码
		var schoolName = $("#schoolName").val(); //获取批次名称
		queryUrl_schoolstatistics = termid+'/'+(schoolCode==0?schoolCode="null":schoolCode)+'/'+(schoolName==0?schoolName="null":schoolName);
		getList_schoolstatistics(1);

	});

	$("#haslogin_btn").click(function(){
		termid = $("#form_term").val();  //获取选课批次
		var schoolName=$("#form_school option:selected").text();
		var schoolCode = $("#toschoolCode_haslogin").attr('schoolCode');
		var majorCode = $("#form_major").val();
		var educationLevelCode = $("#form_educationlevel").val();
		var gradeCode = $("#form_grade").val();
		queryUrl_haslogin = termid+'/'+schoolCode+'/'+(majorCode=="全部"?majorCode="null":majorCode)+'/'+(educationLevelCode=="全部"?educationLevelCode="null":educationLevelCode)+'/'+(gradeCode=="全部"?gradeCode="null":gradeCode);
		getList_haslogin(1);
		$('#is_login_zk').html('当前展开：<span id="toschoolCode_haslogin" schoolCode="'+schoolCode+'">'+schoolName+'</span>');

	});

	$("#dislogin_btn").click(function(){
		termid = $("#form_term").val();  //获取选课批次
		var schoolName=$("#form_school_nolog option:selected").text();
		var schoolCode = $("#toschoolCode_nologin").attr('schoolCode');
		var majorCode = $("#form_major_nolog").val();
		var educationLevelCode = $("#form_educationlevel_nolog").val();
		var gradeCode = $("#form_grade_nolog").val();
		queryUrl_dislogin = termid+'/'+schoolCode+'/'+(majorCode=="全部"?majorCode="null":majorCode)+'/'+(educationLevelCode=="全部"?educationLevelCode="null":educationLevelCode)+'/'+(gradeCode=="全部"?gradeCode="null":gradeCode);
		getList_dislogin(1);
		$('#not_login_zk').html('当前展开：<span id="toschoolCode_nologin" schoolCode="'+schoolCode+'">'+schoolName+'</span>');
	});

	$('.a_haslogin').live("click",function(){
		document.getElementById('haslogin').style.display = "block";
		termid = $("#form_term").val();  //获取选课批次
		var schoolCode = $(this).attr('schoolCode');
		var schoolName = $(this).attr('schoolName');
		queryUrl_haslogin = termid+'/'+(schoolCode)+'/null/null/null/';
		getList_haslogin(1);
		$('#is_login_zk').html('<span style="float:none;" id="toschoolCode_haslogin" schoolCode="'+schoolCode+'">当前展开：'+schoolName+'</span>');
		$('#form_school').attr('disabled',true);
		$('#form_school').val(schoolCode);
		$('#form_school').change();
	});
	$('.a_hasnotlogin').live("click",function(){
		document.getElementById('hasnotlogin').style.display = "block";
		termid = $("#form_term").val();  //获取选课批次
		var schoolCode = $(this).attr('schoolCode');
		var schoolName = $(this).attr('schoolName');
		queryUrl_dislogin = termid+'/'+(schoolCode)+'/null/null/null/';
		getList_dislogin(1);
		$('#not_login_zk').html('<span style="float:none;" id="toschoolCode_nologin" schoolCode="'+schoolCode+'">当前展开：'+schoolName+'</span>');
		$('#form_school_nolog').attr('disabled',true);
		$('#form_school_nolog').val(schoolCode);
		$('#form_school_nolog').change();
	});

})

function getList_termcount(page){
	page = (page && page>0)?page=page:page=Math.abs(page);
	var url=G_ROOT+'control/term/'+queryUrl_termcount;

	$.getJSON(url,function(data){
		var html='',list = data.entity;
		if(list){

			//var termset = $("#form_termset").attr("checked","checked").val();

				html+='<tr>';
				html+='<th class="first">'+list.seatCount+'</th>';
				html+='<th>'+list.selectedSeatCount+'</th>';
				html+='<th>'+list.surplusSeatCount+'</th>';
				html+='<th>'+list.studentCount+'</th>';
				html+='<th>'+list.selectedStuCount+'</th>';
				html+='<th>'+list.disSelectStuCount+'</th>';
				html+='</tr>';
				html = throwNull(html);

			$('#openable_tbody_tremcount').html(html);
		}
	});
}

function getList_schoolstatistics(page){
	page = (page && page>0)?page=page:page=Math.abs(page);
	var url=G_ROOT+'control/schoolstatistics/'+encodeURI(queryUrl_schoolstatistics)+'/'+page+'/'+G_perpage;

	$.getJSON(url,function(data){
		if(data){
			document.getElementById("form_school").options.length=0;
			document.getElementById("form_school_nolog").options.length=0;

			var html='',list = data.list;
			//var termset = $("#form_termset").attr("checked","checked").val();
			$.each(list,function(k,v){
				html+='<tr class="">';
				
				html+='<td>'+v.SCHOOLCODE+'</td>';
				html+='<td>'+v.SCHOOLNAME+'</td>';
				html+='<td>'+v.STUDENTTOTAL+'</td>';
				html+='<td><a href="javascript:void(0)" schoolName="'+v.SCHOOLNAME+'" schoolCode="'+v.SCHOOLCODE+'" class="a_haslogin">'+v.SLOGIN+'</a></td>';
				html+='<td><a href="javascript:void(0)" schoolName="'+v.SCHOOLNAME+'" schoolCode="'+v.SCHOOLCODE+'" class="a_hasnotlogin">'+v.SNOTLOGIN+'</a></td>';
				html+='<td>'+v.PLANCTOTAL+'</td>';
				html+='<td>'+v.CTOTAL+'</td>';
				html+='<td>'+(v.BATCHSTATUS==1?"<span>开启中</span>":"<span style='color:red';>停止</span>")+'</td>';
				html+='<td class="js_status">'+(v.BATCHSTATUS==1?'<a class="btn" href="javascript:" scode="'+v.SCHOOLCODE+'" status="'+v.BATCHSTATUS+'">停止</a>':'<a  class="btn" href="javascript:" scode="'+v.SCHOOLCODE+'" status="'+v.BATCHSTATUS+'">开启</a>')+'</td>';
				html+='</tr>';

				document.getElementById('form_school').add(new Option(v.SCHOOLNAME,v.SCHOOLCODE));
				document.getElementById('form_school_nolog').add(new Option(v.SCHOOLNAME,v.SCHOOLCODE));
				document.getElementById('is_login_zk').innerHTML = "当前展开："+v.SCHOOLNAME;
				document.getElementById('not_login_zk').innerHTML = "当前展开："+v.SCHOOLNAME;


			});
			// 重置“已登录学生列表"内的select项
			$('#form_school,#form_school_nolog').get(0).selectedIndex=0;
			$('#form_school,#form_school_nolog').change();
			//$('#form_school').attr('disabled',true);

			htm = throwNull(html);

			$('#openable_tbody_schoolstatistics').html(htm);
			$('#pageShow_schoolstatistics').html(gPage(data.rCount,page,'getList_schoolstatistics'));

			// 更新 开启批选  停止批选
			$('.js_status a').unbind().click(function(){
				var params={
					termid		:	termid,
					schoolcode	:	$(this).attr('scode'),
					status		:	$(this).attr('status')==1?2:1
				};
				var str = Ab.encode(params);
				$.ajax({
					type: "POST",
					data: str,
					dataType:"json",
					url:G_ROOT+'term/termschool/status/update',
					contentType:'application/json;charset=UTF-8',
					success: function(rs){
						if(rs.returnCode=='000000'){
							$("#form_query").click();
						}else{
							mAlert('操作失败');
						}
					}
				});
			});
		}
	});
}

function getList_haslogin(page,schoolCode){
	page = (page && page>0)?page=page:page=Math.abs(page);
	var url=G_ROOT+'control/studentlogin/'+queryUrl_haslogin+'/'+page+'/'+G_perpage;
	$('#openable_tbody_logined').html('');
	$.getJSON(url,function(data){
		if(data){
			var html='',list = data.list;
			//var termset = $("#form_termset").attr("checked","checked").val();
			$.each(list,function(k,v){
				html+='<tr class="">';
				html+='<td>'+v.STUDENTID+'</td>';
				html+='<td>'+v.STUDENTNAME+'</td>';
				html+='<td>'+v.SCHOOLNAME+'</td>';
				html+='<td>'+v.MAJORNAME+'</td>';
				html+='<td>'+v.LEVELNAME+'</td>';
				html+='<td>'+v.GRADENAME+'</td>';
				html+='</tr>';
			});
			html = throwNull(html);
			$('#openable_tbody_logined').html(html);
			$('#pageShow_logined').html(gPage(data.rCount,page,'getList_haslogin'));
		}
	});
}

function getList_dislogin(page,schoolCode){
	page = (page && page>0)?page=page:page=Math.abs(page);
	var url=G_ROOT+'control/dislogin/'+queryUrl_dislogin+'/'+page+'/'+G_perpage;
	$('#openable_tbody_dislogin').html('');
	$.getJSON(url,function(data){
		if(data){
			var html='',list = data.list;
			//var termset = $("#form_termset").attr("checked","checked").val();
			$.each(list,function(k,v){
				html+='<tr class="">';
				html+='<td>'+v.STUDENTID+'</td>';
				html+='<td>'+v.STUDENTNAME+'</td>';
				html+='<td>'+v.SCHOOLNAME+'</td>';
				html+='<td>'+v.MAJORNAME+'</td>';
				html+='<td>'+v.LEVELNAME+'</td>';
				html+='<td>'+v.GRADENAME+'</td>';
				html+='</tr>';
			});
			html = throwNull(html);
			$('#openable_tbody_dislogin').html(html);
			$('#pageShow_dislogin').html(gPage(data.rCount,page,'getList_dislogin'));
		}
	});
}
