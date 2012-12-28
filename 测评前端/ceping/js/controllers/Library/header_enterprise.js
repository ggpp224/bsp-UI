/**
 * @author gp
 * @datetime 2012-8-8
 * @description header_enterprise.js
 */

      var url = document.URL;//取得当前页的URL
	  var thisNav = $(".sf-navbar li").not(".subnav li");

	//首页
    if(/index.shtml/.test(url.toLowerCase()) || /bulletin_board/.test(url.toLowerCase()))
    {
        $(thisNav).eq(0).addClass("current").siblings("li").removeClass("current");
    }

	//用户管理
	else if(/user.shtml/.test(url.toLowerCase()) || /user_add/.test(url.toLowerCase())||/user_info/.test(url.toLowerCase())||/user_import/.test(url.toLowerCase())||/user_edit/.test(url.toLowerCase())||/user_setting/.test(url.toLowerCase()))
	{
		$(thisNav).eq(1).addClass("current").siblings("li").removeClass("current");
	}

   	else if(/user_post/.test(url.toLowerCase()))
	{
		$(thisNav).eq(1).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(1).children().find('li').eq(1).addClass("current").siblings("li").removeClass("current");
	}

	else if(/user_groups/.test(url.toLowerCase()))
	{
		$(thisNav).eq(1).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(1).children().find('li').eq(2).addClass("current").siblings("li").removeClass("current");
	}



	//资源管理
	else if(/resources/.test(url.toLowerCase())||/sync_courses/.test(url.toLowerCase()))
	{
		$(thisNav).eq(2).addClass("current").siblings("li").removeClass("current");

	}
	else if(/knowledge/.test(url.toLowerCase())){
		$(thisNav).eq(2).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(2).children().find('li').eq(4).addClass("current").siblings("li").removeClass("current");
	}
	else if(/exammanage/.test(url.toLowerCase())){
		$(thisNav).eq(2).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(2).children().find('li').eq(2).addClass("current").siblings("li").removeClass("current");
	}
	else if(/examinationpaper/.test(url.toLowerCase())){
		$(thisNav).eq(2).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(2).children().find('li').eq(3).addClass("current").siblings("li").removeClass("current");
	}
	else if(/documents/.test(url.toLowerCase())){
		$(thisNav).eq(2).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(2).children().find('li').eq(4).addClass("current").siblings("li").removeClass("current");
	}
	else if(/lecturer/.test(url.toLowerCase())){
		$(thisNav).eq(2).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(2).children().find('li').eq(5).addClass("current").siblings("li").removeClass("current");
	}



	//需求管理
	else if(/requirement/.test(url.toLowerCase())||/survey/.test(url.toLowerCase())||/question_/.test(url.toLowerCase()))
	{
		$(thisNav).eq(3).addClass("current").siblings("li").removeClass("current");
		if(/question_feedback/.test(url.toLowerCase()))
	    {
		$(thisNav).eq(3).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(3).children().find('li').eq(1).addClass("current").siblings("li").removeClass("current");
	    }

	}


	//培训计划
	else if(/training_plan/.test(url.toLowerCase()) || /training_add/.test(url.toLowerCase())  || /training_edit/.test(url.toLowerCase())||/training_preview/.test(url.toLowerCase()))
	{
		$(thisNav).eq(4).addClass("current").siblings("li").removeClass("current");

	}



	//培训实施
	else if(/training-implementation.shtml/.test(url.toLowerCase()) || /training-implementation_add.shtml/.test(url.toLowerCase()) || /training_implementation_edit.shtml/.test(url.toLowerCase()) || /training-implementation_dep.shtml/.test(url.toLowerCase()) || /training-implementation_position.shtml/.test(url.toLowerCase()) || /training-implementation_groups.shtml/.test(url.toLowerCase()) || /training_implementation_preview2.shtml/.test(url.toLowerCase()) || /training_implementation_preview3.shtml/.test(url.toLowerCase()) )
	{
		$(thisNav).eq(5).addClass("current").siblings("li").removeClass("current");

	}
	else if(/training-implementation_online_ks/.test(url.toLowerCase()) || /training-implementation_testpaper/.test(url.toLowerCase()) ){
		$(thisNav).eq(5).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(5).children().find('li').eq(1).addClass("current").siblings("li").removeClass("current");
	}
	else if(/training-implementation_online_rd/.test(url.toLowerCase()) || /training-implementation_linetestpaper/.test(url.toLowerCase()) ){
		$(thisNav).eq(5).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(5).children().find('li').eq(1).addClass("current").siblings("li").removeClass("current");
	}
	else if(/training-implementation_offline_ks/.test(url.toLowerCase()) || /training-implementation_linetestpaper/.test(url.toLowerCase()) ){
		$(thisNav).eq(5).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(5).children().find('li').eq(2).addClass("current").siblings("li").removeClass("current");
	}
	else if(/training-implementation_tongbu/.test(url.toLowerCase()) || /training-implementation_syncourses/.test(url.toLowerCase())){
		$(thisNav).eq(5).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(5).children().find('li').eq(3).addClass("current").siblings("li").removeClass("current");
	}
	else if(/training-implementation_mianshou/.test(url.toLowerCase()) || /training-implementation_faceto/.test(url.toLowerCase())){
		$(thisNav).eq(5).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(5).children().find('li').eq(4).addClass("current").siblings("li").removeClass("current");
	}



	//交流社区
	else if(/community/.test(url.toLowerCase()) || /posts_new/.test(url.toLowerCase()) || /posts_re/.test(url.toLowerCase()) || /posts_details/.test(url.toLowerCase()))
	{
		$(thisNav).eq(6).addClass("current").siblings("li").removeClass("current");

	}

	//报表
	else if(/report_training/.test(url.toLowerCase()))
	{
		$(thisNav).eq(7).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(7).children().find('li').eq(0).addClass("current").siblings("li").removeClass("current");

	}
	else if(/report_resource/.test(url.toLowerCase()))
	{
		$(thisNav).eq(7).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(7).children().find('li').eq(1).addClass("current").siblings("li").removeClass("current");

	}
	else if(/report_course/.test(url.toLowerCase()))
	{
		$(thisNav).eq(7).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(7).children().find('li').eq(2).addClass("current").siblings("li").removeClass("current");

	}
	else if(/report_plan/.test(url.toLowerCase()))
	{
		$(thisNav).eq(7).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(7).children().find('li').eq(3).addClass("current").siblings("li").removeClass("current");

	}
	else if(/report_deploy/.test(url.toLowerCase()))
	{
		$(thisNav).eq(7).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(7).children().find('li').eq(4).addClass("current").siblings("li").removeClass("current");

	}
	else if(/report_learning/.test(url.toLowerCase()))
	{
		$(thisNav).eq(7).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(7).children().find('li').eq(5).addClass("current").siblings("li").removeClass("current");

	}

	//系通管理
	else if(/system.shtml/.test(url.toLowerCase()))
	{
		$(thisNav).eq(8).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(8).children().find('li').eq(0).addClass("current").siblings("li").removeClass("current");
	}
	else if(/integral/.test(url.toLowerCase()))
	{
		$(thisNav).eq(8).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(8).children().find('li').eq(1).addClass("current").siblings("li").removeClass("current");
	}
	else if(/rank_rules/.test(url.toLowerCase()))
	{
		$(thisNav).eq(8).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(8).children().find('li').eq(2).addClass("current").siblings("li").removeClass("current");
	}
	else if(/feedback.shtml/.test(url.toLowerCase())||/apply/.test(url.toLowerCase()) || /extension/.test(url.toLowerCase()) )
	{
		$(thisNav).eq(8).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(8).children().find('li').eq(3).addClass("current").siblings("li").removeClass("current");
	}
	else if(/news/.test(url.toLowerCase()))
	{
		$(thisNav).eq(8).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(8).children().find('li').eq(4).addClass("current").siblings("li").removeClass("current");
	}

	else if(/syslog.shtml/.test(url.toLowerCase()))
	{
		$(thisNav).eq(8).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(8).children().find('li').eq(5).addClass("current").siblings("li").removeClass("current");
	}

	else if(/logo.shtml/.test(url.toLowerCase()) || /logo_page/.test(url.toLowerCase()) )
	{
		$(thisNav).eq(8).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(8).children().find('li').eq(6).addClass("current").siblings("li").removeClass("current");
	}

	else if(/edm.shtml/.test(url.toLowerCase()))
	{
		$(thisNav).eq(8).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(8).children().find('li').eq(7).addClass("current").siblings("li").removeClass("current");
	}

	else if(/features_setting.shtml/.test(url.toLowerCase()))
	{
		$(thisNav).eq(8).addClass("current").siblings("li").removeClass("current");
		$(thisNav).eq(8).children().find('li').eq(8).addClass("current").siblings("li").removeClass("current");
	}
