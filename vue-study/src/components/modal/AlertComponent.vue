<template>
  <div
      class="pup_alert modal-z-index"
      v-if="isVisible">
    <p class="up_tit">알림</p>
    <div class="pup_alert_inner">
      <p class="pup_alert_p white-space">{{ props.message }}</p>
      <button class="pup_btn_blue btn-close" @click="confirm">확인</button>
    </div>
    <span class="close btn-close" @click="confirm"></span>
  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  message: String,
})

const isVisible = ref(false);

const open = () => {
  isVisible.value = true;
}
const close = () => {
  isVisible.value = false;
}
const show = () => {
  open();
}
function confirm() {
  close();
}
defineExpose({
  show,
})
</script>


<style scoped>
.pup_alert {position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #fff; border: 1px solid #adadad; border-radius: 5px; text-align: center; min-width: 360px;}
.modal-z-index {
  z-index: 1000;
}
.up_tit {height: 40px; margin: 0px; padding: 0 10px; line-height: 40px; background-color: #44474e; text-align: left; border-radius: 5px 5px 0 0; color: #fff}
.pup_alert_inner {padding: 30px 60px 20px}
.pup_alert_p {margin-bottom: 20px; font-size: 14px; max-width: 420px;}
.white-space {
  white-space: pre-line;
}
.pup_btn_blue {padding: 6px 30px; border-radius: 3px; background-color: #2366d4; color: #fff; font-size: 12px}

</style>