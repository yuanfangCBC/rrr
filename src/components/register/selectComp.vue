<template>
  <div class="select-component">
    <div class="select-content" @click="togglePopup">
        <div class="title"><span >{{title}}</span></div>
        <div class="text"><span >{{text}}</span></div>
        <div class="icon"><span>></span></div>
    </div>
    <!--<mt-popup class="pop-div" v-model="popupVisible" position="bottom">
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>-->
  </div>
</template>

<script>
export default {
    props: {
        text: {
            type:String,
            default:''
        },
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            popupVisible:false,
            selectText:this.text,
            slots: [
                {
                flex: 1,
                values: ['陕西省', '湖南省', '湖北省', '河南省', '云南省', '河北省'],
                className: 'slot1',
                textAlign: 'center'
                }, {
                divider: true,
                content: '-',
                className: 'slot2'
                }, {
                flex: 1,
                values: ['西安市', '咸阳市', '长沙市', '武汉市', '郑州市', '丽江市'],
                className: 'slot3',
                textAlign: 'center'
                }, {
                divider: true,
                content: '-',
                className: 'slot4'
                },{
                flex: 1,
                values: ['高新区', '渭城区', '实验', '莲湖区', '土门区', '北口区'],
                className: 'slot5',
                textAlign: 'center'
                } 
            ] 
        }
    },
    methods: {
        togglePopup() {
            this.popupVisible = !this.popupVisible;
            this.selectText = '陕西省 西安市 高新区';
        },
        onValuesChange(picker, values) {
            this.selectText = values[0]+" "+values[1]+" "+values[2];
            this.$emit('selectTexted',this.selectText);
        }   
    }
}
</script>

<style lang="stylus">
.select-component
    background:#fff
    .pop-div
        width:100%
    .select-content
        display:flex
        flex-direction: row
        padding:15px 20px
        font-size:15px
        span
            dislpay:inline-block
        .title
            flex:0 0 150px
            color:#656565
        .text
            flex:1
            text-align:right
            padding-right:10px
            color:#989898
        .icon
            flex:0 0 20px
            color:#989898
</style>