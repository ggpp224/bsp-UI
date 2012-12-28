/**
 * @author gp
 * @datetime 2012-4-25
 * @description index.js
 */

var params={};// 全局查询条件,点击查询后变化

var cmb = new ComboxOperate();
$(document).ready(function() {

		// 互选批次组
		cmb.term();
	 	// 学校
	 	cmb.shoolAndMajor();
		// 层次
	 	cmb.levelAndGrade();

		$('#btnAdd').click(function(){
			window.location="course_2_add.html?schoolCode="+user['schoolCode'];
		})

	$("#form_query").click(function(e){
		params = Ab.urlDecode(Ab.serializeForm('batch_form'));
		$('#Btn_export').click(function(){
			//window.location='../courseexcel/termset/list/'+params.termid
			var html='<div class="clearfix"><p><label class="labeltitle">互选批次组：</label><select id="export_termid" name="export_termid" iclass="half"></select></p></div>';
    		html+='<div class="clearfix">';
        	html+='<div class="column width3 first">';
    		html+='<p><label class="labeltitle">学校：</label><select id="export_schoolcode" name="export_schoolcode" iclass="half"></select></p>';
            html+='<p><label class="labeltitle">层次：</label><select id="export_levelcode" name="export_levelcode" iclass="half"></select></p>';
            html+='<p><label class="labeltitle">学生类型：</label><select id="export_studenttype" name="export_studenttype" iclass="half"></select></p>';
			html+=' </div>';
			html+='<div class="column width3">';
			html+='<p><label class="labeltitle">专业：</label><select id="export_majorcode" name="export_majorcode" iclass="half"></select></p>';
			html+='<p><label class="labeltitle">年级：</label><select id="export_gradecode" name="export_gradecode" iclass="half"></select></p>';
			html+='</div>';
			html+='</div>';
			html+='<div class="overlay_btn">';
			html+='<input type="button" id="Btn_export_do" class="btn btn_green" value="导出"/> ';
			html+='<input type="button" id="Btn_export_close"class="btn btn_gray overlayClose" value="关闭"/>';
			html+='</div>';
			$.fn.nyroModalManual({
				width:740,
				title:"导出",
				content: html
			});
			var subjectDom = document.getElementById('export_termid');
			new Combox(subjectDom).clear().fill(G_data['termset']);
			cmb.shoolAndMajor({'school_id':'export_schoolcode','major_id':'export_majorcode','all':true});
			cmb.levelAndGrade({'level_id':'export_levelcode','grade_id':'export_gradecode','all':true});
			var stuTypeDom = document.getElementById('export_studenttype');
			new Combox(stuTypeDom).fill(G_data['stuType']);

			$('#Btn_export_do').click(function(){
				var _url='/'+$('#export_schoolcode').val()
						+'/'+$('#export_majorcode').val()
						+'/'+$('#export_levelcode').val()
						+'/'+$('#export_gradecode').val()
						+'/'+$('#export_studenttype').val()
						+'/'+$('#export_termid').val();

				$.getJSON(G_ROOT+'courseexcel/batchchoosecoursevalidator/toexcel'+_url,function(data){
					if(data.returnCode=='000000'){
						window.location=G_ROOT+'courseexcel/batchchoosecourse/toexcel'+_url;
						$('#Btn_export_close').click();
					}else{
						mAlert('学生列表或课程列表为空，不允许导出');
					}
				})

			});
		});
		getList(1);
	});
	$("#form_query").click();

	// 绑定删除功能
	$('.overlay_delete').click(function(e) {
		var ids=[];
		$('#js_openable_tbody').find('.chk').each(function(){
			if(this.checked==true){
				ids.push($(this).val());
			}
		});
		if(ids.length==0){
			e.preventDefault();
			$.fn.nyroModalManual({
				width:400,
				title:"系统提示",
				content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />请选择学校</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_green overlayClose" value="确定"/></div>'
			});
		}else{
			e.preventDefault();
			$.fn.nyroModalManual({
				width:400,
				title:"系统提示",
				content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />删除后将无法恢复，确定要删除吗？</h5></div><div class="overlay_btn"><input type="button" id="win_sure" onclick="del()" class="btn btn_green overlayClose" value="确定"/><input type="button" id="win_cancle" class="btn btn_gray overlayClose" value="取消"/></div>'
			});
		}
		return false;
	});

});


// 获取查询列表
function getList(page){
	page = (page && page>0)?page=page:page=Math.abs(page);
	//{schoolCode}/{majorCode}/{levelCode}/{gradeCode}/{timeId}/{studentType}/{status}/{pageno}/{pagesize}
	var queryUrl = (params.schoolcode=="全部"?null:params.schoolcode)
		+'/'+(params.majorcode=="全部"?null:params.majorcode)
		+'/'+(params.educationlevel=="全部"?null:params.educationlevel)
		+'/'+(params.gradecode=="全部"?null:params.gradecode)
		+'/'+(params.termid=="全部"?null:params.termid)
		+'/'+(params.stutype=="全部"?null:params.stutype)
		+'/'+(params.status=="全部"?null:params.status);
	//queryUrl = "null/null/null/null/null/null/null/";
	var url=G_ROOT+'choosecoursevolunte/querycoursebatch/'+queryUrl+'/'+page+'/'+G_perpage;
	$.getJSON(url,function(data){
		var list = data.list;
		if(list){
			var html='';
			$.each(list,function(k,v){
				html+='<tr>';
				html+=' <td class="first tc"><input '+((v.STATUS==3 || (user['schoolCode']!=v.SCHOOLCODE && user['uRole']==2))?'disabled ':'')+'type="checkbox" name="checkall" class="chk" value="'+v.ID+'" /></td>';
				html+='<td>'+G_data['school'][v.SCHOOLCODE]+'</td>';
				html+='<td>'+(v.MAJORCODE==""?"全部":G_data['major'][v.MAJORCODE])+'</td>';
				html+='<td>'+(v.LEVELCODE==""?"全部":G_data['educationlevel'][v.LEVELCODE])+'</td>';
				html+='<td>'+(v.GRADECODE==""?"全部":G_data['grade'][v.GRADECODE])+'</td>';
				html+='<td>'+G_data['stuType'][v.STUDENTTYPE]+'</td>';
				html+='<td>'+G_data['termset'][v.TERMID]+'</td>';
				html+='<td>'+v.CREATETIME+'</td>';
				html+='<td><a href="javascript:" class="mark" mark="'+v.APPROVECOMMEND+'">'+G_data['status'][v.STATUS]+'</a></td>';
				html+='<td>'+v.APPROVETIME+'</td>';
				html+='<td>'+v.APPROVER+'</td>';

				//html+='<td><a href="javascript:" class="mark" mark="'+v.APPROVECOMMEND+'">查看意见</a></td>';
				//html+='<td>'+((user['schoolCode']!=v.SCHOOLCODE && user['uRole']==2)?'<span class="color_gray">编辑</span>':'<a href="course_2_detail.html?ID='+v.ID+'&termId='+v.TERMID+'">编辑</a>')+'</td>';
				html+='<td>'+((user['schoolCode']!=v.SCHOOLCODE && user['uRole']==2 && v.STATUS!=3)?'<span class="color_gray">编辑</span>':(v.PSTATUS==3?'<a href="course_2_add.html?ID='+v.ID+'&termId='+v.TERMID+'&sc='+v.SCHOOLCODE+'">编辑</a>':'<span class="color_gray">编辑</span>'))+'</td>';
				html+='</tr>';
			});
			html=throwNull(html);
			$('#js_openable_tbody').html(html);
			$('#pageShow').html(gPage(data.rCount,page,'getList'));
			$('.mark').unbind('click').bind('click',function(e){
				mark = this.getAttribute("mark");
				e.preventDefault();
				$.fn.nyroModalManual({
					width:400,
					title:"核审提示",
					url: 'overlay_audit_data.html'
				});
			});
		}
	});

	$.getJSON(G_ROOT+'termparameter/getparamervalue/'+params.termid+'/CHOOSE_BATCH',function(res){
		if(res.entity==3) $('.box_header').find('input').show();
	});
}
// 开始删除
function del(){
	var ids=[];
	$('#js_openable_tbody').find('.chk').each(function(){
		if(this.checked==true){
			ids.push($(this).val());
		}
	});

	var postTo ={
		idList : ids,
		termId : params.termid
	};

	if(ids.length>0){
		var str = Ab.encode(postTo);
		$.ajax({
			type: 'POST',
			data:str,
			dataType: 'json',
			url: G_ROOT+'choosecoursevolunte/delcoursebatch?termId='+postTo.termId,
			contentType:'application/json;charset=UTF-8',
			success: function(rs) {
				var insertId=rs.entity;
				if(rs.returnCode=='000000'){
					$('#js_openable_tbody').find('.chk').each(function(){
						if(this.checked==true){
							$(this).parent().parent().remove();
						}
					})
					mAlert('删除成功',0);
					getList(1);
				}else{
					if(insertId==14){
						alert('批次选课已暂停,不能删除');
					}else if(insertId==15){
						alert('批次选课已结束,不能删除');
					}else if(insertId==20){
						mAlert('批次选课参数设置错误');
					}else {alert('删除失败。');}
				}
			}
		});
	}else{
		alert('请选择');
	}
}