<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>

<script>
    //如果keeplogin==false 当前页面关闭的时候清除缓存 ms_username
     export default {
           mounted () {
                if(localStorage.getItem('keepLogin')== false){
                    let beginTime = 0;//开始时间
                    let differTime = 0;//时间差
                    window.onunload = function (){
                    differTime = new Date().getTime() - beginTime;
                    if(differTime <= 5) {
                        localStorage.removeItem('ms_username');
                        localStorage.removeItem('Comp_Name');
                        localStorage.removeItem('userName');
                        localStorage.removeItem('m_Company_Role_Name');
                        localStorage.removeItem('memberToken');
                        localStorage.removeItem('Company_ID');
                        localStorage.removeItem('TrueName');
                        localStorage.removeItem('m_Company_Role_ID');

                        // localStorage.clear();
                    }
                    
                    };
                    window.onbeforeunload = function (){
                    beginTime = new Date().getTime();
                    };
                }

                
            },
            created(){
                this.localSocket()
            },
            methods:{
                localSocket() {
                    let that = this;
                    if ("WebSocket" in window) {
                        console.log("您的浏览器支持 WebSocket!");
                        
                        that.ws = new WebSocket(`ws://120.27.231.83:9005`);
                        that.$global.setWs(that.ws);
                        // that.ws.onopen = that.onopen();
                        this.ws.onopen = function () {
                            console.log('开始连接')
                        // debug("connected...", 'success');

                        };

                        that.ws.onclose = function() {
                        // 关闭 websocket
                        console.log("连接已关闭...");
                        setTimeout(() => {
                            that.localSocket();
                        }, 2000);
                        };
                    } else {
                        // 浏览器不支持 WebSocket
                        console.log("您的浏览器不支持 WebSocket!");
                    }
                },
            }

     }
</script>