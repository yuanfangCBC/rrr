<template>
  <div class="input-component">
    <div class="input-div">
        <input class="text-inp" @keyup="keyup($event)" @focus="focus" @blur="blur" :placeholder="text" type="text" v-model="datas"/>
        <span class="icon-right iconfont icon-x" @click="clear" v-show="x"></span>
    </div>
    
  </div>
</template>

<script>
export default {
    props: {
        text: {
            type:String,
            default:''
        }
    },
    data() {
        return {
            datas:'',
            x:false
        }
    },
    methods: {
        keyup() {
            this.$emit('inputText',this.datas);
        },
        focus() {
            this.x=true;
        },
        blur() {
            //this.x=false;
        },
        clear() {
            this.datas='';
            this.$emit('inputText',this.datas);
        }
    }
}
</script>

<style lang="stylus">
.input-component
    padding:0px 20px
    background:#fff
    .input-div
        display:flex
        height:48px
        .text-inp
            flex:0 0 90%
            outline: 0
            font-size:16px
            color: #9d9d9d
        .icon-right
            flex:1
            line-height:48px
            height:48px
            color: #9d9d9d
            text-align:center

</style>