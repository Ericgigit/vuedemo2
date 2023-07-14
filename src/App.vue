<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',

	}
</script>

<style>
	/*每个页面公共css */

	html {
		font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
		/* background: url("./assets/background/background_9.svg");
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		width: 100%;
		height: 100vh; */
		/* background-image: linear-gradient(to top, rgba(18, 155, 255, 0.1),rgb(255, 255, 255) ,rgb(255, 255, 255),rgb(255, 255, 255)); */
	}
	
	th.el-descriptions-item__label.is-bordered-label{
		background-color: transparent;
	}
	div.el-descriptions__body{
		background-color: transparent;
	}
</style>