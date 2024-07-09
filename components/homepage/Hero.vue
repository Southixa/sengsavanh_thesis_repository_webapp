<template>
    <div class="w-full h-[calc(100vh-60px)] md:h-[calc(100vh-270px)] lg:h-[calc(90vh-190px)] bg-slate-200 bg-[url(~/assets/image/homepage/bg-banner.jpg)] bg-no-repeat bg-cover bg-fixed">
        <div class="flex flex-col justify-center items-center h-full">
            <h1 class="text-5xl font-bold text-white text-center leading-tight">ຄັງບົດຈົບສະຖາບັນທຸລະກິດ<br> ແສງສະຫັວນ</h1>
            <NuxtLink to="/category" >
                <button class="px-6 py-2 text-white border border-white rounded-full min-w-48 mt-12 font-semibold text-lg hover:opacity-80">ເລີ່ມຄົ້ນຫາ</button>
            </NuxtLink>
        </div>
    </div>
</template>