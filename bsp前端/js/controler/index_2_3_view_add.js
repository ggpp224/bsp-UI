/**
 * @author gp
 * @datetime 2012-4-25
 * @description 互选计划-选课计划-编辑-新增
 * @
 */
var params={};
var cmb = new ComboxOperate();
var id = decodeURIComponent(getQuery('ID'));
var termId = decodeURIComponent(getQuery('termId'));
$(document).ready(function() {
	//互选批次组
	/* ****************** 初始化表单 ********************/
	//互选批次组：下拉菜单
	var termDom = document.getElementById('form_term');
	new Combox(termDom).fill(G_data['termset']);
	$('#form_term').change(function(){
		$('#openable_tbody_study_chked,#openable_tbody_course_chked').empty();
		$('#openable_tbody_study_chkedCheckAll,#openable_tbody_course_chkedCheckAll').attr('checked',false);
	});
	$(termDom).val(termId);
	$(termDom).attr('disabled',true);
 	cmb.shoolAndMajor({'all':false});
	if(user['uRole']==1) $("#form_school").get(0).selectedIndex=0;
	else{
		$('#form_school').attr('disabled',true);
		var _ind=$("#form_school")[0].selectedIndex;
		var _tmp=$("#form_school").children().eq(_ind);
		$("#form_school").empty().append(_tmp);
	}
	cmb.levelAndGrade();




	// 课程性质
	var courseNatureDom = document.getElementById('form_courseNature');
	new Combox(courseNatureDom).fill(G_data['courseNature']);
	$(courseNatureDom).prepend('<option selected value="null">--请选择--</option>');
	$(courseNatureDom).get(0).selectedIndex=0;

	/* ****************** 初始化表单 end ********************/
	student_chk.init();
	//student_chk.pophaschoose();
	getListAll();

	$('#btn_save').click(function(){

		var ids_study=[];
		$('#openable_tbody_study_chked').find('input[type="checkbox"]').each(function(){
			//if($(this)[0].checked==true) ids_study.push($(this).val());
			ids_study.push($(this).val());
		});
		if(ids_study.length<=0){
			mAlert("学生不能为空");
			return  false;
		}
		var termId = $('#form_term').val()
		var courseNature = $('#form_courseNature').val();
		var courseCodeStandard = $('#choose_course').attr("coursecode");
		var schoolCode = $('#form_school').val();
		var majorCode = $('#form_major').val();
		majorCode=='null'?majorCode=null:majorCode;
		var gradeCode = $('#form_grade').val();
		gradeCode=='null'?gradeCode=null:gradeCode;
		var levelCode = $('#form_educationlevel').val();
		levelCode=='null'?levelCode=null:levelCode;
		var studentType = G_studentType;
		var planChooseCourseId = "null";
		params ={
				termId			:	termId,
				schoolCode		:	schoolCode,
				majorCode		:	majorCode,
				levelCode		:	levelCode,
				gradeCode		:	gradeCode,
				studentType		:	studentType,
				studentIdList			:	ids_study,
				courseCodeStandard	:	courseCodeStandard,
				courseNature	:	courseNature,
				create				: user['uid'],
				planChooseCourseId : id

			};
		if(params.courseNature=='' || params.courseNature=='null'){
			mAlert('请选择课程性质');
			return false;
		}
		var str = Ab.encode(params);
		$.ajax({
			type: "POST",
			data: str,
			dataType:"json",
			url:G_ROOT+'course/plandetail/update',
			contentType:'application/json;charset=UTF-8',
			success: function(rs){
				var insertId=rs.entity;
				if(rs.returnCode=='000000'){
					$.fn.nyroModalManual({
						width:400,
						title:"系统提示",
						content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/submit_ico.gif" />保存完毕!</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_red overlayClose" value="是" onclick="location=\'index_2_3.html\'" /> </div>'
					});
				}
				else if(rs.returnCode=='100'){
					$.fn.nyroModalManual({
						width:400,
						title:"系统提示",
						content: '<div class="overlay_delete_box"><h5 class="red">选课计划已存在<br />是否直接在该计划下添加明细</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_red overlayClose" value="是" onclick="index_2_3_view_add(\''+insertId+'\',\''+params.termId+'\')" /> <input type="button" id="win_sure" class="btn btn_green overlayClose" onclick="location=\'index_2_3.html\'" value="返回"/></div>'
					});
				}else if(rs.returnCode=='500004'){
					mAlert('学生【'+insertId+'】已提交该计划');
				}else{
					mAlert('保存失败');
				}
			}
		});

	});

	//返回
	$('#toback').click(function(){

		location.href='index_2_3_view.html?ID='+id+'&termId='+termId;
	});
	//获取课程详情
	$('#overlay_course_search_view').live('click',function(){
		$.fn.nyroModalManual({
			width:800,
			title:"课程详情",
			content:show_content()
		});
		getList_courseInfo();
	});

	var getList_courseInfo = function(){
		var query = "courseattribute/findCourseCode/list/";
		var termId  = $('#form_term').val();
		var courseCode = $('#choose_course').attr('coursecode');
		var url = G_ROOT + query + termId+"/"+courseCode;
		//var url = G_ROOT + query + "8a8a8cca37de930c0137de95ee210000/C00001";
		$.getJSON(url,function(data){
			var list = data.list;
			if(list){
				var html = '';
				$.each(list,function(k,v){
					html+='<tr>';
		            html+='<td><a href="course_open_data.html?c='+v.coursecode+'&t='+termId+'" target="_blank">'+v.coursename+'</a></td>';
		            html+='<td>'+v.teachers+'</td>';
		            html+='<td>'+G_data['school'][v.schoolcode]+'</td>';
		            html+='<td>'+v.maxminnum+'</td>';
		            //html+='<td>'+v.price+'</td>';
		            html+='</tr>';
				});
				$('#openable_tbody_course_view').html(html);
			}
		});
	}
	function show_content(){
		var html = '';
		html+='<div class="overlay">';
	 	html+='<form id="sampleform" method="post" action="#">';
	 	html+='<table class="tablebox">';
	 	html+='<thead class="table_header">';
	 	html+='<tr>';
	 	html+='<th>课程名称</th>';
	 	html+='<th>任课教师</th>';
	 	html+='<th>授课学校</th>';
	 	html+='<th>人数下限/上限</th>';
	 	//html+='<th>课程费用</th>';
	 	html+='</tr>';
	 	html+='</thead>';
	 	html+='<tbody class="openable_tbody" id="openable_tbody_course_view">';
	    html+='</tbody>';
	    html+='</table>';
	    html+='<div class="overlay_btn">';
	    html+='<input type="button" class="btn btn_gray overlayClose" value="关闭"/>';
	    html+='</div>';
	    html+='</form>';
	    html+='</div>';
		return html;
	}
	//已录入人数详情
	$('#plan_count_info_list').live('click',function(){
		$.fn.nyroModalManual({
			width:500,
			title:"计划选课人员分布",
			content:show_plan_people_count()
		});
		setTimeout(function(){
			var infos = $('#plan_count_info_list').attr("info");
			var arr_info = infos.split(",");
			$('#th_courseName').html(arr_info[0]);
			$('#th_countMax').html(arr_info[1]);
			$('#th_planCountMax').html(arr_info[2]);
		},300);
		getList_planCountInfo();
	});
	var getList_planCountInfo = function(){
		var query = "term/termset/studentlist/";
		var termId  = $('#form_term').val();
		var coursecodestandard = $('#choose_course').attr('coursecode');
		var url = G_ROOT + query + termId+"/"+coursecodestandard+"/2";
		//var url = G_ROOT + query + "8a8a8cca37de930c0137de95ee210000/C00001";
		$.getJSON(url,function(data){
			var list = data.list;
			if(list){
				var html = '';
				$.each(list,function(k,v){
					html+='<tr>';
		            html+='<td>'+G_data['school'][v.SCHOOL_CODE]+'</td>';
		            html+='<td>'+v.PLANNUM+'</td>';
		            html+='</tr>';
				});
				$('#openable_tbody_course_view').html(html);
			}
		});
	}
	function show_plan_people_count(){
		var html = '';
		html+='<div class="overlay">';
	 	html+='<form id="sampleform" method="post" action="#">';
		html+='<table class="tablebox">';
		html+='<tbody class="openable_tbody" id="course_count_info">';
	 	html+='<tr>';
	 	html+='<td>课程名称：&nbsp;&nbsp;<span id="th_courseName"></span></td>';
	 	html+='</tr>';
	 	html+='<tr>';
	 	html+='<td>总人数上线：&nbsp;&nbsp;<span id="th_countMax"></span></td>';
	 	html+='</tr>';
	 	html+='<tr>';
	 	html+='<td>计划选课总人数：&nbsp;&nbsp;<span id="th_planCountMax"></span></td>';
	 	html+='</tr>';
	 	html+='</tbody>';
		html+='</table>';
	 	html+='<table class="tablebox">';
	 	html+='<thead class="table_header">';
	 	html+='<tr>';
	 	html+='<th>开课学校</th>';
	 	html+='<th>计划人数</th>';
	 	html+='</tr>';
	 	html+='</thead>';
	 	html+='<tbody class="openable_tbody" id="openable_tbody_course_view">';
	    html+='</tbody>';
	    html+='</table>';
	    html+='<div class="overlay_btn">';
	    html+='<input type="button" class="btn btn_gray overlayClose" value="关闭"/>';
	    html+='</div>';
	    html+='</form>';
	    html+='</div>';
		return html;
	}
});

var getListAll = function(){
	var query_url = "planchoosecourse/";
	var params = Ab.urlDecode(Ab.serializeForm('form_study'));
	var queryTest = id;
	var url=G_ROOT+query_url+queryTest;
	$.getJSON(url,function(data){
		//课程性质
		var list = data;
		if(list){
			var html='';
			var page = 1;
			//$.each(list,function(k,v){
				//课程性质
				var courseNatureDom = document.getElementById('form_courseNature');
				if(list.courseNature=="全部"){
					$(courseNatureDom).empty().prepend('<option selected value="null">'+list.courseNature+'</option>');

				}else{
					$(courseNatureDom).empty().prepend('<option selected value="'+list.courseNature+'">'+G_data['courseNature'][list.courseNature]+'</option>');

				}
				$(courseNatureDom).attr("disabled",true);
				var courseNatureDom = document.getElementById('form_courseNature');
				//专业
				var majorDom = document.getElementById('form_major');
				if(list.majorCode==null){
					$(majorDom).empty().prepend('<option selected value="null">全部</option>');

				}else{
					$(majorDom).empty().prepend('<option selected value="'+list.majorCode+'">'+G_data['major'][list.majorCode]+'</option>');

				}
				$(majorDom).attr("disabled",true);
				//层次
				var educationlevelDom = document.getElementById('form_educationlevel');
				if(list.levelCode==null){
					$(educationlevelDom).empty().prepend('<option selected value="null">全部</option>');

				}else{
					$(educationlevelDom).empty().prepend('<option selected value="'+list.levelCode+'">'+G_data['educationlevel'][list.levelCode]+'</option>');

				}
				$(educationlevelDom).attr("disabled",true);
				//年级
				var gradeDom = document.getElementById('form_grade');
				if(list.gradeCode==null){
					$(gradeDom).empty().prepend('<option selected value="null">全部</option>');

				}else{
					$(gradeDom).empty().prepend('<option selected value="'+list.gradeCode+'">'+G_data['grade'][list.gradeCode]+'</option>');

				}
				$(gradeDom).attr("disabled",true);


				var query_course = G_ROOT+"course/findCourseCodeStandard/list/"+termId+"/"+list.courseCodeStandard;
				$.getJSON(query_course,function(data){
					if(data.list){
						$.each(data.list,function(k,v){
							$('#choose_course').val(v.coursenamestandard);
							$('#choose_course').attr('coursecode',v.coursecodestandard);
							$('#count_up_down').html('<b>'+v.minnum+'</b>/<b>'+v.maxnum+'</b>');
							$('#plan_count').html('<b>'+v.jihuacount+'</b>');
							$('#count_up_down_info').html('<a href="javascript:void(0)" id="overlay_course_search_view" class="overlay_course_search_view" title="开课课程列表">详情</a>');
							$('#plan_count_info').html('<a href="javascript:void(0)" info="'+v.coursenamestandard+','+v.maxnum+','+v.jihuacount+'" id="plan_count_info_list" class="overlay_course_search_view" title="开课课程列表">详情</a>');
						});
					}
				});
			//});

		}
	});




}
var student_chk = (function(){
	var it={},rCount=0,perpage2=5,currPage2=1;
	var fromElem='openable_tbody_study',toElem='openable_tbody_study_chked';
	it.init = function(){
		$('#form_query_stu').click(function(){

			$.fn.nyroModalManual({
				width:600,
				height:360,
				title:"添加学生",
				content:it.stu_pop()
			});
			it.getStuList(1);
		});


	}
	it.stu_pop=function(){
		var html='<table id="js_tablebox_study" class="tablebox"></table>';
			html+='<div id="pop_pageShow_study"></div>';
			html+='<div class="overlay_btn">';
			html+='<input type="button" class="btn btn_green overlayClose" onclick="student_chk.subm()" value="确定选择"/>';
			html+='<input type="button" class="btn btn_gray overlayClose" value="关闭" />';
			html+='</div>';
		return html;
	};
	it.getStuList = function(page){
		page = (page && page>0)?page=page:page=Math.abs(page);
		var params = Ab.urlDecode(Ab.serializeForm('form_study'));
		var queryUrl = G_FormArr['chooseStudent'];
		var	queryTest =(params.form_school==''?'null':params.form_school)
					+"/"+(params.form_major==''?'null':params.form_major)+'/'
					+(params.form_educationlevel==''?'null':params.form_educationlevel)
					+"/"+(params.form_grade==''?'null':params.form_grade)+'/'
					+'null/'
					+(params.form_studentid==''?'null':params.form_studentid)+'/'
					+(params.form_studentname==''?'null':params.form_studentname)
				;
		if($('#js_thead_study'+page).length>0){
			$('.js_tbody_study,.js_thead_study').hide();
			$('#js_thead_study'+page).show();
			$('#js_tbody_study'+page).show();
			$('#pop_pageShow_study').html(gPage(rCount,page,'student_chk.getStuList'));
		}else{
			$.getJSON(G_ROOT+queryUrl+encodeURI(queryTest)+"/"+page+'/'+G_perpage_pop+'/',function(data){
				rCount=data.rCount;
				var html='<thead id="js_thead_study'+page+'" class="table_header js_thead_study">';
				html+='<tr>';
				html+='<th class="first tc" width="4%"><input type="checkbox" name="checkall" onclick="checkAll(this,\'chk_study_'+page+'\')" /></th>';
				html+='<th>学生ID</th>';
				html+='<th>学生姓名</th>';
				html+='</tr>';
				html+='</thead>';
				html+='<tbody id="js_tbody_study'+page+'" class="openable_tbody js_tbody_study">';

				$.each(data.list,function(k,v){
					html+='<tr class="atPage'+page+' mid'+v.ID+'">';
					html+='<td class="first tc"><input type="checkbox" name="checkall" class="chk_study_'+page+'" value="'+v.ID+'" '+($('#'+toElem+' .mid'+v.ID).length>0?'checked':'')+' /></td>';
					html+='<td>'+v.ID+'</td>';
					html+='<td>'+v.STUNAME+'</td>';
					html+='</tr>';
				});
				html+='</tbody>';
				$('.js_tbody_study,.js_thead_study').hide();
				$('#js_tablebox_study').append(html);
				$('#pop_pageShow_study').html(gPage(data.rCount,page,'student_chk.getStuList',G_perpage_pop));
			});
		}
	};
	it.subm=function(){
		$('.js_tbody_study').find('input[type="checkbox"]').each(function(){
			if(this.checked==true){
				if($('#'+toElem).find('.mid'+this.value).length==0) $(this).parent().parent().prependTo('#'+toElem);
				else $('#'+toElem).find('.mid'+this.value).find('input[type="checkbox"]').attr('checked',true);
			}else{
				$('#'+toElem).find('.mid'+this.value).remove();
			}
		})
		//$('#checkboxall_1,#'+toElem).click(function(){it.checkedCount()});
		it.checkedCount();
		it.newPage(1);
		it.popdel()
	};
	//拼装已选学生
//	it.pophaschoose = function(){
//		var page = 1, perpage = 1000;
//		var url = G_ROOT+"course/plandetail/list/null/null/null/null/null/"+id+"/"+page+"/"+G_perpage;
//		$.getJSON(url,function(data){
//			if(data.list){
//				var html='';
//				$.each(data.list,function(k,v){
//					html+='<tr class="atPage'+page+' mid'+v.STUDENTID+'">';
//					html+='<td class="first tc"><input type="checkbox" name="checkall" class="chk_study_'+page+'" value="'+v.STUDENTID+'" checked /></td>';
//					html+='<td>'+v.STUDENTID+'</td>';
//					html+='<td>'+v.STUDENTNAME+'</td>';
//					html+='</tr>';
//				});
//				$('#openable_tbody_study_chked').append(html);
//				$('#pop_pageShow_study').html(gPage(data.rCount,page,'student_chk.getStuList'));
//			}
//
//		});
//		setTimeout(function(){
//			it.newPage(1);
//			it.checkedCount();
//			it.popdel();
//		},300);
//
//	}
	it.newPage=function(page){
		currPage2=page;
		$('#'+toElem).find('tr').hide().slice((page-1)*perpage2, page*perpage2).show();
		$('#'+toElem+'Page').html(gPage($('#'+toElem).find('tr').length,page,'student_chk.newPage',perpage2));
	};
	it.checkedCount=function(){
		var n=$('#'+toElem).find('input[type="checkbox"]');
		$('#'+toElem+'Count').html('当前已选学生总数：<i class="color_blue"><b>'+n.length+'</b></i>');
	};
	it.popdel = function(){
		$('#openable_tbody_study_chkedDel').live('click',function(){
			var ids=[];
			$('input[name="checkall"]').each(function(){
				if(this.checked==true){
					$(this).parent().parent().remove();
				}
			});
			it.newPage(1);
			it.checkedCount();
		});
	}

	return it;

})();

