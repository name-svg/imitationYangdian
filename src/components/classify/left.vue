<template>
  <div class="left">
    <dl :style="{height:height}">
      <dd v-for="(items,index) in arr" @click="a(index)" :class="cl[index]">{{items.name}}</dd>
    </dl>
    <ul class="right">
      <li v-for="items2 in arr2">
        <img :src="items2.thumbnail">
        <h6>{{items2.name}}</h6>
      </li>
    </ul>
  </div>
</template>

<script>
  import '../../assets/css/classify.css'
  import '../../assets/css/reset.css'
export default {
  data () {
      return {
          arr:[],
          arr2:[],
          cl:['bo'],
         height:''
      }
  },
  mounted(){
    this.height=window.screen.availHeight+'px';
    this.$http({
      url:'http://yd.msword.top/getClassify'
    }).then((res)=>{
      this.arr = res.data.data;
      this.arr2 = this.arr[0].list;
//      this.$store.dispatch('add',res.data.data)
    })
  },
  methods:{
      a(x){
           this.cl=[];
          this.$set(this.cl,x,'bo');
        this.arr2=[...this.arr[x].list];

      }
  },
  components:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
