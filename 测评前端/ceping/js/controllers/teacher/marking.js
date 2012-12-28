require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','personal_sim','common','ListView','WdatePicker','jquery.progressbar.min'],function(){
$(function(){
	limit_t();
	cbsCompany[9]==1?'':($('#jsd').css('display','none'));
	cbsCompany[10]==1?'':($('#glyd').css('display','none'));
	
	$('.setting_ico').click(function(){
		window.location.href=G_ROOTURL+'/student/personal/editPerson.action';

	});
	//var currTime=new Date().valueOf();
	var list = Ambow.create('Ambow.view.ListView',{
	  		id:'list1',
	 		renderTo:'load_resoucesList',
	 		checkboxs:true,
	 		pager:new Ambow.view.ListPager({pageSize:G_PAGESIZE,totalCountMap:'rCount'}),
	 		store: Ambow.create('Ambow.store.ListStore',{
	 			id:'store11',
	 			url:G_URL.findexamimplementListbyteacher,
	 			root:'list',
	 			params:{
					implementName:'',
					tstatus:'',
					status:'',
					teacherId: G_USER['id'],
					readingStartTime:'',
					readingEndTime:'',
					callback:''
	 			}
	 		}),
	 		columns: [{
	            header: '考试名称',
	            dataIndex: 'examName',
	            render:function(dt,row){
	            	if(	row.sysdate<row.readingStartTime || row.sysdate>=row.readingEndTime){
	            		return '<span class="gray" style="text-decoration:none;">'+row.implementName+'</span>'
	            	}else{
	            		return '<a href="onlinechecking.html?id='+row.id+'&examPaperId='+row.examPaperId+'&implementName='+encodeURI(row.implementName)+'&readingStartTime='+row.readingStartTime+'&readingEndTime='+row.readingEndTime+'"  target=_blank title="在线阅卷">'+row.implementName+'</a>';
	            	}
	            }
	        },{
	            header: '阅卷开始时间',
	            dataIndex: 'rStarttime',
	            render:function(dt,row){
	            	var st = new Date(row.readingStartTime);
	            	return st.format('yyyy-MM-dd hh:mm:ss');
	            }
	        },{
	            header: '阅卷截止时间',
	            dataIndex: 'rEndtime',
	            render:function(dt,row){
	            	var et = new Date(row.readingEndTime);
	            	return et.format('yyyy-MM-dd hh:mm:ss');
	            }
	        },
//	            {
//	            header: '完成状态',
//	            dataIndex: '_wc',
//	            render:function(dt,row){
//					var str='',currTime = row.sysdate,beginTime = row.readingStartTime,endTime = row.readingEndTime;
//					if(currTime<beginTime){
//						str='未开始';
//					}else if(currTime>=beginTime && currTime<=endTime){
//						if(row.totalNumber==row.readingNumber) str='已完成';
//						else str='进行中';
//					}else if(currTime>endTime){
//						if(row.totalNumber==0) str='已过期';
//						else str='未完成';
//					}
//	            	return str;
//	            }
//	        }
	        {
	            header: '已评阅数量/应评阅数量',
	            dataIndex: 'finish',
	            render:function(dt,row){
	            	return row.totalNumber+'/'+row.readingNumber;
	            }
	        },{
	        	header:'阅卷完成状态',
	        	dataIndex:'status',
				render:function(dt,row){
					if(row.sysdate<row.readingStartTime){
						return '未开始';		
					}else if(row.totalNumber != row.readingNumber && row.readingEndTime<row.sysdate){
						return '已过期';	
					}else if(row.totalNumber < row.readingNumber && (row.sysdate>row.readingStartTime && row.readingEndTime>row.sysdate)){
						return '进行中';
					}else if(row.totalNumber == row.readingNumber){
						return '已完成';		
					}
				}
	        },{
	            header: '操作',
				width:62,
	            dataIndex: 'a',
	            render:function(dt,row){
	            	if(row.sysdate<row.readingStartTime){
	            		return '<span title="在线阅卷" class="icon_ent gray">在线阅卷</span><span title="查看阅卷记录" class="icon_view gray">查看阅卷记录</span>';		
					}else if(row.totalNumber != row.readingNumber && row.readingEndTime<row.sysdate){
						return '<span title="在线阅卷" class="icon_ent gray">在线阅卷</span>'+(row.totalNumber>0?'<a href="onlinecheckingPreview.html?id='+row.id+'&examPaperId='+row.examPaperId+'&implementName='+encodeURI(row.implementName)+'&readingStartTime='+row.readingStartTime+'&readingEndTime='+row.readingEndTime+'" target=_blank class="icon_view " title="查看阅卷记录">查看阅卷记录</a>':'<a href="javascript:" class="icon_ent gray" title="查看阅卷记录">查看阅卷记录</a>');
					}else if(row.totalNumber < row.readingNumber && (row.sysdate>row.readingStartTime && row.readingEndTime>row.sysdate)){
						return '<a href="onlinechecking.html?id='+row.id+'&examPaperId='+row.examPaperId+'&implementName='+encodeURI(row.implementName)+'&readingStartTime='+row.readingStartTime+'&readingEndTime='+row.readingEndTime+'" target=_blank class="icon_ent" title="在线阅卷">在线阅卷</a><a href="onlinecheckingPreview.html?id='+row.id+'&examPaperId='+row.examPaperId+'&implementName='+encodeURI(row.implementName)+'&readingStartTime='+row.readingStartTime+'&readingEndTime='+row.readingEndTime+'" target=_blank class="icon_view " title="查看阅卷记录">查看阅卷记录</a>';
					}else if(row.totalNumber == row.readingNumber){
						return (row.readingEndTime<row.sysdate?'<a href="javascript:" class="icon_ent gray" title="在线阅卷">在线阅卷</a>':'<a href="onlinechecking.html?id='+row.id+'&examPaperId='+row.examPaperId+'&implementName='+encodeURI(row.implementName)+'&readingStartTime='+row.readingStartTime+'&readingEndTime='+row.readingEndTime+'" target=_blank class="icon_ent" title="在线阅卷">在线阅卷</a>')+'<a href="onlinecheckingPreview.html?id='+row.id+'&examPaperId='+row.examPaperId+'&implementName='+encodeURI(row.implementName)+'&readingStartTime='+row.readingStartTime+'&readingEndTime='+row.readingEndTime+'" target=_blank class="icon_view " title="查看阅卷记录">查看阅卷记录</a>';	
					}
	            }
	        }]
	  	});
	  	list.render();
	  	var store = list.store;
	 	store.load();


	 $('#listsearch').live('click',function(){
	 	store.refresh({
			params:{
				implementName:$('#implementName').val()||'',
				tstatus		:	$('#status').attr('alt')||'',
				status		:  '',
				teacherId	:	G_USER['id'],				//需要从session中取值
				readingStartTime:'',
				readingEndTime:'',
				callback:''
			}
		});
	 });

	cbs.tablehover();//表单换行颜色 hover
//	$(".progressBar").each(function(i,n){ $(n).progressBar(); });
//	//申请延期
//	$('.overlay_extension').nyroModal({
//		width: 400
//	});
//	//记笔记
//	$('.overlay_notes').nyroModal({
//		width: 700
//	});
//	//退选
//	$('.overlay_cancel').nyroModal({
//		width: 400
//	});
//	//测试题
//	$('.overlay_test_1').nyroModal({
//		width: 800
//	});
//	//学习记录
//	$('.overlay_studyreport').nyroModal({
//		width: 500
//	});
//	$('.quit_confirm').nyroModal({
//		width: 400
//	});


});
});