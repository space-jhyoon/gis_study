<template>
  <div id="app">
    <h2 class="title-box">Choose the map type</h2>
    <div>
      <input type="radio" v-model="mapType" value="nomap"> no map
      <input type="radio" v-model="mapType" value="osm"> OSM map
      <input type="radio" v-model="mapType" value="vsat"> v-world map
    </div>
    <typhoon-component :mapType="mapType" @get-typhoon-btn-is-true="getTyphoonBtnIsTrue" @get-boundary-btn-is-true="getBoundaryBtnIsTrue"/>
    <map-component :mapType="mapType" :typhoonBtn="typhoonBtn" :boundaryBtn="boundaryBtn"/>
  </div>
</template>


<script setup>
import {ref} from "vue";
import MapComponent from './components/MapComponent.vue'
import TyphoonComponent from "@/components/TyphoonComponent.vue";

const mapType = ref("nomap");
const typhoonBtn = ref(false);
const boundaryBtn = ref(false);

function getTyphoonBtnIsTrue(btn){
  typhoonBtn.value = btn;
}

function getBoundaryBtnIsTrue(btn){
  boundaryBtn.value = btn;
}

</script>


<style scoped>
#app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1px;
}
.title-box{
  margin: 10px;
}
[type="radio"] {
  accent-color: #ffe0e6;
}
</style>
