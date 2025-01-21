import { defineStore } from "pinia";
import { computed } from "vue";
import { useDisplay } from 'vuetify'

export const useHeightStore = defineStore('height', () => {
    const { name } = useDisplay()

    const height = computed(() => {
        switch (name.value) {
            case 'xs': return 220
            case 'sm': return 400
            case 'md': return 500
            case 'lg': return 600
            case 'xl': return 800
            case 'xxl': return 1200
        }
        return 0
    })

    return {
        height,
    }
})