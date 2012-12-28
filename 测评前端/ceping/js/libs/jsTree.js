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
JsTreeControl.prototype.createWithoutCheckBox=function (thisurl,returnValueName,recallFunc,param){
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
		
						//整理参数，并返回给后台
						var dataParam={};
						for(var i=0;i<returnValueName.length;i++){
							var rval=returnValueName[i];
							var attrVal=$(n).attr(rval);
							var val = attrVal==null || attrVal.length==0?'0':attrVal;
							dataParam[rval]=val;
						}
						if(typeof(param)=='object'){
							jQuery.extend(dataParam, param);
						}
						
						return dataParam;
		
						/**
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
        				**/
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
JsTreeControl.prototype. createWithCheckBoxAndCallBack=function(thisurl,returnValueName,checkboxType,recallFunc,param){

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
						/*
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
	    				*/
						
						//整理参数，并返回给后台
						var dataParam={};
						var num =  returnValueName.length;
						for(var i=0;i< num;i++){
							var rval=returnValueName[i];
							var attrVal=$(n).attr(rval);
							var val = attrVal==null || attrVal.length==0?'0':attrVal;
							dataParam[rval]=val;
						}
						if(typeof(param)=='object'){
							jQuery.extend(dataParam, param);
						
						}
						
						return dataParam;
						
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
	  $("#"+div).find("li").remove();
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
	
	if(!!filterFun){
		childLi=filterFun(childLi,tdiv);
	}
	$("#"+tdiv).append(childLi);
	$("#"+numdiv).text($("#"+tdiv).children("li").length);
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
//resURL处理选中目录资源的url
//resType资源类型如1:在线课件
//ulDIV子页面资源显示域ul下的id
function toAddNotOpenRes(resURL,resType,ulDIV){
	 var resID ='';
	 $("li .jstree-checked").each(function(){
		 resID = $(this).attr("id")+","+resID;
		 });
	 $.ajax({
			type:"post",
			url:resURL+"?resIds="+resID+"&resourceType="+resType,
			dataType:"json",
			async:false,
			success:function(data, textStatus){
				if(data!=null){ 
					createUsersList(data,ulDIV);
				}
			}
		});
}
//通过json拼凑显示
function createUsersList(json,ulDIV){ 
	for(var i=0;i<json.length;i++){
		var resID = json[i].id; 
		var resourceName = json[i].resourceName; 
		var a=$("<a>").addClass("delico").attr("title","从列表删除").attr("href","#");
		var span=$("<span>").text(resourceName);
		var li=$("<li>").attr("id",resID).append($(a)).append($(span));
		if(!hasRes(ulDIV,resID)){
			$("#"+ulDIV).append($(li));
		}
		$(a).click(function(){ $(this).parent("li").remove();});	
	}
}

/*
 * 从主页面中将资源信息添加到从页面中
 * @param sdiv 主页面的资源ul所对应的id
 * @param tdiv 从页面的资源ul所对应的id
 * @param  title 为a标签的title，由于fmt 标签在js中不能很好的解析故加上此标签
 * @author kouguangh 修改
 */
function toAddRes2(sdiv,tdiv,title){
	var sum = 0;
	$("#"+sdiv).find("li").each(function(){
		var a=$("<a>").addClass("delico").attr("title",title).attr("id",$(this).attr("id")+"a");
		var text=$(this).children("span").text();
		var span=$("<span>").text(text);
		var li=$("<li>").attr("id",$(this).attr("id")).append($(a)).append($(span));
		$("#"+tdiv).append($(li));
		//$(a).click(function(){$(this).parent("li").remove();}); kouguanghai注
		sum += 1;
	});
	
	
	//将已经存在的资源关联删除事件kouguanghai注
	 
	/*$(".delico").each(function(){
		$(this).click(function(){delOblRes(tdiv,$(this));});
	});*/
	return sum;
}

/*添加资源到已选 资源框（适用于企业培训实施中新增在线课件分配选择课件资源）
* @param jsobj 树对象
* @param ulId 资源对象存放的ul对应的id值
* @param  title 为a标签的title，由于fmt 标签在js中不能很好的解析故加上此标签
* @author kouguangh 修改
*/

function toAddRes(jsobj,ulId,numLabel,title){
	    var sum = 0;
		var toAppend=function(){
			var allitems=$(checkedItems);
			if($("#resourceType:first").size()>0){
				allitems=allitems.filter("[resourcetype='1']");
			}else{
				allitems=allitems.filter("[resourcetype]");
			}
			var resTypeMps={"1":'<fmt:message key="Enterprise.train.commonInfo.message.info36"/>',"2":'<fmt:message key="Enterprise.train.commonInfo.message.info37" />',"3":'<fmt:message key="Enterprise.train.commonInfo.message.info38" />'};

			var f = document.createDocumentFragment();
			//生成资源项并移动到资源框
			allitems.each(function(){
				var resType=$.trim($(this).attr("resourcetype"));
				var id=$(this).attr("id");
				if($("#"+id+"a").attr("title")==null){
					var span= "<span>"+resTypeMps[resType]+$.trim($("a",this).text())+"</span>";
					var a = '<a class="delico" title="'+title+'" id="'+id+'a"></a>';
					var li = document.createElement("li");
					li.id = id;
					li.innerHTML = a+span;
					f.appendChild(li);
					sum += 1;
				}
			});
			document.getElementById(ulId).appendChild(f);
		};


	    //获取所有选中的项
		var checkedItems=jsobj.jstreeobj.get_checked();
		
		var putjson=[];
		$(checkedItems).each(function(){
			if(!!jsobj.jstreeobj.is_leaf($(this)) ){
				putjson.push($(this));
			}else if(!jsobj.jstreeobj._is_loaded($(this))){
				putjson.push($(this));
			}
			
		});
		var isAllRes=isResByTree(putjson);
		if(!!isAllRes){
			toAppend();
		}else{
			var resoureobjs=[];
			var forderIds =[];
			var resType ="1";
			if($('#selectResType').size()>0){
				resType =$('#selectResType').val();
			}
			
			var destRes={};  //key id, value 元素对象
			
			//从服务器获取数据
			$(putjson).each(function(){
				var thisid=$(this).attr("id");
				var catagrayCode=$(this).attr("categorycode");
				if(!!jsobj.jstreeobj.is_leaf($(this))){
					resoureobjs.push($(this));
				}else{
					forderIds.push([resType,catagrayCode]);
				}
			});

			//var paramJson={'treeForder':$.toJSON(forderIds),'resType':resType}; // key为 id，value 指明是否为文件夹 true 表明是
			$.ajax({
				type:"post",
				url:"/trainimpl/treeAllRes.action",
			    data:'treeForder='+$.toJSON(forderIds)+'&resType='+resType,
			    dataType:'json',
			    async:false,
			    success:function(json){
					//接收到的json格式   [[资源id,资源类型,资源名称],[。。。]]
					if(!json.state){
						alert(json.message);
						return ;
					}
					sum = createUsersList(json.items,ulId,numLabel,title);
			     }
			});
			
		}
		return sum;
}

/**
* 检测节点是否全为资源（适用于企业培训实施中新增在线课件分配选择课件资源）
*/
function isResByTree(ele){
	var eles=[];
	$(ele).each(function(){
		var resele = $(this).filter(".jstree-leaf");
		if(resele.size()>0){
			eles.push(resele);
		}
	});
	return $(ele).size() == $(eles).size();
}



/*通过json拼凑显示 
 * @param  json，json格式对象
 * @param  ulID 被填充的ul的ID
 * @param  numLable 记录已选择的资源数量的label标签id 
 * @param  title 为a标签的title，由于fmt 标签在js中不能很好的解析故加上此标签
 * @author　　　kouguanghai 
 */
function createUsersList(array,ulID,numLabel,title){ 
	var f = document.createDocumentFragment();
	var ul = document.getElementById(ulID);
	var sum = 0;
	var resTypeMps={"1":'<fmt:message key="Enterprise.train.commonInfo.message.info36" />',"2":'<fmt:message key="Enterprise.train.commonInfo.message.info37" />',"3":'<fmt:message key="Enterprise.train.commonInfo.message.info38" />'};
	$.each(array,function(i,n){
		var resID,resourceName,a,span,li;
		resID = n[0]; 
		resourceName = resTypeMps[n[1]]+n[2]; 
		if($("#"+resID+"a").attr("title")==null){
			a='<a class="delico"  title="'+title+'" id="'+resID+'a" ></a>';
			span="<span>"+resourceName+"</span>";
			li = document.createElement("li");
			li.id = resID;
			li.innerHTML = a+span;
			f.appendChild(li);
			sum += 1;
		}
	});
	ul.appendChild(f);
	return sum;
}

