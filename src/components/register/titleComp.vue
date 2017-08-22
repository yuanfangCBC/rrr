<template>
  <div class="title-component">
    <span class="text">{{text}}</span>
  </div>
</template>

<script>
export default {
    props: {
        text: {
            type:String,
            default:'详细地址'
        }
    }
}
</script>

<style lang="stylus">
.title-component
    padding:15px 20px
    background:#f5f5f9
    border-bottom:1px solid #ebebeb
    .text
        font-size:16px
        color: #9d9d9d

</style>