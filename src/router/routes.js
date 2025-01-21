const NotFound = () => import('@/views/Error.vue');
const Example1 = () => import('@/components/Example1.vue');
const Product = () => import('@/components/Product.vue');
const ProductDetail = () => import('@/components/ProductDetail.vue');

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Example1,
        meta: {
            requiresAuth: false
        },
        // children: [
        //     {
        //         path: '/dashboard/usuario/store',
        //         name: 'usuario.crear',
        //         component: UserCreate,
        //         meta: {
        //             requiresAuth: true,
        //         },
        //     },
        //     {
        //         path: '/dashboard/usuario/edit/:id',
        //         name: 'usuario.editar',
        //         component: UserEdit,
        //         meta: {
        //             requiresAuth: true,
        //         },
        //     },
        // ]
    },
    {
        path: '/producto',
        name: 'product',
        component: Product,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/producto-detalle/:id',
        name: 'ProductDetail',
        component: ProductDetail,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: {
            requiresAuth: false
        }
    },
]

export default routes