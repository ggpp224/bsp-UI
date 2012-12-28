/**
 * @author gp
 * @datetime 2012-4-26
 * @description index_2_3.js
 */

 /**
 * 分页及列表
 */
// var queryUrl = '/'+G_FormArr['planchoosecourse']+"/null/null/null/null/null/null/null/";



 function getList(page){
	var queryUrl = G_ROOT+'studentrobcourse/findbatchchoosecoursedetail/';
	page = (page && page>0)?page=page:page=Math.abs(page);
	var id=getQuery('ID');
		id='';
	var params = Ab.urlDecode(Ab.serializeForm('query_form'));
		queryUrl += (params.studentid==''?'null':params.studentid)
				+"/"+(params.studentname==''?'null':params.studentname)
				+"/"+(params.coursecode==''?'null':params.coursecode)
				+"/"+(params.coursename==''?'null':params.coursename)
				;

	var url=queryUrl+'/'+page+'/'+G_perpage;
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
	var aa=[];
	$('#js_openable_tbody').find('.chkc').each(function(){
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
					mAlert('成功',0);
					$('#js_openable_tbody').find('.chkc').each(function(){
						if(this.checked==true){
							$(this).parent().parent().remove();
						}
					})
				}else{
					mAlert('删除失败。');
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


 });