<script setup>
import LoginForm from '@/components/Auth/LoginForm.vue';
</script>

<template>
    <v-main>
        <v-container class="h-100">
            <v-row align="center" class="fill-height" justify="center">
                <v-col cols="12" sm="6">
                    <div class="boxed-auth-wrap">
                        <v-card rounded="lg" elevation="10" class="px-sm-1 px-0  mx-auto index-2">
                            <v-card-item class="pa-sm-8">
                                <div class="d-flex justify-center mb-5">
                                    <v-icon icon="mdi mdi-account-supervisor-circle" size="40"></v-icon>
                                </div>
                                <LoginForm />
                            </v-card-item>
                        </v-card>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>