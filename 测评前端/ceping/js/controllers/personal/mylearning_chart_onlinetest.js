/**
 * @author xzy
 * @datetime 2012-8-15
 * @description mylearning_chart_onlinetest.js
 */
	function openwin(url) {
		window.open(url,"考试页面", " toolbar=no, menubar=no, scrollbars=yes, resizable=no, location=no, status=no")
	}
var getList = function (page){
		page = (page && page > 0) ? page = page : page = Math.abs(page);
		tstatus =  $('#js_select_box').attr('value') || '';
		var url = queryUrl+'&pageno='+page+'&pagesize='+G_PAGESIZE+'&callback=?';
		$.getJSON(url,function(data){
			if(data.returnCode=='000000'){
				var list=data.list;
				var html='';
				for(var i in list){
					var v=list[i];
					var statusTxt= '<b class="font_red">未完成</b>',
						currTime = v.sysdate,
						beginTime = v.beginTime,
						endTime = v.endTime,
						StarTestHref = '<a class="icon_start" title="进入考试" href="javascript:" onclick="openwin(\'began_testing.html?implementId='+v.id+'&examPaperId='+v.examPaperId+'&examDuration='+v.examDuration+'&readingMode='+v.readingMode+'&hasTest='+(v.examNumber+1)+'&status=1\')">开始</a>',
						currHref = '<a href="javascript:" onclick="openwin(\'began_testing.html?implementId='+v.id+'&examPaperId='+v.examPaperId+'&examDuration='+v.examDuration+'&readingMode='+v.readingMode+'&hasTest='+(v.examNumber+1)+'&status=1\')">'+v.implementName+'</a>';
						currHref_dis = '<a href="began_testing.html?implementId='+v.id+'&examPaperId='+v.examPaperId+'&examDuration='+v.examDuration+'&readingMode='+v.readingMode+'&hasTest='+(v.examNumber+1)+'&status=0">'+v.implementName+'</a>';
						currRecord = '<span title="查看测评记录" class="icon_view "></span><a href="http://www.tuchina.org:7003/cbs_bi/rpcpuserscore/findStreamWriter?trainImplId='+v.id+'" target="_blank">查看测评记录</a>',
						currRecord_dis = '<span title="查看测评记录" class="icon_view gray"></span><b class="font_gray">查看测评记录</b>',
						currStarTest = '<span title="进入考试" class="icon_start">'+StarTestHref+'</span>',
						currStarTest_dis = '<span class="icon_start gray" title="">开始</span>';
						showMore = '<a href="began_testing.html?implementId='+v.id+'&examPaperId='+v.examPaperId+'&examDuration='+v.examDuration+'&readingMode='+v.readingMode+'&hasTest='+(v.examNumber+1)+'&status=1" title="'+v.implementName+'">&raquo;&nbsp;查看全部</a>';
						showMore_dis = '<a href="began_testing.html?implementId='+v.id+'&examPaperId='+v.examPaperId+'&examDuration='+v.examDuration+'&readingMode='+v.readingMode+'&hasTest='+(v.examNumber+1)+'&status=0" title="'+v.implementName+'">&raquo;&nbsp;查看全部</a>';
						function curr_disable(){
							currStarTest = currStarTest_dis;//不能“开始”答题
							currRecord = currRecord_dis;//不能查看测评记录
							currHref = currHref_dis;//不能答题的链接地址
							showMore = showMore_dis;//查看更多
						}
						//未开始或已过期
							if(beginTime > currTime){//未开始
								statusTxt='<b class="font_red">未开始</b>';
								curr_disable();
							}else if(currTime > endTime){//已过期
								if(v.examNumber <= '0'){
									statusTxt='<b class="font_gray">已过期</b>';
									curr_disable();
								}else{
									statusTxt='<b class="font_green">已完成</b>';
									currStarTest = currStarTest_dis;
									currHref = currHref_dis;
									showMore = showMore_dis;
								}
							}else{//进行中
								if(v.examNumber>'0'){//已答题
									if((v.answerNumber != "0" && v.examNumber >= v.answerNumber)){//已答题次数 >=限次答题次数
										currStarTest = currStarTest_dis;
										currHref = currHref_dis;
										showMore = showMore_dis;
									}
									statusTxt='<b class="font_green">已完成</b>';
								}else{//未答题
									statusTxt='<b class="font_red">未完成</b>';
									currRecord = currRecord_dis;
								}
						}


					html +=	'<div class="charttab_table">'+
							'<div class="charttab_table_b">'+
							'<div class="charttab_left">'+
							'<div class="chart_icon"><span class="b_test_type"></span></div>'+
							'<p>时长：<b>'+v.examDuration+'</b>分钟</p>'+
//							'<p>满分：<b>'+v.paperTotalScore+'</b></p>'+
							'</div>'+
							'<div class="charttab_right">'+
							'<ul>'+
							'<li class="chart_name">'+currHref+'</li>'+
							'<li class="chart_operation dis_none">'+
//							'<span class="operation_b"><span class="icon_question gray" title="填写调查问卷"></span><b class="font_gray">填写调查问卷</b></span>'+
							'<span class="operation_b">'+currRecord+'</span>'+
							'</li>'+
							'<li class="chart_status">'+statusTxt+'</li>'+
							'<li class="default_font">状态：</li>'+
							'<li class="chart_status"><b>'+v.highestScore+'/'+v.paperTotalScore+'</b></li>'+
							'<li class="default_font">得分/满分：</li>'+
							'</ul>'+
							'<p class="status">有效时间: '+ new Date(v.beginTime).format("yyyy-MM-dd hh:mm:ss")+','+new Date(v.endTime).format("yyyy-MM-dd hh:mm:ss")+'</b></p>'+
							'<p class="chart_cont">'+v.information+'<span>'+showMore+'</span></p>'+
							'<p class="operation">'+
							'<span class="operation_b">'+currStarTest+'</span>'+
							'<span class="operation_b">已测试/总次数：<b>'+v.examNumber+"/"+v.answerNumber+'</b></span>'+
							'</p>'+
							'</div>'+
							'</div>'+
							'</div>';
				}
				$('#charttab').html(html);
				$('#pagination').html(gPage(data.rCount,page,'getList',G_PAGESIZE));

			}else{
				$('#charttab').html('');
				$('#pagination').html('');
			}
		});


	}

var queryUrl='',params;
require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','ListView','WdatePicker','personal_sim'],function(){

	var statusArr = {
		'0':'未开始',
		'1':'未完成',
        '2':'已完成',
		'3':'已结束'
	};




	$("#form_query").click(function() {
		var tstatus=$('#status').attr('alt') || '';
		var _status='';
		params = Ambow.urlDecode(Ambow.serializeForm('add_form'));
		params.implementName = params.implementName=='输入在线考试名称'?'':params.implementName;
		queryUrl = '';
		queryUrl = G_URL.findexamimplementListbyparam;
		queryUrl = queryUrl+'?implementName='+params.implementName+'&tstatus='+tstatus+'&status='+_status+'&userAccountId='+G_USER['id'];
		queryUrl = encodeURI(queryUrl);
		getList(1);
	});
	$('.btn_other').live('click',function(){
		$('.bt_st').siblings().removeClass('nc');
		$(this).addClass('nc');
		var alt = $(this).attr('alt') || '1';
		var _status='';
		queryUrl = G_URL.findexamimplementListbyparam;
		queryUrl = queryUrl+'?implementName=&tstatus='+alt+'&status='+_status+'&userAccountId='+G_USER['id'];
		queryUrl = encodeURI(queryUrl);
		getList(1,alt);
	});
	$(".ft").click();
	
	  $(document).ready(function() {
			cbs.tablehover();//表单换行颜色 hover
			//$("#topsearch, #listsearch").autocomplete(courses); //AutoComplete
			$('.quit_confirm').nyroModal({
				 width: 400
			  });

			$(".progressBar").each(function(i,n){ $(n).progressBar(); });
			//申请延期
			$('.overlay_extension').nyroModal({
				 width: 400
			  });
			//记笔记
			$('.overlay_notes').nyroModal({
				 width: 700
			  });
			//退选
			$('.overlay_cancel').nyroModal({
				 width: 400
			  });
			//测试题
			$('.overlay_test_1').nyroModal({
				 width: 800
			  });
			//学习记录
			$('.overlay_testreport').nyroModal({
				width: 700
			  });

 });



});




