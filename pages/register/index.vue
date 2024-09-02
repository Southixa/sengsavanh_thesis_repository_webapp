<template>
    <div class="w-full min-h-screen bg-[url('~/assets/image/register/paper_bg.jpg')] bg_image flex justify-center items-center pt-8 pb-32 px-4">
        <div class="w-[350px] min-h-[400px]">
            <NuxtLink to="/login" class="flex items-center gap-2 hover:bg-gray-100/35 px-2 py-1 rounded-md">
                <div class="w-[30px] h-[30px] flex justify-center items-center">
                    <Icon name="formkit:arrowleft" class="text-gray-700" />
                </div>
                <p class="text-gray-800 text-sm">ກັບຄືນ</p>
            </NuxtLink>
            <h1 class="text-2xl text-primary font-bold text-center mt-4 mb-4">ລົງທະບຽນ</h1>
            <div class="w-full mt-6">
                <div class="w-full h-16 grid place-items-center">
                    <div class="w-16 h-16 bg-gray-300 rounded-full">
                        <n-skeleton v-if="!formValue.userAvatar" class="w-full h-full" circle />
                        <img v-else :src="formValue.userAvatar.image_url" alt="selected_avatar" class="w-full h-full rounded-full object-cover">
                    </div>
                </div>
                <div class="w-full min-h-10 gap-4 grid grid-cols-4 place-items-center mt-6 px-14">
                    <div v-if="!avatarLists" class="w-full col-span-4 h-10">
                        <n-skeleton class="w-full h-full" round />
                    </div>
                    <div v-else class="h-10 w-10 bg-gray-200 rounded-full" v-for="(item, index) in avatarLists " :key="index">
                        <img @click="formValue.userAvatar = item" :src="item.image_url" alt="image_avatar" class="w-full h-full rounded-full object-cover cursor-pointer select-none" :class="(formValue.userAvatar.user_avatar_id === item.user_avatar_id) ? 'outline outline-2 border-primary' : 'opacity-50'">
                    </div>
                </div>
            </div>
            <n-form
            class="mt-8"
            ref="formRef"
            :label-width="80"
            :model="formValue"
            :rules="rules"
            :size="size"
            >
                <n-form-item label="ຊື່" path="firstname" label-style="color: gray">
                    <n-input
                    placeholder="ປ້ອນຊື່..."
                    v-model:value="formValue.firstname"
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ນາມສະກຸນ" path="lastname" label-style="color: gray">
                    <n-input
                    placeholder="ປ້ອນນາມສະກຸນ..."
                    v-model:value="formValue.lastname"
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ເບີໂທ" path="phone" label-style="color: gray">
                    <n-input
                    placeholder="ປ້ອນເບີໂທ..."
                    v-model:value="formValue.phone"
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ອີເມລ" path="email" label-style="color: gray">
                    <n-input
                    placeholder="ປ້ອນອີເມລ..."
                    v-model:value="formValue.email"
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ລະຫັດຜ່ານ" path="password" label-style="color: gray">
                    <n-input
                    placeholder="ປ້ອນລະຫັດຜ່ານ..."
                    v-model:value="formValue.password"
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-form-item label="ຢືນຢັນລະຫັດຜ່ານ" path="confirmPassword" label-style="color: gray">
                    <n-input
                    placeholder="ລະຫັດຜ່ານ..."
                    v-model:value="formValue.confirmPassword"
                    @keydown.enter.prevent
                    :disabled="loading"
                    />
                </n-form-item>
                <n-button
                    type="primary"
                    class="w-full mt-8 "
                    @click="handleRegister"
                    :loading="loading"
                    >
                    ເຂົ້າສູ່ລະບົບ
                </n-button>
            </n-form>
            
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


const message = useMessage();

const { nhost } = useNhost();
const { getUserAvatarAll } = useUserAvatar();
const { getOneStorage } = useStorage();
const { addUser, getOneByEmail, getOneByPhone } = useUser();

const avatarLists = ref([]);

const formRef = ref(null);
const size = ref("medium");
const formValue = ref({
    userAvatar: "",
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    isApproved: "false"
})

const loading = ref(false);

const rules = Rules.User;


const handleRegister = async () => {
    loading.value = true;
    const warining = await formRef.value?.validate().catch((error) => {
      return error;
    });
    if (warining.length > 0) {
      message.error("ຂໍ້ມູນບໍ່ຖືກຕ້ອງ");
      loading.value = false;
      return;
    }
    if(formValue.value.password !== formValue.value.confirmPassword) {
        message.error("ລະຫັດຜ່ານບໍ່ຕົງກັນ");
        loading.value = false;
        return;
    }
    const resGetOneByEmail = await getOneByEmail(formValue.value.email);
    if(resGetOneByEmail.length > 0) {
        message.error("ອີເມວຖືກໃຊ້ແລ້ວ");
        loading.value = false;
        return;
    }

    const resGetOneByPhone = await getOneByPhone(parseInt(formValue.value.phone));
    if(resGetOneByPhone.length > 0) {
        message.error("ເບີໂທຖືກໃຊ້ແລ້ວ");
        loading.value = false;
        return;
    }
    
    const resAddUser = await addUser(formValue.value);
    if(!resAddUser) {
        message.error("ລົງທະບຽນບໍ່ສຳເລັດ")
        loading.value = false;
        return;
    }
    message.success("ລົງທະບຽນສໍາເລັດ");
    loading.value = false;
    await navigateTo("/pending-approval");
}

const loadProfile = async () => {
    let userAvatarLists = await getUserAvatarAll();
    if(!userAvatarLists) return;
    if(userAvatarLists.length === 0) return;
    for(let i = 0; i < userAvatarLists.length; i++) {
        userAvatarLists[i]['image_url'] = getOneStorage(userAvatarLists[i].user_avatar, 200);
    }
    avatarLists.value = userAvatarLists;
    formValue.value.userAvatar = userAvatarLists[0];
}

onMounted(async () => {
    await loadProfile();
})

</script>