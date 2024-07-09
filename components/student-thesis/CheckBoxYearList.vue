<template>
    <p class="text-gray-800 text-xs">ສົກຮຽນ</p>
    <div class="mt-2">
        <n-checkbox-group size="medium" v-model:value="yearFilter">
            <div class="flex flex-col gap-1">
                <n-checkbox value="all" :label="'ທັງໝົດ (' + props.thesis.length + ')'" />
                <template v-for="(year, index) in yearList" key="index">
                    <n-checkbox v-if="(index < maxLenghtShow) || showDropDownCheckBox" :value="year.number" :label="year.number + ' (' + countMajorAmount(year.number, props.thesis) + ')'" />
                </template>
                <button class="w-full h-8 flex justify-center items-center hover:bg-gray-200 rounded-md transition-all duration-200 ease-out" @click="showDropDownCheckBox = !showDropDownCheckBox">
                    <Icon v-if="showDropDownCheckBox" name="mingcute:up-fill" size="20" class="text-gray-400" />
                    <Icon v-else name="mingcute:down-fill" size="20" class="text-gray-400" />
                </button>
            </div>
        </n-checkbox-group>
    </div>
</template>



<script setup>


const yearFilter = ref(['all'])
const yearList = ref([])
const maxLenghtShow = ref(4)
const showDropDownCheckBox = ref(false)


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

const countMajorAmount = (year, list) => {
    let amount = 0
    list.forEach(item => {
        if(item.thesis_year === year) amount++
    })
    return amount
}

watch(yearFilter, (newValue, oldValue) => {
    if(newValue.length > 1){
        if(oldValue.includes('all')){
            yearFilter.value = newValue.filter(item => item !== 'all')
            props.onChange(yearFilter.value)
            return;
        }
        if(newValue.includes('all')){
            yearFilter.value = ['all']
            props.onChange(yearFilter.value)
            return;
        }
    }
    if(newValue.length === 0){
        yearFilter.value = ['all']
        props.onChange(yearFilter.value)
        return;
    }
    props.onChange(yearFilter.value)
})

onMounted(async () => {
    const since = 2013
    const yearListArray = []
    for (let i = since; i <= new Date().getFullYear(); i++) {
        yearListArray.push({ number: i })
    }
    yearList.value = yearListArray.reverse();
})


</script>