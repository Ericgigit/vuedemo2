<template>
	<div class="my-outline-border">
		<el-button v-if="user.personPower == average" class="creat-complaint-button" type="primary"
			@click="creatComplaint()">新建投诉</el-button>
		<el-button v-if="user.personPower == average" class="creat-complaint-button" type="primary"
			@click="getList()">查询投诉</el-button>
		<el-button v-if="user.personPower == manager" class="creat-complaint-button" type="primary"
			@click="getList()">所有投诉</el-button>
		<el-button v-if="user.personPower == manager" class="creat-complaint-button" type="primary"
			@click="getUnallocList()">未分配投诉</el-button>
		<el-button v-if="user.personPower == manager" class="creat-complaint-button" type="primary"
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
			<el-descriptions class="margin-top" :title="description_title+item.suitId" :column="2"
				:border=active_border>

				<template slot="extra">
					<el-select v-if="user.personPower == manager" v-model="item.dealId" clearable placeholder="分配处理人员"
						style="margin-right: 10px;">
						<el-option v-for="deal in options" :key="deal.value" :label="deal.label" :value="deal.value">
						</el-option>
					</el-select>
					<el-button v-if="user.personPower == manager" type="primary" size="small"
						@click="confirmAlloc(item.suitId,item.dealId)">分配</el-button>
					<el-button v-if="user.personPower == dealer" type="primary" size="small"
						@click="dealButton(item)">处理</el-button>

					<el-button type="primary" size="small" @click="undoSuitButton(item.suitId)">撤回投诉</el-button>
				</template>

				<el-descriptions-item label="投诉人">{{item.submitName}}</el-descriptions-item>
				<el-descriptions-item label="手机号">{{item.submitPhone}}</el-descriptions-item>
				<el-descriptions-item label="备注">
					<el-tag size="small">游客</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="投诉内容">{{item.submitContext}}</el-descriptions-item>
				<el-descriptions-item label="投诉图片">
					<!-- 图片显示区域 -->
					<img v-if="item.submitIma" style="width: auto; height: 80px;"
						:src="'data:image/png;base64,'+item.submitIma" />
				</el-descriptions-item>
				<el-descriptions-item label="投诉视频">
					<!-- 视频预览区域 -->
					<video v-if="item.submitVideo" controls style="width: auto; height: 100px;">
						<source :src="'data:video/mp4;base64,'+item.submitVideo" />
					</video>
				</el-descriptions-item>
			</el-descriptions>


			

			<el-steps :space="200" :active="item.state" finish-status="success" style="margin-top: 15px;">
				<el-step title="已提交"></el-step>
				<el-step title="分配处理人员"></el-step>
				<el-step title="处理投诉"></el-step>
				<el-step title="评价"></el-step>
				<el-step title="已结案"></el-step>
			</el-steps>

			<el-rate v-if="item.state == finish_state" v-model="value" show-text style="margin-top: 10px;"></el-rate>

			<el-divider></el-divider>
		</div>

		<!-- 分页组件 -->
		<el-pagination class="my-pagination-style" background layout="prev, pager, next"
			:current-page="queryParams.page" :page-size="queryParams.limit" :total="total"
			@current-change="currentChange" @prev-click="prevClick" @next-click="nextClick">
		</el-pagination>


		<!-- 投诉表单 -->
		<el-dialog class="register-panel" :title="title" :visible.sync="open" width="500px" append-to-body>

			<el-form ref="importFormRef" :rules="rules" :model="importForm" label-width="130px">
				<el-form-item label="投诉内容" prop="submitcontext">
					<el-input type="textarea" v-model="suit_form.submitContext"></el-input>
				</el-form-item>

				<el-form-item label="上传图片:" prop="excel">
					<el-upload class="upload-demo" ref="upload" action="http://192.168.27.30:8080/suit/upload"
						:http-request="httpRequest" :before-upload="beforeUpload" :on-exceed="handleExceed"
						:on-change="changeCarPicture" :limit="1">
						<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
						<div slot="tip" class="el-upload__tip">上传文件，且不超过5M</div>
					</el-upload>
				</el-form-item>

				<el-form-item label="上传视频:" prop="excel">
					<el-upload class="upload-demo" ref="upload" action="http://192.168.27.30:8080/suit/upload"
						:http-request="httpRequest" :before-upload="beforeUpload" :on-exceed="handleExceed"
						:on-change="changeVideo" :limit="1">
						<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
						<div slot="tip" class="el-upload__tip">上传文件，且不超过5M</div>
					</el-upload>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitImportForm">立即提交</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<!-- 处理表单 -->
		<el-dialog class="register-panel" :title="title_deal" :visible.sync="open_deal" width="500px" append-to-body>
			<el-form :model="suit_form" :rules="rules" ref="suit_form" label-width="100px" class="demo-suit-form">
				<el-form-item label="处理意见" prop="dealContext">
					<el-input type="textarea" v-model="suit_form.dealContext"></el-input>
				</el-form-item>


				<el-form-item>
					<el-button type="primary" @click="submitDealForm()">立即提交</el-button>
					<el-button @click="resetForm()">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

	</div>
</template>

<script>
	import {
		submitSuitForm,
		submitDealSuitForm,
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
				//导入表单数据
				importForm: {
					kgCode: '',
					targetUrl: '',
					suitId: '',
					submitId: '',
				},
				//存放上传文件
				fileList: [],
				Picture: null,
				Video: null,


				imgDecoder: "data:image/png;base64,",
				dialogImageUrl: '',
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
				deal_value: '',

				manager: 3,
				dealer: 2,
				average: 1,
				finish_state: 3,

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
				file: {
					url: "",
				},
				limitNum: 3,

				// 表单参数
				title: "",
				open: false,
				value: 2,
				suit_form: {
					suitId: null,
					submitId: null,
					submitContext: "",
					submitIma: null,
					submitVideo: null,
					state: null,
					dealContext: "",
				},
				// 处理表单
				title_deal: "",
				open_deal: false,

				rules: {
					submitContext: [{
						required: true,
						message: '请填写投诉内容',
						trigger: 'blur'
					}]
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
			changeCarPicture(file) {
				// 图片转成base64上传
				let reader = new FileReader();
				console.log(reader);
				reader.onload = () => {
					let _base64 = reader.result;
					let BASE64 = _base64.split(",");
					this.Picture = BASE64[1]; //赋值
					console.log(this.carPicture);
				};
				reader.readAsDataURL(file.raw);
			},
			changeVideo(file) {
				// 图片转成base64上传
				let reader = new FileReader();
				console.log(reader);
				reader.onload = () => {
					let _base64 = reader.result;
					let BASE64 = _base64.split(",");
					this.Video = BASE64[1]; //赋值
					console.log(this.Video);
				};
				reader.readAsDataURL(file.raw);
			},
			// 覆盖默认的上传行为，可以自定义上传的实现，将上传的文件依次添加到fileList数组中,支持多个文件
			httpRequest(option) {
				this.fileList.push(option)
			},
			// 上传前处理
			beforeUpload(file) {
				let fileSize = file.size
				const FIVE_M = 5 * 1024 * 1024;
				//大于5M，不允许上传
				if (fileSize > FIVE_M) {
					this.$message.error("最大上传5MB")
					return false
				}
				//判断文件类型，必须是xlsx格式
				let types = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4'];
				const isImage = types.includes(file.type);
				if (!isImage) {
					this.$message.error('上传图片只能是 JPG、JPEG、PNG 格式!');
					return false;
				}
				return true
			},
			// 文件数量过多时提醒
			handleExceed() {
				this.$message({
					type: 'error',
					message: '最多支持1个附件上传'
				})
			},
			//导入Excel病种信息数据
			submitImportForm(file) {
				console.log(file);
				// 使用form表单的数据格式
				const params = {
					submitId: this.user.personId,
					submitIma: this.Picture,
					submitVideo: this.Video,
					submitContext: this.suit_form.submitContext,
				}
				console.log(this.fileList);
				// 将上传文件数组依次添加到参数paramsData中
				// this.fileList.forEach((x) => {
				// 	paramsData.append('file', x.file)
				// });
				// // 将输入表单数据添加到params表单中
				// params.append('kgCode', this.importForm.kgCode)
				// params.append('targetUrl', this.importForm.targetUrl)
				// params.append('suitId', this.importForm.suitId)
				// params.append('submitId', this.importForm.submitId)

				submitSuitForm(params).then(res => {
					console.log(res);
					this.$message.success('新增成功');
					this.open = false;
					this.getList();
				});
				//这里根据自己封装的axios来进行调用后端接口
				// this.httpPostWithLoading(paramsData).then(match => {
				// 	if (match.success) {
				// 		this.$message({
				// 			message: "导入成功",
				// 			type: "success"
				// 		})
				// 	} else {
				// 		this.$message({
				// 			message: "导入失败",
				// 			type: "error"
				// 		})
				// 	}
				// 	this.$refs.importFormRef.resetFields() //清除表单信息
				// 	this.$refs.upload.clearFiles() //清空上传列表
				// 	this.fileList = [] //集合清空
				// 	this.dialogVisible1 = false //关闭对话框

				// })
			},

			creatComplaint() {
				this.open = true;
				this.title = "新建投诉";
				this.suit_form.submitId = this.user.personId;
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
			submitDealForm() {
				this.$refs["suit_form"].validate(valid => {
					if (valid) {
						console.log(this.suit_form);
						submitDealSuitForm(this.suit_form).then(res => {
							console.log(res);
							this.$message.success('新增成功');
							this.open_deal = false;
							this.getList();
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},

			//撤回投诉
			undoSuitButton(Id) {
				this.$confirm('请问是否撤回投诉', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let suit = {
						suitId: Id
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
				if (this.user.personPower == 1) {
					this.queryParams.submitId = this.user.personId;
				} else if (this.user.personPower == 2) {
					this.queryParams.state = 2;
					this.queryParams.dealId = this.user.personId;
				} else if (this.user.personPower == 3) {
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
			//确定分配
			confirmAlloc(suitId, dealid) {
				let suit = {
					suitId: suitId,
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
			},
			//处理投诉

			dealButton(item) {
				this.open_deal = true;
				this.title_deal = "投诉处理";
				this.suit_form.suitId = item.suitId;
				// this.suit_form.submitId = item.sId;
				console.log(this.suit_form);
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