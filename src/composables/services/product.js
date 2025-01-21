import { ref, watch } from 'vue'
import { useHttpRequest } from "@/composables/useHttpRequest";

export default function useProduct() {
    const { dataEndPoint: dataProducts, sendRequest: getProducts_, loading: loadingProduct, errorEndPoint: errorProduct } = useHttpRequest();
    const { dataEndPoint: dataProductsById, sendRequest: getProductsById_, loading: loadingProductById, errorEndPoint: errorProductById } = useHttpRequest();

    const getProducts = async (params) => {
        getProducts_('GET', 'products')
    }

    const getProductsById = async (id) => {
        getProductsById_('GET', 'products/' + id)
    }

    return {
        dataProducts,
        getProducts,
        loadingProduct,
        errorProduct,
        // single product
        dataProductsById,
        getProductsById,
        loadingProductById,
        errorProductById,
    }
}