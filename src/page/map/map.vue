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

		<el-form :model="getPathForm" status-icon :rules="rules" ref="getPathForm" label-width="100px"
			class="navigation-panel" label-position="top">
			<el-form-item label="密码">
				<el-input v-model="getPathForm.startNode" autocomplete="off" @focus="setStartNode()"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkPass">
				<el-input v-model="getPathForm.endNode" autocomplete="off" @focus="setEndNode()"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('getPathForm')">提交</el-button>
				<el-button @click="resetForm('getPathForm')">重置</el-button>
			</el-form-item>
		</el-form>

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
				curNavigationState: "start",
				isStart: false,
				getPathForm: {
					startNode: '',
					endNode: '',
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
			highlightPath(path){
				const childComponent = this.$children[0];
				childComponent.clearAllEdge();
				
				for(let i=0;i<path.length-1;i++){
					childComponent.addEdge(path[i], path[i+1]);
				}
			},
			resetForm(formName) {
				this.getPathForm.startNode = "";
				this.getPathForm.endNode = "";
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
		grid-template-columns: 5fr 2fr;
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
		overflow: hidden;

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
		border-radius: 15px;
		box-shadow: 0px 2px 6px 6px rgba(155, 155, 155, 0.3);
	}
</style>