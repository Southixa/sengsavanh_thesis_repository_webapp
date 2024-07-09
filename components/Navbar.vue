<template>
    <div class="w-full bg-primary px-8">
            <div class="max-w-screen-xl w-full h-16 md:h-[68px] mx-auto flex justify-between">
                <NuxtLink to="/" class="flex items-center justify-center gap-4">
                    <div class="rounded-full w-10 h-10 md:w-12 md:h-12 bg-white">
                        <img src="~/assets/image/login/logo.png" alt="">
                    </div>
                    <p class="text-lg md:text-xl font-bold text-white">Sangsavanh</p>    
                </NuxtLink>
                <div class=" items-center justify-center gap-6 hidden md:flex">
                    <NuxtLink to="/category" >
                        <button class="px-6 py-2 text-white hover:opacity-80">ຄັງບົດຈົບ</button>
                    </NuxtLink>
                    <NuxtLink to="/favorite" >
                        <button class="px-6 py-2 text-white hover:opacity-80">ບົດຈົບທີ່ຖືກໃຈ</button>
                    </NuxtLink>
                </div>
                <div class="justify-end items-center text-white hidden md:flex min-w-44">
                    <NuxtLink to="/profile" v-if="user" class="cursor-pointer">
                        <div class="flex justify-center items-center gap-4">
                            <div class="w-10 h-10 bg-gray-400 rounded-full">
                                <img :src="user.user_image_url" alt="profiel-image">
                            </div>
                            <p>{{ user.user_firstname }}</p>
                        </div>
                    </NuxtLink>
                    <NuxtLink v-else to="/login" >
                        <button class="px-6 py-2 text-white border border-white rounded-full hover:opacity-80">ເຂົ້າສູ່ລະບົບ</button>
                    </NuxtLink>
                </div>
                <button @click="open = true" class="md:hidden">
                    <Icon name="mdi:menu" size="40" color="white"/>
                </button>
                <div v-if="open" class="w-screen h-screen z-20 fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.50)] md:hidden transition-all delay-150 duration-1000 ease-in-out">
                    <div class="w-full h-full flex justify-end">
                        <div class="grow h-full" @click="open = false">
                        </div>
                        <div class="w-9/12 h-full bg-primary px-6 py-8 relative">
                            <div class="w-full flex justify-end mb-12">
                                <button @click="open = false">
                                    <Icon name="mdi:close" size="40" color="white"/>
                                </button>
                            </div>
                            <NuxtLink to="/category" @click="open = false">
                                <div class="w-full flex gap-4 items-center py-4">
                                    <div class="w-10 h-10 rounded-full bg-white flex justify-center items-center">
                                        <Icon name="fa-solid:book" size="24" color="#00305A"  />
                                    </div>
                                    <p class="text-base font-semibold text-white">ຄັ້ງບົດຈົບ</p>
                                </div>
                            </NuxtLink>
                            <div class="w-full h-[1px] bg-white opacity-90"></div>
                            <NuxtLink to="/favorite" @click="open = false">
                                <div class="w-full flex gap-4 items-center py-4">
                                    <div class="w-10 h-10 rounded-full bg-white flex justify-center items-center">
                                        <Icon name="mdi:heart" size="24" color="#00305A"  />
                                    </div>
                                    <p class="text-base font-semibold text-white">ບົດຈົບທີ່ຖືກໃຈ</p>
                                </div>
                            </NuxtLink>
                            <div class="absolute bottom-0 left-0 right-0 w-full px-4 pb-12">
                                <NuxtLink to="/profile" @click="open = false" v-if="user">
                                    <div class="flex flex-col justify-center items-center gap-2">
                                        <div class="w-14 h-14 bg-gray-400 rounded-full">
                                            <img :src="user.user_image_url" alt="profiel-image">
                                        </div>
                                        <p class="text-blue-400 underline">{{ user.user_firstname }}</p>
                                    </div>
                                </NuxtLink>
                                <NuxtLink v-else to="/login">
                                    <button class="w-full h-full flex justify-center items-center text-white font-semibold border border-white py-3 rounded-full">ເຂົ້າສູ່ລະບົບ</button>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup>
import { getUserInfoForLocalStorage } from '~/utils/helpers';


const open = ref(false);
const user = ref(null);

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