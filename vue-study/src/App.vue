<template>
  <div id="app">
    <div class="choose-box">
      <h2>Choose the map type</h2>
      <input type="radio" v-model="mapType" value="nomap"> no map
      <input type="radio" v-model="mapType" value="osm"> OSM map
      <input type="radio" v-model="mapType" value="vsat"> v-world map
      <button :class="[typhoonBtn === true ? 'active_btn' : 'passive_btn']" @click="clickTyphoonBtn"> typhoon layer </button>
      <input type="checkbox" v-model="maintainTyphoon" :disabled="mapType === 'nomap'"> maintain layer
      <button :class="[boundaryBtn === true ? 'active_btn' : 'passive_btn']" @click="clickBoundaryBtn"> typhoon layer </button>
      <input type="checkbox" v-model="maintainBoundary" :disabled="mapType === 'nomap'"> maintain layer
    </div>
    <map-component :mapType="mapType" :typhoonBtn="typhoonBtn" :boundaryBtn="boundaryBtn"/>
  </div>
  <alert-component ref="alertCompoRef" :message="message"/>
</template>


<script setup>
import MapComponent from './components/MapComponent.vue'
import AlertComponent from "@/components/modal/AlertComponent.vue";
import {axiosTest} from "@/assets/js/axiosFunctions.js";
import {ref, watch} from "vue";

const mapType = ref("nomap");
const typhoonBtn = ref(false);
const boundaryBtn = ref(false);
const maintainTyphoon = ref(false);
const maintainBoundary = ref(false);

const alertCompoRef = ref(null);
const message = ref("배경지도를 선택해주세요")
function clickTyphoonBtn(){
  if(mapType.value === "nomap"){
    alertCompoRef.value.show();
    return
  }
  typhoonBtn.value = !typhoonBtn.value;
}

function clickBoundaryBtn(){
  if(mapType.value === "nomap"){
    alertCompoRef.value.show();
    return
  }
  boundaryBtn.value = !boundaryBtn.value;
}

watch(() => mapType.value, () => {
  if(maintainTyphoon.value === false){
    typhoonBtn.value = false;
  }
  if(maintainBoundary.value === false){
    boundaryBtn.value = false;
  }
  if(mapType.value === "nomap"){
    typhoonBtn.value = false;
    boundaryBtn.value = false;
    maintainTyphoon.value = false;
    maintainBoundary.value = false;
  }
  axiosTest()
})


watch(() => maintainTyphoon.value, (newValue) => {
  if(newValue === true){
    typhoonBtn.value = true;
  }
})

watch(() => maintainBoundary.value, (newValue) => {
  if(newValue === true){
    boundaryBtn.value = true;
  }
})

</script>


<style scoped>
#app {



  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
[type="radio"] {
  accent-color: #ffe0e6;
}
[type="checkbox"] {
  accent-color: #ffe0e6;
}
.choose-box{
  height: 110px;
}
.active_btn {
  margin: 3px;
  background-color: #ffc7d2;
  color: #323334;
  font-size: 12px;
  font-weight: bold;
}
.passive_btn{
  margin: 3px;
  background-color: #fef1f3;
  color: #323334;
  font-size: 12px;
  font-weight: bold;
}
</style>
