import fetch from './request'
import request from '../../src/utils/request';





//用户名登录
export function employeeClientLogin(params) {
        return fetch.post('Employee/ClientLogin', params);
}
//用户名密码登录
export function employeePhoneLogin(params) {
        return fetch.post('Employee/ClientCodeLogin', params);
}









