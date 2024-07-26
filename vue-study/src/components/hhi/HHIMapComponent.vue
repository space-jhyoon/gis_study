<template>
  <input class="" type="search" placeholder="어디로 갈까요">
  <button type="button"class="">검색</button>
  <button type="button">지도 내 검색</button>
  <button type="button">고장 신고</button>
  <button type="button" :class="[breakdownBtn ? 'on-btn' : 'off-btn']" @click="clickBreakdownLayer">고장 레이어</button>
  <button type="button" :class="[crtPstBtn ? 'on-btn' : 'off-btn']" @click="getCrtPst()">현재 위치</button>
  <div class="map-size" id="hhi-map"></div>
</template>


<script setup>
import {onMounted, ref, watch} from "vue";
import {createBaseMap, focusOnCrtPosition, resetSettings} from "@/assets/js/layer/baseMapFunctions.js";
import {onGeoError} from "@/assets/js/geoLocation/geoLocationFunctions.js";
import {hhi} from "@/assets/js/nameConfig.js";
import {getTashuData} from "@/assets/js/tashu/tashuFunctions.js";
import {removeMarkLayer, showMark} from "@/assets/js/showMark.js";

const props = defineProps({
  mode : String,
})

const baseMap = ref(new Map);
const breakdownBtn = ref(false);
const crtPstBtn = ref(false);

onMounted(() => {
  baseMap.value = createBaseMap();

})



function clickBreakdownLayer(){
  breakdownBtn.value = !breakdownBtn.value;
  // getTashuData()
}

function getCrtPst() {
  crtPstBtn.value = !crtPstBtn.value
  if(crtPstBtn.value){
    navigator.geolocation.getCurrentPosition(onGeoOkay, onGeoError);
  }
  else{
    removeMarkLayer(baseMap.value)
  }
}

function onGeoOkay(position) {
  let lonlat = [position.coords.longitude, position.coords.latitude];
  focusOnCrtPosition(baseMap.value, lonlat);
  showMark(baseMap.value, lonlat)
}

watch(() => props.mode, (newValue) => {
  if(newValue === hhi){
    resetSettings(baseMap.value);
  }
})

</script>


<style scoped>
.map-size{
  margin:auto;
  width: 40%;
  height: 80%;
}
[type="button"] {
  margin: 3px;
  color: #323334;
  font-size: 12px;
  font-weight: bold;
}
.off-btn{
  background-color: #fef1f3;
}
.on-btn{
  background-color: #ffc7d2;
}
</style>