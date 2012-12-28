

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

	    /*编辑简答题
       --------------------------------------------------------------*/
	   editquestionhtml= editUlhtml + "<li class=\"editrecord\" onClick='editQuestion(this);'><a href=\"javascript:;\">编辑</a></li>";

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
		    addtexthtml=  addtexthtml + "<ul class=\"question_side\" >"+ editquestionhtml;
		    addtexthtml = addtexthtml  + "</ul></li>";
			$("#questionlist").append(addtexthtml);
			Resetnumber();
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

			 $(obj).parent().html("<li class=\"okrecord\"  onClick='okRadio(this);'><a href=\"javascript:;\">测试</a><a href=\"javascript:;\">确定</a></li>");

			editHtml = "<a href=\"javascript:;\" class=\"inlistdel\"><span>删除</span></a><input name=\"\" type=\"checkbox\" value=\"\" class=\"default_radio judge_input\"/>该项允许填空<input type=\"text\" class=\"default_txt input_empty\" size=\"20\" value=\"\"/>";

			//编辑区
			var imputhtml = "<dl class=\"edit_list\"><dt><i>1</i>题干：</dt>";
				imputhtml = imputhtml+"<dd class=\"h30 \"><input type=\"text\" class=\"default_txt\" size=\"50\" value=\""+titleText+"\"/></dd>";
				imputhtml = imputhtml+"<dd class=\"linedd h30\" ><input name=\"\" type=\"checkbox\" value=\"\" /><label class=\"right30\">必填</label><input name=\"\" type=\"checkbox\" value=\"\" /><label class=\"right30\">一行显示多个</label><input type=\"button\" class=\"btn btn_default add_More\" value=\"批量增加选项\"/></dd>";
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
			$(clickThis).children().find('.input_empty').hide();
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


			  editCheckhtml = "<a href=\"javascript:;\" class=\"inlistdel\"><span>删除</span></a><input name=\"\" type=\"checkbox\" value=\"\" class=\"default_radio judge_input\"/>该项允许填空<input type=\"text\" class=\"default_txt input_empty\" size=\"20\" value=\"\"/>";

			//编辑区
			var imputhtml = "<dl class=\"edit_list\"><dt><i>1</i>题干：</dt>";
				imputhtml = imputhtml+"<dd class=\"h30 \"><input type=\"text\" class=\"default_txt\" size=\"50\" value=\""+titleText+"\"/></dd>";
				imputhtml = imputhtml+"<dd class=\"linedd h30\" ><input name=\"\" type=\"checkbox\" value=\"\" /><label class=\"right30\">必填</label><input name=\"\" type=\"checkbox\" value=\"\" /><label class=\"right30\">一行显示多个</label><input type=\"button\" class=\"btn btn_default add_More\" value=\"批量增加选项\"/></dd>";
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
			(clickThis).children().find('.input_empty').hide();
			Resetnumber();
		 }


		 function editQuestion(obj){
			 var clickThis  = $(obj).parent().parent();//当前显示区
			 //获得标题数据
			 var titleText= $(clickThis).find("h3.question_title").children("span").text();

             $(clickThis).children('.question_side').html("<li class=\"okrecord\"  onClick='okQuestion(this);'><a href=\"javascript:;\">确定</a></li>");

			//添加选中样式
			 if(!$(clickThis).hasClass("selplane")){
				   $(clickThis).addClass("selplane");
			 }
			 var imputhtml = "<dl class=\"edit_list\"><dt><i>1</i>题干：</dt>";
				imputhtml = imputhtml+"<dd class=\"h30 \"><input type=\"text\" class=\"default_txt\" size=\"60\" value=\""+titleText+"\"/></dd>";
				imputhtml = imputhtml+"<dd class=\"linedd h30\" ><input name=\"\" type=\"checkbox\" value=\"\" /><label class=\"right30\">必填</label></dd>";
                imputhtml = imputhtml+"</dl>";


			$(clickThis).children('textarea').remove();
			$(clickThis).children('h3').remove();
			$(clickThis).append( imputhtml);
			Resetnumber();
		 }


		//编辑单选
		 function okRadio(obj){

		 }


	     //确定多选
		 function okRecord2(obj){

		 }


		//交替选中状态
		function ConcelBorder(obj){
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



	//重新写入序号
	function Resetnumber(){
		for(var i=0; i<$(".question_panel i").length; i++ ){
		    $(".question_panel i").eq(i).text((i+1))
	    };
	}

	$('.judge_input').live('click',function() {
	    if ($(this).attr("checked") == true){
			$(this).parent().find('.input_empty').show();
		}else{
			$(this).parent().find('.input_empty').hide();
		}

	});

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
