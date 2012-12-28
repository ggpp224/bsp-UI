var queryUrl = '';

var setLevel=(function(){
	var it={},queryUrl='',params={},toElem='openable_tbody_chked',chkAll='checkboxall';
	var rCount=0;
	it.init =function(){
		$('#form_code,#form_name').live('blur',function(){
			it.checkForm(this);
		});
		//绑定“添加年级“按钮
		$('#Btn_gradeAdd').click(function() {
			$.fn.nyroModalManual({
				width:600,
				title:"新增",
				content: it.pop()
			});
			$("#Btn_gradeSearch").click();
			return false;
		});

		//绑定查询按钮
		$("#Btn_gradeSearch").live('click',function(){
			params = Ab.urlDecode(Ab.serializeForm('gradeSeach'));
			var queryTest='';
			//queryUrl+=queryTest;
			queryUrl='grade/query/'+(params.gradeCode==''?'null':params.gradeCode)+"/"
					+(params.gradeName==''?'null':params.gradeName)+"/1/"
			;
			$('#js_tablebox,#level_pageShow').empty();
			it.getList(1);
		});
		//绑定“全选“按钮
		$('#checkboxall').click(function(){
			checkAll(this,'chked');
		});
		//绑定删除
		$('#Btn_gradeDel').click(function(){
			if($('#openable_tbody_chked .chked').length==0){
				mAlert('请选择年级');
				return false;
			}
			var html='';
			html+='<div class="overlay_delete_box">';
			html+='<h5 class="red"><img src="images/delete_ico.gif" />删除后将无法恢复，确定要删除吗？</h5>';
			html+='</div>';
			html+='<div class="overlay_btn">';
			html+='<input type="button" id="grade_win_sure" class="btn btn_green overlayClose"  value="确定"/>';
			html+='<input type="button" id="win_cancle" class="btn btn_gray overlayClose" value="取消"/>';
			html+='</div> ';

			$.fn.nyroModalManual({
				width:400,
				title:"系统提示",
				content: html
			});
			//绑定开始删除
			$('#grade_win_sure').click(function(){
				$('#openable_tbody_chked .chked').each(function(){
					if(this.checked==true) $(this).parent().parent().remove();
				})

			})
			return false;
		});

		$('#levelSave').click(function(){
			it.save();
		});

	};
	it.pop = function(){
		var html='<form id="gradeSeach" name="gradeSeach" method="post" action="#">';
			html+='<p><label class="labeltitle">年级代码：</label><input type="text" id="gradeCode" class="half" name="gradeCode" value=""  /></p>';
			html+='<p><label class="labeltitle">年级名称：</label><input type="text" id="gradeName" class="half" name="gradeName" value=""  /></p>';
			html+='<div class="btn_opera"><input type="button" id="Btn_gradeSearch" class="btn btn_gray" value="查询"/></div>';
			html+='<table class="tablebox" id="js_tablebox"></table>';
			html+='<div id="level_pageShow"></div>';
			html+='<div class="overlay_btn"><input type="button" onclick="setLevel.subm()" class="btn btn_green overlayClose" value="确定添加"/> <input type="button" class="btn btn_gray overlayClose" value="关闭"/></div>';
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
			$('#level_pageShow').html(gPage(rCount,page,'setLevel.getList',G_perpage_pop));
		}else{
			$.getJSON(url,function(data){
				var list = data.list;
					rCount=data.rCount;
				var html='<thead id="js_thead_'+page+'" class="table_header js_thead">';
					html+='	<tr>';
					html+='	<th class="first tc" width="4%"><input type="checkbox" id="checkboxall_pop" onclick="checkAll(this,\'levelChk_'+page+'\')"/></th>';
					html+='	<th>年级代码</th>';
					html+='	<th>年级名称</th>';
					html+='	</tr>';
					html+='</thead>';
					html+='<tbody id="js_tbody_'+page+'" class="openable_tbody js_tbody">';
				if(list){
					$.each(list,function(k,v){
						v.id=v.code;
						html+='<tr class="mid'+v.id+'">';
						html+='<td class="first tc"><input type="checkbox"'+($('#'+toElem).find('.mid'+v.id).length>0?' checked':'')+' class="levelChk_'+page+'" name="checkall" value="'+v.id+'" /></td>';
						html+='<td>'+v.code+'</td>';
						html+='<td>'+v.name+'</td>';
						html+='</tr>';
					});
				}
				html+='</tbody>';
				html = throwNull(html);
				$('.js_thead,.js_tbody').hide();
				$('#js_tablebox').append(html);
				$('#level_pageShow').html(gPage(rCount,page,'setLevel.getList'));
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
		if(!it.checkForm($('#form_code'))){
			mAlert('层次代码输入有误');
			$('#form_code').focus();
			return false;
		}
		if(!it.checkForm($('#form_name'))){
			mAlert('层次名称输入有误');
			$('#form_name').focus();
			return false;
		}
		var gradeCodeIds=[];
		$('#'+toElem).find('input[type="checkbox"]').each(function(){
			if($(this)[0].checked==true) gradeCodeIds.push($(this).val());
		});
		var educationLevelCode = $.trim($('#form_code').val());
		var educationLevelName = $.trim($('#form_name').val());
		var arr ={
			educationLevel : {
				code		:	educationLevelCode,
				name		:	educationLevelName,
				creater		:	user['uid']
			},
			gradeCode	:	gradeCodeIds
		};
		if((/[\u4e00-\u9fa5]+/).test(educationLevelCode)){
			mAlert('层次代码不能为中文');
			return false;
		}
		var str = Ab.encode(arr);

		$.ajax({
			type: "POST",
			data: str,
			dataType:"json",
			url:G_ROOT+'educationlevel/saveeducationlevel',
			contentType:'application/json;charset=UTF-8',
			success: function(rs){
				if(rs.returnCode=='000000'){
					var insertId=rs.entity;
					$.fn.nyroModalManual({
						width:400,
						title:"系统提示",
						content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />保存完毕</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_red " value="确定" onclick="location=\'setup_3.html\'" /></div>'
					});
				}else if(rs.returnCode=='100000'){
					$.fn.nyroModalManual({
						width:400,
						title:"系统提示",
						content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />保存失败，数据不允许为空</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_red " value="确定" onclick="location=\'setup_3_add.html\'" /></div>'
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

	setLevel.init();

})