/**
 * @author dqj
 * @datetime 2012-8-8
 * @description exammanage.js
 */

require(['jquery','ambow','nyroModal','common','jcookie','jstree','userjs','ListView','WdatePicker','dxtree'],function(){
$(function(){
		// 点击数时传递的知识id
		var companyCategoryId='',categoryCode='';
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

			companyCategoryId = tree.getItemIdByIndex(0,0);
			tree.openItem(companyCategoryId);
			tree.selectItem(companyCategoryId);
			categoryCode = tree.getUserData(companyCategoryId,'categoryCode');
			$('#js_search').click();
		})

		tree.attachEvent("onClick", function(id, id2){
			companyCategoryId = id;
			categoryCode=tree.getUserData(id,'categoryCode');
			$('#js_search').click();

		});
	//资源树 end

	// 搜索
	$('#js_search').live('click',function(){
		store.refresh({
				params:{
					'knowlName' : $('#search_knowledge_name').val(),
					'createrId'	: $('#creater_name').val(),
					'companyId' : G_COMPANYID ,
					'companyCategoryId' : companyCategoryId ,
					'pageno'				:	1,
					'callback':''
				}
		});
	});
	var list = Ambow.create('Ambow.view.ListView',{
	  		id:'list1',
	 		renderTo:'load_knowledgeList',
	 		checkboxs:true,
	 		pager:new Ambow.view.ListPager({pageSize:G_PAGESIZE,totalCountMap:'rCount'}),
	 		store: Ambow.create('Ambow.store.ListStore',{
	 			id:'store11',
	 			url:G_URL.selectbycompanycategoryid,
	 			//url:'http://localhost/Knowledge.php',
	 			root:'list',
	 			params:{
					'knowlName' : $('#search_knowledge_name').val(),
					'createrId'	: $('#creater_name').val(),
					'companyId'			: G_COMPANYID,
					'companyCategoryId' : companyCategoryId,
					'callback':''
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
	            header: '知识点名称',
	            dataIndex: 'kname',
				render:function(dt,row){
					if(limit_page(10263288)){
						return '<a id class="show" alt="'+row.id+'" href="javascript:">'+row.knowlName+'</a>';
					}else{
						return row.knowlName;
					}	
	            }
	        },{
	            header: '试题数',
	            dataIndex: 'sts',
				render:function(dt,row){
	            	return '<span id="sts_'+row.id+'">'+row.topicCount+'</span>';
	            }
	        },{
	            header: '创建人',
	            dataIndex: 'cname',
				render:function(dt,row){
	            	return throwNull(row.createName);
	            }
	        },{
	            header: '创建时间',
	            dataIndex: 'ct',
				render:function(dt,row){
	            	var d=new Date(row.createTime);
	            	return d.format("yyyy-MM-dd");
	            }
	        },{
	            header: '操作',
				width:62,
	            dataIndex: 'a',
	            render:function(dt,row){
	            	var crt = '';
	            	if(limit_page(10263288)){
	            		crt += '<a href="javascript:" class="tabico_edit" alt="'+row.id+'" title="编辑知识点">编辑知识点</a>';
	            	}else{
	            		crt += '';
	            	}
					crt +=(row.topicCount==0?'<a href="javascript:" class="tabico_del" alt="'+row.id+'">删除</a>':'');
					return crt;
					//return '<a href="javascript:" class="tabico_edit" alt="'+row.id+'" title="编辑知识点">编辑知识点</a>'+(row.topicCount==0?'<a href="javascript:" class="tabico_del" alt="'+row.id+'">删除</a>':'');
	            }
	        }]
	  	});
	  	list.render();
	  	var store = list.store;
	 	store.load();
		list.on('afterrender',function(){
			cbs.tablehover();
			$('.tabico_edit').each(function(k,v){
				if($(this).next('.tabico_del').length==0) $('.chkc').eq(k).attr('disabled',true);
			})

			$("#list1 tr").find("td:lt(4)").css({"text-align":"center"});
			$('.exammanage_text_red').find('b').text(list.store.totalCount);
		});
		//权限控制
		showOrHide(10263291,'js_search');//查询按钮
		showOrHide(10263292,'js_knowledge_add');//新增知识点
		
		




		function knowledge_add(arr,t){
			var _data={'id':'','knowlName':'','knowlExplain':''};
			var d=arr || _data
			var html =	'<div style="padding:10px 0"><form method="post" action="" name="knowledge_add_form" id="knowledge_add_form"><table border="0" align="center" cellpadding="2" cellspacing="2" >'+
					'<tr><input type="hidden" name="id" value="'+d.id+'" />'+
					'<td height="30" align="right"><i>* </i>知识点名称：</td>'+
					'<td> <input type="text" class="default_txt" '+(t=='show'?'disabled':'')+' id="js_knowledge_add_name" value="'+d.knowlName+'" name="knowlName" size="30" /><span class="error"><span></td>'+
					'</tr>'+
					'<tr>'+
					'<td align="right" valign="top"><i>*</i> 知识点描述：</td>'+
					'<td><textarea class="tarea" '+(t=='show'?'disabled':'')+' id="js_knowledge_add_info" name="knowlExplain" cols="80" rows="6">'+d.knowlExplain+'</textarea><p class="error"></p></td>'+
					'</tr>'+
					'<tr>'+
					'<td align="center">&nbsp;</td>'+
					(t=='show'?'':'<td><input name="" type="button" id="js_knowledge_add_save" class="btn btn_submit" value="保存" /> <input id="js_knowledge_add_close" type="button" class="btn btn_reset overlayClose" value="关闭" /></td>')+
					'</tr>'+
					'</table></form></div>';
			return html;
		};
		// 弹出 新增知识点
		$('#js_knowledge_add').click(function(){
			///if(categoryCode && categoryCode!='00000'){
			if(categoryCode){
				$.fn.nyroModalManual({
					width:600,
					height:290,
					title:'新增知识点',
					content: knowledge_add()
				});
				return false;
			}else alert('请选择资源树节点');
		});
		// 弹出 编辑知识点
		$('.tabico_edit,.show').live('click',function(){
			var t=$(this).attr('class');
			$.getJSON(G_URL['findknowledgebyid']+'?callback=&id='+$(this).attr('alt'),function(data){
				if(data.returnCode=='000000'){
					$.fn.nyroModalManual({
						width:600,
						height:290,
						title:'知识点详细信息',
						content: knowledge_add(data.list[0],t)
					});
				}
			});
		});

		$('#js_knowledge_add_info,#js_knowledge_add_name').live('blur',function(){
			if($(this).val().length>0) $(this).next().empty();
		})

		// 保存 新增/编辑 知识点
		$('#js_knowledge_add_save').live('click',function(){
			var params = Ambow.urlDecode(Ambow.serializeForm('knowledge_add_form'));
			params.knowlName=$.trim(params.knowlName);
			params.knowlExplain=$.trim(params.knowlExplain);
			if(params.knowlName.length<1){
				$('#js_knowledge_add_name').focus();
				$('#js_knowledge_add_name').next().text('知识点名称不能为空');
				return;
			}
			if(params.knowlExplain.length<1){
				$('#js_knowledge_add_info').focus();
				$('#js_knowledge_add_info').next().text('知识点描述不能为空');
				return;
			}
				params['companyCategoryId']=companyCategoryId;
				params['categoryCode']=categoryCode;
				params['companyId']=G_COMPANYID;
				params['creatorId']=G_USER['id'];

			var str = Ambow.encode(params);
			$.ajax({
				type: 'POST',
				data:str,
				dataType: 'json',
				// 根据id区分编辑还是新增
				url: params.id?G_URL['updateKnowledge']:G_URL['addKnowledge'],
				contentType:'application/json;charset=UTF-8',
				success:function(data){
					if(data.returnCode=='000000'){
						alert(data.returnMsg);
						$('#js_knowledge_add_close').click();
						$('#js_search').click();
					}else{
						alert(data.returnMsg);
					}
				}
			});
		});
		// 删除
		$('.tabico_del').live('click',function(){
			var me=$(this)
			if(confirm('确定删除吗?')){
				$.getJSON(G_URL['updatestatusbyprimarykey']+'?callback=&status=1&companyId='+G_COMPANYID+'&creatorId='+G_USER['id']+'&id='+$(this).attr('alt'),function(data){
					if(data.returnCode=='000000'){
						alert('删除成功');
						me.parent().parentsUntil('tbody').remove();
						cbs.tablehover();
						list.store.refresh();
					}
				});
			}
			return false;
		});

		$("#list1 .gradual_bg th:lt(4)").addClass("th_center");


	//批量删除
	$('#delcustomer').click(function(e) {
		var s = list.getCheckedRecords();
		var ids = [],params = {};
		$.each(s,function(k,v){
			if($.trim($('#sts_'+v.id).text())=='0'){
				ids.push(v.id);
			}
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
					creatorId:G_USER['id'],
					companyId:G_COMPANYID,
					callback :''
				};
				var str = Ambow.encode(params);
				$.ajax({
					type: 'POST',
					data:str,
					dataType: 'json',
					url:G_URL.updatestatusbyidlist,
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
			e.preventDefault();
			$.fn.nyroModalManual({
			    width:600,
				title:"选择知识点",
				url: 'overlay_ownership.shtml'
			});
		return false;
	 });



}