<template>
	<div class="my-outline-border">

		<!-- 列表 开始 -->
		<el-form :model="queryParams" size="small" :inline="true" label-width="68px" class="my-form-style">
			<el-form-item label="姓名" prop="studentName">
				<el-input v-model="queryParams.studentName" placeholder="请输入姓名" clearable
					@keyup.enter.native="handleQuery" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
				<el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
				<el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
			</el-form-item>
		</el-form>

		<el-table v-loading="loading" :data="studentList" stripe border>
			<el-table-column label="主键Id" align="center" prop="studentId" />
			<el-table-column label="姓名" align="center" prop="studentName" />
			<el-table-column label="出生日期" align="center" prop="studentBirth" :formatter="formatDate"/>
			<el-table-column label="年龄" align="center" prop="studentAge" />
			<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
				<template slot-scope="scope">
					<el-button size="mini" type="text" icon="el-icon-edit"
						@click="handleUpdate(scope.row)">修改</el-button>
					<el-button size="mini" type="text" icon="el-icon-delete"
						@click="handleDelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<!-- 分页组件 -->
		<el-pagination
			class="my-pagination-style" background layout="prev, pager, next"
			:current-page="queryParams.page" :page-size="queryParams.limit" :total="total"
			@current-change="currentChange" @prev-click="prevClick" @next-click="nextClick">
		</el-pagination>
		
		<!-- 列表 结束 -->

		<!-- 添加或修改 -->
		<el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
				<el-form-item label="姓名" prop="studentName">
					<el-input v-model="form.studentName" placeholder="请输入姓名" />
				</el-form-item>
				<el-form-item label="年龄" prop="studentAge">
					<el-input v-model="form.studentAge" placeholder="请输入年龄" />
				</el-form-item>
				<el-form-item label="编号" prop="studentNo">
					<el-input v-model="form.studentNo" placeholder="编号" />
				</el-form-item>
				<el-form-item label="地址" prop="studentAddress">
					<el-input v-model="form.studentAddress" placeholder="请输入地址" />
				</el-form-item>
				<el-form-item label="出生日期" prop="studentBirth">
					<el-date-picker clearable v-model="form.studentBirth"  placeholder="请选择出生日期">
					</el-date-picker>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitForm">确 定</el-button>
				<el-button @click="cancel">取 消</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	import {
		listStudent,
		addStudent,
		updateStudent,
		getStudent,
		delStudent
	} from '@/api/getStudent.js';
	export default {
		data() {
			return {
				// 遮罩层
				loading: true,
				// 学生表格数据
				studentList: [],
				// 查询参数
				queryParams: {
					page: 1,
					limit: 10,
					studentName: null,
				},
				//总条数
				total: 0,
				// 弹出层标题
				title: "",
				// 是否显示弹出层
				open: false,
				// 表单参数
				form: {
					studentName:"",
					studentAge: null,
					studentNo: "",
					studentAddress:"",
					studentBirth:"",
				},
				// 表单校验
				rules: {
					studentName: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					studentNo: [{
						required: true,
						message: '请输入编号',
						trigger: 'blur'
					}]
				},
			}
		},
		methods: {
			formatDate(row, column) {
			  // 获取单元格数据
			  let data = row[column.property]
			  if(data == null) {
				  return null
			  }
			  let dt = new Date(data)
			  return dt.getFullYear() + '年' + (dt.getMonth() + 1) + '月' + dt.getDate() + '日' 
			},

			/** 查询学生列表 */
			getList() {
				this.loading = true;
				listStudent(this.queryParams).then(response => {
					this.studentList = response.datas;
					console.log(response.datas);
					this.total = response.total;
					this.loading = false;
				});
			},

			/** 搜索按钮操作 */
			handleQuery() {
				this.queryParams.page = 1;
				this.getList();
			},
			/** 重置按钮操作 */
			resetQuery() {
				this.queryParams = {
					page: 1,
					limit: 10,
					studentName: null,
				}
				this.handleQuery();
			},

			// 表单重置
			reset() {
				this.form = {
					studentId: null,
					studentName: null,
					studentAge: null,
					studentBirth: null,
					studentAddress: null,
					studentNo: null,
					gradeId: 1
				};
			},

			/**修改操作*/
			handleUpdate(row) {
				this.reset();
				var studentId = row.studentId;
				getStudent({
					"studentId": studentId
				}).then(response => {
					console.log(response)
					this.form = response.datas;

					this.form.studentBirth = this.form.studentBirth.substring(0, 10)

					this.open = true;
					this.title = "修改学生";
				})
			},

			/** 删除按钮操作 */
			handleDelete(row) {
				var studentId = row.studentId
				this.$confirm('请问是否删除', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '点错了',
					type: 'warning'
				}).then(() => {
					//发送请求
					delStudent({
						"studentId": studentId
					}).then(response => {
						this.getList();
						this.$message.success('删除成功');
					});
				}).catch(() => {

				});

			},


			/**新增操作*/
			handleAdd() {
				this.reset();
				this.open = true;
				this.title = "添加学生";
			},

			/** 提交按钮 */
			submitForm() {
				this.$refs["form"].validate(valid => {
					if (valid) {
						if (this.form.studentId != null) {
							updateStudent(this.form).then(response => {
								this.$message.success('修改成功');
								this.open = false;
								this.getList();
							});
						} else {
							addStudent(this.form).then(response => {
								this.$message.success('新增成功');
								this.open = false;
								this.getList();
							});
						}
					}
				});
			},

			// 取消按钮
			cancel() {
				this.open = false;
				this.reset();
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

		},
		mounted() {
			this.getList();
		}
	}
</script>

<style>
	.my-outline-border {
		padding: 10px;
	}

	.my-form-style {
		padding-top: 20px;
		background-color: #f5f7fa;
	}

	.my-pagination-style {
		margin-top: 10px;
		margin-bottom: 10px;
		float: right;
	}
</style>