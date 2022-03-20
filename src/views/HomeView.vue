<template>
  <div>
    <carousel></carousel>
    <div class="box">
      🔔{{ billBoard.content }}
    </div>
    <div class="columns">
      <div class="column is-three-quarters">
        <TopicList></TopicList>
      </div>
      <div class="column">
        <CarBar></CarBar>
      </div>
    </div>
  </div>
</template>

<script>
import {getBillBoard} from "@/api/billboard";
import CarBar from "@/views/card/CarBar";
import PostList from "@/views/post/Index"
import carousel from "@/views/carousel";


export default {
  name: 'HomeView',
  components: {CarBar, TopicList: PostList,carousel},
  data() {
    return {
      billBoard: {
        content: ''
      },

    }
  },
  created() {
    this.fetchBillBoard()
  },
  methods: {
    async fetchBillBoard() {
      getBillBoard().then((value) => {
        const {data} = value
        this.billBoard = data
      })
    }
  }

}
</script>
