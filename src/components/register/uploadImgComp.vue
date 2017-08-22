<template>
  <div class="upload-img-copm">
    <span class="title">{{text}}</span>
    <div class="header-img">
      <input class="inp-img" type="file" @change="uploadImg" id="file_upload" accept="image/*">
      <div class="camera-div-gai">
        <span class="icon-add">+</span>
      </div>
      <img id="preview">
	  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    text: {
        type:String,
        default:''
    }
  },
  methods: {
    uploadImg() {
      alert('hh')
      
    }
  }
}
</script>

<style lang="stylus">
.upload-img-copm
  background:#f5f5f9
  padding:15px 20px
  .title
    font-size:16px
    color: #9d9d9d
  .header-img
    height: 70px
    width: 70px
    border-radius: 35px
    margin: 10px 0
    position: relative
    .inp-img
      height: 70px
      width: 70px
      position: absolute
      top: 0
      left: 0
      z-index: 2
      opacity: 0
    .camera-div-gai
      width: 70px
      height: 70px
      background-color: #fff
      text-align: center
      position: absolute
      top: 0
      left: 0
      z-index: 1
      .icon-add
        display:block
        font-size:40px
        color:#9d9d9d
        margin-top:14px
    #preview
      width: 70px
      height: 70px
      position: absolute
      top: 0
      left: 0

</style>