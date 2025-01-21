import { defineStore, storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useMenuStore } from "@/stores/menu";

export const useAccessStore = defineStore('access', () => {
    const useMenu = useMenuStore();
    const { menus } = storeToRefs(useMenu);

    // variables
    const access = ref(JSON.parse(localStorage.getItem("access")) || null);
    const accessToken = ref(JSON.parse(localStorage.getItem("token")) || null)

    watch(access, (value) => {
        if (value) {
            menus.value = JSON.parse(access.value)?.dataMenu.menu || JSON.parse(localStorage.getItem("access"))?.dataMenu.menu
            localStorage.setItem('menu', JSON.stringify(JSON.parse(access.value)?.dataMenu.menu));

            accessToken.value = JSON.parse(access.value)?.data.accessToken || JSON.parse(localStorage.getItem("token"))?.data.accessToken
        } else {
            menus.value = []
            accessToken.value = null
        }
    });

    return {
        access,
        accessToken
    }
})