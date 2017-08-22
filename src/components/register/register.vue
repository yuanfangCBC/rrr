<template>
  <div class="register">
    <div class="header">
        <mt-header title="注册">
        <router-link to="/" slot="left">
            <mt-button icon="back" @click="back">返回</mt-button>
        </router-link>
        </mt-header>
    </div>
    <div class="step">
        <div class="step-div">
            <div class="one">
                <span class="step-one"></span>
            </div>
            <div class="line"><span class="step-line"></span></div>
            <div class="two"><span class="step-two" :class="{'active':!active}"></span></div>
        </div>
        <div class="step-text">
            <p class="text text-left">个人信息</p>
            <span class="empty"></span>
            <p class="text">账号信息</p>
        </div>
        <p class="title">所在地区</p>
    </div>
    <div class="content-one" v-show="stepNow">
        <selected :text="address" title="省市区选择" @selectTexted="selectAdd"></selected>
        <titled text="详细地址"></titled>
        <inputed text="请输入你的具体地址" @inputText="getinputTxt"></inputed>
        <titled text="种养殖品类"></titled>
        <selected text="" title="选择您的种养殖品类"></selected>
        <titled text="种养殖规模"></titled>
        <inputed text="请输入你的产业规模" @inputText="getinputGmTxt"></inputed>
        <upload-img text="上传生产照片"></upload-img>
        <div class="btn">
            <mt-button class="next" @click="next" type="primary">下一步</mt-button>
        </div>
    </div>
    <div class="content-two" v-show="!stepNow">
        <div class="item">
            <input-words name="姓名" text="请输入真实姓名" @inputText="getname"></input-words>
        </div>
        <div class="item">
            <input-words name="手机" text="请输入11位手机号码" @inputText="getphone"></input-words>
        </div>
        <div class="item">
            <input-words name="密码" text="请输入6~20位数字或字母" @inputText="getpwd"></input-words>
        </div>
        <div class="yzm">
            <input-words class="input-yzm" title="验证码" text="6位数字验证码"></input-words>
            <mt-button class="btn-yzm" type="primary" plain>获取验证码</mt-button>
        </div>
        <div class="btn">
            <mt-button class="next" @click="last" type="primary">上一步</mt-button>
            <mt-button class="ok" @click="ok" type="primary">注册完成</mt-button>
        </div>
    </div>
  </div>
</template>

<script>
import selected from 'components/register/selectComp.vue'
import titled from 'components/register/titleComp.vue'
import inputed from 'components/register/inputComp.vue'
import uploadImg from 'components/register/uploadImgComp.vue'
import inputWords from 'components/register/inputTextComp.vue'
import axios from 'axios'
import { Toast } from 'mint-ui'
import {saveUser,exit} from 'common/js/localStorage.js'
export default {
    data() {
        return {
            current: true,
            stepNow: true,
            address:'',
            addressInfo:'',
            gmInfo:'',
            name : '',
            phone :'',
            pwd : ''
        }
    },
    computed: {
        active: function(){
            if(this.current){
                return true
            }else{
                return false
            }
        }
    },
    methods: {
        getname(msg){
            this.name = msg;
        },
        getphone(msg){
            this.phone = msg;
        },
        getpwd(msg){
            this.pwd = msg;
        },
        next: function(){
            // if(this.address==''||this.addressInfo==''||this.gmInfo==''){
            //     Toast({
            //         message: '不能为空哦~',
            //         position: 'middle',
            //         duration: 1000
            //     });
            // }else{
            //     Toast({
            //         message: 'address:'+this.address+',addressInfo:'+this.addressInfo+',gmInfo:'+this.gmInfo,
            //         position: 'bottom',
            //         duration: 2000
            //     });
                this.current = false
                this.stepNow = false
            //}
            
        },
        last: function(){
            this.current = true
            this.stepNow = true
        },
        ok: function(){
            let _this = this;
            let params = {"name":this.name,"account":this.phone,"pwd":this.pwd}
            axios.post('/api/regist',params).then((response) => {
                let result = response.data;
                let state = result.state;
                switch(state){
                        case "1":
                            Toast({
                                message: "name:" + result.data.name,
                                position: 'bottom',
                                duration: 2000
                            });
                            saveUser(result.data);
                            _this.$emit('loginor', result.data._id);
                            break;
                        case "0":
                            Toast({
                                message: "注册失败",
                                position: 'bottom',
                                duration: 2000
                            });
                            break;
                    }
                })
        },
        back: function(){
            this.$emit('loginor', '');
        },
        selectAdd(msg) {
            this.address = msg;
        },
        getinputTxt(msg){
            this.addressInfo = msg;
        },
        getinputGmTxt(msg){
            this.gmInfo = msg;
        }
    },
    components: {
        selected,
        titled,
        inputed,
        uploadImg,
        inputWords
    }
}
</script>

<style lang="stylus">
.register
    position:relative
    top:0
    left:0
    height:100%
    width:100%
    flex-direction: row
    .header
        .mint-header
            background-color: #fff
            color: #26a2ff
            font-size:16px
    .step
        background:#f5f5f9
        border-top:1px solid #ebebeb
        border-bottom:1px solid #ebebeb
        padding:15px 20px
        
        .step-div
            display:flex
            .one
                flex:1
                text-align:right
                .step-one
                    display:inline-block
                    width:25px
                    height:25px
                    border-radius:50%
                    border:1px solid #797979
                    background:#108ee9
            .line
                flex:0 0 200px
                padding:14px 0
                .step-line
                    display:block
                    border-bottom:1px solid #797979
            .two
                flex:1
                .step-two
                    display:inline-block
                    width:25px
                    height:25px
                    border-radius:50%
                    border:1px solid #797979
                    background: #d7d7d7
                    &.active
                        background:#108ee9
        .step-text
            display:flex
            .empty
                flex:0 0 165px
            .text
                flex:1
                font-size:14px
                margin-top:5px
            .text-left
                text-align:right
        .title
            margin-top:15px
            color:#9d9d9d
            font-size:16px
    .content-one
        background:#f5f5f9
        position:absolute
        top:152px
        left:0
        bottom:0
        right:0
        .btn
            position:absolute
            bottom:30px
            left:20px
            right:20px
            .next
                width:100%
    .content-two
        background:#f5f5f9
        position:absolute
        top:152px
        left:0
        bottom:0
        width:100%
        .item
            border-bottom:1px solid #ebebeb
        .yzm
            display:flex
            background:#fff
            height:49px
            padding:0 20px
            .input-yzm
                flex:1
            .btn-yzm
                flex: 0 0 100px
                margin:10px 0px
                font-size:14px
                height:31px
        .btn
            display:flex
            position:absolute
            width:100%
            bottom:20px
            left:0
            .next, .ok
                flex:1
                margin:10px 20px
</style>