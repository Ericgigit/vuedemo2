import Vue from "vue";
import Router from "vue-router";

import home from "../page/home";
import login from "../page/login/login";
import main from "../page/main/main";
import student from "../page/student/student";
import hotel from "../page/hotel/hotel";
import graph from "../page/graph/graph";
import score from "../page/score/score";
import complaint from "../page/complaint/complaint";


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
			  	path:'/complaint',
			  	name:'complaint',
			  	component:complaint,
			  	meta:{
			  		title:"投诉"
			  	}
			  },
			  {
			  	path:'/hotel',
			  	name:'hotel',
			  	component:hotel,
			  	meta:{
			  		title:"酒店"
			  	}
			  },
			  {
			  	path:'/graph',
			  	name:'graph',
			  	component:graph,
			  	meta:{
			  		title:"图"
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
		  ]
		},
	]
});