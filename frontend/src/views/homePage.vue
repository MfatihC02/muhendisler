<template>
    <div>
    <headerapp />
    <hr>
    <mainapp />
</div>
  </template>
  
  <script>
  import headerapp from '@/components/headerapp.vue'
  import mainapp from '@/components/main.vue'
  export default {
    components:{
      headerapp,
      mainapp,
  
    }
  }
  </script>  
  <style>
  
  </style>