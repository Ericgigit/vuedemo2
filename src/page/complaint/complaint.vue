<template>
	<div class="my-outline-border">
		<el-button v-if="user.pPower == average" class="creat-complaint-button" type="primary"
			@click="creatComplaint()">新建投诉</el-button>
		<el-button v-if="user.pPower == average" class="creat-complaint-button" type="primary"
			@click="getList()">查询投诉</el-button>
		<el-button v-if="user.pPower == manager" class="creat-complaint-button" type="primary"
			@click="getList()">所有投诉</el-button>
		<el-button v-if="user.pPower == manager" class="creat-complaint-button" type="primary"
			@click="getUnallocList()">未分配投诉</el-button>
		<el-button v-if="user.pPower == manager" class="creat-complaint-button" type="primary"
			@click="getUncompleteList()">待结案投诉</el-button>

		<!-- <el-table v-loading="loading" :data="suitList" stripe border>
			<el-table-column label="投诉单编号" align="center" prop="sId" />
			<el-table-column label="投诉内容" align="center" prop="submitContext" />
			<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
				<template slot-scope="scope">
					<el-button size="mini" type="text" icon="el-icon-edit"
						@click="submitForm()()">修改</el-button>
					<el-button size="mini" type="text" icon="el-icon-delete"
						@click="submitForm()">删除</el-button>
				</template>
			</el-table-column>
		</el-table> -->


		<el-switch v-model="active_border" active-text="开启边框" style="width: 100%; margin-top: 15px;"></el-switch>

		<el-divider></el-divider>
		<div v-for="(item,index) in suitList" v-bind:key="index" v-loading="loading">
			<el-descriptions class="margin-top" :title="description_title+item.sId" :column="2" :border=active_border>

				<template slot="extra">
					<el-select v-if="user.pPower == manager" v-model="item.dealId" clearable placeholder="分配处理人员" style="margin-right: 10px;">
						<el-option v-for="deal in options" :key="deal.value" :label="deal.label" :value="deal.value">
						</el-option>
					</el-select>
					<el-button v-if="user.pPower == manager" type="primary" size="small" @click="confirmAlloc(item.sId,item.dealId)">分配</el-button>
					
					<el-button type="primary" size="small" @click="undoSuitButton(item.sId)">撤回投诉</el-button>
				</template>
				
				<el-descriptions-item label="投诉人ID">{{item.submitId}}</el-descriptions-item>
				<el-descriptions-item label="手机号">{{item.submitId}}</el-descriptions-item>
				<el-descriptions-item label="备注">
					<el-tag size="small">游客</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="投诉内容">{{item.submitContext}}</el-descriptions-item>
			</el-descriptions>
			<el-steps :space="200" :active="item.state" finish-status="success" style="margin-top: 15px;">
				<el-step title="已提交"></el-step>
				<el-step title="分配处理人员"></el-step>
				<el-step title="处理投诉"></el-step>
				<el-step title="评价"></el-step>
				<el-step title="已结案"></el-step>
			</el-steps>
			<el-divider></el-divider>
		</div>

		<!-- 分页组件 -->
		<el-pagination class="my-pagination-style" background layout="prev, pager, next"
			:current-page="queryParams.page" :page-size="queryParams.limit" :total="total"
			@current-change="currentChange" @prev-click="prevClick" @next-click="nextClick">
		</el-pagination>


		<!-- 投诉表单 -->
		<el-dialog class="register-panel" :title="title" :visible.sync="open" width="500px" append-to-body>
			<el-form :model="suit_form" :rules="rules" ref="suit_form" label-width="100px" class="demo-suit-form">
				<el-form-item label="投诉内容" prop="submitcontext">
					<el-input type="textarea" v-model="suit_form.submitContext"></el-input>
				</el-form-item>

				<el-form-item label="投诉评分">
					<el-rate v-model="value" show-text style="margin-top: 10px;">
					</el-rate>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm()">立即提交</el-button>
					<el-button @click="resetForm()">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

	</div>
</template>

<script>
	import {
		submitSuitForm,
		querySuitByPage,
		undoSuit,
		allocSuit,
	} from '@/api/getData.js';
	import {
		getStorage,
	} from "@/utils/localStorage.js";
	export default {
		data() {
			return {
				options: [{
					value: 4,
					label: '黄金糕'
				}, {
					value: 5,
					label: '双皮奶'
				}],
				deal_value: '',
				
				manager: 3,
				dealer: 2,
				average: 1,

				// 遮罩层
				loading: true,
				// 学生表格数据
				suitList: [],
				// 查询参数
				queryParams: {
					page: 1,
					limit: 3,
					submitId: null,
					state: null,
					dealId: null,
				},
				//总条数
				total: 0,
				description_title: "投诉单编号 ",
				active_border: true,


				// 表单参数
				title: "",
				open: false,
				value: 2,
				suit_form: {
					submitId: null,
					submitContext: "",
					submitIma: null,
					submitVideo: null,
					state: 1,
				},

				rules: {
					submitContext: [{
						required: true,
						message: '请填写投诉内容',
						trigger: 'blur'
					}]
				},

				user: {
					birth: "",
					pId: null,
					pName: "",
					pPhone: "",
					pPower: null,
					password: '',
				},
			};
		},
		methods: {
			creatComplaint() {
				this.open = true;
				this.title = "新建投诉";
				this.suit_form.submitId = this.user.pId;
			},
			submitForm() {
				this.$refs["suit_form"].validate(valid => {
					if (valid) {
						console.log(this.suit_form);
						submitSuitForm(this.suit_form).then(res => {
							console.log(res);
							this.$message.success('新增成功');
							this.open = false;
							this.getList();
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm() {
				this.$refs["suit_form"].resetFields();
			},
			//撤回投诉
			undoSuitButton(suitId) {
				this.$confirm('请问是否撤回投诉', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let suit = {
						sid: suitId
					};
					//发送请求撤回投诉
					undoSuit(suit).then(res => {
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
			/** 查询学生列表 */
			getList() {
				this.loading = true;
				if (this.user.pPower == 1) {
					this.queryParams.submitId = this.user.pId;
				} else if (this.user.pPower == 2) {
					this.queryParams.state = 2;
					this.queryParams.dealId = this.user.pId;
				} else if (this.user.pPower == 3) {
					this.queryParams.state = null;
				}

				console.log(this.queryParams);
				querySuitByPage(this.queryParams).then(response => {
					this.suitList = response.datas;
					console.log(response.datas);
					this.total = response.total;
					this.loading = false;
				});
			},
			getUnallocList() {
				this.queryParams.state = 1;
				querySuitByPage(this.queryParams).then(response => {
					this.suitList = response.datas;
					console.log(response.datas);
					this.total = response.total;
					this.loading = false;
				});
			},
			getUncompleteList() {
				this.queryParams.state = 4;
				querySuitByPage(this.queryParams).then(response => {
					this.suitList = response.datas;
					console.log(response.datas);
					this.total = response.total;
					this.loading = false;
				});
			},
			confirmAlloc(suitId,dealid){
				let suit = {
					sid: suitId,
					dealId: dealid,
					state: 2,
				}
				console.log(suit);
				allocSuit(suit).then(res => {
					if (res != -1) {
						//提示
						this.$message.success("分配成功");
					} else {
						this.$message.success("分配失败");
					}
					this.getList();
				});
			}
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
		margin-left: 15px;
		margin-top: 15px;
		margin-right: 15px;
		margin-bottom: 15px;
	}
</style>