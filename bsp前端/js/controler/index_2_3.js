/**
 * @author gp
 * @datetime 2012-4-26
 * @description index_2_3.js
 */

/**
 * 分页及列表
 */

var ck_type = AmBow_CK.getcookie("cst");
var term_num = ck_type.substring(0, ck_type.charAt('/') - 1);
var coms = {};
var queryUrl = '';

var cmb = new ComboxOperate();

function getList(page) {
	page = (page && page > 0) ? page = page : page = Math.abs(page);
	var url = queryUrl + page + '/' + G_perpage;
	$
			.getJSON(
					encodeURI(url),
					function(data) {
						coms = {};
						var list = data.list;
						if (list) {
							var html = '';
							$
									.each(
											list,
											function(k, v) {
												coms[v.ID] = v.APPROVE_COMMEND;
												html += '<tr>';

												html += '<td class="first tc"><input '
														+ ((user['schoolCode'] != v.SCHOOL_CODE && user['uRole'] == 2) ? 'disabled '
																: '')
														+ 'type="checkbox" class="chkc" name="checkall" value="'
														+ v.ID + '" /> </td>';
												// html+='<td>'+G_data['termset'][v.TERM_ID]+'</td>';
												html += '<td>'
														+ G_data['school'][v.SCHOOL_CODE]
														+ '</td>';
												// html+='<td>'+v.PLAN_SEQENCE+'</td>';
												html += '<td><a href="javascript:void(0);" onclick="toShow(\''
														+ v.COURSE_CODE_STANDARD
														+ '\',\''
														+ v.TERM_ID
														+ '\')">'
														+ v.COURSENAMESTANDARD
														+ '</a></td>';
												html += '<td>'
														+ (v.MAJORCODE == '' ? '全部'
																: G_data['major'][v.MAJORCODE])
														+ '</td>';
												html += '<td>'
														+ (v.LEVELCODE == '' ? '全部'
																: G_data['educationlevel'][v.LEVELCODE])
														+ '</td>';
												html += '<td>'
														+ (v.GRADECODE == '' ? '全部'
																: G_data['grade'][v.GRADECODE])
														+ '</td>';
												// html+='<td>'+G_data['courseNature'][v.COURSE_NATURE]+'</td>';
												html += '<td><a target="_blank"  href="index_2_3_view.html?ID='
														+ v.ID
														+ '&termId='
														+ v.TERM_ID
														+ '">'
														+ v.STUNDENT_COUNT
														+ '</a></td>';
												html += '<td>' + v.CREATETIME
														+ '</td>';
												html += '<td>'
														+ (((v.STATUS == 2 || v.STATUS == 4)
																&& user['schoolCode'] == v.SCHOOL_CODE && user['uRole'] == 2) ? '<a target="_blank"  href="index_2_3_view.html?ID='
																+ v.ID
																+ '&termId='
																+ v.TERM_ID
																+ '&do=edit">编辑</a>'
																: '<span class="color_gray">编辑</span>')
														+ '</td>';
												html += '<td><a href="javascript:" class="mark" alt="'
														+ v.ID
														+ '">'
														+ G_data['status'][v.STATUS]
														+ '</a></td>';
												html += '<td>' + v.APPROVETIME
														+ '</td>';
												html += '<td>' + v.APPROVER
														+ '</td>';
												// html+='<td>'+(v.STATUS==4?'<a
												// href="javascript:"
												// class="mark"
												// alt="'+v.ID+'">查看意见</a>':'')+'</td>';
												html += '</tr>';
											});

							html = throwNull(html);
							$('#checkboxall').attr('checked', false);
							$('#js_openable_tbody').html(html);
							$('#pageShow').html(
									gPage(data.rCount, page, 'getList'));

							$('.mark').unbind('click').bind(
									'click',
									function(e) {
										mark = this.getAttribute("alt");
										mark = coms[mark] == 'null' ? ''
												: coms[mark];
										e.preventDefault();
										$.fn.nyroModalManual({
											width : 400,
											title : "核审提示",
											url : 'overlay_audit_data.html'
										});
									});
						}
					});
}
function pop_del() {
	var html = '';
	html += '<div class="overlay_delete_box">';
	html += '<h5 class="red"><img src="images/delete_ico.gif" />删除后将无法恢复，确定要删除吗？</h5>';
	html += '</div>';
	html += '<div class="overlay_btn">';
	html += '<input id="index_2_3_subm_del" type="button" class="btn btn_green overlayClose" value="确定"/>';
	html += '<input type="button" class="btn btn_gray overlayClose" value="取消"/>';
	html += '</div> ';
	return html;

}
// 获取课程详情
function toShow(courseCode, termId) {
	$.fn.nyroModalManual({
		width : 800,
		title : "课程详情",
		content : show_content()
	});
	getList_courseInfo(courseCode, termId);
	return false;
};

var getList_courseInfo = function(courseCode, termId) {
	var query = "courseattribute/findCourseCode/list/";
	var url = G_ROOT + query + termId + "/" + courseCode;
	// var url = G_ROOT + query + "8a8a8cca37de930c0137de95ee210000/C00001";
	$.getJSON(url, function(data) {
		var list = data.list;
		if (list) {
			var html = '';
			$.each(list, function(k, v) {
				html += '<tr>';
				html += '<td><a href="course_open_data.html?c=' + v.coursecode
						+ '&t=' + termId + '" target="_blank">' + v.coursename
						+ '</a></td>';
				html += '<td>' + v.teachers + '</td>';
				html += '<td>' + G_data['school'][v.schoolcode] + '</td>';
				html += '<td>' + v.maxminnum + '</td>';
				html += '</tr>';
			});
			$('#openable_tbody_course_view').html(html);
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

$(document)
		.ready(
				function() {
					// 学校

					cmb.shoolAndMajor();
					$("#resetBtn").click(function(e) {
						setTimeout(function() {
							cmb.fillDefaultSchool();
						}, 200);
					});
					// 层次
					cmb.levelAndGrade();
					// 互选批次组
					cmb.term();
					// 课程性质
					var courseNatureDom = document
							.getElementById('form_courseNature');
					new Combox(courseNatureDom).fill(G_data['courseNature']);
					$('#form_courseNature').prepend(
							'<option selected value="null">全部</option>');
					$('#form_courseNature').get(0).selectedIndex = 0;

					// 查询
					$("#form_query")
							.click(
									function(e) {
										var params = Ab.urlDecode(Ab
												.serializeForm('query_form'));
										$('#Btn_export')
												.click(
														function() {
															// window.location='../courseexcel/termset/list/'+params.termid
															var html = '<div class="clearfix"><p><label class="labeltitle">互选批次组：</label><select id="export_termid" name="export_termid" iclass="half"></select></p></div>';
															html += '<div class="clearfix">';
															html += '<div class="column width3 first">';
															html += '<p><label class="labeltitle">学校：</label><select id="export_schoolcode" name="export_schoolcode" iclass="half"></select></p>';
															html += '<p><label class="labeltitle">层次：</label><select id="export_levelcode" name="export_levelcode" iclass="half"></select></p>';
															html += '<p><label class="labeltitle">学生类型：</label><select id="export_studenttype" name="export_studenttype" iclass="half"></select></p>';
															html += ' </div>';
															html += '<div class="column width3">';
															html += '<p><label class="labeltitle">专业：</label><select id="export_majorcode" name="export_majorcode" iclass="half"></select></p>';
															html += '<p><label class="labeltitle">年级：</label><select id="export_gradecode" name="export_gradecode" iclass="half"></select></p>';
															html += '</div>';
															html += '</div>';
															html += '<div class="overlay_btn">';
															html += '<input type="button" id="Btn_export_do" class="btn btn_green" value="导出"/> ';
															html += '<input type="button" id="Btn_export_close"class="btn btn_gray overlayClose" value="关闭"/>';
															html += '</div>';
															$.fn
																	.nyroModalManual({
																		width : 740,
																		title : "导出",
																		content : html
																	});
															var subjectDom = document
																	.getElementById('export_termid');
															new Combox(
																	subjectDom)
																	.clear()
																	.fill(
																			G_data['termset']);
															cmb
																	.shoolAndMajor({
																		'school_id' : 'export_schoolcode',
																		'major_id' : 'export_majorcode',
																		'all' : true
																	});
															cmb
																	.levelAndGrade({
																		'level_id' : 'export_levelcode',
																		'grade_id' : 'export_gradecode',
																		'all' : true
																	});
															var stuTypeDom = document
																	.getElementById('export_studenttype');
															new Combox(
																	stuTypeDom)
																	.fill(G_data['stuType']);

															$('#Btn_export_do')
																	.click(
																			function() {
																				var _url = '/'
																						+ $(
																								'#export_schoolcode')
																								.val()
																						+ '/'
																						+ $(
																								'#export_majorcode')
																								.val()
																						+ '/'
																						+ $(
																								'#export_levelcode')
																								.val()
																						+ '/'
																						+ $(
																								'#export_gradecode')
																								.val()
																						+ '/'
																						+ $(
																								'#export_studenttype')
																								.val()
																						+ '/'
																						+ $(
																								'#export_termid')
																								.val();

																				$
																						.getJSON(
																								G_ROOT
																										+ 'courseexcel/planchoosecoursevalidator/toexcel'
																										+ _url,
																								function(
																										data) {
																									if (data.returnCode == '000000') {
																										window.location = G_ROOT
																												+ 'courseexcel/planchoosecourse/toexcel'
																												+ _url;
																										$(
																												'#Btn_export_close')
																												.click();
																									} else {
																										mAlert('学生列表或课程列表为空，不允许导出');
																									}
																								})

																			});
														});

										queryUrl = G_ROOT
												+ G_FormArr['chooseCourseList']
												+ '/'
												+ params.termid
												+ "/"
												+ params.status
												+ "/"
												+ params.schoolcode
												+ "/"
												+ params.majorcode
												+ "/"
												+ params.levelcode
												+ "/"
												+ params.gradecode
												+ "/null/"
												+ (params.standerCourseCode ? params.standerCourseCode
														: params.standerCourseCode = 'null')
												+ "/"
												+ (params.standerCourseName ? params.standerCourseName
														: params.standerCourseName = 'null')
												+ "/";
										getList(1);
									});

					$("#form_query").click();

					if (user['uRole'] != 1) {
						$('#addBtn').remove();
						$('#delBtn').remove();
					}

				});