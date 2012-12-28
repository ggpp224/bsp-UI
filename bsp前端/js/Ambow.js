var G_ROOT='/';
var G_perpage=10;
var G_perpage_pop=5;//弹出层

/* ********************** 公共函数 *********************** */
// 全选
function checkAll(me,chk){
	var flg=me.checked==true?true:false;
	$.each($('.'+chk),function(k,v){
		if(v.disabled==false){
			if(flg==false) v.checked=false;
			else v.checked=true;
		}
	});
	$('.'+chk).click(function(){if(this.checked==false) me.checked=false;});
}
// 获取当前页面url参数
function getQuery(name){
	var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
	var r=window.location.search.substr(1).match(reg);
	return r!=null?r[2]:"";
}
// Cookie操作
var AmBow_CK = {
	getcookie : function (O){var o="",l=O+"=";if(document.cookie.length>0){var i=document.cookie.indexOf(l);if(i!=-1){i+=l.length;var I=document.cookie.indexOf(";",i);if(I==-1)I=document.cookie.length;o=unescape(document.cookie.substring(i,I))}};return o},
	// 植入cookie n->cookieq名,v->cookie值,t->时间(毫秒),p->路径,c->域名
	setcookie : function (n,v,t,p,c){var T="";if(t){T=new Date((new Date).getTime()+t);T="; expires="+T.toGMTString()};document.cookie=n+"="+escape(v)+T+(p?';path='+p:'/')+(c?';domain='+c:'')},
	// 删除cookie
	delcookie : function (a){document.cookie=a+"=; "+"domain="+G_domain+"; path="+G_domain+"; "}
};
var Base64 = {
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = Base64._utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
		}
		return output;
	},
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}
		output = Base64._utf8_decode(output);
		return output;
	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {

		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	},
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
};

// 5p2O5bCP5LicOm51bGw6fMTAwMDE6MTMzNzkzOTI4MTQ2Mw==
var user={'userName':'','userRole':'','schoolCode':'','loginTime':''};
var userCookie=AmBow_CK.getcookie('bspUserId');
if(userCookie){
	userCookie=Base64.decode(userCookie).split(':');
	//if(userCookie.length==5){
		user['uid']=userCookie[0];
		user['uname']=userCookie[1];
		user['uRole']=userCookie[2];
		user['schoolCode']=userCookie[3];
		user['studentType']=userCookie[4];
		user['loginTime']=userCookie[5];
	//}
	if(user.userRole=='admin'){
		user['schoolCode']='null';
	}
}

$(function(){
	var st = AmBow_CK.getcookie('st').split('/')[0];
	var head = $('.page_head');
	switch(st){
		case "1":
			head.addClass('head_2');
		break;
		case "2":
			head.addClass('head');
		break;
		case "3":
			head.addClass('head_3');
		break;
		default:
			head.addClass('head_0');
	}
});
G_studentType=2;
//user['uRole']=4;

/* var G_testData=[];
G_testData['stuId']='studt12000006';
G_testData['stuName']='';
G_testData['schoolCode']='S0005';
G_testData['schoolName']='上海师范大学'; */

var G_FormArr={};
G_FormArr['school']='dic/school/list/1/';					//	学校
G_FormArr['major']='dic/major/list';						//	专业
G_FormArr['educationlevel']='dic/educationlevel/list/1';	//	层次
G_FormArr['subject']='dic/subject/list/1';					//	学科
G_FormArr['grade']='dic/grade/list';						//	年级
G_FormArr['termset']='dic/termset/list/1';					//	选课批次
G_FormArr['schoolparamenter']='dic/schoolparamenter/list/1';//	学校参数
G_FormArr['planopencourse'] = 'course/planopencourse/list'; //开课计划列表
G_FormArr['choosecoursebatch'] = 'choosecoursebatch/list'; //批量选课
G_FormArr['courseStandard'] = 'course/coursestandard/list'; //批次列表
G_FormArr['planchoosecourse'] = 'course/planchoosecourse/list'; //选课计划列表
G_FormArr['planchoosecoursedetails'] = 'course/planchoosecoursedetail/list'; //选课计划选课详细列表
G_FormArr['courseCreate'] = 'course/courseattribute/create'; // 新增课程
G_FormArr['courseUpdate'] = 'course/courseattribute/update';//更新课程信息
G_FormArr['courseStatuModify'] = 'course/courseattribute/modifystatus';//更新课程信息
G_FormArr['teacherAdd'] = 'course/courseteacher/create'; //新增教师
G_FormArr['teacherList'] = 'course/courseteacher/list'; //教师列表
G_FormArr['courseData'] = 'course/courseattribute/info'; //课程详细信息
G_FormArr['courseDataDel'] = 'course/courseattribute/deletebatch'; //课程删除
G_FormArr['planCourseDataDel'] = 'course/planopencourse/deletebatch'; //开课计划课程删除
G_FormArr['planCourseList'] = 'course/planopencourse/courseattribute/list'; //开课计划课程查询列表
G_FormArr['planCourseAdd'] = 'course/planopencourse/create'; //开课计划课程新增
G_FormArr['planCourseUpdate'] = 'course/planopencourse/update'; //开课计划课程修改
G_FormArr['planCourseAuditetail'] = 'course/planopencourse/auditdetails/'; //开课计划审核
G_FormArr['chooseCourseAuditetail'] = 'course/planchoosecourse/auditdetails/'; //选课计划审核
G_FormArr['plancourseData'] = 'course/planopencourse/info'; //开课计划课程详细信息
G_FormArr['chooseCourseList'] = 'course/planchoosecourse/list'; //选课计划课程查询列表
G_FormArr['planocCourseList'] = 'course/planocstandard/list'; //批次设置列表
G_FormArr['planocCourseInfo'] = 'course/planocstandard/info'; //批次设置详细信息

G_FormArr['studentScore'] = 'score/num/'; //学习档案学生查询
G_FormArr['chooseStudent'] = 'course/student/list/'; //选择学生查询(用于互选计划新增、批量选课新增，互选计划明细新增、批量选课明细新增)
G_FormArr['province'] = 'province/'; //省份


String.prototype.trim = function(){
	  var re = /^\s*(.*?)\s*$/; //惰性
	  return this.replace(re,"$1");
};


function dataReload(){$('#jsdata').attr('src','js/data.js?t='+new Date().valueOf());}

// 获取当前页面url参数
function getQuery(name){
	var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
	var r=window.location.search.substr(1).match(reg);
	return r!=null?r[2]:"";
}
// 过滤Null/undefined
function throwNull(str){
	var re = /null|undefined/g;
	return str.replace(re,'');
}

/* Ajax分页 */
var G_currPage=1;		//当前页，用于删除后自动刷新等
function gPage(total,currPage,func,perpage){
	G_currPage=currPage;
	perpage=typeof(perpage)==='number'?perpage:10;
	totalPage=Math.ceil(total/perpage);
	var linknum=5,pagebegin=0,pageend=0;
	if(totalPage<=1){pagebegin=0;pageend=-1}
	else if(totalPage>1 && totalPage<=linknum){pageend=totalPage;pagebegin=1}
	else if(totalPage>linknum){
		if(currPage < (Math.ceil(linknum/2)+1)){pageend=linknum;pagebegin=1}
		else{
			pageend=(totalPage>=(currPage+Math.floor(linknum/2)))?(currPage+2):totalPage;
			pagebegin=pageend-linknum+1;
		}
	}
	var out='<div class="pagination">';
	if(currPage>1){out +='<a href="javascript:" target="_self" onclick="'+func+'(1)">&laquo; 首页</a><a href="javascript:" target="_self" onclick="'+func+'('+(currPage - 1)+')">&laquo; 上一页</a> ';}
	for(i=pagebegin;i<=pageend;i++){
		if(currPage==i) out +='<a href="#1" target="_self" class="number current">'+i+'</a> ';
		else out +='<a href="javascript:" target="_self" class="number" onclick="'+func+'('+ i +')">'+i+'</a> ';
	}
	if(currPage<totalPage){out +='<a href="javascript:" target="_self" onclick="'+func+'('+ (currPage + 1) +')">下一页 &raquo;</a><a href="javascript:" target="_self" onclick="'+func+'('+ totalPage +')"> 尾页&raquo;</a>';}
	out +='</div>';
	return out;
};


function _createContextualFragment(html){
        var div = document.createElement("div"),
            fragment = document.createDocumentFragment(),
            i = 0,
            length, childNodes;

        div.innerHTML = html;
        childNodes = div.childNodes;
        length = childNodes.length;

        for (; i < length; i++) {
            fragment.appendChild(childNodes[i].cloneNode(true));
        }

        return fragment;
    }

function tableCheckAll(tbody,fn,checkId){
	var checkId = checkId||'checkboxall';
	$('#'+checkId).click(function(){
 		var flag = false;
 		if(this.checked){
 			flag=true;
 		}
 		var checks = document.getElementById(tbody).getElementsByTagName("input");
		for(var i=0,len=checks.length;i<len;i++){
			var c = checks[i];
			if(c.type=='checkbox'&&!c.disabled)
			c.checked=flag;
		}
		if(fn){fn();}
		$('#'+tbody).find('input[type="checkbox"]').click(function(){
				if(this.checked==false){
						$('#checkboxall')[0].checked=false;
					}else{
						var flag=true;
						var cbx =$('#'+tbody).find('input[type="checkbox"]');
						for(var i=0,len=cbx.length;i<len;i++){
							if(cbx[i].checked==false){
								flag=false;
							}
						}
						if(flag) $('#checkboxall')[0].checked=true;
				}
		});


 	});
};


/**
 * 验证表但项
 * @param {JQuery Object} dom 当前项jquery对象
 * @param {Object} opt emptyText为空时的显示文本
 * @return {Boolean} 是否有验证不通过的
 */
function valiInput(dom,opt){
					var opt = opt||{};
					var maxLen = opt.max||100;
					var checked = true;
					var sp = dom.next('.valiInput');
					if(sp.length==0){
						dom.after('<span class="valiInput hidden">不能为空</span>');
						sp = dom.next('.valiInput');
					}
					sp = $(sp[0]);
					var val = dom.val();
					if(val=='null'||val.trim().length==0){
						var tx = opt.emptyText||'不能为空';
						sp.html(tx);
						sp.removeClass('hidden').addClass('error');
						checked=false;
					}else if(val.trim().length>maxLen){
						var tx = opt.longText||'文本长度超过'+maxLen;
						sp.html(tx);
						sp.removeClass('hidden').addClass('error');
						checked=false;
					}else{
						sp.removeClass('error').addClass('hidden');
					}
					return checked;

				}

//将列表上的checkbox置为非选
function disCheckedHeader(){
	var cx = document.getElementById('checkboxall');
		if(cx){
			cx.checked = false;
		}
}

function getIds(tbody){
		var checks = document.getElementById(tbody).getElementsByTagName("input");
		var ids = [];
		for(var i=0,len=checks.length;i<len;i++){
			var c = checks[i];
			if(c.type=='checkbox'&&c.checked&&!c.disabled)
			ids.push(c.getAttribute("ids"));
		}

		return ids;
	}


msgBox = {
	tpl:['<div id="msgBoxDIV" style="position:absolute;width:100%;display:none;',
		'padding-top:2px;height:24px;*height:24px;_height:20px;text-align:center;">',
		'<span class="msg">{msg}</span>',
		'</div>'
		],

	  re: /\{([\w\-]+)\}/g,

      apply: function(values){
      		var html = this.tpl.join('');
            return html.replace(this.re,function(m,name){
                              return values[name] !== undefined ? values[name] : "";
                        });
      },

	show:function(msg,top){
		var top = top||document.documentElement.scrollTop;
		var dom = document.getElementById('msgBoxDIV'),
			body = document.body;
		if(!dom){
			var html = this.apply({msg:msg});
			 frag = _createContextualFragment(html);
			 body.insertBefore(frag,body.children[0]);
			dom = document.getElementById('msgBoxDIV');
		}else{
			dom.children[0].innerHTML = msg;
		}

		dom.style['display']='';
		dom.style['top']=(top+3)+'px';
		setTimeout(function(){
			dom.style['display']='none';
		},3000);

	}
};


function patch(){
	$('.wrapper').height('auto');
	$('#nyroModalContent').height('auto');
	$('#nyroModalWrapper').height('auto');
}


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


function mAlert(title,t){
	t= t || 1;
	var img=['submit_ico.gif','delete_ico.gif','information_ico.gif'];
	$.fn.nyroModalManual({
			width:400,
			title:"系统提示",
			content: '<div class="overlay_delete_box"><h5 class="red"><img src="images/'+img[t]+'" />'+title+'</h5></div><div class="overlay_btn"><input type="button" id="msgBtn" class="btn btn_red overlayClose" value="确定" /></div>'
	});
}

function strSplit(str,len){
	var str=str.trim();
	var len = len||6;
	if(str.length<=len)return str;
	return str.substr(0,len)+'...';
}
function disableForm(formName){
	 var els = document.getElementById(formName).elements;
      	  for(key in els){
      	  	var el = els[key];
      	  	if(el&&el.name){
      	  		try{
          			el.disabled = true;
          	  	}catch(e){

          	  	}
      	  	}

      	  }
}

function maskChar(dom,val){
				var re = /<|>|\[|\]|\0|--|'/;
				return re.test(val);
			}

function maskForm(form){
	var checked = true;
	var fm = document.getElementById(form);
	var els = fm.elements;
	for(var i=0,len=els.length;i<len;i++){
		var temp = false;
		var el = els[i],type=el.type;
		if(type=='text'){
			temp = maskChar(el,el.value);
		}else if(type=='texarea'){
			temp=maskChar(el,el.innerHTML);
		}
		var dom = $(el);
		var sp = dom.next('.valiMask');
		if(temp){
			if(sp.length==0){
					dom.after('<span class="valiMask hidden"></span>');
					sp = dom.next('.valiMask');
			}
			sp=$(sp[0]);
			sp.html("不能包含[]\<\>\\0--\'");
			sp.removeClass('hidden').addClass('error');
			checked = false;
		}else if(sp){
			sp.removeClass('error').addClass('hidden');
		}
	}
	return checked;
}

	/**
     * Checks whether or not the specified object exists in the array.
     * @param {Object} o The object to check for
     * @param {Number} from (Optional) The index at which to begin the search
     * @return {Number} The index of o in the array (or -1 if it is not found)
     */
    Array.prototype.indexOf = function(o, from){
        var len = this.length;
        from = from || 0;
        from += (from < 0) ? len : 0;
        for (; from < len; ++from){
            if(this[from] === o){
                return from;
            }
        }
        return -1;
    };

function win_major(opt){
	win_termId=opt.id;
	win_courseCode = opt.code;
	$.fn.nyroModalManual({
		width:400,
		title:"开课列表",
		url: 'overlay_course_open.html'
	});
}

var stypes = user['studentType'].split(',');
AmBow_CK.setcookie('st',stypes[0]||'');
$(function(){
	//创建页头header
	var header='<div class="topline"><div class="topline_box">';
	if(user['uid']){
		header+='<span>欢迎您：<b><a href="javascript:">'+user['uname']+'</a></b></span><i>|</i><a id="logback" href="#">返回个人空间</a><i>|</i><a href="#"><img src="images/ico_help.gif">&nbsp;帮助中心</a><i>|</i><a href="http://wlpt.ambow.net:7001/cas/logout">退出</a>';
	}else{
		header+='<a href="#">请登陆</a>';
	}
	header+='</div></div>';
	var page_header='';
	if(stypes.length>1){
		var opts = '';
		for(var i=0,len=stypes.length;i<len;i++){
			if(stypes[i]==1){
				opts += '<option value="1">免费师范生支持系统</option>';
			}else if(stypes[i]==2){
				opts += '<option value="2">免费师范生教育硕士支持系统</option>';
			}else if(stypes[i]==3){
				opts += '<option value="3">教师职后教育支持系统</option>';
			}
			
		}
		page_header = '<div class="wrapper"><div class="topnav"><div  class="select_tab"><select id="stype_select">'+opts+'</select></div></div></div>';
	}
	
	
	$('.page_head').html(page_header).before(header);
	$('#logback').click(function(){location.href = 'http://wlpt.ambow.net:7005/sns/space.jsp?do=home';});
	
	if(stypes.length>1){
		$('#stype_select').val(AmBow_CK.getcookie('cst').split('/')[0]||AmBow_CK.getcookie('st').split('/')[0].toString());
		$('#stype_select').change(function(){
			AmBow_CK.setcookie('st',this.value);
			AmBow_CK.setcookie('cst',this.value);
			/*if(typeof cmb != 'undefined'&&cmb.term){
				cmb.term();
			}*/
			location.reload();
			//changeSkin(this.value);
		});
	}
	
});

function changeSkin(idx){
	
		var skin = document.getElementById('style');
		if(idx==1){
			//document.write('\<link href="css/skin_1.css" rel="stylesheet" type="text/css" /\>');
			skin.href="css/skin_1.css";
		}else if(idx==3){
			//document.write('\<link href="css/skin_2.css" rel="stylesheet" type="text/css" /\>');
			skin.href="css/skin_2.css";
		}else{
			//document.write('\<link href="css/skin_0.css" rel="stylesheet" type="text/css" /\>');
			skin.href="css/skin_0.css";
		}
}

if(!/default.html/.test(location.href)){
	document.write('\<link id="style" href="" rel="stylesheet" type="text/css" /\>');
		var cks = AmBow_CK.getcookie('cst').split('/')[0]||AmBow_CK.getcookie('st').split('/')[0];
		changeSkin(cks);
	}