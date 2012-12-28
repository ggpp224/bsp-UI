var params = {};

// 列表
// var
// queryUrl='course/planocstudent/list/{termid}/{coursecode}/{coursename}/{pageno}/{pagesize}/';
var queryUrl = '';
var cmb = new ComboxOperate();
$(function() {
	// 互选批次组：下拉菜单
	/*var html = '';
	for ( var i in G_data['termset']) {
		html+='<option value="'+i+'">'+G_data['termset'][i]+'</option>';
	}
	$('#form_termid').html(html);*/
	cmb.term();
	// 开始查询
	$("#form_query").click(function() {
		params = Ab.urlDecode(Ab.serializeForm('term_form'));
		params['chooseExplanation'] = '';
		queryUrl = G_ROOT+G_FormArr['planocCourseList']+'/'+params.form_term+'/'+(params.form_coursecode == '' ? 'null': params.form_coursecode)+"/"+(params.form_coursename == '' ?'null':params.form_coursename) +"/";
		queryUrl = encodeURI(queryUrl);
		getList(1);
	});
	$("#form_query").click();
});

function getList(page) {
	page = (page && page > 0) ? page = page : page = Math.abs(page);
	var url = queryUrl+page+'/'+G_perpage;
	$.getJSON(url,function(data) {
		//var data = {"returnCode":"000000","list":[{"TOTALPLAN":1500,"TERM_ID":"8a8a86d637c149e20137c18cdf810000","STUDENTCHOOSE":"不限","NAME":"高等数学","ID":"C1CE22B1910292ECE040007F0100082E","BATCHQUOTA":"不限","MINMAX":"0/1200","CHOOSE_TYPE":"1","COURSE_CODE_STANDARD":"B12010001","NUM":1},{"TOTALPLAN":1500,"TERM_ID":"8a8a86d637c149e20137c18cdf810000","STUDENTCHOOSE":"不限","NAME":"教育心理学","ID":"C1CE22B1910592ECE040007F0100082E","BATCHQUOTA":"不限","MINMAX":"0/1600","CHOOSE_TYPE":"2","COURSE_CODE_STANDARD":"B12010002","NUM":2},{"TOTALPLAN":1500,"TERM_ID":"8a8a86d637c149e20137c18cdf810000","STUDENTCHOOSE":"不限","NAME":"C语言","ID":"C1CE22B1910392ECE040007F0100082E","BATCHQUOTA":"不限","MINMAX":"0/1500","CHOOSE_TYPE":"2","COURSE_CODE_STANDARD":"B12010003","NUM":3},{"TOTALPLAN":1500,"TERM_ID":"8a8a86d637c149e20137c18cdf810000","STUDENTCHOOSE":"不限","NAME":"计算机基础","ID":"C1CE22B1910492ECE040007F0100082E","BATCHQUOTA":"不限","MINMAX":"0/1500","CHOOSE_TYPE":"2","COURSE_CODE_STANDARD":"B12010004","NUM":4}],"rCount":4,"entity":null};
		var list = data.list;
		//list = [{id:'adfssdwee',termName:'批次一',courseStandardName:'大学语言',minMax:'30/200',amount:500,quota:200,personNum:30,type:'实时选课'}];
		if (list){
			var html = '';
			$.each(list,function(k, v) {
				var max = parseInt((v.MINMAX.split("/"))[1] || 0);
				var amount = v.TOTALPLAN; //计划选课总人数
				var amount_htm='<td><a  class="dt" href="#" onclick="win.ajastPopData({id:\''+v.ID+'\',dom:this})">'+amount+'</a></td>';
				if(amount>max){
					amount_htm = '<td style="color:red;" ><a  class="dt" href="#" onclick="win.ajastPopData({id:\''+v.ID+'\',dom:this})">'+amount+'</a></td>';
				}
				var type_htm='';
				if(v.CHOOSE_TYPE==1){
					type_htm="实时选课";
				}else{
					type_htm="志愿选课";
				}


				//最大人数
				/*v.maxNum=parseInt((v.TOTAL.split("/"))[1] || 0);

				html+='<tr id="del'+v.ID+'">';
				html+='<td class="first tc"><input class="chk" type="checkbox" name="checkall" value="'+v.ID+'" /> </td>';
				html+='<td>'+v.NAME+'</td>';
				html+='<td>'+G_data['termset'][v.TERM_ID]+'</td>';
				html+='<td class="chooseType">'+(v.CHOOSE_TYPE == 1 ? '实时选课': '志愿选课')+'</td>';
				html+='<td>'+v.TOTAL+'</td>';
				html+='<td><i class="'+(v.CSTUDENT_ID>v.maxNum?'color_red':'color_green')+'">'+v.CSTUDENT_ID+'</i></td>';
				html+='<td>'+v.SELECT_STARTTIME+'</td>';
				html+='<td>'+v.SELECT_ENDTIME+'</td>';
				html+='<td>'+v.NOTICE_TIME+'</td>';
				html+='<td class="chooseBtn">'+(v.CHOOSE_TYPE==1?'<input type="button" class="btn btn_gray" value="志愿选课" name="'+v.COURSE_CODE_STANDARD+'" />':'<input type="button" class="btn btn_red" value="实时选课" name="'+v.COURSE_CODE_STANDARD+'" />')+'</td>';
				html+='<tr>';*/
				html+='<tr id="del'+v.ID+'">';
				html+='<td class="first tc"><input class="chk" type="checkbox" name="checkall" value="'+v.ID+'" /> </td>';
				html+='<td>'+G_data['termset'][v.TERM_ID]+'</td>';
				html+='<td cscode="'+v.COURSE_CODE_STANDARD+'" termid="'+v.TERM_ID+'" class="dt">'+v.NAME+'</td>';
				html+='<td><a href="#" class="overlay_course_search_view dt" coursecode="'+v.COURSE_CODE_STANDARD+'"   class="dt">'+v.MINMAX+'</a></td>';//三个标签页
				html+=amount_htm;
				//html+='<td><a href="#" onclick="win.ajastPopData({id:\''+v.ID+'\',dom:this})">'+v.BATCHQUOTA+'</a></td>';
				html+='<td>'+v.BATCHQUOTA+'</td>';
				html+='<td><a href="#" onclick="win.ajastPop({id:\''+v.ID+'\',dom:this})">设置</a></td>';
				html+='<td>'+v.STUDENTCHOOSE+'</td>';
				html+='<td class="chooseBtn"><a  name="'+v.COURSE_CODE_STANDARD+'" href="#">'+type_htm+'</a></td>';
				html+='</tr>';

				html = throwNull(html);
			});
			$('#checkboxall').attr('checked', false);
			$('#openable_tbody_list').html(html);
			$('#pageShow').html(
			gPage(data.rCount, page, 'getList'));
		}
		$('.chooseBtn a').unbind().live('click',function() {
			$.getJSON(G_ROOT+'course/planocstandard/info/'+$('#form_term').val()+'/'+$(this).attr('name'),function(data){
				if(data){
					$.fn.nyroModalManual({
						width : 800,
						title : "修改选课形式",
						content : pop_single(data.entity)
					});
				}
			});
		});
	});
}
//人数上下线详情
$('.overlay_course_search_view').live('click',function(){
	$.fn.nyroModalManual({
		width:800,
		title:"总座位数/下限",
		content:show_content()
	});

	var query = "courseattribute/findCourseCode/list/";
	var termId  = $('#form_term').val();
	var courseCode = $(this).attr('coursecode');
	var url = G_ROOT + query + termId+"/"+courseCode;
	//var url = G_ROOT + query + "8a8a8cca37de930c0137de95ee210000/C00001";
	$.getJSON(url,function(data){
		var list = data.list;
		if(list){
			var html = '';
			$.each(list,function(k,v){
				html+='<tr>';
	            html+='<td><a href="course_open_data.html?c='+v.coursecode+'&t='+termId+'" target="_blank">'+v.coursename+'</a></td>';
	            html+='<td>'+v.teachers+'</td>';
	            html+='<td>'+G_data['school'][v.schoolcode]+'</td>';
	            html+='<td>'+v.maxminnum+'</td>';
	            //html+='<td>'+v.price+'</td>';
	            html+='</tr>';
			});
			$('#openable_tbody_course_view').html(html);
		}
	});
});


function show_content(){
	var html = '';
	html+='<div class="overlay">';
 	html+='<form id="sampleform" method="post" action="#">';
 	html+='<table class="tablebox">';
 	html+='<thead class="table_header">';
 	html+='<tr>';
 	html+='<th>课程名称</th>';
 	html+='<th>任课教师</th>';
 	html+='<th>授课学校</th>';
 	html+='<th>人数下限/上限</th>';
 	//html+='<th>课程费用</th>';
 	html+='</tr>';
 	html+='</thead>';
 	html+='<tbody class="openable_tbody" id="openable_tbody_course_view">';
    html+='</tbody>';
    html+='</table>';
    html+='<div class="overlay_btn">';
    html+='<input type="button" class="btn btn_gray overlayClose" value="关闭"/>';
    html+='</div>';
    html+='</form>';
    html+='</div>';
	return html;
}
// 修改弹出层
function pop_single(opt) {
	var html = '<form method="post" action="" id="edit_form" name="edit_form"><div class="clearfix">';
	html+='<div class="column width3 first"><input type="hidden" name="id" value="'+opt['ID']+'" />';
	html+='<p><label class="labeltitle">课程名称：</label><input type="text" id="edit_NAME" class="half" disabled="disabled" value="'+opt['NAME']+'"  /></p>';
	html+='<p><label class="labeltitle">互选批次组：</label><input type="text" id="edit_TERM_ID" class="half" disabled="disabled" value="'+G_data['termset'][opt['TERM_ID']]+'"  /></p>';
	html+='<p><label class="labeltitle">选课方式：</label><select iclass="half" name="chooseType" id="edit_CHOOSE_TYPE">';
		for ( var i in G_data['chooseType']) {
			if (i == '1' || i == '2') html+='<option value="'+i+'"'+(i==opt['CHOOSE_TYPE']?' selected':'')+'>'+G_data['chooseType'][i]+'</option>';
		}
	html+='</select></p>';
	html+='</div>';
	html+='<div class="column width3">';
	html+='<p><label class="labeltitle">课程代码：</label><input type="text" id="edit_COURSE_CODE_STANDARD" name="edit_COURSE_CODE_STANDARD" class="half " disabled="disabled" value="'+opt['COURSE_CODE_STANDARD']+'"  /></p>';
	html+='<p>&nbsp;</p>';
	html+='</div>';
	html+='</div>';
	html+='<p><label class="labeltitle">选课说明：</label><textarea id="edit_CHOOSE_EXPLANATION" class="small" cols="77" name="chooseExplanation">'+opt['CHOOSE_EXPLANATION']+'</textarea></p>';
	html+='<p>&nbsp;</p>';
	html+='<div class="overlay_btn">';
	html+='<input type="button" class="btn btn_green overlayClose" onclick="subm_single()" value="确认修改"/>';
	html+='<input type="button" class="btn btn_gray overlayClose" value="返回"/>';
	html+='</div></form>';
	html = throwNull(html);
	return html;

}
function subm_single() {
	// /planocstandard/update
	var params = Ab.urlDecode(Ab.serializeForm('edit_form'));
	courseCode = params.CourseCodeStandard;
	var str = Ab.encode(params);
	var newBtn = '', ID = params.id, NewChooseType = params.chooseType;
	$.ajax({
		type : 'POST',
		data : str,
		dataType : 'json',
		url : G_ROOT+'course/planocstandard/update?termId='+$('#form_term').val(),
		contentType : 'application/json;charset=UTF-8',
		success : function(rs){
			if (rs.returnCode == '000000') {
				var newBtn = '', ID = params.id, NewChooseType = params.chooseType;
				// 1 实时选课 2志愿

				//html+='<td class="chooseBtn"><a  name="'+v.COURSE_CODE_STANDARD+'" href="#">'+type_htm+'</a></td>';
				newBtn = NewChooseType == 1 ? "实时选课":"志愿选课";
				//$('#del'+ID).find('.chooseType').text(NewChooseType == 1 ? '实时选课' : '志愿选课');
				$('#del'+ID).find('.chooseBtn').find('a').html(newBtn);
			} else {
				alert('失败。');
			}
		}
	});
}

function pop_batch() {

	var html = '<div class="clearfix">';
	html+='<div class="column full">';
	html+='<p><label class="labeltitle">选课方式：</label><select iclass="half" id="batch_chooseType">';
	for ( var i in G_data['chooseType']) {
		if (i == '1' || i == '2') html+='<option value="'+i+'">'+G_data['chooseType'][i]+'</option>';
	}
	html+='</select></p>';
	html+='<p><label class="labeltitle">选课说明：</label><textarea id="batch_chooseExplanation" class="small" cols="37" name="chooseExplanation"></textarea></p>';
	html+='</div>';
	html+='</div>';
	html+='<div class="overlay_btn">';
	html+='<input type="button" class="btn btn_green overlayClose" onclick="batchEdit()" value="确认修改"/>';
	html+='<input type="button" class="btn btn_gray overlayClose" value="返回"/>';
	html+='</div>';
	html = throwNull(html);
	return html;
}
function batchEdit() {
	var ids = [];
	$('#openable_tbody_list').find('.chk').each(function() {
		if (this.checked == true)
			ids.push(this.value);
	});
	var NewChooseType = $('#batch_chooseType').val();
	var chooseExplanation = $('#batch_chooseExplanation').val();
	var param = {
		idList : ids,
		chooseType : NewChooseType,
		chooseExplanation : chooseExplanation
	};

	if (ids.length > 0) {
		var str = Ab.encode(param);
		$.ajax({
			type : 'POST',
			data : str,
			dataType : 'json',
			url : G_ROOT+'course/planocstandard/updatechoosetype?termId='+$('#form_term').val(),
			contentType : 'application/json;charset=UTF-8',
			success : function(rs) {
				if (rs.returnCode == '000000') {
					getList(G_currPage);
				} else {
					alert('失败。');
				}
			}
		});
	}
}

function changeType(ID, NewChooseType) {
	var ids = [];
	ids.push(ID);

	var param = {
		idList : ids,
		chooseType : NewChooseType
	};
	var str = Ab.encode(param);
	$.ajax({
		type : 'POST',
		data : str,
		dataType : 'json',
		url : G_ROOT+'course/planocstandard/updatechoosetype?termId='+$('#form_term').val(),
		contentType : 'application/json;charset=UTF-8',
		success : function(rs) {
			if (rs.returnCode == '000000') {
				// 1 实时选课 2志愿
				/*newBtn = NewChooseType == 1 ? '<input type="button" class="btn btn_gray" value="志愿选课" onclick="changeType(\''+ID+'\',2)"/>': '<input type="button" class="btn btn_red" value="实时选课" onclick="changeType(\''+ID+'\',1)"/>';
				$('#del'+ID).find('.chooseType').text(NewChooseType == 1 ? '实时选课' : '志愿选课');
				$('#del'+ID).find('.chooseBtn').html(newBtn);*/
				newBtn = NewChooseType == 1 ? "实时选课":"志愿选课";
				//$('#del'+ID).find('.chooseType').text(NewChooseType == 1 ? '实时选课' : '志愿选课');
				$('#del'+ID).find('.chooseBtn').find('a').html(newBtn);

			} else {
				alert('失败。');
			}
		}
	});
}

var win = {
	obj : {},
	Pop:function(url){
		$.fn.nyroModalManual({
			width:700,
			title:"调整批量配额",
			url: url||'overlay_setting.html'
		});
	},
	ajastPop:function(opt){
		var tds = $(opt.dom).parent().parent().find('.dt');
		var td0 = $(tds[0]);
		this.obj = {code:tds[0].innerHTML,minMax:tds[1].innerHTML,planNum:tds[2].innerHTML,cscode:td0.attr('cscode'),termid:td0.attr('termid')};
		this.Pop();
	},
	ajastPopData:function(opt){
		var tds = $(opt.dom).parent().parent().find('.dt');
		var td0 = $(tds[0]);
		this.obj = {code:tds[0].innerHTML,minMax:tds[1].innerHTML,planNum:tds[2].innerHTML,cscode:td0.attr('cscode'),termid:td0.attr('termid')};
		this.Pop('overlay_setting_data.html');
	}
}