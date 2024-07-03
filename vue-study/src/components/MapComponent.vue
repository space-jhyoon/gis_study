<template>
  <div class="map-size" id="base-map"></div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {createBaseMaps, showLayer, toggleLayer} from "@/assets/js/baseMapFunctions.js";
import Map from 'ol/Map';
import {boundaryInfo, floodingInfo, typhoonInfo, wildfireInfo} from "@/assets/js/layerInfoconfig.js";

const map = ref(new Map);
const loading = ref(true);
const props = defineProps({
  mapType: String,
  typhoonBtn: Boolean,
  boundaryBtn: Boolean,
  wildfireBtn: Boolean,
  floodingBtn: Boolean,
})

onMounted(() => {
  map.value = createBaseMaps();
})

watch(() => props.mapType, (newValue) => {
  showLayer(map.value, newValue);
  loading.value = false;
})

watch(() => props.typhoonBtn, (newValue) => {
  toggleLayer(map.value, typhoonInfo.type, newValue);
})

watch(() => props.boundaryBtn, (newValue) => {
  toggleLayer(map.value, boundaryInfo.type, newValue);
})

watch(() => props.wildfireBtn, (newValue) => {
  toggleLayer(map.value, wildfireInfo.type, newValue);
})

watch(() => props.floodingBtn, (newValue) => {
  toggleLayer(map.value, floodingInfo.type, newValue);
})

</script>

<style scoped>
.map-size{
  margin:auto;
  height: 80%;
}
</style>