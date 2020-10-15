<template>
<div class="globalTableHeight">
    <div class='departmentList'>
        <!-- 任务列表 -->
        <div class="container">
            <div class="handle-box">
                <div class="dl_top">
                    <div class="topdp" flex-wrap flex='cross:center'>
                        <div class="mb10" flex='cross:center'>
                            <!-- 任务名称 -->
                            <div class="dl_dpname">{{$t('menu.tsName')}}：</div>
                            <div class="dl_sel mr10">
                                <el-input v-model="query.obj.Name" clearable maxlength="15" style="width:150px" :placeholder="$t('menu.fifteenLimit')"></el-input>
                            </div>
                        </div>
                        <div class="mb10" flex='cross:center'>
                            <!-- 执行流程 -->
                            <div class="dl_dpname">{{$t('menu.doFlow')}}：</div>
                            <div class="dl_sel mr10">
                                <el-select v-model="query.obj.m_OperateProcess_ID" :placeholder="$t('menu.pSelect')" style="width:150px" clearable>
                                    <el-option
                                    v-for="item in processList"
                                    :key="item.ID"
                                    :label="item.Name"
                                    :value="item.ID">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="mb10" flex='cross:center'>
                            <!-- 所属项目 -->
                            <div class="dl_dpname">{{$t('menu.pjUnder')}}：</div>
                            <div class="dl_sel mr10">
                                <el-select v-model="query.obj.m_ProjectType_ID" :placeholder="$t('menu.pSelect')" style="width:150px" clearable>
                                    <el-option
                                    v-for="item in proJectList"
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
                        <div flex='cross:center'>
                            <div class="mb10" flex='cross:center'>
                                <!-- 启用状态 -->
                                <div class="dl_dpname">{{$t('menu.openStatus')}}：</div>
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
                            </div>
                            <!-- 查询 -->
                            <div class="mr10 mb10"><el-button type="primary"  @click="selectBtn">{{$t('menu.selectBtn')}}</el-button></div>
                            <!-- 清空 -->
                            <div class="mr10 mb10"><el-button type="primary" @click="emptyBtn">{{$t('menu.emptyBtn')}}</el-button></div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            <div>
                <!-- 新建任务 -->
                <!-- <el-button class="newBtn" v-show="this.par_add" @click="newProject()"><img src="../../common/screenshots/homeImg/plus.png" class="plusBtn">{{$t('menu.newBtn')}}</el-button> -->
                <el-button class="newBtn" :style="{'color':'#'+themeColor}" v-show="this.par_add" @click="newProject()">
                    <i class="el-icon-plus"></i>
                {{$t('menu.newBtn')}}</el-button>
            
                <!-- 导出 -->
                <!-- <el-button type="primary" @click="exportExl()" style="width:80px">{{$t('menu.export')}}</el-button> -->
            </div>
            <div class="marsTable" ref="marsTable">
            <el-table
                :data="tableData"
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
                <el-table-column prop="Name" :label="$t('menu.tsName')" align="center" show-overflow-tooltip>
                    <slot slot-scope="scope">
                        <div>
                           
                            {{scope.row.Name}}
                        </div>
                    </slot>
                </el-table-column>
                <!-- 执行流程 -->
                <el-table-column prop="m_OperateProcess_Name" :label="$t('menu.doFlow')" align="center" show-overflow-tooltip></el-table-column>
                <!-- 执行方式 -->
                <el-table-column prop="OperateType" :label="$t('menu.doMethod')" align="center" width="140">
                    <slot slot-scope="scope">
                        <span>
                            <!-- 重复 -->
                            <span v-show='scope.row.OperateType==0'>{{scope.row.OperateType_Name}}</span>
                            <!-- 每日 -->
                            <span v-show='scope.row.OperateType==1'>{{scope.row.OperateType_Name}}{{scope.row.BeginTime}}-{{scope.row.EndTime}}</span>
                        </span>
                    </slot>
                </el-table-column>
                <!-- 所属项目 -->
                <el-table-column prop="ProjectType_Name" :label="$t('menu.pjUnder')" width="100" align="center" show-overflow-tooltip></el-table-column>
                <!-- 区域 -->
                <el-table-column prop="m_Area_Name" :label="$t('menu.area')" align="center" show-overflow-tooltip>
                    <slot slot-scope="scope">
                        <span >{{scope.row.m_Area_Name | noValue}}</span>
                    </slot>
                </el-table-column>
                <!-- 创建人 -->
                <el-table-column prop="CreateMan" :label="$t('menu.foundMan')" align="center">
                    <slot slot-scope="scope">
                        <span >{{scope.row.CreateMan | noValue}}</span>
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
                <el-table-column prop="m_Employee_Name" :label="$t('menu.doMan')" width="100" align="center">
                    <slot slot-scope="scope">
                        <span >{{scope.row.m_Employee_Name | noValue}}</span>
                    </slot>
                </el-table-column>
                <!-- 创建时间 -->
                <el-table-column prop="CreateTime" :label="$t('menu.foundTime')" width="170" align="center"></el-table-column>
                <!-- 更新时间 -->
                <el-table-column prop="UpdateTime" :label="$t('menu.renewTime')" align="center" width="170">
                    <slot slot-scope="scope">
                        <span >{{scope.row.UpdateTime | noValue}}</span>
                    </slot>
                </el-table-column>
                <!-- 启用状态 -->
                <el-table-column prop="" :label="$t('menu.openStatus')" align="center" v-if="per_isenable">
                    <!-- active-color="#66b1ff" inactive-color="#e8e4f3" -->
                    <slot slot-scope="scope">
                        <el-switch class="switchStyle" v-model="scope.row.isEnable==1?true:false"  active-text="ON" 
                         inactive-text="OFF" @change="changeSwitch(scope.row)">
                        </el-switch>
                    </slot>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column :label="$t('menu.operate')"  align="center" width="150" v-if="per_update || per_delete">
                    <template slot-scope="scope">
                        <!-- 编辑 -->
                        <el-tooltip class="item" effect="dark" :content="$t('menu.edit')" placement="top-end">
                            <el-button type="text" v-show="per_update" @click="handleEdit(scope.$index, scope.row)" style="padding:0 10px;">
                                <img src="../../common/comImg/edit.png" class="cocur " alt="">
                            </el-button>
                        </el-tooltip>
                        <!-- 删除 -->
                        <el-tooltip class="item" effect="dark" :content="$t('menu.delete')" placement="top-end">
                            <el-button type="text" v-show="per_delete" @click="handleDelete(scope.$index, scope.row)" style="padding:0 10px;">
                                <img src="../../common/comImg/delete.png" class="cocur " alt="">
                            </el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
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
        <!-- 新建,编辑任务 弹出框 -->
        <el-dialog :title="personTitle"  :visible.sync="newVisible" width="30%" @closed="handleClose" style="vertical-align: middle;" class="elDia tlNewTan tlDioHeight">
            <el-form ref="newForm" :model="newForm"  label-width="120px" :rules="rules" >
                <div  style="margin-top:30px">
                    <!-- <div> -->
                        <!-- 任务名称 -->
                        <el-form-item :label="$t('menu.tsName')"  prop="Name">
                            <!-- 请输入 -->
                            <el-input v-model="newForm.Name" :placeholder="$t('menu.tsnPlace')" ></el-input>
                        </el-form-item>
                        <!-- 执行流程 -->
                        <el-form-item :label="$t('menu.doFlow')"   prop="m_OperateProcess_ID">
                            <!-- 请选择执行流程 -->
                            <el-select v-model="newForm.m_OperateProcess_ID" style="width:100%;" :placeholder="$t('menu.dfSelect')"  @change="chooseChangeGroup(newForm.m_OperateProcess_ID)" >
                                <el-option v-for="item in processList"
                                    :key="item.ID"
                                    :label="item.Name"
                                    :value="item.ID"
                                    ></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 执行方式 -->
                        <el-form-item :label="$t('menu.doMethod')"  >
                            <!-- 如果是”每日“ 要选择时间  如果是”重复“ 则不需要选择时间-->
                            <!-- 每日 -->
                            <el-radio v-model="newForm.OperateType" label="1">{{$t('menu.daily')}}</el-radio>
                            <!-- 重复 -->
                            <el-radio v-model="newForm.OperateType" label="0">{{$t('menu.repeat')}}</el-radio>
                            <div v-show="newForm.OperateType==1">
                                <!-- placeholder="选择时间范围"  -->
                                <el-time-picker
                                    format='HH:mm'
                                    value-format='HH:mm'
                                    is-range
                                    v-model="Time"
                                    :range-separator="$t('menu.zhi')"
                                    :start-placeholder="$t('menu.StartTime')"
                                    :end-placeholder="$t('menu.EndTime')"
                                    :placeholder="$t('menu.chooseTimeRange')"
                                    @blur="getTime()">
                                </el-time-picker>
                            </div>
                            
                        </el-form-item>
                        <!-- 执行人 -->
                        <el-form-item :label="$t('menu.doMan')"  >
                            <!-- 工作组 -->
                            <el-radio v-model="newForm.IfGroupOrEmployee" label="2">{{$t('menu.workGroup')}}</el-radio>
                            <!-- 职工 -->
                            <el-radio v-model="newForm.IfGroupOrEmployee" label="1">{{$t('menu.staff')}}</el-radio>
                            <!-- 选择工作组和职工分别显示不同的内容 -->
                            <!-- 工作组 -->
                            <div v-show="this.newForm.IfGroupOrEmployee==2">
                                <el-select v-model="newForm.GroupID" style="width:100%;" :placeholder="$t('menu.pSelect')"   >
                                    <el-option v-for="item in groupList"
                                        :key="item.ID"
                                        :label="item.Name"
                                        :value="item.ID"></el-option>
                                </el-select>
                            </div>
                            <!-- 职工 模糊查询 -->
                            <div  v-show="this.newForm.IfGroupOrEmployee==1">
                                <el-select v-model="newForm.EmpID" style="width:100%;" filterable :placeholder="$t('menu.pSelect')"  >
                                    <el-option
                                        v-for="item in EmployeeList"
                                        :key="item.ID"
                                        :label="item.TrueName"
                                        :value="item.ID">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-form-item>
                        
                    <!-- </div> -->
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <!-- 取消 -->
                <el-button @click="newVisible = false">{{$t('menu.cancel')}}</el-button>
                <!-- 确定 -->
                <el-button type="primary" @click="saveNew('newForm')">{{$t('menu.sure')}}</el-button>
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
    </div>
</div>
</template>

<script>
    import { GetTaskList,AddEditTask,SetTaskIsEnable,GetTaskSingle,DelTask} from '@/api/taskManage'
    import {GetProcessList,GetProjectTypeList} from '@/api/processManage'
    import {getAreaList,getworkGroup,getGetGroupUserList} from '@/api/api1'
    import { GetEmployeeList } from '@/api/staffManage';

    export default {
        components: {},
        data() {
            return {
                /*按钮*/
                par_add:false,
                per_update:false,
                per_delete:false,
                per_isenable:false,
                query: {
                    "pager":{
                        "page":1,
                        "rows":10,
                    },
                    "obj":{
                        "m_Company_ID":localStorage.getItem('Company_ID'),
                        "EmpID":localStorage.getItem('emp_ID'),
                        "Name":"",
                        "m_OperateProcess_ID":'',
                        "OperateType":0,
                        "BeginTime":"",
                        "EndTime":"",
                        "IfGroupOrEmployee":'',
                        "isEnable":null,
                        "m_ProjectType_ID":"",
                        "m_Area_ID":""
                    }
                },
                processList:[],
                proJectList:[],
                areaList:[],
                groupList:[],
                EmployeeList:[],
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
                Time:null,
                newForm:{
                    ID:0,
                    OperateType:'1',
                    IfGroupOrEmployee:'1',
                    
                    m_Company_ID:localStorage.getItem('Company_ID'),
                    EmpID:"",
                    GroupID:""
                    
                },
                model:{},
                tableData: [],
                gridData:[],
                delList: [],
                newVisible:false,
                dialogTableVisible:false,
                total: 0,
                qrcodeFrom:{},
                idx: -1,
                id: -1,
                currentPage:1,
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                    }, {
                    value: '选项2',
                    label: '双皮奶'
                }],
                personTitle:"",
                ruleForm:[],
                rules: {
                    Name: [
                        // 请输入任务名称
                        { required: true, message: this.$t('menu.tsnPlace'), trigger: 'blur' }
                    ],
                    m_OperateProcess_ID:[
                        // '请选择执行流程'
                        {required: true, message: this.$t('menu.dfSelect'), trigger: 'change'}
                    ]
                },
                radio:'1',
                value1:"",
                radioP:'1',
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
                loading:true,
                themeColor:localStorage.getItem('themeColor')
                
            };
        },
        computed: {},
        watch: {},
        methods: {
            handleClose(){
                // this.$refs.newForm.clearValidate()
                 this.$refs.newForm.resetFields()

            },
            // 流程列表
            getGetProcessList(){
                let params={
                    pager:{
                        page: 1,
                        rows: 1000
                    },
                    obj:{
                        "m_Company_ID":localStorage.getItem('Company_ID'),
                        "EmpID":localStorage.getItem('emp_ID'),
                        "isEnable":1
                    }
                }
               GetProcessList(params).then(res=>{
                    let {ReturnCode,Data}=res
                    if(ReturnCode==200){
                        this.processList=Data.rows
                    }
                })

            },
            // 所属项目
            getGetProjectTypeList(){
                let params={
                    pager:{
                        page: 1,
                        rows: 1000
                    },
                    obj:{
                        "ID":localStorage.getItem('Company_ID')
                    }
                }
                GetProjectTypeList(params).then(res=>{
                    let {ReturnCode,Data}=res
                    if(ReturnCode==200){
                        this.proJectList=Data.rows
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
            // 列表
            GetTaskList(){

                GetTaskList(this.query).then(res=>{
                    let {ReturnCode,Data}=res
                    if(ReturnCode==200){
                        this.tableData=Data.rows
                        this.total=Data.total
                        this.loading=false
                    }else {
                        this.loading=false
                    }
                })
            },
            selectBtn(){
                this.GetTaskList()
            },
            emptyBtn(){
                this.query.obj.Name=''
                this.query.obj.m_OperateProcess_ID=''
                this.query.obj.m_Area_ID=''
                this.query.obj.isEnable=''
                this.query.obj.m_ProjectType_ID=''
                this.GetTaskList()

            },
            // 处理开始时间 结束时间
            getTime(){
                this.newForm.BeginTime=this.Time[0]
                this.newForm.EndTime=this.Time[1]
            },
            chooseChangeGroup(ID){
                // 根据流程ID查询工作组
                let params={
                    'pager':{
                        page: 1,
                        rows: 1000
                    },
                    "obj":{
                        "m_Company_ID":localStorage.getItem('Company_ID'),
                        "ProcessID":ID
                    }   
                }
                getworkGroup(params).then(res=>{
                    let {ReturnCode,Data}=res
                    if(ReturnCode==200){
                         this.groupList=Data.rows
                    }
                })
                // 根据流程ID查询区域下的组下的所有员工
                // 职工列表
            // getGetEmployeeList(){
                let paramses={
                    'pager':{
                        page: 1,
                        rows: 1000
                    },
                    "obj":{
                        "m_Company_ID":localStorage.getItem('Company_ID'),
                        "ProcessID":ID
                    }   
                }
                GetEmployeeList(paramses).then(res=>{
                    const {ReturnCode,Data}=res
                    if(ReturnCode==200){
                        this.EmployeeList=Data.rows
                    }
                })
            // },
                
            },
            
            
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                // 确定要删除任务吗？
                this.$confirm(this.$t('menu.tsdlPoint'), this.$t('menu.prompt'), {
                    type: 'warning'
                })
                    .then(() => {
                        let params={
                            ID:row.ID
                        }
                        DelTask(params).then(res=>{
                            let {ReturnCode,Data}=res
                            if(ReturnCode==200){
                                this.$message.success(res.ErrorMessage)
                                this.GetTaskList()
                            }
                        })
                    })
                    .catch(() => {});
            },
            handleSizeChange(val) {
                this.query.pager.rows=val
                this.GetTaskList()
            },
            handleCurrentChange(val) {
                this.query.pager.page=val
                this.GetTaskList()
            },
            handleSizeChangeGroup(val){
                this.paramsGroup.pager.rows=val
                this.getgetGetGroupUserList()
            },
            handleCurrentChangeGroup(val) {
                this.paramsGroup.pager.page=val
                this.getgetGetGroupUserList()
            },
            changeSwitch(row){
                if(row.isEnable==1){
                    row.isEnable=0
                }else if(row.isEnable==0){
                    row.isEnable=1
                }
                let params={
                    ID:row.ID,
                    isEnable:row.isEnable
                }
                SetTaskIsEnable(params).then(res=>{
                    let {ReturnCode,Data}=res
                    if(ReturnCode==200){
                        this.$message.success(res.ErrorMessage)
                        this.GetTaskList()

                    }
                })
            },
            // 新建任务弹框
            newProject(){
                // 新建任务
                this.personTitle=this.$t('menu.tsNew')
                this.Time=null
                
                this.newVisible=true
                this.newForm={
                    ID:0,
                    OperateType:'1',
                    IfGroupOrEmployee:'1',
                    CreateMan:localStorage.getItem('TrueName'),
                    m_Company_ID:localStorage.getItem('Company_ID'),
                    UpdateMan:localStorage.getItem('Company_ID')
                }

            },
            // 新建确定
            saveNew(newForm){
                this.$refs[newForm].validate((valid) => {
                    if (valid) {
                        if(this.newForm.OperateType==0){
                            this.Time=null
                            this.newForm.BeginTime=null
                            this.newForm.EndTime=null
                        }
                        
                        if(this.newForm.OperateType==1){
                            if(this.Time==null){
                                // 请选择每日开始时间和结束时间
                                this.$message.warning(this.$t('menu.startTimeAndEndTime'))
                                return
                            }
                        }
                        if(this.newForm.ID>0){
                            // 编辑
                            
                            if(this.newForm.IfGroupOrEmployee==2){
                                
                                if(this.newForm.GroupID == ''){
                                this.$message.warning(this.$t('menu.chooseGroup'))  
                                return
                                }
                                this.newForm.EmpID=0
                            }
                            if(this.newForm.IfGroupOrEmployee==1){
                                if(this.newForm.EmpID == '' ){
                                this.$message.warning(this.$t('menu.selectStaff'))  
                                return
                                }
                                this.newForm.GroupID=0
                            }
                            this.newForm.UpdateMan=localStorage.getItem('TrueName')
                            this.newForm.CreateMan=null
                        }else{
                            // 新建
                            // 新建选择重复的时候 组ID和职工ID位undefined
                            if(this.newForm.IfGroupOrEmployee==2){
                                if(this.newForm.GroupID == undefined){
                                this.$message.warning(this.$t('menu.chooseGroup'))  
                                return
                                }
                                this.newForm.EmpID=0
                            }
                            if(this.newForm.IfGroupOrEmployee==1){
                                if(this.newForm.EmpID == undefined ){
                                this.$message.warning(this.$t('menu.selectStaff'))  
                                return
                                }
                                this.newForm.GroupID=0
                            }
                            this.newForm.CreateMan=localStorage.getItem('TrueName')
                             this.newForm.UpdateMan=null
                        }
                        AddEditTask(this.newForm).then(res=>{
                            let {ReturnCode,Data}=res
                            if(ReturnCode==200){
                                this.$message.success(res.ErrorMessage)
                                this.newVisible=false
                                this.GetTaskList()
                            }
                        })
                    } else {
                        
                    }
                });
                
            },
            // 编辑任务弹框
            handleEdit(index,row){
                // 编辑任务
                this.personTitle=this.$t('menu.tsEdit')
                 this.newVisible=true
                 this.newForm.ID=row.ID
                 this.getGetTaskSingle(row.ID)

            },
            // 获取编辑详情
            getGetTaskSingle(ID){
                let params={
                    TaskID:ID
                }
                GetTaskSingle(params).then(res=>{
                    let {ReturnCode,Data}=res
                    if(ReturnCode==200){
                        this.newForm=Data
                        this.chooseChangeGroup(this.newForm.m_OperateProcess_ID)
                        this.newForm.OperateType=String(Data.OperateType)
                        if(this.newForm.OperateType==1){
                            // if(this.Time){
                                this.Time=[Data.BeginTime,Data.EndTime]
                            // }
                            
                        }
                        this.newForm.IfGroupOrEmployee=String(Data.IfGroupOrEmployee)
                        if(Data.EmpID==0){
                            this.newForm.EmpID=""
                        }
                        if(Data.GroupID==0){
                            this.newForm.GroupID=""
                        }
                    }
                })
            },
            exportExl(){

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
            }
        },
        created() {
        },
        mounted() {
            if(localStorage.getItem('lang')=='ch'){
                this.$i18n.locale = 'ch'
            }else if(localStorage.getItem('lang')=='jp'){
                this.$i18n.locale = 'jp'
            }
            this.query.pager.rows=this.$winScreen()
            // 流程列表
            this.getGetProcessList()
            let nowPath=this.$route.path.substring(1)
            let perBtn=this.$permissionButton(nowPath,['par_add','per_update','per_delete','per_isenable'])
            
            for(let m=0;m<perBtn.length;m++){
                if(perBtn[m].btn=='par_add'){
                    this.par_add=perBtn[m].isCheck
                }
                if(perBtn[m].btn=='per_update'){
                    this.per_update= perBtn[m].isCheck
                } 
                if(perBtn[m].btn=='per_delete'){
                    this.per_delete= perBtn[m].isCheck
                }
                if(perBtn[m].btn=='per_isenable'){
                    this.per_isenable= perBtn[m].isCheck
                }
            }
            this.getGetProjectTypeList()
            this.getGetAreaList()
            // 列表
            this.GetTaskList()

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
    .tlNewTan .el-dialog__body{
        padding: 0 20px 30px;
    }
    .tlNewTan .el-date-editor--timerange.el-input__inner{
        width: 230px;
    }
    .tlDioHeight .el-dialog{
        height: 48%;
    }
    .ctSeeDioHeight .el-dialog{
        height: 60%;
    }
</style>
<style lang='scss' scoped>
//@import url(); 引入公共css类
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
    
    .dil_userMess{
        width: 150px;
        background: #0c89d2;
        color: #fff;
        border-radius: 10px;
        margin: 10px 0 18px;
        // padding-left: 10px;
        text-align: center;
        font-size: 14px;
        height: 35px;
        line-height: 35px;
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