$('.trdel').live('click',function(){
	$(this).parent().parent().remove();
});

require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','ListView','WdatePicker'],function(){

$(function(){

	var statusArr = {
		'0':'未开始',
		'1':'未完成',
        '2':'已完成',
		'3':'已过期'
	}
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
	            		return '<span class="gray" style="text-decoration: none;">'+row.implementName+'</span>';
	            	}else{
	            		return '<a href="../teacher/onlinechecking.html?id='+row.id+'&examPaperId='+row.examPaperId+'&implementName='+encodeURI(row.implementName)+'&readingStartTime='+row.readingStartTime+'&readingEndTime='+row.readingEndTime+'"  target=_blank title="在线阅卷">'+row.implementName+'</a>';
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
//	        	{
//	            header: '完成状态',
//	            dataIndex: 'status',
//	            render:function(dt,row){
//	            	return statusArr[dt];
//	            }
//	        },
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
						return '<span title="在线阅卷" class="icon_ent gray">在线阅卷</span>'+(row.totalNumber>0?'<a href="../teacher/onlinecheckingPreview.html?id='+row.id+'&examPaperId='+row.examPaperId+'&implementName='+encodeURI(row.implementName)+'&readingStartTime='+row.readingStartTime+'&readingEndTime='+row.readingEndTime+'" target=_blank class="icon_view " title="查看阅卷记录">查看阅卷记录</a>':'<a href="javascript:" class="icon_ent gray" title="查看阅卷记录">查看阅卷记录</a>');
					}else if(row.totalNumber < row.readingNumber && (row.sysdate>row.readingStartTime && row.readingEndTime>row.sysdate)){
						return '<a href="../teacher/onlinechecking.html?id='+row.id+'&examPaperId='+row.examPaperId+'&implementName='+encodeURI(row.implementName)+'&readingStartTime='+row.readingStartTime+'&readingEndTime='+row.readingEndTime+'" target=_blank class="icon_ent" title="在线阅卷">在线阅卷</a><a href="../teacher/onlinecheckingPreview.html?id='+row.id+'&examPaperId='+row.examPaperId+'&implementName='+encodeURI(row.implementName)+'&readingStartTime='+row.readingStartTime+'&readingEndTime='+row.readingEndTime+'" target=_blank class="icon_view " title="查看阅卷记录">查看阅卷记录</a>';
					}else if(row.totalNumber == row.readingNumber){
						return (row.readingEndTime<row.sysdate?'<a href="javascript:" class="icon_ent gray" title="在线阅卷">在线阅卷</a>':'<a href="../teacher/onlinechecking.html?id='+row.id+'&examPaperId='+row.examPaperId+'&implementName='+encodeURI(row.implementName)+'&readingStartTime='+row.readingStartTime+'&readingEndTime='+row.readingEndTime+'" target=_blank class="icon_ent" title="在线阅卷">在线阅卷</a>')+'<a href="../teacher/onlinecheckingPreview.html?id='+row.id+'&examPaperId='+row.examPaperId+'&implementName='+encodeURI(row.implementName)+'&readingStartTime='+row.readingStartTime+'&readingEndTime='+row.readingEndTime+'" target=_blank class="icon_view " title="查看阅卷记录">查看阅卷记录</a>';	
					}
	            }
	        }]
	  	});
	  	list.render();
	  	var store = list.store;
	 	store.load();
		list.on('afterrender',function(){
			cbs.tablehover();
		});

	$('#listsearch').live('click',function(){
	 	store.refresh({
			params:{
				implementName:	$('#implementName').val()||'',
				tstatus		:	$('#implementStatus').val() || '',
				teacherId	:	G_USER['id'],				//需要从session中取值
				readingStartTime:'',
				readingEndTime:'',
				callback:''
			}
		});
	 });


});

});


