/**
 * @author xzy
 * @datetime 2012-8-13
 * @description exammanage_addSort_edit.js
 */

require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','ListView','dxtree'],function(){
$(document).ready(function() {
	//设置全局变量
	var id = getQuery('id');
	var topicTypeId = getQuery('topicTypeId');

    //加载data数据
    var id = Tiku.getQuery('id');
    var getList = function() {
        url = G_URL['findtopicbyid'] + '?id=' + id + '&callback=?';
        $.getJSON(url,
        function(data) {
            var list = data.list;
            var tpl = new Ambow.XTemplate(

            '<form method="post" name="add_form" id="add_form" action="#"><table width="800" border="0" align="center" cellpadding="2" cellspacing="2" >',
            '<tr>',
            /*'<td width="80" height="30" align="right"><i>* </i>试题编号：</td>',
			'<td colspan="2"> <input type="text" class="default_txt" value="SHITIBIANHAO" name="id" size="30" /></td>',
			'</tr>',*/
            '<tr>',
            '<td height="30" align="right"><i>*</i>  所属知识点：</td>',
            '<td colspan="2"><input type="hidden" class="js_input_knowledge" name="categoryCode" value="" ><input type="text" class="default_txt input_wait" value="" disabled name="categoryCode_txt" size="30" style="width:230px;"/> <input type="button" name="" class="btn btn_other departments"  value="选择" /></td>',

            '</tr>',
            '<tr>',
            '<td height="30" align="right" valign="top"><i>*</i> 选择类型：</td>',
            '<td colspan="2" id="js_topicTypeSelect"></td>',
            '</tr>',
            '<tr>',
            '<td align="right" valign="top"><i>*</i> 难度：</td>',
			'<td colspan="2" id="js_topicDifficulty"></td>',
			'</tr>',
            '<tr>',
            '<td rowspan="2" align="right" valign="top"><i>*</i> 题干：</td>',
            '<td width="1" rowspan="2"><textarea class="tarea" name="topicContent" cols="100" rows="6">{topicContent}</textarea></td>',
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
			'<div class="exammanage_input" style="width:400px; ">',
			'<table width="100%" class="tablebox" id="tablelist1">',
			'<thead class="table_header">',
			'<tr>',
			'<td class="first tc">待排序项目</td>',
			'<td class="first tc">序号</td>',
			'</tr>',
			'</thead>',
			'<tbody class="openable_tbody">',
			'<tpl for="topicAnswerList">',
			'<tr><td class="first tc"><b>1 ：</b><input type="text" class="default_txt js_subject" size="40" name="optionContent" value="{optionContent}" /><a href="" class="textedit addQuestions" title="高级内容编辑器" alt=""></a></td><td width="1"><input type="text" name="orderNum" class="default_txt js_rank" size="3" value="{optionOrder}" name="optionOrder"  /></td></tr>',
			'</tpl>',
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
            '<input name="" type="button" class="btn btn_submit"  value="保存" id="js_btn_save" />',
            '<input name="" type="button" class="btn btn_reset"  onclick="history.back()" value="返回" style="margin:0 2px" />',
            '<input name="" type="button" class="btn btn_submit"  id="preview" value="预览" />',
            //'<input name="" type="button" class="btn btn_submit"  onclick="location.href=\'exammanage_addQuestions.shtml\';" value="继续下一题" />',

            '</td>',
            '</tr>',
            '</table></form>'
            );

            tpl.append(document.getElementById('exammanage_box'), list[0]);
            $('#js_topicTypeSelect').html(Tiku.topicTypeSelect(5,true));
			$('#js_topicDifficulty').html(Tiku.topicDifficulty_select(list[0].topicDifficulty));//难度值
			var els = Dom('add_form').elements;
			var knowledges = list[0].knowlNameList,
				text=[],ids=[];
			for(var i=0,len=knowledges.length;i<len;i++){
				var rec=knowledges[i];
				ids.push(rec.id);
				text.push(rec.knowlName);
			}

			els.categoryCode_txt.value=text.join(',');
			els.categoryCode.value=ids.join(',');

			// 绑定知识点功能
			Tiku.knowledge('edit');
        });
    }
		checking.checkcategoryCode_b();
		//checking.topicDifficulty_b();
		//checking.checktopicContent_b();
		checking.checkoptionContent_sort_b();
		checking.checkorderNum_b();
		 var data = getList();


    $('#js_btn_save').live('click',function() {
        var _id=$(this).attr('id');
            if(!checking.checkcategoryCode()) return false; //判断知识点不能为空
			//if(!checking.topicDifficulty()) return false;//判断难度系数输入是否正确
			//if(!checking.checktopicContent()) return false; //题干验证
			if(!checking.checkoptionContent_sort()) return false;//验证试题内容
            if(!checking.checkorderNum()) return false;//验证序号
            //判断难度系数输入是否正确
                var params = Ambow.urlDecode(Ambow.serializeForm('add_form'));
                var sub = [],
                k = 0,
                questionsCheck = true;
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
			params.id = id;
			topicTypeId = params.topicTypeId;
			delete(params.optionContent);
			delete(params.categoryCode_txt);
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
                    url: G_URL['updatetopic'],
                    contentType: 'application/json;charset=UTF-8',
					success:function(data){
						if(data.returnCode=='000000'){
							if(_id=="js_btn_save"){
								alert(data.returnMsg);
								window.location.href="exammanage.shtml";
							}//else{
								//window.location.href='preview.shtml?id='+id+'&topicTypeId='+topicTypeId
							//}

						}else{
							alert(data.returnMsg);
						}
					}

                });

            });
           //增加行
		$("#add_table1").live('click',
		function() {
			var _tr = $("#tablelist1 tr");
			// 改這的時候，上面還有一行
			$("#tablelist1").append('<tr><td class="first tc "><b></b><input class="default_txt js_subject" type="text" size="40" name="optionContent" /><a href="#" class="textedit addQuestions" title="高级内容编辑器"></a><a class="deledit" id="delcustomer" href="javascript:"></a></td><td><input class="default_txt js_rank" type="text" size="3" name="orderNum" value="" /></td></tr>');
			var k = 1;
			$("#tablelist1").find('b').each(function() {
				$(this).text((k++) + '：');

			});

		})
		// 删除行
		$('.deledit').live('click',function() {
			$(this).parent().parent().remove();
			var k = 1;
			$("#tablelist1").find('b').each(function() {
				$(this).text((k++) + '：');
			});
		})
		//预览
		$('#preview').live('click',function(){
			window.open('preview.shtml?id='+id+'&topicTypeId='+topicTypeId);
		});
    });
 });

