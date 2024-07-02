<template>
  <div>
    <button :class="[wildfireBtn === true ? 'active_btn' : 'passive_btn']" @click="clickWildfireBtn"> wildfire layer </button>
    <input type="checkbox" v-model="wildfireCheck" :disabled="mapType === 'nomap'"> maintain layer
    <button :class="[floodingBtn === true ? 'active_btn' : 'passive_btn']" @click="clickFloodingBtn"> flooding layer </button>
    <input type="checkbox" v-model="floodingCheck" :disabled="mapType === 'nomap'"> maintain layer
  </div>
</template>


<script setup>
import {ref, watch} from "vue";
import {clickBtnAndCheck, settingBtnAndCheck} from "@/assets/js/settingBtnAndCheck.js";

const props = defineProps({
  mapType: String,
})

const wildfireBtn = ref(false);
const floodingBtn = ref(false);

const wildfireCheck = ref(false);
const floodingCheck = ref(false);

const emit = defineEmits([
  'getWildfireBtnIsTrue', 'getFloodingBtnIsTrue', 'showAlert'
]);

function clickWildfireBtn(){
  if(props.mapType === "nomap"){
    emit('showAlert');
  }
  else{
    let setting = clickBtnAndCheck(props.mapType, wildfireBtn.value, wildfireCheck.value)
    wildfireBtn.value = setting.btn
    wildfireCheck.value = setting.check
  }
}

function clickFloodingBtn(){
  if(props.mapType === "nomap"){
    emit('showAlert');
  }
  else{
    let setting = clickBtnAndCheck(props.mapType, floodingBtn.value, floodingCheck.value)
    floodingBtn.value = setting.btn
    floodingCheck.value = setting.check
  }
}

watch(() => props.mapType, () => {
  let setting = settingBtnAndCheck(props.mapType, wildfireBtn.value, floodingBtn.value, wildfireCheck.value, floodingCheck.value)
  wildfireBtn.value = setting.btn1;
  floodingBtn.value = setting.btn2;
  wildfireCheck.value = setting.check1;
  floodingCheck.value = setting.check2;
})

watch(() => wildfireCheck.value, (newValue) => {
  if(newValue === true){
    wildfireBtn.value = true;
  }
})

watch(() => floodingCheck.value, (newValue) => {
  if(newValue === true){
    floodingBtn.value = true;
  }
})

watch(() => wildfireBtn.value, () => {
  emit('getWildfireBtnIsTrue', wildfireBtn.value)
})

watch(() => floodingBtn.value, () => {
  emit('getFloodingBtnIsTrue', floodingBtn.value)
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
</style>