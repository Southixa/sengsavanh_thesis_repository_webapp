<template>
    <div class="max-w-screen-xl mx-auto pt-6">
            <div class="w-full flex items-center gap-1 md:gap-2">
                <template v-for="(item, index) in items" :key="index">
                    <NuxtLink :to="item.path" v-if="item.path">
                        <p class="text-blue-500 hover:opacity-80 text-xs md:text-sm">{{ item.text }}</p>
                    </NuxtLink>
                    <p class="text-gray-800 text-xs md:text-sm" v-else>{{ item.text }}</p>
                    <div v-if="index < items.length - 1 " class="w-4 h-4 flex justify-center items-center">
                        <Icon name="mingcute:right-fill" class="text-gray-800" size="16"/>
                    </div>
                </template>
            </div>
        </div>
</template>

<script setup>

defineProps({
    items: {
        type: Array,
        default: () => [],
        required: true
    }
})

</script>