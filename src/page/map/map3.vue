<template>
  <div ref="networkContainer" style="width: 600px; height: 400px;"></div>
</template>

<script>
import vis from 'vis';

export default {
	data(){
		return{
			 data :{
			  nodes: [
          { id: 'A', label: 'A', x: 100, y: 100 },
          { id: 'B', label: 'B', x: 200, y: 200 },
          { id: 'C', label: 'C', x: 300, y: 100 }
			  ],
			  edges: []
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

            const options = {
              physics: {
                enabled: false // 禁用物理引擎以保持节点位置固定
              }
            };
      this.network = new vis.Network(container, this.data, options);

      // 添加点击事件
      this.network.on('click', (event) => {
        const nodeId = event.nodes[0];
		
        console.log('Clicked node:', nodeId);
		this.addEdge('A','B')
      });
	  
	  
    },
	addEdge(nodeId1, nodeId2) {
		console.log(nodeId1,nodeId2)
	  const edge = { from: nodeId1, to: nodeId2 };
	  this.network.body.data.edges.add(edge);
	}

  }
}
</script>
