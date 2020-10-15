import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n'
// 导入Element-UI 语言包
import jaLocale from 'element-ui/lib/locale/lang/ja'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

// import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import store from '@/store';
//切换主题
import './assets/css/theme/ff66ff/index.css';
import './assets/css/theme/66ffb3/index.css';
import './assets/css/theme/409eff/index.css'; //默认颜色 蓝色

import './assets/css/icon.css';
// import './assets/css/theme/02abfd/index.css';

import './components/common/directives';
import 'babel-polyfill';
import './components/common/flex.scss'
import './components/common/lxyCommon.css'
import './components/common/wymCommon.scss'
// import  'bootstrap/dist/js/bootstrap.js'
// import  'bootstrap/dist/css/bootstrap.css'

// import '../theme/index.css'




import { Loading } from 'element-ui'
// 复制内容
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.prototype.openLoading = function() {
    const loading = this.$loading({           // 声明一个loading对象
      lock: true,                             // 是否锁屏
      text: '正在加载...',                     // 加载动画的文字
      spinner: 'el-icon-loading',             // 引入的loading图标
      background: 'rgba(0, 0, 0, 0.3)',       // 背景颜色
      target: '.sub-main',                    // 需要遮罩的区域
      body: true,                              
      customClass: 'mask'                     // 遮罩层新增类名
    })
    // setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    //   loading.close();                        // 关闭遮罩层
    // },5000)
    return loading;
}
import animated from 'animate.css' // npm install animate.css --save安装，在引入
Vue.use(animated)
// 不同屏幕显示的列表条数
import $winScreen from './components/common/windowScreen'
Vue.prototype.$winScreen = $winScreen.winScreen

// webSocket
// import webSock from './utils/webSocket'
// Vue.prototype.$webSock=webSock.webSock
import global from './components/common/global'
Vue.prototype.$global = global


// 按钮权限管理
import $permissionButton from './components/common/permissionButton'
Vue.prototype.$permissionButton = $permissionButton.permissionButton
// 图片预览
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)
// 视频播放器
import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video
// 打印
import Print from 'vue-print-nb'
Vue.use(Print);
// import vns from 'vue-number-scroll'
// Vue.use(vns);
// 时间过滤器
Vue.filter('noValue', function (val) {
    if(val==''){
        return '-'
    }else if(val==null){
        return '-'
    }else {
        return val
    }
});
// rem h5 适配
// import 'amfe-flexible';


import proportion from 'vue-proportion-directive';

Vue.use(proportion);

// vue 播放器插件 之 vue-video-player
// import VideoPlayer from 'vue-video-player'
// require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')
// Vue.use(VideoPlayer)


Vue.config.productionTip = false;
// 翻译
Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'ch',
    messages:{
        'ch': Object.assign(require('./assets/lang/zh'),zhLocale),
        'jp': Object.assign(require('./assets/lang/ja'),jaLocale),
        'en': Object.assign(require('./assets/lang/en'),jaLocale),
        'la': Object.assign(require('./assets/lang/la'),jaLocale),
        
        // 1）在标签内作为正文内容
        // <div class="title">{{$t('menu.home')}}</div>
        // 2)作为标签属性使用
        // <input :placeholder="$t('content.main')" type="text">
        // 3)作为js中文字使用时
        // console.log(this.$t('content.main'));
    
    }
});
Vue.use(ElementUI, {
    size: 'small',
    i18n: (key,value) => i18n.t(key,value)
});




//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    // document.title = `${to.meta.title}`;
    const role = localStorage.getItem('ms_username');
    if( !role && to.path !== '/login'){
        
            next('/login')
        
        
    }else{
        
        next()
    }
});

new Vue({
    router,
    i18n,
    store,
    // vns,
    render: h => h(App)
}).$mount('#app');
