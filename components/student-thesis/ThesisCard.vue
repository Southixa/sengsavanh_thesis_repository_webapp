<template>
    <div class="mt-2">
        <NuxtLink v-if="!props.loading" :to="`/${getCurrentThesisTypePath(props.thesis.thesis_type.thesis_type_id)}/${props.thesis.thesis_id}`">
            <div class="w-full min-h-26 bg-white rounded-md shadow-sm hover:shadow-md py-3 px-4 flex flex-col transition-all ease-out duration-200">
                <div class="w-full flex justify-between items-start gap-4 grow">
                    <p class="text-gray-800 text-sm font-semibold">{{ props.thesis?.thesis_title_lao }}</p>
                    <div class="h-5 flex justify-center items-center">
                        <p class="text-gray-500 text-xs">{{ props.thesis?.thesis_year }}</p>
                    </div>
                </div>
                <div class="w-full h-[24px] flex gap-3 items-center mt-2">
                    <span class="w-[6px] h-[6px] rounded-full bg-blue-600"></span>
                    <p v-if="isTypeInstitute(props.thesis.thesis_type.thesis_type_id)" class="text-gray-800">ສະຖາບັນທຸລະກິດແສງສະຫວັນ</p>
                    <p class="text-gray-800">{{ props.thesis?.major?.major_name }}</p>
                </div>
                <div class="w-full h-[20px] mt-2 flex items-center gap-6">
                    <div class="flex items-center gap-2">
                        <div class="w-4 h-4 flex justify-center items-center">
                            <Icon name="mdi:eye" size="14" class="text-gray-300" />
                        </div>
                        <p class="text-gray-400 text-xs">{{ props.thesis?.seen }}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-4 h-4 flex justify-center items-center">
                            <Icon name="mdi:heart" size="14" :class="isThisThesisLiked(props.thesis.thesis_id) ? 'text-red-400' : 'text-gray-300'" />
                        </div>
                        <p class="text-gray-400 text-xs">{{ props.thesis?.liked }}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-4 h-4 flex justify-center items-center">
                            <Icon name="streamline:download-circle-solid" size="12" class="text-gray-300" />
                        </div>
                        <p class="text-gray-400 text-xs">{{ props.thesis?.downloaded }}</p>
                    </div>
                </div>
            </div>
        </NuxtLink>
        <div v-else class="opacity-90 w-full min-h-26 bg-white rounded-md py-3 px-4 flex flex-col transition-all ease-out duration-200">
            <div class="w-full flex justify-between items-start gap-4 grow">
                <p class="text-gray-500 text-sm font-semibold">{{ props.thesis?.thesis_title_lao }}</p>
                <div class="h-5 flex justify-center items-center">
                    <p class="text-gray-500 text-xs">{{ props.thesis?.thesis_year }}</p>
                </div>
            </div>
            <div class="w-full h-[24px] flex gap-3 items-center mt-2">
                <span class="w-[6px] h-[6px] rounded-full bg-blue-400"></span>
                <p v-if="isTypeInstitute(props.thesis.thesis_type.thesis_type_id)" class="text-gray-800">ສະຖາບັນທຸລະກິດແສງສະຫວັນ</p>
                <p class="text-gray-800">{{ props.thesis?.major?.major_name }}</p>
            </div>
            <div class="w-full h-[20px] mt-2 flex items-center gap-6">
                <div class="flex items-center gap-2">
                    <div class="w-4 h-4 flex justify-center items-center">
                        <Icon name="mdi:eye" size="14" class="text-gray-300" />
                    </div>
                    <p class="text-gray-400 text-xs">{{ props.thesis?.seen }}</p>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-4 h-4 flex justify-center items-center">
                        <Icon name="mdi:heart" size="14" :class="isThisThesisLiked(props.thesis.thesis_id) ? 'text-red-400' : 'text-gray-300'" />
                    </div>
                    <p class="text-gray-400 text-xs">{{ props.thesis?.liked }}</p>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-4 h-4 flex justify-center items-center">
                        <Icon name="streamline:download-circle-solid" size="12" class="text-gray-300" />
                    </div>
                    <p class="text-gray-400 text-xs">{{ props.thesis?.downloaded }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.disabled-link {
  pointer-events: none;
  cursor: default;
}
.gradient-border {
  position: relative;
  border-radius: 8px;
  background: #fff;
}

.gradient-border::before {
    opacity: 5%;
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  padding: 1px;
  background: linear-gradient(45deg, #f0f0f0, #c0c0c0, #808080, #404040);
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  background-size: 300% 300%;
  animation: gradient 0.3s linear infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>

<script setup>


const props = defineProps({
    thesis: {
        type: Object,
        default: () => {},
    },
    loading: {
        type: Boolean,
        default: false
    },
    userLikedThesisList: {
        type: Array,
        default: () => [],
    }
})

const isThisThesisLiked = (thesisId) => {
    return props.userLikedThesisList.some(item => item.thesis_id === thesisId)
}


const getCurrentThesisTypePath = (thesisTypeId) => {
    if(thesisTypeId === '9d7fbd22-df64-4dd3-ab7c-51bbc33641c1') {
        return 'student-thesis'
    } else if(thesisTypeId === '4d22b15b-8fa4-4e9c-b347-e8e8499487de') {
        return 'teacher-thesis'
    } else if(thesisTypeId === '7f6bba9d-c327-40ef-a29c-9f837ad01a1f') {
        return 'institute-thesis'
    }
    return "student-thesis"
}

const isTypeInstitute = (thesisTypeId) => {
    if(thesisTypeId === '7f6bba9d-c327-40ef-a29c-9f837ad01a1f') {
        return true
    }
    return false
}

</script>