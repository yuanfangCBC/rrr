<template>
  <div class="login">
    <div class="content" v-show="!registerNo">
        <div class="title-img">
            <img src="http://fuss10.elemecdn.com/7/85/e478e4b26af74f4539c79f31fde80jpeg.jpeg"/>
        </div>
        <div class="login-main">
            <div class="user">
                <div class="icon-l">
                    <span class="icon-left iconfont icon-login"></span>
                </div>
                <input class="text-inp" @keyup="keyup($event)" maxlength="11" placeholder="请输入手机号" type="tel" v-model="phone"/>
                <div class="icon-r">
                    <span class="icon-right tip-err iconfont icon-x" @click="clear" v-show="stateErr"></span>
                    <span class="icon-right tip-ok iconfont icon-icon095" v-show="stateOk"></span>
                </div>
            </div>
            <div class="pwd">
                <div class="icon-l">
                    <span class="icon-left iconfont icon-denglu"></span>
                </div>
                <mt-field class="text-inp" placeholder="请输入密码" :type="types" v-model="password"></mt-field>
                <div class="icon-r" @click="togglaEyes">
                    <span class="icon-right iconfont icon-eyes" v-show="!eyeOpen"></span>
                    <span class="icon-right iconfont icon-yanjing" v-show="eyeOpen"></span>
                </div>
            </div>
            <div class="forget-pwd"><a href="###">密码找回</a></div>
            <div class="btn">
                <mt-button class="btn-login" type="primary" @click="checkuser">登录</mt-button>
            </div>
            <div class="btn">
                <mt-button class="btn-register" type="default" @click="toRegister">新用户，去注册</mt-button>
            </div>
            
        </div>
        <div class="footer"><p class="text">已经有666在使用xxx了，快加入啦！</p></div>
    </div>
    <register v-show="registerNo" @loginor="tosMain"></register>
  </div>
</template>

<script>
import {checkPhone} from 'common/js/util.js'
import register from 'components/register/register.vue'
import { Toast } from 'mint-ui' 
import axios from 'axios'
import {saveUser,exit} from 'common/js/localStorage.js'
export default {
    data() {
        return{
            phone:'',
            password: '',
            stateErr: false,
            stateOk:false,
            registerNo:false,
            eyeOpen:false
        }
    },
    computed: {
        state() {
            if(checkPhone(phone)){
                return 'success'
            }else{
                return 'warning'
            }
        },
        types() {
            if(this.eyeOpen){
                return '';
            }else{
                return 'password';
            }
        }
    },
    methods:{
        keyup(ev) {
            if(checkPhone(this.phone)){
                this.stateErr = false
                this.stateOk = true
            }else{
                this.stateErr = true
                this.stateOk = false
            }
        },
        clear() {
            this.phone = '';
            this.stateErr = false
        },
        togglaEyes() {
            this.eyeOpen = !this.eyeOpen;
        },
        //从子组件register传递msg
        tosMain(msg) {
            if(msg){
                this.$emit('main', msg);
                this.registerNo = false;
            }
        },
        
        checkuser() {
            let _this = this;
            if(checkPhone(_this.phone)&&!_this.password==''){
                let params = { 
                    account : _this.phone,
                    pwd : _this.password
                };
                axios.post("/api/login",params).then(function(result){
                    result = result.data;
                    let state = result.state;
                    switch(state){
                        case "1":
                            Toast({
                                message: "name:" + result.data.name,
                                position: 'bottom',
                                duration: 2000
                            });
                            saveUser(result.data);
                            _this.$emit('main', result.data._id);
                            break;
                        case "0":
                            Toast({
                                message: "用户不存在",
                                position: 'bottom',
                                duration: 2000
                            });
                            break;
                        case "-1":
                            Toast({
                                message: "密码错误",
                                position: 'bottom',
                                duration: 2000
                            });
                            break;
                    }
                })
            }else{
                if(_this.phone===''||_this.password===''){
                    Toast({
                        message: '手机号或密码不能为空哦~',
                        position: 'middle',
                        duration: 1000
                    });
                }else{
                    if(!checkPhone(_this.phone)){
                        Toast({
                            message: '手机号格式不对哦~',
                            position: 'middle',
                            duration: 1000
                        });
                    }else{
                        Toast({
                            message: '还有什么不对哦~',
                            position: 'middle',
                            duration: 1000
                        });
                    }
                }
            }
            
        },
        tologin() {
            
        },
        toRegister() {
            this.registerNo = true;
        }
        
    },
    components:{
        register
    }
}
</script>

<style lang="stylus">
.login
    // position:fixed
    // top:0
    // left:0
    // bottom:0
    width:100%
    height:100%
    background:#f5f5f9
    .content
        display:flex
        flex-direction: column
        width:100%
        overflow:hidden
        .title-img
            flex:1
            img
                overflow:hidden
                width:100%
        .login-main
            flex:0 0 300px
            .user,.pwd
                display:flex
                background:#fff
                height:48px
                font-size:14px
                line-height:48px
                padding-right:30px
                .text-inp
                    flex:0 0 70%
                    outline: 0
                    .mint-cell-wrapper
                        padding: 0 0;
                .icon-l
                    flex:1
                    text-align:center
                    .icon-left
                        padding:12px 0
                        font-size:16px
                .icon-r
                    flex:1
                    text-align:right
                    .icon-right
                        padding:12px 0 
                    .tip-err
                        color:#f00
                    .tip-ok
                        color:#26a2ff
            .user
                border-bottom:1px solid #ccc
            .forget-pwd
                width:100%
                height:40px
                a
                    display:block
                    float:right
                    margin-right:30px
                    font-size:14px
                    height:40px
                    line-height:40px
        .btn
            padding:0px 30px 15px 25px
            .btn-login,.btn-register
                width:100%
        .footer
            flex:1
            .text
                position:absolute
                left:25px
                bottom:10px
                color:#7e8c8d
                font-size:14px
</style>