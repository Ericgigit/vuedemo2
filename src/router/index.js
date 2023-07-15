import Vue from "vue";
import Router from "vue-router";

import home from "../page/home";
import login from "../page/login/login";
import main from "../page/main/main";
import student from "../page/student/student";
import hotel from "../page/hotel/hotel";
import performing from "../page/performing/performing";
import restaurant from "../page/restaurant/restaurant";

import graph from "../page/graph/graph";
import map from "../page/map/map";
import complaint from "../page/complaint/complaint";
import emerge from "../page/emerge/emerge";
import weather from "../page/weather/weather";
import webhome from "../page/webhome/webhome";



Vue.use(Router);

export default new Router({
	mode: "history",
	routes: [
		{
		  path:'/',
		  name:'webhome',
		  component:webhome,
		  meta:{
			  title:"官网"
		  }
		},
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
			  	path:'/map',
			  	name:'map',
			  	component:map,
			  	meta:{
			  		title:"地图"
			  	}
			  },
			  {
			  	path:'/emerge',
			  	name:'emerge',
			  	component:emerge,
			  	meta:{
			  		title:"应急消息"
			  	}
			  },
			  {
			  	path:'/weather',
			  	name:'weather',
			  	component:weather,
			  	meta:{
			  		title:"天气与路况"
			  	}
			  },
			  {
			  	path:'/performing',
			  	name:'performing',
			  	component:performing,
			  	meta:{
			  		title:"演出"
			  	}
			  },
			  {
			  	path:'/restaurant',
			  	name:'restaurant',
			  	component:restaurant,
			  	meta:{
			  		title:"餐厅"
			  	}
			  },
		  ]
		},
	]
});