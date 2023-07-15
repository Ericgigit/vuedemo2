<template>
	<div class="main-div" style="display: flex; height: 100%;">
	  <div class="container-fluid" style="flex: 1; display: flex; flex-direction: column;">
	    <div style="font-size: 28px;font-weight: 500; color: #3686d8; margin-bottom: 10px;margin-left: 5px;margin-top: 0;">
	      景区天气
	    </div>
	    <weathertable :weatherlist="WeatherList" :weathersearch="WeatherSeacrh" />
	  </div>
	
	  <div class="road-situation" style="flex: 1; display: flex; flex-direction: column;">
	    <div style="font-size: 28px;font-weight: 500; color: #3686d8; margin-bottom: 15px;margin-left: 5px;margin-top: 0;">
	      附近路况
	    </div>
	    <roadSituation style="flex-grow: 1;border-radius: 10px;box-shadow: 0px 2px 5px 5px rgba(155, 155, 155, 0.3);">
	    </roadSituation>
	  </div>
	</div>

</template>

<script src="https://webapi.amap.com/maps?v=2.0&key=c233377f6f0a3483056311953fb19f8a"></script>
<script>
	import MyNetwork from "../map/MyNetwork.vue";
	import axios from 'axios'; //引入axios
	import WeatherTable from './components/WeatherTable.vue';
	import roadSituation from './components/roadSituation.vue';
	import {
		setStorage,
		getStorage,
	} from "@/utils/localStorage.js";
	import {
		getPath,
	} from '@/api/getData.js';
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.getPathForm.checkPass !== '') {
						this.$refs.getPathForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.getPathForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				longAndLat: [121.36352, 31.19327],
				//通过API获取到的天气数据存放在这个数组里面
				WeatherList: [],
				cityName: '重庆', //默认显示广州的天气
				activeName: "0",

				curFunc: "navigation",
				activeIndex: '1',
				curNavigationState: "start",
				isStart: false,
				getPathForm: {
					startNode: 'gate',
					endNode: '',
					startNodeLabel: '大门',
					endNodeLabel: '',
				},
				resultPath: [],

				rules: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],

				}
			};
		},
		components: {
			MyNetwork,
			weathertable: WeatherTable,
			roadSituation
		},
		props: {
			ratio: {
				type: Number,
				default: 1,
			},
			overflow: {
				type: String,
				default: "auto",
			},
			overflowX: {
				type: String,
			},
			overflowY: {
				type: String,
			},
		},
		methods: {
			WeatherSeacrh(cityName) {

				const url = 'https://www.yiketianqi.com/free/week?unescape=1&appid=79976529&appsecret=igWM34SU&city=重庆'
				// let weather = JSON.parse(getStorage("weather"));
				// const dayList = weather.data; //天气数据
				// const area = weather.city; //城市名称
				// console.log(dayList, area);
				// //先将WeatherList数组清空
				// this.WeatherList.length = 0;
				// //将dayList的元素遍历一遍送进WeatherList里面
				// dayList.forEach((ele, index, arr) => {
				// 	this.WeatherList.splice(index, 1, ele);
				// });
				// // //赋值城市名称
				// this.cityName = area;

				//使用axios发送ajax请求获取数据
				axios.get(url).then(
					response => {
						//请求成功
						// console.log(response.data)
						setStorage("weather", JSON.stringify(response.data));
						const dayList = response.data.data; //天气数据
						const area = response.data.city; //城市名称
						console.log(dayList, area);
						//先将WeatherList数组清空
						this.WeatherList.length = 0;
						//将dayList的元素遍历一遍送进WeatherList里面
						dayList.forEach((ele, index, arr) => {
							this.WeatherList.splice(index, 1, ele);
						});
						// //赋值城市名称
						this.cityName = area;
					}).catch(error => {
					alert('请求失败');
				});
			}, //WeatherSearch-end

			initMap() {
				var map = new AMap.Map('amap-container', {
					// 地图中心位置
					center: this.longAndLat,
					resizeEnable: true,
					// 主题色
					mapStyle: 'amap://styles/normal',
					// 地图层级
					zoom: 15,
					zoomEnable: false,
				})
				// 实时路况图层
				var trafficLayer = new AMap.TileLayer.Traffic({
					zIndex: 10,
					zooms: [7, 20]
				})
				trafficLayer.setMap(map)
			}
		},
		mounted() { //生命周期钩子
			this.WeatherSeacrh('广州');
			this.initMap();
		},

	};
</script>

<style scoped>

	.road-situation {
		margin-top: 20px;
		margin-bottom: 25px;
		margin-left: 30px;
		margin-right: 20px;
		padding: 20px;
		padding-top: 15px;
		border-radius: 15px;
		box-shadow: 0px 2px 8px 8px rgba(200, 200, 200, 0.3);
	}

	.container-fluid {
		margin-top: 20px;
		margin-bottom: 25px;
		margin-left: 10px;
		padding: 20px;
		border-radius: 15px;
		box-shadow: 0px 2px 8px 8px rgba(200, 200, 200, 0.3);
		overflow: hidden;
	}
</style>