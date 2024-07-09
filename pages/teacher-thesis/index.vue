<template>
    <div class="w-full min-h-screen bg-gray-100 px-6">
        <Breadcrumb :items="breadcrumbItems" />
        <div class="max-w-screen-xl mx-auto pt-6">
            <div class="w-full">
                <n-input v-model:value="searchKeyword" class="bg-gray-200 text-gray-800 rounded-sm" placeholder="ຄົ້ນຫາ..." @keyup.enter="handleFilterThesis">
                    <template #suffix>
                        <n-icon :component="IosSearch" />
                    </template>
                </n-input>
            </div>
            <div class="w-full grid grid-cols-12 gap-4 mt-6 pb-24">
                <div class="col-span-12 md:col-span-2 grid grid-cols-12 gap-4 h-fit">
                    <div class="col-span-6 md:col-span-12 w-full">
                        <Student-thesis-CheckBoxMajorList :onChange="handleMajorChange" :thesis="thesisList" />
                    </div>
                    <div class="col-span-6 md:col-span-12 w-full flex flex-col">
                        <Student-thesis-CheckBoxDegreeList :onChange="handleDegreeChange" :thesis="thesisList" />
                    </div>
                    <div class="col-span-6 md:col-span-12 w-full">
                        <Student-thesis-CheckBoxYearList :onChange="handleYearChange" :thesis="thesisList" />
                    </div>
                </div>
                <div class="col-span-12 md:col-span-10">
                    <div class="w-full flex justify-between items-center">
                        <p class="text-gray-500 text-xs">ທັງໝົດ ({{ thesisList.length }})</p>
                        <n-dropdown @select="handleDropdownSelected" trigger="click" :options="options">
                            <n-button quaternary size="tiny" >
                                <template #icon>
                                    <n-icon size="12" class="text-gray-500">
                                        <angle-down-icon />
                                    </n-icon>
                                </template>
                                <p v-if="selectedDropdownFilter === 'all'">ທັງໝົດ</p>
                                <p v-if="selectedDropdownFilter === 'mostSeen'">ເຂົ້າເບິ່ງຫຼາຍສຸດ</p>
                                <p v-if="selectedDropdownFilter === 'mostLiked'">ຖືກໃຈຫຼາຍສຸດ</p>
                                <p v-if="selectedDropdownFilter === 'mostDownloaded'">ດາວໂຫຼດຫຼາຍສຸດ</p>
                                <p v-if="selectedDropdownFilter === 'newest'">ອັບໂຫຼດລ່າສຸດ</p>
                            </n-button>
                        </n-dropdown>
                    </div>
                    <n-skeleton v-if="loading" class="mt-2" text :repeat="3" height="110px" width="100%" :sharp="false" />
                    <n-empty v-if="!loading && thesisList.length === 0" description="ບໍ່ມີຂໍ້ມູນ" class="mt-8" size="small">
                        <template #extra>
                        </template>
                    </n-empty>
                    <student-thesis-card v-for="(thesis, index) in thesisList" :key="index" :thesis="thesis" :loading="filterDataLoading" :userLikedThesisList="userLikedThesisList" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { IosSearch } from '@vicons/ionicons4'
import { useLoadingBar } from 'naive-ui'
import { NIcon } from "naive-ui";
import { AngleDown as AngleDownIcon } from '@vicons/fa'
import {
  Eye as EyeIcon,
  Heart as HeartIcon,
} from "@vicons/ionicons5";
import { DownloadForOfflineRound as DownlaodIcon,
    AccessTimeFilledOutlined as TimeIcon
 } from '@vicons/material'
import { Stack2 as StackIcon } from "@vicons/tabler";
import { getUserInfoForLocalStorage, isAuth } from '~/utils/helpers';
const loadingBar = useLoadingBar()
const {  getAllByFilter } = useThesis();
const { getAllByUserId } = useLiked();

const breadcrumbItems = [
    { text: 'ໜ້າຫຼັກ', path: '/' },
    { text: 'ປະເພດບົດຈົບ', path: '/category' },
    { text: 'ບົດຈົບຂອງອາຈານ' }
]

const selectedDropdownFilter = ref("all");

const renderIcon = (icon, color = null, size = null) => {
  return () => {
    return h(NIcon, { color, size }, {
      default: () => h(icon)
    });
  };
};

const options = [
        {
          label: "ທັງໝົດ",
          key: "all",
          icon: renderIcon(StackIcon, "#B5BAC1", 14)
        },
        {
          label: "ເຂົ້າເບິ່ງຫຼາຍສຸດ 🔥",
          key: "mostSeen",
          icon: renderIcon(EyeIcon, "#B5BAC1", 14)
        },
        {
          label: "ຖືກໃຈຫຼາຍສຸດ",
          key: "mostLiked",
          icon: renderIcon(HeartIcon, "#B5BAC1", 14)
        },
        {
          label: "ດາວໂຫຼດຫຼາຍສຸດ",
          key: "mostDownloaded",
          icon: renderIcon(DownlaodIcon, "#B5BAC1", 14)
        },
        {
          label: "ອັບໂຫຼດລ່າສຸດ",
          key: "newest",
          icon: renderIcon(TimeIcon, "#B5BAC1", 14)
        }
      ]

const thesisList = ref([])
const initThesisList = ref([])
const loading = ref(false)
const filterDataLoading = ref(true)

const majorFilterList = ref(["all"])
const degreeFilterList = ref(["all"])
const yearFilterList = ref(["all"])
const searchKeyword = ref("")

const userLikedThesisList = ref([])

const handleMajorChange = (value) => {
    majorFilterList.value = value
    handleFilterThesis()
}

const handleDegreeChange = (value) => {
    degreeFilterList.value = value
    handleFilterThesis()
}

const handleYearChange = (value) => {
    yearFilterList.value = value
    handleFilterThesis()
}

const handleDropdownSelected = async (key) => {
    // console.log(key);
    selectedDropdownFilter.value = key
    await handleFilterThesis();
}

const filterThesisByCurrentDropdown = (thesisList) => {
    if(selectedDropdownFilter.value === "all"){
        return thesisList
    }else if(selectedDropdownFilter.value === "mostSeen"){
        return thesisList.sort((a, b) => b.seen - a.seen)
    }else if(selectedDropdownFilter.value === "mostLiked"){
        return thesisList.sort((a, b) => b.liked - a.liked)
    }else if(selectedDropdownFilter.value === "mostDownloaded"){
        return thesisList.sort((a, b) => b.downloaded - a.downloaded)
    }else if(selectedDropdownFilter.value === "newest"){
        return thesisList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }
    return thesisList
}


const handleFilterThesis = async () => {
    filterDataLoading.value = true
    const resFilterThesisByCheckbox = await getAllByFilter(majorFilterList.value, degreeFilterList.value, yearFilterList.value, searchKeyword.value, "teacher")
    const resFilterThesisByDropdown = filterThesisByCurrentDropdown(resFilterThesisByCheckbox)
    thesisList.value = resFilterThesisByDropdown;
    // console.log("result on handleFilterThesis =>");
    // console.log(resFilterThesisByDropdown);
    filterDataLoading.value = false
}

const loadUserLikedThesisList = async () => {
    if(!isAuth()) return;

    const currentUserInfo = getUserInfoForLocalStorage();
    const userId = currentUserInfo.user_id;

    const resGetAllByUserId = await getAllByUserId(userId);
    userLikedThesisList.value = resGetAllByUserId;
    // console.log(resGetAllByUserId);
}


onMounted(async () => {
    loadingBar.start()
    loading.value = true
    await Promise.all([
        handleFilterThesis(),
        loadUserLikedThesisList()
    ])
    initThesisList.value = thesisList.value
    loadingBar.finish()
    loading.value = false
})


</script>