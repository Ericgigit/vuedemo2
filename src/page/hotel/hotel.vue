<template>
	<div class="my-outline-border">
		<el-form ref="importFormRef" :model="importForm" label-width="130px">
			<el-form-item label="病种kgCode:" prop="kgCode">
				<el-input v-model="importForm.kgCode"></el-input>
			</el-form-item>
			<el-form-item label="目标数据库URL:" prop="targetUrl">
				<el-input v-model="importForm.targetUrl"></el-input>
			</el-form-item>
			<el-form-item label="目标数据库账号:" prop="targetUsername">
				<el-input v-model="importForm.targetUsername"></el-input>
			</el-form-item>
			<el-form-item label="目标数据库密码: " prop="targetPassword">
				<el-input v-model="importForm.targetPassword"></el-input>
			</el-form-item>
			<el-form-item label="上传文件:" prop="excel">
				<el-upload class="upload-demo" ref="upload" action="http://192.168.27.30:8080/suit/upload"

					:on-exceed="handleExceed"
					:limit="1">
					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					<div slot="tip" class="el-upload__tip">只能上传.xlsx文件，且不超过5M</div>
				</el-upload>
			</el-form-item>
		
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//导入表单数据
				importForm: {
					kgCode: '',
					targetUrl: '',
					targetUsername: '',
					targetPassword: '',
				},
				//存放上传文件
				fileList: [],
			}
		},
		methods: {
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
					this.$message.error("最大上传5M")
					return false
				}
				//判断文件类型，必须是xlsx格式
				let fileName = file.name
				let reg = /^.+(\.xlsx)$/
				if (!reg.test(fileName)) {
					this.$message.error("只能上传xlsx!")
					return false
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
			submitImportForm() {
				// 使用form表单的数据格式
				const params = new FormData()
				// 将上传文件数组依次添加到参数paramsData中
				this.fileList.forEach((x) => {
					paramsData.append('file', x.file)
				});
				// 将输入表单数据添加到params表单中
				params.append('kgCode', this.importForm.kgCode)
				params.append('targetUrl', this.importForm.targetUrl)
				params.append('targetUsername', this.importForm.targetUsername)
				params.append('targetPassword', this.importForm.targetPassword)

				//这里根据自己封装的axios来进行调用后端接口
				this.httpPostWithLoading(IMPORT_URL, paramsData).then(match => {
					if (match.success) {
						this.$message({
							message: "导入成功",
							type: "success"
						})
					} else {
						this.$message({
							message: "导入失败",
							type: "error"
						})
					}
					this.$refs.importFormRef.resetFields() //清除表单信息
					this.$refs.upload.clearFiles() //清空上传列表
					this.fileList = [] //集合清空
					this.dialogVisible1 = false //关闭对话框

				})
			}


		},

	}
</script>

<style>
	.my-outline-border {
		padding: 10px;
	}
</style>