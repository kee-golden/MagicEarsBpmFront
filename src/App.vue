<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


  export default {
    name: 'app',
  };
</script>

<style>
  body {
    margin: 0;
  }

  .bosch-pagination-box {
    border-bottom: 1px solid rgb(223, 230, 236);
    border-left: 1px solid rgb(223, 230, 236);
    border-right: 1px solid rgb(223, 230, 236);
    background-color: rgb(238, 241, 246);
    color: rgb(72, 87, 106);
    text-align: right;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 0
  }

  .fa-icon {
    width: auto;
    vertical-align: baseline;
    margin-right: 10px;
    min-width: 1em;
    height: 1em; /* or any other relative font sizes */
  }
</style>
