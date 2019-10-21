<template>
  <div class="classify">
    <div class="up">
      <p><input type="text" placeholder="Montagne jeunesse"><span></span></p>
    </div>
    <left></left>
  </div>
</template>

<script>
  import '../../assets/css/classify.css'
  import '../../assets/css/reset.css'
  import left from './left.vue'
export default {
  data () {
    return {
       msg:'我是分类页'
    }
  },
  methods:{
  },
  components:{
   left
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
