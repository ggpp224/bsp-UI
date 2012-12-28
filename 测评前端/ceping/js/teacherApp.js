/**
 * @author gp
 * @datetime 2012-8-2
 * @description app.js
 */
 
 define('teacherApp',[
		],function(){
 	return {
 		launch: function(){
 			
 			 //获取controler 名称
				function getPageName(){
					var url = location.href;
					var str = url.substring(0,url.lastIndexOf('.html'));
					var arr = str.split('/');
					return [arr[arr.length-1]];
				}
 			
 			require(getPageName(),function(){
 			});
 		}
 	};
 });