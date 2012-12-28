/**
 * @author xzy
 * @datetime 2012-8-9
 * @description exammanage_addSort.js
 */

require(['jquery', 'ambow', 'jcookie', 'jstree', 'userjs','nyroModal','ListView','dxtree'],function() {
$(document).ready(function() {


	// 批量添加
	 $('#js_pop_save_btn').die().live('click',function(){
		var str = $('#js_pop_batch_add').val();
		if (str.length > 0) {
			var _tr = $("#tablelist tr");
			var _arr = str.split("\n");
			for (var i in _arr) {
				var v = $.trim(_arr[i]);
				if (v) {
					// 改這的時候，上面還有一行
					$("#tablelist1").append('<tr><td class="first tc "><b></b><input class="default_txt js_subject" type="text" size="40" name="optionContent" value="' + v + '" /><a href="#" class="textedit addQuestions" title="高级内容编辑器"></a><a class="deledit" id="delcustomer" href="javascript:"></a></td><td><input class="default_txt js_rank" type="text" size="3" name="orderNum" /></td></tr>');
					var k = 1;
					$("#tablelist1").find('b').each(function() {
						$(this).text((k++) + '：');
					});
				}
			}
		}
		$('#js_pop_cancel_btn').click();
	});
	// 批量增加选项
	$('.addmore').click(function(e) {
		e.preventDefault();
		$.fn.nyroModalManual({
			width: 400,
			title: "批量增加选项",
			url: 'overlay_exammanage_addmore.shtml'

		});
		return false;
	});


    var tpl = new Ambow.XTemplate(
    		 '<form method="post" name="add_form" id="add_form" action="#"><table width="800" border="0" align="center" cellpadding="2" cellspacing="2" >',
    		    '<tr>',
    		    '<td height="30" align="right"><i>*</i>  所属知识点：</td>',
    		    '<td colspan="2"><input type="hidden" class="js_input_knowledge" name="categoryCode" value="" ><input type="text" class="default_txt input_wait" value="" disabled name="categoryCode_txt" size="30" style="width:230px;"/> <input type="button" name="" class="btn btn_other departments"  value="选择" /></td>',
    		    '</tr>',
    		    '<tr>',
    		    '<td height="30" align="right"><i>*</i> 选择类型：</td>',
    		    '<td colspan="2" id="js_topicTypeSelect"></td>',
    		    '</tr>',
    		    '<tr>',
    		    '<td align="right" valign="top"><i>*</i> 难度：</td>',
				'<td colspan="2" id="js_topicDifficulty"></td>',
				'</tr>',
    		    '<tr>',
    		    '<td align="right" valign="top"><i>*</i> 题干：</td>',
    		    '<td width="1" ><textarea class="tarea" name="topicContent" cols="100" rows="6" style="*width:547px;" onfocus="if(this.value==\'请输入题干....\')this.value=\'\';" onblur="if(this.value==\'\')this.value=\'请输入题干....\';">请输入题干....</textarea></td>',
    		    '<td height="1" valign="top"><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a></td>',
    		    '</tr>',
    		    '<tr>',
    		    '<td valign="top"> <a href="#" class="cont"></a></td>',
    		    '</tr>',
    		    '<tr>',
    		    '<td align="right"><!--<i>*</i> 选项：--></td>',
    		    '<td colspan="2"><!--<input type="button" name="" class="btn btn_other addmore"  value="批量增加选项" />-->',

    		    '</td>',
    		    '</tr>',
    		    '<tr>',
    		    '<td align="right">&nbsp;</td>',
    		    '<td colspan="2" class="exammanage_NodeSelect">',

    		    '<div class="exammanage_input" style="width:400px;*width:400px; ">',
    		    '<table width="100%" class="tablebox" id="tablelist1">',
    		    '<thead class="table_header">',
    		    '<tr>',
    		    '<td class="first tc">待排序项目</td>',
    		    '<td class="first tc">序号</td>',
    		    '</tr>',
    		    '</thead>',
    		    '<tbody class="openable_tbody">',
    		    '<tr><td class="first tc"><b>1 ：</b><input type="text" class="default_txt js_subject" size="40" name="optionContent" /><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a></td><td width="1"><input type="text" name="orderNum" class="default_txt js_rank" size="3" /></td></tr>',

    		    '</tbody>',
    		    '</table>',
    		    '<div class="span_ico_a" style="right:70px;"><a href="#a" id="add_table1" class="addedit"></a></div>',
    		    '</div>',
    		    '<div class="clear"></div>',

    		    '</td>',
    		    '</tr>',
    		    '<tr>',
    		    '<td align="center">&nbsp;</td>',
    		    '<td colspan="2">',
    		    '<input name="" type="button" class="btn btn_submit"  value="保存" id="js_btn_save"  />',
    		    '<input name="" type="button" class="btn btn_reset" id="js_btn_back" value="返回" style="margin:0 2px" />',
    		    //'<input name="" type="button" class="btn btn_submit"  onclick="location.href=\'exammanage_addQuestions_Preview.shtml\';" value="预览" />',
    		    '<input name="" type="button" class="btn btn_submit" id="js_btn_next" value="继续下一题" />',
    		    '</td>',
    		    '</tr>',
    		    '</table></form>'
    );
	$('#exammanage_box,#js_exammanage_box').empty();
    tpl.append(document.getElementById('exammanage_box'));
    $('#js_topicTypeSelect').html(Tiku.topicTypeSelect(5));
	$('#js_topicDifficulty').html(Tiku.topicDifficulty_select("0.5"));//难度值

		checking.checkcategoryCode_b();
		//checking.topicDifficulty_b();
		//checking.checktopicContent_b();
		checking.checkoptionContent_b();
		checking.checkoptionContent_sort_b();
		checking.checkorderNum_b();


		// 绑定知识点功能
		Tiku.knowledge();
        $('#js_btn_save,#js_btn_next').die().live('click',function() {
			var _id=$(this).attr('id');
            if(!checking.checkcategoryCode()) return false; //判断知识点不能为空
			//if(!checking.topicDifficulty()) return false;//判断难度系数输入是否正确
			//if(!checking.checktopicContent()) return false; //题干验证
			if(!checking.checkoptionContent_sort()) return false;//验证试题内容
            if(!checking.checkorderNum()) return false;//验证序号
            //判断难度系数输入是否正确

			var params = Ambow.urlDecode(Ambow.serializeForm('add_form'));
			var sub = [], k = 0;
			$('#tablelist1').find('input[name="optionContent"]').each(function(){

				var _arr={};
				_arr.id='';
				_arr.iscorrect=1;

				_arr.optionOrder=$(this).parent().next().find('input[name="orderNum"]').val();;
				var _content=$.trim($(this).val());
//				if(_content.length<1){
//					alert('选项内容不能为空！');
//					$(this).focus();
//					questionsCheck=false;
//					return false;
//				}
				if(_content){
					_arr.optionContent=_content;
					sub.push(_arr);
				}
			});
			params.topicAnswerList = sub;
			params.creatorId = G_USER['id'];//创建人id
			params.companyId = G_COMPANYID;
			topicTypeId = params.topicTypeId;
			delete(params.optionContent);
			delete(params.categoryCode_txt);
			delete(params.id);
			delete(params.orderNum);
			var str = Ambow.encode(params);

			var back=true;
			$('.js_rank').each(function(){
				var v=parseInt($(this).val());
				if(v > $('.js_subject').length || v == 0){
					alert('序号不能大于选项个数');
					$(this).val('').focus();
					back=false;
					return false;
				}
			})
			if(back==false) return false;

			$.ajax({
				type: 'POST',
				data: str,
				dataType: 'json',
				url: G_URL['addtopic'],
				contentType: 'application/json;charset=UTF-8',
				success: function(data) {
					if (data.returnCode == '000000') {
						if(typeof(addType)=='undefined'){
							alert('试题新增'+data.returnMsg);
							if(_id=='js_btn_next') {
								window.location.href="exammanage_addSort.shtml";
							}else{
								window.location.href = "exammanage.shtml";
								//window.location.href = "exammanage_addSort_edit.shtml?id="+data.entity+'&topicTypeId='+topicTypeId;

							}
						}else{

							alert('试卷试题新增'+data.returnMsg);

							var url = G_URL['findtopicbyid']+'?id='+data.entity+'&callback=?';
							$.getJSON(url,function(data){
								var list = data.list;
								current_topic_data.push(list[0]);
								topic.trigger('add',list);
								if(_id=='js_btn_next'){
									// 继续下一题（重置表单->清空知识点隐藏id-->重新ajax载入页面
									document.add_form.reset();
									$('.js_input_knowledge').val('');
									input_select_change('examinationpaper_list_input_paixu.html');
								}else{
									$('#js_btn_back').click();
								}
							});
						}

					} else {
							alert(data.returnMsg);
						}
					}
			});
		});
		//增加行
		$("#add_table1").die().live('click',function() {
			var _tr = $("#tablelist1 tr");
			// 改這的時候，上面還有一行
			$("#tablelist1").append('<tr><td class="first tc "><b></b><input class="default_txt js_subject" type="text" size="40" name="optionContent" /><a href="#" class="textedit addQuestions" title="高级内容编辑器"></a><a class="deledit" id="delcustomer" href="javascript:"></a></td><td><input class="default_txt js_rank" type="text" size="3" name="orderNum" value="" /></td></tr>');
			var k = 1;
			$("#tablelist1").find('b').each(function() {
				$(this).text((k++) + '：');

			});

		})
		// 删除行
		$('.deledit').die().live('click',function() {
			if($(this).closest("tr").next().attr('class')=='tips'){
				$(this).closest("tr").next().remove();	
			}
			$(this).parent().parent().remove();
			var k = 1;
			$("#tablelist1").find('b').each(function() {
				$(this).text((k++) + '：');
			});
		})

});
});
