/**
 * @author wl
 * @datetime 2012-4-25
 * @description index.js
 */
var queryUrl = '';

var currPage = getQuery('page');
currPage = currPage || 1;

var stuId = user['uid'];
$(function() {

	$.ajax({
		type : 'POST',
		data : Ab.encode({
			userId : stuId,
			schoolCode : user['schoolCode']
		}),
		dataType : 'json',
		url : G_ROOT + 'loguseruse/create',
		contentType : 'application/json;charset=UTF-8',
		success : function(result) {
		}
	});
	window.onload = function() {
		search();
	};

	$('#form_termset').change(function() {
		search();
	});
	$('#chooseType').change(function() {
		search();
	});

})

function search() {
	var params = Ab.urlDecode(Ab.serializeForm('term_form'));
	// queryUrl = (params.termId==''?'null':params.termId)+'/'
	// alert(params.chooseType);
	queryUrl = stuId + '/null/null/null/' + params.termId + '/'
			+ (params.chooseType == "全部" ? "null" : params.chooseType); // 22
																		// 24\
	getList(1);
}

function getList(page) {
	page = (page && page > 0) ? page = page : page = Math.abs(page);
	var url = G_ROOT + 'studentchoosecourse/querystudentchoosecourse/'
			+ queryUrl;

	$.getJSON(url, function(data) {
		if (data) {
			var html = '', list = data.list;
			var termset = $("#form_termset").attr("checked", "checked").val();
			// alert(termset);
			$.each(list, function(k, v) {
				var tmp = '';
				// 选课方式 CHOOSETYPE '0':'全部','1':'实时选课','2':'志愿选课','3':'批量'
				// 课程性质 COURSENATURE '1':'必修','2':'选修'
				if (v.CHOOSETYPE == 1 && v.COURSENATURE == 1)
					tmp = 'course_bixiu.html';
				else if (v.CHOOSETYPE == 2)
					tmp = 'course_zhiyuan.html';
				else if (v.CHOOSETYPE == 1 && v.COURSENATURE == 2)
					tmp = 'course_bixiu.html';
				else
					tmp = 'course_piliang.html';
				html += '<tr>';
				html += '<td><a href="' + tmp + '?coursenature='
						+ encodeURIComponent(v.COURSENATURE)
						+ '&coursenamestandard='
						+ encodeURIComponent(v.COURSENAMESTANDARD)
						+ '&choosetype=' + v.CHOOSETYPE + '&termset='
						+ encodeURIComponent(termset) + '&COURSECODE='
						+ v.COURSECODESTANDARD + '&STUDENTID=' + v.STUDENTID
						+ '&currstatus=' + v.STATUS + '">'
						+ v.COURSENAMESTANDARD + '</a></td>';
				html += '<td>' + (v.COURSENATURE == 1 ? "必修" : "选修") + '</td>';
				html += '<td>' + G_data['chooseType'][v.CHOOSETYPE] + '</td>';

				var status = v.STATUS;
				var colorCode;
				if (status == '成功') {
					colorCode = 'green';
				} else if (status == '未成功') {
					colorCode = 'red';
				} else if (status == '已过期' || status == '公示中') {
					colorCode = '#000';
				} else if (status == '已选') {
					colorCode = 'blue';
				} else if (status == '待选') {
					colorCode = '#f60';
				}

				html += '<td style="color:' + colorCode + '">' + v.STATUS
						+ '</td>';

				html += '<td>' + v.SELECTSTARTTIME + '</td>';
				html += '<td>' + v.SELECTENDTIME + '</td>';
				html += '</tr>';
			});
			html = throwNull(html);
			$('#js_course_tbody').html(html);
			$('#pageShow').html(gPage(data.rCount, page, 'getList'));
		}
	});
}
