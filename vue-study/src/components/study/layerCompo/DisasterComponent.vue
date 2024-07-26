<template>
  <li>
    <label class="title">Disaster </label>
    <button :class="[wildfireBtn === true ? 'active_btn' : 'passive_btn']"
            @click="clickControls('btn', wildfire, wildfireBtn, wildfireCheck)"> {{ wildfire }} </button>
    <input type="checkbox" v-model="wildfireCheck" :disabled="mapType === noMap"
           @click="clickControls('check', wildfire, wildfireBtn, wildfireCheck)"> maintain
    <button :class="[floodingBtn === true ? 'active_btn' : 'passive_btn']"
            @click="clickControls('btn', flooding, floodingBtn, floodingCheck)"> {{ flooding }} </button>
    <input type="checkbox" v-model="floodingCheck" :disabled="mapType === noMap"
           @click="clickControls('check', flooding, floodingBtn, floodingCheck)"> maintain
  </li>
</template>

<script setup>
import {ref, watch} from "vue";
import {updateControlSettings, getControlSettings} from "@/assets/js/settingBtnAndCheck.js";
import {wildfire, flooding, noMap} from "../../../assets/js/nameConfig.js";

const props = defineProps({
  mapType: String,
})

const wildfireBtn = ref(false);
const floodingBtn = ref(false);

const wildfireCheck = ref(false);
const floodingCheck = ref(false);

const emit = defineEmits([
  'isWildfireBtnTrue', 'isFloodingBtnTrue', 'showAlert'
]);

function clickControls(controlType, type, btn, check){
  if(props.mapType === noMap){
    emit('showAlert');
    return
  }
  let setting = updateControlSettings(controlType, btn, check)
  switch (type){
    case wildfire:
      wildfireBtn.value = setting.btn
      wildfireCheck.value = setting.check
      break;
    case flooding:
      floodingBtn.value = setting.btn
      floodingCheck.value = setting.check
      break;
  }
}

watch(() => props.mapType, () => {
  let setting = getControlSettings(props.mapType, wildfireBtn.value, floodingBtn.value, wildfireCheck.value, floodingCheck.value)
  wildfireBtn.value = setting.btn1;
  floodingBtn.value = setting.btn2;
  wildfireCheck.value = setting.check1;
  floodingCheck.value = setting.check2;
})

watch(() => [wildfireBtn.value, floodingBtn.value], ([newW, newF], [oldW, oldF]) => {
  (newW !== oldW) && emit('isWildfireBtnTrue', wildfire, wildfireBtn.value);
  (newF !== oldF) && emit('isFloodingBtnTrue', flooding, floodingBtn.value);
})

</script>


<style scoped>
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
[type="checkbox"] {
  accent-color: #ffe0e6;
}
li{
  list-style:none;
}
.title{
  font-size: 15px;
  font-weight: bold;
}
</style>