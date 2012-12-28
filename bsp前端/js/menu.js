var urls = {
	//互选课程总库
	index:0,

	//互选计划管理
	index_1_add:1,
	index_1:1,
	index_2:1,
	index_2_3:1,
	index_3:1,
	index_3_2:1,

	//选课管理
	index_2_4:2,
	course_5:2,
	course_2:2,
	course_2_result:2,
	course_4:2,
	course_5_2:2,
	course_6:2,
	course_6:2,

	//学习档案
	learnfile:3,
	learnfile_2:3,

	//学分银行
	creditbank:4,
	creditbank_2:4,

	//费用结算
	costs_2:5,
	costs:5,

	//统计分析
	report:6,

	//系统维护
	setup_1:7,
	setup_2:7,
	setup_3:7,
	setup_4:7,
	setup_5:7,
	setup_6:7
};
var menu = {
	expand:function(){
		var url = location.href,
			n = url.substring(url.lastIndexOf('/')+1),
			s =n.indexOf('?');
			if(s!=-1){
				n = n.substring(0,s);
			}
		   var  htm = n,
			n = n.substring(0,n.indexOf('.'));
		if(n){
			var idx = urls[n];
			var lis = $('#navMenu').find('a[href*="'+htm+'"]');
			var li = $(lis[0]);
			if(li){
				if(n=='index'){
					var m = getQuery('m');
					$(lis[m]).css({'background-color':'#ccc','color':'#000'});
				}else{
					li.css({'background-color':'#ccc','color':'#000'});
				}
			}
			ddaccordion.expandone('expandable',idx,false);
		}
	}
};
(function(){
	var a = arguments,buf=[],me=this;
	for(var i=0,len=a.length;i<len;i++){
		var v = a[i];
		buf.push(v);
	}
	var md = document.getElementById('navMenu');
	if(md){
		md.innerHTML = buf.join('');
	}
	var uid =user['uRole'];
	if(uid==1){//管理员
		$(md).find('.no_admin').remove();
	}else if(uid==2){//教师
		$(md).find('.no_tercher').remove();
	}else if(uid==4){}else{
		var mm = $(md);
		mm.find('li[rel!="no_admin"]').remove();
		mm.find('h3[rel!="has_stu"]').remove();
		mm.find('ul[rel!="has_stu"]').remove();

	}
	var majorList=function(rs){
		var dt = rs.list;
		dt.push({code:'other',name:'其它'});
		var htm = '';
		for(var i=0,len=dt.length;i<len;i++){
			var v = dt[i];
			var idx = i;
			htm+='<li><a href="index.html?m='+idx+'&mc='+v.code+'">'+v.name+'</a></li>';
		}
		$('#ul_cl').html(htm);
	};
	$.getJSON(G_ROOT+'major/query/null/null/null/1/1/10000',function(rs){
		majorList(rs);
		menu.expand();
	});


})(
		'<h3 class="menuheader expandable">互选课程总库</h3>',
		'<ul id="ul_cl" class="categoryitems">',
			'<li><a href="index.html">课程列表</a></li>',
		'</ul>',

		'<h3 class="menuheader expandable">互选计划管理</h3>',
		'<ul class="categoryitems">',
			'<li class="no_tercher"><a href="index_1.html"><em>01</em>互选批次组管理</a></li>',
			'<li><a href="index_2.html"><em>02</em>开课计划</a></li>',
			'<li><a href="index_2_3.html"><em>03</em>选课计划</a></li>',
			'<li class="no_tercher"><a href="index_3.html"><em>04</em>开课计划审核</a></li>',
			'<li class="no_tercher"><a href="index_3_2.html"><em>04</em>选课计划审核</a></li>',
		'</ul>',

		'<h3 rel="has_stu" class="menuheader expandable">选课管理</h3>',
		'<ul rel="has_stu" class="categoryitems">',
			'<li class="no_tercher"><a href="index_2_4.html"><em>01</em>选课方式设置</a></li>',
			'<li class="no_tercher"><a href="course_5.html"><em>02</em>选课控制面板</a></li>',
			'<li><a class="no_tercher" href="course_2.html"><em>03</em>批量选课</a></li>',
			'<li><a class="no_admin" href="course_2_result.html"><em>04</em>批量选课结果</a></li>',
			'<li class="no_tercher"><a href="course_4.html"><em>05</em>志愿选课处理</a></li>',
			'<li class="no_tercher"><a href="course_5_2.html"><em>06</em>选课情况监控</a></li>',
			'<li class="no_tercher"><a href="course_plsh.html"><em>07</em>选课结果审核</a></li>',
			'<li class="no_tercher no_admin" rel="no_admin"><a href="course.html"><em>08</em>学生选课</a></li>',
		'</ul>',

		'<h3 rel="has_stu" class="menuheader expandable">学习档案</h3>',
		'<ul rel="has_stu" class="categoryitems">',
			'<li class="no_tercher no_admin" rel="no_admin"><a href="learnfile.html"><em>01</em>学生查询</a></li>',
			'<li><a href="learnfile_2.html"><em>01</em>管理员查询</a></li>',
		'</ul>',

		'<h3 rel="has_stu" class="menuheader expandable">学分银行</h3>',
		'<ul rel="has_stu" class="categoryitems">',
			'<li class="no_tercher no_admin" rel="no_admin"><a href="creditbank.html"><em>01</em>学生查询</a></li>',
			'<li><a href="creditbank_2.html"><em>02</em>管理员查询</a></li>',
		'</ul>',


		/* '<h3 class="menuheader expandable">费用结算</h3>',
		'<ul class="categoryitems">',
			'<li><a href="costs.html"><em>01</em>学生查询</a></li>',
			'<li><a href="costs_2.html"><em>01</em>管理员查询</a></li>',
		'</ul>',

		'<h3 class="menuheader expandable">统计分析</h3>',
		'<ul class="categoryitems">',
			'<li><a href="report.jsp?query=course"><em>01</em>课程统计</a></li>',
			'<li><a href="report.jsp?query=planCourse"><em>01</em>选课计划统计</a></li>',
			'<li><a href="report.jsp?query=chooseCourse"><em>01</em>开课计划统计</a></li>',
		'</ul>',*/

		'<h3 id="test" class="menuheader expandable">系统维护</h3>',
		'<ul id="testul" class="categoryitems">',
		'<li><a href="setup_1.html"><em>01</em>学校信息管理</a></li>',
		'<li><a href="setup_2.html"><em>02</em>专业信息管理</a></li>',
		'<li><a href="setup_3.html"><em>03</em>层次信息管理</a></li>',
		'<li><a href="setup_4.html"><em>04</em>年级信息管理</a></li>',
		'<li><a href="setup_5.html"><em>05</em>学科信息管理</a></li>',
		'<li><a href="setup_6.html"><em>06</em>批次信息管理</a></li>',
		'</ul>'
);
