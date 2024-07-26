<template>
  <div class="title">
<!--    <nav>-->
    <!--      <router-link to="/study">study</router-link>-->
    <!--      <router-link to="/hhi">hhi</router-link>-->
    <!--    </nav>-->
    <h2 class="title-study" @click="clickStudy()">STUDY</h2>
    <h2 class="title-hhi" @click="clickHHI()">HHI</h2>
  </div>
</template>


<script setup>
import {study, hhi} from "@/assets/js/nameConfig.js";

const emit = defineEmits([
  'sendMode'
]);

function clickStudy(){
  emit('sendMode', study);
}

function clickHHI(){
  emit('sendMode', hhi);
}

</script>


<style scoped>
.title{
  display: flex;
  justify-content: center;
}
.title-study{
  float: left;
  margin: 10px;
}
.title-hhi{
  float: left;
  margin: 10px;
}

</style>