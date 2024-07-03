<template>
  <div>
    <button :class="[typhoonBtn === true ? 'active_btn' : 'passive_btn']" @click="clickTyphoonBtn"> typhoon layer </button>
    <input type="checkbox" v-model="typhoonCheck" :disabled="mapType === 'nomap'"> maintain
    <button :class="[boundaryBtn === true ? 'active_btn' : 'passive_btn']" @click="clickBoundaryBtn"> boundary layer </button>
    <input type="checkbox" v-model="boundaryCheck" :disabled="mapType === 'nomap'"> maintain
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
// import {axiosTest} from "@/assets/js/axiosFunctions.js";
import {clickBtnAndCheck, settingBtnAndCheck} from "@/assets/js/settingBtnAndCheck.js";

const props = defineProps({
  mapType: String,
})

const typhoonBtn = ref(false);
const boundaryBtn = ref(false);

const typhoonCheck = ref(false);
const boundaryCheck = ref(false);

const emit = defineEmits([
  'getTyphoonBtnIsTrue', 'getBoundaryBtnIsTrue', 'showAlert'
]);

function clickTyphoonBtn(){
  if(props.mapType === "nomap"){
    emit('showAlert');
  }
  else{
    let setting = clickBtnAndCheck(props.mapType, typhoonBtn.value, typhoonCheck.value)
    typhoonBtn.value = setting.btn
    typhoonCheck.value = setting.check
  }
}

function clickBoundaryBtn(){
  if(props.mapType === "nomap"){
    emit('showAlert');
  }
  else{
    let setting = clickBtnAndCheck(props.mapType, boundaryBtn.value, boundaryCheck.value)
    boundaryBtn.value = setting.btn
    boundaryCheck.value = setting.check
  }
}

watch(() => props.mapType, () => {
  let setting = settingBtnAndCheck(props.mapType, typhoonBtn.value, boundaryBtn.value, typhoonCheck.value, boundaryCheck.value)
  typhoonBtn.value = setting.btn1;
  boundaryBtn.value = setting.btn2;
  typhoonCheck.value = setting.check1;
  boundaryCheck.value = setting.check2;
  // axiosTest();
})

watch(() => typhoonCheck.value, (newValue) => {
  if(newValue === true){
    typhoonBtn.value = true;
  }
})

watch(() => boundaryCheck.value, (newValue) => {
  if(newValue === true){
    boundaryBtn.value = true;
  }
})

watch(() => typhoonBtn.value, () => {
  emit('getTyphoonBtnIsTrue', typhoonBtn.value)
})

watch(() => boundaryBtn.value, () => {
  emit('getBoundaryBtnIsTrue', boundaryBtn.value)
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