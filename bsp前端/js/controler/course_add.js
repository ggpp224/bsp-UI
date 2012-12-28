/**
 * @author gp
 * @datetime 2012-4-27
 * @description course_add.js
 */
var queryUrl = '';

var oper_type="add";
 $(document).ready(function(){
 	$('#teacher_form').hide();
	$('#teacherAddBtn').hide();
	$('#teacherConAddBtn').hide();

	$('#form_show').click(function(){
		oper_type="add";
		$('#teacher_form').show();
		$('#teacherAddBtn').show();
		$('#teacherConAddBtn').show();
	});
 	var a = $("#explore_nav li a");

 	$(a[1]).hide();
 	//授课学校init
 	//var schoolCode = getQuery("c");
 	var schoolCode = user['schoolCode'];
 	document.getElementById("school").value=decodeURI(G_data['school'][user['schoolCode']]);
 	document.getElementById("schoolCode").value=schoolCode;

 	var cmb = new ComboxOperate();
 	//专业
 	cmb.major({defText:'请选择'});

	// 学科
	cmb.subject({defText:'请选择'});

	// 层次和年级
	cmb.levelAndGrade({defText:'请选择'});

	//添加带入的专业
	var mc = getQuery('mc');
	if(mc){
		var mn=G_data['major'][mc];
		if(mn){
			$('#majorInfo_tbody').append('<tr><td><input type="checkbox"></td><td class="cd">'+mc+'</td><td>'+mn+'</td></tr>')
		}
	}

	var courseCode = '';
	function teacherList(){
		disCheckedHeader();
		$.getJSON(encodeURI(G_ROOT+G_FormArr['teacherList']+'/'+courseCode),function(data){
				var data = data.list;
				var htm  = '';
				for(var i=0,len=data.length;i<len;i++){
					var v =data[i];
					htm += '<tr>' +
							'<td class="first tc"><input ids="'+v.ID+'"  type="checkbox" name="checkall" ></td>' +
							'<td>'+v.TEACHER_NAME+'</td>' +
							'<td>'+v.TEACHER_UNIT+'</td>' +
							'<td>'+v.TEACHER_TITLE+'</td>' +
							'<td>'+v.TEACHER_PHONE+'</td>' +
							'<td>'+v.TEACHER_EMAIL+'</td>' +
						  '</tr>';
				}
				htm = throwNull(htm);
				$('#teacher_tbody').html(htm);

			});
	}

	$('#course_save').click(function(){
		if(!validate()){
			return;
		}
		var params = Ab.urlDecode(Ab.serializeForm('tab01'));
		params.creater = user['uid'];
		params.majorList = win.getPostCodes();
		//courseCode = params.CourseCodeStandard;
		var str = Ab.encode(params);
		$.ajax({
			type: 'POST',
			data:str,
			dataType: 'json',
			url: G_ROOT+G_FormArr['courseCreate'],
			contentType:'application/json;charset=UTF-8',
			success: function(result) {
					  if(result.entity){
					  	courseCode = result.entity;
					  	$('#teacherCourseCode').val(courseCode);
					  }
                     // var a = $("#explore_nav li a");
					  var a2=$(a[1]);
					  var els = document.getElementById('tab01').elements;
	            	  for(key in els){
	            	  	var el = els[key];
	            	  	if(el&&el.name){
	            	  		try{
		            			el.disabled = true;
		            	  	}catch(e){

		            	  	}
	            	  	}

	            	  }
					   $('#course_save').remove();
					   $('#cBackBtn').remove();
					  a2.show();
					  a2.click();
					  teacherList();
                    }
		});
	});

	function teacherAdd(hide){
		if(!validateTeacher()){
			return false;
		}
		var form_2 = document.forms['tab02'];
		var params = Ab.urlDecode(Ab.serializeForm(form_2));
		var str = Ab.encode(params);
		$.ajax({
			type: "POST",
			data: str,
			dataType:"json",
			url:G_ROOT+G_FormArr['teacherAdd'],
			contentType:'application/json;charset=UTF-8',
			success: function(rs){
				if(rs.returnCode=='000000'){
					teacherList();
					var els = form_2.elements;
					for(var i=0,len=els.length;i<len;i++){
						var el = els[i];
						if(el.type == 'text'||el.type == 'textarea'){
							el.value="";
						}
					}
					mAlert('添加成功。');
					if(!hide){
						$('#teacher_form').hide();
						$('#teacherAddBtn').hide();
						$('#teacherConAddBtn').hide();
					}

				}else if(rs.returnCode=='100'){
					mAlert('一门课程只能添加最多五名教师');
				}else{
					mAlert('添加失败。');
				}

			}
		});
	}

	$('#teacherAddBtn').click(function(){
		teacherAdd();
	});
	$('#teacherConAddBtn').click(function(){
		teacherAdd('nohide');
	});

	$('#teacher_del').click(function(){
		var ids = getIds('teacher_tbody');
				if(ids.length==0){
					alert('请选择要删除的教师');
					return;
				}
		var url = G_ROOT+"course/courseteacher/delete";
		var str = Ab.encode(ids);
		$.ajax({
			type: "POST",
			data: str,
			dataType:"json",
			url:url,
			contentType:'application/json;charset=UTF-8',
			success: function(rs){
				if(rs.returnCode='000000'){
					teacherList();
					msgBox.show('删除成功。');
				}else{
					msgBox.show('删除失败。');
				}

			}
		});

	});

	$('#teacherBackBtn').click(function(){
		location.href = 'index.html';
	});

	tableCheckAll('teacher_tbody');

	//验证课程添加
			function validate(){
				var checked = true;

				var inputCheck = function(dom,jdom,len){
					var len = len||50;
					var val = dom.val();
					if(val.trim().length==0){
						jdom.html('不能为空');
						jdom.removeClass('hidden').addClass('error');
						checked=false;
					}
					else if(val.length>len){
						jdom.html('不能超过'+len+'字');
						jdom.removeClass('hidden').addClass('error');
						checked=false;
					}else{
						jdom.removeClass('error').addClass('hidden');
					}
				};
				//课程名称
				var cn = $('#courseName');
				var cnVal = cn.val();
				var jdom = $('#cNameInfo');
				if(cnVal.trim().length==0){
					jdom.html('不能为空');
					jdom.removeClass('hidden').addClass('error');
					checked=false;
				}else if(cnVal.length>100){
					jdom.html('不能超过100字');
					jdom.removeClass('hidden').addClass('error');
					checked=false;
				}else{
					jdom.removeClass('error').addClass('hidden');
				}

				//批次代码
				var cs = $('#courseNameStandard');
				var csVal = cs.val(),
					jdom = $('#cCNtInfo');
				if(csVal=='点击添加'){
					jdom.removeClass('hidden').addClass('error');
					checked=false;
				}else if(csVal.trim().length>100){
					jdom.html('不能超过100字');
					jdom.removeClass('hidden').addClass('error');
					checked=false;
				}else{
					jdom.removeClass('error').addClass('hidden');
				}

				//课程简介
				var a2 = $('#area2'),
					a2Val = a2.val(),
					jdom = $('#area2Info');

				if(a2Val.trim().length==0){
					jdom.removeClass('hidden').addClass('error');
					checked=false;
				}else if(a2Val.length>400){
					jdom.html('超过400字');
					jdom.removeClass('hidden').addClass('error');
					checked=false;
				}else{
					jdom.removeClass('error').addClass('hidden');
				}

				//成绩构成方式
				var ec = $('#examContent'),
					ecVal = ec.val(),
					jdom = $('#ecInfo');
				if(ecVal.trim().length==0){
					jdom.removeClass('hidden').addClass('error');
					checked=false;
				}else if(csVal.length>400){
					jdom.html('不能超过400字');
					jdom.removeClass('hidden').addClass('error');
					checked=false;
				}else{
					jdom.removeClass('error').addClass('hidden');
				}

				var longCheck = function(dom,jdom,len){
					var len = len||200;
					var val = dom.val();
					if(val.length>len){
						jdom.html('不能超过'+len+'字');
						jdom.removeClass('hidden').addClass('error');
						checked=false;
					}else{
						jdom.removeClass('error').addClass('hidden');
					}
				};

				//课程英文名
				longCheck($('#courseEname'),$('#enameInfo'),50);
				//
				inputCheck($('#lmsCode'),$('#lmsCodeInfo'),50);
				//
				inputCheck($('#lmsOriCourseCode'),$('#lmsOriCourseCodeInfo'),50);
				//基本要求
				longCheck($('#basicRequirement'),$('#basicInfo'),250);
				//教材及参考资料
				longCheck($('#textbook'),$('#textbookInfo'),250);
				//资源建设情况
				longCheck($('#resourceConstruction'),$('#resourceInfo'),250);
				//演示版链接
				longCheck($('#demoLink'),$('#linkInfo'),100);

				//checked = valiInput($('#form_major'),{emptyText:'请选择一项'})?checked:false;
				checked = valiInput($('#courseType'),{emptyText:'请选择一项'})?checked:false;
				checked = valiInput($('#tchOgzForm'),{emptyText:'请选择一项'})?checked:false;
				checked = valiInput($('#form_subject'),{emptyText:'请选择一项'})?checked:false;
				//checked = valiInput($('#form_educationlevel'),{emptyText:'请选择一项'})?checked:false;
				//checked = valiInput($('#form_grade'),{emptyText:'请选择一项'})?checked:false;

				//
				/*if(win.getMajorCodes().length==0){
					$('#majorsInfo').removeClass('hidden').addClass('error');
					checked=false;
				}else{
					$('#majorsInfo').removeClass('error').addClass('hidden');
				}*/

				var dd = maskForm('tab01');
				if(!dd){
					checked = false;
				}
				return checked;
			}


			function validateTeacher(){
				var checked = true;

				//教师名称
				var cn = $('#teacherName');
				var val = cn.val(),
					jdom = $('#teacherNameInfo');
				if(val.trim().length==0){
					jdom.removeClass('hidden').addClass('error');
					checked=false;
				}else if(val.length>50){
					jdom.html('超过50字');
					jdom.removeClass('hidden').addClass('error');
					checked=false;
				}else{
					jdom.removeClass('error').addClass('hidden');
				}

				//邮箱
				var cs = $('#teacherEmail');
				var val = cs.val(),
					jdom = $('#teacherEmailInfo');
				if(val.trim().length==0){
					jdom.removeClass('hidden').addClass('error');
					checked=false;
				}else if(!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{1}$/.test(cs.val()))){
					jdom.html('邮箱格式不正确');
					jdom.removeClass('hidden').addClass('error');
					checked=false;
				}else if(val.length>50){
					jdom.html('不能超过50字');
					jdom.removeClass('hidden').addClass('error');
					checked=false;
				}else{
					$('#teacherEmailInfo').removeClass('error').addClass('hidden');
				}

				//教师单位
				var a2 = $('#teacherUnit');
				var val = a2.val(),
					jdom = $('#teacherUnitInfo');
				if(val.trim().length==0){
					jdom.removeClass('hidden').addClass('error');
					checked=false;
				}else if(val.length>50){
					jdom.html('不能超过50字');
					jdom.removeClass('hidden').addClass('error');
					checked=false;
				}else{
					jdom.removeClass('error').addClass('hidden');
				}

				//职称
				var tt = $('#teacherTitle');
				var val = tt.val(),
					jdom = $('#teacherTitleInfo');
				if(val.trim().length==0){
					jdom.removeClass('hidden').addClass('error');
					checked=false;
				}else if(val.length>50){
					jdom.html('不能超过50字');
					jdom.removeClass('hidden').addClass('error');
					checked=false;
				}else{
					jdom.removeClass('error').addClass('hidden');
				}

				//教师简介
				var ec = $('#teacherIntroduction');
				var val = ec.val(),
					jdom = $('#teacherIntroductionInfo');
				if(val.trim().length==0){
					jdom.removeClass('hidden').addClass('error');
					checked=false;
				}else if(val.length>2000){
					jdom.html('不能超过2000字');
					jdom.removeClass('hidden').addClass('error');
					checked=false;
				}else{
					jdom.removeClass('error').addClass('hidden');
				}

				//电话号码
				var pc = $('#teacherPhone');
				var val = pc.val(),
					jdom = $('#phoneInfo');
				if(val.length>25){
					jdom.html('不能25字符以内');
					jdom.removeClass('hidden').addClass('error');
					checked=false;
				}else{
					jdom.removeClass('error').addClass('hidden');
				}
				var dd = maskForm('tab02');
				if(!dd){
					checked = false;
				}
				return checked;
			}

		//绑定“添加专业“按钮
		$('#addMajorBtn').click(function() {
			$.fn.nyroModalManual({
				width:600,
				height:450,
				title:"新增",
				content: win.pop()
			});
			$("#Btn_majorSearch").click();
			return false;
		});

		//绑定“移除专业“按钮
		$('#removeMajorBtn').click(function() {
			win.removeMajors();
		});

		//绑定查询按钮

		$("#Btn_majorSearch").live('click',function(){
			params = Ab.urlDecode(Ab.serializeForm('majorSeach'));
			var queryTest='';
			//queryUrl+=queryTest;
			queryUrl='major/query/'+(params.majorcode==''?'null':params.majorcode)+"/"
					+(params.majorname==''?'null':params.majorname)+"/"
					+(params.subjectcode==''?'null':params.subjectcode)+"/1/"
				;
			$('#js_tablebox,#major_pageShow').empty();
			win.getList(1);
		});

		tableCheckAll('majorInfo_tbody',null,'checkboxall_m');

 });

 var win = {
				pop : function(){
					var html_subject='<option value="null">全部</option>';
					for(var i in G_data['subject']){
						html_subject+='<option value="'+i+'">'+G_data['subject'][i]+'</option>'
					}
					var html='<form id="majorSeach" name="majorSeach" method="post" action="#">';
						html+='<p><label class="labeltitle">专业代码：</label><input type="text" id="majorcode" class="half" name="majorcode" value=""  /></p>';
						html+='<p><label class="labeltitle">专业名称：</label><input type="text" id="majorname" class="half" name="majorname" value=""  /></p>';
						html+='<p><label class="labeltitle">所属学科：</label><select name="subjectcode">'+html_subject+'</select></p>';
						html+='<div class="btn_opera"><input type="button" id="Btn_majorSearch" class="btn btn_gray" value="查询"/></div>';
						html+='<table class="tablebox" id="js_tablebox"></table>';
						html+='<div id="major_pageShow"></div>';
						html+='<div class="overlay_btn"><input type="button" onclick="win.subm()" class="btn btn_green" value="确定添加"/> <input type="button" class="btn btn_gray overlayClose" value="关闭"/></div>';
						html+='</form>';
					return html;
				},

				getList : function(page){
					page = (page && page>0)?page=page:page=Math.abs(page);
					var url=G_ROOT + encodeURI(queryUrl) + page+'/'+G_perpage_pop;

					if($('#js_thead_'+page).length>0){
						$('.js_thead,.js_tbody').hide();
						$('#js_thead_'+page).show();
						$('#js_tbody_'+page).show();
						$('#major_pageShow').html(gPage(rCount,page,'win.getList',G_perpage_pop));
					}else{
						$.getJSON(url,function(data){
							rCount=data.rCount;
							var list = data.list;
							var html='<thead id="js_thead_'+page+'" class="table_header js_thead">';
								html+='	<tr>';
								html+='	<th class="first tc" width="4%"><input type="checkbox" id="checkboxall_pop" onclick="checkAll(this,\'majorChk_'+page+'\')"/></th>';
								html+='	<th>专业代码</th>';
								html+='	<th>专业名称</th>';
								html+='	<th>所属学科</th>';
								html+='	</tr>';
								html+='</thead>';
								html+='<tbody id="js_tbody_'+page+'" class="openable_tbody js_tbody">';
							if(list){
								$.each(list,function(k,v){
									html+='<tr class="mid'+v.id+'">';
									html+='<td class="first tc"><input type="checkbox" class="dt majorChk_'+page+'" name="checkall" value="'+v.code+'" /></td>';
									html+='<td class="dt">'+v.code+'</td>';
									html+='<td class="dt">'+v.name+'</td>';
									html+='<td class="subject">'+G_data['subject'][v.subjectCode]+'</td>';
									html+='</tr>';
								});
							}
							html+='</tbody>';
							html = throwNull(html);
							$('.js_thead,.js_tbody').hide();
							$('#js_tablebox').append(html);
							$('#major_pageShow').html(gPage(data.rCount,page,'win.getList',G_perpage_pop));
							patch();
						});
					}
				},

				getMajorCodes:function(){
					var hcs=[];
					var cs = $('#majorInfo_tbody').find('.cd');
					cs.each(function(){
						hcs.push(this.innerHTML);
					});
					return hcs;
				},

				getPostCodes:function(){
					var hcs=[];
					var cs = $('#majorInfo_tbody').find('.cd');
					cs.each(function(){
						hcs.push({code:this.innerHTML});
					});
					return hcs;
				},

				subm:function(){
					var d=[],htm='',hcs=this.getMajorCodes(),trs=$('.js_tbody').find('tr') ;
					var flag=true;
					trs.each(function(idx,el){
						var dts = $(el).find('.dt');
						var o = {code:dts[1].innerHTML,name:dts[2].innerHTML};
						if(dts[0].checked){
							flag=false;
						}
						if(dts[0].checked && (hcs.indexOf(o.code)==-1)){
							htm += '<tr><td><input type="checkbox"></td><td class="cd">'+o.code+'</td><td>'+o.name+'</td></tr>'
							d.push(o);
						}

					});
					if(flag){
						alert('请选择专业');
						return false;
					}
					$('#majorInfo_tbody').append(htm);
					$('.overlayClose').click();
				},

				removeMajors: function(){
					var trs = $('#majorInfo_tbody').find('tr');
					trs.find('input[type=checkbox]').each(function(idx,val){
						if(this.checked){
							$(trs[idx]).remove();
						}
					});
				}
			};


