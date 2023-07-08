<template>
	<div class="my-outline-border">
		<el-form ref="importFormRef" :model="importForm" label-width="130px">
			<el-form-item label="目标数据库URL:" prop="targetUrl">
				<el-input v-model="importForm.targetUrl"></el-input>
			</el-form-item>
			<el-form-item label="目标数据库账号:" prop="suitId">
				<el-input v-model="importForm.suitId"></el-input>
			</el-form-item>
			<el-form-item label="目标数据库密码: " prop="submitId">
				<el-input v-model="importForm.submitId"></el-input>
			</el-form-item>
			<el-form-item label="上传文件:" prop="excel">
				<el-upload class="upload-demo" ref="upload" action="http://192.168.27.30:8080/suit/upload"
					:http-request="httpRequest" :before-upload="beforeUpload" :on-exceed="handleExceed" 
					:on-change="changeCarPicture" :limit="1">
					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					<div slot="tip" class="el-upload__tip">只能上传.xlsx文件，且不超过5M</div>
				</el-upload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitImportForm">开始导入</el-button>
			</el-form-item>

		</el-form>
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
				carPicture: null,
			}
		},
		methods: {
			changeCarPicture(file) {
				// 图片转成base64上传
				let reader = new FileReader();
				console.log(reader);
				reader.onload = () => {
					let _base64 = reader.result;
					let BASE64 = _base64.split(",");
					this.carPicture = BASE64[1]; //赋值
					console.log(this.carPicture);
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
					this.$message.error("最大上传5M")
					return false
				}
				//判断文件类型，必须是xlsx格式
				let fileName = file.name
				let types = ['image/jpeg', 'image/jpg', 'image/png'];
				const isImage = types.includes(file.type);
				if (!isImage) {
					this.$message.error('上传图片只能是 JPG、JPEG、PNG 格式!');
					return false;
				}
				// let reg = /^.+(\.xlsx)$/
				// if (!reg.test(fileName)) {
				// 	this.$message.error("只能上传xlsx!")
				// 	return false
				// }
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
					suitId: this.importForm.suitId,
					submitId: this.importForm.submitId,
					submitIma: this.carPicture ,
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
			}


		},

	}
</script>

<style>
	.my-outline-border {
		padding: 10px;
	}
</style>