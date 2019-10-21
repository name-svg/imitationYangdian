<template>
  <div class="commodity">
    <div class="cup"></div>
    <div class="swiper-container">
      <span class="ls" @click="$router.push('/index')"></span>
      <span class="ry"></span>
      <span class="rz" @click="$router.push('/shoping')"></span>
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="items in msg.swiperImgArr"><img :src="items"></div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
    <div class="cost">
      <div class="costUp">
        <p>{{msg.name}}</p>
        <span>收藏</span>
      </div>
      <div class="costDo">
        <div class="dLeft"><span>￥{{msg.reduct_price}}.00</span><b>￥{{msg.original_price}}.00</b></div>
        <div class="dRight">
          <dl><dd>{{msg.allowance*100}}折</dd><dd v-if="flg">包邮</dd></dl>
          <ul>
            <li v-for="items2 in msg.describe">{{items2}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="division"></div>
    <div class="and">
      <ul>
        <li><router-link :to="{path:'/commodity/details',query:{pid:this.$store.state.pid.pid}}"  active-class="active">商品详情</router-link></li>
        <li><router-link :to="{path:'/commodity/praise',query:{pid:this.$store.state.pid.pid}}"  active-class="active">买家口碑</router-link></li>
      </ul>
      <router-view :one="msg.buyerReviews" ></router-view>
      <div class="cdown">
          <div class="cleft">
            <span>总价：</span>
            <span>￥{{how}}.00</span>
          </div>
          <div class="cmiddle" @click="app">加入购物车</div>
          <div class="cright" @click="sk">立即购买</div>
      </div>
    </div>
    <div class="keep" :style="{height:h,width:w}" v-show="show">
    </div>
    <transition name="up">
      <div class="additive" v-show="show">
        <div class="addTop content_wrap">
          <div class="image"><img :src="massage.src"></div>
          <div class="addCost">
            <span>￥{{massage.cost}}.00</span>
            <p>库存{{massage.total}}件</p>
            <p>请选择商品属性</p>
          </div>
          <div class="quit" @click.stop="quit"></div>
        </div>
        <div class="amount">
          <h6>购买数量</h6>
          <div>
            <span @click="sub">-</span>
            <b>{{massage.num}}</b>
            <span @click="add">+</span>
          </div>
        </div>
        <dl>
          <dd  class="addSize" v-for="(items,index) in massage.size">
            <h6>{{items.name}}</h6>
            <ul class="content_wrap">
              <li v-for="(items2,index2) in items.list"  :class="index>0?arr2[index2]:arr[index2]"  @click="size2(index,index2)" ref="s">{{items2}}</li>
            </ul>
          </dd>
        </dl>
      </div>
    </transition>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import '../../../node_modules/swiper/css/swiper.css'
  import '../../assets/css/commodity.css'
export default {
  name: 'commodity',
  data () {
    return {
        key:'',
        all:[],
        arr:['ac'],
      arr2:['ac'],
        msg:{},
      size:'',
      how:'0',
      flg:false,
      show:false,
      h:'',
      w:'',
      title:'',
      massage:{
        src:'',
        cost:'',
        total:'',
        num:1,
        size:[],
      }
    }
  },
  mounted(){
    this.h=window.screen.availHeight+'px';
    this.w=window.screen.availWidth+'px';
      let a = this.$route.query;
    this.$http({
        url:'http://yd.msword.top/getDetails?pid='+a.pid,
      }).then((res)=>{
      this.massage.size=res.data.data.buySelect;
      this.massage.total=res.data.data.total;
      this.massage.cost=res.data.data.reduct_price;
      this.massage.src=res.data.data.swiperImgArr[0];
      this.msg = res.data.data;
      this.flg = res.data.data.isFreeShip;
      this.$store.dispatch('pass',res.data.data);
      this.$store.dispatch('pid',a);
      this.$nextTick(()=>{
          var swiper = new Swiper('.swiper-container', {
            pagination: {
              el: '.swiper-pagination',
            },
          });
        });
      });
  },
  methods:{
      app(){
          this.show=true;
        this.how=this.massage.cost;
      },
    quit(){
      this.show=false
    },
    size2(x,y){
      if(x===0){
        this.arr=[];
          this.$set(this.arr,y,'ac')
      }
      if(x===1){
        this.arr2=[];
        this.$set(this.arr2,y,'ac')
      }
    },
    add(){
        this.massage.num++;
      this.how=this.massage.cost*this.massage.num
    },
    sub(){
        this.massage.num--;
      this.how=this.massage.cost*this.massage.num;
        if(this.massage.num<=1){
          this.massage.num=1;
          this.how=this.massage.cost*this.massage.num
        }
    },
    sk(){
      let a = document.cookie.split('=')[1];
        // 尺寸和年龄赋值给 all
      this.$refs.s.map(val=>{
        if(val.className=='ac'){
          this.all.push(val.innerHTML)
        }
      });
      // 给定一个key 将pid赋值给key
      this.key=this.msg.pid;
      //遍历所有已存储的数据
      for(let i=0;i<sessionStorage.length;i++){
//        let b = sessionStorage.key(i);
        let c = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
       //判断重复商品 尺寸年龄是否发生改变
        if(this.msg.pid==c['pid']&&c['size'] != this.all[0] || this.msg.pid==c['pid']&&c['age'] != this.all[1]){
            this.key+='0'//发生改变则改变key
        }
        if(this.msg.pid===c['pid']&&c['size'] === this.all[0]&&c['age'] === this.all[1]){
            this.massage.num=c['num']+this.massage.num
        }
      }
      // 存储数据
      if(a=='qw'){
        window.sessionStorage.setItem(this.key,JSON.stringify({
          name:this.msg.name,
          num:this.massage.num,
          total:this.massage.cost,
          image:this.massage.src,
          size:this.all[0],
          age:this.all[1],
          pid:this.msg.pid,
          flag:false,
          key:this.key
        }));
      }
      this.$router.push({
        path:'/shoping',
        query:{pid:this.msg.pid}
      });
    }
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  html, body {
    position: relative;
    height: 100%;
  }
  body {
    background: #eee;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color:#000;
    margin: 0;
    padding: 0;
  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .up-leave{
    bottom:0.97rem
  }
  .up-enter-active,.up-leave-active{
    transition:all .5s
  }
  .up-leave-to{
    bottom:-6.99rem;
  }
  .up-enter{
    bottom:-6.99rem
  }
  .up-enter-to{
    bottom:0.97rem;
  }
</style>
