<script setup>
import { computed } from "vue";
import { reactive, watch } from 'vue'
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import { useAccessStore } from "@/stores/access.js";
import useAuth from "@/composables/services/auth";

// Inicializar toast para notificaciones
const $toast = useToast();

// Router inicializado
const router = useRouter();

const useAccess = useAccessStore();
const { access } = storeToRefs(useAccess);

const {
    dataLogin, login, loadingLogin, errorLogin,
} = useAuth();

const credentials = reactive({
    username: 'admin',
    password: '12345678',
})

// Definir reglas de validación
const rules = computed(() => {
    return {
        username: {
            required: helpers.withMessage('El usuario es requerido', required),
        },
        password: {
            required: helpers.withMessage('La contraseña es requerida', required),
            minLength: helpers.withMessage(
                ({
                    $params,
                }) => `Este campo debe tener al menos ${$params.min} caracteres`, minLength(6)
            )
        },
    }
})

// Inicializar validaciones
const v$ = useVuelidate(rules, credentials)

const signIn = async () => {
    const isFormCorrect = await v$.value.$validate()
    if (!isFormCorrect) return

    login(credentials)
}

watch(dataLogin, (received) => {
    access.value = received?.encrypted

    $toast.open({
        message: JSON.parse(access.value).message,
        type: 'success',
    });

    router.push({ name: 'Home' })
})

watch(errorLogin, (received) => {
    access.value = null
    if (received) {
        $toast.open({
            message: received?.data?.message,
            type: 'error',
        });
    }
})

</script>

<template>
    <v-overlay :model-value="loadingLogin" :opacity="0.1" class="align-center justify-center">
        <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
    </v-overlay>

    <div v-if="loadingLogin">
        <v-alert type="info" class="my-5">
            Comprobando credenciales
        </v-alert>
    </div>

    <div v-if="errorLogin">
        <v-alert type="error" class="my-5">
            {{ errorLogin?.data?.message }}
        </v-alert>
    </div>

    <div class="d-flex justify-center mb-5 text-high-emphasis">
        <h1 class="text-center">Iniciar Sesión con sus credenciales</h1>
    </div>

    <v-divider></v-divider>

    <v-row class="mb-3">
        <v-col cols="12">
            <div :class="{ error: v$.username.$errors.length }">
                <v-text-field v-model="credentials.username" :error-messages="v$.username.$errors.map(e => e.$message)"
                    @blur="v$.username.$touch" @input="v$.username.$touch" label="Usuario" variant="outlined"
                    class="pwdInput" color="primary"></v-text-field>
            </div>
        </v-col>
        <v-col cols="12">
            <div :class="{ error: v$.password.$errors.length }">
                <v-text-field v-model="credentials.password" :error-messages="v$.password.$errors.map(e => e.$message)"
                    @blur="v$.password.$touch" @input="v$.password.$touch" label="Contraseña" variant="outlined"
                    class="border-borderColor" type="password" color="primary" @keyup.enter="signIn"></v-text-field>
            </div>
        </v-col>
        <v-col cols="12">
            <v-btn size="large" rounded="lg" color="primary" block flat @click="signIn" :disabled="loadingLogin">
                INICIAR SESIÓN
            </v-btn>
        </v-col>
    </v-row>
</template>