<template>
  <div>
    <button :class="[typhoonBtn === true ? 'active_btn' : 'passive_btn']" @click="clickTyphoonBtn"> typhoon layer </button>
    <input type="checkbox" v-model="typhoonCheck" :disabled="mapType === 'nomap'"> maintain layer
    <button :class="[boundaryBtn === true ? 'active_btn' : 'passive_btn']" @click="clickBoundaryBtn"> typhoon layer </button>
    <input type="checkbox" v-model="boundaryCheck" :disabled="mapType === 'nomap'"> maintain layer
  </div>
  <alert-component ref="alertCompoRef" :message="message"/>
</template>


<script setup>
import {ref, watch} from "vue";
import {axiosTest} from "@/assets/js/axiosFunctions.js";
import {showAlert} from "@/assets/js/showAlertFunction.js";
import AlertComponent from "@/components/modal/AlertComponent.vue";

const props = defineProps({
  mapType: String,
})

const typhoonBtn = ref(false);
const boundaryBtn = ref(false);

const typhoonCheck = ref(false);
const boundaryCheck = ref(false);

const alertCompoRef = ref(null);
const message = ref("배경지도를 먼저 선택해 주십시오");

const emit = defineEmits([
  'getTyphoonBtnIsTrue', 'getBoundaryBtnIsTrue'
]);

function clickTyphoonBtn(){
  if(showAlert(props.mapType, alertCompoRef.value) !== true){
    typhoonBtn.value = !typhoonBtn.value;
  }
}

function clickBoundaryBtn(){
  if(showAlert(props.mapType, alertCompoRef.value) !== true){
    boundaryBtn.value = !boundaryBtn.value;
  }
}

watch(() => props.mapType, () => {
  if(typhoonCheck.value === false){
    typhoonBtn.value = false;
  }
  if(boundaryCheck.value === false){
    boundaryBtn.value = false;
  }
  if(props.mapType === "nomap"){
    typhoonBtn.value = false;
    boundaryBtn.value = false;
    typhoonCheck.value = false;
    boundaryCheck.value = false;
  }
  axiosTest();
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