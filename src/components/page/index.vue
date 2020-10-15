<template>
    <div class="homeContainer" ref="homeContainer" id="homeContainer" >
        <div class="indexremote"  style="position:relative;" >
            <!-- 图片 -->
            <!-- <img style="width:100%;height:100%" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2583035764,1571388243&fm=26&gp=0.jpg" alt=""> -->
            <div style="width:100%;height:100%" :key="index" v-for="(remoteStream, index) in remoteStreams">
                <StreamPlayer :stream="remoteStream" :domId="remoteStream.getId()"></StreamPlayer>
            </div>

            <!-- 顶部数据 -->
            <!--  -->
            <div onselectstart="return false" class="toptitle" :style="{'marginLeft':(dataList ? (-(205*dataList.length)/2) : 0 )+'px'}" >
                <ul flex='main:center cross:center'>
                    <li v-for="(item,index) in dataList" :key="index" flex='cross:center '>
                        <div class="textOver">
                            {{item.name}}
                        </div>
                        <div class="gifBox">
                            <img src="../common/comImg/remote/laba.gif" alt="">
                        </div>
                    
                    </li>
                </ul>
            </div>
            <!-- 右侧数据 -->
            <div onselectstart="return false" class="rightData" :style="{'marginTop':-(75*5)/2+'px'}" style="z-index:2;">
                <ul flex='dir:top main:center cross:center'>
                    <li   @click.stop="wenzi()" class="pointer-events">
                    <div class="onediv" flex='dir:top cross:center'>
                        <img src="../common/comImg/remote/a1.png"  v-show="aa1"  style="width:30px;height:auto;" alt="">
                        <img src="../common/comImg/remote/a2.png" v-show="!aa1" style="width:30px;height:auto;" alt="">
                        
                        <span style="margin-top:5px;" :style="{'color':aa1?'#0b71d3':'#da4a4a'}">
                        <!-- 文字 -->
                        {{$t('menu.text')}}
                        </span>
                    </div>
                    <div class="liline" ></div>
                    </li>
                    <li   @click.stop="huabi()">
                    <div class="onediv" flex='dir:top cross:center'>
                        <img src="../common/comImg/remote/huabi1.png" v-show="hua" style="width:30px;height:auto;" alt="">
                        <img src="../common/comImg/remote/huabi2.png" v-show="!hua" style="width:30px;height:auto;" alt="">
                        
                        <span style="margin-top:5px;" :style="{'color':hua?'#0b71d3':'#da4a4a'}">
                        <!-- 画笔 -->
                        {{$t('menu.huaBi')}}
                        </span>
                    </div>
                    <div class="liline" ></div>
                    </li>
                    <li   @click.stop="clearPale()">
                    <div class="onediv" flex='dir:top cross:center'>
                        <img src="../common/comImg/remote/qingchu.png" style="width:26px;height:auto;" alt="">
                        
                        <span style="margin-top:5px;color: rgb(11, 113, 211);">
                        <!-- 清除 -->
                        {{$t('menu.clear')}}
                        </span>
                    </div>
                    <div class="liline" ></div>
                    </li>
                    <!-- 文件 -->
                    <!-- <li   >
                    <div class="onediv" flex='dir:top cross:center' style="position:relative;">
                        <img src="../common/comImg/remote/wenjian.png" style="width:33px;height:auto;" alt="">
                        
                        <span class="fileItem" style="margin-top:5px;color: rgb(11, 113, 211);">
                        
                        {{$t('menu.file')}}
                        <input
                            type="file"
                            id="fileId"
                            ref="fileId"
                            title
                            @change="getFile($event)"
                        />
                        </span>
                    </div>
                    <div class="liline" ></div>
                    </li> -->
                    <li  @click="endReturn()" >
                    <div class="onediv" flex='dir:top cross:center'>
                        <img src="../common/comImg/remote/jieshu.png" style="width:38px;height:auto;" alt="">
                        
                        <span style="margin-top:5px;color: rgb(218, 74, 74);">
                        <!-- 结束 -->
                        {{$t('menu.end')}}
                        </span>
                    </div>
                    <!-- <div class="liline" ></div> -->
                    </li>
                </ul>
            </div>
            <div>
                <!-- 文字弹出框 -->
                <div class="textDio" :style="{'bottom':this.textDiolog?'0px':'0px'}" v-show="tdShow">{{textDio}}</div>
                <!-- 文字输入框 -->
                <div class="textInput" flex='cross:center' v-show="textDiolog">
                    <el-input v-model="input"  @keyup.enter.native='send' size="large"></el-input>
                    <!-- 发送 -->
                    <el-button type="primary" @click="sendBtn()"   style="width:160px;height:40px;margin-left:10px;">{{$t('menu.send')}}</el-button>
                </div>
            </div>
            
           
            <!-- 画布3 -->
            <div class="palette" style="position:absolute;left:0;top:0;bottom:0;">
                <canvas id="canvas" width="1280" height="720"> </canvas>
            </div>
            



        </div>
        <!-- 图片弹框 -->
        <div class="imgTan">
            <el-dialog
                title=""
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose"
                >
                <!-- 全屏 -->
                    <img class="quanPin" @click="quanpinFang()" src="../common/comImg/remote/全屏.png" alt="">
                    <img class="closebtn" @click="close()" src="../common/comImg/remote/close.png" alt="">
                
                <!-- 图片 -->
                <div >
                    <img :src="FileSrc" style="width:100%;height:auto;" alt="">
                </div>
                
                
                
            </el-dialog>
            <div class="imgSonTan">
                    <el-dialog
                        width="70%"
                        title=""
                        :visible.sync="innerVisible"
                        >
                        <div  style="  display: flex;justify-content: center;">
                            <img :src="FileSrc" style="width:100%;height:auto;" alt="">
                        </div>
                    
                        
                    </el-dialog>
                </div>
        </div>

        
    </div>
</template>

<script>
import { getweather} from '@/api/api1.js';
import {postUpFile} from '@/api/processManage';
// import AgoraRTC from 'agora-rtc-sdk'

import RTCClient from "./agora-rtc-client";
import StreamPlayer from "./stream-player";
import { log } from './log'

// import palette from "./palette";
// import huabu from "./huabu2";

export default {
    components: {
        // palette,
        // huabu
        StreamPlayer
    },
    name: '',
    data() {
        return {
            showbarOption:{},
            paletteStyle:{},
            eraserOption:{},
            dataList:[
                // {id:1,name:'工人1fsafadsfasfdsaf可大声复活甲阿里飞机啊'},
                // {id:2,name:'工人2fsafadsfasfdsaf可大声复活甲阿里飞机啊'},
                // {id:3,name:'工人3fsafadsfasfdsaf可大声复活甲阿里飞机啊'},
            ],
            aa1:false,
            hua:true,
            input: '',
            textDio:"",
            tdShow:false,
            textDiolog:true,
            FileSrc:'',
            dialogVisible:false,
            innerVisible:false,

            url:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3942751454,1089199356&fm=26&gp=0.jpg',
            width:'1960',
            height:'720',


            onoff:false,
            oldx:0,
            oldy:0,
            ctx:'',
            linecolor:'',
            linw:8,
            qiuyu:0,
            onArr:[],
            endArr:[],
            channel:'',
            
            option: {
                appid: 'c2b7fb7818054bc8a0b61654d6e8e27b',
                token: '',
                uid: null,
                channel: '',
            },
            showJoin: false,
            localStream: null,
            remoteStreams: [],
            
        };
    },
    props: {
        msg: String
    },
    computed: {
        
    },
    

    mounted(){   
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

        // this.ws=this.$webSock()
        //  console.log(this.ws,'this.ws')
        //  console.log(JSON.parse(personArr),'000')
         this.dataList=JSON.parse(localStorage.getItem('personArr'))?JSON.parse(localStorage.getItem('personArr')):[]
        // this.channel=this.$route.query.channel
        this.option.channel=this.$route.query.channel

        // 红线回写
        this.handdleMsg()
        // 红线绘制
        this.init()
        // 视频开启
        this.joinEvent()






        
     },
    created() {
        this.rtc = new RTCClient()
            let rtc = this.rtc
            // 当有远端流加入时订阅该流
            rtc.on('stream-added', (evt) => {
            let {stream} = evt
            log("[agora] [stream-added] stream-added", stream.getId())
            rtc.client.subscribe(stream)
            // stream.muteVideo();
            })
            // 订阅成功后播放远端流
            rtc.on('stream-subscribed', (evt) => {
            let {stream} = evt
            log("[agora] [stream-subscribed] stream-added", stream.getId())
            if (!this.remoteStreams.find((it) => it.getId() === stream.getId())) {
                this.remoteStreams.push(stream)
                // remoteStreams.muteVideo();
            }
            })
            // 当远端流被移除时（例如远端用户调用了 Stream.unpublish）， 停止播放该流并移除它的画面。
            rtc.on('stream-removed', (evt) => {
            let {stream} = evt
            log('[agora] [stream-removed] stream-removed', stream.getId())
            this.remoteStreams = this.remoteStreams.filter((it) => it.getId() !== stream.getId())
            }) 
            // stream.muteVideo();
            // rtc.client.unpublish(this.rtc.localStream, function(err) {
            //     console.log(err);
            //     //……
            // });
        
       
    },
    methods: {
        



            // 2

            joinEvent () {
                if(!this.option.appid) {
                    this.judge('Appid')
                    return
                }
                if(!this.option.channel) {
                    this.judge('Channel Name')
                    return
                }
                this.rtc.joinChannel(this.option).then(() => {
                    // this.$message({
                    // message: 'Join Success',
                    // type: 'success'
                    // });
                    this.rtc.publishStream().then(() => {
                    // this.$message({
                    //     message: 'Publish Success',
                    //     type: 'success'
                    // });
                    this.localStream = this.rtc.localStream
                    this.localStream.muteVideo()
                    }).catch((err) => {
                    // this.$message.error('Publish Failure');
                    // log('publish local error', err)
                    })
                }).catch((err) => {
                    // this.$message.error('Join Failure');
                    // log('join channel error', err)
                })
                this.showJoin = true
                },
                leaveEvent () {
                this.showJoin = false
                this.rtc.leaveChannel().then(() => {
                    // this.$message({
                    // message: 'Leave Success',
                    // type: 'success'
                    // });
                }).catch((err) => {
                    // this.$message.error('Leave Failure')
                    // log('leave error', err)
                })
                this.localStream = null
                this.remoteStreams = []
                },
                judge(detail) {
                this.$notify({
                    title: 'Notice',
                    message: `Please enter the ${detail}`,
                    position: 'top-left',
                    type: 'warning'
                });
                },

















        // 发送和接收消息
        handdleMsg(msg) {
        let that = this;
        console.log(msg,msg);
        console.log(that.$global.ws,that.$global.ws);
        if (that.$global.ws && that.$global.ws.readyState == 1) {
            console.log("发送信息", msg);
            that.$global.ws.send(msg);
            // that.textDio=this.input
        }
        that.$global.ws.onmessage = function(e) {
            console.log("收到服务器内容", e);
            if(e.data[1]==0){
                    // console.log('正常接收数据')
                    if(e.data[0]==1){
                        console.log('我是画线')
                        // console.log(e.data.slice(2,e.data.length),'我是打印的字符串')
                        let backData=JSON.parse(e.data.slice(2))
                        for(let i=0;i<backData[0].length-1;i++){
                            console.log(backData[0][i].x,'0888')
                            // this.onArr.push(backData[0][i])
                            var p1 = backData[0][i];
                            var p2 = backData[0][i+1];
                            that.ctx.beginPath();
                            that.ctx.moveTo(p1.x, p1.y);
                            that.ctx.lineTo(p2.x, p2.y);

                            that.ctx.strokeStyle = "red";
                            that.ctx.lineWidth = 10;
                            that.ctx.lineCap = "round";
                            that.ctx.stroke();
                        }
                        
                    }
                    if(e.data[0]==2){
                        console.log('我是文字')
                        // that.textDio=""
                        let backDataText=e.data.slice(2)
                        console.log(backDataText,'backDataText')
                        that.tdShow=true
                        that.textDio=backDataText
                        // sjjj=JSON.stringify(backDataText)
                        // console.log(sjjj,'sjjj')

                    }
                    if(e.data[0]==5){
                        // that.clearCanvas()
                        var c=document.getElementById("canvas");  
                        var cxt=c.getContext("2d");  
                        cxt.clearRect(0,0,c.width,c.height);  
                        // 清除文字
                        that.tdShow=false
                        that.input=""
                        that.textDio=""
                        that.textDiolog=false
                    }
                }
        };
        },
        func() {               
            // ws.send('2')
            this.ws.onmessage = function (e) {
                console.log(e,'e')
                // var obj = JSON.parse(e.data)  //将websocket的string数据转换成对象
                func1(e)
            }
            let func2 = function func3(e) {
            //在此处即可同时使用websocket的数据和data数据，method函数
                if(e.data[1]==0){
                    // console.log('正常接收数据')
                    if(e.data[0]==1){
                        console.log('我是画线')
                        // console.log(JSON.parse(e.data.slice(2)),'oo')
                        let backData=JSON.parse(e.data.slice(2))
                        for(let i=0;i<backData[0].length-1;i++){
                            console.log(backData[0][i].x,'0888')
                            // this.onArr.push(backData[0][i])
                            var p1 = backData[0][i];
                            var p2 = backData[0][i+1];
                            this.ctx.beginPath();
                            this.ctx.moveTo(p1.x, p1.y);
                            this.ctx.lineTo(p2.x, p2.y);

                            this.ctx.strokeStyle = "red";
                            this.ctx.lineWidth = 10;
                            this.ctx.lineCap = "round";
                            this.ctx.stroke();
                        }
                        
                    }
                    if(e.data[0]==2){
                        console.log('我是文字')
                        // this.textDio=""
                        let backDataText=JSON.parse(e.data.slice(2))
                        console.log(backDataText,'backDataText')
                        this.tdShow=true
                        this.textDio=backDataText
                        // sjjj=JSON.stringify(backDataText)
                        // console.log(sjjj,'sjjj')

                    }
                    if(e.data[0]==5){
                        // this.clearCanvas()
                        var c=document.getElementById("canvas");  
                        var cxt=c.getContext("2d");  
                        cxt.clearRect(0,0,c.width,c.height);  
                        // 清除文字
                        this.tdShow=false
                        this.input=""
                        this.textDio=""
                        this.textDiolog=false
                    }
                }
            }
            let func1 = func2.bind(this)
        },
        init(){
            var canvas=document.getElementById("canvas");
            this.ctx=canvas.getContext("2d");
            //画一个黑色矩形
            this.ctx.fillStyle="transparent";
            this.ctx.fillRect(0,0,1280,720);
            //按下标记
            this.onoff=false;
            this.oldx=0;
            this.oldy=0;
            //设置颜色默认为红色
            this.linecolor="red";
            //宽度默认为8
            this.linw=8;
            //鼠标移动事件，事件绑定
            canvas.addEventListener("mousemove",this.draw,true);
            canvas.addEventListener("mousedown",this.down,false);
            canvas.addEventListener("mouseup",this.up,false);
        },
        
        down(event){
            if(this.hua==true){
                this.onoff=false
            }else{
                this.onoff=true;
                this.oldx=event.pageX-canvas.getBoundingClientRect().left;
                this.oldy=event.pageY-canvas.getBoundingClientRect().top;
                // console.log(this.oldx,this.oldy,'event')
            }
        },
        // socket(){
        //     var ws = new WebSocket("ws://192.168.21.117:8555");
            
        //     ws.onopen = function () {
                
        //         console.log("open");
        
        //         //ws.send(buffer);
        //         var strr = "";
        //         ws.send(strr); 
        //     }
        //     ws.onmessage = function (e) {
                
        //         console.log(e.data);
        //     }
        //     ws.onclose = function (e) {
                
        //         console.log("close");
        //     }
        //     ws.onerror = function (e) {
                
        //         console.log(error);
        //     }
        
        // },
        up(){
            this.onoff=false;
            this.qiuyu=0
            // console.log(this.onArr,'this.onArr')
            if(this.onArr.length>0){
                this.endArr.push(this.onArr)
                
                this.onArr=[]
                console.log(JSON.stringify(this.endArr))
                console.log(this.endArr,'this.endArr')
                
            
                // ws.onopen = function () {
                    
                //     console.log("open");
            
                    //ws.send(buffer);
                    // var strr = "";
                    // this.ws.send('10'+JSON.stringify(this.endArr)); 
                    let endarrSned='10'+JSON.stringify(this.endArr)
                    this.handdleMsg(endarrSned)
                    this.endArr=[]
                    
                // }
                // ws.onmessage = function (e) {
                    
                //     console.log(e.data);
                // }
                // ws.onclose = function (e) {
                    
                //     console.log("close");
                // }
                // ws.onerror = function (e) {
                    
                //     console.log(error);
                // }
            }
            
        },
        draw(event){
           
            if(this.onoff==true){
                    if(this.qiuyu%3==0){
                        var newx=event.pageX-canvas.getBoundingClientRect().left;
                        var newy=event.pageY-canvas.getBoundingClientRect().top;
                        // console.log(newx,newy,'000')
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.oldx,this.oldy);
                        this.ctx.lineTo(newx,newy);
                        // console.log(newx);
                        this.ctx.strokeStyle=this.linecolor;
                        this.ctx.lineWidth=this.linw;
                        this.ctx.lineCap="round";
                        this.ctx.stroke();
                        
                        this.oldx=newx;
                        this.oldy=newy;
                        let xy={
                            x:Math.round(this.oldx) ,
                            y:Math.round(this.oldy)
                        }
                        this.onArr.push(xy)
                    }
                    this.qiuyu++;
                
            }
            
        },


        
        paletteImage(childData){
            console.log(childData,'childData111')
        },
        // clearCanvas(){  
        //     var c=document.getElementById("canvas");  
        //     var cxt=c.getContext("2d");  
        //     cxt.clearRect(0,0,c.width,c.height);  
        // },

        clearPale(){


            // this.ws.send('50'); 
            this.handdleMsg('50')
            // 清除画笔
            // this.$refs.childpal.clearPalette()
            // 把文字变成蓝色  
            
            this.aa1=true
            // tdShow">{{textDio}}
            this.tdShow=false
            this.textDio=""
            this.textDiolog=false

        },

        wenzi(){
            this.aa1=!this.aa1
            if(this.aa1==false){
                this.textDiolog=true
                if(this.input!=''){
                    this.tdShow=true
                    this.input=""
                }   
            }else{
                this.textDiolog=false
            }
            
            
        },
        huabi(){
            this.hua=!this.hua
            
            

        },
        sendBtn(){
            if(this.input==""){
                // 输入内容不能为空
                this.$message.warning(this.$t('menu.noInputTrim'))
                return
            }
            // this.textDio=this.input

            // this.ws.send('20'+JSON.stringify(this.input)); 
            let senBtnws='20'+this.input
            this.handdleMsg(senBtnws)

            this.tdShow=true
            this.input=""

             

        },
        endReturn(){
            // this.$t('menu.ardlPoint'), this.$t('menu.tip')
             this.$confirm(this.$t('menu.suretui'), this.$t('menu.tips'), {
                confirmButtonText: this.$t('menu.sure'),
                cancelButtonText: this.$t('menu.cancel'),
                type: 'warning'
                }).then(() => {
                    let senBtnws='60'
                    this.handdleMsg(senBtnws)

                    this.leaveEvent()
                    this.$router.push('/login')
                    localStorage.removeItem('ms_username');
                }).catch(() => {
                     
                });
            
        },
        getFile(e) {
            // const rLoading = this.openLoading();
            var file = e.target.files[0];
            var _hzm = file.name.substring(file.name.lastIndexOf('.') + 1)
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadstart = evt => {
                this.progressPercent = 0;
                this.loading = true;
            };
            reader.onprogress = evt => {
                this.progressPercent = Number(((evt.loaded / evt.total) * 100).toFixed(2));
            };
            reader.onloadend = () => {
                var base64data = reader.result;

                // 下面逻辑处理
                let params = {
                    data: base64data,
                    compid: localStorage.getItem('Company_ID'),
                    hzm:_hzm
                };
                postUpFile(params).then(res => {
                    let { ReturnCode, Data } = res;
                    if (ReturnCode == 200) {
                        setTimeout(() => {
                            this.loading = false;
                        }, 1000);
                        let DataUrl = Data.Url;
                        console.log(DataUrl,'DataUrl路径')
                        let reg2 = /\.(jpeg|jpg|png|PNG)+$/;
                        if (reg2.test(DataUrl)) {
                            
                            this.FileSrc = DataUrl;
                            this.dialogVisible=true
                        } else {
                            // 不支持的格式，请重新上传
                            this.$message.warning(this.$t('menu.uploadAgain'));
                            return false;
                        }
                    } else {
                        // rLoading.close();
                        setTimeout(() => {
                            this.loading = false;
                        }, 1000);
                    }
                });
                // rLoading.close();
                document.getElementById('fileId').value = '';
            };
        },
        handleClose(){
            this.dialogVisible=false
            this.FileSrc=""
        },
        quanpinFang(){
            this.innerVisible=true
        },
        close(){
            this.dialogVisible=false
        },
       

    }
};
</script>
<style lang="scss">
    .imgTan .el-dialog{
        background: transparent;
        box-shadow: 0 1px 3px transparent;
        
    }
    .imgTan .el-dialog__headerbtn{
        font-size: 0;
    }
    .imgSonTan .el-dialog{
        background: transparent;
        box-shadow: 0 1px 3px transparent;
    }
    .imgSonTan .el-dialog__headerbtn{
         font-size: 0;
    }
</style>
<style scoped lang='scss'>
    .indexremote{
        width: 1280px;
        height: 720px;
        margin: 40px auto 0;
        background-color: #fff;
    }

    .rightData{
    position: absolute;
    top: 50%;
    right: 0;
    width: 75px;
    }
    .rightData ul{
    width: 75px;
    
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 10px;
    }
    .rightData ul li{
    width: 75px;
    height: 75px;
    font-size: 14px;
    cursor: pointer;

    }
    .rightData ul li .onediv{
    padding: 10px 0;
    }
    .rightData ul li .liline{
    height: 0.5px;
    width: 65px;
    border: 0.5px solid #fff;
    margin: auto;
    }

    .toptitle{
        // max-width: 615px;
    position: absolute;
    left: 50%;
    top: 0;
    height: 75px;
    z-index: 2;
    }
    .toptitle ul{
        
    height: 75px;
    
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 10px;
    }
    .toptitle ul li{
    width: 205px;
    height: 75px;
    // line-height: 75px;
    
    
    padding: 0 15px;
    box-sizing: border-box;

    }
    .toptitle ul li .textOver{
        width: 180px;
        height: 75px;
        line-height: 75px;
        font-size: 18px;
        overflow:hidden;

        text-overflow:ellipsis;

        white-space:nowrap;
    }
    .toptitle ul li .gifBox img{
        width: 20px;
        height: 20px;
    }
    .textInput{
        position: absolute;
        left: 0;
        right: 0;
        bottom: -60px;
        z-index: 2;
        width: 100%;
        height: 60px;
        padding: 0 10px;
        background: #fff;
        box-sizing: border-box;
    }
    .textDio{
        position: absolute;
        left: 0;
        right: 0;
        // bottom: 60px;
        z-index: 2;
        width: 100%;
        // height: 50px;
        padding: 15px 10px;
        background:rgba(0,0,0, .3);
        color: #fff;
        text-align: center;
        box-sizing: border-box;
    }
    .fileItem {
        // position: relative;
        // display: inline-block;
        // background: #409eff;
        // border: 1px solid #409eff;
        // border-radius: 4px;
        // padding: 7px 12px;
        // overflow: hidden;
        // color: #fff;
        // text-decoration: none;
        // text-indent: 0;
        // line-height: 20px;
    }
    .fileItem input {
        position: absolute;
        right: 0;
        top: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        background-color: pink;
    }

    .quanPin{
        position: absolute;
        right: 45px;
        top: 43px;
        width: 30px;
        height: 30px;
    }

    .closebtn{
        position: absolute;
        right: 5px;
        top: 43px;
        width: 30px;
        height: 30px;
    }
</style>
 