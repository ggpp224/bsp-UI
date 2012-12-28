/**
 * @author gp
 * @datetime 2012-5-5
 * @description 志愿选课查询调整 → 调整
 */
var recA = {}, recB = {}, a = '', b = '';
var tm = getQuery('tm');
function courseList(data) {
	var htm = "";
	for ( var i = 0, len = data.length; i < len; i++) {
		var v = data[i];
		if (v['OPENID'] == a) {
			recA = v;
		} else if (v['OPENID'] == b) {
			recB = v;
		}
		htm += '<tr>' + '<td class="first tc">' + v.COURSECODE + '</td>'
				+ '<td>' + v.COURSENAME + '</td>' + '<td>'
				+ G_data['school'][v.SCHOOLCODE] + '</td>' + '<td>'
				+ v.TEACHERS + '</td>' + '<td>' + v.MAXMINNUM + '</td>'
				+ '<td>' + v.CURRENTNUM + '</td>' + '<td><i class="'
				+ (v.BIAOZHI == '可开课' ? 'color_green' : 'color_red') + '">'
				+ v.BIAOZHI + '</i></td>' +

				'</tr>';
	}
	htm = throwNull(htm);
	$('#allItems').html(htm);
}

function studentList(data) {
	var htm = "";
	for ( var i = 0, len = data.length; i < len; i++) {
		var v = data[i];
		htm += '<tr>' + '<td class="first tc"><input type="checkbox" ids="'
				+ v.STUDENTID + '"/> </td>' + '<td>' + v.STUDENTID + '</td>'
				+ '<td>' + v.NAME + '</td>' + '</tr>';
	}
	$('#students_tbody').html(htm);
}

var bMax = 0;
var obj = G_data['currentTerm'];
termId = obj.code;
$(document)
		.ready(
				function() {
					a = getQuery('a');
					b = getQuery('b');
					c = getQuery('z'), n = getQuery('n');
					$('#numLimit').html('（1~' + n + '）');
					$('#table_content').css('display', 'none');
					$('#table_content').css('display', 'none');
					var num = [ '零', '一', '二', '三', '四', '五', '六', '七', '八',
							'九' ];
					document.getElementById('zhiYuan').options.add(new Option(
							'第' + num[parseInt(c)] + '志愿选课', c));
					// $('#zhiYuan').val()
					$.getJSON(encodeURI(G_ROOT
							+ 'volunteerdistribution/findzychoosecourse/' + a
							+ "/" + b), function(rs) {
						if (rs.list) {
							courseList(rs.list);
							$('#lgName').html(recA.COURSENAMESTANDARD);
							$('#courseAName').val(recA.COURSENAME);
							$('#courseBName').val(recB.COURSENAME);
							var max = recB.MAXMINNUM;
							if (max) {
								var t = max.split('/');
								try {
									bMax = parseInt(t[1])
											- parseInt(recB.CURRENTNUM);
									n = Math.min(n, bMax);
									if (n > 0) {
										$('#numLimit').html('（1~' + n + '）');
									} else {
										$('#personNum').css('disabled', true);
										$('#numLimit').html('不可调整');
									}

								} catch (e) {
								}
							}
						}
					});

					var ids = [], type = 1;

					$('#dateformat2')
							.change(
									function(e) {
										type = 2;
										ids = [];
										$('#personNum').val(0);
										$('#numPerson').css('display', 'none');
										$('#table_content').css('display', '');
										$
												.getJSON(
														encodeURI(G_ROOT
																+ 'studentchoosecourse/findzychoosecoursefreechoose/'
																+ a + "/" + b
																+ "/" + c),
														function(rs) {
															$('#ct_totals')
																	.html(
																			rs.rCount);
															$('#ct_choose')
																	.html(0);
															if (rs.list) {
																studentList(rs.list);
															}
														});
									});
					$('#dateformat1').change(function(e) {
						type = 1;
						ids = [];
						$('#personNum').val(0);
						$('#numPerson').css('display', '');
						$('#table_content').css('display', 'none');
					});

					var getLen = function(idss) {
						ids = []
						var tb = document.getElementById('students_tbody');
						var cs = tb.getElementsByTagName('input');
						var leng = 0;
						for ( var i = 0, len = cs.length; i < len; i++) {
							var c = cs[i];
							if (c.type == "checkbox" && c.checked) {
								leng++;
								if (idss) {
									ids.push(c.getAttribute('ids'));
								}
							}
						}
						return leng;
					};

					$('#table_body').click(function(e) {
						var target = e.target;
						if (target.type == 'checkbox') {
							var n = getLen();
							$('#personNum').val(n);
							$('#ct_choose').html(n);
						}
					});

					// 保存
					$('#saveBtn')
							.click(
									function(e) {
										var num = parseInt($('#personNum')
												.val());
										if (num < 1 || num > n || isNaN(num)) {
											if (n < 1) {
												mAlert('不可调整');
											} else {
												mAlert("调整人数应该在1到" + n + "之间");
											}
											return;
										}
										getLen(ids);
										var params = {
											openCourseIdA : a,
											openCourseIdB : b,
											aspirationOrder : c,
											type : type.toString(),
											number : num,
											idList : ids,
											termId : tm
										};
										if (type == 1) {
											delete params['idList'];
										}

										var str = Ab.encode(params);
										$
												.ajax({
													type : 'POST',
													data : str,
													dataType : 'json',
													url : G_ROOT
															+ 'studentchoosecourse/updatezychoosecourseadjust?termId='
															+ tm,
													contentType : 'application/json;charset=UTF-8',
													success : function(rs) {
														if (rs.returnCode == '000000') {
															location.href = "course_4.html";
														} else {
															alert('操作失败');
														}

													}
												});
									});

				});
