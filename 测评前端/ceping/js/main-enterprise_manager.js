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
		'drag-drop-custom':{
			deps:['jquery']
		},
		'dxtree':{
			deps:['jquery']
		}


 	},

 	paths:{
 		'jquery'		:'../js/libs/jquery-1.4.3.min',
 		'ambow'			:'../js/libs/ambow',
 		'App'			:'../js/app',
 		'userjs'		:'../js/libs/cbs_userjs',
 		'nyroModal'		:'../js/libs/nyroModal1.6.2.min',
 		'jstree':		'../js/libs/jquery.jstree',
 		'jcookie'		:'../js/libs/jquery.cookie',
 		'common'		:'../js/common',
 		'global'		:'../js/global',
 		'url'			:'../js/url',
 		'ListView'		:'../js/libs/component/list',
		'WdatePicker'	:'../js/libs/WdatePicker',
		'insertsome'    :'../js/libs/insertsome',
		'ckeditor'		:'../ckeditor/ckeditor',
		'dxcommon'		:'../js/libs/dxtree/dhtmlxcommon',
		'dxtree'			:'../js/libs/dxtree/dxtree',
		'dxwindow'		:'../js/libs/dxwindow/dxwindow',
		'knowledgeBox'	:'../js/controllers/compontent/knowledgeBox',
		'knowledgeTree'	:'../js/controllers/compontent/knowledgeTree',
		'jquery.progressbar' : '../js/libs/jquery.progressbar.min',
		'personal_sim'  :'../js/libs/personal_sim',
		'searchdata'	:'../js/libs/searchdata',
		'drag-drop-custom'	:'../js/libs/drag-drop-custom',
		'dxtree'	:'../js/libs/dxtree/dxtree',
 		'emHeader'								:		'../js/controllers/Library/header_enterprise',
 		'resources'								:'../js/controllers/enterprise_manager/resources',
 		'exammanage_addMultiple' 				:'../js/controllers/enterprise_manager/exammanage_addMultiple',
 		'examinationpaper'						:'../js/controllers/enterprise_manager/examinationpaper',
 		'examinationpaper_list_add'				:'../js/controllers/enterprise_manager/examinationpaper_list_add', //新增试卷
 		'exammanage'							:'../js/controllers/enterprise_manager/exammanage',
		'training-implementation' 				:'../js/controllers/enterprise_manager/training-implementation',
		'exammanage_addQuestions'				:'../js/controllers/enterprise_manager/exammanage_addQuestions',
		'exammanage_addJudgment'				:'../js/controllers/enterprise_manager/exammanage_addJudgment',
		'exammanage_addMultiple_edit'			:'../js/controllers/enterprise_manager/exammanage_addMultiple_edit',
		'exammanage_addSort'					:'../js/controllers/enterprise_manager/exammanage_addSort',//排序题
		'exammanage_addMatch'					:'../js/controllers/enterprise_manager/exammanage_addMatch',//匹配题
		'exammanage_addSpace'					:'../js/controllers/enterprise_manager/exammanage_addSpace',
		'exammanage_addAsk'						:'../js/controllers/enterprise_manager/exammanage_addAsk', //新增问答
		'exammanage_addDiscuss' 				:'../js/controllers/enterprise_manager/exammanage_addDiscuss', //新增讨论题
		'examinationpaper_list_input_danxuan'   :'../js/controllers/enterprise_manager/examinationpaper_list_input_danxuan',//新增问答
		'training-implementation_tongbu' 		:'../js/controllers/enterprise_manager/training-implementation_tongbu',//在线同步课堂
		'examinationpaper_list_input_danxuan'   :'../js/controllers/enterprise_manager/examinationpaper_list_input_danxuan',//新增问答
		'training-implementation_online_ks'   	:'../js/controllers/enterprise_manager/training-implementation_online_ks',//实施在线考试列表
		'training-implementation_online_rd'  	:'../js/controllers/enterprise_manager/training-implementation_online_rd',//实施在线考试列
		'training-implementation_dep'  			:'../js/controllers/enterprise_manager/training-implementation_dep',	//按全部查看
		'exammanage_addQuestions_edit'		  	:'../js/controllers/enterprise_manager/exammanage_addQuestions_edit',  //单选添加
		'training-implementation_offline_ks'  	:'../js/controllers/enterprise_manager/training-implementation_offline_ks', //线下考试管理
		'training-implementation_mianshou'		:'../js/controllers/enterprise_manager/training-implementation_mianshou', //面授课程管理
		'exammanage_addMultiple_edit'			:'../js/controllers/enterprise_manager/exammanage_addMultiple_edit',	//多项选择题编辑
		'exammanage_addAsk_edit'				:'../js/controllers/enterprise_manager/exammanage_addAsk_edit',	//简答题编辑
		'exammanage_addDiscuss_edit'			:'../js/controllers/enterprise_manager/exammanage_addDiscuss_edit',	//讨论题编辑
		'training-implementation_mianshou' 	 	:'../js/controllers/enterprise_manager/training-implementation_mianshou', //面授课程管理
		'exammanage_addMatch_edit'  			:'../js/controllers/enterprise_manager/exammanage_addMatch_edit', //匹配编辑
		'knowledge'  							:'../js/controllers/enterprise_manager/knowledge',//知识点管理
		'knowledge_add'  						:'../js/controllers/enterprise_manager/knowledge_add',//新增知识点
		'exammanage_addSort_edit'  				:'../js/controllers/enterprise_manager/exammanage_addSort_edit', //排序编辑
		'training-implementation_testpaperadd'	:'../js/controllers/enterprise_manager/training-implementation_testpaperadd',//发布在线考试
		'training-implementation_testpaperedit' :'../js/controllers/enterprise_manager/training-implementation_testpaperedit',//编辑在线测试
		//'overlay_plan_choose'					:'../js/controllers/enterprise_manager/overlay_plan_choose',//选择关联计划
		'preview'								:'../js/controllers/enterprise_manager/preview',	//试题预览界面
		'exammanage_addSpace_edit'				:'../js/controllers/enterprise_manager/exammanage_addSpace_edit',//填空编辑
		'exammanage_addJudgment_edit'			:'../js/controllers/enterprise_manager/exammanage_addJudgment_edit',	//判断编辑页
		'examinationpaper_list_view'			:'../js/controllers/enterprise_manager/examinationpaper_list_view',
		'examcommon'							:'../js/controllers/enterprise_manager/exam_add_common',
		'exammanage_import'						:'../js/controllers/enterprise_manager/exammanage_import',
		'import_report'							:'../js/controllers/enterprise_manager/import_report'
 	}
 });

 require(['App','emHeader','common','global','url'],function(App){
 	App.launch();
 });






