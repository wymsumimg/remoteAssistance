<template>
<div class="globalTableHeight">
    <div class='departmentList'>
        <!-- 待执行任务 -->
        <div class="container">
            <div class="handle-box">
                <div class="dl_top">
                    <div class="topdp" flex-wrap flex='cross:center'>
                        <div class="mb10" flex='cross:center'>
                            <!-- 开始时间 -->
                            <div class="dl_dpname">{{$t('menu.doTime')}}：</div>
                            <div class="dl_sel mr10 moreDatesel">
                                <!-- range-separator="至" -->
                                <el-date-picker
                                    format='yyyy-MM-dd'
                                    value-format='yyyy-MM-dd'
                                    v-model="startTime"
                                    type="datetimerange"
                                    :range-separator="$t('menu.zhi')"
                                    :start-placeholder="$t('menu.startBeginTime')"
                                    :end-placeholder="$t('menu.endOverTime')"
                                    @change="changeTime()">
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="mb10" flex='cross:center'>
                            <!-- 任务名称 -->
                            <div class="dl_dpname">{{$t('menu.tsName')}}：</div>
                            <div class="dl_sel mr10">
                                <!-- 15字以内 -->
                                <el-input v-model="query.obj.Name" maxlength="15" style="width:150px" clearable :placeholder="$t('menu.fifteenLimit')"></el-input>
                            </div>
                        </div>
                        <!-- 执行方式 -->
                        <div class="mb10" flex='cross:center'>
                            <div class="dl_dpname">{{$t('menu.doMethod')}}：</div>
                            <div class="dl_sel mr10">
                                <el-select v-model="query.obj.OperateType" :placeholder="$t('menu.pSelect')" style="width:150px" clearable>
                                    <el-option
                                    v-for="item in OperateTypeList"
                                    :key="item.ID"
                                    :label="item.Name"
                                    :value="item.ID">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="mb10" flex='cross:center'>
                            <!-- 区域 -->
                            <div class="dl_dpname">{{$t('menu.area')}}：</div>
                            <div class="dl_sel mr10">
                                <el-select v-model="query.obj.m_Area_ID" :placeholder="$t('menu.pSelect')" style="width:150px" clearable>
                                    <el-option
                                     
                                    v-for="item in areaList"
                                    :key="item.ID"
                                    :label="item.Name"
                                    :value="item.ID">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="mb10" flex='cross:center'>
                            <!-- 执行组   这个跟前面三个执行状态不一样 -->
                            <div class="dl_dpname">{{$t('menu.doGroup')}}：</div>
                            <div class="dl_sel mr10">
                                <el-select v-model="query.obj.IfGroupOrEmployee" :placeholder="$t('menu.pSelect')" clearable style="width:150px">
                                    <el-option
                                    v-for="item in performList"
                                    :key="item.ID"
                                    :label="item.Name"
                                    :value="item.ID">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <!-- 执行人 -->
                        <!-- <div class="mb10" flex='cross:center'>
                            
                            <div class="dl_dpname">{{$t('menu.doMan')}}：</div>
                            <div class="dl_sel mr10">
                                <el-input v-model="model.userPerson" style="width:150px" :placeholder="$t('menu.pPlace')"></el-input>
                            </div>
                        </div>  赞空 -->
                        <!-- 执行状态 -->
                        <div flex='cross:center'>
                            <div class="mb10" flex='cross:center'>
                                <div class="dl_dpname">{{$t('menu.doStatus')}}：</div>
                                <div class="dl_sel mr10">
                                    <el-select v-model="query.obj.Record_State" :placeholder="$t('menu.pSelect')" style="width:150px" clearable>
                                        <el-option
                                        v-for="item in recordStateList"
                                        :key="item.ID"
                                        :label="item.Name"
                                        :value="item.ID">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <!-- 查询 -->
                            <div class="mr10 mb10"><el-button type="primary"  @click="selectBtn">{{$t('menu.selectBtn')}}</el-button></div>
                            <!-- 清空 -->
                            <div class="mr10 mb10"><el-button type="primary" @click="emptyBtn">{{$t('menu.emptyBtn')}}</el-button></div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            <div class=""> 
                
                <!-- 导出 -->
                <el-button  class="newBtn" style="padding: 12px 29px;border-color:#DCDFE6;"  :style="{'color':'#'+themeColor}" @click="exportProject()">{{$t('menu.export')}}</el-button>
            </div>
            <div   class="marsTable" ref="marsTable">
                <div>
                    <el-table
                        :data="num"
                        v-loading='loading'
                        border
                        class="table"
                        ref="multipleTable"
                        header-cell-class-name="table-header"
                    >
                        <!-- 序号 -->
                        <el-table-column prop="id" :label="$t('menu.number')" width="80" align="center">
                            <template slot-scope="scope">
                                <span>{{(query.pager.page - 1) * query.pager.rows + scope.$index + 1}}</span>
                            </template>
                        </el-table-column>
                        <!-- 任务名称 -->
                        <el-table-column prop="m_Task_Name" :label="$t('menu.tsName')" align="center" show-overflow-tooltip>
                            <slot slot-scope="scope">
                                <div>
                                    {{scope.row.m_Task_Name}}<span v-if="scope.row.Parent_ID>0&&scope.row.recordType==1" style="color:red;">{{$t('menu.reDoing')}}</span>
                                </div>
                            </slot>
                        </el-table-column>
                        <!-- 执行流程 -->
                        <el-table-column prop="m_OperateProcess_Name" :label="$t('menu.doFlow')" align="center" show-overflow-tooltip></el-table-column>
                        <!-- 执行方式 -->
                        <el-table-column prop="OperateType" :label="$t('menu.doMethod')" align="center" width="150">
                            <slot slot-scope="scope">
                                <span>
                                    {{scope.row.OperateType_Name}}<span v-if="scope.row.BeginTime">&nbsp;{{scope.row.BeginTime}}-{{scope.row.EndTime}}</span>
                                </span>
                            </slot>
                        </el-table-column>
                        <!-- 所属项目 -->
                        <el-table-column prop="m_ProjectType_Name" :label="$t('menu.pjUnder')" width="100" align="center" show-overflow-tooltip></el-table-column>
                        <!-- 区域 -->
                        <el-table-column prop="m_Area_Name" :label="$t('menu.area')" align="center" show-overflow-tooltip>
                            <slot slot-scope="scope">
                                <span >{{scope.row.m_Area_Name | noValue}}</span>
                            </slot>
                        </el-table-column>
                        <!-- 执行组 -->
                        <el-table-column prop="Group_Name" :label="$t('menu.doGroup')" align="center">
                            <slot slot-scope="scope">
                                <!-- @click="seeGroup" 点击弹出执行组 -->
                                <span>
                                    <span style="color:#409EFF;cursor:pointer;" v-if="scope.row.Group_Name" @click="seeGroup(scope.row.GroupID)">{{scope.row.Group_Name}}</span>
                                    <span v-else>-</span>
                                </span>
                                
                            </slot>
                        </el-table-column>
                        <!-- 执行人 -->
                        <el-table-column prop="Over_Employee_Name" :label="$t('menu.doMan')" align="center">
                            <slot slot-scope="scope">
                                <span >{{ scope.row.IfGroupOrEmployee==2? 
                                    (scope.row.Over_Employee_Name!=""? scope.row.Over_Employee_Name: scope.row.One_Employee_Name):scope.row.Task_Employee_Name | noValue}}</span>
                            </slot>
                        </el-table-column>
                        <!-- 开始时间 -->
                        <el-table-column prop="CreateTime" :label="$t('menu.StartTime')" align="center" show-overflow-tooltip>
                            <slot slot-scope="scope">
                                <span>
                                    {{scope.row.CreateTime | noValue}}
                                </span>
                            </slot>
                        </el-table-column>
                        <!-- 完成时间 -->
                        <el-table-column prop="OverTime" :label="$t('menu.completeTime')" align="center" show-overflow-tooltip>
                            <slot slot-scope="scope">
                                <span>
                                    {{scope.row.OverTime | noValue}}
                                </span>
                            </slot>
                        </el-table-column>
                        <!-- 工作时长 -->
                        <el-table-column prop="TimeLength" :label="$t('menu.workTime')" align="center" show-overflow-tooltip></el-table-column>
                        <!-- 执行状态 -->
                        <el-table-column prop="m_Employee_Name" :label="$t('menu.doStatus')" width="100" align="center">
                            <slot slot-scope="scope">
                                <div >
                                    <!-- {{tableState[item.State]}} -->
                                    <!--
                                        '-1':'未执行',
                                        '0':'未完成',
                                        '1':'已完成',
                                        '2':'已终止',
                                        '3':'已作废',
                                        '4':'超时完成',
                                        待执行、执行中→黄色；已完成、超时完成→绿色；未执行、未完成、已终止→红色
                                        -->
                                        <!-- 未完成 已完成  已终止  已作废 超时完成  执行中 执行中 执行中-->
                                    <span style="color:#da534f" v-if="scope.row.State==0 && scope.row.isTime==2 ">{{$t('menu.unfinished')}}</span>
                                    <span style="color:#8bc34b" v-if="scope.row.State==1">{{$t('menu.completes')}}</span>
                                    <span style="color:#da534f" v-if="scope.row.State==2" >{{$t('menu.terminated')}}</span>
                                    <span style="color:#da534f" v-if="scope.row.State==3">{{$t('menu.cancellation')}}</span>
                                    <span style="color:#8bc34b" v-if="scope.row.State==4">{{$t('menu.overtimeComplate')}}</span>
                                    <span style="color:#f0ad4f" v-if="scope.row.State==0 && scope.row.isTime==1&& scope.row.OperateType==1 ">{{$t('menu.pendingIng')}}</span>
                                    <span style="color:#f0ad4f" v-if="scope.row.State==0 && scope.row.isTime==0">{{$t('menu.pendingIng')}}</span>
                                    <!-- <span style="color:#f0ad4f" v-if="scope.row.State==0 && scope.row.OperateType==0 ">{{$t('menu.pendingIng')}}</span> -->
                                </div>
                            </slot>
                        </el-table-column>
                        <!-- 操作 -->
                        <el-table-column :label="$t('menu.operate')"  align="center" width="150" >
                            <template slot-scope="scope">
                                <!-- 任务详情 -->
                                <el-tooltip class="item" effect="dark" :content="$t('menu.tsdetail')" placement="top-end">
                                    <el-button type="text" @click="toggleShow(scope.$index,scope.row.ID,scope.row.Record_ID,scope.row.m_Task_Name,scope.row.AuditingIfPass)" style="padding:0 10px;">
                                        <img src="./video/tsdetail.png" class="cocur " alt="">
                                    </el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagination">
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="query.pager.page"
                        :page-size="query.pager.rows"
                        :page-sizes="[10, 20, 30, 40]"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="this.total">
                    </el-pagination>
                </div>
            </div>
            
        </div>
        
        <!-- 查看小组弹出框 -->
        <!-- 查看小组 -->
        <el-dialog :title="$t('menu.seegroup')" :visible.sync="dialogTableVisible" width="50%" class="ctSeeDioHeight">
            <div style='height:400px;overflow-y:auto;'>
                <el-table :data="gridData" 
                    border
                    class="table"
                    header-cell-class-name="table-header">
                    <!-- 序号 -->
                    <el-table-column property="date" :label="$t('menu.number')"  align="center" width="150">
                        <slot slot-scope="scope">
                            <span>{{(paramsGroup.pager.page - 1) * paramsGroup.pager.rows + scope.$index + 1}}</span>
                        </slot>
                    </el-table-column>
                    <!-- 姓名 -->
                    <el-table-column prop="TrueName" property="name" :label="$t('menu.name')"  align="center"></el-table-column>
                </el-table>
            </div>
            <div style="text-align:right;margin-top:10px">
                <el-pagination
                    background
                    @size-change="handleSizeChangeGroup"
                    @current-change="handleCurrentChangeGroup"
                    :current-page="paramsGroup.pager.page"
                    :page-size="paramsGroup.pager.rows"
                    :page-sizes="[10, 20, 30, 40]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="this.groupTotal">
                </el-pagination>
            </div>
        </el-dialog>

        <!-- 任务详情弹框 -->
        <el-dialog :title="this.review_m_Task_Name" :visible.sync="taskDeVisible" width="70%" class="taskDeDio ctTaskDioHeight"  >
            <!-- // 这里的插槽会替换title显示的内容 -->
            <div slot="title" class="header-title" flex='main:justify '>
                <span  class="title-name"> {{ this.review_m_Task_Name }}</span>
                <span class="title-age">
                    <div class="posiPass">
                    </div>
                </span>
            </div>
            <div class="reviewClass">
                <div style="min-width:1200px;overflow-x:auto;">
                <div class="rc_top">
                    <!-- <div class="line">
                        <div class="posiLine"></div>
                    </div> -->
                    <!-- 图片视频列表 -->
                    <div class="imgVideoBox">
                        <ul class="ivb_ul" flex flex-wrap >
                            <li class="ivb_li" v-for='(item,index) in this.taskLiData' :key='index' @mouseenter='moEnter(item)'>
                                <div class="rc_imgBox">
                                    <img src="../../common/comImg/topRight.png" class="rightImg" alt="">
                                    <div class="rv_img" v-proportion="0.75">
                                        <!-- 没有图片的时候 -->
                                        <img src="../../common/comImg/noImg.jpg" alt="" v-show="item.FileType==0">
                                        <!-- 图片 -->
                                        <!-- 新 img点击事件放大图片 -->
                                        <img :src="item.FileSrc" :id='item.ID' @click="photoFull(item.ID)" alt v-show="item.FileType==1" >
                                        <!-- 视频 -->
                                        <div
                                            class="demo1-video stepPlayBtn"
                                            style="width:100%;height:100%"
                                            v-show="item.FileType==2"
                                        >
                                            <!-- controls  去掉 -->
                                            <!-- video里的点击事件  暂停 @click="videoClick(item)" -->
                                            <!-- 新 video点击事件放大视频 -->
                                            <video
                                                :id="'vdo_'+item.SID"
                                                style="width:100%;height:100%"
                                                class="video-js vjs-default-skin videoFlag"
                                                preload="none"
                                                controlslist="nodownload noprogressControl noremoteplayback"
                                                disablepictureinpicture="false"
                                                poster
                                                @click="full(item.SID)"
                                            >
                                                <source :src="item.FileSrc" type="video/mp4" />
                                            </video>
                                            <div class="playBtn" :id="item.SID" :ref="item.SID">
                                                <!-- img里的事件 播放 @click="playBtn(item)" -->
                                                <img
                                                    src="../../common/comImg/videoPlay.png"
                                                    
                                                    alt
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="rc_stepNum">{{item.StepNumber}}</div>
                                    <div>
                                        <!-- 通过 pass -->
                                        <div class="rc_stepPass rc_stepPassGreen" v-if="item.ResultState==1">{{$t('menu.pass')}}</div>
                                        <!-- 不通过 -->
                                        <div class=" rc_stepPass" v-if="item.ResultState==2">{{$t('menu.noPass')}}</div>
                                        
                                    </div>
                                    
                                </div>
                                <div class="rc_textBox">
                                    <ul style="box-sizing: border-box;" v-proportion="0.47">
                                        <li flex>
                                            <!-- 步骤名称 -->
                                            <div class="rct_title rct_content_t">{{$t('menu.stepName')}}</div>
                                            <div class="rct_content rct_content_top" style="text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">{{item.step_Name}}</div>
                                        </li>
                                        <li flex style="margin:5px 0;">
                                            <!-- 工作时间 -->
                                            <div class="rct_title">{{$t('menu.workedTime')}}</div>
                                            <div class="rct_content">{{item.contantTime}}</div>
                                        </li>
                                        <li flex>
                                            <!-- 工作时长 -->
                                            <div class="rct_title">{{$t('menu.workTime')}}</div>
                                            <div class="rct_content">{{item.TimeLength}}</div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                </div>
            </div>
        </el-dialog>
    </div>
</div>
</template>

<script>
// import { fetchData } from '../../api/index';
import { GetRecordListByTaskID,GetTaskRecordList , GetTaskRecordDownExcelZip} from '@/api/taskManage'
import {getAreaList,getGetGroupUserList} from '@/api/api1'
    export default {
        components: {
        },
        data() {
            return {
                srcList:[],
                FileSrc:'',
                step_Name:"",
                step_NameVideo:"",
                videoFileSrc:"",
                startTime:"",
                show3: true,
                query: {
                    "pager":{
                        "page":1,
                        "rows":10,
                    },
                    "obj":{
                        "m_Company_ID":localStorage.getItem('Company_ID'),
                        "EmpID":localStorage.getItem('emp_ID'),
                        "Name":"",
                        "Begin_CreateTime":"",
                        "End_CreateTime":"",
                        "IfGroupOrEmployee":"",
                        "OperateType":"",
                        "m_Area_ID":"",
                        "Record_State":""
                        
                    }
                },
                areaList:[],
                performList:[
                    // 按单人执行
                    {ID:1,Name:this.$t('menu.pressSingle')},
                    // 按小组执行
                    {ID:2,Name:this.$t('menu.groupSingle')},
                ],
                isEnableList: [
                    // 停用
                    {
                    ID: '0',
                    Name: this.$t('menu.forbid')
                    }, 
                    // 正常
                    {
                    ID: '1',
                    Name: this.$t('menu.normal')
                }],
                OperateTypeList:[
                    // 重复
                    {
                    ID: '0',
                    Name: this.$t('menu.repeat')
                    }, 
                    // 每日
                    {
                    ID: '1',
                    Name: this.$t('menu.daily')
                    }
                ],
                recordStateList:[
                    // 未完成
                    {
                    ID: '0',
                    Name: this.$t('menu.unfinished')
                    }, 
                    // 执行完成
                    {
                    ID: '1',
                    Name: this.$t('menu.completes')
                    },
                    // 已终止
                    {
                    ID: '2',
                    Name: this.$t('menu.terminated')
                    },
                    // 已作废
                    {
                    ID: '3',
                    Name: this.$t('menu.cancellation')
                    },
                    // 超时完成
                    {
                    ID: '4',
                    Name: this.$t('menu.overtimeComplate')
                    }
                ],
                tableState:{
                     '0':'未完成',
                     '1':'已完成',
                     '2':'已终止',
                     '3':'已作废',
                     '4':'超时完成',
                },
                ResultState:{
                    '0':'未审核',
                    '1':'通过',
                    '2':'不通过',
                },
                newForm:{
                    name:""
                },
                model:{},
                delList: [],
                gridData:[],
                newVisible:false,
                taskVisible:false,
                dialogTableVisible:false,
                total: 0,
                qrcodeFrom:{},
                id: -1,
                currentPage:1,
                num:[],
                disablePictureInPicture:false,
                sonList:[],
                TaskID:'',
                groupTotal:0,
                paramsGroup:{
                    "pager":{
                        "page":1,
                        "rows":10
                    },
                    "obj":{
                        "ID":""
                    }
                },
                taskDeVisible:false,
                taskLiData:[],
                idNum:10000,
                moEnterID:"",
                review_m_Task_Name:"",
                loading:true,
                themeColor:localStorage.getItem('themeColor')
                
                
            };
        },
        computed: {},
        watch: {},
        mounted() { 
            if(localStorage.getItem('lang')=='ch'){
                this.$i18n.locale = 'ch'
            }else if(localStorage.getItem('lang')=='jp'){
                this.$i18n.locale = 'jp'
            }
            // 从首页获取数据  执行时间是昨天的   执行状态是 未完成
            if(this.$route.query){
                if(this.$route.query.time==0&&this.$route.query.finish==0){
                    var day1 = new Date();
                    day1.setTime(day1.getTime()-24*60*60*1000);
                    var s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
                    this.startTime=[s1,s1]
                    this.query.obj.Begin_CreateTime=this.startTime[0]
                    this.query.obj.End_CreateTime=this.startTime[1]
                    this.query.obj.Record_State='0'
                }
            }

            // this.$refs.video[0]['disablePictureInPicture']=true
            // video[0]['disablePictureInPicture'] = true
            this.query.pager.rows=this.$winScreen()
            // 列表
            this.getGetTaskRecordList()
            this.getGetAreaList()
        },
        methods: {
            // 导出
            exportProject(){
                if(this.num.length>0){
                    const rLoading = this.openLoading();
                    GetTaskRecordDownExcelZip(this.query).then(res=>{
                        let {ReturnCode,Data}=res
                        if(ReturnCode==200){
                            
                            rLoading.close();
                            const link = document.createElement('a') // 创建a标签
                            link.href = Data
                            link.download = this.$t('menu.tsRecord') // 任务记录   重命名文件
                            link.click()
                            // URL.revokeObjectURL(url) // 释放内存
                        }
                        else{
                            rLoading.close();
                        }
                    })
                }else{
                    // 当前没有可导出数据
                    this.$message.warning(this.$t('menu.noCanexport'))
                }
                
            },
            getGetTaskRecordList(){
                GetTaskRecordList(this.query).then(res=>{
                    let {ReturnCode,Data}=res
                    if(ReturnCode==200){
                        this.num=Data.rows
                        this.total=Data.total
                        for(let i=0;i<this.num.length;i++){
                            this.num[i].child=[]
                            if(this.num[i].TimeLength){
                                let TimeLength=String(this.num[i].TimeLength)
                                let splitString=TimeLength.split('.')
                                if(splitString[0]=='0'){
                                    this.num[i].TimeLength=splitString[1]+'秒'
                                }else{
                                    this.num[i].TimeLength=splitString[0]+'分'+splitString[1]+'秒'
                                }
                            }
                        }
                        this.loading=false
                    }else{
                        this.loading=false
                    }   
                })
            },
            
            //展开收起按钮点击
            toggleShow(index,ID,Record_ID,m_Task_Name,AuditingIfPass) {
                this.review_m_Task_Name=m_Task_Name
                this.passBtnVisiID=ID
                this.passBtnVisiRecordID=Record_ID
                this.PassBtnAuditingIfPass=AuditingIfPass
                // 根据id 获取详情
                let params={
                    // TaskID:ID
                    Record_ID:ID
                }
                GetRecordListByTaskID(params).then(res=>{
                    let {ReturnCode,Data}=res
                    if(ReturnCode==200){
                        this.taskLiData=Data.list
                        this.taskDeVisible=true
                        
                        for(let i=0;i<this.taskLiData.length;i++){
                             this.taskLiData[i].SID = this.idNum++;
                            this.taskLiData[i].contantTime=(this.taskLiData[i].BeginTime.split(" ")[1])+'-'+(this.taskLiData[i].EndTime.split(" ")[1])
                            if(this.taskLiData[i].StepNumber<10){
                                this.taskLiData[i].StepNumber='0'+this.taskLiData[i].StepNumber
                            }
                            if(this.taskLiData[i].TimeLength){
                                let TimeLength=String(this.taskLiData[i].TimeLength)
                                let splitString=TimeLength.split('.')
                                if(splitString[0]=='0'){
                                    this.taskLiData[i].TimeLength=splitString[1]+'秒'
                                }else{
                                    this.taskLiData[i].TimeLength=splitString[0]+'分'+splitString[1]+'秒'
                                }
                            }
                        }

                    }
                })
            

            
            
            },
             // 区域
            getGetAreaList(){
                let params={
                    'pager':{
                        page: 1,
                        rows: 1000
                    },
                    "obj":{
                        "m_Company_ID":localStorage.getItem('Company_ID'),
                        "EmpID":localStorage.getItem('emp_ID'),
                    }   
                }
                getAreaList(params).then(res=>{
                    let {ReturnCode,Data}=res
                    if(ReturnCode==200){
                         this.areaList=Data.rows
                    }
                })
            },
            changeTime(){
                this.query.obj.Begin_CreateTime=this.startTime?this.startTime[0]:''
                this.query.obj.End_CreateTime=this.startTime?this.startTime[1]:''
            },
             selectBtn(){
                 this.getGetTaskRecordList()
             },
             emptyBtn(){
                this.query.obj.Name=""
                this.query.obj.Begin_CreateTime=""
                this.query.obj.End_CreateTime=""
                this.query.obj.IfGroupOrEmployee=""
                this.query.obj.OperateType=""
                this.query.obj.m_Area_ID=""
                this.query.obj.Record_State=""
                this.startTime=""
                this.getGetTaskRecordList()
             },
            handleSizeChange(val) {
                this.query.pager.rows=val
                this.getGetTaskRecordList()

            },
            handleCurrentChange(val) {
                this.query.pager.page=val
                this.getGetTaskRecordList()
            },
            handleSizeChangeGroup(val){
                this.paramsGroup.pager.rows=val
                this.getgetGetGroupUserList()
            },
            handleCurrentChangeGroup(val) {
                this.paramsGroup.pager.page=val
                this.getgetGetGroupUserList()
            },
            seeGroup(ID){
                this.dialogTableVisible=true
                this.paramsGroup.obj.ID=ID
                this.getgetGetGroupUserList()
            },
            getgetGetGroupUserList(){
                
                
                getGetGroupUserList(this.paramsGroup).then(res=>{
                    let {ReturnCode,Data}=res
                    if(ReturnCode==200){
                        this.gridData=Data.rows
                        this.groupTotal=Data.total
                    }
                })
            },
            // 点击播放按钮播放视频（划过）
            playBtn(item) {
                let vdoBtn = document.getElementById('vdo_' + item.SID);
                vdoBtn.src = item.FileSrc;
                vdoBtn.play();
                let itemSID = item.SID;
                // 监听视频播放
                vdoBtn.addEventListener('play', function() {
                    if(document.getElementById(itemSID)){
                        document.getElementById(itemSID).style.display = 'none';
                    }
                    
                });
                vdoBtn.addEventListener('pause', function() {
                    if(document.getElementById(itemSID)){
                        document.getElementById(itemSID).style.display = 'block';
                    }
                    
                });
            },
            // 点击暂停视频（改成划过的）
            videoClick(item) {
                let vdoBtn = document.getElementById('vdo_' + item.SID);
                if (vdoBtn.ended == false) {
                    vdoBtn.pause();
                    let itemSID = item.SID;
                    document.getElementById(itemSID).style.display = 'block';
                }
            },
            moEnter(item){
                // 先存一下 要是进入相同的视频就不重新开始播放
                // let vdoBtn = document.getElementById('vdo_' + item.SID);
                // if (vdoBtn.ended == true) {
                //     return
                // }
                // if(item.SID==this.moEnterID){
                //     return
                // }
                this.moEnterID=item.SID

                if(item.FileType==2){
                    for(let i=0;i<this.taskLiData.length;i++){
                        if(this.taskLiData[i].FileType==2){
                            var allVideo=document.getElementById('vdo_' + this.taskLiData[i].SID)
                            if (allVideo.ended == false) {
                                allVideo.pause();
                                let itemSID = this.taskLiData[i].SID;
                                document.getElementById(itemSID).style.display = 'block';
                            }
                        }
                    }
                    // var curVideo=document.getElementById('vdo_' + item.SID)
                    // curVideo.play()
                    this.playBtn(item)
                    // this.moEnterID=""
                    
                }
            },
            full(ID) {
                let ele = document.getElementById('vdo_'+ID);
                this.publicFull(ele)
            },
            photoFull(ID){
                let ele = document.getElementById(ID);
                this.publicFull(ele)
            },
            publicFull(ele){
                if (ele.requestFullscreen) {
                    ele.requestFullscreen();
                } else if (ele.mozRequestFullScreen) {
                    ele.mozRequestFullScreen();
                } else if (ele.webkitRequestFullscreen) {
                    ele.webkitRequestFullscreen();
                } else if (ele.msRequestFullscreen) {
                    ele.msRequestFullscreen();
                }
            },
        },
        created() {
            //  this.getData();
            
        },
        
        beforeCreate() {}, 
        beforeMount() {}, 
        beforeUpdate() {}, 
        updated() {}, 
        beforeDestroy() {},
        destroyed() {}, 
        activated() {}, 
    }
</script>
<style>
    .elDia .el-dialog__body{
        padding: 0 20px 30px;
    }

    .ctTaskDioHeight .el-dialog{
        height: 100%;
    }
    .ctSeeDioHeight .el-dialog{
        height: 60%;
    }
</style>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.cocur{
    width:16px;
    height:16px;
    cursor: pointer;
    
}

.handle-box {
    margin-bottom: 10px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.departmentList{
    .topdp{
        width: 100%;
    }
    .mt10{
        margin-top: 10px;
    }
    .dl_dpname{
        font-size: 14px;
    }
    .mb10{
        margin-bottom: 10px;
    }
 
    
}
.qrDio{
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .qrBox{
        width: 300px;
        height: 300px;
        margin-bottom: 20px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}







</style>