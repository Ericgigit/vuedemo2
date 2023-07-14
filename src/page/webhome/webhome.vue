<template>
	<div style="height: 100vh; display: flex; flex-direction: column;background-color: #333333;">
		<div class="block" style="flex: 6;">
			<div class="home-picture"></div>
		</div>

		<div style="flex: 3;display: flex; flex-direction:row;padding: 20px;padding-top: 25px;padding-bottom: 25px;">
			<div style="flex: 1;margin-right: 15px;">
				<div class="home-content">
					<div class="home-footer" @click="goToLogin()">
						<div>探索更多 <i class="el-icon-right"></i></div>
					</div>
				</div>
			</div>
			<div style="flex: 1;margin-right: 15px;">
				<div class="home-content2">
					<div class="home-footer" @click="goToLogin()">
						<div class="text">探索更多 <i class="el-icon-right"></i></div>
					</div>
				</div>
			</div>
			<div style="flex: 1;margin-right: 15px;">
				<div class="home-content3">
					<div class="home-footer" @click="goToLogin()">
						<div class="text">探索更多 <i class="el-icon-right"></i></div>
					</div>
				</div>
			</div>
			<div style="flex: 1;">
				<div class="home-content4">
					<div class="home-footer" @click="goToLogin()">
						<div class="text">探索更多 <i class="el-icon-right"></i></div>
					</div>
				</div>
			</div>

		</div>

	</div>
</template>

<script>
	import {} from '@/api/getData.js';
	export default {
		data() {
			return {

			}
		},
		methods: {
			goToLogin() {
				//跳转登录页面
				this.$router.push({
					name: "login"
				});
			}
		},
		mounted() {

		}
	}
</script>

<style>
	.home-picture {
		width: 100%;
		height: 100%;
		background: url("../../assets/background/homepicture3.jpeg");
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}

	.home-content {
		display: flex;
		flex-direction: column;
		background: url("../../assets/background/homepicture2.jpeg");
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		width: 98%;
		height: 98%;
		margin: auto;
		border-radius: 12px;
		transition: all 0.4s;
	}

	.home-content2 {
		display: flex;
		flex-direction: column;
		background: url("../../assets/background/homepicture6.jpeg");
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		height: 98%;
		width: 98%;
		margin: auto;
		border-radius: 12px;
		transition: all 0.4s;
	}

	.home-content3 {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: url("../../assets/background/homepicture9.jpeg");
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		height: 98%;
		width: 98%;
		margin: auto;
		border-radius: 12px;
		transition: all 0.4s;
	}

	.home-content4 {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: url("../../assets/background/homepicture8.jpeg");
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		height: 98%;
		width: 98%;
		margin: auto;
		border-radius: 12px;
		transition: all 0.4s;
	}

	.home-content:hover,
	.home-content2:hover,
	.home-content3:hover,
	.home-content4:hover {
		height: 100%;
		width: 100%;
	}

	.home-footer {
		width: 100%;
		height: 40px;
		margin-bottom: 0px;
		margin-top: auto;
		text-align: center;
		line-height: 40px;
		color: #e6e6e6;
		font-size: 16px;
		border-radius: 0 0 12px 12px;
		background-color: rgba(200, 200, 200, 0.5);
		backdrop-filter: blur(17px);
		transition: all 0.4s;
	}

	.home-footer:hover {
		color: #ffffff;
		font-size: 17px;
		border-radius: 0 0 12px 12px;
		background-color: rgba(200, 200, 200, 0.4);
		backdrop-filter: blur(17px);
	}
</style>