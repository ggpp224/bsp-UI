$('.trdel').live('click',function(){
	$(this).parent().parent().remove();
});
var companyCategoryId=0;
require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','ListView','WdatePicker','dxtree'],function(){

$(function(){

	var termType=getQuery('termType');
		termType=termType || 1;

	var titleArr=['默认全部','按部门查看','按岗位查看','按分组查看'];
	var mUrlArr=['',G_URL['findcompanydeptlist'],G_URL['findcompanypostlist'],G_URL['findcompanygrouplist']];
	$('#mTitle').text(titleArr[termType]);
	document.title='企业商学院 - 培训计划 - '+ titleArr[termType];

	 $('.selbtn button').mouseover(function() {
		$(this).next('ul').slideDown(50);
	 });

	 $('.selbtn').mouseleave(function() {
		$('.newspecial_menu').delay(100).slideUp(50); //延时隐藏
	 });

	var list,store;

	dhtmlXTreeObject.prototype._loadDynXML = function(e, d) {
		var d = d || this.XMLsource,
		f = (new Date).valueOf();
		this._ld_id = e;
		this.loadXML(d + getUrlSymbol(d) + "parentId=" + this._escape(e))
	};
	//--选择部门
	var tree = new dhtmlXTreeObject({
		skin: G_ROOT+"js/libs/dxtree/dhx_skyblue",
		parent: "tree",
		image_path: G_ROOT+"js/libs/dxtree/imgs/csh_books/",
		checkbox: false
	});

	tree.setXMLAutoLoading(mUrlArr[termType]+'?companyId='+G_COMPANYID+'&callback=');
	tree.enableThreeStateCheckboxes(false);
	tree.setDataMode("json");
	tree.loadJSON(mUrlArr[termType]+'?parentId=0&companyId='+G_COMPANYID+'&callback=',function(){
		var rootId = tree.getItemIdByIndex(0,0);
			companyCategoryId = rootId;

			//加载目录后才开始载入列表
			list = Ambow.create('Ambow.view.ListView',{
				id:'list1',
				renderTo:'load_resoucesList',
				checkboxs:false,
				pager:new Ambow.view.ListPager({pageSize:G_PAGESIZE,totalCountMap:'rCount'}),
				store: Ambow.create('Ambow.store.ListStore',{
					id:'store11',
					url:G_URL.findlistbyterms,
					root:'list',
					params:{
						termId		:	companyCategoryId || '' ,
						termType	:	termType,
						status		:	$('#status').val() || '',
						callback	:	''
					}
				}),
				columns: [{
					header: '考试名称',
					dataIndex: 'implementName',
					render: function(dt,row){
						return '<a href="training-implementation_testpaperadd.shtml?id='+row.id+'" id="'+row.id+'">'+row.implementName+'</a>';
					}
				},/* {
					header: '关联计划',
					dataIndex: 'saaa',
					width: 60,
					render:function(dt,row){
						return '<span class="js_status_txt">'+row.status+'</span>';
					}
				}, */{
					header: '考试状态',
					dataIndex: 'ss',
					width: 60,
					render:function(dt,row){
						if(row.status==0){
							var statusTxt='<b class="font_green">进行中</b>',currTime=new Date().valueOf();
							if(currTime<row.beginTime) statusTxt='<b class="font_red">未开始</b>';
							else if(currTime>=row.endTime) statusTxt='<b class="font_gray">已结束</b>';
							return '<span class="online_ks_status">'+statusTxt+'</span>';
						}else{
							return '<span class="online_ks_status">已停止</span>';
						}
					}
				},{
					header: '开始时间',
					dataIndex: 'sTime',
					render:function(dt,row){
						var d=new Date(row.beginTime);
						return d.format("yyyy-MM-dd hh:mm:ss");
					}
				},{
					header: '截止时间',
					dataIndex: 'eTime',
					render:function(dt,row){
						var d=new Date(row.endTime);
						return d.format("yyyy-MM-dd hh:mm:ss");
					}
				},{
					header: '阅卷完成状态',
					dataIndex: '_sta',
					render:function(dt,row){
						return '';
					}
				}]
		});
		list.render();
		store = list.store;
		list.on('afterrender',function(){
			$("#list1 td,#list1 th").css({"text-align":"center"});
			$('.exammanage_text_red').find('b').text(list.store.totalCount);
		});
			store.load();
			tree.openItem(rootId);
			tree.selectItem(rootId);
			$('#testpaper_btn').click();


	});

	tree.attachEvent("onClick", function(id, id2){
		companyCategoryId = id;
		store.refresh({
			params:{
				termId		:	companyCategoryId ,
				termType	:	termType,
				status		:	$('#status').val() || '',
				callback	:	''
			}
		});
	});
	 //资源树 end


});
});


