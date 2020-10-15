<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title" >
                    <!-- 用户登录 -->
                <!-- <div class="title_left">{{$t('menu.userLogin')}}</div> -->
                <div class="title_right" style="width:110px">
                    <el-select v-model="value" :placeholder="$t('menu.pSelect')" @change="tabLang()" >
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <el-form :model="param" :rules="rules" v-show="flag==1" ref="param" label-width="0px" class="ms-content">
                <div>
                    <el-form-item prop="username">
                        <el-input v-model="param.username" :placeholder="$t('menu.userName')">
                            <span slot="prepend" icon="el-icon-lx-people"></span>
                        </el-input>
                    </el-form-item>
                    
                    <el-form-item prop="password">
                        <el-input
                            :placeholder="$t('menu.password')"
                            v-model="param.password"
                            @keyup.enter.native="submitForm('param')"
                        >
                            <span slot="prepend" icon="el-icon-lx-lock"></span>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('param')" >{{$t('menu.login')}}</el-button>
                </div>

                <div flex="main:justify cross:center">
                    <div style="text-align:right;">
                        <!-- <el-checkbox v-model="keepLogin" v-if="flag==1">{{$t('menu.keepLogin')}}</el-checkbox> -->
                    </div>
                    <div style="text-align:right;">
                        <!-- <el-button type="text" :style="flag==2?'display:none':''"  @click="checkLogin(2)">{{$t('menu.tpLogin')}}</el-button> -->
                    </div>
                </div>
                
                
                <!-- <div style="text-align:right;margin-top:10px;color:#606266">V.2.1.6</div> -->
            </el-form>
        </div>
    </div>
</template>

<script>
import {TokenKeys} from '@/utils/variable'
import {employeeClientLogin} from '@/api/api1.js'
import CusBase64 from '@/utils/base64'
// import md5 from '@/utils/md5'
import {toggleClass} from '../../utils/index'
export default {
    data: function() {
        return {
            isRules:{},
            // 验证码
            disabled:false,
            time:5,


            param: {
                username:'',
                password:""
            },
            param2: {
                
            },
            flag:1,
            keepLogin:false,
            rules: {
                // 请输入用户名
                username: [{ required: true, message: this.$t('menu.slDeparPlace'), trigger: 'blur' }],
                // 请输入密码
                password: [{ required: true, message: this.$t('menu.pwPlace'), trigger: 'blur' }],
            },
            
            value:"ch",
            options: [
                {
                value: 'ch',
                label: '简体中文'
                }, 
                {
                value: 'jp',
                label: '日本語'
                },
                {
                value: 'en',
                label: 'English'
                },
                // {
                // value: 'la',
                // label: 'Latina'
                // },
            ],
            

            themecolor:'409eff',//默认颜色蓝色 409eff
        };
    },
    
    mounted() {
        console.log(this.themecolor,'curcolor1')
        toggleClass(document.body,'custom-'+this.themecolor)
        this.$store.commit('setThemeColor',this.themecolor)
        let curcolor=this.$store.state.themecolor
        console.log(curcolor,'curcolor')
        // 根据全局换肤 得到全局颜色
        localStorage.setItem('themeColor',this.themecolor)


        if(localStorage.getItem('lang')=='ch'){
            this.$i18n.locale = 'ch'
            this.value='ch'
        }else if(localStorage.getItem('lang')=='jp'){
            this.$i18n.locale = 'jp'
            this.value='jp'
        }else if(localStorage.getItem('lang')=='en'){
            this.$i18n.locale = 'en'
            this.value='en'
        }else if(localStorage.getItem('lang')=='la'){
            this.$i18n.locale = 'la'
            this.value='la'
        }
        if(localStorage.getItem('keepLogin')){
            let kplo=localStorage.getItem('keepLogin')
            this.keepLogin=eval(kplo.toLowerCase())
        }

        // this.ws = new WebSocket("ws://192.168.21.117:8555");
        // this.ws=this.$webSock()
        // console.log(this.ws,'login')
       

        
    },
    methods: {
        
        
        
        //转换登录方式
        checkLogin(index){
            this.flag=index;
        },
        //切换语言
        tabLang(){
            if(this.value=='ch'){
                this.$i18n.locale = 'ch'
            }else if(this.value=='jp'){
                this.$i18n.locale = 'jp'
            }else if(this.value=='en'){
                this.$i18n.locale = 'en'
            }else if(this.value=='la'){
                this.$i18n.locale = 'la'
            }
        },
        handdleMsg(msg) {
            let that = this;
            console.log(that.$global.ws);
            if (that.$global.ws && that.$global.ws.readyState == 1) {
                console.log("发送信息", msg);
                that.$global.ws.send(msg);
            }
            that.$global.ws.onmessage = function(e) {
                console.log("收到服务器内容", e);
                    console.log(e.data,'e.data')
                        if(e.data[1]==0){
                            console.log('正常')
                            if(e.data[0]==0){
                                console.log('登录')
                                
                                let personArr=e.data.slice(2)
                                localStorage.setItem('personArr',personArr)
                                
                                localStorage.setItem('ms_username', 111);
                                that.$router.push({path:'/index',query:{channel:that.param.username}})
                                
                                
                                
                            }
                        }else{
                            that.$message.error(that.$t('menu.noMouse'))
                        }
            };
        },
       //点击登录  
        submitForm(formName) {
            
            let _this=this
             this.$refs[formName].validate((valid) => {
                if (valid) {
                   
                    // 昵称+协助号（11）
                    let loginName='00'+_this.param.password+'|'+_this.param.username
                    this.handdleMsg(loginName)
                    // this.ws.send(loginName);
                    
                    // this.ws.onmessage = function (e) {
                        
                    //    console.log(e.data,'e.data')
                    //     if(e.data[1]==0){
                    //         console.log('正常')
                    //         if(e.data[0]==0){
                    //             console.log('登录')
                                
                    //             let personArr=e.data.slice(2)
                    //             localStorage.setItem('personArr',personArr)
                                
                    //             localStorage.setItem('ms_username', 111);
                    //             _this.$router.push({path:'/index',query:{channel:_this.param.username}})
                                
                                
                                
                    //         }
                    //     }else{
                    //         _this.$message.error('The connection fails')
                    //     }
                    // }
                    
                    

                        
                } else {
                    return false;
                }
                
            })
            if(this.$i18n.locale == 'ch'){
                    localStorage.setItem('lang','ch')
            }else if(this.$i18n.locale == 'jp'){
                    localStorage.setItem('lang','jp')
            }else if(this.$i18n.locale == 'en'){
                    localStorage.setItem('lang','en')
            }
            else if(this.$i18n.locale == 'la'){
                    localStorage.setItem('lang','la')
            }
            
            
        },
        
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
    padding:0 30px;
    overflow: hidden;
    box-sizing: border-box;
}
.title_left{
    float: left;
}
.title_right{
    float: right;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>