/**
 * @author gp
 * @datetime 2012-5-7
 * @description 学分银行 → 管理员查询
 */

 var queryUrl = '';

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
							html+='<td><a href="#" onclick="win_major({code:\''+v.COURSECODESTANDARD+'\',id:\''+v.TERMID+'\'})">'+v.COURSENAMESTANDARD+'</a></td>';
							html+='<td>'+G_data['school'][v.SCHOOLCODE]+'</td>';
							html+='<td>'+G_data['educationlevel'][v.EDUCATIONLEVELCODE]+'</td>';
							html+='<td>'+G_data['subject'][v.SUBJECTCODE]+'</td>';
							html+='<td>'+G_data['termset'][v.TERMID]+'</td>';
							html+='<td>'+(v.COURSENATURE==1?'必修课':'选修课')+'</td>';
							html+='<td>'+v.SCORE+'</td>';
							html+='</tr>';
						});
						html = throwNull(html);
						$('#js_openable_tbody').html(html);
						$('#pageShow').html(gPage(pageTotal,page,'getList'));
					}
            }
		});


 }
 $(document).ready(function(){
 	// 互选批次组
	//cmb.term({noThree:true});
	var Opt_termset='';
	var data=G_data['termsetAll']['2'];
	for(var i in data){
		Opt_termset+='<option value="'+i+'">'+G_data['termset'][i]+'</option>';
	}
	$('#form_term').html(Opt_termset);
	$('#form_term').prepend('<option value="null">全部</option>');
	$('#form_term').get(0).selectedIndex=0;
 	// 学校和专业
 	cmb.shoolAndMajor();

	// 层次和年级
 	cmb.levelAndGrade();

	// 学科
 	cmb.subject();

	//授课学校
 	cmb.school({id:'course_school'});

 	cmb.level({id:'course_level'});

	//查询
	$("#form_query").click(function(e){
		queryUrl = G_ROOT+G_FormArr['studentScore'];
		getList(1);
	});

	$("#resetBtn").click(function(e){
		 setTimeout(function(){
		 	new ComboxOperate().fillDefaultSchool();
		 },200);
	});


 });