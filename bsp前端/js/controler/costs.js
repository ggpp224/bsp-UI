/**
 * @author gp
 * @datetime 2012-5-5
 * @description 学生档案/学生查询
 */
  var queryUrl = '';

 var delUrl = G_ROOT+G_FormArr['planCourseDataDel'];//删除url
 var cmb = new ComboxOperate();
 function getList(page){
	page = (page && page>0)?page=page:page=Math.abs(page);
	var url=queryUrl;
	var url = queryUrl;
	var params = Ab.urlDecode(Ab.serializeForm('studentsearch_form'));
	for(var key in params){
		if(params[key] == ''|| params[key]=='null'){
			delete params[key];
		}
	}
	params['pageNo']=page;
	params['pageSize']=G_perpage;
		var str = Ab.encode(params);
		$.ajax({
			type: 'POST',
			data:str,
			dataType: 'json',
			url:url ,
			contentType:'application/json;charset=UTF-8',
			success: function(data) {
					var pageTotal=data.rCount;
					var data = data.list;
					if(data){
						var html='';
						$.each(data,function(k,v){

							html+='<tr>';
							html+='<td>'+v.COURSECODE+'</td>';
							html+='<td>'+v.COURSENAME+'</td>';
							html+='<td>'+v.COURSENAMESTANDARD+'</td>';
							html+='<td>'+v.SCHOOLCODE+'</td>';
							html+='<td>'+G_data['educationlevel'][v.EDUCATIONLEVELCODE]+'</td>';
							html+='<td>'+G_data['subject'][v.SUBJECTCODE]+'</td>';
							html+='<td>'+G_data['termset'][v.TERMID]+'</td>';
							html+='<td>'+v.COURSENATURE+'</td>';
							html+='<td>'+v.SCORE+'</td>';
							html+='</tr>';
						});
						$('#js_openable_tbody').html(html);
						$('#pageShow').html(gPage(pageTotal,page,'getList'));
					}
            }
		});


 }

 $(document).ready(function(){
 	//学校
 	cmb.school();

 	//层次
 	cmb.level();

 	// 学科
 	cmb.subject();

	// 互选批次组
	cmb.term();
	var setUrl = function(){
		$("#studentId").val(user['uid']);
		queryUrl = G_ROOT+G_FormArr['studentScore'];

	};
	//查询
	$("#form_query").click(function(e){
		setUrl();
		getList(1);
	});
	setUrl();
	getList(1);
 });