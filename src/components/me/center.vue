<template>
  <div class="center" :style="{height:h}">
    <div class="centerTop">
      <div class="centerUp">
        <span></span>
        <h5>个人中心</h5>
        <span></span>
      </div>
      <div class="centerDown">
        <div @click="abb" :style="{pointerEvents:b}"><img src="../../../static/images/timg.jpg" v-show="show"></div>
        <span @click="abb" :style="{pointerEvents:b}">{{a}}</span>
      </div>
    </div>
    <div class="collect">
      <div>
        <span></span>
        <h5>我的收藏</h5>
      </div>
    </div>
    <div class="line"></div>
    <div class="order">
      <h5>我的订单</h5>
      <span>查看全部订单</span>
    </div>
    <ul class="choice">
      <li v-for="items in choice">
        <span :style="{background:items.url,backgroundSize:items.size}"></span>
        <p>{{items.name}}</p>
      </li>
    </ul>
    <div class="line"></div>
    <div class="address">
      <span>收货地址管理</span>
    </div>
    <div class="centerFoot" :style="hh"></div>
  </div>
</template>

<script>
  import '../../assets/css/me.css'
export default {
  data () {
    return {
        b:'',
        show:false,
      login:'/login',
        h:'',
        hh:'',
        a:'点击登录',
        choice:[
          {
              url:'url(../../../static/images/icon_boligation.png) no-repeat 50%',
              name:'待付款',
              size:'0.55rem 0.48rem'
          },
          {
            url:'url(../../../static/images/prepare.png) no-repeat 50%',
            name:'待发货',
            size:'0.56rem 0.46rem'
          },
          {
            url:'url(../../../static/images/icon_consignee.png) no-repeat 50%',
            name:'待收货',
            size:'0.52rem 0.47rem'
          },
          {
            url:'url(../../../static/images/icon_evaluate.png) no-repeat 50%',
            name:'待评价',
            size:'0.59rem 0.47rem'
          },
          {
            url:'url(../../../static/images/icon_refund.png) no-repeat 50%',
            name:'退款/售后',
            size:'0.54rem 0.48rem'
          }
        ]
    }
  },
  mounted(){
    let a = document.cookie.split('=')[1];
    if(a=='qw'){
        this.b='none';
        this.show=true;
        this.a='哈哈哈';
      this.login='/center';
    }
    this.h= window.screen.availHeight+'px'
  },
  methods:{
      abb(){
          this.$router.push(this.login)
      }
  },
  components:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .centerDown img{
    width:100%;
    height:100%;
    border-radius:50%;
  }
</style>
