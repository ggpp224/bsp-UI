$('.trdel').live('click',function(){
	$(this).parent().parent().remove();
});

require(['jquery','ambow','nyroModal','jcookie','jstree','userjs','ListView','WdatePicker'],function(){

$(function(){
	//设置全局变量实施id
	var implementId = '';
	var params = Ambow.urlDecode(Ambow.serializeForm('search_From'));
	var list = Ambow.create('Ambow.view.ListView',{
	  		id:'list1',
	 		renderTo:'load_resoucesList',
	 		pager:new Ambow.view.ListPager({pageSize:G_PAGESIZE,totalCountMap:'rCount'}),
	 		store: Ambow.create('Ambow.store.ListStore',{
	 			id:'store11',
	 			url: G_URL['findlistbyexamimplementdto'],
	 			root:'list',
	 			params:{
	 				implementName	:	params.implementName,
	 				status			:	params.status,
	 				tstatus			:   params.select2 || '',
					sitNumber		:	params.sitNumber,
					hasNumber		:	params.hasNumber,
	 				beginTime		:	params.beginTime,
	 				endTime			:	params.endTime,
	 				companyId		:	G_COMPANYID,
	 				callback		:	''

	 			}
	 		}),
	 		columns: [{
	            header: '考试名称',
	            dataIndex: 'ertyu',
				render: function(dt,row){
					if(row.sysdate<row.beginTime || (row.sysdate>=row.endTime && row.hasNumber == 0)){
						return '<a href="training-implementation_testpaperadd.shtml?id='+row.id+'" id="'+row.id+'">'+row.implementName+'</a>';
					}else{
						return '<span class="gray" style="text-decoration:none;">'+row.implementName+'</span>';
					}
				}
			},/* {
	            header: '关联计划',
	            dataIndex: 'saaa',
				width: 60,
				render:function(dt,row){
					return '<span class="js_status_txt">'+row.status+'</span>';
				}
	        }, */{
				header: '考试状态',
				dataIndex: 'ss',
				width: 50,
				render:function(dt,row){
					if(row.status==0){
						var statusTxt='<b class="font_green">进行中</b>',currTime=row.sysdate;
						if(row.sysdate<row.beginTime) statusTxt='<b class="font_red">未开始</b>';
						else if(row.sysdate>=row.endTime) statusTxt='<b class="font_gray">已结束</b>';
						return '<span class="online_ks_status">'+statusTxt+'</span>';
					}else{
						return '<span class="online_ks_status">已暂停</span>';
					}
				}
			},{
				header: '已考/应考',
	            dataIndex: '_sitNumber',
	            render:function(dt,row){
	            	return '<span class="hasNumber">'+row.hasNumber+'/'+row.sitNumber+'</span>';
	            }   	
	        }
//			,{
//	            header: '已考人数',
//	            dataIndex: '_hasNumber',
//	            render:function(dt,row){
//	            	return '<span class="hasNumber">'+row.hasNumber+'</span>';
//	            }
//	        }
			,{
	            header: '开始时间',
	            dataIndex: 'sTime',
	            width:60,
	            render:function(dt,row){
	            	var d=new Date(row.beginTime);
	            	return d.format("yyyy-MM-dd hh:mm:ss");
	            }
	        },{
	            header: '截止时间',
	            dataIndex: 'eTime',
	            width:60,
	            render:function(dt,row){
	            	var d=new Date(row.endTime);
	            	return d.format("yyyy-MM-dd hh:mm:ss");
	            }
	        },
//	        	{
//	        	header:'考试情况监控',
//	        	dataIndex:'finshStatus',
//	        	render:function(dt,row){
//	        		return '<span><a href="javascript:void(0)" class="js_fstatus" examImplemId='+row.id+'>考试情况监控</a></span>';
//	        	
//	        	}
//	        
//	        },
	        	{
	            header: '阅卷完成状态',
	            dataIndex: '_sta',
				render:function(dt,row){
					if(row.sysdate<row.readingStartTime || row.status == 1 || row.hasNumber == 0 ){
						return '--';		
					}else if(row.readingMode == '0'){
						return '无主观题';
					}else if(row.totalNumber != row.hasNumber && row.readingEndTime<row.sysdate && row.readingMode == '1'){
						return '已过期';	
					}else if(row.totalNumber < row.hasNumber && (row.sysdate>row.readingStartTime && row.readingEndTime>row.sysdate) && row.readingMode == '1'){
						return '进行中';
					}else if(row.totalNumber == row.hasNumber && row.readingMode == '1' && row.hasNumber > 0){
						return '已完成';		
					}else{
						return '--';
					}
				}
	        },
//	        	{
//	        	header: '查看考试报表',
//	            dataIndex: 'bb',
//				render:function(dt,row){
//					return '<a href="import_report.shtml?trainImplId='+row.id+'&implementName='+row.implementName+'"  target="_blank">查看</a>';				
//				}
//	        },
	        	{

	            header: '操作',
	            dataIndex: 'a',
				width:100,
	            render:function(dt,row){
	            	var html = '';
//	            	if(row.hasNumber == 0 || row.sysdate < row.beginTime){//如果考试人数等于0 或者未开始考试，则可编辑、删除
//	            		html+='<a href="training-implementation_testpaperadd.shtml?id='+row.id+'" class="tabico_edit"  title="编辑">编辑</a>'//<a href="#" class="tabico_del"  title="删除">删除</a>
//	            			+'<a title="删除" class="tabico_del js_del" href="javascript:;">删除</a>';
//					}else{//如果考试人数不等于0，则不能删除
//						if(row.sysdate< row.endTime && row.sysdate >= row.beginTime){//在进行中，则不能编辑，如果不是进行中则可编辑
//							if(row.status == 1){//已暂定
//								html+='<a href="training-implementation_testpaperadd.shtml?id='+row.id+'" class="tabico_edit"  title="编辑">编辑</a>'//<a href="#" class="tabico_del"  title="删除">删除</a>
//	            			}else{
//								html+='<a title="编辑" class="notedit" href="javascript:">编辑</a>';
//							}
//						}else{
//							html+= '<a href="training-implementation_testpaperadd.shtml?id='+row.id+'" class="tabico_edit"  title="编辑">编辑</a>'
//	            		}
//						html +='<a title="删除" class="not_del" href="javascript:">删除</a>';
//					}
	            	if(row.status==0){
	            		//未开始
						if(row.sysdate<row.beginTime && limit_page(10262938) && limit_page(10262939)){
							html+='<a href="training-implementation_testpaperadd.shtml?id='+row.id+'" class="tabico_edit"  title="编辑">编辑</a><a href="#" class="tabico_del"  title="删除">删除</a>'
						}
						//进行中
						if(row.sysdate>row.beginTime && row.sysdate<row.endTime ){
							html+='<a title="编辑" class="notedit" href="javascript:">编辑</a><a title="删除" class="not_del" href="javascript:;">删除</a>';
						}
						//已结束
						if(row.sysdate>row.endTime  && limit_page(10262938) && limit_page(10262939)){
							if(row.readingNumber==0){
								html+='<a href="training-implementation_testpaperadd.shtml?id='+row.id+'" class="tabico_edit"  title="编辑">编辑</a><a href="#" class="tabico_del js_del"  title="删除">删除</a>';
							}else{
								html+='<a title="编辑" class="notedit" href="javascript:">编辑</a><a title="删除" class="not_del" href="javascript:;">删除</a>';
							}	
						}
					}else if(row.status==1){
						if(row.readingNumber==0  && limit_page(10262938) && !limit_page(10262939)){
							html+='<a href="training-implementation_testpaperadd.shtml?id='+row.id+'" class="tabico_edit"  title="编辑">编辑</a><a title="删除" class="not_del" href="javascript:">删除</a>'
						}else{
							html+='<a title="编辑" class="notedit" href="javascript:">编辑</a><a title="删除" class="not_del" href="javascript:">删除</a>'
						}
					}

	            	html+='<input type="hidden" id="js_id" alt="'+row.id+'" />';
	            	html +=(row.hasNumber == row.readingNumber && row.readingNumber != 0 && limit_page(10262940)?'<a class="icon_view overlay_testreport" title="查看考试报表" target="_blank" href="http://www.tuchina.org:8880/cbs_bi/rpcptrainimplscore/reportall?trainImplId='+row.id+'">查看考试报表</a>':'')
					//html +=(row.hasNumber == row.readingNumber && row.readingNumber != 0 ?'<a class="icon_view overlay_testreport" title="查看考试报表" target="_blank" href="http://www.tuchina.org:7003/cbs_bi/rpcptrainimplscore/reportall?trainImplId='+row.id+'">查看考试报表</a>':'')
		            if(row.sysdate<row.endTime && limit_page(10262941)){
		            	html+='<span title="更多操作" class="more_action">'
						+'<i>更多操作</i>'
						+'<ul class="more_action_list" alt="'+row.id+'">'
						+'<li class="arrowli"></li>'
						+'<li><a class="js_status" alt="'+row.status+'" stime="'+row.beginTime+'" etime="'+row.endTime+'" href="javascript:">暂停/启用</a></li>'
						+'<li><a href="javascript:void(0)" class="js_fstatus" examImplemId='+row.id+'>考试监控</a></li>'
						+'<li><a href="import_report.shtml?trainImplId='+row.id+'&implementName='+row.implementName+'"  target="_blank">考试报表</a></li>'
						+'</ul>'
						+'</span>';
	            	}else if(limit_page(10262941)){
	            		html+='<span title="更多操作" class="more_action">'
						+'<i>更多操作</i>'
						+'<ul class="more_action_list" alt="'+row.id+'">'
						+'<li class="arrowli"></li>'
						+'<li><a href="javascript:void(0)" class="js_fstatus" examImplemId='+row.id+'>考试监控</a></li>'
						+'<li><a href="import_report.shtml?trainImplId='+row.id+'&implementName='+row.implementName+'"  target="_blank">考试报表</a></li>'
						+'</ul>'
						+'</span>';
	            	}

					return html;
	            }
	        }]
	  	});
	  	list.render();
	  	var store = list.store;
	 	store.load();
		list.on('afterrender',function(){
			cbs.tablehover();
		});

		
	//权限控制	
	
	showOrHide(10262931,'search'); //查询
	showOrHide(10262932,'js_reset'); //重置
	showOrHide(10262933,'js_publishExamManage'); //发布在线考试管理
	showOrHide(10262934,'js_all');  //全部查看
	showOrHide(10262935,'js_department'); //部门
	showOrHide(10262936,'js_station'); 	//岗位
	showOrHide(10262937,'js_group'); //分组
	showOrHide(10262929,'10262929'); //考试发布管理
	showOrHide(10262930,'10262930'); //在线阅卷
	
	
	$('#search').click(function(){
		var params = Ambow.urlDecode(Ambow.serializeForm('search_From'));
		store.refresh({
			params:{
				implementName	:	params.implementName,
				status			:	params.status,
				tstatus			:   params.select2 || '',
				beginTime		:	params.beginTime,
				endTime			:	params.endTime,
				callback		:	'',
				pageno : 1,
				pagesize :10
			}
		});
	});

	cbs.tablehover(); //多选按钮
	cbs.selbtnmenu();

	//不允许删除
	$('.not_del').die().live('click',function(){
		alert("当前状态不允许进行删除操作");
	});
	$('.notedit').die().live('click',function(){
		alert("当前状态不允许进行编辑操作,如需编辑请在“暂停/启用”中先将此次考试暂停");
	});
	//删除
	$('.js_del').live('click',function() {
		var me=$(this);
		//var id=$(this).siblings(".more_action").children("ul").attr('alt');
		var id = $('#js_id').attr('alt');
		//var id=$(this).parent().parent().attr('alt');
		if(confirm('确定删除吗?')){
			$.getJSON(G_URL['delexamimplement']+'?id='+id+'&companyId='+G_COMPANYID+'&creatorId='+G_USER['id']+'&callback=?',function(data){
				if(data.returnCode=='000000'){
					alert('删除成功');
					me.closest('tr').remove();
				}else alert(data.returnMsg);
			});
			return true;
		}
		return false;
	});
	$('.js_status').live('click',function() {
		var o=$(this);
		var id=$(this).parent().parent().attr('alt'),status=parseInt($(this).attr('alt')),toStatus=status==1?0:1;
		$.getJSON(G_URL['updateexamimplementstatus']+'?id='+id+'&status='+toStatus+'&companyId='+G_COMPANYID+'&creatorId='+G_USER['id']+'&callback=?',function(data){
			if(data.returnCode=='000000'){
				if(toStatus==1){
					o.parent().parentsUntil('tbody').find('.online_ks_status').html('<span class="online_ks_status">已暂停</span>');
					if( o.parent().parentsUntil('tbody').find(".hasNumber").text() == '0'){
						o.parent().parentsUntil('tbody').find('.notedit').removeClass().addClass('tabico_edit').attr('href','training-implementation_testpaperadd.shtml?id='+id);
					}
					
				}else{
					var stime=o.attr('stime'),etime=o.attr('etime');
					var statusTxt='<b class="font_green">进行中</b>',currTime=new Date().valueOf();
					if(currTime<stime) statusTxt='<b class="font_red">未开始</b>';
					else if(currTime>=etime) statusTxt='<b class="font_gray">已结束</b>';
					o.parent().parentsUntil('tbody').find('.online_ks_status').html('<span class="online_ks_status">'+statusTxt+'</span>');
					if(statusTxt.indexOf("进行中") > 0 ){
						o.parent().parentsUntil('tbody').find(".tabico_edit").removeClass().addClass('notedit').attr("href","");
					}else{
						o.parent().parentsUntil('tbody').find(".notedit").removeClass().addClass('.tabico_edit').attr("href",'training-implementation_testpaperadd.shtml?id='+id);
					}
				}
				o.attr('alt',toStatus);
			}else alert(data.returnMsg);
		});
		return false;
	});
	//考试情况监控
	$('.js_fstatus').live('click',function(e){
		e.preventDefault();
		examImplemId = $(this).attr('examImplemId');
		$.fn.nyroModalManual({
			width:600,
			height:550,
			title:'考试情况监控',
			url: 'exam_monitoring.shtml'
		});
		return false;
		
		
	});
	//上传试卷 & 导入成绩 & 导入考勤
	$('.updatepaper').nyroModal({
		width: 400
	});
	Date.prototype.format = function(format){
		var o = {
			"M+" : this.getMonth()+1, //month
			"d+" : this.getDate(), //day
			"h+" : this.getHours(), //hour
			"m+" : this.getMinutes(), //minute
			"s+" : this.getSeconds(), //second
			"q+" : Math.floor((this.getMonth()+3)/3), //quarter
			"S" : this.getMilliseconds() //millisecond
		} ;

		if(/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
		}

		for(var k in o) {
			if(new RegExp("("+ k +")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
			}
		}
		return format;
	};
	//触发状态改变
	$('#status').change(function(){
		var v = $(this).val();
		if(v=='3'){
			$('#selected2').css('display','block');
			$('.js_wcd_t').css('display','block');
		}else{
			$('#selected2').css('display','none');
			$('.js_wcd_t').css('display','none');
		}
		
	});
	
	//导出报表
	$('.exportImplementation').click(function(){
		window.location.href=G_URL.findlistbyexamimplementdtotoexcel+'?companyId='+G_COMPANYID+'&creatorId='+G_USER['id']+'&implementName=&status=&tstatus=&beginTime=&endTime=&callback=&pageno=1&pagesize=10';
		
	});

});

});


