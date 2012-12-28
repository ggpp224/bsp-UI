/**
 * @author wl
 * @datetime 2012-5-7
 * @description course_5.js
 */
var queryUrl='';

var currPage=getQuery('page');
currPage = currPage || 1;
var termid ='';
var sys_html='';
var cmb = new ComboxOperate();

$(function(){
	cmb.term();
	var stuId = user['uid'];
	termid = $("#form_term").val();
	queryUrl = termid;
	getList_Sysparameters();

	$("#form_term").change(function(){
		termid = $("#form_term").val();
		queryUrl = termid;
		getList_Sysparameters();
	});

	//queryUrl = $("#form_term").val();  获取选课批次
	//overlay_cancel_grab.html

});

function getList_Sysparameters(){

	var url=G_ROOT+'control/list/'+queryUrl;
	var dataNew={};
	var control_html='';

	$.getJSON(url,function(data){
		if(data){
			var html='',list = data.list,sys_html='';
			$.each(list,function(k,v){
				dataNew[v.paraCode]=v;

			})
			//alert(dataNew["CHOOSE_CANCEL"]["paraValue"]);
			//系统参数区
             sys_html+='<tr id="'+dataNew["CHOOSE_CANCEL"]["id"]+'">';
				sys_html+='<td class="first">选课撤销功能</td>';
				sys_html+='<td id="'+dataNew["CHOOSE_CANCEL"]["paraCode"]+'">';
				if(dataNew["CHOOSE_CANCEL"]["paraValue"]==1){
					sys_html+="开启";
				}else{
					sys_html+="关闭";
				}
				sys_html+='</td>';
				sys_html+='<td ><a href="javascript:void(0)" onclick="doModify_top(this,\''+dataNew["CHOOSE_CANCEL"]["paraValue"]+'\',\''+dataNew["CHOOSE_CANCEL"]["id"]+'\',\''+dataNew["CHOOSE_CANCEL"]["paraCode"]+'\');" id="doModify">修改</a></td>';
				sys_html+='<input type="hidden" value="'+dataNew["CHOOSE_CANCEL"]["id"]+'">';
			sys_html+='</tr>';
			sys_html+='<tr id="'+dataNew["CHOOSE_CTR_TYPE"]["id"]+'">';
				sys_html+='<td class="first">选课控制方式</td>';
				sys_html+='<td id="'+dataNew["CHOOSE_CTR_TYPE"]["paraCode"]+'">';
				if(dataNew["CHOOSE_CTR_TYPE"]["paraValue"]==1){
					sys_html+="开关";
				}else{
					sys_html+="时间";
				}
				sys_html+='</td>';
				sys_html+='<td><a href="javascript:void(0)" onclick="doModify_top(this,'+dataNew["CHOOSE_CTR_TYPE"]["paraValue"]+',\''+dataNew["CHOOSE_CTR_TYPE"]["id"]+'\',\''+dataNew["CHOOSE_CTR_TYPE"]["paraCode"]+'\');" >修改</a></td>';
	         sys_html+='</tr>';
	         sys_html+='<tr id="'+dataNew["CHOOSE_TYPE"]["id"]+'">';
				sys_html+='<td class="first">默认选课方式</td>';
				sys_html+='<td id="'+dataNew["CHOOSE_TYPE"]["paraCode"]+'">';
				if(dataNew["CHOOSE_TYPE"]["paraValue"]==1){
					sys_html+="实时选课";
				}else{
					sys_html+="志愿选课";
				}
				sys_html+='</td>';
				sys_html+='<td><a href="javascript:void(0)" onclick="doModify_top(this,\''+dataNew["CHOOSE_TYPE"]["paraValue"]+'\',\''+dataNew["CHOOSE_TYPE"]["id"]+'\',\''+dataNew["CHOOSE_TYPE"]["paraCode"]+'\');" >修改</a></td>';
			 sys_html+='</tr>';
			 $('#openable_tbody_sys').html(sys_html);

			 //选课控制区

			 control_html+='<tr id="'+dataNew["PLAN_OPEN_COURSE"]["id"]+'" class="sysooo">';
			 control_html+='<td class="first">'+dataNew["PLAN_OPEN_COURSE"]["paraName"]+'</td>';//开课计划
			 control_html+=judge_status(dataNew["PLAN_OPEN_COURSE"]["paraValue"]);
			 if(dataNew["PLAN_OPEN_COURSE"]["proStarttime"]==null){
				 control_html+='<td>&nbsp;</td>';
				 control_html+='<td>&nbsp;</td>';
			 }else{
				 control_html+='<td>'+unixtotime(dataNew["PLAN_OPEN_COURSE"]["proStarttime"])+'</td>';
				 control_html+='<td>'+unixtotime(dataNew["PLAN_OPEN_COURSE"]["proEndtime"])+'</td>';
			 }
			 control_html+='<td>';
			 control_html+=judge_one(dataNew["PLAN_OPEN_COURSE"]["paraValue"],dataNew["PLAN_OPEN_COURSE"]["id"],3,"no_over");
			 control_html+='</td>';
             control_html+='</tr>';

			 control_html+='<tr id="'+dataNew["PLAN_OPEN_COURSE_SH"]["id"]+'" class="sysooo PLAN_OPEN_COURSE_SH">';
			 control_html+='<td class="first">'+dataNew["PLAN_OPEN_COURSE_SH"]["paraName"]+'</td>'; //开课计划审核
			 control_html+=judge_status(dataNew["PLAN_OPEN_COURSE_SH"]["paraValue"]);
			 if(dataNew["PLAN_OPEN_COURSE_SH"]["proStarttime"]==null){
				 control_html+='<td></td>';
				 control_html+='<td></td>';
			 }else{
				 control_html+='<td>'+unixtotime(dataNew["PLAN_OPEN_COURSE_SH"]["proStarttime"])+'</td>';
				 control_html+='<td>'+unixtotime(dataNew["PLAN_OPEN_COURSE_SH"]["proEndtime"])+'</td>';
			 }
			 control_html+='<td>';
			 control_html+=judge_one(dataNew["PLAN_OPEN_COURSE_SH"]["paraValue"],dataNew["PLAN_OPEN_COURSE_SH"]["id"],3,"PLAN_OPEN_COURSE_SH");
			 control_html+='</td>';
             control_html+='</tr>';

			 control_html+='<tr id="'+dataNew["PLAN_CHOOSE_COURSE"]["id"]+'" class="sysooo">';
			 control_html+='<td class="first">'+dataNew["PLAN_CHOOSE_COURSE"]["paraName"]+'</td>';//选课计划
			 control_html+=judge_status(dataNew["PLAN_CHOOSE_COURSE"]["paraValue"]);
			 if(dataNew["PLAN_CHOOSE_COURSE"]["proStarttime"]==null){
				 control_html+='<td></td>';
				 control_html+='<td></td>';
			 }else{
				 control_html+='<td>'+unixtotime(dataNew["PLAN_CHOOSE_COURSE"]["proStarttime"])+'</td>';
				 control_html+='<td>'+unixtotime(dataNew["PLAN_CHOOSE_COURSE"]["proEndtime"])+'</td>';
			 }

			 control_html+='<td>';
			 control_html+=judge_one(dataNew["PLAN_CHOOSE_COURSE"]["paraValue"],dataNew["PLAN_CHOOSE_COURSE"]["id"],3,"no_over");
			 control_html+='</td>';
             control_html+='</tr>';

			 control_html+='<tr id="'+dataNew["PLAN_CHOOSE_COURSE_SH"]["id"]+'" class="sysooo">';
			 control_html+='<td class="first">'+dataNew["PLAN_CHOOSE_COURSE_SH"]["paraName"]+'</td>';//选课计划审核
			 control_html+=judge_status(dataNew["PLAN_CHOOSE_COURSE_SH"]["paraValue"]);
			 if(dataNew["PLAN_CHOOSE_COURSE_SH"]["proStarttime"]==null){
				 control_html+='<td></td>';
				 control_html+='<td></td>';
			 }else{
				 control_html+='<td>'+unixtotime(dataNew["PLAN_CHOOSE_COURSE_SH"]["proStarttime"])+'</td>';
				 control_html+='<td>'+unixtotime(dataNew["PLAN_CHOOSE_COURSE_SH"]["proEndtime"])+'</td>';
			 }
			 control_html+='<td>';
			 control_html+=judge_one(dataNew["PLAN_CHOOSE_COURSE_SH"]["paraValue"],dataNew["PLAN_CHOOSE_COURSE_SH"]["id"],3,"LAN_CPHOOSE_COURSE_SH");
			 control_html+='</td>';
             control_html+='</tr>';

			 control_html+='<tr id="'+dataNew["PLAN_CHOOSE_COURSE_SET"]["id"]+'" class="sysooo" >';
			 control_html+='<td class="first">'+dataNew["PLAN_CHOOSE_COURSE_SET"]["paraName"]+'</td>';//选课设置
			 control_html+=judge_status(dataNew["PLAN_CHOOSE_COURSE_SET"]["paraValue"]);
			 if(dataNew["PLAN_CHOOSE_COURSE_SET"]["proStarttime"]==null){
				 control_html+='<td></td>';
				 control_html+='<td></td>';
			 }else{
				 control_html+='<td>'+unixtotime(dataNew["PLAN_CHOOSE_COURSE_SET"]["proStarttime"])+'</td>';
				 control_html+='<td>'+unixtotime(dataNew["PLAN_CHOOSE_COURSE_SET"]["proEndtime"])+'</td>';
			 }
			 control_html+='<td>';
			 control_html+=judge_one(dataNew["PLAN_CHOOSE_COURSE_SET"]["paraValue"],dataNew["PLAN_CHOOSE_COURSE_SET"]["id"],3);
			 control_html+='</td>';
             control_html+='</tr>';

			 control_html+='<tr id="'+dataNew["CHOOSE_BATCH"]["id"]+'" class="sysooo">';
			 control_html+='<td class="first">'+dataNew["CHOOSE_BATCH"]["paraName"]+'</td>';//批量选课
			 control_html+=judge_status(dataNew["CHOOSE_BATCH"]["paraValue"]);
			 if(dataNew["CHOOSE_BATCH"]["proStarttime"]==null){
				 control_html+='<td></td>';
				 control_html+='<td></td>';
			 }else{
				 control_html+='<td>'+unixtotime(dataNew["CHOOSE_BATCH"]["proStarttime"])+'</td>';
				 control_html+='<td>'+unixtotime(dataNew["CHOOSE_BATCH"]["proEndtime"])+'</td>';
			 }
			 control_html+='<td>';
			 control_html+=judge_one(dataNew["CHOOSE_BATCH"]["paraValue"],dataNew["CHOOSE_BATCH"]["id"],3,"no_over");
			 control_html+='</td>';
             control_html+='</tr>';

			 control_html+='<tr id="'+dataNew["CHOOSE_BATCH_SH"]["id"]+'" class="sysooo">';
			 control_html+='<td class="first">'+dataNew["CHOOSE_BATCH_SH"]["paraName"]+'</td>';//批量选课审核
			 control_html+=judge_status(dataNew["CHOOSE_BATCH_SH"]["paraValue"]);
			 if(dataNew["CHOOSE_BATCH_SH"]["proStarttime"]==null){
				 control_html+='<td></td>';
				 control_html+='<td></td>';
			 }else{
				 control_html+='<td>'+unixtotime(dataNew["CHOOSE_BATCH_SH"]["proStarttime"])+'</td>';
				 control_html+='<td>'+unixtotime(dataNew["CHOOSE_BATCH_SH"]["proEndtime"])+'</td>';
			 }
			 control_html+='<td>';
			 control_html+=judge_one(dataNew["CHOOSE_BATCH_SH"]["paraValue"],dataNew["CHOOSE_BATCH_SH"]["id"],3,"CHOOSE_BATCH_SH");
			 control_html+='</td>';
             control_html+='</tr>';

			 control_html+='<tr id="'+dataNew["OBLIGATORY_GRAB"]["id"]+'" class="sysooo">';
			 control_html+='<td class="first">'+dataNew["OBLIGATORY_GRAB"]["paraName"]+'</td>';//必修抢座
			 control_html+=judge_status(dataNew["OBLIGATORY_GRAB"]["paraValue"]);
			 if(dataNew["OBLIGATORY_GRAB"]["proStarttime"]==null){
				 control_html+='<td></td>';
				 control_html+='<td></td>';
			 }else{
				 control_html+='<td>'+unixtotime(dataNew["OBLIGATORY_GRAB"]["proStarttime"])+'</td>';
				 control_html+='<td>'+unixtotime(dataNew["OBLIGATORY_GRAB"]["proEndtime"])+'</td>';
			 }
			 control_html+='<td>';
			 control_html+=judge_two(dataNew["OBLIGATORY_GRAB"]["paraValue"],dataNew["OBLIGATORY_GRAB"]["id"],4);
			 control_html+='</td>';
             control_html+='</tr>';

			 control_html+='<tr id="'+dataNew["OPTIONAL_GRAB"]["id"]+'" class="sysooo">';
			 control_html+='<td class="first">'+dataNew["OPTIONAL_GRAB"]["paraName"]+'</td>';//选修抢座
			 control_html+=judge_status(dataNew["OPTIONAL_GRAB"]["paraValue"]);
			 if(dataNew["OPTIONAL_GRAB"]["proStarttime"]==null){
				 control_html+='<td></td>';
				 control_html+='<td></td>';
			 }else{
				 control_html+='<td>'+unixtotime(dataNew["OPTIONAL_GRAB"]["proStarttime"])+'</td>';
				 control_html+='<td>'+unixtotime(dataNew["OPTIONAL_GRAB"]["proEndtime"])+'</td>';
			 }
			 control_html+='<td>';
			 control_html+=judge_two(dataNew["OPTIONAL_GRAB"]["paraValue"],dataNew["OPTIONAL_GRAB"]["id"],4);
			 control_html+='</td>';
             control_html+='</tr>';

			 control_html+='<tr id="'+dataNew["ASPIRATION_CHOOSE"]["id"]+'" class="sysooo">';
			 control_html+='<td class="first">'+dataNew["ASPIRATION_CHOOSE"]["paraName"]+'</td>';//志愿选课
			 control_html+=judge_status(dataNew["ASPIRATION_CHOOSE"]["paraValue"]);
			 if(dataNew["ASPIRATION_CHOOSE"]["proStarttime"]==null){
				 control_html+='<td></td>';
				 control_html+='<td></td>';
			 }else{
				 control_html+='<td>'+unixtotime(dataNew["ASPIRATION_CHOOSE"]["proStarttime"])+'</td>';
				 control_html+='<td>'+unixtotime(dataNew["ASPIRATION_CHOOSE"]["proEndtime"])+'</td>';
			 }
			 control_html+='<td>';
			 control_html+=judge_two(dataNew["ASPIRATION_CHOOSE"]["paraValue"],dataNew["ASPIRATION_CHOOSE"]["id"],4);
			 control_html+='</td>';
             control_html+='</tr>';

             control_html+='<tr id="'+dataNew["ASPIRATION_CHOOSE_SH"]["id"]+'" class="sysooo">';
			 control_html+='<td class="first">'+dataNew["ASPIRATION_CHOOSE_SH"]["paraName"]+'</td>';//志愿选课审核
			 control_html+=judge_status(dataNew["ASPIRATION_CHOOSE_SH"]["paraValue"]);
			 if(dataNew["ASPIRATION_CHOOSE_SH"]["proStarttime"]==null){
				 control_html+='<td></td>';
				 control_html+='<td></td>';
			 }else{
				 control_html+='<td>'+unixtotime(dataNew["ASPIRATION_CHOOSE_SH"]["proStarttime"])+'</td>';
				 control_html+='<td>'+unixtotime(dataNew["ASPIRATION_CHOOSE_SH"]["proEndtime"])+'</td>';
			 }
			 control_html+='<td>';
			 control_html+=judge_one(dataNew["ASPIRATION_CHOOSE_SH"]["paraValue"],dataNew["ASPIRATION_CHOOSE_SH"]["id"],3,"ASPIRATION_CHOOSE_SH");
			 control_html+='</td>';
             control_html+='</tr>';

             control_html+='<tr id="'+dataNew["ANNOUNCE_RESULT"]["id"]+'" class="sysooo">';
			 control_html+='<td class="first">'+dataNew["ANNOUNCE_RESULT"]["paraName"]+'</td>';//发布选课结果
			 control_html+=judge_status(dataNew["ANNOUNCE_RESULT"]["paraValue"]);
			 if(dataNew["ANNOUNCE_RESULT"]["proStarttime"]==null){
				 control_html+='<td>&nbsp;</td>';
			 }else{
				 control_html+='<td>'+unixtotime(dataNew["ANNOUNCE_RESULT"]["proStarttime"])+'</td>';
			 }
			 control_html+='<td>------</td>';
			 control_html+='<td>';
			 if(dataNew["ANNOUNCE_RESULT"]["paraValue"]==1){
				 control_html+='<a href="javascript:void(0)" onclick="doModify_only(this,'+dataNew["ANNOUNCE_RESULT"]["paraValue"]+',\''+dataNew["ANNOUNCE_RESULT"]["id"]+'\',3);">开始</a>&nbsp;';
			 }else{
				 control_html+='<i class="color_gray" >结束&nbsp;</i>';
			 }

			 control_html+='</td>';
             control_html+='</tr>';


			 $('#openable_tbody_control').html(control_html);

			//开课计划
			 if(dataNew["PLAN_OPEN_COURSE"]["paraValue"]==3 && dataNew["PLAN_OPEN_COURSE_SH"]["paraValue"]==4){
				$('.PLAN_OPEN_COURSE_SH td:last').children().eq(2).remove();
				$('.PLAN_OPEN_COURSE_SH td:last').append('<i class="color_gray">结束</i>');
			 }
			//选课计划
			 if(dataNew["PLAN_CHOOSE_COURSE"]["paraValue"]==3 && dataNew["PLAN_CHOOSE_COURSE_SH"]["paraValue"]==4){
				$('.PLAN_CHOOSE_COURSE_SH td:last').children().eq(2).remove();
				$('.PLAN_CHOOSE_COURSE_SH td:last').append('<i class="color_gray">结束</i>');
			 }
			 //批量选课
			 if(dataNew["CHOOSE_BATCH"]["paraValue"]==3 && dataNew["CHOOSE_BATCH_SH"]["paraValue"]==4){
				$('.CHOOSE_BATCH_SH td:last').children().eq(2).remove();
				$('.CHOOSE_BATCH_SH td:last').append('<i class="color_gray">结束</i>');
			 }
			showStatus();
		}

	});

}

function judge_one(status,id,type,over){
	var control_html='';
	if(status==1){
		 control_html+='<a href="javascript:void(0)" onclick="doModify(this,'+status+',\''+id+'\',3,'+type+',\''+over+'\');">开始</a>&nbsp;';
		 control_html+='<i class="color_gray">暂停&nbsp;</i>';
		 if(over=='no_over'){
			 control_html+='';
		 }else{
			 control_html+='<i class="color_gray">结束</i>';
		 }

	 }else if(status==3){
		 control_html+='<i class="color_gray">开始&nbsp;</i>';
		 control_html+='<a href="javascript:void(0)" onclick="doModify(this,'+status+',\''+id+'\',4,'+type+',\''+over+'\');">暂停&nbsp;</a>';
		 if(over=='no_over'){
			 control_html+='';
		 }else{
			 control_html+='<a href="javascript:void(0)" onclick="show_over(this,'+status+',\''+id+'\',5,'+type+');">结束</a>';
		 }
	 }else if(status==5){
		 control_html+='<i class="color_gray">开始&nbsp;</i>';
		 control_html+='<i class="color_gray">暂停&nbsp;</i>';
		 if(over=='no_over'){
			 control_html+='';
		 }else{
			 control_html+='<i class="color_gray">结束</i>';
		 }
	 }else if(status==4){
		 control_html+='<a href="javascript:void(0)" onclick="doModify(this,'+status+',\''+id+'\',3,'+type+',\''+over+'\');">开始</a>&nbsp;';
		 control_html+='<i class="color_gray">暂停&nbsp;</i>';
		 if(over=='no_over'){
			 control_html+='';
		 }else{
			 control_html+='<a href="javascript:void(0)" onclick="show_over(this,'+status+',\''+id+'\',5,'+type+');">结束</a>';
		 }

	 }
	return control_html;
}
function judge_two(status,id,type,paravalue){
	var control_html='';
	if(status==1){
		 control_html+='<a href="javascript:void(0)" onclick="doModify(this,'+status+',\''+id+'\',2,'+type+');">公示</a>&nbsp;';
		 control_html+='<i class="color_gray">开始&nbsp;</i>';
		 control_html+='<i class="color_gray">暂停&nbsp;</i>';
		 control_html+='<i class="color_gray">结束</i>';
	 }else if(status==2){
		 control_html+='<i class="color_gray">公示&nbsp;</i>';
		 control_html+='<a href="javascript:void(0)" onclick="doModify(this,'+status+',\''+id+'\',3,'+type+');">开始&nbsp;</a>';
		 control_html+='<a href="javascript:void(0)" onclick="doModify(this,'+status+',\''+id+'\',4,'+type+');">暂停&nbsp;</a>';
		 control_html+='<a href="javascript:void(0)" onclick="doModify(this,'+status+',\''+id+'\',5,'+type+',\''+paravalue+'\');">结束</a>';
	 }else if(status==3){
		 control_html+='<i class="color_gray">公示&nbsp;</i>';
		 control_html+='<i class="color_gray">开始&nbsp;</i>';
		 control_html+='<a href="javascript:void(0)" onclick="doModify(this,'+status+',\''+id+'\',4,'+type+');">暂停&nbsp;</a>';
		 control_html+='<a href="javascript:void(0)" onclick="doModify(this,'+status+',\''+id+'\',5,'+type+',\''+paravalue+'\');">结束</a>';
	 }else if(status==4){
		 control_html+='<i class="color_gray">公示&nbsp;</i>';
		 control_html+='<a href="javascript:void(0)" onclick="doModify(this,'+status+',\''+id+'\',3,'+type+');">开始</a>&nbsp;';
		 control_html+='<i class="color_gray">暂停&nbsp;</i>';
		 control_html+='<a href="javascript:void(0)" onclick="doModify(this,'+status+',\''+id+'\',5,'+type+',\''+paravalue+'\');">结束</a>';
	 }else if(status==5){
		 control_html+='<i class="color_gray">公示&nbsp;</i>';
		 control_html+='<i class="color_gray">开始&nbsp;</i>';
		 control_html+='<i class="color_gray">暂停&nbsp;</i>';
		 control_html+='<i class="color_gray">结束</i>';
	 }
	return control_html;
}

function judge_status(status){
	var control_html='';
	switch(status){
	case "1":
		 control_html+='<td>未开始</td>';
		 break;
	case "2":
		 control_html+='<td>公示</td>';
		 break;
	case "3":
		 control_html+='<td>开始</td>';
		 break;
	case "4":
		 control_html+='<td>暂停</td>';
		 break;
	case "5":
		 control_html+='<td>结束</td>';
		 break;
	}
	return control_html;
}
function unixtotime(times){
	var hour='';
	var min='';
	var date='';
	var mon='';
	var time = parseInt(times);
	var d = new Date(time);
	hour = parseInt(d.getHours());
	(hour<10)?(hour='0'+hour):(hour=hour);
	(d.getMinutes()<10)?(min='0'+d.getMinutes()):(min=d.getMinutes());
	(d.getSeconds()<10)?(sec='0'+d.getSeconds()):(sec=d.getSeconds());
	(d.getDate()<10)?(date='0'+d.getDate()):(date=d.getDate());
	(d.getMonth()<10)?(mon='0'+(d.getMonth()+1)):(mon=d.getMonth()+1);
	return (d.getUTCFullYear()+"-"+mon+"-"+date+" "+hour+":"+min+":"+sec);
}

function doModify(e,status,id,num,type,over){
	//$("#Modify").click(function(e) {
		//e.preventDefault();

		$.fn.nyroModalManual({
			width:400,
			title:"系统提示",
			//url: 'overlay_ok_grab.html?status='+encodeURIComponent(status)
			content:showconetent(status,id,num,type,over)
		});
	return false;
	//});
}
function showconetent(status,pid,num,type,over){
	var content='';
    content+='<div class="overlay_delete_box">';
    content+='<h5 class="green"><img src="images/information_ico.gif" />确定要修改吗？</h5>';
    content+='</div>';
    content+='<div class="overlay_btn">';
    content+='<input type="button" class="btn btn_green overlayClose ysedisseat" onclick="dodeal_control('+num+',\''+pid+'\','+num+','+type+',\''+over+'\')" value="确定修改"/>';
    content+='<input type="button" class="btn btn_gray overlayClose" value="取消"/>';
    content+='</div>';
	return  content;
}

function dodeal(value,sid,paraCode){
	value = parseInt(value);
	var dqstatus=0;
	$('.sys_area').each(function(){
		if(this.checked==true) dqstatus=this.value;
	})
	value = parseInt(value);
	if(value==1){
		value=2;
	}else{
		value=1;
	}
	var params={};
	params = {
			status : dqstatus,
			id : sid
	}
	var str = Ab.encode(params);
	var status='';
	var sysparaCode='';
	var sysval='';
		$.ajax({
			type: "POST",
			data: str,
			dataType:"json",
			url:G_ROOT+"control/setparameter",
			contentType:'application/json;charset=UTF-8',
			success:function(data){

				if(data.returnCode==000000){
					setTimeout(function(){
						mAlert("修改成功");
					},500);

					showStatus();
					var list = data.entity;
					//var data='';
					sysparaCode = list['paraCode'];
					sysval = list['paraValue'];

					if(sysparaCode=="CHOOSE_CANCEL" && sysval=="1"){
						status+="开启";
					}else if(sysparaCode=="CHOOSE_CANCEL" && sysval=="2"){
						status+="关闭";
					}else if(sysparaCode=="CHOOSE_CTR_TYPE" && sysval=="1"){
						status+="开关";
					}else if(sysparaCode=="CHOOSE_CTR_TYPE" && sysval=="2"){
						status+="时间";
					}else if(sysparaCode=="CHOOSE_TYPE" && sysval=="1"){
						status+="实时选课";
					}else if(sysparaCode=="CHOOSE_TYPE" && sysval=="2"){
						status+="志愿选课";
					}
						$('#'+sid).children().eq(1).html(status);
				}else{
					setTimeout(function(){
						mAlert("修改失败");
					},500);
				}
				getList_Sysparameters();
			}
		});

}
function dodeal_control(value,sid,num,type,over){
	var params={};
	params = {
			value : num,
			id : sid
	}
	var str = Ab.encode(params);
	$.ajax({
		type: "POST",
		data: str,
		dataType:"json",
		url:G_ROOT+"control/update",
		contentType:'application/json;charset=UTF-8',
		success:function(data){
			if(data.rCount==100){
				setTimeout(function(){
					mAlert("修改成功");
				},300);
					setTimeout(function(){
						showStatus();
					},300)
					var html='';
					var list = data.entity;
					var data='';
					var status = G_data['controlStatus'][num];
					//alert(type);

					if(type==3){
						data = judge_one(num,list.id,type,over);
					}else{
						data = judge_two(num,list.id,type,over);
					}
					$('#'+list['id']).children().eq(1).html(status);
					$('#'+list['id']).children().eq(4).html(data);

			}else if(data.rCount==200){
				setTimeout(function(){
					mAlert("还有未审核的记录,该流程不能结束");
				},300);
			}else{
				setTimeout(function(){
					mAlert("修改错误");
				},300);
			}
		}
	})
	setTimeout(function(){
		getList_Sysparameters();
	},300);

}
////00000000000000
function doModify_top(e,status,id,paraCode){
	//$("#Modify").click(function(e) {
		//e.preventDefault();
		$.fn.nyroModalManual({
			width:400,
			title:"系统提示",
			//url: 'overlay_ok_grab.html?status='+encodeURIComponent(status)
			content:showconetent_top(status,id,paraCode)
		});
	return false;
	//});
}
function showconetent_top(status,id,paraCode){
	var content='';
	status==1?status=1:status=2;
    content+='<div class="overlay_delete_box">';
    if(paraCode=="CHOOSE_CANCEL"){
    	content+='<h5 class="green"><input type="radio" name="chooseOpt" value="1" class="sys_area"' + (status==1?"checked":"") +' />开启  <input class="sys_area" type="radio" value="2" name="chooseOpt" '+ (status==2?"checked":"") +' />关闭</h5>';
    }else if(paraCode=="CHOOSE_CTR_TYPE"){
    	content+='<h5 class="green"><input type="radio"  name="chooseOpt" value="1" class="sys_area"' + (status==1?"checked":"") +'  />开关  <input class="sys_area" type="radio" value="2" name="chooseOpt" '+ (status==2?"checked":"") +' />时间</h5>';
    }else if(paraCode=="CHOOSE_TYPE"){
    	content+='<h5 class="green"><input type="radio" name="chooseOpt" value="1" class="sys_area"' + (status==1?"checked":"") +'  />实时选课  <input class="sys_area" type="radio" value="2" name="chooseOpt" '+ (status==2?"checked":"") +' />志愿选课</h5>';
    }
    content+='</div>';
    content+='<div class="overlay_btn">';
    content+='<input type="button" class="btn btn_green overlayClose ysedisseat" onclick="dodeal(\''+status+'\',\''+id+'\',\''+paraCode+'\')" value="确定修改"/>';
    content+='<input type="button" class="btn btn_gray overlayClose" value="取消"/>';
    content+='</div>';
	return  content;
}

function show_over(e,status,id,num,type){
	$.fn.nyroModalManual({
			width:400,
			title:"系统提示",
			//url: 'overlay_ok_grab.html?status='+encodeURIComponent(status)
			content:show_over_content(status,id,num,type)
	});

	return false;
}

function show_over_content(status,pid,num,type){
	var content='';
	content+='<div class="overlay_delete_box">';
	content+='<h5 class="green"><img src="images/information_ico.gif" />点击结束后不能再重新开始该流程，是否确定结束？</h5>';
	content+='</div>';
	content+='<div class="overlay_btn">';
	content+='<input type="button" class="btn btn_green overlayClose ysedisseat" onclick="dodeal_control('+status+',\''+pid+'\','+num+','+type+')" value="确定结束"/>';
	content+='<input type="button" class="btn btn_gray overlayClose" value="取消"/>';
	content+='</div>';
	return  content;
}

function doModify_only(e,status,id,num){
	$.fn.nyroModalManual({
		width:400,
		title:"系统提示",
		//url: 'overlay_ok_grab.html?status='+encodeURIComponent(status)
		content:showconetent_only(status,id,num)
	});
return false;
}
function showconetent_only(status,pid,num,type){
	var content='';
    content+='<div class="overlay_delete_box">';
    content+='<h5 class="green"><img src="images/information_ico.gif" />确认开始？</h5>';
    content+='</div>';
    content+='<div class="overlay_btn">';
    content+='<input type="button" class="btn btn_green ysedisseat" onclick="dodeal_only('+num+',\''+pid+'\','+num+')" value="确定"/>';
    content+='<input type="button" class="btn btn_gray overlayClose" value="取消"/>';
    content+='</div>';
	return  content;
}
function dodeal_only(value,sid,num,type){
	var params={};
	params = {
			value : value,
			id : sid
	}
	var str = Ab.encode(params);
	$.ajax({
		type: "POST",
		data: str,
		dataType:"json",
		url:G_ROOT+"control/update",
		contentType:'application/json;charset=UTF-8',
		success:function(data){
			if(data.rCount==100){
				mAlert("修改成功");
				showStatus();
				var html='';
				var list = data.entity;
				var data='';
				var status = G_data['controlStatus'][num];

				$('#'+list['id']).children().eq(1).html(status);
				$('#'+list['id']).children().eq(4).html('<i class="color_gray" >开始&nbsp;</i>');
			}else if(data.rCount==200){
				setTimeout(function(){
					mAlert("还有未审核的记录,该流程不能结束");
				},300);
			}else{
				setTimeout(function(){
					mAlert("修改错误");
				},300);
			}
		}
	})
}

function showStatus(){   //显示当前状态
	var statusval = '';
	var content='';
	$(".sysooo").each(function(){
		if(($(this).children().siblings().eq(1).html()=="开始")||($(this).children().siblings().eq(1).html()=="暂停")||($(this).children().siblings().eq(1).html()=="公示")){
			statusval+= ($(this).children().siblings().eq(0).html())+'-';
		}
	});
//	statusval.prototype.Trim = function(statusval){    //字符串截取，去除前后特殊字符串
//		return this.replace(/(^\s*)|(\s*$)/g,"-");
//	}
	statusval = statusval.substr(0,statusval.length-1);
	content+='<h5>当前阶段：'+statusval+'</h5>';
	$("#currentStatus").html(content);

}