<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            :active-text-color="'#'+themeColor"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.id">
                        <template slot="title">
                            <!-- <i :class="item.icon"></i> -->
                            <img :src="item.icon?getImgUrl(item.icon):''" alt="" class="iconPic">
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title" >{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <!-- <i :class="item.icon"></i> -->
                        <img :src="getImgUrl(item.icon)" class="iconPic">
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
// import {getRoleMenu} from '@/api/api'
export default {
    data() {
        return {
            collapse: false,
            items: [
                // {
                //     icon: 'el-icon-lx-home',
                //     index: 'index',
                //     title: '主页-总厂管理员'
                // },
                // {
                //     icon: 'el-icon-lx-home',
                //     index: 'indexHome',
                //     title: '主页'
                // },
                // {
                //     icon: 'el-icon-lx-news',
                //     index: 'baseMess',
                //     title: '基础信息',
                //     subs: [
                //         {
                //             index: 'factoryMess',
                //             title: '公司信息'
                //         },
                //         {
                //             index: 'contractList',
                //             title: '合同列表'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-group',
                //     index: 'staffManage',
                //     title: '员工管理',
                //     subs: [
                //         {
                //             index: 'departmentList',
                //             title: '部门列表'
                //         },
                //         {
                //             index: 'staffList',
                //             title: '员工列表'
                //         },
                //         {
                //             index: 'roleList',
                //             title: '角色列表'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-tag',
                //     index: 'equipmentManage',
                //     title: '设备管理',
                //     subs: [
                //         {
                //             index: 'equipList',
                //             title: '设备列表'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-pie-chart',
                //     index: 'areaManage',
                //     title: '区域管理',
                //     subs: [
                //         {
                //             index: 'areaStyle',
                //             title: '区域类型'
                //         },
                //         {
                //             index: 'areaList',
                //             title: '区域列表'
                //         },
                //         {
                //             index: 'workinGroup',
                //             title: '工作组管理'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-file',
                //     index: 'projectManage',
                //     title: '项目管理',
                //     subs: [
                //         {
                //             index: 'projectList',
                //             title: '项目列表'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-rank',
                //     index: 'processManage',
                //     title: '流程管理',
                //     subs: [
                //         {
                //             index: 'processStyle',
                //             title: '流程类型'
                //         },
                //         {
                //             index: 'processList',
                //             title: '流程列表'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-remind',
                //     index: 'taskManage',
                //     title: '任务管理',
                //     subs: [
                //         {
                //             index: 'taskList',
                //             title: '任务列表'
                //         },
                //         {
                //             index: 'pendingTask',
                //             title: '待执行任务'
                //         },
                //         {
                //             index: 'completedTask',
                //             title: '已完成任务'
                //         },
                //         {
                //             index: 'unfinishedTask',
                //             title: '未完成任务'
                //         },
                //         {
                //             index: 'taskRecord',
                //             title: '任务记录'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-mobile',
                //     index: 'remoteAssistance',
                //     title: '远程协助',
                //     subs: [
                //         {
                //             index: 'assistanceStyle',
                //             title: '协助类型'
                //         },
                //         {
                //             index: 'assistanceRecord',
                //             title: '协助记录'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-read',
                //     index: 'knowledgeBase',
                //     title: '知识库',
                //     subs: [
                //         {
                //             index: 'knowledgeType',
                //             title: '知识库类型'
                //         },
                //         {
                //             index: 'knowledgeList',
                //             title: '知识库列表'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-sort',
                //     index: 'systemMenu',
                //     title: '系统菜单',
                //     subs: [
                //         {
                //             index: 'menuManage',
                //             title: '菜单管理'
                //         },
                //         {
                //             index: 'dataBackup',
                //             title: '数据备份'
                //         },
                //         {
                //             index: 'operationRecords',
                //             title: '操作记录'
                //         }
                //     ]
                // }
            ],
            themeColor:localStorage.getItem('themeColor')
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    methods:{
        getImgUrl(img){
            console.log(img,'img')
            return img?require('../common/screenshots/homeImg/'+img+'.png'):""
        },
        // 侧边菜单请求
        getgetRoleMenu(){
            let params={
                "m_Company_Role_ID":localStorage.getItem('m_Company_Role_ID'),
                "m_Company_ID":localStorage.getItem('Company_ID')
            }
            getRoleMenu(params).then(res=>{
                let {ReturnCode,Data}=res
                if(ReturnCode==200){
                    // console.log(res,"侧边数据")
                    this.items=Data.rows[0].subs
                    for (let i=0;i<this.items.length;i++){
                        if(this.items[i].id==24){
                            this.items.splice(i,1)
                        }
                        for (let j=0;j<this.items[i].subs.length;j++){
                            let threeSon=this.items[i].subs
                            if(threeSon[j].subs.length<=0){
                                delete threeSon[j].subs
                            }
                        }
                        if(this.items[i].subs.length<=0){
                            delete this.items[i].subs
                        }
                    }
                    this.getGetRoleBtn()
                }

            })
        },
        // 菜单权限按钮
        getGetRoleBtn(){
            let params={
                RoleID:localStorage.getItem('m_Company_Role_ID'),
                m_Company_ID:localStorage.getItem('Company_ID')
            }
            GetRoleBtn(params).then(res=>{
                let {ReturnCode,Data}=res
                if(ReturnCode==200){
                    localStorage.setItem('permissionBtn',JSON.stringify(Data))
                }

            })
        }
    },
    created() {
        
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
        // this.getgetRoleMenu()

    }
};
</script>

<style scoped lang='scss'>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 240px;
}
.sidebar > ul {
    height: 100%;
}
.sidebar-el-menu li ul .el-menu-item{
    padding-left: 60px !important;
}
.iconPic{width:18px;height:18px;margin-right:5px;}
</style>
