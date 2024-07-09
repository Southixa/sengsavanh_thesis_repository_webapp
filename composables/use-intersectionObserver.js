// composables/useIntersectionObserver.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useIntersectionObserver(options = {}) {
  const isVisible = ref(false)
  const target = ref(null)

  const observer = ref(null)

  const startObserving = () => {
    if (observer.value || !target.value) return

    observer.value = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.value.unobserve(entry.target)
      }
    }, options)

    observer.value.observe(target.value)
  }

  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect()
    }
  })

  return { isVisible, target, startObserving }
}