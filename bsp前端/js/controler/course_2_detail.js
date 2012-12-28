/**
 * @author gp
 * @datetime 2012-4-26
 * @description index_2_3.js
 */

 /**
 * 分页及列表
 */
// var queryUrl = '/'+G_FormArr['planchoosecourse']+"/null/null/null/null/null/null/null/";


var termId=getQuery('termId');
 function getList(page){
	var queryUrl = G_ROOT+'studentrobcourse/findbatchchoosecoursedetail/';
	page = (page && page>0)?page=page:page=Math.abs(page);
	var id=getQuery('ID');
	var termId=getQuery('termId');
	var params = Ab.urlDecode(Ab.serializeForm('query_form'));
		queryUrl += (params.studentid==''?'null':params.studentid)
				+"/"+(params.studentname==''?'null':params.studentname)
				+"/"+(params.coursecode==''?'null':params.coursecode)
				+"/"+(params.coursename==''?'null':params.coursename)
				;

	var url=encodeURI(queryUrl)+'/'+id+'/'+page+'/'+G_perpage;
	$.getJSON(url,function(data){
		var pageTotal=data.rCount;
		var list = data.list;
		if(list){
			var html='';
			$.each(list,function(k,v){
				html+='<tr>';
				html+='<td class="first tc"><input type="checkbox" class="chkc" name="checkall" value="'+v.TETAILID+'" /> </td>';
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
			});
			$('#checkboxall').attr('checked',false);
			$('#js_openable_tbody').html(html);
			$('#pageShow').html(gPage(data.rCount,page,'getList'));
		}
	});
 }
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
	var queryUrl = G_ROOT+'studentrobcourse/deletebatchchoosecoursedetail';
	var ids=[];
	$('#js_openable_tbody').find('.chkc').each(function(){
		if(this.checked==true){
			ids.push($(this).val());
		}
	})
	var postTo={
		idList : ids,
		termId : termId
	}
	if(ids.length>0){
		var str = Ab.encode(postTo);
		$.ajax({
			type: 'POST',
			data:str,
			dataType: 'json',
			url: queryUrl,
			contentType:'application/json;charset=UTF-8',
			success: function(rs) {
				var insertId=rs.entity;
				if(rs.returnCode=='000000'){
					$('#js_openable_tbody').find('.chkc').each(function(){
						if(this.checked==true){
							$(this).parent().parent().remove();
						}
					})
					mAlert('删除成功',0);
					getList(1);
				}else{
					if(insertId==14){
						mAlert('批次选课已暂停,不能删除');
					}else if(insertId==15){
						mAlert('批次选课已结束,不能删除');
					}else if(insertId==20){
						mAlert('批次选课参数设置错误');
					}else{mAlert('删除失败。')};
				}
			}
		});
	}else{
		mAlert('请选择学生');
	}

 }


 $(document).ready(function(){
	//查询
	$("#form_query").click(function(){
		getList(1);
	});

	$.getJSON(G_ROOT+'termparameter/getparamervalue/'+termId+'/CHOOSE_BATCH',function(res){
		if(res.entity==3) $('.box_header').find('input').show();
	});

	$("#form_query").click();
	//新增按钮链接
	$('#btnADD').click(function(){
		window.location.href='course_2_detail_add.html?ID='+getQuery('ID')+'&termId='+getQuery('termId');
	});

	//删除
	$('.overlay_delete').click(function(e) {
		var aa=[];
		$('#js_openable_tbody').find('.chkc').each(function(){
			if(this.checked==true){
				aa.push($(this).val());
			}
		})
		if(aa.length>0){
			e.preventDefault();
			$.fn.nyroModalManual({
				width:400,
				title:"系统提示",
				content: pop_del()
			});
			return false;
		}else mAlert('请选择学生');
	});

 });