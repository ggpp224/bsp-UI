/**
 * @author gp
 * @datetime 2012-8-8
 * @description 全局变量
 */

	G_SITE='cp';
/*
	同时需要更改的文件
	Library/header_personal.lbi
	Library/header_enterprise.shtml
*/


	G_DOMAIN=G_SITE+'.lms.ambow.net';
	G_ROOTURL='http://'+G_SITE+'.lms.ambow.net/';
	G_LOGIN='http://'+G_SITE+'.lms.ambow.net/login/toIndex.action';
	G_ROOT="/evaluation_webservice/";
	G_TUCA='http://www.tuchina.org:7003/';


var G_zsdianChkObj,G_zsdianChkArr=[];

G_PAGESIZE= 10;
//公司ID
G_COMPANYID=0;
//知识树根ID
G_PARENTID=12535;

var G_topicType = {
	'1' : ['单项选择题','exammanage_addQuestions'],
	'2'	: ['多项选择题','exammanage_addMultiple'],
	'3'	: ['判断题','exammanage_addJudgment'],
	'4'	: ['匹配题','exammanage_addMatch'],
	'5'	: ['排序题','exammanage_addSort'],
	'6'	: ['填空题','exammanage_addSpace'],
	'7'	: ['简答题','exammanage_addAsk'],
	'8'	: ['论述题','exammanage_addDiscuss']
};

var G_USER={
	id	: '',
	name: '',
	imagesPath:'',
	planImpl:0,
	jifen:0,
	teacher:'',
	manager:''
}
//var accessControl = [
//	'10262745',
//	'10263274',
//	'10263275',
//	'10263278',
//	'10263279',
//	'10263280',
//	'10263281',
//	'10263282',
//	'10263283',
//	'10263284',
//	'10262746',
//	'10263285',
//	'10263286',
//	'10263287',
//	'10263288',
//	'10263289',
//	'10263290',
//	'10262747',
//	'10263291',
//	'10263292',
//	'10263293',
//	'10263294',
//	'10262897',
//	'10262929',
//	'10262931',
//	'10262932',
//	'10262933',
//	'10262934',
//	'10262935',
//	'10262936',
//	'10262937',
//	'10262938',
//	'10262939',
//	'10262940',
//	'10262941',
//	'10262930'
//]

var cbsCompany	= AmBow_CK.getcookie('eval_userAccount');
if(cbsCompany){
	cbsCompany=throwNull(cbsCompany);
	cbsCompany	=	cbsCompany.split('#');

	/* alert('正在调cookie问题,稍等');
	alert('公司id'+cbsCompany[0]);
	alert('公司名称'+cbsCompany[1]);
	alert('公司域名'+cbsCompany[2]);
	alert('公司logo'+cbsCompany[3]);
	alert('用户id'+cbsCompany[4]);
	alert('用户名'+cbsCompany[5]);
	alert('头像'+cbsCompany[6]);
	alert('消息数'+cbsCompany[7]);
	alert('积分'+cbsCompany[8]);
	alert('讲师'+cbsCompany[9]);
	alert('企业管理员'+cbsCompany[10]); */

	G_COMPANYID=cbsCompany[0];	// 公司id

	G_COMPANYNAME=cbsCompany[1];// 公司名称
	G_ROOTURL='http://'+cbsCompany[2]+'/';

	G_USER.id=cbsCompany[4];
	G_USER.userName=cbsCompany[5];
	G_USER.imagesPath=cbsCompany[6];
	G_USER.planImpl=cbsCompany[7];	// 消息数
	G_USER.jifen=cbsCompany[8];	//积分
	G_USER.teacher=cbsCompany[9];	//讲师
	G_USER.manager=cbsCompany[10];	//企业管理员
	G_USER.limit=cbsCompany[11];
	var sl =  G_USER.limit;
	//用户权限
	sl = sl.substr(1,sl.length-2);
	G_LIMIT = sl.split(',');
	G_All = G_LIMIT.slice(0,G_LIMIT.length);
	
	
	
	// 公司logo
	$('#logo').html('<a href="'+G_ROOTURL+'"><img src="'+G_ROOTURL +(cbsCompany[3] || 'images/enterprise/company_logo.png') +'" /></a>');
	$('#user_name').html(G_USER.userName);
	// 用户头像
	var imagesPath=G_USER.imagesPath || 'images/user_default_top.gif';
	$('#user_avatar img').attr('src',G_ROOTURL+imagesPath);
	// 消息
	$('#user_message_num').text(G_USER.planImpl || 0 );
	$('#user_message').click(function(){window.location=G_ROOTURL+'login/toPlanImpl.action'});
	// 退出
	$('#user_logout').click(function(){window.location=G_ROOTURL+'login/loginOut.action?companyId='+G_COMPANYID});
	// select下拉菜单
	$('#user_select').html((cbsCompany[9]==1?'<option value="../teacher/marking.html">教师端</option>':'')+'<option value="'+G_ROOTURL+'student/personal/index.action">学员端</option>'+(cbsCompany[10]==1?'<option value="'+G_ROOTURL+'login/toIndex.action" selected>企业管理员</option>':''));
	$('#user_select_person').html((cbsCompany[9]==1?'<li><a href="../teacher/marking.html">教&nbsp;&nbsp;&nbsp;师&nbsp;&nbsp;&nbsp;端</a></li>':'')+'<li><a href="'+G_ROOTURL+'student/personal/index.action">学&nbsp;&nbsp;&nbsp;员&nbsp;&nbsp;&nbsp;端</a></li>'+(cbsCompany[10]==1?'<li><a href="'+G_ROOTURL+'login/toIndex.action">企业管理员</a></li>':''));

}else{

	alert('请先登陆');
	window.location=G_ROOTURL;

}

window.document.title =G_COMPANYNAME+' - '+ window.document.title;
$(function(){
	$('.to5_0').each(function(){$(this).attr('href',G_ROOTURL+$(this).attr('href'));});
	/* $('.help_ico').click(function(){window.location=G_ROOTURL+'help/personal_help.jsp';});
	$('.loginout_ico').click(function(){window.location=G_ROOTURL+'login/loginOut.action?companyId=59121';});
	$('.resources_nav').click(function(){window.location=G_ROOTURL+'resourceCenter/resCenterData.action';});// 课程中心
	$('.community_nav').click(function(){window.location=G_ROOTURL+'student/community/index.action';});// 交流社区
 */
	showOrHide(10262745,'10262745');   //题库管理
	showOrHide(10262746,'10262746');   //试卷管理
	showOrHide(10262747,'10262747');   //知识点管理
	showOrHide(10262897,'10262897');   //在线考试管理
	showOrHide(10262743,'10262743');   //课程管理
	showOrHide(10262744,'10262744');   //文档管理
	showOrHide(10262748,'10262748');   //培训场地管理
	showOrHide(10262749,'10262749');   //讲师管理
	showOrHide(10262896,'10262896');   //课件分配管理
	showOrHide(10262898,'10262898');   //线下考试管理
	showOrHide(10262899,'10262899');   //在线同步课堂管理
	showOrHide(10262900,'10262900');   //面授课程管理
	//showOrHide(10262675,'10262675');   //首页
	showOrHide(10262676,'10262676');   //用户管理
	showOrHide(10262677,'10262677');   //资源管理
	showOrHide(10262678,'10262678');   //需求管理
	showOrHide(10262679,'10262679');   //培训计划
	showOrHide(10262680,'10262680');   //培训实施
	showOrHide(10262681,'10262681');   //社区管理
	showOrHide(10262682,'10262682');   //统计报表
	showOrHide(10262683,'10262683');   //系统管理




	
})