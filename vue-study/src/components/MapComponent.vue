<template>
  <div class="map-size" id="base-map"></div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {createBaseMaps, showLayer, toggleTyphoonLayer} from "@/assets/js/baseMapFunctions.js";
import Map from 'ol/Map';

const map = ref(new Map);
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
})

watch(() => props.typhoonBtn, (newValue) => {
  toggleTyphoonLayer(map.value, "typhoon_geom_layer", newValue);
})

watch(() => props.boundaryBtn, (newValue) => {
  toggleTyphoonLayer(map.value, "typhoon_boundary_layer", newValue);
})

</script>

<style scoped>
.map-size{
  margin:auto;
  height: 85%;
}
</style>