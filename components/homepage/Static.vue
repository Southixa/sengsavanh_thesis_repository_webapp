<template>
  <div class="w-full bg-primary flex justify-center items-center">
    <div class="w-[800px] grid grid-cols-1 md:grid-cols-3">
      <div class="w-full h-[120px] flex flex-col justify-center items-center gap-2">
        <p class="text-white font-medium text-base">ເຂົ້າຊົມທັງໝົດ</p>
        <p class="text-white font-medium text-3xl">{{ formatCurrency(getTotalSeenThesis()) }} ຄັ້ງ</p>
      </div>
      <div class="w-full h-[120px] flex flex-col justify-center items-center gap-2">
        <p class="text-white font-medium text-base">ດາວໂຫຼດທັງໝົດ</p>
        <p class="text-white font-medium text-3xl">{{ formatCurrency(getTotalDownloadedThesis()) }} ຄັ້ງ</p>
      </div>
      <div class="w-full h-[120px] flex flex-col justify-center items-center gap-2">
        <p class="text-white font-medium text-base">ບົດຈົບທັງໝົດ</p>
        <p class="text-white font-medium text-3xl">{{ formatCurrency(getTotalThesis()) }} ເຫຼັມ</p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { formatCurrency } from '~/utils/helpers';


const { getAll } = useThesis();

const thesisList = ref([]);

const getTotalThesis = () => {
  return thesisList.value.length
}

const getTotalDownloadedThesis = () => {
  let total = 0
  thesisList.value.forEach(thesis => {
    total += thesis.downloaded;
  })
  return total
}

const getTotalSeenThesis = () => {
  let total = 0
  thesisList.value.forEach(thesis => {
    total += thesis.seen;
  })
  return total
}

onMounted(async () => {
  const resThesisList = await getAll();
  thesisList.value = resThesisList
})

</script>
