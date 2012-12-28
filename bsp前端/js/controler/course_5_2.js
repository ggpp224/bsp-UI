/**
 * @author wl
 * @datetime 2012-4-25
 * @description course_5_2.js
 */
var queryUrl_termcount='';
var queryUrl_coursestander='';


var currPage=getQuery('page');
currPage = currPage || 1;
var termid ='';
var course_code = '';
 var cmb = new ComboxOperate();
$(function(){
	cmb.term();
	var stuId = user['uid'];
	termid = $("#form_term").val();
	queryUrl_termcount = termid;
	getList_termcount(1);

	$("#refresh").click(function(){
		termid = $("#form_term").val();
		queryUrl_termcount = termid;
		getList_termcount(1);
	})
	$("#form_query").click(function(){

		termid = $("#form_term").val();  //获取选课批次

		chooseType = $("#form_chooseType").val();
		courseCodeStander =$("#form_courseCodeStander").val(); //获取批次代码
		courseNameStander = $("#form_courseNameStander").val(); //获取批次名称
		queryUrl_coursestander = termid+'/'+(courseCodeStander==0?"null":courseCodeStander)+'/'+(courseNameStander==0?"null":courseNameStander)+'/'+(chooseType==0?"null":chooseType)+'/';
		getList_courseStander(1);

	});
})

function getList_termcount(page){
	page = (page && page>0)?page=page:page=Math.abs(page);
	var url=G_ROOT+'control/term/'+queryUrl_termcount;

	$.getJSON(url,function(data){
		var html='',list = data.entity;
		if(list){

			//alert(list);
			//var termset = $("#form_term").attr("checked","checked").val();
			//$.each(list,function(k,v){
				html+='<tr>';
				html+='<th class="first">'+list.seatCount+'</th>';
				html+='<th>'+list.selectedSeatCount+'</th>';
				html+='<th>'+list.surplusSeatCount+'</th>';
				html+='<th>'+list.studentCount+'</th>';
				html+='<th>'+list.selectedStuCount+'</th>';
				html+='<th>'+list.disSelectStuCount+'</th>';
				html+='</tr>';
				html = throwNull(html);
			//})
			$('#openable_tbody_termcount').html(html);
			$('#pageShow').html(gPage(data.rCount,page,'getList'));
		}
	});
}
function getList_courseStander(page){
	page = (page && page>0)?page=page:page=Math.abs(page);
	var url=G_ROOT+'control/curriculum/'+queryUrl_coursestander+page+'/'+G_perpage;

	$.getJSON(url,function(data){
		if(data){
			var html='',list = data.list;
			//var termset = $("#form_term").attr("checked","checked").val();

			$.each(list,function(k,v){
				var mm = v.MINMAXNUM.split('/'),
					min = parseInt(mm[0]),
					max = parseInt(mm[1]);

				var cpCount = v.CPCOUNT,
					ccCount = v.CCCOUNT;
				var siteTd=ccCount,
				courseTd=cpCount;
				if(ccCount<min){
					siteTd = '<i class="color_red" >'+ccCount+'</i>';
				}
				if(cpCount>max){
					courseTd='<i class="color_red">'+cpCount+'</i>';
				}
				html+='<tr>';
				html+='<td class="first"><a href="javascript:void(0)" onclick="getList_courseLlist(1,\''+v.COURSECODESTANDARD+'\',\''+termid+'\',\''+v.COURSENAMESTANDARD+'\',\''+v.CHOOSETYPE+'\')\">展开</a></td>';
				html+='<td><a href="javascript:void(0)" onclick="win_major({code:\''+v.COURSECODESTANDARD+'\',id:\''+v.TERM_ID+'\'})">'+v.COURSENAMESTANDARD+'</a></td>';
				html+='<td>'+G_data['chooseType'][v.CHOOSETYPE]+'</td>';
				html+='<td>'+v.MINMAXNUM+'</td>';
				html+='<td><a href="javascript:void(0)" onclick="win_planNum(\''+v.TERM_ID+'\',\''+v.COURSECODESTANDARD+'\')">'+courseTd+'</a></td>';
				html+='<td>'+'0'+'</td>';
				html+='<td>'+siteTd+'</td>';
				html+='<td>'+v.LEFTSEAT+'</td>';
				html+='</tr>';
			});
			$('#openable_tbody_coursestander').html(html);
			$('#pageShow').html(gPage(data.rCount,page,'getList_coursestander'));
		}
	});
}

function getList_courseLlist(page,courseCode,tremId,courseName,chooseType){
	queryUrl_courseLlist =tremId+'/'+courseCode;
	var url=G_ROOT+'control/othercourses/'+queryUrl_courseLlist;
	$.getJSON(url,function(data){
		if(data){
			var html='',list = data.list;
			var currentExpansion = '';
			currentExpansion = '<h5>当前展开：'+courseName+'【'+G_data['chooseType'][chooseType]+'】</h5>';
			//var termset = $("#form_term").attr("checked","checked").val();
			$.each(list,function(k,v){
				html+='<tr>';
                html+='<td>'+v.COURSENAME+'</td>';
                html+='<td>'+v.SCHOOLNAME+'</td>';
                html+='<td>'+v.MINMAXNUM+'</td>';
               if(v.CANOPEN==2){
            	   html+='<td><span style="color:red">'+v.CCCOUNT+'</span></td>';
               }else{
            	   html+='<td>'+v.CCCOUNT+'</td>';
               }
                html+='<td>'+v.LEFTSEAT+'</td>';
				html+='</tr>';
			})
			$('#currentExpansion').html(currentExpansion);
			$('#openable_tbody_courseList').html(html);
			$('#pageShow').html(gPage(data.rCount,page,'getList_courseLlist'));
		}
	});

}

var win_planNum = function(tremId,courseCode){
	termid=tremId;
	course_code=courseCode;
	$.fn.nyroModalManual({
			width:600,
			height:400,
			title:"各校计划表",
			url: 'overlay_opencourse_person.html'
		});
	
	

};
//function win_planNum(){
//	$.fn.nyroModalManual({
//		width:400,
//		title:"各校计划表",
//		content: plantable
//	});
//}