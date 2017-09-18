<template>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
            <el-form-item>
                <el-date-picker
                    v-model="beginTime"
                    type="date"
                    placeholder="选择日期时间"
                    align="right"
                    format="yyyy-MM-dd 0:0:0"
                    :picker-options="pickerOptions1">
                </el-date-picker>
                -


                <el-date-picker
                    v-model="endTime"
                    type="date"
                    placeholder="选择日期时间"
                    align="right"
                    format="yyyy-MM-dd 0:0:0"
                    :picker-options="pickerOptions1">
                </el-date-picker>
                <el-button type="primary" v-on:click="cycleUserNumsStat">查询</el-button>
            </el-form-item>
        </el-form>
    </el-col>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-card class="box-card">
            <div class="mix-echarts">
                <IEcharts :option="cycle_mix"></IEcharts>
            </div>
        </el-card>
    </el-col>

</template>
<script>
    import { mapGetters } from 'vuex';
    //    import {getNickname, getSTSToken} from '../../api';
    import avatar from '../../../static/img/avatar.gif';
    export default {
        data() {
            return {
                sysName: '医院后台管理',
                collapsed: false,
                //                nickname: '',
                sysUserAvatar: avatar,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        computed: {
            ...mapGetters([
                'nickname'
            ])
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        handleopen() {
            //console.log('handleopen');
        },
        handleclose() {
            //console.log('handleclose');
        },
        handleselect: function (a, b) {
        },
        //退出登录
        logout: function () {
            var _this = this;
            this.$confirm('确认退出吗?', '提示', {
                //type: 'warning'
            }).then(() => {
                localStorage.removeItem('account');
            localStorage.removeItem('token');
            localStorage.removeItem('expiration');
            localStorage.removeItem('nickname');
            _this.$router.push('/login');
        }).catch(() => {

            });
        },
        //折叠导航栏
        collapse: function () {
            this.collapsed = !this.collapsed;
        },
        showMenu(i, status){
            this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
        },
        getUserInfo() {

            //                let uid = localStorage.getItem('account');
            //
            //                getNickname(uid).then((res) => {
            //                    let {nickname} = res;
            //                    if (nickname) {
            //                        this.nickname = nickname;
            //                        localStorage.setItem("nickname", nickname)
            //                    }
            //                });

            this.$store.dispatch('GetUserInfo').then(() => {
                // this.showDialog = true;
                this.$router.push({ path: '/' });
        }).catch(err => {
                this.$message.error(err);
        });

        },
        getStsToken() {

            //                getSTSToken().then((data) => {
            //
            //                    let {AccessKeySecret, SecurityToken, Expiration, AccessKeyId} = data;
            //
            //                    let ossSts = {
            //                        'AccessKeySecret': AccessKeySecret,
            //                        'SecurityToken': SecurityToken,
            //                        'Expiration': Expiration,
            //                        'AccessKeyId': AccessKeyId
            //                    };
            //
            //                    localStorage.removeItem('ossSts');
            //                    localStorage.setItem('ossSts', JSON.stringify(ossSts));
            //                });

            this.$store.dispatch('GetStsToken').then(() => {
            }).catch(err => {
                this.$message.error(err);
        });


        },
    },
    mounted() {
        this.getUserInfo();
        this.getStsToken();
    }
    }

</script>

<style scoped lang="scss">
    @import '~scss_vars';

    .blu-container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
    .header {
        height: 60px;
        line-height: 60px;
        background: $color-primary;
        color: #fff;
    .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
    .userinfo-inner {
        cursor: pointer;
        color: #fff;
    img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin: 10px 0px 10px 10px;
        float: right;
    }
    }
    }
    .logo {
    //width:230px;
        height: 60px;
        font-size: 22px;
        padding-left: 20px;
        padding-right: 20px;
        border-color: rgba(238, 241, 146, 0.3);
        border-right-width: 1px;
        border-right-style: solid;
    img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
    }
    .txt {
        color: #fff;
    }
    }
    .logo-width {
        width: 230px;
    }
    .logo-collapse-width {
        width: 60px
    }
    .tools {
        padding: 0px 23px;
        width: 14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
    }
    }
    .main {
        display: flex;
    // background: #324057;
        position: absolute;
        top: 60px;
        bottom: 0px;
        overflow: hidden;
    aside {
        flex: 0 0 230px;
        width: 230px;
    // position: absolute;
    // top: 0px;
    // bottom: 0px;
    .el-menu {
        height: 100%;
    }
    .collapsed {
        width: 60px;
    .item {
        position: relative;
    }
    .submenu {
        position: absolute;
        top: 0px;
        left: 60px;
        z-index: 99999;
        height: auto;
        display: none;
    }

    }
    }
    .menu-collapsed {
        flex: 0 0 60px;
        width: 60px;
    }
    .menu-expanded {
        flex: 0 0 230px;
        width: 230px;
    }
    .blu-content-container {
    // background: #f1f2f7;
        flex: 1;
    // position: absolute;
    // right: 0px;
    // top: 0px;
    // bottom: 0px;
    // left: 230px;
        overflow-y: scroll;
        padding: 20px;
    .breadcrumb-container {
    //margin-bottom: 15px;
    .title {
        width: 200px;
        float: left;
        color: #475669;
    }
    .breadcrumb-inner {
        float: left;
    }
    }
    .blu-content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
    }
    }
    }
    }
</style>
