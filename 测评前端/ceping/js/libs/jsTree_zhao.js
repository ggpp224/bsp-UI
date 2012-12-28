/**
 * ambowJstree  power by jquery
 * author liusen
 * 2011-4-25
 */
/**
 * treeDivID:要显示树的DIV ID
 */
function JsTreeControl(treeDivId){
	//默认为1，常规用法即父可带子，2父子节点没有关联，3最多可以设置1个选中状态,4,夫带子，但是子不带父
	this.checkboxtreesetting=1;
	this.treeDivId=treeDivId;
	this.jstreeobj;
}

/**
 * thisurl:提交路径
 * returnValueName：需要返回的参数名称，如果该参数没有则返回0
 */
JsTreeControl.prototype.createWithoutCheckBox=function (thisurl,returnValueName,recallFunc){
	var temp=this.treeDivId;
	
	// load html data from file
	$("#"+this.treeDivId)
	.bind("loaded.jstree",function(){
		if(recallFunc!=null)
		{
			var jsto=jQuery.jstree._reference(temp);
			var ishave=jsto._get_children ( -1 );
			if(ishave!=false){
				if(typeof(recallFunc)=='function'){
					recallFunc();
				}else{
					eval(recallFunc+"()");
				}
			}
		}
	})
	.jstree({ 
		"json_data" : {
			ajax : { url : thisurl,
					 type:"POST",
				     data : function (n) {
						//整理返回参数，并封装成JSON返回给后台
						var returnVal=new String();
						for(var i=0;i<returnValueName.length;i++){
							var vall= n.attr ? n.attr(returnValueName[i]) : 0;
							if(vall==null){
								vall="0";
							}
							returnVal=returnVal+returnValueName[i]+" :\""+vall+"\",";
						}
						returnVal="{"+returnVal.substr(0,returnVal.length-1)+" }";
						var json=(new Function("return "+returnVal))();
        				return json;
				     }	  			
			}
		},
		"plugins" : [ "themes", "json_data","ui" ]
	});
	this.jstreeobj=jQuery.jstree._reference(this.treeDivId);
}

/**
 * 树枝的搜索，recallFunc为回调函数
 */
JsTreeControl.prototype.createTreeForSearch=function (thisurl,valueStr,recallFunc){
	var temp=this.treeDivId;
	// load html data from file
	$("#"+this.treeDivId)
	.bind("loaded.jstree",function(){
		if(recallFunc!=null)
		{
			var jsto=jQuery.jstree._reference(temp);
			var ishave=jsto._get_children ( -1 );
			if(ishave!=false){
				eval(recallFunc+"()");
			}
		}
	})
	.jstree({ 
		"json_data" : {
			ajax : { url : thisurl,
					 type:"POST",
				     data : function (n) {
						//整理返回参数，并封装成JSON返回给后台
						returnVal="{ sStr : \""+valueStr+"\"}";
						var json=(new Function("return "+returnVal))();
        				return json;
				     }	  			
			}
		},
		"plugins" : [ "themes", "json_data","ui" ]
	});
	this.jstreeobj=jQuery.jstree._reference(this.treeDivId);
}
	/**
	 * thisurl:提交路径
	 * returnValueName：需要返回的参数名称，如果该参数没有则返回0
	 * @param checkboxType 默认为1，常规用法即父可带子，2父子节点没有关联，3最多可以设置1个选中状态,4 夫带子，但子不带父
	 * @return
	 */
JsTreeControl.prototype. createWithCheckBox=function(thisurl,returnValueName,checkboxType){
	if(!isNaN(checkboxType)&&checkboxType>0 && checkboxType<5){
		this.checkboxtreesetting=checkboxType;
	}
	$("#"+this.treeDivId)
	.jstree({ 
		"json_data" : {
			ajax : { url : thisurl,
					 type:"POST",
				     data : function (n) {
						//整理返回参数，并封装成JSON返回给后台
						var returnVal=new String();
						for(var i=0;i<returnValueName.length;i++){
							var vall= n.attr ? n.attr(returnValueName[i]) : 0;
							if(vall==null){
								vall="0";
							}
							returnVal=returnVal+returnValueName[i]+" :\""+vall+"\",";
						}
						returnVal="{"+returnVal.substr(0,returnVal.length-1)+"}";
						var json=(new Function("return "+returnVal))();
        				return json;
				     }	  			
			}
		},
		"checkbox":{"checkboxsetting":checkboxType},
		"plugins" : [ "themes", "json_data","checkbox" ]
	});
	this.jstreeobj=jQuery.jstree._reference(this.treeDivId);
}
	

/**
 * thisurl:提交路径
 * returnValueName：需要返回的参数名称，如果该参数没有则返回0
 * @param checkboxType 默认为1，常规用法即父可带子，2父子节点没有关联，3最多可以设置1个选中状态,4 夫带子，但子不带父
 * recallFunc 回调函数
 */
JsTreeControl.prototype. createWithCheckBoxAndCallBack=function(thisurl,returnValueName,checkboxType,recallFunc){
	if(!isNaN(checkboxType)&&checkboxType>0 && checkboxType<5){
		this.checkboxtreesetting=checkboxType;
	}
	var temp=this.treeDivId;
	$("#"+this.treeDivId)
	.bind("loaded.jstree",function(){
		if(recallFunc!=null)
		{
			var jsto=jQuery.jstree._reference(temp);
			var ishave=jsto._get_children ( -1 );
			if(ishave!=false){
				eval(recallFunc+"()");
			}
		}
	})
	.jstree({ 
		"json_data" : {
			ajax : { url : thisurl,
					 type:"POST",
				     data : function (n) {
						//整理返回参数，并封装成JSON返回给后台
						var returnVal=new String();
						for(var i=0;i<returnValueName.length;i++){
							var vall= n.attr ? n.attr(returnValueName[i]) : 0;
							if(vall==null){
								vall="0";
							}
							returnVal=returnVal+returnValueName[i]+" :\""+vall+"\",";
						}
						returnVal="{"+returnVal.substr(0,returnVal.length-1)+"}";
						var json=(new Function("return "+returnVal))();
	    				return json;
				     }	  			
			}
		},
		"checkbox":{"checkboxsetting":checkboxType},
		"plugins" : [ "themes", "json_data","checkbox" ]
	});
	this.jstreeobj=jQuery.jstree._reference(this.treeDivId);
}

/**
 * 对checkbox的搜索提供该接口，
 * thisurl:提交路径
 * returnValueName：需要返回的参数名称，如果该参数没有则返回0
 * @param checkboxType 默认为1，常规用法即父可带子，2父子节点没有关联，3最多可以设置1个选中状态,4 夫带子，但子不带父
 * recallFunc 回调函数
 * valueStr:搜索参数,后台用resourceName变量接值
 */
JsTreeControl.prototype. createWithCheckBoxAndCallBackFS=function(thisurl,returnValueName,checkboxType,recallFunc,valueStr){
	if(!isNaN(checkboxType)&&checkboxType>0 && checkboxType<5){
		this.checkboxtreesetting=checkboxType;
	}
	var temp=this.treeDivId;
	$("#"+this.treeDivId)
	.bind("loaded.jstree",function(){
		if(recallFunc!=null)
		{
			var jsto=jQuery.jstree._reference(temp);
			var ishave=jsto._get_children ( -1 );
			if(ishave!=false){
				eval(recallFunc+"()");
			}
		}
	})
	.jstree({ 
		"json_data" : {
			ajax : { url : thisurl,
					 type:"POST",
				     data : function (n) {
						//整理返回参数，并封装成JSON返回给后台
						var returnVal=new String();
						for(var i=0;i<returnValueName.length;i++){
							var vall= n.attr ? n.attr(returnValueName[i]) : 0;
							if(vall==null){
								vall="0";
							}
							returnVal=returnVal+returnValueName[i]+" :\""+vall+"\",";
							returnVal=returnVal+" resourceName : \""+valueStr+"\",";
						}
						returnVal="{"+returnVal.substr(0,returnVal.length-1)+"}";
						var json=(new Function("return "+returnVal))();
	    				return json;
				     }	  			
			}
		},
		"checkbox":{"checkboxsetting":checkboxType},
		"plugins" : [ "themes", "json_data","checkbox" ]
	});
	this.jstreeobj=jQuery.jstree._reference(this.treeDivId);
}

/**
 * 在使用checkbox插件前提下，获取被选中状态的checkbox个数
 */
JsTreeControl.prototype.getCheckedNum=	function (){
	var jstree=jQuery.jstree._reference(this.treeDivId);
//	return jstree._get_settings().checkbox.checkboxsetting;
	return jstree.get_checked (  ).length;
}
	
/**
 *  在使用checkbox插件前提下,获取选中的checkbox的值 
 * @return 数组形式
 */
JsTreeControl.prototype.getCheckedAttrVal=	function (strname){
	var strVal=new Array();
	var i=0;
	this.jstreeobj.get_checked ().each(
				function(){
					strVal[i]=$(this).attr(strname);
					i++;
				}
			);
	return strVal;
}
	
/**
 * 刷新树
 */
JsTreeControl.prototype.refreshTheTree=	function (){
	this.jstreeobj.refresh();
}
	
/**
 * 从根节点开始到选中的节点的字符串拼接，带有checkbox控件
 * @return
 */
JsTreeControl.prototype.getCheckedToParentStr=	function (){
	var content=new Array();
	var i=0;
	if(this.jstreeobj.get_checked ()!=null){
		this.jstreeobj.get_checked ().each(
			function(){
				  var text=$(this).children("a").text();
				  var parent=$(this).parent("ul");
				  text=text.substr(2, text.length-1); 
				  while($(parent).children("li").attr("parentId")!="0"){
					  parent=$(parent).parent("li");
//					  text=$(parent).text()+" > "+text;
					  var text2=$(parent).children("a").text();
					  text=text2.substr(2, text2.length-1)+">"+text;
					  parent=$(parent).parent("ul");
				  }
				 content[i]=text;
				 i++;
			}
		);
	}
	else{
		content[0]=this.jstreeobj._get_children ( -1 ).text();
	}
	return content;
}
	
/**
 * 从根节点开始到选中的节点的字符串拼接,没有checkbox控件
 * @return
 */
JsTreeControl.prototype.getSelectedToParentStr=	function (){
	var content=new Array();
	var i=0;
	var selnode=this.jstreeobj.get_selected ( this.jstreeobj.get_container () );
	if(selnode!=null){
		selnode.each(
			function(){
				  var text=$(this).children("a").text();
				  var parent=$(this).parent("ul");
				  while($(parent).children("li").attr("parentId")!="0"){
					  parent=$(parent).parent("li");
//					  text=$(parent).text()+" > "+text;
					  var text2=$(parent).children("a").text();
					  text=text2+">"+text;
					  parent=$(parent).parent("ul");
				  }
				 content[i]=text;
				 i++;
			}
		);
	}
	else{
		content[0]=this.jstreeobj._get_children ( -1 ).text();
	}
	if(content==""){
		content[0]="资源根目录";
	}
	return content;
}

/**
 * 将checkbox所选中的树的名称和value自动填充到select控件中
 * @param selectId select空间的id
 * @param valueName option控件所要带回的值
 * @return
 */
JsTreeControl.prototype.getSelectOptionToDiv=	function (selectId,valueName){
	var contents=this.getCheckedToParentStr();
	var values=this.getCheckedAttrVal(valueName);
	var sel=document.getElementById(selectId);
	for(var i=0;i<contents.length;i++){
		var opt=document.createElement("option");
		opt.text=contents[i];
		opt.value=values[i];
		sel.add(opt);
	}
}

/**
 * 弹出层关闭后，原页面的带有checkbox的树可能会出现模式错误的问题，请调用该方法解决
 */
JsTreeControl.prototype.reSetCheckboxType=function (){
	this.jstreeobj._get_settings().checkbox.checkboxsetting=this.checkboxtreesetting;
}

/**
 * 获取被选择节点的categoryCode
 */
JsTreeControl.prototype.getSelectedNodeCataCode=function (){
	var selnode=this.jstreeobj.get_selected ( this.jstreeobj.get_container () );
	var returnVal="";
	selnode.each(
			function(){
				var attr1=$(this);
				returnVal=returnVal+"-"+attr1.attr("categoryCode");
			}
	);
	return returnVal;
}

function openPnode(treeObj){
	treeObj.toggle_node ( treeObj._get_children (-1) );
}

/**
 * 给予CataCode，将树展开到该catacode上
 * banchObj：调用时传为Null,
 * paraName：CataCode所对应的参数名，一般为：categoryCode
 * i：调用时传为5
 * treeObj：调用时将树的实体传入，一般为：jstreeobj.jstreeobj
 * 示例：openToTheBanch(null,"categoryCode","00000000010000100001",5,jstreeobj.jstreeobj);
 */
function openToTheBanch(banchObj,paraName,CataCode,i,treeObj){
	var children =null;
	if(banchObj==null){
		children =treeObj._get_children (-1);
	}
	else{
		children=treeObj._get_children (banchObj);
	}
	if(i<CataCode.length){
		var substr=CataCode.substr(0,i);
		i=i+5;
		
		children.each(
				function(){
					var shit=$(this);
					var TBPValue=shit.attr(paraName);
					if(TBPValue==substr){
						treeObj.open_node ( $(this) , function(){openToTheBanch(shit,paraName,CataCode,i,treeObj);} , false);
					}
				}
		);
	}
	if(i==CataCode.length){
		children.each(
				function(){
					var shit=$(this);
					var TBPValue=shit.attr(paraName);
					if(TBPValue==CataCode){
						treeObj.toggle_select ( shit );
					}
				}
		);
	}
}

/**
 * 判断是否被添加到右边div中
 * @param ul 右边div包含ul的ID
 * @param id 资源id
 */
function hasRes(ul,id){
	var lis=$("#"+ul).find("li");
	for(var i=0;i<lis.length;i++){
		if($(lis[i]).attr("id")==id){
			return true;
		}
	}
	return false;
}
/**
 * 添加按钮事件
 * @param div 资源显示DIV ul 的id
 * @param tree 包含树的div 的id
 */
function addResources(div,tree){
	  if($("#root").hasClass("jstree-checked")){
		  $("#root").removeClass("jstree-checked").addClass("jstree-unchecked");
	  }
	$("li .jstree-checked").each(function(){
		if(!hasRes(div,$(this).attr("id"))){
			if($(this).hasClass("jstree-leaf")){
				var a=$("<a>").addClass("delico").attr("title","从列表删除").attr("href","#");
				var text=$(this).children("a").text();
				var span=$("<span>").text(text);
				var li=$("<li>").attr("id",$(this).attr("id")).append($(a)).append($(span));
				$("#"+div).append($(li));
				$(a).click(function(){delOblRes(div,tree,$(a));});
			}
		}else{
			alert("已存在选择资源"+$(this).find("a").text());
		}
	});
}
/**
 * 添加按钮事件
 * @param div 资源显示DIV ul 的id
 * @param tree 包含树的div 的id
 * @param otherDiv 包含已经添加资源的DIV的ID
 * @param isEle 是否是可选资源
 */
function addResources2(div,tree,otherDiv,isEle){
	var alertStr="";
	var alertEleStr="";
	  $(".jstree-checked").each(function(){
			if($(this).hasClass("jstree-leaf")){
				if(hasRes(div,$(this).attr("id"))){
					alertStr+=$(this).children("a").text()+",";
				}else if(hasRes(otherDiv,$(this).attr("id"))){
					alertEleStr+=$(this).children("a").text()+",";
				}else{
					var a=$("<a>").addClass("delico").attr("title","从列表删除").attr("href","#");
					var text=$(this).children("a").text();
					var resType=$(this).attr("resourceType");
					if(resType!=""&&resType=="1"){
						text="[在线课件]"+text;
					}
					if(resType!=""&&resType=="2"){
						text="[在线测试]"+text;
					}
					if(resType!=""&&resType=="3"){
						text="[同步课程]"+text;
					}
					var span=$("<span>").text(text);
					var li=$("<li>").attr("id",$(this).attr("id")).append($(a)).append($(span));
					$("#"+div).append($(li));
					$(a).click(function(){$(this).parent("li").remove();});
				}
			}
	  });
	  if(alertStr.length>0){
		  alertStr=alertStr.substring(0, alertStr.length-1)+"已经存在。";
	  }
	  if(alertEleStr.length>0){
		  if(isEle==1){
			  alertEleStr=alertEleStr.substring(0, alertEleStr.length-1)+"已经在必修资源中存在。";
		  }
		  if(isEle==0){
			  alertEleStr=alertEleStr.substring(0, alertEleStr.length-1)+"已经在选修资源中存在。";
		  }
	  }
	  if(alertEleStr.length>0||alertStr.length>0){
		  alert(alertStr+alertEleStr+"不能重复添加！");
	  }
}
/**
 * 添加按钮事件
 * @param div 资源显示DIV ul 的id
 * @param tree 包含树的div 的id
 * @param otherDiv 包含已经添加资源的DIV的ID
 * @param isEle 是否是可选资源
 */
function addResources3(div,tree,otherDiv,isEle){
	var alertStr="";
	var alertEleStr="";
	
	  $(".jstree-checked").each(function(){
		  if($(this).find(".jstree-unchecked").length>0){
			  $(this).addClass("unAdd");
		  }
		  
		  if($(this).hasClass("jstree-leaf")&&($(this).parents('unAdd').html()!=null||$(this).parent('ul').parent('li').hasClass("jstree-unchecked"))){
				if(hasRes(div,$(this).attr("id"))){
					alertStr+=$(this).children("a").text()+",";
				}else if(hasRes(otherDiv,$(this).attr("id"))){
					alertEleStr+=$(this).children("a").text()+",";
				}else{
					var a=$("<a>").addClass("delico").attr("title","从列表删除").attr("href","#");
					var text=$(this).children("a").text();
					var resType=$(this).attr("resourceType");
					if(resType==""){
						return ;
					}
					if(resType!=""&&resType=="1"){
						text="[在线课件]"+text;
					}
					if(resType!=""&&resType=="2"){
						text="[在线测试]"+text;
					}
					if(resType!=""&&resType=="3"){
						text="[同步课程]"+text;
					}
					var span=$("<span>").text(text);
					var li=$("<li>").attr("id",$(this).attr("id")).append($(a)).append($(span));
					$("#"+div).append($(li));	
					$(a).click(function(){$(this).parent("li").remove();});
				}
			}else if($(this).parent('ul').parent('li').html()==null||$(this).parent('ul').parent('li').hasClass('unAdd')||$(this).parent('ul').parent('li').hasClass('jstree-unchecked')){
				if(!$(this).hasClass("unAdd")){
					var categoryCode=$(this).attr("categoryCode");
					$.ajax({
						type:"post",
						url:"/resources/getResourcesByCategoryCode.action?categoryCode="+categoryCode,
						dataType:"json",
						async:false,
						success:function(data, textStatus){
							if(data!=null){
								for(var i=0;i<data.length;i++){
									if(hasRes(div,data[i].id)){
										alertStr+=data[i].resourceName+",";
									}else if(hasRes(otherDiv,data[i].id)){
										alertEleStr+=data[i].resourceName+",";
									}else{
										var a=$("<a>").addClass("delico").attr("title","从列表删除").attr("href","#");
										var text=data[i].resourceName;
										var resType=data[i].resourceType;
										if(resType!=""&&resType=="1"){
											text="[在线课件]"+text;
										}
										if(resType!=""&&resType=="2"){
											text="[在线测试]"+text;
										}
										if(resType!=""&&resType=="3"){
											text="[同步课程]"+text;
										}
										var span=$("<span>").text(text);
										var li=$("<li>").attr("id",data[i].id).append($(a)).append($(span));
										$("#"+div).append($(li));
										$(a).click(function(){$(this).parent("li").remove();});
									}
								}
							}
						}
					});
				}
			}
		  
	  });
	  $(".unAdd").removeClass("unAdd");
	  if(alertStr.length>0){
		  alertStr=alertStr.substring(0, alertStr.length-1)+"已经存在。";
	  }
	  if(alertEleStr.length>0){
		  if(isEle==1){
			  alertEleStr=alertEleStr.substring(0, alertEleStr.length-1)+"已经在必修资源中存在。";
		  }
		  if(isEle==0){
			  alertEleStr=alertEleStr.substring(0, alertEleStr.length-1)+"已经在选修资源中存在。";
		  }
	  }
	  if(alertEleStr.length>0||alertStr.length>0){
		  alert(alertStr+alertEleStr+"不能重复添加！");
	  }
}
/**
 * 删除按钮事件（删除单个资源）
 * @param div 资源显示div 的ul id
 * @param tree 资源树显示DIV的ID
 * @param obj 资源超链接
 */
function delOblRes(div,tree,obj){

	  var id=$(obj).parent().attr("id");
	  if($(obj).parent("li").parent("ul").attr("id")==div){
		  try{
			 $("#"+tree).find("#"+id).show();
		     $("#"+tree).find("#"+id).removeClass("jstree-checked").addClass("jstree-unchecked");
			 if(!$("#"+tree).find("#"+id).hasClass("jstree-leaf")){
				 $("#"+tree).find("#"+id).find("li").removeClass("jstree-checked").addClass("jstree-unchecked");
				 $("#"+tree).find("#"+id).find("li").show();
			}
		  }catch(e){}
	  }
	  $($(obj)).parent().remove();
}
/**
 * 清空按钮事件
 * @param div 清空目标区域的div包含的ul id
 * @param tree 树div 的ID
 */
function delRess(div,tree){
	  $("#"+div).find("li").remove();
	  $("#"+tree).find("li").show();
	  $("#"+tree).find(".jstree-checked").removeClass("jstree-checked").addClass("jstree-unchecked");
}

/**
 * 清空按钮事件
 * @param div 清空目标区域的div包含的ul id
 * @param tree 树div 的ID
 */
function delOblRess(div,tree){
      /*原：$("#"+div).find("li").remove();*/
	  /*kouguanghai 改*/$("#"+div).html(null);
	  $("#"+tree).find("li").each(function(){
				  	if(!$(this).hasClass("unView")){
				  		$(this).show();
					}
				  });
	  $("#"+tree).find(".jstree-checked").removeClass("jstree-checked").addClass("jstree-unchecked");
}
//保存按钮事件
//tdiv 父页面资源显示div的ul id
//sdiv	子页面资源显示div的ul id
//numdiv 资源数量标签 的id
function saveEleRes(tdiv,sdiv,numdiv,filterFun){
	$("#"+tdiv).find("li").remove();
	var childLi=$("#"+sdiv).children("li");
	childLi.each(function(){
		$(this).children("a:first").unbind("click").removeAttr("href").click(function(){
			$(this).parent("li").remove();
			$("#"+numdiv).text($("#"+tdiv).children("li").length);
		});
	});
	if(!!filterFun){
		childLi=filterFun(childLi,tdiv);
	}
	$("#"+tdiv).append(childLi);
	$("#"+numdiv).text($("#"+tdiv).children("li").length);
}

//保存按钮事件
//tdiv 父页面资源显示div的ul id
//sdiv	子页面资源显示div的ul id
//pnumdiv 父页面资源数量标签 的id
//snumdiv 父页面资源数量标签 的id
function saveEleResNum(pdiv,sdiv,pnumId,snumId){
	$("#"+pdiv).html(null);
	var childLi=$("#"+sdiv +" li");
	var num = $("#"+pnumId).html();
	var len = childLi.length;
	var array = new Array();
	for(var i = 0; i<len;i++){
		var a,id,temp,str;
		id  = $(childLi[i]).attr("id");
		temp = $(childLi[i]).children("a:first");
		a = "<a title ='"+ $(temp).attr("title")+"' id='"+$(temp).attr("id")+i+"' class="+$(temp).attr("class")+" onclick="+"delLi('"+$(temp).attr("id")+i+"','"+pnumId+"')></a>";
		str = "<li id='"+id+"'>"+a+"<span>"+$(childLi[i]).children("span").html()+"</span></li>";
	    array.push(str);
	}
	/*childLi.each(function(){
		$(this).removeAttr("onclick").unbind("click").removeAttr("href").click(function(){
			$(this).parent("li").remove();
			if(Number(num)>0){
			  if(Number(num)-1==0){
				  $("#"+pnumId).html(Number(num)-1);
			  }else{
				  $("#"+pnumId).html(null); 
			  }
			}
		});
	});*/
	$("#"+pdiv).html(array.join(""));
	$("#"+pnumId).html($("#"+snumId).html());
}



//保存按钮事件
//tdiv 父页面资源显示div的ul id
//sdiv	子页面资源显示div的ul id
function saveRes(tdiv,sdiv){
	$("#"+tdiv).find("li").remove();
	$("#"+tdiv).append(
			$("#"+sdiv).children("li").each(function(){
				$(this).children("a:first").unbind("click").removeAttr("href").click(function(){
					$(this).parent("li").remove();
				});
			})
	);
}
//从父页面读取已经存在的资源显示在子页面 
//tree包含树的div id
//sdiv父页面资源显示域div下的ULID
//tdiv子页面资源显示域div下的ULid
function toAddRes(tree,sdiv,tdiv,hasres){ 
	$("#"+tree).find("li").each(function(){
		var note=this;
		$("#"+sdiv).find("li").each(function(){
			if($(this).attr("id")==$(note).attr("id")){
				if($(note).hasClass("jstree-leaf")){
					var a=$("<a>").addClass("delico").attr("title","从列表删除").attr("href","#");
					var text=$(note).children("a").text();
					var span=$("<span>").text(text);
					var li=$("<li>").attr("id",$(note).attr("id")).append($(a)).append($(span));
					$("#"+tdiv).append($(li));
					$(a).click(function(){delOblRes(tdiv,tree,$(a));});
					$(note).removeClass("jstree-unchecked").addClass("jstree-checked");
				}
			}
		});
		$("#"+hasres).find("li").each(function(){
			if($(this).attr("id")==$(note).attr("id")){
				$(note).addClass("unView");
			}
		});
	});
	//将已经存在的资源关联删除事件
	$(".delico").each(function(){
		$(this).click(function(){delOblRes(tdiv,tree,$(this));});
	});
}
function toAddRes2(sdiv,tdiv){

	$("#"+sdiv).find("li").each(function(){
		var a=$("<a>").addClass("delico").attr("title","从列表删除").attr("href","#");
		var text=$(this).children("span").text();
		var span=$("<span>").text(text);
		var li=$("<li>").attr("id",$(this).attr("id")).append($(a)).append($(span));
		$("#"+tdiv).append($(li));
		$(a).click(function(){$(this).parent("li").remove();});
	});
	
	//将已经存在的资源关联删除事件
	$(".delico").each(function(){
		$(this).click(function(){delOblRes(tdiv,$(this));});
	});
}
//从父页面读取已经存在的资源显示在子页面 
//pDiv父页面资源显示域div下的ULID
//cDiv子页面资源显示域div下的ULid
function toAddParentLi(pDiv,cDiv){
	$("#"+pDiv).find("li").each(function(){
		var resID = $(this).attr("id"); 
		var resName = $(this).text(); 
		var a=$("<a>").addClass("delico").attr("title","从列表删除").attr("href","#");
		var span=$("<span>").text(resName);
		var li=$("<li>").attr("id",resID).append($(a)).append($(span));
		$("#"+cDiv).append($(li));
		$(a).click(function(){ $(this).parent("li").remove();});	
		});
	}
//从父页面读取已经存在的资源显示在子页面 
//pDiv父页面资源显示域div下的ULID
//cDiv子页面资源显示域div下的ULid
//nDiv用于计数的DIV---donghansheng
function toAddParentLi(pDiv,cDiv,nDiv){
	$("#"+pDiv).find("li").each(function(){
		var resID = $(this).attr("id"); 
		var resName = $(this).text(); 
		var a=$("<a>").addClass("delico").attr("title","从列表删除").attr("id",resID+"a");
		var span=$("<span>").text(resName);
		var li=$("<li>").attr("id",resID).append($(a)).append($(span));
		$("#"+cDiv).append($(li));
		$(a).click(function(){$('#'+nDiv).html($('#'+nDiv).attr('innerHTML')-1); $(this).parent("li").remove();});	
		});
	}
//resURL处理选中目录资源的url
//resType资源类型如1:在线课件
//ulDIV子页面资源显示域ul下的id
function toAddNotOpenRes(resURL,resType,ulDIV,numLable){
	 var resID ='';
	 $("li .jstree-checked").each(function(){
		 resID = $(this).attr("id")+","+resID;
		 });
	 var sum = 0; //kouguanghai 加
	 $.ajax({
		    type:"post",
			url:resURL+"?resIds="+resID+"&resourceType="+resType,
			dataType:"json",
			async:false,
			success:function(data, textStatus){
				if(data!=null){ 
					sum = createUsersList(data,ulDIV,numLable);
				}
			}
		});
	 return sum;
}


/*通过json拼凑显示
function createUsersList1(json,ulDIV){ 
	var num = json.length;
	for(var i=0;i<num;i++){
		var resID,resourceName,a,span,li,lis;
		resID = json[i].id; 
		resourceName = json[i].resourceName; 
		a=$("<a>").addClass("delico").attr("title","从列表删除").attr("href","#");
		span=$("<span>").text(resourceName);
		li=$("<li>").attr("id",resID).append($(a)).append($(span));
		lis=$("#"+ulDIV).find("#"+resID);
		if($(lis).html()==null){
			$("#"+ulDIV).append($(li));
		}
		$(a).click(function(){ $(this).parent("li").remove();});	
	}
	return 0;
}*/

/*通过json拼凑显示 
 * @param  json，json格式对象
 * @param  ulID 被填充的ul的ID
 * @author　　　kouguanghai
 */
function createUsersList(json,ulID,numLable){ 
	var num = json.length;
	var f = document.createDocumentFragment();
	var ul = document.getElementById(ulID);
	var sum = 0;
	for(var i=0;i<num;i++){
		var resID,resourceName,a,span,li,lis;
		resID = json[i].id; 
		resourceName = json[i].resourceName; 
		if($("#"+resID+"a").attr("title")==null){
			a='<a class="delico" id="'+json[i].id+'a" title="从列表删除" onclick="delLi(\''+json[i].id+'a\',\''+numLable+'\')" ></a>';
			span="<span>"+resourceName+"</span>";
			li = document.createElement("li");
			li.id = resID;
			li.innerHTML = a+span;
			f.appendChild(li);
			sum += 1;
		}
	}
	ul.appendChild(f);
	return sum;
}

/*删除li节点并显示剩余节点数量*/
function delLi(id,numLable){
	$("#"+id).parent("li").remove();
	var num = $("#"+numLable).html();
	if(Number(num)>0){
	  if(Number(num)-1>0){
		  $("#"+numLable).html(Number(num)-1);
	  }else{
		  $("#"+numLable).html(null); 
	  }
	}
}