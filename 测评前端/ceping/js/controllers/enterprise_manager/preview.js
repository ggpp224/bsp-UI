require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','ListView','WdatePicker','common','drag-drop-custom'],function(){
$(function(){
	//设置全局变量
	var id = getQuery('id');
	var topicTypeId = parseInt(getQuery('topicTypeId'));
	//var id = 218;
	//var topicTypeId = 5;

	//选择试题类型
	var chooseTopic = function(id,topicTypeId){
		switch(topicTypeId){
			case 1: Question(id);
					break;
			case 2:	Multiple(id);
					break;
			case 3: Judgment(id);
					break;
            case 4: match(id);
					break;
			case 5: sort(id);
					break;
			case 6: space(id);
					break;
			case 7: ask(id);
					break;
			case 8: discuss(id);
					break;
		}

	}
	//八种试题类型
	//------单选题
	var Question = function(id){
		$.ajax({
			type:'GET',
			dataType: 'json',
			url: G_URL['findtopicbyid']+'?id='+id+'&callback=?',
			contentType:'application/json;charset=UTF-8',
			success:function(data){
				var list = data.list;
				var answerList = list[0].topicAnswerList;
				var arr = [];
				if(data.returnCode=='000000'){
					var html='';
					html+='<tr>';
					html+='<td width="100" height="13" align="right" valign="top">【单项选择题】：</td>';
					html+='<td><span style="width:600px;overflow:hidden;display:block;">'+list[0].topicContent+'</span></td>';
					html+='</tr>';
					html+='<tr>';
		    		html+='<td align="right">【正确答案】：</td>';
		    		for(var i=0;i<answerList.length;i++){
		    			if(answerList[i].iscorrect==1){
		    				arr.push(String.fromCharCode(65+i));
		    			}
		    		}
		    		html+='<td class="exammanage_text_red"><b>'+arr.join(',');+'</b></td>';
		  			html+='</tr>';
		  			html+='<tr>';
		   		 	html+='<td align="right">&nbsp;</td>';
		   	 		html+='<td class="exammanage_NodeSelect">';
		    		html+='<ul>';
		    		for(var i=0;i<answerList.length;i++){
		    			if(answerList[i].iscorrect==1){
		    				html+='<li><input name="RadioGroup1" type="radio" disabled  value="单选" checked="checked" /> '+String.fromCharCode(65+i)+' ：'+answerList[i].optionContent+'</li>';
		    			}else{
		    				html+='<li><input name="RadioGroup1" type="radio" disabled value="单选" /> '+String.fromCharCode(65+i)+' ：'+answerList[i].optionContent+'</li>';
		    			}
		    		}
		   			html+='</ul>';
		   			html+='</td>';
		  			html+='</tr>';
		  			html+='<tr>';
		   		//	html+='<td colspan="2" align="center"><input name="" type="button" class="btn btn_reset" onclick="window.close();"  value="关闭" /></td>';
					html+='<td colspan="2" align="center"><a href="javascript:" onclick="window.close()"><input name="" type="button" class="btn btn_reset" value="关闭" /></a></td>';
		   			html+='</tr>';
					$('#js_topicContent').html(html);
				}
			}
		});
	}
	//------多选题
	var Multiple = function(id){
			$.ajax({
			type:'GET',
			dataType: 'json',
			url: G_URL['findtopicbyid']+'?id='+id+'&callback=?',
			contentType:'application/json;charset=UTF-8',
			success:function(data){
				var list = data.list;
				var answerList = list[0].topicAnswerList;
				var arr = [];
				if(data.returnCode=='000000'){
					var html='';
					html+='<tr>';
					html+='<td width="200" height="13" align="right" valign="top">【多项选择题】：</td>';
					html+='<td width="660">'+list[0].topicContent+'</td>';
					html+='</tr>';
					html+='<tr>';
		    		html+='<td align="right">【正确答案】：</td>';
		    		for(var i=0;i<answerList.length;i++){
		    			if(answerList[i].iscorrect==1){
		    				arr.push('&nbsp;'+String.fromCharCode(65+i)+'&nbsp;');
		    			}
		    		}
		    		html+='<td class="exammanage_text_red"><b>'+arr.join(',');+'</b></td>';
		  			html+='</tr>';
		  			html+='<tr>';
		   		 	html+='<td align="right">&nbsp;</td>';
		   	 		html+='<td class="exammanage_NodeSelect">';
		    		html+='<ul>';
		    		for(var i=0;i<answerList.length;i++){
		    			if(answerList[i].iscorrect==1){
		    				html+='<li><input name="RadioGroup1" type="checkbox" disabled  value="多选" checked="checked" /> '+String.fromCharCode(65+i)+' ：'+answerList[i].optionContent+'</li>';
		    			}else{
		    				html+='<li><input name="RadioGroup1" type="checkbox" disabled value="多选" /> '+String.fromCharCode(65+i)+' ：'+answerList[i].optionContent+'</li>';
		    			}
		    		}
		   			html+='</ul>';
		   			html+='</td>';
		  			html+='</tr>';
		  			html+='<tr>';
		   		//	html+='<td colspan="2" align="center"><input name="" type="button" class="btn btn_reset" onclick="window.close();"  value="关闭" /></td>';
		   			html+='<td colspan="2" align="center"><a href="javascript:" onclick="window.close()"><input name="" type="button" class="btn btn_reset" value="关闭" /></a></td>';
					html+='</tr>';
					$('#js_topicContent').html(html);
				}
			}
		});
	}
	//------判断题
	var Judgment = function(id){
		$.ajax({
			type:'GET',
			dataType: 'json',
			url: G_URL['findtopicbyid']+'?id='+id+'&callback=?',
			contentType:'application/json;charset=UTF-8',
			success:function(data){
				var list = data.list;
				var answerList = list[0].topicAnswerList;
				var arr = [];
				if(data.returnCode=='000000'){
					var html='';
					html+='<tr>';
					html+='<td width="100" height="13" align="right" valign="top">【判断题】：</td>';
					html+='<td width="660">'+list[0].topicContent+'</td>';
					html+='</tr>';
					html+='<tr>';
					html+='<td align="right">【正确答案】：</td>';
					for(var i=0;i<answerList.length;i++){
						if(answerList[i].iscorrect==1){
							arr.push(String.fromCharCode(65+i));
						}
					}
					html+='<td class="exammanage_text_red"><b>'+arr.join(',');+'</b></td>';
					html+='</tr>';
					html+='<tr>';
					html+='<td align="right">&nbsp;</td>';
					html+='<td class="exammanage_NodeSelect">';
					html+='<ul>';
					for(var i=0;i<answerList.length;i++){
						if(answerList[i].iscorrect==1){
							html+='<li><input name="RadioGroup1" type="radio" disabled  value="单选" checked="checked" /> '+String.fromCharCode(65+i)+' ：'+answerList[i].optionContent+'</li>';
						}else{
							html+='<li><input name="RadioGroup1" type="radio" disabled value="单选" /> '+String.fromCharCode(65+i)+' ：'+answerList[i].optionContent+'</li>';
						}
					}
					html+='</ul>';
					html+='</td>';
					html+='</tr>';
					html+='<tr>';
				//	html+='<td colspan="2" align="center"><input name="" type="button" class="btn btn_reset" onclick="window.close();" value="关闭" /></td>';
					html+='<td colspan="2" align="center"><a href="javascript:" onclick="window.close()"><input name="" type="button" class="btn btn_reset" value="关闭" /></a></td>';
					html+='</tr>';
					$('#js_topicContent').html(html);
				}
			}
		});
	}

	//------匹配题
	var match = function(id){
		$.ajax({
			type:'GET',
			dataType: 'json',
			url: G_URL['findtopicbyid']+'?id='+id+'&callback=?',
			contentType:'application/json;charset=UTF-8',
			success:function(data){

					if(data.returnCode=='000000'){
						var list = data.list[0],html='';
						var answerList = list.topicAnswerList;
						var arr = [];
						//html +=	'<table width="800" border="0" align="center" cellpadding="2" cellspacing="2" >'+
								html+='<tr>'+
								'<td width="100" height="5" align="right" valign="top">【匹配题】：</td>'+
								'<td width="660"> '+list.topicContent+'</td>'+
								'</tr>'+
								'<tr>'+
								'<td width="100" height="6" align="right" valign="top">&nbsp;</td>'+
								'<td>'+
								'<ul class="exammanage_match" style="width:300px">';
								for(var i in answerList){
									var v=answerList[i];
									if(v.iscorrect==0){
										html+='<li id="left_0'+i+'">'+v.optionContent+'&nbsp;<input name="input2" type="text" class="default_txt" size="5" value="" /></li>';
									}
								}
								html+='</ul><ul class="exammanage_match_block">';

								for(var i in answerList){
									var v=answerList[i];
									if(v.iscorrect==1){
										html+='<li id="right_0'+i+'" alt="'+v.id+'"><b>'+v.optionContent+'</b></li>';
									}
								}
								html+='</ul>'+
								'<div class="clear"></div></td>'+
								'</tr>'+
								'<tr>'+
								'<td align="right" valign="top">【正确答案】：</td>'+
								'<td class="exammanage_text_red">'+
								'<ul class="exammanage_match" style="width:300px">';

								for(var i in answerList){
									var v=answerList[i];
									if(v.iscorrect==0){
										html+='<li>'+v.optionContent+'&nbsp;<input name="input2" type="text" class="default_txt" value="'+answerList[parseInt(v.optionOrder)-1]['optionContent']+'" size="5" /></li>';
									}
								}
								html+='</ul></td>'+
								'</tr>'+
								'<tr>'+
							//	'<td colspan="2" align="center"><input name="" type="button" class="btn btn_reset"  onclick="window.close();" value="关闭" /></td>'+
								'<td colspan="2" align="center"><a href="javascript:" onclick="window.close()"><input name="" type="button" class="btn btn_reset" value="关闭" /></a></td>'+
								'</tr>';
								//'</table>';

							$('#js_topicContent').html(html);

							
							var dragDropObj = new DHTMLgoodies_dragDrop();
							for(var i in answerList){
								var v=answerList[i];
								if(v.iscorrect==1){
									dragDropObj.addSource('right_0'+i,true);

								}
							}
							for(var i in answerList){
								var v=answerList[i];
								if(v.iscorrect==0){
									dragDropObj.addTarget('left_0'+i,'dropItems');
								}
							}
							
							dragDropObj.init();
							
					}
				}
			});
	}
//------排序题
	var sort = function(id){
			$.ajax({
				type:'GET',
				dataType: 'json',
				url: G_URL['findtopicbyid']+'?id='+id+'&callback=?',
				contentType:'application/json;charset=UTF-8',
				success:function(data){
					var list = data.list;
					var answerList = list[0].topicAnswerList;
					var arr = [];
					if(data.returnCode=='000000'){
						var html='';
						html+='<tr>';
						html+='<td width="100" height="5" align="right" valign="top">【排序题】：</td>';
						html+='<td width="660">'+list[0].topicContent+'：</td>';
						html+='</tr>';
						html+='<tr>';
						html+='<td width="100" height="6" align="right" valign="top">&nbsp;</td>';
						html+='<td>';
						html+='<div>';
							for(var i=1;i<=answerList.length;i++){
								if(i!=answerList.length){
									html+='<input name="input2" type="text"  class="esort" value="'+answerList[i-1].optionOrder+'" size="10" />-';
								}else{
									html+='<input name="input2" type="text"  class="esort" value="'+answerList[i-1].optionOrder+'" size="10" />';
								}
							}
						html+='</div>';
						html+='<ul class="exammanage_sort_block">';
						    for(var i=1;i<=answerList.length;i++){
						  		html+=' <li><b>'+i+'. '+answerList[i-1].optionContent+'</b></li>'
						  		}
						html+='</ul>';
						html+='<div class="clear"></div></td></tr>';
						html+='<tr>';
    					html+='<td align="right" valign="top">【正确答案】：</td>';
    					html+='<td class="exammanage_text_red"><div>';
    					for(var i=1;i<=answerList.length;i++){
    						if(i!=answerList.length){
									html+='<input name="input2" type="text"  class="esort" value="'+answerList[i-1].optionOrder+'" size="4" />-';
								}else{
									html+='<input name="input2" type="text"  class="esort" value="'+answerList[i-1].optionOrder+'" size="4" />';
								}
    					}
    					html+='</div></td>';
  						html+='</tr>';
  						html+='<tr>';
			   	//		html+='<td colspan="2" align="center"><input name="" type="button" class="btn btn_reset"  onclick="window.close();" value="关闭" /></td>';
					 	html+='<td colspan="2" align="center"><a href="javascript:" onclick="window.close()"><input name="" type="button" class="btn btn_reset" value="关闭" /></a></td>';
						html+='</tr>';
						$('#js_topicContent').html(html);
					}
				}
			});
		}
	//------填空题

	var space = function(){
		$.ajax({
				type:'GET',
				dataType: 'json',
				url: G_URL['findtopicbyid']+'?id='+id+'&callback=?',
				contentType:'application/json;charset=UTF-8',
				success:function(data){
					var list = data.list;
					var answerList = list[0].topicAnswerList;
					var arr = [];
					if(data.returnCode=='000000'){
						var html='';
						html+='<tr>';
						html+='<td width="100" height="13" align="right" valign="top">【填空题】：</td>';
						html+='<td width="660">'+list[0].topicContent+'</td>';
						html+='</tr>';
						html+='<tr>';
			    		html+='<td align="right">【正确答案】：</td>';
			    		html+='<td class="exammanage_text_red"><b>';
			    		for(var i=0;i<answerList.length;i++){
			    			if(i!=(answerList.length-1)){
			    				html+=answerList[i].optionContent+'&nbsp,&nbsp';
			    			}else{
			    				html+=answerList[i].optionContent;
			    			}
			    		}
			    		html+='</b></td>';
			  			html+='</tr>';
			  			html+='<tr>';
			 // 		html+='<td colspan="2" align="center"><input name="" type="button" class="btn btn_reset" onclick="window.close();"  value="关闭" /></td>';
			   			html+='<td colspan="2" align="center"><a href="javascript:" onclick="window.close()"><input name="" type="button" class="btn btn_reset" value="关闭" /></a></td>';
						html+='</tr>';
						$('#js_topicContent').html(html);
					}
				}
			});
	}
	//------简答题
	var ask = function(){
		$.ajax({
				type:'GET',
				dataType: 'json',
				url: G_URL['findtopicbyid']+'?id='+id+'&callback=?',
				contentType:'application/json;charset=UTF-8',
				success:function(data){
					var list = data.list;
					var answerList = list[0].topicAnswerList;
					var arr = [];
					if(data.returnCode=='000000'){
						var html='';
						html+='<tr>';
						html+='<td width="100" height="13" align="right" valign="top">【简答题】：</td>';
						html+='<td width="660">'+list[0].topicContent+'</td>';
						html+='</tr>';
						html+='<tr>';
			    		html+='<td align="right" valign="top" nowrap="nowrap">【正确答案】：</td>';
			    		for(var i=0;i<answerList.length;i++){
							arr.push('&nbsp;'+answerList[i].optionContent+'&nbsp;');
			    		}
			    		html+='<td class="">'+arr.join(',');+'</td>';
			  			html+='</tr>';
			  			html+='<tr>';
			   		//	html+='<td colspan="2" align="center"><input name="" type="button" class="btn btn_reset" onclick="window.close();" value="关闭" /></td>';
			   			html+='<td colspan="2" align="center"><a href="javascript:" onclick="window.close()"><input name="" type="button" class="btn btn_reset" value="关闭" /></a></td>';
						html+='</tr>';
						$('#js_topicContent').html(html);
					}
				}
			});
	}
	//------论述题
	var discuss = function(){
		$.ajax({
				type:'GET',
				dataType: 'json',
				url: G_URL['findtopicbyid']+'?id='+id+'&callback=?',
				contentType:'application/json;charset=UTF-8',
				success:function(data){
					var list = data.list;
					var answerList = list[0].topicAnswerList;
					var arr = [];
					if(data.returnCode=='000000'){
						var html='';
						html+='<tr>';
						html+='<td width="100" height="13" align="right" valign="top">【论述题】：</td>';
						html+='<td width="660">'+list[0].topicContent+'</td>';
						html+='</tr>';
						html+='<tr>';
			    		html+='<td align="right" valign="top" nowrap="nowrap">【正确答案】：</td>';
			    		for(var i=0;i<answerList.length;i++){
							arr.push('&nbsp;'+answerList[i].optionContent+'&nbsp;');
			    		}
			    		html+='<td class="">'+arr.join(',');+'</td>';
			  			html+='</tr>';
			  			html+='<tr>';
			   		//	html+='<td colspan="2" align="center"><input name="" type="button" class="btn btn_reset" onclick="window.close();" value="关闭" /></td>';
			   			html+='<td colspan="2" align="center"><a href="javascript:" onclick="window.close()"><input name="" type="button" class="btn btn_reset" value="关闭" /></a></td>';
						html+='</tr>';
						$('#js_topicContent').html(html);
					}
				}
			});
	}

	chooseTopic(id,topicTypeId);

	checkAll(name);//CheckBox全选
	cbs.showSearchPanel(); //搜索区

	/*-------------提示操作 可根据需要删除一下内容----------------*/


	 cbs.treeOverlay();//树操作

	 var loadTable = $("#load_exammanageList", parent.document);
	 var defaultPage ='exammanage_list.shtml';
	//默认加载
	$.ajax({
	    url:defaultPage,
	    context: document.body,
		beforeSend:ThisLoading ,//执行ajax前执行loading函数.直到success
		success: Response //成功时执行Response函数
	});

   	//执行loading函数
	function ThisLoading() {
	  $(loadTable).html('<div class="Loading_List"></div>');
	}

	//loading完成后执行
    function Response(data){
	  	$(loadTable).html(data);
		getTableList();
	}

   //添加子页面JS事件
   function getTableList(e){

	  cbs.tablehover();//表单换行颜色 hover

	  cbs.exportbtn();//导出

	  cbs.selbtnmenu();//下拉菜单

	  //高级编辑器
	    $('.addQuestions').click(function(e) {
			e.preventDefault();
			$.fn.nyroModalManual({
				width:700,
				height:400,
				url: 'overlay_addQuestions.shtml'
			});
	  	return false;
	 });

	  //调整分类
	  $('.departments').click(function(e) {
			e.preventDefault();
			$.fn.nyroModalManual({
			    width:600,
				title:"批量增加选项",
				url: 'overlay_delsector.shtml'
			});
		return false;
	 });

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

	$('.carry_out').nyroModal({width:380});



	//上传
	$(".reupdata").nyroModal({
		width:560
	  });


    }

	 //测试
	 $('.delthis').live('click',function(e) {
		    $(this).text('推荐');
		    reLoadTbaleList();
			alert('我被点击,我是第'+$(this).parent().parent().parent().parent().parent().index()+"行");
			return false;
	 });



	//局部刷新
    function reLoadTbaleList(e){

		$.ajax({
		  url:defaultPage,
		  context: document.body,
		  beforeSend:ThisLoading ,
		  success: Response //成功时执行Response函数
	 });
   }




});
});


function dropItems(idOfDraggedItem,targetId,x,y){
	var _v=$('#'+idOfDraggedItem).text();
	$('#'+targetId).find('.default_txt').val(_v).attr('alt',$('#'+idOfDraggedItem).attr('alt'));
}