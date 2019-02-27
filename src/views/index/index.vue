<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    border-bottom:none; 
}
.layout-logo{
    height: 50px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: -6px;
    left: -28px;
    font-size: 26px;
    color: #fff;
}
.layout-logo img{
    height: 100%;
    vertical-align: middle;
}
.mentsize{
    font-size: 16px;
}
.mentsize MenuItem{
    font-size: 26px;
}
.main-user-name, .arrow-down-b{
    color: #fff;
    font-size: 16px;
    font-weight: bold;
}
.ivu-icon-arrow-down-b:before {
    content: "\F104";
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header :style="{background:'#2d8cf0', height:'70px'}">
                <div class="user-dropdown-menu-con">
                    <Row  type="flex" justify="end" class="code-row-bg" align="middle">
                        <Col span="12"> 
                            <div class="layout-logo col_left">
                                <img  alt="" :src="Logo" key="logo">
                                织网官网后台管理系统
                            </div>
                        </Col>
                        <Col span="9" class="col_left">
                            <Icon type="md-person" size="24" color="#fff"/>
                            <span style="vertical-align: middle">您好，系统管理员
                                <span style="margin-right:14px"> </span>
                            </span>
                        </Col>
                        <Col span="3" class="col_left">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{userName}}</span>
                                    <Icon type="md-arrow-dropdown" size="24" color="#fff"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <!-- 大大的 -->
                </div>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu ref="sideMenu" :active-name="$route.name" :open-names="openName" :accordion="true" width="auto">
                        <template v-for="(item, index) in menuList" :keys='index'>
                            <MenuItem v-if="item.children.length<=1" :to="item.children[0].name" :name="item.children[0].name" :key="'menuitem' + item.name">
                                <Icon :type="item.children[0].icon" size="24" />
                                <span class="layout-text" :key="'title' + item.name">{{ item.children[0].meta.title }}</span>
                            </MenuItem>
                            <Submenu v-if="item.children.length > 1" :name="item.name" :key="item.name">
                                <template slot="title">
                                    <Icon :type="item.icon" size="24" />
                                    <span class="layout-text">{{ item.meta.title }}</span>
                                </template>
                                <template v-for="(child, index) in item.children" :keys='index'>
                                    <MenuItem :name="child.name" :to="child.name" :key="'menuitem' + child.name">
                                        <Icon :type="child.icon" size="24" />
                                        <span class="layout-text" :key="'title' + child.name">{{ child.meta.title }}</span>
                                    </MenuItem>
                                </template>
                            </Submenu>
                        </template>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px',background: '#fff'}">
                    <template>
                        <Breadcrumb :style="{margin: '24px 0'}">
                            <BreadcrumbItem v-if="item.meta.title" v-for="(item,index) in levelList">{{item.meta.title}}</BreadcrumbItem>
                        </Breadcrumb>
                    </template>
                    <Content :style="{ minHeight: '280px', background: '#fff'}">
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import Logo from '../../images/logo.png'
import { mapActions,mapMutations,mapGetters } from 'vuex'
import {loginout} from '../../api/user'
import Cookies from 'js-cookie';
    export default {
        data(){
            return{
                Logo,
                userName:'',
                menName:["1","2","3"],
                openName:[],
                realname:''
            }
        },
        mounted(){
            this.init()
            // console.log(loginout)
        },
        created(){
            this.openName.push(this.$route.matched[0].name)
            this.getBreadcrumb()
            this.updateMenulist()
            // console.log(this.$route)
        },
        computed:{
            ...mapGetters(['getUserName']),
            menuList () {
                return this.$store.state.menuList;
            },
        },
        methods:{
            handleClickUserDropdown(name){
                if(name=='loginout'){
                    this.logout()
                    loginout().then((res) => {
                        // console.log(res)
                    }).catch((err) => {
                        
                    });
                    this.$router.replace({
                        name: 'login'
                    });
                }else if(name=='personal'){
                    this.$router.replace({
                        name:name
                    })  
                } 
            },
            ...mapMutations(['logout','updateMenulist']),
            init(){
                this.userName=Cookies.get('user')  
                this.realname=Cookies.get('realname')  
            },
            itemTitle (item) {
                if (typeof item.title === 'object') {
                    return this.$t(item.title.i18n);
                } else {
                    return item.title;
                }
            },
            getBreadcrumb() {
                let matched = this.$route.matched.filter(item => item.name)
                const first = matched[0]
                // if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
                // matched = [{ path: '/dashboard', meta: { title: 'dashboard' }}].concat(matched)
                // }
                // console.log(this.$route)
                this.levelList = matched
            }
        },
        watch:{
            $route(){
                this.getBreadcrumb()
            }
        }
    }
</script>
<style lang="less">
.col_left{
    text-align: right;
    font-size: 18px;
    color: #fff;
}
</style>

