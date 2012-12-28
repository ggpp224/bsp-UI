$('.trdel').live('click',function(){
	$(this).parent().parent().remove();
});
require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','ListView','WdatePicker'],function(){

$(function(){
	var list = Ambow.create('Ambow.view.ListView',{
	  		id:'list1',
	 		renderTo:'load_resoucesList',
	 		pager:new Ambow.view.ListPager({pageSize:G_PAGESIZE,totalCountMap:'rCount'}),
	 		store: Ambow.create('Ambow.store.ListStore',{
	 			id:'store11',
	 			url:G_URL.findlistbyexamimplementdto,
	 			root:'list',
	 			params:{

	 			}
	 		}),
			checkboxs:true,
	 		columns: [/*{
	            header: '',
	            width: .04,
	            dataIndex: 'b',
	            render:function(dt){
	            	return '';
	            }
	        }  ,*/{
	            header: '试卷名称',
	            dataIndex: 'implementName',
				render: function(dt,row){
					return '<span id="'+row.serNo+'">'+dt+'</span>';
				}
	        },{
	            header: '关联培训计划',
	            dataIndex: 'trainImplCode'
	        },{
	            header: '状态',
	            dataIndex: 'paperTotalScore'
	        },{
	            header: '开始时间',
	            dataIndex: 'beginTime'
	        },{
	            header: '截止时间',
	            dataIndex: 'endTime'
	        },{
	            header: '操作',
	            dataIndex: 'a',
				width:82,
	            render:function(dt,row){
	            	//return '<a href="#" class="tabico_edit" title="编辑">编辑</a><a href="javascript:" class="tabico_del trdel"  title="删除">删除</a>';
					return '<a href="#" class="tabico_edit" title="编辑">编辑</a><a href="javascript:" class="tabico_del trdel"  title="删除">删除</a><span title="更多操作" class="more_action"><i>更多操作</i><ul class="more_action_list"><li class="arrowli"></li><li><a href="overlay_updatepaper1.shtml" class="updatepaper" title="上传试卷">上传试卷</a></li><li><a href="overlay_updatepaper2.shtml" class="updatepaper" title="导入成绩">导入成绩</a></li><Li><a href="#">查看反馈结果</a></Li></ul></span>';
	            }
	        }]
	  	});
	  	list.render();
	  	var store = list.store;
	 	store.load();

	$('#search').click(function(){
			var num = list.getCheckedRecords();
			for(var i=0,n=num.length;i<n;i++){
				alert(num[i].id);
			}
	});


	cbs.tablehover(); //多选按钮

	cbs.selbtnmenu();

	$("a.tabico_stop").click(function () {
		$(this).toggleClass("tabico_start");
		if($(this).hasClass('tabico_start')){
		$(this).attr('title', '开始');
		$(this).text('开始');
		}
		else{
		$(this).attr('title', '停止');
		$(this).text('停止');
			}
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

	//上传试卷 & 导入成绩 & 导入考勤
	$('.updatepaper').nyroModal({
		width: 400
	});

});

});


