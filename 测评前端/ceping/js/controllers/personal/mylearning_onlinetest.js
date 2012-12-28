/**
 * @author xzy
 * @datetime 2012-8-13
 * @description mylearning_onlinetest.js
 */
	function openwin(url) {
		window.open(url,"考试页面", " fullscreen=1,toolbar=no, menubar=no, scrollbars=yes, resizable=no, location=no, status=no")
	}
require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','ListView','WdatePicker','personal_sim'],function(){
$(function(){


	$('#setting_ico').click(function(){
		window.location.href=G_ROOTURL+'/student/personal/editPerson.action';

	});

	$('#goBtn').click(function(e){
		var selectValue =document.getElementById('topsearch').value;
		window.location.href = G_ROOTURL+"resourceCenter/resCenterData.action?log=1&selectValue="+selectValue;

	});

	var statusArr = {
		'0':'未开始',
		'1':'未完成',
        '2':'已完成',
		'3':'已过期'
	};

	var tstatus ='';
	//在线测试搜索区
	$('#form_query').live('click',function(){
		var _name=$.trim($('#listsearch').val());
			_name=_name=='输入在线考试名称'?'':_name;
			store.refresh({
				params:{
					status:'',
					tstatus: $('#status').attr('alt') || '',
					implementName:  _name,
					categoryCode:'',
					callback:''
				}
			});

	});
	$('.btn_other').live('click',function(){
		$('.bt_st').siblings().removeClass('nc');
		$(this).addClass('nc');
	
		var alt = $(this).attr('alt');
		store.refresh({
				params:{
					status:'',
					tstatus: alt,
					implementName:  '',
					pageno:'1',
					callback:''
				}
			});
	});

	var list = Ambow.create('Ambow.view.ListView',{
	  		id:'list1',
	 		renderTo:'load_resoucesList',
	 		pager:new Ambow.view.ListPager({pageSize:20,totalCountMap:'rCount'}),
	 		store: Ambow.create('Ambow.store.ListStore',{
	 			id:'store11',
	 			//url:G_URL.findexamimplementListbyparam,
	 			url:G_URL['findexamimplementListbyparam'],
	 			root:'list',
	 			params:{
					implementName:'',
					status:	 $('#status').attr('alt') || '',
					tstatus: $('#status').attr('alt') || '1',
					userAccountId:	G_USER['id'],
					callback:''
	 			}
	 		}),
			//checkboxs:true,
	 		columns: [{
	            header: '',
	            width: .04,
	            dataIndex: 'b',
	            render:function(dt){
	            	return '';
					}
	            },{
					header: '名称',
					dataIndex: 'implementName',
					render: function(dt,row){
						if(row.beginTime < row.sysdate && row.sysdate<row.endTime ){
							if(row.answerNumber == '0' || row.examNumber < row.answerNumber){
								return '<a href="javascript:" onclick="openwin(\'began_testing.html?implementId='+row.id+'&examPaperId='+row.examPaperId+'&examDuration='+row.examDuration+'&readingMode='+row.readingMode+'&hasTest='+(row.examNumber+1)+'&displayMode='+row.displayMode+'&perTopicNumber='+row.perTopicNumber+'&isTopicRandom='+row.isTopicRandom+'&isAnswerRandom='+row.isAnswerRandom+'&status=1\')">'+dt+'</a>';
							}else{
								return '<a href="javascript:" onclick="openwin(\'began_testing.html?implementId='+row.id+'&examPaperId='+row.examPaperId+'&examDuration='+row.examDuration+'&readingMode='+row.readingMode+'&hasTest='+(row.examNumber+1)+'&displayMode='+row.displayMode+'&perTopicNumber='+row.perTopicNumber+'&isTopicRandom='+row.isTopicRandom+'&isAnswerRandom='+row.isAnswerRandom+'&status=0\')">'+dt+'</a>';
							}
						}else{
								return '<a href="javascript:" onclick="openwin(\'began_testing.html?implementId='+row.id+'&examPaperId='+row.examPaperId+'&examDuration='+row.examDuration+'&readingMode='+row.readingMode+'&hasTest='+(row.examNumber+1)+'&displayMode='+row.displayMode+'&perTopicNumber='+row.perTopicNumber+'&isTopicRandom='+row.isTopicRandom+'&isAnswerRandom='+row.isAnswerRandom+'&status=0\')">'+dt+'</a>';
						}

					}
	            },
				{
					header: '进入开始时间',
					dataIndex: 'bt',
					render:function(dt,row){
						var d=new Date(row.beginTime);
						return d.format("yyyy-MM-dd")+'<br/>'+d.format(" hh:mm:ss");
					}
				},{
					header: '进入截止时间',
					dataIndex: 'et',
					render:function(dt,row){
					var d=new Date(row.endTime);
					return d.format("yyyy-MM-dd")+'<br/>'+d.format(" hh:mm:ss");
					}

				},{
					header: '时长(分钟)',
					dataIndex: 'examDuration'
	            },{
					header: '状态',
					dataIndex: 'status',
					render: function(dt,row){
						var statusTxt='<span class="font_red">未完成</span>';//即进行中
						if(row.sysdate<row.beginTime) {//系统时间小于考试开始时间
							statusTxt='<span class="font_red">未开始</span>';
						}
						else if(row.sysdate>=row.endTime && row.examNumber=='0'){//系统时间大于考试结束时间且考试次数为0
							statusTxt='已过期';
						}
						else if(row.sysdate >=row.beginTime && row.examNumber>'0'){//开始考试后且答题次数大于0
							statusTxt='<span class="font_green">已完成</span>';
						};
						return statusTxt;
					}
	            },{
					header: '已测试/总次数',
					dataIndex: 'tt',
					render: function(dt,row){
						return row.examNumber+'/'+row.answerNumber;
					  }
	            },{
					header: '得分/满分',
					dataIndex: 'paperTotalScore',
					render:function(dt,row){
						if(row.scoreDisplayMode == 0){
							return row.highestScore+'/'+row.paperTotalScore;
						}else {
							if(row.scoreDisplayTime<row.sysdate){
								return row.highestScore+'/'+row.paperTotalScore;
							}else{
								return '--';
							}
						}
					}
				},
//				{
//					 header: '最高得分',
//					 dataIndex: 'highestScore'
//			    },
				{
					header: '操作',
					width:82,
					dataIndex: 'act',
					render:function(dt,row){
						var showTested = '<a target="_blank" class="icon_view overlay_testreport" title="查看考试报表" target="_blank" href="http://www.tuchina.org:7003/cbs_bi/rpcpuserscore/findStreamWriter?trainImplId='+row.id+'">查看考试报表</a>';
						showTested='';
						//var showTested_dis = '<span class="icon_view gray" title="查看考试报表">查看考试报表</span>';

						var starTest = '<a class="icon_start" title="进入考试" href="javascript:" onclick="openwin(\'began_testing.html?implementId='+row.id+'&examPaperId='+row.examPaperId+'&examDuration='+row.examDuration+'&readingMode='+row.readingMode+'&hasTest='+(row.examNumber+1)+'&displayMode='+row.displayMode+'&perTopicNumber='+row.perTopicNumber+'&isTopicRandom='+row.isTopicRandom+'&isAnswerRandom='+row.isAnswerRandom+'&status=1\')">进入考试</a>';

						showTested_dis=''

						var starTest_dis = '<span class="icon_start gray" style="text-decoration:none" title=""></span>';

						if(row.beginTime > row.sysdate || row.sysdate>row.endTime){//未开始或已过期
							if(row.examNumber <= '0'){
								return starTest_dis+showTested_dis;
							}else{
								return starTest_dis+showTested;
							}
						}else{//进行中
							if(row.examNumber>'0'){//已答题
								if((row.answerNumber != "0" && row.examNumber >= row.answerNumber)){//已答题次数 >=限次答题次数
									return starTest_dis+showTested;
								}else{
									return starTest+showTested;
								}
							}else{
								return starTest+showTested_dis;
							}
						}

					}
				}
			]
	  	});
	  	list.render();
	  	var store = list.store;
	 	store.load();
	/*$('#search').click(function(){
			var num = list.getCheckedRecords();
			for(var i=0,n=num.length;i<n;i++){
				alert(num[i].id);
			}
	});*/


	/*setTimeout(function(){
		cbs.tablehover(); //多选按钮
		cbs.selbtnmenu();
	},500)*/

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

});


