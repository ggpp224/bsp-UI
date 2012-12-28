/**
 * @author wl
 * @datetime 2012-4-25
 * @description course_2_detail.js
 */
 var queryUrl = '';



 var currPage=getQuery('page');
 currPage = currPage || 1;
var termid=decodeURIComponent(getQuery('termId'));
var bachId = decodeURIComponent(getQuery('ID'));

function getList(page){
	var params = Ab.urlDecode(Ab.serializeForm('batch_form'));
	page = (page && page>0)?page=page:page=Math.abs(page);
	queryUrl = (params.stuId==""?"null":params.stuId)+'/'+(params.stuName==""?"null":params.stuName)+'/'+(params.courseCode==""?"null":params.courseCode)+'/'+(params.courseName==""?"null":params.courseName)+'/'+bachId;
	queryUrl = encodeURI(queryUrl);
	var url=G_ROOT+'studentrobcourse/findbatchchoosecoursedetail/'+queryUrl+'/'+page+'/'+G_perpage;
	$.getJSON(url,function(data){
		var list = data.list;
		if(list){
			var html='';
			$.each(list,function(k,v){

				html+='<tr>';
				html+=' <td class="first tc"><input type="checkbox" name="checkall" /></td>';
				html+='<td>'+v.STUDENTID+'</td>';
				html+='<td>'+v.STUDENTNAME+'</td>';
				html+='<td>'+v.COURSECODE+'</td>';
				html+='<td>'+v.COURSENAME+'</td>';
				html+='<td>'+v.COURSENAMESTANDARD+'</td>';
				html+='<td>'+v.TEACHERS+'</td>';
				html+='<td>'+G_data['school'][v.SCHOOLCODE]+'</td>';
				html+='<td>'+G_data['educationlevel'][v.LEVELCODE]+'</td>';
				html+='<td>'+v.SCORE+'</td>';
				//html+='<td>'+v.PRICE+'</td>';
				html+='</tr>';
			})
			$('#js_course_tbody').html(html);
			$('#pageShow').html(gPage(data.rCount,page,'getList'));
		}
	});
 }


$(document).ready(function() {

	$("#form_query").click(function(e){
		getList(1);
	});
	$("#form_query").click();








});