<template>
  <div>
    <input type="radio" v-model="mapType" :value=noMap> no map
    <input type="radio" v-model="mapType" :value=OSMMap> OSM map
    <input type="radio" v-model="mapType" :value=vSatMap> v-world map
  </div>
</template>

<script setup>
import {noMap, OSMMap, vSatMap} from "@/assets/js/nameConfig.js";
import {ref, watch} from "vue";

const mapType = ref(noMap);
const emit = defineEmits([
  'sendMapType'
]);

watch(() => mapType.value, (newValue) => {
  emit('sendMapType', newValue);
})
</script>


<style scoped>
[type="radio"] {
  accent-color: #ffe0e6;
}
</style>