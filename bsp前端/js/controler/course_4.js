/**
 * @author gp
 * @datetime 2012-5-4
 * @description 志愿选课查询调整
 */
var cmb = new ComboxOperate();
function courseList(data) {
	var htm = "";
	for ( var i = 0, len = data.length; i < len; i++) {
		var v = data[i];
		var biaozhi = '';
		if (v.BIAOZHI == '可开课') {
			biaozhi = '<dd class="end"><i class="flag color_green">'
					+ v.BIAOZHI + '</i></dd>';
		} else {
			biaozhi = '<dd class="end"><i class="flag color_red">' + v.BIAOZHI
					+ '</i></dd>';
		}
		htm += '<li>' + '<dl oid="' + v.OPENID + '" class="dragtable_dl">'
				+ '<dd class="first-dd">' + v.COURSECODE + ' </dd>' + '<dd>'
				+ v.COURSENAME + ' </dd>' + '<dd>'
				+ G_data['school'][v.SCHOOLCODE] + ' </dd>' + '<dd>'
				+ v.TEACHERS + ' </dd>' + '<dd>' + v.MAXMINNUM + ' </dd>'
				+ '<dd>' + v.CURRENTNUM + '</dd>' + biaozhi + '</dl>' + '</li>';
	}
	htm = throwNull(htm);
	// $('#COURSENAMESTANDARD').text(v.COURSENAMESTANDARD);
	$('#allItems').html(htm);
	initDragDropScript();
}
var codeA = '', codeB = '', num = [ '零', '一', '二', '三', '四', '五', '六', '七',
		'八', '九' ];
var obj = {};
var termId = '';
function wishList(data) {
	var htm = "";
	for ( var i = 0, len = data.length; i < len; i++) {
		var v = data[i];
		htm += '<tr>'
				+ '<td class="first">第'
				+ num[v.ASPIRATION_ORDER]
				+ '志愿选课</td>'
				+ '<td class="first">'
				+ v["COUNT(1)"]
				+ '</td>'
				+ '<td><input type="button" class="btn btn_gray" onclick="location.href=\'course_4_adjustment.html?a='
				+ codeA + '&b=' + codeB + '&z=' + v.ASPIRATION_ORDER + '&tm='
				+ termId + '&n=' + v["COUNT(1)"] + '\'" value="调整"/></td>'
				+ '</tr>';

	}
	$('#wish_tbody').html(htm);

}

// 查询系统状态
function getSysInfo(term) {
	$.getJSON(G_ROOT + 'volunteerdistribution/queryVolunteerDistributionState/'
			+ term, function(rs) {
		if (rs.returnCode == '000000') {
			if (rs.list.length > 0) {
				var v = rs.list[0], s = v.PROCESTATE, t = v.PICI;
				var termSpan = G_data['termset'][t];
				obj.code = t;
				obj.name = termSpan;
				termId = t;
				// $('#termId').html(termSpan);
			}
		}
	});
}
$(document)
		.ready(
				function() {
					cmb.term();
					// getSysInfo($('#form_term').val());

					termId = $('#form_term').val();
					var tid = getQuery('tid');
					if (tid) {
						termId = tid;
						$('#form_term').val(termId);
					}

					$('#form_term').change(function() {
						termId = $('#form_term').val();
					});

					$('#fenbu_expand').click(function(e) {
						$('#distributeBtn').click();
					});

					$('#distributeBtn')
							.click(
									function(e) {
										var box1 = document
												.getElementById("box1"), box2 = document
												.getElementById("box2");
										var dlA = box1
												.getElementsByTagName('dl'), dlB = box2
												.getElementsByTagName('dl');

										if (dlA && dlA.length > 0) {
											codeA = dlA[0].getAttribute('oid');
										}
										if (dlB && dlB.length > 0) {
											codeB = dlB[0].getAttribute('oid');
										}

										if (codeA && codeB) {
											$
													.getJSON(
															encodeURI(G_ROOT
																	+ 'studentchoosecourse/findzychoosecoursewishspread/'
																	+ codeA
																	+ "/"
																	+ codeB),
															function(rs) {
																if (rs.list) {
																	wishList(rs.list);
																}
															});
										}

									});

				});
