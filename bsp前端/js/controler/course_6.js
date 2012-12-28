/**
 * @author gp
 * @datetime 2012-5-8
 * @description course_6.js
 */

 var statuss = ['','未处理','处理中','系统处理完毕','手工调整完毕','已生成选课结果'];

 function handBtn(statu){
 	var viewBtn=$('#viewBtn'),overBtn=$('#overBtn'),resultBtn=$('#resultBtn'),autoBtn=$('#autoBtn');
 	switch(statu){
 		case '1':
 			viewBtn.attr('disabled',true);
 			overBtn.attr('disabled',true);
 			resultBtn.attr('disabled',true);
 			autoBtn.attr('disabled',false);
 		break;
 		case '0':
 		case '2':
 		case '5':
 			viewBtn.attr('disabled',true);
 			overBtn.attr('disabled',true);
 			resultBtn.attr('disabled',true);
 			autoBtn.attr('disabled',true);
 		break;
 		case '3':
 			viewBtn.attr('disabled',false);
 			overBtn.attr('disabled',false);
 			resultBtn.attr('disabled',true);
 			autoBtn.attr('disabled',true);
 		break;
 		case '4':
 			viewBtn.attr('disabled',false);
 			overBtn.attr('disabled',true);
 			resultBtn.attr('disabled',false);
 			autoBtn.attr('disabled',true);
 		break;
 	}
 }

 function getOptInfo(term){
 	$.getJSON(G_ROOT+'volunteerdistribution/judgeVolunteerExamine/'+term,function(rs){
 			if(rs.returnCode=='000000'){
 				/*if(rs.entity==1){
 					$('#autoBtn').attr('disabled',false);
 				}else{
 					$('#autoBtn').attr('disabled',true);
 				}*/
 				$('#statuSpan').html(statuss[parseInt(rs.entity)]);
 				handBtn(rs.entity);
 			}
 		}
 	);
 }



 //查询系统状态
 function getSysInfo(termid){
 	$.getJSON(G_ROOT+'volunteerdistribution/queryVolunteerDistributionState'+'/'+termid,function(rs){
 		if(rs.returnCode=='000000'){
 			if(rs.list.length>0){
 				var v = rs.list[0],s=parseInt(rs.entity),t=v.PICI;
 				//termSpan = $('#termSpan').html(G_data['termset'][t]);
 				$('#statuSpan').html(statuss[s]);
 				handBtn(s);
 			}
 		}
 	});
 }
 $(document).ready(function(){
 	var cmb = new ComboxOperate();
 	cmb.term();

 	getOptInfo(document.getElementById('form_term').value);
 	//getOptInfo('TEM_00001');
 	//getSysInfo(document.getElementById('form_term').value);

 	//自动审核
 	$('#autoBtn').click(function(e){
 		/*$.getJSON(G_ROOT+'choosecoursevolunte/executePrc/P_ZYDISPATCH_TOTAL/'+$('#form_term').val()+'?termId='+$('#form_term').val(),function(rs){
 			if(rs.returnCode=='000000'){
 				alert('自动审核完毕。');
 				//$('#autoBtn').attr('disabled',true);
 				 $('#statuSpan').html(statuss[2]);
 				handBtn('2');
 			}
 		});*/
 		
 		$.ajax({
			type: 'POST',
			data:'{"prcName":"P_ZYDISPATCH_TOTAL","termId":"'+$('#form_term').val()+'"}',
			dataType: 'json',
			url: G_ROOT+'choosecoursevolunte/executePrc?termId='+$('#form_term').val(),
			contentType:'application/json;charset=UTF-8',
			success: function(rs) {
					  	if(rs.returnCode=='000000'){
			 				alert('自动审核完毕。');
			 				//$('#autoBtn').attr('disabled',true);
			 				 $('#statuSpan').html(statuss[2]);
			 				handBtn('2');
			 			}
                    }
		});
 	});

 	$('#form_term').change(function(e){
 		getOptInfo(this.value);
 	});

 	$('#viewBtn').click(function(e){
 		location.href="course_4.html?tid="+$('#form_term').val();
 	});

 	$('#overBtn').click(function(e){
 		$.getJSON(G_ROOT+'volunteerdistribution/updateVolunteerDistributionState/'+$('#form_term').val(),function(rs){
 			if(rs.returnCode=='000000'){
 				document.getElementById('statuSpan').innerHTML = statuss[parseInt(rs.entity)];
 				handBtn("4");
 				//handBtn(rs.entity);
 				mAlert('手工调整处理完毕。');
 			}
 		});
 	});


 	$('#resultBtn').click(function(e){
 		$.getJSON(G_ROOT+'choosecoursevolunte/executProcedures/P_ZYRESUALT/'+$('#form_term').val(),function(rs){
 			if(rs.returnCode=='000000'){
 				document.getElementById('statuSpan').innerHTML = statuss[parseInt(rs.entity)];
 				handBtn("5");
 				//handBtn(rs.entity);
 				//$('#autoBtn').attr('disabled',false);
 				mAlert('生成志愿选课结果成功。');
 			}
 		});
 	});


 });


