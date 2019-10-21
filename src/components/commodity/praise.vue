<template>
  <div class="praise" v-if="one">
    <dl>
      <dd v-for="(items,index) in evaluate"><a  @click="tack(index)" :class="index==active?'active2':''">{{items.name}}</a></dd>
    </dl>
    <div class="all">
      <ul class="allEvaluate">
        <li v-for="(items,index) in one[evaluate[active].path]">
          <div class="allUp"><span>{{items.buyerName}}</span><b>{{items.createTime | timer}}</b></div>
          <img v-for="items2 in items.postImg"   :src="items2">
          <p>{{items.postDescribe}}</p>
          <div class="allDown">
            管理员：{{items.adminReviews}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import '../../assets/css/praise.css'
export default {
  data () {
    return {
        active:0,
        arr:[],
        evaluate:[
          {
              name:'全部评价',
              path:'all'
          },
          {
            name:'好评',
            path:'good'
          },
          {
            name:'差评',
            path:'bad'
          },
          {
            name:'晒单',
            path:'postForm'
          },
        ]
    }
  },
  props:['one'],
  mounted(){
  },
  methods:{
      tack(y){
          this.active=y;
      }
  },
  components:{

  },
  filters:{
    timer:function(x){
      let date = new Date(Number(x));
      let y = date.getFullYear();
      let m = date.getMonth()+1<10?'0'+(date.getMonth()+1):(date.getMonth()+1);
      let d = date.getDate()<10?'0'+date.getDate():date.getDate();
      let h = date.getHours()<10?'0'+date.getHours():date.getHours();
      let mi = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
      let s = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
      let time= y+'-'+m+'-'+d+' '+h+':'+mi+':'+s;
      return time
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
