var queryUrl = '';

var termset={};
var school={};
var major={};
var grade={};
var educat={};
var cmb = new ComboxOperate();

function audit(params){
		var str = Ab.encode(params);
		$.ajax({
			type: 'POST',
			data:str,
			dataType: 'json',
			url: G_ROOT+'choosecoursebatch/checkcoursebatch?termId='+$('#form_term').val(),
			contentType:'application/json;charset=UTF-8',
			success:function(rs){
				if(rs.returnCode=='000000'){
					mAlert("操作成功");
					var date = new Date(),m = date.getMonth()+1,d = date.getDate();
					var currDate=date.getFullYear()+'-'+(m<10?'0':'')+m+'-'+(d<10?'0':'')+d;

					$('#js_course_tbody').find('input:checked').each(function(){
						//if($(this).attr('status')!=params.status){
							$(this).attr('status',params.status);
							var _f=$(this).parent().parent();
							_f.find('.status').text(G_data['option'][params.status]);
							_f.find('.approvetime').text(currDate);
							_f.find('.approver').text(user['uname']);
							$('.mark').attr("mark",params.approveCommend);
						//}
					})
				}else{
						mAlert("操作失败333333333");
				}
			}
		});
}
// 获取列表
function getList(page){
	page = (page && page>0)?page=page:page=Math.abs(page);
	var params = Ab.urlDecode(Ab.serializeForm('batch_form'));
	queryUrl = (params.schoolcode=="全部"?null:params.schoolcode)+'/'+(params.majorcode=="全部"?null:params.majorcode)+'/'+(params.educationlevel=="全部"?null:params.educationlevel)+'/'+(params.gradecode=="全部"?null:params.gradecode)+'/'+(params.termid=="全部"?null:params.termid)+'/'+(params.stutypecode=="全部"?null:params.stutypecode)+'/'+(params.statuscode=="全部"?null:params.statuscode);
	var url=G_ROOT+'choosecoursevolunte/querycoursebatch/'+queryUrl+'/'+page+'/'+G_perpage;
	$.getJSON(url,function(data){
		var list = data.list;
		if(list){
			var html='';
			$.each(list,function(k,v){
				html+='<tr>';
				html+=' <td class="first tc" id="haschecked"><input ids="'+v.ID+'" value="'+v.ID+'" status="'+v.STATUS+'" class="chk" type="checkbox" name="checkall"  /></td>';
				html+='<td>'+G_data['school'][v.SCHOOLCODE]+'</td>';
/* 				html+='<td>'+G_data['major'][v.MAJORCODE]+'</td>';
				html+='<td>'+G_data['educationlevel'][v.LEVELCODE]+'</td>';
				html+='<td>'+G_data['grade'][v.GRADECODE]+'</td>';
				html+='<td>'+G_data['stuType'][v.STUDENTTYPE]+'</td>'; */
				html+='<td>'+G_data['termset'][v.TERMID]+'</td>';
				html+='<td>'+v.CREATETIME+'</td>';
				html+='<td class="status"><a class="mark" href="#" mark="'+v.APPROVECOMMEND+'">'+G_data['status'][v.STATUS]+'</a></td>';
				html+='<td class="approvetime">'+v.APPROVETIME+'</td>';
				html+='<td class="approver">'+v.APPROVER+'</td>';
				//html+='<td>'+'<a class="mark" href="#" mark="'+v.APPROVECOMMEND+'">查看意见</a>'+'</td>';
				html+='<td><a href="course_2_add.html?ID='+v.ID+'&termId='+params.termid+'&sh=1&def=2'+'&sc='+v.SCHOOLCODE+'">查看</a></td>';
				//html+='<input type="hidden" value="'+v.ID+'" id="stu_id">';
				html+='</tr>';

			})
			html=throwNull(html);
			$('#js_course_tbody').html(html);
			$('#pageShow').html(gPage(data.rCount,page,'getList'));
			$('.mark').unbind('click').bind('click',function(){
				mark = this.getAttribute("mark");
				var html='<form id="sampleform" method="post" action="#" name="view">';
					html+='<div class="overlay_delete_box">';
					html+='<h5 class="green">审核意见：<textarea id="no_tx" rows="5" cols="30">'+mark+'</textarea></h5>';
					html+='</div>';
					html+='<div class="overlay_btn"><input type="button" id="no_save" class="btn btn_gray overlayClose" value="关闭"/></div> ';
					html+='</form>';

				$.fn.nyroModalManual({
					width:400,
					title:"核审提示",
					content: html
				});
			});

		}

	});
 }

$(document).ready(function() {
 	// 学校
 	cmb.shoolAndMajor();

	// 层次
 	cmb.levelAndGrade();

	// 学科
 	//cmb.subject();

	// 互选批次组
	cmb.term();
	window.onload = function(){
		document.getElementById("form_query").click();
	}
 	// 学生类型
	var stuTypeDom = document.getElementById('form_stuType');
	new Combox(stuTypeDom).fill(G_data['stuType']);
	$(stuTypeDom).prepend('<option selected value="null">全部</option>');
	$(stuTypeDom).get(0).selectedIndex=0;

			//审核通过
			$("#overlay_audit_ok").click(function(){
				shenHe(3,"审核通过");
			});
			$("#no_save").live('click',function(){
				shenHe(4,"审核未通过");
			});

			//审核未通过
			$('#overlay_audit_no').click(function() {
				var ids=[];
		 		$('#js_course_tbody').find('input:checked').each(function(){
					ids.push(this.value);
					//if($(this).attr('status')!=4) ids.push(this.value);
				});
	 			if(ids.length==0){
	 				mAlert('请选择学校');
	 				return false;
	 			}
				$.fn.nyroModalManual({
					width:400,
					title:"审核未通过",
					content: '<div class="overlay_delete_box"><h5 class="green">审核意见：<textarea id="no_tx" rows="5" cols="30"></textarea></h5></div><div class="overlay_btn"><input type="button" id="no_save" class="btn btn_gray" value="确定"/></div>'
				});
				return false;
			});

			//全选
			tableCheckAll('js_course_tbody');
			//审核

		 	var shenHe = function(status,title){
				var ids=[];
		 		$('#js_course_tbody').find('input:checked').each(function(){
					ids.push(this.value);
					//if($(this).attr('status')!=status) ids.push(this.value);
				});
		 		if(status==3){
		 			if(ids.length==0){
		 				mAlert('请选择学校');
		 				return false;
		 			}

		 		}else{
		 			if(ids.length==0){
		 				mAlert('请选择学校');
		 				return false;
		 			}
		 		}

				var params = {
					approver:user['uname'],
					idList:ids,
					status:status,
					approveCommend:(status==4?$('#no_tx').val():'')
				};
				audit(params);
		 	};

		 	$("#form_query").click(function(){
				var params = Ab.urlDecode(Ab.serializeForm('batch_form'));
				getList(1);
			});
			$("form_query").click();

});