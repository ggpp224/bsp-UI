/**
 * @author gp
 * @datetime 2012-4-27
 * @description ComboxOperate.js
 */

 var ComboxOperate = function(){
 	this.subjectObj = {};
 	this.schoolObj = {};
 	this.majorObj = {};
 	this.termObj = {};

 };
 ComboxOperate.prototype = {
 	// 学科
 	subject: function(opt){
 		var opt = opt||{};
 		var subId = opt.id||'form_subject';

		var subjectDom = document.getElementById(subId);
		var cmb = new Combox(subjectDom);

		if(!opt.all){
			cmb.clear().fillDefault(opt);
		}
		cmb.fill(G_data['subject']);

 	},

 	//专业
 	major: function(opt){
 		var opt = opt||{};
 		var majorId = opt.id||'form_major';
 		var majorDom = document.getElementById(majorId);
		var cmb = new Combox(majorDom);
		if(!opt.all){
			cmb.clear().fillDefault(opt);
		}
		cmb.fill(G_data['major']);
 	},

 	//学校
 	school: function(opt){
 		var opt = opt||{};
 		var sid = opt.id||'form_school';
 		var schoolDom = document.getElementById(sid);
		var cmb = new Combox(schoolDom);
		if(!opt.all){
			cmb.clear().fillDefault(opt);
		}
		cmb.fill(G_data['school']);
 	},

 	//次层
 	level: function(opt){
 		var opt = opt||{};
 		var lid = opt.id||'form_educationlevel';
 		var levelDom = document.getElementById(lid);
		var cmb = new Combox(levelDom);
		if(!opt.all){
			cmb.clear().fillDefault(opt);
		}
		cmb.fill(G_data['educationlevel']);
 	},


 	//层次和年级
 	levelAndGrade: function(opt){
 		var opt = opt||{};
		var level_id= opt.level_id || 'form_educationlevel',
			grade_id= opt.grade_id || 'form_grade';
 		var gradeDom = document.getElementById(grade_id);
 		var levelDom = document.getElementById(level_id);
 		function temp (val){
 			if(val=='null'){
					new Combox(gradeDom).clear().fillDefault(opt).fill(G_data['grade']);
					gradeDom.options[0].selected==true;
				return;
			}
			var majors = G_data['grade_level'][val];
			if(!majors)return;
			var majorObj = G_data['grade'],ma={};
			for(var i=0,len=majors.length;i<len;i++){
				ma[majors[i]] = majorObj[majors[i]];
			}
			if(!opt.all){
				new Combox(gradeDom).clear().fillDefault(opt).fill(ma);
			}else{
				new Combox(gradeDom).clear().fill(ma);
			}
 		}
 		// 层次

		if(!opt.all){
			new Combox(levelDom).clear().fillDefault(opt).fill(G_data['educationlevel']);
		}else{
			new Combox(levelDom).clear().fill(G_data['educationlevel']);
		}


		// 年级

		if(!opt.all){
			temp(levelDom.value);
			//new Combox(gradeDom).fillDefault().fill(G_data['grade']);
		}else{
			//new Combox(gradeDom).fill(G_data['grade']);
			temp(levelDom.value);
		}

		$(levelDom).change(function(e){
			var val = this.value;
			temp(val);


		});
 	},

 	//学校和专业
 	shoolAndMajor: function(opt){
 		var opt = opt||{};
		var school_id= opt.school_id || 'form_school',
			major_id= opt.major_id || 'form_major';

 		var schoolDom = document.getElementById(school_id);
		var majorDom = document.getElementById(major_id);
		if(!opt.all){
			// 学校
			new Combox(schoolDom).clear().fillDefault(opt).fill(G_data['school']);
			// 专业 ，先初始化学校再初始化专业
			new Combox(majorDom).clear().fillDefault(opt).fill(G_data['major']);
		}else{
			// 学校
			new Combox(schoolDom).clear().fill(G_data['school']);
			// 专业 ，先初始化学校再初始化专业
			new Combox(majorDom).clear().fill(G_data['major']);
		}

		$(schoolDom).change(function(e){
			var val = this.value;
			if(val=='null'){
				new Combox(majorDom).clear().fillDefault(opt).fill(G_data['major']);
				return;
			}
			var majors = G_data['school_major'][val];
			if(!majors)return;
			var majorObj = G_data['major'],ma={};
			for(var i=0,len=majors.length;i<len;i++){
				ma[majors[i]] = majorObj[majors[i]];
			}
			if(!opt.all){
				new Combox(majorDom).clear().fillDefault(opt).fill(ma);
			}else{
				new Combox(majorDom).clear().fill(ma);
			}
		});

		this.fillDefaultSchool();
 	},


 	//互选批次组
 	term: function(opt){
 		var opt = opt||{};
		var subjectDom = document.getElementById('form_term');
		var data = {};
		if(!opt.noThree){
			var type= AmBow_CK.getcookie('cst').split('/')[0]||AmBow_CK.getcookie('st').split('/')[0];
			data=G_data['termsetAll'][type];
		}else{
			//data=Ab.apply(G_data['termsetAll'][1],G_data['termsetAll'][2],G_data['termsetAll'][3]);
			data=G_data['termset'];
		}
		
		new Combox(subjectDom).clear().fill(data);
 	},

 	fillDefaultSchool:function(opt){
 		var opt = opt||{};
 		var schoolDom = document.getElementById('form_school');
		var majorDom = document.getElementById('form_major');
 		var sc = user['schoolCode'];
		schoolDom.value= sc;
		var mc = new Combox(majorDom);
		var am = G_data['major'];
		var md = {};
		var m = G_data['school_major'][sc];
		if(m){
			for(var i=0,len=m.length;i<len;i++){
				md[m[i]] = am[m[i]];
			}
			mc.clear().fillDefault(opt).fill(md);
		}

 	}

 };