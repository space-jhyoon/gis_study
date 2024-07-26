<template>
  <div id="app">
    <title-component @send-mode="getMode"/>

    <div v-if="mode === study">
      <map-type-component @send-map-type="getMapType"/>
      <typhoon-component :mapType="mapType" @is-typhoon-btn-true="setBtnValue" @is-boundary-btn-true="setBtnValue" @show-alert="showAlert"/>
      <disaster-component :mapType="mapType" @is-wildfire-btn-true="setBtnValue" @is-flooding-btn-true="setBtnValue" @show-alert="showAlert"/>
      <graphic-component :mapType="mapType" @is-point-btn-true="setBtnValue" @is-line-btn-true="setBtnValue" @show-alert="showAlert"/>
    </div>

    <map-component :mode="mode" :mapType="mapType" :buttons="buttons" v-if="mode === study"/>
    <h-h-i-map-component :mode="mode"/>
  </div>
  <alert-component ref="alertCompoRef" :message="message"/>
</template>

<script setup lang="ts">
import {ref} from "vue";
import MapComponent from './components/study/MapComponent.vue'
import TyphoonComponent from "@/components/study/layerCompo/TyphoonComponent.vue";
import AlertComponent from "@/components/modal/AlertComponent.vue";
import GraphicComponent from "@/components/study/layerCompo/GraphicComponent.vue";
import DisasterComponent from "@/components/study/layerCompo/DisasterComponent.vue";
import TitleComponent from "@/components/study/TitleComponent.vue";
import MapTypeComponent from "@/components/study/MapTypeComponent.vue";
import HHIMapComponent from "@/components/hhi/HHIMapComponent.vue";
import {typhoon, boundary, wildfire, flooding, point, line, button, study} from "@/assets/js/nameConfig.js";

const mode = ref(study);
const mapType = ref(null);
const map = ref(null);
const buttons = ref(button);

const alertCompoRef = ref(null);
const message = ref("배경지도를 먼저 선택해 주십시오");

function getMode(value){
  mode.value = value;
}

function getMapType(value){
  mapType.value = value;
}

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
</style>
