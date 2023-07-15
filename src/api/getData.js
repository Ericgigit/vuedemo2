import request from '../utils/request.js'

//登录
export function login(data) {
	return request({
		url: '/login/login',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

//注册
export function register(data) {
	return request({
		url: '/register/register',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

//退出登录
export function loginOut(data) {
	return request({
		url: '/login/loginOut',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

//提交投诉
export function submitSuitForm(data) {
	return request({
		url: '/dealandsuit/suit',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

//提交处理表单
export function submitDealSuitForm(data) {
	return request({
		url: '/dealandsuit/deal',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

//分页查询投诉
export function querySuitByPage(data) {
	return request({
		url: '/suit/listSuit',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

//撤回投诉
export function undoSuit(data) {
	return request({
		url: '/suit/undoSuit',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

//分配处理人员
export function allocSuit(data) {
	return request({
		url: '/suit/allocSuit',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

//评价
export function assessSuit(data) {
	return request({
		url: '/suit/assessSuit',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

//评价
export function fillSuit(data) {
	return request({
		url: '/suit/fillSuit',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

//获取最短路径
export function getPath(data) {
	return request({
		url: '/path/getPath',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

//----------------------------应急消息API------------------------------
//提交应急消息
export function submitEmergeForm(data) {
	return request({
		url: '/emergeMsg/publishMsg',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

//按页获取应急消息
export function queryEmergeByPage(data) {
	return request({
		url: '/emergeMsg/listMsg',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

//根据emergeId删除应急消息
export function deleteEmergeMsg(data) {
	return request({
		url: '/emergeMsg/undoMsg',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

//审批通过
export function approveEmergeMsg(data) {
	return request({
		url: '/emergeMsg/examineMsg',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

//审批通过
export function modifyEmergeMsg(data) {
	return request({
		url: '/emergeMsg/modifyMsg',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}



//------------------------------酒店、演出、餐厅--------------------------
export function queryHotelByPage(data) {
	return request({
		url: '/hotel/listHotel',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}
export function queryroomByPage(data) {
	return request({
		url: '/room/listRoom',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

export function queryRoomsByHotelId(data) {
	return request({
		url: '/room/countRoom',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}
//更新房间信息
export function updateRoom(data) {
	return request({
		url: '/room/updateRoom',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

export function queryRestaurantByPage(data){
	return request({
		url: '/restaurant/listRestaurant',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

export function queryPerformingByPage(data){
	return request({
		url: '/performing/listPerforming',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}
//------------------------------学生数据API-------------------------------
//学生列表
export function listStudent(data) {
	return request({
		url: '/student/listStudent',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

//通过studengId获取学生信息
export function getStudent(data) {
	return request({
		url: '/student/getStudent',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}
//删除学生
export function delStudent(data) {
	return request({
		url: '/student/delStudent',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}
//添加学生
export function addStudent(data) {
	return request({
		url: '/student/addStudent',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}
//编辑学生
export function updateStudent(data) {
	return request({
		url: '/student/updateStudent',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

