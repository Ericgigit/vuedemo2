import request from '../utils/request.js'

export function queryById(data) {
	return request({
		url: '/student/getStudent',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

//登录
export function login(data) {
	return request({
		url: '/login/login',//请求接口
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

