/**
 * @author gp
 * @datetime 2012-5-18
 * @description index_1.js
 */

/**
 * 分页及列表
 */
var queryUrl = '';
var delUrl = G_ROOT + 'term/termset/deletebatch';// 删除url

var pn = getQuery('pn') || 1;
function getList(page) {
	pn = page = (page && page > 0) ? page = page : page = Math.abs(page);
	var url = G_ROOT + queryUrl + page + '/' + G_perpage;
	$
			.getJSON(
					encodeURI(url),
					function(data) {
						var pageTotal = data.rCount;
						var data = data.list;
						if (data) {
							var html = '';
							$
									.each(
											data,
											function(k, v) {
												html += '<tr>';

												html += '<td class="first tc"><input ids="'
														+ v.ID
														+ '" type="checkbox" class="chkc" name="checkall" /> </td>';
												html += '<td><a  target="_blank" href="index_1_data.html?i='
														+ v.ID
														+ '&pn='
														+ pn
														+ '">'
														+ v.termName
														+ '</a></td>';
												html += '<td>' + v.termYear
														+ '</td>';
												html += '<td>' + v.orderNum
														+ '</td>';
												html += '<td>'
														+ v.termStartTime
														+ '</td>';
												html += '<td>' + v.termEndTime
														+ '</td>';
												html += '<td>' + v.createTime
														+ '</td>';
												html += '<td><i class="'
														+ (v.status == 1 ? 'color_gray">已启用'
																: 'color_red">已停用')
														+ '</i></td>';
												html += '<td code="'
														+ v.ID
														+ '" statu="'
														+ v.status
														+ '"><a target="_blank" href="index_1_update.html?i='
														+ v.ID
														+ '&pn='
														+ pn
														+ '">编辑</a>|<a href="#" class="statuBtn">'
														+ (v.status == 2 ? '启用'
																: '停用')
														+ '</a></td>';

												html += '</tr>';
											});
							html = throwNull(html);
							$('#js_openable_tbody').html(html);
							$('#pageShow').html(
									gPage(pageTotal, page, 'getList'));

							$('.statuBtn')
									.unbind('click')
									.bind(
											'click',
											function(e) {
												var me = this;
												var td = this.parentNode;
												var cCode = td
														.getAttribute("code"), statu = td
														.getAttribute("statu");
												if (statu == 1) {// 停用
													$
															.ajax({
																type : 'POST',
																data : Ab
																		.encode({
																			termsetId : cCode,
																			status : 2
																		}),
																dataType : 'json',
																url : G_ROOT
																		+ 'term/termset/modifystatus',
																contentType : 'application/json;charset=UTF-8',
																success : function(
																		rs) {
																	if (rs.returnCode == "000000") {
																		td
																				.setAttribute(
																						"statu",
																						"2");
																		me.innerHTML = "启用";
																		var tb = td.previousSibling;
																		tb.innerHTML = '<i class="color_red">已停用</i>';
																		msgBox
																				.show("批次已停用");
																	}
																}
															});

												} else {
													$
															.ajax({
																type : 'POST',
																data : Ab
																		.encode({
																			termsetId : cCode,
																			status : 1
																		}),
																dataType : 'json',
																url : G_ROOT
																		+ 'term/termset/modifystatus',
																contentType : 'application/json;charset=UTF-8',
																success : function(
																		rs) {
																	if (rs.returnCode == "000000") {
																		td
																				.setAttribute(
																						"statu",
																						"1");
																		me.innerHTML = "停用";
																		var tb = td.previousSibling;
																		tb.innerHTML = '<i class="color_gray">已启用</i>';
																		msgBox
																				.show("批次已启用");
																	}
																}
															});
												}

											});
						}
					});
}

$(document)
		.ready(
				function() {

					var yearDom = document.getElementById('year'), sortYear = document
							.getElementById('sortYear');
					for ( var i = 2012; i > 1890; i--) {
						yearDom.options.add(new Option(i, i));
						sortYear.options.add(new Option(i, i));
					}

					var setUrl = function() {
						var params = Ab.urlDecode(Ab
								.serializeForm('query_form'));
						queryUrl = 'term/termset/list/'
								+ (params.termName == '' ? 'null'
										: params.termName) + '/' + params.year
								+ '/' + params.statu + '/'
								+ AmBow_CK.getcookie('cst').split('/')[0] + "/";
					};
					// 查询
					$("#queryBtn").click(function(e) {
						setUrl();
						getList(1);
					});

					// 新增
					$("#addBtn")
							.click(
									function(e) {
										var school = document
												.getElementById("form_school");
										location.href = "course_add.html?c="
												+ school.value
												+ "&n="
												+ encodeURI(school.options[school.selectedIndex].text);
									});

					// 删除
					$("#delBtn").click(function(e) {
						var ids = getIds('js_openable_tbody');
						if (ids.length == 0) {
							alert('请选择要删除的记录');
							return;
						}
						e.preventDefault();
						$.fn.nyroModalManual({
							width : 400,
							title : "系统提示",
							url : 'overlay_delete.html'
						});

					});

					var renderSortList = function() {
						var val = $('#sortYear').val();
						$
								.getJSON(
										G_ROOT
												+ 'term/termset/sort/list/'
												+ val
												+ '/'
												+ AmBow_CK.getcookie("cst")
														.split('/')[0],
										function(rs) {
											var data = rs.list;
											var htm1 = '', htm2 = '';
											for ( var i = 0, len = data.length; i < len; i++) {
												var v = data[i];
												htm1 += '<tr><td class="first">'
														+ (i + 1)
														+ '</td></tr>';
												htm2 += '<tr code="' + v.id
														+ '"><td>' + v.termName
														+ '</td></tr>';
											}

											$('#tbody_serial').html(htm1);
											$('#tbody_content').html(htm2);
											summary.tablehover({
												serial : true
											});

										});
					};

					$('#sortYear').change(function(e) {
						renderSortList();
					});

					// 开始排序
					$("#beginSortBtn").click(function(e) {
						// tbody_serial tbody_content sortYear
						renderSortList();
					});

					// 保存排序
					$("#saveSortBtn").click(function(e) {
						var trs = $('#tbody_content').find('tr');
						var list = [];
						if (trs.length > 0) {
							for ( var i = 0, len = trs.length; i < len; i++) {
								var tr = $(trs[i]);
								var obj = {
									orderNum : i + 1,
									termsetId : tr.attr('code')
								};
								list.push(obj);
							}
						}
						var str = Ab.encode(list);
						$.ajax({
							type : 'POST',
							data : str,
							dataType : 'json',
							url : G_ROOT + 'term/termset/sort/save',
							contentType : 'application/json;charset=UTF-8',
							success : function(rs) {
								if (rs.returnCode = '000000') {
									getList(1);
									msgBox.show("排序保存成功");
								}
							}
						});

					});

					tableCheckAll('js_openable_tbody');

					setUrl();
					getList(pn);

				});