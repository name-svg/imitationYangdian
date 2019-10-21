<template>
  <div class="navs">
    <ul class="navslist">
      <li v-for="(items,index) in msg">
        <router-link :to="items.href" active-class="color">
          <span :class="'e'+index"></span>
          <h5>{{items.name}}</h5>
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  import '../../assets/css/index.css'
  import '../../assets/css/reset.css'
export default {
  data () {
    return {
      color:['color'],
      arr:[true],
//      crr:["e0",'e1',"e2","e3"],
//      drr:["e0",'e1',"e2","e3"],
//      back1:['one','two','three','four'],
//      back2:['five','six','seven','eight'],
      back3:[],
      msg: [
        {
          'href': '/index',
          'name': '首页',
        },
        {
          'href': '/classify',
          'name': '分类',
        },
        {
          'href': '/shoping',
          'name': '购物车',
        },
        {
          'href': '/center',
          'name': '我',
        },
      ],
    }
  },
  methods:{
//      alter(x){
//          this.color=[];
////          this.arr=[];
//          this.$set(this.color,x,'color');
////          this.$set(this.arr,x,true);
//
//      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
