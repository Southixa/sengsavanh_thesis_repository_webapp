<template>
    <n-button
        :loading="loading"
        v-if="isThisThesisLiked"
        @click="unLikeThesis"
        type="info"
        text-color="#fe020c"
        class="w-full hover:opacity-90 mt-2"
        >
        <template #icon>
            <n-icon size="17">
                <heart-icon />
            </n-icon>
        </template>
        ຖືກໃຈແລ້ວ
    </n-button>
    <n-button
        v-else
        :loading="loading"
        @click="likeThesis"
        type="info"
        text-color="#374151"
        class="w-full hover:opacity-90 mt-2"
        >
        <template #icon>
            <n-icon size="17">
                <heart-icon />
            </n-icon>
        </template>
        ຖືກໃຈ
    </n-button>
</template>

<script setup>
import { getUserInfoForLocalStorage, isAuth } from "~/utils/helpers/index";
import { Heart as HeartIcon } from "@vicons/ionicons5";
import { useMessage } from "naive-ui";

const message = useMessage();

const { getOneThesis, updateThesisDownloadedAmountIncrement, updateThesisSeenAmountIncrement, updateThesisLikedAmountIncrement, updateThesisLikedAmountDecrement } = useThesis();
const { getAllByUserIdAndThesisId, deleteByuserIdAndThesisId, addLiked } = useLiked();

const props = defineProps({
    thesisId: {
        type: String,
        required: true
    },
    onChange: {
        type: Function,
        default: async () => {}
    }
})

const isThisThesisLiked = ref(false)
const loading = ref(false)

const likeThesis = async () => {
    if(!isAuth()){
        message.warning("ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນຖືກໃຈ")
        return;
    }
    loading.value = true

    const currentUserInfo = getUserInfoForLocalStorage();
    const userId = currentUserInfo.user_id;

    const resUpdateThesisLikedAmountIncrement = await updateThesisLikedAmountIncrement(props.thesisId);
    const resAddLiked = await addLiked(userId, props.thesisId);

    isThisThesisLiked.value = true
    loading.value = false
    await props.onChange()
}

const unLikeThesis = async () => {
    if(!isAuth()){
        message.warning("ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນຖືກໃຈ")
        return;
    }
    loading.value = true

    const currentUserInfo = getUserInfoForLocalStorage();
    const userId = currentUserInfo.user_id;

    const resUpdateThesisLikedAmountDecrement = await updateThesisLikedAmountDecrement(props.thesisId);
    const resDeleteByuserIdAndThesisId = await deleteByuserIdAndThesisId(userId, props.thesisId);

    isThisThesisLiked.value = false

    loading.value = false
    await props.onChange()
}

const checkIsLikedThesis = async () => {
    if(!isAuth()) return;

    loading.value = true

    const currentUserInfo = getUserInfoForLocalStorage();
    const userId = currentUserInfo.user_id;

    const resGetAllByUserIdAndThesisId = await getAllByUserIdAndThesisId(userId, props.thesisId);
    // console.log(resGetAllByUserIdAndThesisId);
    if(resGetAllByUserIdAndThesisId.length > 0) {
        isThisThesisLiked.value = true
    }

    loading.value = false

}

onMounted(async () => {
    await checkIsLikedThesis()
})

</script>