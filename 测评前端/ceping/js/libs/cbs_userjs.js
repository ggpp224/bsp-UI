 if (!cbs) var cbs ={};

/* Checkbox 全选 
------------------------------------------------------------------------------*/
function checkAll(name) { 
					var el = document.getElementsByTagName('input'); 
					var len = el.length; 
					for(var i=0; i<len; i++) { 
					if((el[i].type=="checkbox") && (el[i].name==name)) { 
					el[i].checked = true; 
					} 
					} 
					} 
					function clearAll(name) { 
					var el = document.getElementsByTagName('input'); 
					var len = el.length; 
					for(var i=0; i<len; i++) { 
					if((el[i].type=="checkbox") && (el[i].name==name)) { 
					el[i].checked = false; 
					} 
					} 
					}

   
/*  表格间隔色
------------------------------------------------------------------------------*/
cbs.tablehover = function (){
         $(".listtab tr").mouseover(function(){ //如果鼠标移到class为表格的tr上时，执行函数
		   $(this).children("td").find('.more_action').show();
          $(this).addClass("over");}).mouseleave(function(){ //给这行添加class值为over，并且当鼠标一出该行时执行函数
		    $(this).children("td").find('.more_action').hide();
          $(this).removeClass("over");}) //移除该行的class
		  $(".listtab tr").filter(":even").addClass('alt');//给class表格的偶数行添加class值为alt 
}


/*  多选按钮
------------------------------------------------------------------------------*/
cbs.selbtnmenu = function () {

	 $('.selbtn button').mouseover(function() {	   
	 $(this).next('ul').slideDown(50);
	 });
	 
	 $('.selbtn').mouseleave(function() {			   
	   $('.newspecial_menu').delay(100).slideUp(50); //延时隐藏
	 });
	
   }
 
/*  导出
------------------------------------------------------------------------------*/
cbs.exportbtn = function () {
	var exportul =$('.exportbtn ul li');
	$(exportul).bind('mouseover',function(){
	  $(this).addClass('lihover');
	  $(this).children('ul').slideDown(50);
	  
	}).bind('mouseleave',function(){
	   $(this).removeClass('lihover');
	     if( exportul.length>1){
		   $(this).children('ul').slideUp(50);
	     }
	});	
}

/*  折叠表格
------------------------------------------------------------------------------*/
    cbs.tablefold = function () {
	
	$("tbody.tr_parent tr:first-child").filter(":odd").addClass('alt');//给class表格的奇数行添加class值为alt 
	
    $('tbody.tr_parent tr.tab_panel').hide();
	
	$('.checked').attr("checked",false);
	
    $("tbody.tr_parent tr:first-child").find(".open_ico").click(function () {
		
		 var onseltr  =  $(this).parent().parent("tr"); //当前行
		 
         var trparent  = $(onseltr).next("tr"); //邻行
		 
		 var selchick = $(onseltr).find('.checkbox');//当前勾选
		 
		 $(trparent).toggle();// 隐藏显示
		 
         $(onseltr).toggleClass("highlighted"); //增加高亮
		 
		 $(this).toggleClass("colse_ico");  //切换图标
		
         if (!$(onseltr).hasClass('highlighted')) {
			$(selchick).attr("checked",false); 

         } else {
            $(selchick).attr("checked",true); 
         }
         return;
        });
	
    }

/* 选项卡
------------------------------------------------------------------------------*/
cbs.hovertabs = function () {
	$(".tabpanel li:first").addClass("curent");
	$(".tabpanelbox div.tab_content:gt(0)").hide();
	$(".tabpanelright div.tab_content:gt(0)").hide();
	
	$(".tabpanel li").click(function(){
      $(this).addClass("curent").siblings("li").removeClass();
	  
      $(".tabpanelbox div.tab_content:eq("+$(this).index()+")").fadeIn('slow').siblings("div.tab_content").hide();
	  $(".tabpanelright div.tab_content:eq("+$(this).index()+")").fadeIn('slow').siblings("div.tab_content").hide();
   });
}

/* select 数量限制*/
   cbs.accountnum = function () {

      $("#account_num_txt").hide();
	  
	  $("#account_num").change(function(){
										 
		  if(this.value=="1"){
			  $("#account_num_txt").show(); 
		   }
		   else{
			  $("#account_num_txt").hide();
		   }  
      });
   }
   
/*  隐藏显示搜索区
------------------------------------------------------------------------------*/  
   cbs.showSearchPanel = function () {
	   var thesidebar = $.cookie('searchbox, searchbox2'); //读取cookie "sidebar"的值
	   //呈现默认状态
	   if(thesidebar=="hide"){
		   $(".searchbox, .searchbox2").hide();
		   $(".showsearch, .showsearch2").show();
		   $(".closebtn2").hide();
	   }else{
		   $(".searchbox, .searchbox2").show();
		   $(".showsearch, .showsearch2").hide();
		   $(".closebtn2").show();
		   }
	   $(".showsearch, .showsearch2").click(function () {
			$(".searchbox, .searchbox2").slideDown('slow');
			$(this).hide();
			$.cookie('searchbox, searchbox2', 'show',{ expires: 2 });
			$(".closebtn2").show();
		});
	   $(".closebtn, .closebtn2").click(function () {
			$(".searchbox, .searchbox2").slideUp('slow');
			$(".showsearch, .showsearch2").show();
			$.cookie('searchbox, searchbox2', 'hide', { expires: 2 });
			$(".closebtn2").hide();
		});	
   }
   

/*  分配课件
------------------------------------------------------------------------------*/  
   cbs.fpPanel = function () {
	   var fpbox = $.cookie('searchbox3'); //读取cookie "sidebar"的值
	   //呈现默认状态
	   if(fpbox=="hide"){
		   $(".searchbox3").hide();
		   $(".closebtn3").hide();
	   }else{
		   $(".searchbox3").show();
		   $(".closebtn3").show();
		   }
	   $(".showsearch3").click(function () {
			$(".searchbox3").slideDown('slow');
			$(this).hide();
			$.cookie('searchbox3', 'show',{ expires: 2 });
			$(".closebtn3").show();
		});
	   $(".closebtn3").click(function () {
			$(".searchbox3").slideUp('slow');
			$(".showsearch3").show();
			$.cookie('searchbox3', 'hide',{ expires: 2 });
			$(".closebtn3").hide();
		});	
   }
   
   
   
/*  浮动层
------------------------------------------------------------------------------*/ 
cbs.itemTip = function () {
	var itemTiplay = $(".item");
	
	$(itemTiplay).mouseover(function(){	
	
	 var itemWidth  = $(this).find("a:first").width();
	 $(this).addClass("selitem");
	 $(this).find('.caption').css({
		 top: '-50px',
		 left: '100px'
		 }).prepend('<div class="tip_part"></div>').fadeIn(200);
	 });
	
	$(itemTiplay).mouseleave(function() {	
	    $(this).removeClass('selitem');
		$(this).find(".caption").fadeOut(30).remove(".tip_part");						 
	 });
   }
    
/* 树弹出层
------------------------------------------------------------------------------*/ 
cbs.treeOverlay = function () { 
 	//添加目录
	 $('.tree_add_child').nyroModal({
			width: 380
	});
	
	//编辑目录
	 $('.tree_edit').nyroModal({
			width: 380
	});
	
	//删除目录
	$(".tree_dell").nyroModal({
		width:380
	});	
	
/*		//批量导入
	$(".tree_imp").nyroModal({
		width:380
	});*/	
}


cbs.textScroll = function () { 
    var scrollTex=$(".divselect li span, .divselect2 li span, .divselect3 li span");
        scrollTex.mouseenter(function(){
	    var conText = $(this).text();
		var comWidth = $(this).width();
        if( conText.length*12 > comWidth ){
          $(this).addClass("scrollpanel");
	      $(this).html("<marquee width='200'  behavior='alternate' align='left' scrollAmount='2'>"+conText+"</marquee>");
	    }
	  }).mouseleave(function(){
		var conText = $(this).text();
		if( conText.length > 1){
		   $(this).removeClass("scrollpanel");
		   $(this).html(conText);
	   }
	});	
}



cbs.textScroll2 = function () {
       $(".divselect2 span").live("mouseenter",function(){
			    var conText = $(this).text();
			    var htmlcontext=$(this).html();
				var comWidth = $(this).width();
		        if( conText.length*12 > comWidth ){
		          $(this).addClass("scrollpanel");
			      $(this).html("<marquee width='200' behavior='alternate' scrollAmount='2'>"+htmlcontext+"</marquee>");
			    }
	   });
	  
       $(".divselect2 span").live("mouseleave",function(){
			var conText = $(this).text();
			var marqueeobj=$(this).children("marquee");
			if(marqueeobj.size()>0){
				 $(this).removeClass("scrollpanel");
				 $(this).html(marqueeobj.html());
			}
       });	

}

// 管理日志 
cbs.textScroll3 = function () { 
    var scrollTex=$(".divselect li b");
        scrollTex.mouseenter(function(){
	    var conText = $(this).text();
		var comWidth = $(this).width();
        if( conText.length*12 > comWidth ){
          $(this).addClass("scrollpanel");
	      $(this).html("<marquee width='300' behavior='alternate' scrollAmount='2'>"+conText+"</marquee>");
	    }
	  }).mouseleave(function(){
		var conText = $(this).text();
		if( conText.length > 1){
		   $(this).removeClass("scrollpanel");
		   $(this).html(conText);
	   }
	});	

}