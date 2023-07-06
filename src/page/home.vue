<template>
	<div style="width: 100%">
		<!-- <el-container>
			<el-header style="padding: 0px;">
				<el-menu :default-active="activeIndex" :unique-opened=true class="el-menu-demo" mode="horizontal"
					@select="handleSelect" background-color="#ffffff" text-color="#7f7f7f" active-text-color="#23405d"
					:router="true">

					<img class="el-menu-item logo" :src="require('@/assets/cqu_logo2.png')" alt="cqu_logo">


					<span class="el-menu-item system-title">校园管理系统</span>
					<el-menu-item v-for="(item, index) in userMenu" :key="index" :index="item.path"
					style="border: none;">
						<i :class="item.icon"></i> {{item.title}}</el-menu-item>

					<span class="el-menu-item header-welcome" @click="loginOut"><i class="el-icon-circle-close"></i>
						退出登录</span>
					<span class="el-menu-item header-welcome">欢迎您{{userInfo.username}},
						{{userInfo.userType == 1 ? "同学" : "老师"}}您好</span>
				</el-menu>
			</el-header>
		</el-container> -->
		
		<div class="content">
			<!-- 侧边栏 -->
			<el-col class="col-menu-main" style="width: 220px; background-color: transparent;">
				<!-- 			<h5 style="text-align: center;">自定义颜色</h5> -->
				<el-menu :default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
					background-color="#2a4d70" text-color="#fff"  active-text-color="#ffd04b" 
					style="margin-top: 20px; margin-left: 15px; margin-right: 15px;
					box-shadow: 0px 2px 8px 8px rgba(104, 105, 106, 0.3);">
					<el-menu-item :index="0" @click="goToPage('main')"
						style="display: flex; flex-direction: column; text-align: center; height: 105px;">
						<img class="col-menu-logo" :src="require('@/assets/logo5.png')">
						<div style="line-height: 100%; font-size: 16px; font-weight: 500;">游客服务系统</div>
					</el-menu-item>
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>导航一</span>
						</template>
						<el-menu-item-group style="width: 100px;">
							<template slot="title">分组一</template>
							<el-menu-item index="1-1">选项1</el-menu-item>
							<el-menu-item index="1-2">选项2</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="分组2">
							<el-menu-item index="1-3">选项3</el-menu-item>
						</el-menu-item-group>
						<el-submenu index="1-4">
							<template slot="title">选项4</template>
							<el-menu-item index="1-4-1">选项1</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-menu-item index="2" @click="goToPage('student')">
						<i class="el-icon-menu"></i>
						<span slot="title">导航二</span>
					</el-menu-item>
					<el-menu-item index="3" disabled>
						<i class="el-icon-document"></i>
						<span slot="title">导航三</span>
					</el-menu-item>
					<el-menu-item v-if="user.pPower == average" index="4" @click="goToPage('complaint')">
						<i class="el-icon-receiving"></i>
						<span slot="title">投诉</span>
					</el-menu-item>
					
					<el-menu-item v-if="user.pPower == manager" index="4" @click="goToPage('complaint')">
						<i class="el-icon-receiving"></i>
						<span slot="title">投诉审批</span>
					</el-menu-item>
					
					<el-menu-item v-if="user.pPower == dealer" index="4" @click="goToPage('complaint')">
						<i class="el-icon-receiving"></i>
						<span slot="title">投诉处理</span>
					</el-menu-item>
					
					<el-menu-item index="6"
						style="display: flex; flex-direction: row; text-align: center; height: 60px;">
						<img class="col-menu-avatar" :src="require('@/assets/background/background_2.png')">
						<!-- <img class="col-menu-avatar" :src="require('@/assets/logo4.png')"> -->
						<div style="line-height: 60px; margin-left: 10px;">{{user.pName}}</div>
					</el-menu-item>
					<el-menu-item index="7">
						<i class="el-icon-setting"></i>
						<span slot="title">设置</span>
					</el-menu-item>
					<el-menu-item index="8" @click="loginOut()">
						<i class="el-icon-circle-close"></i>
						<span slot="title">退出登录</span>
					</el-menu-item>
				</el-menu>
			</el-col>

			<el-main style="min-width: 100%;padding: 0px;">
				<router-view></router-view>
			</el-main>

		</div>



	</div>
</template>

<script>
	import {
		loginOut
	} from '@/api/getData.js';
	import {
		setStorage,
		getStorage,
		removeStorage
	} from "@/utils/localStorage.js";
	export default {
		data() {
			return {
				manager: 3,
				dealer: 2,
				average: 1,
				
				activeIndex: "/main",
				userInfo: {
					userType: null,
					username: "",
				}, //用户具体信息
				userMenu: [], //用户的菜单数组
				
				user: {
					birth: "",
					pId: null,
					pName: "",
					pPhone: "",
					pPower: null,
					password: '',
				},
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			goToPage: function(str){
				this.$router.push('/' + str);
			},
			//退出登录
			loginOut() {
				this.$confirm('请问是否退出登录', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//发送请求退出登录
					loginOut().then(res => {
						if (res != -1) {
							//删除缓存
							removeStorage("user");
							//返回登录页面
							this.$router.push({
								name: "login"
							});
							//提示
							this.$message.success("退出系统");
						}
					})
				}).catch(() => {

				});
			},
			
			//在缓存获取用户信息
			getUserInfo() {
				//获取用户信息
				let user = JSON.parse(getStorage("user"));
				console.log(user);
				this.user = user;
			}

		},
		mounted() {
			this.goToPage('main');
			this.$nextTick(function() {
				// 仅在整个视图都被渲染之后才会运行的代码
				this.getUserInfo();
			});
		},

	}
</script>

<style>
	html {
		height: 100%;
	}

	.content {
		height: 100%;
		display: grid;
		grid-template-columns: 235px 1fr;
	}

	.logo {
		text-align: left;
		padding: 0;
		width: 85px;
		height: 50px;
		object-fit: contain;
	}

	.system-title {
		text-align: center;
		color: #7f7f7f;
		font-size: 22px !important;
		font-weight: bolder;
		width: 200px;
	}

	/* .logo:hover,
	.system-title:hover,
	.header-welcome:hover {
		background-color: #23405d !important;
	}

	.logo:focus,
	.system-title:focus,
	.header-welcome:focus {
		background-color: #2a4d70 !important;
	} */

	.header-welcome,
	.header-loginOut {
		text-align: center;
		color: #7f7f7f;
		float: right !important;
	}

	.el-menu.el-menu-demo.el-menu--horizontal {
		border: none;
	}

	.el-menu.el-menu-vertical-demo {
		border-radius: 15px;
		border: none;
	}

	li.el-menu-item,
	div.el-submenu__title {
		border-radius: 15px;
		line-height: 56px;
	}

	li.el-submenu .el-menu-item {
		min-width: 190px;
	}

	.col-menu-logo {
		height: 60px;
		width: auto;
		object-fit: contain;
		margin-top: 6px;
		margin-bottom: 5%;
	}

	.col-menu-avatar {
		height: 40px;
		width: 40px;
		border-radius: 20px;
		object-fit: cover;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	li.el-menu-item.is-active
	{
		color: #ffd04b;
	}
	i.el-icon-receiving::before{

	}
</style>