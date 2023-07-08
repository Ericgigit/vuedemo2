<template>
	<div style="margin-top: 20px; display: flex; flex-wrap: wrap;">
		<div class="main-content">
			<div class="view-footer">
				<div class="text">活动一</div>
			</div>
		</div>
		
		<div class="main-content2">
			<div class="view-footer">
				<div class="text">活动二</div>
			</div>
		</div>
		
		<div class="main-content3">
			<div class="view-footer">
				<div class="text">活动三</div>
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

		},
		mounted() {

		}
	}
</script>

<style>
	.main-content {
		display: flex;
		flex-direction: column;
		background: url("../../assets/background/background_7.png");
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		width: 350px;
		height: 220px;
		margin-bottom: 20px;
		margin-right: 20px;
		border-radius: 15px;
		transition: all 0.4s;
		-moz-transition: all .4s;
		-webkit-transition: all .4s;
		-o-transition: all .4s;
	}
	
	.main-content2{
		display: flex;
		flex-direction: column;
		background: url("../../assets/background/background_2.png");
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		width: 350px;
		height: 220px;
		margin-bottom: 20px;
		margin-right: 20px;
		border-radius: 15px;
		transition: all 0.4s;
		-moz-transition: all .4s;
		-webkit-transition: all .4s;
		-o-transition: all .4s;
	}
	
	.main-content3{
		display: flex;
		flex-direction: column;
		background: url("../../assets/background/background_3.png");
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		width: 350px;
		height: 220px;
		margin-bottom: 20px;
		margin-right: 20px;
		border-radius: 15px;
		transition: all 0.4s;
		-moz-transition: all .4s;
		-webkit-transition: all .4s;
		-o-transition: all .4s;
	}
	.main-content:hover,
	.main-content2:hover,
	.main-content3:hover{
		height: 230px;
		width: 390px;
	}

	.view-footer {
		width: 100%;
		height: 70px;
		margin-bottom: 0px;
		margin-top: auto;
		border-radius: 0 0 15px 15px;
		background-color: rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(17px);
	}
	.text{
		margin: 5px;
		color: #333333;
	}

</style>