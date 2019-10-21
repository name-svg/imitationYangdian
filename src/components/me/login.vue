<template>
  <div class="login">
   <div class="loginUp">
     <span @click="$router.go(-1)"></span>
     <h5>{{flag==false?content.login:content.register}}</h5>
     <span @click="flag=!flag">{{flag==false?content.register:content.login}}</span>
   </div>
    <div class="import">
      <span>手机号：</span>
      <p><input type="text" v-model="phone"></p>
      <span>密码：</span>
      <p><input type="password" v-model="password"></p>
      <div class="authCode" v-if="flag==true">
        <div>
          <span>验证码：</span>
          <a @click="verify">点击获取</a>
        </div>
        <input type="text" v-model="code">
      </div>
      <div class="forget" v-if="flag==false"><a>忘记密码</a></div>
      <div class="log" @click="start">{{flag==false?content.login:content.next}}</div>
    </div>
    <div class="clause" v-if="flag==true">
      <p><span><input type="checkbox" v-model="consent"></span><span>我已阅读并同意使用<strong>条款和隐私政策</strong></span></p>
    </div>
  </div>
</template>
<script>
  import qs from 'qs'
export default {
  data () {
    return {
        consent:true,
        flag:false,
        phone:'',
        password:'',
        code:'',
        content:{
            login:'登录',
            register:'注册',
          next:'下一步',
        }
    }
  },
  methods:{
      start(){
        let r =/^1[3-9]\d{9}$/;
        if(this.phone===''|| this.password===''){
            alert('填完再点！')
        }else if(r.test(this.phone)===false){
            alert('居然把手机号输错了···')
        }else if(this.password.length<6){
            alert('密码至少六位哦~')
        }
        if(this.flag===true){
            if(this.code===''){
                alert('请输入验证码')
            }else if(this.consent===false){
                alert('要同意协议啊~')
            }else{
              this.$http({
                url:'http://49.232.129.237:3000/captcha/verify?phone='+this.phone+'&captcha='+this.code
              }).then((res)=>{
                if(res.data.code==200){
                  this.$http({
                    url:'http://yd.msword.top/register',
                    method:'post',
                    data:qs.stringify({phone:this.phone,password:this.password})
                  }).then((res)=>{
                    alert(res.data.msg)
                  })
                }
              });
            }
        }
        if(this.flag===false){
          this.$http({
              url:`http://yd.msword.top/login?phone=${this.phone}&password=${this.password}`,
            }).then((res)=>{
              alert(res.data.msg);
            if(res.data.msg=='登录成功。'){
              document.cookie='id=qw';
              this.$router.push('/center')
            }
            })
        }
      },
    verify(){
          this.$http({
            url:'http://49.232.129.237:3000/captcha/sent?phone='+this.phone
          }).then((res)=>{

          })
    }
  },
  components:{

  },
  mounted(){
//      if(this.flag===false){
//          this.$http({
//            url:'http://yd.msword.top/login'
//          }).then((res)=>{
//          })
//      }
//      if(this.flag===true){
//          this.$http({
//            url:'http://yd.msword.top/register'
//          }).then((res)=>{
//          })
//      }
  },
  watch:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
