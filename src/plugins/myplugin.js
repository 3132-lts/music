import Vue from 'vue'
let myPlugin=function(){}

myPlugin.install=function(Vue){
  console.log('插件 install...');
  Vue.hello=function(){
    console.log('vue 全局hello函数');
  };
  Vue.prototype.$hello=function(){
    console.log('vue实例方法 $hello');
  }
};

Vue.use(myPlugin);
export default myPlugin;