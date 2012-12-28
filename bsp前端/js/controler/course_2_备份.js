/**
 * @author wl
 * @datetime 2012-4-25
 * @description course_2.js
 */
		 var queryUrl = '';
			
			 var termset={};
			 var school={};
			 var major={};
			 var grade={};
			 var educat={};
			 var course={};
			 var major_name='';
			 var educationlevel_name='';
			 var grade_name='';
			 var term={};
			 
			 function getList(page,urlpart){
				//page = page || 1;
				var urlpart = urlParams; 
				page = (page && page>0)?page=page:page=Math.abs(page);
				//var url=queryUrl+page+'/'+perpage;
				//var url=G_ROOT+'choosecoursevolunte/querybatch/'+urlpart+page+'/'+perpage;
				var url=G_ROOT+'choosecoursevolunte/querycoursebatch/'+urlpart;
				$.getJSON(url,function(data){
					var data = data.list;
					if(data){
						var html='';
						$.each(data,function(k,v){
							html+='<tr>';
							html+='<td class="first tc"><input type="checkbox" name="checkall" /></td>';
							html+='<td>'+school[v.SCHOOLCODE]+'</td>';
							html+='<td>'+major_name+'</td>';
							html+='<td>'+educationlevel_name+'</td>';
							html+='<td>'+grade_name+'</td>';
							html+='<td>'+stu_type+'</td>';
							html+='<td>'+term[v.TERMID]+'</td>';
							html+='<td>'+term[v.TERMID]+'</td>';
							html+='<td>'+term[v.TERMID]+'</td>';
							//html+='<td>1111</td>';
							html+='</tr>';
						})
						
						$('#js_course_tbody').html(html);
						$('#pageShow').html(gPage(200,page,'getList'));
					}
				});
			 }
			 $(document).ready(function() {
						 
				 	var schoolDom = document.getElementById('form_school');
					var majorDom = document.getElementById('form_major');
					// 学校
					new Combox(schoolDom).fill(G_data['school']);
					// 专业 ，先初始化学校再初始化专业
					new Combox(majorDom).fill(G_data['major']);
					
					$(schoolDom).change(function(e){
						var val = this.value;
						var majors = G_data['school_major'][val];
						var majorObj = G_data['major'],ma={};
						for(var i=0,len=majors.length;i<len;i++){
							ma[majors[i]] = majorObj[majors[i]];
						}
						new Combox(majorDom).clear().fill(ma);
					});
					
									
					// 层次
					var educatDom = document.getElementById('form_educationlevel');
					new Combox(educatDom).fill(G_data['educationlevel']);
					//年级
					var gradeDom = document.getElementById('form_grade');
					new Combox(gradeDom).fill(G_data['grade']);
					$(educatDom).change(function(e){
						var val = this.value;
						var grades = G_data['grade_level'][val];
						var gradeObj = G_data['grade'],ma={};
						for(var i=0,len=grades.length;i<len;i++){
							ma[grade[i]] = gradeObj[grades[i]];
						}
						new Combox(gradeDom).clear().fill(ma);
					});

			
			
					
			$("#form_query").click(function(e){
				urlParams = Ab.urlDecode(Ab.serializeForm('batch_form'));
				major_name=major[$('#form_major').val()];
				educationlevel_name=educat[$("#form_educationlevel").val()];
				grade_name=grade[$("#form_grade").val()];
				stu_type=$("#form_stutype").val();
				
				urlParams='null/null/null/null/null/null/null/1/5';
				//getList(1,"null/null/null/null/"+params.termId+"/"+params.chooseType+"/");
				getList(1);
			});		
			

			     var perpage = 5;
				 var currPage=getQuery('page');
				 currPage = currPage || 1;
				
						
		});