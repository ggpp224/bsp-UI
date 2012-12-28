// JavaScript Document

				//加载事件  
				  function jiazai()  
				  {  
					  var root = document.getElementById("filter").getElementsByTagName("div");//找出一共有多少行。  
					  for(var i = 0; i < root.length;i++)  
					  {  
						  var tagAs = root[i].getElementsByTagName("a");//每一行中由a标签构成的数组。  
						  tagAs[0].className = 'bgColor';  
					  }  
				  }  
					
				  //a标签的单击事件，改变背景颜色  
				  function aClick(event)  
				  {         
					  var tag = event.srcElement || event.target;//找到单击被点击的元素  
					  var father = tag.parentNode;//找到最近的一个div标签  
					  while(father.nodeName != "DIV")//如果tag的父级标签不是div标签则继续往上找  
					  {  
						  father = father.parentNode;  
					  }  
					  var fatherID = father.id;//找到tag标签最近一个父级div标签的id          
						
					  //将fatherID该div对象下面的所有a标签，将各个a标签的className属性清空  
					  for(var i = 0; i < document.getElementById(fatherID).getElementsByTagName("a").length;i++)  
					  {  
						  document.getElementById(fatherID).getElementsByTagName("a")[i].className = "";  
					  }  
						
					  //为事件源tag对象添加className样式  
					  tag.className = 'bgColor';  
					
					  //alert(fe());  
				  }  
					
				  //遍历所有a标签，根据a标签的className不同来获取用户选中的类型  
				  function fe()  
				  {  
					  var result = ""//记录返回的条件  
					  var root = document.getElementById("filter").getElementsByTagName("a");//获取id为filter标签下面的所有a标签  
					  for(var i = 0; i < root.length;i++)  
					  {  
						  if(root[i].className == 'bgColor')  
						  {  
							  result += root[i].innerHTML;  
						  }  
					  }  
					  return result;  
				  } 