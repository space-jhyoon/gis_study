<template>
  <h2>Choose the map type</h2>
  <input type="radio" v-model="mapType" value="nomap"> no map
  <input type="radio" v-model="mapType" value="osm"> OSM map
  <input type="radio" v-model="mapType" value="vsat"> v-world map
  <br/>
  <br/>
  <div class="map-size" id="base-map"></div>
</template>


<script setup>
import {onMounted, ref, watch} from "vue";
import {createBaseMaps, showMapLayer} from "@/assets/js/baseMapFunctions.js";

const map = ref(new Map);
const mapType = ref("nomap");

onMounted(() => {
  map.value = createBaseMaps()
})

watch(() => mapType.value, (newValue) => { // 모달창 열고 닫는 부분
  showMapLayer(map.value, newValue)
})
</script>


<style scoped>
.map-size{
  margin:auto;
  height: 85%;
}
</style>