<template>
	<div style="width: 600px; height: 400px;">
		<div ref="networkContainer" style="width: 100%; height: 100%;"></div>
		<!-- 悬浮窗组件 -->
		<transition name="fade">
			<div v-if="showTooltip" class="tooltip"
				:style="{ top: tooltipPosition.y + 'px', left: tooltipPosition.x + 'px' }">
				<div v-html="tooltipContent" style="width: 200px; height: auto;"></div>
			</div>
		</transition>

	</div>

</template>

<script>
	import vis from 'vis';

	export default {
		data() {
			return {
				showTooltip: false, // 是否显示悬浮窗
				tooltipContent: '', // 悬浮窗内容
				tooltipPosition: {
					x: 0,
					y: 0
				}, // 悬浮窗位置
				startNode: "test1",
				endNode: "test2",
				clickNode: "",
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
							label: '商店',
							x: "71px",
							y: "175px",
							image: require('@/assets/flag6.png'),
							introImage: require('@/assets/introduction/store.jpg'),
							content:"这里是您购物的天堂。我们提供丰富多样的商品，包括特色手工艺品、纪念品、当地特色食品和精美的旅游纪念品。您可以找到独特的礼物，给亲朋好友带回家，留下难忘的回忆。"
							
						},

						{
							id: 'museum',
							label: '博物馆',
							x: "133px",
							y: "240px",
							image: require('@/assets/flag6.png'),
							introImage: require('@/assets/introduction/museum.jpg'),
							content:"这座博物馆将带您穿越时空，探索丰富的历史和文化遗产。在这里，您将近距离欣赏到珍贵的艺术品、文物和考古发现。展馆内展示了多个主题展览，让您了解不同时期的人类文明和创造力。"
						},
						{
							id: 'wheel',
							label: '摩天轮',
							x: "148px",
							y: "312px",
							image: require('@/assets/flag6.png'),
							introImage: require('@/assets/introduction/wheel.jpg'),
							content:"欢迎来到摩天轮！这是一个令人兴奋和惊叹的体验。登上摩天轮的舱厢，您将享受到壮观的全景视野。随着缓慢上升，您可以俯瞰城市的美景、绚丽的夜景或壮观的自然景观。"
							
						},
						{
							id: 'education',
							label: '科学教育馆',
							x: "483px",
							y: "265px",
							image: require('@/assets/flag6.png'),
							introImage: require('@/assets/introduction/education.jpg'),
							content:"探索科学奥秘，欢迎来到科学教育馆！在这里，您将沉浸在令人惊叹的科技世界中。通过交互式展示和实验，我们将带您探索自然规律和科学原理。"
							
						},
						{
							id: 'gate',
							label: '大门',
							x: "548px",
							y: "349px",
							image: require('@/assets/flag6.png'),
							introImage: require('@/assets/introduction/gate.jpg'),
							content:"您将步入一个充满欢笑和惊喜的世界。在这里，您可以与可爱的动物近距离接触，感受它们的温暖和快乐。还有丰富多彩的游乐设施，满足各个年龄段的需求，让您尽情释放乐趣和刺激。"
							
						},
						{
							id: 'opera',
							label: '剧院',
							x: "483px",
							y: "183px",
							image: require('@/assets/flag6.png'),
							introImage: require('@/assets/introduction/opera.jpg'),
							content:"这里是艺术的殿堂，演出将带您进入令人心醉神迷的世界。无论是动人的音乐会、精彩的话剧还是引人入胜的舞台剧，我们精选了顶尖演出，为您呈现精彩绝伦的表演艺术。"
							
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
							introImage: require('@/assets/introduction/coffee.jpg'),
							content:"品味精致生活，享受浓郁香醇的咖啡。精心烘焙的咖啡豆，带来独特口感的美味。伴随着轻松的音乐，品味精致的糕点和小吃。感受咖啡的醇香，让舌尖与心灵一同沉醉。"
							
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
							x: "500px",
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
							introImage: require('@/assets/introduction/town.jpg'),
							content:"这座壮丽的城堡是历史与神秘的完美结合。它高耸入云，仿佛是一个古老的童话世界的入口。一步踏入城堡，您将被迷人的宫殿、华丽的装饰和精美的艺术品所吸引。"
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
							introImage: require('@/assets/introduction/hotel.jpg'),
							content:"欢迎来到酒店！我们提供精心设计的客房和套房，让您感受到无与伦比的住宿体验。我们热情的团队将竭诚为您提供专业服务。酒店内设有餐厅、酒吧、室内游泳池、健身中心和水疗设施，让您在旅途中得到身心的完美放松。"
							
						},
						{
							id: 'rest',
							label: '餐厅',
							x: "454px",
							y: "82px",
							image: require('@/assets/flag6.png'),
							introImage: require('@/assets/introduction/rest.jpg'),
							content:"餐厅为您提供丰富多样的菜肴，融合了传统和现代烹饪技巧，为您带来独特的味觉体验。我们注重食材的新鲜和品质，为您提供健康、美味的餐饮选择"
							
						},
						{
							id: 'swan',
							label: '天鹅',
							x: "415px",
							y: "77px",
							image: require('@/assets/flag6.png'),
							introImage: require('@/assets/introduction/swan.jpg'),
							content:"欢迎来到天鹅生活区！在这里，您将被迷人的天鹅群体所吸引。天鹅是优雅而美丽的水鸟，以其雪白的羽毛和优雅的姿态而著名。在宁静的湖泊中，您可以欣赏到它们自由自在地游泳和翩翩起舞的场景。"
						},
						{
							id: 'peafowl',
							label: '孔雀',
							x: "405px",
							y: "147px",
							image: require('@/assets/flag6.png'),
							introImage: require('@/assets/introduction/peafowl.jpeg'),
							content: "欢迎来到孔雀生活区！在这里，您将欣赏到绚丽多彩、华丽迷人的孔雀群体。它们展示着壮丽的羽毛，翩翩起舞，为您带来无与伦比的视觉盛宴。忘却喧嚣，沉浸在孔雀的美丽世界中，尽情享受与大自然的亲密接触。"
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
						size: 12,
						font: {
							color: '#0d2868',
							size: 15,

						},
						fixed: true,
					},
					edges: {
						color: {
							color: '#139cf8',
							hover: '#16b2ff',
							highlight: '#16b2ff',
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
						hover: true
					},

					manipulation: {
						enabled: false
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
						console.log(node)
						console.log('Node x:', node.x, 'Node y:', node.y, 'Node label:', node.options.label);

						if (this.$parent.curNavigationState == "start") {
							this.$parent.getPathForm.startNode = nodeId;
							this.$parent.getPathForm.startNodeLabel = node.options.label;
						} else {
							this.$parent.getPathForm.endNode = nodeId;
							this.$parent.getPathForm.endNodeLabel = node.options.label;
						}
					}

					this.$message.success('成功点击：' + nodeId);
					console.log('Clicked node:', nodeId);
				});
				// 监听鼠标悬浮事件
				this.network.on('hoverNode', ({
					node
				}) => {
					if (node.startsWith('t')) {
						if (node !== 'town') {
							return
						}
					}
					this.showTooltip = true;
					const hoveredNode = this.data.nodes.find(n => n.id === node);
					this.tooltipContent = this.getTooltipContent(hoveredNode);
				});

				// 监听鼠标移出事件
				this.network.on('blurNode', () => {
					this.showTooltip = false;
				});

				// 监听鼠标移动事件
				container.addEventListener('mousemove', this.handleMouseMove);


			},
			handleMouseMove(event) {
				this.tooltipPosition = {
					x: event.clientX,
					y: event.clientY
				};
			},
			getTooltipContent(node) {
				if (!node) return '';

				console.log(node)
				// 构建悬浮窗内容的 HTML
				const titleHtml = node.label ? `<div style="color: #707070;margin-bottom:5px;font-size:15px;font-weight:500;">${node.label}</div>` : '';
				const imageHtml = node.introImage ?
					`<img src="${node.introImage}" style="width:160px; object-fit:contain; border-radius:5px"/>` : '';
				const contentHtml = node.content ? `<div style="color: #707070;margin-top:5px;font-size:13px;">${node.content}</div>` : '';
				

				return `${titleHtml}${imageHtml}${contentHtml}`;
			},
			addEdge(nodeId1, nodeId2) {
				console.log(nodeId1, nodeId2)
				const edge = {
					from: nodeId1,
					to: nodeId2,
				};
				this.network.body.data.edges.add(edge);
			},
			clearAllEdge() {
				// 获取边的数据集
				const edgesDataSet = this.network.body.data.edges;

				// 移除所有边
				edgesDataSet.clear();
			},

		}
	}
</script>
<style>
	.tooltip {
		position: fixed;
		background-color: #fff;
		padding: 12px;
		border-radius: 7px;
		box-shadow: 0px 2px 6px 6px rgba(155, 155, 155, 0.3);
		background-color: rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(15px);
		transition: opacity 0.4s;
	}

	.tooltip.fade-enter,
	.tooltip.fade-leave-to {
		opacity: 0;
	}
</style>