/**
 * @author gp
 * @datetime 2012-8-2
 * @description app.js
 */
 
 define('App',[
		],function(){
 	return {
 		launch: function(){
 			$.ajaxSetup({
		       timeout:120000,
		       beforeSend : function(xh,opt){
		                 if(opt.type== "GET"){
		                      var url = opt.url;
		                     url += url.match( /\?/) ? "&" : "?";
		                url += "_dc="+ new Date().getTime();
		                opt.url = url;
		                }
		           }
		     });

 			
 			 //获取controler 名称
				function getPageName(){
					var url = location.href;
					var str = url.substring(0,url.lastIndexOf('.shtml'));
					var arr = str.split('/');
					return [arr[arr.length-1]];
				}
 			
 			require(getPageName(),function(){
 			});
 		}
 	};
 });