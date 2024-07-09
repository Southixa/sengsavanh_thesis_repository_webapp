<template>
    <div class="w-full mt-4">
        <student-thesis-card v-for="thesis in thesisList" :key="thesis.thesis_id" :thesis="thesis" />
        <n-skeleton v-if="loading" class="mt-2" text :repeat="3" height="110px" width="100%" :sharp="false" />
        <n-empty v-if="!loading && thesisList.length === 0" description="ບໍ່ມີຂໍ້ມູນ" class="mt-8" size="small">
            <template #extra>
            </template>
        </n-empty>
    </div>
</template>

<script setup>

const { getAllByFilter } = useThesis();

const props = defineProps({
    year: {
        type: Number,
        required: true
    },
    thesisId: {
        type: String,
        required: true
    },
    thesisType: {
        type: String,
        required: true
    }
})


const thesisList = ref([])
const loading = ref(false)

onMounted(async () => {
    loading.value = true
    let resRecommend = await getAllByFilter(['all'], ['all'], [props.year], '', props.thesisType)
    if(!resRecommend) {
        loading.value = false
        return
    }
    resRecommend = resRecommend.filter(item => item.thesis_id !== props.thesisId)
    if(resRecommend.length > 4) {
        resRecommend = resRecommend.slice(0, 4)
    }
    thesisList.value = resRecommend
    // console.log("thesisList recommend =>", thesisList.value);
    loading.value = false
})

</script>