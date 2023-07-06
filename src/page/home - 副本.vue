<template>
	<div>
		<el-row>
		  <el-button type="primary" @click="testQueryById">测试调用接口</el-button>
		  <el-button>默认按钮</el-button>
		  <el-button v-if="isShow == 1" @click="testVon" type="primary">主要按钮</el-button>
		  <el-button v-else-if="isShow == 0" type="success">成功按钮</el-button>
		  <el-button v-else type="info">信息按钮</el-button>
		  <el-button type="warning">警告按钮</el-button>
		  <el-button v-show="isShow == 0" type="danger">危险按钮</el-button>
		  
		  <el-button type="danger">退出登录</el-button>
		</el-row>
		
		<div style="margin-top: 15px;">
			<el-input placeholder="请输入内容" v-model="inputData" class="input-with-select">
				<el-button slot="append" icon="el-icon-search"> 查询</el-button>
			</el-input>
		</div>
		<el-button v-if="true" type="danger">{{inputData}}</el-button>
		
		<!-- v-for -->
		<div style="margin-top: 50px;">
			<table style="margin-top: 20px;;">
				<thead class="table-style-thead">
					<th class="table-style-thead-th">ID</th>
					<th class="table-style-thead-th">姓名</th>
					<th class="table-style-thead-th">班级</th>
					<th class="table-style-thead-th">年龄</th>
				</thead>
				<tbody v-for="(item, index) in students"  :key="index">
					<td style="text-align: center;">{{item.id}}</td>
					<td style="text-align: center;">{{item.name}}</td>
					<td style="text-align: center;">{{item.grade}}</td>
					<td style="text-align: center;">{{item.age}}</td>
				</tbody>
		  </table>
		</div>
	</div>
</template>

<script>
	import { } from '../utils/request.js';
	import { queryById } from '../api/getData.js';
	
	export default {
		data() {
			return {
				isShow:1,
				inputData:null,
				students: [
					{id: 100001, name: "张三", grade: "一班", age: 18},
					{id: 100002, name: "李四", grade: "一班", age: 19},
					{id: 100003, name: "王武", grade: "二班", age: 18},
					{id: 100004, name: "张珊", grade: "三班", age: 19},
					{id: 100005, name: "王二", grade: "四班", age: 20}
				]
			}
		},
		methods: {
			//测试调用接口
			testQueryById(){
				queryById({'studentId':100010}).then(res=>{
					console.log(res)
				})
			},
			
			testVon(){
				console.log("点击事件")
			},
			
			//数组遍历
			foreachStudentList(){
				this.students.forEach((item, index) => {
					item.test = "测试属性添加" + index;
					console.log(item)
				})
				console.log(this.students)
			},
			
			testMap(){
				let mapArr = [1, 3, 5, 7, 9];
				let mapArr1 = mapArr.map((item, index) => {
					return item + 1;
				})
				console.log(mapArr)
				console.log(mapArr1)
			},
			
			//过滤数组
			filterSutdentList(){
				let filterArr = this.students.filter((item, index) => {
					return item.age == 18;
				});
				console.log(filterArr)
				console.log(this.students)
			}
		
		},
		mounted() {
			this.$nextTick(function () {
			    // 仅在整个视图都被渲染之后才会运行的代码
				console.log("mounted被调用了")
			  })
		},
		
		beforeCreate(){
			console.log("beforeCreate被调用了")
		},
		
		created(){
			console.log("created被调用了")
		},
		
		beforeMount(){
			console.log("beforeMount被调用了")
		},
		
		beforeUpdate(){
			console.log("beforeUpdate被调用了")
		},
		
		updated(){
			console.log("updated被调用了")
		},
		
		activated(){
			console.log("activated被调用了")
		},
		
		deactivated(){
			console.log("deactivated被调用了")
		},
		
		beforeDestroy(){
			console.log("beforeDestroy被调用了")
		},
		
		destroyed(){
			console.log("destroyed被调用了")
		},
		
	}
</script>

<style>

</style>