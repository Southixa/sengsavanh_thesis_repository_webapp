<template>
  <div class="w-screen h-screen bg-gray-200 flex">
    <div
      class="hidden lg:flex w-1/2 h-full justify-center items-center bg-[url('~/assets/image/login/login_side_image.png')] bg_side_image"
    >
      <div class="text-center">
        <p class="text-4xl font-bold text-white mb-2">
          ຍິນດີຕ້ອນຮັບເຂົ້າສູ່ເວັບໄຊ
        </p>
        <p class="text-4xl font-bold text-white">Sengsavanh</p>
      </div>
    </div>
    <div
      class="w-full lg:w-1/2 h-full bg-primary flex justify-center items-center px-6"
    >
      <div class="w-full md:w-[450px]">
        <div class="flex justify-center">
          <div class="w-28 h-28 bg-white rounded-full p-1">
            <img
              src="~/assets/image/login/logo.png"
              alt="bg-image"
              class="object-cover h-full w-full"
            />
          </div>
        </div>
        <p class="text-center mt-4 font-bold text-2xl text-white">
          ເຂົ້າສູ່ລະບົບ
        </p>
        <n-form
          class="mt-8"
          ref="formRef"
          :label-width="80"
          :model="formValue"
          :rules="rules"
          :size="size"
        >
          <n-form-item label="ອີເມລ" path="email" label-style="color: white">
            <n-input
              placeholder="ປ້ອນອີເມລ..."
              v-model:value="formValue.email"
              @keydown.enter.prevent
              :disabled="loading"
            />
          </n-form-item>
          <n-form-item
            path="password"
            label="ລະຫັດຜ່ານ"
            class="mt-2"
            label-style="color: white"
          >
            <n-input
              v-model:value="formValue.password"
              type="password"
              show-password-on="click"
              placeholder="ປ້ອນລະຫັດຜ່ານ..."
              :maxlength="20"
              class="w-full"
              :disabled="loading"
            >
              <template #password-visible-icon>
                <n-icon :size="16" :component="EyeOutline" />
              </template>
              <template #password-invisible-icon>
                <n-icon :size="16" :component="EyeOffOutline" />
              </template>
            </n-input>
          </n-form-item>
        </n-form>
        <div class="w-full flex justify-end">
          <NuxtLink to="/login" class="text-blue-500 hover:opacity-80">
            ລີມລະຫັດຜ່ານ
          </NuxtLink>
        </div>
        <n-button
          type="info"
          text-color="#374151"
          class="w-full mt-8 hover:opacity-90"
          @click="handleLogin"
          :loading="loading"
        >
          ເຂົ້າສູ່ລະບົບ
        </n-button>
        <div class="w-full flex justify-between gap-4 mt-4">
          <div class="w-1/2">
            <n-button
              color="#1F2937"
              text-color="white"
              icon-placement="left"
              class="w-full"
              :disabled="loading"
            >
              <template #icon>
                <n-icon size="16">
                  <google-icon />
                </n-icon>
              </template>
              <span class="text-xs">ເຊື່ອມຕໍ່ກັບ Google</span>
            </n-button>
          </div>
          <div class="w-1/2">
            <n-button
              color="#1F2937"
              text-color="white"
              icon-placement="left"
              class="w-full"
              :disabled="loading"
            >
              <template #icon>
                <n-icon size="20">
                  <FacebookFilled-icon />
                </n-icon>
              </template>
              <span class="text-xs">ເຊື່ອມຕໍ່ກັບ Facebook</span>
            </n-button>
          </div>
        </div>
        <div class="w-full flex justify-center mt-8">
          <p class="text-white mr-2">ຍັງບໍ່ມີບັນຊື່ເທື່ອ</p>
          <NuxtLink to="/register" class="text-blue-500 hover:opacity-80 underline"
            >ສະໝັກເລີຍ</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg_side_image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

<script setup>
definePageMeta({
  layout: "blank",
});

import { Google as GoogleIcon } from "@vicons/fa";
import { FacebookFilled as FacebookFilledIcon } from "@vicons/material";
import { EyeOffOutline, EyeOutline } from "@vicons/ionicons5";
import { useMessage } from "naive-ui";
import gql from "graphql-tag";
import Rules from "~/utils/rule";

const message = useMessage();

const { nhost } = useNhost();
const { login } = useUser();

const formRef = ref(null);
const size = ref("medium");
const formValue = ref({
  email: "southixa.pele10@gmail.com",
  password: "",
});
const loading = ref(false);

const rules = Rules.Login;

async function handleLogin(e) {
  e.preventDefault();
  loading.value = true;
  const warining = await formRef.value?.validate().catch((error) => {
    return error;
  });
  if (warining.length > 0) {
    message.error("ຂໍ້ມູນບໍ່ຖືກຕ້ອງ");
    loading.value = false;
    return;
  }
  // console.log(formValue.value);
  const resLogin = await login(formValue.value.email, formValue.value.password);
  if(!resLogin) {
    loading.value = false;
    return;
  }
  message.success("ເຂົ້າສູ່ລະບົບສຳເລັດ");
  loading.value = false;
  navigateTo("/");
}
</script>
