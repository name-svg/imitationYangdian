<template>
  <div class="index">
    <div class="top">
    <p><input type="text" placeholder="Montagne jeunesse"><span></span></p>
    </div>
    <div class="dis" v-for="(items,index) in all">
     <h5><span :style="{background:ba[index].url,backgroundSize:ba[index].size}"></span>{{items.name}}</h5>
      <dl class="list">
        <dd  v-for="items2 in items.list" :class="index>0?'aa':''" @click="commodity(items2.id)">
          <img :src="items2.thumbnail">
          <span v-if="index==0">￥{{items2.reduct_price}}.00</span><i v-if="index==0">￥{{items2.original_price}}.00</i>
          <p>{{items2.name}}</p>
          <div class="only" v-if="index>0"><b>￥{{items2.reduct_price}}.00</b><span>￥{{items2.original_price}}.00</span></div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
  import '../../assets/css/index.css'
  import '../../assets/css/reset.css'
  import commodity from '../commodity/commodity.vue'
export default {
  data () {
    return {
       msg:'我是首页',
      all:[],
      ba:[
          {
          url:'url("../../static/images/hot.png") no-repeat 50%',
          size:'0.29rem 0.38rem'
          },
        {
          url:'url("../../static/images/baby.png") no-repeat 50%',
          size:'0.39rem 0.39rem'
        },
        {
          url:'url("../../static/images/meizhuang.png") no-repeat 50%',
          size:'0.39rem 0.34rem'
        },
        {
          url:'url("../../static/images/furniture.png") no-repeat 50%',
          size:'0.39rem 0.38rem'
         },
        {
          url:'url("../../static/images/food.png") no-repeat 50%',
          size:'0.39rem 0.5rem'
        },
        {
          url:'url("../../static/images/airplane.png") no-repeat 50%',
          size:'0.33rem 0.38rem'
        },
          ]
    }
  },
  mounted(){
    this.$http({
      url:'http://yd.msword.top/getIndexData'
    }).then((res)=>{
      this.all=res.data.data
    })
  },
  methods:{
      commodity(x){
          this.$router.push('/commodity?pid='+x)
      }
  },
  components:{
//      commodity,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
