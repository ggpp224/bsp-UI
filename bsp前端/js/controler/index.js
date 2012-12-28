/**
 * @author gp
 * @datetime 2012-4-25
 * @description index.js
 */

/**
 * 分页及列表
 */

 var queryUrl = '';
 var delUrl = G_ROOT+G_FormArr['courseDataDel'];//删除url

 var pn=getQuery('pn')||1;
 var cmb = new ComboxOperate();
 function getCodes(tbody){
			var checks = document.getElementById(tbody).getElementsByTagName("input");
			var ids = [],codes=[];
			for(var i=0,len=checks.length;i<len;i++){
				var c = checks[i];
				if(c.type=='checkbox'&&c.checked&&!c.disabled){
					ids.push(c.getAttribute("ids"));
					codes.push(c.getAttribute("code"));
				}
			}

			return [ids,codes];
		}
 function getList(page){
 	disCheckedHeader();
	pn=page = (page && page>0)?page=page:page=Math.abs(page);
	var url=queryUrl+page+'/'+G_perpage;
	$.getJSON(url,function(data){
		var pageTotal=data.rCount;
		var data = data.list;
		if(data){
			var csCode=user['schoolCode'];
			var html='';
			$.each(data,function(k,v){
				var teachers='';

				// 拆分教师
				if(v.TEACHERNAME){
					var teachersName=v.TEACHERNAME.split(','),teacherSID=v.TEACHERID.split(',');

					$.each(teachersName,function(){
						teachers+=this;
					});
				}
				var scode=v.SCHOOL_CODE,dis='',
					//edit ='<a target="_blank" href="course_update.html?c='+v.COURSE_CODE+'&s='+v.SCHOOL_CODE+'&i='+v.ID+'&pn='+pn+'">编辑</a>',
					edit ='<span class="btn_disable">编辑</span>',
					stu ='<input type="submit" disabled="disabled" class="statuBtn btn btn_disable'+'" value="'+(v.STATUS==3?'启用':'停用')+'"/>';

				if(((user['uRole']==2)&&(csCode!=scode))||user['uRole']!=2){
					dis='disabled="disabled"';
					edit='';
					stu = '';
				}

				html+='<tr>';
				html+='<td class="first tc"><input code="'+v.COURSE_CODE+'" ids="'+v.ID+'" '+dis+' type="checkbox" class="chkc" name="checkall" /> </td>';
				html+='<td><a target="_blank" href="course_data.html?c='+v.COURSE_CODE+'&s='+v.SCHOOL_CODE+'&i='+v.ID+'&pn='+pn+'">'+strSplit(v.COURSE_NAME,8)+'</a></td>';
				html+='<td>'+strSplit(v.TEACHERNAME)+'</td>';
				html+='<td>'+G_data['school'][v.SCHOOL_CODE]+'</td>';
				/*html+='<td>'+G_data['major'][v.MAJOR_CODE]+'</td>';
				html+='<td>'+G_data['educationlevel'][v.EDUCATION_LEVEL_CODE]+'</td>';*/
				html+='<td>'+v.CREATETIME+'</td>';
				html+='<td>'+edit+'</td>';
				html+='<td><i class="'+(v.STATUS==2?'color_gray">已启用':'color_red">已停用')+'</i></td>';
				html+='<td code="'+v.COURSE_CODE+'" statu="'+v.STATUS+'">'+stu+'</td>';
				html+='</tr>';
			});
			html = throwNull(html);
			$('#js_openable_tbody').html(html);
			$('#pageShow').html(gPage(pageTotal,page,'getList'));

			$('.statuBtn').unbind('click').bind('click',function(e){
				var me = this;
				//var cCode = this.getAttribute("")
				var td = this.parentNode;
				var cCode = td.getAttribute("code"),statu=td.getAttribute("statu");
				if(statu==2){//停用
					$.getJSON(G_ROOT+G_FormArr['courseStatuModify']+"/"+cCode+"/3",function(rs){
						if(rs.returnCode=="000000"){


							td.setAttribute("statu","3");
							me.value = "启用";
							var tb = td.previousSibling;
							tb.innerHTML = '<i class="color_red">已停用</i>';
							msgBox.show("课程已停用");
						}
					});
				}else{
					$.getJSON(G_ROOT+G_FormArr['courseStatuModify']+"/"+cCode+"/2",function(rs){
						if(rs.returnCode=="000000"){
							td.setAttribute("statu","2");
							me.value = "停用";
							var tb = td.previousSibling;
							tb.innerHTML = '<i class="color_gray">已启用</i>';
							msgBox.show("课程已启用");
						}
					});
				}

			});
		}
	});
 }

$(document).ready(function() {
		// 学校
		cmb.shoolAndMajor();

		// 层次
		cmb.level();

		// 学科
		cmb.subject();


		var mc=getQuery('mc')||'null';
		$('#form_major').val(mc);

		var setUrl = function(){
			var params = Ab.urlDecode(Ab.serializeForm('course_form'));
			var mc = getQuery('mc');
			mc = mc?mc:'null';
			queryUrl = G_ROOT+'course/courseattribute/list/'+(params.coursecode==''?'null':params.coursecode)+"/"+(params.coursename==''?'null':encodeURI(params.coursename))+"/"+params.status+"/"+params.schoolcode+"/"+mc+"/"+params.educationlevel+"/"+params.subjectcode+"/";
		};
		//查询
		$("#form_query").click(function(e){
			setUrl();
			getList(1);
		});


		//新增
		$("#addBtn").click(function(e){
			var school = document.getElementById("form_school");
			location.href = "course_add.html?c="+school.value+'&mc='+getQuery('mc');
		});



		//删除
		$("#delBtn").click(function(e){
			var ids = getIds('js_openable_tbody');
			if(ids.length==0){
				alert('请选择要删除的记录');
				return;
			}
			e.preventDefault();
			$.fn.nyroModalManual({
				width : 400,
				title : "系统提示",
				url : 'overlay_delete.html'
			});

		});
	//导入
	$('#file').on('change',function(e){
		alert(this.value);
		$.ajaxFileUpload({
			url:'/aa',
			secureuri : false,
	        fileElementId : 'file',
	        dataType : 'json',
	        success : function(data, status)
	        {
	        	//document.getElementById('form_import').reset();
	          mAlert("导入成功");
	        },
	        error : function(data, status, e)
	        {
	        	//document.getElementById('form_import').reset();
	                mAlert("导入失败");
	        }
		});

	});

		//重置
		$("#resetBtn").click(function(e){
		 setTimeout(function(){
		 	cmb.fillDefaultSchool();
		 },200);
		});
		tableCheckAll('js_openable_tbody');

		setUrl();
		getList(pn);

		/*$('#import_btn').click(function(){
			var pth = $('#file').val();
			if(pth.trim().length==0){
				mAlert('请选择要导入的文件');
			}
			$.ajaxFileUpload({
				url:'',
				secureuri : false,
		        fileElementId : 'file',
		        dataType : 'json',
		        success : function(data, status)
		        {
		          mAlert('导入成功');
		        },
		        error : function(data, status, e)
		        {
		           mAlert('导入失败');
		        }
			});
		});*/

		//if(user['uRole']!=2){
			$('#addBtn').attr('disabled',true);
			$('#delBtn').attr('disabled',true);
			$('#checkboxall').attr('disabled',true);
		//}
	});