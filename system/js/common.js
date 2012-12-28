/**
 * @author biny
 * 通用函数库
 */
//判断是否有className 
function hasClass(element, className) {     
	var reg = new RegExp('(\\s|^)'+className+'(\\s|$)');     
	return element.className.match(reg); 
} 
//添加className
function addClass(element, className) {    
	if (!this.hasClass(element, className)){         
		element.className += " "+className;  
	} 
}  
//删除className
function removeClass(element, className) {     
	if (hasClass(element, className)){         
		var reg = new RegExp('(\\s|^)'+className+'(\\s|$)');         
		element.className = element.className.replace(reg,' ');     
	} 
}
//绑定事件函数
function addEventHandler(oTarget,sEventType,fnHandler){
	if(oTarget.addEventListener){
		oTarget.addEventListener(sEventType,fnHandler,false);
	}else if(oTarget.attachEvent){		
		oTarget.attachEvent("on"+sEventType,fnHandler);		
	}else{
		oTarget["on"+sEventType] = fnHandler;
	}	
};
//删除事件处理函数
function removeEventHandler(oTarget,sVentType,fnHandler){
	if(oTarget.addEventListener){//支持Dom的浏览器
		oTarget.addEventListener(sEventType,fnHandler,false);
	}else if(oTarget.attachEvent){//IE浏览器
		oTarget.attachEvent("on"+sEventType,fnHandler);		
	}else{
		oTarget["on"+sEventType] = null;
	}		
};	
//窗体onload加载函数
function addLoadEvent(func){
	var oldonload=window.onload;	
	if(typeof window.onload!='function'){
		window.onload=func;			
	}else{					
		window.onload=function(){
			oldonload();
			func();						
		}			
	}	
};









