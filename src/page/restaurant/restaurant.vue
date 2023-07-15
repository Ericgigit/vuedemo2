<template>
	<div class="my-outline-border">
		<!-- 列表 开始 -->

		<el-form :model="queryParams" size="small" :inline="true" label-width="68px"
			style="background-color: aliceblue;padding-top: 20px;padding-left: 20px;">

			<el-form-item label="餐厅名称" prop="restaurantName">
				<el-input v-model="queryParams.restaurantName" placeholder="请输入餐厅名称" clearable
					@keyup.enter.native="handleQuery()" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery()">搜索</el-button>
				<el-button icon="el-icon-refresh" size="mini" @click="resetQuery()">重置</el-button>
			</el-form-item>
		</el-form>

		<el-row style="margin-top: 20px;">
			<!-- 循环 -->
			<el-col :span="8" v-for="(item,index) in restaurantList" v-bind:key="index" v-loading="loading">
				<!-- 酒店卡片 -->
				<el-card :body-style="{ padding: '0px' }" style="margin-right: 20px;">
					<img :src="item.restaurantPicture" style="text-align: center;" class="rest_img_box" />

					<!-- 房间信息 -->
					<div style="padding: 20px;">
						<div style="text-align: center;">
							<span>{{item.restaurantName}}</span>
						</div>
						<el-divider>

						</el-divider>
						<div class="bottom clearfix">
							<hotelname class="hotelname">酒店地址:{{item.restaurantSite}}</hotelname>
						</div>
						<div>
							<phone class="phone">联系电话:{{item.restaurantPhone}}</phone>
						</div>

						<div>
							<numberofrooms class="numberofrooms">餐厅标签:{{item.restaurantType}}</numberofrooms>
						</div>

						<el-divider>

						</el-divider>
					</div>
				</el-card>


			</el-col>


		</el-row>

		<!-- 欢迎表单 -->
		<el-dialog class="register-panel1" :title="title" :visible.sync="open" width="500px" append-to-body>
			欢迎您的到来!
		</el-dialog>



	</div>


</template>

<script>
	import {

		queryRestaurantByPage,
	} from '@/api/getData.js';
	import {
		setStorage,
		getStorage,
		removeStorag

	} from "@/utils/localStorage.js";

	export default {
		data() {
			return {

				title: "餐饮查询系统",

				// 餐厅表格数据
				restaurantList: [],


				// 查询参数
				queryParams: {
					restaurantName: '',
					restaurantId: "",
					page: 1,
					limit: 10,
				},


			}
		},
		queryParamsroomSize: 0,
		methods: {

			/** 查询餐厅列表 */
			getList() {
				this.loading = true;
				this.queryParams.restaurantId = "";

				console.log(this.queryParams);
				queryRestaurantByPage(this.queryParams).then(response => {
					this.restaurantList = response.datas;
					console.log(response.datas);
					this.total = response.total;
					this.loading = false;

				});

			},

			handleQuery() {
				this.getList();

			},
			resetQuery() {

				this.queryParams.hotelName = "";
				this.getList();
			},

			getUserInfo() {
				//获取用户信息
				let user = JSON.parse(getStorage("user"));
				console.log(user);
				this.user = user;
			},


		},

		mounted() {

			this.$nextTick(function() {
				// 仅在整个视图都被渲染之后才会运行的代码
				this.getUserInfo();
				this.getList();
			});

		},

	}
</script>

<style>
	.my-outline-border {
		padding: 10px;
	}

	.my-pagination-style {
		margin-top: 10px;
		margin-bottom: 10px;
		float: right;
	}

	.rest_img_box {
		width: 100%;
		height: 250px;
		/* background: url("https://img.zcool.cn/community/01a7cc5d9ecb5aa8012060beec2159.jpg@1280w_1l_2o_100sh.jpg"); */
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		/* text-align: center;
		border:solid bisque; */
	}
</style>