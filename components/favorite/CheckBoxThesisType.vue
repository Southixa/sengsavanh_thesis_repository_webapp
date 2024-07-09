<template>
    <p class="text-gray-800 text-xs">ລະດັບ</p>
    <div class="mt-2">
        <n-checkbox-group size="medium" v-model:value="degreeFilter">
            <div class="flex flex-col gap-1">
                <n-checkbox value="all" :label="'ທັງໝົດ (' + props.thesis.length + ')'" />
                <n-checkbox v-for="degree in degreeList" :key="degree.degree_type_id" :value="degree.degree_type_id" :label="degree.degree_type_name + ' (' + countDegreeAmount(degree.degree_type_id, props.thesis) + ')'" />
                <n-skeleton v-if="loading" text :repeat="2" />
            </div>
        </n-checkbox-group>
    </div>
</template>



<script setup>

const { getAllDegree } = useDegree();

const degreeFilter = ref(['all'])
const degreeList = ref([])
const loading = ref(false)

const props = defineProps({
    onChange: {
        type: Function,
        required: true
    },
    thesis: {
        type: Array,
        default: () => [],
    }
})

const countDegreeAmount = (id, list) => {
    let amount = 0
    list.forEach(item => {
        if(item.degree_type_id === id) amount++
    })
    return amount
}

watch(degreeFilter, (newValue, oldValue) => {
    if(newValue.length > 1){
        if(oldValue.includes('all')){
            degreeFilter.value = newValue.filter(item => item !== 'all')
            props.onChange(degreeFilter.value)
            return;
        }
        if(newValue.includes('all')){
            degreeFilter.value = ['all']
            props.onChange(degreeFilter.value)
            return;
        }
    }
    if(newValue.length === 0){
        degreeFilter.value = ['all']
        props.onChange(degreeFilter.value)
        return;
    }
    props.onChange(degreeFilter.value)
})

onMounted(async () => {
    loading.value = true
    degreeList.value = await getAllDegree();
    loading.value = false
})

</script>