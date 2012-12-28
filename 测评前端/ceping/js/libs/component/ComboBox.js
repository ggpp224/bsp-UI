/**
 * @author gp
 * @datetime 2012-8-6
 * @description Combox.js
 */
 
 Ab.define('Ab.view.ComboBox',{
 	tagName:'select',
 	className:'x-combobox',
 	initialize: function(cfg){
 		var cfg = cfg||{};
 		Ab.apply(this,cfg);	
 		
 		if(this.autoRender){
 			this.render();
 		}
 	},
 	
 	tpl: new Ab.XTemplate(
 		'<tpl for=".">',
 		'	<option value="{value}">{text}</option>',
 		'</tpl>'
 	),
 	
 	render:function(con){
 		var con = con||this.renderTo||''
		if(Ab.isString(con)){
 			con = Dom(con)
 		}
 		var data = this.data||[];
 		if(this.defaultOption){
 			data.unshift(this.defaultOption);
 		}
 		this.tpl.append(this.el,data);
 		$('#'+this.renderTo).append(this.el);
 		var me = this;
 		$(this.el).change(function(e){
 			me.trigger('change',e,me);
 		})
 		
 	},
 	
 	/**
 	 * 设置默认第一位显示
 	 * @param {} key value值
 	 */
 	//@public
 	setDefault: function(key){
 		this.el.value=key;
 	},
 	
 	/**
 	 * 获取当前选中值
 	 * @return {}
 	 */
 	//@public
 	getValue: function(){
 		return this.el.value;
 	},
 	
 	/**
 	 * 获取当前选中文本
 	 */
 	//@public
 	getText:function(){
 		var sel = this.el;
 		return sel.options[sel.selectedIndex].text;
 	},
 	
 	/**
 	 * 添加新的项
 	 * @param {Array} data
 	 */
 	//@public
 	add:function(data){
 		var sel = this.el;
 		 for(var i=0,len=data.length;i<len;i++){
             sel.options.add(new Option(data[i].value, data[i].text));
        }

 	},
 	
 	/**
 	 * 清空所有项
 	 */
 	//@public
 	clear: function(){
 		var sel = this.el;
 		while(sel.options.length>0){
	           sel.options.remove(0);
	    }

 	}
 	
 	
 	
 });
 
 var ComboBox = Ab.view.ComboBox; 