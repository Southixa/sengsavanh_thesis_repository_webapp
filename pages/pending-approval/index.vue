<template>
    <div class="w-full min-h-screen bg-[url('~/assets/image/register/paper_bg.jpg')] bg_image flex justify-center items-center pt-8 pb-20 px-4">
        <div class="w-[350px] min-h-[200px]">
            <h1 class="text-2xl text-primary font-bold text-center mt-4 mb-4">ລໍຖ້າອະນຸມັດ</h1>
            <p class="text-sm text-gray-600 mt-8"> &nbsp; &nbsp; &nbsp; ໃຊ້ເວລາ 2-3 ມື້ ໃນການອຸນຸມັດ ຫຼັງຈັກນັ້ນແມ່ນເຂົ້າສູ່ລະບົບດ້ວຍອີເມລ ແລະ ລະຫັດຜ່ານທີ່ ທ່ານໄດ້ລົງຖະບຽນ</p>
            <div class="w-full h-32 mt-4 grid place-content-center">
                <div class="w-24 h-24">
                    <img src="~/assets/image/pending-approval/girl_sleep_cartoon.png" alt="">
                </div>
            </div>
            <NuxtLink to="/">
                <n-button
                    type="primary"
                    class="w-full mt-8 "
                    :loading="loading"
                    >
                    ຕົກລົງ
                </n-button>
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped>
.bg_image {
  background-position: center; 
  background-repeat: no-repeat; 
  background-size: cover
}
</style>

<script setup>
import Rules from '~/utils/rule';
import { useMessage } from "naive-ui";
import Models from '~/model';

definePageMeta({
  layout: "blank",
});


</script>