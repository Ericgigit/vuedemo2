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
	
	html{
		font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
		/* font-family: myfont; */
	}
	@font-face{
		/* font-family: myfont;
		src: url('./assets/苹方黑体-准-简.ttf'); */
	}
</style>