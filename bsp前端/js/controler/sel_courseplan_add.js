/**
 * @author gp
 * @datetime 2012-4-25
 * @description 互选计划-选课计划-新增
 */
var cmb = new ComboxOperate();

$(document)
		.ready(
				function() {
					// 互选批次组
					/* ****************** 初始化表单 ******************* */
					// 互选批次组：下拉菜单
					/*
					 * var termDom = document.getElementById('form_term'); new
					 * Combox(termDom).fill(G_data['termset']);
					 * $('#form_term').change(function(){
					 * $('#openable_tbody_study_chked,#openable_tbody_course_chked').empty();
					 * $('#openable_tbody_study_chkedCheckAll,#openable_tbody_course_chkedCheckAll').attr('checked',false);
					 * });
					 */
					cmb.term();
					cmb.shoolAndMajor({
						'all' : false
					});
					if (user['uRole'] == 1)
						$("#form_school").get(0).selectedIndex = 0;
					else {
						$('#form_school').attr('disabled', true);
						var _ind = $("#form_school")[0].selectedIndex;
						var _tmp = $("#form_school").children().eq(_ind);
						$("#form_school").empty().append(_tmp);
					}
					cmb.levelAndGrade();

					// 课程性质
					var courseNatureDom = document
							.getElementById('form_courseNature');
					new Combox(courseNatureDom).fill(G_data['courseNature']);
					$(courseNatureDom).prepend(
							'<option selected value="null">--请选择--</option>');
					$(courseNatureDom).get(0).selectedIndex = 0;

					/* ****************** 初始化表单 end ******************* */
					course_chk.init();
					student_chk.init();

					// 切换互选批次组
					$('#form_term').change(function() {
						$('#choose_course').val('请选择一门批次');
						$('#choose_course').attr({
							'coursecode' : ''
						})
						$('#count_up_down').html('');
						$('#count_up_down_info').html('');
						$('#plan_count').html('');
						$('#plan_count_info').html('');
					});
					// 切换专业、层次、年级
					$('#form_major,#form_educationlevel,#form_grade').change(
							function() {
								$('#openable_tbody_study_chked').html('');

							});

					$('#btn_save')
							.click(
									function() {

										var ids_study = [];
										$('#openable_tbody_study_chked').find(
												'input[type="checkbox"]').each(
												function() {
													// if($(this)[0].checked==true)
													// ids_study.push($(this).val());
													ids_study.push($(this)
															.val());
												});
										var termId = $('#form_term').val()
										var courseNature = $(
												'#form_courseNature').val();
										var courseCodeStandard = $(
												'#choose_course').attr(
												"coursecode");
										var schoolCode = $('#form_school')
												.val();
										var majorCode = $('#form_major').val();
										majorCode == 'null' ? majorCode = null
												: majorCode;
										var gradeCode = $('#form_grade').val();
										gradeCode == 'null' ? gradeCode = null
												: gradeCode;
										var levelCode = $(
												'#form_educationlevel').val();
										levelCode == 'null' ? levelCode = null
												: levelCode;
										var studentType = G_studentType;
										var planChooseCourseId = "null";
										params = {
											termId : termId,
											schoolCode : schoolCode,
											majorCode : majorCode,
											levelCode : levelCode,
											gradeCode : gradeCode,
											studentType : studentType,
											studentIdList : ids_study,
											courseCodeStandard : courseCodeStandard,
											courseNature : courseNature,
											create : user['uname'],
											planChooseCourseId : null

										};
										if (params.courseNature == ''
												|| params.courseNature == 'null') {
											mAlert('请选择课程性质');
											return false;
										}
										if (($('#choose_course').val()) == '请选择一门批次') {
											mAlert('请选择一门批次');
											return false;

										}
										if (ids_study.length == 0) {
											mAlert('请选择学生');
											return false;
										}

										var str = Ab.encode(params);
										$
												.ajax({
													type : "POST",
													data : str,
													dataType : "json",
													url : G_ROOT
															+ 'course/planchoosecourse/create?termId='
															+ params.termId,
													contentType : 'application/json;charset=UTF-8',
													success : function(rs) {
														var insertId = rs.entity;
														if (rs.returnCode == '000000') {
															$.fn
																	.nyroModalManual({
																		width : 400,
																		title : "系统提示",
																		content : '<div class="overlay_delete_box"><h5 class="red"><img src="images/submit_ico.gif" />保存完毕!</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_red overlayClose" value="是" onclick="location=\'index_2_3.html\'" /> </div>'
																	});
														} else if (rs.returnCode == '100') {
															$.fn
																	.nyroModalManual({
																		width : 400,
																		title : "系统提示",
																		content : '<div class="overlay_delete_box"><h5 class="red">选课计划已存在<br />是否直接在该计划下添加明细</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_red overlayClose" value="是" onclick="index_2_3_view_add(\''
																				+ insertId
																				+ '\',\''
																				+ params.termId
																				+ '\')" /> <input type="button" id="win_sure" class="btn btn_green overlayClose" onclick="location=\'index_2_3.html\'" value="返回"/></div>'
																	});
														} else if (rs.returnCode == '500004') {
															mAlert('学生【'
																	+ insertId
																	+ '】已提交该计划');
														} else {
															mAlert('保存失败');
														}
													}
												});

									});
					$('#overlay_course_search_view').live('click', function() {
						$.fn.nyroModalManual({
							width : 800,
							title : "课程详情",
							content : show_content()
						});
						getList_courseInfo();
					});

					var getList_courseInfo = function() {
						var query = "courseattribute/findCourseCode/list/";
						var termId = $('#form_term').val();
						var courseCode = $('#choose_course').attr('coursecode');
						var url = G_ROOT + query + termId + "/" + courseCode;
						// var url = G_ROOT + query +
						// "8a8a8cca37de930c0137de95ee210000/C00001";
						$
								.getJSON(
										url,
										function(data) {
											var list = data.list;
											if (list) {
												var html = '';
												$
														.each(
																list,
																function(k, v) {
																	html += '<tr>';
																	html += '<td><a href="course_open_data.html?c='
																			+ v.coursecode
																			+ '&t='
																			+ termId
																			+ '" target="_blank">'
																			+ v.coursename
																			+ '</a></td>';
																	html += '<td>'
																			+ v.teachers
																			+ '</td>';
																	html += '<td>'
																			+ G_data['school'][v.schoolcode]
																			+ '</td>';
																	html += '<td>'
																			+ v.maxminnum
																			+ '</td>';
																	html += '<td>'
																			+ v.price
																			+ '</td>';
																	html += '</tr>';
																});
												$('#openable_tbody_course_view')
														.html(html);
											}
										});
					}
					function show_content() {
						var html = '';
						html += '<div class="overlay">';
						html += '<form id="sampleform" method="post" action="#">';
						html += '<table class="tablebox">';
						html += '<thead class="table_header">';
						html += '<tr>';
						html += '<th>课程名称</th>';
						html += '<th>任课教师</th>';
						html += '<th>授课学校</th>';
						html += '<th>人数下限/上限</th>';
						html += '<th>费用</th>';
						html += '</tr>';
						html += '</thead>';
						html += '<tbody class="openable_tbody" id="openable_tbody_course_view">';
						html += '</tbody>';
						html += '</table>';
						html += '<div class="overlay_btn">';
						html += '<input type="button" class="btn btn_gray overlayClose" value="关闭"/>';
						html += '</div>';
						html += '</form>';
						html += '</div>';
						return html;
					}
					$('#plan_count_info_list').live(
							'click',
							function() {
								$.fn.nyroModalManual({
									width : 500,
									title : "计划选课人员分布",
									content : show_plan_people_count()
								});
								setTimeout(function() {
									var infos = $('#plan_count_info_list')
											.attr("info");
									var arr_info = infos.split(",");
									$('#th_courseName').html(arr_info[0]);
									$('#th_countMax').html(arr_info[1]);
									$('#th_planCountMax').html(arr_info[2]);
								}, 300);
								getList_planCountInfo();
							});
					var getList_planCountInfo = function() {
						var query = "term/termset/studentlist/";
						var termId = $('#form_term').val();
						var coursecodestandard = $('#choose_course').attr(
								'coursecode');
						var url = G_ROOT + query + termId + "/"
								+ coursecodestandard + "/2";
						// var url = G_ROOT + query +
						// "8a8a8cca37de930c0137de95ee210000/C00001";
						$.getJSON(url, function(data) {
							var list = data.list;
							if (list) {
								var html = '';
								$.each(list, function(k, v) {
									html += '<tr>';
									html += '<td>'
											+ G_data['school'][v.SCHOOL_CODE]
											+ '</td>';
									html += '<td>' + v.PLANNUM + '</td>';
									html += '</tr>';
								});
								$('#openable_tbody_course_view').html(html);
							}
						});
					}
					function show_plan_people_count() {
						var html = '';
						html += '<div class="overlay">';
						html += '<form id="sampleform" method="post" action="#">';
						html += '<table class="tablebox">';
						html += '<tbody class="openable_tbody" id="course_count_info">';
						html += '<tr>';
						html += '<td>课程名称：&nbsp;&nbsp;<span id="th_courseName"></span></td>';
						html += '</tr>';
						html += '<tr>';
						html += '<td>总人数上限：&nbsp;&nbsp;<span id="th_countMax"></span></td>';
						html += '</tr>';
						html += '<tr>';
						html += '<td>计划选课总人数：&nbsp;&nbsp;<span id="th_planCountMax"></span></td>';
						html += '</tr>';
						html += '</tbody>';
						html += '</table>';
						html += '<table class="tablebox">';
						html += '<thead class="table_header">';
						html += '<tr>';
						html += '<th>开课学校</th>';
						html += '<th>计划人数</th>';
						html += '</tr>';
						html += '</thead>';
						html += '<tbody class="openable_tbody" id="openable_tbody_course_view">';
						html += '</tbody>';
						html += '</table>';
						html += '<div class="overlay_btn">';
						html += '<input type="button" class="btn btn_gray overlayClose" value="关闭"/>';
						html += '</div>';
						html += '</form>';
						html += '</div>';
						return html;
					}

				});

var course_chk = (function() {
	var it = {}, rCount = 0;
	var termId = $('#form_term').val();
	it.init = function() {
		$('#form_query_2').click(function() {

			$.fn.nyroModalManual({
				width : 600,
				height : 450,
				title : "添加课程",
				content : it.course_pop()
			});
			// 载入查询结果列表
			setTimeout(function() {
				it.getList();
			}, 300);
		});

		$('#query_course').live('click', function() {
			it.getList();
		});

		$('#subm')
				.live(
						'click',
						function(e) {
							$('#js_tbody_course')
									.find('input[type="radio"]')
									.each(
											function() {
												if (this.checked == true) {
													var termId = $('#form_term')
															.val();
													var TD = $(this).parent()
															.parent()
															.find("td");
													var courseCode = TD[1].innerHTML;
													var query_course = "course/findCourseCodeStandard/list/";
													var queryTest_course = termId
															+ "/" + courseCode;
													// var queryTest_course =
													// "8a8a8cca37de930c0137de95ee210000/C00001";
													// //这里是假数据，需要替换
													var url_course = G_ROOT
															+ query_course
															+ encodeURI(queryTest_course);
													$
															.getJSON(
																	url_course,
																	function(
																			data) {
																		if (data.list) {
																			$
																					.each(
																							data.list,
																							function(
																									k,
																									v) {
																								$(
																										'#choose_course')
																										.val(
																												v.coursenamestandard);
																								$(
																										'#choose_course')
																										.attr(
																												'coursecode',
																												courseCode);
																								$(
																										'#count_up_down')
																										.html(
																												'<b>'
																														+ v.minnum
																														+ '</b>/<b>'
																														+ v.maxnum
																														+ '</b>');
																								$(
																										'#plan_count')
																										.html(
																												'<b>'
																														+ v.jihuacount
																														+ '</b>');
																								$(
																										'#count_up_down_info')
																										.html(
																												'<a href="javascript:void(0)" id="overlay_course_search_view" class="overlay_course_search_view" title="开课课程列表">详情</a>');
																								$(
																										'#plan_count_info')
																										.html(
																												'<a href="javascript:void(0)" info="'
																														+ v.coursenamestandard
																														+ ','
																														+ v.maxnum
																														+ ','
																														+ v.jihuacount
																														+ '" id="plan_count_info_list" class="overlay_course_search_view" title="开课课程列表">详情</a>');
																							});
																		}
																	});
													$(this)
															.parent()
															.parent()
															.appendTo(
																	'#openable_tbody_course_chked');
												}
											});
							$('#btnClose').click();
						});
		$('#openable_tbody_course_chkedDel').live(
				'click',
				function() {

					$('#openable_tbody_course_chked').find(
							'input[type="radio"]').each(function() {
						if (this.checked == true) {
							$(this).parent().parent(0).remove();
						}
					});
				});
	};
	it.getList = function(page) {
		page = page || 1;
		var params;
		params = Ab.urlDecode(Ab.serializeForm('form_course'));

		var queryurl_course = 'course/coursestandardtermid/list/';
		var termId = $('#form_term').val();
		var queryTest = termId + "/"
				+ (params.courseCode == '' ? 'null' : params.courseCode) + "/"
				+ (params.courseName == '' ? 'null' : params.courseName)
				+ "/null";
		var url = G_ROOT + queryurl_course + encodeURI(queryTest) + "/" + page
				+ '/' + G_perpage_pop + '/';
		$
				.getJSON(
						url,
						function(data) {
							var rCount = data.rCount;
							var list = data.list;
							if (list) {
								var html = it.getCourseList();
								var coursecode = $('#choose_course').attr(
										'coursecode');
								html += '<tbody id="js_tbody_course" class="openable_tbody js_tbody_course">';
								$
										.each(
												list,
												function(k, v) {
													html += '<tr class="atPage'
															+ page + ' mid'
															+ v.OPENID + '">';
													if (coursecode == v.CODE) {
														html += '<td class="first tc"><input type="radio" name="c1" checked /></td>';
													} else {
														html += '<td class="first tc"><input type="radio" name="c1" /></td>';
													}
													html += '<td>' + v.CODE
															+ '</td>';
													html += '<td>' + v.NAME
															+ '</td>';

													html += '</tr>';
												});
								html += '</tbody>';
								$('#pop_pageShow_course').html(
										gPage(data.rCount, page,
												'course_chk.getList',
												G_perpage_pop));
								$('#js_tablebox_course').html(html);
							}
						});

	};
	it.course_pop = function() {
		var html = '';
		html += '<form name="form_course" id="form_course">';
		html += '<p style="padding-left:80px;"><label class="labeltitle">批次代码：</label><input type="text" name="courseCode"/></p>';
		html += '<p style="padding-left:80px;"><label class="labeltitle">批次名称：</label><input type="text" name="courseName"/></p>';
		html += '<p style="padding-left:80px;margin-bottom:10px;"><label class="labeltitle">&nbsp;</label>';
		html += '<input id="query_course" class="btn btn_blue overlay_course_search" type="button" value="查询并添加" />';
		html += '<input class="btn btn_gray" type="reset" value="重置" /></p>';
		html += '</form>';
		html += '<table id="js_tablebox_course" class="tablebox"></table>';
		html += '<div id="pop_pageShow_course"></div>';
		html += '<div class="overlay_btn">';
		html += '<input type="button" class="btn btn_green" id="subm" value="确定"/>';
		html += '<input type="button" class="btn btn_gray overlayClose" id="btnClose" value="关闭" />';
		html += '</div>';

		return html;
	};
	it.getCourseList = function(page) {
		page = (page && page > 0) ? page = page : page = Math.abs(page);
		var html = '';
		html = '<thead id="js_thead_course" class="table_header js_thead_course">';
		html += '<tr>';
		html += '<th>&nbsp;</th>';
		html += '<th>批次代码</th>';
		html += '<th>批次名称</th>';
		html += '</tr>';
		html += '</thead>';
		return html;
	}
	return it;
})();

var student_chk = (function() {
	var it = {}, rCount = 0, perpage2 = 5, currPage2 = 1;
	var fromElem = 'openable_tbody_study', toElem = 'openable_tbody_study_chked';
	it.init = function() {
		$('#form_query_stu').click(function() {

			$.fn.nyroModalManual({
				width : 600,
				height : 360,
				title : "添加学生",
				content : it.stu_pop()
			});
			it.getStuList(1);
		});

	}
	it.stu_pop = function() {
		var html = '<table id="js_tablebox_study" class="tablebox"></table>';
		html += '<div id="pop_pageShow_study"></div>';
		html += '<div class="overlay_btn">';
		html += '<input type="button" class="btn btn_green overlayClose" onclick="student_chk.subm()" value="确定选择"/>';
		html += '<input type="button" class="btn btn_gray overlayClose" value="关闭" />';
		html += '</div>';
		return html;
	};
	it.getStuList = function(page) {
		page = (page && page > 0) ? page = page : page = Math.abs(page);
		var params = Ab.urlDecode(Ab.serializeForm('form_study'));
		var queryUrl = G_FormArr['chooseStudent'];
		var queryTest = (params.form_school == '' ? 'null' : params.form_school)
				+ "/"
				+ (params.form_major == '' ? 'null' : params.form_major)
				+ '/'
				+ (params.form_educationlevel == '' ? 'null'
						: params.form_educationlevel)
				+ "/"
				+ (params.form_grade == '' ? 'null' : params.form_grade)
				+ '/'
				+ AmBow_CK.getcookie('cst').split('/')[0]
				+ '/'
				+ (params.form_studentid == '' ? 'null' : params.form_studentid)
				+ '/'
				+ (params.form_studentname == '' ? 'null'
						: params.form_studentname);
		if ($('#js_thead_study' + page).length > 0) {
			$('.js_tbody_study,.js_thead_study').hide();
			$('#js_thead_study' + page).show();
			$('#js_tbody_study' + page).show();
			$('#pop_pageShow_study').html(
					gPage(rCount, page, 'student_chk.getStuList'));
		} else {
			$
					.getJSON(
							G_ROOT + queryUrl + encodeURI(queryTest) + "/"
									+ page + '/' + G_perpage_pop + '/',
							function(data) {
								rCount = data.rCount;
								var html = '<thead id="js_thead_study'
										+ page
										+ '" class="table_header js_thead_study">';
								html += '<tr>';
								html += '<th class="first tc" width="4%"><input type="checkbox" name="checkall" onclick="checkAll(this,\'chk_study_'
										+ page + '\')"/></th>';
								html += '<th>学生ID</th>';
								html += '<th>学生姓名</th>';
								html += '</tr>';
								html += '</thead>';
								html += '<tbody id="js_tbody_study'
										+ page
										+ '" class="openable_tbody js_tbody_study">';

								$
										.each(
												data.list,
												function(k, v) {
													html += '<tr class="atPage'
															+ page + ' mid'
															+ v.ID + '">';
													html += '<td class="first tc"><input type="checkbox" name="checkall" class="chk_study_'
															+ page
															+ '" value="'
															+ v.ID
															+ '" '
															+ ($(
																	'#'
																			+ toElem
																			+ ' .mid'
																			+ v.ID)
																	.find(
																			'input[type="checkbox"]')
																	.attr(
																			'checked') == 'checked' ? 'checked'
																	: '')
															+ ' /></td>';
													html += '<td>' + v.ID
															+ '</td>';
													html += '<td>' + v.STUNAME
															+ '</td>';
													html += '</tr>';
												});
								html += '</tbody>';
								$('.js_tbody_study,.js_thead_study').hide();
								$('#js_tablebox_study').append(html);
								$('#pop_pageShow_study').html(
										gPage(data.rCount, page,
												'student_chk.getStuList',
												G_perpage_pop));
							});
		}
	};
	it.subm = function() {
		$('.js_tbody_study')
				.find('input[type="checkbox"]')
				.each(
						function() {
							if (this.checked == true) {
								if ($('#' + toElem).find('.mid' + this.value).length == 0)
									$(this).parent().parent().prependTo(
											'#' + toElem);
								else
									$('#' + toElem).find('.mid' + this.value)
											.find('input[type="checkbox"]')
											.attr('checked', true);
							} else {
								$('#' + toElem).find('.mid' + this.value)
										.remove();
							}
						})
		// $('#checkboxall_1,#'+toElem).click(function(){it.checkedCount()});
		it.checkedCount();
		it.newPage(1);
		it.popdel()
	};
	it.newPage = function(page) {
		currPage2 = page;
		$('#' + toElem).find('tr').hide().slice((page - 1) * perpage2,
				page * perpage2).show();
		$('#' + toElem + 'Page').html(
				gPage($('#' + toElem).find('tr').length, page,
						'student_chk.newPage', perpage2));
	};
	it.checkedCount = function() {
		var n = $('#' + toElem).find('input[type="checkbox"]');
		$('#' + toElem + 'Count').html(
				'当前已选学生总数：<i class="color_blue"><b>' + n.length + '</b></i>');
	};
	it.popdel = function() {
		$('#openable_tbody_study_chkedDel').live('click', function() {
			var ids = [];
			$('input[name="checkall"]').each(function() {
				if (this.checked == true) {
					$(this).parent().parent().remove();
				}
			});
			it.newPage(1);
			it.checkedCount();
		});
	}

	return it;

})();
