/**
 *	url统一管理
*/

 G_URL = {};

 //url集中配置
 //@private 请使用G_URL,不要直接使用_urls, 如：G_URL.findlistbyexampaperdto
_urls = {
	'findtreebyparentid'			:'evaluation/companycategory/findtreebyparentid', //资源树
	'selectbycompanycategoryid'		:'evaluation/Knowledge/selectbycompanycategoryid', //知识点列表
	'addKnowledge'					:'evaluation/Knowledge/addKnowledge',		 //知识点新增
	'findknowledgebyid'				:'evaluation/Knowledge/findknowledgebyid', //知识点查看
	'updateKnowledge'				:'evaluation/Knowledge/updateKnowledge', //知识点编辑
	'updatestatusbyprimarykey'		:'evaluation/Knowledge/updatestatusbyprimarykey', //知识点删除
	'findlistbyexampaperdto'		:'evaluation/exampaper/findlistbycompanycode', //试卷列表
	'addexampaper'					:'evaluation/exampaper/addexampaper', //添加试卷
	'updateexampaper'				:'evaluation/exampaper/updateexampaper', //编辑试卷
	'delexampaperdbyidlist'			:'evaluation/exampaper/delexampaperdbyidlist', //批量删除试卷
 	'findlistbytopicdto'			:'evaluation/topic/findlistbycompanycode', //试题列表

 	'findtopicgrouplistbyid'		:'evaluation/topicgroup/findtopicgrouplistbyid', //试卷添加页试卷列表
	'findtopicbyidlist'				:'evaluation/topic/findtopicbyidlist', //获取手动试题信息
	'findtopiclistbyhand'			:'evaluation/topic/findtopiclistbyhand', //手动选题查询
	'findtopictypegroupbycateidlist':'evaluation/topic/findtopictypegroupbycateidlist', //随机选题获取知识点列表
	'findtopicbygroupidandtypeidrandom':'evaluation/topic/findtopicbygroupidandtypeidrandom', //系统自动选题开始
	'addtopicgroupdto'				:'evaluation/topicgroup/addtopicgroupdto', //保存题组
	'updatebytopicgroupdto'			:'evaluation/topicgroup/updatebytopicgroupdto', //编辑题组
 	'findlistbyexamimplementdto'	:'evaluation/examimplement/findlistbyexamimplementdto', //实施列表接口
	'findlistbycategorycode'		:'evaluation/topic/findlistbycategorycode',  //试题列表接口
	'updatetopiccategorybatch'		:'evaluation/topic/updatetopiccategorybatch', //题库列表页批量调整知识点
	'addtopic'                      :'evaluation/topic/addtopic',	//试题添加接口
	'findtopicbyid'					:'evaluation/topic/findtopicbyid',//试题查询添加编辑页面
	'updatetopic'					:'evaluation/topic/updatetopic',//试题编辑接口
	'deltopicbatch'					:'evaluation/topic/deltopicbatch',//试题批量删除接口,
	'deltopic'						:'evaluation/topic/deltopic',//试题单条删除
	'updatetopicstatus'				:'evaluation/topic/updatetopicstatus', //试题启用停用接口
	'findlistuseridbyimplementid'   :'evaluation/answerrecord/findlistuseridbyimplementid',//教师判卷显示学生编号列表
	'findlistanswerrecordbyimplementid':'evaluation/answerrecord/findlistanswerrecordbyimplementid', //教师判卷单题记录列表
	'findexamimplementListbyteacher':'evaluation/examimplement/findexamimplementListbyteacher', //实施列表（教师端列表）
	'addexamimplement'				:'evaluation/examimplement/addexamimplement',	//实施添加接口

	'findexamimplementListbyparam'	:'evaluation/examimplement/findexamimplementListbyparam',	//学员端接口

	'findexamimplementbytrainplanid':'evaluation/examimplement/findexamimplementbytrainplanid',	//实施--通过计划id查询
	'findlistbyterms'				:'evaluation/examimplement/findlistbyterms',		//实施按全部查看 部门查看
	'updateexamimplement'			:'evaluation/examimplement/updateexamimplement',	//实施更新接口
	'findtrainplanlist'				:'evaluation/trainplan/findtrainplanlist',			//实施--关联培训计划
	'findexampaperdbasebyid'		:'evaluation/exampaper/findexampaperdbasebyid',			//实施--通过试卷ID取试卷信息
	'findreadlist'					:'evaluation/useraccount/findreadlist',				//实施--阅卷老师
	'findquestionsurveylist'		:'evaluation/questionsurvey/findquestionsurveylist',//实施--调查反馈
	'findcompanydeptlist'			:'evaluation/companydept/findcompanydeptlist',		//实施--测试对象--设置--选择部门
	'findcompanypostlist'			:'evaluation/companypost/findcompanypostlist',		//实施--测试对象--设置--选择岗位
	'findcompanygrouplist'			:'evaluation/companygroup/findcompanygrouplist',	//实施--测试对象--设置--选择分组
	'finduseraccountlist'			:'evaluation/useraccount/finduseraccountlist',		//实施--测试对象--设置--学员
	'findlistbycompanycode'			:'evaluation/exampaper/findlistbycompanycode',		//实施--试卷选择
	'delexamimplement'				:'evaluation/examimplement/delexamimplement',		//实施列表--删除
	'updateexamimplementstatus'		:'evaluation/examimplement/updateexamimplementstatus',		//实施列表--状态
	'finduserlistbycondition'		:'evaluation/useraccount/finduserlistbycondition',	// 预览测试对象
	'findcountbycondition'			:'evaluation/useraccount/findcountbycondition',		// 测试对象个数


	'findstuexampaperindexbyid'		:'evaluation/exampaper/findstuexampaperindexbyid',
	'findexamimplement'				:'evaluation/examimplement/findexamimplement',	//实施查看接口
	'addanswerrecord'				:'evaluation/answerrecord/addanswerrecord',	    //试卷答题添加接口
	'updateanswerrecord'			:'evaluation/answerrecord/updateanswerrecord',//答题记录批改添加接口
	'updatestatusbyidlist'			:'evaluation/Knowledge/updatestatusbyidlist',//知识点批量删除
	'updateimplementuser'			:'evaluation/examimplement/updateimplementuser',	//总提交成绩
	'addexamuserlog'				:'evaluation/examuserlog/addexamuserlog',// 插入要考试的学生信息
	'findlistbyexamimplemid'		:'evaluation/examuserlog/findlistbyexamimplemid',//考试学生查询接口
	'findlistbycompanycodetoexcel'	:'evaluation/topic/findlistbycompanycodetoexcel',//试题导出
	'findlistbycompanycodetoexcelExam'	: 'evaluation/exampaper/findlistbycompanycodetoexcel', //试卷的导出
	'findlistbyexamimplementdtotoexcel'	: 'evaluation/examimplement/findlistbyexamimplementdtotoexcel', //实施导出
	'findlistbyexamimplemidtoexcel'	: 'evaluation/examuserlog/findlistbyexamimplemidtoexcel' //导出实施考试监控
}
 for(key in _urls){
 	G_URL[key] = G_ROOT+_urls[key];
 }