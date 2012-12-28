/**
 * @author gp
 * @datetime 2012-4-25f
 * @description index.js
 * 接口提供wll
 */
var params={};
var cmb = new ComboxOperate();
Combox.prototype.fillDefault = function(){
	this.el.options.add(new Option('--请选择--', 'null'));
	return this;
}
var sh=getQuery('sh');	//从选课结果审核页链接过来
var getID=getQuery('ID');			// 编辑时
var getTermid=getQuery('termId');	// 编辑时



var mFunc=(function(){
	var it={},currTerm,currSchool,currMajor='null',
		currCourseCodeStandard,
		currCourseNameStandard,
		currCourse,
		currCourseName,
		currSchool_f,
		currMaxNum;	//当前专业 、学校 批次code 课程code
	var htmlBtn='<div class="overlay_operabtn">';
		htmlBtn+='<input type="button" style="width:60px" class="btn btn_gray" onclick="mFunc.moveAll(\'ul_student_all\',\'ul_student_had\')" value="<<"/>';
		htmlBtn+='<input type="button" style="width:60px" class="btn btn_gray" onclick="mFunc.move(\'ul_student_all\',\'ul_student_had\')" value="<" />';
		htmlBtn+='<input type="button" style="width:60px" class="btn btn_gray" onclick="mFunc.move(\'ul_student_had\',\'ul_student_all\')" value=">"/>';
		htmlBtn+='<input type="button" style="width:60px" class="btn btn_gray" onclick="mFunc.moveAll(\'ul_student_had\',\'ul_student_all\')" value=">>"/>';
		htmlBtn+='</div>';
	it.checkAll=function(me,id){
		var flg=me.checked==true?true:false;
		$('#'+id).find('input[type="checkbox"]').each(function(k,v){
			if(v.disabled==false){
				if(flg==false) v.checked=false;
				else v.checked=true;
			}
		});
		$('#'+id).find('input[type="checkbox"]').click(function(){if(this.checked==false) me.checked=false;});
	};
	it.init = function(){
		if(getTermid){
			$('#form_term').val(getTermid);
			$('#form_term').attr('disabled',true);
		}else{
			$('#form_term').change(function(){
				currTerm=$(this).val();
				it.getSchool();
				it.getMajor();
			});
		}

		currTerm=$('#form_term').val();
		it.getSchool();
		it.getMajor();
	};
	// 载入学校下拉菜单 -> 同时载入批次列表
	it.getSchool = function(){
		var html='';
		$('#js_errorMsg,#js_form_term_school').empty();
		$.getJSON(G_ROOT+'term/school/'+currTerm,function(data){

			$.each(data.list,function(k,v){
				if(user['uRole']==1){
					html+='<option value="'+v.schoolCode+'">'+v.schoolName+'</option>';
				}else{
					if(user['schoolCode']==v.schoolCode) html='<option value="'+v.schoolCode+'">'+v.schoolName+'</option>';
				}
			});
			
			if(html==''){ $('#js_errorMsg').text('本批次下无相关学校')}
			else{
				$('#js_errorMsg').empty();
				$('#js_form_term_school').html('<label><i class="color_red">学校：</i></label><select id="form_term_school" name="form_term_school">'+html+'</select>');
				
				var sc = getQuery('sc');
				if(sc){
					document.getElementById('form_term_school').value=sc;
					document.getElementById('form_term_school').disabled=true;
					
				}
				currSchool=$('#form_term_school').val();
				$('#form_term_school').change(function(){
					currSchool=$(this).val();
					it.getCourse();
				});

				//同时载入批次列表
				it.getCourse();
			}
			
			
			
		});
	};
	it.getMajor = function(){
		var html='';
		$.getJSON(G_ROOT+'major/plan/'+currTerm,function(data){
			if(data.returnCode=='000000'){
				$.each(data.list,function(k,v){
					html+='<option value="'+v.code+'">'+v.name+'</option>';
				});
				if(html=='') $('#js_errorMsg_major').text('本批次下无相关专业');
				else{
					$('#js_errorMsg_major').empty();
					html='<option value="null">全部</option>'+html;
					$('#js_form_term_major').html('<label><i class="color_red">专业：</i></label><select id="form_term_major" name="form_term_major">'+html+'</select>');
					currMajor=$('#form_term_major').val();

					$('#form_term_major').change(function(){
						currMajor=$(this).val();
						if(currCourseCodeStandard) it.getCourse2();
					});
				}
			}
		});
	};
	// 载入批次列表
	it.getCourse = function(){
		var html='',queryUrl=G_ROOT+'course/querystandardcourse/'+currTerm+'/'+currSchool;
		$.getJSON(queryUrl,function(data){
			$.each(data.list,function(k,v){
				html+='<tr>';
				html+='<td id="js_Course'+v.code+'"><a href="javascript:" onclick="win_major({code:\''+v.code+'\',id:\''+currTerm+'\'})">'+v.name+'</a></td>';
                html+='<td>'+v.minMaxNum+'</td>';
                html+='<td>'+v.planSum+'</td>';
				//批量选课配额
                html+='<td id="js_batchQuoat'+v.code+'">'+v.batchQuoat+'</td>';

				html+='<td><input class="js_btn_001 btn btn_gray" type="button" value="'+(sh==1?'查看选课':'批量选课')+'" /><input type="hidden" value="'+v.code+'" /></td>';

				html+='</tr>';
			});
			$('#js_getCourse').html(html);
			// 批次下的课程列表,绑定click事件
			$('.js_btn_001').click(function(){
				// 更新当前批次code,保存时使用
				currCourseCodeStandard=$(this).next().val();
				currCourseNameStandard=$.trim($('#js_Course'+currCourseCodeStandard).text());
				$('#js_title').text(currCourseNameStandard);
				currMaxNum=isNaN(parseInt($('#js_batchQuoat'+currCourseCodeStandard).text()))?parseInt($('#js_batchQuoat'+currCourseCodeStandard).prev().text()):parseInt($('#js_batchQuoat'+currCourseCodeStandard).text());
				$('#js_batchQuoat').text('最多可为'+currMaxNum+'个学生做批量选课，点击已分配人数的按钮进行分配');

				it.getCourse2();
			})
			// 清空旧的数据
			$('#js_getCourse2').empty();
		});

	};
	// 获取 批次下的课程列表
	it.getCourse2 = function(){
		var html='';
		$.getJSON(G_ROOT+'course/choosecoursebatch/list/'+currTerm+'/'+currCourseCodeStandard+'/'+currSchool+'/'+currMajor,function(data){
			$.each(data.list,function(k,v){
				html+='<tr>';
				html+='<td class="first"><a href="course_open_data.html?c='+v.COURSE_CODE+'&t='+currTerm+'">'+v.COURSE_NAME+'</a></td>';
				html+='<td>'+v.TNAME+'</td>';
				html+='<td class="js_school_code_f" alt="'+v.SCHOOL_CODE+'">'+G_data['school'][v.SCHOOL_CODE]+'</td>';
				html+='<td>'+v.MINMAX+'</td>';
				// 剩余座位数
				html+='<td id="jscode_'+v.COURSE_CODE+'">'+v.LEFTSEATS+'</td>';
				// 已分配人数
				html+='<td id="jsalloted_'+v.COURSE_CODE+'" class="jsalloted">'+v.ALLOTEDSEATS+'</td>';
				if(v.SCHOOL_CODE==currSchool){
					html+='<td><i class="color_gray">不可分配</i></td>';
				}else{
					html+='<td><input type="button" class="js_btn_002 btn btn_gray" name="'+v.COURSE_NAME+'" value="'+(sh==1?'查看':'指定学生')+'"/><input type="hidden" value="'+v.COURSE_CODE+'" /><input type="hidden" value="'+v.COURSE_CODE+'" /></td>';
				}

				html+='</tr>';
			});
			$('#js_getCourse2').html(html);
			$('.js_btn_002').click(function(){
				currSchool_f=$(this).parent().parent().find('.js_school_code_f').attr('alt');
				currCourse=$(this).next().val();
				currCourseName=$(this).attr('name');
				it.getStudent(currCourse);
			})
		});
	};
	it.getStudent = function(id){
		// 获取 已选此课的学生
		var html='',htmlRight;
		$.getJSON(G_ROOT+'course/choosecoursestudent/list/'+currTerm+'/'+id+'/'+currSchool,function(data){
			html+='<div class="clearfix">';
			html+='<div class="column width3 first">';
			html+='<div class="box_header">已选此课程的学生</div>';
			html+='<div class="box_content">';
			html+='	<table class="tablebox">';
			html+='	<thead class="table_header">';
			html+='	<tr>';
			html+='	<th class="first" width="35%">'+(getQuery('def')==2?'':'<input id="aaaa" type="checkbox" onclick="mFunc.checkAll(this,\'ul_student_had\');" />')+'学生ID</th>';
			html+='	<th>姓名</th>';
			html+='	</tr>';
			html+='	</thead>';
			html+='	</table>';
			html+='</div>';
			html+='<div class="selmul"><ul id="ul_student_had">';

			$.each(data.list,function(k,v){
				html+='<li class="js_had_'+v.ID+'"><label>'+(sh==1?'':'<input type="checkbox" class="js_chk" value="'+v.ID+'" />');
				html+='<span class="idnum">'+v.ID+'</span>';
				html+='<span class="idname">'+v.STUDENTNAME+'</span>';
				html+='<span style="display:none" class="idcengci">'+G_data['educationlevel'][v.LEVEL_CODE]+'</span>';
				html+='<span style="display:none" class="idnianji">'+G_data['grade'][v.GRADE_CODE]+'</span>';
				html+='</label></li>';
			});
			html+='</ul></div>';
			html+='</div>';



			if(sh==1){

				$.fn.nyroModalManual({
					width:362,
					height:460,
					title:"查看",
					content: html
				});


			}else{
				html+=htmlBtn;
				html+='<div class="column width5_5" style="float:right;">';
				html+='<div class="box_header">计划选此课程的学生</div>';
				html+='<div class="box_content">';
				html+='	<table class="tablebox" style="width:100%">';
				html+='		<thead class="table_header">';
				html+='		<tr>';
				html+='		<th class="first tc" width="24%"><input type="checkbox" onclick="mFunc.checkAll(this,\'ul_student_all\');" />学生ID</th>';
				html+='		<th width="12%">姓名</th>';
				html+='		<th width="16%">专业</th>';
				html+='		<th width="13%">层次</th>';
				html+='		<th>年级</th>';
				html+='		</tr>';
				html+='		</thead>';
				html+='	</table>';
				html+='</div>';
				html+='<div class="selmul"><ul id="ul_student_all">';

				html+='</ul></div>';
				html+='</div>';
				html+='</div>';
				html+='<div class="overlay_btn">';
				html+='<input type="button" class="btn btn_green" id="js_submt_010" value="确定"/> ';
				html+='<input type="button" class="btn btn_gray overlayClose" id="js_close_010" value="关闭"/>';
				html+='</div>';

				$.fn.nyroModalManual({
					width:1000,
					height:460,
					title:"分配",
					content: html
				});

				// 获取 全部学生

				$.getJSON(G_ROOT+'course/planchoosecoursestudent/list/'+currTerm+'/'+currCourseCodeStandard+'/'+currSchool,function(data){
					var html='';
					$.each(data.list,function(k,v){
						if($('.js_had_'+v.ID).length==0){
							html+='<li class="select"><label><input type="checkbox" checked="checked" value="'+v.ID+'" class="js_chk" />';
							html+='<span class="idnum">'+v.ID+'</span>';
							html+='<span class="idname">'+v.STUDENTNAME+'</span>';
							html+='<span class="idzhuanye">'+G_data['major'][v.MAJOR_CODE]+'</span>';
							html+='<span class="idcengci">'+G_data['educationlevel'][v.LEVEL_CODE]+'</span>';
							html+='<span class="idnianji">'+G_data['grade'][v.GRADE_CODE]+'</span>';
							html+='</label></li>';
						}
					});
					$('#ul_student_all').html(throwNull(html));

					$('.js_chk').click(function(){
						if(this.checked==true) $(this).parent().parent().addClass('select');
						else  $(this).parent().parent().removeClass('select');
					})
					$('#js_submt_010').click(function(){
						it.subm()
					});
					summary.tablehover();//Hover
				});
			}
		});
	};
	it.move=function(e1,e2){
		$('#'+e1).find('input:checked').each(function(){
			if(e1=='ul_student_had'){
				$(this).attr('checked',false);
				$(this).parent().children().eq(3).show();
				$(this).parent().children().eq(4).show();
				$(this).parent().children().eq(5).show();
				$(this).parent().parent().removeClass().appendTo($('#'+e2));
			}else{
				$(this).attr('checked',true);
				$(this).parent().children().eq(3).hide();
				$(this).parent().children().eq(4).hide();
				$(this).parent().children().eq(5).hide();
				$(this).parent().parent().addClass('select').appendTo($('#'+e2));
			}

		});


	};
	it.moveAll=function(e1,e2){
		$('#'+e1).find('input').each(function(){
			if(e1=='ul_student_had'){
				$(this).attr('checked',false);
				$(this).parent().children().eq(3).show();
				$(this).parent().children().eq(4).show();
				$(this).parent().children().eq(5).show();
				$(this).parent().parent().removeClass().appendTo($('#'+e2));
			}else{
				$(this).attr('checked',true);
				$(this).parent().children().eq(3).hide();
				$(this).parent().children().eq(4).hide();
				$(this).parent().children().eq(5).hide();
				$(this).parent().parent().addClass('select').appendTo($('#'+e2));
			}
		});
	};
	it.subm=function(){
		var ids_study=[],
			ids_course=[],
			courseCode=[],
			courseName=[],
			schoolCode=[],
			score=[],
			price=[],
			openCourseId=[],
			courseNameStandard=[],
			courseCodeStandard=[],
			list=[];

		$('#ul_student_had input').each(function(){
			ids_study.push($(this).val());
		});
		if(ids_study.length==0){
			alert('请选择学生');
			return false;
		}
		var residueNum=isNaN(parseInt($('#jscode_'+currCourse).text()))?0:parseInt($('#jscode_'+currCourse).text());
		if(ids_study.length>residueNum){
			alert('选择学生数不能大于剩余座位数');
			return false;
		}
		// 统计所有已分配人数
		var totalNum=ids_study.length;
		$('.jsalloted').each(function(){
			//排除本课程人数
			var n=isNaN(parseInt($(this).text()))?0:parseInt($(this).text());
			if(this.id!='jsalloted_'+currCourse) totalNum+=n;
		});
		// 批量选课配额
		if(totalNum>currMaxNum){
			alert('最多不能超过'+currMaxNum+'个学生做批量选课');
			return false;
		}


		var tmp={
			courseCode	:	currCourse,
			courseName	:	currCourseName,
			schoolCode	:	currSchool_f,
			score		:	'',
			price		:	'',
			openCourseId:'',
			courseCodeStandard:currCourseCodeStandard,
			courseNameStandard:currCourseNameStandard
		}
		list.push(tmp);

		params ={
			termId		:	currTerm,
			schoolCode	:	currSchool,
			creater		:	user['uid'],
			studentType		:   G_studentType,
			studentIdList 	:	ids_study,
			batchDetailDTOList	:	list
			/* ,
			courseName			:	courseName,
			schoolCode			:	schoolCode,
			score				:	score,
			price				:	price,
			openCourseId		:	openCourseId,
			courseNameStandard	:	courseNameStandard,
			courseCodeStandard	:	courseCodeStandard */
		};
		var str = Ab.encode(params);
		$.ajax({
			type: "POST",
			data: str,
			dataType:"json",
			url:G_ROOT+'choosecoursedetail/saveBatchCoursePlan?termId='+params.termId,
			contentType:'application/json;charset=UTF-8',
			success: function(rs){
				var insertId=rs.entity;
				if(rs.returnCode=='000000'){
					$('#jsalloted_'+currCourse).text(ids_study.length);
					$('#js_close_010').click();
					/* $.fn.nyroModalManual({
						width:400,
						title:"系统提示",
						//content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />保存完毕，是否继续添加明细</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_red overlayClose" value="是" onclick="location=\'course_2_detail_add.html?ID='+insertId+'&termId='+params.termId+'\'" /> <input type="button" id="win_sure" class="btn btn_green overlayClose" value="否" onclick="location=\'course_2.html\'" /></div>'
						content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />保存完毕，是否继续添加明细</h5></div><div class="overlay_btn overlayClose"><input type="button" id="win_sure" class="btn btn_red" value="是" /> <input type="button" id="win_sure" class="btn btn_green overlayClose" value="否" /></div>'
					}); */
				}
				else if(rs.returnCode=='500004'){
					mAlert("批次选课数据已存在");
				}else if(rs.returnCode=='700099'){
					mAlert('该学校目前不能进行批量选课');
				}else{
					if(insertId=='14'){
						mAlert('批次选课已暂停,不能新增');
					}else if(insertId=='15'){
						mAlert('批次选课已结束,不能新增');
					}else if(insertId=='20'){
						mAlert('批次选课参数设置错误');
					}else {mAlert('保存失败')};
				}
			}
		});
	};
	return it;
})();




$(document).ready(function() {
	if(getQuery('def')){
		$('#btn_save').remove();

	}
	//互选批次组：下拉菜单
	//var termDom = document.getElementById('form_term');
	//new Combox(termDom).fill(G_data['termset']);
	var cmb = new ComboxOperate();
	cmb.term();

	mFunc.init();
/*
	 function getList(page){
		page = (page && page>0)?page=page:page=Math.abs(page);
		$.getJSON(G_ROOT+queryUrl+encodeURI(queryTest)+"/"+page+'/'+G_perpage+'/',function(data){
			rCount=data.rCount;	// 记录总数，方便分页时使用
			$.each(data.list,function(k,v){
				if($('#'+toElem+' .mid'+v.ID).length>0) check='checked';
				html+='<tr class="atPage'+page+' mid'+v.ID+'">';
				html+='<td class="first tc"><input type="checkbox" name="checkall" class="chk_study_'+page+'" value="'+v.ID+'" '+($('#'+toElem+' .mid'+v.ID).find('input[type="checkbox"]').attr('checked')=='checked'?'checked':'')+' /></td>';
				html+='<td>'+v.ID+'</td>';
				html+='<td>'+v.STUNAME+'</td>';
				html+='</tr>';
			});
			html+='</tbody>';
			$('.js_thead_study,.js_tbody_study').hide();
			$('#js_tablebox_study').append(html);
			$('#pop_pageShow_study').html(gPage(rCount,page,'study_chk.getList'));
		});
	}

	cmb.shoolAndMajor();
	if(user['uRole']==1) $("#form_school").get(0).selectedIndex=0;
	else{
		$('#form_school').attr('disabled',true);
		var _ind=$("#form_school")[0].selectedIndex;
		var _tmp=$("#form_school").children().eq(_ind);
		$("#form_school").empty().append(_tmp);
	}
	cmb.levelAndGrade();

	// 学生类型
	var stuTypeDom = document.getElementById('form_stuType');
	new Combox(stuTypeDom).fill(G_data['stuType']);
	$(stuTypeDom).prepend('<option selected value="null">--请选择--</option>');
	$(stuTypeDom).get(0).selectedIndex=0;

	// 课程学校
	var schoolcode = document.getElementById('schoolcode');
	new Combox(schoolcode).fill(G_data['school']);
	// 课程层次
	//var educationlevel = document.getElementById('educationlevel');
	//new Combox(educationlevel).fill(G_data['educationlevel']);



	//初始化学生选择、课程选择功能
	study_chk.init();
	course_chk.init(1);

	// 保存绑定
	$('#btn_save').click(function(){
		var ids_study=[],
			ids_course=[],
			courseCode=[],
			courseName=[],
			schoolCode=[],
			score=[],
			price=[],
			openCourseId=[],
			courseNameStandard=[],
			courseCodeStandard=[],
			list=[];

		$('#'+study_chk.toElem).find('input[type="checkbox"]').each(function(){
			//if($(this)[0].checked==true) ids_study.push($(this).val());
			ids_study.push($(this).val());
		});

		$('#'+course_chk.toElem).find('input[type="checkbox"]').each(function(){
			//if($(this)[0].checked==true){
				var tmp={
					courseCode	:	$(this).parent().find('.coursecode').val(),
					courseName	:	$(this).parent().find('.coursename').val(),
					schoolCode	:	$(this).parent().find('.schoolcode').val(),
					score		:	$(this).parent().find('.score').val(),
					price		:	$(this).parent().find('.price').val(),
					openCourseId:$(this).parent().find('.opencourseid').val(),
					courseCodeStandard:$(this).parent().find('.coursecodestandard').val(),
					courseNameStandard:$(this).parent().find('.coursenamestandard').val()
				}
				list.push(tmp);
			//}
		});
		if(ids_study.length==0){
			mAlert('请选择学生');
			return false;
		}
		if(list.length==0){
			mAlert('请选择课程');
			return false;
		}
		params ={
			termId		:	$('#form_term').val(),
			schoolCode	:	searchParams['study']['form_school'],
			majorCode	:	searchParams['study']['form_major'],
			levelCode	:	searchParams['study']['form_educationlevel'],
			gradeCode	:	searchParams['study']['form_grade'],
			studentType	:	searchParams['study']['form_stuType'],
			creater		:   'admin',
			studentIdList 	:	ids_study,

			batchDetailDTOList			:	list

			//courseName			:	courseName,
			//schoolCode			:	schoolCode,
			//score				:	score,
			//price				:	price,
			//openCourseId		:	openCourseId,
			//courseNameStandard	:	courseNameStandard,
			//courseCodeStandard	:	courseCodeStandard
		};
		var str = Ab.encode(params);
		$.ajax({
			type: "POST",
			data: str,
			dataType:"json",
			url:G_ROOT+'choosecoursedetail/saveBatchCoursePlan?termId='+params.termId,
			contentType:'application/json;charset=UTF-8',
			success: function(rs){
				var insertId=rs.entity;
				if(rs.returnCode=='000000'){
					$.fn.nyroModalManual({
						width:400,
						title:"系统提示",
						content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />保存完毕，是否继续添加明细</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_red overlayClose" value="是" onclick="location=\'course_2_detail_add.html?ID='+insertId+'&termId='+params.termId+'\'" /> <input type="button" id="win_sure" class="btn btn_green overlayClose" value="否" onclick="location=\'course_2.html\'" /></div>'
					});
				}
				else if(rs.returnCode=='500004'){
					mAlert("批次选课数据已存在");
				}else{
					if(insertId=='14'){
						mAlert('批次选课已暂停,不能新增');
					}else if(insertId=='15'){
						mAlert('批次选课已结束,不能新增');
					}else if(insertId=='20'){
						mAlert('批次选课参数设置错误');
					}else {mAlert('保存失败')};
				}
			}
		});
	});
*/

	
	
});
