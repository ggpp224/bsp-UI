/**
 * @author gp
 * @datetime 2012-8-8
 * @description resources.js
 */

 require(['jquery','ambow','jcookie','jstree','userjs','nyroModal'],function(){

 	$(function(){
 		checkAll(name);//CheckBox全选
		cbs.showSearchPanel(); //搜索区

		$("#load_html_data").jstree({
			"html_data" : {

				"ajax" : {
					"core" : { "initially_open" : [ "root" ] },
					"url" : "data/data_resources.shtml",
					"data" : function (n) {
						return { id : n.attr ? n.attr("id") : 0 };
					}
				}
			},
			"plugins" : [  "themes", "html_data" ,"checkbox","contextmenu","cookies","ui", "crrm","dnd" ]
		});


		/*-------------提示操作 可根据需要删除一下内容----------------*/
		$(".notedit").click(function(){ alert("skillsoft课件不可编辑！"); } ) //提示不可编辑
		$(".noreupload_ico").click(function(){ alert("不可重新上传课件包！"); } ) //提示不可编辑
		$(".tabico_recommend").click(function () {
			$(this).toggleClass("tabico_cancel");
			if($(this).hasClass('tabico_cancel')){
			$(this).attr('title', '未推荐，点击图标推荐该资源');
			$(this).text('未推荐，点击图标推荐该资源');
	        alert("已完成取消推荐操作！该资源将从学员端：课程中心-推荐资源列表中删除！");
			}
			else{
			$(this).attr('title', '已推荐，点击图标取消推荐');
			$(this).text('已推荐，点击图标取消推荐');
			alert("推荐操作成功！该资源将出现在学员端：课程中心-推荐资源列表！");
				}
		 });

		 cbs.treeOverlay();//树操作

		 var loadTable = $("#load_resoucesList", parent.document);
		 var defaultPage ='resources_list.shtml';

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
					title:"设置所属分类",
					url: 'overlay_resources_adjust.shtml'
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

		$('.stopthis').live('click',function(e) {
			reLoadTbaleList();
			alert('我被点击');
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

		$(".tree_imp").click(function(e) {
			e.preventDefault();
			$.fn.nyroModalManual({
				width:380,
				title:'导入目录树',
				url: 'overlay_dep_import.shtml'
			});
			return false;
		});
	 });



 });