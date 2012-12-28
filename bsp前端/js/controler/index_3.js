/**
 * @author gp
 * @datetime 2012-5-2
 * @description 开课计划审核
 */

/**
 * 分页及列表
 */

function audit(params, suc, err) {
	var str = Ab.encode(params);
	$.ajax({
		type : 'POST',
		data : str,
		dataType : 'json',
		url : G_ROOT + G_FormArr['planCourseAuditetail'] + '?termId='
				+ $('#form_term').val(),
		contentType : 'application/json;charset=UTF-8',
		success : suc

	});
}

var mark = "";
var queryUrl = '';
var statu = [ '删除', '已录入', '待审核', '审核通过', '审核未通过', '已失效', '已停用', '暂停选课' ];
var sts = [ '', '闭卷', '开卷', '论文', '作品', '其他' ];

var cmb = new ComboxOperate();
var coms = {};
function getList(page) {
	page = (page && page > 0) ? page = page : page = Math.abs(page);
	var url = queryUrl + page + '/' + G_perpage;
	$
			.getJSON(
					encodeURI(url),
					function(data) {
						coms = {};
						var pageTotal = data.rCount;
						var data = data.list;
						if (data) {
							var html = '';

							var schoolDom = document
									.getElementById('form_school');

							// schoolDom.options[schoolDom.selectedIndex].text;

							$
									.each(
											data,
											function(k, v) {
												var schoolName = G_data['school'][v.SCHOOL_CODE];
												coms[v.ID] = v.APPROVE_COMMEND;
												html += '<tr>';
												html += '<td class="first tc">'
														+ (v.STATUS == 1 ? ''
																: '<input ids="'
																		+ v.ID
																		+ '" type="checkbox"  class="chkc" name="checkall" />')
														+ '</td>';
												html += '<td><a  target="_blank"  href="course_open_data.html?c='
														+ v.COURSE_CODE
														+ '&t='
														+ v.TERM_ID
														+ '">'
														+ strSplit(
																v.COURSE_NAME,
																8)
														+ '</a></td>';
												html += '<td>'
														+ G_data['termset'][v.TERM_ID]
														+ '</td>';
												html += '<td>'
														+ v.COURSE_NAME_STANDARD
														+ '</td>';
												html += '<td>' + schoolName
														+ '</td>';
												html += '<td>' + v.TOTAL
														+ '</td>';
												html += '<td>' + v.CREATETIME
														+ '</td>';
												html += '<td><a class="mark" href="#" mark="'
														+ v.ID
														+ '">'
														+ statu[v.STATUS]
														+ '</a></td>';
												html += '<td>' + v.APPROVETIME
														+ '</td>';
												html += '<td>' + v.APPROVER
														+ '</td>';
												/*
												 * html+='<td>'+'<a
												 * class="mark" href="#"
												 * mark="'+v.ID+'">查看意见</a>'+'</td>';
												 */
												html += '</tr>';

											});
							html = throwNull(html);
							$('#js_openable_tbody').html(html);
							$('#pageShow').html(
									gPage(pageTotal, page, 'getList'));

							// $('.dis').attr('disabled',true);
							// disableBtn();
							$('.mark').unbind('click').bind(
									'click',
									function(e) {
										mark = this.getAttribute("mark");
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

function disableBtn() {
	$('#js_openable_tbody').find('input[type="checkbox"]').click(function() {
		var flag = false;
		var cbx = $('#js_openable_tbody').find('input[type="checkbox"]');
		for ( var i = 0, len = cbx.length; i < len; i++) {
			if (cbx[i].checked) {
				flag = true;
			}
		}
		if (flag) {
			$('.dis').attr('disabled', false);
		} else {
			$('.dis').attr('disabled', true);
		}
	});
}

$(document)
		.ready(
				function() {

					// 学校
					cmb.shoolAndMajor();

					// 层次
					cmb.levelAndGrade();

					// 学科
					cmb.subject();

					// 互选批次组
					cmb.term();
					var setUrl = function() {
						var params = Ab.urlDecode(Ab
								.serializeForm('search_form'));
						queryUrl = G_ROOT
								+ 'course/planopencourse/list/'
								+ params.termid
								+ '/'
								+ (params.coursecode == '' ? 'null'
										: params.coursecode)
								+ "/"
								+ (params.coursename == '' ? 'null'
										: params.coursename) + "/"
								+ params.schoolcode + "/" + params.majorcode
								+ "/" + params.subjectcode + "/"
								+ params.educationlevel + "/"
								+ params.gradecode + "/" + params.status + "/";

					};
					// 查询
					$("#form_query").click(function(e) {
						setUrl();
						getList(1);
					});

					tableCheckAll('js_openable_tbody');

					var shenHe = function(status, title) {
						var ids = getIds('js_openable_tbody');
						if (ids.length == 0) {
							alert('请选择要审核的记录');
							return;
						}
						var params = {
							approver : user['uname'],
							idList : ids,
							status : status,
							approveCommend : ''
						};

						var dgSuc = function(rs) {
							if (rs.returnCode == '000000') {
								$.fn.nyroModalManual({
									width : 400,
									title : title,
									url : 'overlay_audit.html'
								});
								getList(1);
							} else {
								alert("操作失败");
							}
							// e.preventDefault();

						}, dgErr = function(rs) {
							alert("操作失败");
						};
						audit(params, dgSuc, dgErr);
					};
					// 审核通过 3/4/1
					$('.overlay_audit_ok').click(function(e) {

						shenHe(3, "审核通过");
						return false;
					});

					// 取消审核
					$('.overlay_audit_cancel').click(function(e) {

						shenHe(2, "审核取消");
						return false;
					});

					// 重置
					$("#resetBtn").click(function(e) {
						setTimeout(function() {
							cmb.fillDefaultSchool();
						}, 200);
					});

					setUrl();
					getList(1);

				});