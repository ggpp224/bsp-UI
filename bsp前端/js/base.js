/**
 * @author gp
 * @datetime 2012-4-26
 * @description base.js
 */

Ab = {
	version : '1.0.0'
};

/**
 * 将config中的所有属性复制到obj中
 * 
 * @param {Object}
 *            obj The receiver of the properties
 * @param {Object}
 *            config The source of the properties
 * @param {Object}
 *            defaults A different object that will also be applied for default
 *            values
 * @return {Object} returns obj
 * @member Ab apply
 */
Ab.apply = function(o, c, defaults) {
	// no "this" reference for friendly out of scope calls
	if (defaults) {
		Ab.apply(o, defaults);
	}
	if (o && c && typeof c == 'object') {
		for (var p in c) {
			o[p] = c[p];
		}
	}
	return o;
};

(function() {
	var toString = Object.prototype.toString;
	Ab.apply(Ab, {

		/**
		 * 把config中在obj中不存在的属性，如果obj中存在相同属性则不复制
		 * 
		 * @param {Object}
		 *            obj The receiver of the properties
		 * @param {Object}
		 *            config The source of the properties
		 * @return {Object} returns obj
		 */
		applyIf : function(o, c) {
			if (o) {
				for (var p in c) {
					if (!Ab.isDefined(o[p])) {
						o[p] = c[p];
					}
				}
			}
			return o;
		},
		isObject : function(v){
            return !!v && Object.prototype.toString.call(v) === '[object Object]';
        },
		 isString : function(v){
            return typeof v === 'string';
        },

        /**
         * Returns true if the passed value is a boolean.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isBoolean : function(v){
            return typeof v === 'boolean';
        },

		isDefined : function(v) {
			return typeof v !== 'undefined';
		},
		
		isArray : function(v){
            return toString.apply(v) === '[object Array]';
        },
        
        isEmpty : function(v, allowBlank){
            return v === null || v === undefined || (!allowBlank ? v === '' : false);
        },
        
        
        
        isNumber : function(v){
            return typeof v === 'number' && isFinite(v);
        },
        isDate : function(v){
            return toString.apply(v) === '[object Date]';
        },
        
         isPrimitive : function(v){
            return Ab.isString(v) || Ab.isNumber(v) || Ab.isBoolean(v);
        },
       
		
        /**
         * 将表单中数据序列化成url连接符格式
         */
		serializeForm : function(form) {
			var fElements = form.elements || document.forms[form].elements;
			var hasSubmit = false, encoder = encodeURIComponent, name, data = '', type, hasValue;
			for (var i = 0, len = fElements.length; i < len; i++) {
				var element = fElements[i];
				name = element.name;
				type = element.type;

				if (name) {
					if (/select-(one|multiple)/i.test(type)) {
						var opts = element.options;
						var resetFlag = false;
						var getData=function(opt){
							if(!opt){return '';}
							hasValue = opt.hasAttribute ? opt
										.hasAttribute('value') : opt
										.getAttributeNode('value').specified;
								data += encoder(name)
										+ "="
										+ encoder(hasValue
												? opt.value
												: opt.text) + "&";
						};
						for (var j = 0, olen = opts.length; j < olen; j++) {
							var opt = opts[j];
							if (opt.selected) {
								resetFlag=true;
								getData(opt);
							}
						}
						//解决IE下重置表单后，select默认项selected 为false
						if(!resetFlag){
							var opt = opts[0];
							getData(opt);
						}
					} else if (!(/file|undefined|reset|button/i.test(type))) {
						if (!(/radio|checkbox/i.test(type) && !element.checked)
								&& !(type == 'submit' && hasSubmit)) {
							data += encoder(name) + '='
									+ encoder(element.value) + '&';
							hasSubmit = /submit/i.test(type);
						}
					}
				}
			}

			return data.substr(0, data.length - 1);
		},
		
		/**
		 * 
		 */
		 urlDecode : function(string, overwrite){
            if(Ab.isEmpty(string)){
                return {};
            }
            var obj = {},
                pairs = string.split('&'),
                d = decodeURIComponent,
                name,
                value;
                
            for(var i=0,len=pairs.length;i<len;i++){
            	var pair = pairs[i];
            	pair = pair.split('=');
                name = d(pair[0]);
                value = d(pair[1]);
                obj[name] = overwrite || !obj[name] ? value :
                            [].concat(obj[name]).concat(value);
            }
            
            return obj;
        }


	});

})();


/////////////////////////
		//类库//
////////////////////////

/**
 * 操作select标签
 * @param {} dom
 */
function Combox(sel){
	this.el = sel;
}
Combox.prototype = {
	/**
	 * @param {Object} param : key ,value字段名,列表数据data 
	 * @description 插入新的
	 */
	fill: function(data){
		for(var key in data){
			this.el.options.add(new Option(data[key], key));
		}
		
		return this;
	},
	
	fillDefault: function(opt){
		var opt = opt||{};
		var txt = opt.defText||'全部';
		this.el.options.add(new Option(txt, 'null'));
		return this;
	},
	
	clear: function(){
		var el = this.el;
		while(el.options.length>0){
                el.options.remove(0);
        }
        
        return this;

	}
};

/**
 * 操作json 
 */
Ab.JSON = new (function(){
    var useHasOwn = !!{}.hasOwnProperty,
        isNative = function() {
             return false;
           
        }(),
        pad = function(n) {
            return n < 10 ? "0" + n : n;
        },
        doDecode = function(json){
            return json ? eval("(" + json + ")") : "";   
        },
        doEncode = function(o){
            if(!Ab.isDefined(o) || o === null){
                return "null";
            }else if(Ab.isArray(o)){
                return encodeArray(o);
            }else if(Ab.isDate(o)){
                return Ab.JSON.encodeDate(o);
            }else if(Ab.isString(o)){
                return encodeString(o);
            }else if(typeof o == "number"){
                //don't use isNumber here, since finite checks happen inside isNumber
                return isFinite(o) ? String(o) : "null";
            }else if(Ab.isBoolean(o)){
                return String(o);
            }else {
                var a = ["{"], b, i, v;
                for (i in o) {
                    // don't encode DOM objects
                    if(!o.getElementsByTagName){
                        if(!useHasOwn || o.hasOwnProperty(i)) {
                            v = o[i];
                            switch (typeof v) {
                            case "undefined":
                            case "function":
                            case "unknown":
                                break;
                            default:
                                if(b){
                                    a.push(',');
                                }
                                a.push(doEncode(i), ":",
                                        v === null ? "null" : doEncode(v));
                                b = true;
                            }
                        }
                    }
                }
                a.push("}");
                return a.join("");
            }   
        },
        m = {
            "\b": '\\b',
            "\t": '\\t',
            "\n": '\\n',
            "\f": '\\f',
            "\r": '\\r',
            '"' : '\\"',
            "\\": '\\\\'
        },
        encodeString = function(s){
            if (/["\\\x00-\x1f]/.test(s)) {
                return '"' + s.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                    var c = m[b];
                    if(c){
                        return c;
                    }
                    c = b.charCodeAt();
                    return "\\u00" +
                        Math.floor(c / 16).toString(16) +
                        (c % 16).toString(16);
                }) + '"';
            }
            return '"' + s + '"';
        },
        encodeArray = function(o){
            var a = ["["], b, i, l = o.length, v;
                for (i = 0; i < l; i += 1) {
                    v = o[i];
                    switch (typeof v) {
                        case "undefined":
                        case "function":
                        case "unknown":
                            break;
                        default:
                            if (b) {
                                a.push(',');
                            }
                            a.push(v === null ? "null" : Ab.JSON.encode(v));
                            b = true;
                    }
                }
                a.push("]");
                return a.join("");
        };

    /**
     * <p>Encodes a Date. This returns the actual string which is inserted into the JSON string as the literal expression.
     * <b>The returned value includes enclosing double quotation marks.</b></p>
     * <p>The default return format is "yyyy-mm-ddThh:mm:ss".</p>
     * <p>To override this:</p><pre><code>
Ext.util.JSON.encodeDate = function(d) {
    return d.format('"Y-m-d"');
};
</code></pre>
     * @param {Date} d The Date to encode
     * @return {String} The string literal to use in a JSON string.
     */
    this.encodeDate = function(o){
        return '"' + o.getFullYear() + "-" +
                pad(o.getMonth() + 1) + "-" +
                pad(o.getDate()) + "T" +
                pad(o.getHours()) + ":" +
                pad(o.getMinutes()) + ":" +
                pad(o.getSeconds()) + '"';
    };

    /**
     * Encodes an Object, Array or other value
     * @param {Mixed} o The variable to encode
     * @return {String} The JSON string
     */
    this.encode = function() {
        var ec;
        return function(o) {
            if (!ec) {
                // setup encoding function on first access
                ec = isNative ? JSON.stringify : doEncode;
            }
            return ec(o);
        };
    }();


    /**
     * Decodes (parses) a JSON string to an object. If the JSON is invalid, this function throws a SyntaxError unless the safe option is set.
     * @param {String} json The JSON string
     * @return {Object} The resulting object
     */
    this.decode = function() {
        var dc;
        return function(json) {
            if (!dc) {
                // setup decoding function on first access
                dc = isNative ? JSON.parse : doDecode;
            }
            return dc(json);
        };
    }();

})();
/**
* Shorthand for {@link Ext.util.JSON#encode}
* @param {Mixed} o The variable to encode
* @return {String} The JSON string
* @member Ext
* @method encode
*/
Ab.encode = Ab.JSON.encode;
/**
* Shorthand for {@link Ext.util.JSON#decode}
* @param {String} json The JSON string
* @param {Boolean} safe (optional) Whether to return null or throw an exception if the JSON is invalid.
* @return {Object} The resulting object
* @member Ext
* @method decode
*/
Ab.decode = Ab.JSON.decode;

