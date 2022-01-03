<template>
  <v-app>
    <div class="bg"></div>
    <router-view ></router-view>
  </v-app>
</template>

<script>
  export default {
    name: "App",
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color:#1e58925e;
    margin-top: -10px;
  }

  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: url('assets/bg.jpg') no-repeat center center;
    background-size: cover;
    background-color: rgb(0, 0, 0);
    transform: scale(1);
    filter: brightness(60%);
  }
</style>
