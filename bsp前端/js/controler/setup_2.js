/**
 * @author wl
 * @datetime 2012-5-18
 * @description setup_2.js
 */
var queryUrl='';
var cmb = new ComboxOperate();


var setMajor =(function(){
	var it={},queryUrl='',params={};
	it.init = function(){
		$('#majorCode_add,#majorName_add').live('blur',function(){
			it.checkForm(this);
		});
		// 绑定新增按钮
		$('#Btn_add').click(function(e) {  //专业信息管理查询
			e.preventDefault();
			$.fn.nyroModalManual({
				width:500,
				title:"新增",
				content: it.popAdd()
			});
			//绑定保存按钮
			$('#majorAddSave').click(function(){
				it.save();
			});
			return false;
		});
		//绑定查询按钮
		$("#form_query").click(function(){
			//记录查询条件
			params = Ab.urlDecode(Ab.serializeForm('form_setup_2'));
			var queryTest='null/null/null/';
			queryUrl='major/query/'
					+(params.form_code==''?'null':params.form_code)+"/"
					+(params.form_name==''?'null':params.form_name)+"/"
					+(params.form_subject==''?'null':params.form_subject)+"/"
					+(params.form_status==''?'null':params.form_status)+"/"
				;
			it.getList(1);
		});
		$("#form_query").click();

		// 绑定删除
		$('#Btn_del').click(function(){
			var ids=[],codeList=[];
			$('#js_course_tbody').find('input[type="checkbox"]').each(function(){
				if(this.checked==true){
					ids.push($(this).val());
					codeList.push($(this).attr('code'));
				}
			});
			if(ids.length==0){
				$.fn.nyroModalManual({
					width:400,
					title:"系统提示",
					content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />请选择专业</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_green overlayClose" value="确定"/></div>'
				});

			}else{
				$.fn.nyroModalManual({
					width:400,
					title:"系统提示",
					content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />删除后将无法恢复，确定要删除吗？</h5></div><div class="overlay_btn"><input type="button" id="Btn_deling" class="btn btn_green" value="确定"/> <input type="button" id="win_cancle" class="btn btn_gray overlayClose" value="取消"/></div>'
				});
				$('#Btn_deling').click(function(){
					it.del();
				})
			}

			return false;
		});
	}
	it.popAdd = function(){
			var s='';
			for(var k in G_data['subject']){
				s+='<option value="'+k+'">'+G_data['subject'][k]+'</option>';
			}
			var html='';
			  html+='<form id="form_subject_2" name="form_subject_2">';
			  html+='<p><label class="labeltitle"><i class="color_red">专业代码：</i></label><input type="text" id="majorCode_add" class="half" name="majorCode" value=""  /></p>';
			  html+='<p><label class="labeltitle"><i class="color_red">专业名称：</i></label><input type="text" id="majorName_add" class="half" name="majorName" value=""  /></p>';
			  html+='<p><label class="labeltitle">所属学科：</label>';
			  html+='<select name="subjectcode" id="form_subject_add">';
			  html+=s;
			  html+='</select>';
			  html+='</p>';
			  html+='<p>&nbsp;</p>';
			  html+='<div class="overlay_btn">';
			  html+='<input type="button" id="majorAddSave" class="btn btn_green" value="保存"/>';
			  html+='<input type="button" class="btn btn_gray overlayClose" value="取消"/>';
			  html+='</div>';
			  html+='</form>';
		   return html;
	};
	it.getList = function(page){
		page = (page && page>0)?page=page:page=Math.abs(page);
		var url=G_ROOT + encodeURI(queryUrl) + page+'/'+G_perpage;
		$.getJSON(url,function(data){
			if(data){
				var html='',list = data.list;

				$.each(list,function(k,v){
					html+='<tr>';
					if(user['uRole']==1) html+='<td class="first tc"><input type="checkbox" name="checkall" code="'+v.code+'"  class="chk_major" value="'+v.id+'" /></td>';
					html+='<td>'+v.code+'</td>';
					html+='<td>'+v.name+'</td>';
					html+='<td>'+G_data['subject'][v.subjectCode]+'</td>';
					html+='<td>'+v.createTime+'</td>';
					html+='<td id="txt_'+v.id+'">'+(v.status==1?'<i class="color_gray">已启用</i>':'<i class="color_gray">已停用</i>')+'</td>';
					if(user['uRole']==1) html+='<td><a class="majorstaus" href="javascript:" status="'+v.id+'_'+v.status+'">'+(v.status==1?'停用':'启用')+'</a></td>';
					html+='</tr>';
				});
				html = throwNull(html);
				$('#js_course_tbody').html(html);
				$('#pageShow').html(gPage(data.rCount,page,'setMajor.getList'));

				$('.majorstaus').click(function(){
					var obj=$(this),_tmp=($(this).attr('status')).split("_");
					var id=_tmp[0],status=_tmp[1]==1?2:1;
					var p={
						id : id,
						status : status,
						updater : user['uid']
					}
					var str = Ab.encode(p);
					$.ajax({
						type: "POST",
						data: str,
						dataType:"json",
						url:G_ROOT+'major/update',
						contentType:'application/json;charset=UTF-8',
						success: function(rs){
							if(rs.returnCode=='000000'){
								obj.attr('status',id+'_'+status).text(_tmp[1]==1?'启用':'停用');
								$('#txt_'+id).html(_tmp[1]==1?'<i class="color_gray">已停用</i>':'<i class="color_gray">已启用</i>');
							}
						}
					});

				})
			}
		});
	 }

	it.checkForm = function(obj){
		$(obj).nextAll().remove();
		$(obj).after('<cite></cite>');
		var val=$(obj).val(),maxlen=parseInt($(obj).attr('maxlength'));
			maxlen = maxlen >0 ? maxlen : 20;
		if(val.length<=0){
			$(obj).next().removeClass().addClass('error').text('不能为空');
			return false;
		}else if(val.length>maxlen){
			$(obj).next().removeClass().addClass('error').text('不能大于'+maxlen+'字');
			return false;
		}else{
			$(obj).next().removeClass().addClass('right').empty();
			return true;
		}
	};
	// 开始保存
	it.save = function (){
		if(!it.checkForm($('#majorCode_add'))){
			$('#majorCode_add').focus();
			return false;
		}
		if(!it.checkForm($('#majorName_add'))){
			$('#majorName_add').focus();
			return false;
		}
		//var majorCode=[],majorName=[],toSubject=[];
		var majorCode_add = $("#majorCode_add").val();
		var majorName_add = $("#majorName_add").val();
		var toSubject_add = $("#form_subject_add").val();
		params = {
				name : majorName_add,
				code : majorCode_add,
				creater : user['uid'],
				subjectCode : toSubject_add
		}
		var str = Ab.encode(params);

		if((/[\u4e00-\u9fa5]+/).test(majorCode_add)){
			mAlert('层次代码不能为中文');
			return false;
		}

		$.ajax({
			type: "POST",
			data: str,
			dataType:"json",
			url:G_ROOT+'major/create/',
			contentType:'application/json;charset=UTF-8',
			success: function(rs){
				if(rs.returnCode=='000000'){
					var insertId=rs.entity;
					$.fn.nyroModalManual({
						width:400,
						title:"系统提示",
						content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />保存完毕</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_red overlayClose" value="确定" onclick="location=\'setup_2.html\'" /></div>'
					});
					it.getList(1);
				}else if(rs.returnCode=='100000'){
					mAlert("保存失败，数据不允许为空");
				}else if(rs.returnCode=='500004'){
					$.fn.nyroModalManual({
						width:400,
						title:"系统提示",
						content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />'+rs.entity+'已存在</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_red overlayClose" value="确定" onclick="location=\'setup_6.html\'" /></div>'
					});
				}

			}
		});

	}
	it.del=function(){
		var ids=[],codeList=[];
		$.each($('#js_course_tbody').find('input[type="checkbox"]'),function(k,v){
			if($(v)[0].checked==true){
				$(v).parent().parent().remove();
				ids.push($(this).val());
				codeList.push($(this).attr('code'));
			}
		});
		var _tmp={
			idList : ids,
			userId : user['uid'],
			codeList:codeList
		}
		var str = Ab.encode(_tmp);
		$.ajax({
			type: "POST",
			data: str,
			dataType:"json",
			url:G_ROOT+'major/batchdel',
			contentType:'application/json;charset=UTF-8',
			success: function(rs){
				if(rs.returnCode=='000000'){
					setTimeout(function(){
						var insertId=rs.entity;
						$.fn.nyroModalManual({
							width:400,
							title:"系统提示",
							content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />删除成功</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_red overlayClose" value="确定" /></div>'
						});
						$("#chooseAll").children().attr({checked:false});
					},300);
				}else if(rs.returnCode=='600004'){
					mAlert(rs.entity);
				}else{
					setTimeout(function(){
						mAlert("删除失败");
					},300);
				}
				it.getList(G_currPage);
			}
		});

	};
	return it;
})();



$(document).ready(function() {

	// 权限控制
	if(user['uRole']==1){
		$('#th_do,#do_area,#chooseAll').show();
	}else{
		$('#do_area').empty().addClass('th_empty');
	}

	var html_subject='';
	html_subject = '<option value="null">全部</option>';
	for(var i in G_data['subject']){
		html_subject+='<option value="'+i+'">'+G_data['subject'][i]+'</option>'
	}
	$('#form_subject').html(html_subject);

	setMajor.init();

})






