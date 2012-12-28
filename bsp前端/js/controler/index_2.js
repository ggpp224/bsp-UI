/**
 * @author gp
 * @datetime 2012-4-26
 * @description index_2.js
 */

 /**
 * 分页及列表
 */
 var queryUrl = '';

 var delUrl = G_ROOT+G_FormArr['planCourseDataDel'];//删除url
  var coms = {};
 var cmb = new ComboxOperate();
 var mark='',statu=['删除','已录入','待审核','审核通过','审核未通过','已失效','已停用','暂停选课'];
 var pn=getQuery('pn')||1;
 function getList(page){
 	coms = {};
	pn=page = (page && page>0)?page=page:page=Math.abs(page);
	var url=queryUrl+page+'/'+G_perpage;
	$.getJSON(encodeURI(url),function(data){
		var pageTotal=data.rCount;
		var data = data.list;
		if(data){
			var html='';
			$.each(data,function(k,v){
				coms[v.ID]=v.APPROVE_COMMEND;
				var edit_td ='<td></td>',yj_td='<td></td>',s_ipt='',s_view='';
				if(v.STATUS != '3'){
					edit_td='<td><a target="_blank"  href="course_plan_edit.html?sc='+$('#form_school').val()+'&i='+v.ID+'&pn='+pn+'">编辑</a></td>';
				}else{
					edit_td='<td><span class="color_gray">不可编辑</span></td>';
				}
//				if(parseInt(v.STATUS) > 2 && user['uRole']==2 && v.SCHOOL_CODE==user['schoolCode']){
//					yj_td = '<td>'+'<a class="mark" href="#" mark="'+v.ID+'">查看意见</a>'+'</td>';
//				}else{
//					yj_td = '<td><span class="color_gray">不可查看</span></td>';
//				}
				if(v.SCHOOL_CODE==user['schoolCode'] && user['uRole']==2){
					s_ipt = '<td class="first tc"><input ids="'+v.ID+'"  type="checkbox" class="chkc" name="checkall" /> </td>';
				}else{
					s_ipt = '<td class="first tc"><input ids="'+v.ID+'" disabled  type="checkbox" /> </td>';
				}
				html+='<tr>';
				html+=s_ipt;

				html+='<td>'+v.COURSE_NAME_STANDARD+'</td>';
				html+='<td><a  target="_blank"  href="course_open_data.html?c='+v.COURSE_CODE+'&t='+v.TERM_ID+'">'+strSplit(v.COURSE_NAME,8)+'</a></td>';
				html+='<td>'+G_data['school'][v.SCHOOL_CODE]+'</td>';
				html+='<td>'+v["TOTAL"]+'</td>';
				html+='<td>'+v.CREATETIME+'</td>';
				html+='<td><a class="mark" href="#" mark="'+v.ID+'">'+statu[v.STATUS]+'</a></td>';
				html+='<td>'+v.APPROVETIME+'</td>';
				html+='<td>'+v.APPROVER+'</td>';
				html+= edit_td;
				html+='</tr>';
			});
			html = throwNull(html);
			$('#js_openable_tbody').html(html);
			$('#pageShow').html(gPage(pageTotal,page,'getList'));
			$('.mark').unbind('click').bind('click',function(e){
				mark = coms[this.getAttribute("mark")];
				e.preventDefault();
				$.fn.nyroModalManual({
					width:400,
					title:"核审提示",
					url: 'overlay_audit_data.html'
				});
			});
		}
	});
 }


 $(document).ready(function(){

 	// 学校
 	cmb.shoolAndMajor();

	// 层次
 	cmb.levelAndGrade();

	// 学科
 	cmb.subject();

	// 互选批次组
	cmb.term();
		var setUrl = function(){
			var params = Ab.urlDecode(Ab.serializeForm('index_2_form'));
				queryUrl = G_ROOT+'course/planopencourse/list/'+params.termid+'/'+(params.coursecode==''?'null':params.coursecode)+"/"+(params.coursename==''?'null':params.coursename)+"/"+params.schoolcode+"/"+params.majorcode+"/"+params.subjectcode+"/"+params.educationlevel+"/"+params.gradecode+"/"+params.status+"/";
		};
		//查询
		$("#form_query").click(function(e){
				setUrl();
				getList(1);
			});

		//新增
		$("#addBtn").click(function(e){
			var school = document.getElementById("form_school");
			location.href = "course_plan_add.html?sc=null";
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

		//重置
		$("#resetBtn").click(function(e){
		 setTimeout(function(){
		 	cmb.fillDefaultSchool();
		 },200);
		});

		tableCheckAll('js_openable_tbody');

		setUrl();
		getList(pn);
		if(user['uRole']!=1){
			$('#addBtn').remove();
			$('#delBtn').remove();
			$('#checkboxall').attr('disabled',true);
		}

 });