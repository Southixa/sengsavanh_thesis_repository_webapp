<template>
    <div class="w-full min-h-screen bg-gray-100 px-6">
        <Breadcrumb :items="breadcrumbItems" />
        <div class="max-w-screen-xl mx-auto pt-6 pb-20">
            <div class="w-full min-h-[400px] grid grid-cols-12 gap-4">
                <div class="col-span-12 md:col-span-8 bg-white rounded-md shadow-sm px-6 py-5">
                    <n-skeleton v-if="loading" height="20px" width="66%" :sharp="false" />
                    <h1 class="text-xl font-semibold text-gray-800">{{ currentThesis?.thesis_title_lao }}</h1>
                    <p class="text-gray-500 mt-2">{{ currentThesis?.thesis_title_eng }}</p>
                    <hr class="my-5 border-gray-300 divider-line">
                    <div class="w-full mt-4 grid grid-cols-12">
                        <div class="col-span-4">
                            <div class="w-full h-20 flex items-center">
                                <p class="text-gray-600">ຊື່ນັກອາຈານ:</p>
                            </div>
                        </div>
                        <div class="col-span-8 flex flex-col gap-2">
                            <div v-if="loading" class="w-full h-20 border border-gray-300 rounded-md flex justify-start items-center gap-4 pl-4">
                                <n-skeleton height="20px" width="100px" :sharp="false" />
                            </div>
                            <div v-if="currentThesis?.thesis_author_1" class="w-full h-16 border border-gray-300 rounded-md flex justify-start items-center gap-4 pl-4">
                                <p class="text-gray-600">{{ currentThesis?.thesis_author_1 }}</p>
                            </div>
                            <div v-if="currentThesis?.thesis_author_2" class="w-full h-16 border border-gray-300 rounded-md flex justify-start items-center gap-4 pl-4">
                                <p class="text-gray-600">{{ currentThesis?.thesis_author_2 }}</p>
                            </div>
                            <div v-if="currentThesis?.thesis_author_3" class="w-full h-16 border border-gray-300 rounded-md flex justify-start items-center gap-4 pl-4">
                                <p class="text-gray-600">{{ currentThesis?.thesis_author_3 }}</p>
                            </div>
                        </div>
                        <div class="col-span-4 h-16 flex items-center mt-8">
                            <p class="text-gray-600">ສາຂາ:</p>
                        </div>
                        <div class="col-span-8 h-16 flex items-center mt-8">
                            <p class="text-gray-800">{{ currentThesis?.major?.major_name }}</p>
                        </div>
                        <div class="col-span-4 h-16 flex items-center">
                            <p class="text-gray-600">ລະດັບ:</p>
                        </div>
                        <div class="col-span-8 h-16 flex items-center">
                            <p class="text-gray-800">{{ currentThesis?.degree_type?.degree_type_name }}</p>
                        </div>
                        <div class="col-span-4 h-16 flex items-center">
                            <p class="text-gray-600">ປະຈຳປີ:</p>
                        </div>
                        <div class="col-span-8 h-16 flex items-center">
                            <p class="text-gray-800">{{ currentThesis?.thesis_year }}</p>
                        </div>
                        <div class="col-span-4 h-16 flex items-center">
                            <p class="text-gray-600">ອາຈານທີ່ປຶກສາ:</p>
                        </div>
                        <div class="col-span-8 h-16 flex items-center">
                            <p class="text-gray-800">{{ currentThesis?.thesis_advisor_name }}</p>
                        </div>
                        <div class="col-span-4 h-16 flex items-center">
                            <p class="text-gray-600">ຜູ້ແເຜີຍແຜ່:</p>
                        </div>
                        <div class="col-span-8 h-16 flex items-center">
                            <p class="text-gray-800">ສະຖາບັນທຸລະກິດແສງສະຫວັນ</p>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-4 bg-white rounded-md shadow-sm py-4 px-5 flex flex-col">
                    <div class="w-full grow pb-12">
                        <div class="w-full flex justify-between items-center mb-6 mt-2">
                            <p class="text-gray-600">ວັນທີ່ອັບໂຫຼດ:</p>
                            <p class="text-gray-800">{{ timeFormatter(currentThesis?.created_at) }}</p>
                        </div>
                        <div class="w-full flex justify-between items-center mb-6">
                            <p class="text-gray-600">ເຂົ້າເບິ່ງ:</p>
                            <p class="text-gray-800">{{  currentThesis?.seen  }}</p>
                        </div>
                        <div class="w-full flex justify-between items-center mb-6">
                            <p class="text-gray-600">ຖືກໃຈ:</p>
                            <p class="text-gray-800">{{ currentThesis?.liked }}</p>
                        </div>
                        <div class="w-full flex justify-between items-center mb-6">
                            <p class="text-gray-600">ດາວໂຫຼດ:</p>
                            <p class="text-gray-800">{{ currentThesis.downloaded }}</p>
                        </div>
                    </div>
                    <div class="w-full min-h-16">
                        <div class="w-full flex justify-between items-center mb-2">
                            <p class="text-gray-600">system repository.pdf</p>
                            <p class="text-gray-600">3.31 MB</p>
                        </div>
                        <n-button
                            @click="downloadFile"
                            type="primary"
                            class="w-full"
                            >
                            <template #icon>
                                <n-icon>
                                <download-icon />
                                </n-icon>
                            </template>
                            ດາວໂຫຼດ
                        </n-button>
                        <student-thesis-like-button v-if="currentThesis?.thesis_id" :thesisId="currentThesis?.thesis_id" :onChange="loadCurrentThesis" />
                        <n-skeleton v-else class="mt-2" height="34px" width="100%" :sharp="false" />
                    </div>
                </div>
            </div>
            <div class="w-full min-h-[300px] bg-white rounded-md shadow-sm mt-4 py-4 px-5">
                <p class="text-gray-800 font-semibold">ບົດຄັດຫຍໍ້</p>
                <p class="text-gray-700 mt-4">
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {{ currentThesis?.thesis_abstract_info_lao  }}
                </p>
            </div>
            <div class="w-full min-h-[300px] bg-white rounded-md shadow-sm mt-4 py-4 px-5">
                <p class="text-gray-800 font-semibold">Abstract</p>
                <p class="text-gray-700 mt-4">
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {{ currentThesis?.thesis_abstract_info_eng  }}
                </p>
            </div>
            <p class="mt-8 text-gray-800 font-semibold">Preview</p>
            <div ref="targetRef" :class="!isAuth() ? '' : 'overflow-y-scroll'" class="w-full h-[calc(100vh-70px)] bg-gray-200 rounded-md mt-4 overflow-hidden flex justify-center items-center custom-preview-scroll-bar relative">
                <VuePdfEmbed v-if="isVisible" :page="!isAuth() ? 1 : null" @loaded="loadPreviewPDF = false" class="w-10/12 md:w-8/12 lg:w-5/12" :source="currentThesis?.file_url" />
                <div v-if="loadPreviewPDF" class="w-full h-full absolute top-0 left-0 z-10 flex justify-center items-center">
                    <n-spin size="medium" />
                </div>
                <div v-if="!isAuth()" class="w-full h-full absolute top-0 left-0 z-20 preview-blur-layer flex justify-center items-center">
                    <div class="w-[320px] md:w-[400px] px-8">
                        <p class="text-primary text-2xl font-bold text-center">ເຂົ້າສູ່ລະບົບເພື່ອສະແດງ ແລະ ດາວໂຫຼດ</p>
                            <NuxtLink to="/login">
                                <n-button
                                    type="primary"
                                    class="w-full mt-20 hover:opacity-90"
                                    :loading="loading"
                                    >
                                    ເຂົ້າສູ່ລະບົບ
                                </n-button>
                            </NuxtLink>
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
                                <span class="text-xs"><span class="hidden md:inline">ເຊື່ອມຕໍ່ກັບ</span> Google</span>
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
                                <span class="text-xs"><span class="hidden md:inline">ເຊື່ອມຕໍ່ກັບ</span> Facebook</span>
                                </n-button>
                            </div>
                            </div>

                    </div>
                </div>
            </div>

            <!-- <div v-if="modelPreviewOpen" class="w-full h-screen fixed top-0 left-0 z-10 bg-gray-100/40">
                <div class="w-full h-screen flex justify-center items-center">
                    <div class="max-w-screen-xl w-full mx-auto bg-gray-400">
                        <div  @mouseleave="modelPreviewOpen = !modelPreviewOpen" class="w-full h-[calc(100vh-70px)] bg-gray-200 rounded-md mt-4 overflow-hidden overflow-y-scroll flex justify-center custom-preview-scroll-bar">
                            <VuePdfEmbed class="w-10/12 md:w-5/12" :source="currentThesis?.file_url" />
                        </div>
                    </div>
                </div>
            </div> -->

            <hr class="w-full my-12 border border-gray-200">

            <p class="mt-8 text-gray-800 font-semibold">ບົດຈົບໃກ້ຄຽງ</p>
            <student-thesis-recommend-thesis v-if="currentThesis?.major_id" :majorId="currentThesis?.major_id" :thesisId="currentThesis?.thesis_id" thesisType="teacher"/>
        </div>
    </div>
</template>

<style scoped>
.divider-line {
  border: none;
  border: none;
  height: 1px;
  background: repeating-linear-gradient(90deg,#f3f4f6,#d1d1d1 6px,transparent 6px,transparent 12px);
}
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #002749; 
  border-radius: 10px;
  cursor: pointer;
}
.preview-blur-layer {
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
}
</style>

<script setup>

import { useRoute } from 'vue-router'
import { DownloadForOfflineSharp as DownloadIcon } from "@vicons/material";
import { Heart as HeartIcon } from "@vicons/ionicons5";
import { Google as GoogleIcon } from "@vicons/fa";
import { FacebookFilled as FacebookFilledIcon } from "@vicons/material";
import { EyeOffOutline, EyeOutline } from "@vicons/ionicons5";

import { isAuth, timeFormatter } from '~/utils/helpers';
import { useLoadingBar } from 'naive-ui'
import { useMessage } from "naive-ui";
import VuePdfEmbed from 'vue-pdf-embed'

const message = useMessage();
const loadingBar = useLoadingBar()

const loadPreviewPDF = ref(true)

const route = useRoute()
const id = route.params.id

const { getOneThesis, updateThesisDownloadedAmountIncrement, updateThesisSeenAmountIncrement, updateThesisLikedAmountIncrement, updateThesisLikedAmountDecrement } = useThesis();
const { getOneStorage } = useStorage();
const { isVisible, target: targetRef, startObserving } = useIntersectionObserver()

const loading = ref(false);
const modelPreviewOpen = ref(false);

const breadcrumbItems = [
    { text: 'ໜ້າຫຼັກ', path: '/' },
    { text: 'ປະເພດບົດຈົບ', path: '/category' },
    { text: 'ບົດຈົບຂອງອາຈານ', path: '/teacher-thesis' },
    { text: 'ລາຍລະອຽດ' }
]

const currentThesis = ref({});

const downloadFile = async () => {
    if(!isAuth()){
        message.warning("ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນດາວໂຫຼດ")
        return;
    }
    window.open(currentThesis.value.file_url, '_blank');
    const resUpdateThesisDownloadedAmount = await updateThesisDownloadedAmountIncrement(currentThesis.value.thesis_id);
    if(resUpdateThesisDownloadedAmount){
        await loadCurrentThesis(id);
    }
}


const loadCurrentThesis = async () => {
    // console.log("get called");
    let resThesis = await getOneThesis(id);
    if(!resThesis) {
        return;
    }
    let thesis_student_member_lists = resThesis.thesis_student_member_lists;
    for(let i = 0; i < thesis_student_member_lists.length; i++) {
        const image_url = getOneStorage(thesis_student_member_lists[i]?.student?.student_profile, 400);
        thesis_student_member_lists[i].image_url = image_url
    }
    let file_url = getOneStorage(resThesis.file_id, null);
    resThesis = {
        ...resThesis,
        thesis_student_member_lists,
        file_url
    }
    // console.log(resThesis);
    currentThesis.value = resThesis;
    startObserving();
}

onMounted(async () => {
    loadingBar.start()
    loading.value = true
    await loadCurrentThesis();
    loading.value = false
    loadingBar.finish()
    const resUpdateThesisSeenAmount = await updateThesisSeenAmountIncrement(currentThesis.value.thesis_id);
})

watch(modelPreviewOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

watch(isVisible, (newValue) => {
  // console.log(newValue);
})

</script>