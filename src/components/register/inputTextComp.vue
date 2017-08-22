<template>
  <div class="input-text-component">
    <div class="input2-div">
        <span class="name">{{name}}</span>
        <input class="text-inp" @keyup="keyup($event)" @focus="focus" :placeholder="text" v-model="datas"/>
        <div class="x-div"><span class="icon-right iconfont icon-x" @click="clear" v-show="x"></span></div>
        
    </div>
  </div>
</template>

<script>
export default {
    props: {
        name: {
            type:String,
            default:''
        },
        text: {
            type:String,
            default: ''
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
        clear() {
            this.datas='';
            this.x=false;
            this.$emit('inputText',this.datas);
        }
    }
}
</script>

<style lang="stylus">
.input-text-component
    background:#fff
    padding:0 10px
    .input2-div
        display:flex
        height:48px
        .name
            font-size:16px
            line-height:48px
            height:48px
            flex:1
            text-align:center
        .text-inp
            flex:0 0 70%
            outline: 0
            font-size:16px
            color: #9d9d9d
        .x-div
            flex:1
            height:48px
            .icon-right
                line-height:48px
                height:48px
                color: #9d9d9d
                text-align:center

</style>