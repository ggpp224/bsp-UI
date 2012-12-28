/**
 * @author gp
 * @datetime 2012-4-25
 * @description index.js
 */
$(document).ready(function() {
			 var queryUrl = '';
			 var termset={};
			 var school={};
			 var major={};
			 var grade={};
			 var educat={};
			 var queryUrl = 'null/null/null/null/null/null/null/';

			 var currPage=getQuery('page');
			 currPage = currPage || 1;

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

			var educationlevelDom = document.getElementById('form_educationlevel');
			var gradeDom = document.getElementById('form_grade');
			// 层次
			new Combox(educationlevelDom).fill(G_data['educationlevel']);
			// 年级 ，先初始化层次再初始化年级
			new Combox(gradeDom).fill(G_data['grade']);

			$(educationlevelDom).change(function(e){
				var val = this.value;
				var grades = G_data['grade_level'][val];
				var gradeObj = G_data['grade'],ma={};
				for(var i=0,len=grades.length;i<len;i++){
					ma[grades[i]] = gradeObj[grades[i]];
				}
				new Combox(gradeDom).clear().fill(ma);
			});


			$("#form_query").click(function(e){

				var params = Ab.urlDecode(Ab.serializeForm('batch_form'));
				//var school = G_data['school'][$("#form_school").attr("checked","checked").val()];
			//	var major = G_data['major'][$("#form_major").attr("checked","checked").val()];
				//var educationlevel = G_data['educationlevel'][$("#form_educationlevel").attr("checked","checked").val()];
				//var grade = G_data['grade'][$("#form_grade").attr("checked","checked").val()];
				//var grade = G_data['grade'][$("#form_grade").attr("checked","checked").val()];

				getList(1);
			});



			 function getList(page){
				page = (page && page>0)?page=page:page=Math.abs(page);
				var url=G_ROOT+'choosecoursevolunte/querycoursebatch/'+encodeURI(queryUrl)+'/'+G_perpage+'/'+page;
				$.getJSON(url,function(data){
					var list = data.list;
					if(list){
						var html='';
						$.each(list,function(k,v){

							html+='<tr>';
							html+=' <td class="first tc"><input type="checkbox" name="checkall" /></td>';
							html+='<td>'+G_data['school'][v.SCHOOLCODE]+'</td>';
							html+='<td>'+G_data['major'][v.MAJORCODE]+'</td>';
							html+='<td>'+G_data['educationlevel'][v.LEVELCODE]+'</td>';
							html+='<td>'+G_data['grade'][v.GRADECODE]+'</td>';
							html+='<td>'+G_data['stuType'][v.STUDENTTYPE]+'</td>';
							html+='<td>'+G_data['termset'][v.TERMID]+'</td>';
							html+='<td>'+v.CREATETIME+'</td>';
							html+='<td>'+G_data['status'][v.STATUS]+'</td>';
							html+='<td>'+v.APPROVETIME+'</td>';
							html+='<td>'+v.APPROVER+'</td>';
							html+='<td>'+v.APPROVECOMMEND+'</td>';

							html+='<td><a href="#">编辑</a></td>';
							html+='</tr>';
						})
						$('#js_course_tbody').html(html);

						$('#pageShow').html(gPage(data.rCount,page,'getList'));
					}
				});
			 }




		});