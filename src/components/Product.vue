<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import useProduct from "@/composables/services/product";

const router = useRouter();

const { dataProducts, getProducts, loadingProduct, errorProduct } = useProduct();

onMounted(() => {
    getProducts();
})

const selectProduct = (product) => {
    router.push({ name: "ProductDetail", params: { id: product.id } });
}

</script>

<template>
    <div class="container">
        <div v-if="errorProduct">
            <h1 class="error">Error al cargar los productos</h1>
        </div>
        <div v-if="loadingProduct">
            <h1 class="loading">Cargando...</h1>
        </div>
        <div v-else>
            <button class="btn-primary">
                Agregar Producto
            </button>

            <table class="table-basic">
                <thead>
                    <tr>
                        <th colspan="5">Listado de Productos</th>
                    </tr>
                    <tr>
                        <th>Id</th>
                        <th>Categoría</th>
                        <th>Título</th>
                        <th>Precio</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in dataProducts" :key="product.id" @click.prevent="selectProduct(product)">
                        <td>{{ product.id }}</td>
                        <td>{{ product.category }}</td>
                        <td>{{ product.title }}</td>
                        <td>{{ product.price }}</td>
                        <td>
                            <img width="100" height="90" :src="product.image" :alt="product.title">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.loading {
    text-align: center;
    margin-top: 20px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    box-sizing: border-box;
}

/* Button Styles */
.btn-primary {
    display: block;
    margin: 0 auto 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

.btn-primary:hover {
    background-color: #0056b3;
}

/* Table Styles */
.table-basic {
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto;
    text-align: left;
    font-size: 16px;
}

.table-basic thead {
    background-color: #007bff;
    color: white;
}

.table-basic th,
.table-basic td {
    padding: 12px 15px;
    border: 1px solid #ddd;
}

.table-basic tbody tr:nth-child(even) {
    background-color: #f2f2f2;
}

.table-basic tbody tr:hover {
    background-color: #e9ecef;
    cursor: pointer;
}
</style>