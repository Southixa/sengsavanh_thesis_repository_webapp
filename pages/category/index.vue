<template>
    <div class="w-full min-h-screen bg-gray-100 px-6">
        <div class="max-w-screen-xl mx-auto">
            <Breadcrumb :items="breadcrumbItems" />
            <div class="w-full mt-6">
                <NuxtLink to="/student-thesis" class="block lg:hidden mb-8">
                    <div class="w-full h-[120px] bg-gray-400 rounded-md px-6 flex justify-between items-center bg-[url('~/assets/image/category/cagegory_student_card_bg.png')] bg-no-repeat bg-cover bg-center">
                        <p class="text-white text-xl font-semibold z-10">ບົດຈົບຂອງນັກສຶກສາ ({{ formatCurrency(getTotalStudentThesisTypeCount()) }})</p>
                        <Icon name="majesticons:arrow-right" class="text-white z-10" size="40" />
                    </div>
                </NuxtLink>
                <NuxtLink to="/student-thesis" class="hidden lg:block mb-8">
                    <div class="w-full h-[150px] bg-gray-400 rounded-md px-10 md:flex justify-between items-center bg-[url('~/assets/image/category/cagegory_student_card_bg.png')] category-card student-card relative">
                        <p class="text-white text-2xl font-semibold z-10">ບົດຈົບຂອງນັກສຶກສາ ({{ formatCurrency(getTotalStudentThesisTypeCount()) }})</p>
                        <Icon name="majesticons:arrow-right" class="text-white z-10 student-card-arrow" size="40" />
                    </div>
                </NuxtLink>
                <NuxtLink to="/teacher-thesis" class="block lg:hidden mb-8">
                    <div class="w-full h-[120px] bg-gray-400 rounded-md px-6 flex justify-between items-center bg-[url('~/assets/image/category/cagegory_teacher_card_bg.png')] bg-no-repeat bg-cover bg-center">
                        <p class="text-white text-xl font-semibold z-10">ບົດຈົບຂອງອາຈານ ({{ formatCurrency(getTotalTeacherThesisTypeCount()) }})</p>
                        <Icon name="majesticons:arrow-right" class="text-white z-10" size="40" />
                    </div>
                </NuxtLink>
                <NuxtLink to="/teacher-thesis" class="hidden lg:block mb-8">
                    <div class="w-full h-[150px] bg-gray-400 rounded-md px-10 md:flex justify-between items-center bg-[url('~/assets/image/category/cagegory_teacher_card_bg.png')] category-card teacher-card relative">
                        <p class="text-white text-2xl font-semibold z-10">ບົດຈົບຂອງອາຈານ ({{ formatCurrency(getTotalTeacherThesisTypeCount()) }})</p>
                        <Icon name="majesticons:arrow-right" class="text-white z-10 student-card-arrow" size="40" />
                    </div>
                </NuxtLink>
                <NuxtLink to="/institute-thesis" class="block lg:hidden mb-8">
                    <div class="w-full h-[120px] bg-gray-400 rounded-md px-6 flex justify-between items-center bg-[url('~/assets/image/category/cagegory_insstitue_card_bg.png')] bg-no-repeat bg-cover bg-center">
                        <p class="text-white text-xl font-semibold z-10">ບົດຈົບຂອງສະຖາບັນ ({{ formatCurrency(getTotalInstituteThesisTypeCount()) }})</p>
                        <Icon name="majesticons:arrow-right" class="text-white z-10" size="40" />
                    </div>
                </NuxtLink>
                <NuxtLink to="/institute-thesis" class="hidden lg:block mb-8">
                    <div class="w-full h-[150px] bg-gray-400 rounded-md px-10 md:flex justify-between items-center bg-[url('~/assets/image/category/cagegory_insstitue_card_bg.png')] category-card institute-card relative">
                        <p class="text-white text-2xl font-semibold z-10">ບົດຈົບຂອງສະຖາບັນ ({{ formatCurrency(getTotalInstituteThesisTypeCount()) }})</p>
                        <Icon name="majesticons:arrow-right" class="text-white z-10 student-card-arrow" size="40" />
                    </div>
                </NuxtLink>
            </div>
            <div class="w-full h-20 test">

            </div>
        </div>
    </div>
</template>

<style scoped>
.student-card {
    background-position: 0px -680px;
}
.teacher-card {
    background-position: 0px -240px;
}
.institute-card {
    background-position: 0px -20px;
}
.category-card {
    background-size: cover;
    background-repeat: no-repeat;
    transition: filter 0.3s ease;
    overflow: hidden;
}
.category-card:hover {
    background-size: cover;
    background-repeat: no-repeat;
    filter: grayscale(0%);
}
.category-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: inherit;
    filter: grayscale(100%);
    background-size: inherit;
    background-position: inherit;
    background-repeat: inherit;
    transition: transform 0.3s ease; /* transition ສຳລັບການຂະຫຍາຍ */
}
.category-card::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    background: linear-gradient(to top, rgba(9,9,121,0.3) 0%, rgba(9,9,121,0) 65%);
}
.category-card:hover::before {
    transform: scale(1.1); /* ຂະຫຍາຍຮູບພາບເປັນ 110% */
    filter: grayscale(0%);
}
.category-card {
    transition: transform 0.4s ease;
}
.category-card .student-card-arrow {
    transition: transform 0.4s ease;
}
.category-card:hover .student-card-arrow {
    transform: translateX(30px);
}
</style>

<script setup>

import { formatCurrency } from '~/utils/helpers';

const breadcrumbItems = [
    { text: 'ໜ້າຫຼັກ', path: '/' },
    { text: 'ປະເພດບົດຈົບ' }
]


const { getAll } = useThesis();

const thesisList = ref([]);

const getTotalStudentThesisTypeCount = () => {
    let total = 0;
    thesisList.value.forEach(thesis => {
        if(thesis.thesis_type.thesis_type_id === '9d7fbd22-df64-4dd3-ab7c-51bbc33641c1') {
            total += 1
        }
    })
    return total
}

const getTotalTeacherThesisTypeCount = () => {
    let total = 0;
    thesisList.value.forEach(thesis => {
        if(thesis.thesis_type.thesis_type_id === '4d22b15b-8fa4-4e9c-b347-e8e8499487de') {
            total += 1
        }
    })
    return total
}

const getTotalInstituteThesisTypeCount = () => {
    let total = 0;
    thesisList.value.forEach(thesis => {
        if(thesis.thesis_type.thesis_type_id === '7f6bba9d-c327-40ef-a29c-9f837ad01a1f') {
            total += 1
        }
    })
    return total
}

onMounted(async () => {
  const resThesisList = await getAll();
  // console.log(resThesisList);
  thesisList.value = resThesisList
})

</script>
