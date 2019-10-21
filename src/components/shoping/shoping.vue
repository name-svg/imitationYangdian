<template>
  <div class="shoping" :style="{height:h}">
    <div class="topShop">
    <span  @click="$router.go(-1)"></span>
    <h5>购物车</h5>
    </div>
    <div class="downShop">
      <ul>
        <li v-for="(items,index) in arr">
        <h6><span></span>杭州报税局仓</h6>
        <div class="smallBox">
          <div class="oneBox" :style="{width:w}">
              <a @click="alter(index)" ref="b" ></a>
            <img :src="items.image" :style="{width:imgw,margin:m}">
          </div>
          <div class="twoBox" :style="{width:twow}">
            <h3>{{items.name}}<span>{{items.size}}/{{items.age}}</span></h3>
            <dl>
              <dd @click="items.num--">-</dd>
              <dd>{{items.num<=1?items.num=1:items.num}}</dd>
              <dd @click="items.num++">+</dd>
            </dl>
          </div>
          <div class="threeBox" :style="{width:w}">
            <b>￥{{items.total*items.num}}</b>
          </div>
          <transition name="alter">
            <div class="remove" v-show="com" @click="remove(index)">删除</div>
          </transition>
        </div>
      </li>
      </ul>
    </div>
    <p class="middle" v-show="show">
      购物车还是空的快去逛逛吧~
    </p>
    <div class="in" v-if="show==false">
     <div class="cha">
       <span @click="flags" :class="a" ></span>
       <b>全选</b>
     </div>
      <div class="edit">
        <span @click="exchange" :class="arr.length<=0?'':com==true?'ed':''" ></span>
        <b>编辑</b>
      </div>
      <div class="tot">
        <span>合计：{{arr.length<=0?acc:total}}</span>
        <b>(不含运费)</b>
      </div>
      <transition enter-active-class="animated bounceInRight">
        <div class="allRemove" v-show="flag" @click="allRemove">全部删除</div>
      </transition>
      <div class="close">去结算</div>
    </div>
  </div>
</template>

<script>
  import '../../assets/css/shop.css'
  import '../../assets/css/reset.css'
  import '../../assets/css/animate.min.css'
export default {
  data () {
    return {
        x:'',
        pointer:'',
        acc:0,
        twow:'',
        com2:true,
        w:'',
      m:'',
        imgw:'',
        com:false,
        ind:'',
      h:'',
      a:'',
      arr:[],
      b:[],
      flg:[],
      show:true,
      flag:false,
    }
  },
  mounted(){
    let a = document.cookie.split('=')[1];
    if(a=='qw'){
      for(let i=0;i<sessionStorage.length;i++){
        let b = sessionStorage.key(i);
        this.arr.push(JSON.parse(sessionStorage.getItem(b)));
        console.log(11111111111111);
      }
    }
    this.arr.map(val=>{
      this.flg.push({a:val.flag})
    });
    this.h = window.screen.availHeight+'px';
  },
  methods:{
      allRemove(){
          window.sessionStorage.clear();
          this.arr=[]
      },
      remove(x){
          this.x=x;
        for(let i=0;i<sessionStorage.length;i++){
          let b = sessionStorage.key(i);
          if(this.arr[x].key===b){
              sessionStorage.removeItem(b)
          }
        }
        this.arr.splice(x,1);
      },
      exchange(){
          this.com = !this.com;
          this.com2 = !this.com2;
      },
    flags(){
      if(!this.flag){
        this.flg.forEach((val,index)=>{
          val.a=true;
          this.$refs.b[index].className='ba'
        });
        this.a='ac';
        this.flag = true
      }else{
        this.flg.forEach((val,index)=>{
          val.a=false;
          this.$refs.b[index].className=''
        });
        this.a='';
        this.flag = false
      }

    },
      alter(x){
          this.ind=x;
        if(this.flg[x].a===true){
          this.$refs.b[x].className='';
          this.$set(this.flg[x],'a',false);
        }else{
          this.$refs.b[x].className='ba';
          this.flg[x].a = true
        }
      },
  },
  watch:{
      arr(ne){
        if(ne.length<=0){
          this.show=true;
        }else{
          this.show=false
        }
      },
    flg:{
      deep:true,
      handler:function(ne){
        let a = ne.every(val=>{
          return val.a===true
        });
        if(a===true){
          this.flag=true;
          this.a='ac'
        }
        if(a!=true){
          this.flag=false;
          this.a=''
        }
      }
    },
    arr(){
      if(this.arr.length<=0){
        this.show=true;
      }else{
        this.show=false
      }
    },
    com2(news){
        if(news===false){
            this.pointer='none'
        }else{
            this.pointer=''
        }
    }
  },
  computed:{
      total(){
        let b = 0;
          this.flg.map((val,index)=>{
              if(this.arr[index]==undefined){
                  return
              }
            if(val.a===true){
              b +=this.arr[index].total*this.arr[index].num
            }
        });
          return b

      }
  },
  updated(){
    this.arr.map(val=>{
      window.sessionStorage.setItem(val.key,JSON.stringify(val))
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .alter-enter-active{
    animation:alter-in .5s linear
  }
  .alter-leave-active{
    animation:alter-in .5s reverse
  }
  @keyframes alter-in{
    0%{
      width:0;
      opacity:0
    }
    100%{
      width:0.98rem;
      opacity:1
    }
  }
</style>
