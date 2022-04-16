<template>
  <div>
    <el-col :md="24" :lg="12" :xl="16" class="mb15">
      <el-card shadow="hover">
        <div slot="header">
          <span>用户发帖数</span>
        </div>
        <div>

          <div id="myPost" :style="{ width: '400px', height: '350px' }"></div>

        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import {getPost, getTag} from '@/api/echarts'
import echarts from 'echarts'
export default {
  name: "post",
  data(){
    return{
      list:[],
    }
  },
  methods:{
    init() {
      getPost().then((response) => {
        const { data } = response
        console.log(data)
        let xData = []
        for (let i = 0; i < data.length; i++) {
          xData.push(data[i].username)
        }
        let yData = []
        for (let i = 0; i < data.length; i++) {
          yData.push(data[i].posts)
        }
        let myId = []
        for (let i = 0; i < data.length; i++) {
          myId.push(data[i].id)
        }
        let myPost = echarts.init(document.getElementById("myPost"));
        const option = {
          xAxis: {
            type: 'category',
            data: xData
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: yData,
            type: 'bar'
          }],
          tooltip:{
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter:function (params) {
              let res = params[0].name + '<br/>'
              for (let i = 0; i < params.length; i++) {
                res +=  ' 发帖量: ' + params[i].value + '<br/>'
              }
              return res
            }
          }
        };
        myPost.setOption(option);
      })

    }

  },
  mounted() {
    this.init();
  },
}
</script>

<style scoped>

</style>
