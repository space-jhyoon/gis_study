<template>
  <div id="app">
    <h2 class="title-box">Choose the map type</h2>
    <div>
      <input type="radio" v-model="mapType" value="nomap"> no map
      <input type="radio" v-model="mapType" value="osm"> OSM map
      <input type="radio" v-model="mapType" value="vsat"> v-world map
    </div>
    <typhoon-component :mapType="mapType" @get-typhoon-btn-is-true="getTyphoonBtnIsTrue"
                                          @get-boundary-btn-is-true="getBoundaryBtnIsTrue"
                                          @show-alert="showAlert"/>
    <service-component :mapType="mapType" @get-wildfire-btn-is-true="getWildfireBtnIsTrue"
                                          @get-flooding-btn-is-true="getFloodingBtnIsTrue"
                                          @show-alert="showAlert"/>
    <map-component :mapType="mapType" :typhoonBtn="typhoonBtn" :boundaryBtn="boundaryBtn" :wildfireBtn="wildfireBtn" :floodingBtn="floodingBtn"/>
  </div>
  <alert-component ref="alertCompoRef" :message="message"/>
</template>


<script setup>
import {ref} from "vue";
import MapComponent from './components/MapComponent.vue'
import TyphoonComponent from "@/components/TyphoonComponent.vue";
import ServiceComponent from "@/components/ServiceComponent.vue";
import AlertComponent from "@/components/modal/AlertComponent.vue";

const mapType = ref("nomap");
const typhoonBtn = ref(false);
const boundaryBtn = ref(false);
const wildfireBtn = ref(false);
const floodingBtn = ref(false);

const alertCompoRef = ref(null);
const message = ref("배경지도를 먼저 선택해 주십시오");

function getTyphoonBtnIsTrue(btn){
  typhoonBtn.value = btn;
}

function getBoundaryBtnIsTrue(btn){
  boundaryBtn.value = btn;
}

function getWildfireBtnIsTrue(btn){
  wildfireBtn.value = btn;
}

function getFloodingBtnIsTrue(btn){
  floodingBtn.value = btn;
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
