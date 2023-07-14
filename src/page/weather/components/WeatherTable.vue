<template>
	<div class="row clearfix">
		<div class="col-md-12 column">
			<table class="table table-hover" style="width: 100%;height: 100%;">
				<thead>
					<tr style="color: #606266;">
						<th scope="col">日期</th>
						<th scope="col">日间温度</th>
						<th scope="col">晚间温度</th>
						<th scope="col">天气</th>
						<th scope="col">风向</th>
						<th scope="col">风力</th>
					</tr>
				</thead>
				<tbody style="color: #606266; text-align: center;">
					<tr class="table-tr" v-for="(ele,i) in weatherlist">
						<td class="table-td">{{ formatDate(ele.date) }}</td>
						<td class="table-td">{{ele.tem_day}}℃</td>
						<td class="table-td">{{ele.tem_night}}℃</td>
						<td class="table-td">{{ele.wea}}</td>
						<td class="table-td">{{ele.win}}</td>
						<td class="table-td">{{ele.win_speed}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				cityname: ''
			}
		},
		props: {
			weatherlist: Array,
			weathersearch: Function,
		},
		methods: {
			formatDate(date) {
				const options = {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				};
				const formattedDate = new Date(date).toLocaleDateString('zh-CN', options);
				return formattedDate;
			},
			Search() {
				const {
					weathersearch
				} = this;
				weathersearch(this.cityname);
			}
		}
	}
</script>

<style>
	th {
		background-color: #efefef;
		padding-top: 12px;
		padding-bottom: 12px;
		border-bottom: 1px solid #efefef;
	}

	.table-td {
		margin: 0;
		padding-top: 12px;
		padding-bottom: 12px;
		border: none;
		border-bottom: 1px solid #efefef;
	}

	.table-tr:hover {
		background-color: #e7eeff;
		transition: all 0.4s;
	}
</style>