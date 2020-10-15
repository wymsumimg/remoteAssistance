const state = {
 
  // 是否保持登录
  keepLogin:localStorage.getItem('keepLogin'),
  // 工厂编码
  // facCode:localStorage.getItem('facCode'),
  facCode:'',
  // 用户名
  username:localStorage.getItem('username'),
  // 密码
  password:localStorage.getItem('password'),
  // 天气
  weather:"",
  themecolor:'20a0ff'//默认为20a0ff
}
export default state
