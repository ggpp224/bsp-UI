/**
 * @author dqj
 * @datetime 2012-8-8
 * @description exammanage.js
 */

//批量调整所属知识点
var knowledge_batch_edit=true,knowledge_idList=[];
require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','ListView','WdatePicker','common','dxtree'],function(){
$(function(){
		// 点击数时传递的知识id
		var companyCategoryId='',categoryCode='', tempCategoryCode='';

	//资源树
		dhtmlXTreeObject.prototype._loadDynXML = function(e, d) {
			var d = d || this.XMLsource,
			f = (new Date).valueOf();
			this._ld_id = e;
			this.loadXML(d + getUrlSymbol(d) + "parentId=" + this._escape(e))
		};
		var tree = new dhtmlXTreeObject({
			skin: G_ROOT+"js/libs/dxtree/dhx_skyblue",
			parent: "load_html_data",
			image_path: G_ROOT+"js/libs/dxtree/imgs/csh_books/",
			checkbox: false
		});


		//从json对象中获取数据生成树
		tree.setXMLAutoLoading(G_URL['findtreebyparentid']+'?companyId='+G_COMPANYID+'&callback=');
		tree.setDataMode("json");
		tree.loadJSON(G_URL['findtreebyparentid']+'?parentId=0&companyId='+G_COMPANYID+'&callback=',function(){
			var rootId = tree.getItemIdByIndex(0,0);
			tree.openItem(rootId);
			tree.selectItem(rootId);
			categoryCode = rootId;
			var companyCategoryId = rootId;
			store.load();
			$.getJSON(G_URL.selectbycompanycategoryid+'?companyId='+G_COMPANYID+'&companyCategoryId='+companyCategoryId+'&knowlName=&createrId=&callback=&pageno=1&pagesize=1000000000',function(data){
				if(data.returnCode=='000000'){
					var html='';
					for(var i in data.list){
						var v = data.list[i];
						html+='<option value="'+v.id+'">'+v.knowlName+'</optioin>';
					}
					$('#js_knowledgeId').html('<option value="">全部</optioin>'+html);
				}
			})

		});

		tree.attachEvent("onClick", function(id, id2){   //id本次点击的id值，id2是点击上一次节点的id值
			companyCategoryId = id;
			categoryCode=tree.getUserData(id,'categoryCode');
			tempCategoryCode=tree.getUserData(id,'categoryCode');
			$.getJSON(G_URL.selectbycompanycategoryid+'?companyId='+G_COMPANYID+'&companyCategoryId='+companyCategoryId+'&knowlName=&createrId=&callback=&pageno=1&pagesize=1000000000',function(data){
				if(data.returnCode=='000000'){
					var html='';
					for(var i in data.list){
						var v = data.list[i];
						html+='<option value="'+v.id+'">'+v.knowlName+'</optioin>';
					}
					$('#js_knowledgeId').html('<option value="">全部</optioin>'+html);
				}
			})
			store.refresh({
					params:{
						companyId			:	G_COMPANYID ,
						companyCode			:	categoryCode || '00000',
						topicTypeId			:	$('#js_topicTypeId').val() || '',
						knowledgeId			:	$('#js_knowledgeId').val() || '',
						topicContentSummary	:	$('#js_topicContentSummary').val() || '',
						topicDifficultyStart:	$('#js_topicDifficultyStart select').val() || '',
						topicDifficultyEnd	:	$('#js_topicDifficultyEnd select').val() || '',
						callback			:	''
					}
			});
		});
	 //资源树 end

	var user = G_USER['id'];

	

	cbs.selbtnmenu();//下拉菜单
	var list = Ambow.create('Ambow.view.ListView',{
	  		id:'list1',
	 		renderTo:'load_resoucesList',
	 		checkboxs:true,
	 		pager:new Ambow.view.ListPager({pageSize:G_PAGESIZE,totalCountMap:'rCount'}),
	 		store: Ambow.create('Ambow.store.ListStore',{
	 			id:'store11',
	 			url:G_URL.findlistbytopicdto,
	 			root:'list',
	 			params:{
					companyId			:	G_COMPANYID ,
					companyCode			:	categoryCode || '00000',
					topicTypeId			:	$('#js_topicTypeId').val() || '',
					knowledgeId			:	$('#js_knowledgeId').val() || '',
					topicContentSummary	:	$('#js_topicContentSummary').val() || '',
					topicDifficultyStart:	$('#js_topicDifficultyStart select').val() || '',
					topicDifficultyEnd	:	$('#js_topicDifficultyEnd select').val() || '',
					callback			:	''
	 			}
	 		}),
	 		columns: [/*{
	            header: '<input id="checkboxall" type="checkbox">',
	            width: .04,
	            dataIndex: 'b',
	            render:function(dt){
	            	return '<input type="checkbox" class="chkc" name="checkall" />';
	            }
	        },*/{
	            header: '题型',
	            dataIndex: 'tpid',
	            render:function(dt,row){
	            	return '<span topicid="'+row.id+'" type="'+row.topicTypeId+'" status="'+row.status+'">'+G_topicType[row.topicTypeId][0]+'</span>';
	            }
	        },{
	            header: '题干',
	            dataIndex: 'tigan',
				render:function(dt,row){
	            	var str=strip_tags(row.topicContentSummary);
	            	if(limit_page(10263281)){
	            		return '<a href="javascript:" title="'+str+'">'+str+'</a>';
	            	}else{
	            		return str;
	            	}
					
	            }
	        },{
	            header: '所属知识点',
	            dataIndex: 'zsd',
				render:function(dt,row){
					var str=[];
	            	for(var i in row.knowlNameList){
						var v=row.knowlNameList[i];
						str.push($.trim(v.knowlName));
					};
					str=($.trim(str.join(','))).slice(0,6);
					return str
	            }
	        },{
	            header: '难度',
	            dataIndex: 'topicDifficulty'
	        },{
	            header: '创建人',
				width: 80,
	            dataIndex: 'createName'
	        },{
	            header: '创建时间',
	            dataIndex: 'ct',
				render:function(dt,row){
	            	var d=new Date(row.createTime);
	            	return d.format("yyyy-MM-dd");
	            }
	        },
			/* {
	            header: '启用状态',
	            dataIndex: 'st',
	            render:function(dt,row){
	            	var s='';
	            	if(row.status==1){
	            		s = '停用';
	            	}else{
	            		s = '启用';
	            	}
	            	return s;
	            }
	        }, */
			{
	            header: '操作',
				width:100,
	            dataIndex: 'a',
	            render:function(dt,row){
	            	var crt = '';
	            	if(limit_page(10263282)){
	            		crt +='<a class="tabico_view preview" title="预览" target="_blank" href="javascript:void(0)">预览</a>';
	            	}else{
	            		crt +='<a class="tabico_view gray" title="预览" href="javascript:void(0)">预览</a>';
	            	}
	            	if(limit_page(10263283)){
	            		crt +='<a class="tabico_edit edit" title="编辑" tid="'+row.id+'" topicTypeId="'+row.topicTypeId+'" href="javascript:">编辑</a>';
	            	}else{
	            		crt +='<a class="tabico_edit gray" title="编辑"  href="javascript:">编辑</a>';
	            	}
	            	if(limit_page(10263284)){
	            		crt +='<a class="tabico_del trdel" title="删除" href="javascript:">删除</a>';
	            	}else{
	            		crt +='<a class="tabico_del gray" title="删除" href="javascript:">删除</a>';
	            	}
					//return '<a class="tabico_view preview" title="预览" target="_blank" href="javascript:void(0)">预览</a> <a class="tabico_edit edit" title="编辑" tid="'+row.id+'" topicTypeId="'+row.topicTypeId+'" href="javascript:">编辑</a> <a class="tabico_del trdel" title="删除" href="javascript:">删除</a>';
	            	return crt;
	            	var s='';
	            	if(row.status==1){
	            		s = '启用';
	            	}else{
	            		s = '停用';
	            	}
	            	//return '<a href="#" class="tabico_edit" title="编辑">编辑</a><span title="更多操作" class="more_action"><i>更多操作</i><ul class="more_action_list"><li class="arrowli"></li><li><a href="javascript:void(0)" title="预览" class="stopthis preview">预览</a></li><li><a href="javascript:void(0)" title="暂停/启用" class="stopthis startorstop">'+s+'</a></li><Li><a href="javascript:void(0)" title="编辑" tid="'+row.id+'" topicTypeId="'+row.topicTypeId+'" class="stopthis edit">编辑</a></Li><Li><a href="javascript:void(0)" title="删除" class="stopthis trdel">删除</a></Li></ul></span>';//<a href="#" class="tabico_del"  title="删除">删除</a>
	            	//return '<a href="#" class="tabico_edit" title="编辑">编辑</a><span title="更多操作" class="more_action"><i>更多操作</i><ul class="more_action_list"><li class="arrowli"></li><li><a href="javascript:;" onClick="location=\'preview.shtml?id=\'+row.id+\'&topicTypeId=\'+row.topicTypeId" title="预览" class="stopthis preview">预览</a></li><li><a href="javascript:void(0)" title="暂停/启用" class="stopthis startorstop">'+s+'</a></li><Li><a href="javascript:void(0)" title="编辑" class="stopthis edit">编辑</a></Li><Li><a href="javascript:void(0)" title="删除" class="stopthis trdel">删除</a></Li></ul></span>';//\'preview.shtml?id=\'+id+\'&topicTypeId=\'+topicTypeId  <a href="#" class="tabico_del"  title="删除">删除</a>
	  				//return '<a href="#" class="tabico_edit" title="编辑">编辑</a><span title="更多操作" class="more_action"><i>更多操作</i><ul class="more_action_list"><li class="arrowli"></li><li><a href="javascript:;" title="预览" class="stopthis preview">预览</a></li><li><a href="javascript:void(0)" title="暂停/启用" class="stopthis startorstop">'+s+'</a></li><Li><a href="javascript:void(0)" title="编辑" class="stopthis edit">编辑</a></Li><Li><a href="javascript:void(0)" title="删除" class="stopthis trdel">删除</a></Li></ul></span>';//\'preview.shtml?id=\'+id+\'&topicTypeId=\'+topicTypeId  <a href="#" class="tabico_del"  title="删除">删除</a>
	            }
	        }]
	  	});
	  	list.render();
	  	var store = list.store;

		list.on('afterrender',function(){
			cbs.tablehover();
			$("#list1 tr").find("td:lt(4)").css({"text-align":"center"});
			$('.exammanage_text_red').find('b').text(list.store.totalCount);
			// 试卷导出
			if (tempCategoryCode == '') tempCategoryCode = '00000';
			$('.exportTopic').attr('href',G_URL.findlistbycompanycodetoexcel+'?_dc=1351501280862&companyId='+G_COMPANYID+'&creatorId='+user+'&companyCode='+tempCategoryCode+'&topicTypeId='+$('#js_topicTypeId').val()+'&knowledgeId='+$('#js_knowledgeId').val()+'&topicContentSummary='+$('#js_topicContentSummary').val()+'&topicDifficultyStart='+$('#js_topicDifficultyStart select').val()+'&topicDifficultyEnd='+$('#js_topicDifficultyEnd select').val());
			//$('.exportTopic').attr('target','_blank');
		});

$("#js_topicDifficultyStart").html(Tiku.topicDifficulty_star());
Tiku.topicDifficulty_end("0.1");
	//cbs.showSearchPanel(); //搜索区
	$('#js_search').live('click',function(){
		store.refresh({
				params:{
					companyId			:	G_COMPANYID,
					companyCode			:	categoryCode || '00000',
					topicTypeId			:	$('#js_topicTypeId').val() || '',
					knowledgeId			:	$('#js_knowledgeId').val() || '',
					topicContentSummary	:	$('#js_topicContentSummary').val() || '',
					topicDifficultyStart:	$('#js_topicDifficultyStart select').val() || '',
					topicDifficultyEnd	:	$('#js_topicDifficultyEnd select').val() || '',
					pageno				:	1,
					callback			:	''
				}
		});
		if($('#list1').hasClass('first-page')){
			$('.first-page').click();
		}

	});

	$("#list1 .gradual_bg th:lt(4)").addClass("th_center");
	//批量删除
	$('#delcustomer').click(function(e) {
			var s = list.getCheckedRecords();
			var ids = [],params = {};
			$.each(s,function(k,v){
				ids.push(v.id);
			});
		if(ids.length>0){
			if(confirm('确定删除吗?')){

				var s = list.getCheckedRecords();
				var ids = [],params = {};
				$.each(s,function(k,v){
					ids.push(v.id);
				});
				params = {
					idList 	 :ids,
					creatorId:user,
					companyId:G_COMPANYID,
					callback :''
				};
				var str = Ambow.encode(params);
				$.ajax({
					type: 'POST',
					data:str,
					dataType: 'json',
					url:G_URL.deltopicbatch,
					contentType:'application/json;charset=UTF-8',
					success:function(data){
						alert(data.returnMsg);
						list.store.refresh();
					}
				});
				return true;
			}
		}else{

			alert('请选择');
			return false;
		}
		return false;

	 });
	//单条数据操作
	 $('.trdel').live('click',function(){
		if(confirm('确定删除吗?')){
			var tid = $(this).closest("tr").children().eq(1).find('span').attr('topicid');
			$.ajax({
				type: 'GET',
				//data:str,
				dataType: 'json',
				url:G_URL.deltopic+'?id='+tid+'&creatorId='+user+'&companyId='+G_COMPANYID+'&callback=',
				contentType:'application/json;charset=UTF-8',
				success:function(data){
					alert(data.returnMsg);
					list.store.refresh();
				}
			});
			return true;
		}
		return false;
	 });
	 //跳转编辑页面
	 $('.edit').live('click',function(){

	 	var tid = $(this).attr('tid');
	 	var topicTypeId = $(this).attr('topicTypeId');


	 	//var tid = $(this).parent().parent().parent().parent().parent().children().siblings().eq(1).find('span').attr('topicid');
	 	var type = $(this).parent().parent().parent().parent().parent().children().siblings().eq(1).find('span').attr('type');
	 	type = $.trim(type);
	 	switch(topicTypeId){
	 		case '1':window.location.href=G_topicType['1'][1]+'_edit.shtml?id='+tid+'&topicTypeId='+topicTypeId;break;
	 		case '2':window.location.href=G_topicType['2'][1]+'_edit.shtml?id='+tid+'&topicTypeId='+topicTypeId;break;
	 		case '3':window.location.href=G_topicType['3'][1]+'_edit.shtml?id='+tid+'&topicTypeId='+topicTypeId;break;
	 		case '4':window.location.href=G_topicType['4'][1]+'_edit.shtml?id='+tid+'&topicTypeId='+topicTypeId;break;
	 		case '5':window.location.href=G_topicType['5'][1]+'_edit.shtml?id='+tid+'&topicTypeId='+topicTypeId;break;
	 		case '6':window.location.href=G_topicType['6'][1]+'_edit.shtml?id='+tid+'&topicTypeId='+topicTypeId;break;
	 		case '7':window.location.href=G_topicType['7'][1]+'_edit.shtml?id='+tid+'&topicTypeId='+topicTypeId;break;
	 		case '8':window.location.href=G_topicType['8'][1]+'_edit.shtml?id='+tid+'&topicTypeId='+topicTypeId;break;
	 	}
	 });
	//权限控制

	showOrHide(10263274,'js_search');  //查询按钮
	showOrHide(10263275,'js_add');     //新增
	showOrHide(10263278,'js_pldr');  //批量导入
	showOrHide(10263279,'knowledge_batch_edit');  //调整知识点
	showOrHide(10263280,'delcustomer');  //删除


	 
	 //启用停用
	 $('.startorstop').live('click',function(){
	 	var tid = $(this).parent().parent().parent().parent().parent().children().siblings().eq(1).find('span').attr('topicid');
	 	var status = $(this).parent().parent().parent().parent().parent().children().siblings().eq(1).find('span').attr('status');
	 	$.ajax({
	 		type: 'GET',
			//data:str,
			dataType: 'json',
			url:G_URL.updatetopicstatus+'?id='+tid+'&status='+(status==0?1:0)+'&creatorId='+user+'&companyId='+G_COMPANYID+'&callback=',
			contentType:'application/json;charset=UTF-8',
			success:function(data){
				alert(data.returnMsg);
				list.render();
				var store = list.store;
				store.load();
			}
	 	});

	 });
	 //试题预览页面
	$('.preview').die().live('click',function(){

		var tid = $(this).closest('tr').children().eq(1).find('span').attr('topicid');
	 	var topicTypeId = $(this).closest('tr').children().eq(1).find('span').attr('type');
	 		topicTypeId = $.trim(topicTypeId);
	 		src = 'preview.shtml?id='+tid+'&topicTypeId='+topicTypeId;
	 		//window.open(src,"_blank");
	 		window.open(src);
			  return   false;
	});

	// 批量调整所属知识点
	 $('#knowledge_batch_edit').click(function(){
		var s = list.getCheckedRecords();
		$.each(s,function(k,v){
			knowledge_idList.push(v.id);
		});
		if(knowledge_idList.length==0){
			alert('请选择试题');
			return ;
		}
		$.fn.nyroModalManual({
			width:600,
			title:"批量调整知识点",
			url: 'overlay_exammanage_adjust.shtml'
		});
	});
	 /*//预览
	$('.preview').live('click',function(){
		id = $(this).parents('td[rel="1"]').children('span').text//attr('topicid');
		alert(id);
		//window.location.href='preview.shtml?id='+id+'&topicTypeId='+topicTypeId;
	});*/
	//导出试题

});//[ jquery end ]
});//[ require end ]


//添加子页面JS事件
function getTableList(e){

	  cbs.tablehover();//表单换行颜色 hover

	  cbs.exportbtn();//导出

	  cbs.selbtnmenu();//下拉菜单

	  //导入
	    $('.resources_import').click(function(e) {
			e.preventDefault();
			$.fn.nyroModalManual({
				width:650,
				height:300,
				url: 'overlay_resources_import.shtml'
			});
	  	return false;
	 });

	  //调整分类
	  $('.departments').click(function(e) {
			G_zsdianChkObj=$(this);
			e.preventDefault();
			$.fn.nyroModalManual({
			    width:600,
				title:"选择知识点",
				url: 'overlay_exammanage_adjust.shtml'
			});
		return false;
	 });


    //删除
//	$('#delcustomer').click(function(e) {
//			e.preventDefault();
//			$.fn.nyroModalManual({
//			    width:380,
//				url: 'overlay_delsector.shtml',
//				title:'系统提示'
//			});
//			return false;
//	 });


	$('.carry_out').nyroModal({width:380});



	//上传
	$(".reupdata").nyroModal({
		width:560
	  });
}