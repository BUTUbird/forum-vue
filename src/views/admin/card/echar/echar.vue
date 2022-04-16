<template>
  <div>
    <el-col :md="24" :lg="12" :xl="16" class="mb15">
      <el-card shadow="hover">
        <div slot="header">
          <span>热门标签文章数/比例</span>
        </div>
        <div>

          <div id="myChart" :style="{ width: '450px', height: '350px' }"></div>

        </div>
      </el-card>
    </el-col>
  </div>

</template>

<script>
import echarts from 'echarts'
import {getTag} from '@/api/echarts'
export default {
  name: "eCharts",
  data() {
    return{
      list:[],

      }
  },
  mounted() {
    this.init();
  },
 methods: {
    init() {
    getTag().then((response) => {
          const { data } = response
      console.log(data)
           let myChart = echarts.init(document.getElementById("myChart"));
          var option = {
              // title: {
              //     text: '热门标签文章数/比例',
              //     left: 'center'
              //     },
              tooltip: {
                  trigger: 'item'
                      },
                legend: {
                  orient: 'vertical',
                  left: 'left',
                      },
                series: [
                        {
                          type: 'pie',
                          radius: '50%',
                          data:data,
                emphasis: {
                      itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                         }
                         }
                          ]
                  };
                  myChart.setOption(option);
              })

    }
  }
}
</script>
