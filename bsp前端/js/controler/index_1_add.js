/**
 * @author gp
 * @datetime 2012-5-18
 * @description 互选计划管理 → 互选批次组管理→ 新增
 */
var winObj = {};
var st = [ [], [ '开启', '关闭' ], [ '开关', '时间' ], [ '志愿选课', '实时选课' ] ];
function dialog(me) {
	var arr = me.getAttribute('code').split(',');
	var s = arr[0], row = arr[1];
	winObj = {
		row : row,
		str : st[row],
		statu : s
	};
	$.fn.nyroModalManual({
		width : 400,
		title : "更改状态",
		url : 'overlay_params_status.html'
	});
	return false;
};

function oddClick(dom) {
	if (!(dom && dom.getAttribute)) {
		return;
	}
	var id = dom.getAttribute('id');
	var arr = id.split('_');
	var id_row = arr[1], id_col = arr[2];
	if (id_row != 0) {
		var preRow = parseInt(id_row) - 1;
		var preDom = $('#d_' + preRow + '_2');
		if (preDom.val() == '') {
			preDom.val(dom.value);
		}
	}
}

$(document)
		.ready(
				function() {
					var a = $("#explore_nav li a");
					$(a[1]).hide();
					$(a[2]).hide();

					var termId = '';
					var json = {
						"termSet" : {
							"id" : "8a8a8cca378c331701378d09eb13003a",
							"termName" : "gfg",
							"orderNum" : 2,
							"termYear" : "2013",
							"termStarttime" : 1338163200000,
							"termEndtime" : 1338422400000,
							"termDescribe" : "gfg",
							"ralationStudent" : "1",
							"creater" : "studt12000006",
							"createtime" : 1338101066000,
							"updater" : null,
							"updatetime" : null,
							"status" : "1"
						},
						"schoolList" : [ {
							"id" : "8a8a8cca378c331701378d09eb29003b",
							"termId" : "8a8a8cca378c331701378d09eb13003a",
							"schoolCode" : "S0010",
							"schoolName" : "上海交大",
							"orderNum" : 1,
							"batchStarttime" : 1335916800000,
							"batchEndtime" : 1338249600000,
							"creater" : null,
							"createtime" : 1338101066000,
							"updater" : null,
							"updatetime" : null,
							"status" : "1"
						} ],
						"parameterList" : [ {
							"id" : "8a8a8cca378c331701378d09eb3d003c",
							"termId" : "8a8a8cca378c331701378d09eb13003a",
							"paraCode" : "PLAN_OPEN_COURSE",
							"paraName" : "开课计划",
							"paraValue" : "1",
							"paraType" : "2",
							"orderNum" : 1,
							"proStarttime" : null,
							"proEndtime" : null,
							"creater" : "admin",
							"createtime" : 1334764800000,
							"updater" : null,
							"updatetime" : null,
							"status" : "1"
						}, {
							"id" : "8a8a8cca378c331701378d09eb47003d",
							"termId" : "8a8a8cca378c331701378d09eb13003a",
							"paraCode" : "PLAN_OPEN_COURSE_SH",
							"paraName" : "开课计划审核",
							"paraValue" : "1",
							"paraType" : "2",
							"orderNum" : 2,
							"proStarttime" : null,
							"proEndtime" : null,
							"creater" : "admin",
							"createtime" : 1334764800000,
							"updater" : null,
							"updatetime" : null,
							"status" : "1"
						}, {
							"id" : "8a8a8cca378c331701378d09eb47003e",
							"termId" : "8a8a8cca378c331701378d09eb13003a",
							"paraCode" : "PLAN_CHOOSE_COURSE",
							"paraName" : "选课计划",
							"paraValue" : "1",
							"paraType" : "2",
							"orderNum" : 3,
							"proStarttime" : null,
							"proEndtime" : null,
							"creater" : "admin",
							"createtime" : 1334764800000,
							"updater" : null,
							"updatetime" : null,
							"status" : "1"
						}, {
							"id" : "8a8a8cca378c331701378d09eb51003f",
							"termId" : "8a8a8cca378c331701378d09eb13003a",
							"paraCode" : "PLAN_CHOOSE_COURSE_SH",
							"paraName" : "选课计划审核",
							"paraValue" : "1",
							"paraType" : "2",
							"orderNum" : 4,
							"proStarttime" : null,
							"proEndtime" : null,
							"creater" : "admin",
							"createtime" : 1334764800000,
							"updater" : null,
							"updatetime" : null,
							"status" : "1"
						}, {
							"id" : "8a8a8cca378c331701378d09eb5b0040",
							"termId" : "8a8a8cca378c331701378d09eb13003a",
							"paraCode" : "PLAN_CHOOSE_COURSE_SET",
							"paraName" : "选课设置",
							"paraValue" : "1",
							"paraType" : "2",
							"orderNum" : 5,
							"proStarttime" : null,
							"proEndtime" : null,
							"creater" : "admin",
							"createtime" : 1334764800000,
							"updater" : null,
							"updatetime" : null,
							"status" : "1"
						}, {
							"id" : "8a8a8cca378c331701378d09eb650041",
							"termId" : "8a8a8cca378c331701378d09eb13003a",
							"paraCode" : "CHOOSE_BATCH",
							"paraName" : "批量选课",
							"paraValue" : "1",
							"paraType" : "2",
							"orderNum" : 6,
							"proStarttime" : null,
							"proEndtime" : null,
							"creater" : "admin",
							"createtime" : 1334764800000,
							"updater" : null,
							"updatetime" : null,
							"status" : "1"
						}, {
							"id" : "8a8a8cca378c331701378d09eb6f0042",
							"termId" : "8a8a8cca378c331701378d09eb13003a",
							"paraCode" : "CHOOSE_BATCH_SH",
							"paraName" : "批量选课审核",
							"paraValue" : "1",
							"paraType" : "2",
							"orderNum" : 7,
							"proStarttime" : null,
							"proEndtime" : null,
							"creater" : "admin",
							"createtime" : 1334764800000,
							"updater" : null,
							"updatetime" : null,
							"status" : "1"
						}, {
							"id" : "8a8a8cca378c331701378d09eb790043",
							"termId" : "8a8a8cca378c331701378d09eb13003a",
							"paraCode" : "OBLIGATORY_GRAB",
							"paraName" : "必修抢座",
							"paraValue" : "1",
							"paraType" : "2",
							"orderNum" : 8,
							"proStarttime" : null,
							"proEndtime" : null,
							"creater" : "admin",
							"createtime" : 1334764800000,
							"updater" : null,
							"updatetime" : null,
							"status" : "1"
						}, {
							"id" : "8a8a8cca378c331701378d09eb790044",
							"termId" : "8a8a8cca378c331701378d09eb13003a",
							"paraCode" : "OPTIONAL_GRAB",
							"paraName" : "选修抢座",
							"paraValue" : "1",
							"paraType" : "2",
							"orderNum" : 9,
							"proStarttime" : null,
							"proEndtime" : null,
							"creater" : "admin",
							"createtime" : 1334764800000,
							"updater" : null,
							"updatetime" : null,
							"status" : "1"
						}, {
							"id" : "8a8a8cca378c331701378d09eb830045",
							"termId" : "8a8a8cca378c331701378d09eb13003a",
							"paraCode" : "ASPIRATION_CHOOSE",
							"paraName" : "志愿选课",
							"paraValue" : "1",
							"paraType" : "2",
							"orderNum" : 10,
							"proStarttime" : null,
							"proEndtime" : null,
							"creater" : "admin",
							"createtime" : 1334764800000,
							"updater" : null,
							"updatetime" : null,
							"status" : "1"
						}, {
							"id" : "8a8a8cca378c331701378d09eb970046",
							"termId" : "8a8a8cca378c331701378d09eb13003a",
							"paraCode" : "ASPIRATION_CHOOSE_SH",
							"paraName" : "志愿选课审核",
							"paraValue" : "1",
							"paraType" : "2",
							"orderNum" : 11,
							"proStarttime" : null,
							"proEndtime" : null,
							"creater" : "admin",
							"createtime" : 1334764800000,
							"updater" : null,
							"updatetime" : null,
							"status" : "1"
						}, {
							"id" : "8a8a8cca378c331701378d09eba10047",
							"termId" : "8a8a8cca378c331701378d09eb13003a",
							"paraCode" : "ANNOUNCE_RESULT",
							"paraName" : "发布选课结果\n",
							"paraValue" : "1",
							"paraType" : "2",
							"orderNum" : 12,
							"proStarttime" : null,
							"proEndtime" : null,
							"creater" : "admin",
							"createtime" : 1334764800000,
							"updater" : null,
							"updatetime" : null,
							"status" : "1"
						}, {
							"id" : "8a8a8cca378c331701378d09ebab0048",
							"termId" : "8a8a8cca378c331701378d09eb13003a",
							"paraCode" : "CHOOSE_CANCEL",
							"paraName" : "选课撤销功能",
							"paraValue" : "1",
							"paraType" : "1",
							"orderNum" : 1,
							"proStarttime" : null,
							"proEndtime" : null,
							"creater" : "admin",
							"createtime" : 1334764800000,
							"updater" : null,
							"updatetime" : null,
							"status" : "1"
						}, {
							"id" : "8a8a8cca378c331701378d09ebab0049",
							"termId" : "8a8a8cca378c331701378d09eb13003a",
							"paraCode" : "CHOOSE_CTR_TYPE",
							"paraName" : "选课控制方式",
							"paraValue" : "1",
							"paraType" : "1",
							"orderNum" : 2,
							"proStarttime" : null,
							"proEndtime" : null,
							"creater" : "admin",
							"createtime" : 1334764800000,
							"updater" : null,
							"updatetime" : null,
							"status" : "1"
						}, {
							"id" : "8a8a8cca378c331701378d09ebb5004a",
							"termId" : "8a8a8cca378c331701378d09eb13003a",
							"paraCode" : "CHOOSE_TYPE",
							"paraName" : "默认选课方式",
							"paraValue" : "1",
							"paraType" : "1",
							"orderNum" : 3,
							"proStarttime" : null,
							"proEndtime" : null,
							"creater" : "admin",
							"createtime" : 1334764800000,
							"updater" : null,
							"updatetime" : null,
							"status" : "1"
						} ]
					};
					// 基本信息保存
					$('#term_save')
							.click(
									function() {
										if (!validateForm1()) {
											return;
										}
										var params = Ab.urlDecode(Ab
												.serializeForm('term_info'));
										params.ralationStudent = AmBow_CK
												.getcookie('cst').split('/')[0];
										/*
										 * var sts = params.ralationStudent||[];
										 * if(Ab.isString(sts)){sts=[sts]}
										 * if(sts.length==0){
										 * $('#ralationStudentInfo').html("必须选择一个");
										 * $('#ralationStudentInfo').removeClass('hidden').addClass('error');
										 * return; }else{
										 * $('#ralationStudentInfo').removeClass('error').addClass('hidden'); }
										 */
										if (!validateSchool()) {
											return;
										}
										;
										// params.ralationStudent =
										// sts.join(',');
										params.creater = user['uid'];
										params.termYear = params.termEndtime
												.split('-')[0];
										delete params.checkall;
										var trs = $('#termInfo_tbody').find(
												'tr');
										var schools = [];
										for ( var i = 0, len = trs.length; i < len; i++) {

											var tds = $(trs[i]).find('.data');

											var obj = {
												schoolCode : tds[0].innerHTML,
												schoolName : tds[1].innerHTML
											}; // ,batchStarttime:tds[2].value,batchEndtime:tds[3].value
											schools.push(obj);

										}

										var po = {
											schoolList : schools,
											termSet : params
										};
										var str = Ab.encode(po);
										$('#term_save').remove();
										$
												.ajax({
													type : 'POST',
													data : str,
													dataType : 'json',
													url : G_ROOT
															+ 'term/termset/create',
													contentType : 'application/json;charset=UTF-8',
													success : function(rs) {
														if (rs.returnCode = '000000') {
															msgBox.show(
																	"基本信息保存成功",
																	5);
															termId = rs.entity;
															$('#serialNum')
																	.val(termId);
															var a = $("#explore_nav li a");
															var a2 = $(a[1]);

															// $('#term_back').remove();
															a2.show();
															a2.click();
														}

													}
												});
									});

					// 参数信息保存
					$('#params_save').click(function() {
						if (!validateControl()) {
							return;
						}
						var me = this;
						var pdata = [];
						var pTrs = $('#controler_tbody').find('tr');
						for ( var i = 0, len = pTrs.length; i < len; i++) {
							var tr = pTrs[i];
							var tds = $(tr).find('.data');
							var v = {
								termId : termId,
								paraCode : tds[0].getAttribute('code'),
								proStarttime : tds[2].value,
								paraValue : 1,
								creater : user['uid']
							};
							if (tds[3]) {
								v.proEndtime = tds[3].value;
							}
							pdata.push(v);
						}

						var p1Trs = $('#params_tbody').find('tr');
						for ( var i = 0, len = p1Trs.length; i < len; i++) {
							var tr = p1Trs[i];
							var tds = $(tr).find('.data');
							var v = {
								termId : termId,
								paraCode : tds[0].getAttribute('code'),
								paraValue : tds[1].getAttribute('code'),
								creater : user['uid']
							};
							pdata.push(v);
						}

						var str = Ab.encode({
							parameterList : pdata
						});
						$(me).remove();
						$.ajax({
							type : 'POST',
							data : str,
							dataType : 'json',
							url : G_ROOT + 'term/termparameter/update',
							contentType : 'application/json;charset=UTF-8',
							success : function(rs) {
								if (rs.returnCode = '000000') {
									msgBox.show("参数信息保存成功", 5);
									var a = $("#explore_nav li a");
									var a2 = $(a[2]);
									// $('#term_back').remove();
									a2.show();
									a2.click();
								}
							}
						});
					});

					var status = [ '', '未开始', '公示', '开始', '暂停', '结束' ];
					var arr = json.parameterList;
					var htm1 = '', htm2 = '';

					var v1 = arr[12], v2 = arr[13], v3 = arr[14];
					var s1 = [ '', '开启', '关闭' ], s2 = [ '', '开关', '时间' ], s3 = [
							'', '志愿选课', '实时选课' ];

					htm1 += '<tr>';
					htm1 += '<td class="data" code="' + v1.paraCode
							+ '"  class="first">' + v1.paraName + '</td>';
					htm1 += '<td class="data" code="' + v1.paraValue + '">'
							+ s1[v1.paraValue] + '</td>';
					htm1 += '<td><a class="data edit"  href="#"  onclick="dialog(this)" code="'
							+ v1.paraValue + ',1">修改</a></td>';
					htm1 += '</tr>';

					htm1 += '<tr>';
					htm1 += '<td class="data"  code="' + v2.paraCode
							+ '"  class="first">' + v2.paraName + '</td>';
					htm1 += '<td class="data" code="' + v2.paraValue + '">'
							+ s2[v2.paraValue] + '</td>';
					htm1 += '<td><a class="data edit" href="#"  onclick="dialog(this)" code="'
							+ v2.paraValue + ',2">修改</a></td>';
					htm1 += '</tr>';

					htm1 += '<tr>';
					htm1 += '<td class="data" code="' + v3.paraCode
							+ '"  class="first">' + v3.paraName + '</td>';
					htm1 += '<td class="data" code="' + v3.paraValue + '">'
							+ s3[v1.paraValue] + '</td>';
					htm1 += '<td><a class="data" href="#" onclick="dialog(this)" code="'
							+ v3.paraValue + ',3">修改</a></td>';
					htm1 += '</tr>';

					$('#params_tbody').html(htm1);

					for ( var i = 0, len = arr.length - 3, last = len - 1; i < len; i++) {
						var v = arr[i], s = parseInt(v.paraValue);

						htm2 += '<tr>';
						htm2 += '<td class="data date" code="' + v.paraCode
								+ '"  class="first">' + v.paraName + '</td>';
						htm2 += '<td class="data" code="' + s + '" >'
								+ status[s] + '</td>';
						htm2 += '<td><input type="text" id="d_'
								+ i
								+ '_1" class="data date half overlay_time d_odd dateinput" onFocus="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\',isShowWeek:true,onpicked:oddClick(this)})"  /></td>';
						if (i != last)
							htm2 += '<td><input type="text" id="d_'
									+ i
									+ '_2"  class="data date half overlay_time d_even dateinput" onFocus="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\',isShowWeek:true,onpicked:function(){}})"  /></td>';
						htm2 += '</tr>';
					}

					$('#controler_tbody').html(htm2);

					// 删除学校事件
					$('#schoolDelBtn').click(function(e) {
						var flag = false;
						var trs = $('#termInfo_tbody').find('tr');
						for ( var i = 0, len = trs.length; i < len; i++) {
							var tr = $(trs[i]);
							var cbx = tr.find('.cbx')[0];
							if (cbx.checked) {
								tr.remove();
								flag = true;
							}
						}
						if (!flag) {
							mAlert('请选择要移除的学校');
						}

					});

					/**/
					function validateSchool() {
						var tb = $('#termInfo_tbody'), trs = tb.find('tr');
						var len = trs.length;
						if (len == 0) {
							mAlert("学校不能为空");
							return false;
						}
						/*
						 * for(var i=0;i<len;i++){ var tr = $(trs[i]); var dts =
						 * tr.find('.date'); var
						 * name=dts[0].innerHTML,d1=dts[1].value,d2=dts[2].value;
						 * if(!d1||!d2){ mAlert(name+"的起止时间不能为空"); return false;
						 * }else if(d1>d2){ mAlert(name+"的起始时间不能大于结束时间"); return
						 * false; } }
						 */
						return true;
					}

					function validateControl() {
						var tb = $('#controler_tbody'), trs = tb.find('tr');
						var len = trs.length;

						for ( var i = 0, last = len - 1; i < len; i++) {
							var tr = $(trs[i]);
							var dts = tr.find('.date');
							var name = dts[0].innerHTML, d1 = dts[1].value;
							if (i == last) {
								if (!d1) {
									mAlert(name + "的起始时间不能为空");
									return false;
								}
							} else {
								var d2 = dts[2].value;
								if (!d1 || !d2) {
									mAlert(name + "的起止时间不能为空");
									return false;
								} else if (d1 > d2) {
									mAlert(name + "的起始时间不能大于结束时间");
									return false;
								}
							}

						}
						return true;
					}

					function validateForm1() {
						var checked = true;
						var longCheck = function(dom, jdom, len) {
							var len = len || 200;
							var val = dom.val();
							if (val.trim().length == 0) {
								jdom.html("不能为空");
								jdom.removeClass('hidden').addClass('error');
								checked = false;
							} else if (val.length > len) {
								jdom.html('输入内容应该在1到' + len + '字之间');
								jdom.removeClass('hidden').addClass('error');
								checked = false;
							} else {
								jdom.removeClass('error').addClass('hidden');
							}

						};

						// longCheck($('#termYear'),$('#termYearInfo'),25);
						longCheck($('#termName'), $('#termNameInfo'), 60);
						longCheck($('#termStarttime'), $('#termStarttimeInfo'));
						longCheck($('#termEndtime'), $('#termEndtimeInfo'));
						longCheck($('#termDescribe'), $('#termDescribeInfo'),
								1000);

						if ($('#termEndtime').val()
								&& ($('#termEndtime').val() < $(
										'#termStarttime').val())) {
							$('#termEndtimeInfo').html('开始时间不能大于结束时间').width(
									300);
							$('#termEndtimeInfo').removeClass('hidden')
									.addClass('error');
							checked = false;
						}
						var dd = maskForm('term_info');
						if (!dd) {
							checked = false;
						}
						return checked;
					}

					$('#term_save_3')
							.click(
									function() {
										var tb = $('#js_ched_list');
										var trs = tb.find('tr');
										var list = [];
										for ( var i = 0, len = trs.length; i < len; i++) {
											var tr = $(trs[i]);
											var ds = tr.find('.data');

											/*
											 * var o ={};
											 * o['ID']=$(ds[0]).attr('rid');
											 * o['MAJOR_CODE']=ds[1].value;
											 * o['GRADE_CODE']=ds[2].value;
											 * o['LEVEL_CODE']=ds[3].value;
											 */
											list.push({
												termId : termId,
												courseCodeStandard : $(ds[0])
														.attr('code'),
												majorCode : ds[1].value,
												levelCode : ds[3].value,
												gradeCode : ds[2].value,
												creater : user['uname']
											});
										}

										var str = Ab.encode({
											planStudentscope : list
										});
										$
												.ajax({
													type : 'POST',
													data : str,
													dataType : 'json',
													url : G_ROOT
															+ 'planstudentscope/create/createlist',
													contentType : 'application/json;charset=UTF-8',
													success : function(rs) {
														if (rs.returnCode = '000000') {
															location.href = "index_1.html";
														}
													}
												});

									});

				});

function index_3_add_save() {
	var html_major = '';
	for ( var i in G_data['major']) {
		html_major += '<option value="' + i + '">' + G_data['major'][i]
				+ '</option>';
	}
	html_major = '<select class="data" name="pop_major">' + html_major
			+ '</select>';

	var html_educationlevel = '';
	for ( var i in G_data['educationlevel']) {
		html_educationlevel += '<option value="' + i + '">'
				+ G_data['educationlevel'][i] + '</option>';
	}
	html_educationlevel = '<select class="data" name="pop_educationlevel">'
			+ html_educationlevel + '</select>';

	var html_grade = '';
	for ( var i in G_data['grade']) {
		html_grade += '<option value="' + i + '">' + G_data['grade'][i]
				+ '</option>';
	}
	html_grade = '<select class="data" name="pop_grade">' + html_grade
			+ '</select>';

	var haved = [];
	var tds = $('#js_ched_list').find('td.codes');
	for ( var i = 0, len = tds.length; i < len; i++) {
		haved.push(tds[i].getAttribute('code'));
	}

	var html = '';
	$('#win_table_add_3')
			.find('input:checked')
			.each(
					function() {
						var me = $(this);
						var td = me.parent();
						var code = td.attr('code');
						if (haved.indexOf(code) == -1) {
							html += '<tr>';
							html += '<td rid="' + td.attr('rid') + '"  code="'
									+ code + '"  class="first data codes">'
									+ td.attr('alt') + '</td>';
							html += '<td>' + html_major + '</td>';
							html += '<td>' + html_grade + '</td>';
							html += '<td>' + html_educationlevel + '</td>';
							html += '<td><input type="button" class="btn btn_red overlay_delete js_del_123" value="删除"/></td></tr>';
							html += '</tr>';
						}

					});
	$('#js_ched_list').append(html);
	$('#js_index_3_add_close').click();

	$('.js_del_123').click(function() {
		$(this).parent().parent().remove();
	});
};