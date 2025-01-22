<script setup>
import { reactive, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import { storeToRefs } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
import { useAccessStore } from "@/stores/access.js";
import useAuth from "@/composables/services/auth";

import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();
const router = useRouter();

const useAccess = useAccessStore();
const { access } = storeToRefs(useAccess);

const { dataLogin, login, loadingLogin, errorLogin } = useAuth();

const credentials = reactive({
    username: "admin",
    password: "12345678",
});

const rules = computed(() => ({
    username: {
        required: helpers.withMessage("El usuario es requerido", required),
    },
    password: {
        required: helpers.withMessage("La contraseña es requerida", required),
        minLength: helpers.withMessage(
            ({ $params }) => `Debe tener al menos ${$params.min} caracteres`,
            minLength(6)
        ),
    },
}));

const v$ = useVuelidate(rules, credentials);

const signIn = async () => {
    const isValid = await v$.value.$validate();
    if (!isValid) return;
    login(credentials);
};

watch(dataLogin, (received) => {
    access.value = received?.encrypted;

    $toast.open({
        message: "Inicio de sesión exitoso",
        type: "success",
    });

    router.push({ name: "Home" });
});

watch(errorLogin, (received) => {
    access.value = null;
    if (received) {
        $toast.open({
            message: received?.data?.message || "Ocurrió un error",
            type: "error",
        });
    }
});
</script>

<template>
    <v-overlay :model-value="loadingLogin" :opacity="0.1" class="d-flex align-center justify-center">
        <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
    </v-overlay>

    <v-form>
        <div class="mb-4">
            <v-text-field v-model="credentials.username" :error-messages="v$.username.$errors.map((e) => e.$message)"
                label="Usuario" variant="outlined" color="primary" @blur="v$.username.$touch"
                @input="v$.username.$touch" dense></v-text-field>
        </div>

        <div class="mb-4">
            <v-text-field v-model="credentials.password" :error-messages="v$.password.$errors.map((e) => e.$message)"
                label="Contraseña" variant="outlined" color="primary" type="password" @blur="v$.password.$touch"
                @input="v$.password.$touch" @keyup.enter="signIn" dense></v-text-field>
        </div>

        <v-btn block color="primary" class="py-3 text-white font-weight-bold" @click="signIn" :disabled="loadingLogin">
            INICIAR SESIÓN
        </v-btn>
    </v-form>
</template>
