

	var editUlhtml = null,    //编辑公用部分
	    editradiohtml =null,  //radio编辑
		editcheckhtml = null, //check编辑
		editHtml      =null,  //edit区域操作
		checkboxhtml  =null,
		separatehtml  =null,
	    radiohtml     =null;
		 /*编辑公用部分
		 --------------------------------------------------------------*/
        editUlhtml = "<li class=\"upli\" onClick='Upli(this);'><a href=\"javascript:;\" >上移</a></li>";
		editUlhtml = editUlhtml + "<li class=\"downli\" onClick='Downli(this);'><a href=\"javascript:;\">下移</a></li><li class=\"delrecord\" onClick='delRecord(this);'><a href=\"javascript:;\" >删除</a></li>";

	   /*radio编辑
	   --------------------------------------------------------------*/
       editradiohtml= editUlhtml + "<li class=\"editrecord\" onClick='editRadio(this);'><a href=\"javascript:;\">编辑</a></li>";
	   /*radio编辑
       --------------------------------------------------------------*/
	   editcheckhtml= editUlhtml + "<li class=\"editrecord\" onClick='editCheck(this);'><a href=\"javascript:;\">编辑</a></li>";

	   /*分隔号
       --------------------------------------------------------------*/
	   editSeparatehtml= editUlhtml + "<li class=\"editrecord\" onClick='editSeparate(this);'><a href=\"javascript:;\">编辑</a></li>";

	   	//单选显示区
	    radiohtml = "<li class='question_panel'>";
		radiohtml = radiohtml + "<h3 class=\"question_title\"><i>1</i><span>新建单选题</span></h3>";
		radiohtml = radiohtml + "<ul class=\"subjectlist\">";
		radiohtml = radiohtml + "<li><input name=\"\" type=\"radio\" value=\"\" />新建单选题 </li>";
		radiohtml = radiohtml + "<li><input name=\"\" type=\"radio\" value=\"\" />新建单选题 </li>";
		radiohtml = radiohtml + "<li><input name=\"\" type=\"radio\" value=\"\" />新建单选题 </li></ul>";

		//多选区
		checkboxhtml = "<li class='question_panel' ><h3 class=\"question_title\"><i>1</i><span>新建多选题</span></h3>";
		checkboxhtml = checkboxhtml + "<ul class=\"subjectlist\">";
		checkboxhtml = checkboxhtml + "<li><input name=\"\" type=\"checkbox\" value=\"\" />我的标题很长很长我的标题很长很长我的标题很长很长我的标题很长很长我的标题很长很长我的标题很长很长我的标题很长很长我的标题很长很长我的标题很长很长我的标题很长很长我的标题很长很长</li>";
		checkboxhtml = checkboxhtml + "<li><input name=\"\" type=\"checkbox\" value=\"\" />新建单选题 </li>";
		checkboxhtml = checkboxhtml + "<li><input name=\"\" type=\"checkbox\" value=\"\" />新建单选题 </li></ul>";

	  /*--===========添加单选选题===========--*/
	 function addradiohtml(){
		 //操作区
		 radiohtml = radiohtml + "<ul class=\"question_side\" >"+  editradiohtml +"</ul></li>";
		 $("#questionlist").append(radiohtml);
		 Resetnumber();
	  }


	 /*--===========添加多选选选题===============--*/
	 function addcheckboxhtml(){
		 checkboxhtml = checkboxhtml  + "<ul class=\"question_side\" >"+ editcheckhtml + "</ul></li>";
		 $("#questionlist").append(checkboxhtml);
		 Resetnumber();
	  }

	/*--===========添加问答===============--*/
	 function addtexthtml(){
		var addtexthtml ="<li class=\"question_panel\"><h3 class=\"question_title\">新建简答题</h3>";
			addtexthtml = addtexthtml+"<textarea name=\"\" cols=\"\" rows=\"\" class=\"default_textarea w510\"></textarea>";
				//操作区
		    addtexthtml=  addtexthtml + "<ul class=\"question_side\" >"+ editUlhtml;
		    addtexthtml = addtexthtml  + "</ul></li>";
			$("#questionlist").append(addtexthtml);
			Resetnumber();
	}

	/*--===========添加判断题===============--*/
	function addjudgehtml(){
	     var addjudgehtml ="<li class=\"question_panel\"><h3 class=\"question_title\"><i>1</i><span>新建判断题</span></h3>";
			 addjudgehtml = addjudgehtml+ "<ul class=\"subjectlist h20\">";
			//操作区
		     addjudgehtml=  addjudgehtml + "<li class=\"judgeli\"><input name=\"\" type=\"checkbox\" value=\"\" />是</li>";
		     addjudgehtml = addjudgehtml + "<li class=\"judgeli\"><input name=\"\" type=\"checkbox\" value=\"\" />否</li></ul>";
		     //操作区
		     addjudgehtml=  addjudgehtml + "<ul class=\"question_side\" >";
		    addjudgehtml = addjudgehtml + editradiohtml +"</ul><br></h2></li>";
			$("#questionlist").append(addjudgehtml);
            Resetnumber();
	}

	/*--===========添加分隔符===============--*/
	function addseparate(){
			separatehtml ="<li class=\"question_panel\"><h2 class=\"separated\">新建分隔符</h2>";
		    separatehtml = separatehtml  + "<ul class=\"question_side\" >"+ editSeparatehtml + "</ul></li>";
			$("#questionlist").append(separatehtml);
		}

	/*--编辑单选项
	----------------------------*/
	function editRadio(obj){
			 //当前区域
			var clickThis  = $(obj).parent().parent();
		    //获得标题数据
			var titleText= $(clickThis).find("h3.question_title").children("span").text();

			//添加选中样式
			if(!$(clickThis).hasClass("selplane")){

				   $(clickThis).addClass("selplane");
			 }

			 $(obj).parent().html("<li class=\"okrecord\"  onClick='okRadio(this);'><a href=\"javascript:;\">确定</a></li>");

			editHtml = "<a href=\"javascript:;\" class=\"inlistdel\"><span>删除</span></a><input name=\"\" type=\"radio\" value=\"\" class=\"default_radio\"/>该项为正确答案";

			//编辑区
			var imputhtml = "<dl class=\"edit_list\"><dt><i>1</i>题干：</dt>";
				imputhtml = imputhtml+"<dd class=\"h30 \"><input type=\"text\" class=\"default_txt\" size=\"50\" value=\""+titleText+"\"/></dd>";
				imputhtml = imputhtml+"<dd class=\"linedd h30\" ><font class=\"wrongfont\">*</font> 分值：<input type=\"text\" class=\"default_txt\" size=\"2\" value=\"1\"/><label class=\"right30\">分</label><input type=\"button\" class=\"btn btn_default add_More\" value=\"批量增加选项\"/></dd>";
                imputhtml = imputhtml+"<dd class=\"linedd\"><ol class=\"onebyone_list\">";

			var edithlishtml='';

			//获得每个选项
			$(clickThis).children(".subjectlist").find("li").each(function(i){
				var liText = $(this).text();
				    edithlishtml+="<li><input type=\"text\" class=\"default_txt\" value=\""+liText+"\" size=\"45\"/>"+editHtml+"</li>";
			});

		   imputhtml = imputhtml + edithlishtml+"</ol></dd></dl>";

			//切换表现区&编辑区
			$(clickThis).children('.subjectlist').remove();
			$(clickThis).children('h3').remove();
			$(clickThis).children('hr').remove();
			$(clickThis).append( imputhtml);
			Resetnumber();
		 }

		/*--编辑多选项
     	----------------------------*/
		 function editCheck(obj){
			 //当前区域
			var clickThis  = $(obj).parent().parent();
		    //获得标题数据
			var titleText= $(clickThis).find("h3.question_title").children("span").text();
            $(obj).parent().html("<li class=\"okrecord\"  onClick='okCheck(this);'><a href=\"javascript:;\">确定</a></li>");

			//添加选中样式
			 if(!$(clickThis).hasClass("selplane")){
				   $(clickThis).addClass("selplane");
			 }


			  editCheckhtml = "<a href=\"javascript:;\" class=\"inlistdel\"><span>删除</span></a><input name=\"\" type=\"checkbox\" value=\"\" />该项为正确答案";

			//编辑区
			var imputhtml = "<dl class=\"edit_list\"><dt><i>1</i>题干：</dt>";
				imputhtml = imputhtml+"<dd class=\"h30 \"><input type=\"text\" class=\"default_txt\" size=\"50\" value=\""+titleText+"\"/></dd>";
				imputhtml = imputhtml+"<dd class=\"linedd h30\" ><font class=\"wrongfont\">*</font> 分值：<input type=\"text\" class=\"default_txt\" size=\"2\" value=\"2\"/><label class=\"right30\">分</label><input type=\"button\" class=\"btn btn_default add_More\" value=\"批量增加选项\"/></dd>";
                imputhtml = imputhtml+"<dd class=\"linedd\"><ol class=\"onebyone_list\">";

			var edithlishtml='';

			//获得每个选项
			$(clickThis).children(".subjectlist").find("li").each(function(i){
				var liText = $(this).text();
				    edithlishtml+="<li><input type=\"text\" class=\"default_txt\" value=\""+liText+"\" size=\"45\"/>"+editCheckhtml+"</li>";
			});

		   imputhtml = imputhtml + edithlishtml+"</ol></dd></dl>";

			//切换表现区&编辑区
			$(clickThis).children('.subjectlist').remove();
			$(clickThis).children('h3').remove();
			$(clickThis).children('hr').remove();
			$(clickThis).append( imputhtml);
			Resetnumber();
		 }

	    /*--编辑简答题
     	----------------------------*/
		function editSeparate(obj){
		 	 //当前区域
			var clickThis  = $(obj).parent().parent();
		    //获得标题数据
			var titleText= $(clickThis).find("h2").text();

			//添加选中样式
			 if(!$(clickThis).hasClass("selplane")){
				   $(clickThis).addClass("selplane");
			 }
	        $(obj).parent().html("<li class=\"okrecord\"  onClick='okRadio(this);'><a href=\"javascript:;\">确定</a></li>");
			//编辑区
			var imputhtml = "<input type=\"text\" class=\"default_txt\" size=\"70\" value=\""+titleText+"\"//>";

			$(clickThis).children('h2').remove();
			$(clickThis).append( imputhtml);
		 }


		//单选编辑完成
		 function okRadio(obj){
			var clickThis  = $(obj).parent().parent();//当前显示区

			$('.question_side').html(editradiohtml);

			var newliFrist ="<li><input name=\"\" type=\"radio\" value=\"\" />"
			var newliend   ="</li>";

			var c = $(clickThis).children(".onebyone_list").find("input").val();//获取文本框值

		 }


	     //确定多选
		 function okRecord2(obj){

			var clickThis  = $(obj).parent().parent();//当前显示区
			var thisliList = $(clickThis).children("span.sub_title");

			$(clickThis).children(".question_edit").hide();

			var newliFrist ="<li><input name=\"\" type=\"checkbox\" value=\"\" />"
			var newliend   ="</li>";


			var c = $(clickThis).children(".question_edit").find("textarea").val();//获取文本框值
			var arr = c.split('\n');//数据分割
			var allnumber = $(arr).length -1;

			//批量赋值
			for(var j=allnumber ; j >= 0 ; j-- ){
				var subtitle = arr[j];
				var newli = newliFrist + ""+ subtitle +" </span>" +newliend;
				if( j!= allnumber || arr[j] != ''){
				  $(clickThis).children(".subjectlist").prepend(newli);
				}
			 }
			 $(clickThis).removeClass("selplane");
		 }


		//交替选中状态
		function ConcelBorder(obj)
		{
			$(obj).parent().parent().each(function() {
			$(obj).removeClass("selplane");
			});
		}


		//上移
		function Upli(obj){

			alert("向上移动");
			 var onthis = $(obj).parent().parent();//当前
			 var getup =  $(obj).parent().parent().prev();//上一个

			 if(getup.html()!=null)
			 {
			  $(getup).before(onthis);
			  $(onthis).addClass("selplane");
			  ConcelBorder();
			 }
		}

		//下移
		function Downli(obj){
			var onthis  = $(obj).parent().parent();//当前
			var getdown = $(obj).parent().parent().next();//下一个
			if(getdown.html()!=null)
			{
			  $(getdown).after(onthis);
			  $(onthis).addClass("selplane");
			}

		}

	     //删除
       function delRecord(obj){
			 $(obj).parent().parent().remove();
		}

		//删除子项
		$('.inlistdel').live('click', function() {
			$(this).parent().remove();
		})

	//重新写入序号
	function Resetnumber(){
		for(var i=0; i<$(".question_panel i").length; i++ ){
		    $(".question_panel i").eq(i).text((i+1))
	    };
	}

	//批量添加
	$('.add_More').live('click', function(e) {
		     e.preventDefault();
			 $.fn.nyroModalManual({
				 width:520,
				 url:'overlay_question_addmore.shtml'
			 });
			return false;
	});

	Resetnumber();
