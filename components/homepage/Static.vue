<template>
  <div class="w-full bg-primary flex justify-center items-center">
    <div class="w-[800px] grid grid-cols-1 md:grid-cols-3">
      <div class="w-full h-[120px] flex flex-col justify-center items-center gap-2">
        <p class="text-white font-medium text-base">ເຂົ້າຊົມທັງໝົດ</p>
        <p class="text-white font-medium text-3xl">{{ formatCurrency(totalSeen) }} ຄັ້ງ</p>
      </div>
      <div class="w-full h-[120px] flex flex-col justify-center items-center gap-2">
        <p class="text-white font-medium text-base">ດາວໂຫຼດທັງໝົດ</p>
        <p class="text-white font-medium text-3xl">{{ formatCurrency(totalDownloaded) }} ຄັ້ງ</p>
      </div>
      <div class="w-full h-[120px] flex flex-col justify-center items-center gap-2">
        <p class="text-white font-medium text-base">ບົດຈົບທັງໝົດ</p>
        <p class="text-white font-medium text-3xl">{{ formatCurrency(totalThesis) }} ເຫຼັມ</p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { formatCurrency } from '~/utils/helpers';
import { animate, easeOut } from 'popmotion'


const { getAll } = useThesis();

const thesisList = ref([]);

const totalSeen = ref(0)
const totalDownloaded = ref(0)
const totalThesis = ref(0)

const startAnimation = (endNumber, ref) => {
  const eightyPercent = Math.round(endNumber * 0.8);
  return animate({
    to: [0, eightyPercent, endNumber],
    duration: 500,
    offset: [0, 0.8, 1],
    onUpdate: (latest) =>  {
      ref.value = Math.round(latest)
    }
  })
}

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
  if(!resThesisList) {
    thesisList.value = [];
    return;
  }
  thesisList.value = resThesisList;
  startAnimation(getTotalDownloadedThesis(), totalDownloaded)
  startAnimation(getTotalSeenThesis(), totalSeen)
  startAnimation(getTotalThesis(), totalThesis)
})

</script>
