/**
 * @author xzy
 * @datetime 2012-8-16
 * @description mylearning_syn.js
 */

require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','ListView','WdatePicker','personal_sim',],function(){
$(function(){

	var list = Ambow.create('Ambow.view.ListView',{
	  		id:'list1',
	 		renderTo:'load_resoucesList',
	 		pager:new Ambow.view.ListPager({pageSize:G_PAGESIZE,totalCountMap:'rCount'}),
	 		store: Ambow.create('Ambow.store.ListStore',{
	 			id:'store11',
	 			url:G_URL.findexamimplementListbyparam,
	 			root:'list',
	 			params:{
					implementName:'',
					status:'',
					userAccountId:'',
					pagesize:'',
					callback:''
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
	        },*/{
					header: '名称',
					dataIndex: 'implementName',
					render: function(dt,row){
						return '<span id="'+row.serNo+'">'+dt+'</span>';
				     }
	            },{
	            header: '开始时间',
	            dataIndex: 'bt',
				width:100,
	            render:function(dt,row){
	            	var d=new Date(row.beginTime);
	            	return d.format("yyyy-MM-dd");
	            }
	        },{
	            header: '截止时间',
	            dataIndex: 'et',
				width:100,
	            render:function(dt,row){
	            	var d=new Date(row.endTime);
	            	return d.format("yyyy-MM-dd");
	            }
	        },{
					header: '授课教师',
					dataIndex: '222'
	          },
				{
					header: '状态',
					dataIndex: 'status',
					render: function(dt,row){
					     return '<span id="'+row.serNo+'">'+dt+'</span>';

				            }
	            },
				{
					header: '操作',
					dataIndex: 'a',
					render:function(dt,row){
						return '<a class="icon_ent" title="进入" href="#">进入</a><a class="icon_download" title="下载培训资料" href="#">下载培训资料</a><a class="icon_question" title="填写调查问卷" href="#">填写调查问卷</a><a class="icon_cancel overlay_cancel" title="退选" href="overlay_cancel.html">退选</a>';
					}
	        }]
	  	});
	  	list.render();
	  	var store = list.store;
	 	store.load();

	/*$('#search').click(function(){
			var num = list.getCheckedRecords();
			for(var i=0,n=num.length;i<n;i++){
				alert(num[i].id);
			}
	});*/


	/*setTimeout(function(){
		cbs.tablehover(); //多选按钮
		cbs.selbtnmenu();
	},500)*/

			$(document).ready(function() {
				$('.quit_confirm').nyroModal({
						 width: 400
					  });
				cbs.tablehover();//表单换行颜色 hover
				/*$("#topsearch, #listsearch").autocomplete(courses); //AutoComplete*/
				$(".progressBar").each(function(i,n){ $(n).progressBar(); });
				//申请延期
				$('.overlay_extension').nyroModal({
					width: 400
					});
				//记笔记
				$('.overlay_notes').nyroModal({
					width: 700
					});
				//退选
				$('.overlay_cancel').nyroModal({
					width: 400
					});
				//测试题
				$('.overlay_test_1').nyroModal({
					width: 800
					});
		 });








});

});


