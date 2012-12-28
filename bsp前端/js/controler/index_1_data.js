/**
 * @author gp
 * @datetime 2012-5-18
 * @description 互选计划管理 → 互选批次组管理→ 新增
 */

var pn = getQuery('pn');
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
$(document)
		.ready(
				function() {

					var termId = getQuery('i');

					// 渲染批次参数信息列表
					var renderPiciList = function(json) {
						var status = [ '', '未开始', '公示', '开始', '暂停', '结束' ];
						var arr = json;
						var htm1 = '', htm2 = '';

						var v1 = arr[12], v2 = arr[13], v3 = arr[14];
						var s1 = [ '', '开启', '关闭' ], s2 = [ '', '开关', '时间' ], s3 = [
								'', '志愿选课', '实时选课' ];

						htm1 += '<tr>';
						htm1 += '<td class="data" code="' + v1.paraCode
								+ '"  class="first">' + v1.paraName + '</td>';
						htm1 += '<td class="data" code="' + v1.paraValue + '">'
								+ s1[v1.paraValue] + '</td>';
						htm1 += '<td></td>';
						htm1 += '</tr>';

						htm1 += '<tr>';
						htm1 += '<td class="data"  code="' + v2.paraCode
								+ '"  class="first">' + v2.paraName + '</td>';
						htm1 += '<td class="data" code="' + v2.paraValue + '">'
								+ s2[v2.paraValue] + '</td>';
						htm1 += '<td></td>';
						htm1 += '</tr>';

						htm1 += '<tr>';
						htm1 += '<td class="data" code="' + v3.paraCode
								+ '"  class="first">' + v3.paraName + '</td>';
						htm1 += '<td class="data" code="' + v3.paraValue + '">'
								+ s3[v3.paraValue] + '</td>';
						htm1 += '<td></td>';
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
							htm2 += '<td><input disabled="disabled"  type="text"id="d_'
									+ i
									+ '_1"  value="'
									+ stime
									+ '" class="data date d_odd half "/></td>';
							if (i != last) {
								htm2 += '<td><input disabled="disabled"  type="text" id="d_'
										+ i
										+ '_2"  value="'
										+ etime
										+ '"  class="data half date d_even " /></td>';
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
							/*
							 * if(v.batchStarttime){ stime=new
							 * Date(v.batchStarttime).format('yyyy-MM-dd
							 * hh:mm:ss'); } if(v.batchStarttime){ etime=new
							 * Date(v.batchEndtime).format('yyyy-MM-dd
							 * hh:mm:ss'); }
							 */
							htm += '<tr>';
							htm += '<td class="first tc"><input class="cbx" type="checkbox" name="checkall" /></td>';
							htm += '<td class="data">' + code + '</td>';
							htm += '<td class="data">' + strSplit(name, 12)
									+ '</td>';
							/*
							 * htm += '<td ><input type="text"
							 * disabled="disabled" value="'+stime+'" class="half
							 * data "/></td>'; htm += '<td><input
							 * type="text" disabled="disabled" value="'+etime+'"
							 * class="half data"/></td>';
							 */
							htm += '</tr>';

						}

						$('#termInfo_tbody').html(htm);
					};

					$.getJSON(G_ROOT + 'term/termset/info/' + termId, function(
							rs) {
						renderPiciList(rs.parameterList);
						renderInfo(rs.termSet);
						renderSchooList(rs.schoolList);
						disableForm('term_info');
					});

					$.getJSON(G_ROOT + 'planstudentscope/query/list?termId='
							+ termId, function(rs) {
						if (rs.returnCode == '000000') {
							initIndex_3(rs.list);
						}
					});

				});

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
				+ '"  class="first data">' + dt.courseNameStandard + '</td>';
		html += '<td><select disabled="disabled" class="data cmb" name="pop_major" value="'
				+ dt.majorCode + '">' + html_major + '</select></td>';
		html += '<td><select disabled="disabled"  class="data cmb" name="pop_grade" value="'
				+ dt.gradeCode + '">' + html_grade + '</select></td>';
		html += '<td><select disabled="disabled"  class="data cmb" name="pop_educationlevel" value="'
				+ dt.levelCode + '">' + html_educationlevel + '</select></td>';
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

}