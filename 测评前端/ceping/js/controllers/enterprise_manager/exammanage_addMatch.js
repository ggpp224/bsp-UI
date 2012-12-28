/**
 * @author xzy
 * @datetime 2012-8-9
 * @description exammanage_addMatch.js
 */

require(['jquery','ambow','jcookie','jstree','userjs','nyroModal','ListView','dxtree'],function(){


$(document).ready(function() {

	$('#js_pop_save_btn').die().live('click',function(){
		var str=$('#js_pop_batch_add').val();
		if(str.length>0){
			var _tr=$("#tablelist tr");
			var _arr=str.split("\n");
			for(var i in _arr){
				var v=$.trim(_arr[i]);
				if(v){
				// 改這的時候，上面還有一行
				$("#tablelist1").append('<tr><td class="first tc "><b></b><input class="default_txt js_subject" type="text" size="40" value="'+v+'" /><a href="#" class="textedit addQuestions" title="高级内容编辑器"></a><a class="deledit" id="delcustomer" href="javascript:"></a></td><td><input class="default_txt js_rank" type="text" size="3" value="" /></td></tr>');
				var k=1;
				$("#tablelist1").find('b').each(function(){
					$(this).text((k++)+'：');
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
			width:400,
			title:"批量增加选项",
			url: 'overlay_exammanage_addmore.shtml'
		});

		return false;
	 });
	 //  序号验证
	 $('.js_rank').blur(function(){
			var v=$.trim($(this).val());
			if(v==''){
				alert('序号不能为空');
				$(this).focus();
				js_rank=false;
				return;
			}else if(isNaN(v)){
				alert('序号必须是数字');
				$(this).val('').focus();
				js_rank=false;
				return;
			}
	})


    //删除
	$('#delcustomer').click(function(e) {
			e.preventDefault();
			$.fn.nyroModalManual({
			    width:380,
				url: 'overlay_delsector.shtml',
				title:'系统提示'
			});
			return false;
	 });




	  var tpl = new Ambow.XTemplate(

		'<form method="post" name="add_form" id="add_form" action="#"><table width="800" border="0" align="center" cellpadding="2" cellspacing="2" >',
		/*'<tr>',
		'<td width="80" height="30" align="right"><i>* </i>试题编号：</td>',
		'<td colspan="2"> <input type="text" class="default_txt" value="SHITIBIANHAO" name="id" size="30" /></td>',
		'</tr>',*/
		'<tr>',
		'<td height="30" align="right" style="width:11%;"><i>*</i>  所属知识点：</td>',
		'<td colspan="2"><input type="hidden" class="js_input_knowledge" name="categoryCode" value="" ><input type="text" class="default_txt input_wait" value="" disabled name="categoryCode_txt" size="30" style="width:230px;"/> <input type="button" name="" class="btn btn_other departments"  value="选择" /></td>',
		'</tr>',
		'<tr>',
		'<td height="30" align="right"><i>*</i> 选择类型：</td>',
		'<td colspan="2" id="js_topicTypeSelect" valign="top"></td>',
		'</tr>',
		'<tr>',
		'<td align="right" valign="top"><i>*</i>&nbsp;难度：</td>',
		'<td colspan="2" id="js_topicDifficulty"></td>',
		'</tr>',
		'<tr>',
		'<td align="right" valign="top"><i>*</i> 题干：</td>',
		//'<td><div class="webtextdiv"><a href="" class="textedit ico_float addQuestions" title="高级内容编辑器" alt=""></a><textarea name="topicContent" class="textarea tarea" cols="100" rows="5"  onfocus="if(this.value==\'请输入题干....\')this.value=\'\';" onblur="if(this.value==\'\')this.value=\'请输入题干....\';">输入题干：</textarea></div></td>',
		//'<td width="1"><textarea class="tarea" name="topicContent" cols="100" rows="6" onfocus="if(this.value==\'请输入题干....\')this.value=\'\';" onblur="if(this.value==\'\')this.value=\'请输入题干....\';">请输入题干....</textarea></td>',
		'<td><div class="webtextdiv"><a alt="" title="高级内容编辑器" class="textedit ico_float addQuestions" href=""></a><textarea onblur="if(this.value==\'\')this.value=\'请输入题干....\';" onfocus="if(this.value==\'请输入题干....\')this.value=\'\';" rows="5" cols="100" class="textarea tarea" name="topicContent">请输入题干....</textarea></div></td>',
		//'<td valign="top"><a href="" class="textedit addQuestions" title="高级内容编辑器" alt="" ></a></td>',
		'</tr>',
		'<tr>',
		'<td align="right"><!--<i>*</i> 选项：--></td>',
		'<td colspan="2"><!--<input type="button" name="" class="btn btn_other addmore"  value="批量增加选项" />-->',

		'</td>',
		'</tr>',
		'<tr>',
		'<td align="right">&nbsp;</td>',
		'<td colspan="2" class="exammanage_NodeSelect">',

		'<div class="exammanage_input" style="width:305px; float: left;">',
		'<table width="600" class="tablebox" id="tablelist">',
		'<thead class="table_header">',
		'<tr>',
		'<td colspan="3" class="first tc">前提项</td>',
		'</tr>',
		'</thead>',
		'<tbody class="openable_tbody">',
		'<tr><td class="first tc"><b><span serNO="1">1</span> ：</b><input type="text" class="default_txt js_subject" flag="1" size="35" /><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a></td></tr>',

		'<!-- 这里留空 -->',
		'</tbody>',
		'</table>',
		'<div class="span_ico_a"><a href="#a" id="add_table" class="addedit"></a></div>',
		'</div>',

		'<div class="exammanage_input" style="width:400px; float: right;">',
		'<table width="100%" class="tablebox" id="tablelist1">',
		'<thead class="table_header">',
		'<tr>',
		'<td class="first tc">反应项</td>',
		'<td class="first tc">序号</td>',
		'</tr>',
		'</thead>',
		'<tbody class="openable_tbody">',
		'<tr><td class="first tc"><b><span serNO="1">1</span> ：</b><input type="text" class="default_txt js_subject" flag="2" size="40"/><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a></td><td width="1"><input type="text" class="default_txt js_rank" value="" size="3"  /></td></tr>',

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
		'<input name="" type="button" class="btn btn_submit" id="js_btn_save" value="保存" />',
		'<input name="" type="button" class="btn btn_reset" id="js_btn_back" value="取消" style="margin:0 2px"/>',
		//'<input name="" type="button" class="btn btn_submit"  onclick="location.href=\'exammanage_addQuestions_Preview.shtml\';" value="预览" />',
		'<input name="" type="button" class="btn btn_submit"  id="js_btn_next" value="继续下一题" />',

		'</td>',
		'</tr>',
		'</table></form>'
		);
		$('#exammanage_box,#js_exammanage_box').empty();
		tpl.append(document.getElementById('exammanage_box'));
		$('#js_topicTypeSelect').html(Tiku.topicTypeSelect(4));
		$('#js_topicDifficulty').html(Tiku.topicDifficulty_select("0.5"));//难度值

		checking.checkcategoryCode_b();
		//checking.topicDifficulty_b();
		checking.checktopicContent_b();
		checking.checkoptionContent_b();
		checking.checkoptionContent_sort_b();
		checking.checkorderNum_b();


		// 绑定知识点功能
		Tiku.knowledge();

		$('#js_btn_save,#js_btn_next').die().live('click',function(){
			var _id=$(this).attr('id');
			if(!checking.checkcategoryCode()) return false; //判断知识点不能为空
			//if(!checking.topicDifficulty()) return false;//判断难度系数输入是否正确
			if(!checking.checktopicContent()) return false; //题干验证
			if(!checking.checkoptionContent()) return false;//验证试题内容


			var num_left=$('#tablelist').find('.js_subject').length;
			var num_right=$('#tablelist1').find('.js_subject').length;
			if(num_right<num_left){
				alert('反应项不能比前提项少');
				return false;
			}


			var params = Ambow.urlDecode(Ambow.serializeForm('add_form'));
			var sub=[],k=0,questionsCheck=true;
			$('#exammanage_box').find('.js_subject').each(function(){
				var _arr={};
				_arr.id=0;
				if($(this).attr("flag")==1){
				_arr.optionOrder = $(this).siblings().eq(0).children(0).attr("serno");
				_arr.iscorrect=1;
				}else if($(this).attr("flag")==2){
				_arr.optionOrder=$(this).parent().next().find('input[type="text"]').val();
				_arr.iscorrect=0;
				}

				var _content=$(this).val();

				if(_content.length<1){
					alert('前提项或反应项内容不能为空！');
					$(this).focus();
					questionsCheck = false;
					return false;
				}
				 sub.push(_arr);
				_arr.optionContent=_content;
			});
			if(questionsCheck == false){
				return false;
			}

			var js_rank=true;
			$('.js_rank').each(function(){
				var v=$.trim($(this).val());
				if(v==''){
					alert('序号不能为空');
					$(this).focus();
					js_rank=false;
					return false;
				}else if(isNaN(v)){
					alert('序号必须是数字');
					$(this).val('').focus();
					js_rank=false;
					return false;
				}else{

					if(v > $('#tablelist .js_subject').length || v==0){
						alert('序号不能大于前提项个数');
						$(this).val('').focus();
						js_rank=false;
						return false;
					}
				}

			})
			if(!js_rank) return false;
			params.topicAnswerList=sub;
			params.creatorId = G_USER['id'];//创建人id
			params.companyId = G_COMPANYID;

			delete(params.categoryCode_txt);
			delete(params.optionContent);
			delete(params.id);

			topicTypeId = params.topicTypeId;
			var str = Ambow.encode(params);

			$.ajax({
				type: 'POST',
				data:str,
				dataType: 'json',
				url:G_URL['addtopic'],
				contentType:'application/json;charset=UTF-8',
				success:function(data){
					if(data.returnCode=='000000'){
						 if(typeof(addType)=='undefined'){
						alert('试题新增'+data.returnMsg);
						if(_id=='js_btn_next') {
							window.location.href="exammanage_addMatch.shtml";
						}else{
							window.location.href = "exammanage.shtml";
							//window.location.href="exammanage_addMatch_edit.shtml?id="+data.entity+'&topicTypeId='+topicTypeId;
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
									input_select_change('examinationpaper_list_input_pipei.html');
								}else{
									$('#js_btn_back').click();
								}
							});
						}

				}else{
						alert(data.returnMsg);
					}
				}
			});
		});


	//增加行（前置项）
	$("#add_table").die().live('click',function(){
			var _tr=$("#tablelist1 tr");
			// 改這的時候，上面還有一行
			$("#tablelist").append('<tr><td class="first tc "><b></b><input class="default_txt js_subject js_subject" flag="1" type="text" size="35" value="" /><a href="#" class="textedit addQuestions" title="高级内容编辑器"></a><a class="deledit" id="delcustomer" href="javascript:"></a></td></tr>');
			var k=1;
			$("#tablelist").find('b').each(function(){
				$(this).html('<span serNo="'+(k)+'">'+(k++)+'</span>：');
			});
	})


	//增加行（反应项）
	$("#add_table1").die().live('click',function(){
			var _tr=$("#tablelist1 tr");
			// 改這的時候，上面還有一行
			$("#tablelist1").append('<tr><td class="first tc "><b></b><input class="default_txt js_subject js_subject" flag="2" type="text" size="40" value="" /><a href="#" class="textedit addQuestions" title="高级内容编辑器"></a><a class="deledit" id="delcustomer" href="javascript:"></a></td><td><input class="default_txt js_rank" type="text" size="3" value=""  /></td></tr>');
			var l=1;
			$("#tablelist1").find('b').each(function(){
				$(this).html('<span serNo="'+(l)+'">'+(l++)+'</span>：');
			});
	})

	// 删除行
	$('.deledit').die().live('click',function(){
		$(this).parent().parent().remove();
		var k=1;
		$("#tablelist1").find('b').each(function(){
			$(this).html('<span serNo="'+(k)+'">'+(k++)+'</span>：');
		});
	})

});
});
