/**
 * @author gp
 * @datetime 2012-8-8
 * @description 函数库
 */
var G_textedit='';
var Tiku=(function(){
	var it={};
	$('.addQuestions').live('click',function(e){
		G_textedit=$(this).parent().parentsUntil('tbody');
		//e.preventDefault();
		$.fn.nyroModalManual({
			width:700,
			height:480,
			title:'高级文本编辑器',
			url: 'overlay_addQuestions.shtml'
		});
		return false;
	});
	// 选择正确答案
	it.radio = function(fid){
		$('#'+fid).find('input[type="radio"]').live('click',function(){
			$('#'+fid).find('input[type="radio"]').attr('checked',false);
			$('#'+fid).find('img').remove();
			$(this).attr('checked',true).parent().prev().html('<img src="../images/help/hook.gif" width="15" height="15" />');
		});
	};
	it.chk = function(fid){
		$('#'+fid).find('input[type="checkbox"]').live('click',function(){
			if($(this).attr('checked')==true) $(this).parent().prev().html('<img src="../images/help/hook.gif" width="15" height="15" />');
			else $(this).parent().prev().empty();
		});
	};
	// 获取当前页面url参数
	it.getQuery = function(name){
		var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
		var r=window.location.search.substr(1).match(reg);
		return r!=null?r[2]:"";
	};
	it.topicDifficulty_select = function(value){
		var val = value.slice(2);
		var str ='<select class="mini_sel" name="topicDifficulty">';
		for(var i=1;i<10;i++){
			str +='<option '+(val==i ? 'selected':'')+'>'+'0.'+i+'</option>';
		}
		str += '</select>（难度值在0至1之间，数值越大，题目难度越大。）';
		return str;

	};
	it.topicDifficulty_star = function(){
		var str = '<select id="topicDifficultyStart" name="topicDifficultyStart" class="default_txt" onchange="Tiku.topicDifficulty_end(this.value)">';
		for(var i=1;i<9;i++){
			str +='<option value="'+'0.'+i+'">'+'0.'+i+'</option>';
		}
		str += '</select>';
		return str;
	};
	it.topicDifficulty_end = function(value){

		var val = parseInt(value.slice(2));
		var str = '<select id="topicDifficultyEnd" name="topicDifficultyEnd" class="default_txt">';
		if(val == 1){
			for(var i=2;i<9;i++){
				str +='<option value="'+'0.'+i+'">'+'0.'+i+'</option>';
			}
			str +='<option selected="selected" value="0.9">0.9</option>';
		}else{
			for(var i = val+1;i<10;i++){
				str +='<option  value="'+'0.'+i+'" '+(val==i ? 'selected':'')+'>'+'0.'+i+'</option>';
			}
		}
		str += '</select>';
		$("#js_topicDifficultyEnd").html(str);
	};
	it.topicTypeSelect = function(id,flag){
		var f = false;
		f = flag;
		if(typeof(addType)=='undefined'){
			var str='<input type="hidden" name="topicTypeId" value="'+id+'" />';
				if(flag){
					str+='<select class="mini_sel" disabled onchange=\'location.href=this.value;\'>';
				}else{
					str+='<select class="mini_sel" onchange=\'location.href=this.value;\'>';
				}
				str+='	<option value="exammanage_addQuestions.shtml"'+(id==1?' selected':'')+'>单项选择题</option>'+
				'	<option value="exammanage_addMultiple.shtml"'+(id==2?' selected':'')+'>多项选择题</option>'+
				'	<option value="exammanage_addJudgment.shtml"'+(id==3?' selected':'')+'>判断题</option>'+
				'	<option value="exammanage_addMatch.shtml"'+(id==4?' selected':'')+'>匹配题</option>'+
				'	<option value="exammanage_addSort.shtml"'+(id==5?' selected':'')+'>排序题</option>'+
				'	<option value="exammanage_addSpace.shtml"'+(id==6?' selected':'')+'>填空题</option>'+
				'	<option value="exammanage_addAsk.shtml"'+(id==7?' selected':'')+'>简答题</option>'+
				'	<option value="exammanage_addDiscuss.shtml"'+(id==8?' selected':'')+'>论述题</option>'+
				'</select>';
				// 返回按钮
				$('#js_btn_back').click(function(){
					//history.back()
					window.location.href='exammanage.shtml';
				});
		}else{
			var str='<input type="hidden" name="topicTypeId" value="'+id+'" />'+
			'<select class="mini_sel" onchange="input_select_change(this.value);">'+
			'	<option value="examinationpaper_list_input_danxuan.html"'+(id==1?' selected':'')+'>单项选择题</option>'+
			'	<option value="examinationpaper_list_input_duoxuan.html"'+(id==2?' selected':'')+'>多选项选择题</option>'+
			'	<option value="examinationpaper_list_input_panduan.html"'+(id==3?' selected':'')+'>判断题</option>'+
			'	<option value="examinationpaper_list_input_pipei.html"'+(id==4?' selected':'')+'>匹配题</option>'+
			'	<option value="examinationpaper_list_input_paixu.html"'+(id==5?' selected':'')+'>排序题</option>'+
			'	<option value="examinationpaper_list_input_tiankong.html"'+(id==6?' selected':'')+'>填空题</option>'+
			'	<option value="examinationpaper_list_input_jianda.html"'+(id==7?' selected':'')+'>简答题</option>'+
			'	<option value="examinationpaper_list_input_lunshu.html"'+(id==8?' selected':'')+'>论述题</option>'+
			'</select>';

			// 返回按钮
			$('#js_btn_back').click(function(){
				$('#otherPage').html('').hide();
				$('#firstPage').show();
			});
		}
		return str;
	};
	it.knowledge = function(edit){
		// 知识点带入
		if(!edit){
			var obj=$('.departments');
			obj.closest('td').find('input').eq(0).val(AmBow_CK.getcookie('zhishi_id'));
			obj.closest('td').find('input').eq(1).val(AmBow_CK.getcookie('zhishi_txts'));
		}

		$('.departments').live('click',function(){
			G_zsdianChkObj=$(this);
			$.fn.nyroModalManual({
			    width:600,
			    height:500,
				title:"选择知识点",
				url: 'overlay_exammanage_adjust.shtml'
			});
		});
	};
	return it;
})();


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
//检测输入的值是否正确
var checking = function(){
	var it={};
	it.topicDifficulty = function(){
		var obj=$("input[name='topicDifficulty']"),str = obj.val();
		var reg = /^0\.[0-9]([0-9]?)$/;
		if(str != ''){
			if(reg.test(str) == false || str == '0.00' || str == '0.0'){
				if(obj.closest("tr").next().attr('class')!='tips'){
					obj.closest("tr").after('<tr class="tips"><td height="30" align="right"></td><td colspan="2"><span class="error" name="categoryCode_add">请输入0-1之间的数，如：0.1，0.01</span></td></tr>');
				}else{
					obj.closest("tr").next().remove();
					obj.closest("tr").after('<tr class="tips"><td height="30" align="right"></td><td colspan="2"><span class="error" name="categoryCode_add">请输入0-1之间的数，如：0.1，0.01</span></td></tr>');
				}
				//obj.focus();
				return false;
			}else{
				if(obj.closest("tr").next().attr('class')=='tips'){
					obj.closest("tr").next().remove();
				}
			}
		}else{
				if(obj.closest("tr").next().attr('class')!='tips'){
					obj.closest("tr").after('<tr class="tips"><td height="30" align="right"></td><td colspan="2"><span class="error" name="categoryCode_add">难度不能为空</span></td></tr>');
				}else{
					obj.closest("tr").next().remove();
					obj.closest("tr").after('<tr class="tips"><td height="30" align="right"></td><td colspan="2"><span class="error" name="categoryCode_add">难度不能为空</span></td></tr>');
				}
				//obj.val('').focus();
				return false;
		}
		return true;
	}
	it.topicDifficulty_b = function(){
		$("input[name='topicDifficulty']").blur(function(){
			it.topicDifficulty();
		});
	}
	//检测知识点是否正确
	it.checkcategoryCode =function(){
		var obj=$("input[name='categoryCode']"),str = obj.val();
		if(str != ''){
			if(obj.closest("tr").next().attr('class')=='tips'){
				obj.closest("tr").next().remove();
			}
		}else{
			if(obj.closest("tr").next().attr('class')!='tips'){
				obj.closest("tr").after('<tr class="tips"><td height="30" align="right"></td><td colspan="2"><span class="error" name="categoryCode_add">知识点不能为空</span></td></tr>');
			}
			return false;
		}
		return true;
	}

	it.checkcategoryCode_b =function(){
		$("input[name='categoryCode']").blur(function(){
			it.checkcategoryCode();
		});
		$('input[name="categoryCode"]').focus(function(){
			var obj = $('input[name="categoryCode"]');
			if(obj.closest("tr").next().attr('class')=='tips'){
				obj.closest("tr").next().remove();
			}
		})
	}
	//验证选项
	it.checkoptionContent = function(){
		var questionsCheck=true;
		$("input[name='optionContent']").each(function(){
			var obj = $(this);
			var str = obj.val();
			if(str != ''){
				if(obj.closest("tr").next().attr('class')=='tips'){
					obj.closest("tr").next().remove();
				}
			}else{
				if(obj.closest("tr").next().attr('class')!='tips'){
					obj.closest("tr").after('<tr class="tips"><td height="30" align="right"></td><td colspan="2"><span class="error" name="optionContent_add">选项内容不能为空</span></td></tr>');
				}
				questionsCheck=false;
				return false;
			}

		});
		if(questionsCheck==false){
			return false;
		}
		return true;
	}

	it.checkoptionContent_b = function(){
		$("input[name='optionContent']").die().live('blur',function(){
			it.checkoptionContent();
		});
		$('input[name="optionContent"]').die().live('focus',function(){

			$('input[name="optionContent"]').each(function(){
				var obj = $(this);
				if(obj.closest("tr").next().attr('class')=='tips'){
				obj.closest("tr").next().remove();
			}

			});
		})
	}
	//验证题干
	it.checktopicContent =function(){
		var obj=$("textarea[name='topicContent']"),str = $.trim(obj.val());


		if(str != ''){
			if(str.length==0){
				//obj.closest("tr").css("background","red");
				if(obj.closest("tr").next().attr('class')!='tips'){
					obj.closest("tr").after('<tr class="tips"><td height="30" align="right"></td><td colspan="2"><span class="error" name="categoryCode_add">请输入题干内容</span></td></tr>');
					//obj.val('').focus();
					return false;
				}else{
					obj.closest("tr").next().remove();
					obj.closest("tr").after('<tr class="tips"><td height="30" align="right"></td><td colspan="2"><span class="error" name="categoryCode_add">请输入题干内容</span></td></tr>');
					//obj.val('').focus();
					return false;
				}
			}
		}else{
			obj.val('');
			if(obj.closest("tr").next().attr('class')!='tips'){
				obj.closest("tr").after('<tr class="tips"><td height="30" align="right"></td><td colspan="2"><span class="error" name="topicContent_add">题干不能为空</span></td></tr>');
				return false;
			}else{
					obj.closest("tr").next().remove();
					obj.closest("tr").after('<tr class="tips"><td height="30" align="right"></td><td colspan="2"><span class="error" name="categoryCode_add">题干不能为空</span></td></tr>');
					//obj.val('').focus();
					return false;
			}
		}
		return true;
	}

	it.checktopicContent_b =function(){
		$("textarea[name='topicContent']").blur(function(){
			it.checktopicContent();
		});
		$('textarea[name="topicContent"]').focus(function(){
			var obj = $('textarea[name="topicContent"]');
			if(obj.closest("tr").next().attr('class')=='tips'){
				obj.closest("tr").next().remove();
			}
		})
	}
	//选项验证(排序)
	it.checkoptionContent_sort =function(){
		var questionsCheck=true;
		$("input[name='optionContent']").each(function(){
			var obj = $(this);
			var str = obj.val();
			if(str != ''){
				if(obj.closest("tr").next().attr('class')=='tips'){
					obj.closest("tr").next().remove();
				}
			}else{
				if(obj.closest("tr").next().attr('class')!='tips'){
					obj.closest("tr").after('<tr class="tips"><td class="first tc"><span  class="error">选项不能为空</span></td><td width="1"></td></tr>');
				}
				questionsCheck=false;
				return false;
			}

		});
		if(questionsCheck==false){
			return false;
		}
		return true;
	}

	it.checkoptionContent_sort_b =function(){
		$("input[name='optionContent']").die().live('blur',function(){
			it.checkoptionContent_sort();
		});
		$('input[name="optionContent"]').die().live('focus',function(){
			$('input[name="optionContent"]').each(function(){
				var obj = $(this);
				if(obj.closest("tr").next().attr('class')=='tips'){
				obj.closest("tr").next().remove();
			}

			});
		})
	}
	//排序序号验证
	it.checkorderNum = function(){
		var questionsCheck=true;

		$("input[name='orderNum']").each(function(){
			var obj = $(this);
			var str = obj.val();
			var reg = /^\d{1,2}$/;
			if(str.length!=''){
				if(reg.test(str)==false){
					if(obj.closest("tr").next().attr('class')!='tips'){
						obj.closest("tr").after('<tr class="tips"><td height="30"><span class="error" name="categoryCode_add">输入数字不合法</span></td><td colspan="2"></td></tr>');
						//obj.focus();
						questionsCheck=false;
						return false;
					}else{
						obj.closest("tr").next().remove();
						obj.closest("tr").after('<tr class="tips"><td height="30"><span class="error" name="categoryCode_add">输入数字不合法</span></td><td colspan="2"></td></tr>');
						//obj.focus();
						questionsCheck=false;
						return false;
					}
				}
			}else{
				if(obj.closest("tr").next().attr('class')!='tips'){
						obj.closest("tr").after('<tr class="tips"><td height="30"><span class="error" name="categoryCode_add">序号不能为空</span></td><td colspan="2"></td></tr>');
						//obj.val('').focus();
						questionsCheck=false;
						return false;
					}else{
						obj.closest("tr").next().remove();
						obj.closest("tr").after('<tr class="tips"><td height="30"><span class="error" name="categoryCode_add">序号不能为空</span></td><td colspan="2"></td></tr>');
						//obj.val('').focus();
						questionsCheck=false;
						return false;
				}
			}
		});
		if(questionsCheck==false){
			return false;
		}

		return true;
	}
	it.checkorderNum_b =function(){
		$("input[name='orderNum']").die().live('blur',function(){
			it.checkorderNum();
		});
		$('input[name="orderNum"]').die().live('focus',function(){
			$('input[name="orderNum"]').each(function(){
				var obj = $(this);
				if(obj.closest("tr").next().attr('class')=='tips'){
				obj.closest("tr").next().remove();
			}

			});
		})
	}
	return it;
}();
//将列表上的checkbox置为非选
function disCheckedHeader(){
	var cx = document.getElementById('checkboxall');
		if(cx){
			cx.checked = false;
		}
}

//获取列表选中id
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



//格式化日期函数
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

/**
     * Checks whether or not the specified object exists in the array.
     * @param {Object} o The object to check for
     * @param {Number} from (Optional) The index at which to begin the search
     * @return {Number} The index of o in the array (or -1 if it is not found)
     */


function getQuery(name){
		var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
		var r=window.location.search.substr(1).match(reg);
		return r!=null?r[2]:"";
};
//文本框focus时，对应的单选或多选按钮同时被选中
var focus_input =(function(){
	_it={};
	_it.focusCheck = function(name,namediy){
		$(namediy).live('focus',function(){
			$(name).attr("checked","checked");
		});
	};
	return _it;
})();
// 过滤html标签
function strip_tags(input, allowed) {
	allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
	var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
	commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
	return input.replace(commentsAndPhpTags, '').replace(tags,
	function($0, $1) {
		return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0: '';
	});
}


// Cookie操作
var AmBow_CK = {
	getcookie : function (O){var o="",l=O+"=";if(document.cookie.length>0){var i=document.cookie.indexOf(l);if(i!=-1){i+=l.length;var I=document.cookie.indexOf(";",i);if(I==-1)I=document.cookie.length;o=unescape(document.cookie.substring(i,I))}};return o},
	// 植入cookie n->cookieq名,v->cookie值,t->时间(毫秒),p->路径,c->域名
	setcookie : function (n,v,t,p,c){var T="";if(t){T=new Date((new Date).getTime()+t);T="; expires="+T.toGMTString()};document.cookie=n+"="+escape(v)+T+(p?';path='+p:'')+(c?';domain='+c:'')},
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

function strSplit(str,len){
	var str=$.trim(str||'');
	var len = len||6;
	if(str.length<=len)return str;
	return str.substr(0,len)+'...';
}

// 过滤Null/undefined
function throwNull(str){
	var re = /null|undefined|无/g;
	return (str+'').replace(re,'');
}
// 学员端搜索
function toSelectResourceByGo(obj){
	$("#topsearch").focus();
	var selectValue =$("#topsearch").val();
	$("#topsearch").val('');
	window.location.href = G_ROOTURL+"/resourceCenter/resCenterData.action?log=1&selectValue="+selectValue;
}
//权限控制-教师端
function limit_t(){
	if(G_USER.teacher ==1){
		return true;
	}else{
		window.location=G_ROOTURL;
	}	
}
//权限控制-管理员端
function limit_m(){
	if(G_USER.teacher ==1 && G_USER.manager == 1){
		return true;
	}else{
		window.location=G_ROOTURL;
	}	
}

//页面权限控制
function limit_page(num){
//	if($.inArray(num,G_All)==-1){
//		return false;		
//	}else{
//		return true;
//	}	
	var flag = false;
	for(var i=0;i<G_All.length;i++){
		if(G_All[i]==num){
			flag = true;
		}
	}
	return flag;
}
function showOrHide(num,id){
	if(limit_page(num)){
		//$('#'+id).css('display','display');	
	}else{
		$('#'+id).css('display','none');	
	}

}

	 