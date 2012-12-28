/**
 * @author wl
 * @datetime 2012-5-21
 * @description setup_5.js
 */

var queryUrl='';
var cmb = new ComboxOperate();
var queryTest='';

var setSubject =(function(){
	var it={},queryUrl='',params={};

	it.myQuery = function(){
		params = Ab.urlDecode(Ab.serializeForm('subjectSearch'));
		var queryTest='null/null/null/';
		queryUrl='subject/query/'
				+(params.form_code==''?'null':params.form_code)+"/"
				+(params.form_name==''?'null':params.form_name)+"/"
				+(params.form_status==''?'null':params.form_status)+"/"
		;
	};
	it.init = function(){
		$('#subjectCode_add,#subjectName_add').live('blur',function(){
			it.checkForm(this);
		});

		// 绑定新增按钮
		$('#Btn_add').click(function() {  //学科信息管理查询
			$.fn.nyroModalManual({
				width:500,
				title:"新增",
				content: it.popAdd()
			});
			//绑定保存按钮
			$('#subjectAddSave').click(function(){
				it.save();
				it.getList(1);
			});
			return false;
		});
		//绑定查询按钮
		$("#form_query").click(function(){
			//记录查询条件

			it.myQuery();
			it.getList(1);
		});

		$("#form_query").click();
		$('#Btn_doRank').click(function(){
			it.doRank();
		});


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
					content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />请选择学科</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_green overlayClose" value="确定"/></div>'
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
			  html+='<form id="form_subject_5" name="form_subject_5">';
			  html+='<p><label class="labeltitle"><i class="color_red">学科代码：</i></label><input type="text" id="subjectCode_add" class="half" name="subjectCode" value=""  /></p>';
			  html+='<p><label class="labeltitle"><i class="color_red">学科名称：</i></label><input type="text" id="subjectName_add" class="half" name="subjectName" value=""  /></p>';
			  html+='<p>&nbsp;</p>';
			  html+='<div class="overlay_btn">';
			  html+='<input type="button" id="subjectAddSave" class="btn btn_green" value="保存"/>';
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
					if(user['uRole']==1) html+='<td class="first tc"><input type="checkbox" code="'+v.code+'"  name="checkall" class="chk_grade" value="'+v.id+'" /></td>';
					html+='<td>'+v.NUM+'</td>';
					html+='<td>'+v.code+'</td>';
					html+='<td>'+v.name+'</td>';
					html+='<td>'+v.createTime+'</td>';
					html+='<td id="txt_'+v.id+'">'+(v.status==1?'<i class="color_gray">已启用</i>':'<i class="color_gray">已停用</i>')+'</td>';
					if(user['uRole']==1) html+='<td><a class="subjectstaus" href="javascript:" status="'+v.id+','+v.status+'">'+(v.status==1?'停用':'启用')+'</a></td>';
					html+='</tr>';
				});
				html = throwNull(html);
				$('#js_course_tbody').html(html);
				$('#pageShow').html(gPage(data.rCount,page,'setSubject.getList'));

				$('.subjectstaus').click(function(){
					var obj=$(this),_tmp=($(this).attr('status')).split(",");

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
						url:G_ROOT+'subject/update',
						contentType:'application/json;charset=UTF-8',
						success: function(rs){
							if(rs.returnCode=='000000'){
								obj.attr('status',id+','+status).text(_tmp[1]==1?'启用':'停用');
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
		if(!it.checkForm($('#subjectCode_add'))){
			$('#subjectCode_add').focus();
			return false;
		}
		if(!it.checkForm($('#subjectName_add'))){
			$('#subjectName_add').focus();
			return false;
		}
		//var gradeCode=[],gradeName=[],toSubject=[];
		var subjectCode_add = $("#subjectCode_add").val();
		var subjectName_add = $("#subjectName_add").val();

		params = {
				name : subjectName_add,
				code : subjectCode_add,
				creater : user['uid']
		}
		var str = Ab.encode(params);
		if((/[\u4e00-\u9fa5]+/).test(subjectCode_add)){
			mAlert('层次代码不能为中文');
			return false;
		}
		$.ajax({
			type: "POST",
			data: str,
			dataType:"json",
			url:G_ROOT+'subject/create/',
			contentType:'application/json;charset=UTF-8',
			success: function(rs){
				if(rs.returnCode=='000000'){
					var insertId=rs.entity;
					$.fn.nyroModalManual({
						width:400,
						title:"系统提示",
						content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />保存完毕</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_red overlayClose" value="确定" onclick="location=\'setup_5.html\'" /></div>'
					});
				}else if(rs.returnCode=='500004'){
					$.fn.nyroModalManual({
						width:400,
						title:"系统提示",
						content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />'+rs.entity+'已存在</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_red overlayClose" value="确定" onclick="location=\'setup_5.html\'" /></div>'
					});
				}
				it.getList(1);
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
			url:G_ROOT+'subject/batchdel',
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

	// 排序功能
	it.doRank = function(){
		$(".paixu_1,.paixu_2").slideToggle("fast");
		it.myQuery();
		var url=G_ROOT + encodeURI(queryUrl) + '1/100000';
		$.getJSON(url,function(data){
			var list = data.list;
			if(list){
				var html='';
				$.each(list,function(k,v){
					html+='<tr>';
					html+='<td class="first">'+v.NUM+'</td>';
					html+='<td>'+v.code+'</td>';
					html+='<td>'+v.name+'<input type="hidden" value="'+v.id+'" /></td>';

					html+='</tr>';
				});
				html = throwNull(html);
				$('.paixu_2').find('.openable_tbody').html(html);
			}
			summary.tableRank({serial:true});
		});

		$('#Btn_doRankSave').click(function(){
			var ids=[];
			$('.paixu_2').find('input[type="hidden"]').each(function(){
				ids.push($(this).val());
			})
			var _tmp={
				idList	: ids,
				order	: true,
				userId	: user['uid']
			}
			var str = Ab.encode(_tmp);
			$.ajax({
				type: "POST",
				data: str,
				dataType:"json",
				url:G_ROOT+'subject/batchdel',
				contentType:'application/json;charset=UTF-8',
				success: function(rs){
					if(rs.returnCode=='000000'){
						var insertId=rs.entity;
						$.fn.nyroModalManual({
							width:400,
							title:"系统提示",
							content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />排序成功</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_red overlayClose" onclick="javascript:void((function(){$(\'.paixu_1,.paixu_2\').slideToggle(\'fast\');})());" value="确定" /></div>'
						});
						it.getList(1);
					}
				}
			});
		})
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
	setSubject.init();

})


