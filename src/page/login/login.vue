<template>
	<div class="login">
		<div class="login-main">
			<div class="login-picture">

			</div>
			<div class="login-box">
				<div class="login-title">欢迎登录</div>
				<div class="login-form">
					<el-form :model="loginForm" :rules="loginRules" ref="loginForm">
						<el-form-item class="login-username" prop="personPhone">
							<el-input v-model="loginForm.personPhone" placeholder="手机号码" clearable><i slot="prefix"
									class="el-input__icon el-icon-user-solid login-input-icon"></i></el-input>
						</el-form-item>
						<el-form-item class="login-password" prop="password">
							<el-input v-model="loginForm.password" show-password placeholder="密码">
								<i slot="prefix" class="el-input__icon el-icon-lock login-input-icon"></i></el-input>
						</el-form-item>
						<el-form-item class="login-button-item">
							<el-button :loading="isLoading" class="login-button" type="primary"
								@click="loginUser('loginForm')">登录</el-button>
						</el-form-item>

						<div :loading="isLoading" class="register-button" type="primary" @click="registerUser()">注册 </div>
					</el-form>
				</div>
			</div>
		</div>

		<!-- 注册 -->
		<el-dialog class="register-panel" :title="title" :visible.sync="open" width="500px" append-to-body>
			<el-form ref="form" :model="form" :rules="rules" label-width="80px" status-icon>
				<el-form-item label="用户名" prop="personName">
					<el-input v-model="form.personName" placeholder="请输入用户名" />
				</el-form-item>

				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="form.password"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input type="password" v-model="form.checkPass"></el-input>
				</el-form-item>

				<el-form-item label="手机号码" prop="personPhone">
					<el-input v-model="form.personPhone" placeholder="手机号码" />
				</el-form-item>
				<el-form-item label="出生日期" prop="birth">
					<el-date-picker clearable v-model="form.birth" placeholder="请选择出生日期" 
					format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
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
		login,
		register
	} from '@/api/getData.js';
	import {
		setStorage,
		getStorage,
	} from "@/utils/localStorage.js";
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.form.checkPass !== '') {
						this.$refs.form.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.form.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				// 表单参数
				title: "",
				open: false,
				form: {
					personName: "",
					personPhone: "",
					personpower: null,
					birth: "",
					password: '',
					checkPass: '',
				},
				//登录数据
				loginForm: {
					personPhone: "",
					password: "",
					personName: "Eric"
				},
				//验证规则
				loginRules: {
					personPhone: [{
						required: true,
						message: '请输入手机号码',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
				},
				rules: {
					personName: [{
						required: true,
						validator: validatePass,
					}],
					password: [{
						required: true,
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						required: true,
						validator: validatePass2,
						trigger: 'blur'
					}],
					personPhone: [{
						required: true,
						message: '请输入手机号码',
						trigger: 'blur'
					}],
					birth: [{
						required: true,
						message: '请选择出生日期',
						trigger: 'blur'
					}],
				},
				//按钮加载中
				isLoading: false,
			}
		},
		methods: {
			//登录
			loginUser(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						//改变按钮的加载状态
						this.isLoading = true;
						// //测试
						// this.$router.push({
						// 	name: "home"
						// });
						// //提示
						// this.$message.success("登录成功");
						//验证通过,发起请求进行登录
						login(this.loginForm).then(res => {
							console.log(this.loginForm);
							if (res != -1 && res.code == 200) { //登录成功 
								console.log(res)
								//保存user信息到localStorage
								setStorage("user", JSON.stringify(res.datas));
								//跳转至主页
								this.$router.push({
									name: "home"
								});
								//提示
								this.$message.success("登录成功");
							} else {
								this.$message.error("登录失败");
							}
							//2秒关闭按钮的加载状态
							setTimeout(() => {
								this.isLoading = false;
							}, 2000)
						})
					} else {
						this.$message.error("请输入账号或密码")
						return false;
					}
				});
			},
			registerUser() {
				this.reset();
				this.open = true;
				this.title = "账户注册";
			},
			// 表单重置
			reset() {
				this.form = {
					pname: null,
					birth: null,
					pphone: null,
				};
			},
			/** 提交按钮 */
			submitForm() {
				this.$refs["form"].validate(valid => {
					if (valid) {
						this.form.ppower = 1;
						console.log(this.form);
						register(this.form).then(response => {
							this.$message.success('新增成功');
							this.open = false;
						});
					}
				});
			},

			// 取消按钮
			cancel() {
				this.open = false;
				this.reset();
			},
		},
		mounted() {
			let user = JSON.parse(getStorage("user"));
			
			if (user) {
				console.log(user)
				//跳转至主页
				this.$router.push({
					name: "home"
				});
			}
		}
	}
</script>

<style>
	body {
		margin: 0px;
	}

	.login {
		/* background-color: rgb(53, 70, 92); */
		background: url("../../assets/background/background_8.jpeg");
		position: fixed;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
	}

	.login-main {
		background-color: rgba(180, 180, 180, 0.3);
		backdrop-filter: blur(15px);
		margin: auto;
		border-radius: 15px;
		width: 700px;
		height: 440px;
		/* box-shadow: 0px 1px 8px 8px rgba(106, 107, 108, 0.2); */
	}

	.login-main .login-picture {
		height: 100%;
		width: 50%;
		float: left;
		border-radius: 15px 0 0 15px;
		background: url("../../assets/background/background_7.png");
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		/* background-color: red; */
	}

	.login-main .login-box {
		height: 100%;
		width: 50%;
		float: right;
	}

	.login-title {
		margin-top: 65px;
		margin-bottom: 30px;
		font-size: 30px;
		color: white;
		font-weight: bolder;
		text-align: center;
	}

	.login-form {
		margin: auto;
		width: 70%;
	}

	.login-password {
		margin-top: 30px;
	}

	.login-button-item {
		margin-top: 40px;
	}

	.login-button {
		width: 100%;
	}

	.register-button {
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 14px;
		font-weight: bold;
		border-radius: 4px;
		color: #b3b3b3;
		transition: all 0.4s;
		background: transparent;
		border: none;
	}

	.register-button:hover {
		color: #e6e6e6;
		background-color: rgba(200, 200, 200, 0.3);
	}
            
	.login-input-icon {
		font-size: 20px;
	}

	div.el-dialog {
		border-radius: 10px;
		padding-right: 15px;
	}
</style>