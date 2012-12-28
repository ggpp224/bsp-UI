/**
 * @author wl
 * @datetime 2012-4-25
 * @description course_bixiu.js
 */
 			 /******* 参数 ********/
			 var queryUrl = '';
//			 var coursenature=decodeURIComponent(getQuery('coursenature'));

//			 var choosetype=decodeURIComponent(getQuery('choosetype'));
//			 var termset=decodeURIComponent(getQuery('termset'));
var queryUrl = '';

var termset=decodeURIComponent(getQuery('termset'));		// 批次
var coursecode=decodeURIComponent(getQuery('COURSECODE'));	// 课程代码
var studentid=decodeURIComponent(getQuery('STUDENTID'));	// 学生ID
var currstatus = decodeURIComponent(getQuery('currstatus'));
var coursenature=decodeURIComponent(getQuery('coursenature'));
var coursenamestandard=decodeURIComponent(getQuery('coursenamestandard'));
var choosetype=decodeURIComponent(getQuery('choosetype'));

var url_top=G_ROOT+'choosecoursevolunte/statescoursevolunte/'+termset+'/C12000001';
var url_bottom=G_ROOT+'choosecoursevolunte/choosecoursebatch/'+studentid+'/'+coursecode+'/'+termset;
var url_status=G_ROOT+'choosecoursevolunte/statcoursevolunte/'+coursecode+'/'+studentid+'/'+termset+"/"+user['schoolCode'];

$(document).ready(function() {
	getDetail();
	getList(1);

});
/******** 函数定义 **********/
function getDetail(){
	// 详情
	$.getJSON(url_top,function(data){
		if(data){
			var html='',v=data['list'][0];
			html+='<fieldset><legend class="big">'+coursenamestandard+':<i>（'+(coursenature==1?"必修":"选修")+'课）</i></legend></fieldset>';
			html+='<dl class="search_dl_long"><dt>选课方式：</dt><dd>批量选课</dd></dl>';
			html+='<dl class="search_dl_long"><dt>结果通知时间：</dt><dd>'+v.FBSTARTT+'</dd></dl>';
			html = throwNull(html);
			$('#details').html(html);
		}
	});
}
function getList(page){
	page = (page && page>0)?page=page:page=Math.abs(page);

	// 表单数据
	$.getJSON(url_bottom,function(data){
		if(data){
			var html='',list = data.list,flag_yzz=0,classInfo=[];
			var status ='';
			$.each(list,function(k,v){
				html+='<tr id="'+(k+1)+'">';
				html+='<td>'+v.COURSENAME+'</td>';
				html+='<td>'+v.TEACHERS+'</td>';
				html+='<td>'+G_data['school'][v.SCHOOLCODE]+'</td>';
				html+='<td>'+v.SCORE+'</td>';
				html+='<td>'+v.MAXMINNUM+'</td>';
				html+='</tr>';
				html = throwNull(html);
				if(v.STATUS==3 || v.STATUS==1){
					flag_yzz=1;
					classInfo['code'] = v.COURSENAME;
					classInfo['courseName'] = v.TEACHERS;
					classInfo['school'] = G_data['school'][v.SCHOOLCODE];
				}
				status = G_data['currStatus'][v.STATUS];
			})
			//summary.tablehover();//Hover

			if(flag_yzz==1){
				var html_status ='';
					html_status	+=(currstatus=='已选'?'已选课':currstatus)+'<br />';
					html_status+= classInfo['code']+'&nbsp;'+classInfo['courseName']+'&nbsp;'+classInfo['school']+'<br />';
				$("#choose_status").html(html_status);
			}else{
				$('#choose_status').html(status);
				$('#form_status').empty();
			}

			$('#js_course_tbody').html(html);
			$('#pageShow').html(gPage(data.rCount,page,'getList'));
		}
	});
}


