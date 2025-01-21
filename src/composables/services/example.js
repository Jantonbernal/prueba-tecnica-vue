import { ref, watch } from 'vue'
import { useHttpRequest } from "@/composables/useHttpRequest";

export default function useExample() {

    const { dataEndPoint: dataExample, sendRequest: getExample_, loading: loadingExample, errorEndPoint: errorExample } = useHttpRequest();
    const { dataEndPoint: dataExampleById, sendRequest: getExampleById_, loading: loadingExampleById, errorEndPoint: errorExampleById } = useHttpRequest();
    const { dataEndPoint: dataStoreExample, sendRequest: setStoreExample_, loading: loadingStoreExample, errorEndPoint: errorStoreExample } = useHttpRequest();
    const { dataEndPoint: dataUpdateExample, sendRequest: setUpdateExample_, loading: loadingUpdateExample, errorEndPoint: errorUpdateExample } = useHttpRequest();
    const { dataEndPoint: dataDeleteExample, sendRequest: setDeleteExample_, loading: loadingDeleteExample, errorEndPoint: errorDeleteExample } = useHttpRequest();

    const examples = ref(dataExample || {})
    const numberOfPages = ref(0)

    // Obtener los Example del sistema
    const getExample = async (params) => {
        getExample_('GET', 'api/auth/menu/example', params)
    }

    // Obtener un registro especifico
    const getExampleById = async (id) => {
        getExampleById_('GET', 'api/auth/menu/example/' + id)
    }

    // Registrar
    const setStoreExample = async (params) => {
        setStoreExample_('POST', 'api/auth/menu/example', params)
    }

    // Actualizar
    const setUpdateExample = async (id, params) => {
        setUpdateExample_('PUT', 'api/auth/menu/example/' + id, params)
    }

    // Delete
    const setDeleteExample = async (id, params) => {
        setDeleteExample_('DELETE', 'api/auth/menu/example/' + id, params)
    }

    // Está atento a cambios para setear el número de páginas
    watch(examples, (received) => {
        if (received.data.length > 0) {
            numberOfPages.value = received.links.length - 2
        } else {
            numberOfPages.value = 0;
        }
    })

    return {
        dataExample,
        numberOfPages,
        getExample,
        loadingExample,
        errorExample,
        // buscar un registro en especifico
        dataExampleById,
        getExampleById,
        loadingExampleById,
        errorExampleById,
        // registrar
        dataStoreExample,
        setStoreExample,
        loadingStoreExample,
        errorStoreExample,
        // actualizar un registro en especifico
        dataUpdateExample,
        setUpdateExample,
        loadingUpdateExample,
        errorUpdateExample,
        // eliminar/cambiar estado en especifico
        dataDeleteExample,
        setDeleteExample,
        loadingDeleteExample,
        errorDeleteExample
    }
}