<script setup>
import LoginForm from '@/components/Auth/LoginForm.vue';
</script>

<template>
    <v-main>
        <v-container class="h-100">
            <v-row align="center" class="fill-height" justify="center">
                <v-col cols="12" sm="6" md="4">
                    <div class="boxed-auth-wrap">
                        <v-card rounded="xl" elevation="8" class="py-6 px-4">
                            <v-card-item class="pa-8">
                                <div class="text-center mb-6">
                                    <v-icon icon="mdi-account-circle-outline" size="64" color="primary"></v-icon>
                                    <h2 class="font-weight-bold text-h5 mt-3">¡Bienvenido de nuevo!</h2>
                                    <p class="text-subtitle-1">Inicia sesión para continuar</p>
                                </div>
                            </v-card-item>
                            <LoginForm />
                        </v-card>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>