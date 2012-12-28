/**
 * @author by biny
 * 本函数是用来设置当前选中项菜单的高亮样式
*/
//根据URL地址的参数或字符串高亮当前菜单。
function hightLightMenu(firstMenuID,twoMenuID){
	var strUrl,strHref,subNavs,strLast,strParentID,strSelfID,parentID,selfID,strID;			
	var Navs=document.getElementById(firstMenuID).getElementsByTagName("a");						
	// 如果链接没有参数，或者URL链接中不存在我们要获取的参数，则返回数组中的序号
	if(location.href.indexOf("?")==-1){
    	strUrl=location.href.substring(location.href.lastIndexOf("/")+1);//取得URL页面名称			
		//一级菜单高亮					
		for (var i = 0; i < Navs.length; i++) {			
			//在IE6,IE7中strHref获得的是全路径，而在IE8和ff中获得的是页面名称，为了兼容，需要将它的字符串进行拆分
			strHref=Navs[i].getAttribute("href").substring(Navs[i].getAttribute("href").lastIndexOf('/')+1);					
			if(strUrl==strHref){
				//高亮当前菜单项						
				addClass(Navs[i],"cur");			
			}
			else{//如果是其它项，则绑定鼠标两态事件							
				(function(i){
					var obj=Navs[i];              
		    		addEventHandler(obj,"mouseover",function(){overMe(obj)});
					addEventHandler(obj,"mouseout",function(){outme(obj)});
				})(i) 							
			}					
		}		
		//二级菜单高亮
		if (document.getElementById(twoMenuID) != null) {//判断是否存在二级菜单	
			//有可能二级菜单不存在，如首页只有一级菜单，所以当菜单id存在时，则...			
			subNavs = document.getElementById("othermenu").getElementsByTagName('a');
			for (var n = 0; n < subNavs.length; n++) {
				hightlight(subNavs,n,0);//默认高亮第一个菜单项				
			}
		}
	}
	else{
		//如果url中带有参数的页面，则...			
		strLast = location.href.substring(location.href.indexOf("?")+1);	
		strParentID=strLast.substring(0,strLast.indexOf("&"));
		strSelfID=strLast.substring(strLast.indexOf("&")+1);	
		parentID=strParentID.substring(strParentID.indexOf("=")+1);//获得第一个参数，这是一级菜单的id
		selfID=strSelfID.substring(strSelfID.indexOf("=")+1);//获得第二个参数，这是二级菜单的id   
		
		//一级菜单高亮	
		for (var i = 0; i < Navs.length; i++) {
			hightlight(Navs,i,parentID);																		
		}
		//二级菜单高亮
		if (document.getElementById(twoMenuID) != null) {//判断是否存在二级菜单			
			subNavs = document.getElementById(twoMenuID).getElementsByTagName('a');
			for (var n = 0; n < subNavs.length; n++) {
				strID=selfID - 1;				
				hightlight(subNavs,n,strID);				
			}
		}
	}		
}
//高亮函数
function hightlight(elementArray,inumber,curMenuIndex){
	if (inumber == curMenuIndex) {		
		addClass(elementArray[inumber],"cur");//高亮当前菜单样式
	}
	else {
		(function(inumber){
			var obj = elementArray[inumber];
			addEventHandler(obj, "mouseover", function(){overMe(obj)});//增加鼠标移上去时的事件
			addEventHandler(obj, "mouseout", function(){outme(obj)});//增加鼠标移走时的事件
		})(inumber)
	}	
}
//鼠标移到A标签上的onmouseover函数
function overMe(obj){	
	addClass(obj,"over");
};
//鼠标移到A标签上的onmouseout函数
function outme(obj){	
	removeClass(obj,"over");
};
//鼠标移到A标签上的onclick函数
function handlerClick(obj){	
	removeEventHandler(obj,"mouseover",function(){handlerOver(obj)});//移出onmouseover函数
	removeEventHandler(obj,"mouseout",function(){handlerOver(obj)});//移出onmouseout函数		
};
//传入两个一级和二级菜单的ID作为参数
addLoadEvent(function(){
	hightLightMenu("menu","othermenu");
});			
			