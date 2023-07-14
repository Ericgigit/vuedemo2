<template>
	<div style="height: 100%; display: flex; flex-direction: column;">
		<div
			style="flex: 4;display: flex; flex-direction:row;padding-right: 20px;padding-left: 0;padding-top: 20px;padding-bottom: 5px;">
			<div style="flex: 2;margin-right: 15px;">
				<div class="main-content">
					<div class="view-footer" @click="goToPage('map')">
						<div class="text">景区纵览 <i class="el-icon-right"></i></div>
					</div>
				</div>
			</div>
			<div style="flex: 1;">
				<div class="main-content2">
					<div class="view-footer" @click="goToPage('weather')">
						<div class="text">天气与路况 <i class="el-icon-right"></i></div>
					</div>
				</div>
			</div>

		</div>
		<div style="flex: 3;display: flex; flex-direction:row;padding: 20px;padding-left: 0;padding-top: 10px;">
			<div style="flex: 1;margin-right: 12px;">
				<div class="main-content3">
					<div class="view-footer" @click="goToPage('hotel')">
						<div class="text">星级酒店 <i class="el-icon-right"></i></div>
					</div>
				</div>
			</div>
			<div style="flex: 1;margin-right: 15px;">
				<div class="main-content4">
					<div class="view-footer" @click="goToPage('hotel')">
						<div class="text">舒适休闲 <i class="el-icon-right"></i></div>
					</div>
				</div>
			</div>
			<div style="flex: 1;">
				<div class="main-content5">
					<div class="view-footer">
						<div class="text">品质餐饮 <i class="el-icon-right"></i></div>
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
			goToPage: function(str) {
				if (this.$route.path !== '/' + str) { // 检查当前路径是否与目标路径相同
					this.$router.push('/' + str);
				}
			},
		},
		mounted() {

		}
	}
</script>

<style>
	.main-content {
		display: flex;
		flex-direction: column;
		background: url("../../assets/background/mainpicture2.jpeg");
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		width: 99%;
		height: 98%;
		margin: auto;
		border-radius: 12px;
		transition: all 0.5s;
	}

	.main-content2 {
		display: flex;
		flex-direction: column;
		/* background-image: linear-gradient(to top, rgba(15, 128, 255, 1.0),rgb(32, 255, 255)); */
		background: url("../../assets/background/mainpicture5.png");
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		height: 98%;
		width: 98%;
		margin: auto;
		border-radius: 12px;
		transition: all 0.5s;
	}

	.main-content3 {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: url("../../assets/introduction/hotel.jpg");
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		height: 98%;
		width: 98%;
		margin: auto;
		border-radius: 12px;
		transition: all 0.5s;
	}

	.main-content4 {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: url("../../assets/introduction/mingsu.jpg");
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		height: 98%;
		width: 98%;
		margin: auto;
		border-radius: 12px;
		transition: all 0.5s;
	}

	.main-content5 {
		flex: 1;
		display: flex;
		flex-direction: column;
		background: url("../../assets/introduction/rest.jpg");
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		height: 98%;
		width: 98%;
		margin: auto;
		border-radius: 12px;
		transition: all 0.5s;
	}

	.main-content:hover,
	.main-content2:hover,
	.main-content3:hover,
	.main-content4:hover,
	.main-content5:hover {
		height: 100%;
		width: 100%;
	}

	.view-footer {
		width: 100%;
		height: 50px;
		margin-bottom: 0px;
		margin-top: auto;
		text-align: center;
		line-height: 50px;
		color: #e6e6e6;
		font-size: 18px;
		border-radius: 0 0 12px 12px;
		background-color: rgba(200, 200, 200, 0.6);
		backdrop-filter: blur(17px);
		transition: all 0.4s;
	}

	.view-footer:hover {
		color: #ffffff;
		font-size: 19px;
		border-radius: 0 0 12px 12px;
		background-color: rgba(200, 200, 200, 0.5);
		backdrop-filter: blur(17px);
	}
</style>