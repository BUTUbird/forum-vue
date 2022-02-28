<template>
  <div>
    <div class="box">
      🔔{{billBoard.content}}
    </div>
  </div>
</template>

<script>
import {getBillBoard} from "@/api/billboard";

export default {
  name: 'HomeView',
  data(){
    return {
      billBoard:{
        content:''
      }
    }
  },
  created() {
    this.fetchBillBoard()
  },
  methods:{
    async fetchBillBoard(){
      getBillBoard().then((value)=>{
        const { data } = value
        this.billBoard = data
      })
    }
  }

}
</script>
