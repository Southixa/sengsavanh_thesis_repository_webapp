<template>
    <div class="w-full bg-[#00305A] px-8">
        <div class="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 py-8 gap-0 md:gap-12">
            <div class="w-full min-h-[200px]">
                <div class="w-full flex items-center justify-center md:justify-start gap-2">
                    <div class="w-10 h-10 bg-white rounded-full">
                        <img src="~/assets/image/login/logo.png" alt="" class="w-full h-full">
                    </div>
                    <p class="text-base text-white font-bold">Sengsavanh</p>
                </div>
                <p class="mt-4 text-white text-center md:text-left">ເປັນເວັບໄຊສຳລັບລວບລວມບົດຈົບຂອງສະຖາບັນແສງສະຫວັນ</p>
                <div class="w-full flex items-center justify-center md:justify-start gap-3 mt-4">
                    <NuxtLink to="/">
                        <Icon name="ant-design:facebook-filled" color="white" size="28" class="opacity-70"/>
                    </NuxtLink>
                    <NuxtLink to="/">
                        <Icon name="mdi:youtube" color="white" size="28" class="opacity-70"/>
                    </NuxtLink>
                    <NuxtLink to="/">
                        <Icon name="ic:baseline-tiktok" color="white" size="28" class="opacity-70"/>
                    </NuxtLink>
                    <NuxtLink to="/">
                        <Icon name="mdi:github" color="white" size="28" class="opacity-70"/>
                    </NuxtLink>
                </div>
            </div>
            <div class="w-full min-h-[200px]  text-center md:text-left">
                <p class="text-base text-white font-semibold opacity-90 mb-4">ເບີຕິດຕໍ່</p>
                <p class="text-base text-white font-normal opacity-70 mb-2">+856 20 55837364</p>
                <p class="text-base text-white font-normal opacity-70 mb-2">+856 20 55837364</p>
                <p class="text-base text-white font-normal opacity-70 mb-2">+856 20 55837364</p>
            </div>
            <div class="w-full min-h-[200px]  text-center md:text-left">
                <p class="text-base text-white font-semibold opacity-90 mb-4">ສະຖານທີ</p>
                <p class="text-base text-white font-normal opacity-70 mb-2">ບ້ານ ສີສະຫວາດ</p>
                <p class="text-base text-white font-normal opacity-70 mb-2">ເມືອງຈັນທະບູລີ</p>
                <p class="text-base text-white font-normal opacity-70 mb-2">ແຂວງນະຄອນຫຼວງວຽງຈັນ</p>
            </div>
            <div class="w-full min-h-[200px] text-center md:text-left">
                <p class="text-base text-white font-semibold opacity-90 mb-4">ຄຳຖາມ</p>
                <p class="text-base text-white font-normal opacity-70 mb-2">ເຂົ້າສູ່ລະບົບແນວໃດ?</p>
                <p class="text-base text-white font-normal opacity-70 mb-2">ດາວໂຫຼດບໍ່ໄດ້</p>
                <p class="text-base text-white font-normal opacity-70 mb-2">ລົງຖະບຽນເຂົ້າສູ່ລະບົບແນວໃດ?</p>
            </div>
        </div>
    </div>
    <div class="w-full bg-[#1F2937] py-1">
        <p class="text-white text-center">© 2024 Sengsavanh.com. All rights reserved.</p>
    </div>
</template>