<template>
  <div id="app">
    <h2 class="title-box">Choose the map type</h2>
    <div>
      <input type="radio" v-model="mapType" :value=noMap> no map
      <input type="radio" v-model="mapType" :value=OSMMap> OSM map
      <input type="radio" v-model="mapType" :value=vSatMap> v-world map
    </div>
    <typhoon-component :mapType="mapType" @is-typhoon-btn-true="setBtnValue" @is-boundary-btn-true="setBtnValue" @show-alert="showAlert"/>
    <disaster-component :mapType="mapType" @is-wildfire-btn-true="setBtnValue" @is-flooding-btn-true="setBtnValue" @show-alert="showAlert"/>
    <graphic-component :mapType="mapType" @is-point-btn-true="setBtnValue" @is-line-btn-true="setBtnValue" @show-alert="showAlert"/>
    <map-component :mapType="mapType" :buttons="buttons"/>
  </div>
  <alert-component ref="alertCompoRef" :message="message"/>
</template>

<script setup>
import {ref} from "vue";
import MapComponent from './components/MapComponent.vue'
import TyphoonComponent from "@/components/TyphoonComponent.vue";
import AlertComponent from "@/components/modal/AlertComponent.vue";
import GraphicComponent from "@/components/GraphicComponent.vue";
import DisasterComponent from "@/components/DisasterComponent.vue";
import {typhoon, boundary, wildfire, flooding, point, line, noMap, OSMMap, vSatMap, button} from "@/assets/js/nameConfig.js";

const mapType = ref(noMap);
const buttons = ref(button);

const alertCompoRef = ref(null);
const message = ref("배경지도를 먼저 선택해 주십시오");

function setBtnValue(btn, value){
  switch(btn){
    case typhoon:
      buttons.value.typhoon = value;
      break;
    case boundary:
      buttons.value.boundary = value;
      break;
    case wildfire:
      buttons.value.wildfire = value;
      break;
    case flooding:
      buttons.value.flooding = value;
      break;
    case point:
      buttons.value.point = value;
      break;
    case line:
      buttons.value.line = value;
      break;
  }
}

function showAlert(){
  alertCompoRef.value.show()
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
