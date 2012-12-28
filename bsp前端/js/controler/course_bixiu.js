 /* @author wl
 * @datetime 2012-4-25
 * @description course_bixiu.js
 */
var queryUrl = '';

var backstatus='';
var termset=decodeURIComponent(getQuery('termset'));		// 批次
var coursecode=decodeURIComponent(getQuery('COURSECODE'));	// 课程代码
var studentid=decodeURIComponent(getQuery('STUDENTID'));	// 学生ID
//http://zds.ambow.com/studentrobcourse/findchoosecoursedesc/OBLIGATORY_GRAB/8a8a8cb9377deb5f01377ded98d60000/B0002?_dc=1337848939096
var coursenature=decodeURIComponent(getQuery('coursenature'));
var coursenamestandard=decodeURIComponent(getQuery('coursenamestandard'));
var choosetype=parseInt(getQuery('choosetype'));
var currstatus = decodeURIComponent(getQuery('currstatus'));

var url_top=G_ROOT+'studentrobcourse/findchoosecoursedesc/OBLIGATORY_GRAB/'+termset+'/'+coursecode;
var url_bottom=G_ROOT+'studentrobcourse/querystudentrobcourse/'+coursecode+'/'+termset+'/'+studentid;
var url_status=G_ROOT+'studentrobcourse/findchoosecoursedetailbyttop/';
var url_status_people=G_ROOT+'choosecoursevolunte/statcoursevolunte/'+coursecode+'/'+termset+"/"+user['schoolCode'];
var PARAVALUE='';
$(document).ready(function() {
	getDetail();	// 课程详情
	if(coursenature!=1){
		$('#cCouse').html('选修课程');

	}
	$.getJSON(url_status_people,function(data){
		var list = data.list;
		if(list){
			if(backstatus==2){
				$("#addBtn").attr("disable","disable");
			}
			html='本批次总座位数:&nbsp;<i class="color_red">'+list[0].ALLDATA+'</i>个,本校名额：'+list[0].CHOOSE_QUOTA+'个<br />本校参与选课总人数:&nbsp;必修<i class="color_red">'+list[0].BIXIU+'</i>人，选修<i class="color_red">'+list[0].XUANXIU+'</i>人';
			$('#peopleNum').html(html);
		}
	});


});

// 课程详情
function getDetail(){
	$.getJSON(url_top,function(data){
		var list = data.list;
		if(list){
			var html='',v=list[0];
			html+='<fieldset><legend class="big">'+coursenamestandard+':<i>（'+(coursenature==1?"必修":"选修")+'课）</i></legend></fieldset>';
			html+='<dl class="search_dl_long"><dt>选课方式：</dt><dd>'+G_data['chooseType'][choosetype]+'</dd></dl>';
			html+='<dl class="search_dl_long"><dt>选课说明：</dt><dd>'+v.CHOOSEEXPLAN+'</dd></dl>';
			html+='<dl class="search_dl_long"><dt>选课时间：</dt><dd>'+v.STARTT+'~'+v.ENDT+'</dd></dl>';
			html+='<dl class="search_dl_long"><dt>结果通知时间：</dt><dd>'+v.FBSTARTT+'</dd></dl>';

			PARAVALUE=v.PARAVALUE;
			backstatus=parseInt(v.PARAVALUE);
			html = throwNull(html);
			$('#details').html(html);
			$('#choose_status').html(currstatus);
			getList();
		}
	});
}

// 课程列表
function getList(){

	$.getJSON(url_bottom,function(data){
		if(data){
			var list = data.list,html=''
			var flag_yzz=false,classInfo=[];
			$.each(list,function(k,v){
				html+='<tr id="'+(k+1)+'">';
				html+='<td class="first tc">'+(k+1)+'</td>';
				html+='<td><a href="course_open_data.html?c='+v.COURSECODE+'&t='+v.TERMID+'">'+v.COURSENAME+'</a></td>';
				html+='<td>'+v.TEACHERS+'</td>';
				html+='<td>'+G_data['school'][v.SCHOOLCODE]+'</td>';
				html+='<td>'+v.SCORE+'<input type="hidden" value="'+v.COURSECODE+'" /><input type="hidden" value="'+v.TERMID+'" /><input type="hidden" value="'+v.PLANID+'" /></td>';
				html+='<td>'+v.MAXMINNUM+'</td>';
				html+='<td>'+v.RESIDUEPE+'</td>';
				html+='<td>'+v.CURRENT_NUM+'</td>';
				html+='<td>'+v.RESIDUEPE+'</td>';
				//if(k>5) v.STATUS=2;
				//if(k>8) v.STATUS=3;
				if(v.STATUS==1 || v.STATUS==3){
					flag_yzz=v.PLANID+'/'+studentid;

					html+='<td name="option" class="occ_seated"><i class="color_gray">已占座</i></td>';
					classInfo['code'] = v.COURSENAME;
					classInfo['courseName'] = v.TEACHERS;
					classInfo['school'] = G_data['school'][v.SCHOOLCODE];
					classInfo['coursecode'] = v.COURSECODE;
					classInfo['termid'] = v.TERMID;

				}else if(v.RESIDUEPE<=0){
					html+='<td name="option" class="qiang_seat"><input name="forseat" disabled="disabled" type="button" class="btn" value="无剩余座位" /></td>';
				}else{
					if(v.SCHOOLCODE==user['schoolCode']){
						html+=PARAVALUE==3?'<td><input disabled type="button" class="btn" value="抢座" /></td>':'';
					}else{
						html+=PARAVALUE==3?'<td name="option" class="qiang_seat"><input name="forseat" type="button" class="btn btn_red" value="抢座" /></td>':'';
					}
				}
				html+='</tr>';
			});
			html = throwNull(html);
			$('#js_course_tbody').html(html);

			//判断状态值是否可抢座

			setTimeout(function(){
				if(PARAVALUE!=3){
				$("input[name='forseat']").attr("disabled",true).removeClass("btn btn_red");
				}
			},1000);

			//判断是否占座
			if(flag_yzz){

				$('.qiang_seat').removeClass().addClass('noocc_seated').html('<i class="color_red hz">不可选</i>');

				var html_status='';
				// 更新状态
				if(currstatus=='已选'){
					html_status	+='已占座&nbsp;<input type="button" class="btn btn_green overlay_cancel_grab" onclick="disseat(\''+flag_yzz+'\')" value="退座（撤销选课）" /><br />';
				}else{
					html_status	+=currstatus+'<br />'
				}
					html_status+= classInfo['code']+'&nbsp;'+classInfo['courseName']+'&nbsp;'+classInfo['school']+'<br />';
				$("#choose_status").html(html_status);
				getStatus(classInfo['coursecode'],classInfo['termid']);
			}else{
				$('#form_status').empty();
				if(currstatus!='已撤销'){
					$('#choose_status').html(currstatus);
				}else{
					$('#choose_status').html("已撤销");
				}
			}

			// 绑定"开始抢座"的点击事件
			$('.qiang_seat').find('.btn').live('click',function(){
				var me=$(this);
				if(parseInt(me.parent().prev().text()<=0)){
					mAlert('选课人数已达上限');
					return false;
				}
				var td=me.parent().parent().find('td');
				classInfo['code'] = td.eq(1).text();
				classInfo['courseName'] = td.eq(2).text();
				classInfo['school'] = td.eq(3).text();
				classInfo['coursecode'] = td.eq(4).find('input').eq(0).val();
				classInfo['termid'] = td.eq(4).find('input').eq(1).val();
				classInfo['planid'] = td.eq(4).find('input').eq(2).val();
				$.getJSON(G_ROOT+'studentrobcourse/addcoursescarebuy/'+classInfo['planid']+'/'+studentid+'/1/'+PARAVALUE+'/',function(data){
					var entity = data.entity;
					if(data.returnCode=='000000'){
						mAlert("抢座成功",0);
						me.parent().prev().text(parseInt(me.parent().prev().text())-1);
						me.parent().removeClass().addClass('occ_seated').html('<i class="color_gray">已占座</i>');

						$('.qiang_seat').html('<i class="color_red hz">不可选</i>');
						var html_status	='已占座&nbsp;<input type="button" class="btn btn_green overlay_cancel_grab" onclick="disseat(\''+classInfo['planid']+'/'+studentid+'\')" value="退座（撤销选课）" /><br />';
							html_status+= classInfo['code']+'&nbsp;'+classInfo['courseName']+'&nbsp;'+classInfo['school']+'<br />';
						$("#choose_status").html(html_status);
						getStatus(classInfo['coursecode'],classInfo['termid']);
					}else{
						if(entity=='500'){
							mAlert('您已经实时选课成功，不能重复实时选课');
						}else if(entity=='RETURN_TERM_PARAMETER_0001'){
							mAlert('目前处于未开始，不能实时选课');
						}else if(entity=='RETURN_TERM_PARAMETER_0002'){
							mAlert('目前处于公示，不能实时选课');
						}else if(entity=='RETURN_TERM_PARAMETER_0004'){
							mAlert('目前处于暂停，不能实时选课');
						}else if(entity=='RETURN_TERM_PARAMETER_0005'){
							mAlert('实时选课已结束');
						}else{
							mAlert('实时选课失败');
						}
					}
				})

			});



		}
	});
}
//课程状态
function getStatus(coursecode,termid){
	//当前抢座总数和人数
	$.getJSON(url_status+coursecode+'/'+user['uid']+'/'+termid,function(data){
		var list = data.list;
		if(list.length>0){
			var html='',v=list[0];
				html+='当前共有<i class="color_ora">'+v.ALLCOUNT+'</i>人占座，您的位置在总数第<i class="color_ora">'+v.ROWP+'</i>名，本校第'+v.SCHOOLROWP+'名';
			$('#form_status').html(html);
		}
	});

}

function disseat(param){
	//拼装overlay_cancel_grab.html页面
	var overlay_cancel_grab ='';
	overlay_cancel_grab+='<div class="overlay_delete_box"> <h5 class="green"><img src="images/information_ico.gif" />确定要退座吗？</h5></div><div class="overlay_btn">';
	overlay_cancel_grab+='<input type="button" class="btn btn_green" onclick="delSeat(\''+param+'\')" value="确定退座"/>';
	overlay_cancel_grab+='<input type="button" class="btn btn_gray overlayClose" value="取消"/>';
	overlay_cancel_grab+='</div>';

	    $.fn.nyroModalManual({
		width:400,
		title:"退座",
		content: overlay_cancel_grab
	});

	$("#ysedisseat").click(function(){
		$('#choose_status').html("");
		$('#form_status').html("");
		$.get("#",function(){
			$('.hz').parent().html('<input name="forseat" type="button"  class="btn btn_red overlay_grab" value="抢座" />');

		});
	});
	return false;
}

// 退座
function delSeat(param){
		$.getJSON(G_ROOT+'studentrobcourse/deletecoursescarebuy/'+param+'/'+PARAVALUE,function(data){
			var entity = data.entity;
			if(data.returnCode=='000000'){
				mAlert('退座成功');
				$('.occ_seated').each(function(){
					$(this).prev().text((parseInt($(this).prev().text())+1));
				})
				$('.occ_seated,.noocc_seated,.qiang_seat').prepend('<input name="forseat" type="button" class="btn btn_red" value="抢座" />').removeClass().addClass('qiang_seat').find('i').remove()
				$('#form_status').empty();
					$('#choose_status').html(currstatus);
					$('#choose_status').html("已撤销");
					setTimeout(function(){
						getList();
					},300);

			}else{
				if(entity==500){
					mAlert('您已经退课成功，无法退课');
				}else if(entity=='RETURN_TERM_PARAMETER_0004'){
					mAlert('目前处于暂停，不能退课');
				}else if(entity=='RETURN_TERM_PARAMETER_0005'){
					mAlert('实时选课已结束，不能退课');
				}else{
					mAlert('退课失败');
				}
			}
		})
}



