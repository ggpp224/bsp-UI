/**
 * @author gp
 * @datetime 2012-8-8
 * @description 试卷管理
 */

 require(['jquery','ambow','nyroModal','jcookie','knowledgeTree','userjs','ListView'],function(){
 	$(function(){

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
		});
	 //资源树 end
		var user = G_USER['id'];

		cbs.showSearchPanel(); //搜索区
		cbs.exportbtn();//导出
		cbs.selbtnmenu();//下拉菜单

		var list = Ambow.create('Ambow.view.ListView',{
	  		id:'list1',
	 		renderTo:'load_resoucesList',
	 		checkboxs:true,
	 		pager:new Ambow.view.ListPager({pageSize:G_PAGESIZE,totalCountMap:'rCount'}),
	 		store: Ambow.create('Ambow.store.ListStore',{
	 			id:'store11',
	 			url:G_URL.findlistbyexampaperdto,
	 			root:'list',
	 			params:{
	 				companyCode:'',
	 				companyId:G_COMPANYID,
	 				paperName:$('#exam_name').val(),
	 				creatorId:'',
	 				callback:''
	 			}
	 		}),
	 		columns: [{
	            header: '试卷名称',
	            dataIndex: 'paperName'
	        },{
	            header: '试题数',
	            dataIndex: 'topicCount'
	        },{
	            header: '试卷满分',
	            dataIndex: 'paperTotalScore'
	        },{
	            header: '来源',
	            dataIndex: 'creatorId',
	            render:function(dt,row){
	            	return '自建试卷';
	            }
	        },{
	            header: '操作',
	            dataIndex: 'a',
	            render:function(dt,row){
	            	var crt = '';
	            	if(limit_page(10263288)){
	            		crt+='<a href="javascript:void(0)" class="tabico_view preview" title="预览">预览</a>';
	            	}else{
	            		crt+='<a href="javascript:void(0)" class="tabico_view gray" title="预览">预览</a>';
	            	}
	            	if(limit_page(10263288)){
	            		crt+='<a href="training-implementation_testpaperadd.shtml?pid='+row.id+'&pname='+row.paperName+'&trainPlanId=0&isExamination=1"  class="recognizing"  title="发起考试">发起考试</a>';
	            	}else{
	            		crt+='<a href="javascript:void(0)"  class="recognizing gray"  title="发起考试">发起考试</a>';
	            	}
	            	if(limit_page(10263290)){
	            		crt+='<a href="javascript:void(0)" class="tabico_edit edit" title="编辑">编辑</a>';
	            	}else{
	            		crt+='<a href="javascript:void(0)" class="tabico_edit gray" title="编辑">编辑</a>';
	            	}
	            	return crt;
	            	//return '<a href="#" class="tabico_view" title="预览">预览</a><a href="training-implementation_testpaperadd.shtml?pid='+row.id+'&pname='+row.paperName+'&trainPlanId=0&isExamination=1"  class="recognizing"  title="发起考试">发起考试</a><a href="#" class="tabico_edit" title="编辑">编辑</a>';
	            }
	        }]
	  	});
	  	list.render();
	  	var store = list.store;
	 	store.load();
		list.on('afterrender',function(){
			// 试卷导出
			$('.exportExamPaper').attr('href',G_URL.findlistbycompanycodetoexcelExam+'?companyId='+G_COMPANYID+'&companyCode='+tempCategoryCode+'&creatorId='+user+'&paperName='+$('#exam_name').val()+'&creatorId=');
			//$('.exportTopic').attr('target','_blank');
		});

	 	list.on('rowclick',function(c,idx,e){

	 		var rec = store.at(idx);
	 		var view = e.getTarget('a.preview'),
	 			edit = e.getTarget('a.edit');
	 		if(view.length>0){
	 			window.open("examinationpaper_list_view.shtml?id="+rec.get('id'));
	 		}else if(edit.length>0){
	 			if(!Ambow.isEmpty(categoryCode)){
		 			location.href='examinationpaper_list_add.shtml?id='+categoryCode+'&paperId='+rec.get('id');
		 		}else{
		 			alert("请选择一个资源。");
		 		}
	 		}
	 	});
	 	tree.attachEvent("onClick", function(id, id2){
			var examName = $('#exam_name').val();
			categoryCode=id;
			tempCategoryCode=id;
	 		store.refresh({params:{
	 				companyCode:categoryCode,
	 				paperName:examName,
	 				creatorId:'',
	 				pageno:1,
	 				callback:''

	 			}});

		});

	 	//查询
	 	$('#query_btn').click(function(e){
	 		var examName = $('#exam_name').val();
	 		var examOri = $('#ori_select').val();

	 		store.refresh({params:{
	 				categoryCode:categoryCode,
	 				paperName:examName,
	 				companyId:G_COMPANYID,
	 				creatorId:'',
	 				pageno:1,
	 				callback:''

	 			}});

	 	});
	 	
	 	//权限控制
	 	showOrHide(10263285,'query_btn');  //查询按钮
	 	showOrHide(10263286,'add_btn');  //新增按钮
	 	showOrHide(10263287,'delcustomer');  //新增按钮

	 	//新建
	 	$('#add_btn').click(function(e){
	 		if(!Ambow.isEmpty(categoryCode)){
	 			location.href='examinationpaper_list_add.shtml?id='+categoryCode;
	 		}else{
	 			alert("请选择一个资源。");
	 		}
	 	});

	 	//批量删除
	 	$('#delcustomer').click(function(e){
	 		var recs = list.getCheckedRecords();
	 		var ids = [],params = {};
			$.each(recs,function(idx){
	 			ids.push(this.get('id'));
	 		});
			if(ids.length==0){
	 			alert('请选择要删除的试卷');
	 			return;
	 		}
	 		if(!confirm("确定要删除所选中的试卷?")){
	 			return;
	 		}

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
					url: G_URL.delexampaperdbyidlist,
					contentType:'application/json;charset=UTF-8',
					success:function(data){
						if(data.returnCode=='000000'){
							alert("删除成功");
							$('#query_btn').click();
						}else if(data.returnCode=='400004'){
							alert("已经实施的试卷不能删除。");
						}else{
							alert("删除失败");
						}

					}
				});
	 	});

});
});