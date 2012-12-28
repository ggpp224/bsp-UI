/**
 * @author gp
 * @datetime 2012-8-8
 * @description 新增试卷
 */

//当前正在操作的题组
 var current_topic_data = [],
 	//当前操作的题组id，如果是新建为'new'
 	 current_topic_id = 'new';
 	//题组各类型题目信息
 	group_type={},
	form_diabled = false;
 	topic_type = ['','单项选择题','多项选择题','判断题','匹配题','排序题','填空题','简答题','论述题'];

 	//当前试卷的临时题组
 	//[{id:'1',data:[{试题信息}]}]
 	topic_groups=[],

 	//判断当前题组是新创建的还是编辑的
 	is_group_eidt=false,

 	topicTypeSelectAble =null,

 	//数字正则
 	num_reg = /^\d+(.\d+){0,1}$/,
 	int_reg = /^\d+$/,
 	 konwledgeBox={},
 	 //Ambow.apply(konwledgeBox,Ambow.Observable);
 	 _.extend(konwledgeBox, Backbone.Events);
 	var topic={
 	 	//设置当前操作的题组，赋给的值是一个数组的copy
 	 	set:function(data){
 	 		return data.slice();
 	 	},

 	 	//对current_topic_data按类型排序
 	 	sortGroup:function(){
 	 		//按组排序
 	 		current_topic_data.sort(function(a,b){
				return parseInt(a.topicTypeId)-parseInt(b.topicTypeId);
			});

			//统计题组各类型题目信息
			//{"2":{count:2,topicScore:"4"}}
			group_type={};
			var currentTopic = {},typeSetting=[];
			if(current_topic_id!='new'){
				for(var i=0,len=topic_groups.length;i<len;i++){
					if(topic_groups[i].id==current_topic_id){
						currentTopic = topic_groups[i];
						typeSetting = currentTopic.data.topicGroupTypeDtoList;
					}
				}
			}

			var type_map = {};
			for(var i=0,len=typeSetting.length;i<len;i++){
				var rec = typeSetting[i];
				type_map[rec.topicTypeId]=rec.topicScore;
			}

			//
			for(var i=0,len=current_topic_data.length;i<len;i++){
				var rec = current_topic_data[i];
				if(group_type[rec.topicTypeId]){
					group_type[rec.topicTypeId].count++;
				}else{
					group_type[rec.topicTypeId]={count:1,topicScore:type_map[rec.topicTypeId]||rec.topicScore||0};
				}
			}
 	 	}


 	 };

 	 var code = '',paperId =false;

 require(['jquery','ambow','dxcommon','dxtree','dxwindow','ListView','nyroModal','common','userjs','examcommon'],function(){
 	code = Tiku.getQuery('id');
 	paperId = Tiku.getQuery('paperId');
 	Ambow.apply(topic,Ambow.Observable);
 	//在当前题组框中添加新加入的试题
 	topic.on('add',function(data){
 		topic.sortGroup();
 		var htm ='';
 		var serial =0;
 		for(key in group_type){
			serial +=1;
 			var rec = group_type[key];
 			htm += '<tr class="examinationpaper_guding_baibg"><td>'+serial+'</td><td class="dt" num="'+key+'">'+topic_type[key]+'</td><td class="dt">'+rec.count+'</td><td><input type="text"  size="3"  value="'+(rec.topicScore?rec.topicScore:0)+'" class="default_txt dt t_score" num="'+key+'"></td>';
 		}
 		$('#group_type_list').html(htm);
 		var setting = $('#topic_setting');
 			/*$.each(current_topic_data,function(){
 				setting.append('<div>name:'+this.topicContentSummary+';id:'+this.id+';type:'+this.topicTypeId+'</div>');
 			});*/
 		setting.html(renderTopics(current_topic_data));
 	});
 	topic.on('clear',function(){
 		current_topic_data = [];
 	});

 	//region  题组模板
 	topicgroup_add_tpl = new Ambow.XTemplate(
 		'<table width="100%"  class="default_table form_table">',
 			'<colgroup>',
 				'<col width="100"></col>',
 				'<col></col>',
 			'</colgroup>',
                '<tr class="fpsave">',
                  '<td><h5 id="groupTitle">新建题组</h5></td>',
                 '<td style="text-align:right;"></td>',
                '</tr>',
                '<tr><td colspan="2">&nbsp;</td></tr>',
                '<tr>',
                   ' <th><span>*</span> 题组名称：</th>',
                   ' <td><input type="text" class="default_txt" name="topicGroupName" value="{topicGroupName}" size="30"/>&nbsp;',
                       '<label style="display:none;"><input id="nameDispaly" name="nameDispaly" value="{nameDispaly}" type="checkbox" />在试卷中显示题组名称和答题说明</label>',
                    '</td>',
                '</tr>',
                '<tr>',
                   '<th><span>*</span> 答题时间：</th>',
                   '<td><input type="text" name="answerTime" class="default_txt" value="{answerTime}" size="8"/> 分钟</td>',
                '</tr>',
               '<tr>',
                    '<th valign="top">答题说明：</th>',
                    '<td><textarea name="topicGroupExplain" rows="4" class="default_textarea w510">{topicGroupExplain}</textarea></td>',
                '</tr>',
                '<tr>',
                   ' <th style="style="width:20%;""><span>*</span> 题目选取方式：</th>',
                   '<td><label><input id="rad_guding" type="radio" name="topicSelectMode" value="0" checked="checked" />&nbsp;题目固定</label>',
                       '<label><input id="rad_suiji" type="radio" name="topicSelectMode" value="1" />&nbsp;题目随机</label>',
                    '</td>',
                '</tr>',
                '<tr class="guding">',
                  '<th valign="top">&nbsp;</th>',
                  '<td>',
                  	'<table width="85%" cellspacing="0" cellpadding="0" border="0">',
				   		'<thead class="examinationpaper_guding_th">',
					      '<tr>',
					        '<td>序号</td>',
					        '<td>试题类型</td>',
					        '<td>数量</td>',
					        '<td>每题分值</td>',
					        '</tr>',
					     '</thead>',
					     '<tbody id="group_type_list" class="examinationpaper_guding_td">',
					      '</tbody>',
				    '</table></td>',
                '</tr>',
                '<tr class="guding">',
                   '<th valign="top"><span>*</span> 试题设置：</th>',
                    '<td><input id="input_topic_btn" type="button" class="btn btn_feature" style="margin-right:10px;" value=" 录入试题 "/>',
					'<input id="sys_topic_btn" type="button" class="btn btn_default" style="margin-right:10px;"  value=" 让系统帮我选题 "/>',
                    '<input id="hand_topic_btn" type="button" class="btn btn_default" value=" 手动选题 "/>',
					//'<input id="bantch_export_btn" type="button" class="btn btn_default"  value=" 批量导入试题 "/>',
                    '</td>',
                '</tr>',

                '<tr class="suiji">',
                    '<th><span>*</span> 知识点范围：</th>',
                    '<td><input type="hidden" id="js_zsd" value="" ><input type="text" disabled="disabled" id="ex_points" value="" size="40" class="default_txt js_input_knowledge">',
                    '<span class="sel_label">',
                    '<input type="button" value="选择" id="main_knowledge_choose_btn" class="btn btn_default">',
                    '</span>',

                    '</td>',
                '</tr>',
                '<tr class="suiji">',
                    '<th valign="top"></th>',
                    '<td>',
                    	'<table width="100%" border="0" class="default_table listtab">',
            				'<thead class="sj_gradual_bg">',
             					'<tr>',
               						'<th>知识点名称</th>',
                					'<th>单项选择题</th>',
                					'<th>多项选择题</th>',
                					'<th>判断题</th>',
                					'<th>匹配题</th>',
									'<th>排序题</th>',
									'<th>填空题</th>',
									'<th>简答题</th>',
									'<th>论述题</th>',
              					'</tr>',
            				'</thead>',
            				'<tbody class="tr_parent" id="main_points_tbody">',
              				'</tbody>',
          				'</table>',
                    '</td>',
                '</tr>',
                '<tr class="suiji">',
                    '<th valign="top"><span>*</span> 题型设置：</th>',
                    '<td>',
                    	'<table width="100%" border="0" class="default_table listtab">',
		            		'<thead class="gradual_bg">',
		              		'<tr>',


		                		'<th width="160">试题类型</th>',
		                		'<th width="160">数量</th>',
		                		'<th width="60">每题分值</th>',
		               			'<th width="110" class="th_center">操作</th>',
		              		'</tr>',
		            		'</thead>',
		            		'<tbody class="tr_parent" id="suiji_type_tbody">',
		              			'<tr>',

		                			 '<td>',
		                					'<select class="dt suiji_sel t_sel ">',
		        								'<option value="0"> - 请选择 - </option>',
												'<option value="1">单项选择题</option>',
												'<option value="2">多项选择题</option>',
												'<option value="3">判断题</option>',
												'<option value="4">匹配题</option>',
												'<option value="5">排序题</option>',
												'<option value="6">填空题</option>',
												'<option value="7">简答题</option>',
												'<option value="8">论述题</option>',
		     								'</select>',
		     						'</td>',
		               				'<td><input type="text" size="5" value="" class="default_txt dt"> </td>',
		               				'<td><input type="text" size="5" value="" class="default_txt dt t_score"> </td>',
		               				'<td class="r_tab"><a style="float:left" idx="0"  title="上移" class="icon_ranking_up  icon_top_btn suji_up_btn" href="javascript:void(0)">上移</a><a style="float:left" title="下移" class="icon_ranking_down icon_down_btn suji_down_btn"  idx="0"  href="javascript:void(0)">下移</a><a style="float:left" title="添加" class="tabico_add" href="javascript:void(0)">添加</a> <a style="float:left" title="删除" class="tabico_del tabico_del_add" href="javascript:void(0)">删除</a></td>',
		             			'</tr>',
		              		'</tbody>',
		          		'</table>',
		             '</td>',
               '</tr>',
                '<tr class="guding">',
                    '<th>&nbsp;</th>',
                    '<td><div id="topic_setting" ></div></td>',
                '</tr>',
                '<tr class="suiji">',
                    '<th>题组难度：</th>',
                    '<td><span id="js_topicDifficultyStart"></span> - <span id="js_topicDifficultyEnd"></span></td>',
                '</tr>',
                '<tr class="guding">',
                    '<th>题组难度：</th>',
                    '<td><input id="guding_nandu" type="text" class="default_txt" disabled="disabled" name="topicGroupDifficulty" value="{topicGroupDifficulty}" size="8"/></td>',
                '</tr>',
                '<tr><td colspan="2">&nbsp;</td></tr>',
                '</table>'
 	);
 	//endregion

 	//各子页面初始化
 	var pages={
 		// 初始化新增试卷页
		initAddPaper:function(data){
			$('#firstPage').html(data);
			topicgroup_add_tpl.append(Dom('group_form'),{nameDispaly:0,topicGroupDifficulty:0.5});
			$('tr.suiji').hide();
			topicDifficulty();
			
			
			var validateGroup=function(){
				var flag = true,msg=[];
				var els = Dom('group_form').elements;

				//名称
				var nameDom = els.topicGroupName;
				if(Ambow.isEmpty(nameDom.value)){
					flag=false;
					msg.push("题组名称不能为空");
				}

				//答题时间
				var timeDom = els.answerTime;
				if(Ambow.isEmpty(timeDom.value)){
					flag=false;
					msg.push("答题时间不能为空");
				}else if(!/^\d+(.\d+){0,1}$/.test(timeDom.value)){
					flag=false;
					msg.push("答题时间必须为数字");
				}

				/*var difficulty = els.topicGroupDifficulty.value;
				if((!Ambow.isEmpty(difficulty))&&(!num_reg.test(difficulty))){
					flag=true;
					msg.push("题组难度必须为数字");
				}*/

				var difficultyStart = els.topicDifficultyStart.value;
				var difficultyEnd = els.topicDifficultyEnd.value;
				if((!Ambow.isEmpty(difficultyStart))&&(!num_reg.test(difficultyStart))){
					flag=false;
					msg.push("题组起始难度必须为数字");
				}else if(difficultyStart.length>10){
					flag=false;
					msg.push("题组起始难度长度不能大于10");
				}
				if((!Ambow.isEmpty(difficultyEnd))&&(!num_reg.test(difficultyEnd))){
					flag=false;
					msg.push("题组结束难度必须为数字");
				}else if(difficultyEnd.length>10){
					flag=false;
					msg.push("题组结束难度长度不能大于10");
				}else if(parseFloat(difficultyEnd)>=1){
					flag=false;
					msg.push("题组结束难度长度必须小于1");
				}

				if(parseFloat(difficultyEnd)<=parseFloat(difficultyStart)){
					flag=false;
					msg.push("题组结束难度必须大于开始难度");
				}


				return {flag:flag,msg:msg.join('\n')};

			};

			//在试卷中显示题组名称和答题说明 checkbox改变时赋值
			$('#nameDispaly').live('click',function(e){
				if(this.value==0){
					this.value=1;
				}else{
					this.value=0;
				}

			});

			//TODO special 题组保存
			//region 题组保存
			//保存题组
			$('#topic_save_btn').click(function(){
				var tip = validateGroup();
				if(!tip.flag){
					alert(tip.msg);
					return;
				}
				var radio = Dom('group_form').elements.topicSelectMode;
				if(radio[0].checked&&current_topic_data.length==0){
					alert("请添加试题");
					return;
				}
				var params = Ambow.urlDecode(Ambow.serializeForm('group_form'));
				var ids = [];
				$.each(current_topic_data,function(idx){
					ids.push(this.id);
				});
				params.idList = ids;
				params.creatorId = G_USER.id;

				//固定 题目选取方式
				var typeList = $('#group_type_list');
				var trs = typeList.find('tr');
				var type_arr=[],groupScore=0;
				var guding_flag=false,guding_msg=[];
				$.each(trs,function(idx){
					var tr = $(this);
					var dt = tr.find('.dt');
					var count = dt[1].innerHTML,
						score = dt[2].value,
						name=dt[0].innerHTML;
					if(Ambow.isEmpty(score)){
								guding_flag=true;
								guding_msg.push(name+"分值不能为空");
							}else if(!num_reg.test(score)){
								guding_flag=true;
								guding_msg.push(name+"分值必须为数字");
							}else if(parseInt(score)==0){
								guding_flag=true;
								guding_msg.push(name+"分值必须大于0");
							}else if(score.length>10){
								guding_flag=true;
								guding_msg.push("分值长度不能大于10");
							}



					var o = {
						topicTypeId:dt[0].getAttribute('num'),
						topicTypeName:dt[0].innerHTML,
						topicCount:count,
						topicScore:score

					};
					type_arr.push(o);
					groupScore += parseInt(count)*parseFloat(score);
				});

				if(guding_flag){
						alert(guding_msg.join('\n'));
						return;
					}

				params.topicGroupTypeDtoList=type_arr;
				
				//固定 知识点code
				var a_array = [];
				for(var i=0,len=current_topic_data.length; i<len ; i++ ){
					var rec = current_topic_data[i];
					var list = rec.knowlNameList;
					var kid = []; 
					for(var j=0,j_len = list.length; j<j_len ; j++){
						kid.push(list[j].id);
					}
					a_array = a_array.concat(kid);
					
				}
				
				var obj = {},temp=[];
				for(var i=0,len=a_array.length;i<len;i++){
					var key=a_array[i];
					if(!obj[key]){
						obj[key]=1;
						temp.push(key);
					}
				}
				params.categoryCode = temp.join(',');
				//随机
				if(!radio[0].checked){
					var suiji_typeList = $('#suiji_type_tbody');
					var suiji_trs = suiji_typeList.find('tr');
					var suiji_type_arr=[];
					var topicDifficultyStart = params.topicDifficultyStart;
					var topicDifficultyEnd  = params.topicDifficultyEnd;
					//题型设置
					if(!topicTypeSelectAble){
						alert("请选择知识点范围");
						return;
					}
					var flag=false,msg=[];
					$.each(suiji_trs,function(idx){
						var tr = $(this);
						var dt = tr.find('.dt');
						var sel = dt[0];
						var name=sel.options[sel.selectedIndex].text,
							count=dt[1].value,
							score=dt[2].value,
							type =sel.value;

						if(type==0){
							flag=true;
							msg.push("请选择题型设置第"+(idx+1)+"行试题类型");
						}else{
							if(Ambow.isEmpty(count)){
								flag=true;
								msg.push(name+"数量不能为空");
							}else if(!num_reg.test(count)){
								flag=true;
								msg.push(name+"数量必须为数字");
							}else if(parseInt(count)>topicTypeSelectAble[type]){
								flag=true;
								msg.push(name+"数量不能大于可选数量");
							}

							if(Ambow.isEmpty(score)){
								flag=true;
								msg.push(name+"分值不能为空");
							}else if(!num_reg.test(score)){
								flag=true;
								msg.push(name+"分值必须为数字");
							}else if(parseInt(score)==0){
								flag=true;
								msg.push(name+"分值必须大于0");
							}else if(score.length>10){
								flag=true;
								msg.push("分值长度不能大于10");
							}
						}



						var o = {
							topicTypeId:type,
							topicTypeName: name,
							topicCount:count,
							topicScore:score,
							topicDifficultyStart:topicDifficultyStart,
							topicDifficultyEnd:topicDifficultyEnd
						};
						suiji_type_arr.push(o);
					});

					if(flag){
						alert(msg.join('\n'));
						return;
					}
					params.topicGroupTypeDtoList=suiji_type_arr;

				//随机知识点code
					params.categoryCode = $('#js_zsd').val();
				}
				//TODO 没树情况下的假数据 知识点code
				//params.categoryCode = "111,222,333,44";
					
				
				
				
				var topicDifficultyStart= params.topicDifficultyStart.substring(0);
				var topicDifficultyEnd = params.topicDifficultyEnd.substring(0);
				delete params.topicDifficultyStart;
				delete params.topicDifficultyEnd;

				if(is_group_eidt){ //题组编辑
					params.id=current_topic_id;
					$.ajax({
						type: 'POST',
						data:Ambow.encode(params),
						dataType: 'json',
						url: G_URL.updatebytopicgroupdto,
						contentType:'application/json;charset=UTF-8',
						success:function(data){
							if(data.returnCode != '000000'){
								alert("编辑失败，请稍后重试");
								return;
							}
							//题组id
							var id = params.id;
							for(var i=0,len=topic_groups.length;i<len;i++){
								if(topic_groups[i].id==current_topic_id){
									params.groupScore = groupScore;
									params.topicDifficultyStart=topicDifficultyStart;
									params.topicDifficultyEnd=topicDifficultyEnd;
									params.id=id;
									topic_groups[i]={id:id,data:Ambow.apply(current_topic_data.slice(),params,{categoryName:$('#ex_points').val(),topicGroupTotalScore:data.rCount})};
									current_topic_data = [];

									//操作左侧题组框
									renderGroups(topic_groups);
									$('#topic_setting').html('');
								}
							}

							//topic_groups.push({id:id,data:Ambow.apply(current_topic_data.slice(),params)});

							var ss=0;
							var len = topic_groups.length;
							for(var i=0;i<len;i++){
								var rec=topic_groups[i];
								ss += parseInt(rec.data.topicGroupTotalScore);
							}
							$('#tx_score').val(ss);
							is_group_eidt=false;
							$('#topic_group_add').click();
						}
					});
				}else{ //新建
					$.ajax({
						type: 'POST',
						data:Ambow.encode(params),
						dataType: 'json',
						url: G_URL.addtopicgroupdto,
						contentType:'application/json;charset=UTF-8',
						success:function(data){
							//题组id
							var id = data.entity;
							params.groupScore = groupScore;
							params.topicDifficultyStart=topicDifficultyStart;
							params.topicDifficultyEnd=topicDifficultyEnd;
							params.id=id;
							topic_groups.push({id:id,data:Ambow.apply(current_topic_data.slice(),params,{categoryName:$('#ex_points').val(),topicGroupTotalScore:data.rCount})});
							current_topic_data = [];
							//操作左侧题组框
							renderGroups(topic_groups);
							$('#topic_setting').html('');
							var len = topic_groups.length;
							var ss=0;
							for(var i=0;i<len;i++){
								var rec=topic_groups[i];
								ss += parseInt(rec.data.topicGroupTotalScore);
							}
							$('#tx_score').val(ss);
							is_group_eidt=false;
							$('#topic_group_add').click();
						}
					});
				}

				topicTypeSelectAble=null;
				$('#topic_group_add').attr('disabled',false).removeClass('btn_reset').addClass('btn_submit');

			});
	//endregion

			//录入试题
			$('#input_topic_btn').live('click',function(){
				if(form_diabled){
					return;
				}
				$.get("../templates/examinationpaper_list_input_danxuan.html",function(data){
					pages.initInputData(data);
				});
			});

			//系统选题
			$('#sys_topic_btn').live('click',function(){
				if(form_diabled){
					return;
				}
				$.get("../templates/examinationpaper_list_input_xitong.html",function(data){
					pages.initSysTopic(data);
				});
			});

			//手动选题
			$('#hand_topic_btn').live('click',function(){
				if(form_diabled){
					return;
				}
				$.get("../templates/examinationpaper_list_input_shoudong.html",function(data){
					pages.initHandTopic(data);
				});
			});

			//批量导入
			$('#bantch_export_btn').live('click',function(){
				if(form_diabled){
					return;
				}
				$.get("../templates/examinationpaper_list_input_piliang.html",function(data){
					pages.initExportTopic(data);
				});
			});
			function indexOf(o, from,arr){
		        var len = arr.length;
		        from = from || 0;
		        from += (from < 0) ? len : 0;
		        for (; from < len; ++from){
		            if(arr[from] === o){
		                return from;
		            }
		        }
		        return -1;
		    };

			//题组点击事件
			$('#topic_list').click(function(e){
				$('#topic_group_add').attr('disabled',false).removeClass('btn_reset').addClass('btn_submit');
				var liEls = e.getTarget('li.tgn');
				
				//某个题组
				if(liEls.length>0){
					$('#paper_list').hide();
					$('#group_form').show();
					var el = liEls[0];
					var lis = $('#topic_list').find('li');
					var _as = $('#topic_list').find('a.gta');
					_as.removeClass('current');
					$(el).find('a').addClass('current');
					var idx = indexOf(el,0,lis);
					current_topic_data = topic_groups[idx].data;
					current_topic_id = topic_groups[idx].id;
					var groups_length = topic_groups.length;
					var dom = Dom('group_form');
					dom.innerHTML='';
					topicgroup_add_tpl.append(dom,current_topic_data);
					topicDifficulty();//难度
					if(current_topic_data.nameDispaly==1){
						Dom('nameDispaly').checked = true;
					}
					topic.trigger('add');

					//对顶部小图标样式操作
					if(groups_length<2){
					}
					else if(idx==0){
						$('#group_up_btn').removeClass('tree_up').addClass('tree_gray_up');
 						$('#group_down_btn').removeClass('tree_gray_down').addClass('tree_down');
					}else if(idx==groups_length-1){
						$('#group_down_btn').removeClass('tree_down').addClass('tree_gray_down');
						$('#group_up_btn').removeClass('tree_gray_up').addClass('tree_up');
					}else{
						$('#group_down_btn').removeClass('tree_gray_down').addClass('tree_down');
						$('#group_up_btn').removeClass('tree_gray_up').addClass('tree_up');
					}

					var rad = $('input[name=topicSelectMode]');
					if(current_topic_data.topicSelectMode=='0'){
						//固定题组
						rad[0].checked = true;
						$('tr.suiji').hide();
						$('tr.guding').show();
					}else{
						rad[1].checked = true;
						$('tr.suiji').show();
						$('tr.guding').hide();
						
						var tx=[],val=[],obj={};
						
						if(current_topic_data.categoryCode){
							tx = current_topic_data.categoryName.split(';');
							val=current_topic_data.categoryCode.split(',');
						}else{
							for(var i=0,len=current_topic_data.length;i<len;i++){
								var topic_rec =  current_topic_data[i];
								var list = topic_rec.knowlNameList;
								
								for(var j=0,innerLen=list.length;j<innerLen;j++){
									var nr = list[j],key=nr.id;
									if(!obj[key]){
										obj[key]=nr.knowlName;
										tx.push(nr.knowlName);
										val.push(key);
									}
								}
							}
						}
						
						
						
						$('#ex_points').val(tx.join(';'));
						$('#js_zsd').val(val.join(',')); 

						setSuijiTopics({callback:'',idList:val},tx);
						
						var list = current_topic_data.topicGroupTypeDtoList;
						var rec = list[0];
						if(rec){
							$('#topicDifficultyStart').val(rec.topicDifficultyStart);
							$('#topicDifficultyEnd').val(rec.topicDifficultyEnd);
						}
						var tb = $('#suiji_type_tbody');
						var htm='';
						for(var i=0,len=list.length;i<len;i++){
							var rec = list[i];
							htm+='<tr><td><select class="suiji_sel t_sel dt" default="'+rec.topicTypeId+'" class="dt"><option value="0"> - 请选择 - </option><option value="1">单项选择题</option><option value="2">多项选择题</option><option value="3">判断题</option><option value="4">匹配题</option><option value="5">排序题</option><option value="6">填空题</option><option value="7">简答题</option><option value="8">论述题</option></select></td><td><input type="text" class="default_txt dt" value="'+rec.topicCount+'" size="5"> </td><td><input type="text" class="default_txt dt t_score" value="'+rec.topicScore+'" size="5"> </td><td class="r_tab"><a href="javascript:void(0)" class="icon_top_btn icon_ranking_up suji_up_btn "  idx="'+i+'" title="上移" style="float:left">上移</a><a href="javascript:void(0)" class="icon_down_btn icon_ranking_down suji_down_btn" title="下移" idx="'+i+'"  style="float:left">下移</a><a href="javascript:void(0)" class="tabico_add" title="添加" style="float:left">添加</a> <a href="javascript:void(0)" class="tabico_del tabico_del_add" title="删除" style="float:left">删除</a></td></tr>';

						}
						tb.html(htm);
						$.each($('.t_sel'),function(e){
							var dom = $(this);
							dom.val(dom.attr('default'));
						});


					}
					$('#topicGroupName').html("题组-"+current_topic_data.topicGroupName);
					var form_els = Dom('group_form').elements;
					for(var key in form_els){
						var el_temp = form_els[key];
						if(el_temp&&el_temp.disabled){
							try{
							el_temp.disabled = true;
							}catch(e){}

						}

					}
					
					btnHide();
				}
				topicTypeSelectAble=null;
				$('.topic_view_del').hide();
				
				var els = document.getElementById('group_form').elements;
				
				for(var i=0,len=els.length;i<len;i++){
					var el = els[i];
					el.disabled=true;
				
				}
				form_diabled = true;
				Dom('guding_nandu').disabled=true;
				
			});

			//点击左侧整张试卷
			//TODO 列表从后端获取
			$('#whole_paper_btn').click(function(e){
				$('#topic_group_add').attr('disabled',false).removeClass('btn_reset').addClass('btn_submit');

				$('#group_form').hide();
				var list = $('#paper_list');
				list.show();

				var paper_list_tpl=new Ambow.XTemplate(
					//'<p>',
						//'试题总数：<span class="lightfont">0</span>&nbsp;&#12288;试卷难度：<span class="lightfont">0</span> &nbsp;&#12288;&nbsp;（上下浮动<span class="lightfont">0</span>)',
					//'</p>',
					'<table width="100%" border="0" class="default_table listtab">',
						'<thead class="gradual_bg">',
							'<tr>',
								'<th class="th_center">序号</th>',
								'<th>题组名称</th>',
								'<th>题目数</th>',
								'<th>分值</th>',
								'<th>答题时间 （分钟）</th>',
								'<th>题目选取方式</th>',
								'<th>题型</th>',
								'<th>数量</th>',
								'<th>每题分值</th>',
							'</tr>',
						'</thead>',
						'<tbody id="paper_tbody" class="tr_parent">	</tbody>',
					'</table>'
				);
				list.html(paper_list_tpl.apply({}));
				var ids =[];
				$.each(topic_groups,function(idx){
					ids.push(this.id);
				});

				var params ={
					idList:ids,
					callback:''
				};
				
				$.ajax({
					type: 'POST',
					data:Ambow.encode(params),
					dataType: 'json',
					url: G_URL.findtopicgrouplistbyid,
					contentType:'application/json;charset=UTF-8',
					success:function(data){
						var htm='',ttype=['题目固定','题目随机'],list = data.list;
						for(var i=0,len=list.length;i<len;i++){
							var rec = list[i];
							var type_htm =count_htm=score_htm='<table border="0" width="100%"><tbody>';

							var typeList=rec.topicgrouptypelist;
							for(var j=0,jLen=typeList.length;j<jLen;j++){
								var r=typeList[j];
								type_htm += '<tr><td style="border:none">（'+(j+1)+'） </td><td style="border:none">'+r.topicTypeName+' </td>';
								count_htm+= '<tr><td style="border:none">'+r.topicCount+'</td></tr>';
								score_htm+= '<tr><td style="border:none">'+r.topicScore+'</td></tr>';
							}
							type_htm += '</tbody></table>';
							count_htm += '</tbody></table>';
							score_htm += '</tbody></table>';
							htm += '<tr>';
							htm += '	<td>第'+(i+1)+'部分</td>';
							htm += '	<td>'+rec.topicGroupName+'</td>';
							htm += '	<td>'+rec.topicCountSum+'</td>';
							htm += '	<td>'+rec.topicScoreSum+'</td>';
							htm += '	<td>'+rec.answerTime+'</td>';
							htm += '	<td>'+ttype[rec.topicSelectMode]+'</td>';
							htm += '	<td>'+type_htm+'</td>';
							htm += '	<td>'+count_htm+'</td>';
							htm += '	<td>'+score_htm+'</td>';
							htm += '<tr>';
						}

						$('#paper_tbody').html(htm);
					}
				});

				btnHide();
				topicTypeSelectAble=null;
				$('.topic_view_del').hide();
			});

			//新建题组
			$('#topic_group_add').click(function(e){
				current_topic_id = "new";
				current_topic_data = [];
				$('#paper_list').hide();
				$('#group_form').show();
				topicgroup_add_tpl.overwrite(Dom('group_form'),{nameDispaly:0,topicGroupDifficulty:0.5});
				topicDifficulty();//难度
				$('tr.suiji').hide();
				btnShow();
				topicTypeSelectAble=null;
				$('.topic_view_del').hide();
				var els = document.getElementById('group_form').elements;
				for(var i=0,len=els.length;i<len;i++){
					var el = els[i];
					el.disabled=false;
				
				}
				form_diabled = false;
				Dom('guding_nandu').disabled=true;
			});

			//题组编辑
			$('#group_edit_btn').click(function(){
				if(current_topic_id=="new"){
					alert("请选择所要编辑的题组");
					return;
				}
				$('#topic_group_add').attr('disabled',true).removeClass('btn_submit').addClass('btn_reset');

				is_group_eidt=true;
				/*var form_els = Dom('group_form').elements;
					for(var key in form_els){
						var el_temp = form_els[key];
						if(el_temp&&el_temp.disabled){
							try{
								el_temp.disabled = false;
							}catch(e){}

						}
					}*/
				btnShow();
				$('.topic_view_del').show();
				
				var els = document.getElementById('group_form').elements;
				for(var i=0,len=els.length;i<len;i++){
					var el = els[i];
					el.disabled=false;
				
				}
				form_diabled = false;
				Dom('guding_nandu').disabled=true;
			});

			//删除题组
			$('#group_del_btn').click(function(){

				if(current_topic_id=="new"){
					alert("请选择所要删除的题组");
				}else{
					if(!confirm('确定要删除选中的题组吗？')){
						return;
					}
					var lens=topic_groups.length;

					for(var i=0;i<lens;i++){
						if(topic_groups[i]&&(topic_groups[i].id==current_topic_id)){
							topic_groups.splice(i,1);
							is_group_eidt=false;
							current_topic_id="new";
							current_topic_data=[];
							$('#topic_group_add').click();
							$($('#topic_list').find('li')[i]).remove();
						}
					}
				}
				renderGroups(topic_groups);
			});

			//题组上移
			$('#group_up_btn').click(function(){
				if(current_topic_id=="new"){
					alert("请选择所要上移的题组");
					return;
				}
				var idx = getGroupIndex(current_topic_id=='new'?0:current_topic_id);
				if(idx==0){
					return;
				}else{
					var temp = topic_groups[idx];
					topic_groups[idx]=topic_groups[idx-1];
					topic_groups[idx-1]=temp;
					renderGroups(topic_groups);
				}
			});

			//题组下移
			$('#group_down_btn').click(function(){
				if(current_topic_id=="new"){
					alert("请选择所要下移的题组");
					return;
				}
				var idx = getGroupIndex(current_topic_id=='new'?0:current_topic_id);
				var length = topic_groups.length;
				if(length<2||(idx==length-1)){
					return;
				}else{
					var temp = topic_groups[idx];
					topic_groups[idx]=topic_groups[idx+1];
					topic_groups[idx+1]=temp;
					renderGroups(topic_groups);
				}
			});


			//TODO special 试卷保存
			//保存试卷
			$('#topic_paper_add').click(function(e){
				var len =topic_groups.length;
				
				
				if(len==0){
					alert("请先添加题组。");
					return;
				}

				//验证
				var els = Dom('form1').elements;
				var flag=false,msg=[];
				if(Ambow.isEmpty(els.tx_paper_name.value)){
					flag=true;
					msg.push('试卷名称不能为空');
				}else if(els.tx_paper_name.value.length>50){
					flag=true;
					msg.push('试卷名称请小于50个字符');
				}

				if($('#tx_papaer_instruction').val().length>1000){
					flag=true;
					msg.push('试卷说明请小于1000个字符');
				}

				if(Ambow.isEmpty(els.tx_score.value)){
					flag=true;
					msg.push('试卷满分不能为空');
				}else if(els.tx_score.value.length>10){
					flag=true;
					msg.push('试卷满分长度不能超过10个字符');
				}else{
					if(!int_reg.test(els.tx_score.value)){
						flag=true;
						msg.push('试卷满分必须为整数');
					}
				}

				if(flag){
					alert(msg.join('\n'));
					return;
				}

				var ids =[];
				var ss=0;
				for(var i=0;i<len;i++){
					var rec=topic_groups[i];
					ids.push(rec.id);
					ss += parseInt(rec.data.topicGroupTotalScore);
				}
				if ($('#tx_score').val() != ''){
					ss = $('#tx_score').val();
				}
				
				var params = {
					paperName:$('#tx_paper_name').val(),
					paperExplain:$('#tx_papaer_instruction').val(),
					paperTotalScore:ss,
					//TODO 无树数据，暂写死
					categoryCode: parseInt(getQuery('id')),

					creatorId:G_USER.id,
					topicGroupIdList:ids,
					companyId:G_COMPANYID
				};

				var url = G_URL.addexampaper;
				//编辑
				if(paperId){
					url = G_URL.updateexampaper;
					params.id = paperId;
				}
				$.ajax({
					type: 'POST',
					data:Ambow.encode(params),
					dataType: 'json',
					url: url,
					contentType:'application/json;charset=UTF-8',
					success:function(data){
						if(data.returnCode=='000000'){
							alert('保存成功');
							window.location='examinationpaper.shtml';

						}else{
							alert('服务器错误,请与管理员联系');
						}
						//题组id
						/*var id = data.entity;
						topic_groups.push({id:id,data:Ambow.apply(current_topic_data.slice(),params)});
						current_topic_data = [];
						//操作左侧题组框
						$('#topic_list').append('<li class="tgn"><a href="javascript:void(0)" title="'+params.topicGroupName+'" groupId='+id+'><img src="../images/enterprise/ico_sj_manage.png" />'+params.topicGroupName+'</a></li>');
						$('#topic_group_add').attr('disabled',false).removeClass('btn_disable').addClass('btn_submit');

						Dom('group_form').reset();
						$('#topic_setting').html('');*/
					},
					error:function(){
						alert('服务器错误,请与管理员联系');
					}
				});

			});


			//题目选取方式变化时处理事件
			/*$('input[name=topicSelectMode]').live('change',function(e){
				//alert(1);
				if(this.value==0){
					$('tr.guding').show();
					$('tr.suiji').hide();
				}else{
					$('tr.guding').hide();
					$('tr.suiji').show();
				}
			});*/

			$('#rad_guding').live('click',function(e){
				current_topic_data=[];
				topic.trigger('add');
				if(this.value==0){
					$('tr.guding').show();
					$('tr.suiji').hide();
				}else{
					$('tr.guding').hide();
					$('tr.suiji').show();
				}
			});

			$('#rad_suiji').live('click',function(e){
				current_topic_data=[];
				topic.trigger('add');
				if(this.value==0){
					$('tr.guding').show();
					$('tr.suiji').hide();
				}else{
					$('tr.guding').hide();
					$('tr.suiji').show();
				}
			});



			//随机选题时，选择知识点事件
			var ids = [];
			$('#main_knowledge_choose_btn').live('click',function(e){
				if(form_diabled){
					return;
				}
				G_zsdianChkObj=$(this);
				$.fn.nyroModalManual({
				    width:600,
					title:"选择知识点",
					url: 'overlay_exammanage_adjust.shtml'
				});
				konwledgeBox.off('save');
				konwledgeBox.on('save',function(cfg){
						var ex_points = $('#ex_points');
							ids =cfg.ids;
							var texts = cfg.texts;
							var ts =texts.join(';');
							if(texts.length>1)
							ts = ts.substring(0, ts.length-1);
							ex_points.val(ts);
							var params  = {
								callback:'',
								idList:	ids
							};
							setSuijiTopics(params,texts);


				});

			});

			//增加随机题型
			$('.tabico_add').live('click',function(e){
				if(form_diabled){
					return;
				}
				var tb = $('#suiji_type_tbody');
				var idx = tb.find('tr').length;
				var tr_tpl = '<tr><td><select class="suiji_sel t_sel dt"><option value="0"> - 请选择 - </option><option value="1">单项选择题</option><option value="2">多项选择题</option><option value="3">判断题</option><option value="4">匹配题</option><option value="5">排序题</option><option value="6">填空题</option><option value="7">简答题</option><option value="8">论述题</option></select></td><td><input type="text" class="default_txt dt" value="" size="5"> </td><td><input type="text" class="default_txt dt t_score" value="" size="5"> </td><td class="r_tab"><a href="javascript:void(0)" class="icon_top_btn icon_ranking_up suji_up_btn" idx="'+idx+'"  title="上移" style="float:left">上移</a><a href="javascript:void(0)" class="icon_down_btn icon_ranking_down suji_down_btn" idx="'+idx+'" title="下移" style="float:left">下移</a><a href="javascript:void(0)" class="tabico_add" title="添加" style="float:left">添加</a> <a href="javascript:void(0)" class="tabico_del tabico_del_add" title="删除" style="float:left">删除</a></td></tr>';
				tb.append(tr_tpl);
			});

			//删除随机题型
			$('.tabico_del_add').live('click',function(e){
				if(form_diabled){
					return;
				}
				var tr = $(this).parentsUntil('tbody');
				if($('#suiji_type_tbody').find('tr').length==1){
					alert("至少要选择一种试题类型");
					return;
				}
				tr.remove();
			});

			//上移随机题型
			$('.suji_up_btn').live('click',function(e){
				if(form_diabled){
					return;
				}
				var idx = parseInt(this.getAttribute('idx'));
				if(idx==0){
					return;
				}
				var suiji_typeList = $('#suiji_type_tbody');
				var suiji_trs = suiji_typeList.find('tr');
				var suiji_type_arr=[];
				$.each(suiji_trs,function(idx){
						var tr = $(this);
						var dt = tr.find('.dt');
						var sel = dt[0];
						var name=sel.options[sel.selectedIndex].text,
							count=dt[1].value,
							score=dt[2].value,
							type =sel.value;
						var o = {
							topicTypeId:type,
							topicTypeName: name,
							topicCount:count,
							topicScore:score
						};
						suiji_type_arr.push(o);
					});


				var temp = suiji_type_arr[idx];
				suiji_type_arr[idx]=suiji_type_arr[idx-1];
				suiji_type_arr[idx-1]=temp;

				var list = suiji_type_arr;
				var tb = $('#suiji_type_tbody');
				var htm='';
				for(var i=0,len=list.length;i<len;i++){
					var rec = list[i];
					htm+='<tr><td><select class="suiji_sel t_sel dt" default="'+rec.topicTypeId+'" class="dt"><option value="0"> - 请选择 - </option><option value="1">单项选择题</option><option value="2">多项选择题</option><option value="3">判断题</option><option value="4">匹配题</option><option value="5">排序题</option><option value="6">填空题</option><option value="7">简答题</option><option value="8">论述题</option></select></td><td><input type="text" class="default_txt dt" value="'+rec.topicCount+'" size="5"> </td><td><input type="text" class="default_txt dt t_score" value="'+rec.topicScore+'" size="5"> </td><td class="r_tab"><a href="javascript:void(0)" idx="'+i+'" class="icon_top_btn icon_ranking_up suji_up_btn" title="上移"  style="float:left">上移</a><a href="javascript:void(0)" class="icon_down_btn icon_ranking_down suji_down_btn" title="下移" idx="'+i+'" style="float:left">下移</a><a href="javascript:void(0)" class="tabico_add" title="添加" style="float:left">添加</a> <a href="javascript:void(0)" class="tabico_del tabico_del_add" title="删除" style="float:left">删除</a></td></tr>';

				}

				tb.html(htm);
				$.each($('.t_sel'),function(e){
					var dom = $(this);
					dom.val(dom.attr('default'));
				});

			});

			//下移随机题型
			$('.suji_down_btn').live('click',function(e){
				if(form_diabled){
					return;
				}
				var idx = parseInt(this.getAttribute('idx'));

				var suiji_typeList = $('#suiji_type_tbody');
				var suiji_trs = suiji_typeList.find('tr');
				if(idx==suiji_trs.length-1){
					return;
				}
				var suiji_type_arr=[];
				$.each(suiji_trs,function(idx){
						var tr = $(this);
						var dt = tr.find('.dt');
						var sel = dt[0];
						var name=sel.options[sel.selectedIndex].text,
							count=dt[1].value,
							score=dt[2].value,
							type =sel.value;
						var o = {
							topicTypeId:type,
							topicTypeName: name,
							topicCount:count,
							topicScore:score
						};
						suiji_type_arr.push(o);
					});


				var temp = suiji_type_arr[idx];
				suiji_type_arr[idx]=suiji_type_arr[idx+1];
				suiji_type_arr[idx+1]=temp;

				var list = suiji_type_arr;
				var tb = $('#suiji_type_tbody');
				var htm='';
				for(var i=0,len=list.length;i<len;i++){
					var rec = list[i];
					htm+='<tr><td><select class="suiji_sel t_sel dt" default="'+rec.topicTypeId+'" class="dt"><option value="0"> - 请选择 - </option><option value="1">单项选择题</option><option value="2">多项选择题</option><option value="3">判断题</option><option value="4">匹配题</option><option value="5">排序题</option><option value="6">填空题</option><option value="7">简答题</option><option value="8">论述题</option></select></td><td><input type="text" class="default_txt dt" value="'+rec.topicCount+'" size="5"> </td><td><input type="text" class="default_txt dt t_score" value="'+rec.topicScore+'" size="5"> </td><td class="r_tab"><a href="javascript:void(0)" idx="'+i+'" class="icon_top_btn icon_ranking_up suji_up_btn" title="上移" style="float:left">上移</a><a href="javascript:void(0)" class="icon_down_btn icon_ranking_down suji_down_btn" idx="'+i+'"  title="下移" style="float:left">下移</a><a href="javascript:void(0)" class="tabico_add" title="添加" style="float:left">添加</a> <a href="javascript:void(0)" class="tabico_del tabico_del_add" title="删除" style="float:left">删除</a></td></tr>';

				}

				tb.html(htm);
				$.each($('.t_sel'),function(e){
					var dom = $(this);
					dom.val(dom.attr('default'));
				});
			});

			//随机题型设置下拉列表事件
			$('.suiji_sel').live('focus',function(e){
				var data = {'0':'请选择','1':'单项选择题','2':'多项选择题','3':'判断题','4':'匹配题','5':'排序题','6':'填空题','7':'简答题','8':'论述题'};
				var sels = $('#suiji_type_tbody').find('.suiji_sel');
				for(var i=0,len=sels.length;i<len;i++){
					var _sel = sels[i];
					var val = _sel.value;
					if(val != "0"){
						delete data[val];
					}

				}
				var sel=this;
				while(sel.options.length>0){
		            sel.options.remove(0);
				}
				for(key in data){
					sel.options.add(new Option(data[key], key));
				}
			});

			//删除题组下试题事件
			$('.group_topic_del').live('click',function(e){
				var dom = $(this);
				//var tid = dom.attr('tid');
				var idx = dom.attr('idx');
				current_topic_data.splice(parseInt(idx),1);
				//dom.parent().parent().remove();
				topic.trigger('add');
			});
			//下移题组下试题事件
			$('.group_topic_down').live('click',function(e){
				var dom = $(this);
				//var tid = dom.attr('tid');
				var idx = parseInt(dom.attr('idx'));
				var list = current_topic_data,
					len = list.length;
				if(idx == len-1){return;alert("已经是本类题型的最后一题");}//最后一题
				
				var cur_rec = list[idx],
					next_rec = list[idx+1];
				if(cur_rec.topicTypeId != next_rec.topicTypeId){ //本类最后一题
					return;
					alert("已经是本类题型的最后一题");
				}
				
				var temp = list[idx];
				list[idx]=list[idx+1];
				list[idx+1]=temp;
				
				topic.trigger('add');
			});
			//上移移题组下试题事件
			$('.group_topic_up').live('click',function(e){
				var dom = $(this);
				var idx = parseInt(dom.attr('idx'));
				var list = current_topic_data,
					len = list.length;
				if(idx == 0){return;alert("已经是本类题型的第一题");}//第一题
				
				var cur_rec = list[idx],
					pre_rec = list[idx-1];
				if(cur_rec.topicTypeId != pre_rec.topicTypeId){ //本类第一题
					return;
					alert("已经是本类题型的第一题");
				}
				
				var temp = list[idx];
				list[idx]=list[idx-1];
				list[idx-1]=temp;
				
				topic.trigger('add');
			});


			//输入试题分值框时触发事件
			$('.t_score').live('blur',function(e){
				var jdom = $(this);
				var type = jdom.attr('num');
				var score = this.value;

				for(var i=0,len=current_topic_data.length;i<len;i++){
					var rec = current_topic_data[i];
					if(rec.topicTypeId==type){
						rec.topicScore = score;
					}

				}
				
				if(current_topic_id != 'new'){
					
					var group= [];
					
					for(var i=0,len = topic_groups.length;i<len;i++){
						if(current_topic_id==topic_groups[i].id){
							group = topic_groups[i].data;
						}
					}
					
					for(var i=0,len=group.length;i<len;i++){
						var rec2 = group[i];
						if(rec2.topicTypeId==type){
							rec2.topicScore = score;
						}
	
					}
					
					var list = group.topicGroupTypeDtoList;
					for(var i=0,len=list.length;i<len;i++){
						var r = list[i];
						if(r.topicTypeId==type){
							r.topicScore=score;
						}
					}
					
				}
				
				
			});


			renderGroups([]);
			$('.topic_view_del').hide();

			//编辑页面
			if(paperId){
				$.getJSON(G_URL.findstuexampaperindexbyid+'?callback=&examPaperId='+paperId+'&_dc='+new Date().valueOf()+"&isTopicRandom=0&isAnswerRandom=0",function(data){
					if(data.returnCode = '000000'){
						//[{id:'1',data:[{试题信息}]}] topic_groups
						var model = data.list[0];
						var list = model.topicgrouplist;
						for(var i=0,len=list.length;i<len;i++){
							var rec = list[i];
							var data = rec.topiclist;
							data.topicGroupTypeDtoList=rec.topicgrouptypelist;

							for(key in rec){
								data[key] = rec[key];
							}
							topic_groups.push({id:rec.id,data:data});
						}

						$('#tx_paper_name').val(model.paperName);
						$('#tx_papaer_instruction').val(throwNull(model.paperExplain));
						$('#tx_score').val(model.paperTotalScore);


						renderGroups(topic_groups);

					}else{
						alert('服务器错误，请稍后重试');
						history.back();
					}
				});

				$('div.bread_crumbs b').html('编辑试卷');
				$('h1.panel_title').html('编辑试卷');

			}
		},

		//录入数据
		initInputData:function(data){
			$('#firstPage').hide();
			$('#otherPage').html(data).show();
		},

		//系统选题
		initSysTopic:function(data){
			$('#firstPage').hide();
			$('#otherPage').html(data).show();
		},

		//手动选题
		initHandTopic:function(data){
			$('#firstPage').hide();
			$('#otherPage').html(data).show();
		},

		//批量导入
		initExportTopic:function(data){
			$('#firstPage').hide();
			$('#otherPage').html(data).show();
		}

	};

 	$(document).ready(function() {
 		//加载新增首页
		$.get("../templates/exam_paper_add.html",function(data){
			pages.initAddPaper(data);
		});
	});
	
//难度
function topicDifficulty(){
	$("#js_topicDifficultyStart").html(Tiku.topicDifficulty_star());
	Tiku.topicDifficulty_end("0.1");			
}

 });
 
 function setSuijiTopics(params,texts){
 	$.ajax({
			type: 'POST',
			data:Ambow.encode(params),
			dataType: 'json',
			url: G_URL.findtopictypegroupbycateidlist,
			contentType:'application/json;charset=UTF-8',
			success:function(data){
				var list = data.list;
				var htm='';
				for(var i=0,len=list.length;i<len;i++){
					var rec = list[i];
					if(i==(len-1)){
						topicTypeSelectAble={
							"1":rec.radio,
							"2":rec.choice,
							"3":rec.judgment,
							"4":rec.match,
							"5":rec.sort,
							"6":rec.blank,
							"7":rec.answer,
							"8":rec.discourse
						};
					}
					var nName=texts[i];
					if(i==len-1){
						nName = "去除重复后";
					}
					htm+= '<tr>';
					htm+= '<td align="center">'+nName+'</td>';
					htm+= '<td align="center">'+rec.radio+'</td>';
					htm+= '<td align="center">'+rec.choice+'</td>';
					htm+= '<td align="center">'+rec.judgment+'</td>';
					htm+= '<td align="center">'+rec.match+'</td>';
					htm+= '<td align="center">'+rec.sort+'</td>';
					htm+= '<td align="center">'+rec.blank+'</td>';
					htm+= '<td align="center">'+rec.answer+'</td>';
					htm+= '<td align="center">'+rec.discourse+'</td>';
					htm+='</tr>';
				}

				$('#main_points_tbody').html(htm);


			}
		});
 }
