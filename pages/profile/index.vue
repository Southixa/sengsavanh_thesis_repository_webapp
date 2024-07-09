<template>
    <div class="w-full min-h-screen bg-[url('~/assets/image/register/paper_bg.jpg')] bg_image flex justify-center items-center py-20 px-4">
        <div class="w-[400px] min-h-[200px] bg-white p-6 rounded-md shadow-sm">
            <div class="w-full flex justify-center items-center mt-8">
                <div class="w-24 h-24 bg-gray-200 rounded-full">
                    <img :src="user?.user_image_url" alt="profile_image">
                </div>
            </div>
            <div class="w-full px-4 mt-8">
                <div class="w-full shadow-sm h-16 border border-gray-100 rounded-md flex justify-between">
                    <div class="w-1/2 h-16 flex flex-col justify-center items-center gap-1">
                        <p class="text-gray-600 text-xs">ເລີ່ມນຳໃຊ້</p>
                        <p class="text-gray-800 text-sm">{{ timeFormatter(user?.created_at) }}</p>
                    </div>
                    <div class="w-1/2 h-16 flex flex-col justify-center items-center gap-1">
                        <p class="text-gray-600 text-xs">ເລີ່ມນຳໃຊ້</p>
                        <p class="text-gray-800 text-sm">{{ timeFormatter(user?.created_at) }}</p>
                    </div>
                </div>
            </div>
            <div class="w-full flex justify-between items-center mt-8 border-b border-gray-100 py-4">
                <p class="text-gray-500">ຊື່</p>
                <p class="text-gray-800">{{ user?.user_firstname }} {{ user?.user_lastname }}</p>
            </div>
            <div class="w-full flex justify-between items-center border-b border-gray-100 py-4">
                <p class="text-gray-500">ອີເມວ</p>
                <p class="text-gray-800">{{ user?.user_email }}</p>
            </div>
            <div class="w-full flex justify-between items-center py-4 mb-8">
                <p class="text-gray-500">ລະຫັດ</p>
                <p class="text-gray-800">{{ user?.user_password }}</p>
            </div>
            <div class="w-full flex justify-center items-center">
                <div class="w-[150px]">
                    <n-button
                        @click="handleLogout"
                        type="error"
                        class="w-full mt-8 "
                        :loading="loading"
                        >
                        ອອກຈາກລະບົບ
                    </n-button>
                </div>
            </div>
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
import { getUserInfoForLocalStorage, timeFormatter } from '~/utils/helpers';

const user = ref(null);

const handleLogout = () => {
    localStorage.removeItem('user');
    navigateTo('/login');
}

const loadUserInfo = () => {
    const userInfo = getUserInfoForLocalStorage();
    if(!user){
        return;
    }
    user.value = userInfo
    // console.log(user.value);
}

onMounted(() => {
    loadUserInfo();
})

</script>