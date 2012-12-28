/**
 * @author gp
 * @datetime 2012-4-25
 * @description index.js
 */
var params={};
var ID=getQuery('ID');
var termId=getQuery('termId');
var cmb = new ComboxOperate();
$(document).ready(function() {

	// 学校
	cmb.school({id:'schoolcode'});
	// 层次
	cmb.level({id:'educationlevel'});

	// 通过ID获取详情，用于隐藏表单
	/*	测试数据 choosecoursebatch/8a8a878a3753b4d5013753bd73a20000
		{"id":"8a8a878a3753b4d5013753bd73a20000",
		"schoolCode":"S0001",
		"majorCode":"md0001",
		"levelCode":"E0004",
		"gradeCode":"G0007",
		"studentType":"2",
		"termId":"TEM_00001",
		"creater":"admin",
		"createtime":1337139753000,
		"updater":null,
		"updatetime":null,
		"approver":null,
		"approvetime":null,
		"approveCommend":null,
		"status":"2"}
	*/
	$.getJSON(G_ROOT+'choosecoursebatch/'+ID,function(data){
		if(data){
			$('#form_term').val(data.termId);
			$('#form_school').val(data.schoolCode);
			$('#form_major').val(data.majorCode);
			$('#form_educationlevel').val(data.levelCode);
			$('#form_grade').val(data.gradeCode);
			$('#form_stuType').val(data.studentType);
		}
	});

	//初始化学生选择、课程选择功能
	study_chk.init();
	course_chk.init(1);

	//返回按钮
	$('#btn_back').click(function(){
		window.location='course_2_detail.html?ID='+ID+'&termId='+termId;
	});

	// 保存绑定
	$('#btn_save').click(function(){
		var ids_study=[],
			ids_course=[],
			courseCode=[],
			courseName=[],
			schoolCode=[],
			score=[],
			price=[],
			openCourseId=[],
			courseNameStandard=[],
			courseCodeStandard=[]
		;
		var list=[];
		$('#'+study_chk.toElem).find('input[type="checkbox"]').each(function(){
			//if($(this)[0].checked==true) ids_study.push($(this).val());
			ids_study.push($(this).val());
		});

		$('#'+course_chk.toElem).find('input[type="checkbox"]').each(function(){
			//if($(this)[0].checked==true){
				var tmp={
					courseCode	:	$(this).parent().find('.coursecode').val(),
					courseName	:	$(this).parent().find('.coursename').val(),
					schoolCode	:	$(this).parent().find('.schoolcode').val(),
					score		:	$(this).parent().find('.score').val(),
					price		:	$(this).parent().find('.price').val(),
					openCourseId:$(this).parent().find('.opencourseid').val(),
					courseCodeStandard:$(this).parent().find('.coursecodestandard').val(),
					courseNameStandard:$(this).parent().find('.coursenamestandard').val()
				}
				list.push(tmp);
			//}
		});

		if(ids_study.length==0){
			mAlert('请选择学生');
			return false;
		}
		if(list.length==0){
			mAlert('请选择课程');
			return false;
		}

		params ={
			gxPiciId	:	ID,
			termId		:	$('#form_term').val(),
			creater		:	user['uid'],
			studentIdList 	:	ids_study,
			batchDetailDTOList	:	list
		};
		var str = Ab.encode(params);
		$.ajax({
			type: "POST",
			data: str,
			dataType:"json",
			url:G_ROOT+'choosecoursedetail/updateBatchCoursePlan?termId='+params.termId,
			contentType:'application/json;charset=UTF-8',
			success: function(rs){
				var insertId=rs.entity;
				if(rs.returnCode=='000000'){
					$.fn.nyroModalManual({
						width:400,
						title:"系统提示",
						content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/delete_ico.gif" />保存完毕，是否继续添加明细</h5></div><div class="overlay_btn"><input type="button" id="win_sure" class="btn btn_red overlayClose" value="是" onclick="location=\'course_2_detail_add.html?ID='+ID+'&termId='+params.termId+'\'" /> <input type="button" id="win_sure" class="btn btn_green overlayClose" value="否" onclick="location=\'course_2_detail.html?ID='+ID+'&termId='+params.termId+'\'" /></div>'
					});
				}else if(rs.returnCode=='500004'){
					mAlert("批次数据已存在");
				}else{
					if(insertId==14){
						mAlert('批次选课已暂停,不能新增');
					}else if(insertId==15){
						mAlert('批次选课已结束,不能新增');
					}else if(insertId==20){
						mAlert('批次选课参数设置错误');
					}else{mAlert('保存失败');}
				}
			}
		});
	});
});
