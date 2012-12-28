/**
 * @author gp
 * @datetime 2012-8-10
 * @description knowledgeBox.js
 */
 
 Ambow.define('Ambow.view.KonwledgeBox',{
 	tagName:'div',
 	className:'x-combobox',
 	initialize: function(cfg){
 		var cfg = cfg||{};
 		Ambow.apply(this,cfg);	
 	},
 	
 	tagName:'form',
 	className:'tree',
 	
 	
 	tpl: new Ambow.XTemplate(
		'<div class="exammanage_selectPoint">',
			'<div class="selectnode">',
				'<table width="100%" border="0" cellspacing="0" cellpadding="0">',
				 '<tr>', 
					'<td width="2%" nowrap="nowrap">已选知识点：</td>',
					'<td width="98%"><div id="divtd" class="divtd"></div></td>',
				  '</tr>',
				'</table>',
			'</div>',
			'<div class="y-scroll">',
				'<p class="box-info">请选择目标分类节点</p> ',
				'<div style="height:260px;" id="load_html_data1"></div>',
			'</div>',
			'<div id="selectPoint_list" class="selectPoint_list" >',
				'<div class="exammanage_box">',
				   '<table width="100%" border="0" cellpadding="0" cellspacing="0">',
						'<tr>',
							'<th>知识点名称：</th>',
							'<td align="center"><input type="text" class="default_txt" value="" size="35"/></td>',
							'<td ><input type="button" name="input2" value=" 查询 " class="btn btn_default"/></td>',
						'</tr>',
					'</table>',
					'<div id="query_list" style="height:250px;overflow:auto;"></div>',
				'</div>',
			'</div>',
			'<div class="clear"></div>',
		'</div>',
		'</div><div class="overlay_btn"> <input type="button" id="x-win_sure" value=" 确定 " class="btn btn_submit" name="提交"><input id="x-win_cancle" type="button" value=" 取消 " class="btn btn_reset close">'
 	),
 	
 	render:function(con){
 		var con = con||this.renderTo||'';
		if(Ambow.isString(con)){
 			con = Dom(con)
 		}		
 		this.tpl.append(this.el);
 		$(con).append(this.el);	
 		
 		var url = this.treeUrl;
 		var me = this;
 		var tree = this.tree = new dhtmlXTreeObject({
		    skin: "dhx_skyblue",
		    parent: "load_html_data1",
		    image_path: me.treeImagePath
		  //  checkbox: true
		});
		
		tree._loadDynXML = function(id, src) {
			src = src || this.XMLsource;
			var sn = (new Date()).valueOf();
			this._ld_id = id;
			this.loadXML(src + getUrlSymbol(src) + "uid=" + sn + "&parentId="
					+ this._escape(id));
		};
		tree.insertNewChild(0,G_PARENTID,"知识树",0,0,0,0,"SELECT,CALL,TOP,CHILD"); 

		//从json对象中获取数据生成树
		 tree.setXMLAutoLoading(url);   
		 tree.setDataMode("json");  
		 tree.loadJSON(url+"&parentId="+G_PARENTID+"&a=1&callback=");
		 
		 var list = Ambow.create('Ambow.view.ListView',{
	  		id:'list1',
	 		renderTo:'query_list',
	 		checkboxs:true,
	 		//pager:new Ambow.view.ListPager({pageSize:G_PAGESIZE,totalCountMap:'rCount'}),
	 		store: Ambow.create('Ambow.store.ListStore',{
	 			id:'store12',
	 			url:me.listUrl,
	 			root:'item',
	 			params:{
	 				parentId:"99999999",
	 				companyId:G_COMPANYID,
	 				callback:''
	 			}
	 		}),
	 		columns: [{
	            header: '知识点名称',
	            dataIndex: 'text'
	        }/*,{
	            header: '试题数',
	            dataIndex: 'topicCount'
	        }*/]
	  	});
	  	list.render();
	  	var store = list.store;
	 	store.load();
	 	var tpl=new Ambow.XTemplate(
	 			'<span class="show-td" id="{id}">{text}<a href="#"><i></i></a></span>'
	 		);
	 	var divtd = Dom('divtd');
	 	list.on('checkclick',function(el,idx,e){
	 		var rec = store.at(idx).toJSON();
	 		if(el.checked){
	 			tpl.append(divtd,rec);
	 		}else{
	 			$('#'+rec.id).remove();
	 		}
	 		
	 		
	 		
	 		
	 	});
	 	
	 	list.on('checkallclick',function(el,e){
	 		var remove=function(recs){
	 			$.each(recs,function(idx){
	 				var el = $('#'+this.id);
	 				if(el){
	 					el.remove();
	 				}
	 			});
	 		}
	 		
	 		var add = function(recs){
	 			$.each(recs,function(idx){
	 				tpl.append(divtd,this);
	 			});
	 		}
	 		var recs = store.toJSON();
	 		if(el.checked){
	 			remove(recs);
	 			add(recs);
	 		}else{
	 			remove(recs);
	 		}
	 	});
	 	
	 	tree.attachEvent("onClick", function(id){
	 		store.refresh({params:{
	 				parentId:id,
	 				companyId:G_COMPANYID,
	 				callback:''
	 		}});
			// alert(this.getItemText(id));
		});
		
		$(this.el).find('#x-win_sure').click(function(e){
			me.trigger('save',me,this,e);
		});
		
		$(this.el).find('#x-win_cancle').click(function(e){
			me.trigger('cancle',me,this,e);
		});
 		
 	},
 	
 	//@public 获取选中项的id
 	getIds:function(){
 		var ids =[];
 		var els=$('#divtd').find('span.show-td');
 		$.each(els,function(idx){
 			ids.push($(this).attr('id'));
 		});
 		return ids;
 	},
 	
 	//@public 获取选中项的Text
 	getTexts:function(){
 		var ids =[];
 		var els=$('#divtd').find('span.show-td');
 		$.each(els,function(idx){
 			ids.push($(this).text());
 		});
 		return ids;
 	},
 	
 	//@public 获取选中项的id和text
 	getData: function(){
 		var data =[];
 		var els=$('#divtd').find('span.show-td');
 		$.each(els,function(idx){
 			data.push({id:$(this).attr('id'),text:$(this).text()});
 		});
 		return data;
 	}
 	
 });