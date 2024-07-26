<template>
  <div class="map-size" id="base-map"></div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {createAllLayers, showLayer, toggleLayer} from "@/assets/js/layer/baseMapFunctions.js";
import Map from 'ol/Map';
import {typhoon, boundary, wildfire, flooding, point, line, hhi, noMap} from "@/assets/js/nameConfig.js";

const map = ref(new Map);
const props = defineProps({
  mode : String,
  mapType: String,
  buttons: Object,
})
// const emit = defineEmits([
//   'sendMap'
// ]);

onMounted(() => {
  map.value = createAllLayers();
  // emit("sendMap", map.value)
})

watch(() => props.mode, (newValue) => {
  if(newValue === hhi){
    showLayer(map.value, noMap);
  }
})

watch(() => props.mapType, (newValue) => {
  showLayer(map.value, newValue);
})

watch(() => [props.buttons.typhoon, props.buttons.boundary, props.buttons.wildfire, props.buttons.flooding, props.buttons.point, props.buttons.line],
    ([n1, n2, n3, n4, n5, n6], [o1, o2, o3, o4, o5, o6]) => {
  (n1 !== o1) && toggleLayer(map.value, typhoon, n1);
  (n2 !== o2) && toggleLayer(map.value, boundary, n2);
  (n3 !== o3) && toggleLayer(map.value, wildfire, n3);
  (n4 !== o4) && toggleLayer(map.value, flooding, n4);
  (n5 !== o5) && toggleLayer(map.value, point, n5);
  (n6 !== o6) && toggleLayer(map.value, line, n6);
})
</script>

<style scoped>
.map-size{
  margin:auto;
  height: 80%;
}
</style>