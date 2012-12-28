var queryUrl = '';



var setMajor=(function(){
	var it={},queryUrl='',params={},toElem='openable_tbody_chked',chkAll='checkboxall',rCount=0;
	it.init =function(){
		$('#form_schoolcode,#form_schoolname').live('blur',function(){
			it.checkForm(this);
		});
		//绑定“添加专业“按钮
		$('#Btn_majorAdd').click(function() {
			$.fn.nyroModalManual({
				width:600,
				height:450,
				title:"新增",
				content: it.pop()
			});
			$("#Btn_majorSearch").click();
			return false;
		});

		//绑定查询按钮

		$("#Btn_majorSearch").live('click',function(){
			params = Ab.urlDecode(Ab.serializeForm('majorSeach'));
			var queryTest='';
			//queryUrl+=queryTest;
			queryUrl='major/query/'+(params.majorcode==''?'null':params.majorcode)+"/"
					+(params.majorname==''?'null':params.majorname)+"/"
					+(params.subjectcode==''?'null':params.subjectcode)+"/1/"
				;
			$('#js_tablebox,#major_pageShow').empty();
			it.getList(1);
		});
		//绑定“全选“按钮
		$('#checkboxall').click(function(){
			checkAll(this,'chked');
		});
		//绑定删除
		$('#Btn_majorDel').click(function(e){
			if($('#openable_tbody_chked .chked').length==0){
				mAlert('请选择专业');
				return false;
			}
			var html='';
			html+='<div class="overlay_delete_box">';
			html+='<h5 class="red"><img src="images/delete_ico.gif" />删除后将无法恢复，确定要删除吗？</h5>';
			html+='</div>';
			html+='<div class="overlay_btn">';
			html+='<input type="button" id="major_win_sure" class="btn btn_green overlayClose"  value="确定"/>';
			html+='<input type="button" id="win_cancle" class="btn btn_gray overlayClose" value="取消"/>';
			html+='</div> ';

			e.preventDefault();
			$.fn.nyroModalManual({
				width:400,
				title:"系统提示",
				content: html
			});
			//绑定开始删除
			$('#major_win_sure').click(function(){
				$('#openable_tbody_chked .chked').each(function(){
					if(this.checked==true) $(this).parent().parent().remove();
				})

			})
			return false;
		});


		// 默认学分单价 修改
		$('#fenPrice a').click(function(e){
			var html='';
			html+='<div class="overlay_delete_box">';
			html+='<div id=""><label>默认学分单价</label> <input type="text" name="" id="fenPrice_inp" value="" /></div>';
			html+='</div>';
			html+='<div class="overlay_btn">';
			html+='<input type="button" id="fenPrice_win_sure" class="btn btn_green" value="确定"/>';
			html+='<input type="button" id="win_cancle" class="btn btn_gray overlayClose" value="取消"/>';
			html+='<input type="hidden" id="fenPrice_hidden" class="overlayClose"/>';
			html+='</div> ';
			e.preventDefault();
			$.fn.nyroModalManual({
				width:600,
				title:"系统提示",
				content: html
			});
			$('#fenPrice_win_sure').click(function(){
				var v=$.trim($('#fenPrice_inp').val());
				var patrn = /^[1-9]?[0-9]{1,5}(\.[1-9][0-9]*)?$/;
				var s = parseFloat(v);
				if(!patrn.exec(s)){
					alert('请输入正确的学分单价');
				}else{
					$('#fenPrice').find('.fenTxt').text(v);
					$('#fenPrice').find('input').val(v);
					$('#fenPrice_hidden').click();
				}
			})

			$("#fenPrice_inp").bind("blur",function(){
				var patrn = /^[1-9]?[0-9]{1,5}(\.[1-9][0-9]*)?$/;
				var s = parseFloat($("#fenPrice_inp").val());
				if (!patrn.exec(s)){
					$("#fenPrice_inp").after('<span class="price"><img src="images/exclamation.png" style="color:red;line-height:20px;" />请输入正确的学分单价</span>')
					return false;
				}
			});
			$("#fenPrice_inp").bind("focus",function(){
					$("span").remove('.price')
					return false;
			});
		});

		$('#schoolSave').click(function(){
			it.save();
		});

	};
	it.pop = function(){
		var html_subject='<option value="null">全部</option>';
		for(var i in G_data['subject']){
			html_subject+='<option value="'+i+'">'+G_data['subject'][i]+'</option>';
		}
		var html='<form id="majorSeach" name="majorSeach" method="post" action="#">';
			html+='<p><label class="labeltitle">专业代码：</label><input type="text" id="majorcode" class="half" name="majorcode" value=""  /></p>';
			html+='<p><label class="labeltitle">专业名称：</label><input type="text" id="majorname" class="half" name="majorname" value=""  /></p>';
			html+='<p><label class="labeltitle">所属学科：</label><select name="subjectcode">'+html_subject+'</select></p>';
			html+='<div class="btn_opera"><input type="button" id="Btn_majorSearch" class="btn btn_gray" value="查询"/></div>';
			html+='<table class="tablebox" id="js_tablebox"></table>';
			html+='<div id="major_pageShow"></div>';
			html+='<div class="overlay_btn"><input type="button" onclick="setMajor.subm()" class="btn btn_green overlayClose" value="确定添加"/> <input type="button" class="btn btn_gray overlayClose" value="关闭"/></div>';
			html+='</form>';
		return html;
	};

	it.getList = function(page){
		page = (page && page>0)?page=page:page=Math.abs(page);
		var url=G_ROOT + encodeURI(queryUrl) + page+'/'+G_perpage_pop;

		if($('#js_thead_'+page).length>0){
			$('.js_thead,.js_tbody').hide();
			$('#js_thead_'+page).show();
			$('#js_tbody_'+page).show();
			$('#major_pageShow').html(gPage(rCount,page,'setMajor.getList',G_perpage_pop));
		}else{
			$.getJSON(url,function(data){
				rCount=data.rCount;
				var list = data.list;
				var html='<thead id="js_thead_'+page+'" class="table_header js_thead">';
					html+='	<tr>';
					html+='	<th class="first tc" width="4%"><input type="checkbox" id="checkboxall_pop" onclick="checkAll(this,\'majorChk_'+page+'\')"/></th>';
					html+='	<th>专业代码</th>';
					html+='	<th>专业名称</th>';
					html+='	<th>所属学科</th>';
					html+='	</tr>';
					html+='</thead>';
					html+='<tbody id="js_tbody_'+page+'" class="openable_tbody js_tbody">';
				if(list){
					$.each(list,function(k,v){
						html+='<tr class="mid'+v.id+'">';
						html+='<td class="first tc"><input type="checkbox"'+($('#'+toElem).find('.mid'+v.id).length>0?' checked':'')+' class="majorChk_'+page+'" name="checkall" value="'+v.code+'" /></td>';
						html+='<td>'+v.code+'</td>';
						html+='<td>'+v.name+'</td>';
						html+='<td class="subject">'+G_data['subject'][v.subjectCode]+'</td>';
						html+='</tr>';
					});
				}
				html+='</tbody>';
				html = throwNull(html);
				$('.js_thead,.js_tbody').hide();
				$('#js_tablebox').append(html);
				$('#major_pageShow').html(gPage(data.rCount,page,'setMajor.getList',G_perpage_pop));
				patch();
			});
		}
	};

	it.subm = function(){
		$('.js_tbody').find('input[type="checkbox"]').each(function(){
			if(this.checked==true){
				$('#'+toElem).find('.mid'+this.value).remove();
				var aa=$(this).parent().parent().prependTo('#'+toElem).find('.subject').remove();
				$('#'+toElem).find('input[type="checkbox"]').removeClass().addClass('chked');
			}else{
				$('#'+toElem).find('.mid'+this.value).remove();
			}
		});
	};
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
	it.save = function(){
		if(!it.checkForm($('#form_schoolcode'))){
			mAlert('学校代码输入有误');
			$('#form_schoolcode').focus();
			return false;
		}
		if(!it.checkForm($('#form_schoolname'))){
			mAlert('学校名称输入有误');
			$('#form_schoolname').focus();
			return false;
		}

		var majorCodeIds=[];
		$('#'+toElem).find('input[type="checkbox"]').each(function(){
			majorCodeIds.push($(this).val());
		});
		if(majorCodeIds.length==0){
			mAlert('请选择专业');
			return false;
		}

		var form_code=$.trim($('#form_schoolcode').val());
		var form_name=$.trim($('#form_schoolname').val());
		var form_province=$('#form_province').val();

		var arr ={
			school : {	code		:	form_code,
						name		:	form_name,
						province	:	form_province,
						creater		:	user['uid']
					},
			majorCode	:	majorCodeIds
		};

		if((/[\u4e00-\u9fa5]+/).test(form_code)){
			mAlert('学校代码不能为中文');
			return false;
		}

		var str = Ab.encode(arr);
		$.ajax({
			type: "POST",
			data: str,
			dataType:"json",
			url:G_ROOT+'school/saveschool',
			contentType:'application/json;charset=UTF-8',
			success: function(rs){
				if(rs.returnCode=='000000'){
					dataReload();
					var insertId=rs.entity;
					$.fn.nyroModalManual({
						width:400,
						title:"系统提示",
						content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />保存完毕</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_red overlayClose" value="确定" onclick="location=\'setup_1.html\'" /></div>'
					});
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


	return it;
})()


$(document).ready(function() {

	var htmlProv='';
	for(var i in G_data['province']){
		var v=G_data['province'][i];
		htmlProv+='<option value="'+i+'">'+v.proname+'</option>';
	}
	$('#form_province').html(htmlProv);
	setMajor.init();

})