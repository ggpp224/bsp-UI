// 保存搜索条件

// 学生查询
var searchParams={};
var study_chk=(function(){
	var fromElem='openable_tbody_study',toElem='openable_tbody_study_chked';
	var it={},rCount=0,perpage2=5,params,currPage2=1;
		it.fromElem=fromElem;
		it.toElem=toElem;

	//初始化
	it.init=function(){
		//插入一个记录搜索每件的日志
		$('#form_query_1').before('<input type="hidden" id="'+fromElem+'Log" />');
		// 绑定查询事件
		$('#form_query_1').click(function(e) {
			params = Ab.urlDecode(Ab.serializeForm('form_study'));
			//记录查询条件，用于保存时使用
			searchParams['study']=params;

			if(params.form_school=='' || params.form_school=='null'){
				mAlert('请选择学校');
				return false;
			}
			if(params.form_major=='' || params.form_major=='null'){
				mAlert('请选择专业');
				return false;
			}
			if(params.form_educationlevel=='' || params.form_educationlevel=='null'){
				mAlert('请选择层次');
				return false;
			}
			if(params.form_grade=='' || params.form_grade=='null'){
				mAlert('请选择年级');
				return false;
			}
			if(params.form_stuType=='' || params.form_stuType=='null'){
				mAlert('请选择学生类型');
				return false;
			}
			var str=Ab.encode(params);
			if($('#'+fromElem+'Log').val()!=str){
				$('#'+fromElem+'Log').val(str);
				// 清空旧搜索结果
				$('#'+toElem).empty();
			}

			var str=Ab.encode(params);
			if($('#'+fromElem+'Log').val()!=str){
				$('#'+fromElem+'Log').val(str);
				// 清空旧搜索结果
				$('#'+toElem).empty();
			}
			e.preventDefault();
			$.fn.nyroModalManual({
				width:600,
				height:360,
				title:"添加学生",
				content:it.pop()
			});
			//载入查询结果列表
			it.getList(1);
		});

		// 绑定全选功能
		$('#'+toElem+'CheckAll').unbind().bind('click',function(){
			it.checkAll2(this);
			//it.checkedCount();
		});
		// 绑定删除button
		it.popDel();
	};
	it.pop=function(){
		var html='<table id="js_tablebox_study" class="tablebox"></table>';
			html+='<div id="pop_pageShow_study"></div>';
			html+='<div class="overlay_btn">';
			html+='<input type="button" class="btn btn_green overlayClose" onclick="study_chk.subm()" value="确定选择"/>';
			html+='<input type="button" class="btn btn_gray overlayClose" value="关闭" />';
			html+='</div>';
		return html;
	};
	it.getList=function(page){
		page = (page && page>0)?page=page:page=Math.abs(page);
		var html='<thead id="js_thead_study'+page+'" class="table_header js_thead_study">';
			html+='<tr>';
			html+='<th class="first tc" width="4%"><input type="checkbox" name="checkall" onclick="checkAll(this,\'chk_study_'+page+'\')"/></th>';
			html+='<th>学生ID</th>';
			html+='<th>学生姓名</th>';
			html+='</tr>';
			html+='</thead>';
			html+='<tbody id="js_tbody_study'+page+'" class="openable_tbody js_tbody_study">';

		if($('#js_thead_study'+page).length>0){
			$('.js_thead_study,.js_tbody_study').hide();
			$('#js_thead_study'+page).show();
			$('#js_tbody_study'+page).show();
			$('#pop_pageShow_study').html(gPage(rCount,page,'study_chk.getList'));

		}else{
			var queryUrl = G_FormArr['chooseStudent'];
			var	queryTest =(params.form_school==''?'null':params.form_school)
						+"/"+(params.form_major==''?'null':params.form_major)+'/'
						+(params.form_educationlevel==''?'null':params.form_educationlevel)
						+"/"+(params.form_grade==''?'null':params.form_grade)+'/'
						+(params.form_stuType==''?'null':params.form_stuType)+'/'
						+(params.form_studentid==''?'null':params.form_studentid)+'/'
						+(params.form_studentname==''?'null':params.form_studentname)
					;
			//var queryTest ='null/null/null/null/null';
			$.getJSON(G_ROOT+queryUrl+encodeURI(queryTest)+"/"+page+'/'+G_perpage_pop+'/',function(data){
				rCount=data.rCount;	// 记录总数，方便分页时使用
				$.each(data.list,function(k,v){
					if($('#'+toElem+' .mid'+v.ID).length>0) check='checked';
					html+='<tr class="atPage'+page+' mid'+v.ID+'">';
					html+='<td class="first tc"><input type="checkbox" name="checkall" class="chk_study_'+page+'" value="'+v.ID+'" '+($('#'+toElem+' .mid'+v.ID).find('input[type="checkbox"]').attr('checked')=='checked'?'checked':'')+' /></td>';
					html+='<td>'+v.ID+'</td>';
					html+='<td>'+v.STUNAME+'</td>';
					html+='</tr>';
				});
				html+='</tbody>';
				$('.js_thead_study,.js_tbody_study').hide();
				$('#js_tablebox_study').append(html);
				$('#pop_pageShow_study').html(gPage(rCount,page,'study_chk.getList',G_perpage_pop));
			});
		}
	};
	it.checkAll2=function(me){
		var flg=me.checked==true?true:false;
		$('#'+toElem).find('input[type="checkbox"]').slice((currPage2-1)*perpage2, currPage2*perpage2).attr('checked',flg).click(function(){
			if(this.checked==false) me.checked=false;
		});
	};
	it.newPage=function(page){
		currPage2=page;
		$('#'+toElem).find('tr').hide().slice((page-1)*perpage2, page*perpage2).show();
		$('#'+toElem+'Page').html(gPage($('#'+toElem).find('tr').length,page,'study_chk.newPage',perpage2));
	};
	it.checkedCount=function(){
		var n=$('#'+toElem).find('input[type="checkbox"]');
		$('#'+toElem+'Count').text('当前已选学生总数：'+n.length);
	};
	it.subm=function(){
		$('.js_tbody_study').find('input[type="checkbox"]').each(function(){
			if(this.checked==true){
				if($('#'+toElem).find('.mid'+this.value).length==0) $(this).parent().parent().prependTo('#'+toElem);
				else $('#'+toElem).find('.mid'+this.value).find('input[type="checkbox"]').attr('checked',true);
			}else{
				$('#'+toElem).find('.mid'+this.value).remove();
			}
		})
		//$('#checkboxall_1,#'+toElem).click(function(){it.checkedCount()});
		it.checkedCount();
		it.newPage(1);
	};
	it.popDel=function(){
		$('#'+toElem+'Del').click(function(e) {
			var ids=[];
			$('#'+toElem).find('input[type="checkbox"]').each(function(){
				if(this.checked==true){
					ids.push($(this).val());
				}
			});
			if(ids.length==0){
				e.preventDefault();
				$.fn.nyroModalManual({
					width:400,
					title:"系统提示",
					content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />请选择</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_green overlayClose" value="确定"/></div>'
				});

			}else{
				e.preventDefault();
				$.fn.nyroModalManual({
					width:400,
					title:"系统提示",
					content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />删除后将无法恢复，确定要删除吗？</h5></div><div class="overlay_btn"><input type="button" id="win_sure" onclick="study_chk.del()" class="btn btn_green overlayClose" value="确定"/><input type="button" id="win_cancle" class="btn btn_gray overlayClose" value="取消"/></div>'
				});
			}
			return false;
		});
	};
	it.del=function(){
		$.each($('#'+toElem).find('input[type="checkbox"]'),function(k,v){
			if($(v)[0].checked==true){
				$(v).parent().parent().remove();
			}
		});
		it.checkedCount();
		//it.newPage(currPage2);
		it.newPage(1);
	};
	return it;
})();



var course_chk=(function(){
	var listType=0;
	var fromElem='openable_tbody_course',toElem='openable_tbody_course_chked';
	var it={},rCount=0,perpage2=5,params,currPage2=1;
		it.fromElem=fromElem;
		it.toElem=toElem;

	//初始化
	it.init=function(n){
		listType = n || 0;
		//插入一个记录搜索每件的日志
		$('#form_query_2').before('<input type="hidden" id="'+fromElem+'Log" />');
		// 绑定查询事件
		$('#form_query_2').click(function() {
			params = Ab.urlDecode(Ab.serializeForm('form_course'));
			//记录查询条件，用于保存时使用
			searchParams['course']=params;
			var str=Ab.encode(params);
			if($('#'+fromElem+'Log').val()!=str){
				$('#'+fromElem+'Log').val(str);
				// 清空旧搜索结果
				$('#'+toElem).empty();
			}
			$.fn.nyroModalManual({
				width:600,
				height:360,
				title:"添加课程",
				content:it.pop()
			});
			//载入查询结果列表
			it.getList(1);
		});

		// 绑定全选功能
		$('#'+toElem+'CheckAll').unbind().bind('click',function(){
			it.checkAll2(this);
			//it.checkedCount();
		})
		// 绑定删除button
		it.popDel();
	};
	it.pop=function(){

		var html='<table id="js_tablebox_course" class="tablebox"></table>';
			html+='<div id="pop_pageShow_course"></div>';
			html+='<div class="overlay_btn">';
			html+='<input type="button" class="btn btn_green overlayClose" onclick="course_chk.subm()" value="确定选择"/>';
			html+='<input type="button" class="btn btn_gray overlayClose" value="关闭" />';
			html+='</div>';

		return html;
	};
	it.getList=function(page){
		page = (page && page>0)?page=page:page=Math.abs(page);
		var html='<thead id="js_thead_course'+page+'" class="table_header js_thead_course">';
			html+='<tr>';
			html+='<th class="first tc" width="4%"><input type="checkbox" name="checkall" onclick="checkAll(this,\'chk_course_'+page+'\')" id="'+fromElem+'_checkAll" /></th>';
		if(listType==0){
			html+='<th>课程名称</th>';
			html+='<th>课程性质</th>';
		}else{
			html+='<th>课程名称</th>';
			html+='<th>批次名称</th>';
			html+='<th>任课教师</th>';
			html+='<th>授课学校</th>';
			//html+='<th>层次</th>';
			html+='<th>课程学分</th>';
			//html+='<th>课程费用</th>';
		}
			html+='</tr>';
			html+='</thead>';
			html+='<tbody id="js_tbody_course'+page+'" class="openable_tbody js_tbody_course">';


		if($('#js_thead_course'+page).length>0){
			$('.js_thead_course,.js_tbody_course').hide();
			$('#js_thead_course'+page).show();
			$('#js_tbody_course'+page).show();
			$('#pop_pageShow_course').html(gPage(rCount,page,'course_chk.getList'));
		}else{
			if(listType==0){
				var queryUrl = 'course/coursestandard/list/';
				var queryTest=(params.coursecode==''?'null':params.coursecode)
						+"/"+(params.coursename==''?'null':params.coursename)
						+"/null/";

				//var queryTest='null/null/null/null/null/null/null/null/';
				$.getJSON(G_ROOT+queryUrl+encodeURI(queryTest)+"/"+page+'/'+G_perpage+'/',function(data){
					rCount=data.rCount;	// 记录总数，方便分页时使用
					$.each(data.list,function(k,v){
						v.OPENID=v.CODE;
						if($('#'+toElem+' .mid'+v.OPENID).length>0) check='checked';
						html+='<tr class="atPage'+page+' mid'+v.OPENID+'">';
						html+='<td class="first tc"><input type="checkbox" class="chk_course_'+page+'" name="checkall" value="'+v.OPENID+'" '+($('#'+toElem+' .mid'+v.OPENID).find('input[type="checkbox"]').attr('checked')=='checked'?'checked':'')+' /></td>';
						html+='</td>';
						html+='<td>'+v.NAME+'</td>';
						html+='<td><select><option value="1" selected="selected">必修</option><option value="2">选修</option></select></td>';
						html+='</tr>';
					});
					html+='</tbody>';
					$('.js_thead_course,.js_tbody_course').hide();
					$('#js_tablebox_course').append(html);
					$('#pop_pageShow_course').html(gPage(rCount,page,'course_chk.getList'));
				});

			}else{

				var queryUrl = 'choosecoursevolunte/querybatch/';
				var queryTest=($('#form_term').val()==''?'null':$('#form_term').val())
						+"/"+(params.coursecode==''?'null':params.coursecode)
						+"/"+(params.coursename==''?'null':params.coursename)
						+"/"+(params.schoolcode==''?'null':params.schoolcode)
						+"/null/"+(params.coursename2==''?'null':params.coursename2)
						+"/"+(params.educationlevel==''?'null':params.educationlevel)
						+"/null/";

				//var queryTest='null/null/null/null/null/null/null/null/';
				$.getJSON(G_ROOT+queryUrl+encodeURI(queryTest)+"/"+page+'/'+G_perpage+'/',function(data){
					rCount=data.rCount;	// 记录总数，方便分页时使用
					$.each(data.list,function(k,v){
						if($('#'+toElem+' .mid'+v.OPENID).length>0) check='checked';
						html+='<tr class="atPage'+page+' mid'+v.OPENID+'">';
						html+='<td class="first tc"><input type="checkbox" class="chk_course_'+page+'" name="checkall" value="'+v.OPENID+'" '+($('#'+toElem+' .mid'+v.OPENID).find('input[type="checkbox"]').attr('checked')=='checked'?'checked':'')+' />';
						html+='<input type="hidden" class="coursecode" name="CourseCode" value="'+v.COURSECODE+'" />'
								+ '<input type="hidden" class="coursename" name="CourseName" value="'+v.COURSENAME+'" />'
								+ '<input type="hidden" class="schoolcode" name="schoolCode" value="'+v.SCHOOLCODE+'" />'
								+ '<input type="hidden" class="score" name="score" value="'+v.SCORE+'" />'
								+ '<input type="hidden" class="price" name="price" value="'+v.PRICE+'" />'
								+ '<input type="hidden" class="opencourseid"name="OpenCourseId" value="'+v.OPENID+'" />'
								+ '<input type="hidden" class="coursenamestandard" name="CourseNameStandard" value="'+v.COURSENAMESTANDARD+'" />'
								+ '<input type="hidden" class="coursecodestandard" name="CourseCodeStandard" value="'+v.COURSECODESTANDARD+'" />';
						html+='</td>';
						html+='<td>'+v.COURSENAME+'</td>';
						html+='<td>'+v.COURSENAMESTANDARD+'</td>';
						html+='<td>'+v.TEACHERS+'</td>';
						html+='<td>'+G_data['school'][v.SCHOOLCODE]+'</td>';
						//html+='<td>'+G_data['educationlevel'][v.EDUCATIONLEVELCODE]+'</td>';
						html+='<td>'+v.SCORE+'</td>';
						//html+='<td>'+v.PRICE+'</td>';
						html+='</tr>';
					});
					html+='</tbody>';
					$('.js_thead_course,.js_tbody_course').hide();
					$('#js_tablebox_course').append(html);
					$('#pop_pageShow_course').html(gPage(rCount,page,'course_chk.getList'));
				});
			}
		}
	};
	it.checkAll2=function(me){
		var flg=me.checked==true?true:false;
		$('#'+toElem).find('input[type="checkbox"]').slice((currPage2-1)*perpage2, currPage2*perpage2).attr('checked',flg).click(function(){
			if(this.checked==false) me.checked=false;
		});
	};
	it.newPage=function(page){
		currPage2=page;
		$('#'+toElem).find('tr').hide().slice((page-1)*perpage2, page*perpage2).show();
		$('#'+toElem+'Page').html(gPage($('#'+toElem).find('tr').length,page,'course_chk.newPage',perpage2));
	};
	it.checkedCount=function(){
		var n=$('#'+toElem).find('input[type="checkbox"]');
		$('#'+toElem+'Count').text('当前已选课程总数：'+n.length);
	};
	it.subm=function(){
		$('.js_tbody_course').find('input[type="checkbox"]').each(function(){
			if(this.checked==true){
				$('#'+toElem).find('.mid'+this.value).remove();
				var aa=$(this).parent().parent().prependTo('#'+toElem);
				if(listType==0) aa.find('td').last().html(aa.find('select').val()==1?'必修<input type="hidden" class="xiuType" value="1" />':'选修<input type="hidden" class="xiuType" value="2" />');
			}else{
				$('#'+toElem).find('.mid'+this.value).remove();
			}
		})
		//$('#checkboxall_2,#'+toElem).click(function(){it.checkedCount()});
		it.checkedCount();
		it.newPage(1);
	};
	it.popDel=function(){
		$('#'+toElem+'Del').click(function(e) {
			var ids=[];
			$('#'+toElem).find('input[type="checkbox"]').each(function(){
				if(this.checked==true){
					ids.push($(this).val());
				}
			});
			if(ids.length==0){
				e.preventDefault();
				$.fn.nyroModalManual({
					width:400,
					title:"系统提示",
					content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />请选择</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_green overlayClose" value="确定"/></div>'
				});

			}else{
				e.preventDefault();
				$.fn.nyroModalManual({
					width:400,
					title:"系统提示",
					content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />删除后将无法恢复，确定要删除吗？</h5></div><div class="overlay_btn"><input type="button" id="win_sure" onclick="course_chk.del()" class="btn btn_green overlayClose" value="确定"/><input type="button" id="win_cancle" class="btn btn_gray overlayClose" value="取消"/></div>'
				});
			}
			return false;
		});
	};
	it.del=function(){
		$.each($('#'+toElem).find('input[type="checkbox"]'),function(k,v){
			if($(v)[0].checked==true){
				$(v).parent().parent().remove();
			}
		});
		it.checkedCount();
		//it.newPage(currPage2);
		it.newPage(1);
	};
	return it;
})();