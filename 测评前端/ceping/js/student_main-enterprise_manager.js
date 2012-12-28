/**
 * @author gp
 * @datetime 2012-8-7
 * @description main-enterprise_manager.js
 */

 /**
 * @author gp
 * @datetime 2012-8-2
 * @description main.js
 */

 requirejs.config({
 	shim:{
 		'ambow':{
 			deps:['jquery']
 		},
 		'userjs':{
 			deps:['jquery','nyroModal','jstree']
 		},
 		'nyroModal':{
 			deps:['jquery']
 		},
 		'jstree':{
 			deps:['jquery','nyroModal']
 		},
 		'jcookie':{
 			deps:['jquery']
 		},
 		'emHeader':{
 			deps:['jquery']
 		},
 		'common':{
 			deps:['jquery']
 		},
 		'global':{
 			deps:['jquery','common']
 		},
 		'url':{
 			deps:['jquery','ambow','global','common']
 		},
 		'ListView':{
 			deps:['jquery','ambow','global','common']
 		},
		'WdatePicker':{
			deps:['jquery']
		},
		'ckeditor':{
			deps:['jquery']
		},
		'insertsome':{
			deps:['jquery']
		},
		'dxwindow':{
			deps:['dxcommon']
		},
		'dxtree':{
			deps:['dxcommon']
		},
		'knowledgeBox':{
			deps:['dxwindow','dxtree','ListView']
		},
		'knowledgeTree':{
			deps:['dxtree','jquery','ambow']
		},
		'personal_sim':{
			deps:['jquery','nyroModal']
		},
		'jquery.progressbar.min':{
			deps:['jquery']
		},
		'searchdata':{
			deps:['jquery']
		},
		'progressbar':{
			deps:['jquery']
		},
		'sticky':{
			deps:['jquery']
		},
		'drag-drop-custom':{
			deps:['jquery']
		}
 	},

 	paths:{
 		'jquery'								:'../js/libs/jquery-1.4.3.min',
 		'ambow'									:'../js/libs/ambow',
 		'teacherApp'							:'../js/teacherApp',
 		'userjs'								:'../js/libs/cbs_userjs',
 		'nyroModal'								:'../js/libs/nyroModal1.6.2.min',
 		'jstree'								:'../js/libs/jquery.jstree',
 		'jcookie'								:'../js/libs/jquery.cookie',
 		'common'								:'../js/common',
 		'global'								:'../js/global',
 		'url'									:'../js/url',
 		'ListView'								:'../js/libs/component/list',
		'WdatePicker'							:'../js/libs/WdatePicker',
		'insertsome'    						:'../js/libs/insertsome',
		'ckeditor'								:'../ckeditor/ckeditor',
		'dxcommon'								:'../js/libs/dxtree/dhtmlxcommon',
		'dxtree'								:'../js/libs/dxtree/dxtree',
		'dxwindow'								:'../js/libs/dxwindow/dxwindow',
		'knowledgeBox'							:'../js/controllers/compontent/knowledgeBox',
		'knowledgeTree'							:'../js/controllers/compontent/knowledgeTree',
		'jquery.progressbar.min' 				:'../js/libs/jquery.progressbar.min',
		'personal_sim'  						:'../js/libs/personal_sim',
		'searchdata'							:'../js/libs/searchdata',
 		'emHeader'								:'../js/controllers/Library/header_enterprise',
 		'resources'								:'../js/controllers/enterprise_manager/resources',
		'progressbar'							:'../js/controllers/teacher/',
		'sticky'								:'../js/libs/sticky',
		'drag-drop-custom'						:'../js/libs/drag-drop-custom',
		'mylearning_onlinetest'  				:'../js/controllers/personal/mylearning_onlinetest', //在线测试列表
		'mylearning_chart_onlinetest'  			:'../js/controllers/personal/mylearning_chart_onlinetest', //在线测试图形
		'mylearning_offlinetest'  				:'../js/controllers/personal/mylearning_offlinetest',//线下测试列表
		'mylearning_syn'  						:'../js/controllers/personal/mylearning_syn',//在线同步课程列表
		'mylearning_ftof'  						:'../js/controllers/personal/mylearning_ftof',//面授课程列表
		'details_test'							:'../js/controllers/personal/details_test',//试卷详情
		'testing_page'							:'../js/controllers/personal/testing_page',//在线考试
		'began_testing'							:'../js/controllers/personal/began_testing'//准备考试
		
 	}
 });

 require(['teacherApp','emHeader','common','global','url'],function(teacherApp){
 	teacherApp.launch();
 });






