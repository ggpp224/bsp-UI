/**
 * @author gp
 * @datetime 2012-4-26
 * @description index_2_3.js
 */

 /**
 * 分页及列表
 */
// var queryUrl = '/'+G_FormArr['planchoosecourse']+"/null/null/null/null/null/null/null/";
var ID=getQuery('ID');
var termId=getQuery('termId');
// 编辑状态
var isedit=getQuery('do')=='edit'?true:false;

var cmb = new ComboxOperate();

function getList(page){
	var queryUrl = G_ROOT+'course/plandetail/list/';
	page = (page && page>0)?page=page:page=Math.abs(page);
	var id=getQuery('ID');
	var params = Ab.urlDecode(Ab.serializeForm('query_form'));
		queryUrl += (params.form_major==''?'null':params.form_major)
					+"/"+(params.form_educationlevel==''?'null':params.form_educationlevel)
					+"/"+(params.form_grade==''?'null':params.form_grade)
					+"/"+(params.studentid==''?'null':params.studentid)
					+"/"+(params.studentname==''?'null':params.studentname)
					+"/"+id;



	var url=encodeURI(queryUrl)+'/'+page+'/'+G_perpage;
	$.getJSON(url,function(data){
		var pageTotal=data.rCount;
		var list = data.list;
		if(list){
			var html='';
			$.each(list,function(k,v){
				html+='<tr>';
				html+=isedit?'<td class="tc"><input type="checkbox" name="chk" class="chk" value="'+v.bdpId+'"/></td>':'';
				html+='<td>'+v.STUDENTID+'</td>';
				html+='<td>'+v.STUDENTNAME+'</td>';
				html+='<td>'+(v.MAJORCODE=="全部"?v.MAJORCODE:G_data['major'][v.MAJORCODE])+'</td>';
				html+='<td class="course_nature">'+(v.LEVELCODE=="全部"?v.LEVELCODE:G_data['educationlevel'][v.LEVELCODE])+'</td>';
				html+='<td>'+(v.GRADECODE=="全部"?v.GRADECODE:G_data['grade'][v.GRADECODE])+'</td>';
				html+='<td>'+(G_data['courseNature'][v.COURSE_NATURE])+'</td>';

				html+='</tr>';
			});
			$('#checkboxall').attr('checked',false);
			$('#js_openable_tbody').html(html);
			$('#pageShow').html(gPage(data.rCount,page,'getList'));
		}
	});
 }

// 【弹出框】批量删除
function pop_del(){
	var html='';
	html+='<div class="overlay_delete_box">';
	html+='<h5 class="red"><img src="images/delete_ico.gif" />删除后将无法恢复，确定要删除吗？</h5>';
	html+='</div>';
	html+='<div class="overlay_btn">';
	html+='<input id="index_2_3_subm_del" type="button" class="btn btn_green" onclick="del()" value="确定"/>';
	html+='<input type="button" class="btn btn_gray overlayClose" value="取消"/>';
	html+='</div> ';
	return html;

 }

function del(){
	var queryUrl = G_ROOT+'course/planchoosecoursedetail/deletebatch';
	var aa=[];
	$('#js_openable_tbody').find('.chk').each(function(){
		if(this.checked==true){
			aa.push($(this).val());
		}
	})
	if(aa.length>0){
		var str = Ab.encode(aa);
		$.ajax({
			type: 'POST',
			data:str,
			dataType: 'json',
			url: queryUrl,
			contentType:'application/json;charset=UTF-8',
			success: function(rs) {
				if(rs.returnCode=='000000'){
					mAlert('删除成功',0);
					getList(1);
				}else{
					mAlert('删除失败。');
				}
			}
		});
	}else{
		mAlert('请选择学生');
	}

 }


// 【弹出框】批量修改选课形式
function pop_batch(){

	var html='<div class="clearfix">';
	html+='<div class="column width3">';
	html+='<p><label class="labeltitle">课程性质：</label><select iclass="half" id="batch_changeType">';
	for(var i in G_data['courseNature']){
		if(i=='1' || i=='2') html+='<option value="'+i+'">'+G_data['courseNature'][i]+'</option>';
	}
	html+='</select></p>';
	html+='</div>';
	html+='</div>';
	html+='<div class="overlay_btn">';
	html+='<input type="button" class="btn btn_green" onclick="changeType()" value="确认修改"/>';
	html+='<input type="button" class="btn btn_gray overlayClose" value="返回"/>';
	html+='</div>';
	return html;
}

//批量修改选课形式
function changeType(){
	var ids=[];
	$('#js_openable_tbody').find('.chk').each(function(){
		if(this.checked==true) ids.push(this.value);
	})
	var chooseNature=$('#batch_changeType').val();

	var param={
		userId	: user['uid'],
		idList	: ids,
		chooseNature : chooseNature
	};
	var str = Ab.encode(param);
	$.ajax({
		type: 'POST',
		data:str,
		dataType: 'json',
		url: G_ROOT+'course/planchoosecoursedetail/batchupdate?termId='+termId,
		contentType:'application/json;charset=UTF-8',
		success: function(rs) {
			if(rs.returnCode=='000000'){
				// '1':'必修课','2':'选修课'
				mAlert('修改成功');
				$('#js_openable_tbody').find('.chk').each(function(){
					if(this.checked==true) $(this).parent().parent().find('.course_nature').text(chooseNature==1?'必修课':'选修课');
				})
			}else{
				mAlert('修改失败');
			}
		}
	});
}


 $(document).ready(function(){

	// 编辑页面显示“新增、删除”等按钮
	if(isedit){
		$('#myTitle').text('选课计划明细编辑');
		$('#isedit').show();
		$('#btnADD').click(function(){
			window.location="index_2_3_view_add.html?ID="+ID+'&termId='+termId;
		});
	}else{
		$('.tc').remove();	// 删除复选框
	}
	cmb.levelAndGrade();
	cmb.major();
	$("#form_query").click(function(){
		getList(1);
	});

	$("#form_query").click();

	//批量修改选课形式
	$('#btnChange').click(function(e) {
		var ids=[];
		$('#js_openable_tbody').find('.chk').each(function(){
			if(this.checked==true) ids.push(this.value);
		})
		if(ids.length>0){
			e.preventDefault();
			$.fn.nyroModalManual({
				width:400,
				title:"批量修改课程性质",
				content: pop_batch()
			});
		}else mAlert('请选择记录');
		return false;
	});

 });