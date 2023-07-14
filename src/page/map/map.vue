<template>
	<div class="main-div">
		<div class="hover-div">
			<div class="map-box" :style="ratioStyle">


				<div class="content" :style="contentStyle">
					<my-network ref="my-network-ref"
						style="position: absolute; width: 100%; height: 100%;"></my-network>
					<!-- <img class="map-mark" style="position: absolute; top: 30%; left: 50%;" @click="clickIma()"
						:src="require('@/assets/flag6.png')">
					<img class="map-mark" style="position: absolute; top: 50%; left: 50%;" @click="clickIma()"
						:src="require('@/assets/flag7.png')">
					<img class="map-mark" style="position: absolute; top: 55%; left: 75%;" @click="clickIma()"
						:src="require('@/assets/flag8.png')"> -->

				</div>
			</div>
		</div>

		<div class="navigation-panel">
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#ffffff"
				active-text-color="#3488ff">
				<el-menu-item index="1" @click="setCurFunc('navigation')">导航</el-menu-item>
				<el-menu-item index="2" @click="setCurFunc('recommend')">路线推荐</el-menu-item>
			</el-menu>
			<el-form v-if="curFunc == 'navigation'" :model="getPathForm" status-icon :rules="rules" ref="getPathForm" label-width="100px" label-position="top" style="border-top: 1px solid #efefef;margin-top: 10px;">
			  <el-form-item label="起点">
			    <el-input v-model="getPathForm.startNodeLabel" autocomplete="off" readonly @focus="setStartNode()"></el-input>
			  </el-form-item>
			  <el-form-item label="终点">
			    <el-input v-model="getPathForm.endNodeLabel" autocomplete="off" readonly @focus="setEndNode()"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('getPathForm')" style="display: block; width: 100%;margin-top: 20px;">提交</el-button>
			  </el-form-item>
			  <el-form-item>
			    <el-button @click="resetForm('getPathForm')" style="display: block; width: 100%;margin-top: 20px;">重置</el-button>
			  </el-form-item>
			</el-form>

			<!-- 路线推荐 -->
			<el-collapse v-if="curFunc == 'recommend'" v-model="activeName" accordion style="margin-top: 10px;">
				<el-collapse-item title="推荐路线 1" name="1">
				  <el-timeline style="padding-left: 15px; text-align: left;">
				    <el-timeline-item v-for="(activity, index) in activities1" :key="index"
				      style="padding-bottom: 4px;" :type="activity.type" :color="activity.color"
				      :size="activity.size">
				      {{activity.content}}
				    </el-timeline-item>
				  </el-timeline>
				  <div style="display: flex; justify-content: center;">
				    <el-button style="font-size: 13px; margin-bottom: 10px;" @click="showPath('1')">查看地图路线</el-button>
				  </div>
				</el-collapse-item>
				<el-collapse-item title="推荐路线 2" name="2">
					<el-timeline style="padding-left: 15px;">
						<el-timeline-item v-for="(activity, index) in activities2" :key="index"
							style="padding-bottom: 4px;" :type="activity.type" :color="activity.color"
							:size="activity.size">
							{{activity.content}}
						</el-timeline-item>
					</el-timeline>
					<div style="display: flex; justify-content: center;">
					  <el-button style="font-size: 13px; margin-bottom: 10px;" @click="showPath('2')">查看地图路线</el-button>
					</div>
				</el-collapse-item>
				<el-collapse-item title="推荐路线 3" name="3">
					<el-timeline style="padding-left: 15px;">
						<el-timeline-item v-for="(activity, index) in activities3" :key="index"
							style="padding-bottom: 4px;" :type="activity.type" :color="activity.color"
							:size="activity.size">
							{{activity.content}}
						</el-timeline-item>
					</el-timeline>
					<div style="display: flex; justify-content: center;">
					  <el-button style="font-size: 13px; margin-bottom: 10px;" @click="showPath('3')">查看地图路线</el-button>
					</div>
				</el-collapse-item>
			</el-collapse>

		</div>


	</div>

</template>

<script>
	import MyNetwork from "./MyNetwork.vue";
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
				activities1: [{
					content: '大门',
					size: 'large',
					type: 'primary',
				}, {
					content: '科学教育馆',
					color: '#0bbd87'
				}, {
					content: '剧院',
					color: '#0bbd87'
				}, {
					content: '餐厅',
					color: '#0bbd87'
				}, {
					content: '天鹅',
					color: '#0bbd87'
				}, {
					content: '孔雀',
					color: '#0bbd87'
				}, {
					content: '城堡',
					color: '#0bbd87'
				}, {
					content: '商店',
					color: '#0bbd87'
				}, {
					content: '博物馆',
					color: '#0bbd87'
				}, {
					content: '摩天轮',
					color: '#0bbd87'
				}, {
					content: '大门',
					color: '#fd6647'
				}],
				activities2: [{
					content: '大门',
					size: 'large',
					type: 'primary',
				}, {
					content: '摩天轮',
					color: '#0bbd87'
				}, {
					content: '博物馆',
					color: '#0bbd87'
				}, {
					content: '城堡',
					color: '#0bbd87'
				}, {
					content: '孔雀',
					color: '#0bbd87'
				}, {
					content: '天鹅',
					color: '#0bbd87'
				}, {
					content: '剧院',
					color: '#0bbd87'
				}, {
					content: '科学教育馆',
					color: '#0bbd87'
				}, {
					content: '大门',
					color: '#fd6647'
				}],
				activities3: [{
					content: '大门',
					size: 'large',
					type: 'primary',
				}, {
					content: '摩天轮',
					color: '#0bbd87'
				}, {
					content: '咖啡店',
					color: '#0bbd87'
				}, {
					content: '博物馆',
					color: '#0bbd87'
				}, {
					content: '商店',
					color: '#0bbd87'
				}, {
					content: '城堡',
					color: '#0bbd87'
				}, {
					content: '孔雀',
					color: '#0bbd87'
				}, {
					content: '天鹅',
					color: '#0bbd87'
				}, {
					content: '餐厅',
					color: '#0bbd87'
				}, {
					content: '剧院',
					color: '#0bbd87'
				}, {
					content: '科学教育馆',
					color: '#0bbd87'
				}, {
					content: '大门',
					color: '#fd6647'
				}],
				activeName: "0",
				path1: ['gate', 't10', 't12', 'education', 't12', 't13', 't14', 'opera', 't14', 't22', 'hotel', 'rest',
					'swan', 'peafowl', 't16', 't17', 'town', 't18', 't19', 't20', 't21', 'store1', 't1', 't3', 't4',
					'museum', 't6', 'wheel', 't7', 't8', 't9', 't10', 'gate'
				],
				path2: ['gate', 't10', 't9', 't8', 't7', 'wheel', 't6', 'museum', 't24', 't28', 't19', 't18', 'town',
					't17', 't16', 'peafowl', 'swan', 'peafowl', 't16', 't15', 't14', 'opera', 't14', 't13', 't12',
					'education', 't12', 't10', 'gate'
				],
				path3: ['gate', 't10', 't9', 't8', 't7', 'wheel', 'coffee', 't2', 'museum', 't4', 't3', 't1', 'store1',
					't21', 't20', 't19', 't18', 'town', 't17', 't16', 'peafowl', 'swan', 'rest', 'hotel', 't22', 't14',
					'opera', 't14', 't13', 't12', 'education', 't12', 't10', 'gate'
				],
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
			MyNetwork
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
			showPath(i) {
				if (i == '1') {
					this.highlightPath(this.path1);
				} else if (i == '2') {
					this.highlightPath(this.path2);
				} else {
					this.highlightPath(this.path3);
				}
			},
			setCurFunc(str) {
				this.curFunc = str;
			},
			clickIma() {
				this.$message.success('点击成功');
			},
			submitForm(formName) {

				this.$refs[formName].validate((valid) => {
					if (valid) {
						let list = {
							path: [this.getPathForm.startNode, this.getPathForm.endNode]
						}
						getPath(list).then(response => {
								const path = response.datas.path;
								console.log(path)
								if (path && path.length > 0) {
									this.highlightPath(path);
								} else {
									alert('No path found');
								}
							})
							.catch(error => {
								console.error('Error:', error);
							});


					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			highlightPath(path) {
				const childComponent = this.$children[0];
				childComponent.clearAllEdge();

				for (let i = 0; i < path.length - 1; i++) {
					childComponent.addEdge(path[i], path[i + 1]);
				}
			},
			resetForm(formName) {
				this.getPathForm.startNode = "";
				this.getPathForm.endNode = "";
				this.getPathForm.startNodeLabel = "";
				this.getPathForm.endNodeLabel = "";
				let path = [];
				this.highlightPath(path);

			},
			setStartNode() {
				this.curNavigationState = "start";
				console.log("switch start")
			},
			setEndNode() {
				this.curNavigationState = "end";
				console.log("switch end")
			}
		},
		computed: {
			ratioStyle() {
				let ratio = (1 / this.ratio) * 70;
				if (ratio == null || Number.isNaN(ratio)) {
					ratio = 100;
				}
				if (typeof ratio !== "string" || !ratio.endsWith("%")) {
					ratio = ratio + "%";
				}
				return `padding-top: ${ratio};`;
			},

			contentStyle() {
				const styles = [];
				if (this.overflow) {
					styles.push("overflow:" + this.overflow);
				}
				if (this.overflowX) {
					styles.push("overflow-x:" + this.overflowX);
				}
				if (this.overflowY) {
					styles.push("overflow-y:" + this.overflowY);
				}
				return styles.join(";");
			},

		},
	};
</script>

<style scoped>
	.main-div {
		display: grid;
		padding-top: 20px;
		padding-left: 10px;
		padding-bottom: 20px;
		grid-template-columns: 6fr 2fr;
	}

	.hover-div {
		width: 100%;
		height: auto;
	}

	.map-box {
		position: relative;
		box-sizing: border-box;
		border-radius: 15px;
		box-shadow: 0px 2px 6px 6px rgba(155, 155, 155, 0.3);
		background: url("../../assets/cqzoo3.jpg");
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		margin: auto;
		width: 99%;

		transition: all 0.4s;
		-moz-transition: all .4s;
		-webkit-transition: all .4s;
		-o-transition: all .4s;
	}

	.map-box:hover {
		width: 100%;
	}

	.content {
		margin-top: 2.5%;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.map-mark {
		height: 50px;
		width: 50px;
		margin-top: -50px;
		margin-left: -25px;
		border-radius: 20px;
		object-fit: contain;
	}

	.navigation-panel {
		margin-left: 30px;
		margin-right: 20px;
		padding: 20px;
		padding-top: 15px;
		border-radius: 15px;
		box-shadow: 0px 2px 6px 6px rgba(155, 155, 155, 0.3);
	}

	li.el-menu-item {
		height: 40px;
		line-height: 40px;
		background-color: #ffffff;
		border-radius: 7px;
		border: none;
	}

	/* li.el-menu-item:hover{
		border: none;
		background-color: #ffffff;
		font-weight: 500;
	} */
	li.el-menu-item.is-active {
		border: none;
		background-color: #ffffff;
		font-weight: 500;
	}

	/deep/ .el-collapse-item__content {
		padding-bottom: 0;
	}
	/deep/ label.el-form-item__label{
		padding: 0;
	}
	/deep/ div.el-form-item.el-form-item--feedback{
		margin-bottom: 0px;
	}
</style>