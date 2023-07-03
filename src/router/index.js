import Vue from "vue";
import Router from "vue-router";

import home from "../page/home";
import login from "../page/login/login";
import main from "../page/main/main";
import student from "../page/student/student";
import score from "../page/score/score";


Vue.use(Router);

export default new Router({
	mode: "history",
	routes: [
		{
		  path:'/',
		  name:'login',
		  component:login,
		  meta:{
			  title:"登录"
		  }
		},
		{
		  path:'/',
		  name:'home',
		  component:home,
		  meta:{
				title:"主页面"
		  },
		  children:[
			  {
			  	path:'/main',
			  	name:'main',
			  	component:main,
			  	meta:{
			  		title:"首页"
			  	}
			  },
			  {
			  	path:'/student',
			  	name:'student',
			  	component:student,
			  	meta:{
			  		title:"学生管理"
			  	}
			  },
			  {
			  	path:'/score',
			  	name:'score',
			  	component:score,
			  	meta:{
			  		title:"成绩管理"
			  	}
			  },
		  ]
		},
	]
});