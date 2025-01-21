import { defineStore } from "pinia";
import { ref } from "vue";

export const useMenuStore = defineStore('menu', () => {
    const drawer = ref(true);
    const menus = ref(JSON.parse(localStorage.getItem("menu")) || []);

    const changeDrawer = (value) => {
        drawer.value = value;
    }

    return {
        drawer,
        menus,
        changeDrawer
    }
})