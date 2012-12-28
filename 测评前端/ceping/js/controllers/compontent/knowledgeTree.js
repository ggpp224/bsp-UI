/**
 * @author gp
 * @datetime 2012-8-10
 * @description knowledgeBox.js
 */
 
 Ambow.define('Ambow.view.KonwledgeTree',{
 	
 	initialize: function(cfg){
 		var cfg = cfg||{};
 		Ambow.apply(this,cfg);	
 	},
 	
 	tagName:'div',
 	className:'sidebar boxborder',
 	
 	
 	tpl: new Ambow.XTemplate(
		'<ul class="flowtabs">', 
			'<li class="current"><a href="#">自有课程</a></li>',
            '<li><a href="#">系统课程</a></li>',
        '</ul>',
        '<div style="height: 390px;overflow: auto;width: 200px;" id="x-side-tree">',
	        '<ul class="tree_menu">',
	          '<li><a title="增加目录" class="tree_add_child click_icon" href="#">增加目录</a></li>',
	          '<li><a title="上移" class="tree_up" href="#">上移</a></li>',
	          '<li><a title="下移" class="tree_down" href="#">下移</a></li>',
	          '<li><a title="左移" class="tree_left" href="#">左移</a></li>',
	          '<li><a title="右移" class="tree_right" href="#">右移</a></li>',
	          '<li><a title="编辑" class="tree_edit click_icon" href="#">编辑</a></li>',
	          '<li><a title="删除" class="tree_dell click_icon" href="#">删除</a></li>',
	          '<li><a title="导入目录树" class="tree_imp click_icon" href="#">导入目录树</a></li>',
	        '</ul>',
        '</div>'
	),
 	
 	render:function(con){
 		var con = con||this.renderTo||'';
		if(Ambow.isString(con)){
 			con = Dom(con);
 		}		
 		this.tpl.append(this.el);
 		$(con).append(this.el);	
 		
 		var url = this.treeUrl;
 		var me = this;
 		var tree = this.tree = new dhtmlXTreeObject({
		    skin: "dhx_skyblue",
		    parent: "x-side-tree",
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
 	}
 });