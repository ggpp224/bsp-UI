var queryUrl = '';

var currQueryFlag=0; //查询标识（0默认 1排序查询）

var setSchool=(function(){
	var it={},queryUrl='',params={};
	// 表单
	it.myQuery = function(){
		params = Ab.urlDecode(Ab.serializeForm('schoolSeach'));
		var queryTest='null/null/null/';
		//{code}/{name}/{province}/{pageno}/{pagesize}
		queryUrl='school/query/'
				+(params.schoolcode==''?'null':params.schoolcode)+"/"
				+(params.schoolname==''?'null':params.schoolname)+"/"
				+(params.prov==''?'null':params.prov)+"/"
				+(params.status==''?'null':params.status)+"/"
			;
	};
	// 初始化
	it.init =function(){
		//绑定查询按钮
		$("#Btn_schoolSearch").click(function(){
			it.myQuery();
			it.getList(1);
		});
		// 默认查询
		$("#Btn_schoolSearch").click();
		$('#Btn_doRank').click(function(){
			$(".paixu_1,.paixu_2").slideToggle("fast");
			it.doRank();
		});


		$('#Btn_schoolDel').click(function(){
			var ids=[],codeList=[];
			$('#js_openable_tbody').find('input[type="checkbox"]').each(function(){
				if(this.checked==true){
					ids.push($(this).val());
					codeList.push($(this).attr('code'));
				}
			});
			if(ids.length==0){
				$.fn.nyroModalManual({
					width:400,
					title:"系统提示",
					content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />请选择学校</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_green overlayClose" value="确定"/></div>'
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
	};
	it.getList = function(page){
		if(currQueryFlag==1){
			it.doRank();
			return false;
		}
		page = (page && page>0)?page=page:page=Math.abs(page);
		var url=G_ROOT + encodeURI(queryUrl) + page+'/'+G_perpage;
		$.getJSON(url,function(data){
			var list = data.list;
			if(list){
				var html='';
				$.each(list,function(k,v){
					html+='<tr>';
					if(user['uRole']==1) html+='<td class="first tc"><input type="checkbox" name="checkall"  code="'+v.code+'" class="chk_school" value="'+v.id+'" /></td>';
					html+='<td>'+v.NUM+'</td>';
					html+='<td>'+v.code+'</td>';
					html+='<td>'+v.name+'</td>';
					html+='<td>'+(typeof(G_data['province'][v.province])!='undefined'?G_data['province'][v.province]['proname']:'')+'</td>';
					html+='<td>'+v.createTime+'</td>';
					html+='<td id="txt_'+v.id+'">'+(v.status==1?'<i class="color_gray">已启用</i>':'<i class="color_gray">已停用</i>')+'</td>';
					if(user['uRole']==1) html+='<td><a class="schoolstaus" href="javascript:" status="'+v.id+'##'+v.status+'">'+(v.status==1?'停用':'启用')+'</a></td>';
					html+='</tr>';
				});

				html = throwNull(html);
				$('#js_openable_tbody').html(html);
				$('#pageShow').html(gPage(data.rCount,page,'setSchool.getList'));
				$('.schoolstaus').click(function(){
					var obj=$(this),_tmp=($(this).attr('status')).split("##");
					var id=_tmp[0],status=_tmp[1]==1?2:1;
					var p={
						id : id,
						status : status,
						updater : user['uid']
					};
					var str = Ab.encode(p);
					$.ajax({
						type: "POST",
						data: str,
						dataType:"json",
						url:G_ROOT+'school/updatestatus',
						contentType:'application/json;charset=UTF-8',
						success: function(rs){
							if(rs.returnCode=='000000'){
								obj.attr('status',id+'##'+status).text(_tmp[1]==1?'启用':'停用');
								$('#txt_'+id).html(_tmp[1]==1?'<i class="color_gray">已停用</i>':'<i class="color_gray">已启用</i>');
							}
						}
					});

				})
			}
		});
	};
	it.del=function(){
		var ids=[],codeList=[];
		$.each($('#js_openable_tbody').find('input[type="checkbox"]'),function(k,v){
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
			url:G_ROOT+'school/batchdel',
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
		currQueryFlag=1;
		it.myQuery();
		var url=G_ROOT + encodeURI(queryUrl) + '1/100000';
		$.getJSON(url,function(data){
			var list = data.list;
			if(list){
				var html='';
				$.each(list,function(k,v){
					html+='<tr>';
					html+='<td class="first">'+v.NUM+'</td>';
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
				url:G_ROOT+'school/batchdel',
				contentType:'application/json;charset=UTF-8',
				success: function(rs){
					if(rs.returnCode=='000000'){
						setTimeout(function(){
							var insertId=rs.entity;
							$.fn.nyroModalManual({
								width:400,
								title:"系统提示",
								content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />排序成功</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_red overlayClose" onclick="javascript:void((function(){$(\'.paixu_1,.paixu_2\').slideToggle(\'fast\');})());" value="确定" /></div>'
							});
							$("#chooseAll").children().attr({checked:false});
						},300);
						currQueryFlag=0;
						dataReload();
						it.getList(1);
					}else{
						setTimeout(function(){
							mAlert("操作失败");
						},300);
					}

				}
			});
		})
	}
	return it;
})()


$(document).ready(function() {
	// 权限控制
	if(user['uRole']==1){
		$('#th_do,#do_area,#chooseAll').show();
	}else{
		$('#do_area').empty().addClass('th_empty');
	}

	var htmlProv='<option value="null">全部</option>';
	for(var i in G_data['province']){
		var v=G_data['province'][i];
		htmlProv+='<option value="'+i+'">'+v.proname+'</option>';
	}
	$('#prov').html(htmlProv);

	setSchool.init();

})