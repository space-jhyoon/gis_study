<template>
  <li>
    <label class="title">Graphic </label>
    <button :class="[pointBtn === true ? 'active_btn' : 'passive_btn']"
            @click="clickControls('btn', point, pointBtn, pointCheck)"> {{ point }} </button>
    <input type="checkbox" v-model="pointCheck" :disabled="mapType === noMap"
           @click="clickControls('check', point, pointBtn, pointCheck)"> maintain
    <button :class="[lineBtn === true ? 'active_btn' : 'passive_btn']"
            @click="clickControls('btn', line, lineBtn, lineCheck)"> {{ line }} </button>
    <input type="checkbox" v-model="lineCheck" :disabled="mapType === noMap"
           @click="clickControls('check', line, lineBtn, lineCheck)"> maintain
  </li>
</template>

<script setup>
import {ref, watch} from "vue";
import {getControlSettings, updateControlSettings} from "@/assets/js/settingBtnAndCheck.js";
import {point, line, noMap} from "../assets/js/nameConfig.js";

const props = defineProps({
  mapType: String,
})

const pointBtn = ref(false);
const lineBtn = ref(false);

const pointCheck = ref(false);
const lineCheck = ref(false);

const emit = defineEmits([
  'isPointBtnTrue', 'isLineBtnTrue', 'showAlert'
]);

function clickControls(controlType, type, btn, check){
  if(props.mapType === noMap){
    emit('showAlert');
    return
  }
  let setting = updateControlSettings(controlType, btn, check)
  switch (type){
    case point:
      pointBtn.value = setting.btn
      pointCheck.value = setting.check
      break;
    case line:
      lineBtn.value = setting.btn
      lineCheck.value = setting.check
      break;
  }
}

watch(() => props.mapType, () => {
  let setting = getControlSettings(props.mapType, pointBtn.value, lineBtn.value, pointCheck.value, lineCheck.value)
  pointBtn.value = setting.btn1;
  lineBtn.value = setting.btn2;
  pointCheck.value = setting.check1;
  lineCheck.value = setting.check2;
})

watch(() => [pointBtn.value, lineBtn.value], ([newP, newL], [oldP, oldL]) => {
  (newP !== oldP) && emit('isPointBtnTrue', point, pointBtn.value);
  (newL !== oldL) && emit('isLineBtnTrue', line, lineBtn.value);
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