/**
 * @author gp
 * @datetime 2012-5-18
 * @description 互选计划管理 → 互选批次组管理→ 新增
 */
var pn = getQuery('pn');
var winObj = {};
var st = [ [], [ '开启', '关闭' ], [ '开关', '时间' ], [ '实时选课', '志愿选课' ] ];
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

					var termId = getQuery('i');
					$('.backBtn').click(function() {
						location.href = "index_1.html?pn=" + pn;
					});

					// 渲染批次参数信息列表
					var renderPiciList = function(json) {
						var status = [ '', '未开始', '公示', '开始', '暂停', '结束' ];
						var arr = json;
						var htm1 = '', htm2 = '';

						var v1 = arr[12], v2 = arr[13], v3 = arr[14];
						var s1 = [ '', '开启', '关闭' ], s2 = [ '', '开关', '时间' ], s3 = [
								'', '实时选课', '志愿选课' ];

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
								+ s3[v3.paraValue] + '</td>';
						htm1 += '<td><a class="data" href="#" onclick="dialog(this)" code="'
								+ v3.paraValue + ',3">修改</a></td>';
						htm1 += '</tr>';

						$('#params_tbody').html(htm1);

						for ( var i = 0, len = arr.length - 3, last = len - 1; i < len; i++) {
							var v = arr[i], stime = '', etime = '', s = parseInt(v.paraValue);
							if (v.proStarttime) {
								stime = new Date(v.proStarttime)
										.format('yyyy-MM-dd hh:mm:ss');
							}
							if (v.proEndtime) {
								etime = new Date(v.proEndtime)
										.format('yyyy-MM-dd hh:mm:ss');
							}
							htm2 += '<tr>';
							htm2 += '<td class="data date"  code="'
									+ v.paraCode + '" pvalue="' + v.paraValue
									+ '"  class="first">' + v.paraName
									+ '</td>';
							htm2 += '<td class="data" code="' + s + '" >'
									+ status[s] + '</td>';
							htm2 += '<td><input type="text"id="d_'
									+ i
									+ '_1"  value="'
									+ stime
									+ '" class="data date d_odd half overlay_time dateinput" style="width:80%" onFocus="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\',isShowWeek:true,onpicked:oddClick(this)})"  /></td>';
							if (i != last) {
								htm2 += '<td><input type="text" id="d_'
										+ i
										+ '_2"  value="'
										+ etime
										+ '"  class="data half date d_even overlay_time dateinput" style="width:80%" onFocus="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\',isShowWeek:true,onpicked:function(){}})"  /></td>';
							}

							htm2 += '</tr>';
						}

						$('#controler_tbody').html(htm2);

					};

					// 渲染基本信息表单
					var renderInfo = function(dt) {
						if (dt) {
							var form = document.getElementById('term_info');
							var els = form.elements;
							var stime = '', etime = '';
							if (dt.termStarttime) {
								stime = new Date(dt.termStarttime)
										.format('yyyy-MM-dd hh:mm:ss');
							}
							if (dt.termEndtime) {
								etime = new Date(dt.termEndtime)
										.format('yyyy-MM-dd hh:mm:ss');
							}
							els.termName.value = dt.termName;
							els.orderNum.value = dt.orderNum;
							// els.termYear.value = dt.termYear;
							els.termStarttime.value = stime;
							els.termEndtime.value = etime;
							var sts = dt.ralationStudent;
							els.termDescribe.value = dt.termDescribe || '';
							var cbx = $("input[name='ralationStudent']");
							if (sts) {
								var arr = sts.split(',');
								for ( var i = 0, len = arr.length; i < len; i++) {
									cbx[parseInt(arr[i]) - 1].checked = true;
								}
							}

						}
					};

					// 渲染学校列表
					var renderSchooList = function(json) {
						var htm = '';
						for ( var i = 0, len = json.length; i < len; i++) {
							var v = json[i];
							var code = v.schoolCode, name = v.schoolName, stime = '', etime = '';
							if (v.batchStarttime) {
								stime = new Date(v.batchStarttime)
										.format('yyyy-MM-dd hh:mm:ss');
							}
							if (v.batchStarttime) {
								etime = new Date(v.batchEndtime)
										.format('yyyy-MM-dd hh:mm:ss');
							}
							htm += '<tr id="chked_' + code + '">';
							htm += '<td class="first tc"><input class="cbx" type="checkbox" name="checkall" /></td>';
							htm += '<td class="data">' + code + '</td>';
							htm += '<td class="data date">' + name + '</td>';
							// htm += '<td ><input type="text" value="'+stime+'"
							// class="half data date overlay_time dateinput"
							// onFocus="WdatePicker({dateFmt:\'yyyy-MM-dd
							// HH:mm:ss\',isShowWeek:true,onpicked:function(){}})"
							// /></td>';
							// htm += '<td><input type="text" value="'+etime+'"
							// class="half data date overlay_time dateinput"
							// onFocus="WdatePicker({dateFmt:\'yyyy-MM-dd
							// HH:mm:ss\',isShowWeek:true,onpicked:function(){}})"
							// /></td>';
							htm += '</tr>';

						}

						$('#termInfo_tbody').html(htm);
					};

					$.getJSON(G_ROOT + 'term/termset/info/' + termId, function(
							rs) {
						renderPiciList(rs.parameterList);
						renderInfo(rs.termSet);
						renderSchooList(rs.schoolList);
					});

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
										params.id = termId;
										params.termYear = params.termEndtime
												.split('-')[0];
										var trs = $('#termInfo_tbody').find(
												'tr');
										var schools = [];
										for ( var i = 0, len = trs.length; i < len; i++) {

											var tds = $(trs[i]).find('.data');

											var obj = {
												schoolCode : tds[0].innerHTML,
												schoolName : tds[1].innerHTML
											};// ,batchStarttime:tds[2].value,batchEndtime:tds[3].value
											schools.push(obj);

										}

										var po = {
											schoolList : schools,
											termSet : params
										};
										var str = Ab.encode(po);
										$
												.ajax({
													type : 'POST',
													data : str,
													dataType : 'json',
													url : G_ROOT
															+ 'term/termset/update',
													contentType : 'application/json;charset=UTF-8',
													success : function(rs) {
														if (rs.returnCode = '000000') {
															msgBox
																	.show("基本信息保存成功");
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
								paraValue : tds[0].getAttribute('pvalue'),
								proStarttime : tds[2].value,
								// proEndtime:tds[3].value,
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
						$.ajax({
							type : 'POST',
							data : str,
							dataType : 'json',
							url : G_ROOT + 'term/termparameter/update',
							contentType : 'application/json;charset=UTF-8',
							success : function(rs) {
								if (rs.returnCode == '000000') {
									msgBox.show("参数信息保存成功");

								}

							}
						});
					});

					$('#term_save_3').click(function() {
						var tb = $('#js_ched_list');
						var trs = tb.find('tr');
						var list = [];
						for ( var i = 0, len = trs.length; i < len; i++) {
							var tr = $(trs[i]);
							var ds = tr.find('.data');

							/*
							 * var o ={}; o['ID']=$(ds[0]).attr('rid');
							 * o['MAJOR_CODE']=ds[1].value;
							 * o['GRADE_CODE']=ds[2].value;
							 * o['LEVEL_CODE']=ds[3].value;
							 */
							list.push({
								termId : termId,
								courseCodeStandard : $(ds[0]).attr('code'),
								majorCode : ds[1].value,
								levelCode : ds[3].value,
								gradeCode : ds[2].value,
								creater : user['uname']
							});
						}

						var str = Ab.encode({
							planStudentscope : list
						});
						$.ajax({
							type : 'POST',
							data : str,
							dataType : 'json',
							url : G_ROOT + 'planstudentscope/edit/editlist',
							contentType : 'application/json;charset=UTF-8',
							success : function(rs) {
								if (rs.returnCode = '000000') {
									location.href = "index_1.html";
								} else if (rs.returnCode == "600004") {
									mAlert(rs.entity);
								}
							}
						});
					});

					// 删除学校事件
					$('#schoolDelBtn').click(function(e) {
						var trs = $('#termInfo_tbody').find('tr');
						for ( var i = 0, len = trs.length; i < len; i++) {
							var tr = $(trs[i]);
							var cbx = tr.find('.cbx')[0];
							if (cbx.checked) {
								tr.remove();
							}
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
						for ( var i = 0, len = trs.length, last = len - 1; i < len; i++) {
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
								jdom.html('不能超过' + len + '字');
								jdom.removeClass('hidden').addClass('error');
								checked = false;
							} else {
								jdom.removeClass('error').addClass('hidden');
							}

						};

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

					$.getJSON(G_ROOT + 'planstudentscope/query/list?termId='
							+ termId, function(rs) {
						if (rs.returnCode == '000000') {
							initIndex_3(rs.list);
						}
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

function initIndex_3(data) {
	var html_major = '';
	for ( var i in G_data['major']) {
		html_major += '<option value="' + i + '">' + G_data['major'][i]
				+ '</option>';
	}

	var html_educationlevel = '';
	for ( var i in G_data['educationlevel']) {
		html_educationlevel += '<option value="' + i + '">'
				+ G_data['educationlevel'][i] + '</option>';
	}

	var html_grade = '';
	for ( var i in G_data['grade']) {
		html_grade += '<option value="' + i + '">' + G_data['grade'][i]
				+ '</option>';
	}
	var html = '';
	for ( var i = 0, len = data.length; i < len; i++) {
		var dt = data[i];
		html += '<tr>';
		html += '<td rid="' + dt.id + '"  code="' + dt.courseCodeStandard
				+ '"  class="first data codes">' + dt.courseNameStandard
				+ '</td>';
		html += '<td><select class="data cmb" name="pop_major" value="'
				+ dt.majorCode + '">' + html_major + '</select></td>';
		html += '<td><select class="data cmb" name="pop_grade" value="'
				+ dt.gradeCode + '">' + html_grade + '</select></td>';
		html += '<td><select class="data cmb" name="pop_educationlevel" value="'
				+ dt.levelCode + '">' + html_educationlevel + '</select></td>';
		html += '<td><input type="button" class="btn btn_red overlay_delete js_del_123" value="删除"/></td></tr>';
		html += '</tr>';
	}
	$('#js_ched_list').html(html);
	var trs = $('#js_ched_list').find('tr');
	for ( var i = 0, len = data.length; i < len; i++) {
		var dt = data[i];
		tr = trs[i];
		var tds = $(tr).find('.cmb');
		tds[0].value = dt.majorCode;
		tds[1].value = dt.gradeCode;
		tds[2].value = dt.levelCode;

	}
	$('.js_del_123').click(function() {
		$(this).parent().parent().remove();
	});
}
