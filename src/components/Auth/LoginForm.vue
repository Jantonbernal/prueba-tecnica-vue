<script setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength, helpers } from '@vuelidate/validators'
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { useAuthStore } from "@/stores/auth.js";

// Inicializar toast para notificaciones
const $toast = useToast();

// Router inicializado
const router = useRouter();
// Stores inicilizados
const useAuth = useAuthStore();

// Store Auth
const { errorResponse, loadingResponse, accessToken } = storeToRefs(useAuth);
const { signIn } = useAuth;

const credentials = reactive({
    email: null,
    password: null,
})

// Definir reglas de validación
const rules = computed(() => {
    return {
        email: {
            required: helpers.withMessage('El E-mail es requerido', required),
            email: helpers.withMessage('Debe ingresar un E-mail válido', email)
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

const clear = () => {
    v$.value.$reset()
    for (const [key, value] of Object.entries(credentials)) {
        state[key] = value
    }
}

const login = async () => {
    const isFormCorrect = await v$.value.$validate()
    if (!isFormCorrect) return
    signIn(credentials)
}

</script>

<template>
    <v-overlay :model-value="loadingResponse" :opacity="0.1" class="align-center justify-center">
        <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
    </v-overlay>

    <div v-if="loadingResponse">
        <v-alert type="info" class="my-5">
            Comprobando credenciales
        </v-alert>
    </div>

    <div v-if="errorResponse">
        <v-alert type="error" class="my-5">
            {{ errorResponse.data.message }}
        </v-alert>
    </div>

    <div class="d-flex justify-center mb-5 text-high-emphasis">
        <h1 class="text-center">Iniciar Sesión con sus credenciales</h1>
    </div>
    <v-divider></v-divider>
    <v-row class="mb-3">
        <v-col cols="12">
            <div :class="{ error: v$.email.$errors.length }">
                <v-text-field v-model="credentials.email" :error-messages="v$.email.$errors.map(e => e.$message)"
                    @blur="v$.email.$touch" @input="v$.email.$touch" label="Email" variant="outlined" class="pwdInput"
                    color="primary"></v-text-field>
            </div>
        </v-col>
        <v-col cols="12">
            <div :class="{ error: v$.password.$errors.length }">
                <v-text-field v-model="credentials.password" :error-messages="v$.password.$errors.map(e => e.$message)"
                    @blur="v$.password.$touch" @input="v$.password.$touch" label="Contraseña" variant="outlined"
                    class="border-borderColor" type="password" color="primary" @keyup.enter="login"></v-text-field>
            </div>
        </v-col>
        <v-col cols="12">
            <v-btn size="large" rounded="lg" color="primary" block flat @click="login" :disabled="loadingResponse">
                INICIAR SESIÓN
            </v-btn>
        </v-col>
    </v-row>
</template>