<template>
	<div class="main" :style="mainStyles">
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
				<el-menu :default-active="'main'" class="el-menu-vertical-demo" @select="handleSelect"
					background-color="#2a4d70" text-color="#fff" active-text-color="#ffd04b" style="margin-top: 20px; margin-left: 15px; margin-right: 15px;
					box-shadow: 0px 2px 8px 8px rgba(104, 105, 106, 0.3);">
					<el-menu-item index="main" @click="goToPage('main')"
						style="display: flex; flex-direction: column; text-align: center; height: 105px;">
						<img class="col-menu-logo" :src="require('@/assets/logo5.png')">
						<div style="line-height: 100%; font-size: 16px; font-weight: 500;">游客服务系统</div>
					</el-menu-item>

					<el-menu-item index="1" @click="goToPage('map')">
						<i class="el-icon-map-location"></i>
						<span slot="title">地图</span>
					</el-menu-item>
					<el-menu-item index="2" @click="goToPage('weather')">
						<i class="el-icon-cloudy-and-sunny"></i>
						<span slot="title">天气与路况</span>
					</el-menu-item>
					<el-menu-item index="3" @click="goToPage('student')">
						<i class="el-icon-menu"></i>
						<span slot="title">导航二</span>
					</el-menu-item>
					<el-menu-item index="4" @click="goToPage('hotel')">
						<i class="el-icon-document"></i>
						<span slot="title">酒店</span>
					</el-menu-item>
					<el-menu-item v-if="user.personPower == average" index="5" @click="goToPage('complaint')">
						<i class="el-icon-receiving"></i>
						<span slot="title">投诉</span>
					</el-menu-item>

					<el-menu-item v-if="user.personPower == manager" index="5" @click="goToPage('complaint')">
						<i class="el-icon-receiving"></i>
						<span slot="title">投诉审批</span>
					</el-menu-item>

					<el-menu-item v-if="user.personPower == dealer" index="5" @click="goToPage('complaint')">
						<i class="el-icon-receiving"></i>
						<span slot="title">投诉处理</span>
					</el-menu-item>

					<el-menu-item v-if="user.personPower == '1'" index="emerge" @click="openMsgBox()">
						<i class="el-icon-chat-dot-round"></i>
						<span slot="title">应急消息</span>
						<!-- <el-badge :value="emergeList.length" :max="99" class="item">
						  <div size="small" style="height: 25px;line-height: 25px;width: 67px;">应急消息</div>
						</el-badge> -->
					</el-menu-item>
					<el-menu-item v-if="user.personPower == '4'" index="emerge" @click="goToPage('emerge')">
						<i class="el-icon-chat-dot-round"></i>
						<span slot="title">应急消息发布</span>
					</el-menu-item>
					<el-menu-item v-if="user.personPower == '6'" index="emerge" @click="goToPage('emerge')">
						<i class="el-icon-chat-dot-round"></i>
						<span slot="title">应急消息审批</span>
					</el-menu-item>
					

					<el-menu-item index="7"
						style="display: flex; flex-direction: row; text-align: center; height: 60px;">
						<img class="col-menu-avatar" :src="require('@/assets/background/background_2.png')">
						<!-- <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar> -->
						<!-- <img class="col-menu-avatar" :src="require('@/assets/logo4.png')"> -->
						<div style="line-height: 60px; margin-left: 10px;">{{user.personName}}</div>
					</el-menu-item>
					<el-menu-item index="8">
						<i class="el-icon-setting"></i>
						<span slot="title">设置</span>
					</el-menu-item>
					<el-menu-item index="9" @click="loginOut()">
						<i class="el-icon-circle-close"></i>
						<span slot="title">退出登录</span>
					</el-menu-item>
				</el-menu>
			</el-col>

			<div style="height: 100%;padding: 0;">
				<router-view></router-view>
			</div>

		</div>
		<el-drawer title="应急消息" :visible.sync="drawer" size="40%">
			<div v-for="(item,index) in emergeList" v-bind:key="index" v-loading="loading" style="margin: 22px;">
				<el-descriptions class="margin-top" :title="'应急消息编号 '+item.emergeId" :column="1">
					<el-descriptions-item label="消息内容">{{item.emergeContext}}</el-descriptions-item>
					<el-descriptions-item label="发布人">{{item.publishName}}</el-descriptions-item>
					<el-descriptions-item label="发布时间">{{item.publishTime}}</el-descriptions-item>
				</el-descriptions>

				<el-divider></el-divider>
			</div>
			<!-- 分页组件 -->
			<el-pagination class="my-pagination-style" background layout="prev, pager, next"
				:current-page="queryParams.page" :page-size="queryParams.limit" :total="total"
				@current-change="currentChange" @prev-click="prevClick" @next-click="nextClick">
			</el-pagination>
		</el-drawer>
	</div>
</template>

<script>
	import {
		loginOut,
		queryEmergeByPage
	} from '@/api/getData.js';
	import {
		getStorage,
		removeStorage
	} from "@/utils/localStorage.js";
	export default {
		computed: {
			mainStyles() {
				return {
					height: `${window.innerHeight}px`,
				};
			},
		},
		data() {
			return {
				// 遮罩层
				loading: true,
				// 应急消息列表
				emergeList: [],
				// 查询参数
				queryParams: {
					page: 1,
					limit: 6,
					state: 3,
				},
				//总条数
				total: 0,

				drawer: false,
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
					personId: null,
					personName: "",
					personPhone: "",
					personPower: null,
					password: '',
				},
			}
		},
		methods: {
			openMsgBox() {
				this.drawer = true;
				//发布：4；审批：6
				this.loading = true;

				console.log('queryParams', this.queryParams);
				queryEmergeByPage(this.queryParams).then(response => {
					this.emergeList = response.datas;
					console.log(response.datas);
					this.total = response.total;
					this.loading = false;
				});
			},
			/** 页数发生改变时触发 */
			currentChange(page) {
				console.log("当前页面为：" + page)
				this.queryParams.page = page
				this.getList();
			},

			/** 点击上一页触发 */
			prevClick(page) {
				console.log("点击上一页：" + page)
			},

			/** 点击下一页触发 */
			nextClick(page) {
				console.log("点击下一页：" + page)
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			goToPage: function(str) {
				if (this.$route.path !== '/' + str) { // 检查当前路径是否与目标路径相同
					this.$router.push('/' + str);
				}
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
			// this.goToPage('emerge');
			this.$nextTick(function() {
				// 仅在整个视图都被渲染之后才会运行的代码
				this.getUserInfo();

			});

			if (this.$route.path !== '/main') { // 检查当前路径是否与目标路径相同
				this.$router.push('/main'); // 假设 index="2" 对应的路径是 '/map'
			}
		},

	}
</script>

<style>
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

	li.el-menu-item.is-active {
		color: #ffd04b;
	}

	header#el-drawer__title.el-drawer__header {
		padding-bottom: 15px;
		margin-bottom: 0;
		border-bottom: 1px solid #e4e4e4;
		color: #2a4d70;
		font-weight: 500;
		font-size: 20px;
	}

	.el-descriptions__title {
		color: #606266;
	}

	div.el-step__title.is-process,
	div.el-step__head.is-process {
		color: #779ad0;
		border-color: #5472e0;
	}

	div.el-divider--horizontal {
		margin: 20px 0;
	}
</style>