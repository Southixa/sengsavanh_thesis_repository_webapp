<template>
    <p class="text-gray-800 text-xs">ສາຂາ</p>
    <div class="mt-2">
        <n-checkbox-group size="medium" v-model:value="majorFilter">
            <div class="flex flex-col gap-1">
                <n-checkbox value="all" :label="'ທັງໝົດ (' + props.thesis.length + ')'" />
                <n-checkbox v-for="major in majorList" :key="major.major_id" :value="major.major_id" :label="major.major_name + ' (' + countMajorAmount(major.major_id, props.thesis) + ')'" />
                <n-skeleton v-if="loading" text :repeat="2" />
            </div>
        </n-checkbox-group>
    </div>
</template>



<script setup>

const { getAllMajor } = useMajor();

const majorFilter = ref(['all'])
const majorList = ref([])
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

const countMajorAmount = (id, list) => {
    let amount = 0
    list.forEach(item => {
        if(item.major_id === id) amount++
    })
    return amount
}

watch(majorFilter, (newValue, oldValue) => {
    if(newValue.length > 1){
        if(oldValue.includes('all')){
            majorFilter.value = newValue.filter(item => item !== 'all')
            props.onChange(majorFilter.value)
            return;
        }
        if(newValue.includes('all')){
            majorFilter.value = ['all']
            props.onChange(majorFilter.value)
            return;
        }
    }
    if(newValue.length === 0){
        majorFilter.value = ['all']
        props.onChange(majorFilter.value)
        return;
    }
    props.onChange(majorFilter.value)
})

onMounted(async () => {
    loading.value = true
    majorList.value = await getAllMajor();
    loading.value = false
})

</script>