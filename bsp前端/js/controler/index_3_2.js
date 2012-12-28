/**
 * @author gp
 * @datetime 2012-5-2
 * @description 选课计划审核
 */

 function audit(params,suc,err){
		var str = Ab.encode(params);
		$.ajax({
			type: 'POST',
			data:str,
			dataType: 'json',
			url: G_ROOT+G_FormArr['chooseCourseAuditetail']+'?termId='+$('#form_term').val(),
			contentType:'application/json;charset=UTF-8',
			success:suc

		});
}

 var queryUrl = '',statu=['删除','待审核','审核通过','审核未通过','已失效','已停用','暂停选课'];


 var cmb = new ComboxOperate();
 var coms = {};
 function getList(page){
 	coms = {};
	page = (page && page>0)?page=page:page=Math.abs(page);
	var url=encodeURI(queryUrl)+page+'/'+G_perpage;
	$.getJSON(url,function(data){
		var pageTotal=data.rCount;
		var data = data.list;
		if(data){
			var html='';

			$.each(data,function(k,v){
				coms[v.ID]=v.APPROVE_COMMEND;
				var major = G_data['major'][v.MAJORCODE]||'全部';
				var level = G_data['educationlevel'][v.LEVELCODE]||'全部';
				var grade = G_data['grade'][v.GRADECODE]||'全部';

				html+='<tr>';
				html+='<td class="first tc"><input ids="'+v.ID+'"  type="checkbox" class="chkc" name="checkall" /> </td>';
				//html+='<td>'+G_data['termset'][v.TERM_ID]+'</td>';
				html+='<td>'+G_data['school'][v.SCHOOL_CODE]+'</td>';
				//html+='<td>'+v.PLAN_SEQENCE+'</td>';
				html+='<td>'+v.COURSENAMESTANDARD+'</td>';
				html+='<td>'+major+'</td>';
				html+='<td>'+level+'</td>';
				html+='<td>'+grade+'</td>';
				//html+='<td>'+G_data['courseNature'][v.COURSE_NATURE]+'</td>';
				html+='<td>'+v.STUNDENT_COUNT+'</td>';
				html+='<td>'+v.CREATETIME+'</td>';
				html+='<td>'+'<a href="index_2_3_view.html?ID='+v.ID+'&termId='+v.TERM_ID+'" target="_blank">查看</a>'+'</td>';
				//http://10.10.6.81:7003/bsp/web/index_2_3_view.html?ID=ff8080813807bc69013807e611f00024&termId=ff8080813807bc69013807ce8ba40000
				//http://10.10.6.81:7003/bsp/web/index_3_2_1.html?i=ff8080813807bc69013807e611f00024
			/*	html+='<td>文件地址</td>';*/

				html+='<td><a class="mark" href="#" mark="'+v.ID+'">'+G_data['status'][v.STATUS]+'</a></td>';
				html+='<td>'+v.APPROVETIME+'</td>';
				html+='<td>'+v.APPROVER+'</td>';
				/*html+='<td>'+'<a class="mark" href="#" mark="'+v.ID+'">查看意见</a>'+'</td>';*/

				html+='</tr>';
			});
			html = throwNull(html);
			$('#js_openable_tbody').html(html);
			$('#pageShow').html(gPage(pageTotal,page,'getList'));
			$('.mark').unbind('click').bind('click',function(e){
				mark = coms[this.getAttribute("mark")];
				//alert(mark);
				e.preventDefault();
				$.fn.nyroModalManual({
					width:400,
					title:"审核意见",
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


	// 互选批次组
	cmb.term();
 	// 学生类型
	var stuTypeDom = document.getElementById('form_stuType');
	stuTypeDom.options.add(new Option('全部', 'null'));
	new Combox(stuTypeDom).fill(G_data['stuType']);

	var courseNatureDom = document.getElementById('form_courseNature');
	courseNatureDom.options.add(new Option('全部', 'null'));
	new Combox(courseNatureDom).fill(G_data['courseNature']);



	var setUrl = function(){
			var params = Ab.urlDecode(Ab.serializeForm('search_form'));
			queryUrl = G_ROOT+G_FormArr['chooseCourseList']+'/'+params.termid+"/"+params.status+"/"+params.schoolcode+"/"+params.majorcode+"/"+params.levelcode+"/"+params.gradecode+"/"+G_studentType+"/"+(params.coursecodestandard==''?'null':params.coursecodestandard)+"/"+(params.coursenamestandard==''?'null':params.coursenamestandard)+'/';
		};
	//查询
	$("#form_query").click(function(e){
		setUrl();
		getList(1);
	});

		tableCheckAll('js_openable_tbody');


 	var shenHe = function(status,title){
 		var ids = getIds('js_openable_tbody');
 		if(ids.length==0){
				alert('请选择要审核的记录');
				return;
			}
		var params = {
			approver:user['uname'],
			idList:ids,
			status:status,
			approveCommend:''
		};

		var dgSuc = function(rs){
			if(rs.returnCode=='000000'){
				getList(1);
					$.fn.nyroModalManual({
					width:400,
					title:title,
					url: 'overlay_audit.html'
				});
			}else{
				msgBox.show("操作失败");
			}
			//e.preventDefault();

		},
		dgErr = function(rs){
			//msgBox.show("操作失败");
		};
		audit(params,dgSuc,dgErr);
 	};
 	//审核通过 3/4/1
	$('.overlay_audit_ok').click(function(e) {

		shenHe(3,"审核通过");
		return false;
	});

	//取消审核
	$('.overlay_audit_cancel').click(function(e) {

		shenHe(2,"审核取消");
		return false;
	});

	//重置
		$("#resetBtn").click(function(e){
		 setTimeout(function(){
		 	cmb.fillDefaultSchool();
		 },200);
		});
 	setUrl();
	getList(1);

 });

