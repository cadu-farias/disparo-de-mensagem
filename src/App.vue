
<template>
  <NavBar />
  <RouterView />
  
</template>

<script>
  import NavBar from './components/NavBar.vue';
  export default{
    name:'App',
    components:{
      NavBar
    }
  }
</script>

<style>
 #app{
  width: 100%;
  height: 100%;
 }
</style>
