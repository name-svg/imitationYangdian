<template>
  <div class="details">
      <div><img v-for="items in $store.state.msg.shopDes" :src="items"></div>
  </div>
</template>

<script>
  import '../../assets/css/commodity.css'
export default {
  data () {
    return {
    }
  },
  mounted(){

  },
  methods:{
  },
  components:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
