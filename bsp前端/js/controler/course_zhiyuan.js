/**
 * @author wl
 * @datetime 2012-4-25
 * @description course_zhiyuan.js
 */
var queryUrl = '';

var param={};
var backstatus='';

var termset=decodeURIComponent(getQuery('termset'));		// 批次
var coursecode=decodeURIComponent(getQuery('COURSECODE'));	// 课程代码
var studentid=decodeURIComponent(getQuery('STUDENTID'));	// 学生ID

var coursenature=decodeURIComponent(getQuery('coursenature'));
var coursenamestandard=decodeURIComponent(getQuery('coursenamestandard'));
var choosetype=parseInt(getQuery('choosetype'));
var currstatus = decodeURIComponent(getQuery('currstatus'));
var url_top=G_ROOT+'choosecoursevolunte/statescoursevolunte/'+termset+'/'+coursecode;
var url_bottom=G_ROOT+'choosecoursevolunte/findcoursevolunte/'+coursecode+'/'+termset+'/'+studentid;
var url_status=G_ROOT+'choosecoursevolunte/statcoursevolunte/'+coursecode+'/'+termset+"/"+user['schoolCode'];

G_data['zy_currStatus']={'12':'公示中','14':'公示中','0':'待选','13':'待选','1':'志愿已提交,等待抽签','3':'成功','4':'未成功','15':'已过期','2':'已撤销'};
function audit(params,suc,err){
	var str = Ab.encode(params);
	$.ajax({
		type: 'POST',
		data:str,
		dataType: 'json',
		url: G_ROOT+'choosecoursedetail/createcoursedetail',
		contentType:'application/json;charset=UTF-8',
		error: err,
		success:suc
	});
}

$(document).ready(function() {
	getList(1);

	$("#addBtn").click(function(){
		//alert(1234);
		//var params = Ab.urlDecode(Ab.serializeForm('zhiyuan_form'));
		var ids=[];
		$('#js_course_tbody_2').find('.ids').each(function(){
			ids.push($(this).val());
		});

		param={
			termId				:	termset,
			studentId 			:	studentid,
			updater 			:	user['uid'],
			creater             :	user['uid'],
			courseCodeStandard 	:	coursecode,
			courseNameStandard 	:	coursenamestandard,
			courseNature 		:	coursenature,
			chooseType 			:	choosetype,
			aspirationSequence	:	ids.join(',')
		};

		shenHe(3,"提交成功");
	});

 	var shenHe = function(status,title){
 		//var ids = getIds('js_course_tbody');

		var dgSuc = function(rs){
			if(rs.returnCode=='000000'){
				alert("操作成功");
				window.location ="course.html";
			}else{
				alert("操作失败");
			}
			//e.preventDefault();

		},
		dgErr = function(rs){
			alert("操作失败");
		};
		audit(param,dgSuc,dgErr);
 	};

});
 /******** 函数定义 **********/
 function getList(page){

		page = (page && page>0)?page=page:page=Math.abs(page);

		// 课程详情
		$.getJSON(url_top,function(data){
			var list = data.list;
			if(list){
				var html='';
				$.each(list,function(k,v){
					html+='<fieldset><legend class="big">'+coursenamestandard+':<i>（'+(coursenature==='1'?"必修":"选修")+'课）</i></legend></fieldset>';
					html+='<dl class="search_dl_long"><dt>选课方式：</dt><dd>'+G_data['chooseType'][choosetype]+'</dd></dl>';
					html+='<dl class="search_dl_long"><dt>选课说明：</dt><dd>'+v.CHOOSEEXPLAN+'</dd></dl>';
					html+='<dl class="search_dl_long"><dt>选课时间：</dt><dd>'+v.STARTT+'~'+v.ENDT+'</dd></dl>';
					html+='<dl class="search_dl_long"><dt>结果通知时间：</dt><dd>'+v.FBSTARTT+'</dd></dl>';
					html+='<dl class="search_dl_long"><dt>当前选课状态：</dt><dd>'+(currstatus=='已选'?'志愿已提交,等待抽签':currstatus)+'</dd></dl>';
					html = throwNull(html);
					backstatus=parseInt(v.PARAVALUE);
				});
				$('#details').html(html);
				// 当前选课状态
				$.getJSON(url_status,function(data){
					var list = data.list;
					if(list){
						if(backstatus==14){
							$("#addBtn").attr("disabled",true).removeClass("btn_blue btn");
						}
						html='本批次总座位数:&nbsp;<i class="color_red">'+list[0].ALLDATA+'</i>个,本校名额：'+list[0].CHOOSE_QUOTA+'个<br />本校参与选课总人数:&nbsp;必修<i class="color_red">'+list[0].BIXIU+'</i>人，选修<i class="color_red">'+list[0].XUANXIU+'</i>人';
						$('#peopleNum').html(html);
					}
				});

				if(backstatus==3) $('#paravalue').show();
			}
		});

		// 选课列表
		$.getJSON(url_bottom,function(data){
			var list = data.list;
			if(list){
				var html_shunxu='', html='', html_status='',i=0;
				var html_shunxu_my='', html_my='', html_status_my='',j=0;
				$.each(list,function(k,v){
					if(user['schoolCode']!=v.SCHOOLCODE){
						html_shunxu+='<tr id="'+(i+1)+'" >';
						html_shunxu+='<td class="first tc">'+(i+1)+'</td>';
						html_shunxu+='</tr>';
						html+='<tr id="'+(i+1)+'" style="cursor: move;">';
						html+='<td><a href="course_open_data.html?c='+v.COURSECODE+'&t='+v.TERMID+'">'+v.COURSENAME+'</a><input type="hidden" class="ids" value="'+v.OPENID+'" /></td>';
						html+='<td>'+v.TEACHERS+'</td>';
						html+='<td>'+G_data['school'][v.SCHOOLCODE]+'</td>';
						html+='<td>'+v.SCORE+'</td>';
						html+='<td>'+v.MAXMINNUM+'</td>';
						html+='</tr>';
						html_status='<dl class="search_dl_long"><dt>当前选课状态：</dt><dd>'+G_data['zy_currStatus'][v.STATUS]+'</dd></dl>';
						html = throwNull(html);
						i++;
					}else{
						html_shunxu_my+='<tr >';
						html_shunxu_my+='<td class="first tc">'+(j+1)+'</td>';
						html_shunxu_my+='</tr>';
						html_my+='<tr id="'+(j+1)+'">';
						html_my+='<td><a href="course_coursenature_data.html?c='+v.COURSECODE+'&s='+v.SCHOOLCODE+'&i='+v.COURSEID+'&oi='+v.OPENID+'">'+v.COURSENAME+'</a><input type="hidden" class="ids" value="'+v.OPENID+'" /></td>';
						html_my+='<td>'+v.TEACHERS+'</td>';
						html_my+='<td>'+G_data['school'][v.SCHOOLCODE]+'</td>';
						html_my+='<td>'+v.SCORE+'</td>';
						html_my+='<td>'+v.MAXMINNUM+'</td>';
						html_my+='</tr>';
						html_status_my='<dl class="search_dl_long"><dt>当前选课状态：</dt><dd>'+G_data['zy_currStatus'][v.STATUS]+'</dd></dl>';
						html_my = throwNull(html_my);
						j++;
					}

				});
				if(html) $('#submDiv').show();
				$('#js_course_tbody_1').html(html_shunxu);
				$('#js_course_tbody_2').html(html);
				$('#js_course_tbody_1_myscourse').html(html_shunxu_my);
				$('#js_course_tbody_2_myscourse').html(html_my);
				$('#choose_status').html(html_status);
				summary.tabs();//Tabs
				summary.tablehover();//Hover
			}
		});

	}


