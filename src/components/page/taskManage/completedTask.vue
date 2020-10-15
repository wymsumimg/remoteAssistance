<template>
<div class="globalTableHeight">
    <div class='departmentList'>
        <!-- 已完成任务 -->
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
                        <div class="mb10" flex='cross:center'>
                            <!-- 区域 -->
                            <div class="dl_dpname">{{$t('menu.area')}}：</div>
                            <div class="dl_sel mr10">
                                <el-select v-model="query.obj.m_Area_ID" :placeholder="$t('menu.pSelect')" clearable style="width:150px" >
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
                            <!-- 执行组 -->
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
                        <!-- <div class="mb10" flex='cross:center'>
                            <div class="dl_dpname">{{$t('menu.doStatus')}}：</div>
                            <div class="dl_sel mr10">
                                <el-select v-model="query.obj.isEnable" :placeholder="$t('menu.pSelect')" style="width:150px" clearable>
                                    <el-option
                                    v-for="item in isEnableList"
                                    :key="item.ID"
                                    :label="item.Name"
                                    :value="item.ID">
                                    </el-option>
                                </el-select>
                            </div>
                        </div> -->
                        <div flex='cross:center'>
                            <!-- 审核状态： -->
                            <div class="mb10" flex='cross:center'>
                                <div class="dl_dpname">{{$t('menu.auditedStatus')}}：</div>
                                <div class="dl_sel mr10">
                                    <el-select v-model="query.obj.AuditingIfPass" :placeholder="$t('menu.pSelect')"  style="width:150px" clearable>
                                        <el-option
                                        v-for="item in AuditingStateList"
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
            <div class="mb10">
                <!-- 导出 -->
                <!-- <el-button type="primary" @click="newProject()">{{$t('menu.export')}}</el-button> -->
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
                                <span >{{scope.row.Over_Employee_Name | noValue}}</span>
                            </slot>
                        </el-table-column>
                        <!-- 开始执行时间 -->
                        <el-table-column prop="CreateTime" :label="$t('menu.startBeginTime')" align="center" show-overflow-tooltip>
                            <slot slot-scope="scope">
                                <span>
                                    {{scope.row.CreateTime | noValue}}
                                </span>
                            </slot>
                        </el-table-column>
                        <!-- 执行结束时间 -->
                        <el-table-column prop="OverTime" :label="$t('menu.endOverTime')" align="center" show-overflow-tooltip>
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
                                    <!--
                                        {{actionState[item.Record_State]}}
                                        '-1':'未执行',
                                    '0':'未完成',
                                    '1':'已完成',
                                    '2':'已终止',
                                    '3':'已作废',
                                    '4':'超时完成',
                                    待执行、执行中→黄色；已完成、超时完成→绿色；未执行、未完成、已终止→红色
                                    -->
                                    <!-- 超时完成 已完成 -->
                                    <span style="color:#8bc34b" v-if="scope.row.State==4">{{$t('menu.overtimeComplate')}}</span>
                                    <span style="color:#8bc34b" v-if="scope.row.State==1">{{$t('menu.completes')}}</span>
                                </div>
                            </slot>
                        </el-table-column>
                        <!-- 审核状态 -->
                        <el-table-column prop="m_ProjectType_Name" :label="$t('menu.auditedStatus')"  align="center" show-overflow-tooltip>
                            <slot slot-scope='scope'>
                                <span>{{checkResult[scope.row.AuditingIfPass]}}</span>
                            </slot>
                        </el-table-column>
                        <!-- 操作 -->
                        <el-table-column :label="$t('menu.operate')"  align="center" width="180" >
                            <template slot-scope="scope">
                                <div style="padding:0 0 0 20px;text-align:left;">
                                     <!-- 任务详情 --> <!-- 审核详情 --><!-- 通过 --><!-- 不通过 -->
                                    <el-tooltip class="item" effect="dark" :content="$t('menu.tsdetail')" placement="top-end">
                                        <el-button type="text"  @click="toggleShow(scope.$index,scope.row.ID,scope.row.Record_ID,scope.row.m_Task_Name,scope.row.AuditingIfPass,scope.row.OperateType)" style="padding:0 10px;">
                                            <img src="./video/tsdetail.png" class="cocur " alt="">
                                        </el-button>
                                    </el-tooltip>
                                    <el-tooltip class="item" effect="dark" :content="$t('menu.adDetail')" placement="top-end">
                                        <el-button type="text"  v-show="scope.row.AuditingIfPass!=0" @click="reviewDetail(scope.$index,scope.row.ID,scope.row.Record_ID,scope.row.m_Task_Name)"   style="padding:0 10px;">
                                            <img src="./video/adDetail.png" class="cocur " alt="">
                                        </el-button>
                                    </el-tooltip>
                                    <el-tooltip class="item" effect="dark" :content="$t('menu.pass')" placement="top-end">
                                        <el-button type="text"  v-show="scope.row.AuditingIfPass==0 && per_taskpass" @click="passBtn(scope.row.ID,scope.row.Record_ID)"  style="padding:0 10px;">
                                            <img src="./video/pass.png" class="cocur " alt="">
                                        </el-button>
                                    </el-tooltip>
                                    <el-tooltip class="item" effect="dark" :content="$t('menu.noPass')" placement="top-end">
                                        <el-button type="text"  v-show="scope.row.AuditingIfPass==0 && per_tasknopass" @click="notThrough(scope.row.ID,scope.row.Record_ID,scope.row.OperateType)"   style="padding:0 10px;">
                                            <img src="./video/noPass.png" class="cocur " alt="">
                                        </el-button>
                                    </el-tooltip>
                                </div>
                                
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
        <!-- 审核不通过弹框 -->
        <!-- 不通过 -->
        <el-dialog :title="$t('menu.noPass')" :visible.sync="taskVisible" width="30%" class="ctNoPassDioHeight" @closed="handleClose" >
                <el-form ref="noThrough" :model="noThrough"  label-width="100px" :rules="rules" >
                    <div>
                        <div v-if="this.OperateType==1">
                            <!-- 重启任务 1是   0 否 -->
                            <el-form-item :label="$t('menu.tsReset')"  >
                                
                                <el-radio v-model="noThrough.ifOpen" label="1">{{$t('menu.yes')}}</el-radio>
                                
                                <el-radio v-model="noThrough.ifOpen" label="0">{{$t('menu.no')}}</el-radio>
                            </el-form-item>
                            <!-- 执行时间 -->
                            <el-form-item :label="$t('menu.doTime')" v-show='noThrough.ifOpen==1'>
                                <!-- 如果是”每日“ 要选择时间  如果是”重复“ 则不需要选择时间-->
                                <!-- 不限时 -->
                                <!-- 指定时间 -->
                                <el-radio v-model="noThrough.isOperateType" label="1">{{$t('menu.noLimitTime')}}</el-radio>
                                
                                <el-radio v-model="noThrough.isOperateType" label="2">{{$t('menu.appointTime')}}</el-radio>
                                <!-- range-separator="至"   选择时间范围 -->
                                <div v-show="noThrough.isOperateType==2" class="moreDatesel">
                                    <el-time-picker
                                        format='HH:mm'
                                        value-format='HH:mm'
                                        is-range
                                        v-model="dateTime"
                                        :range-separator="$t('menu.zhi')"
                                        :start-placeholder="$t('menu.StartTime')"
                                        :end-placeholder="$t('menu.EndTime')"
                                        :placeholder="$t('menu.chooseTimeRange')"
                                        @change="noThroughDate()">
                                    </el-time-picker>
                                </div>
                            </el-form-item>
                        </div>
                        
                        <!-- 备注 -->
                        <!-- 请输入内容 -->
                        <el-form-item  :label="$t('menu.remark')" >
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 4, maxRows: 6}"
                                :placeholder="$t('menu.pPlace')"
                                v-model="noThrough.AuditingRemark">
                            </el-input>
                        </el-form-item>
                    </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <!-- 取消 -->
                <el-button @click="taskVisible = false">{{$t('menu.cancel')}}</el-button>
                <!-- 确定 -->
                <el-button type="primary" @click="noThroughTrue()">{{$t('menu.sure')}}</el-button>
            </span>
        </el-dialog>
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
        <!-- 审核详情弹框 -->
        <el-dialog :title="this.review_m_Task_Name" :visible.sync="reviewVisible" width="30%" class="ctReviewDioHeight"  >
            <div>
                <el-form  :model="reviewDaData"  label-width="100px" :rules="rules" >
                    <div  style="margin-top:20px">
                        <div>
                            <!-- 审核人 -->
                            <el-form-item :label="$t('menu.adMan')"  >
                                <el-input v-model="reviewDaData.AuditingMan" :placeholder="$t('menu.pjName')" disabled ></el-input>
                            </el-form-item>
                            <!-- 审核时间 -->
                            <el-form-item :label="$t('menu.adTime')"  >
                                <el-input v-model="reviewDaData.AuditingTime" :placeholder="$t('menu.adTime')" disabled></el-input>
                            </el-form-item>
                            <!-- 审核结果 -->
                            <el-form-item :label="$t('menu.adResult')"  >
                                <el-input v-model="ResultState[this.reviewDaData.AuditingIfPass]" :placeholder="$t('menu.adResult')" disabled></el-input>
                            </el-form-item>
                            <!-- 是否重启任务 -->
                            <!-- <el-form-item :label="$t('menu.tsResetAsk')"  >
                                <el-input v-model="reviewDaData.ifOpenState" :placeholder="$t('menu.tsResetAsk')" ></el-input>
                            </el-form-item> -->
                            <!-- 备注 -->
                            <el-form-item :label="$t('menu.describe')" >
                                <el-input
                                class="resizeNone"
                                disabled
                                    type="textarea"
                                    :autosize="{ minRows: 4, maxRows: 6}"
                                    placeholder="-"
                                    v-model="reviewDaData.AuditingRemark">
                                </el-input>
                            </el-form-item>
                            
                        </div>
                    </div>
                </el-form>
            </div>
        </el-dialog>
        <!-- 任务详情弹框 -->
        <el-dialog :title="this.review_m_Task_Name" :visible.sync="taskDeVisible" width="70%" class="taskDeDio ctTaskDioHeight"  >
            <!-- // 这里的插槽会替换title显示的内容 -->
            <div slot="title" class="header-title" flex='main:justify '>
                <span  class="title-name"> {{ this.review_m_Task_Name }}</span>
                <span class="title-age">
                    <div class="posiPass">
                        <el-button
                            @click="passBtnTwo()" 
                            v-show="this.PassBtnAuditingIfPass==0 && per_taskpass"
                            class="hoveTop"
                            type="text"
                            >
                            <img src="./video/pass.png" class="cocurTwo mr10" alt="">
                            <span class="hoveXian">{{$t('menu.pass')}}</span>
                        </el-button>
                        <el-button
                            @click="notThroughTwo()"
                            v-show="this.PassBtnAuditingIfPass==0 && per_tasknopass"
                            class="hoveTop"
                            type="text"
                            >
                            <img src="./video/noPass.png" class="cocurTwo mr10" alt="">
                            <span class="hoveXian">{{$t('menu.noPass')}}</span>
                        </el-button>
                    </div>
                </span>
            </div>
            <div class="reviewClass">
                <div style="min-width:1200px;overflow-x:auto;">
                    <div class="rc_top" >
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
                                            <div class="rc_stepPass rc_stepPassGreen" v-if="item.ResultState==1">{{$t('menu.pass')}}</div>
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
import { GetRecordListByTaskID,TaskRecordAuditing,TaskAuditingDetile,GetTaskRecordList} from '@/api/taskManage'
import {getAreaList,getGetGroupUserList} from '@/api/api1'
    export default {
        components: {
        },
        data() {
            return {
                per_taskpass:false,
                per_tasknopass:false,
                srcList:[],
                FileSrc:'',
                step_Name:"",
                step_NameVideo:"",
                videoFileSrc:"",
                radio:'2',
                radioP:'1',
                textarea2:"",
                dateTime:"",
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
                        "isEnable":"",
                        "m_OperateProcess_ID":"",
                        "Begin_CreateTime":"",
                        "End_CreateTime":"",
                        "IfGroupOrEmployee":"",
                        "OperateType":"",
                        "m_ProjectType_ID":"",
                        "m_Area_ID":"",
                        // "AuditingState":"",
                        // "query_state":"3",
                        "Record_State":"14",
                        "AuditingIfPass":""
                    }
                },
                noThrough:{
                    ifOpen:'0',
                    isOperateType:'2',
                    BeginTime:'',
                    EndTime:"",
                    AuditingRemark:"",
                    AuditingIfPass:2,
                    AuditingMan:localStorage.getItem('TrueName'),
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
                // 执行状态  执行成功只有两个结果 要么1  要么4
                actionState:{
                    '-1':'未执行',
                    '0':'未完成',
                    '1':'已完成',
                    '2':'已终止',
                    '3':'已作废',
                    '4':'超时完成',
                    
                },
                // 审核状态
                AuditingStateList:[
                    // 待审核
                    {
                        ID: '0',
                        Name: this.$t('menu.waitReview')
                    },
                    // 审核通过
                    {
                        ID: '1',
                        Name: this.$t('menu.passReview')
                    },
                    // 审核不通过
                    {
                        ID: '2',
                        Name: this.$t('menu.noReview')
                    },
                    // 已审核
                    {
                        ID: '9',
                        Name: this.$t('menu.reviewed')
                    }
                ],
                checkResult:{
                    '-1':this.$t('menu.failed'), //'未执行'
                    '0':this.$t('menu.toAudit'), //'待审核'
                    '1':this.$t('menu.passReview'),//'审核通过',
                    '2':this.$t('menu.noReview'),//'审核没通过',
                },
                ResultState:{
                    '0':this.$t('menu.notAudit'),//'未审核',
                    '1':this.$t('menu.pass'),//'通过',
                    '2':this.$t('menu.noPass'),//'不通过',
                },
                restart:{
                    '0':'是',
                    '1':'否',
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
                rules: {
                    //  name: [
                    //     // 请输入用户名
                    //     { required: true, message: this.$t('menu.slDeparPlace'), trigger: 'blur' }
                    // ],
                    // slLabelRole:[
                    //     // 请选择角色
                    //     { required: true, message: this.$t('menu.selectRoles'), trigger: 'blur' }
                    // ]
                },
                num:[],
                sonList:[],
                sonListTwo:[],
                nothroID:'',
                Record_ID:"",
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
                reviewVisible:false,
                reviewDaData:"",
                review_m_Task_Name:"",
                taskDeVisible:false,
                passBtnVisiID:"",
                passBtnVisiRecordID:"",
                PassBtnAuditingIfPass:"",
                taskLiData:[],
                idNum:10000,
                moEnterID:"",
                OperateType:0,
                loading:true
                
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
            if(this.$route.query){
                if(this.$route.query.time==0&&this.$route.query.finish==1){
                    var day1 = new Date();
                    day1.setTime(day1.getTime()-24*60*60*1000);
                    var s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
                    this.startTime=[s1,s1]
                    this.query.obj.Begin_CreateTime=this.startTime[0]
                    this.query.obj.End_CreateTime=this.startTime[1]
                }
                if(this.$route.query.time==1&&this.$route.query.finish==1){
                    this.getIndexDate()
                }
                if(this.$route.query.time==1&&this.$route.query.audit==1){
                     this.getIndexDate()
                    this.query.obj.AuditingIfPass='9'
                }
                if(this.$route.query.time==1&&this.$route.query.audit==0){
                    this.getIndexDate()
                    this.query.obj.AuditingIfPass='0'
                }
            }
            
            
            this.query.pager.rows=this.$winScreen()
            // 列表
            this.getGetTaskRecordList()
            let nowPath=this.$route.path.substring(1)
            let perBtn=this.$permissionButton(nowPath,['per_taskpass','per_tasknopass'])
            
            for(let m=0;m<perBtn.length;m++){
                if(perBtn[m].btn=='per_taskpass'){
                    this.per_taskpass=perBtn[m].isCheck
                }
                if(perBtn[m].btn=='per_tasknopass'){
                    this.per_tasknopass= perBtn[m].isCheck
                } 
            }
            this.getGetAreaList()
        },
        methods: {
            handleClose(){
                // this.$refs.noThrough.resetFields()
                
                this.noThrough.ifOpen='0'
                this.noThrough.isOperateType='2'
                this.dateTime=""
                this.noThrough.BeginTime=''
                this.noThrough.EndTime=""
                this.noThrough.AuditingRemark=""
                this.noThrough.AuditingIfPass=2
                this.noThrough.AuditingMan=localStorage.getItem('TrueName')
                
            },
            // 获取今天的时间
            getIndexDate(){
                var day2 = new Date();
                day2.setTime(day2.getTime());
                var s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
                this.startTime=[s2,s2]
                this.query.obj.Begin_CreateTime=this.startTime[0]
                this.query.obj.End_CreateTime=this.startTime[1]
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
            
            // 任务详情 展开收起按钮点击
            toggleShow(index,ID,Record_ID,m_Task_Name,AuditingIfPass,OperateType) {
                this.review_m_Task_Name=m_Task_Name
                this.passBtnVisiID=ID
                this.passBtnVisiRecordID=Record_ID
                this.PassBtnAuditingIfPass=AuditingIfPass
                this.OperateType=OperateType
                // 根据id 获取详情
                let params={
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
            // 审核详情
            reviewDetail(index,ID,Record_ID,m_Task_Name){
                this.review_m_Task_Name=m_Task_Name
                let params={
                    // id:ID,
                    Record_ID:ID
                }
                TaskAuditingDetile(params).then(res=>{
                    let {ReturnCode,Data}=res
                    if (ReturnCode==200){
                        this.reviewDaData=Data
                        this.reviewVisible=true
                    }
                })
            },
            // 通过
            passBtn(ID,Record_ID){
                
                // 确认通过审核?
                 this.$confirm(this.$t('menu.surePassReview'), this.$t('menu.prompt'), {
                    //  确定
                    confirmButtonText: this.$t('menu.sure'),
                    // 取消
                    cancelButtonText: this.$t('menu.cancel'),
                    type: 'warning'
                    }).then(() => {
                        let params={
                            // Record_ID:ID,
                            AuditingIfPass:1,
                            AuditingMan:localStorage.getItem('TrueName'),
                            AuditingRemark:"",
                            Record_ID:ID
                        }
                        TaskRecordAuditing(params).then(res=>{
                            let {ReturnCode,Data}=res
                            if(ReturnCode==200){
                                this.$message.success(res.ErrorMessage)
                                this.getGetTaskRecordList()
                            }
                        })
                    }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });          
                });
            },
            passBtnTwo(){
                // 确认通过审核?
                 this.$confirm(this.$t('menu.surePassReview'), this.$t('menu.prompt'), {
                    //  确定
                    confirmButtonText: this.$t('menu.sure'),
                    // 取消
                    cancelButtonText: this.$t('menu.cancel'),
                    type: 'warning'
                    }).then(() => {
                        let params={
                            // Record_ID:ID,
                            AuditingIfPass:1,
                            AuditingMan:localStorage.getItem('TrueName'),
                            AuditingRemark:"",
                            Record_ID:this.passBtnVisiID
                        }
                        TaskRecordAuditing(params).then(res=>{
                            let {ReturnCode,Data}=res
                            if(ReturnCode==200){
                                this.$message.success(res.ErrorMessage)
                                this.taskDeVisible=false
                                this.getGetTaskRecordList()

                            }
                        })
                    }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });          
                });
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
            noThroughDate(){
                this.noThrough.BeginTime=this.dateTime[0]
                this.noThrough.EndTime=this.dateTime[1]
            },
             selectBtn(){
                 this.getGetTaskRecordList()
             },
             emptyBtn(){
                this.query.obj.Name=""
                this.query.obj.isEnable=""
                this.query.obj.m_OperateProcess_ID=""
                this.startTime=""
                this.query.obj.Begin_CreateTime=""
                this.query.obj.End_CreateTime=""
                this.query.obj.IfGroupOrEmployee=""
                this.query.obj.OperateType=""
                this.query.obj.m_ProjectType_ID=""
                this.query.obj.m_Area_ID=""
                this.Record_State=""
                this.query.obj.AuditingIfPass=""
                this.getGetTaskRecordList()
             },
            //  获取当前时间（时分）
            getNowTime(){
                let d = new Date();
                let my_hours=d.getHours()<10?'0'+d.getHours():d.getHours();
                let my_minutes=d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes();
                let nowHoMin=my_hours+":"+my_minutes
                let nowTimeArr=[nowHoMin,"23:59"]

                //  ["16:14", "17:14"]
                this.dateTime=nowTimeArr
                this.noThrough.BeginTime=this.dateTime[0]
                this.noThrough.EndTime=this.dateTime[1]
            },
            // 不通过
            notThrough(ID,Record_ID,OperateType){
                this.taskVisible=true
                this.nothroID=ID
                this.Record_ID=Record_ID
                this.OperateType=OperateType
            },
            // 不通过
            notThroughTwo(){
                this.taskVisible=true
                this.nothroID=this.passBtnVisiID
                this.Record_ID=this.passBtnVisiRecordID
            },
            noThroughTrue(){
                this.noThrough.Record_ID=this.nothroID
                if(this.OperateType==1){
                    if(this.noThrough.ifOpen=='1'){
                        if(this.noThrough.isOperateType=='2'){
                            if(this.noThrough.BeginTime==""){
                                this.$message.warning('请选择开始时间和结束时间')
                                return
                            }
                            
                        }
                        if(this.noThrough.isOperateType=='1'){
                            this.noThrough.BeginTime=""
                            this.noThrough.EndTime=""
                        }
                    }
                    if(this.noThrough.ifOpen=='0'){
                        this.noThrough.isOperateType= 0
                        this.noThrough.BeginTime=""
                        this.noThrough.EndTime=""
                    }
                }
                if(this.OperateType==0){
                    this.noThrough.isOperateType=0
                }
                 
                // this.noThrough.Record_ID=this.Record_ID
                // let params={
                //     m_Task_ID:this.nothroID,
                //     ifOpen:1,
                //     BeginTime:'00:00',
                //     EndTime:'00:00',
                //     AuditingRemark:"",
                //     AuditingIfPass:2,
                //     AuditingMan:""
                // }
                TaskRecordAuditing(this.noThrough).then(res=>{
                    let {ReturnCode,Data}=res
                    if(ReturnCode==200){
                        this.$message.success(res.ErrorMessage)
                        this.getGetTaskRecordList()
                        this.taskVisible = false
                        this.taskDeVisible=false
                    }
                })

                
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
                    document.getElementById(itemSID).style.display = 'none';
                });
                vdoBtn.addEventListener('pause', function() {
                    document.getElementById(itemSID).style.display = 'block';
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
                    this.playBtn(item)
                    
                }
            },
        },
        created() {
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
<style lang='scss'>
    .elDia .el-dialog__body{
        padding: 0 20px 30px;
    }
    .taskDeDio .el-dialog__header{
            padding: 20px 20px 0px;
        .title-age{
            margin-top: -10px;
            margin-right: 50px;
            .cocurTwo{
                width: 22px;
                height: 22px;
                cursor: pointer;
            }
        }
        
    }
    .resizeNone{
        .el-textarea__inner{ //el_input中的隐藏属性
                resize: none;  //主要是这个样式
        }
            
    }
    .ctNoPassDioHeight .el-dialog{
        height: 48%;
    }
    .ctSeeDioHeight .el-dialog{
        height: 60%;
    }
    .ctReviewDioHeight .el-dialog{
        height: 48%;
    }
    .ctTaskDioHeight .el-dialog{
        height: 100%;
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

 .reviewClass{
     position: relative;
    .rc_top{

        .line{
            width: 100%;
            position: absolute;
            top: -30px;
            border-top: 2px dashed #686869;
            .posiLine{
                width: 110px;
                position: absolute;
                left: 0;
                top: -3px;
                border-top: 3px solid #3DA0FC;
            }
            
            
        }
    }
   

 }



</style>