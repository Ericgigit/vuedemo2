<template>
	<div class="my-outline-border">
		<el-button v-if="user.personPower == emerge_publicer" class="creat-complaint-button" type="primary"
			@click="creatEmerge()">新建应急消息</el-button>
		<el-button v-if="user.personPower == emerge_publicer" class="creat-complaint-button" type="primary"
			@click="getList()">查询应急消息</el-button>
		<el-button v-if="user.personPower == emerge_examer" class="creat-complaint-button" type="primary"
			@click="getList()">查看所有</el-button>
		<el-button v-if="user.personPower == emerge_examer" class="creat-complaint-button" type="primary"
			@click="getUnapproveList()">待审批</el-button>

		<!-- 列表 开始 -->
		<el-form :model="queryParams" size="small" :inline="true" label-width="68px" class="my-form-style"
			style="padding-left: 20px;margin-top: 15px;">
			<el-form-item label="发布时间" prop="expireTime">
				<el-date-picker v-model="queryParams.publishTime" type="datetime" placeholder="选择日期时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
				<el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
			</el-form-item>
		</el-form>

		<el-switch v-model="active_border" active-text="开启边框" style="width: 100%; margin-top: 15px;"></el-switch>

		<el-divider></el-divider>
		<div v-for="(item,index) in emergeList" v-bind:key="index" v-loading="loading">
			<el-descriptions class="margin-top" :title="'应急消息编号 '+item.emergeId" :column="2" :border=active_border>

				<template slot="extra">
					<el-button v-if="user.personPower == emerge_examer && item.state != '4'" type="primary" size="small"
						@click="modifyMsg(item)">修改</el-button>
					<el-button v-if="user.personPower == emerge_examer && item.state == '1'" type="primary" size="small"
						@click="confirmApprove(item.emergeId)">审批通过</el-button>

					<el-button type="primary" size="small" @click="deleteEmergeButton(item.emergeId)">撤回应急消息</el-button>
				</template>

				<el-descriptions-item label="发布人">{{item.publishName}}</el-descriptions-item>
				<el-descriptions-item label="发布时间">{{item.publishTime}}</el-descriptions-item>

				<el-descriptions-item label="消息内容">{{item.emergeContext}}</el-descriptions-item>
				<el-descriptions-item label="失效时间">{{item.expireTime}}</el-descriptions-item>
			</el-descriptions>



			<el-steps :space="200" :active="item.state" finish-status="success" simple
				style="margin-top: 10px;background-color: white;">
				<el-step title="已提交"></el-step>
				<el-step title="待审批"></el-step>
				<el-step title="已发布"></el-step>
				<el-step title="已失效"></el-step>
			</el-steps>

			<el-divider></el-divider>
		</div>

		<!-- 分页组件 -->
		<el-pagination class="my-pagination-style" background layout="prev, pager, next"
			:current-page="queryParams.page" :page-size="queryParams.limit" :total="total"
			@current-change="currentChange" @prev-click="prevClick" @next-click="nextClick">
		</el-pagination>


		<!-- 应急消息表单 -->
		<el-dialog class="register-panel" :title="title" :visible.sync="open" width="500px" append-to-body>

			<el-form :rules="rules" :model="emerge_form" ref="emerge_form" label-width="100px">
				<el-form-item label="消息内容" prop="emergeContext">
					<el-input type="textarea" v-model="emerge_form.emergeContext"></el-input>
				</el-form-item>
				<el-form-item label="失效时间" prop="expireTime">
					<el-date-picker v-model="emerge_form.expireTime" type="datetime" placeholder="选择日期时间">
					</el-date-picker>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="submitEmergeFormButton()">立即提交</el-button>
					<el-button @click="resetForm()">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!-- 应急消息表单 -->
		<el-dialog class="register-panel" :title="title" :visible.sync="modify_open" width="500px" append-to-body>

			<el-form :rules="rules2" :model="emerge_form2" ref="emerge_form2" label-width="100px">
				<el-form-item label="消息内容" prop="emergeContext">
					<el-input type="textarea" v-model="emerge_form2.emergeContext"></el-input>
				</el-form-item>
				<el-form-item label="失效时间" prop="expireTime">
					<el-date-picker v-model="emerge_form2.expireTime" type="datetime" placeholder="选择日期时间"
						:clearable="false">
					</el-date-picker>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="modifyEmergeFormButton()">立即提交</el-button>
					<el-button @click="resetForm()">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

	</div>
</template>

<script>
	import {
		submitEmergeForm,
		queryEmergeByPage,
		deleteEmergeMsg,
		approveEmergeMsg,
		submitDealSuitForm,
		modifyEmergeMsg,
	} from '@/api/getData.js';
	import {
		getStorage,
	} from "@/utils/localStorage.js";
	export default {
		data() {
			return {
				dialogVisible: false,
				disabled: false,

				options: [{
					value: 2,
					label: '黄金糕'
				}, {
					value: 4,
					label: '双皮奶'
				}, {
					value: 5,
					label: '烤鸭'
				}, {
					value: 6,
					label: '烤鸭'
				}],

				emerge_publicer: 4,
				emerge_examer: 6,
				average: 1,
				finish_state: 3,
				complete_state: 4,

				// 遮罩层
				loading: true,
				// 应急消息列表
				emergeList: [],
				// 查询参数
				queryParams: {
					page: 1,
					limit: 3,
					publishTime: null,
					expireTime: null,
					publishId: null,
					state: '',
				},
				//总条数
				total: 0,
				active_border: true,
				file: {
					url: "",
				},
				limitNum: 3,

				// 表单参数
				title: "",
				open: false,
				modify_open: false,

				emerge_form: {
					emergeContext: "",
					expireTime: '',
					state: null,
				},
				emerge_form2: {
					emergeContext: "",
					expireTime: '',
					state: null,
				},

				rules: {
					emergeContext: [{
						required: true,
						message: '请填写应急消息内容',
						trigger: 'blur'
					}],
				},
				rules2: {
					emergeContext: [{
						required: true,
						message: '请填写应急消息内容',
						trigger: 'blur'
					}],
				},

				user: {
					birth: "",
					personId: null,
					personName: "",
					personPhone: "",
					personPower: null,
					password: '',
				},
				imageUrl: '',

				// doUpload: this.$http.adornUrl('/sys/dept/upload'),
				carPictureList: [],
			};
		},
		methods: {
			/** 搜索按钮操作 */
			handleQuery() {
				this.queryParams.page = 1;
				this.queryParams.state = '';
				this.getList();
			},
			/** 重置按钮操作 */
			resetQuery() {
				this.queryParams = {
					page: 1,
					limit: 3,
					publishTime: null,
					expireTime: null,
				}
				this.getList();
			},
			//修改应急消息
			modifyMsg(item) {
				this.emerge_form2 = JSON.parse(JSON.stringify(item));
				let publishDateString = this.emerge_form2.publishTime;
				let expireDateString = this.emerge_form2.expireTime;
				let publishDate = new Date(publishDateString);
				let expireDate = new Date(expireDateString);
				this.emerge_form2.publishTime = publishDate;
				this.emerge_form2.expireTime = expireDate;

				console.log("emerge_form2", this.emerge_form2)
				this.modify_open = true;
				this.title = "修改应急消息";

			},
			//提交应急消息
			submitEmergeFormButton() {
				const currentTime = new Date();
				console.log(currentTime);
				// 使用form表单的数据格式
				const params = {
					publishId: this.user.personId,
					emergeContext: this.emerge_form.emergeContext,
					publishTime: currentTime,
					expireTime: this.emerge_form.expireTime,
					state: 1,
				}
				console.log(params);

				this.$refs.emerge_form.validate((valid) => {
					if (valid) {
						// 表单验证通过，执行提交逻辑
						submitEmergeForm(params).then(res => {
							console.log(res);
							this.$message.success('新增成功');
							this.open = false;
							this.getList();
						});
						this.resetForm();
					} else {
						// 表单验证失败，可以进行相应的处理
					}
				});
			},
			modifyEmergeFormButton() {
				// this.$refs.emerge_form.validate((valid) => {
				// 	if (valid) {

				// 	} else {
				// 		// 表单验证失败，可以进行相应的处理
				// 	}
				// });
				console.log(this.emerge_form2);
				// 表单验证通过，执行提交逻辑
				// this.emerge_form2.expireTime = '';
				// this.emerge_form2.publishTime = '';
				modifyEmergeMsg(this.emerge_form2).then(res => {
					console.log(res);
					this.$message.success('修改成功');
					this.modify_open = false;
					this.getList();
				});
				this.resetForm();
			},

			creatEmerge() {
				this.open = true;
				this.title = "新建应急消息";
				this.emerge_form.submitId = this.user.personId;
			},
			resetForm() {
				this.emerge_form.publishId = null;
				this.emerge_form.emergeContext = "";
				this.emerge_form.expireTime = '';
				this.emerge_form.publishTime = '';
			},
			//撤回应急消息
			deleteEmergeButton(Id) {
				this.$confirm('请问是否撤回应急消息', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let parama = {
						emergeId: Id
					};
					console.log(parama);
					//发送请求撤回投诉
					deleteEmergeMsg(parama).then(res => {
						if (res != -1) {
							//提示
							this.$message.success("撤回成功");
						} else {
							this.$message.success("撤回失败");
						}
						this.getList();
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
			/** 查询当前id下发布的应急消息 */
			getList() {
				//发布：4；审批：6
				this.loading = true;
				if (this.user.personPower == 4) {
					this.queryParams.publishId = this.user.personId;
				} else if (this.user.personPower == 6) {
					this.queryParams.state = null;
				}

				console.log(this.queryParams);
				queryEmergeByPage(this.queryParams).then(response => {
					this.emergeList = response.datas;
					console.log(response.datas);
					this.total = response.total;
					this.loading = false;
				});
			},
			//获取待审批消息
			getUnapproveList() {
				this.queryParams.state = 1;
				queryEmergeByPage(this.queryParams).then(response => {
					this.emergeList = response.datas;
					console.log(response.datas);
					this.total = response.total;
					this.loading = false;
				});
			},
			//审批通过
			confirmApprove(Id) {

				this.$confirm('是否确定通过审批', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = {
						emergeId: Id,
						examineId: this.user.personId,
						state: 3,
					}
					console.log(params);
					approveEmergeMsg(params).then(res => {
						if (res != -1) {
							//提示
							this.$message.success("审批通过");
						} else {
							this.$message.success("审批未成功");
						}
						this.getList();
					});
				}).catch(() => {

				});
			},
			//处理投诉
			dealButton(item) {
				this.open_deal = true;
				this.title_deal = "投诉处理";
				this.emerge_form.suitId = item.suitId;
				console.log(this.emerge_form);
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
		padding-top: 20px;
		padding-bottom: 60px;
	}

	.rate-div {
		margin-top: 10px;
		height: 20px;
		display: grid;
		grid-template-columns: 60px 150px 1fr;
	}

	.submit-rate-button:hover {
		background-color: #57b6ff;
	}

	.submit-rate-button {
		width: 50px;
		line-height: 20px;
		color: white;
		text-align: center;
		border-radius: 3px;
		font-size: 13px;
		background-color: #409EFF;
		border: none;
	}

	textarea.el-textarea__inner {
		height: 100%;
	}
</style>