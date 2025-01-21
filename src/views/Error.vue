<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const back = () => {
    router.back();
};
</script>

<template>
    <div class="not-found">
        <div class="content">
            <h1>404</h1>
            <p>Oops! La página que estás buscando no existe.</p>
            <router-link @click.prevent="back" class="home-link">Vuelve a un lugar seguro</router-link>
        </div>
    </div>
</template>

<style scoped>
.not-found {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f9f9f9;
    font-family: 'Arial', sans-serif;
    color: #333;
    text-align: center;
    padding: 20px;
    box-sizing: border-box;
}

.content {
    max-width: 600px;
}

h1 {
    font-size: 8rem;
    margin: 0;
    color: #ff6b6b;
}

p {
    font-size: 1.5rem;
    margin: 10px 0 20px;
    color: #555;
}

.home-link {
    display: inline-block;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background-color: #007bff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.home-link:hover {
    background-color: #0056b3;
}
</style>