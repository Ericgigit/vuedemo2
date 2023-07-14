<template>
	<div style="height: 100%;width: 100%" id="amap-container"></div>
</template>

<script>
	export default {

		methods: {
			initAMap() {
				var map = new AMap.Map('amap-container', {
					// 地图中心位置
					center: this.longAndLat,
					resizeEnable: true,
					// 主题色
					mapStyle: 'amap://styles/normal',
					// 地图层级
					zoom: 12
				})
				// 实时路况图层
				var trafficLayer = new AMap.TileLayer.Traffic({
					zIndex: 10,
					zooms: [7, 20]
				})
				trafficLayer.setMap(map)
			}
		},
		mounted() {
			this.initAMap();
		},
	};
</script>