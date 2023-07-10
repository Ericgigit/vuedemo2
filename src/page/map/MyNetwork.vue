<template>
	<div ref="networkContainer" style="width: 600px; height: 400px;"></div>
</template>

<script>
	import vis from 'vis';

	export default {
		data() {
			return {
				startNode:"test1",
				endNode:"test2",
				clickNode:"",
				mousePosition: '',
				data: {
					nodes: [{
							id: 'start',
							label: '',
							x: "0px",
							y: "0px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 'store1',
							label: '\n商店1',
							x: "66px",
							y: "175px",
							image: require('@/assets/flag6.png'),
						},

						{
							id: 'museum',
							label: '博物馆',
							x: "133px",
							y: "240px",
							image: require('@/assets/flag6.png'),
						},
						{
							id: 'wheel',
							label: '摩天轮',
							x: "148px",
							y: "312px",
							image: require('@/assets/flag6.png'),
						},
						{
							id: 'education',
							label: '科学教育馆',
							x: "483px",
							y: "265px",
							image: require('@/assets/flag6.png'),
						},
						{
							id: 'gate',
							label: '大门',
							x: "548px",
							y: "349px",
							image: require('@/assets/flag6.png'),
						},
						{
							id: 'opera',
							label: '剧院',
							x: "483px",
							y: "183px",
							image: require('@/assets/flag6.png'),
						},

						{
							id: 'end',
							label: '',
							x: '600px',
							y: '500px',

							image: require('@/assets/tmp.png'),
						},
						{
							id: 't1',
							label: '',
							x: "63px",
							y: "204px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't2',
							label: '',
							x: "66px",
							y: "281px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't3',
							label: '',
							x: "116px",
							y: "187px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't4',
							label: '',
							x: "135px",
							y: "197px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 'coffee',
							label: '咖啡店',
							x: "97px",
							y: "330px",
							image: require('@/assets/flag6.png'),
						},
						{
							id: 't6',
							label: '',
							x: "163px",
							y: "298px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't7',
							label: '',
							x: "170px",
							y: "320px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't8',
							label: '',
							x: "280px",
							y: "322px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't9',
							label: '',
							x: "365px",
							y: "363px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't10',
							label: '',
							x: "501px",
							y: "319px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't11',
							label: '',
							x: "553px",
							y: "290px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't12',
							label: '',
							x: "511px",
							y: "272px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't13',
							label: '',
							x: "503px",
							y: "240px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't14',
							label: '',
							x: "450px",
							y: "211px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't15',
							label: '',
							x: "423px",
							y: "204px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't16',
							label: '',
							x: "394px",
							y: "172px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't17',
							label: '',
							x: "334px",
							y: "177px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't18',
							label: '',
							x: "283px",
							y: "44px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 'town',
							label: '城堡',
							x: "308px",
							y: "53px",
							image: require('@/assets/flag6.png'),
						},
						{
							id: 't19',
							label: '',
							x: "221px",
							y: "45px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't20',
							label: '',
							x: "139px",
							y: "96px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't21',
							label: '',
							x: "74px",
							y: "135px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't22',
							label: '',
							x: "450px",
							y: "154px",
							image: require('@/assets/tmp.png'),
						},
						{
							id: 'hotel',
							label: '酒店',
							x: "462px",
							y: "112px",
							image: require('@/assets/flag6.png'),
						},
						{
							id: 'rest',
							label: '餐厅',
							x: "454px",
							y: "82px",
							image: require('@/assets/flag6.png'),
						},
						{
							id: 'swan',
							label: '天鹅',
							x: "415px",
							y: "77px",
							image: require('@/assets/flag6.png'),
						},
						{
							id: 't23',
							label: '',
							x: 151,
							y: 168,
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't24',
							label: '',
							x: 182,
							y: 191,
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't25',
							label: '',
							x: 212,
							y: 246,
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't26',
							label: '',
							x: 307,
							y: 251,
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't27',
							label: '',
							x: 296,
							y: 180,
							image: require('@/assets/tmp.png'),
						},
						{
							id: 't28',
							label: '',
							x: 245,
							y: 142,
							image: require('@/assets/tmp.png'),
						},
					],
					edges: [{
						from: '图书馆',
						to: '信息部大楼',
						color: {
							color: '#ffffff',
							highlight: '#67b0ff',
						},
						width: 4,
						smooth: {
							enabled: true,
							type: 'dynamic'
						}
					}]
				},
			}
		},

		mounted() {
			// 在组件挂载后初始化Vis.js图
			this.initNetwork();
		},
		methods: {
			initNetwork() {
				const container = this.$refs.networkContainer;
				// container.style.width = '600px'; // 设置容器宽度
				// container.style.height = '300px'; // 设置容器高度

				const options = {
					nodes: {
						shape: 'image',
						size: 18,
						font: {
							color: '#0d2868',
							size: 15,

						},
						// fixed: true,
					},
					edges: {
						color: {
							color: '#139cf8',
							highlight: '#138eff',
						},
						width: 10,
						smooth: {
							enabled: true,
							// type: 'continuous'
						}
					},

					interaction: {
						zoomView: false,
						dragView: false,
					},
					layout: {
						randomSeed: 1,
						hierarchical: false, // 禁用自动布局算法
						improvedLayout: false
					},
					physics: {
						enabled: false // 禁用物理引擎以保持节点位置固定
					}
				};
				this.network = new vis.Network(container, this.data, options);
				this.network.on('click', (event) => {
					const {
						pointer
					} = event;
					this.mousePosition = `X: ${pointer.canvas.x.toFixed(2)}, Y: ${pointer.canvas.y.toFixed(2)}`;
					console.log(this.mousePosition)
				});
				// 添加点击事件
				this.network.on('click', (event) => {
					const nodeId = event.nodes[0];
					if (nodeId) {
						const node = this.network.body.nodes[nodeId];
						console.log('Node x:', node.x, 'Node y:', node.y);
					}
					if(this.$parent.curNavigationState == "start"){
						this.$parent.getPathForm.startNode = nodeId;
					}else{
						this.$parent.getPathForm.endNode = nodeId;
					}
					

					this.$message.success('成功点击：' + nodeId);
					console.log('Clicked node:', nodeId);

				});


			},
			drawLine() {
				
			},
			addEdge(nodeId1, nodeId2) {
				console.log(nodeId1, nodeId2)
				const edge = {
					from: nodeId1,
					to: nodeId2,
				};
				this.network.body.data.edges.add(edge);
			},
			clearAllEdge(){
				// 获取边的数据集
				const edgesDataSet = this.network.body.data.edges;
				
				// 移除所有边
				edgesDataSet.clear();
			}

		}
	}
</script>