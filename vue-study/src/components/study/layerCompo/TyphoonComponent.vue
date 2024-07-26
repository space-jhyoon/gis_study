<template>
  <li>
    <label class="title">Typhoon </label>
    <button :class="[typhoonBtn === true ? 'active_btn' : 'passive_btn']"
            @click="clickControls('btn', typhoon, typhoonBtn, typhoonCheck)"> {{ typhoon }} </button>
    <input type="checkbox" v-model="typhoonCheck" :disabled="mapType === noMap"
           @click="clickControls('check', typhoon, typhoonBtn, typhoonCheck)"> maintain
    <button :class="[boundaryBtn === true ? 'active_btn' : 'passive_btn']"
            @click="clickControls('btn', boundary, boundaryBtn, boundaryCheck)"> {{ boundary }} </button>
    <input type="checkbox" v-model="boundaryCheck" :disabled="mapType === noMap"
           @click="clickControls('check', boundary, boundaryBtn, boundaryCheck)"> maintain
  </li>
</template>

<script setup>
import {ref, watch} from "vue";
import {updateControlSettings, getControlSettings} from "@/assets/js/settingBtnAndCheck.js";
import {typhoon, boundary, noMap} from "@/assets/js/nameConfig.js";

const props = defineProps({
  mapType: String,
})

const typhoonBtn = ref(false);
const boundaryBtn = ref(false);

const typhoonCheck = ref(false);
const boundaryCheck = ref(false);

const emit = defineEmits([
  'isTyphoonBtnTrue', 'isBoundaryBtnTrue', 'showAlert'
]);

function clickControls(controlType, type, btn, check){
  if(props.mapType === noMap){
    emit('showAlert');
    return
  }
  let setting = updateControlSettings(controlType, btn, check)
  switch (type){
    case typhoon:
      typhoonBtn.value = setting.btn;
      typhoonCheck.value = setting.check;
      break;
    case boundary:
      boundaryBtn.value = setting.btn;
      boundaryCheck.value = setting.check;
      break;
  }
}

watch(() => props.mapType, () => {
  let setting = getControlSettings(props.mapType, typhoonBtn.value, boundaryBtn.value, typhoonCheck.value, boundaryCheck.value)
  typhoonBtn.value = setting.btn1;
  boundaryBtn.value = setting.btn2;
  typhoonCheck.value = setting.check1;
  boundaryCheck.value = setting.check2;
})

watch(() => [typhoonBtn.value, boundaryBtn.value], ([newT, newB], [oldT, oldB]) => {
  (newT !== oldT) && emit('isTyphoonBtnTrue', typhoon, typhoonBtn.value);
  (newB !== oldB) && emit('isBoundaryBtnTrue', boundary, boundaryBtn.value);
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