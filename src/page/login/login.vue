<template>
	<div class="login">
		<div class="login-mian">
			<div class="login-title">欢迎登录</div>
			<div class="login-form">
				<el-form :model="loginForm" :rules="rules" ref="loginForm">
				    <el-form-item prop="username">
				        <el-input v-model="loginForm.username"><i slot="prefix" class="el-input__icon el-icon-user-solid login-input-icon"></i></el-input>
				    </el-form-item>
					<el-form-item prop="password">
					    <el-input v-model="loginForm.password" show-password><i slot="prefix" class="el-input__icon el-icon-lock login-input-icon"></i></el-input>
					</el-form-item>
				    <el-form-item class="login-button-item">
				        <el-button :loading="isLoading" class="login-button" type="primary" @click="loginUser('loginForm')">登录</el-button>
				    </el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import { login } from '@/api/getStudent.js';
	import { setStorage, getStorage ,removeStorage} from "@/utils/localStorage.js";
	export default {
		data() {
			return {
				//登录数据
				loginForm: {
					username: "",
					password: ""
				},
				//验证规则
				rules:{
					username: [
						{ required: true, message: '请输入用户名', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					]
				},
				//按钮加载中
				isLoading: false,
			}
		},
		methods: {
			//登录
			loginUser(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						//改变按钮的加载状态
						this.isLoading = true;
						//验证通过,发起请求进行登录
						login(this.loginForm).then(res => {
							if(res != -1 && res.code ==200){//登录成功 
								console.log(res )
								//保存user信息到localStorage
								setStorage("user", JSON.stringify(res.datas));
								//跳转至主页
								this.$router.push({name: "home"});
								//提示
								this.$message.success("登录成功");
							}else{
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
		},
		mounted() {
			//removeStorage("user");
			let user = JSON.parse(getStorage("user"));
			console.log(user)
			if(user){
				//跳转至主页
				this.$router.push({name: "home"});
			}
		}
	}
</script>

<style>
	body{
		margin: 0px;
	}
	.login{
		background-color: rgb(45,58,75);
		height: 98vh;
		display: flex;
		justify-content: center;
	}
	.login-mian{
		padding-top: 200px;
		width: 400px;
	}
	.login-title{
		font-size: 30px;
		color: white;
		font-weight: bolder;
		text-align: center;
	}
	.login-form{
		margin-top: 50px;
	}
	.login-button-item{
		margin-top: 30px;
	}
	.login-button{
		width: 400px;
	}
	.login-input-icon{
		font-size: 20px;
	}
</style>