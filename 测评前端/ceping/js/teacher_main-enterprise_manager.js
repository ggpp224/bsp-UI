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
		'jquery.progressbar.min' 				: '../js/libs/jquery.progressbar.min',
		'personal_sim'  						:'../js/libs/personal_sim',
		'searchdata'							:'../js/libs/searchdata',
 		'emHeader'								:		'../js/controllers/Library/header_enterprise',
 		'resources'								:'../js/controllers/enterprise_manager/resources',
		'marking'				  			    :'../js/controllers/teacher/marking',  //教师端列表
		'onlinechecking'						:'../js/controllers/teacher/onlinechecking', 	//教师端阅卷
		'onlinecheckingPreview'					:'../js/controllers/teacher/onlinecheckingPreview'
 	}
 });

 require(['teacherApp','emHeader','common','global','url'],function(teacherApp){
 	teacherApp.launch();
 });






