import axios from 'axios'
// const URL =  "http://192.168.113.240:8080"
const URL =  "http://192.168.27.30:8080"
// const URL =  "http://localhost:8080"
// create an axios instance
const service = axios.create({
	baseURL: URL, // url = base url + request url
	timeout: 10000 ,// request timeout
	withCredentials: true,
	crossDomain: true
})

// http request 拦截器
service.interceptors.request.use(
	config => {
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
service.interceptors.response.use(
	response => {
		if(response.status == 200){
			return response.data
		}
		return -1;
	},
	error => {
		return Promise.reject(error)
	}
)

export default service