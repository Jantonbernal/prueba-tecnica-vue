<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import useProduct from "@/composables/services/product";

const route = useRoute();

const { dataProductsById, getProductsById, loadingProductById, errorProductById } = useProduct();

onMounted(() => {
    getProductsById(route.params.id);
})

</script>

<template>
    <div class="product-card">
        <h1>Detalle del Producto</h1>
        <div v-if="loadingProductById">Cargando...</div>
        <div v-else-if="errorProductById">Error: {{ errorProductById }}</div>
        <div v-else v-if="dataProductsById" class="card">
            <img :src="dataProductsById.image" :alt="dataProductsById.title" class="product-image" />
            <div class="card-body">
                <h2 class="product-title">{{ dataProductsById.title }}</h2>
                <p class="product-description">{{ dataProductsById.description }}</p>
                <p class="product-category"><strong>Categoría:</strong> {{ dataProductsById.category }}</p>
                <p class="product-price"><strong>Precio:</strong> ${{ dataProductsById.price }}</p>
                <p class="product-rating">
                    <strong>Rating:</strong> {{ dataProductsById.rating.rate }}
                    ({{ dataProductsById.rating.count }} reviews)
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.product-card {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.product-image {
    max-width: 100%;
    height: 40vh;
    border-radius: 8px;
    margin-bottom: 20px;
}

.card-body {
    text-align: center;
}

.product-title {
    font-size: 1.5rem;
    margin: 10px 0;
}

.product-description {
    font-size: 1rem;
    color: #666;
    margin-bottom: 15px;
}

.product-category {
    font-size: 0.9rem;
    color: #333;
    margin-bottom: 10px;
}

.product-price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #007bff;
    margin-bottom: 10px;
}

.product-rating {
    font-size: 0.9rem;
    color: #666;
}
</style>