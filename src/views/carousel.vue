<template>
  <el-carousel indicator-position="outside"  style="width:100%; border-radius: 15px">
    <el-carousel-item v-for="(item,key) in imgArray" :key="key">
      <img :src="item.idView" class="rightImg">
    </el-carousel-item>
  </el-carousel>
</template>
<script>
import {getCarousel} from "@/api/carousel";

export default {
  name: "carousel",
  data() {
    return {
      imgArray: [
        {id:0,idView:require("@/assets/image/BUTUbird.svg")},
        {id:1,idView:require("@/assets/image/BUTUbird.svg")},
        {id:2,idView:require("@/assets/image/BUTUbird.svg")},
        {id:3,idView:require("@/assets/image/BUTUbird.svg")}
      ]
    }
  },
  methods:{
    getCarousel(){
      getCarousel().then(res=>{
          for (let i = 0; i < this.imgArray.length; i++){
            this.imgArray[i].idView = res.data[i].url
          }
      })
    }
  },
  created() {
    this.getCarousel();
  }
}
</script>
<style>
.rightImg {
  width: 100%;
  height: 540px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
