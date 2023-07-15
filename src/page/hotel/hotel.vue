<template>
	<div class="my-outline-border">
		<!-- 列表 开始 -->

		<el-form :model="queryParams" size="small" :inline="true" label-width="68px"
			style="background-color: aliceblue;padding-top: 20px;padding-left: 20px;">

			<el-form-item label="酒店名称" prop="hotelName">
				<el-input v-model="queryParams.hotelName" placeholder="请输入酒店名称" clearable
					@keyup.enter.native="handleQuery()" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery()">搜索</el-button>
				<el-button icon="el-icon-refresh" size="mini" @click="resetQuery()">重置</el-button>
				<el-button type="primary" plain icon="el-icon-refresh" size="mini"
					@click="handleRefresh()">刷新榜单查看房间余量</el-button>
				<el-button type="success" plain size="mini"
					@click="openMyOrders()">我的订单</el-button>

			</el-form-item>
		</el-form>
		<el-row>
			<!-- 循环 -->

			<el-col :span="7" v-for="(item,index) in hotelList"  v-bind:key="index"
				v-loading="loading" style="margin-top: 20px;">
				<!-- 酒店卡片 -->
				<el-card :body-style="{ padding: '0px' }" style="margin-right: 20px; height: 600px;">

					<!-- <div style="text-align: center;width: 100%;"> -->
						<img :src="item.hotelPicture" style="text-align: center;width: 100%;" class="rest_img_box" />
					<!-- </div> -->

					<!-- 房间信息 -->
					<div style="padding: 20px;">
						<div style="text-align: center;">
							<span>{{item.hotelName}}</span>
						</div>
						<el-divider>

						</el-divider>
						<div class="bottom clearfix">
							<hotelname class="hotelname">酒店地址:{{item.hotelSite}}</hotelname>
						</div>
						<div>
							<phone class="phone">联系电话:{{item.hotelPhone}}</phone>
						</div>

						<div>
							<numberofrooms class="numberofrooms">酒店房间数:{{item.RoomsNumber}}</numberofrooms>
						</div>
						<div>
							<numberofroomsremaining class="numberofroomsremaining">剩余房间数:{{item.RoomsRemainingNumber}}
							</numberofroomsremaining>
						</div>
						<el-divider>

						</el-divider>
						<div v-if="item.hotelClass" style="text-align: center;">
							酒店星级
						</div>
						<div  style="text-align: center;">
							<i v-for="count1 in item.hotelClass" class="el-icon-star-on"></i>
						</div>
						<!-- 查询预定房间信息 -->
						<el-dialog class="register-panel3" :title="title" :visible.sync="open2" width="800px"
							append-to-body>

							<template>
								<el-table :data="tableData" style="width: 100%">
									<el-table-column label="预订人" width="180">
										{{user.personName}}
									</el-table-column>
									<el-table-column prop="hotelName" label="酒店名称" width="180">
									</el-table-column>
									<el-table-column prop="roomNumber" label="房间号">
									</el-table-column>
									<el-table-column prop="startTime" label="入住时间">
									</el-table-column>
									<el-table-column prop="endTime" label="退房时间">
									</el-table-column>
								</el-table>
							</template>

						</el-dialog>


						<!-- 预定房间 -->
						<div style="text-align: center;">
							<el-button type="text" v-if="item.RoomsRemainingNumber > 0 " class="button"
								style="text-align: center;" @click="Scheduled(item)">点击预订酒店</el-button>
							<el-button type="danger" v-else disabled>此酒店已满</el-button>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>

		<el-dialog class="register-panel" :title="title" :visible.sync="open1" width="700px" @close="closeDialog"
			append-to-body>

			<div>
				请选择房间:
				<el-radio-group v-model="radio1">
					<el-radio-button v-for="(item,index) in roomList" v-if="item.state == 0" :label="index"
						:key="index">
						{{item.roomNumber}}
					</el-radio-button>
				</el-radio-group>
			</div>
			<el-divider>

			</el-divider>
			<el-descriptions class="margin-top" title="预订人信息" :column="1" size="medium" border>
				<template slot="extra">
					<el-button type="primary" size="small" @click="ScheduledThis(radio1)">预定</el-button>

				</template>
				<el-descriptions-item>
					<template slot="label">
						<i class="el-icon-user"></i>
						预订人姓名:
					</template>
					{{user.personName}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						<i class="el-icon-mobile-phone"></i>
						手机号
					</template>
					{{user.personPhone}}
				</el-descriptions-item>

				<el-descriptions-item>
					<template slot="label">
						<i class="el-icon-tickets"></i>
						预订人身份
					</template>
					<el-tag size="small">游客</el-tag>
				</el-descriptions-item>

				<el-descriptions-item v-if="roomtotal !=0">
					<template slot="label">
						<i class="el-icon-guide"></i>
						房间号
					</template>
					{{roomList[radio1].roomNumber}}
				</el-descriptions-item>
				<el-descriptions-item v-if="roomtotal !=0">
					<template slot="label">
						<i class="el-icon-user"></i>
						房间可住宿人数
					</template>
					{{roomList[radio1].capacity}}
				</el-descriptions-item>
				<el-descriptions-item v-if="roomtotal !=0">
					<template slot="label">

						<i class="el-icon-coin"></i>
						房间价格
					</template>
					{{roomList[radio1].price}}

				</el-descriptions-item>
				<el-descriptions-item v-if="roomtotal !=0">
					<template slot="label">
						<i class="el-icon-moon"></i>
						入住时间
					</template>
					<el-date-picker v-model="value1" align="right" type="date" placeholder="选择日期"
						:picker-options="pickerOptions">

					</el-date-picker>


				</el-descriptions-item>
				<el-descriptions-item v-if="roomtotal !=0">
					<template slot="label">
						<i class="el-icon-sunny"></i>
						退房时间


					</template>
					<el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期"
						:picker-options="pickerOptions1">
					</el-date-picker>


				</el-descriptions-item>

			</el-descriptions>

		</el-dialog>
		<!-- 欢迎表单 -->
		<el-dialog class="register-panel1" :title="title" :visible.sync="open" width="500px" append-to-body>
			欢迎您的到来!
		</el-dialog>



	</div>


</template>

<script>
	import {

		queryHotelByPage,
		queryRoomsByHotelId,
		queryroomByPage,
		updateRoom,
	} from '@/api/getData.js';
	import {
		setStorage,
		getStorage,
		removeStorag

	} from "@/utils/localStorage.js";

	export default {
		data() {
			return {
				tableData: [],
				pickerOptions: {

					disabledDate(time) {

						return time.getTime() <= (Date.now() - 3600 * 1000 * 24);

					},
				},
				pickerOptions1: {
					disabledDate(time) {
						return time.getTime() <= Date.now();

					},
				},

				value1: "",
				value2: "",
				title: "住宿预定系统",
				checkboxGroup1: [''],
				radio1: 0,
				cities: ['上海', '北京', '广州', '深圳'],
				//导入表单数据
				importForm: {
					kgCode: '',
					targetUrl: '',
					hotelId: '',
					personId: '',
				},
				//是否加载
				loading: true,

				//酒店房间信息
				roomList: [],
				//预定信息表
				roomInfo: {
					ID: "",
					capacity: 0,
					state: "",
				},
				//存放上传文件
				fileList: [],
				carPicture: null,

				open: true, //初始欢迎界面
				open1: false, //预定界面
				open2: false, //预订信息查看界面
				//酒店信息
				hotel: {
					Id: "",
					Name: "", //酒店名
					Phone: "", //联系电话
					Site: "", //地址
					Class: "", //星级
					RoomsNumber: "", //总房间数
					RoomsRemainingNumber: "", //剩余房间数
					Rooms: [], //房间
				},
				//所有房间
				rooms: [],
				//房间信息
				room: {
					roomId: "",
					capacity: "", //房间可住人数
					state: "", //房间状态,是否被预定
					personId: "", //预订人id
					hotelID: "", //所属酒店id
					roomNumber: "", //房间号
					price: "", //房间价格
					startTime: "", //入住时间
					endTime: "", //退房时间
				},
				//表单参数
				form: {
					hotelId: "",
					hotelName: "",
					hotelPhone: "",
					hotelSite: "",
					hotelClass: "",
					numberOfRooms: "",
					numberOfRoomsRemaining: 0,

				},
				//总条数
				total: 0,
				//房间总数
				roomtotal: 0,
				// 酒店表格数据
				hotelList: [],


				// 查询参数
				queryParams: {
					hotelName: '',
					hotelId: "",
					page: 1,
					limit: 10,
				},
				queryParamsroom: {
					hotelId: "",
					state: "",
					page: 1,
					limit: 10,
				},
				user: {
					birth: "",
					personId: null,
					personName: "",
					personPhone: "",
					personPower: null,
					password: '',
				},

			}
		},
		queryParamsroomSize: 0,
		methods: {
			formatter(time) {

				let d = new Date(time);
				let day = d.getDate();
				let month = d.getMonth() + 1;
				let year = d.getFullYear();
				let result = year + "年" + month + "月" + day + "日";
				return result;

			},
			openMyOrders() {
				this.open2 = true;
				this.title = "我的订单";
				console.log("已开启");

				this.queryParamsroom.personId = this.user.personId;
				this.queryParamsroom.hotelId = "";
				this.queryParamsroom.state = 1;
				console.log(this.queryParamsroom);
				console.log("发送信息/\\");
				queryroomByPage(this.queryParamsroom).then(response => {
					this.tableData = response.datas;
					this.queryParamsroomSize = response.total;
					console.log(response.datas);

				});
			},
			//dialog关闭时
			closeDialog() {
				this.radio1 = 0;
				this.roomtotal = 0;
				console.log("here_close");
			},
			//打开预定表单
			Scheduled(item) {
				this.open1 = true;

				this.title = "预定" + item.hotelName;
				this.room.HotelID = item.hotelId;
				this.queryParams.hotelName = "";
				this.getroomList(item);


			},

			//预定酒店
			// room: {
			// 	roomId: "",
			// 	Capacity: "", //房间可住人数
			// 	State: "", //房间状态,是否被预定
			// 	PersonId: "", //预订人id
			// 	HotelID: "", //所属酒店id
			// 	RoomNumber: "", //房间号
			// startTime:"",//入住时间
			// endTime:"",//退房时间

			// },
			ScheduledThis(radio1) {
				this.room.hotelID = this.roomList[radio1].hotelId;
				this.room.roomId = this.roomList[radio1].roomId;
				this.room.personId = this.user.personId;
				this.room.state = "1";
				this.room.startTime = this.formatter(this.value1);
				this.room.endTime = this.formatter(this.value2);
				console.log("预定信息\\/");
				console.log(this.room);
				console.log("预定信息/\\");
				updateRoom(this.room).then(response => {
					this.$message({
						message: '预定成功!',
						type: 'success'
					});
					this.CountAll();
					this.open1 = false;

				});

			},

			//遍历所有酒店房间信息
			CountAll() {
				this.queryParamsroom.personId = "";
				let listSize = this.total;
				for (let i = 0; i < listSize; i++) {
					this.CountRooms(this.hotelList[i]);
					this.CountRoomsRemaining(this.hotelList[i]);
					console.log(this.hotelList[i]);
				}
				this.$forceUpdate();
				console.log("succeed!");
			},

			//查询房间数
			CountRooms(item) {
				this.loading = true;
				this.queryParamsroom.hotelId = item.hotelId;
				this.queryParamsroom.state = "";
				console.log(this.queryParamsroom);
				queryRoomsByHotelId(this.queryParamsroom).then(response => {
					item.RoomsNumber = response.datas;
					//this.$message.error("酒店id':" + item.hotelId + "房间总数:" + response.datas);
					console.log(response.datas);
					this.loading = false;

				});


			},
			//查询空闲房间
			CountRoomsRemaining(item) {
				this.loading = true;

				this.queryParamsroom.hotelId = item.hotelId;
				this.queryParamsroom.state = 0;
				console.log(this.queryParamsroom);
				queryRoomsByHotelId(this.queryParamsroom).then(response => {
					item.RoomsRemainingNumber = response.datas;

					//this.$message.error("酒店id':" + item.hotelId + "空闲房间总数:" + response.datas);
					console.log(response.datas);
					this.loading = false;


				});

			},

			/** 查询酒店列表 */
			getList() {
				this.loading = true;
				this.queryParams.hotelId = "";

				console.log(this.queryParams);
				queryHotelByPage(this.queryParams).then(response => {
					this.hotelList = response.datas;
					console.log(response.datas);
					this.total = response.total;
					this.loading = false;
					for (let i = 0; i < this.total; i++) {
						this.hotelList[i].RoomsNumber = 0;
						this.hotelList[i].RoomsRemainingNumber = 0;
					}
					this.CountAll();



				});

			},
			// queryParamsroom: {
			// 	hotelId: "",
			// 	state: "",
			// 	page: 1,
			// 	limit: 10,
			// },
			/** 查询房间列表 */
			getroomList(item) {
				this.loading = true;

				this.queryParamsroom.hotelId = item.hotelId;
				this.queryParamsroom.state = 0;
				this.queryParamsroom.hotelName = "";
				console.log(this.queryParamsroom);
				queryroomByPage(this.queryParamsroom).then(response => {
					this.roomList = response.datas;
					this.roomtotal = response.total;
					console.log(response.datas);
					this.loading = false;

				});

			},
			handleQuery() {
				this.getList();

			},
			resetQuery() {

				this.queryParams.hotelName = "";
				this.getList();
			},
			handleRefresh() {
				//this.$message.error("radio1:" +this.radio1);
				this.CountAll();

			},
			changeCarPicture(file) {
				// 图片转成base64上传
				let reader = new FileReader();
				console.log(reader);
				reader.onload = () => {
					let _base64 = reader.result;
					let BASE64 = _base64.split(",");
					this.carPicture = BASE64[1]; //赋值
					console.log(this.carPicture);
				};
				reader.readAsDataURL(file.raw);
			},
			// 覆盖默认的上传行为，可以自定义上传的实现，将上传的文件依次添加到fileList数组中,支持多个文件
			httpRequest(option) {
				this.fileList.push(option)
			},
			// 上传前处理
			beforeUpload(file) {
				let fileSize = file.size
				const FIVE_M = 5 * 1024 * 1024;
				//大于5M，不允许上传
				if (fileSize > FIVE_M) {
					this.$message.error("最大上传5M")
					return false
				}
				//判断文件类型，必须是xlsx格式
				let fileName = file.name
				let types = ['image/jpeg', 'image/jpg', 'image/png'];
				const isImage = types.includes(file.type);
				if (!isImage) {
					this.$message.error('上传图片只能是 JPG、JPEG、PNG 格式!');
					return false;
				}

				return true
			},
			// 文件数量过多时提醒
			handleExceed() {
				this.$message({
					type: 'error',
					message: '最多支持1个附件上传'
				})
			},
			//导入Excel病种信息数据
			submitImportForm(file) {
				console.log(file);
				// 使用form表单的数据格式
				const params = {
					suitId: this.importForm.suitId,
					submitId: this.importForm.submitId,
					submitIma: this.carPicture,
				}
				console.log(this.fileList);

				submitSuitForm(params).then(res => {
					console.log(res);
					this.$message.success('新增成功');
					this.open = false;
					this.getList();
				});

			},
			getUserInfo() {
				//获取用户信息
				let user = JSON.parse(getStorage("user"));
				console.log(user);
				this.user = user;
			},


		},
		created() {
			this.CountAll();

			this.getList();
		},
		mounted() {

			this.$nextTick(function() {
				// 仅在整个视图都被渲染之后才会运行的代码
				this.getUserInfo();

			});
			this.finalhotelList = this.hotelList;
			this.value1 = Date.now();
			this.value2 = Date.now() + 1000 * 60 * 60 * 24;

		},

	}
</script>

<style>
	.my-outline-border {
		padding: 0px;
	}

	.my-form-style {
		padding-top: 20px;
		background-color: #f5f7fa;
	}

	.rest_img_box {
		width: 100%;
		height: 250px;
		/* background: url("https://img.zcool.cn/community/01a7cc5d9ecb5aa8012060beec2159.jpg@1280w_1l_2o_100sh.jpg"); */
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}
</style>