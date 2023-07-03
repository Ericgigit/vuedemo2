<template>
	<div style="width: 100%">
		<el-container>
			<el-header style="padding: 0px;">
				<el-menu
				  :default-active="activeIndex"
				  :unique-opened=true
				  class="el-menu-demo"
				  mode="horizontal"
				  @select="handleSelect"
				  background-color="#545c64"
				  text-color="#fff"
				  active-text-color="#ffd04b"
				  :router="true">
					<span class="el-menu-item system-title">校园管理系统</span>
					<el-menu-item v-for="(item, index) in userMenu" :key="index" :index="item.path"><i :class="item.icon"></i> {{item.title}}</el-menu-item>

					<span class="el-menu-item header-welcome" @click="loginOut"><i class="el-icon-s-unfold"></i> 退出登录</span>
					<span class="el-menu-item header-welcome">欢迎您{{userInfo.username}}, {{userInfo.userType == 1 ? "同学" : "老师"}}您好</span>
					
				</el-menu>
			</el-header>
			<el-main style="min-width: 1800px;padding: 0px;">
				<router-view></router-view>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import { loginOut } from '@/api/getStudent.js';
	import { setStorage, getStorage, removeStorage} from "@/utils/localStorage.js";
	export default {
		data() {
			return {
				activeIndex: "/main",
				userInfo: {},//用户具体信息
				userMenu: [],//用户的菜单数组
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			
			//退出登录
			loginOut(){
				this.$confirm('请问是否退出登录', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '点错了',
					type: 'warning'
				}).then(() => {
					//发送请求退出登录
					loginOut().then(res => {
						if(res != -1){
							//删除缓存
							removeStorage("user");
							//返回登录页面
							this.$router.push({name: "login"});
							//提示
							this.$message.success("退出系统");
						}
					})
				}).catch(() => {
					
				});
			},
			//在缓存获取用户信息
			getUserInfo(){
				//获取用户信息
				let user = JSON.parse(getStorage("user"));
				console.log(user)
				this.userInfo = user.user;
				this.userMenu = user.menus;
			}
			
		},
		mounted() {
			this.$nextTick(function () {
			    // 仅在整个视图都被渲染之后才会运行的代码
				this.getUserInfo();
			})
		},
		
	}
</script>

<style>
	 .system-title{
		 text-align: center;
		 color: white !important;
		 font-size: 22px !important;	
		 font-weight: bolder;
		 width: 200px;
	 }
	 .system-title:hover,.header-welcome:hover{
		 background-color: rgb(67,74,80) !important;
	 }
	 .system-title:focus,.header-welcome:focus{
	 		 background-color: rgb(84,92,100) !important;
	 }
	 .header-welcome,.header-loginOut{
		 text-align: center;
		 color: white !important;
		 float: right !important;
	 }
</style>