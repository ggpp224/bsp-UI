/**
 * @author dqj
 * @datetime 2012-8-8
 * @description exammanage.js
 */

//批量调整所属知识点
var knowledge_batch_edit=true,knowledge_idList=[];
var trainImplId = getQuery('trainImplId');
var implementName = decodeURI(getQuery('implementName'));
var deptId = '';
var getList = function(page){
	var page = page?page:1;
	deptId==''?deptId='6943':deptId=deptId;
	var url = G_TUCA+'cbs_bi/rpcpuserscoredetail/finddeptscore?trainImplId='+trainImplId+'&deptId='+deptId+'&pageno='+page+'&pagesize='+G_PAGESIZE+'&callback=?';
	var html='';
	var page = 1;
	$.getJSON(url,function(data){
		var list = data.list;
		if(list){
			html+='<table id="list1" class="default_table listtab">';
			html+='<thead class="gradual_bg">';
			html+='<tr>';
			html+='<th>部门名称</th>';
			html+='<th>目录代码</th>';
			html+='<th>得分</th>';
			$.each(list[0].topicGroupList,function(k,v){
				var tn = list[0].topicGroupList[k];
				html+='<th>'+tn.topicGroupScore+'</th>';
			});
			html+='</tr>';
			html+='</thead>';
			html+='<tbody>';
			$.each(list,function(k,v){
				if(k!=0){
					html+='<tr class="x-tr">';
					html+='<td>'+list[k].deptName+'</td>';
					html+='<td>'+list[k].deptCode+'</td>';
					html+='<td>'+list[k].totalScore+'</td>';
					$.each(list[k].topicGroupList,function(key,value){
						html+='<td>'+list[k].topicGroupList[key].topicGroupScore+'</td>';	
					})
					html+='</tr>';						
				}		
			});
			html+='</tbody>';
			html+='<tfoot>';
			html+='<tr class="">';
			html+='<td class="tfoot" colspan="9">';
			html+='<div id="pagination"></div>';
			html+='</td>';
			html+='</tr>';
			html+='</tfoot>';
			html+='</table>';
	
		}
		$('#load_resoucesList').html(html);
		$('#pagination').html(gPage(data.rCount,page,'getList',G_PAGESIZE));

	});
}
require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','ListView','WdatePicker','common','dxtree'],function(){
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
		tree.setXMLAutoLoading(G_URL['findcompanydeptlist']+'?companyId='+G_COMPANYID+'&callback=');
		tree.setDataMode("json");
		tree.loadJSON(G_URL['findcompanydeptlist']+'?parentId=0&companyId='+G_COMPANYID+'&callback=',function(){
			var rootId = tree.getItemIdByIndex(0,0);
			tree.openItem(rootId);
			tree.selectItem(rootId);
			categoryCode = rootId;
			//store.load();

		});

		tree.attachEvent("onClick", function(id, id2){
			deptId = id;
			categoryCode=tree.getUserData(id,'categoryCode');
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
//			store.refresh({
//					params:{
//						companyId			:	G_COMPANYID ,
//						companyCode			:	categoryCode || '00000',
//						topicTypeId			:	$('#js_topicTypeId').val() || '',
//						knowledgeId			:	$('#js_knowledgeId').val() || '',
//						topicContentSummary	:	$('#js_topicContentSummary').val() || '',
//						topicDifficultyStart:	$('#js_topicDifficultyStart select').val() || '',
//						topicDifficultyEnd	:	$('#js_topicDifficultyEnd select').val() || '',
//						callback			:	''
//					}
//			});
			getList(1);
		});
	 //资源树 end

	var user = G_USER['id'];


	
	getList(1);
	$('.exportImplementation').click(function(){
		window.location.href=G_TUCA+'cbs_bi/rpcptrainimplscore/deptscorereport?trainImplId='+trainImplId+'&deptId='+deptId+'&trainImplName='+encodeURI(encodeURI(implementName))+'&pageno=1&pagesize=10';
		
	});


//	cbs.selbtnmenu();//下拉菜单
//	var list = Ambow.create('Ambow.view.ListView',{
//	  		id:'list1',
//	 		renderTo:'load_resoucesList',
//	 		checkboxs:true,
//	 		//pager:new Ambow.view.ListPager({pageSize:G_PAGESIZE,totalCountMap:'rCount'}),
//	 		store: Ambow.create('Ambow.store.ListStore',{
//	 			id:'store11',
//	 			url:'http://10.10.6.68:8080/cbs_bi/rpcpuserscoredetail/finddeptscore',
//	 			root:'list',
//	 			params:{
////					companyId			:	G_COMPANYID ,
////					companyCode			:	categoryCode || '00000',
////					topicTypeId			:	$('#js_topicTypeId').val() || '',
////					knowledgeId			:	$('#js_knowledgeId').val() || '',
////					topicContentSummary	:	$('#js_topicContentSummary').val() || '',
////					topicDifficultyStart:	$('#js_topicDifficultyStart select').val() || '',
////					topicDifficultyEnd	:	$('#js_topicDifficultyEnd select').val() || '',
//	 				trainImplId			:   '411',
//	 				deptId				:	'6943',
//					callback			:	'?'
//	 			}
//	 		}),
//	 		columns: [/*{
//	            header: '<input id="checkboxall" type="checkbox">',
//	            width: .04,
//	            dataIndex: 'b',
//	            render:function(dt){
//	            	return '<input type="checkbox" class="chkc" name="checkall" />';
//	            }
//	        },*/{
//	            header: '题型',
//	            dataIndex: 'tpid',
//	            render:function(dt,row){
//	            	return 111;
//	            }
//	        }
//
//	       ]
//	  	});
//	  	list.render();
//	  	var store = list.store;
//
//		list.on('afterrender',function(){
//			cbs.tablehover();
//			$("#list1 tr").find("td:lt(4)").css({"text-align":"center"});
//			$('.exammanage_text_red').find('b').text(list.store.totalCount);
//
//		});


});
});