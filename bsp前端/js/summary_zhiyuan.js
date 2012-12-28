 if (!summary) var summary ={};



 /*  --------------- 下滑 ---------------- */
summary.snsmenu = function (){
	 $('.snsmenu .snstitle').mouseover(function() {
	 $(this).next('.sns_list').fadeIn(1).animate({opacity:1, top: "27px"}, 100);
	 });

	 $('.snsmenu').mouseleave(function() {
	 $('.sns_list').fadeIn(1).animate({opacity: 0, top: "20px"}, 200);
	 $('.sns_list').hide(1);
	 });
};




 /*  --------------- Tab ---------------- */
summary.tabs = function (){
		$("#explore_nav li a").click(function() {
        var curList = $("#explore_nav li a.current").attr("rel");
        var $newList = $(this);
        var curListHeight = $("#tablist_cont").height();

        $("#tablist_cont").height(curListHeight);
        $("#explore_nav li a").removeClass("current");
        $newList.addClass("current");

        var listID = $newList.attr("rel");

        if (listID != curList) {
            $("#"+curList).fadeOut(100, function() {
                $("#"+listID).fadeIn(100);
                var newHeight = $("#"+listID).height();
                $("#tablist_cont").animate({
                    height: newHeight
                },250);
            });
         }
        return false;
    });

};



 /*  --------------- 交替行 & 选择行 ---------------- */
summary.tablehover = function (){
		  //交替行
		  //$('tbody > tr:odd').toggleClass('tdalt');

		  //选择行
		  $('tbody > tr')
		  //.click(function(){
		  //$(".tr_selected").removeClass('tr_selected');
		  //$(this).addClass('tr_selected');
		  //})
		  .hover(
		  function(){$(this).addClass('mouseOver');},
		  function(){$(this).removeClass('mouseOver');}
		  );

			//交替行
			//$("#dragtable tr:even").addClass("tdalt");

			//拖拽行
			$("#dragtable").tableDnD({
			onDragClass: "myDragClass",
			onDrop: function(table, row) {
				var rows = table.tBodies[0].rows;
				//var courseName = rows.childNodes[2].html;
	
	
				var courseName=$('#js_course_tbody_2').find('#'+row.id).children().eq(0).text();
				var teacher = $('#js_course_tbody_2').find('#'+row.id).children().eq(1).text();
				var school = $('#js_course_tbody_2').find('#'+row.id).children().eq(2).text();
				var str = courseName+'-'+teacher+'-'+school;
				var j=1;
				for(var i=0,len=rows.length;i<len;i++){
					if(rows[i].id==row.id){
						j=i+1;
					}
				}
				var debugStr = "您已将  "+str+" 拖至第&nbsp; "+j+"&nbsp;志愿选课";
				//for (var i=0; i<rows.length; i++) { debugStr += rows[i].id+" "; }
				$("#debugArea").html(debugStr);  //  输出
			},
			onDragStart: function(table, row) {
				var rows = table.tBodies[0].rows;
				var j=1;
				for(var i=0,len=rows.length;i<len;i++){
					if(rows[i].id==row.id){
						j=i+1;
					}
				}
				$("#debugArea").html("正拖拽第 "+j+" 行...");}
			});


};




 /*  --------------- 数据表格 ---------------- */
summary.datatable = (function(){

			$('#test').datagrid({
				height:390,
				nowrap: false,
				striped: true,
				url:'datagrid_data.json',
				sortName: 'code',
				sortOrder: 'desc',
				remoteSort: false,
				idField:'code',
				frozenColumns:[[
	                {field:'ck',checkbox:true},
	                {title:'code',field:'code',width:80,sortable:true}
				]],
				columns:[[
			        {title:'Base Information',colspan:3},
					{field:'opt',title:'Operation',width:100,align:'center', rowspan:2,
						formatter:function(value,rec){
							return '<span style="color:red">Edit | Delete</span>';
						}
					}
				],[
					{field:'name',title:'Name'},
					{field:'addr',title:'Address', rowspan:2, sortable:true,
						sorter:function(a,b){
							return (a>b?1:-1);
						}
					},
					{field:'col4',title:'Col41', rowspan:2}
				]],
				pagination:true,
				rownumbers:true,
				toolbar:[{
					id:'btnadd',
					text:'Add',
					iconCls:'icon-add',
					handler:function(){
						$('#btnsave').linkbutton('enable');
						alert('add')
					}
				},{
					id:'btncut',
					text:'Cut',
					iconCls:'icon-cut',
					handler:function(){
						$('#btnsave').linkbutton('enable');
						alert('cut')
					}
				},'-',{
					id:'btnsave',
					text:'Save',
					disabled:true,
					iconCls:'icon-save',
					handler:function(){
						$('#btnsave').linkbutton('disable');
						alert('save')
					}
				}]
			});
			var p = $('#test').datagrid('getPager');
			if (p){
				$(p).pagination({
					onBeforeRefresh:function(){
						alert('before refresh');
					}
				});
			}
		});

