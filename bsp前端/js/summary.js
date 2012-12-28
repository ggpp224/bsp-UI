 if (!summary) var summary ={};






 /*  --------------- Tab ---------------- */
summary.tabs = function (){
		$("#explore_nav li a").click(function() {
        var curList = $("#explore_nav li a.current").attr("rel");
        var $newList = $(this);
        //var curListHeight = $("#tablist_cont").height();

        //$("#tablist_cont").height('auto');
        $("#explore_nav li a").removeClass("current");
        $newList.addClass("current");

        var listID = $newList.attr("rel");

        if (listID != curList) {
            $("#"+curList).fadeOut(100, function() {
                $("#"+listID).fadeIn(100);
                var newHeight = $("#"+listID).height();

            });
         }
        return false;
    });

};



/*  --------------- 交替行 & 选择行 ---------------- */
summary.tablehover = function (opt){
		  var opt = opt||{};
		  //交替行
		  if(!opt.serial){
		  	$('tbody > tr:odd').toggleClass('tdalt');
		  }else{
		  	$('.dragtalbe-serial > tr:odd').toggleClass('tdalt');
		  	$('.dragtalbe-content > tr:odd').toggleClass('tdalt');

		  }
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
			var debugStr = "刚拖完第 "+row.id+" 行. 新顺序为: ";
			for (var i=0; i<rows.length; i++) { debugStr += rows[i].id+" "; }
			 $("#debugArea").html(debugStr);  //  输出
			},
			onDragStart: function(table, row) { $("#debugArea").html("正拖拽第 "+row.id+" 行..."); }
			});


};


// 系统维护排序功能
summary.tableRank = function (opt){
		  var opt = opt||{};
		  //交替行
		  if(!opt.serial){
		  	$('tbody > tr:odd').toggleClass('tdalt');
		  }else{
		  	$('.dragtalbe-serial > tr:odd').toggleClass('tdalt');
		  	$('.dragtalbe-content > tr:odd').toggleClass('tdalt');

		  }
		  //选择行
		  $('tbody > tr').hover(
		  function(){$(this).addClass('mouseOver');},
		  function(){$(this).removeClass('mouseOver');}
		  );

			//交替行
			//$("#dragtable tr:even").addClass("tdalt");

			//拖拽行
			$("#dragtable").tableDnD({
			onDragClass: "myDragClass",
			onDrop: function(table, row){
				var i=1;
				$(table).find('.openable_tbody').find('.first').each(function(){
					$(this).text(i++);
				});
			},
			onDragStart: function(table, row) {}
			});


};







